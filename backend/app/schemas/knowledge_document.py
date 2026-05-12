from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class KnowledgeDocumentBase(BaseModel):
    company_id: UUID
    filename: str
    title: str | None = None
    document_type: str | None = None
    mime_type: str | None = None
    storage_path: str
    source: str | None = None
    author: str | None = None
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
