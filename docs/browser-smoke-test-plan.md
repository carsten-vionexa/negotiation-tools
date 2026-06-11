# Browser-Smoke-Test-Plan fuer MVP-Routen

## 1. Zweck

Dieser Plan beschreibt einen schnellen, manuell ausfuehrbaren Browser-Smoke-Test fuer den MVP-Stand nach Phase B. Er prueft nicht die fachliche Vollstaendigkeit jedes Datenfelds, sondern ob die vorhandenen Routen erreichbar sind, ob zentrale Workflow-Links funktionieren und ob Empty States und Error States verstaendlich erscheinen.

Der Plan ist Teil von Phase C0. Er fuehrt keine neuen Features ein und ersetzt keine spaetere automatisierte Testabdeckung.

## 2. Testumfang

Geprueft werden die vorhandenen MVP-Routen und die wichtigsten Query-Parameter-Flows:

- Dashboard
- Company-Flow
- Profile-Flow
- Project-Flow
- Knowledge-Base-Flow
- ImportJob-Upload-, Parse-, Mapping-, Validate- und Create-Targets-Review-Flow
- Analysis-Flow
- Strategy-Flow
- Simulation-Scenario-Flow
- Trainerreview-Flow

Geprueft wird die begrenzte ImportJob-Strecke aus CSV-/XLSX-Upload, manuellem Parse-Start, explizitem Mapping geparster Rows, Validierung und expliziter Create-Targets-Aktion fuer validierte Jobs. Nicht geprueft werden eine vollstaendige Import-Processing-Automation, Backend-Importlogik-Aenderungen, Migrationen, RAG, PDF-/OCR-Verarbeitung, KI-Mapping, Voice, Chat, Streaming oder automatische Auswertung, weil diese bewusst nicht Teil des aktuellen MVP sind.

## 3. Voraussetzungen

Vor dem Test:

1. Lokale Umgebung starten, z. B. mit `docker compose up --build`.
2. Frontend im Browser oeffnen: `http://localhost:3000`.
3. Backend Healthcheck pruefen: `http://localhost:8000/api/health`.
4. Sicherstellen, dass `NEXT_PUBLIC_API_URL` korrekt gesetzt ist oder lokal auf `http://localhost:8000` zeigt.
5. Fuer projektbezogene Routen mindestens eine gueltige Projekt-ID bereithalten.
6. Fuer `trainer-review?scenarioId=...` mindestens eine gueltige Szenario-ID bereithalten.

Empfohlene Testdaten:

- eine Company,
- ein UserProfile / Rollenprofil,
- ein SupplierProfile,
- ein RequestItem,
- ein NegotiationProject,
- optional KnowledgeDocuments, KnowledgeClaims, ProcurementHistoryItems,
- eine Strategy mit mindestens einem Strategiebaustein,
- ein SimulationScenario,
- ein TrainerComment.

Fuer spaetere reproduzierbare Strategy-Readiness- und Preparation-Smoke-Tests
beschreibt `docs/demo-test-data-matrix.md` die fachliche Testdatenmatrix.
`docs/demo-seed-plan.md` ordnet als D12.2-Plan ein, welche dieser Zustaende
spaeter idempotent als lokale beziehungsweise Staging-Demo-Daten bereitgestellt
werden koennten. Bis zu einer separaten D12.3-Seed-Implementierung bleiben diese
Zustaende Planungsgrundlage und keine vorausgesetzten Seed-Daten.

## 4. Ergebnislegende

| Status | Bedeutung |
|---|---|
| bestanden | Route/Flow verhaelt sich wie erwartet |
| offen | Pruefung nicht abgeschlossen oder Testdaten fehlen |
| Blocker | Route/Flow verhindert den MVP-Durchlauf |
| nicht relevant | Pruefung in diesem Testlauf nicht anwendbar |

## 5. Route-fuer-Route-Smoke-Test

### 5.1 `/dashboard`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Dashboard-Seite laedt ohne Crash | offen |  |
| Projektzaehler / Uebersicht | vorhandene Daten werden angezeigt oder plausibler Empty State erscheint | offen |  |
| Navigation | Links zu zentralen MVP-Bereichen sind erreichbar | offen |  |
| Backend nicht erreichbar | Error State statt weisser Seite | offen |  |

### 5.2 `/companies`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Company-Liste oder Empty State erscheint | offen |  |
| Empty State | Bei leerem Datenbestand wird klar beschrieben, dass noch keine Companies vorhanden sind | offen |  |
| Anlageformular | einfache Company-Anlage ist sichtbar und nutzbar, sofern im aktuellen Flow vorhanden | offen |  |
| Navigation zu Detail | vorhandene Company kann geoeffnet werden | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.3 `/companies/[id]`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Gueltige ID oeffnet | Company-Detail laedt | offen |  |
| Stammdaten sichtbar | Name, Branche und weitere vorhandene Felder werden angezeigt | offen |  |
| Bearbeitung | Aenderungen koennen gespeichert werden, sofern vorgesehen | offen |  |
| Verknuepfte Projekte | zugehoerige Projekte erscheinen oder Empty State ist plausibel | offen |  |
| Ungueltige ID | verstaendlicher Error State | offen |  |

### 5.4 `/profiles`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Profil-Liste oder Empty State erscheint | offen |  |
| Empty State | Bei leerem Bestand wird ein verstaendlicher Hinweis angezeigt | offen |  |
| Anlageformular | Rollenprofil kann mit Company-Bezug angelegt werden, sofern Daten vorhanden | offen |  |
| Navigation zu Detail | vorhandenes Profil kann geoeffnet werden | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.5 `/profiles/[id]`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Gueltige ID oeffnet | Profil-Detail laedt | offen |  |
| Profildaten sichtbar | Name/Rollenname, Rolle, Funktion, Notizen oder Trainingshinweise erscheinen | offen |  |
| Bearbeitung | Aenderungen koennen gespeichert werden, sofern vorgesehen | offen |  |
| Owner-Projekte | zugeordnete Projekte erscheinen oder Empty State ist plausibel | offen |  |
| Ungueltige ID | verstaendlicher Error State | offen |  |

### 5.6 `/projects`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Projektliste oder Empty State erscheint | offen |  |
| Projektanlage | Projekt kann mit Company und optional Owner/Supplier/RequestItem angelegt werden | offen |  |
| Listeninhalt | Projektstatus, Kategorie oder Prioritaet werden plausibel dargestellt | offen |  |
| Navigation zu Detail | Projekt-Detailseite kann geoeffnet werden | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.7 `/projects/[id]`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Gueltige ID oeffnet | Projektdetail laedt | offen |  |
| Beziehungen sichtbar | Company, Owner, Supplier und RequestItem werden angezeigt oder als nicht gesetzt markiert | offen |  |
| Bearbeitung | Projektfelder koennen gespeichert werden | offen |  |
| Workflow-Link: Datenbasis | Link zu `/knowledge-base?projectId=<id>` funktioniert | offen |  |
| Workflow-Link: Analyse | Link zu `/analysis?projectId=<id>` funktioniert | offen |  |
| Workflow-Link: Strategie | Link zu `/strategy?projectId=<id>` funktioniert | offen |  |
| Workflow-Link: Simulation | Link zu `/simulation?projectId=<id>` funktioniert | offen |  |
| Workflow-Link: Trainerreview | Link zu `/trainer-review?projectId=<id>` funktioniert | offen |  |
| Ungueltige ID | verstaendlicher Error State | offen |  |

### 5.8 `/knowledge-base`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Datenbasis-Auswahl oder Uebersicht erscheint | offen |  |
| Empty State | Fehlende Quellen, Claims oder Einkaufsdaten werden verstaendlich dargestellt | offen |  |
| Projektwahl / Links | vorhandene Projekte koennen zur projektbezogenen Datenbasis fuehren | offen |  |
| Nicht-MVP-Grenze | keine semantische Dokumentverarbeitung, OCR- oder automatische Analysefunktion sichtbar | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.9 `/knowledge-base?projectId=<existing-project-id>`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Projektkontext laedt | Projekt und abgeleitete Company werden angezeigt | offen |  |
| Dokumente | vorhandene KnowledgeDocuments erscheinen oder Empty State ist plausibel | offen |  |
| Claims | vorhandene Claims erscheinen oder Empty State ist plausibel | offen |  |
| RequestItems | Anfragepositionen erscheinen oder Empty State ist plausibel | offen |  |
| Einkaufshistorie | ProcurementHistoryItems erscheinen oder Empty State ist plausibel | offen |  |
| Zur Analyse | Link zu `/analysis?projectId=<id>` funktioniert, sofern vorhanden | offen |  |
| Ungueltige Projekt-ID | verstaendlicher Error State | offen |  |

### 5.10 `/imports`, `/imports/new` und `/imports/[id]`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Liste und Upload-Einstieg | `/imports` listet Jobs oder zeigt einen Empty State und verlinkt auf `/imports/new` | offen |  |
| CSV-Upload | Gueltige `.csv`-Datei erzeugt einen `pending` ImportJob und fuehrt in dessen Detailansicht | offen |  |
| CSV-Parse | `ImportJob parsen` aktualisiert Status und Zaehler und macht geparste ImportRows sichtbar | offen |  |
| XLSX-Parse | Dieselbe Strecke funktioniert fuer `.xlsx`; erzeugte Rows zeigen Sheet-Kontext | offen |  |
| Statusgrenze | Bei einem nicht mehr `pending` Job wird keine Parse-Aktion angeboten | offen |  |
| Mapping | Bei `parsed` werden Raw-Quellfelder und zum Target Entity passende Zielfelder angeboten; nach Mapping sind `mapping_json` und `mapped_data_json` sichtbar | offen |  |
| Mapping-Statusgrenze | Bei einem nicht `parsed` Job wird keine Mapping-Aktion angeboten | offen |  |
| Validate | Bei `mapped` wird die Validierungsaktion angeboten; nach Validierung sind `validation_summary_json`, Row-Status und Fehler-/Warnhinweise sichtbar | offen |  |
| Create Targets | Bei `validated` wird die Create-Targets-Aktion angeboten; nach Erfolg zeigt der Job `completed` oder `completed_with_errors` und Rows zeigen Zielreferenzen | offen |  |
| RequestItem-Ziellink | `request_item`-Rows mit `target_record_id` verlinken auf `/request-items/{id}` | offen |  |
| Procurement-Zielreferenz | `procurement_history_item`-Rows zeigen die ID als Text, solange keine Detailroute existiert; es entsteht kein kaputter Link | offen |  |
| Processing-Grenze | Bei nicht passenden Status wird keine Parse-, Mapping-, Validate- oder Create-Targets-Aktion angeboten | offen |  |
| Error State | Upload-, Parse-, Mapping-, Validate- oder Create-Targets-API-Fehler wird verstaendlich sichtbar statt einer leeren Seite | offen |  |

