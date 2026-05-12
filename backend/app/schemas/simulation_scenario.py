from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class SimulationScenarioBase(BaseModel):
    company_id: UUID
    negotiation_project_id: UUID
    strategy_id: UUID | None = None
    supplier_profile_id: UUID | None = None
    user_profile_id: UUID | None = None
    title: str
    status: str = "draft"
    scenario_type: str | None = None
    ai_role: str | None = None
    counterparty_name: str | None = None
    counterparty_role: str | None = None
    country_or_region: str | None = None
    cultural_context: str | None = None
    difficulty_level: str | None = None
    communication_style: str | None = None
    negotiation_phase: str | None = None
    training_goal: str | None = None
    scenario_brief: str | None = None
    success_criteria: str | None = None
    time_limit_minutes: int | None = None
    language: str | None = None
    started_at: datetime | None = None
    completed_at: datetime | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class SimulationScenarioCreate(SimulationScenarioBase):
    pass


class SimulationScenarioRead(SimulationScenarioBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
