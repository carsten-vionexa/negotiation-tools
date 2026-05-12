from decimal import Decimal
from typing import Any
from uuid import UUID

from sqlalchemy import ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class SimulationResult(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "simulation_results"

    simulation_scenario_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("simulation_scenarios.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    user_profile_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("user_profiles.id", ondelete="SET NULL"),
        index=True,
    )
    status: Mapped[str] = mapped_column(String(50), default="draft", nullable=False, index=True)
    summary: Mapped[str | None] = mapped_column(Text)
    outcome: Mapped[str | None] = mapped_column(String(100))
    objective_achievement: Mapped[str | None] = mapped_column(String(100))
    agreed_terms: Mapped[str | None] = mapped_column(Text)
    missed_opportunities: Mapped[str | None] = mapped_column(Text)
    key_learning_points: Mapped[str | None] = mapped_column(Text)
    recommended_next_steps: Mapped[str | None] = mapped_column(Text)
    score_overall: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    score_preparation: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    score_strategy: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    score_questioning: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    score_argumentation: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    score_concession_management: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    score_pressure_handling: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    score_relationship_management: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    score_cultural_awareness: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    score_closing: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    feedback_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    simulation_scenario = relationship("SimulationScenario", back_populates="results")
    user_profile = relationship("UserProfile", back_populates="simulation_results")
    trainer_comments = relationship("TrainerComment", back_populates="simulation_result")