### 5.11 `/analysis`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Projektauswahl oder Empty State erscheint | offen |  |
| Projektliste | vorhandene Projekte sind auswaehlbar | offen |  |
| Empty State | Wenn keine Projekte vorhanden sind, wird naechster Schritt verstaendlich beschrieben | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.12 `/analysis?projectId=<existing-project-id>`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Projektkontext laedt | Projekt, Company, Supplier und RequestItem werden angezeigt, soweit vorhanden | offen |  |
| Fakten/Claims | vorhandene Informationen werden sichtbar oder als fehlend markiert | offen |  |
| Datenluecken | Datenluecken werden als Arbeitszustand dargestellt | offen |  |
| Risiken/Chancen/offene Fragen | Analysebereiche sind sichtbar und getrennt | offen |  |
| Zur Datenbasis | Link zu `/knowledge-base?projectId=<id>` funktioniert | offen |  |
| Zur Strategie | Link zu `/strategy?projectId=<id>` funktioniert | offen |  |
| Ungueltige Projekt-ID | verstaendlicher Error State | offen |  |

### 5.13 `/strategy`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Projektauswahl oder Empty State erscheint | offen |  |
| Projektliste | vorhandene Projekte sind auswaehlbar | offen |  |
| Empty State | Wenn keine Projekte vorhanden sind, wird naechster Schritt verstaendlich beschrieben | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.14 `/strategy?projectId=<existing-project-id>`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Strategiekontext laedt | Projekt, Company und ggf. Supplier/RequestItem werden angezeigt | offen |  |
| Kein Strategieobjekt | Empty State mit Anlageoption erscheint | offen |  |
| Strategie-Kopf | Anlage oder Bearbeitung funktioniert | offen |  |
| ZOPA | ZOPA-Dimension kann angelegt/bearbeitet oder leer angezeigt werden | offen |  |
| BATNA | BATNA-Option kann angelegt/bearbeitet oder leer angezeigt werden | offen |  |
| Konzessionen | Konzession als Tauschobjekt kann angelegt/bearbeitet oder leer angezeigt werden | offen |  |
| Argumentation | Argumentationslinie kann angelegt/bearbeitet oder leer angezeigt werden | offen |  |
| Zur Analyse | Link zu `/analysis?projectId=<id>` funktioniert | offen |  |
| Zur Simulation | Link zu `/simulation?projectId=<id>` funktioniert | offen |  |
| Zum Trainerreview | Link zu `/trainer-review?projectId=<id>` funktioniert | offen |  |
| Nicht-MVP-Grenze | keine automatische ZOPA-/BATNA-/KI-Strategie-Funktion sichtbar | offen |  |

### 5.15 `/simulation`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Projektauswahl oder Empty State erscheint | offen |  |
| Projektliste | vorhandene Projekte sind auswaehlbar | offen |  |
| Nicht-MVP-Grenze | Seite kommuniziert Vorbereitung statt produktiver Simulation | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.16 `/simulation?projectId=<existing-project-id>`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Szenariokontext laedt | Projekt, Company, Supplier, Owner, Strategien und Szenarien werden geladen, soweit vorhanden | offen |  |
| Szenario-Liste | vorhandene Szenarien erscheinen oder Empty State ist plausibel | offen |  |
| Szenarioanlage | Szenario kann mit Titel, Schwierigkeit, Phase, Sprache, Trainingsziel, Briefing und Erfolgskriterien angelegt werden | offen |  |
| Szenariobearbeitung | vorhandenes Szenario kann bearbeitet werden | offen |  |
| Kultur-/Rollenbriefing | Hinweise erscheinen als Arbeitshypothesen, nicht als stereotypes Laenderprofil | offen |  |
| Zum Trainerreview | Link zu `/trainer-review?projectId=<id>` oder Szenario-Review funktioniert | offen |  |
| Nicht-MVP-Grenze | kein Chat, kein Voice, keine produktive Simulation, kein Streaming | offen |  |

### 5.17 `/trainer-review`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Auswahl nach Projekten und vorhandenen Szenarien erscheint | offen |  |
| Projektliste | vorhandene Projekte sind sichtbar | offen |  |
| Szenarioliste | vorhandene Szenarien sind sichtbar | offen |  |
| Empty State | fehlende Projekte/Szenarien werden verstaendlich angezeigt | offen |  |
| Nicht-MVP-Grenze | keine automatische Bewertung oder Score-Engine sichtbar | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.18 `/trainer-review?projectId=<existing-project-id>`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Projektkontext laedt | Projekt und Company werden angezeigt | offen |  |
| Szenarien sichtbar | Szenarien des Projekts werden gelistet oder Empty State fordert Szenarioanlage | offen |  |
| Navigation zur Simulation | Link zu `/simulation?projectId=<id>` funktioniert | offen |  |
| Szenarioauswahl | vorhandenes Szenario fuehrt zu `/trainer-review?scenarioId=<id>` | offen |  |
| Ungueltige Projekt-ID | verstaendlicher Error State | offen |  |

### 5.19 `/trainer-review?scenarioId=<existing-scenario-id>`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Szenariokontext laedt | Szenario, Projekt, Company und ggf. Strategie werden angezeigt | offen |  |
| Kommentar-Liste | vorhandene Kommentare erscheinen oder Empty State ist plausibel | offen |  |
| Kommentar erfassen | Trainerkommentar kann angelegt werden | offen |  |
| Sichtbarkeit | trainerintern vs. trainee-sichtbar kann markiert werden | offen |  |
| Lernpunkte | `learning_point` oder `next_focus` erscheint im Lernpunktebereich | offen |  |
| Kommentar bearbeiten | vorhandener Kommentar kann bearbeitet werden | offen |  |
| Nicht-MVP-Grenze | keine automatische Auswertung, Score-Engine oder Zertifikatslogik sichtbar | offen |  |
| Ungueltige Szenario-ID | verstaendlicher Error State | offen |  |

## 6. Querschnittliche Pruefpunkte

| Bereich | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| App-Shell | Hauptnavigation bleibt ueber alle Routen nutzbar | offen |  |
| Loading/Server Rendering | keine dauerhaft leeren oder kaputten Seiten | offen |  |
| Empty States | fehlende Daten werden fachlich erklaert | offen |  |
| Error States | Backend-/API-Fehler werden sichtbar angezeigt | offen |  |
| Query-Parameter | gueltige IDs laden Kontext; ungueltige IDs erzeugen Error State | offen |  |
| Workflow-Kette | Project -> Knowledge Base -> Imports -> Analysis -> Strategy -> Simulation -> Trainerreview ist klickbar | offen |  |
| Nicht-MVP-Grenzen | keine vollstaendige Importautomation, keine Backend-Importlogik-Aenderung, keine Migration, keine PDF-/OCR- oder semantische Dokumentverarbeitung, kein KI-Mapping, keine RAG-, Voice-, Chat- oder produktive Simulationsfunktion wird suggeriert | offen |  |

## 7. Backend-nicht-erreichbar-Test

Optionaler Negativtest:

1. Backend stoppen oder `NEXT_PUBLIC_API_URL` bewusst falsch setzen.
2. Frontend-Route mit API-Abhaengigkeit oeffnen, z. B. `/projects` oder `/strategy`.
3. Erwartung: verstaendlicher Error State statt unhandled Runtime Error oder weisser Seite.
4. Einstellung rueckgaengig machen und App erneut pruefen.

| Route | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| `/projects` | Error State sichtbar | offen |  |
| `/knowledge-base` | Error State sichtbar | offen |  |
| `/analysis` | Error State sichtbar | offen |  |
| `/strategy` | Error State sichtbar | offen |  |
| `/simulation` | Error State sichtbar | offen |  |
| `/trainer-review` | Error State sichtbar | offen |  |

## 8. Abnahmeprotokoll

| Bereich | Ergebnis | Blocker? | Notiz |
|---|---|---|---|
| Dashboard | offen | nein |  |
| Company-Flow | offen | nein |  |
| Profile-Flow | offen | nein |  |
| Project-Flow | offen | nein |  |
| Knowledge Base | offen | nein |  |
| Imports / Parse-Review | offen | nein |  |
| Analysis | offen | nein |  |
| Strategy | offen | nein |  |
| Simulation | offen | nein |  |
| Trainerreview | offen | nein |  |
| Querschnittliche Pruefung | offen | nein |  |
| Backend-nicht-erreichbar-Test | offen | nein |  |

Gesamtergebnis:

- [ ] bestanden
- [ ] bestanden mit offenen Punkten
- [ ] nicht bestanden wegen Blockern

Offene Punkte:

-

Blocker:

-

## 9. Nicht Bestandteil dieses Smoke-Tests

Nicht Bestandteil dieses Plans sind:

- Playwright-/Cypress-/E2E-Automation,
- Unit-Tests,
- API-Contract-Tests,
- vollstaendig produktiver Import inklusive Processing-/Review-Automation,
- Backend-Importlogik-Aenderungen,
- Migrationen,
- neue Zielobjekttypen,
- PDF-/OCR-Parsing oder semantische Dokumentverarbeitung,
- KI-Mapping,
- RAG,
- Embeddings,
- Chat,
- Voice,
- produktive Simulation,
- automatische Auswertung,
- Score-Engine,
- Zertifikatslogik,
- Frontend-Refactoring.

Diese Punkte bleiben Folge- oder Zielbildthemen und duerfen in diesem Smoke-Test nicht als fehlgeschlagene MVP-Funktion bewertet werden.

## 9a. Demo-/Testdatenmatrix fuer spaetere Smoke-Tests

D12.1 dokumentiert in `docs/demo-test-data-matrix.md`, welche synthetischen
Demo- und Testdatenzustaende fuer reproduzierbare lokale und spaetere
Staging-Smoke-Tests benoetigt werden. Die Matrix dient als Datenzustandsanker
fuer Strategy Readiness Guidance, Strategy Next-Action Guidance, Strategy
Overview / Strategy Board, Briefing Preparation, Project Preparation /
Preparation Gaps, Supplier Context Card, Simulation Preparation und
Trainerreview.

Die Matrix ist kein Smoke-Test-Ergebnis und keine Seed-Implementierung. Sie
beschreibt nur, welche Zustaende spaeter stabil vorhanden sein sollten.

## 10. C17-Browser-Smoke-Test-Ergebnis

Durchgefuehrt nach den Infrastruktur-Fixes aus Issues #88 und #90.

Gesamtergebnis: bestanden mit nicht-blockierenden UX-Follow-ups. Es wurden keine Backendlogik, keine Migration, keine PDF-/OCR-Logik, kein KI-Mapping und keine automatische Analyse eingefuehrt oder vorausgesetzt.

### 10.1 `request_item`-Import

Testdatei: `c17-request-items-test.csv`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Upload | bestanden | ImportJob wurde erfolgreich angelegt |
| Parse | bestanden | Rohdaten wurden erzeugt |
| Mapping | bestanden | Mapping wurde erfolgreich angewendet |
| Validate | bestanden | Validierung wurde erfolgreich abgeschlossen |
| Create Targets | bestanden | Zielobjekte wurden erzeugt |
| Job-Status | bestanden | Status danach: `completed` |
| ImportRows | bestanden | Rows zeigen `validation_status=imported`, `target_entity=request_item` und `target_record_id` |
| Zielreferenz-Link | bestanden | `target_record_id` ist klickbar und fuehrt auf `/request-items/{id}` |

