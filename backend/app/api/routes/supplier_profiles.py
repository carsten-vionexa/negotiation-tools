from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import apply_partial_update, ensure_reference_exists, get_or_404
from app.models.company import Company
from app.models.supplier_profile import SupplierProfile
from app.schemas.supplier_profile import SupplierProfileCreate, SupplierProfileRead, SupplierProfileUpdate

router = APIRouter()


@router.get("", response_model=list[SupplierProfileRead])
def list_supplier_profiles(
    skip: int = 0,
    limit: int = 100,
    company_id: UUID | None = None,
    country: str | None = None,
    region: str | None = None,
    supplier_type: str | None = None,
    power_level: str | None = None,
    risk_level: str | None = None,
    db: Session = Depends(get_db),
) -> list[SupplierProfile]:
    query = select(SupplierProfile)
    if company_id:
        query = query.where(SupplierProfile.company_id == company_id)
    if country:
        query = query.where(SupplierProfile.country == country)
    if region:
        query = query.where(SupplierProfile.region == region)
    if supplier_type:
        query = query.where(SupplierProfile.supplier_type == supplier_type)
    if power_level:
        query = query.where(SupplierProfile.power_level == power_level)
    if risk_level:
        query = query.where(SupplierProfile.risk_level == risk_level)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{supplier_profile_id}", response_model=SupplierProfileRead)
def get_supplier_profile(supplier_profile_id: UUID, db: Session = Depends(get_db)) -> SupplierProfile:
    return get_or_404(db, SupplierProfile, supplier_profile_id, "Supplier profile")


@router.post("", response_model=SupplierProfileRead, status_code=status.HTTP_201_CREATED)
def create_supplier_profile(payload: SupplierProfileCreate, db: Session = Depends(get_db)) -> SupplierProfile:
    ensure_reference_exists(db, Company, payload.company_id, "Company")

    supplier_profile = SupplierProfile(**payload.model_dump())
    db.add(supplier_profile)
    db.commit()
    db.refresh(supplier_profile)
    return supplier_profile


@router.patch("/{supplier_profile_id}", response_model=SupplierProfileRead)
def update_supplier_profile(
    supplier_profile_id: UUID,
    payload: SupplierProfileUpdate,
    db: Session = Depends(get_db),
) -> SupplierProfile:
    supplier_profile = get_or_404(db, SupplierProfile, supplier_profile_id, "Supplier profile")
    updates = payload.model_dump(exclude_unset=True)
    if "company_id" in updates and updates["company_id"] is not None:
        ensure_reference_exists(db, Company, updates["company_id"], "Company")
    apply_partial_update(
        supplier_profile,
        updates,
        {
            "company_id",
            "name",
            "assumptions",
            "interests_json",
            "likely_tactics_json",
            "constraints_json",
            "is_ai_generated",
            "confidence_level",
            "metadata_json",
        },
    )
    db.commit()
    db.refresh(supplier_profile)
    return supplier_profile
