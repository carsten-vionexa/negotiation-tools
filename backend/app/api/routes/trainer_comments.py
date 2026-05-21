from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import (
    apply_partial_update,
    ensure_non_null_updates,
    ensure_optional_reference_exists,
    ensure_optional_same_company,
    ensure_reference_exists,
    get_or_404,
)
from app.models.simulation_message import SimulationMessage
from app.models.simulation_result import SimulationResult
from app.models.simulation_scenario import SimulationScenario
from app.models.trainer_comment import TrainerComment
from app.models.user_profile import UserProfile
from app.schemas.trainer_comment import TrainerCommentCreate, TrainerCommentRead, TrainerCommentUpdate

router = APIRouter()


def ensure_belongs_to_simulation_scenario(entity: object | None, simulation_scenario_id: UUID, label: str) -> None:
    if entity is None:
        return
    if getattr(entity, "simulation_scenario_id", None) != simulation_scenario_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{label} does not belong to simulation scenario",
        )


@router.get("", response_model=list[TrainerCommentRead])
def list_trainer_comments(
    skip: int = 0,
    limit: int = 100,
    simulation_scenario_id: UUID | None = None,
    simulation_result_id: UUID | None = None,
    simulation_message_id: UUID | None = None,
    trainer_user_profile_id: UUID | None = None,
    comment_type: str | None = None,
    severity: str | None = None,
    is_visible_to_trainee: bool | None = None,
    db: Session = Depends(get_db),
) -> list[TrainerComment]:
    query = select(TrainerComment)
    if simulation_scenario_id:
        query = query.where(TrainerComment.simulation_scenario_id == simulation_scenario_id)
    if simulation_result_id:
        query = query.where(TrainerComment.simulation_result_id == simulation_result_id)
    if simulation_message_id:
        query = query.where(TrainerComment.simulation_message_id == simulation_message_id)
    if trainer_user_profile_id:
        query = query.where(TrainerComment.trainer_user_profile_id == trainer_user_profile_id)
    if comment_type:
        query = query.where(TrainerComment.comment_type == comment_type)
    if severity:
        query = query.where(TrainerComment.severity == severity)
    if is_visible_to_trainee is not None:
        query = query.where(TrainerComment.is_visible_to_trainee == is_visible_to_trainee)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{trainer_comment_id}", response_model=TrainerCommentRead)
def get_trainer_comment(trainer_comment_id: UUID, db: Session = Depends(get_db)) -> TrainerComment:
    return get_or_404(db, TrainerComment, trainer_comment_id, "Trainer comment")


@router.post("", response_model=TrainerCommentRead, status_code=status.HTTP_201_CREATED)
def create_trainer_comment(payload: TrainerCommentCreate, db: Session = Depends(get_db)) -> TrainerComment:
    simulation_scenario = ensure_reference_exists(
        db,
        SimulationScenario,
        payload.simulation_scenario_id,
        "Simulation scenario",
    )

    simulation_result = ensure_optional_reference_exists(
        db,
        SimulationResult,
        payload.simulation_result_id,
        "Simulation result",
    )
    ensure_belongs_to_simulation_scenario(simulation_result, payload.simulation_scenario_id, "Simulation result")

    simulation_message = ensure_optional_reference_exists(
        db,
        SimulationMessage,
        payload.simulation_message_id,
        "Simulation message",
    )
    ensure_belongs_to_simulation_scenario(simulation_message, payload.simulation_scenario_id, "Simulation message")

    trainer_user_profile = ensure_optional_reference_exists(
        db,
        UserProfile,
        payload.trainer_user_profile_id,
        "Trainer user profile",
    )
    ensure_optional_same_company(trainer_user_profile, simulation_scenario.company_id, "Trainer user profile")

    trainer_comment = TrainerComment(**payload.model_dump())
    db.add(trainer_comment)
    db.commit()
    db.refresh(trainer_comment)
    return trainer_comment


@router.patch("/{trainer_comment_id}", response_model=TrainerCommentRead)
def update_trainer_comment(
    trainer_comment_id: UUID,
    payload: TrainerCommentUpdate,
    db: Session = Depends(get_db),
) -> TrainerComment:
    trainer_comment = get_or_404(db, TrainerComment, trainer_comment_id, "Trainer comment")
    updates = payload.model_dump(exclude_unset=True)
    non_nullable_fields = {
        "simulation_scenario_id",
        "comment_text",
        "is_visible_to_trainee",
        "metadata_json",
    }
    ensure_non_null_updates(updates, non_nullable_fields)

    simulation_scenario_id = updates.get("simulation_scenario_id", trainer_comment.simulation_scenario_id)
    simulation_scenario = ensure_reference_exists(
        db,
        SimulationScenario,
        simulation_scenario_id,
        "Simulation scenario",
    )

    simulation_result_id = updates.get("simulation_result_id", trainer_comment.simulation_result_id)
    simulation_result = ensure_optional_reference_exists(
        db,
        SimulationResult,
        simulation_result_id,
        "Simulation result",
    )
    ensure_belongs_to_simulation_scenario(simulation_result, simulation_scenario_id, "Simulation result")

    simulation_message_id = updates.get("simulation_message_id", trainer_comment.simulation_message_id)
    simulation_message = ensure_optional_reference_exists(
        db,
        SimulationMessage,
        simulation_message_id,
        "Simulation message",
    )
    ensure_belongs_to_simulation_scenario(simulation_message, simulation_scenario_id, "Simulation message")

    trainer_user_profile_id = updates.get("trainer_user_profile_id", trainer_comment.trainer_user_profile_id)
    trainer_user_profile = ensure_optional_reference_exists(
        db,
        UserProfile,
        trainer_user_profile_id,
        "Trainer user profile",
    )
    ensure_optional_same_company(trainer_user_profile, simulation_scenario.company_id, "Trainer user profile")

    apply_partial_update(trainer_comment, updates, non_nullable_fields)
    db.commit()
    db.refresh(trainer_comment)
    return trainer_comment