Beispiel-Link aus dem Test: `/request-items/92ddf582-1fc5-47d6-8f36-f5f13ee2279a`

### 10.2 `procurement_history_item`-Import

Testdatei: `c15-mapping-smoke.csv`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Create Targets | bestanden | Zielobjekte wurden erzeugt |
| Job-Status | bestanden | Status danach: `completed` |
| Row-Zaehler | bestanden | Total Rows: 2, Processed Rows: 2, Valid Rows: 2, Error Rows: 0 |
| ImportRows | bestanden | Rows zeigen `target_entity=procurement_history_item` und `target_record_id` |
| Zielreferenz ohne Detailroute | bestanden | `target_record_id` ist bewusst nicht klickbar; es wird kein kaputter Link auf eine nicht vorhandene Detailroute erzeugt |

### 10.3 Nicht-blockierende UX-Follow-ups

Diese Punkte blockieren C17 nicht und bleiben Folgearbeiten:

- Die ImportJob-Liste sollte nach `updated_at DESC` sortieren, damit zuletzt angelegte oder bearbeitete Jobs oben stehen.
- Der Hinweis im Abschnitt `Zielobjekte erzeugen` ist bei `completed` missverstaendlich; besser waere ein Hinweis, dass Zielobjekte bereits erzeugt wurden und die Zielreferenzen in den ImportRows sichtbar sind.
- Die ImportJob-Detailseite sollte spaeter als klarer Stepper-Flow geglaettet werden.

## 11. D4-Preparation-UX-Smoke-Test-Plan

Dieser kompakte Smoke-Test dokumentiert den aktuellen D4-Zwischenstand nach D4.1 bis D4.3. Geprueft wird der bestehende Flow:

`Project Detail -> Preparation Gaps Card -> Strategie vorbereiten -> Strategy Empty State -> Strategie manuell anlegen`

Der Test fuehrt keine neuen Produktfunktionen ein. Nicht Bestandteil sind automatische Strategieerzeugung, KI-Analyse, Supplier Scoring, Preparation Score, RAG, neue Datenmodelle, neue APIs, Migrationen, Seed-Aenderungen, Env-/Secret-Werte oder ein Staging-Deployment.

Voraussetzung:

- Eine lokale oder bewusst genutzte externe Testumgebung ist erreichbar.
- Ein Demo-Projekt mit ID `<demo-project-id>` ist bekannt.
- Fuer den Empty-State-Test sollte das Projekt noch keine Strategie besitzen.
- Falls die manuelle Strategieanlage getestet wird, darf die Testumgebung bewusst veraendert werden.

### 11.1 Demo-Projekt oeffnen

Route: `/projects/<demo-project-id>`

Erwartung:

- Die Project-Detailseite rendert ohne Crash.
- Die Preparation Gaps Card ist sichtbar.
- Bedarfskontext, Lieferantenprofil und Supplier Context sind als vorhanden erkennbar, sofern Demo-Daten vorhanden sind.
- Strategie ist als offen eingeordnet, sofern noch keine Strategie angelegt wurde.
- Der naechste sinnvolle Schritt verweist auf Strategiearbeit.
- Supplier Context zeigt weiterhin den Demo-Lieferanten.

### 11.2 Strategy Entry oeffnen

Route: `/strategy?projectId=<demo-project-id>`

Erwartung:

- Die Strategy-Seite rendert ohne Crash.
- Bei einem Projekt ohne Strategie erscheint ein ruhiger projektbezogener Empty State.
- Es wird keine Strategie automatisch erzeugt.
- Die manuelle Anlageoption ist sichtbar.
- ZOPA, BATNA, Argumente und Konzessionen werden als nachgelagerte Schritte eingeordnet.

### 11.3 Strategie manuell anlegen

Diesen Schritt nur ausfuehren, wenn die Testumgebung bewusst fuer schreibende Tests genutzt wird.

Erwartung:

- Die Strategie wird gespeichert.
- `/strategy?projectId=<demo-project-id>` zeigt danach keinen Empty State mehr.
- `/projects/<demo-project-id>` beziehungsweise die Preparation Gaps Card erkennt Strategie als vorhanden.
- Fehlende Strategiebausteine werden als naechster sinnvoller Schritt priorisiert, falls ZOPA, BATNA, Argumente oder Konzessionen noch fehlen.

### 11.4 Allgemeiner Strategy Entry

Route: `/strategy`

Erwartung:

- Die allgemeine Strategieansicht funktioniert weiterhin.
- Ohne `projectId` erscheint kein projektbezogener Empty State.

### 11.5 Mobile Spotcheck

Routen:

- `/projects/<demo-project-id>`
- `/strategy?projectId=<demo-project-id>`

Erwartung:

- Keine horizontale Ueberbreite.
- Preparation Gaps Card ist lesbar.
- Strategy Empty State ist lesbar.
- Buttons und Links sind bedienbar.

### 11.6 Offene Nicht-Blocker

- Issue #55 bleibt als spaetere PDF-/Upload-/Parsing-Strecke offen und blockiert den D4-Preparation-UX-Zwischenstand nicht.
- Issue #113 bleibt als Next/PostCSS-audit-Finding zur Beobachtung offen und blockiert den D4-Preparation-UX-Zwischenstand nicht.

## 12. D5-Strategy-Guidance-Smoke-Test-Ergebnis

Durchgefuehrt am 2026-06-08 lokal gegen `http://localhost:3000` und `http://localhost:8000` fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`.

Gesamtergebnis: bestanden ohne Blocker. Es wurden keine Produktfunktionen, keine UI-Logik, keine Backendlogik, keine Migration, keine Seed-Daten, keine KI-, Scoring- oder RAG-Logik geaendert oder vorausgesetzt.

### 12.1 Project Detail

Route: `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Project-Detailseite rendert | bestanden | Seite zeigt `Verhandlung: Praezisions-Servoantrieb RX-42` |
| Preparation Gaps Card sichtbar | bestanden | Abschnitt `Vorbereitungsluecken` sichtbar |
| Strategy-Status plausibel | bestanden | Strategie und Strategiebausteine werden als vorhanden angezeigt; Simulation und Trainerreview bleiben offen |
| Strategy-Einstieg funktioniert | bestanden | Link `Strategie oeffnen` fuehrt zu `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33` |

### 12.2 Strategy mit Projektkontext

Route: `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Strategy-Seite rendert | bestanden | Seite zeigt `Strategie bauen` mit Projektkontext |
| Strategy-Kopf sichtbar | bestanden | Bestehende Strategie ist vorhanden; Formular `Strategie-Kopf` wird angezeigt |
| Building-Blocks-Guidance sichtbar | bestanden | Abschnitt `Strategiebausteine vorbereiten` sichtbar |
| ZOPA fachlich eingeordnet | bestanden | ZOPA wird als Ueberschneidung der Grenzen beschrieben; ein ZOPA-Baustein ist vorhanden |
| BATNA fachlich eingeordnet | bestanden | BATNA bleibt als beste Alternative beschrieben und aktuell offen |
| WAP fachlich eingeordnet | bestanden | WAP / Walk-away Point wird als Abbruchgrenze erklaert |
| WAP nicht mit Konzessionen verwechselt | bestanden | Konzessionen werden als geplante Tauschobjekte oder Zugestaendnisse abgegrenzt |
| Argumente fachlich eingeordnet | bestanden | Argumente werden als Claims und Belege beschrieben |
| Konzessionen fachlich eingeordnet | bestanden | Konzessionen werden als Tauschobjekte vorbereitet |
| Keine automatische WAP-Berechnung | bestanden | Seite benennt WAP als manuell zu pflegende Grenze |
| Keine automatische Baustein-Erzeugung | bestanden | Guidance sagt ausdruecklich, dass nichts automatisch erzeugt wird |

### 12.3 Success Guidance

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Projektbezogene Strategieanlage | nicht relevant | Fuer das Demo-Projekt ist bereits eine Strategie vorhanden; es wurde bewusst keine zweite Strategie angelegt |
| D5.1-Abdeckung | bestanden | D5.1 ist ueber den vorhandenen Stand und frueheren Test abgedeckt; der Rueckweg `Zum Projekt` ist sichtbar |
| Rueckweg zum Projekt | bestanden | `Zum Projekt` fuehrt zurueck zu `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33` |

### 12.4 Sidebar

Gepruefte Menuepunkte: Analyse, Strategie, Briefing, Simulation und Trainerreview.

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Strategie-Beschreibung enthaelt WAP | bestanden | Sidebar zeigt `ZOPA, BATNA, WAP, Konzessionen und Argumente` |
| Active-State lesbar | bestanden | Alle fuenf Workflow-Routen zeigen bei aktiver Route lesbare Icon-, Titel- und Unterzeilenfarben |
| Hover-State lesbar | bestanden | Links verwenden konsistente `hover:border-primary/20`, `hover:bg-muted` und `hover:text-foreground`-States |
| Icon, Titel und Unterzeile lesbar | bestanden | Normal- und Active-State bleiben in der Browserpruefung lesbar |

### 12.5 Allgemeiner Strategy Entry

Route: `/strategy`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Allgemeine Projektauswahl erscheint | bestanden | Seite listet vorhandene Projekte als Strategy-Einstiege |
| Keine projektbezogene Guidance faelschlich sichtbar | bestanden | Ohne `projectId` erscheint keine projektbezogene Building-Blocks-Guidance |
| Navigation funktionsfaehig | bestanden | Sidebar und Projektlinks bleiben erreichbar |

### 12.6 Mobile Spotcheck

Gepruefte Breite: kleine Browserbreite mit effektiv `375px` Dokumentbreite.

| Route | Ergebnis | Notiz |
|---|---|---|
| `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33` | bestanden | Keine horizontale Ueberbreite; relevante Cards bleiben lesbar |
| `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33` | bestanden | Keine horizontale Ueberbreite; Strategy-Guidance bleibt lesbar |
| `/strategy` | bestanden | Keine horizontale Ueberbreite; allgemeine Projektauswahl bleibt nutzbar |

### 12.7 Offene Punkte

- Keine Blocker gefunden.
- Die projektbezogene Success-Guidance wurde nicht durch eine neue zweite Strategie reproduziert, weil fuer das Demo-Projekt bereits eine Strategie vorhanden ist. Das ist ein bewusster Nicht-Blocker fuer D5.5.

## 13. D5.6 Staging-Strategy-Guidance-Smoke-Test-Ergebnis

Durchgefuehrt am 2026-06-08 auf Hostinger-Staging unter `https://negotiation.tools.hawkins-consulting.de` fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`.

Gesamtergebnis: bestanden ohne Blocker. Es wurden keine Produktcodeaenderungen, keine Backendlogik, keine Migration, keine Seed-Aenderung, keine KI-, Scoring- oder RAG-Logik eingefuehrt.

### 13.1 Staging-Update

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Lokaler Ausgangsstand | bestanden | `main` war sauber und entsprach `origin/main` auf `46b045f` |
| Staging-Ausgangsstand | bestanden | `/opt/negotiation-tools` war sauber und stand vor dem Update auf `21028cb` |
| Staging-Zielcommit | bestanden | Fast-Forward auf `46b045f Document D5.5 strategy guidance smoke test` |
| Update-Schritte | bestanden | `git fetch origin`, `git merge --ff-only origin/main` |
| Deployment-Schritt | bestanden | `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build` |
| Migrationen | bestanden | Keine Migration angewendet; `alembic current` meldete `2f4b7c8d9e0a (head)` |
| Seed | bestanden | Kein Seed-Befehl ausgefuehrt |

### 13.2 Health Checks

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Compose-Status | bestanden | `db`, `backend` und `frontend` liefen nach Rebuild/Restart |
| DB-Health | bestanden | `db` war `healthy`; `pg_isready` meldete `accepting connections` |
| Backend Health intern | bestanden | `GET http://127.0.0.1:8000/api/health` antwortete `{"status":"ok","service":"negotiation-tools-api"}` |
| Frontend intern | bestanden | `curl -I http://127.0.0.1:3000` antwortete mit Next.js-Redirect auf `/dashboard` |
| HTTPS extern | bestanden | Unauthentifizierte `curl`-Checks wurden erwartungsgemaess zu Authelia weitergeleitet |
| Browser-Session | bestanden | Authentifizierte Browser-Session erreichte die Staging-App und die geprueften Routen |

### 13.3 Project Detail

Route: `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Project-Detailseite rendert | bestanden | Seite zeigt `Verhandlung: Praezisions-Servoantrieb RX-42` |
| Preparation Gaps Card sichtbar | bestanden | Abschnitt `Vorbereitungsluecken` sichtbar |
| Strategy-Status plausibel | bestanden | Vor Strategieanlage war Strategie `Noch offen`; nach Anlage `Vorhanden`, Strategiebausteine blieben `Noch offen` |
| Strategy-Einstieg funktioniert | bestanden | `Strategie vorbereiten` beziehungsweise `Strategie oeffnen` fuehrt zu `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33` |

### 13.4 Strategy mit Projektkontext

Route: `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Strategy-Seite rendert | bestanden | Seite zeigt `Strategie bauen` mit Projektkontext |
| Initialer Empty State | bestanden | Staging hatte vor D5.6 noch keine Strategie; Empty State betonte manuelle Anlage und keine automatische Erzeugung |
| Projektbezogene Strategieanlage | bestanden | Ein Strategie-Kopf wurde ueber den bestehenden UI-Flow manuell angelegt |
| Success Guidance | bestanden | Nach Anlage erschien `Strategie wurde angelegt` mit Rueckweg zum Projekt |
| Rueckweg zum Projekt | bestanden | `Zum Projekt` fuehrte zurueck zu `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33` |
| Strategy-Kopf sichtbar | bestanden | Nach Anlage wurde das Formular `Strategie-Kopf` angezeigt |
| Building-Blocks-Guidance sichtbar | bestanden | Abschnitt `Strategiebausteine vorbereiten` sichtbar |
| ZOPA fachlich eingeordnet | bestanden | ZOPA wird als Ueberschneidung der Grenzen beschrieben |
| BATNA fachlich eingeordnet | bestanden | BATNA bleibt als beste Alternative beschrieben |
| WAP fachlich eingeordnet | bestanden | WAP / Walk-away Point wird als Abbruchgrenze erklaert |
| WAP nicht mit Konzessionen verwechselt | bestanden | Konzessionen werden als Tauschobjekte/Zugestaendnisse abgegrenzt und nicht als Walk-away Point behandelt |
| Argumente fachlich eingeordnet | bestanden | Argumente werden als Claims und Belege beschrieben |
| Keine automatische WAP-Berechnung | bestanden | `Strategie-Kopf` erklaert, dass der Walk-away Point manuell gepflegt und nicht berechnet wird |
| Keine automatische Baustein-Erzeugung | bestanden | Guidance sagt: `Diese Seite erzeugt nichts automatisch`; ZOPA, BATNA, Argumente und Konzessionen blieben offen |

### 13.5 Sidebar

Gepruefte Menuepunkte: Analyse, Strategie, Briefing, Simulation und Trainerreview.

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Strategie-Beschreibung enthaelt WAP | bestanden | Sidebar zeigt `ZOPA, BATNA, WAP, Konzessionen und Argumente` |
| Active-State lesbar | bestanden | Alle fuenf Workflow-Routen zeigten bei aktiver Route lesbare Icon-, Titel- und Unterzeilenfarben |
| Hover-State lesbar | bestanden | Browser-/DOM-Pruefung bestaetigte die vorhandenen Hover-Klassen fuer lesbare Link-Zustaende |
| Icon, Titel und Unterzeile lesbar | bestanden | Normal- und Active-State blieben lesbar |

### 13.6 Allgemeiner Strategy Entry

Route: `/strategy`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Allgemeine Projektauswahl erscheint | bestanden | Seite zeigt `Waehle ein Projekt` |
| Keine projektbezogene Guidance faelschlich sichtbar | bestanden | Ohne `projectId` keine `Strategiebausteine vorbereiten`-Guidance und kein `Strategie-Kopf` |
| Navigation funktionsfaehig | bestanden | Sidebar und Projektlinks blieben erreichbar |

### 13.7 Mobile Spotcheck

Gepruefte Breite: kleine Browserbreite mit effektiv `360px` Dokumentbreite.

| Route | Ergebnis | Notiz |
|---|---|---|
| `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33` | bestanden | Keine horizontale Ueberbreite; Preparation Gaps Card und relevante Cards lesbar |
| `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33` | bestanden | Keine horizontale Ueberbreite; Building-Blocks-Guidance, WAP und Strategy-Kopf lesbar |
| `/strategy` | bestanden | Keine horizontale Ueberbreite; allgemeine Projektauswahl nutzbar |

### 13.8 Offene Punkte

- Keine Blocker gefunden.
- Nicht-Blocker: Staging hatte vor D5.6 noch keine Strategie fuer das Demo-Projekt. Fuer den Success-Guidance-Test wurde deshalb genau ein manueller Strategie-Kopf ueber den bestehenden UI-Flow angelegt.

## 14. D6.2 Lokaler Strategy-Field-Guidance-Smoke-Test

Durchgefuehrt am 2026-06-08 lokal gegen `http://localhost:3000` und `http://localhost:8000` fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`.

Gesamtergebnis: bestanden ohne Blocker. Backend, Frontend und DB liefen per Docker Compose; die DB war `healthy`, der Backend-Healthcheck meldete `{"status":"ok","service":"negotiation-tools-api"}` und das Frontend lief mit `Next.js 16.2.6 (webpack)`. Der synthetische Rheinwerk-Demo-Datensatz wurde idempotent mit `python -m app.seeds.staging_demo --confirm-staging-demo` sichergestellt. Es wurden keine Produktcodeaenderungen, keine Backendlogik, keine Migration, keine neue UI-Funktionalitaet, keine KI-, Scoring- oder RAG-Logik eingefuehrt.

### 14.1 Project Detail und Strategy-Einstieg

Route: `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Project-Detailseite rendert | bestanden | Seite zeigt `Verhandlung: Praezisions-Servoantrieb RX-42` nach kurzem Ladezustand |
| Preparation Gaps Card sichtbar | bestanden | Abschnitt `Vorbereitungsluecken` sichtbar |
| Strategy-Einstieg funktioniert | bestanden | Links `Strategie oeffnen`, `Bausteine ergaenzen` und `Strategie vorbereiten` fuehren zu `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33` |
| Rueckweg vom Strategy-Flow | bestanden | `Zum Projekt` navigiert zurueck auf die Project-Detailroute; nach dem Ladezustand sind Projekt, Preparation Gaps und Strategy-Einstieg sichtbar |

### 14.2 Strategy mit Projektkontext

Route: `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Projektkontext laedt | bestanden | Projekt, Company, Status, Prioritaet, Kategorie, Supplier, Zielregion und Artikel/Service werden angezeigt |
| Strategy-Kopf sichtbar | bestanden | Bestehende aktive Strategie `5be27bf1-4600-4e47-8ff5-f208527fb5d6` wird geladen |
| D5-Guidance sichtbar | bestanden | `Strategiebausteine vorbereiten`, WAP-Abgrenzung und Hinweis auf keine automatische Erzeugung bleiben sichtbar |
| Titel-Pflichtfeld sichtbar | bestanden | `Titel` ist als Pflichtfeld markiert |
| Strategy Objective | bestanden | Placeholder und Hilfetext trennen Erfolgsziel von Abbruchgrenze |
| Zielergebnis und Minimum | bestanden | Placeholder/Hilfetexte unterscheiden realistisches Zielbild, Mindestpaket und WAP |
| WAP / Walk-away Point | bestanden | WAP wird als minimale akzeptable Grenze beschrieben, nicht als BATNA |
| ZOPA-Zusammenfassung | bestanden | ZOPA wird als moeglicher Einigungskorridor beschrieben, nicht als BATNA |
| BATNA-Zusammenfassung | bestanden | BATNA wird als externe Alternative beschrieben; WAP leitet ab, wann sie vorzuziehen ist |
| Konzessionsstrategie | bestanden | Placeholder `Wenn wir X geben, erwarten wir Y als Gegenleistung.` fuehrt zu Tauschlogik |
| Argumentationssummary | bestanden | Placeholder fordert fakten-, TCO-, risiko-, qualitaets- oder beziehungsbezogene Argumente mit Belegen |
| Risiken und Notizen | bestanden | Hypothesen und offene Datenpunkte bleiben als Arbeitsnotizen eingeordnet |

### 14.3 Pflichtfeld-, Validierungs- und Save-Verhalten

| Bereich | Ergebnis | Notiz |
|---|---|---|
| Strategy-Kopf speichern | bestanden | D6.2-Smoke-Werte fuer Zielergebnis, Minimum, WAP, ZOPA, BATNA, Konzessionsstrategie und Argumentationssummary wurden ueber den Browser gespeichert und per API wieder ausgelesen |
| ZOPA ohne Dimension | bestanden | Leere Create-Form blieb auf derselben URL; `Dimension` ist `required` und meldete `valueMissing`/Pflichtfeldvalidierung |
| ZOPA mit Dimension | bestanden | `D6.2 Smoke Preis-/Lieferzeitkorridor` wurde ueber den Browser angelegt und erschien anschliessend sichtbar |
| BATNA-Option | bestanden | `D6.2 Smoke Alternativlieferant` wurde angelegt; Titel-Pflichtfeld, Beschreibung und Impact bleiben fachlich auf externe Alternative ausgerichtet |
| Konzession | bestanden | `D6.2 Smoke Forecast gegen Lieferprioritaet` wurde angelegt; `Wir geben / ermoeglichen` und `Nur wenn die Gegenseite liefert` bilden konditionierte Tauschlogik ab |
| Argumentationslinie | bestanden | `D6.2 Smoke TCO-Risikoargument` wurde angelegt; Claim und Evidence bleiben belegorientiert |
| Server-/Frontend-Logs | bestanden | POSTs fuer Strategy, ZOPA, BATNA, Konzession und Argumentation liefen mit Redirect/201-Erfolg; keine Browser-Console-Errors beobachtet |

### 14.4 Allgemeiner Strategy Entry

Route: `/strategy`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Allgemeine Projektauswahl erscheint | bestanden | Seite zeigt `Waehle ein Projekt` und das Demo-Projekt |
| Keine projektbezogene Guidance faelschlich sichtbar | bestanden | Ohne `projectId` erscheinen weder `Strategiebausteine vorbereiten` noch `Strategie-Kopf` |
| Navigation funktionsfaehig | bestanden | Sidebar und Projektlinks bleiben erreichbar |

### 14.5 Mobile Spotcheck

Gepruefte Breite: `360px`.

| Route | Ergebnis | Notiz |
|---|---|---|
| `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33` | bestanden | `documentElement.scrollWidth` blieb kleiner als `innerWidth`; Strategy-Kopf lesbar |
| `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33` | bestanden | Nach kurzem Ladezustand Projekt, Preparation Gaps und Strategy-Einstieg sichtbar; keine horizontale Ueberbreite beobachtet |

### 14.6 Offene Punkte

- Keine Blocker gefunden.
- Die lokale synthetische Demo-DB enthaelt nun klar markierte `D6.2 Smoke`-Werte und Bausteine. Das ist fuer den lokalen Browser-Smoke-Test bewusst in Kauf genommen und betrifft keine produktiven Daten.

## 15. D6.3 Staging-Strategy-Field-Guidance-Smoke-Test

Durchgefuehrt am 2026-06-08 auf Hostinger-Staging unter `https://negotiation.tools.hawkins-consulting.de` fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`.

