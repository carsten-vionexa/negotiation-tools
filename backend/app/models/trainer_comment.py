from typing import Any
from uuid import UUID

from sqlalchemy import Boolean, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class TrainerComment(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "trainer_comments"

    simulation_scenario_id: Mapped[UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("simulation_scenarios.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    simulation_result_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("simulation_results.id", ondelete="SET NULL"),
        index=True,
    )
    simulation_message_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("simulation_messages.id", ondelete="SET NULL"),
        index=True,
    )
    trainer_user_profile_id: Mapped[UUID | None] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("user_profiles.id", ondelete="SET NULL"),
        index=True,
    )
    comment_type: Mapped[str | None] = mapped_column(String(100))
    comment_text: Mapped[str] = mapped_column(Text, nullable=False)
    related_competency: Mapped[str | None] = mapped_column(String(100))
    severity: Mapped[str | None] = mapped_column(String(50))
    is_visible_to_trainee: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    simulation_scenario = relationship("SimulationScenario", back_populates="trainer_comments")
    simulation_result = relationship("SimulationResult", back_populates="trainer_comments")
    simulation_message = relationship("SimulationMessage", back_populates="trainer_comments")
    trainer_user_profile = relationship("UserProfile", back_populates="trainer_comments")
