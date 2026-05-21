from datetime import date, datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class KnowledgeDocumentBase(BaseModel):
    company_id: UUID
    project_id: UUID | None = None
    filename: str
    original_filename: str | None = None
    title: str | None = None
    document_type: str | None = None
    mime_type: str | None = None
    storage_path: str
    storage_key: str | None = None
    file_size_bytes: int | None = None
    checksum: str | None = None
    uploaded_at: datetime | None = None
    source: str | None = None
    source_name: str | None = None
    author: str | None = None
    source_author: str | None = None
    source_date: date | None = None
    reliability_level: str = "unknown"
    confidentiality_level: str = "internal"
    description: str | None = None
    parsing_status: str = "pending"
    content_text: str | None = None
    chunk_count: int = 0
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class KnowledgeDocumentCreate(KnowledgeDocumentBase):
    pass


class KnowledgeDocumentRead(KnowledgeDocumentBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
