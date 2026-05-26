from pathlib import Path
from uuid import UUID

import pytest

from app.core.config import Settings
from app.services.storage import (
    InvalidStoragePathError,
    LocalStorageService,
    StorageError,
    UnsupportedFileExtensionError,
    UploadSizeExceededError,
    UploadType,
)


@pytest.fixture
def storage_service(tmp_path: Path) -> LocalStorageService:
    upload_base_dir = tmp_path / "uploads"
    configuration = Settings(
        upload_base_dir=upload_base_dir,
        upload_tmp_dir=upload_base_dir / "tmp",
        upload_knowledge_dir=upload_base_dir / "knowledge",
        upload_import_dir=upload_base_dir / "imports",
        max_upload_size_mb=25,
    )
    return LocalStorageService(
        configuration=configuration,
        uuid_factory=lambda: UUID("4b7f9e9e-7c0d-4f8b-8f8b-2f0a6f4f6d2f"),
    )


@pytest.mark.parametrize(
    ("upload_type", "filename", "expected_key"),
    [
        (UploadType.KNOWLEDGE, "Proposal.PDF", "knowledge/4b7f9e9e-7c0d-4f8b-8f8b-2f0a6f4f6d2f.pdf"),
        (UploadType.IMPORT, "Items.CSV", "imports/4b7f9e9e-7c0d-4f8b-8f8b-2f0a6f4f6d2f.csv"),
    ],
)
def test_generates_server_side_relative_storage_key_with_normalized_extension(
    storage_service: LocalStorageService,
    upload_type: UploadType,
    filename: str,
    expected_key: str,
) -> None:
    storage_key = storage_service.generate_storage_key(upload_type, filename)

    assert storage_key == expected_key
    assert filename not in storage_key
    assert not Path(storage_key).is_absolute()


@pytest.mark.parametrize(
    ("upload_type", "filename"),
    [
        (UploadType.KNOWLEDGE, "report.pdf"),
        (UploadType.KNOWLEDGE, "notes.md"),
        (UploadType.KNOWLEDGE, "brief.txt"),
        (UploadType.IMPORT, "history.xlsx"),
        (UploadType.IMPORT, "requests.csv"),
    ],
)
def test_accepts_allowed_extension(
    storage_service: LocalStorageService,
    upload_type: UploadType,
    filename: str,
) -> None:
    assert storage_service.validate_extension(upload_type, filename) == Path(filename).suffix


@pytest.mark.parametrize(
    ("upload_type", "filename"),
    [
        (UploadType.KNOWLEDGE, "macro.xlsx"),
        (UploadType.IMPORT, "document.pdf"),
        (UploadType.IMPORT, "legacy.xls"),
        (UploadType.KNOWLEDGE, "without-extension"),
    ],
)
def test_rejects_extension_not_allowed_for_upload_type(
    storage_service: LocalStorageService,
    upload_type: UploadType,
    filename: str,
) -> None:
    with pytest.raises(UnsupportedFileExtensionError):
        storage_service.validate_extension(upload_type, filename)


@pytest.mark.parametrize("filename", ["../secret.pdf", "/tmp/secret.pdf", r"C:\tmp\secret.pdf"])
def test_rejects_path_components_in_original_filename(
    storage_service: LocalStorageService,
    filename: str,
) -> None:
    with pytest.raises(InvalidStoragePathError):
        storage_service.generate_storage_key(UploadType.KNOWLEDGE, filename)


@pytest.mark.parametrize("storage_key", ["../escape.pdf", "/tmp/escape.pdf", "knowledge/../escape.pdf"])
def test_rejects_unsafe_storage_keys(
    storage_service: LocalStorageService,
    storage_key: str,
) -> None:
    with pytest.raises(InvalidStoragePathError):
        storage_service.local_path_for_key(storage_key)


def test_resolved_target_path_stays_in_upload_base_directory(storage_service: LocalStorageService) -> None:
    storage_key = storage_service.generate_storage_key(UploadType.KNOWLEDGE, "source.pdf")
    target_path = storage_service.local_path_for_key(storage_key)

    assert target_path.is_relative_to(storage_service.base_directory)
    assert target_path.parent == storage_service.target_directories[UploadType.KNOWLEDGE]


def test_creates_upload_directories(storage_service: LocalStorageService) -> None:
    storage_service.ensure_directories()

    assert storage_service.base_directory.is_dir()
    assert storage_service.tmp_directory.is_dir()
    assert all(directory.is_dir() for directory in storage_service.target_directories.values())


def test_calculates_reproducible_sha256_for_stored_file(storage_service: LocalStorageService) -> None:
    storage_service.ensure_directories()
    storage_key = storage_service.generate_storage_key(UploadType.KNOWLEDGE, "source.txt")
    storage_service.local_path_for_key(storage_key).write_bytes(b"stored document\n")

    assert storage_service.checksum_sha256(storage_key) == (
        "4c7f324f6558fbc46c13c9f9ebf0b1d5e929ed563710b7dac557b064c002708e"
    )
    assert storage_service.checksum_sha256(storage_key) == storage_service.checksum_sha256(storage_key)


def test_validates_configured_upload_size_limit(storage_service: LocalStorageService) -> None:
    limit = 25 * 1024 * 1024

    assert storage_service.is_size_allowed(limit)
    assert not storage_service.is_size_allowed(limit + 1)
    storage_service.validate_size(limit)
    with pytest.raises(UploadSizeExceededError):
        storage_service.validate_size(limit + 1)
    with pytest.raises(StorageError):
        storage_service.validate_size(-1)


def test_rejects_configured_target_directory_outside_upload_base(tmp_path: Path) -> None:
    upload_base_dir = tmp_path / "uploads"
    configuration = Settings(
        upload_base_dir=upload_base_dir,
        upload_tmp_dir=upload_base_dir / "tmp",
        upload_knowledge_dir=tmp_path / "outside",
        upload_import_dir=upload_base_dir / "imports",
    )

    with pytest.raises(InvalidStoragePathError):
        LocalStorageService(configuration=configuration)


def test_derives_subdirectories_when_only_upload_base_dir_is_overridden(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    upload_base_dir = tmp_path / "custom-uploads"
    monkeypatch.setenv("UPLOAD_BASE_DIR", str(upload_base_dir))
    monkeypatch.delenv("UPLOAD_TMP_DIR", raising=False)
    monkeypatch.delenv("UPLOAD_KNOWLEDGE_DIR", raising=False)
    monkeypatch.delenv("UPLOAD_IMPORT_DIR", raising=False)

    configuration = Settings(_env_file=None)
    service = LocalStorageService(configuration=configuration)

    assert configuration.upload_tmp_dir == upload_base_dir / "tmp"
    assert configuration.upload_knowledge_dir == upload_base_dir / "knowledge"
    assert configuration.upload_import_dir == upload_base_dir / "imports"
    assert service.generate_storage_key(UploadType.IMPORT, "input.csv").startswith("imports/")
