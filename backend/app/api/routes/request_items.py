from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.request_item import RequestItem
from app.schemas.request_item import RequestItemCreate, RequestItemRead

router = APIRouter()


@router.get("", response_model=list[RequestItemRead])
def list_request_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[RequestItem]:
    return list(db.scalars(select(RequestItem).offset(skip).limit(limit)).all())


@router.get("/{request_item_id}", response_model=RequestItemRead)
def get_request_item(request_item_id: UUID, db: Session = Depends(get_db)) -> RequestItem:
    request_item = db.get(RequestItem, request_item_id)
    if request_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Request item not found")
    return request_item


@router.post("", response_model=RequestItemRead, status_code=status.HTTP_201_CREATED)
def create_request_item(payload: RequestItemCreate, db: Session = Depends(get_db)) -> RequestItem:
    request_item = RequestItem(**payload.model_dump())
    db.add(request_item)
    db.commit()
    db.refresh(request_item)
    return request_item
