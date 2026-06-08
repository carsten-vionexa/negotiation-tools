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
