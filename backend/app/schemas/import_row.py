from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ImportRowBase(BaseModel):
    import_job_id: UUID
    company_id: UUID
    project_id: UUID | None = None
    row_number: int
    sheet_name: str | None = None
    raw_data_json: dict[str, Any] = Field(default_factory=dict)
    mapped_data_json: dict[str, Any] = Field(default_factory=dict)
    validation_status: str = "pending"
    error_message: str | None = None
    warning_message: str | None = None
    target_entity: str | None = None
    target_record_id: UUID | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class ImportRowCreate(ImportRowBase):
    pass


class ImportRowRead(ImportRowBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
