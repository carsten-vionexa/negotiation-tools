from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class SupplierProfileBase(BaseModel):
    company_id: UUID
    name: str
    country: str | None = None
    region: str | None = None
    industry: str | None = None
    supplier_type: str | None = None
    power_level: str | None = None
    risk_level: str | None = None
    website: str | None = None
    contact_name: str | None = None
    contact_email: str | None = None
    relationship_status: str | None = None
    cultural_context: str | None = None
    notes: str | None = None
    assumptions: dict[str, Any] = Field(default_factory=dict)
    interests_json: dict[str, Any] = Field(default_factory=dict)
    likely_tactics_json: dict[str, Any] = Field(default_factory=dict)
    constraints_json: dict[str, Any] = Field(default_factory=dict)
    is_ai_generated: bool = False
    confidence_level: str = "unknown"
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class SupplierProfileCreate(SupplierProfileBase):
    pass


class SupplierProfileUpdate(BaseModel):
    company_id: UUID | None = None
    name: str | None = None
    country: str | None = None
    region: str | None = None
    industry: str | None = None
    supplier_type: str | None = None
    power_level: str | None = None
    risk_level: str | None = None
    website: str | None = None
    contact_name: str | None = None
    contact_email: str | None = None
    relationship_status: str | None = None
    cultural_context: str | None = None
    notes: str | None = None
    assumptions: dict[str, Any] | None = None
    interests_json: dict[str, Any] | None = None
    likely_tactics_json: dict[str, Any] | None = None
    constraints_json: dict[str, Any] | None = None
    is_ai_generated: bool | None = None
    confidence_level: str | None = None
    metadata_json: dict[str, Any] | None = None


class SupplierProfileRead(SupplierProfileBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
