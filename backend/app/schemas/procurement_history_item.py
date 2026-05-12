from datetime import date, datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ProcurementHistoryItemBase(BaseModel):
    company_id: UUID
    supplier_name: str | None = None
    supplier_country: str | None = None
    item_name: str
    category: str | None = None
    sku: str | None = None
    quantity: Decimal | None = None
    unit: str | None = None
    unit_price: Decimal | None = None
    currency: str | None = None
    lead_time_weeks: Decimal | None = None
    quality_rating: str | None = None
    price_assessment: str | None = None
    improvement_potential: str | None = None
    purchased_at: date | None = None
    source_document: str | None = None
    notes: str | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class ProcurementHistoryItemCreate(ProcurementHistoryItemBase):
    pass


class ProcurementHistoryItemRead(ProcurementHistoryItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
