from datetime import datetime
from typing import Any
from uuid import UUID

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class SimulationScenario(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "simulation_scenarios"

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
    strategy_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("strategies.id", ondelete="SET NULL"),
        index=True,
    )
    supplier_profile_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("supplier_profiles.id", ondelete="SET NULL"),
        index=True,
    )
    user_profile_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("user_profiles.id", ondelete="SET NULL"),
        index=True,
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="draft", nullable=False, index=True)
    scenario_type: Mapped[str | None] = mapped_column(String(100))
    ai_role: Mapped[str | None] = mapped_column(String(100))
    counterparty_name: Mapped[str | None] = mapped_column(String(255))
    counterparty_role: Mapped[str | None] = mapped_column(String(150))
    country_or_region: Mapped[str | None] = mapped_column(String(150))
    cultural_context: Mapped[str | None] = mapped_column(Text)
    difficulty_level: Mapped[str | None] = mapped_column(String(50))
    communication_style: Mapped[str | None] = mapped_column(String(100))
    negotiation_phase: Mapped[str | None] = mapped_column(String(100))
    training_goal: Mapped[str | None] = mapped_column(Text)
    scenario_brief: Mapped[str | None] = mapped_column(Text)
    success_criteria: Mapped[str | None] = mapped_column(Text)
    time_limit_minutes: Mapped[int | None] = mapped_column(Integer)
    language: Mapped[str | None] = mapped_column(String(20))
    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    company = relationship("Company", back_populates="simulation_scenarios")
    negotiation_project = relationship("NegotiationProject", back_populates="simulation_scenarios")
    strategy = relationship("Strategy", back_populates="simulation_scenarios")
    supplier_profile = relationship("SupplierProfile", back_populates="simulation_scenarios")
    user_profile = relationship("UserProfile", back_populates="simulation_scenarios")
    messages = relationship("SimulationMessage", back_populates="simulation_scenario", cascade="all, delete-orphan")
    results = relationship("SimulationResult", back_populates="simulation_scenario", cascade="all, delete-orphan")
    trainer_comments = relationship("TrainerComment", back_populates="simulation_scenario", cascade="all, delete-orphan")
