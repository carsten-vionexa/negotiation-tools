from typing import Any
from uuid import UUID

from sqlalchemy import Boolean, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class KnowledgeClaim(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "knowledge_claims"

    company_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("companies.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    project_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("negotiation_projects.id", ondelete="SET NULL"),
        index=True,
    )
    supplier_profile_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("supplier_profiles.id", ondelete="SET NULL"),
        index=True,
    )
    knowledge_document_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("knowledge_documents.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    document_chunk_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("document_chunks.id", ondelete="SET NULL"),
        index=True,
    )
    claim_type: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    claim_category: Mapped[str | None] = mapped_column(String(100))
    claim_text: Mapped[str] = mapped_column(Text, nullable=False)
    evidence_text: Mapped[str | None] = mapped_column(Text)
    source_reference: Mapped[str | None] = mapped_column(String(255))
    confidence_level: Mapped[str] = mapped_column(String(50), default="unknown", nullable=False)
    information_kind: Mapped[str] = mapped_column(String(50), default="fact", nullable=False)
    is_ai_generated: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    document = relationship("KnowledgeDocument", back_populates="claims")
    document_chunk = relationship("DocumentChunk", back_populates="claims")
