from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ImportJobBase(BaseModel):
    company_id: UUID
    project_id: UUID | None = None
    knowledge_document_id: UUID | None = None
    filename: str
    original_filename: str | None = None
    storage_key: str | None = None
    mime_type: str | None = None
    file_size_bytes: int | None = None
    checksum: str | None = None
    source_type: str
    target_entity: str
    status: str = "pending"
    total_rows: int = 0
    processed_rows: int = 0
    valid_rows: int = 0
    error_rows: int = 0
    mapping_json: dict[str, Any] = Field(default_factory=dict)
    validation_summary_json: dict[str, Any] = Field(default_factory=dict)
    error_summary: str | None = None
    started_at: datetime | None = None
    completed_at: datetime | None = None


class ImportJobCreate(ImportJobBase):
    pass


class ImportJobRead(ImportJobBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime


class ImportJobMapRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    field_mapping: dict[str, str] = Field(min_length=1)

    @field_validator("field_mapping")
    @classmethod
    def reject_blank_field_names(cls, field_mapping: dict[str, str]) -> dict[str, str]:
        if any(
            not target_field.strip() or not source_column.strip()
            for target_field, source_column in field_mapping.items()
        ):
            raise ValueError("Mapping target fields and source columns cannot be blank.")
        return field_mapping
