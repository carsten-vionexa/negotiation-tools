from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import (
    apply_partial_update,
    ensure_non_null_updates,
    ensure_optional_reference_exists,
    ensure_optional_same_company,
    ensure_reference_exists,
    ensure_same_company,
    get_or_404,
)
from app.models.company import Company
from app.models.negotiation_project import NegotiationProject
from app.models.simulation_scenario import SimulationScenario
from app.models.strategy import Strategy
from app.models.supplier_profile import SupplierProfile
from app.models.user_profile import UserProfile
from app.schemas.simulation_scenario import SimulationScenarioCreate, SimulationScenarioRead, SimulationScenarioUpdate

router = APIRouter()


def ensure_strategy_matches_context(strategy: Strategy | None, company_id: UUID, negotiation_project_id: UUID) -> None:
    if strategy is None:
        return
    ensure_same_company(strategy, company_id, "Strategy")
    if strategy.negotiation_project_id != negotiation_project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Strategy does not belong to negotiation project",
        )


@router.get("", response_model=list[SimulationScenarioRead])
def list_simulation_scenarios(
    skip: int = 0,
    limit: int = 100,
    company_id: UUID | None = None,
    negotiation_project_id: UUID | None = None,
    strategy_id: UUID | None = None,
    supplier_profile_id: UUID | None = None,
    user_profile_id: UUID | None = None,
    status: str | None = None,
    scenario_type: str | None = None,
    difficulty_level: str | None = None,
    language: str | None = None,
    db: Session = Depends(get_db),
) -> list[SimulationScenario]:
    query = select(SimulationScenario)
    if company_id:
        query = query.where(SimulationScenario.company_id == company_id)
    if negotiation_project_id:
        query = query.where(SimulationScenario.negotiation_project_id == negotiation_project_id)
    if strategy_id:
        query = query.where(SimulationScenario.strategy_id == strategy_id)
    if supplier_profile_id:
        query = query.where(SimulationScenario.supplier_profile_id == supplier_profile_id)
    if user_profile_id:
        query = query.where(SimulationScenario.user_profile_id == user_profile_id)
    if status:
        query = query.where(SimulationScenario.status == status)
    if scenario_type:
        query = query.where(SimulationScenario.scenario_type == scenario_type)
    if difficulty_level:
        query = query.where(SimulationScenario.difficulty_level == difficulty_level)
    if language:
        query = query.where(SimulationScenario.language == language)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{simulation_scenario_id}", response_model=SimulationScenarioRead)
def get_simulation_scenario(
    simulation_scenario_id: UUID,
    db: Session = Depends(get_db),
) -> SimulationScenario:
    return get_or_404(db, SimulationScenario, simulation_scenario_id, "Simulation scenario")


@router.post("", response_model=SimulationScenarioRead, status_code=status.HTTP_201_CREATED)
def create_simulation_scenario(
    payload: SimulationScenarioCreate,
    db: Session = Depends(get_db),
) -> SimulationScenario:
    ensure_reference_exists(db, Company, payload.company_id, "Company")
    negotiation_project = ensure_reference_exists(
        db,
        NegotiationProject,
        payload.negotiation_project_id,
        "Negotiation project",
    )
    ensure_same_company(negotiation_project, payload.company_id, "Negotiation project")

    strategy = ensure_optional_reference_exists(db, Strategy, payload.strategy_id, "Strategy")
    ensure_strategy_matches_context(strategy, payload.company_id, payload.negotiation_project_id)

    supplier_profile = ensure_optional_reference_exists(
        db,
        SupplierProfile,
        payload.supplier_profile_id,
        "Supplier profile",
    )
    ensure_optional_same_company(supplier_profile, payload.company_id, "Supplier profile")

    user_profile = ensure_optional_reference_exists(db, UserProfile, payload.user_profile_id, "User profile")
    ensure_optional_same_company(user_profile, payload.company_id, "User profile")

    simulation_scenario = SimulationScenario(**payload.model_dump())
    db.add(simulation_scenario)
    db.commit()
    db.refresh(simulation_scenario)
    return simulation_scenario


@router.patch("/{simulation_scenario_id}", response_model=SimulationScenarioRead)
def update_simulation_scenario(
    simulation_scenario_id: UUID,
    payload: SimulationScenarioUpdate,
    db: Session = Depends(get_db),
) -> SimulationScenario:
    simulation_scenario = get_or_404(db, SimulationScenario, simulation_scenario_id, "Simulation scenario")
    updates = payload.model_dump(exclude_unset=True)
    non_nullable_fields = {"company_id", "negotiation_project_id", "title", "status", "metadata_json"}
    ensure_non_null_updates(updates, non_nullable_fields)

    target_company_id = updates.get("company_id", simulation_scenario.company_id)
    if "company_id" in updates and updates["company_id"] is not None:
        ensure_reference_exists(db, Company, updates["company_id"], "Company")

    negotiation_project_id = updates.get("negotiation_project_id", simulation_scenario.negotiation_project_id)
    negotiation_project = ensure_reference_exists(
        db,
        NegotiationProject,
        negotiation_project_id,
        "Negotiation project",
    )
    ensure_same_company(negotiation_project, target_company_id, "Negotiation project")

    strategy_id = updates.get("strategy_id", simulation_scenario.strategy_id)
    strategy = ensure_optional_reference_exists(db, Strategy, strategy_id, "Strategy")
    ensure_strategy_matches_context(strategy, target_company_id, negotiation_project_id)

    supplier_profile_id = updates.get("supplier_profile_id", simulation_scenario.supplier_profile_id)
    supplier_profile = ensure_optional_reference_exists(db, SupplierProfile, supplier_profile_id, "Supplier profile")
    ensure_optional_same_company(supplier_profile, target_company_id, "Supplier profile")

    user_profile_id = updates.get("user_profile_id", simulation_scenario.user_profile_id)
    user_profile = ensure_optional_reference_exists(db, UserProfile, user_profile_id, "User profile")
    ensure_optional_same_company(user_profile, target_company_id, "User profile")

    apply_partial_update(simulation_scenario, updates, non_nullable_fields)
    db.commit()
    db.refresh(simulation_scenario)
    return simulation_scenario