Gesamtergebnis: bestanden ohne Blocker. Staging wurde auf `59e293d Document D6.2 strategy field smoke test` aktualisiert. Es wurden keine Produktcodeaenderungen, keine Backendlogik, keine Migration, keine Seed-Aenderung, keine neue UI-Funktionalitaet, keine KI-, Scoring- oder RAG-Logik eingefuehrt.

### 15.1 Repository- und Staging-Update

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Lokaler Ausgangsstand | bestanden | `main`, `origin/main` und `HEAD` waren sauber und identisch auf `59e293d`; D6.1 `dd24e95` und D6.2 `59e293d` waren enthalten |
| Offene Issues / PRs | bestanden | Offen: #142 als aktueller Scope, #113 und #55 als Nicht-Blocker; offene PRs: 0 |
| D6.2-Commit/Push | bestanden | D6.2 war bereits committed und auf `origin/main`; kein Nachcommit erforderlich |
| Staging-Ausgangsstand | bestanden | `/opt/negotiation-tools` stand vor dem Update sauber auf `46b045f` |
| Staging-Zielcommit | bestanden | Fast-Forward auf `59e293d Document D6.2 strategy field smoke test` |
| Update-Schritte | bestanden | `git fetch origin`, `git merge --ff-only origin/main` |
| Deployment-Schritt | bestanden | `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build` |
| Migrationen | bestanden | Keine Migration angewendet; `alembic current` meldete `2f4b7c8d9e0a (head)` |
| Seed | bestanden | Kein Seed-Befehl ausgefuehrt |

### 15.2 Health Checks

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Compose-Status | bestanden | `db`, `backend` und `frontend` liefen nach Rebuild/Restart |
| DB-Health | bestanden | `db` war `healthy`; `pg_isready` meldete `accepting connections` |
| Backend Health intern | bestanden | `GET http://127.0.0.1:8000/api/health` antwortete `{"status":"ok","service":"negotiation-tools-api"}` |
| Frontend intern | bestanden | `curl -I http://127.0.0.1:3000/dashboard` antwortete `HTTP/1.1 200 OK` |
| Alembic current | bestanden | `2f4b7c8d9e0a (head)` |
| HTTPS extern | bestanden | Unauthentifizierte `curl`-Checks wurden erwartungsgemaess zu Authelia weitergeleitet |
| Browser-Session | bestanden | Authentifizierte Browser-Session erreichte die Staging-App und die geprueften Routen |

### 15.3 Project Detail und Strategy-Einstieg

Route: `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Project-Detailseite rendert | bestanden | Seite zeigt `Verhandlung: Praezisions-Servoantrieb RX-42` |
| Preparation Gaps Card sichtbar | bestanden | `Vorbereitungsluecken` und `Strategie-Snapshot` sichtbar |
| Strategy-Einstiege sichtbar | bestanden | `Strategie oeffnen`, `Bausteine ergaenzen` und `Strategie vorbereiten` verweisen auf `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33` |
| Rueckweg aus Strategy | bestanden | Auf der Strategy-Seite ist `Zum Projekt` sichtbar und verlinkt zur Project-Detailroute |

### 15.4 Strategy Field Guidance mit Projektkontext

Route: `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Strategy-Seite rendert | bestanden | `Strategie bauen`, Projektkontext und `Strategie-Kopf` sichtbar |
| D5-Guidance bleibt sichtbar | bestanden | `Strategiebausteine vorbereiten` und keine automatische Baustein-Erzeugung sichtbar |
| Strategy Objective | bestanden | Hilfetext trennt Erfolgsziel von Abbruchgrenze |
| Zielergebnis und Minimum | bestanden | Hilfetexte trennen realistisches Zielbild, Mindestpaket und WAP |
| WAP / Walk-away Point | bestanden | WAP wird als minimale akzeptable Grenze beschrieben, nicht als BATNA |
| ZOPA-Zusammenfassung | bestanden | ZOPA wird als moeglicher Einigungskorridor beschrieben, nicht als BATNA |
| BATNA-Zusammenfassung | bestanden | BATNA wird als externe Alternative beschrieben; WAP leitet ab, wann sie vorzuziehen ist |
| Konzessionsstrategie | bestanden | Placeholder fuehrt zu konditionierter Tauschlogik: `Wenn wir X geben, erwarten wir Y als Gegenleistung.` |
| Argumentationssummary | bestanden | Placeholder fuehrt zu fakten-, TCO-, risiko-, qualitaets- oder beziehungsbezogenen Argumenten mit Belegen |
| Risiken und Notizen | bestanden | Hypothesen und offene Datenpunkte bleiben als Arbeitsnotizen eingeordnet |

### 15.5 Strategy-Bausteine, Pflichtfelder und Save-Verhalten

| Bereich | Ergebnis | Notiz |
|---|---|---|
| ZOPA | bestanden | Bereich `ZOPA-Dimensionen` sichtbar; `dimension` ist als `required` gesetzt |
| ZOPA-Pflichtanker | bestanden | Leere `dimension` meldete im Browser `valueMissing`; es wurde kein leerer ZOPA-Baustein angelegt |
| BATNA | bestanden | Bereich `BATNA-Optionen` sichtbar; Pflichtfeld `title` und Placeholder zu externer Alternative/Impact sichtbar |
| WAP | bestanden | WAP bleibt im Strategy-Kopf und in der Guidance als manuelle Grenze sichtbar |
| Konzessionen | bestanden | Bereich `Konzessionen als Tauschobjekte` sichtbar; Hilfetexte fuer `Wir geben / ermoeglichen` und erwartete Gegenleistung sichtbar |
| Argumente | bestanden | Bereich `Argumentationslinien` sichtbar; Claim- und Evidence-Placeholder sichtbar |
| Save-Verhalten | bestanden | Unveraenderter Save des Strategy-Kopfs blieb ohne sichtbaren Fehler auf derselben Strategy-Route |
| Browser-Console | bestanden | Keine Console-Errors beobachtet |

### 15.6 Allgemeiner Strategy Entry

Route: `/strategy`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Allgemeine Projektauswahl erscheint | bestanden | Seite zeigt vorhandene Projekte als Strategy-Einstiege |
| Demo-Projekt sichtbar | bestanden | `Verhandlung: Praezisions-Servoantrieb RX-42` ist als Einstieg vorhanden |
| Keine projektbezogene Guidance faelschlich sichtbar | bestanden | Ohne `projectId` erscheint kein `Strategie-Kopf` und keine projektbezogene Building-Blocks-Guidance |
| Navigation funktionsfaehig | bestanden | Sidebar und Projektlinks bleiben erreichbar |

### 15.7 Mobile Spotcheck

Gepruefte Breite: `390px` Browserbreite mit effektiv `375px` Dokumentbreite.

| Route | Ergebnis | Notiz |
|---|---|---|
| `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33` | bestanden | Kein horizontaler Overflow; Strategy-Kopf, ZOPA, BATNA, Konzessionen und Argumentationslinien bleiben sichtbar |

### 15.8 Offene Punkte

- Keine Blocker gefunden.
- Success Guidance wurde nicht erneut durch eine neue Strategieanlage reproduziert, weil auf Staging bereits die D5.6-Strategie fuer das Demo-Projekt existiert. Der Rueckweg `Zum Projekt` wurde sichtbar geprueft.

## 16. D7.1 Lokaler Strategy-Readiness-Smoke-Test

Durchgefuehrt am 2026-06-08 lokal gegen `http://localhost:3000` fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`.

Gesamtergebnis: bestanden ohne Blocker. Die Pruefung nutzte den bereits laufenden lokalen Docker-Stack auf Port `3000` und `8000`. Es wurden keine Daten geaendert, keine Strategie und keine Bausteine angelegt, keine Backendlogik, keine Migration, keine neue Persistenz, keine KI-, Scoring-, Simulations- oder RAG-Logik eingefuehrt.

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| `/strategy?projectId=...` rendert | bestanden | `Strategie bauen` und Projektkontext sichtbar |
| Completion-/Readiness-Box sichtbar | bestanden | Box `Completion / Readiness` sichtbar |
| Readiness-Status sichtbar | bestanden | Fuer den lokalen Demo-Datensatz: `Bereit fuer Briefing / Simulation` |
| Bausteine sichtbar | bestanden | Strategy Objectives, ZOPA, BATNA, WAP / Walk-away Point, Konzessionen und Argumente jeweils als `vorhanden` angezeigt |
| Positive Hinweise sichtbar | bestanden | Vorhandene Ziele, Einigungskorridor, externe Alternative, Walk-away-Grenze, Tauschlogik und Gespraechslogik wurden als Anker angezeigt |
| Warnhinweise plausibel | bestanden | Fuer den vollstaendigen Demo-Datensatz keine fachlichen Warnhinweise; Box weist aus, dass keine Warnhinweise aus den aktuellen Bausteinen entstehen |
| `/strategy` ohne `projectId` | bestanden | Allgemeine Projektauswahl sichtbar; keine projektbezogene `Completion / Readiness`-Box sichtbar |
| Desktop-Layout | bestanden | Kein horizontaler Overflow bei normalem Browser-Viewport |
| Mobile Spotcheck | bestanden | Bei `390px` Breite bleibt `Completion / Readiness` sichtbar; kein horizontaler Overflow |
| Browser-Console | bestanden | Keine Console-Errors beobachtet |

## 17. D7.2 Lokaler Browser-Smoke-Test fuer Strategy Readiness Guidance

Durchgefuehrt am 2026-06-08 lokal gegen `http://localhost:3000` mit laufendem Docker-Stack:

