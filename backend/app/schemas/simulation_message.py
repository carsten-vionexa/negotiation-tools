from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class SimulationMessageBase(BaseModel):
    simulation_scenario_id: UUID
    user_profile_id: UUID | None = None
    sequence_number: int
    sender_type: str
    sender_name: str | None = None
    role_in_simulation: str | None = None
    message_text: str
    message_type: str | None = None
    phase: str | None = None
    detected_tactics_json: dict[str, Any] = Field(default_factory=dict)
    analysis_json: dict[str, Any] = Field(default_factory=dict)
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class SimulationMessageCreate(SimulationMessageBase):
    pass


class SimulationMessageRead(SimulationMessageBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
