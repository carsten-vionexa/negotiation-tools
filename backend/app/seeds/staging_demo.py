from __future__ import annotations

import argparse
from datetime import date
from decimal import Decimal
from typing import Any
from uuid import UUID

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.company import Company
from app.models.negotiation_project import NegotiationProject
from app.models.request_item import RequestItem


DEMO_TAG = "staging-demo-rheinwerk-robotics-v1"
DEMO_COMPANY_ID = UUID("0bcb61e7-f15c-5d7d-8c52-c4f45b53d3a0")
DEMO_REQUEST_ITEM_ID = UUID("7a7b65e3-94fa-5f59-9101-6f7ad8f33e5d")
DEMO_PROJECT_ID = UUID("01d9d55b-87c3-5a5a-876a-b55a3ce2db33")


def _merge_metadata(current: dict[str, Any] | None) -> dict[str, Any]:
    metadata = dict(current or {})
    metadata.update(
        {
            "demo_seed": DEMO_TAG,
            "demo_scope": "staging",
            "synthetic": True,
        }
    )
    return metadata


def _upsert_company(session: Session) -> Company:
    company = session.get(Company, DEMO_COMPANY_ID)
    if company is None:
        company = Company(id=DEMO_COMPANY_ID)
        session.add(company)

    company.name = "Rheinwerk Robotics GmbH"
    company.legal_name = "Rheinwerk Robotics GmbH"
    company.industry = "Industrial robotics and automation"
    company.website = "https://example.invalid/rheinwerk-robotics"
    company.country = "DE"
    company.description = (
        "Synthetic training company for the protected staging demo. "
        "Rheinwerk Robotics manufactures automation cells and service robotics "
        "for industrial customers."
    )
    company.profile_data = _merge_metadata(
        {
            **(company.profile_data or {}),
            "training_context": "Strategic procurement negotiation training",
            "data_origin": "synthetic_seed",
        }
    )
    return company


def _upsert_request_item(session: Session) -> RequestItem:
    request_item = session.get(RequestItem, DEMO_REQUEST_ITEM_ID)
    if request_item is None:
        request_item = RequestItem(id=DEMO_REQUEST_ITEM_ID)
        session.add(request_item)

    request_item.company_id = DEMO_COMPANY_ID
    request_item.title = "Strategische Beschaffung: Praezisions-Servoantriebe"
    request_item.article_name = "Praezisions-Servoantrieb RX-42"
    request_item.article_description = (
        "Servoantriebe fuer eine neue Robotik-Zelle mit hoher Wiederholgenauigkeit "
        "und stabiler Ersatzteilversorgung."
    )
    request_item.category = "Automation components"
    request_item.specification = (
        "48V Servoantrieb, integrierter Encoder, kompatibel mit bestehenden "
        "Rheinwerk-Steuerungen, dokumentierte Lieferfaehigkeit fuer 24 Monate."
    )
    request_item.requested_quantity = Decimal("120.000")
    request_item.unit = "Stueck"
    request_item.target_price = Decimal("740.0000")
    request_item.rough_price_expectation = Decimal("820.0000")
    request_item.currency = "EUR"
    request_item.required_delivery_date = date(2026, 9, 30)
    request_item.target_delivery_time = "erste Teillieferung innerhalb von 10 Wochen"
    request_item.target_region = "DACH"
    request_item.priority = "high"
    request_item.status = "open"
    request_item.comment = (
        "Demo-Szenario: Lieferant signalisiert Kapazitaetsengpaesse, "
        "Rheinwerk braucht Preisstabilitaet und belastbare Liefertermine."
    )
    request_item.metadata_json = _merge_metadata(
        {
            **(request_item.metadata_json or {}),
            "natural_key": "rheinwerk-robotics/request-items/precision-servo-rx-42",
            "demo_flow": "request-item-to-negotiation-project",
        }
    )
    return request_item


def _upsert_project(session: Session) -> NegotiationProject:
    project = session.get(NegotiationProject, DEMO_PROJECT_ID)
    if project is None:
        project = NegotiationProject(id=DEMO_PROJECT_ID)
        session.add(project)

    project.company_id = DEMO_COMPANY_ID
    project.request_item_id = DEMO_REQUEST_ITEM_ID
    project.title = "Verhandlung: Praezisions-Servoantrieb RX-42"
    project.status = "draft"
    project.negotiation_type = "supplier_negotiation"
    project.project_type = "strategic_procurement"
    project.category = "Automation components"
    project.article_or_service = "Praezisions-Servoantrieb RX-42"
    project.quantity = Decimal("120.000")
    project.target_region = "DACH"
    project.desired_delivery_time = "erste Teillieferung innerhalb von 10 Wochen"
    project.internal_price_expectation = Decimal("740.0000")
    project.currency = "EUR"
    project.current_supplier = "Aurum Motion Systems"
    project.priority = "high"
    project.business_pressure = (
        "Neue Robotik-Zelle soll im vierten Quartal anlaufen; spaete Lieferung "
        "verschiebt einen Kundenpiloten."
    )
    project.technical_dependency_level = "medium"
    project.supplier_power_level = "medium"
    project.risk_level = "medium"
    project.objective = (
        "Preis unter 760 EUR pro Stueck sichern, Teillieferung bis Ende September "
        "vereinbaren und Eskalationspunkte fuer Lieferverzug klaeren."
    )
    project.context = (
        "Ausgangslage fuer Trainer-Demo: Rheinwerk Robotics verhandelt eine "
        "strategische Komponente mit begrenztem Alternativmarkt. Der Fokus liegt "
        "auf Preis, Liefertermin, technischer Kompatibilitaet und Risikoabsicherung."
    )
    project.strategy_data = {
        **(project.strategy_data or {}),
        "demo_notes": [
            "BATNA: Alternativer Anbieter mit laengerer Qualifizierung.",
            "Zielkonflikt: Preisstabilitaet versus bevorzugte Lieferprioritaet.",
        ],
    }
    project.simulation_data = {
        **(project.simulation_data or {}),
        "demo_readiness": "prepared_without_full_simulation_seed",
    }
    project.metadata_json = _merge_metadata(
        {
            **(project.metadata_json or {}),
            "natural_key": "rheinwerk-robotics/projects/precision-servo-rx-42",
            "initialized_from_request_item_id": str(DEMO_REQUEST_ITEM_ID),
        }
    )
    return project


def seed_staging_demo_data(session: Session) -> dict[str, str]:
    _upsert_company(session)
    _upsert_request_item(session)
    _upsert_project(session)
    session.commit()

    return {
        "company_id": str(DEMO_COMPANY_ID),
        "request_item_id": str(DEMO_REQUEST_ITEM_ID),
        "negotiation_project_id": str(DEMO_PROJECT_ID),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Ensure the protected staging demo data set.")
    parser.add_argument(
        "--confirm-staging-demo",
        action="store_true",
        help="Required guard to make intentional non-production seeding explicit.",
    )
    args = parser.parse_args()

    if not args.confirm_staging_demo:
        raise SystemExit("Refusing to seed without --confirm-staging-demo.")

    with SessionLocal() as session:
        ids = seed_staging_demo_data(session)

    print("Ensured staging demo data:")
    for key, value in ids.items():
        print(f"- {key}: {value}")


if __name__ == "__main__":
    main()