- DB: `negotiation-tools-db`, healthy, Host-Port `5433`
- Backend: `negotiation-tools-backend`, Port `8000`, `/api/health` mit `200 OK`
- Frontend: `negotiation-tools-frontend`, Port `3000`, `/strategy` mit `200 OK`

Gepruefter Repository-Stand:

- Branch: `main`
- Working Tree vor Beginn: sauber
- HEAD: `26d7414 Add strategy readiness guidance`
- D7.1 ist damit committed.
- Offene Issues vor Beginn: `#144`, `#113`, `#55`
- Offene PRs vor Beginn: keine

Gesamtergebnis: bestanden ohne Blocker. Fuer die drei Readiness-Zustaende wurden klar markierte lokale Smoke-Testdatensaetze in der laufenden Entwicklungsdatenbank angelegt. Es wurden keine Produktdateien, keine Backendlogik, keine Migrationen, keine Seed-Dateien, keine KI-, Scoring-, Simulations- oder RAG-Logik geaendert.

### 17.1 Testdaten

| Zustand | Project ID | Erwarteter Status |
|---|---|---|
| leer / stark unvollstaendig | `b4298d16-3212-4d97-8fc6-a245dc94fc2f` | `Unvollstaendig` |
| teilweise gefuellt | `7edc2c1b-2c07-4613-b4bb-1c38f085c3c0` | `Grundlage vorhanden` |
| vollstaendig gefuellt | `daaf8090-10d3-4f54-987e-51d1df4e5d2b` | `Bereit fuer Briefing / Simulation` |

### 17.2 Browser-Ergebnis

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| `/strategy` ohne `projectId` | bestanden | Allgemeine Projektauswahl sichtbar; keine projektbezogene `Completion / Readiness`-Box sichtbar |
| Einstieg aus `/strategy` | bestanden | Sichtbarer Klick auf `D7.2 Smoke Partial Readiness 2026-06-08` fuehrte zu `/strategy?projectId=7edc2c1b-2c07-4613-b4bb-1c38f085c3c0` |
| Leerer Zustand | bestanden | Status `Unvollstaendig`; alle Kernbausteine als offen sichtbar |
| Teilzustand | bestanden | Status `Grundlage vorhanden`; Strategy Objectives, ZOPA und Konzessionen als vorhandene Anker sichtbar; BATNA, WAP und Argumente als Luecken sichtbar |
| Vollstaendiger Zustand | bestanden | Status `Bereit fuer Briefing / Simulation`; Strategy Objectives, ZOPA, BATNA, WAP, Konzessionen und Argumente jeweils als vorhanden sichtbar |
| Vorhandene Anker | bestanden | Positive Hinweise zeigen Zielrichtung, Einigungskorridor, externe Alternative, Walk-away-Grenze, Tauschlogik und Gespraechslogik, sofern vorhanden |
| Fehlende Bausteine | bestanden | `Gezielt ergaenzen` zeigt die jeweils offenen Bausteine nachvollziehbar |
| Fachliche Warnhinweise | bestanden | Teilzustand zeigt `ZOPA ist vorhanden, aber keine BATNA dokumentiert`, `WAP fehlt` und `Argumente fehlen` |
| ZOPA-Abgrenzung | bestanden | ZOPA wird als moeglicher Einigungskorridor beziehungsweise Ueberschneidung der Grenzen beschrieben |
| BATNA-Abgrenzung | bestanden | BATNA wird als externe Alternative ausserhalb dieser Verhandlung beschrieben |
| WAP-Abgrenzung | bestanden | WAP wird als Walk-away-Grenze beziehungsweise minimale akzeptable Grenze beschrieben |
| Konzessionslogik | bestanden | Konzessionen werden als Tauschlogik und Gegenleistungen beschrieben, nicht als einseitiges Nachgeben |
| Desktop-Layout | bestanden | Kein horizontaler Overflow bei normalem Browser-Viewport |
| Mobile Spotcheck | bestanden | Bei `390px` Browserbreite / effektiv `375px` Dokumentbreite ist die Readiness-Box sichtbar; kein horizontaler Overflow |
| Browser-Console | bestanden | Keine relevanten Console-Errors oder Warnings beobachtet |
| Framework-Overlay | bestanden | Kein Next.js-/Framework-Error-Overlay sichtbar |

### 17.3 Offene Punkte

- Keine Blocker gefunden.
- Die lokalen D7.2-Smoke-Datensaetze bleiben in der Entwicklungsdatenbank als nachvollziehbare Testdaten stehen.
- Staging-Deployment war ausdruecklich ausserhalb des Scopes.

## 18. D7.3 Staging-Smoke-Test fuer Strategy Readiness Guidance

Durchgefuehrt am 2026-06-09 auf Hostinger-Staging unter `https://negotiation.tools.hawkins-consulting.de` fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`.

Gesamtergebnis: bestanden ohne Blocker. Staging wurde per Fast-Forward von `c195d0c Document D6.3 staging strategy field smoke test` auf `7e80fce Document D7.2 strategy readiness smoke test` aktualisiert. Es wurden keine Produktdateien, keine Backendlogik, keine Migrationen, keine Seed-Dateien, keine KI-, Scoring-, Simulations- oder RAG-Logik geaendert. Fuer die Readiness-Zustaende wurden ausschliesslich klar markierte `D7.3 Smoke`-Werte in vorhandenen Staging-Strategy-Feldern gepflegt.

### 18.1 Repository- und Issue-Status

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Lokaler Branch | bestanden | `main` |
| Lokaler Working Tree vor Beginn | bestanden | sauber |
| Lokaler HEAD / `origin/main` | bestanden | beide auf `7e80fce10c16bfebf43013d0e22bc2948ca146ca` |
| `git log --oneline -5` | bestanden | `7e80fce`, `26d7414`, `c195d0c`, `59e293d`, `dd24e95` |
| Offene Issues / PRs | bestanden | Offen: #145 als aktueller Scope, #113 Next/PostCSS-Beobachtung, #55 PDF-Konzept; offene PRs: 0 |
| Staging-Ausgangsstand | bestanden | `/opt/negotiation-tools` stand sauber auf `c195d0c`; serverseitiges `origin/main` war ebenfalls noch auf `c195d0c` |
| Staging-Update | bestanden | `git fetch origin main`, `git merge --ff-only origin/main`; Zielstand `7e80fce` |
| Deployment | bestanden | `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build`; Frontend-Build erfolgreich |
| Seed | bestanden | Kein Seed-Befehl ausgefuehrt; keine Seed-Datei geaendert |

### 18.2 Health Checks

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Compose-Status | bestanden | `db`, `backend` und `frontend` liefen nach Rebuild/Restart |
| DB-Health | bestanden | `db` war `healthy`; `pg_isready` meldete `accepting connections` |
| Backend Health intern | bestanden | `GET http://127.0.0.1:8000/api/health` antwortete `{"status":"ok","service":"negotiation-tools-api"}` |
| Frontend intern | bestanden | `GET http://127.0.0.1:3000/strategy` und `/strategy?projectId=...` antworteten jeweils `200` |
| Alembic current | bestanden | `2f4b7c8d9e0a (head)`; bekannter Head ist weiterhin aktuell |
| Browser-Session | bestanden | Authentifizierte Browser-Session erreichte die Staging-App und die geprueften Strategy-Routen |

### 18.3 Browser-Testdaten

Die bestehende Staging-Demo-Strategie `f808d4ad-5698-416f-80cb-5754ea9c03f9` wurde fuer den Smoke-Test schrittweise ueber vorhandene Felder in drei Zustaende gebracht:

| Zustand | Gepruefter Inhalt | Erwarteter Status | Ergebnis |
|---|---|---|---|
| leer / stark unvollstaendig | vorhandenes Overall Objective, keine ZOPA-, BATNA-, WAP-, Konzessions- oder Argumentationsdaten | `Unvollstaendig` | bestanden |
| teilweise gefuellt | zusaetzlich `zopa_summary` und `batna_summary`, bewusst noch ohne WAP/Konzessionen/Argumente | `Grundlage vorhanden` | bestanden |
| vollstaendig gefuellt | zusaetzlich Minimum, WAP, Konzessionsstrategie und Argumentationssummary | `Bereit fuer Briefing / Simulation` | bestanden |

### 18.4 Strategy Readiness Guidance

Route: `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33`

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Strategy-Seite rendert | bestanden | `Strategie bauen`, Projektkontext, Building-Blocks-Guidance und `Completion / Readiness` sichtbar |
| Zustand `Unvollstaendig` | bestanden | Objectives als vorhandener Anker sichtbar; ZOPA, BATNA, WAP, Konzessionen und Argumente als offen sichtbar |
| Zustand `Grundlage vorhanden` | bestanden | Objectives, ZOPA und BATNA als vorhandene Anker; WAP, Konzessionen und Argumente bleiben offene Bausteine |
| Zustand `Bereit fuer Briefing / Simulation` | bestanden | Objectives, ZOPA, BATNA, WAP, Konzessionen und Argumente jeweils als vorhanden sichtbar |
| Vorhandene Anker | bestanden | Positive Hinweise zeigen Zielrichtung, Einigungskorridor, externe Alternative, Walk-away-Grenze, Tauschlogik und Gespraechslogik, sobald vorhanden |
| Fehlende Bausteine | bestanden | `Gezielt ergaenzen` listet die jeweils offenen Kernbausteine nachvollziehbar |
| Fachliche Warnhinweise | bestanden | Unvollstaendiger und teilgefuellter Zustand zeigen WAP-, Konzessions- und Argumentationswarnungen; vollstaendiger Zustand zeigt keine Warnhinweise |
| ZOPA/BATNA/WAP-Abgrenzung | bestanden | Guidance trennt ZOPA als Einigungskorridor, BATNA als externe Alternative und WAP als Walk-away-Grenze |
| Konzessionen | bestanden | Konzessionsstrategie wird als Tauschlogik mit Gegenleistung gefuehrt, nicht als einseitiges Nachgeben |
| Keine Nicht-Ziele sichtbar | bestanden | Keine KI-, Score-, Simulations- oder RAG-Funktion in der Readiness-Guidance sichtbar |
| Browser-Console | bestanden | Keine Console-Errors beobachtet |

