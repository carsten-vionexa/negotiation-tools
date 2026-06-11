# Codex Tasks

## Definition of Done

- `docs/roadmap.md` pruefen und aktualisieren oder bewusst unveraendert lassen.
- `docs/codex-tasks.md` pruefen und aktualisieren oder bewusst unveraendert lassen.
- Wenn keine Dokumentationsaenderung noetig ist, die Begruendung im Abschlusskommentar dokumentieren.

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
- Phase B9 umgesetzt: Frontend-Flow fuer Strategie-Builder mit Strategie-Kopf, ZOPA, BATNA, Konzessionen als Tauschobjekte und Argumentationslinien auf bestehenden Strategie-Endpunkten vorbereitet
- Phase B10 umgesetzt: Frontend-Flows fuer Szenario-Konfiguration und Trainerreview mit SimulationScenario- und TrainerComment-API-Modulen vorbereitet
- Phase C0.1 umgesetzt: MVP-Abnahme-Checkliste nach Phase B in `docs/mvp-acceptance-checklist.md` erstellt
- Phase C0.2 umgesetzt: Browser-Smoke-Test-Plan fuer MVP-Routen in `docs/browser-smoke-test-plan.md` erstellt
- Phase C0.3 umgesetzt: End-to-End-Testpfad mit Rheinwerk-Demo-Fall in `docs/mvp-e2e-test-path.md` erstellt
- Phase C0.4 umgesetzt: Technische Verifikations-Checkliste in `docs/technical-verification-checklist.md` erstellt
- Phase C0.5 umgesetzt: Roadmap und Nicht-MVP-Grenzen nach Phase B aktualisiert
- Phase C0.6 umgesetzt: Frontend-Konsolidierungsplan fuer grosse MVP-Seiten in `docs/frontend-consolidation-plan.md` erstellt
- Phase C0.7 umgesetzt: MVP-Abnahmetest durchgefuehrt und Ergebnisse in `docs/mvp-acceptance-results.md` dokumentiert
- Phase C1 umgesetzt: Verbindlichen Upload-/Import-API-Kontrakt in `docs/upload-import-api-contract.md` dokumentiert, ohne Upload-, Storage- oder Importlogik zu implementieren
- Phase C2 umgesetzt: Lokale Storage-Service-Grundlage mit konfigurierbaren Upload-Verzeichnissen, serverseitigen relativen Storage-Keys, Extension-Regeln, sicherer Pfadauflosung, SHA-256-Pruefsumme und Groessenlimit-Pruefung vorbereitet, ohne Upload-Endpunkte oder Importlogik zu implementieren
- Phase C3 umgesetzt: KnowledgeDocument-Upload-Endpunkt mit sicherer lokaler Dateiablage ueber den C2-Storage-Service, Datei- und Quellenmetadaten sowie Pending-Startzustand implementiert, ohne Parsing-, Chunk-, Claim- oder Importlogik
- Phase C4 umgesetzt: ImportJob-Upload-Endpunkt fuer CSV-/XLSX-Dateien mit sicherer lokaler Dateiablage ueber den C2-Storage-Service, Datei- und Importmetadaten sowie Pending-Startzustand implementiert, ohne ImportRows, Parsing, Mapping, Validierung oder Zielobjekt-Erzeugung
- Phase C5 umgesetzt: ImportJob-Verarbeitungs-, Status- und Review-Kontrakt sowie CSV-/XLSX-Parser-Vorbereitung in `docs/import-job-processing-contract.md` dokumentiert, ohne Parser-, Mapping-, Validierungs-, Zielobjekt-, API- oder Migrationslogik
- Phase C6 umgesetzt: CSV-Parser-Endpunkt fuer gespeicherte pending ImportJobs implementiert, der atomar ausschliesslich technische `ImportRow`-Rohdaten mit Quellzeilennummern erzeugt, ohne XLSX/PDF, Mapping, Validierung oder Zielobjekt-Erzeugung
- Phase C7 umgesetzt: XLSX-Parser an den bestehenden Parse-Endpunkt angeschlossen, der aus dem ersten sichtbaren Worksheet atomar ausschliesslich technische `ImportRow`-Rohdaten mit Sheet- und Quellzeilenbezug erzeugt, ohne PDF/OCR, Mapping, Validierung oder Zielobjekt-Erzeugung
- Phase C8 umgesetzt: Expliziten Mapping-Endpunkt fuer geparste ImportJobs implementiert, der validierte Mapping-Konfigurationen und unveraenderte Raw-Werte ausschliesslich in `ImportJob.mapping_json` und `ImportRow.mapped_data_json` uebernimmt, ohne Validierung, Zielobjekte, PDF/OCR oder KI-Zuordnung
- Phase C9 umgesetzt: Minimalen Validierungs-Endpunkt fuer gemappte ImportRows implementiert, der `valid`/`invalid`, knappe Row-Fehler, Job-Zaehler und `validation_summary_json` setzt, ohne Zielobjekte, PDF/OCR oder KI-Validierung
- Phase C10 umgesetzt: Zielobjekt-Erzeugung fuer validierte `procurement_history_item`-ImportRows mit `POST /import-jobs/{id}/create-targets`, Row-Zielreferenzen, Statusabschluss und Idempotenzschutz ueber `target_record_id` implementiert, ohne RequestItem-, SupplierProfile-, Frontend-, PDF/OCR- oder KI-Logik
- Phase C11 umgesetzt: Zielobjekt-Erzeugung fuer validierte `request_item`-ImportRows ueber den bestehenden Create-Targets-Endpunkt mit defensiver `title`-Ableitung aus `article_name`, Modell-Defaultstatus und Idempotenzschutz implementiert, ohne SupplierProfile-, Frontend-, PDF/OCR-, KI-, Parser-, Mapping- oder neue Validierungslogik
- Phase C12 umgesetzt: Read-only-Frontend-Liste und -Detailansicht fuer bestehende ImportJobs unter `/imports` und `/imports/[id]` mit Status-, Summary- und ImportRow-Reviewdaten sowie Navigationseintrag umgesetzt, ohne Upload-, Processing-, Backend- oder Migrationslogik
- Phase C13 umgesetzt: CSV-/XLSX-Upload-Frontend unter `/imports/new` mit Company-/Projektkontext, `source_type`, `target_entity`, Server-Action-Validierung und Redirect auf `/imports/[id]` umgesetzt, ohne Processing-, Backend- oder Migrationslogik
- Phase C14 umgesetzt: Parse-Aktion fuer `pending` CSV-/XLSX-ImportJobs in `/imports/[id]` mit Server-Action-Fehleranzeige, Revalidierung und bestehender Row-Reviewanzeige umgesetzt, ohne Mapping-, Validate-, Create-Targets-, Backend- oder Migrationslogik
- Phase C15 umgesetzt: Explizite Mapping-Aktion fuer `parsed` ImportJobs in `/imports/[id]` mit Raw-Quellfeldauswahl, target-entity-spezifischen Zielfeldern und sichtbaren `mapping_json`-/`mapped_data_json`-Ergebnissen umgesetzt, ohne Validate-, Create-Targets-, Backend- oder Migrationslogik
- Phase C16 umgesetzt: Validate-Aktion fuer `mapped` ImportJobs in `/imports/[id]` mit Server-Action-Fehleranzeige, Revalidierung sowie sichtbarer `validation_summary_json`- und Row-Validierungsanzeige umgesetzt, ohne Create-Targets-, Backend- oder Migrationslogik
- Phase C17 umgesetzt: Create-Targets-Aktion fuer `validated` ImportJobs in `/imports/[id]` mit Server-Action-Fehleranzeige, Revalidierung, sichtbaren Row-Zielreferenzen und `request_item`-Links umgesetzt, ohne Backend-, Migrations-, PDF/OCR-, KI-Mapping- oder automatische Analyse-Logik
- Frontend-Nutzbarkeitsflow Issue #66 umgesetzt: SupplierProfile-Liste sowie Create/Edit-Detailflow unter `/suppliers` ergaenzt, in die Navigation aufgenommen und den strukturierten Lieferantenbezug in Projektanlage und Projektdetail nutzbar gemacht, ohne Backend-, Import- oder Migrationslogik
- Frontend-Nutzbarkeitsflow Issue #69 umgesetzt: RequestItem-Liste sowie Create/Edit-Detailflow unter `/request-items` ergaenzt, in die Navigation aufgenommen und die strukturierte Anfrageposition in Projektanlage und Projektdetail nutzbar gemacht, ohne Backend-, Import- oder Migrationslogik
- Frontend-Hardening Issue #73 umgesetzt: Gemeinsamen `FormData`-Helper fuer getrimmte optionale Werte und explizite Pflichtfeldfehler eingefuehrt sowie die bestehenden Frontend-Server-Actions darauf umgestellt, ohne Backend-, Import- oder Migrationslogik
- Phase D0 umgesetzt: Hostinger-VPS-Staging-Vorbereitung mit `docker-compose.staging.yml`, `.env.staging.example`, `.gitignore`-Schutz fuer echte Staging-/Production-Env-Dateien und `docs/staging-deployment-prep.md` dokumentiert, ohne echtes Deployment, Serverzugriff, Produktlogik oder Secrets
- Phase D3.1 umgesetzt: Project-Detailseite zeigt eine kompakte Supplier Context Card aus vorhandenen `SupplierProfile`-Daten, ohne Backend, Migration, KI, Scoring, RAG oder neues Datenmodell
- Phase D3.2 umgesetzt: Dokumentations-Guardrails ergaenzt mit Feature-/Task-Issue-Template, Documentation-/Roadmap-Checkliste, Definition-of-Done-Regel und nicht-blockierendem PR-Warning, ohne Produktlogik
- Phase D3.4 umgesetzt: Staging-Demo-Seed um ein synthetisches SupplierProfile fuer `Aurum Motion Systems K.K.` erweitert und das Rheinwerk-Robotics-Demo-Projekt idempotent ueber `supplier_profile_id` damit verknuepft, ohne Migration, Backend-API-, Frontend- oder Produktfunktionsaenderung
- Phase D3.5 umgesetzt: Staging-Smoke-Test fuer den verknuepften Supplier Context bestanden, ohne Produkt-, Seed-, API- oder Migrationsaenderung
- Phase D3.6 umgesetzt: Supplier Context Card um kompakte Readiness-/Missing-Information-Hints aus vorhandenen `SupplierProfile`-Feldern erweitert, ohne Backend, Migration, API, KI, Scoring oder Seed-Aenderung
- Phase D3.7 umgesetzt: Staging-Smoke-Test fuer Supplier Readiness Hints bestanden, ohne Produkt-, Seed-, API- oder Migrationsaenderung
- Phase D3.8 umgesetzt: Supplier Context Card um einen ruhigen Edit-Guidance-CTA zum bestehenden `SupplierProfile` erweitert, ohne Backend, Migration, API, neue Edit-Seite, Inline-Editing, KI oder Scoring
- Phase D3.9 umgesetzt: Staging-Smoke-Test fuer Edit Guidance bestanden, ohne Produkt-, Seed-, API- oder Migrationsaenderung
- Phase D3.10 umgesetzt: D3 Supplier Context als erster UX-Strang vorlaeufig dokumentarisch abgeschlossen und D4 als moegliche spaetere Project-Preparation-/Preparation-Gaps-Richtung abgegrenzt, ohne Code-, Staging-, Seed-, API-, Migrations- oder Produktfunktionsaenderung
- Phase D4.1 umgesetzt: Project-Detailseite zeigt eine kompakte Preparation Gaps Card fuer Bedarfskontext, SupplierProfile, Supplier Context, Strategy, Strategiebausteine, SimulationScenario und Trainerreview aus vorhandenen Daten und bestehenden API-Listen, ohne Backend, Migration, KI, Scoring, RAG oder neues Datenmodell
- Phase D4.2 umgesetzt: Die Preparation Gaps Card fuehrt bei fehlender Strategie klarer zum bestehenden Strategie-Einstieg, stellt Strategiebausteine nachgelagert zur Strategieanlage dar und betont, dass keine Strategie automatisch erzeugt wird
- Phase D4.3 umgesetzt: Der bestehende Strategy-Einstieg `/strategy?projectId=...` zeigt fuer Projekte ohne Strategie einen klareren projektbezogenen Empty State, nutzt weiter den vorhandenen Strategie-Anlage-Workflow und stellt ZOPA, BATNA, Argumente und Konzessionen als nachgelagerte Schritte dar, ohne automatische Strategieerzeugung, Backend, Migration, neue Route oder Datenmodell-Aenderung
- Phase D4.4 umgesetzt: D4.1 bis D4.3 als aktueller D4-Preparation-UX-Zwischenstand dokumentiert und kompakten Smoke-Test-Plan fuer Project Detail -> Preparation Gaps Card -> Strategie vorbereiten -> Strategy Empty State -> Strategie manuell anlegen ergaenzt, ohne Produkt-, Frontend-, Backend-, Migrations-, Seed-, Env- oder Staging-Aenderung
- Phase D5.1 umgesetzt: Nach manueller Strategieanlage aus `/strategy?projectId=...` zeigt der bestehende Strategy-Flow eine Success Guidance mit Rueckweg zu `/projects/<projectId>` und ordnet ZOPA, BATNA, Argumente und Konzessionen als nachgelagerte Schritte ein, ohne neue Route, Backend, Migration, KI, Scoring oder automatische Strategieerzeugung
- Phase D5.2 umgesetzt: Bei vorhandener Strategie zeigt `/strategy?projectId=...` eine kompakte Building-Blocks-Guidance fuer ZOPA, BATNA, Argumente und Konzessionen mit Status aus vorhandenen Bausteinen, ohne automatische Baustein-Erzeugung, Backend, Migration, KI, Scoring, RAG, neue Route oder Datenmodell-Aenderung
- Phase D5.3 umgesetzt: Die bestehende Strategy-Guidance erklaert WAP / Walk-away Point als manuelle Abbruchgrenze aus Ziel, Risiko, Kosten/Nutzen und BATNA und grenzt ihn von Konzessionen und ZOPA ab, ohne automatische Berechnung, Backend, Migration, KI, Scoring, neue Route oder Datenmodell-Aenderung
- Phase D5.4 umgesetzt: Die MVP-Workflow-Sidebar nennt WAP im Strategie-Menuepunkt und nutzt konsistente lesbare Normal-, Hover- und Active-States fuer Icon, Titel und Beschreibung, ohne Menuestruktur, Routen, Backend, Migration, KI, Scoring oder Datenmodell-Aenderung
- Phase D5.5 umgesetzt: Lokaler Browser-Smoke-Test fuer den D5.1-D5.4-Strategy-Guidance-Flow bestanden und in `docs/browser-smoke-test-plan.md` dokumentiert, ohne Produkt-, UI-Logik-, Backend-, Migrations-, Seed-, KI-, Scoring- oder RAG-Aenderung
- Phase D5.6 umgesetzt: Hostinger-Staging per Fast-Forward auf `46b045f` aktualisiert, Staging-Stack neu gebaut/gestartet und D5-Strategy-Guidance-Flow browserseitig bestanden dokumentiert, ohne Produktcode-, Backend-, Migrations-, Seed-, KI-, Scoring- oder RAG-Aenderung
- Phase D6.1 umgesetzt: Strategy-Formularfelder, Pflichtfeldsignale, Placeholder und Hilfetexte fuer Strategy Objectives, ZOPA, BATNA, WAP, Konzessionen und Argumente fachlich geschaerft; ZOPA-Dimension wird nun als minimaler Pflichtanker validiert, ohne Backend, Migration, neue Datenstruktur, KI, Scoring, RAG oder automatische Strategieerzeugung
- Phase D6.2 umgesetzt: Lokaler Browser-Smoke-Test fuer D6.1 mit laufendem Backend, Frontend und DB bestanden und in `docs/browser-smoke-test-plan.md` dokumentiert; Project Detail, `/strategy?projectId=...`, `/strategy`, Pflichtfeldverhalten, Placeholder, Hilfetexte, Save-Verhalten, Rueckweg und Mobile-Spotcheck wurden geprueft, ohne Produktcode, Backend, Migration, neue UI-Funktionalitaet, KI, Scoring oder RAG zu aendern
- Phase D6.3 umgesetzt: Hostinger-Staging auf `59e293d` aktualisiert und D6.1/D6.2-Strategy-Field-Guidance browserseitig auf Staging bestanden dokumentiert, ohne Produktcode-, Backend-, Migrations-, Seed-, KI-, Scoring- oder RAG-Aenderung
- Phase D7.1 umgesetzt: Strategy-Seite zeigt eine regelbasierte Completion-/Readiness-Guidance fuer Strategy Objectives, ZOPA, BATNA, WAP, Konzessionen und Argumente mit verbalem Status und fachlichen Warnhinweisen, ohne Score, KI, Backend, Migration, neue Persistenz oder Staging-Deployment
- Phase D7.2 umgesetzt: Lokaler Browser-Smoke-Test fuer die D7.1-Strategy-Readiness-Guidance bestanden und in `docs/browser-smoke-test-plan.md` dokumentiert; `/strategy`, `/strategy?projectId=...`, drei Readiness-Zustaende, fachliche Warnhinweise, vorhandene Anker, fehlende Bausteine, Mobile-Spotcheck und Console-Check wurden geprueft, ohne Produktcode, Backend, Migration, Seed-Datei, KI, Scoring, Simulation oder RAG zu aendern
- Phase D7.3 umgesetzt: Hostinger-Staging auf `7e80fce` aktualisiert und Strategy Readiness Guidance browserseitig auf Staging bestanden dokumentiert; Healthchecks, DB-Health, Alembic `2f4b7c8d9e0a (head)`, `/strategy?projectId=...`, `/strategy`, drei Readiness-Zustaende, D6-Feldfuehrung, Save-Verhalten, Mobile-Spotcheck und Console-Check wurden geprueft, ohne Produktcode, Backend, Migration, Seed-Datei, KI, Scoring, Simulation oder RAG zu aendern
- Phase D8.1 umgesetzt: Die Strategy-Seite zeigt bei Readiness `Bereit fuer Briefing / Simulation` eine kompakte Next-Action-Guidance fuer Briefing-, Simulations- und Trainerreview-Vorbereitung; vorhandene Simulation-/Trainerreview-Routen werden als Vorbereitungsbereiche verlinkt, die generische Briefing-Placeholder-Route bleibt bewusst unverlinkt, ohne Backend, Migration, KI-Briefing, produktive Simulation oder Trainerreview-Logik
- Phase D8.2 umgesetzt: Lokaler Browser-Smoke-Test fuer die D8.1 Strategy Next-Action-Guidance bestanden und in `docs/browser-smoke-test-plan.md` dokumentiert; `/strategy`, `/strategy?projectId=...`, drei Readiness-Zustaende, Briefing-Grenze, projektbezogene Simulation-/Trainerreview-Routen, D6-/D7-Feldfuehrung, Mobile-Spotcheck und Console-Check wurden geprueft, ohne Produktcode, Backend, Migration, Seed-Datei, KI-Briefing, produktive Simulation, Trainerreview-Logik oder RAG zu aendern
- Phase D8.3 umgesetzt: Hostinger-Staging auf `2aa47a2` aktualisiert und Strategy Next-Action-Guidance browserseitig auf Staging dokumentiert; Healthchecks, Alembic `2f4b7c8d9e0a (head)`, `/strategy?projectId=...`, `/strategy`, `/briefing`, projektbezogene Simulation-/Trainerreview-Routen, vollstaendiger Readiness-Zustand, Mobile und Console wurden geprueft; die unteren Staging-Readiness-Zustaende sind wegen nur einer vorhandenen Strategy und bestehender Leerwert-Save-Semantik als Einschraenkung dokumentiert
- Phase D8.4 umgesetzt: D8 als kleiner Strategy-Readiness-zu-Next-Action-Uebergangsblock dokumentarisch abgeschlossen und D9 als moeglicher naechster kleiner Produktblock `Briefing Preparation` abgegrenzt, ohne Produktcode, Frontend, Backend, Migration, Seed, Env, Staging-Deployment, KI-Briefing, Simulation, Trainerreview-Logik, Scoring, RAG oder PDF-/Import-Implementierung zu aendern
- Phase D9.1 umgesetzt: `/briefing` als ruhigen Briefing-Preparation-Einstieg fachlich geglaettet; die Seite ordnet den Schritt nach Strategy Readiness ein, nennt spaetere Briefing-Bausteine und grenzt automatische KI-Briefing-Erzeugung, Simulation und Trainerreview klar aus, ohne Backend, Migration, Persistenz oder neue Folgeprozesslogik
- Phase D9.2 umgesetzt: Hostinger-Staging auf `fd6b145` aktualisiert und `/briefing` als Briefing-Preparation-Einstieg browserseitig auf Staging bestanden dokumentiert; Healthchecks, DB-Health, Alembic `2f4b7c8d9e0a (head)`, Desktop, Mobile, Console, Briefing-Preparation-Abgrenzung, fehlende KI-Briefing-Erzeugung sowie fehlende Simulation-/Trainerreview-Funktion wurden geprueft, ohne Produktcode, Backend, Migration, Seed, KI, Scoring, Simulation, Trainerreview, RAG oder PDF-/Import-Verarbeitung zu aendern
- Phase D9.3 umgesetzt: `/briefing` ordnet `projectId` aus Search Params ruhig als Projektkontext ein und erklaert ohne `projectId`, dass ein Projekt beziehungsweise eine vorbereitete Strategy fuer konkrete Briefing Preparation benoetigt wird; die Strategy-Next-Action-Guidance erhaelt den Projektkontext im Link zu `/briefing?projectId=...`, ohne Backend, Migration, Persistenz, neue API-Aufrufe, KI-Briefing, Simulation oder Trainerreview-Logik
- Issue #154 / D10 umgesetzt: Getting Started / Guided Introduction fuer Demo- und Testnutzer bereitgestellt
- Issue #156 / D10.1 umgesetzt: Strategy Overview / Strategy Board UI-Prototyp unter `/strategy?projectId=...` vorbereitet
- Issue #157 / D10.2 umgesetzt: Lokaler Demo-Flow-Smoke-Test nach Getting Started und Strategy Overview bestanden dokumentiert
- Issue #158 / D10.3 umgesetzt: Hostinger-Staging aktualisiert und Demo-Flow-Smoke-Test bestanden dokumentiert
- Issue #159 / D10.4 umgesetzt: D10-Zwischenabschluss dokumentiert; Getting Started, Strategy Overview, lokaler Smoke-Test und Staging-Smoke-Test sind als abgeschlossen eingeordnet, D11 bleibt spaeterer Roadmapblock, offene Nicht-Blocker #55, #113 und #155 bleiben unveraendert offen
- Issue #160 / D11.1 umgesetzt: Preconditions fuer AI-assisted Strategy Coaching als reiner Konzeptschritt dokumentiert; Fakten, Nutzerannahmen, KI-Hypothesen, offene Fragen, Quellen-/Evidenzlogik, Speicherlogik nach Nutzerbestaetigung, UX-Leitplanken und D11-Folgephasen sind abgegrenzt, ohne Produkt-, Backend-, KI-, RAG-, Simulations-, Trainerreview-, API-, Migrations- oder Persistenzlogik einzufuehren
- Issue #161 / D11.2 umgesetzt: Kontextvertrag fuer projektbezogene KI-Nutzung als reiner Konzeptschritt in `docs/ai-strategy-context-contract.md` dokumentiert; Kontextbereiche, Datenquellen, Aussagearten, Evidenzmarker, Mindestqualitaet, Missing-Information-Hinweise und ungeeignete Kontextbestandteile sind abgegrenzt, ohne Produkt-, Backend-, Frontend-, KI-, RAG-, API-, Persistenz-, Migrations-, Simulations- oder Trainerreview-Logik einzufuehren
- Issue #162 / D11.3 umgesetzt: Quellen-, Claim- und Evidenzmodell fuer Strategy Coaching als reiner Konzeptschritt in `docs/ai-strategy-evidence-model.md` dokumentiert; Quellenbegriff, Claim-Begriff, Aussagearten, Evidenz-/Confidence-Stufen, Aktualitaet, Herkunft, Widerspruchslogik, Nutzung im Coaching und ungeeignete Claims beziehungsweise Quellen sind abgegrenzt, ohne Produkt-, Backend-, Frontend-, KI-, RAG-, API-, Persistenz-, Migrations-, Simulations-, Score- oder Trainerreview-Logik einzufuehren
- Issue #163 / D11.4 umgesetzt: D11-Konzeptzwischenstand und Implementierungsgrenze dokumentiert; D11.1 bis D11.3 sind als erledigtes Konzeptfundament eingeordnet, die massgeblichen Konzeptdokumente sind benannt, spaetere Folgeoptionen bleiben getrennt priorisierbar und #55, #113 sowie #155 bleiben offene Nicht-Blocker, ohne Produkt-, Backend-, Frontend-, KI-, RAG-, Claim-, API-, Persistenz-, Migrations-, Simulations-, Score- oder Staging-Logik einzufuehren
- Issue #164 / D12.1 umgesetzt: Demo-/Testdatenmatrix fuer Strategy Readiness und Preparation Flow als reiner Konzeptschritt in `docs/demo-test-data-matrix.md` dokumentiert; bestehende Rheinwerk-/Aurum-Demo-Daten, benoetigte Strategy-Readiness- und Preparation-Flow-Zustaende, lokale und spaetere Staging-Reproduzierbarkeit, Smoke-Test-Nutzung und offene Nicht-Blocker sind eingeordnet, ohne Produkt-, Backend-, Frontend-, Seed-, Migrations-, KI-, RAG-, API-, Persistenz-, Simulations-, Trainerreview- oder Staging-Logik einzufuehren
- Issue #165 / D12.2 umgesetzt: Technischen Demo-Seed-Plan in `docs/demo-seed-plan.md` dokumentiert; bestehende Rheinwerk-/Aurum-Demo-Daten, empfohlene getrennte Demo-Projekte, technische Zielzustaende, betroffene Entitaeten, erwartete UI-Zustaende, Idempotenz, lokale/Staging-Verfuegbarkeit, Ueberladungsrisiken und ein moeglicher D12.3-Zuschnitt sind eingeordnet, ohne Produkt-, Backend-, Frontend-, Seed-, Migrations-, KI-, RAG-, API-, Persistenz-, Simulations-, Trainerreview- oder Staging-Logik einzufuehren
- Issue #166 / D12.3 umgesetzt: Der bestehende idempotente Demo-Seed legt zentrale Readiness-Testfaelle fuer Empty Strategy, unvollstaendige Strategy, `Grundlage vorhanden`, `Bereit fuer Briefing / Simulation` und kein SupplierProfile an; Demo-IDs und Smoke-Test-Routen sind in `docs/demo-seed-plan.md`, `docs/demo-test-data-matrix.md` und `docs/browser-smoke-test-plan.md` dokumentiert, ohne Produktlogik, Frontend-UI, Backend-API, Migration, Staging-Deployment, KI, RAG, Claim-Extraktion, Simulation oder Trainerreview einzufuehren
- Issue #167 / D12.4 umgesetzt: Lokaler Browser-Smoke-Test fuer die D12.3-Demo-Readiness-Zustaende bestanden und in `docs/browser-smoke-test-plan.md` dokumentiert; Project Detail, Preparation Gaps, Supplier Context, Strategy Empty State, `Unvollstaendig`, `Grundlage vorhanden`, `Bereit fuer Briefing / Simulation`, Next-Action-Guidance, `/briefing?projectId=...`, Mobile und Console wurden geprueft, ohne Produktcode, Frontend-UI, Backend-API, Migration, Seed-Aenderung, Staging-Deployment, KI, RAG, Claim-Extraktion, Simulation oder Trainerreview einzufuehren
- Issue #168 / D12.5 umgesetzt: Hostinger-Staging auf `d598988` aktualisiert, Stack neu gebaut/gestartet, Alembic Head und idempotenter Demo-Seed geprueft und die D12.3-Demo-Readiness-Zustaende browserseitig auf Staging bestanden dokumentiert; Project Detail A-E, Preparation Gaps, Supplier Context vorhanden/offen, Strategy Empty State, `Unvollstaendig`, `Grundlage vorhanden`, `Bereit fuer Briefing / Simulation`, Next-Action-Guidance, `/briefing?projectId=...`, Mobile und Console wurden geprueft, ohne Produktcode, Frontend-UI, Backend-API, Migration, Seed-Logik, KI, RAG, Claim-Extraktion, Simulation oder Trainerreview einzufuehren
- Issue #169 / D12.6 umgesetzt: D12 als abgeschlossenen Demo-Readiness-Block dokumentiert; D12.1 bis D12.5, lokal und auf Staging demonstrierbare Readiness-/Preparation-Zustaende, Alembic Head, idempotenter Demo-Seed, Nicht-Ziele, offene Nicht-Blocker und ein sinnvoller naechster Produktblock sind eingeordnet, ohne Produktdateien, Frontend-UI, Backend-API, Migration, Seed-Aenderung, Staging-Aenderung, KI, RAG, Claim-Logik, Simulation oder Trainerreview einzufuehren
- Issue #170 / D13.1 umgesetzt: Produktkante `Strategy -> Briefing Preparation` als reiner Konzept-/Scope-Schritt in `docs/briefing-preparation-scope.md` dokumentiert; Simulation Preparation bleibt spaeterer Folgeblock, erste Briefing-Bausteine, zulaessige vorhandene Datenquellen, Nicht-Ziele und Folgeissue-Vorschlaege sind benannt, ohne Produktdateien, Frontend-UI, Backend-API, Migration, Seed-Aenderung, Staging-Aenderung, KI, RAG, Claim-Logik, Simulation oder Trainerreview einzufuehren
- Issue #146 umgesetzt: Codex-Kurzmodus in der Projekt-SKILL dokumentiert, kompakte operative `CODEX.md` im Repository-Root ergaenzt und README/Roadmap verlinkt beziehungsweise aktualisiert, ohne Produktdateien, Backend, Frontend, Migrationen, Staging oder Build-/Testskripte zu aendern

