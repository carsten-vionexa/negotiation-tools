from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import apply_partial_update, ensure_reference_exists, get_or_404
from app.models.company import Company
from app.models.request_item import RequestItem
from app.schemas.request_item import RequestItemCreate, RequestItemRead, RequestItemUpdate

router = APIRouter()


@router.get("", response_model=list[RequestItemRead])
def list_request_items(
    skip: int = 0,
    limit: int = 100,
    company_id: UUID | None = None,
    category: str | None = None,
    status: str | None = None,
    priority: str | None = None,
    db: Session = Depends(get_db),
) -> list[RequestItem]:
    query = select(RequestItem)
    if company_id:
        query = query.where(RequestItem.company_id == company_id)
    if category:
        query = query.where(RequestItem.category == category)
    if status:
        query = query.where(RequestItem.status == status)
    if priority:
        query = query.where(RequestItem.priority == priority)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{request_item_id}", response_model=RequestItemRead)
def get_request_item(request_item_id: UUID, db: Session = Depends(get_db)) -> RequestItem:
    return get_or_404(db, RequestItem, request_item_id, "Request item")


@router.post("", response_model=RequestItemRead, status_code=status.HTTP_201_CREATED)
def create_request_item(payload: RequestItemCreate, db: Session = Depends(get_db)) -> RequestItem:
    ensure_reference_exists(db, Company, payload.company_id, "Company")

    request_item = RequestItem(**payload.model_dump())
    db.add(request_item)
    db.commit()
    db.refresh(request_item)
    return request_item


@router.patch("/{request_item_id}", response_model=RequestItemRead)
def update_request_item(
    request_item_id: UUID,
    payload: RequestItemUpdate,
    db: Session = Depends(get_db),
) -> RequestItem:
    request_item = get_or_404(db, RequestItem, request_item_id, "Request item")
    updates = payload.model_dump(exclude_unset=True)
    if "company_id" in updates and updates["company_id"] is not None:
        ensure_reference_exists(db, Company, updates["company_id"], "Company")
    apply_partial_update(request_item, updates, {"company_id", "title", "status", "metadata_json"})
    db.commit()
    db.refresh(request_item)
    return request_item
