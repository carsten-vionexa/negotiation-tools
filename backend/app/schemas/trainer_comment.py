from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class TrainerCommentBase(BaseModel):
    simulation_scenario_id: UUID
    simulation_result_id: UUID | None = None
    simulation_message_id: UUID | None = None
    trainer_user_profile_id: UUID | None = None
    comment_type: str | None = None
    comment_text: str
    related_competency: str | None = None
    severity: str | None = None
    is_visible_to_trainee: bool = True
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class TrainerCommentCreate(TrainerCommentBase):
    pass


class TrainerCommentRead(TrainerCommentBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime
