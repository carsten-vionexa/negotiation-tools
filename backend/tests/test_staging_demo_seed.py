from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app import models  # noqa: F401
from app.db.base import Base
from app.models.argumentation_line import ArgumentationLine
from app.models.batna_option import BatnaOption
from app.models.concession_item import ConcessionItem
from app.models.negotiation_project import NegotiationProject
from app.models.strategy import Strategy
from app.models.zopa_item import ZopaItem
from app.seeds.staging_demo import (
    D12_EMPTY_PROJECT_ID,
    D12_INCOMPLETE_PROJECT_ID,
    D12_INCOMPLETE_STRATEGY_ID,
    D12_NO_SUPPLIER_PROJECT_ID,
    D12_PARTIAL_PROJECT_ID,
    D12_PARTIAL_STRATEGY_ID,
    D12_READY_PROJECT_ID,
    D12_READY_STRATEGY_ID,
    DEMO_SUPPLIER_PROFILE_ID,
    seed_staging_demo_data,
)


def test_staging_demo_seed_ensures_d12_readiness_cases_idempotently() -> None:
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    try:
        with TestingSessionLocal() as session:
            first_ids = seed_staging_demo_data(session)
            second_ids = seed_staging_demo_data(session)

            assert first_ids == second_ids
            assert first_ids["d12_empty_strategy_project_id"] == str(D12_EMPTY_PROJECT_ID)
            assert first_ids["d12_incomplete_strategy_project_id"] == str(D12_INCOMPLETE_PROJECT_ID)
            assert first_ids["d12_partial_strategy_project_id"] == str(D12_PARTIAL_PROJECT_ID)
            assert first_ids["d12_ready_strategy_project_id"] == str(D12_READY_PROJECT_ID)
            assert first_ids["d12_no_supplier_project_id"] == str(D12_NO_SUPPLIER_PROJECT_ID)

            projects = session.scalars(select(NegotiationProject)).all()
            strategies = session.scalars(select(Strategy)).all()
            zopa_items = session.scalars(select(ZopaItem)).all()
            batna_options = session.scalars(select(BatnaOption)).all()
            concession_items = session.scalars(select(ConcessionItem)).all()
            argumentation_lines = session.scalars(select(ArgumentationLine)).all()

            assert len(projects) == 6
            assert len(strategies) == 3
            assert len(zopa_items) == 2
            assert len(batna_options) == 1
            assert len(concession_items) == 2
            assert len(argumentation_lines) == 1

            empty_project = session.get(NegotiationProject, D12_EMPTY_PROJECT_ID)
            assert empty_project is not None
            assert empty_project.request_item_id is not None
            assert empty_project.supplier_profile_id == DEMO_SUPPLIER_PROFILE_ID
            assert not empty_project.strategies

            incomplete_strategy = session.get(Strategy, D12_INCOMPLETE_STRATEGY_ID)
            assert incomplete_strategy is not None
            assert incomplete_strategy.negotiation_project_id == D12_INCOMPLETE_PROJECT_ID
            assert incomplete_strategy.overall_objective is None
            assert incomplete_strategy.zopa_summary is None

            partial_strategy = session.get(Strategy, D12_PARTIAL_STRATEGY_ID)
            assert partial_strategy is not None
            assert partial_strategy.negotiation_project_id == D12_PARTIAL_PROJECT_ID
            assert partial_strategy.overall_objective is not None
            assert partial_strategy.zopa_summary is not None
            assert partial_strategy.batna_summary is None
            assert partial_strategy.walk_away_point is None
            assert partial_strategy.argumentation_summary is None

            ready_strategy = session.get(Strategy, D12_READY_STRATEGY_ID)
            assert ready_strategy is not None
            assert ready_strategy.negotiation_project_id == D12_READY_PROJECT_ID
            assert ready_strategy.overall_objective is not None
            assert ready_strategy.zopa_summary is not None
            assert ready_strategy.batna_summary is not None
            assert ready_strategy.walk_away_point is not None
            assert ready_strategy.concession_strategy is not None
            assert ready_strategy.argumentation_summary is not None

            no_supplier_project = session.get(NegotiationProject, D12_NO_SUPPLIER_PROJECT_ID)
            assert no_supplier_project is not None
            assert no_supplier_project.request_item_id is not None
            assert no_supplier_project.supplier_profile_id is None
    finally:
        Base.metadata.drop_all(bind=engine)