## Phase C0: MVP-Konsolidierung nach Phase B

Status: Abgeschlossen.

Ziel von Phase C0 war die Stabilisierung, fachliche Abnahme und bessere Pruefbarkeit des vorhandenen MVP-Standes nach Phase B. Phase C0 war keine Feature-Phase. Upload/Import, RAG, OCR, Voice, produktive Simulation und automatische Auswertung bleiben spaetere Ausbaustufen.

Umgesetzte C0-Arbeitspakete:

1. C0.1: Ausfuehrliche MVP-Abnahme-Checkliste erstellt.
2. C0.2: Browser-Smoke-Test-Plan fuer MVP-Routen dokumentiert.
3. C0.3: End-to-End-Testpfad mit Rheinwerk-Demo-Fall definiert.
4. C0.4: Technische Verifikations-Checkliste ergaenzt.
5. C0.5: Roadmap und Nicht-MVP-Grenzen nach Phase B aktualisiert.
6. C0.6: Frontend-Konsolidierungsplan fuer grosse MVP-Seiten erstellt.
7. C0.7: MVP-Abnahmetest durchgefuehrt und in `docs/mvp-acceptance-results.md` dokumentiert.

Ergebnis der C0.7-Abnahme:

- Gesamtergebnis: bestanden mit offenen Nicht-Blockern.
- Keine harten Blocker fuer Phase C gefunden.
- Docker-Frontend-Dev-Setup mit Next.js/Turbopack ist als technischer Nicht-Blocker dokumentiert.
- SupplierProfile- und RequestItem-Frontend-Flows sind als fachlich wichtige Verbesserungspunkte fuer Phase C dokumentiert.
- Phase C Upload/Import kann nach Abschluss und Merge von Issue #46 geplant und gestartet werden.

