from __future__ import annotations

import argparse
from datetime import date
from decimal import Decimal
from typing import Any
from uuid import UUID

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.argumentation_line import ArgumentationLine
from app.models.batna_option import BatnaOption
from app.models.company import Company
from app.models.concession_item import ConcessionItem
from app.models.negotiation_project import NegotiationProject
from app.models.request_item import RequestItem
from app.models.strategy import Strategy
from app.models.supplier_profile import SupplierProfile
from app.models.zopa_item import ZopaItem


DEMO_TAG = "staging-demo-rheinwerk-robotics-v1"
DEMO_COMPANY_ID = UUID("0bcb61e7-f15c-5d7d-8c52-c4f45b53d3a0")
DEMO_REQUEST_ITEM_ID = UUID("7a7b65e3-94fa-5f59-9101-6f7ad8f33e5d")
DEMO_PROJECT_ID = UUID("01d9d55b-87c3-5a5a-876a-b55a3ce2db33")
DEMO_SUPPLIER_PROFILE_ID = UUID("d5470daa-5772-4c10-bd77-b7aaef3f4a1d")
D12_EMPTY_REQUEST_ITEM_ID = UUID("7bf1f615-9091-5c58-80b7-cca7b83f9796")
D12_EMPTY_PROJECT_ID = UUID("f06a85a1-5d41-5a47-8d14-52af0493b606")
D12_INCOMPLETE_REQUEST_ITEM_ID = UUID("0b07ed8d-e7bd-548d-a17f-a41377162d42")
D12_INCOMPLETE_PROJECT_ID = UUID("63154d03-dee6-5fc9-a1b4-d8eaeeed0de4")
D12_INCOMPLETE_STRATEGY_ID = UUID("b7c21e7e-3e8a-5377-97b4-8c265c2db05d")
D12_PARTIAL_REQUEST_ITEM_ID = UUID("7a751f5d-128a-5aee-8d75-248b82668354")
D12_PARTIAL_PROJECT_ID = UUID("0ca3270b-b999-5564-9756-265eddb5c835")
D12_PARTIAL_STRATEGY_ID = UUID("ebfe2953-7bc1-5573-b86c-f94117efd525")
D12_PARTIAL_ZOPA_ID = UUID("235dd747-98b1-5c65-a199-ffdd7df03cd4")
D12_PARTIAL_CONCESSION_ID = UUID("a3e5c8db-f802-5a79-a4d1-240c66dff812")
D12_READY_REQUEST_ITEM_ID = UUID("29c6dbe2-5dd0-51f5-9f43-7b7a025cfb3b")
D12_READY_PROJECT_ID = UUID("6a6f7d66-7fad-5a2b-93b5-4cfcdb7c4200")
D12_READY_STRATEGY_ID = UUID("9182fa82-6b5e-525b-a34c-b35cf361412c")
D12_READY_ZOPA_ID = UUID("8ae71fde-f329-5559-b25c-8741f5faa6e9")
D12_READY_BATNA_ID = UUID("5a160786-6df5-5978-b5fb-a31d4a8e24f6")
D12_READY_CONCESSION_ID = UUID("742607bc-d7ea-5a42-86eb-c0930e360d69")
D12_READY_ARGUMENT_ID = UUID("3242e149-c391-5ae2-9cc9-abcb1850aa8b")
D12_NO_SUPPLIER_REQUEST_ITEM_ID = UUID("c5929afe-9434-5c64-b3bf-93b36f75f2f3")
D12_NO_SUPPLIER_PROJECT_ID = UUID("b0be8f1b-e08e-5def-bdbf-5cbca5123290")


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


