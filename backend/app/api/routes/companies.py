from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import apply_partial_update, get_or_404
from app.models.company import Company
from app.schemas.company import CompanyCreate, CompanyRead, CompanyUpdate

router = APIRouter()


@router.get("", response_model=list[CompanyRead])
def list_companies(
    skip: int = 0,
    limit: int = 100,
    name: str | None = None,
    industry: str | None = None,
    country: str | None = None,
    db: Session = Depends(get_db),
) -> list[Company]:
    query = select(Company)
    if name:
        query = query.where(Company.name.ilike(f"%{name}%"))
    if industry:
        query = query.where(Company.industry == industry)
    if country:
        query = query.where(Company.country == country)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{company_id}", response_model=CompanyRead)
def get_company(company_id: UUID, db: Session = Depends(get_db)) -> Company:
    return get_or_404(db, Company, company_id, "Company")


@router.post("", response_model=CompanyRead, status_code=status.HTTP_201_CREATED)
def create_company(payload: CompanyCreate, db: Session = Depends(get_db)) -> Company:
    company = Company(**payload.model_dump())
    db.add(company)
    db.commit()
    db.refresh(company)
    return company


@router.patch("/{company_id}", response_model=CompanyRead)
def update_company(company_id: UUID, payload: CompanyUpdate, db: Session = Depends(get_db)) -> Company:
    company = get_or_404(db, Company, company_id, "Company")
    updates = payload.model_dump(exclude_unset=True)
    apply_partial_update(company, updates, {"name", "profile_data"})
    db.commit()
    db.refresh(company)
    return company
