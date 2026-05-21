from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import apply_partial_update, ensure_reference_exists, get_or_404
from app.models.batna_option import BatnaOption
from app.models.strategy import Strategy
from app.schemas.batna_option import BatnaOptionCreate, BatnaOptionRead, BatnaOptionUpdate

router = APIRouter()


@router.get("", response_model=list[BatnaOptionRead])
def list_batna_options(
    skip: int = 0,
    limit: int = 100,
    strategy_id: UUID | None = None,
    option_type: str | None = None,
    feasibility_level: str | None = None,
    risk_level: str | None = None,
    ranking: int | None = None,
    db: Session = Depends(get_db),
) -> list[BatnaOption]:
    query = select(BatnaOption)
    if strategy_id:
        query = query.where(BatnaOption.strategy_id == strategy_id)
    if option_type:
        query = query.where(BatnaOption.batna_type == option_type)
    if feasibility_level:
        query = query.where(BatnaOption.feasibility_level == feasibility_level)
    if risk_level:
        query = query.where(BatnaOption.risk_level == risk_level)
    if ranking is not None:
        query = query.where(BatnaOption.ranking == ranking)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{batna_option_id}", response_model=BatnaOptionRead)
def get_batna_option(batna_option_id: UUID, db: Session = Depends(get_db)) -> BatnaOption:
    return get_or_404(db, BatnaOption, batna_option_id, "BATNA option")


@router.post("", response_model=BatnaOptionRead, status_code=status.HTTP_201_CREATED)
def create_batna_option(payload: BatnaOptionCreate, db: Session = Depends(get_db)) -> BatnaOption:
    ensure_reference_exists(db, Strategy, payload.strategy_id, "Strategy")

    batna_option = BatnaOption(**payload.model_dump())
    db.add(batna_option)
    db.commit()
    db.refresh(batna_option)
    return batna_option


@router.patch("/{batna_option_id}", response_model=BatnaOptionRead)
def update_batna_option(
    batna_option_id: UUID,
    payload: BatnaOptionUpdate,
    db: Session = Depends(get_db),
) -> BatnaOption:
    batna_option = get_or_404(db, BatnaOption, batna_option_id, "BATNA option")
    updates = payload.model_dump(exclude_unset=True)
    if "strategy_id" in updates and updates["strategy_id"] is not None:
        ensure_reference_exists(db, Strategy, updates["strategy_id"], "Strategy")

    apply_partial_update(batna_option, updates, {"strategy_id", "title", "is_preferred", "metadata_json"})
    db.commit()
    db.refresh(batna_option)
    return batna_option
