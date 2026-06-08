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

## Naechste Schritte

1. Naechsten fachlichen Schritt separat priorisieren.
2. Weitere Zielobjekt-Erzeugung bleibt getrennten Issues vorbehalten; PDF-Verarbeitung bleibt separat in Issue #55 vorgemerkt.