def _merge_d12_metadata(current: dict[str, Any] | None, demo_case: str, purpose: str) -> dict[str, Any]:
    metadata = _merge_metadata(current)
    metadata.update(
        {
            "demo_case": demo_case,
            "demo_phase": "D12.3",
            "demo_purpose": purpose,
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


def _upsert_supplier_profile(session: Session) -> SupplierProfile:
    supplier = session.get(SupplierProfile, DEMO_SUPPLIER_PROFILE_ID)
    if supplier is None:
        supplier = SupplierProfile(id=DEMO_SUPPLIER_PROFILE_ID)
        session.add(supplier)

    supplier.company_id = DEMO_COMPANY_ID
    supplier.name = "Aurum Motion Systems K.K."
    supplier.country = "Japan"
    supplier.region = "Kansai"
    supplier.industry = "Precision motion control and automation components"
    supplier.supplier_type = "strategic_component_supplier"
    supplier.power_level = "medium"
    supplier.risk_level = "medium"
    supplier.website = "https://example.invalid/aurum-motion-systems"
    supplier.contact_name = "Demo Procurement Contact"
    supplier.contact_email = "demo-procurement@example.invalid"
    supplier.relationship_status = "Bestehender Serienlieferant mit laufender Kapazitaetsabstimmung"
    supplier.cultural_context = (
        "Demo-Kontext: strukturierte Vorbereitung, klare Spezifikationen und "
        "verbindliche Eskalationswege sind in der Verhandlung besonders hilfreich."
    )
    supplier.notes = (
        "Synthetischer Lieferant fuer Praezisions-Servoantriebe. Der Demo-Fall "
        "zeigt Preis-, Liefertermin- und Ersatzteilrisiken ohne echte Kundendaten."
    )
    supplier.assumptions = {
        **(supplier.assumptions or {}),
        "demo_relationship": "Rheinwerk ist Referenzkunde fuer eine neue Automationszelle.",
        "capacity_signal": "Lieferant signalisiert begrenzte Produktionsfenster im dritten Quartal.",
    }
    supplier.interests_json = {
        **(supplier.interests_json or {}),
        "likely_supplier_interests": [
            "stabile Forecasts",
            "technisch klare Freigabeprozesse",
            "preisliche Absicherung bei Materialschwankungen",
        ],
    }
    supplier.likely_tactics_json = {
        **(supplier.likely_tactics_json or {}),
        "negotiation_signals": [
            "Kapazitaet als Argument fuer fruehe Bestellung",
            "Rabatt nur bei verbindlichem Abrufplan",
        ],
    }
    supplier.constraints_json = {
        **(supplier.constraints_json or {}),
        "demo_constraints": [
            "begrenzte Encoder-Verfuegbarkeit",
            "Qualifizierung alternativer Lieferanten dauert laenger",
        ],
    }
    supplier.is_ai_generated = False
    supplier.confidence_level = "demo"
    supplier.metadata_json = _merge_metadata(
        {
            **(supplier.metadata_json or {}),
            "natural_key": "rheinwerk-robotics/suppliers/aurum-motion-systems",
            "demo_flow": "supplier-context-card",
        }
    )
    return supplier


def _upsert_project(session: Session) -> NegotiationProject:
    project = session.get(NegotiationProject, DEMO_PROJECT_ID)
    if project is None:
        project = NegotiationProject(id=DEMO_PROJECT_ID)
        session.add(project)

    project.company_id = DEMO_COMPANY_ID
    project.request_item_id = DEMO_REQUEST_ITEM_ID
    project.supplier_profile_id = DEMO_SUPPLIER_PROFILE_ID
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


def _upsert_d12_request_item(
    session: Session,
    request_item_id: UUID,
    *,
    title: str,
    article_name: str,
    demo_case: str,
    purpose: str,
) -> RequestItem:
    request_item = session.get(RequestItem, request_item_id)
    if request_item is None:
        request_item = RequestItem(id=request_item_id)
        session.add(request_item)

    request_item.company_id = DEMO_COMPANY_ID
    request_item.title = title
    request_item.article_name = article_name
    request_item.article_description = (
        "Synthetische D12.3-Anfrageposition fuer reproduzierbare Readiness- und "
        "Preparation-Smoke-Tests."
    )
    request_item.category = "Automation components"
    request_item.specification = "Demo-Spezifikation fuer Strategy-Readiness-Testdaten."
    request_item.requested_quantity = Decimal("80.000")
    request_item.unit = "Stueck"
    request_item.target_price = Decimal("760.0000")
    request_item.rough_price_expectation = Decimal("830.0000")
    request_item.currency = "EUR"
    request_item.required_delivery_date = date(2026, 10, 31)
    request_item.target_delivery_time = "Lieferfenster innerhalb von 12 Wochen"
    request_item.target_region = "DACH"
    request_item.priority = "medium"
    request_item.status = "open"
    request_item.comment = purpose
    request_item.metadata_json = _merge_d12_metadata(
        {
            **(request_item.metadata_json or {}),
            "natural_key": f"rheinwerk-robotics/request-items/{demo_case}",
        },
        demo_case,
        purpose,
    )
    return request_item


def _upsert_d12_project(
    session: Session,
    project_id: UUID,
    *,
    request_item_id: UUID,
    supplier_profile_id: UUID | None,
    title: str,
    demo_case: str,
    purpose: str,
) -> NegotiationProject:
    project = session.get(NegotiationProject, project_id)
    if project is None:
        project = NegotiationProject(id=project_id)
        session.add(project)

    project.company_id = DEMO_COMPANY_ID
    project.request_item_id = request_item_id
    project.supplier_profile_id = supplier_profile_id
    project.title = title
    project.status = "draft"
    project.negotiation_type = "supplier_negotiation"
    project.project_type = "strategic_procurement"
    project.category = "Automation components"
    project.article_or_service = "Praezisions-Servoantrieb RX-42"
    project.quantity = Decimal("80.000")
    project.target_region = "DACH"
    project.desired_delivery_time = "Lieferfenster innerhalb von 12 Wochen"
    project.internal_price_expectation = Decimal("760.0000")
    project.currency = "EUR"
    project.current_supplier = "Aurum Motion Systems" if supplier_profile_id else None
    project.priority = "medium"
    project.business_pressure = (
        "D12.3-Demozustand fuer lokale und spaetere Staging-Smoke-Tests; "
        "keine echte Kunden- oder Produktivinformation."
    )
    project.technical_dependency_level = "medium"
    project.supplier_power_level = "medium" if supplier_profile_id else None
    project.risk_level = "medium"
    project.objective = purpose
    project.context = (
        "Klar markierter D12.3-Testdatensatz fuer Strategy Readiness und "
        "Project Preparation. Der Datensatz aktiviert keine KI-, RAG-, Claim-, "
        "Simulations- oder Trainerreview-Funktion."
    )
    project.strategy_data = {
        **(project.strategy_data or {}),
        "d12_3_expected_state": demo_case,
        "d12_3_expected_ui": purpose,
    }
    project.simulation_data = {
        **(project.simulation_data or {}),
        "demo_readiness": "not_seeded_for_simulation",
    }
    project.metadata_json = _merge_d12_metadata(
        {
            **(project.metadata_json or {}),
            "natural_key": f"rheinwerk-robotics/projects/{demo_case}",
            "initialized_from_request_item_id": str(request_item_id),
        },
        demo_case,
        purpose,
    )
    return project


def _upsert_strategy(
    session: Session,
    strategy_id: UUID,
    *,
    project_id: UUID,
    title: str,
    demo_case: str,
    purpose: str,
    overall_objective: str | None = None,
    target_outcome: str | None = None,
    minimum_acceptable_outcome: str | None = None,
    walk_away_point: str | None = None,
    zopa_summary: str | None = None,
    batna_summary: str | None = None,
    concession_strategy: str | None = None,
    argumentation_summary: str | None = None,
    risk_assessment: str | None = None,
    notes: str | None = None,
) -> Strategy:
    strategy = session.get(Strategy, strategy_id)
    if strategy is None:
        strategy = Strategy(id=strategy_id)
        session.add(strategy)

    strategy.company_id = DEMO_COMPANY_ID
    strategy.negotiation_project_id = project_id
    strategy.title = title
    strategy.status = "draft"
    strategy.version = 1
    strategy.is_active = True
    strategy.overall_objective = overall_objective
    strategy.target_outcome = target_outcome
    strategy.minimum_acceptable_outcome = minimum_acceptable_outcome
    strategy.walk_away_point = walk_away_point
    strategy.zopa_summary = zopa_summary
    strategy.batna_summary = batna_summary
    strategy.concession_strategy = concession_strategy
    strategy.argumentation_summary = argumentation_summary
    strategy.risk_assessment = risk_assessment
    strategy.notes = notes or purpose
    strategy.metadata_json = _merge_d12_metadata(
        {
            **(strategy.metadata_json or {}),
            "natural_key": f"rheinwerk-robotics/strategies/{demo_case}",
        },
        demo_case,
        purpose,
    )
    return strategy


def _upsert_partial_strategy_anchor(session: Session) -> None:
    zopa = session.get(ZopaItem, D12_PARTIAL_ZOPA_ID)
    if zopa is None:
        zopa = ZopaItem(id=D12_PARTIAL_ZOPA_ID)
        session.add(zopa)
    zopa.strategy_id = D12_PARTIAL_STRATEGY_ID
    zopa.dimension = "Preis"
    zopa.description = "Erster Einigungskorridor als D12.3-Teilstreckenanker."
    zopa.buyer_target_value = "760 EUR"
    zopa.buyer_walk_away_value = None
    zopa.supplier_expected_target_value = "825 EUR"
    zopa.supplier_estimated_walk_away_value = None
    zopa.possible_agreement_range = "760-805 EUR"
    zopa.currency = "EUR"
    zopa.unit = "Stueck"
    zopa.priority = "medium"
    zopa.confidence_level = "demo"
    zopa.information_kind = "synthetic_demo"
    zopa.source_reference = "D12.3 demo seed"
    zopa.metadata_json = _merge_d12_metadata(zopa.metadata_json, "d12-partial-strategy", "ZOPA-Anker vorhanden")

    concession = session.get(ConcessionItem, D12_PARTIAL_CONCESSION_ID)
    if concession is None:
        concession = ConcessionItem(id=D12_PARTIAL_CONCESSION_ID)
        session.add(concession)
    concession.strategy_id = D12_PARTIAL_STRATEGY_ID
    concession.title = "Forecast-Frequenz anbieten"
    concession.concession_type = "process"
    concession.description = "Monatlichen Forecast als Tauschanker anbieten, aber BATNA/WAP/Argumente bewusst offen lassen."
    concession.value_to_us = "Priorisierte Lieferfenster"
    concession.value_to_counterparty = "Planungssicherheit"
    concession.estimated_cost = Decimal("0.0000")
    concession.currency = "EUR"
    concession.give_condition = "Nur bei belastbarer Lieferzusage."
    concession.required_counterpart = "Verbindlicher Lieferplan."
    concession.sequence_order = 1
    concession.is_final_offer_item = False
    concession.risk_level = "low"
    concession.metadata_json = _merge_d12_metadata(
        concession.metadata_json,
        "d12-partial-strategy",
        "Konzessionsanker vorhanden",
    )


def _upsert_ready_strategy_anchors(session: Session) -> None:
    zopa = session.get(ZopaItem, D12_READY_ZOPA_ID)
    if zopa is None:
        zopa = ZopaItem(id=D12_READY_ZOPA_ID)
        session.add(zopa)
    zopa.strategy_id = D12_READY_STRATEGY_ID
    zopa.dimension = "Preis"
    zopa.description = "Vollstaendiger Einigungskorridor fuer D12.3-Ready-State."
    zopa.buyer_target_value = "750 EUR"
    zopa.buyer_walk_away_value = "790 EUR"
    zopa.supplier_expected_target_value = "820 EUR"
    zopa.supplier_estimated_walk_away_value = "780 EUR"
    zopa.possible_agreement_range = "750-790 EUR"
    zopa.currency = "EUR"
    zopa.unit = "Stueck"
    zopa.priority = "high"
    zopa.confidence_level = "demo"
    zopa.information_kind = "synthetic_demo"
    zopa.source_reference = "D12.3 demo seed"
    zopa.metadata_json = _merge_d12_metadata(zopa.metadata_json, "d12-ready-strategy", "ZOPA vollstaendig")

    batna = session.get(BatnaOption, D12_READY_BATNA_ID)
    if batna is None:
        batna = BatnaOption(id=D12_READY_BATNA_ID)
        session.add(batna)
    batna.strategy_id = D12_READY_STRATEGY_ID
    batna.title = "Alternativer DACH-Integrator"
    batna.batna_type = "supplier"
    batna.description = "Qualifizierbarer Ersatzlieferant mit laengerem Vorlauf und hoeherem Integrationsaufwand."
    batna.feasibility_level = "medium"
    batna.estimated_cost = Decimal("860.0000")
    batna.currency = "EUR"
    batna.estimated_lead_time = "16 Wochen"
    batna.risk_level = "medium"
    batna.impact_assessment = "Sichert Verhandlungsalternative, verschiebt aber Pilotstart."
    batna.required_actions = "Technische Freigabe und Musterbestellung vorbereiten."
    batna.is_preferred = True
    batna.ranking = 1
    batna.confidence_level = "demo"
    batna.metadata_json = _merge_d12_metadata(batna.metadata_json, "d12-ready-strategy", "BATNA vorhanden")

    concession = session.get(ConcessionItem, D12_READY_CONCESSION_ID)
    if concession is None:
        concession = ConcessionItem(id=D12_READY_CONCESSION_ID)
        session.add(concession)
    concession.strategy_id = D12_READY_STRATEGY_ID
    concession.title = "Abrufplan gegen Preisbindung"
    concession.concession_type = "commercial"
    concession.description = "Quartalsweisen Abrufplan anbieten, wenn Preisbindung und Teillieferung fixiert werden."
    concession.value_to_us = "Preis- und Lieferterminstabilitaet"
    concession.value_to_counterparty = "Produktionsplanung"
    concession.estimated_cost = Decimal("0.0000")
    concession.currency = "EUR"
    concession.give_condition = "Nur mit verbindlichem September-Lieferfenster."
    concession.required_counterpart = "Preisbindung und Eskalationskontakt."
    concession.sequence_order = 1
    concession.is_final_offer_item = False
    concession.risk_level = "low"
    concession.metadata_json = _merge_d12_metadata(concession.metadata_json, "d12-ready-strategy", "Konzession vorhanden")

    argument = session.get(ArgumentationLine, D12_READY_ARGUMENT_ID)
    if argument is None:
        argument = ArgumentationLine(id=D12_READY_ARGUMENT_ID)
        session.add(argument)
    argument.strategy_id = D12_READY_STRATEGY_ID
    argument.title = "Planungssicherheit rechtfertigt Preisbindung"
    argument.argument_type = "value_exchange"
    argument.claim = "Rheinwerk kann Forecast-Sicherheit geben, wenn Aurum Preis- und Lieferfenster verbindlich macht."
    argument.evidence = "Synthetischer Forecast- und Pilotkontext aus D12.3-Demo."
    argument.source_reference = "D12.3 demo seed"
    argument.expected_counterargument = "Aurum verweist auf Materialpreisrisiko."
    argument.response_strategy = "Preisbindung auf Zeitraum begrenzen und Eskalationsmechanismus vereinbaren."
    argument.priority = "high"
    argument.confidence_level = "demo"
    argument.information_kind = "synthetic_demo"
    argument.metadata_json = _merge_d12_metadata(argument.metadata_json, "d12-ready-strategy", "Argumentation vorhanden")


def _upsert_d12_readiness_demo_data(session: Session) -> None:
    _upsert_d12_request_item(
        session,
        D12_EMPTY_REQUEST_ITEM_ID,
        title="D12.3 A: Bedarf mit Supplier Context, ohne Strategy",
        article_name="D12.3 Empty Strategy Servo-Kit",
        demo_case="d12-empty-strategy",
        purpose="Demo A: RequestItem und SupplierProfile vorhanden, Strategy bewusst nicht angelegt.",
    )
    _upsert_d12_project(
        session,
        D12_EMPTY_PROJECT_ID,
        request_item_id=D12_EMPTY_REQUEST_ITEM_ID,
        supplier_profile_id=DEMO_SUPPLIER_PROFILE_ID,
        title="D12.3 A: Empty Strategy",
        demo_case="d12-empty-strategy",
        purpose="Preparation Gaps und Strategy Empty State pruefen.",
    )

    _upsert_d12_request_item(
        session,
        D12_INCOMPLETE_REQUEST_ITEM_ID,
        title="D12.3 B: Bedarf mit unvollstaendiger Strategy",
        article_name="D12.3 Incomplete Strategy Servo-Kit",
        demo_case="d12-incomplete-strategy",
        purpose="Demo B: Strategy-Kopf existiert, zentrale Bausteine fehlen.",
    )
    _upsert_d12_project(
        session,
        D12_INCOMPLETE_PROJECT_ID,
        request_item_id=D12_INCOMPLETE_REQUEST_ITEM_ID,
        supplier_profile_id=DEMO_SUPPLIER_PROFILE_ID,
        title="D12.3 B: Unvollstaendige Strategy",
        demo_case="d12-incomplete-strategy",
        purpose="Readiness `Unvollstaendig` und fehlende Bausteine pruefen.",
    )
    _upsert_strategy(
        session,
        D12_INCOMPLETE_STRATEGY_ID,
        project_id=D12_INCOMPLETE_PROJECT_ID,
        title="D12.3 B: Strategy-Kopf ohne tragfaehige Bausteine",
        demo_case="d12-incomplete-strategy",
        purpose="Readiness bleibt Unvollstaendig; keine Next-Action-Guidance.",
    )

    _upsert_d12_request_item(
        session,
        D12_PARTIAL_REQUEST_ITEM_ID,
        title="D12.3 C: Bedarf mit teilgefuellter Strategy",
        article_name="D12.3 Partial Strategy Servo-Kit",
        demo_case="d12-partial-strategy",
        purpose="Demo C: erste Strategy-Anker vorhanden, BATNA/WAP/Argumente fehlen.",
    )
    _upsert_d12_project(
        session,
        D12_PARTIAL_PROJECT_ID,
        request_item_id=D12_PARTIAL_REQUEST_ITEM_ID,
        supplier_profile_id=DEMO_SUPPLIER_PROFILE_ID,
        title="D12.3 C: Grundlage vorhanden",
        demo_case="d12-partial-strategy",
        purpose="Readiness `Grundlage vorhanden` und offene Bausteine pruefen.",
    )
    _upsert_strategy(
        session,
        D12_PARTIAL_STRATEGY_ID,
        project_id=D12_PARTIAL_PROJECT_ID,
        title="D12.3 C: Teilstrategie mit ersten Ankern",
        demo_case="d12-partial-strategy",
        purpose="Objectives, ZOPA und Konzessionen vorhanden; BATNA, WAP und Argumente bleiben offen.",
        overall_objective="Preis- und Lieferterminrahmen klaeren, ohne automatische Strategieerzeugung.",
        target_outcome="Preis unter 790 EUR und priorisierte Teillieferung im Oktober.",
        zopa_summary="Erster Preisanker fuer moeglichen Einigungskorridor dokumentiert.",
        concession_strategy="Forecast-Frequenz als moeglicher Tauschanker vormerken.",
        risk_assessment="BATNA, WAP und Argumentationslinie sind bewusst noch offen.",
    )
    _upsert_partial_strategy_anchor(session)

    _upsert_d12_request_item(
        session,
        D12_READY_REQUEST_ITEM_ID,
        title="D12.3 D: Bedarf mit vollstaendiger Strategy",
        article_name="D12.3 Ready Strategy Servo-Kit",
        demo_case="d12-ready-strategy",
        purpose="Demo D: alle zentralen Readiness-Bausteine vorhanden.",
    )
    _upsert_d12_project(
        session,
        D12_READY_PROJECT_ID,
        request_item_id=D12_READY_REQUEST_ITEM_ID,
        supplier_profile_id=DEMO_SUPPLIER_PROFILE_ID,
        title="D12.3 D: Bereit fuer Briefing und Simulation",
        demo_case="d12-ready-strategy",
        purpose="Readiness `Bereit fuer Briefing / Simulation` und Next-Action-Guidance pruefen.",
    )
    _upsert_strategy(
        session,
        D12_READY_STRATEGY_ID,
        project_id=D12_READY_PROJECT_ID,
        title="D12.3 D: Vollstaendige Strategy",
        demo_case="d12-ready-strategy",
        purpose="Alle Kernbausteine vorhanden; Folgepfade bleiben Vorbereitung, keine produktive Simulation.",
        overall_objective="Preisbindung, Lieferfenster und Eskalationsmechanismus verbindlich klaeren.",
        target_outcome="750 EUR Zielpreis, Teillieferung bis Ende September, Forecast gegen Priorisierung.",
        minimum_acceptable_outcome="Maximal 790 EUR bei verbindlichem Lieferplan und technischer Kompatibilitaet.",
        walk_away_point="Keine Einigung oberhalb 790 EUR ohne Lieferpriorisierung und Eskalationskontakt.",
        zopa_summary="Ziel 750 EUR, akzeptabler Korridor bis 790 EUR, erwartete Lieferantenseite 780-820 EUR.",
        batna_summary="Alternativer DACH-Integrator ist qualifizierbar, aber teurer und langsamer.",
        concession_strategy="Forecast-Transparenz und Abrufplan nur gegen Preisbindung und Liefertermin geben.",
        argumentation_summary="Planungssicherheit fuer Aurum gegen verbindlichen Preis- und Lieferrahmen tauschen.",
        risk_assessment="Materialpreis- und Kapazitaetsargumente mit begrenzter Preisbindung beantworten.",
    )
    _upsert_ready_strategy_anchors(session)

    _upsert_d12_request_item(
        session,
        D12_NO_SUPPLIER_REQUEST_ITEM_ID,
        title="D12.3 E: Bedarf ohne SupplierProfile",
        article_name="D12.3 No Supplier Servo-Kit",
        demo_case="d12-no-supplier",
        purpose="Demo E: Supplier Context Empty State und Preparation Gap pruefen.",
    )
    _upsert_d12_project(
        session,
        D12_NO_SUPPLIER_PROJECT_ID,
        request_item_id=D12_NO_SUPPLIER_REQUEST_ITEM_ID,
        supplier_profile_id=None,
        title="D12.3 E: Kein SupplierProfile",
        demo_case="d12-no-supplier",
        purpose="Supplier Context Empty State ohne CTA zu nicht vorhandenem SupplierProfile pruefen.",
    )


def seed_staging_demo_data(session: Session) -> dict[str, str]:
    _upsert_company(session)
    _upsert_request_item(session)
    _upsert_supplier_profile(session)
    _upsert_project(session)
    _upsert_d12_readiness_demo_data(session)
    session.commit()

    return {
        "company_id": str(DEMO_COMPANY_ID),
        "request_item_id": str(DEMO_REQUEST_ITEM_ID),
        "supplier_profile_id": str(DEMO_SUPPLIER_PROFILE_ID),
        "negotiation_project_id": str(DEMO_PROJECT_ID),
        "d12_empty_strategy_project_id": str(D12_EMPTY_PROJECT_ID),
        "d12_incomplete_strategy_project_id": str(D12_INCOMPLETE_PROJECT_ID),
        "d12_partial_strategy_project_id": str(D12_PARTIAL_PROJECT_ID),
        "d12_ready_strategy_project_id": str(D12_READY_PROJECT_ID),
        "d12_no_supplier_project_id": str(D12_NO_SUPPLIER_PROJECT_ID),
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
