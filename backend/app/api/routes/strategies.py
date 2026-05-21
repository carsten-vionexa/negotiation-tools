from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import (
    apply_partial_update,
    ensure_non_null_updates,
    ensure_reference_exists,
    ensure_same_company,
    get_or_404,
)
from app.models.company import Company
from app.models.negotiation_project import NegotiationProject
from app.models.strategy import Strategy
from app.schemas.strategy import StrategyCreate, StrategyRead, StrategyUpdate

router = APIRouter()


@router.get("", response_model=list[StrategyRead])
def list_strategies(
    skip: int = 0,
    limit: int = 100,
    company_id: UUID | None = None,
    negotiation_project_id: UUID | None = None,
    status: str | None = None,
    is_active: bool | None = None,
    db: Session = Depends(get_db),
) -> list[Strategy]:
    query = select(Strategy)
    if company_id:
        query = query.where(Strategy.company_id == company_id)
    if negotiation_project_id:
        query = query.where(Strategy.negotiation_project_id == negotiation_project_id)
    if status:
        query = query.where(Strategy.status == status)
    if is_active is not None:
        query = query.where(Strategy.is_active == is_active)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{strategy_id}", response_model=StrategyRead)
def get_strategy(strategy_id: UUID, db: Session = Depends(get_db)) -> Strategy:
    return get_or_404(db, Strategy, strategy_id, "Strategy")


@router.post("", response_model=StrategyRead, status_code=status.HTTP_201_CREATED)
def create_strategy(payload: StrategyCreate, db: Session = Depends(get_db)) -> Strategy:
    ensure_reference_exists(db, Company, payload.company_id, "Company")
    negotiation_project = ensure_reference_exists(
        db,
        NegotiationProject,
        payload.negotiation_project_id,
        "Negotiation project",
    )
    ensure_same_company(negotiation_project, payload.company_id, "Negotiation project")

    strategy = Strategy(**payload.model_dump())
    db.add(strategy)
    db.commit()
    db.refresh(strategy)
    return strategy


@router.patch("/{strategy_id}", response_model=StrategyRead)
def update_strategy(strategy_id: UUID, payload: StrategyUpdate, db: Session = Depends(get_db)) -> Strategy:
    strategy = get_or_404(db, Strategy, strategy_id, "Strategy")
    updates = payload.model_dump(exclude_unset=True)
    non_nullable_fields = {
        "company_id",
        "negotiation_project_id",
        "title",
        "status",
        "version",
        "is_active",
        "metadata_json",
    }
    ensure_non_null_updates(updates, non_nullable_fields)

    target_company_id = updates.get("company_id", strategy.company_id)
    if "company_id" in updates and updates["company_id"] is not None:
        ensure_reference_exists(db, Company, updates["company_id"], "Company")

    negotiation_project_id = updates.get("negotiation_project_id", strategy.negotiation_project_id)
    negotiation_project = ensure_reference_exists(
        db,
        NegotiationProject,
        negotiation_project_id,
        "Negotiation project",
    )
    ensure_same_company(negotiation_project, target_company_id, "Negotiation project")

    apply_partial_update(strategy, updates, non_nullable_fields)
    db.commit()
    db.refresh(strategy)
    return strategy
