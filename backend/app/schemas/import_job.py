from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ImportJobBase(BaseModel):
    company_id: UUID
    project_id: UUID | None = None
    knowledge_document_id: UUID | None = None
    filename: str
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
