from datetime import date, datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class RequestItemBase(BaseModel):
    company_id: UUID
    title: str
    category: str | None = None
    specification: str | None = None
    requested_quantity: Decimal | None = None
    unit: str | None = None
    target_price: Decimal | None = None
    currency: str | None = None
    required_delivery_date: date | None = None
    priority: str | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class RequestItemCreate(RequestItemBase):
    pass


class RequestItemRead(RequestItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
