from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import apply_partial_update, ensure_reference_exists, get_or_404
from app.models.concession_item import ConcessionItem
from app.models.strategy import Strategy
from app.schemas.concession_item import ConcessionItemCreate, ConcessionItemRead, ConcessionItemUpdate

router = APIRouter()


@router.get("", response_model=list[ConcessionItemRead])
def list_concession_items(
    skip: int = 0,
    limit: int = 100,
    strategy_id: UUID | None = None,
    concession_type: str | None = None,
    concession_order: int | None = None,
    is_final_offer_item: bool | None = None,
    risk_level: str | None = None,
    db: Session = Depends(get_db),
) -> list[ConcessionItem]:
    query = select(ConcessionItem)
    if strategy_id:
        query = query.where(ConcessionItem.strategy_id == strategy_id)
    if concession_type:
        query = query.where(ConcessionItem.concession_type == concession_type)
    if concession_order is not None:
        query = query.where(ConcessionItem.sequence_order == concession_order)
    if is_final_offer_item is not None:
        query = query.where(ConcessionItem.is_final_offer_item == is_final_offer_item)
    if risk_level:
        query = query.where(ConcessionItem.risk_level == risk_level)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{concession_item_id}", response_model=ConcessionItemRead)
def get_concession_item(concession_item_id: UUID, db: Session = Depends(get_db)) -> ConcessionItem:
    return get_or_404(db, ConcessionItem, concession_item_id, "Concession item")


@router.post("", response_model=ConcessionItemRead, status_code=status.HTTP_201_CREATED)
def create_concession_item(payload: ConcessionItemCreate, db: Session = Depends(get_db)) -> ConcessionItem:
    ensure_reference_exists(db, Strategy, payload.strategy_id, "Strategy")

    concession_item = ConcessionItem(**payload.model_dump())
    db.add(concession_item)
    db.commit()
    db.refresh(concession_item)
    return concession_item


@router.patch("/{concession_item_id}", response_model=ConcessionItemRead)
def update_concession_item(
    concession_item_id: UUID,
    payload: ConcessionItemUpdate,
    db: Session = Depends(get_db),
) -> ConcessionItem:
    concession_item = get_or_404(db, ConcessionItem, concession_item_id, "Concession item")
    updates = payload.model_dump(exclude_unset=True)
    if "strategy_id" in updates and updates["strategy_id"] is not None:
        ensure_reference_exists(db, Strategy, updates["strategy_id"], "Strategy")

    apply_partial_update(
        concession_item,
        updates,
        {"strategy_id", "title", "is_final_offer_item", "metadata_json"},
    )
    db.commit()
    db.refresh(concession_item)
    return concession_item
