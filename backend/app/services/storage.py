from collections.abc import Callable
from dataclasses import dataclass
from enum import Enum
import hashlib
from pathlib import Path, PurePosixPath
from tempfile import NamedTemporaryFile
from typing import BinaryIO, Final
from uuid import UUID, uuid4

from app.core.config import Settings, settings


class StorageError(ValueError):
    """Base error for invalid local storage operations."""


class InvalidStoragePathError(StorageError):
    pass


class UnsupportedFileExtensionError(StorageError):
    pass


class UploadSizeExceededError(StorageError):
    pass


class UploadType(str, Enum):
    KNOWLEDGE = "knowledge"
    IMPORT = "import"


@dataclass(frozen=True)
class UploadRule:
    directory_setting: str
    allowed_extensions: frozenset[str]


@dataclass(frozen=True)
class StoredUpload:
    storage_key: str
    file_size_bytes: int
    checksum: str


UPLOAD_RULES: Final[dict[UploadType, UploadRule]] = {
    UploadType.KNOWLEDGE: UploadRule(
        directory_setting="upload_knowledge_dir",
        allowed_extensions=frozenset({".pdf", ".md", ".txt"}),
    ),
    UploadType.IMPORT: UploadRule(
        directory_setting="upload_import_dir",
        allowed_extensions=frozenset({".xlsx", ".csv"}),
    ),
}


class LocalStorageService:
    def __init__(
        self,
        configuration: Settings = settings,
        uuid_factory: Callable[[], UUID] = uuid4,
    ) -> None:
        self.configuration = configuration
        self.uuid_factory = uuid_factory
        self.base_directory = configuration.upload_base_dir.resolve()
        self.tmp_directory = self._validated_directory(configuration.upload_tmp_dir)
        self.target_directories = {
            upload_type: self._validated_directory(getattr(configuration, rule.directory_setting))
            for upload_type, rule in UPLOAD_RULES.items()
        }

    def ensure_directories(self) -> None:
        directories = {
            self.base_directory,
            self.tmp_directory,
            *self.target_directories.values(),
        }
        for directory in directories:
            directory.mkdir(parents=True, exist_ok=True)

    def sanitize_original_filename(self, original_filename: str) -> str:
        filename = original_filename.strip()
        if (
            not filename
            or len(filename) > 255
            or "/" in filename
            or "\\" in filename
            or filename in {".", ".."}
        ):
            raise InvalidStoragePathError("Original filename must be a plain filename.")
        return filename

    def validate_extension(self, upload_type: UploadType, original_filename: str) -> str:
        filename = self.sanitize_original_filename(original_filename)
        extension = Path(filename).suffix.lower()
        if extension not in UPLOAD_RULES[upload_type].allowed_extensions:
            raise UnsupportedFileExtensionError(
                f"Extension {extension or '<none>'} is not allowed for {upload_type.value} uploads."
            )
        return extension

    def generate_storage_key(self, upload_type: UploadType, original_filename: str) -> str:
        extension = self.validate_extension(upload_type, original_filename)
        prefix = self.target_directories[upload_type].relative_to(self.base_directory).as_posix()
        return f"{prefix}/{self.uuid_factory()}{extension}"

    def local_path_for_key(self, storage_key: str) -> Path:
        parts = storage_key.split("/")
        posix_key = PurePosixPath(storage_key)
        if (
            not storage_key
            or "\\" in storage_key
            or posix_key.is_absolute()
            or any(part in {"", ".", ".."} for part in parts)
        ):
            raise InvalidStoragePathError("Storage key must be a safe relative path.")

        path = (self.base_directory / Path(*parts)).resolve()
        self._ensure_within_base(path)
        return path

    def checksum_sha256(self, storage_key: str) -> str:
        digest = hashlib.sha256()
        with self.local_path_for_key(storage_key).open("rb") as stored_file:
            for chunk in iter(lambda: stored_file.read(1024 * 1024), b""):
                digest.update(chunk)
        return digest.hexdigest()

    def store(self, upload_type: UploadType, original_filename: str, source: BinaryIO) -> StoredUpload:
        storage_key = self.generate_storage_key(upload_type, original_filename)
        target_path = self.local_path_for_key(storage_key)
        self.ensure_directories()

        digest = hashlib.sha256()
        file_size_bytes = 0
        temporary_path: Path | None = None
        try:
            with NamedTemporaryFile(dir=self.tmp_directory, prefix=".upload-", suffix=".tmp", delete=False) as temporary:
                temporary_path = Path(temporary.name)
                for chunk in iter(lambda: source.read(1024 * 1024), b""):
                    file_size_bytes += len(chunk)
                    self.validate_size(file_size_bytes)
                    digest.update(chunk)
                    temporary.write(chunk)
            temporary_path.replace(target_path)
        except Exception:
            if temporary_path is not None:
                temporary_path.unlink(missing_ok=True)
            raise

        return StoredUpload(
            storage_key=storage_key,
            file_size_bytes=file_size_bytes,
            checksum=digest.hexdigest(),
        )

    def delete(self, storage_key: str) -> None:
        self.local_path_for_key(storage_key).unlink(missing_ok=True)

    def is_size_allowed(self, file_size_bytes: int) -> bool:
        return 0 <= file_size_bytes <= self.configuration.max_upload_size_bytes

    def validate_size(self, file_size_bytes: int) -> None:
        if file_size_bytes < 0:
            raise StorageError("File size must not be negative.")
        if not self.is_size_allowed(file_size_bytes):
            raise UploadSizeExceededError("File exceeds the configured upload size limit.")

    def _validated_directory(self, configured_directory: Path) -> Path:
        directory = configured_directory.resolve()
        self._ensure_within_base(directory)
        if directory == self.base_directory:
            raise InvalidStoragePathError("Storage subdirectory must not equal the upload base directory.")
        return directory

    def _ensure_within_base(self, path: Path) -> None:
        if not path.is_relative_to(self.base_directory):
            raise InvalidStoragePathError("Storage path must stay inside the upload base directory.")
