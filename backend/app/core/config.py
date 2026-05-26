from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://negotiation:negotiation_dev_password@db:5432/negotiation_tools"
    backend_cors_origins: str = "http://localhost:3000,http://frontend:3000"
    upload_base_dir: Path = Path("uploads")
    upload_tmp_dir: Path = Path("uploads/tmp")
    upload_knowledge_dir: Path = Path("uploads/knowledge")
    upload_import_dir: Path = Path("uploads/imports")
    max_upload_size_mb: int = Field(default=25, gt=0)

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.backend_cors_origins.split(",") if origin.strip()]

    @property
    def max_upload_size_bytes(self) -> int:
        return self.max_upload_size_mb * 1024 * 1024


settings = Settings()
