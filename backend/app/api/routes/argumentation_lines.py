from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import apply_partial_update, ensure_reference_exists, get_or_404
from app.models.argumentation_line import ArgumentationLine
from app.models.strategy import Strategy
from app.schemas.argumentation_line import (
    ArgumentationLineCreate,
    ArgumentationLineRead,
    ArgumentationLineUpdate,
)

router = APIRouter()


@router.get("", response_model=list[ArgumentationLineRead])
def list_argumentation_lines(
    skip: int = 0,
    limit: int = 100,
    strategy_id: UUID | None = None,
    argument_type: str | None = None,
    priority: str | None = None,
    information_kind: str | None = None,
    db: Session = Depends(get_db),
) -> list[ArgumentationLine]:
    query = select(ArgumentationLine)
    if strategy_id:
        query = query.where(ArgumentationLine.strategy_id == strategy_id)
    if argument_type:
        query = query.where(ArgumentationLine.argument_type == argument_type)
    if priority:
        query = query.where(ArgumentationLine.priority == priority)
    if information_kind:
        query = query.where(ArgumentationLine.information_kind == information_kind)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{argumentation_line_id}", response_model=ArgumentationLineRead)
def get_argumentation_line(
    argumentation_line_id: UUID,
    db: Session = Depends(get_db),
) -> ArgumentationLine:
    return get_or_404(db, ArgumentationLine, argumentation_line_id, "Argumentation line")


@router.post("", response_model=ArgumentationLineRead, status_code=status.HTTP_201_CREATED)
def create_argumentation_line(
    payload: ArgumentationLineCreate,
    db: Session = Depends(get_db),
) -> ArgumentationLine:
    ensure_reference_exists(db, Strategy, payload.strategy_id, "Strategy")

    argumentation_line = ArgumentationLine(**payload.model_dump())
    db.add(argumentation_line)
    db.commit()
    db.refresh(argumentation_line)
    return argumentation_line


@router.patch("/{argumentation_line_id}", response_model=ArgumentationLineRead)
def update_argumentation_line(
    argumentation_line_id: UUID,
    payload: ArgumentationLineUpdate,
    db: Session = Depends(get_db),
) -> ArgumentationLine:
    argumentation_line = get_or_404(db, ArgumentationLine, argumentation_line_id, "Argumentation line")
    updates = payload.model_dump(exclude_unset=True)
    if "strategy_id" in updates and updates["strategy_id"] is not None:
        ensure_reference_exists(db, Strategy, updates["strategy_id"], "Strategy")

    apply_partial_update(argumentation_line, updates, {"strategy_id", "title", "metadata_json"})
    db.commit()
    db.refresh(argumentation_line)
    return argumentation_line
