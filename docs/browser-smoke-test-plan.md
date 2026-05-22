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
- Analysis-Flow
- Strategy-Flow
- Simulation-Scenario-Flow
- Trainerreview-Flow

Nicht geprueft werden produktive Upload-/Import-Funktionen, RAG, OCR, Voice, Chat, Streaming oder automatische Auswertung, weil diese bewusst nicht Teil des aktuellen MVP sind.

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
| Nicht-MVP-Grenze | keine produktive Upload-/Import-Engine sichtbar | offen |  |
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

### 5.10 `/analysis`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Projektauswahl oder Empty State erscheint | offen |  |
| Projektliste | vorhandene Projekte sind auswaehlbar | offen |  |
| Empty State | Wenn keine Projekte vorhanden sind, wird naechster Schritt verstaendlich beschrieben | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.11 `/analysis?projectId=<existing-project-id>`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Projektkontext laedt | Projekt, Company, Supplier und RequestItem werden angezeigt, soweit vorhanden | offen |  |
| Fakten/Claims | vorhandene Informationen werden sichtbar oder als fehlend markiert | offen |  |
| Datenluecken | Datenluecken werden als Arbeitszustand dargestellt | offen |  |
| Risiken/Chancen/offene Fragen | Analysebereiche sind sichtbar und getrennt | offen |  |
| Zur Datenbasis | Link zu `/knowledge-base?projectId=<id>` funktioniert | offen |  |
| Zur Strategie | Link zu `/strategy?projectId=<id>` funktioniert | offen |  |
| Ungueltige Projekt-ID | verstaendlicher Error State | offen |  |

### 5.12 `/strategy`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Projektauswahl oder Empty State erscheint | offen |  |
| Projektliste | vorhandene Projekte sind auswaehlbar | offen |  |
| Empty State | Wenn keine Projekte vorhanden sind, wird naechster Schritt verstaendlich beschrieben | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.13 `/strategy?projectId=<existing-project-id>`

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

### 5.14 `/simulation`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Projektauswahl oder Empty State erscheint | offen |  |
| Projektliste | vorhandene Projekte sind auswaehlbar | offen |  |
| Nicht-MVP-Grenze | Seite kommuniziert Vorbereitung statt produktiver Simulation | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.15 `/simulation?projectId=<existing-project-id>`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Szenariokontext laedt | Projekt, Company, Supplier, Owner, Strategien und Szenarien werden geladen, soweit vorhanden | offen |  |
| Szenario-Liste | vorhandene Szenarien erscheinen oder Empty State ist plausibel | offen |  |
| Szenarioanlage | Szenario kann mit Titel, Schwierigkeit, Phase, Sprache, Trainingsziel, Briefing und Erfolgskriterien angelegt werden | offen |  |
| Szenariobearbeitung | vorhandenes Szenario kann bearbeitet werden | offen |  |
| Kultur-/Rollenbriefing | Hinweise erscheinen als Arbeitshypothesen, nicht als stereotypes Laenderprofil | offen |  |
| Zum Trainerreview | Link zu `/trainer-review?projectId=<id>` oder Szenario-Review funktioniert | offen |  |
| Nicht-MVP-Grenze | kein Chat, kein Voice, keine produktive Simulation, kein Streaming | offen |  |

### 5.16 `/trainer-review`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Route oeffnet | Auswahl nach Projekten und vorhandenen Szenarien erscheint | offen |  |
| Projektliste | vorhandene Projekte sind sichtbar | offen |  |
| Szenarioliste | vorhandene Szenarien sind sichtbar | offen |  |
| Empty State | fehlende Projekte/Szenarien werden verstaendlich angezeigt | offen |  |
| Nicht-MVP-Grenze | keine automatische Bewertung oder Score-Engine sichtbar | offen |  |
| Error State | API-Fehler wird sichtbar angezeigt | offen |  |

### 5.17 `/trainer-review?projectId=<existing-project-id>`

| Pruefpunkt | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Projektkontext laedt | Projekt und Company werden angezeigt | offen |  |
| Szenarien sichtbar | Szenarien des Projekts werden gelistet oder Empty State fordert Szenarioanlage | offen |  |
| Navigation zur Simulation | Link zu `/simulation?projectId=<id>` funktioniert | offen |  |
| Szenarioauswahl | vorhandenes Szenario fuehrt zu `/trainer-review?scenarioId=<id>` | offen |  |
| Ungueltige Projekt-ID | verstaendlicher Error State | offen |  |

### 5.18 `/trainer-review?scenarioId=<existing-scenario-id>`

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
| Workflow-Kette | Project -> Knowledge Base -> Analysis -> Strategy -> Simulation -> Trainerreview ist klickbar | offen |  |
| Nicht-MVP-Grenzen | keine Upload-/Import-, RAG-, OCR-, Voice-, Chat- oder produktive Simulationsfunktion wird suggeriert | offen |  |

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
- produktiver Upload/Import,
- Excel-/CSV-Parsing,
- RAG,
- OCR,
- Embeddings,
- Chat,
- Voice,
- produktive Simulation,
- automatische Auswertung,
- Score-Engine,
- Zertifikatslogik,
- Frontend-Refactoring.

Diese Punkte bleiben Folge- oder Zielbildthemen und duerfen in diesem Smoke-Test nicht als fehlgeschlagene MVP-Funktion bewertet werden.