## Phase C: Upload und Import

Status: Phase C1 bis C17, C23, C24, die Frontend-Nutzbarkeitsflows aus Issues #66 und #69 sowie die Frontend-Hardening-Nacharbeit aus Issue #73 umgesetzt.

Umgesetzte Schritte:

1. C1: Upload-/Import-Architektur und API-Kontrakt in `docs/upload-import-api-contract.md` festgelegt.
2. C2: Konfigurierbare lokale Upload-Verzeichnisse und Storage-Service fuer sichere relative Keys, Dateityp-Regeln, Pfadauflosung, SHA-256 und Groessenlimit vorbereitet.
3. C3: `POST /knowledge-documents/upload` fuer `.pdf`-, `.md`- und `.txt`-Dateien mit Knowledge-Metadaten, sicherer Ablage und `parsing_status="pending"` umgesetzt.
4. C4: `POST /import-jobs/upload` fuer `.csv`- und `.xlsx`-Dateien mit Importmetadaten, sicherer Ablage und `status="pending"` umgesetzt; es entstehen keine `ImportRow`-Datensaetze.
5. C5: ImportJob-Lifecycle, Status-/Review-API-Kontrakt, Rohdaten- und Fehlervertrag sowie getrennte PDF-Beruecksichtigung in `docs/import-job-processing-contract.md` dokumentiert.
6. C6: `POST /import-jobs/{id}/parse` fuer gespeicherte CSV-Dateien umgesetzt; der Endpoint erzeugt ausschliesslich reviewbare `ImportRow.raw_data_json`-Rohdaten, aktualisiert Parserstatus und Zaehler und beendet strukturelle Parserfehler ohne Teil-Rows als `failed`.
7. C7: Den bestehenden Parse-Endpunkt fuer gespeicherte XLSX-Dateien erweitert; der separate technische Parser liest das erste sichtbare Worksheet, erhaelt `sheet_name` und Quellzeilennummern und verwendet denselben reinen Raw-Row-Vertrag wie CSV.
8. C8: `POST /import-jobs/{id}/map` fuer Jobs im Status `parsed` umgesetzt; der Endpoint verlangt ein explizites `field_mapping`, verwendet die bestehenden Modellfeldnamen und befuellt atomar ausschliesslich Mapping-Konfiguration und gemappte Row-Rohwerte.
9. C9: `POST /import-jobs/{id}/validate` fuer Jobs im Status `mapped` umgesetzt; der Endpoint prueft gemappte Pflicht-, Zahlen-, Datums- und Waehrungswerte, markiert Rows als `valid` oder `invalid` und aggregiert das Review-Ergebnis als `validated`, auch wenn einzelne Rows fehlerhaft sind.
10. C10: `POST /import-jobs/{id}/create-targets` fuer validierte Jobs mit Ziel `procurement_history_item` umgesetzt; der Endpoint erzeugt Zielobjekte ausschliesslich aus gueltigen `mapped_data_json`-Rows, setzt Row-Referenzen und schliesst idempotent als `completed` oder `completed_with_errors` ab.
11. C11: Den bestehenden Create-Targets-Endpunkt fuer validierte Jobs mit Ziel `request_item` erweitert; er erzeugt echte `RequestItem`-Datensaetze aus gueltigen `mapped_data_json`-Rows, leitet fehlende Titel aus `article_name` ab und belaesst `status` beim Modell-Default `open`.
12. C12: Bestehende ImportJobs unter `/imports` gelistet und unter `/imports/[id]` mit Datei-, Status-, Zaehler-, Summary- und ImportRow-Reviewdaten lesbar gemacht; die Navigation fuehrt zur Ansicht und stellt keine Verarbeitungsaktion bereit.
13. C13: Einen sichtbaren Einstieg unter `/imports` und das Upload-Formular `/imports/new` fuer `.csv`/`.xlsx` bereitgestellt; der serverseitige Multipart-Upload validiert Pflichtfelder und fuehrt nach Anlage direkt in die Read-only-Detailansicht, ohne Processing auszulösen.
14. C14: In `/imports/[id]` den Parse-Start ausschliesslich fuer `pending`-Jobs bereitgestellt; Erfolg aktualisiert Status, Zaehler und ImportRows fuer Review, waehrend API-/Statusfehler sichtbar bleiben.
15. C15: In `/imports/[id]` fuer `parsed`-Jobs ein explizites Mappingformular bereitgestellt; Quellfelder stammen aus sichtbaren `raw_data_json`, Zielfelder aus dem bestehenden Vertrag und Erfolg aktualisiert `mapping_json` sowie gemappte Row-Daten im Review.
16. C16: In `/imports/[id]` die Validate-Aktion ausschliesslich fuer `mapped`-Jobs bereitgestellt; Erfolg aktualisiert Status, `validation_summary_json` sowie Row-Status und Row-Fehler-/Warnmeldungen, waehrend keine Create-Targets-Aktion angeboten wird.
17. C17: In `/imports/[id]` die Create-Targets-Aktion ausschliesslich fuer `validated`-Jobs bereitgestellt; Erfolg aktualisiert Status, Zaehler und ImportRows, `request_item`-Zielreferenzen verlinken auf `/request-items/{id}` und fuer `procurement_history_item` wird ohne bestehende Detailroute kein Link erfunden.
18. Frontend Issue #66: SupplierProfiles als pflegbare Lieferantenstammdaten unter `/suppliers` bereitgestellt und fuer die Projektzuordnung sowie Projektanzeige erreichbar gemacht.
19. Frontend Issue #69: RequestItems als pflegbare Anfragepositionen unter `/request-items` bereitgestellt und fuer die Projektzuordnung sowie strukturierte Projektanzeige erreichbar gemacht.
20. Frontend Issue #73: Pflichtfelder in Frontend-Server-Actions ueber einen gemeinsamen `FormData`-Helper gegen fehlende oder leere Posts abgesichert; statt leerer Strings entsteht ein feldbezogener Fehler.
21. C23: In `/request-items/[id]` die Aktion `Verhandlungsprojekt erstellen` bereitgestellt; die Server Action liest die bestehende Anfrageposition, erzeugt ein `NegotiationProject` mit `request_item_id` sowie passenden Bedarfsdaten und leitet nach Erfolg auf `/projects/[id]` weiter.
22. C24: In `/projects/[id]` den Abschnitt `Anfrageposition / Bedarfskontext` geschaerft; verknuepfte RequestItems werden aus vorhandenen Listendaten genutzt oder bei Bedarf direkt nachgeladen, zentrale Bedarfsfelder, Beschreibung, Spezifikation und Notizen werden lesbar angezeigt und der Ruecklink zu `/request-items/[id]` bleibt erreichbar.

Naechster Schritt:

1. D0 fachlich abnehmen und Issue #104 nach erfolgreicher Pruefung schliessen.

C1 definiert getrennte Zielvertraege fuer Knowledge-Uploads und Import-Uploads,
Request-/Response-Metadaten, Startstatus, Sicherheitsregeln,
Storage-Key-Konventionen sowie Modell- und API-Gaps. C2 stellt ausschliesslich
die lokale Storage-Grundlage bereit. C3 nutzt diese Grundlage fuer den
KnowledgeDocument-Upload, C4 fuer den ImportJob-Dateiupload. Parser-, Mapping-,
Validierungs-, Zielobjekt-, Chunk- und Claim-Logik sowie Migrationen sind nicht
Bestandteil von C4. C5 definiert ausschliesslich den anschliessenden Vertrag
von `pending` zu reviewbaren Rohdaten; die Parser-Implementierung beginnt mit
C6. C6 implementiert ausschliesslich den CSV-Rohdatenparser, C7 denselben
Rohdatenvertrag fuer XLSX mit Worksheet-Kontext. C8 wendet darauf
ausschliesslich explizite Mapping-Regeln an. C9 bewertet darauf ausschliesslich
die gemappten Row-Werte und setzt Review-Status. C10 erzeugt
`ProcurementHistoryItem`-Zielobjekte aus validierten gemappten Rows; C11
erweitert denselben Endpoint um `RequestItem`-Zielobjekte. C12 macht ImportJobs
und Rows im Frontend sichtbar; C13 ergaenzt das Anlegen per CSV-/XLSX-Upload.
C14 macht den ersten Processing-Schritt Parse in der Detailansicht nutzbar;
C15 ergaenzt anschliessend ausschliesslich das explizite Mapping geparster Rows;
C16 macht die Validierung gemappter Rows mit sichtbaren Review-Ergebnissen nutzbar.
C17 macht anschliessend ausschliesslich den bestehenden Create-Targets-Endpoint im
Frontend nutzbar und zeigt erzeugte Zielreferenzen an.
PDF-Verarbeitung bleibt separat vorgemerkt. Die Issues #66 und #69 machen die strukturierten
SupplierProfile- und RequestItem-Bezuege anschliessend im Frontend pflegbar
und in Projekten zuordenbar.
C23 startet daraus ein vorausgefuelltes Verhandlungsprojekt direkt aus der
RequestItem-Detailseite, ohne neue Backendmodelle, Migrationen, Importlogik,
PDF/OCR, KI-Funktionen oder automatische Analyse- und Strategieobjekte.
C24 macht diesen Ursprung auf der Project-Detailseite sichtbar: Der Abschnitt
`Anfrageposition / Bedarfskontext` zeigt den verknuepften RequestItem, zentrale
Bedarfsdaten und gepflegte Kontexttexte; Projekte ohne verknuepften RequestItem
bleiben weiterhin ueber die bestehenden Projektdaten darstellbar.

