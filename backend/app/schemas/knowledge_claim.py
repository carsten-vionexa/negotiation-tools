from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class KnowledgeClaimBase(BaseModel):
    company_id: UUID
    project_id: UUID | None = None
    supplier_profile_id: UUID | None = None
    knowledge_document_id: UUID
    document_chunk_id: UUID | None = None
    claim_type: str
    claim_category: str | None = None
    claim_text: str
    evidence_text: str | None = None
    source_reference: str | None = None
    confidence_level: str = "unknown"
    information_kind: str = "fact"
    is_ai_generated: bool = False
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class KnowledgeClaimCreate(KnowledgeClaimBase):
    pass


class KnowledgeClaimRead(KnowledgeClaimBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
