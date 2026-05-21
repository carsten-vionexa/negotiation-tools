from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import apply_partial_update, ensure_reference_exists, get_or_404
from app.models.strategy import Strategy
from app.models.zopa_item import ZopaItem
from app.schemas.zopa_item import ZopaItemCreate, ZopaItemRead, ZopaItemUpdate

router = APIRouter()


@router.get("", response_model=list[ZopaItemRead])
def list_zopa_items(
    skip: int = 0,
    limit: int = 100,
    strategy_id: UUID | None = None,
    dimension: str | None = None,
    priority: str | None = None,
    information_kind: str | None = None,
    db: Session = Depends(get_db),
) -> list[ZopaItem]:
    query = select(ZopaItem)
    if strategy_id:
        query = query.where(ZopaItem.strategy_id == strategy_id)
    if dimension:
        query = query.where(ZopaItem.dimension == dimension)
    if priority:
        query = query.where(ZopaItem.priority == priority)
    if information_kind:
        query = query.where(ZopaItem.information_kind == information_kind)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{zopa_item_id}", response_model=ZopaItemRead)
def get_zopa_item(zopa_item_id: UUID, db: Session = Depends(get_db)) -> ZopaItem:
    return get_or_404(db, ZopaItem, zopa_item_id, "ZOPA item")


@router.post("", response_model=ZopaItemRead, status_code=status.HTTP_201_CREATED)
def create_zopa_item(payload: ZopaItemCreate, db: Session = Depends(get_db)) -> ZopaItem:
    ensure_reference_exists(db, Strategy, payload.strategy_id, "Strategy")

    zopa_item = ZopaItem(**payload.model_dump())
    db.add(zopa_item)
    db.commit()
    db.refresh(zopa_item)
    return zopa_item


@router.patch("/{zopa_item_id}", response_model=ZopaItemRead)
def update_zopa_item(zopa_item_id: UUID, payload: ZopaItemUpdate, db: Session = Depends(get_db)) -> ZopaItem:
    zopa_item = get_or_404(db, ZopaItem, zopa_item_id, "ZOPA item")
    updates = payload.model_dump(exclude_unset=True)
    if "strategy_id" in updates and updates["strategy_id"] is not None:
        ensure_reference_exists(db, Strategy, updates["strategy_id"], "Strategy")

    apply_partial_update(zopa_item, updates, {"strategy_id", "metadata_json"})
    db.commit()
    db.refresh(zopa_item)
    return zopa_item