## Phase D: Staging und Demo-Betrieb

Status: D0 umgesetzt, D1.1 bis D1.5 umgesetzt.

D0 bereitet nur Repository, Docker-/Compose-Strategie, Env-Beispiele und Dokumentation fuer einen spaeteren Hostinger-VPS-Staging-Deploy vor. Es wurde kein echter Server angesprochen und es wurden keine echten Secrets, Domains, IPs oder Tokens ergaenzt.

Umgesetzte D0-Punkte:

1. Bestehendes `docker-compose.yml` als lokales Development-Setup bewertet.
2. Separates `docker-compose.staging.yml` ergaenzt, weil Staging ohne Hot Reload, ohne Code-Bind-Mounts, ohne offenen DB-Port und mit localhost-gebundenen App-Ports laufen soll.
3. `.env.staging.example` als secretsfreie Vorlage fuer Serverwerte ergaenzt.
4. `.env.staging` und `.env.production` in `.gitignore` aufgenommen.
5. `docs/staging-deployment-prep.md` mit Staging-Strategie, Env-Variablen, Frontend-/Backend-URL-Konfiguration, Caddy-Empfehlung, persistenten Volumes, Backup-Grundidee und D1-Schritten erstellt.

D1.1 bis D1.5 haben den Hostinger-Staging-Stand, die Staging-Dokumentation, reproduzierbare Backend-Migrationen im Container, das Next.js-Standalone-Frontend-Image und die Staging-Demo-Datenstrategie abgeschlossen. D1/D3-Staging ist damit nicht mehr als offener Blocker fuer den Supplier-Context-Strang einzuordnen; echte Secrets, Staging-Werte und serverlokale Env-Dateien bleiben ausserhalb der Repository-Dokumentation.

## Phase D3: Supplier Context / Lieferantenkontext

Status: D3.1 bis D3.10 fuer den ersten Supplier-Context-UX-Strang umgesetzt beziehungsweise geprueft; Strang vorlaeufig abgeschlossen.

Umgesetzte Schritte:

1. D3.1: Die Project-Detailseite zeigt bei verknuepftem `SupplierProfile` eine kompakte Supplier Context Card mit vorhandenen Stammdaten, Beziehungshinweisen, Verhandlungssignalen, kulturellem Kontext und Link zum vollstaendigen Profil; ohne SupplierProfile bleibt ein ruhiger Empty State sichtbar.
2. D3.4: Der Staging-Demo-Seed stellt idempotent ein synthetisches SupplierProfile fuer `Aurum Motion Systems K.K.` bereit und verknuepft das bestehende Rheinwerk-Robotics-Demo-Projekt mit diesem Profil. Dadurch ist der Nicht-Empty-State der Supplier Context Card auf Staging demonstrierbar.
3. D3.6: Die bestehende Supplier Context Card zeigt eine kleine Sektion `Vorbereitungsstand Lieferant` mit maximal fuenf ruhigen Hints zu vorhandenen oder gezielt nachpflegbaren Informationen wie Region, Kategorie, Beziehung, Verhandlungssignalen und kulturellem Kontext.
4. D3.8: Die Readiness-Sektion fuehrt bei verknuepftem `SupplierProfile` mit einem kompakten Edit-Guidance-CTA zum bestehenden Lieferantenprofil. Ohne verknuepftes SupplierProfile bleibt der Empty State ohne irrefuehrende Profil-CTA.
5. D3.10: Dieser Dokumentationsabschluss konsolidiert den vorlaeufigen D3-Stand und grenzt moegliche D4-Folgearbeit ab, ohne Produktfunktion, Frontend, Backend, Migration, Seed, Staging-Deployment oder Smoke-Test zu aendern.

Ergebnis von D3:

- D3 liefert vorhandenen Lieferantenkontext aus bestehenden `SupplierProfile`- und Project-Beziehungen auf der Project-Detailseite aus.
- D3 macht Readiness-/Missing-Information-Hints aus vorhandenen Profilfeldern sichtbar und fuehrt fuer Nachpflege zum bestehenden Lieferantenprofil.
- D3.4 und die bestandenen Staging-Smoke-Tests D3.5, D3.7 und D3.9 bestaetigen den Demo- und Staging-Stand fuer den verknuepften Rheinwerk-/Aurum-Fall.
- D3 ist damit als erster Supplier-Context-UX-Strang vorlaeufig abgeschlossen.

Bewusste Grenzen von D3:

- keine Migration
- keine neuen API-Endpunkte
- keine neuen SupplierProfile-Felder
- keine neue Edit-Seite, kein Inline-Editing und keine neue Verknuepfungslogik
- keine echte Kunden- oder Lieferantendaten
- nach D3.4 keine weitere Seed-Aenderung
- keine automatische Lieferantenanalyse, kein Supplier Scoring, keine KI-Integration und kein RAG

Offene Nicht-Blocker nach D3:

- Issue #55 bleibt als spaetere PDF-/Upload-/Parsing-Strecke offen und blockiert D3 nicht.
- Issue #113 bleibt als Next/PostCSS-audit-Finding zur Beobachtung offen und blockiert D3 nicht.

Phase D4.1:

- D4.1 ist als kleiner Project-Preparation-Schritt umgesetzt.
- Die Project-Detailseite zeigt eine kompakte Preparation Gaps Card.
- Die Card nutzt vorhandene Project-, RequestItem-, SupplierProfile-, Strategy-, ZOPA-, BATNA-, ArgumentationLine-, ConcessionItem-, SimulationScenario- und TrainerComment-Daten ueber bestehende Frontend-API-Helper.
- Dargestellt werden nur vorhandene oder offene Vorbereitungselemente sowie ein ruhiger naechster sinnvoller Schritt.
- D4.1 ist keine automatische Bewertung, keine KI-Integration, kein Supplier Scoring, kein RAG und kein neues Datenmodell.

Phase D4.2:

- D4.2 ist als gezielte Strategy Entry Guidance in derselben Preparation Gaps Card umgesetzt.
- Wenn noch keine Strategie vorhanden ist, verweist der naechste sinnvolle Schritt auf den bestehenden Einstieg `/strategy?projectId=...` und macht klar, dass zuerst eine Strategie angelegt wird.
- Strategiebausteine werden ohne vorhandene Strategie als nachgelagert dargestellt; bei vorhandener Strategie, aber fehlenden Bausteinen, wandert der naechste sinnvolle Schritt zu ZOPA, BATNA, Argumenten oder Konzessionen.
- D4.2 erzeugt keine Strategie automatisch, aendert keine Daten, baut keine neue Route und fuehrt keine Backend-, Migrations-, KI-, Scoring- oder RAG-Logik ein.

Phase D4.3:

- D4.3 glaettet den bestehenden Strategy-Einstieg `/strategy?projectId=...` fuer Projekte ohne Strategie.
- Der Empty State ist projektbezogen, ruhig formuliert und fuehrt weiter zur manuellen Strategieanlage.
- ZOPA, BATNA, Argumente und Konzessionen werden als nachgelagerte Schritte eingeordnet.
- D4.3 erzeugt keine Strategie automatisch, aendert keine Daten, baut keine neue Route und fuehrt keine Backend-, Migrations-, KI-, Scoring- oder RAG-Logik ein.

Phase D4.4:

- D4.4 dokumentiert D4.1 bis D4.3 als aktuellen D4-Preparation-UX-Zwischenstand.
- Der kompakte Smoke-Test-Plan fuer den Flow Project Detail -> Preparation Gaps Card -> Strategie vorbereiten -> Strategy Empty State -> Strategie manuell anlegen ist in `docs/browser-smoke-test-plan.md` ergaenzt.
- Weiterhin bewusst ausserhalb des Scopes bleiben automatische Strategieerzeugung, KI-Analyse, Scoring, RAG, neue Datenmodelle, neue APIs, Migrationen, Seed-Aenderungen, Env-/Secret-Werte und Staging-Deployment.
- Issue #55 und Issue #113 bleiben offene Nicht-Blocker fuer diesen D4-Zwischenstand.

Phase D5.1:

- D5.1 verbessert gezielt die Success Guidance nach manueller Strategieanlage im bestehenden Strategy-Create-Flow.
- Nach dem Create bleibt der projektbezogene Einstieg `/strategy?projectId=...` erhalten und zeigt eine klare Meldung, dass die Strategie angelegt wurde.
- Ein sichtbarer CTA fuehrt zurueck zu `/projects/<projectId>`, damit die Vorbereitung im Projektkontext fortgesetzt werden kann.
- ZOPA, BATNA, Argumente und Konzessionen werden als nachgelagerte naechste Schritte eingeordnet.
- `/strategy` ohne `projectId` bleibt die allgemeine Projektauswahl.
- D5.1 erzeugt keine Strategie automatisch, baut keine neue Route und fuehrt keine Backend-, Migrations-, KI-, Scoring-, RAG- oder Datenmodell-Aenderung ein.

Phase D5.2:

- D5.2 verbessert gezielt die Orientierung bei vorhandener Strategie im bestehenden Strategy-Flow.
- Die Seite zeigt eine kompakte Building-Blocks-Guidance fuer ZOPA, BATNA, Argumente und Konzessionen.
- Bereits vorhandene Bausteine werden aus den geladenen Listen als vorhanden angezeigt; leere Kategorien bleiben normale naechste Arbeitsschritte.
- D5.2 erzeugt keine Bausteine automatisch, baut keine neue Route und fuehrt keine Backend-, Migrations-, KI-, Scoring-, RAG- oder Datenmodell-Aenderung ein.

Phase D5.3:

- D5.3 ergaenzt die bestehende Building-Blocks-Guidance bei vorhandener Strategie um WAP / Walk-away Point.
- WAP wird als manuelle Abbruchgrenze eingeordnet, ab der die BATNA sinnvoller ist als ein Abschluss.
- Die Guidance macht klar, dass WAP aus Ziel, Risiko, Kosten/Nutzen und BATNA abgeleitet wird.
- ZOPA bleibt der moegliche Ueberschneidungsbereich zwischen eigener Grenze und angenommener Grenze der Gegenseite.
- Konzessionen bleiben geplante Tauschobjekte oder Zugestaendnisse und sind nicht der WAP.
- D5.3 nutzt vorhandene Strategy- und ZOPA-Felder nur fuer Status/Gewichtung und erzeugt keine automatische WAP-, ZOPA- oder BATNA-Berechnung.
- D5.3 baut keine neue Route und fuehrt keine Backend-, Migrations-, KI-, Scoring-, RAG- oder Datenmodell-Aenderung ein.

Phase D5.4:

- D5.4 ergaenzt WAP in der bestehenden Sidebar-Beschreibung des Strategie-Menuepunkts.
- Die bestehenden Sidebar-Link-States nutzen jetzt konsistente, gut lesbare Farben fuer Icon, Titel und Beschreibung im Normal-, Hover- und Active-State.
- Geprueft wurden die MVP-Workflow-Menuepunkte Analyse, Strategie, Briefing, Simulation und Trainerreview.
- D5.4 baut keine neue Navigation, keine neue Route und fuehrt keine Backend-, Migrations-, KI-, Scoring-, RAG- oder Datenmodell-Aenderung ein.

Phase D5.5:

