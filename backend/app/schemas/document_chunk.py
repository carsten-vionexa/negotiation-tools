from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class DocumentChunkBase(BaseModel):
    knowledge_document_id: UUID
    company_id: UUID
    project_id: UUID | None = None
    chunk_index: int
    content: str
    content_hash: str | None = None
    page_number: int | None = None
    sheet_name: str | None = None
    row_number: int | None = None
    section_title: str | None = None
    source_reference: str | None = None
    language: str | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class DocumentChunkCreate(DocumentChunkBase):
    pass


class DocumentChunkRead(DocumentChunkBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
