from datetime import date
from typing import Any
from uuid import UUID

from pgvector.sqlalchemy import Vector
from sqlalchemy import Date, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class KnowledgeDocument(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "knowledge_documents"

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
    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    title: Mapped[str | None] = mapped_column(String(255))
    document_type: Mapped[str | None] = mapped_column(String(100), index=True)
    mime_type: Mapped[str | None] = mapped_column(String(150))
    storage_path: Mapped[str] = mapped_column(String(500), nullable=False)
    source: Mapped[str | None] = mapped_column(String(255))
    source_name: Mapped[str | None] = mapped_column(String(255))
    author: Mapped[str | None] = mapped_column(String(255))
    source_author: Mapped[str | None] = mapped_column(String(255))
    source_date: Mapped[date | None] = mapped_column(Date)
    reliability_level: Mapped[str] = mapped_column(String(50), default="unknown", nullable=False)
    confidentiality_level: Mapped[str] = mapped_column(String(50), default="internal", nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    parsing_status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False)
    content_text: Mapped[str | None] = mapped_column(Text)
    chunk_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    embedding: Mapped[list[float] | None] = mapped_column(Vector(1536))

    company = relationship("Company", back_populates="knowledge_documents")
    project = relationship("NegotiationProject", back_populates="knowledge_documents")
