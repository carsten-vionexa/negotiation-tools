from typing import Any
from uuid import UUID

from sqlalchemy import Boolean, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class SupplierProfile(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "supplier_profiles"

    company_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("companies.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    country: Mapped[str | None] = mapped_column(String(100))
    region: Mapped[str | None] = mapped_column(String(150))
    industry: Mapped[str | None] = mapped_column(String(150))
    supplier_type: Mapped[str | None] = mapped_column(String(100))
    power_level: Mapped[str | None] = mapped_column(String(100))
    risk_level: Mapped[str | None] = mapped_column(String(100))
    website: Mapped[str | None] = mapped_column(String(255))
    contact_name: Mapped[str | None] = mapped_column(String(255))
    contact_email: Mapped[str | None] = mapped_column(String(255))
    relationship_status: Mapped[str | None] = mapped_column(String(100))
    cultural_context: Mapped[str | None] = mapped_column(Text)
    notes: Mapped[str | None] = mapped_column(Text)
    assumptions: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    interests_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    likely_tactics_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    constraints_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    is_ai_generated: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    confidence_level: Mapped[str] = mapped_column(String(50), default="unknown", nullable=False)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    company = relationship("Company", back_populates="supplier_profiles")
    negotiation_projects = relationship("NegotiationProject", back_populates="supplier")
    simulation_scenarios = relationship("SimulationScenario", back_populates="supplier_profile")
