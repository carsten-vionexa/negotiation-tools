from typing import Any
from uuid import UUID

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class Strategy(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "strategies"

    company_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("companies.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    negotiation_project_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("negotiation_projects.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="draft", nullable=False, index=True)
    version: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    overall_objective: Mapped[str | None] = mapped_column(Text)
    target_outcome: Mapped[str | None] = mapped_column(Text)
    minimum_acceptable_outcome: Mapped[str | None] = mapped_column(Text)
    walk_away_point: Mapped[str | None] = mapped_column(Text)
    zopa_summary: Mapped[str | None] = mapped_column(Text)
    batna_summary: Mapped[str | None] = mapped_column(Text)
    concession_strategy: Mapped[str | None] = mapped_column(Text)
    argumentation_summary: Mapped[str | None] = mapped_column(Text)
    risk_assessment: Mapped[str | None] = mapped_column(Text)
    notes: Mapped[str | None] = mapped_column(Text)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    company = relationship("Company", back_populates="strategies")
    negotiation_project = relationship("NegotiationProject", back_populates="strategies")
    zopa_items = relationship("ZopaItem", back_populates="strategy", cascade="all, delete-orphan")
    batna_options = relationship("BatnaOption", back_populates="strategy", cascade="all, delete-orphan")
    concession_items = relationship("ConcessionItem", back_populates="strategy", cascade="all, delete-orphan")
    argumentation_lines = relationship(
        "ArgumentationLine",
        back_populates="strategy",
        cascade="all, delete-orphan",
    )
