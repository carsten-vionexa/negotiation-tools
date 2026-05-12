from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class StrategyBase(BaseModel):
    company_id: UUID
    negotiation_project_id: UUID
    title: str
    status: str = "draft"
    version: int = 1
    is_active: bool = True
    overall_objective: str | None = None
    target_outcome: str | None = None
    minimum_acceptable_outcome: str | None = None
    walk_away_point: str | None = None
    zopa_summary: str | None = None
    batna_summary: str | None = None
    concession_strategy: str | None = None
    argumentation_summary: str | None = None
    risk_assessment: str | None = None
    notes: str | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class StrategyCreate(StrategyBase):
    pass


class StrategyRead(StrategyBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