- D5.5 ist als Smoke-Test- und Dokumentationsabschluss fuer den D5-Strategy-Guidance-Strang umgesetzt.
- Lokal geprueft wurden Project Detail, Preparation Gaps Card, Strategy-Einstieg mit Projektkontext, vorhandener Strategy-Kopf, Building-Blocks-Guidance fuer ZOPA, BATNA, WAP, Argumente und Konzessionen, Rueckweg zum Projekt, allgemeiner `/strategy`-Einstieg ohne `projectId`, Sidebar-Zustaende und kleine Browserbreite.
- Das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33` besitzt bereits eine Strategie; deshalb wurde keine zweite Strategie angelegt. D5.1 bleibt ueber den vorhandenen Stand beziehungsweise frueheren Test und den sichtbaren Rueckweg zum Projekt abgedeckt.
- Ergebnis und Nicht-Blocker sind in `docs/browser-smoke-test-plan.md` dokumentiert.
- D5.5 fuehrt keine Produktfunktion, keine UI-Logik, keine Backend-Aenderung, keine Migration, keine Seed-Aenderung und keine KI-, Scoring- oder RAG-Logik ein.

Phase D5.6:

- D5.6 ist als Staging-Update mit Smoke-Test und Dokumentationsabschluss fuer den D5-Strategy-Guidance-Flow umgesetzt.
- Lokal war `main` vor Beginn sauber und entsprach `origin/main` auf `46b045f`.
- Staging stand vor dem Update sauber auf `21028cb` und wurde in `/opt/negotiation-tools` mit `git fetch origin` und `git merge --ff-only origin/main` auf `46b045f` aktualisiert.
- Der Staging-Stack wurde mit `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build` neu gebaut und gestartet.
- Healthchecks: Compose-Services `db`, `backend` und `frontend` liefen; DB war `healthy`; internes Backend `GET http://127.0.0.1:8000/api/health` antwortete `{"status":"ok","service":"negotiation-tools-api"}`; internes Frontend antwortete mit Next.js-Redirect auf `/dashboard`; Alembic `current` stand auf `2f4b7c8d9e0a (head)`.
- Oeffentliche HTTPS-Checks ohne Browser-Session fuehrten erwartungsgemaess zuerst zu Authelia-Redirects; der browserseitige Smoke-Test lief mit authentifizierter Session unter `https://negotiation.tools.hawkins-consulting.de`.
- Browserseitig geprueft wurden Project Detail, Preparation Gaps Card, Strategy-Einstieg mit Projektkontext, manuelle Strategieanlage, Success Guidance, Rueckweg zum Projekt, Building-Blocks-Guidance, WAP-Abgrenzung, allgemeines `/strategy` ohne `projectId`, Sidebar-Zustaende und kleine Breite.
- Auf Staging existierte fuer das Demo-Projekt vor D5.6 noch keine Strategie; deshalb wurde ueber den bestehenden UI-Flow genau ein manueller Strategie-Kopf mit Smoke-Test-Notiz angelegt. Das ist der dokumentierte Nicht-Blocker beziehungsweise Testdateneffekt von D5.6.
- D5.6 fuehrt keine Produktfunktion, keine Produktcodeaenderung, keine Backend-Aenderung, keine Migration, keine Seed-Aenderung und keine KI-, Scoring- oder RAG-Logik ein.

Phase D6.3:

- D6.3 ist als Staging-Update mit Smoke-Test und Dokumentationsabschluss fuer die D6.1-Strategy-Field-Guidance umgesetzt.
- Lokal waren `main`, `origin/main` und `HEAD` vor Beginn sauber und identisch auf `59e293d`; D6.1 `dd24e95` und D6.2 `59e293d` waren enthalten.
- Offene Issues vor Start: #142 als aktueller Scope, #113 und #55 als Nicht-Blocker; offene PRs: 0.
- D6.2 war bereits committed und auf `origin/main`; kein Nachcommit war erforderlich.
- Staging stand vor dem Update sauber auf `46b045f` und wurde in `/opt/negotiation-tools` mit `git fetch origin` und `git merge --ff-only origin/main` auf `59e293d` aktualisiert.
- Der Staging-Stack wurde mit `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build` neu gebaut und gestartet.
- Healthchecks: Compose-Services `db`, `backend` und `frontend` liefen; DB war `healthy`; `pg_isready` meldete `accepting connections`; internes Backend `GET http://127.0.0.1:8000/api/health` antwortete `{"status":"ok","service":"negotiation-tools-api"}`; internes Frontend `/dashboard` antwortete `HTTP/1.1 200 OK`; Alembic `current` stand auf `2f4b7c8d9e0a (head)`.
- Oeffentliche HTTPS-Checks ohne Browser-Session fuehrten erwartungsgemaess zu Authelia-Redirects; der browserseitige Smoke-Test lief mit authentifizierter Session unter `https://negotiation.tools.hawkins-consulting.de`.
- Browserseitig geprueft wurden Project Detail, Strategy-Einstieg, `/strategy?projectId=...`, `/strategy` ohne `projectId`, Strategy Objectives, ZOPA, BATNA, WAP, Konzessionen, Argumente, ZOPA-Dimension als Pflichtanker, Hilfetexte/Placeholder, unveraendertes Save-Verhalten, Rueckweg zum Projekt, Browser-Console und kleine Breite.
- Auf Staging existierte bereits die D5.6-Strategie fuer das Demo-Projekt; deshalb wurde keine neue Strategie angelegt und keine neue Success Guidance reproduziert. Der Rueckweg `Zum Projekt` wurde sichtbar geprueft.
- D6.3 fuehrt keine Produktfunktion, keine Produktcodeaenderung, keine Backend-Aenderung, keine Migration, keine Seed-Aenderung und keine KI-, Scoring- oder RAG-Logik ein.

Phase D7.1:

- D7.1 verbessert gezielt die Orientierung bei vorhandener Strategie im bestehenden `/strategy?projectId=...`-Flow.
- Die Strategy-Seite zeigt eine kleine Completion-/Readiness-Box fuer Strategy Objectives, ZOPA, BATNA, WAP / Walk-away Point, Konzessionen und Argumente.
- Die Guidance nutzt ausschliesslich vorhandene Strategy-Felder und bestehende Bausteinlisten: ZOPA-Items, BATNA-Optionen, ConcessionItems und ArgumentationLines.
- Der Readiness-Status ist verbal und transparent: `Unvollstaendig`, `Grundlage vorhanden` oder `Bereit fuer Briefing / Simulation`.
- Fehlende Bausteine werden als konkrete naechste Arbeitshinweise angezeigt; vorhandene Bausteine erscheinen als positive Anker.
- Fachliche Warnhinweise trennen ZOPA als Einigungskorridor, BATNA als externe Alternative und WAP als Walk-away-Grenze. Fehlende Konzessionen werden als fehlende Tauschlogik und fehlende Argumente als fehlende Gespraechsfuehrung eingeordnet.
- `/strategy` ohne `projectId` bleibt die allgemeine Projektauswahl und zeigt keine projektbezogene Readiness-Box.
- D7.1 fuehrt keine automatische Strategieerzeugung, kein numerisches Scoring, keine KI, keine Simulation, keine RAG-Logik, keine Backend-Aenderung, keine Migration, keine neue Persistenz und kein Staging-Deployment ein.

Phase D8.1:

- D8.1 nutzt die bestehende Strategy Readiness Guidance als Uebergang in den naechsten Workflow-Schritt.
- Bei Status `Bereit fuer Briefing / Simulation` erscheint eine kompakte Next-Action-Guidance mit den Richtungen `Briefing vorbereiten`, `Simulation vorbereiten` und `Trainerreview vorbereiten`.
- Briefing wird bewusst als Coming-next-Hinweis ohne Zielroute dargestellt, weil derzeit nur eine generische Placeholder-Route und noch keine stabile projektbezogene Briefing-Funktion existiert.
- Simulation und Trainerreview verlinken nur auf die bestehenden projektbezogenen Vorbereitungsbereiche und werden nicht als produktive Simulation oder automatisches Review suggeriert.
- Die D6-/D7-Feldfuehrung, die Readiness-Statuslogik, `/strategy?projectId=...` und `/strategy` ohne `projectId` bleiben unveraendert.
- D8.1 fuehrt keine Backend-Aenderung, keine Migration, keine neue Persistenz, kein KI-Briefing, keine produktive Simulation und keine Trainerreview-Logik ein.

Phase D8.2:

- D8.2 bestaetigt D8.1 lokal im Browser mit vorhandenen D7.2-Smoke-Testdaten fuer `Unvollstaendig`, `Grundlage vorhanden` und `Bereit fuer Briefing / Simulation`.
- Die Next-Action-Guidance erscheint nur bei `Bereit fuer Briefing / Simulation`.
- Briefing bleibt ein Coming-next-Hinweis ohne projektbezogenen Link; Simulation und Trainerreview nutzen bestehende projektbezogene Vorbereitungsrouten.
- D6-/D7-Feldfuehrung, Readiness-Box, Save-Controls, `/strategy` ohne `projectId`, Mobile-Breite und Browser-Console wurden geprueft.
- D8.2 fuehrt keine Produktcode-Aenderung, keine Backend-Aenderung, keine Migration, keine Seed-Aenderung, kein KI-Briefing, keine produktive Simulation, keine Trainerreview-Logik und keine RAG-Logik ein.

Phase D8.3:

- D8.3 aktualisiert Hostinger-Staging per Fast-Forward auf `2aa47a2` und prueft Backend, Frontend, DB und Alembic Head.
- Auf Staging ist der vollstaendige Zustand `Bereit fuer Briefing / Simulation` mit Next-Action-Guidance sichtbar.
- Briefing bleibt ein Coming-next-Hinweis ohne projektbezogenen Link; `/briefing` bleibt generisch vorbereitet.
- Simulation und Trainerreview wurden ueber `/simulation?projectId=...` und `/trainer-review?projectId=...` geprueft.
- `/strategy` ohne `projectId`, D6-/D7-Feldfuehrung, Save-Verhalten, Mobile-Breite und Browser-Console wurden geprueft.
- Die unteren Staging-Zustaende `Unvollstaendig` und `Grundlage vorhanden` sind als Einschraenkung dokumentiert, weil Staging aktuell nur eine Strategy hat und leere Strategy-Head-Felder im bestehenden PATCH-/Form-Flow vorhandene Werte nicht loeschen.
- D8.3 fuehrt keine Produktcode-Aenderung, keine Backend-Aenderung, keine Migration, keine Seed-Aenderung, kein KI-Briefing, keine produktive Simulation, keine Trainerreview-Logik und keine RAG-Logik ein.

Phase D8.4:

- D8.4 schliesst D8 dokumentarisch als kleinen UX-/Workflow-Uebergangsblock ab.
- D8 liefert damit eine handlungsorientierte Next-Action-Guidance aus vorhandenem Strategy-Readiness-Stand, aber keine neue Folgeprozess-Logik.
- D8.1, D8.2 und D8.3 sind als umgesetzt nachvollziehbar dokumentiert: Produkt-UX, lokaler Browser-Smoke-Test und Staging-Smoke-Test.
- Die Staging-Einschraenkung aus D8.3 bleibt sichtbar: Auf Staging existiert aktuell nur eine Strategy; `Unvollstaendig` und `Grundlage vorhanden` konnten ohne neue Testdaten oder direkte DB-Manipulation nicht sauber reproduziert werden. Das ist ein spaeterer Testdaten-/Demo-Daten-Verbesserungspunkt und kein D8-Produktblocker.
- D8 bleibt bewusst ohne KI-Briefing, automatische Briefing-Erzeugung, produktive Simulation, neue Trainerreview-Logik, Scoring, RAG, Backendlogik, Migration, Seed-Aenderung, Env-/Secret-Werte oder Staging-Deployment.
- Issue #55 bleibt als spaetere PDF-/Upload-/Parsing-Strecke offen und blockiert D8 nicht.
- Issue #113 bleibt als Next/PostCSS-audit-Finding zur Beobachtung offen und blockiert D8 nicht.

Phase D9.1:

- D9 ist als kleiner Produktblock `Briefing Preparation` gestartet.
- D9.1 glaettet den bestehenden `/briefing`-Einstieg fachlich und schliesst kontrolliert an die bestehende D8-Next-Action-Guidance an.
- Die Seite ordnet Briefing Preparation als vorbereitenden Schritt nach ausreichender Strategy Readiness ein.
- Spaetere Briefing-Bausteine sind sichtbar: Ziel und Ausgangslage, Interessen und Druckpunkte, BATNA / WAP / ZOPA, Argumente, Konzessionen, Risiken, Agenda und Trainee-Hinweise.
- D9.1 fuehrt keine KI-Briefing-Generierung, keine automatische Briefing-Erzeugung, keine neue Simulation, keine Trainerreview-Logik, kein Scoring, kein RAG, keine Backendlogik, keine Migration und keine neue Folgeprozessautomatisierung ein.

Vorgemerkte Folgehinweise aus C15 bis C17:

- Die statischen Mapping-Zielfeldlisten sollten mittelfristig zentralisiert oder aus Backend-/Contract-Metadaten abgeleitet werden, damit Frontend und Backend nicht auseinanderlaufen; C17 fuehrt dieses Refactoring nicht durch.
- Nach Abschluss von Create-Targets sollte die ImportJob-Detailseite gegebenenfalls als klarer Prozessschritt-/Stepper-Flow geglaettet werden; C17 fuehrt dieses Refactoring nicht durch.

## Manuelle Pruefhilfe C13

- `/imports` oeffnen und den Einstieg `ImportJob hochladen` pruefen.
- `/imports/new` oeffnen.
- Das Upload-Formular mit fehlenden Pflichtfeldern absenden und nachvollziehbare Fehler pruefen.
- Eine gueltige CSV-Datei mit `source_type=csv` und passender `target_entity` hochladen.
- Eine gueltige XLSX-Datei mit `source_type=excel` und passender `target_entity` hochladen.
- Nach jedem erfolgreichen Upload den Redirect auf `/imports/[id]` pruefen.
- In `/imports` pruefen, ob die neuen Jobs sichtbar sind.
- Sicherstellen, dass vor dem Mapping keine Validate-Aktion und weiterhin keine Create-Targets-Aktion sichtbar ist.

## Manuelle Pruefhilfe C14

