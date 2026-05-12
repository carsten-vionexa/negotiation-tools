from datetime import datetime
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
    objective: str | None = None
    context: str | None = None
    strategy_data: dict[str, Any] = Field(default_factory=dict)
    simulation_data: dict[str, Any] = Field(default_factory=dict)
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class NegotiationProjectCreate(NegotiationProjectBase):
    pass


class NegotiationProjectRead(NegotiationProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
