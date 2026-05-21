from datetime import datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ConcessionItemBase(BaseModel):
    strategy_id: UUID
    title: str
    concession_type: str | None = None
    description: str | None = None
    value_to_us: str | None = None
    value_to_counterparty: str | None = None
    estimated_cost: Decimal | None = None
    currency: str | None = None
    give_condition: str | None = None
    required_counterpart: str | None = None
    sequence_order: int | None = None
    is_final_offer_item: bool = False
    risk_level: str | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class ConcessionItemCreate(ConcessionItemBase):
    pass


class ConcessionItemUpdate(BaseModel):
    strategy_id: UUID | None = None
    title: str | None = None
    concession_type: str | None = None
    description: str | None = None
    value_to_us: str | None = None
    value_to_counterparty: str | None = None
    estimated_cost: Decimal | None = None
    currency: str | None = None
    give_condition: str | None = None
    required_counterpart: str | None = None
    sequence_order: int | None = None
    is_final_offer_item: bool | None = None
    risk_level: str | None = None
    metadata_json: dict[str, Any] | None = None


class ConcessionItemRead(ConcessionItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
