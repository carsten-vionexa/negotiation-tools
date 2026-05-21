from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class UserProfileBase(BaseModel):
    company_id: UUID
    display_name: str
    email: str | None = None
    role: str | None = None
    department: str | None = None
    notes: str | None = None
    profile_data: dict[str, Any] = Field(default_factory=dict)


class UserProfileCreate(UserProfileBase):
    pass


class UserProfileUpdate(BaseModel):
    company_id: UUID | None = None
    display_name: str | None = None
    email: str | None = None
    role: str | None = None
    department: str | None = None
    notes: str | None = None
    profile_data: dict[str, Any] | None = None


class UserProfileRead(UserProfileBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
