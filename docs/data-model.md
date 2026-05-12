# Data Model

## Aktueller Stand

Das Backend nutzt PostgreSQL mit pgvector, SQLAlchemy-Models und Alembic-Migrationen. Das aktuelle Datenmodell bildet eine bewusst MVP-reduzierte, aber fachlich geschaerfte Grundlage fuer ein KI-gestuetztes Verhandlungs-Cockpit ab: Unternehmen, Nutzerprofile, Wissensdokumente, Anfragepositionen, Lieferantenprofile, Einkaufshistorien und Verhandlungsprojekte koennen bereits strukturiert gespeichert werden.

Die vorhandenen JSONB-Felder dienen als flexible Erweiterungspunkte, ohne das relationale Kernmodell jetzt schon fachlich zu ueberdehnen. Detailmodelle fuer Import, Chunking, Claims, Strategien, Simulationen und Trainerfeedback sind weiterhin bewusst nicht implementiert.

## Vorhandene Kernmodelle

- `Company`: Mandantennahe Unternehmensbasis fuer Profile, Dokumente, Anfragen, Lieferanten und Projekte.
- `UserProfile`: Nutzer- oder Rollenprofil innerhalb eines Unternehmens.
- `KnowledgeDocument`: Metadaten und optionaler Textinhalt fuer Wissensdokumente.
- `RequestItem`: Einkaufs- oder Anfrageposition als Gegenstand einer Verhandlung.
- `SupplierProfile`: Lieferantenprofil mit Kontakt-, Beziehungs- und Annahmedaten.
- `NegotiationProject`: Verhandlungsprojekt mit Verweisen auf Unternehmen, Owner, Anfrageposition und Lieferant.
- `ProcurementHistoryItem`: Historische Einkaufspositionen als Datenbasis fuer spaetere Analysen.

## Fachliche Schaerfung der Kernmodelle

Die bestehenden Kernmodelle wurden additiv erweitert. Es wurden keine bestehenden Spalten entfernt und keine neuen Workflow- oder Analyse-Tabellen eingefuehrt.

- `ProcurementHistoryItem`: `supplier_country`, `lead_time_weeks`, `quality_rating`, `price_assessment`, `improvement_potential`.
- `RequestItem`: `article_name`, `article_description`, `target_delivery_time`, `rough_price_expectation`, `target_region`, `status`, `comment`.
- `KnowledgeDocument`: `project_id`, `source_name`, `source_author`, `source_date`, `reliability_level`, `confidentiality_level`, `description`. Das bestehende `embedding`-Feld bleibt erhalten; eine spaetere Chunk-Architektur wird separat entschieden.
- `SupplierProfile`: `region`, `industry`, `supplier_type`, `power_level`, `risk_level`, `cultural_context`, `interests_json`, `likely_tactics_json`, `constraints_json`, `is_ai_generated`, `confidence_level`.
- `NegotiationProject`: `project_type`, `category`, `article_or_service`, `quantity`, `target_region`, `desired_delivery_time`, `internal_price_expectation`, `currency`, `current_supplier`, `priority`, `business_pressure`, `technical_dependency_level`, `supplier_power_level`, `risk_level`.

`KnowledgeDocument` kann optional einem `NegotiationProject` zugeordnet werden. Die Beziehung ist nullable und nutzt `ondelete="SET NULL"`, damit Dokumente beim Entfernen eines Projekts nicht geloescht werden.

## Bewusste MVP-Reduktion

Das Modell ist weiterhin absichtlich fokussiert gehalten. Es soll eine stabile technische Grundlage bereitstellen, bevor fachliche Spezialobjekte, Importpipelines, RAG-Strukturen oder Simulationsdaten festgelegt werden. Neue Tabellen sollten erst nach einer fachlichen Review des Zielmodells ergaenzt werden.

## Noch nicht implementierte Fachobjekte

- `tenants`
- `document_chunks`
- `knowledge_claims`
- `import_jobs`
- `import_rows`
- `strategies`
- `zopa_items`
- `batna_options`
- `concession_items`
- `argumentation_lines`
- `cultural_briefings`
- `simulation_scenarios`
- `simulation_messages`
- `simulation_results`
- `trainer_comments`
