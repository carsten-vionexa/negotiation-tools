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
- Frontend-Nutzbarkeitsflow Issue #66 umgesetzt: SupplierProfile-Liste sowie Create/Edit-Detailflow unter `/suppliers` ergaenzt, in die Navigation aufgenommen und den strukturierten Lieferantenbezug in Projektanlage und Projektdetail nutzbar gemacht, ohne Backend-, Import- oder Migrationslogik
- Frontend-Nutzbarkeitsflow Issue #69 umgesetzt: RequestItem-Liste sowie Create/Edit-Detailflow unter `/request-items` ergaenzt, in die Navigation aufgenommen und die strukturierte Anfrageposition in Projektanlage und Projektdetail nutzbar gemacht, ohne Backend-, Import- oder Migrationslogik
- Frontend-Hardening Issue #73 umgesetzt: Gemeinsamen `FormData`-Helper fuer getrimmte optionale Werte und explizite Pflichtfeldfehler eingefuehrt sowie die bestehenden Frontend-Server-Actions darauf umgestellt, ohne Backend-, Import- oder Migrationslogik

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

Status: Phase C1 bis C11, die Frontend-Nutzbarkeitsflows aus Issues #66 und #69 sowie die Frontend-Hardening-Nacharbeit aus Issue #73 umgesetzt.

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
12. Frontend Issue #66: SupplierProfiles als pflegbare Lieferantenstammdaten unter `/suppliers` bereitgestellt und fuer die Projektzuordnung sowie Projektanzeige erreichbar gemacht.
13. Frontend Issue #69: RequestItems als pflegbare Anfragepositionen unter `/request-items` bereitgestellt und fuer die Projektzuordnung sowie strukturierte Projektanzeige erreichbar gemacht.
14. Frontend Issue #73: Pflichtfelder in Frontend-Server-Actions ueber einen gemeinsamen `FormData`-Helper gegen fehlende oder leere Posts abgesichert; statt leerer Strings entsteht ein feldbezogener Fehler.

Naechster Schritt:

1. Naechsten fachlichen Schritt separat priorisieren.

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
erweitert denselben Endpoint um `RequestItem`-Zielobjekte. PDF-Verarbeitung
bleibt separat vorgemerkt. Die Issues #66 und #69 machen die strukturierten
SupplierProfile- und RequestItem-Bezuege anschliessend im Frontend pflegbar
und in Projekten zuordenbar.

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

- `docs/mvp-acceptance-checklist.md` lesen und pruefen, ob die komplette User Journey Company -> Profile -> Project -> Knowledge Base -> Analysis -> Strategy -> Simulation -> Trainerreview abgedeckt ist.
- Pruefen, ob technische Vorpruefung, Browser-Smoke-Uebersicht, Empty States, Error States und Abnahmeprotokoll enthalten sind.
- Pruefen, ob die bewussten Nicht-MVP-Funktionen klar abgegrenzt sind.
- Sicherstellen, dass keine Upload-/Import-, RAG-, OCR-, Voice- oder produktive Simulationsfunktion eingefuehrt wurde.

## Manuelle Pruefhilfe Phase C0.2

- `docs/browser-smoke-test-plan.md` lesen und pruefen, ob alle MVP-Routen enthalten sind.
- Pruefen, ob projektspezifische Query-Parameter-Flows fuer Knowledge Base, Analysis, Strategy, Simulation und Trainerreview enthalten sind.
- Pruefen, ob Empty-State-, Error-State- und Backend-nicht-erreichbar-Faelle dokumentiert sind.
- Pruefen, ob die Workflow-Kette Project -> Knowledge Base -> Analysis -> Strategy -> Simulation -> Trainerreview als Browserpruefung enthalten ist.
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

## Naechste Schritte

1. Naechsten fachlichen Schritt separat priorisieren.
2. Weitere Zielobjekt-Erzeugung bleibt getrennten Issues vorbehalten; PDF-Verarbeitung bleibt separat in Issue #55 vorgemerkt.