### 18.5 D6-Feldfuehrung und Save-Verhalten

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Strategy-Kopf-Pflichtfeld | bestanden | `title` ist `required`; sichtbarer Button `Strategie-Kopf speichern` |
| Strategy-Kopf-Placeholder | bestanden | Objective, Zielergebnis, Minimum, WAP, ZOPA, BATNA, Konzessionsstrategie, Argumentationssummary, Risiken und Notizen haben fachliche Placeholder/Hilfen |
| ZOPA-Pflichtanker | bestanden | Neuer ZOPA-Baustein nutzt `dimension` als `required` |
| BATNA-Feldfuehrung | bestanden | BATNA-Formular fuehrt externe Alternative, Umsetzbarkeit, Impact und erforderliche Aktionen |
| Konzessions-Feldfuehrung | bestanden | Placeholder fuehren `Wir geben / ermoeglichen` und erwartete Gegenleistung getrennt |
| Argumentations-Feldfuehrung | bestanden | Claim- und Evidence-Placeholder fuehren fakten- und belegorientierte Gespraechsfuehrung |
| Save-Verhalten | bestanden | Strategie-Kopf wurde mit `D7.3 Smoke: Save-Verhalten am 2026-06-09 geprueft.` gespeichert; Redirect blieb auf `/strategy?projectId=...`, Readiness blieb `Bereit fuer Briefing / Simulation` |

### 18.6 Allgemeiner Strategy Entry und Mobile Spotcheck

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| `/strategy` ohne `projectId` | bestanden | Allgemeine Projektauswahl sichtbar; Demo-Projekt als Einstieg vorhanden; keine projektbezogene Readiness-Box sichtbar |
| Mobile Breite | bestanden | Bei `390px` Browserbreite blieb `Completion / Readiness` sichtbar; `documentElement.scrollWidth` 375, kein horizontaler Overflow |
| Console nach Mobile-Check | bestanden | Keine Console-Errors beobachtet |

### 18.7 Offene Punkte

- Keine Blocker gefunden.
- Die Staging-Demo-Strategie enthaelt nun klar markierte `D7.3 Smoke`-Werte fuer ZOPA, BATNA, WAP, Konzessionsstrategie, Argumentationssummary und den Save-Verhalten-Marker.
- Die Building-Blocks-Guidance zaehlt weiterhin nur konkrete ZOPA-/BATNA-/Konzessions-/Argumentationslisten. Das ist bestehendes Verhalten und kein D7.3-Blocker, weil die D7.1-Readiness-Guidance bewusst auch Strategy-Summary-Felder beruecksichtigt.

## 19. D8.2 Lokaler Browser-Smoke-Test fuer Strategy Next-Action Guidance

Durchgefuehrt am 2026-06-09 lokal gegen `http://localhost:3000` mit laufendem Docker-Stack:

- DB: `negotiation-tools-db`, healthy, Host-Port `5433`
- Backend: `negotiation-tools-backend`, Port `8000`, `/api/health` mit `{"status":"ok","service":"negotiation-tools-api"}`
- Frontend: `negotiation-tools-frontend`, Port `3000`, `/strategy` mit `200 OK`

Gesamtergebnis: bestanden ohne Blocker. Es wurden vorhandene lokale D7.2-Smoke-Testdaten genutzt und keine Daten angelegt oder geaendert. Es wurden keine Produktdateien, keine Backendlogik, keine Migrationen, keine Seed-Dateien, keine KI-, Scoring-, Simulations-, Trainerreview- oder RAG-Logik geaendert.

### 19.1 Testdaten

| Zustand | Project ID | Erwarteter Status |
|---|---|---|
| leer / stark unvollstaendig | `b4298d16-3212-4d97-8fc6-a245dc94fc2f` | `Unvollstaendig` |
| teilweise gefuellt | `7edc2c1b-2c07-4613-b4bb-1c38f085c3c0` | `Grundlage vorhanden` |
| vollstaendig gefuellt | `daaf8090-10d3-4f54-987e-51d1df4e5d2b` | `Bereit fuer Briefing / Simulation` |

### 19.2 Browser-Ergebnis

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| `/strategy` ohne `projectId` | bestanden | Allgemeine Projektauswahl sichtbar; keine projektbezogene Next-Action-Guidance sichtbar |
| `/strategy?projectId=...` mit `Unvollstaendig` | bestanden | Status sichtbar; `Naechste Workflow-Aktion`, `Briefing vorbereiten`, `Simulation vorbereiten` und `Trainerreview vorbereiten` nicht sichtbar |
| `/strategy?projectId=...` mit `Grundlage vorhanden` | bestanden | Status sichtbar; Next-Action-Guidance nicht sichtbar |
| `/strategy?projectId=...` mit `Bereit fuer Briefing / Simulation` | bestanden | Status sichtbar; Next-Action-Guidance mit `Briefing vorbereiten`, `Simulation vorbereiten` und `Trainerreview vorbereiten` sichtbar |
| Briefing-Grenze | bestanden | `Briefing vorbereiten` wird als `Coming next` erklaert und hat keinen projektbezogenen Briefing-Link; damit wird die generische `/briefing`-Placeholder-Route nicht als fertige projektbezogene Funktion suggeriert |
| Simulation-Link | bestanden | Next-Action-Link nutzt die stabile projektbezogene Route `/simulation?projectId=daaf8090-10d3-4f54-987e-51d1df4e5d2b` und beschreibt Szenario-Konfiguration als Vorbereitung, nicht als produktive Simulation |
| Trainerreview-Link | bestanden | Next-Action-Link nutzt die stabile projektbezogene Route `/trainer-review?projectId=daaf8090-10d3-4f54-987e-51d1df4e5d2b`; Zielroute rendert `Trainerreview`, verweist ohne Szenario auf die Simulation-Konfiguration und bietet den Ruecklink zur projektbezogenen Simulation |
| D6-/D7-Feldfuehrung | bestanden | Strategy-Kopf, ZOPA, BATNA, WAP, Konzessionen, Argumente, Readiness-Box, Placeholder/Hilfen und Save-Controls blieben sichtbar und fachlich unveraendert |
| Mobile Spotcheck | bestanden | Bei `390px` Breite bleiben Status `Bereit fuer Briefing / Simulation` und Next-Action-Guidance vorhanden; kein horizontaler Overflow und keine Elemente ausserhalb des Viewports beobachtet |
| Browser-Console | bestanden | Keine relevanten Console-Errors oder Warnings beobachtet |
| Framework-Overlay | bestanden | Kein Next.js-/Framework-Error-Overlay sichtbar |

### 19.3 Offene Punkte

- Keine Blocker gefunden.
- Der In-App-Browser-Klick auf den eindeutigen Next-Action-Link `Review-Bereich pruefen` blieb in der Adapter-Interaktion auf derselben URL; der Link-Href wurde im DOM eindeutig verifiziert und die Zielroute wurde anschliessend direkt browserseitig erfolgreich geprueft.
- Staging-Deployment war ausdruecklich ausserhalb des Scopes.

## 20. D8.3 Staging-Smoke-Test fuer Strategy Next-Action Guidance

Durchgefuehrt am 2026-06-09 auf Hostinger-Staging unter `https://negotiation.tools.hawkins-consulting.de` fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`.

Gesamtergebnis: bestanden mit dokumentierter Einschraenkung fuer die unteren Readiness-Zustaende auf Staging. Staging wurde per Fast-Forward von `7e80fce` auf `2aa47a2` aktualisiert. Es wurden keine Produktdateien, keine Backendlogik, keine Migrationen, keine Seed-Dateien, keine KI-, Scoring-, Simulations-, Trainerreview- oder RAG-Logik geaendert. Die vorhandene Staging-Demo-Strategie wurde am Ende wieder in einen klar markierten vollstaendigen `D8.3 Smoke`-Zustand gebracht.

### 20.1 Deployment und Health Checks

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Staging-Ausgangsstand | bestanden | `/opt/negotiation-tools` stand sauber auf `7e80fce`; nach `git fetch origin` war `origin/main` auf `2aa47a2` |
| Staging-Update | bestanden | `git merge --ff-only origin/main`; Zielstand `2aa47a2` |
| Deployment | bestanden | `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build`; Frontend-Production-Build erfolgreich |
| Compose-Status | bestanden | `db`, `backend` und `frontend` liefen nach Rebuild/Restart |
| DB-Health | bestanden | `db` war `healthy`; `pg_isready` meldete `accepting connections` |
| Backend Health intern | bestanden | `GET http://127.0.0.1:8000/api/health` antwortete `{"status":"ok","service":"negotiation-tools-api"}` |
| Frontend intern | bestanden | `GET http://127.0.0.1:3000` im Frontend-Container erreichbar |
| Alembic current | bestanden | `2f4b7c8d9e0a (head)` |
| Seed / Migration | bestanden | Kein Seed-Befehl und keine Migration ausgefuehrt |

### 20.2 Browser-Ergebnis

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| `/strategy?projectId=...` | bestanden | `Strategie bauen`, Projektkontext, Building-Blocks-Guidance, `Completion / Readiness` und Strategy-Kopf sichtbar |
| Vollstaendiger Readiness-Zustand | bestanden | Status `Bereit fuer Briefing / Simulation` sichtbar |
| Next-Action-Guidance | bestanden | `Naechste Workflow-Aktion` mit `Briefing vorbereiten`, `Simulation vorbereiten` und `Trainerreview vorbereiten` sichtbar |
| Briefing-Grenze | bestanden | `Briefing vorbereiten` ist `Coming next` ohne Link; `/briefing` bleibt eine vorbereitete generische Route und suggeriert keine fertige projektbezogene Funktion |
| Simulation-Link | bestanden | Next-Action-Link nutzt `/simulation?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33`; Zielroute rendert `Szenario konfigurieren` und beschreibt Vorbereitung ohne produktive Simulation |
| Trainerreview-Link | bestanden | Next-Action-Link nutzt `/trainer-review?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33`; Zielroute rendert `Trainerreview` und verweist ohne Szenario auf die Simulation-Konfiguration |
| `/strategy` ohne `projectId` | bestanden | Allgemeine Projektauswahl sichtbar; keine projektbezogene Readiness- oder Next-Action-Guidance sichtbar |
| D6-/D7-Feldfuehrung | bestanden | Pflichtfeld `title`, ZOPA-Dimension als Pflichtanker, Placeholder/Hilfen fuer WAP, ZOPA, BATNA, Konzessionen und Argumente sowie Readiness-Box sichtbar |
| Save-Verhalten | bestanden | Strategy-Kopf speicherte den finalen `D8.3 Smoke`-Zustand; Redirect blieb auf `/strategy?projectId=...` |
| Mobile Spotcheck | bestanden | Bei `390px` Breite / effektiv `375px` Dokumentbreite blieben Readiness und Next-Action-Guidance sichtbar; kein horizontaler Overflow |
| Browser-Console | bestanden | Keine relevanten Console-Errors oder Warnings beobachtet |

### 20.3 Dokumentierte Einschraenkung

