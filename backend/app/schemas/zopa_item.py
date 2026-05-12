from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ZopaItemBase(BaseModel):
    strategy_id: UUID
    dimension: str | None = None
    description: str | None = None
    buyer_target_value: str | None = None
    buyer_walk_away_value: str | None = None
    supplier_expected_target_value: str | None = None
    supplier_estimated_walk_away_value: str | None = None
    possible_agreement_range: str | None = None
    currency: str | None = None
    unit: str | None = None
    priority: str | None = None
    confidence_level: str | None = None
    information_kind: str | None = None
    source_reference: str | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class ZopaItemCreate(ZopaItemBase):
    pass


class ZopaItemRead(ZopaItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
