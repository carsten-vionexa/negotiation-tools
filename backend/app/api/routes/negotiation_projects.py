from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import (
    ensure_exists,
    ensure_optional_exists,
    ensure_optional_same_company,
)
from app.models.company import Company
from app.models.negotiation_project import NegotiationProject
from app.models.request_item import RequestItem
from app.models.supplier_profile import SupplierProfile
from app.models.user_profile import UserProfile
from app.schemas.negotiation_project import NegotiationProjectCreate, NegotiationProjectRead

router = APIRouter()


@router.get("", response_model=list[NegotiationProjectRead])
def list_negotiation_projects(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
) -> list[NegotiationProject]:
    return list(db.scalars(select(NegotiationProject).offset(skip).limit(limit)).all())


@router.get("/{negotiation_project_id}", response_model=NegotiationProjectRead)
def get_negotiation_project(negotiation_project_id: UUID, db: Session = Depends(get_db)) -> NegotiationProject:
    negotiation_project = db.get(NegotiationProject, negotiation_project_id)
    if negotiation_project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Negotiation project not found")
    return negotiation_project


@router.post("", response_model=NegotiationProjectRead, status_code=status.HTTP_201_CREATED)
def create_negotiation_project(
    payload: NegotiationProjectCreate,
    db: Session = Depends(get_db),
) -> NegotiationProject:
    ensure_exists(db, Company, payload.company_id, "Company")

    owner = ensure_optional_exists(db, UserProfile, payload.owner_id, "Owner user profile")
    ensure_optional_same_company(owner, payload.company_id, "Owner user profile")

    request_item = ensure_optional_exists(db, RequestItem, payload.request_item_id, "Request item")
    ensure_optional_same_company(request_item, payload.company_id, "Request item")

    supplier_profile = ensure_optional_exists(db, SupplierProfile, payload.supplier_profile_id, "Supplier profile")
    ensure_optional_same_company(supplier_profile, payload.company_id, "Supplier profile")

    negotiation_project = NegotiationProject(**payload.model_dump())
    db.add(negotiation_project)
    db.commit()
    db.refresh(negotiation_project)
    return negotiation_project
