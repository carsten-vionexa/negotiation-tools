from datetime import datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class SimulationResultBase(BaseModel):
    simulation_scenario_id: UUID
    user_profile_id: UUID | None = None
    status: str = "draft"
    summary: str | None = None
    outcome: str | None = None
    objective_achievement: str | None = None
    agreed_terms: str | None = None
    missed_opportunities: str | None = None
    key_learning_points: str | None = None
    recommended_next_steps: str | None = None
    score_overall: Decimal | None = None
    score_preparation: Decimal | None = None
    score_strategy: Decimal | None = None
    score_questioning: Decimal | None = None
    score_argumentation: Decimal | None = None
    score_concession_management: Decimal | None = None
    score_pressure_handling: Decimal | None = None
    score_relationship_management: Decimal | None = None
    score_cultural_awareness: Decimal | None = None
    score_closing: Decimal | None = None
    feedback_json: dict[str, Any] = Field(default_factory=dict)
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class SimulationResultCreate(SimulationResultBase):
    pass


class SimulationResultRead(SimulationResultBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