Auf Staging existiert aktuell nur eine Strategy (`f808d4ad-5698-416f-80cb-5754ea9c03f9`) fuer das Demo-Projekt. Die unteren Zustaende `Unvollstaendig` und `Grundlage vorhanden` konnten deshalb nicht sauber reproduziert werden, ohne neue Staging-Testdaten oder direkte Datenbankmanipulation einzufuehren. Der bestehende Strategy-Head-Save-Flow persistiert leere Formularwerte nicht als Leerung: `optionalFormString` liefert fuer leere Felder `null`, und der PATCH-Flow laesst vorhandene Werte dadurch bestehen. Diese bestehende Save-Semantik wurde dokumentiert, aber im Rahmen von D8.3 nicht geaendert.

Die Sichtbarkeitslogik der unteren Zustaende bleibt durch den lokalen D8.2-Smoke-Test mit separaten Testdatensaetzen abgedeckt. Auf Staging wurde der vollstaendige Zielzustand einschliesslich Link-/Coming-next-Abgrenzung, Route-Stabilitaet, Mobile und Console erfolgreich geprueft.

### 20.4 Offene Punkte

- Keine Produkt-Blocker gefunden.
- Fuer kuenftige Staging-Smoke-Tests mit mehreren Readiness-Zustaenden waeren getrennte, klar markierte Staging-Teststrategien sinnvoll, statt die eine Demo-Strategie fuer Zustandswechsel zu leeren.

## 21. D9.2 Staging-Smoke-Test fuer Briefing Preparation Entry

Durchgefuehrt am 2026-06-09 auf Hostinger-Staging unter `https://negotiation.tools.hawkins-consulting.de/briefing`.

Gesamtergebnis: bestanden ohne Blocker. Staging wurde per Fast-Forward von `2aa47a2` auf `fd6b145` aktualisiert. Es wurden keine Produktdateien, keine Backendlogik, keine Migrationen, keine Seed-Dateien, keine KI-Briefing-Erzeugung, keine Simulation, keine Trainerreview-Logik, kein Scoring, kein RAG und keine PDF-/Import-Verarbeitung geaendert.

### 21.1 Deployment und Health Checks

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Staging-Ausgangsstand | bestanden | `/opt/negotiation-tools` stand sauber auf `2aa47a2`; nach `git fetch origin` war `origin/main` auf `fd6b145` |
| Staging-Update | bestanden | `git merge --ff-only origin/main`; Zielstand `fd6b145` |
| Deployment | bestanden | `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build`; Frontend-Production-Build erfolgreich |
| Compose-Status | bestanden | `db`, `backend` und `frontend` liefen nach Rebuild/Restart |
| DB-Health | bestanden | `db` war `healthy`; `pg_isready` meldete `accepting connections` |
| Backend Health intern | bestanden | `GET http://127.0.0.1:8000/api/health` antwortete `{"status":"ok","service":"negotiation-tools-api"}` |
| Frontend `/briefing` intern | bestanden | `GET http://127.0.0.1:3000/briefing` antwortete `HTTP/1.1 200 OK` |
| Alembic current | bestanden | `2f4b7c8d9e0a (head)` |
| Seed / Migration | bestanden | Kein Seed-Befehl und keine Migration ausgefuehrt |

### 21.2 Browser-Ergebnis

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| `/briefing` erreichbar | bestanden | Staging-Domain lud `https://negotiation.tools.hawkins-consulting.de/briefing`; H1 `Briefing vorbereiten` sichtbar |
| Desktop-Darstellung | bestanden | Default-Viewport ca. `1265px`; ruhiger Briefing-Preparation-Einstieg sichtbar, kein sichtbarer Fehlerzustand |
| Mobile-Darstellung | bestanden | Mobile-Viewport `390px` beziehungsweise effektiv `375px`; `documentElement.scrollWidth` 375, kein horizontaler Overflow |
| Browser-Console | bestanden | Keine relevanten Console-Errors oder Warnings beobachtet |
| Framework-Overlay | bestanden | Kein Next.js-/Framework-Error-Overlay sichtbar |

### 21.3 Fachliche Abgrenzung

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Briefing Preparation | bestanden | Seite beschreibt Briefing Preparation als vorbereitenden Schritt nach Strategy Readiness |
| Spaetere Briefing-Bausteine | bestanden | Bausteine wie Verhandlungsziel, Interessen, BATNA / WAP / ZOPA, Argumentationslinien, Konzessionslogik, Risiken, Agenda und Trainee-Hinweise sind als Orientierung sichtbar |
| Keine fertige KI-Briefing-Erzeugung | bestanden | Seite formuliert, dass der Einstieg noch keine automatische Briefing-Erzeugung ist und automatische KI-Briefing-Generierung nicht Bestandteil dieses Schritts ist |
| Keine Simulation oder Trainerreview-Funktion | bestanden | Seite erzeugt keine Simulation, startet kein Trainerreview und grenzt produktive Simulation sowie automatisches Trainerreview sichtbar aus |
| Keine Backend-, Persistenz- oder KI-Logik | bestanden | Die Route bleibt ein statischer Vorbereitungseinstieg; keine API-Aktion, keine Persistenzaktion und keine KI-Aktion sichtbar |
| Links / Navigation | bestanden | Sichtbar sind nur die bestehenden App-Shell-Navigationslinks; keine irrefuehrenden Links auf eine fertige projektbezogene Briefing-Folgefunktion |

### 21.4 Offene Punkte

- Keine Blocker gefunden.
- D9.2 war ausschliesslich ein Staging-Smoke- und Dokumentationsschritt; Produktumfang und Staging-Daten blieben unveraendert.

## 22. D10.2-Demo-Flow-Smoke-Test-Ergebnis

Durchgefuehrt am 2026-06-09 lokal gegen `http://localhost:3000` und `http://localhost:8000` fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`.

Gesamtergebnis: bestanden nach kleiner UI-Korrektur ohne weitere Blocker. Es wurden keine Backendlogik, keine Migration, keine KI-, Simulation-, Trainerreview- oder RAG-Logik geaendert.

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| `/getting-started` | bestanden | Seite rendert als Guided Introduction; Briefing Preparation, Simulation Preparation und Trainerreview sind als Folgeschritte sichtbar |
| Navigation / Sidebar | bestanden | Getting Started ist in der Cockpit-Navigation auffindbar; Klick aus `/dashboard` fuehrt zu `/getting-started` |
| `/dashboard` | bestanden | Dashboard rendert mit Workspace-Zaehlern und Screen-Gruppen |
| Demo-Projekt | bestanden | `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33` rendert die Project-Detailseite fuer `Verhandlung: Praezisions-Servoantrieb RX-42` |
| `/strategy?projectId=...` | bestanden | Strategy-Seite rendert im Projektkontext; `Strategy Overview` ist sichtbar |
| `/briefing?projectId=...` | bestanden | Briefing Preparation bleibt erreichbar und ist bewusst als einordnender Vorbereitungsschritt abgegrenzt |
| Browser-Console | bestanden | Keine neuen `error`- oder `warn`-Eintraege auf den geprueften Routen |
| Mobile Breite | bestanden | Nach Korrektur keine horizontale Ueberbreite bei 375px-Testbreite; `scrollWidth` entspricht `clientWidth` |

### 22.1 Gefundener und behobener Blocker

Bei `/strategy?projectId=...` erzeugten die Strategy-Overview-Metriken mobil eine kleine horizontale Ueberbreite. Ursache war die automatische Mindestbreite der Grid-Kacheln bei langen Projekttiteln. Behoben durch `min-w-0` auf der Metrik-Kachel und `break-words` fuer Detailtext in `frontend/app/(workspace)/strategy/page.tsx`.

### 22.2 Offene Punkte

- Keine Blocker offen.

## 23. D10.3 Staging-Update- und Demo-Flow-Smoke-Test

Durchgefuehrt am 2026-06-09 auf Hostinger-Staging unter `https://negotiation.tools.hawkins-consulting.de` fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`.

Gesamtergebnis: bestanden ohne Blocker. Staging wurde per Fast-Forward von `fd6b145` auf `f2f444b` aktualisiert. Der bestehende Staging-Stack wurde neu gebaut und gestartet. Es wurden keine Produktdateien, keine Backendlogik, keine Migrationen, keine Seed-Dateien, keine KI-, Simulations-, Trainerreview- oder RAG-Logik geaendert.

| Pruefpunkt | Ergebnis | Notiz |
|---|---|---|
| Staging-Ausgangsstand | bestanden | `/opt/negotiation-tools` stand sauber auf `fd6b145`; `.env.staging` blieb serverlokal und ungetrackt |
| Staging-Update | bestanden | `git fetch origin`, `git merge --ff-only origin/main`; Zielstand `f2f444b` |
| Stack-Rebuild / Restart | bestanden | `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build`; Frontend-Build erfolgreich, Container neu gestartet |
| Containerstatus | bestanden | `db` healthy, `backend` und `frontend` up; Ports weiter nur auf `127.0.0.1:8000` und `127.0.0.1:3000` gebunden |
| Backend Health | bestanden | Interner Check `http://127.0.0.1:8000/api/health` antwortet mit `{"status":"ok","service":"negotiation-tools-api"}` |
| Frontend Health | bestanden | Interner Check `http://127.0.0.1:3000/getting-started` antwortet mit `200 OK` |
| DB Health | bestanden | `pg_isready` meldet `accepting connections` |
| Alembic Head | bestanden | `alembic current` meldet weiterhin `2f4b7c8d9e0a (head)` |
| `/getting-started` | bestanden | Seite rendert auf Staging mit H1 `Getting Started`; Demo-/Testpfad und Folgeschritte sind sichtbar |
| Navigation / Sidebar | bestanden | Getting Started ist in der Cockpit-Navigation sichtbar; Klick aus `/dashboard` fuehrt zu `/getting-started` |
| `/dashboard` | bestanden | Dashboard rendert mit Workspace-Zaehlern und Navigation |
| Demo-Projekt | bestanden | `/projects/01d9d55b-87c3-5a5a-876a-b55a3ce2db33` rendert `Verhandlung: Praezisions-Servoantrieb RX-42` |
| `/strategy?projectId=...` | bestanden | Strategy-Seite rendert im Projektkontext; `Strategy Overview` ist sichtbar |
| `/briefing?projectId=...` | bestanden | Briefing Preparation bleibt erreichbar und als vorbereitender, noch nicht automatisierter Schritt abgegrenzt |
| Mobile Breite | bestanden | 375px-Spotcheck fuer `/getting-started`, `/dashboard`, Demo-Projekt, `/strategy?projectId=...` und `/briefing?projectId=...`; keine horizontale Ueberbreite (`scrollWidth` entspricht `clientWidth`) |
| Browser-Console | bestanden | Keine `error`- oder `warn`-Eintraege auf den geprueften Routen |

### 23.1 Offene Punkte

- Keine Blocker offen.
- D10.3 war ausschliesslich ein Staging-Update-, Smoke-Test- und Dokumentationsschritt; Produktumfang und Staging-Daten blieben unveraendert.
