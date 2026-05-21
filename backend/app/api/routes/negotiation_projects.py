from uuid import UUID

from fastapi import APIRouter, Depends, status
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
from app.models.company import Company
from app.models.negotiation_project import NegotiationProject
from app.models.request_item import RequestItem
from app.models.supplier_profile import SupplierProfile
from app.models.user_profile import UserProfile
from app.schemas.negotiation_project import NegotiationProjectCreate, NegotiationProjectRead, NegotiationProjectUpdate

router = APIRouter()


@router.get("", response_model=list[NegotiationProjectRead])
def list_negotiation_projects(
    skip: int = 0,
    limit: int = 100,
    company_id: UUID | None = None,
    owner_id: UUID | None = None,
    supplier_profile_id: UUID | None = None,
    request_item_id: UUID | None = None,
    status: str | None = None,
    category: str | None = None,
    priority: str | None = None,
    db: Session = Depends(get_db),
) -> list[NegotiationProject]:
    query = select(NegotiationProject)
    if company_id:
        query = query.where(NegotiationProject.company_id == company_id)
    if owner_id:
        query = query.where(NegotiationProject.owner_id == owner_id)
    if supplier_profile_id:
        query = query.where(NegotiationProject.supplier_profile_id == supplier_profile_id)
    if request_item_id:
        query = query.where(NegotiationProject.request_item_id == request_item_id)
    if status:
        query = query.where(NegotiationProject.status == status)
    if category:
        query = query.where(NegotiationProject.category == category)
    if priority:
        query = query.where(NegotiationProject.priority == priority)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{negotiation_project_id}", response_model=NegotiationProjectRead)
def get_negotiation_project(negotiation_project_id: UUID, db: Session = Depends(get_db)) -> NegotiationProject:
    return get_or_404(db, NegotiationProject, negotiation_project_id, "Negotiation project")


@router.post("", response_model=NegotiationProjectRead, status_code=status.HTTP_201_CREATED)
def create_negotiation_project(
    payload: NegotiationProjectCreate,
    db: Session = Depends(get_db),
) -> NegotiationProject:
    ensure_reference_exists(db, Company, payload.company_id, "Company")

    owner = ensure_optional_reference_exists(db, UserProfile, payload.owner_id, "Owner user profile")
    ensure_optional_same_company(owner, payload.company_id, "Owner user profile")

    request_item = ensure_optional_reference_exists(db, RequestItem, payload.request_item_id, "Request item")
    ensure_optional_same_company(request_item, payload.company_id, "Request item")

    supplier_profile = ensure_optional_reference_exists(db, SupplierProfile, payload.supplier_profile_id, "Supplier profile")
    ensure_optional_same_company(supplier_profile, payload.company_id, "Supplier profile")

    negotiation_project = NegotiationProject(**payload.model_dump())
    db.add(negotiation_project)
    db.commit()
    db.refresh(negotiation_project)
    return negotiation_project


@router.patch("/{negotiation_project_id}", response_model=NegotiationProjectRead)
def update_negotiation_project(
    negotiation_project_id: UUID,
    payload: NegotiationProjectUpdate,
    db: Session = Depends(get_db),
) -> NegotiationProject:
    negotiation_project = get_or_404(db, NegotiationProject, negotiation_project_id, "Negotiation project")
    updates = payload.model_dump(exclude_unset=True)
    non_nullable_fields = {"company_id", "title", "status", "strategy_data", "simulation_data", "metadata_json"}
    ensure_non_null_updates(updates, non_nullable_fields)

    target_company_id = updates.get("company_id", negotiation_project.company_id)
    if "company_id" in updates and updates["company_id"] is not None:
        ensure_reference_exists(db, Company, updates["company_id"], "Company")

    owner_id = updates.get("owner_id", negotiation_project.owner_id)
    owner = ensure_optional_reference_exists(db, UserProfile, owner_id, "Owner user profile")
    ensure_optional_same_company(owner, target_company_id, "Owner user profile")

    request_item_id = updates.get("request_item_id", negotiation_project.request_item_id)
    request_item = ensure_optional_reference_exists(db, RequestItem, request_item_id, "Request item")
    ensure_optional_same_company(request_item, target_company_id, "Request item")

    supplier_profile_id = updates.get("supplier_profile_id", negotiation_project.supplier_profile_id)
    supplier_profile = ensure_optional_reference_exists(db, SupplierProfile, supplier_profile_id, "Supplier profile")
    ensure_optional_same_company(supplier_profile, target_company_id, "Supplier profile")

    apply_partial_update(
        negotiation_project,
        updates,
        non_nullable_fields,
    )
    db.commit()
    db.refresh(negotiation_project)
    return negotiation_project