- Eine CSV-Datei ueber `/imports/new` hochladen.
- Auf `/imports/[id]` pruefen, ob der Job im Status `pending` angezeigt wird und die Aktion `ImportJob parsen` sichtbar ist.
- Die Parse-Aktion ausloesen und nach Erfolg pruefen, ob Status, `total_rows`, `processed_rows`, `valid_rows`, `error_rows` sowie erzeugte ImportRows mit Reviewdaten aktualisiert sichtbar sind.
- Eine XLSX-Datei ueber `/imports/new` hochladen und denselben Parse-Test ausfuehren; bei den ImportRows insbesondere `sheet_name` pruefen.
- Bei einem nicht mehr `pending` Job pruefen, dass keine Parse-Aktion angeboten wird und stattdessen die Statusinformation sichtbar ist.
- Sicherstellen, dass vor dem Mapping keine Validate-Aktion und weiterhin keine Create-Targets-Aktion sichtbar ist.

## Manuelle Pruefhilfe C15

- Eine CSV-Datei ueber `/imports/new` hochladen, parsen und pruefen, ob `ImportRows.raw_data_json` sichtbar sind.
- Bei Status `parsed` das Mapping-Formular nutzen und fuer `target_entity=procurement_history_item` Zielfelder auf vorhandene Quellfelder mappen.
- Das Mapping ausloesen und pruefen, ob der Status `mapped`, `mapping_json` und `mapped_data_json` sichtbar sind; `raw_data_json` bleibt weiterhin sichtbar.
- Eine XLSX-Datei beziehungsweise einen `request_item`-Import mit derselben Upload-, Parse- und Mapping-Strecke pruefen.
- Bei einem nicht `parsed` Job pruefen, dass keine Mapping-Aktion angeboten wird und stattdessen eine Statusinformation erscheint.
- Sicherstellen, dass vor Status `mapped` keine Validate-Aktion und weiterhin keine Create-Targets-Aktion sichtbar ist.

## Manuelle Pruefhilfe C16

- Eine CSV-Datei ueber `/imports/new` hochladen, den Job parsen und mappen.
- Bei Status `mapped` die Aktion `ImportJob validieren` ausloesen.
- Nach Erfolg pruefen, ob Status `validated`, `validation_summary_json`, Row-Validierungsstatus sowie Row-Fehler-/Warnhinweise sichtbar beziehungsweise aktualisiert sind; Raw- und Mapped-Daten bleiben sichtbar.
- Einen `request_item`-Import beziehungsweise XLSX-Import mit derselben Upload-, Parse-, Mapping- und Validate-Strecke pruefen, soweit Testdaten vorhanden sind.
- Bei einem nicht `mapped` Job pruefen, dass keine Validate-Aktion angeboten wird und stattdessen eine Statusinformation erscheint.
- Sicherstellen, dass vor Status `validated` kein Create-Targets-Button sichtbar ist.

## Manuelle Pruefhilfe C17

- Einen CSV- oder XLSX-Import ueber `/imports/new` anlegen.
- ImportJob parsen.
- Mapping fuer `target_entity=request_item` durchfuehren.
- ImportJob validieren.
- Bei Status `validated` pruefen, ob die Create-Targets-Aktion sichtbar ist.
- Aktion ausloesen.
- Pruefen, ob die Detailseite danach aktualisiert ist und der Job `completed` oder `completed_with_errors` zeigt.
- Pruefen, ob valide Rows als importiert erscheinen und `target_entity` sowie `target_record_id` sichtbar sind.
- Bei `request_item` pruefen, ob der Link zum erzeugten RequestItem funktioniert.
- Einen Import mit `target_entity=procurement_history_item` analog pruefen; falls keine Detailroute existiert, darf keine kaputte Verlinkung entstehen.
- Sicherstellen, dass bei nicht validierten Jobs keine Create-Targets-Aktion sichtbar ist.
- Sicherstellen, dass keine Backendlogik, keine Migration, keine PDF-/OCR-Logik, kein KI-Mapping und keine automatische Analyse umgesetzt wurden.

## Manuelle Pruefhilfe D4.4

- `/projects/<demo-project-id>` oeffnen und pruefen, ob die Project-Detailseite rendert.
- Pruefen, ob die Preparation Gaps Card sichtbar ist und Bedarfskontext, Lieferantenprofil und Supplier Context als vorhanden erscheinen, sofern Demo-Daten vorhanden sind.
- Pruefen, ob Supplier Context weiterhin den Demo-Lieferanten zeigt.
- Bei einem Projekt ohne Strategie pruefen, ob Strategie als offen eingeordnet wird und der naechste sinnvolle Schritt auf Strategiearbeit verweist.
- Aus der Preparation Gaps Card den bestehenden Einstieg `Strategie vorbereiten` zu `/strategy?projectId=<demo-project-id>` oeffnen.
- Pruefen, ob bei Projekt ohne Strategie ein ruhiger projektbezogener Empty State erscheint, keine Strategie automatisch erzeugt wird und die manuelle Anlageoption sichtbar ist.
- Pruefen, ob ZOPA, BATNA, Argumente und Konzessionen als nachgelagerte Schritte eingeordnet werden.
- Falls die Testumgebung bewusst dafuer genutzt wird, Strategie manuell anlegen und pruefen, ob `/strategy?projectId=...` danach keinen Empty State mehr zeigt und die Preparation Gaps Card die Strategie als vorhanden erkennt.
- `/strategy` ohne `projectId` oeffnen und pruefen, ob die allgemeine Strategieansicht weiterhin funktioniert und kein projektbezogener Empty State erscheint.
- Mobile Spotcheck fuer `/projects/<demo-project-id>` und `/strategy?projectId=<demo-project-id>` durchfuehren: keine horizontale Ueberbreite, Card und Empty State lesbar, Buttons und Links bedienbar.
- Sicherstellen, dass D4.4 keine Produktfunktion, keine Frontend-/Backend-Codeaenderung, keine Migration, keine Seed-Aenderung, keine Env-/Secret-Werte, keine KI-Integration, kein Supplier Scoring, kein Preparation Score und kein RAG eingefuehrt hat.

## Manuelle Pruefhilfe D5.5

- `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33` oeffnen und Project-Detailseite, Preparation Gaps Card, plausiblen Strategy-Status sowie Strategy-Einstieg pruefen.
- `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33` oeffnen und vorhandenen Strategy-Kopf, Building-Blocks-Guidance sowie fachliche Einordnung von ZOPA, BATNA, WAP, Argumenten und Konzessionen pruefen.
- Sicherstellen, dass WAP als Walk-away Point beziehungsweise Abbruchgrenze erklaert wird, nicht mit Konzessionen verwechselt wird und weder WAP noch Bausteine automatisch berechnet oder erzeugt werden.
- Success Guidance nur reproduzieren, wenn keine bestehende Strategie ueberschrieben oder dupliziert werden muss; andernfalls vorhandenen Stand und Rueckweg zum Projekt dokumentieren.
- Sidebar fuer Analyse, Strategie, Briefing, Simulation und Trainerreview pruefen: Strategie-Beschreibung enthaelt WAP, Active-/Hover-State sowie Icon, Titel und Unterzeile bleiben lesbar.
- `/strategy` ohne `projectId` oeffnen und allgemeine Projektauswahl, fehlende projektbezogene Guidance und funktionsfaehige Navigation pruefen.
- Mobile Spotcheck fuer Project Detail, Strategy mit Projektkontext und `/strategy` ohne `projectId` durchfuehren.
- Sicherstellen, dass D5.5 keine Produktfunktion, keine UI-Logik, keine Backend-Aenderung, keine Migration, keine Seed-Aenderung und keine KI-, Scoring- oder RAG-Logik einfuehrt.

## Manuelle Pruefhilfe D5.6

- Lokal vor Beginn `git status --short --branch` und `git log --oneline -5` pruefen; erwartet wird ein sauberer `main` auf `46b045f` oder neuer.
- Auf Staging in `/opt/negotiation-tools` `git status --short --branch` und `git log --oneline -5` pruefen.
- Staging mit `git fetch origin` und `git merge --ff-only origin/main` auf aktuellen `origin/main` bringen.
- Staging-Stack mit `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build` neu bauen/starten.
- Healthchecks dokumentieren: `docker compose ... ps`, interner Backend-Healthcheck, interne Frontend-Erreichbarkeit, `pg_isready` und Alembic `current`.
- Browser-Smoke-Test auf `https://negotiation.tools.hawkins-consulting.de` mit authentifizierter Session ausfuehren: Project Detail, Preparation Gaps Card, Strategy-Einstieg, Strategy-Guidance, WAP-Abgrenzung, Success Guidance beziehungsweise Nicht-Blocker, Rueckweg, Sidebar, `/strategy` ohne `projectId` und kleine Breite.
- Keine neuen Env-/Secret-Werte einfuehren, keine Seed-Aenderung ausfuehren und Migrationen nur anwenden, falls der aktualisierte Stand sie erfordert.
- Sicherstellen, dass D5.6 keine Produktcodeaenderung, keine Backend-Aenderung, keine Migration, keine Seed-Aenderung und keine KI-, Scoring- oder RAG-Logik einfuehrt.

## Manuelle Pruefhilfe D6.1

- `/strategy?projectId=<bestehende Projekt-ID>` oeffnen und den Strategy-Kopf pruefen: Titel ist sichtbar Pflichtfeld; Strategy Objective, Zielergebnis, Minimum, WAP, ZOPA, BATNA, Konzessionsstrategie, Argumentationssummary, Risiken und Notizen haben fachlich eindeutige Placeholder/Hilfetexte.
- Sicherstellen, dass WAP als minimale akzeptable Grenze beschrieben wird, BATNA als externe Alternative und ZOPA als moeglicher Einigungskorridor.
- ZOPA-Dimension anlegen: Ohne Dimension soll die UI beziehungsweise Server Action ein Pflichtfeld verlangen; mit Dimension bleibt die Anlage wie bisher moeglich.
- BATNA-Option pruefen: Titel bleibt Pflichtfeld; Beschreibung und Impact machen klar, dass es um eine Alternative ausserhalb der Verhandlung geht.
- Konzession pruefen: Hilfetexte sollen Tauschlogik zeigen (`Wir geben` nur gegen Gegenleistung), nicht einseitiges Nachgeben.
- Argumentationslinie pruefen: Hilfetext/Placeholder sollen fakten-, TCO-, risiko-, qualitaets- oder beziehungsbezogene Argumente mit Belegen nahelegen.
- Sicherstellen, dass keine neue Strategie, keine Bausteine und keine Bewertungen automatisch erzeugt werden und dass D5-Guidance sichtbar bleibt.

## Manuelle Pruefhilfe D6.2

- Lokalen Stack mit DB, Backend und Frontend starten und Healthchecks dokumentieren.
- Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33` sicherstellen und `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33` oeffnen.
- Project Detail, Preparation Gaps Card und Strategy-Einstieg pruefen.
- `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33` oeffnen und Projektkontext, Strategy-Kopf, D5-Guidance, WAP-Abgrenzung und Rueckweg zum Projekt pruefen.
- Strategy-Kopf speichern und pruefen, ob Strategy Objectives, Zielergebnis, Minimum, WAP, ZOPA, BATNA, Konzessionsstrategie und Argumentationssummary erhalten bleiben.
- ZOPA-Dimension ohne Dimension absenden und Pflichtfeldverhalten pruefen; anschliessend mit Dimension speichern.
- BATNA, Konzession und Argumentationslinie mit fachlich passenden Smoke-Werten speichern.
- `/strategy` ohne `projectId` pruefen: allgemeine Projektauswahl sichtbar, keine projektbezogene Guidance faelschlich sichtbar.
- Mobile Spotcheck fuer Project Detail und Strategy mit Projektkontext durchfuehren.
- Sicherstellen, dass D6.2 keine Produktlogik, keine neue UI-Funktionalitaet, keine Backend-Aenderung, keine Migration, keine Seed-Aenderung ausser idempotenter lokaler Demo-Datensatz-Sicherstellung und keine KI-, Scoring- oder RAG-Logik einfuehrt.

## Manuelle Pruefhilfe D6.3

- Lokal vor Beginn `README.md`, `docs/skills/negotiation-tools-dev-workflow/SKILL.md`, offene Issues/PRs, `docs/roadmap.md` und `docs/codex-tasks.md` pruefen.
- Lokal `git status --short --branch`, `git log --oneline -5`, `git fetch origin` und Konsistenz von `main`, `origin/main` und `HEAD` pruefen.
- Sicherstellen, dass D6.1 und D6.2 im Zielstand enthalten sind; falls D6.2 noch nicht committed/gepusht ist, nur die D6.2-Dokumentationsdateien committen und pushen.
- Auf Staging in `/opt/negotiation-tools` `git status --short --branch` und `git log --oneline -5` pruefen.
- Staging mit `git fetch origin` und `git merge --ff-only origin/main` auf aktuellen `origin/main` bringen.
- Staging-Stack mit `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build` neu bauen/starten.
- Healthchecks dokumentieren: `docker compose ... ps`, `pg_isready`, interner Backend-Healthcheck, interne Frontend-Erreichbarkeit, Alembic `current` und erwarteten Authelia-Redirect fuer unauthentifizierte externe Checks.
- Browser-Smoke-Test auf `https://negotiation.tools.hawkins-consulting.de` mit authentifizierter Session ausfuehren: Project Detail, Strategy-Einstieg, `/strategy?projectId=...`, `/strategy`, Strategy Objectives, ZOPA, BATNA, WAP, Konzessionen, Argumente, Pflichtfeldverhalten der ZOPA-Dimension, Hilfetexte/Placeholder, Save-Verhalten soweit ohne Datenverfaelschung sinnvoll, Rueckweg und kleine Breite.
- Keine Seed-Aenderung ausfuehren, keine Migration anwenden, sofern Alembic keine echte Abweichung zeigt.
- Sicherstellen, dass D6.3 keine Produktcodeaenderung, keine Backend-Aenderung, keine Migration, keine Seed-Aenderung und keine KI-, Scoring- oder RAG-Logik einfuehrt.

