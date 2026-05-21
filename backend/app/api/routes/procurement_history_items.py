from datetime import date
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import get_or_404
from app.models.procurement_history_item import ProcurementHistoryItem
from app.schemas.procurement_history_item import ProcurementHistoryItemRead

router = APIRouter()


@router.get("", response_model=list[ProcurementHistoryItemRead])
def list_procurement_history_items(
    skip: int = 0,
    limit: int = 100,
    company_id: UUID | None = None,
    category: str | None = None,
    item_name: str | None = None,
    country: str | None = None,
    supplier_name: str | None = None,
    purchased_from: date | None = None,
    purchased_to: date | None = None,
    db: Session = Depends(get_db),
) -> list[ProcurementHistoryItem]:
    query = select(ProcurementHistoryItem)
    if company_id:
        query = query.where(ProcurementHistoryItem.company_id == company_id)
    if category:
        query = query.where(ProcurementHistoryItem.category == category)
    if item_name:
        query = query.where(ProcurementHistoryItem.item_name.ilike(f"%{item_name}%"))
    if country:
        query = query.where(ProcurementHistoryItem.supplier_country == country)
    if supplier_name:
        query = query.where(ProcurementHistoryItem.supplier_name.ilike(f"%{supplier_name}%"))
    if purchased_from:
        query = query.where(ProcurementHistoryItem.purchased_at >= purchased_from)
    if purchased_to:
        query = query.where(ProcurementHistoryItem.purchased_at <= purchased_to)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{procurement_history_item_id}", response_model=ProcurementHistoryItemRead)
def get_procurement_history_item(
    procurement_history_item_id: UUID,
    db: Session = Depends(get_db),
) -> ProcurementHistoryItem:
    return get_or_404(db, ProcurementHistoryItem, procurement_history_item_id, "Procurement history item")
