# Data Model

## Aktueller Stand

Das Backend nutzt PostgreSQL mit pgvector, SQLAlchemy-Models und Alembic-Migrationen. Das aktuelle Datenmodell bildet eine bewusst MVP-reduzierte Grundlage fuer ein KI-gestuetztes Verhandlungs-Cockpit ab: Unternehmen, Nutzerprofile, Wissensdokumente, Anfragepositionen, Lieferantenprofile und Verhandlungsprojekte koennen bereits strukturiert gespeichert werden.

Die vorhandenen JSONB-Felder dienen als flexible Erweiterungspunkte, ohne das relationale Kernmodell jetzt schon fachlich zu ueberdehnen. Detailmodelle fuer Import, Chunking, Claims, Strategien, Simulationen und Trainerfeedback sind noch nicht implementiert.

## Vorhandene Kernmodelle

- `Company`: Mandantennahe Unternehmensbasis fuer Profile, Dokumente, Anfragen, Lieferanten und Projekte.
- `UserProfile`: Nutzer- oder Rollenprofil innerhalb eines Unternehmens.
- `KnowledgeDocument`: Metadaten und optionaler Textinhalt fuer Wissensdokumente.
- `RequestItem`: Einkaufs- oder Anfrageposition als Gegenstand einer Verhandlung.
- `SupplierProfile`: Lieferantenprofil mit Kontakt-, Beziehungs- und Annahmedaten.
- `NegotiationProject`: Verhandlungsprojekt mit Verweisen auf Unternehmen, Owner, Anfrageposition und Lieferant.
- `ProcurementHistoryItem`: Historische Einkaufspositionen als Datenbasis fuer spaetere Analysen.

## Bewusste MVP-Reduktion

Das Modell ist aktuell absichtlich schlank gehalten. Es soll eine stabile technische Grundlage bereitstellen, bevor fachliche Spezialobjekte, Importpipelines, RAG-Strukturen oder Simulationsdaten festgelegt werden. Neue Tabellen sollten erst nach einer fachlichen Review des Zielmodells ergaenzt werden.

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
