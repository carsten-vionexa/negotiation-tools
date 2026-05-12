from typing import Any
from uuid import UUID

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class SimulationMessage(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "simulation_messages"

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
    sequence_number: Mapped[int] = mapped_column(Integer, nullable=False)
    sender_type: Mapped[str] = mapped_column(String(50), nullable=False)
    sender_name: Mapped[str | None] = mapped_column(String(255))
    role_in_simulation: Mapped[str | None] = mapped_column(String(100))
    message_text: Mapped[str] = mapped_column(Text, nullable=False)
    message_type: Mapped[str | None] = mapped_column(String(50))
    phase: Mapped[str | None] = mapped_column(String(100))
    detected_tactics_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    analysis_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)
    metadata_json: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict, nullable=False)

    simulation_scenario = relationship("SimulationScenario", back_populates="messages")
    user_profile = relationship("UserProfile", back_populates="simulation_messages")
    trainer_comments = relationship("TrainerComment", back_populates="simulation_message")
