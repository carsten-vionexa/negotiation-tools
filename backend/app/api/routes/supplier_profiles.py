from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import ensure_exists
from app.models.company import Company
from app.models.supplier_profile import SupplierProfile
from app.schemas.supplier_profile import SupplierProfileCreate, SupplierProfileRead

router = APIRouter()


@router.get("", response_model=list[SupplierProfileRead])
def list_supplier_profiles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[SupplierProfile]:
    return list(db.scalars(select(SupplierProfile).offset(skip).limit(limit)).all())


@router.get("/{supplier_profile_id}", response_model=SupplierProfileRead)
def get_supplier_profile(supplier_profile_id: UUID, db: Session = Depends(get_db)) -> SupplierProfile:
    supplier_profile = db.get(SupplierProfile, supplier_profile_id)
    if supplier_profile is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Supplier profile not found")
    return supplier_profile


@router.post("", response_model=SupplierProfileRead, status_code=status.HTTP_201_CREATED)
def create_supplier_profile(payload: SupplierProfileCreate, db: Session = Depends(get_db)) -> SupplierProfile:
    ensure_exists(db, Company, payload.company_id, "Company")

    supplier_profile = SupplierProfile(**payload.model_dump())
    db.add(supplier_profile)
    db.commit()
    db.refresh(supplier_profile)
    return supplier_profile
