from datetime import datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class BatnaOptionBase(BaseModel):
    strategy_id: UUID
    title: str
    batna_type: str | None = None
    description: str | None = None
    feasibility_level: str | None = None
    estimated_cost: Decimal | None = None
    currency: str | None = None
    estimated_lead_time: str | None = None
    risk_level: str | None = None
    impact_assessment: str | None = None
    required_actions: str | None = None
    is_preferred: bool = False
    ranking: int | None = None
    confidence_level: str | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class BatnaOptionCreate(BatnaOptionBase):
    pass


class BatnaOptionRead(BatnaOptionBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
