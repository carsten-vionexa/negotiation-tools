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
- Phase A1 abgeschlossen: MVP-Screen-Scope fachlich in `screen-by-screen-concept.md` finalisiert
- Phase B1 begonnen: API- und Frontend-Gap-Analyse fuer die 10 MVP-Core-Screens erstellt
- Phase B2 umgesetzt: Backend API Readiness fuer Company, UserProfile, SupplierProfile, RequestItem und NegotiationProject mit Listenfiltern, PATCH-Endpunkten und konsistenter Foreign-Key-Validierung
- Phase B3 umgesetzt: Lesende Backend API Readiness fuer Knowledge Base, Importstatus und Einkaufsdaten mit GET-Endpunkten fuer DocumentChunk, KnowledgeClaim, ProcurementHistoryItem, ImportJob und ImportRow sowie zusaetzlichen KnowledgeDocument-Listenfiltern
- Phase B4 umgesetzt: Backend API Readiness fuer Strategieobjekte mit CRUD-nahen GET/POST/PATCH-Endpunkten, Listenfiltern und Foreign-Key-Validierung fuer Strategy, ZopaItem, BatnaOption, ConcessionItem und ArgumentationLine
- Phase B5 umgesetzt: Backend API Readiness fuer SimulationScenario und TrainerComment mit GET/POST/PATCH-Endpunkten, Listenfiltern, Foreign-Key-Validierung und Sichtbarkeitsfilter fuer Trainerkommentare
- Phase B6 umgesetzt: Frontend-Grundlayout mit App-Shell, MVP-Navigation, App-Router-Platzhalterroutes, schlankem API-Client und einfachen Loading-/Error-/Empty-State-Mustern vorbereitet
- Phase B7 umgesetzt: Frontend-Flows fuer Companies, UserProfiles und NegotiationProjects mit Listen, Details, einfachen Create/Edit-Formularen, Projektbeziehungen zu Company/UserProfile/SupplierProfile/RequestItem und Dashboard-Zaehlern ergaenzt
- Phase B8 umgesetzt: Frontend-Flow fuer Datenbasis und Analyse mit Knowledge-API-Modulen, projekt-/companybezogenen Leseansichten, Datenluecken-Empty-States und Links aus dem Projektdetail vorbereitet

## Manuelle Pruefhilfe Phase B7

- `/dashboard`: Zaehler fuer Projekte, Companies und Profile pruefen.
- `/companies`: Company-Liste, Empty/Error-State und einfache Anlage pruefen.
- `/companies/[id]`: Stammdaten bearbeiten und verknuepfte Projekte pruefen.
- `/profiles`: Rollenprofil-Liste und einfache Anlage mit Company-Auswahl pruefen.
- `/profiles/[id]`: Profilbearbeitung und Owner-Projektliste pruefen.
- `/projects`: Projektliste und Projektanlage mit Company-, Owner-, Supplier- und Request-Item-Auswahl pruefen.
- `/projects/[id]`: Projektbearbeitung, Beziehungsbox und Link zur Company pruefen.

## Manuelle Pruefhilfe Phase B8

- `/knowledge-base`: Auswahl-/Uebersichtsansicht und Empty-States fuer Quellen, Claims, Anfragepositionen und Einkaufshistorie pruefen.
- `/knowledge-base?projectId=<bestehende Projekt-ID>`: Projektkontext, abgeleitete Company und gefilterte Datenbasis pruefen.
- `/analysis`: Projekt-Auswahl oder Hinweis bei leerem Datenbestand pruefen.
- `/analysis?projectId=<bestehende Projekt-ID>`: Projekt, Company, SupplierProfile, RequestItem, Claim-Gruppen, Hypothesen, Datenluecken, Risiken, Chancen und offene Fragen pruefen.
- `/projects/[id]`: Links "Datenbasis anzeigen" und "Analyse vorbereiten" pruefen.

## Naechste Schritte

1. Frontend-Flows fuer Strategie-Builder, Simulation konfigurieren und Trainerreview ableiten.
2. Dashboard bei Bedarf spaeter als Summary-API statt Listenkomposition optimieren.
3. Chunking-Service, Embedding-Erzeugung, RAG, Upload/Import, OCR, Voice und produktive Simulation spaeter planen.
