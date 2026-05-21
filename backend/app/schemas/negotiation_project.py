from datetime import datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class NegotiationProjectBase(BaseModel):
    company_id: UUID
    owner_id: UUID | None = None
    request_item_id: UUID | None = None
    supplier_profile_id: UUID | None = None
    title: str
    status: str = "draft"
    negotiation_type: str | None = None
    project_type: str | None = None
    category: str | None = None
    article_or_service: str | None = None
    quantity: Decimal | None = None
    target_region: str | None = None
    desired_delivery_time: str | None = None
    internal_price_expectation: Decimal | None = None
    currency: str | None = None
    current_supplier: str | None = None
    priority: str | None = None
    business_pressure: str | None = None
    technical_dependency_level: str | None = None
    supplier_power_level: str | None = None
    risk_level: str | None = None
    objective: str | None = None
    context: str | None = None
    strategy_data: dict[str, Any] = Field(default_factory=dict)
    simulation_data: dict[str, Any] = Field(default_factory=dict)
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class NegotiationProjectCreate(NegotiationProjectBase):
    pass


class NegotiationProjectUpdate(BaseModel):
    company_id: UUID | None = None
    owner_id: UUID | None = None
    request_item_id: UUID | None = None
    supplier_profile_id: UUID | None = None
    title: str | None = None
    status: str | None = None
    negotiation_type: str | None = None
    project_type: str | None = None
    category: str | None = None
    article_or_service: str | None = None
    quantity: Decimal | None = None
    target_region: str | None = None
    desired_delivery_time: str | None = None
    internal_price_expectation: Decimal | None = None
    currency: str | None = None
    current_supplier: str | None = None
    priority: str | None = None
    business_pressure: str | None = None
    technical_dependency_level: str | None = None
    supplier_power_level: str | None = None
    risk_level: str | None = None
    objective: str | None = None
    context: str | None = None
    strategy_data: dict[str, Any] | None = None
    simulation_data: dict[str, Any] | None = None
    metadata_json: dict[str, Any] | None = None


class NegotiationProjectRead(NegotiationProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