## Manuelle Pruefhilfe D7.2

- Lokal vor Beginn `README.md`, `docs/skills/negotiation-tools-dev-workflow/SKILL.md`, offene Issues/PRs, `docs/roadmap.md` und `docs/codex-tasks.md` pruefen.
- `git status --short --branch` und `git log --oneline -5` pruefen und sicherstellen, dass D7.1 committed ist.
- Lokalen Stack mit DB, Backend und Frontend starten oder bestehenden laufenden Stack pruefen; Backend-Healthcheck und Frontend-Erreichbarkeit dokumentieren.
- `/strategy` ohne `projectId` oeffnen und pruefen, dass die allgemeine Projektauswahl sichtbar ist und keine projektbezogene Readiness-Box erscheint.
- `/strategy?projectId=<demo-project-id>` fuer mindestens drei lokale Testzustaende pruefen: leer/stark unvollstaendig, teilweise gefuellt und vollstaendig gefuellt.
- Erwartete Status pruefen: `Unvollstaendig`, `Grundlage vorhanden` und `Bereit fuer Briefing / Simulation`.
- Vorhandene Anker, fehlende Bausteine, positive Hinweise und fachliche Warnhinweise pruefen.
- Fachlich insbesondere ZOPA als Einigungskorridor, BATNA als externe Alternative, WAP als Walk-away-Grenze und Konzessionen als Tauschlogik abgrenzen.
- Mobile Breite und Browser-Console pruefen.
- Ergebnis in `docs/browser-smoke-test-plan.md`, `docs/codex-tasks.md` und bei Bedarf `docs/roadmap.md` dokumentieren.
- Sicherstellen, dass D7.2 keine Produktlogik, keine UI-Funktionalitaet, keine Backend-Aenderung, keine Migration, keine Seed-Datei und keine KI-, Scoring-, Simulations- oder RAG-Logik einfuehrt.

Phase D13.1:

- D13.1 ist als reiner Konzept-/Scope-Schritt umgesetzt.
- Die naechste Produktkante ist in `docs/briefing-preparation-scope.md` dokumentiert.
- D13 startet mit `Strategy -> Briefing Preparation`; Simulation Preparation bleibt als spaeterer Folgeblock moeglich, wird aber nicht vorgezogen.
- Die Entscheidung ist ueber vorhandenen Briefing-Einstieg, Strategy-Readiness-Guidance, D12-Demo-Readiness und die fachliche Naehe zu vorhandenen Strategy-, Projekt-, Bedarfs- und Lieferantendaten begruendet.
- Erste Briefing-Bausteine sind Ausgangslage, Zielbild, Strategy Objectives, ZOPA, BATNA, WAP, Konzessionslogik, Argumentationslinien, Lieferantenkontext, Bedarfskontext, optionale UserProfile-Hinweise, offene Informationsluecken und empfohlene naechste Vorbereitungsschritte.
- Zulaessige Datenquellen sind nur vorhandene Objekte: `NegotiationProject`, `RequestItem`, `SupplierProfile`, `Strategy`, `ZopaItem`, `BatnaOption`, `ConcessionItem`, `ArgumentationLine`, optional `UserProfile` und vorhandene Readiness-/Preparation-Guidance.
- D13.1 fuehrt keine Produktdateien, keine Frontend-UI, keine Backend-API, keine Migration, keine Seed-Aenderung, kein Staging-Deployment, keine KI-Briefing-Erzeugung, kein RAG, keine Claim-Extraktion, keine automatische Strategy-Erzeugung, keine Simulation, keine automatische Auswertung, keine Score-Engine, keinen Trainerreview-Ausbau und keine neue Persistenz ein.
- Sinnvolle Folgeissues sind eine Informationsarchitektur fuer `/briefing?projectId=...`, ein spaeterer minimaler read-only Briefing-Preparation-Prototyp aus vorhandenen Daten und ein danach passender lokaler Browser-Smoke-Test.

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

## Manuelle Pruefhilfe Phase B9

- `/strategy`: Projektauswahl und Empty State pruefen.
- `/strategy?projectId=<bestehende Projekt-ID>`: Projektkontext und vorhandene Strategie pruefen.
- Strategie-Kopf neu anlegen, falls noch keine Strategie existiert.
- Strategie-Kopf bearbeiten und speichern.
- ZOPA-Dimension anlegen oder bearbeiten.
- BATNA-Option anlegen oder bearbeiten.
- Konzession als Tauschobjekt mit Bedingung und Gegenleistung anlegen oder bearbeiten.
- Argumentationslinie mit Claim, Evidence, Gegenargument und Reaktionsstrategie anlegen oder bearbeiten.
- `/projects/[id]`: Link "Strategie vorbereiten" pruefen.
- `/analysis?projectId=<bestehende Projekt-ID>`: Link zur Strategie pruefen.

## Manuelle Pruefhilfe Phase B10

- `/simulation`: Projektauswahl und Empty State pruefen.
- `/simulation?projectId=<bestehende Projekt-ID>`: Projektkontext, Strategieauswahl und vorhandene Szenarien pruefen.
- Neues Szenario anlegen.
- Szenario bearbeiten: Schwierigkeit, Gespraechsphase, Sprache, Trainingsziel, Briefing und Erfolgskriterien speichern.
- Pruefen, dass keine produktive Simulation, kein Chat und keine Voice-Funktion vorhanden sind.
- `/trainer-review`: Auswahlansicht pruefen.
- `/trainer-review?projectId=<bestehende Projekt-ID>`: Szenarioliste fuer Review pruefen.
- `/trainer-review?scenarioId=<bestehende Szenario-ID>`: Kommentar-Liste pruefen.
- Trainerkommentar anlegen.
- Sichtbarkeit zwischen trainerintern und trainee-sichtbar markieren.
- Einfachen Lernpunkt / naechsten Fokus als Kommentar erfassen.
- Kommentar bearbeiten.
- `/projects/[id]`: Links zu Simulation und Trainerreview pruefen.
- `/strategy?projectId=<bestehende Projekt-ID>`: Link zu Simulation pruefen.

## Manuelle Pruefhilfe Phase C0.1

- `docs/mvp-acceptance-checklist.md` lesen und pruefen, ob die komplette User Journey Company -> Profile -> Project -> Knowledge Base -> Imports -> Analysis -> Strategy -> Simulation -> Trainerreview abgedeckt ist.
- Pruefen, ob technische Vorpruefung, Browser-Smoke-Uebersicht, Empty States, Error States und Abnahmeprotokoll enthalten sind.
- Pruefen, ob die bewussten Nicht-MVP-Funktionen klar abgegrenzt sind.
- Sicherstellen, dass keine Upload-/Import-, RAG-, OCR-, Voice- oder produktive Simulationsfunktion eingefuehrt wurde.

## Manuelle Pruefhilfe Phase C0.2

- `docs/browser-smoke-test-plan.md` lesen und pruefen, ob alle MVP-Routen enthalten sind.
- Pruefen, ob projektspezifische Query-Parameter-Flows fuer Knowledge Base, Analysis, Strategy, Simulation und Trainerreview enthalten sind.
- Pruefen, ob Empty-State-, Error-State- und Backend-nicht-erreichbar-Faelle dokumentiert sind.
- Pruefen, ob die Workflow-Kette Project -> Knowledge Base -> Imports -> Analysis -> Strategy -> Simulation -> Trainerreview als Browserpruefung enthalten ist.
- Sicherstellen, dass keine automatisierten Tests, keine neuen Features und kein Frontend-Refactoring eingefuehrt wurden.

## Manuelle Pruefhilfe Phase C0.3

- `docs/mvp-e2e-test-path.md` lesen und pruefen, ob der Rheinwerk-Demo-Fall fachlich plausibel beschrieben ist.
- Pruefen, ob Company, Profile, SupplierProfile, RequestItem, NegotiationProject, Knowledge Base, Analysis, Strategy, SimulationScenario und TrainerComment als Testpfad abgedeckt sind.
- Pruefen, ob erwartete Ergebnisse, Abbruchpunkte, akzeptierte Datenluecken und Nicht-MVP-Grenzen dokumentiert sind.
- Sicherstellen, dass keine Seed-Daten, keine automatisierten Tests, keine API-Aenderungen und keine Upload-/Import-Funktionen eingefuehrt wurden.

## Manuelle Pruefhilfe Phase C0.7

- `docs/mvp-acceptance-results.md` lesen und pruefen, ob technische Verifikation, Browser-Smoke-Test und Rheinwerk-E2E-Testpfad nachvollziehbar dokumentiert sind.
- Pruefen, ob das Ergebnis `bestanden mit offenen Nicht-Blockern` klar dokumentiert ist.
- Pruefen, ob der Docker-Frontend-/Turbopack-Befund einschliesslich lokaler Gegenprobe auf Port `3001` enthalten ist.
- Pruefen, ob offene Nicht-Blocker und akzeptierte Datenluecken getrennt dokumentiert sind.
- Sicherstellen, dass keine neuen Features, keine Upload-/Import-Logik, keine Migrationen und kein Refactoring eingefuehrt wurden.

## Manuelle Pruefhilfe Issue #66

- `/suppliers`: Navigation, Loading-/Error-/Empty-State und die Anlage eines Lieferantenprofils mit Company-Bezug pruefen.
- `/suppliers/[id]`: Kernfelder bearbeiten und die Liste verknuepfter Projekte pruefen.
- `/projects`: Angelegtes Lieferantenprofil im Feld `Lieferantenprofil` auswaehlen und ein Projekt anlegen.
- `/projects/[id]`: Auswahl speichern, nach Reload bestaetigen und den verlinkten Lieferantenkontext in der Beziehungsbox pruefen.
- Sicherstellen, dass keine RequestItem-, Import-, Backend-Migrations-, PDF/OCR- oder KI-Logik eingefuehrt wurde.

## Manuelle Pruefhilfe Issue #69

- `/request-items`: Navigation, Loading-/Error-/Empty-State und die Anlage einer Anfrageposition mit Company-Bezug pruefen.
- `/request-items/[id]`: Kernfelder bearbeiten und die Liste verknuepfter Projekte pruefen.
- `/projects`: Angelegte Anfrageposition im Feld `Anfrageposition` auswaehlen und ein Projekt anlegen.
- `/projects/[id]`: Auswahl speichern, nach Reload bestaetigen und den verlinkten Bedarf mit Kernfeldern in der Beziehungsbox pruefen.
- Sicherstellen, dass keine SupplierProfile-, Import-, Backend-Migrations-, PDF/OCR- oder KI-Logik eingefuehrt wurde.

## Manuelle Pruefhilfe Issue #156

- `/strategy?projectId=<bestehende Projekt-ID>`: Strategy Overview oberhalb der Detailformulare pruefen.
- Projektfokus, Strategiebelastbarkeit, Arbeitskontext, sechs Bausteinkarten und Fokusbereich sichtbar pruefen.
- Sicherstellen, dass genau eine dominante Primaeraktion im Overview-Bereich sichtbar ist und die Detailformulare optisch zurueckhaltender bleiben.
- Kleinen Browser-Viewport pruefen und sicherstellen, dass keine horizontale Ueberbreite entsteht.
- Sicherstellen, dass keine automatische Strategie-, KI-, Simulations-, Backend- oder Migrationslogik eingefuehrt wurde.

## Manuelle Pruefhilfe Issue #159

- `docs/roadmap.md` und `docs/codex-tasks.md` pruefen.
- Sicherstellen, dass #154, #156, #157 und #158 als abgeschlossen eingeordnet sind.
- Sicherstellen, dass Getting Started, Strategy Overview, lokaler Smoke-Test und Staging-Smoke-Test als D10-Zwischenstand nachvollziehbar sind.
- Sicherstellen, dass D11 / Issue #155 weiterhin als spaeterer Roadmapblock abgegrenzt und nicht gestartet ist.
- Sicherstellen, dass #55, #113 und #155 als offene Nicht-Blocker unveraendert benannt bleiben.
- Sicherstellen, dass keine Produktdateien, keine Backendlogik, keine UI, keine Migration, kein Staging-Deployment und keine KI-, Simulation-, Trainerreview- oder RAG-Logik geaendert wurden.

## Manuelle Pruefhilfe Issue #160

- `docs/ai-assisted-strategy-coaching.md`, `docs/roadmap.md` und `docs/codex-tasks.md` pruefen.
- Sicherstellen, dass D11.1 als Konzept-/Preconditions-Schritt beschrieben ist und nicht wie eine Implementierungsfreigabe wirkt.
- Sicherstellen, dass Fakten, Nutzerannahmen, KI-Hypothesen und offene Fragen getrennt dokumentiert sind.
- Sicherstellen, dass Quellen-/Evidenzlogik und Speicherung erst nach Nutzerbestaetigung klar beschrieben sind.
- Sicherstellen, dass der bestehende Strategy Builder als aktueller manueller beziehungsweise regelbasierter Vorbereitungsbereich erhalten bleibt.
- Sicherstellen, dass #55, #113 und #155 als offene Nicht-Blocker korrekt eingeordnet bleiben.
- Sicherstellen, dass keine Produktdateien, keine Backendlogik, keine UI, keine Migration, kein Staging-Deployment und keine KI-, Simulation-, Trainerreview-, API-, Persistenz- oder RAG-Logik geaendert wurden.

