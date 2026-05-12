from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class SupplierProfileBase(BaseModel):
    company_id: UUID
    name: str
    country: str | None = None
    website: str | None = None
    contact_name: str | None = None
    contact_email: str | None = None
    relationship_status: str | None = None
    notes: str | None = None
    assumptions: dict[str, Any] = Field(default_factory=dict)
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class SupplierProfileCreate(SupplierProfileBase):
    pass


class SupplierProfileRead(SupplierProfileBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
