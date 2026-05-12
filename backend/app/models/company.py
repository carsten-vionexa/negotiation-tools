from typing import Any

from sqlalchemy import String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class Company(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "companies"

    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    legal_name: Mapped[str | None] = mapped_column(String(255))
    industry: Mapped[str | None] = mapped_column(String(150))
    website: Mapped[str | None] = mapped_column(String(255))
    country: Mapped[str | None] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(Text)
    profile_data: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    user_profiles = relationship("UserProfile", back_populates="company", cascade="all, delete-orphan")
    knowledge_documents = relationship("KnowledgeDocument", back_populates="company", cascade="all, delete-orphan")
    import_jobs = relationship("ImportJob", back_populates="company", cascade="all, delete-orphan")
    import_rows = relationship("ImportRow", back_populates="company", cascade="all, delete-orphan")
    procurement_history_items = relationship(
        "ProcurementHistoryItem",
        back_populates="company",
        cascade="all, delete-orphan",
    )
    request_items = relationship("RequestItem", back_populates="company", cascade="all, delete-orphan")
    supplier_profiles = relationship("SupplierProfile", back_populates="company", cascade="all, delete-orphan")
    negotiation_projects = relationship("NegotiationProject", back_populates="company", cascade="all, delete-orphan")