## Manuelle Pruefhilfe Issue #161

- `docs/ai-strategy-context-contract.md`, `docs/ai-assisted-strategy-coaching.md`, `docs/roadmap.md` und `docs/codex-tasks.md` pruefen.
- Sicherstellen, dass D11.2 als fachlicher Kontextvertrag beschrieben ist und nicht wie eine finale API-, DTO-, Datenbank- oder Implementierungsspezifikation wirkt.
- Sicherstellen, dass Kontextbereiche und zulaessige Datenquellen eingeordnet sind.
- Sicherstellen, dass Fakten, Nutzerannahmen, datenbasierte Hinweise, KI-Hypothesen, offene Fragen und Widersprueche getrennt bleiben.
- Sicherstellen, dass Quellen-/Evidenzmarker nur konzeptionell beschrieben sind und keine RAG- oder Claim-Extraktion eingefuehrt wird.
- Sicherstellen, dass Mindestqualitaet, Missing Information, widerspruechliche Kontexte und ungeeignete Kontextbestandteile dokumentiert sind.
- Sicherstellen, dass #55, #113 und #155 als offene Nicht-Blocker korrekt eingeordnet bleiben.
- Sicherstellen, dass keine Produktdateien, keine Backendlogik, keine UI, keine Migration, kein Staging-Deployment und keine KI-, Simulation-, Trainerreview-, API-, Persistenz- oder RAG-Logik geaendert wurden.

## Manuelle Pruefhilfe Issue #162

- `docs/ai-strategy-evidence-model.md`, `docs/ai-strategy-context-contract.md`, `docs/ai-assisted-strategy-coaching.md`, `docs/roadmap.md` und `docs/codex-tasks.md` pruefen.
- Sicherstellen, dass D11.3 als fachliches Quellen-, Claim- und Evidenzmodell beschrieben ist und nicht wie ein technisches Datenmodell, eine API-, DTO-, RAG-, Persistenz- oder Score-Spezifikation wirkt.
- Sicherstellen, dass Quellenbegriff und Claim-Begriff klar abgegrenzt sind.
- Sicherstellen, dass Aussagearten, Evidenz-/Confidence-Stufen, Aktualitaet, Herkunft und Widersprueche fachlich unterschieden sind.
- Sicherstellen, dass Claims und Evidence im Strategy Coaching nur als Datenlage, Hinweis, Risiko, offene Frage, Argumentationsidee oder Lerncheck beschrieben sind.
- Sicherstellen, dass Claims erst nach Nutzerbestaetigung in Strategy-Bausteine ueberfuehrt werden duerfen.
- Sicherstellen, dass ungepruefte KI-Ausgaben, Volltextfragmente ohne Aussagekern, Quellen ohne relevante Herkunft oder Datum, technische Logs, Secrets, alte Aussagen ohne Marker und ungepruefte Trainerhinweise nicht als belastbare Claims gelten.
- Sicherstellen, dass #55, #113 und #155 als offene Nicht-Blocker korrekt eingeordnet bleiben.
- Sicherstellen, dass keine Produktdateien, keine Backendlogik, keine UI, keine Migration, kein Staging-Deployment und keine KI-, Simulation-, Trainerreview-, API-, Persistenz-, Score- oder RAG-Logik geaendert wurden.

## Manuelle Pruefhilfe Issue #163

- `docs/ai-assisted-strategy-coaching.md`, `docs/ai-strategy-context-contract.md`, `docs/ai-strategy-evidence-model.md`, `docs/roadmap.md` und `docs/codex-tasks.md` pruefen.
- Sicherstellen, dass D11.4 wie ein Konsolidierungs- und Zwischenabschluss wirkt, nicht wie ein Implementierungsstart.
- Sicherstellen, dass D11.1, D11.2 und D11.3 als erledigter Konzeptstand zusammenhaengend eingeordnet sind.
- Sicherstellen, dass die massgeblichen D11-Konzeptdokumente benannt sind.
- Sicherstellen, dass die Implementierungsgrenze eindeutig bleibt: kein AI Strategy Coach, keine RAG- oder Claim-Extraktion, kein Persistenzmodell fuer KI-Dialoge, Hypothesen, bestaetigte Vorschlaege oder Reviewdaten und keine API-, Backend-, Frontend-, Datenbank- oder UI-Freigabe.
- Sicherstellen, dass der bestehende Strategy Builder als aktueller manueller beziehungsweise regelbasierter Vorbereitungsbereich abgegrenzt bleibt.
- Sicherstellen, dass D11.5, D11.6 und D11.7 nur als moegliche spaetere Folgeoptionen dargestellt sind.
- Sicherstellen, dass #55, #113 und #155 als offene Nicht-Blocker korrekt eingeordnet bleiben.
- Sicherstellen, dass keine Produktdateien, keine Backendlogik, keine UI, keine Migration, kein Staging-Deployment und keine KI-, RAG-, Claim-, Simulation-, Trainerreview-, API-, Persistenz- oder Score-Logik geaendert wurden.

## Manuelle Pruefhilfe Issue #165

- `docs/demo-seed-plan.md`, `docs/demo-test-data-matrix.md`, `docs/roadmap.md`, `docs/codex-tasks.md` und `docs/browser-smoke-test-plan.md` pruefen.
- Sicherstellen, dass D12.2 wie ein technischer Seed-Plan wirkt, nicht wie eine Seed-Implementierung.
- Sicherstellen, dass bestehende Rheinwerk-/Aurum-Demo-Daten eingeordnet und nicht zur Alles-in-einem-Teststory ueberladen werden.
- Sicherstellen, dass mehrere Demo-/Readiness-Zustaende mit betroffenen Entitaeten, erwarteten UI-Zustaenden und lokaler beziehungsweise spaeterer Staging-Verfuegbarkeit beschrieben sind.
- Sicherstellen, dass Idempotenz, Demo-Marker, stabile IDs beziehungsweise natuerliche Schluessel und Schutz vor echten oder geheimen Daten dokumentiert sind.
- Historisch fuer Issue #165 sicherstellen, dass D12.3 dort nur als spaetere separate Seed-Implementierung abgegrenzt war; D12.3 ist inzwischen in Issue #166 umgesetzt.
- Sicherstellen, dass #55, #113 und #155 als offene Nicht-Blocker korrekt eingeordnet bleiben.
- Sicherstellen, dass keine Produktdateien, keine Backendlogik, keine UI, keine Migration, keine Seed-Datei, kein Staging-Deployment und keine KI-, RAG-, Claim-, Simulation-, Trainerreview-, API- oder Persistenzlogik geaendert wurden.

## Manuelle Pruefhilfe Issue #166

- `backend/app/seeds/staging_demo.py` pruefen: D12.3-Demo-Datensaetze muessen feste IDs, Demo-Marker und Upsert-Verhalten nutzen.
- Demo A bis E muessen im Seed nachvollziehbar abgebildet sein: Empty Strategy, unvollstaendige Strategy, `Grundlage vorhanden`, `Bereit fuer Briefing / Simulation`, kein SupplierProfile.
- `docs/demo-seed-plan.md`, `docs/demo-test-data-matrix.md`, `docs/browser-smoke-test-plan.md`, `docs/roadmap.md` und `docs/codex-tasks.md` muessen IDs, Auffindbarkeit und Scope-Grenzen nennen.
- Sicherstellen, dass der bestehende Rheinwerk-/Aurum-Hauptfall erhalten bleibt und nicht zur Alles-in-einem-Teststory ueberladen wird.
- Sicherstellen, dass #55, #113 und #155 als offene Nicht-Blocker korrekt eingeordnet bleiben.
- Sicherstellen, dass keine Produktlogik, keine Frontend-UI, keine Backend-API, keine Migration, kein Staging-Deployment und keine KI-, RAG-, Claim-, Simulation- oder Trainerreview-Logik eingefuehrt wurde.

## Manuelle Pruefhilfe Issue #167

- Lokalen Compose-Stack starten und Backend Health, Frontend-Erreichbarkeit sowie Alembic Head pruefen.
- Idempotenten Demo-Seed ausfuehren beziehungsweise bestaetigen, dass die D12.3-Demo-Projekte lokal vorhanden sind.
- Alle relevanten Project-Detailseiten A bis E pruefen: Preparation Gaps, RequestItem-Kontext, Supplier Context vorhanden/offen und Strategy-Snapshot.
- Strategy-Routen A bis D pruefen: Empty State, `Unvollstaendig`, `Grundlage vorhanden`, `Bereit fuer Briefing / Simulation` und Next-Action-Guidance nur beim vollstaendigen Zustand.
- `/briefing?projectId=...` fuer das vollstaendige Strategy-Projekt pruefen.
- Mobile-Breite und Browser-Console pruefen.
- Ergebnis in `docs/browser-smoke-test-plan.md` dokumentieren und `docs/roadmap.md` sowie `docs/codex-tasks.md` gemaess Definition of Done aktualisieren oder bewusst begruenden.
- Sicherstellen, dass kein Staging veraendert wurde und keine Produktlogik, Frontend-UI, Backend-API, Migration, Seed-Aenderung, KI-, RAG-, Claim-, Simulation- oder Trainerreview-Logik eingefuehrt wurde.

## Manuelle Pruefhilfe Issue #168

- Staging-Repository in `/opt/negotiation-tools` auf aktuellen `origin/main`-Stand bringen.
- Staging-Stack mit `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build` neu bauen/starten.
- Backend Health, Frontend-Erreichbarkeit, Containerstatus und Alembic Head pruefen.
- Idempotenten Demo-Seed auf Staging ausfuehren und bestaetigen, dass die D12.3-Demo-Projekte A-E vorhanden sind.
- Project-Detailseiten A bis E auf Staging pruefen: Preparation Gaps, RequestItem-Kontext, Supplier Context vorhanden/offen und Strategy-Snapshot.
- Strategy-Routen A bis D auf Staging pruefen: Empty State, `Unvollstaendig`, `Grundlage vorhanden`, `Bereit fuer Briefing / Simulation` und Next-Action-Guidance nur beim vollstaendigen Zustand.
- `/briefing?projectId=...` fuer das vollstaendige Strategy-Projekt pruefen.
- Mobile-Breite und Browser-Console pruefen.
- Ergebnis in `docs/browser-smoke-test-plan.md` dokumentieren und `docs/roadmap.md` sowie `docs/codex-tasks.md` gemaess Definition of Done aktualisieren oder bewusst begruenden.
- Sicherstellen, dass keine Produktlogik, Frontend-UI, Backend-API, Migration, Seed-Logik, KI-, RAG-, Claim-, Simulation- oder Trainerreview-Logik eingefuehrt wurde.

## Manuelle Pruefhilfe Issue #169

- `docs/roadmap.md` und `docs/codex-tasks.md` pruefen.
- Sicherstellen, dass D12.1 bis D12.5 als abgeschlossener Demo-Readiness-Block zusammengefasst sind.
- Sicherstellen, dass Empty Strategy, unvollstaendige Strategy, `Grundlage vorhanden`, `Bereit fuer Briefing / Simulation`, Supplier Context vorhanden/offen, Preparation Gaps Card, Next-Action-Guidance und `/briefing?projectId=...` als lokal und auf Staging demonstrierbar eingeordnet sind.
- Sicherstellen, dass lokaler Smoke-Test D12.4, Staging-Smoke-Test D12.5, Alembic Head und idempotenter Demo-Seed genannt sind.
- Sicherstellen, dass keine Produktdateien, Frontend-UI, Backend-API, Migration, Seed-Aenderung, Staging-Aenderung, KI-, RAG-, Claim-, Simulation- oder Trainerreview-Logik eingefuehrt wurde.
- Sicherstellen, dass #55, #113 und #155 als offene Nicht-Blocker korrekt eingeordnet bleiben.
- Sicherstellen, dass ein naechster Produktblock nur benannt und nicht gestartet ist.

## Manuelle Pruefhilfe Issue #170

- `docs/briefing-preparation-scope.md`, `docs/roadmap.md` und `docs/codex-tasks.md` pruefen.
- Sicherstellen, dass D13.1 als reiner Konzept-/Scope-Schritt beschrieben ist.
- Sicherstellen, dass D13 mit `Strategy -> Briefing Preparation` startet und Simulation Preparation nur als spaeterer Folgeblock eingeordnet ist.
- Sicherstellen, dass die Entscheidung fachlich begruendet ist.
- Sicherstellen, dass erste Briefing-Bausteine, zulaessige vorhandene Datenquellen und Nicht-Ziele klar benannt sind.
- Sicherstellen, dass mindestens ein sinnvoller Folgeissue-Vorschlag enthalten ist.
- Sicherstellen, dass keine Produktdateien, Frontend-UI, Backend-API, Migration, Seed-Aenderung, Staging-Aenderung, KI-, RAG-, Claim-, Simulations-, Score-, Trainerreview- oder Persistenzlogik eingefuehrt wurde.

## Naechste Schritte

1. D13.2 separat zuschneiden: Informationsarchitektur fuer `/briefing?projectId=...` auf Basis von `docs/briefing-preparation-scope.md`, weiterhin ohne KI-Briefing, Simulation, neue Persistenz oder Backendmodell.
2. Weitere Zielobjekt-Erzeugung bleibt getrennten Issues vorbehalten; PDF-Verarbeitung bleibt separat in Issue #55 vorgemerkt.
