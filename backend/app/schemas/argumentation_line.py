from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ArgumentationLineBase(BaseModel):
    strategy_id: UUID
    title: str
    argument_type: str | None = None
    claim: str | None = None
    evidence: str | None = None
    source_reference: str | None = None
    expected_counterargument: str | None = None
    response_strategy: str | None = None
    priority: str | None = None
    confidence_level: str | None = None
    information_kind: str | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class ArgumentationLineCreate(ArgumentationLineBase):
    pass


class ArgumentationLineUpdate(BaseModel):
    strategy_id: UUID | None = None
    title: str | None = None
    argument_type: str | None = None
    claim: str | None = None
    evidence: str | None = None
    source_reference: str | None = None
    expected_counterargument: str | None = None
    response_strategy: str | None = None
    priority: str | None = None
    confidence_level: str | None = None
    information_kind: str | None = None
    metadata_json: dict[str, Any] | None = None


class ArgumentationLineRead(ArgumentationLineBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
