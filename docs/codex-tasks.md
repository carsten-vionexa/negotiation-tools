# Codex Tasks

## Bereits erledigt

- Docker Compose fuer frontend/backend/db
- FastAPI-Grundstruktur
- Healthcheck
- SQLAlchemy-Models
- Alembic-Grundstruktur
- initiale Migration
- Backend get_db Dependency
- erste Pydantic-Schemas
- erste CRUD-Router
- bestehende Kernmodelle fachlich geschaerft
- Pydantic-Schemas fuer die erweiterten Kernmodelle aktualisiert
- additive Alembic-Migration fuer die fachlichen Kernmodell-Erweiterungen erstellt
- Knowledge-Base-Datenmodell um DocumentChunk und KnowledgeClaim erweitert
- Pydantic-Schemas fuer DocumentChunk und KnowledgeClaim ergaenzt
- additive Alembic-Migration fuer DocumentChunk und KnowledgeClaim erstellt
- Import-Datenmodell um ImportJob und ImportRow erweitert
- Pydantic-Schemas fuer ImportJob und ImportRow ergaenzt
- additive Alembic-Migration fuer ImportJob und ImportRow erstellt
- Strategie-Datenmodell um Strategy, ZopaItem, BatnaOption, ConcessionItem und ArgumentationLine erweitert
- Pydantic-Schemas fuer die Strategieobjekte ergaenzt
- additive Alembic-Migration fuer das Strategie-Datenmodell erstellt
- Simulation- und Auswertungsmodell um SimulationScenario, SimulationMessage, SimulationResult und TrainerComment erweitert
- Pydantic-Schemas fuer die Simulations- und Auswertungsobjekte ergaenzt
- additive Alembic-Migration fuer das Simulation- und Auswertungsmodell erstellt
- API-Fehlerbehandlung und Foreign-Key-Validierung fuer bestehende Create-Endpunkte verbessert
- Upload- und Dateiablage-Konzept dokumentiert
- Datei-Metadaten fuer KnowledgeDocument und ImportJob additiv ergaenzt
- Pydantic-Schemas fuer Upload-Datei-Metadaten aktualisiert
- additive Alembic-Migration fuer Upload-Datei-Metadaten erstellt
- relationale Datei-Metadaten vs. flexible JSONB-Informationen dokumentiert
- Parser- und Mapping-Konzept fuer Excel/CSV dokumentiert
- Validierungs- und Importfehler-Konzept dokumentiert
- Zielobjekt-Erzeugungs-Konzept fuer Imports dokumentiert
- Datei-Metadaten fuer spaetere Uploads additiv ergaenzt und Issue #11 abgeschlossen
- Zentrale Projektdokumentation ergaenzt: project-overview.md
- Aktualisiertes fachliches Hauptkonzept ergaenzt: workflow-v2.md
- Procurement-Erweiterungen aus dem Kick-off dokumentiert: procurement-process-concept.md
- Technische Architekturuebersicht ergaenzt: technical-architecture.md
- Roadmap-Uebersicht ergaenzt: roadmap.md

## Naechste Schritte

1. `screen-by-screen-concept.md` gegen `workflow-v2.md` und `procurement-process-concept.md` pruefen.
2. MVP-Screens priorisieren.
3. Entscheiden, welche Kick-off-Erweiterungen in den MVP gehoeren:
   - einfache Stakeholdernotizen
   - einfache Hypothesenliste
   - einfache Lieferantenbeziehungsnotiz
   - RFQ / Angebotsvergleich nur konzeptionell oder als einfacher Screen
4. Danach konkrete Frontend- und API-Arbeitspakete ableiten.
5. Chunking-Service, Embedding-Erzeugung und RAG spaeter planen.
