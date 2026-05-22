# MVP-Abnahme-Checkliste nach Phase B

## 1. Zweck der Phase C0

Phase C0 stabilisiert den nach Phase B erreichten MVP-Stand, bevor Phase C Upload/Import beginnt. Ziel ist keine Feature-Erweiterung, sondern eine nachvollziehbare fachliche, technische und manuelle Abnahme des bestehenden Workflows.

Der pruefbare MVP-Workflow lautet:

`Company -> Profile -> Project -> Knowledge Base -> Analysis -> Strategy -> Simulation -> Trainerreview`

Die Abnahme soll klaeren:

- ob die Kernrouten erreichbar sind,
- ob Stammdaten, Projekt, Datenbasis, Analyse, Strategie, Szenario-Konfiguration und Trainerreview fachlich zusammenhaengen,
- ob Empty States und Error States verstaendlich sind,
- ob technische Mindestpruefungen reproduzierbar bestanden werden,
- welche Funktionen bewusst noch nicht MVP sind.

## 2. Voraussetzungen fuer die manuelle Abnahme

Vor der Abnahme sollte der aktuelle `main`-Stand lokal verfuegbar sein. Die lokale Umgebung sollte gemaess `README.md` gestartet werden koennen.

Erwartete Voraussetzungen:

- `.env` wurde aus `.env.example` erstellt.
- Docker Compose ist verfuegbar.
- Backend, Frontend und Datenbank koennen lokal gestartet werden.
- Das Frontend erreicht das Backend ueber `NEXT_PUBLIC_API_URL` oder den lokalen Default `http://localhost:8000`.
- Datenbankmigrationen sind auf dem aktuellen Stand.
- Fuer einen vollstaendigen Durchlauf existieren Demo- oder Testdaten fuer Company, UserProfile, Projekt, SupplierProfile und RequestItem.

## 3. Technische Vorpruefung

Vor der fachlichen Browser-Abnahme sollte eine technische Mindestpruefung erfolgen.

| Bereich | Pruefschritt | Erwartetes Ergebnis | Status | Notiz |
|---|---|---|---|---|
| Umgebung | `cp .env.example .env`, falls noch nicht vorhanden | `.env` liegt vor | offen |  |
| Start | `docker compose up --build` | Frontend, Backend und DB starten ohne Blocker | offen |  |
| Backend | `http://localhost:8000/api/health` oeffnen | Healthcheck antwortet erfolgreich | offen |  |
| Backend Docs | `http://localhost:8000/docs` oeffnen | OpenAPI Docs sind erreichbar | offen |  |
| Frontend | `http://localhost:3000` oeffnen | App-Shell laedt | offen |  |
| Frontend Lint | im Verzeichnis `frontend`: `npm run lint` | keine Lint-Fehler | offen |  |
| Frontend Typecheck | im Verzeichnis `frontend`: `npm run typecheck` | TypeScript prueft ohne Fehler | offen |  |
| Frontend Build | im Verzeichnis `frontend`: `npm run build` | Build erfolgreich | offen |  |
| Alembic | `alembic upgrade head`, lokal mit passender DB-URL | Migrationen laufen durch | offen |  |
| Alembic Drift | `alembic check`, lokal mit passender DB-URL | keine Model-/DB-Drift | offen |  |
| API-Konfiguration | `NEXT_PUBLIC_API_URL` pruefen | zeigt auf erreichbares Backend | offen |  |

## 4. Datenvoraussetzungen / empfohlene Demo-Daten

Fuer die vollstaendige manuelle Abnahme wird mindestens ein konsistenter Testfall benoetigt.

Empfohlene Demo-Struktur:

- Company: Rheinwerk Robotics GmbH
- UserProfile / Rolle: Markus Schulz, Einkauf / angehender Einkaufsleiter
- SupplierProfile: fiktiver oder vorhandener Lieferant fuer eine kritische Warengruppe
- RequestItem: konkrete Anfrageposition, z. B. Praezisionsgetriebe, Servomotor, Sensorik oder Steuerungselektronik
- NegotiationProject: projektbezogener Verhandlungsfall mit Company, Owner, Supplier und RequestItem
- Knowledge Base: vorhandene Quellen, Claims, Anfragepositionen, Einkaufshistorie oder bewusst leere Datenlage
- Strategy: Strategie-Kopf, ZOPA, BATNA, Konzessionen und Argumentationslinien
- SimulationScenario: vorbereitete Szenario-Konfiguration
- TrainerComment: mindestens ein trainerinterner Kommentar und ein trainee-sichtbarer Lernpunkt

Akzeptiert fuer C0: Daten duerfen manuell ueber vorhandene Screens oder API erzeugt werden. Eine produktive Seed-Daten-Implementierung ist nicht Bestandteil von C0.1.

## 5. Abnahme der zentralen User Journey

### 5.1 Company anlegen / pruefen

| Pruefpunkt | Erwartung | Status | Notiz |
|---|---|---|---|
| `/companies` oeffnet | Company-Liste oder Empty State erscheint | offen |  |
| Company kann angelegt werden | Name und fachliche Basisdaten werden gespeichert | offen |  |
| `/companies/[id]` oeffnet | Company-Detailseite laedt | offen |  |
| Company kann bearbeitet werden | Aenderungen bleiben nach Speichern sichtbar | offen |  |
| Verknuepfte Projekte sichtbar | vorhandene Projekte zur Company werden angezeigt oder korrekt leer dargestellt | offen |  |
| Error State bei Backend-Problem | Fehlermeldung ist verstaendlich | offen |  |

### 5.2 UserProfile / Rollenprofil anlegen / pruefen

| Pruefpunkt | Erwartung | Status | Notiz |
|---|---|---|---|
| `/profiles` oeffnet | Profil-Liste oder Empty State erscheint | offen |  |
| Profil kann angelegt werden | Rolle/Trainee wird mit Company-Bezug gespeichert | offen |  |
| `/profiles/[id]` oeffnet | Profil-Detailseite laedt | offen |  |
| Profil kann bearbeitet werden | Aenderungen bleiben sichtbar | offen |  |
| Owner-Projekte sichtbar | zugeordnete Projekte werden angezeigt oder korrekt leer dargestellt | offen |  |
| Profil bleibt MVP-gerecht | keine Nutzerverwaltung, Rechte-Engine oder Lernhistorie wird suggeriert | offen |  |

### 5.3 NegotiationProject anlegen / pruefen

| Pruefpunkt | Erwartung | Status | Notiz |
|---|---|---|---|
| `/projects` oeffnet | Projektliste oder Empty State erscheint | offen |  |
| Projekt kann angelegt werden | Projekt mit Company, Owner, SupplierProfile und RequestItem kann gespeichert werden | offen |  |
| `/projects/[id]` oeffnet | Projektdetail laedt mit Beziehungen und Bearbeitungsformular | offen |  |
| Projekt kann bearbeitet werden | Status, Prioritaet, Kategorie, Ziel, Kontext und Verknuepfungen bleiben gespeichert | offen |  |
| Workflow-Links vorhanden | Links zu Datenbasis, Analyse, Strategie, Simulation und Trainerreview sind sichtbar | offen |  |
| Fachliche Abgrenzung passt | keine automatische Projektanlage aus Importdaten wird suggeriert | offen |  |

### 5.4 Knowledge Base projektbezogen pruefen

| Pruefpunkt | Erwartung | Status | Notiz |
|---|---|---|---|
| `/knowledge-base` oeffnet | Auswahl-/Uebersichtsansicht erscheint | offen |  |
| `/knowledge-base?projectId=<id>` oeffnet | Projektkontext und abgeleitete Company werden angezeigt | offen |  |
| Quellen sichtbar | vorhandene KnowledgeDocuments erscheinen oder Empty State ist plausibel | offen |  |
| Claims sichtbar | vorhandene KnowledgeClaims erscheinen oder Empty State ist plausibel | offen |  |
| Anfragepositionen sichtbar | RequestItems werden angezeigt oder korrekt leer dargestellt | offen |  |
| Einkaufshistorie sichtbar | ProcurementHistoryItems werden angezeigt oder korrekt leer dargestellt | offen |  |
| Nicht-MVP-Grenze passt | keine produktive Upload-/Import-Engine, kein RAG, kein OCR wird angeboten | offen |  |

### 5.5 Analysis projektbezogen pruefen

| Pruefpunkt | Erwartung | Status | Notiz |
|---|---|---|---|
| `/analysis` oeffnet | Projekt-Auswahl oder Empty State erscheint | offen |  |
| `/analysis?projectId=<id>` oeffnet | Projekt-, Company-, Supplier- und RequestItem-Kontext wird geladen | offen |  |
| Fakten/Claims sichtbar | vorhandene Claims oder Datenpunkte erscheinen nachvollziehbar | offen |  |
| Datenluecken sichtbar | fehlende Daten werden als Luecken, nicht als Fehler, dargestellt | offen |  |
| Risiken/Chancen/offene Fragen sichtbar | Analysebereiche sind fachlich getrennt und lesbar | offen |  |
| Link zur Strategie vorhanden | Wechsel in den Strategie-Builder funktioniert | offen |  |
| Fachliche Abgrenzung passt | keine automatische KI-Wahrheit, kein verbindliches Scoring wird suggeriert | offen |  |

### 5.6 Strategy vorbereiten

| Pruefpunkt | Erwartung | Status | Notiz |
|---|---|---|---|
| `/strategy` oeffnet | Projektauswahl oder Empty State erscheint | offen |  |
| `/strategy?projectId=<id>` oeffnet | Projekt- und Strategiekontext werden geladen | offen |  |
| Strategie-Kopf kann angelegt werden | Titel, Ziel, Status und Notizen werden gespeichert | offen |  |
| Strategie-Kopf kann bearbeitet werden | Ziel, Walk-away Point, ZOPA-/BATNA-Summary, Risikoannahmen und Notizen bleiben gespeichert | offen |  |
| ZOPA-Dimension kann angelegt/bearbeitet werden | manuelle ZOPA-Daten bleiben sichtbar | offen |  |
| BATNA-Option kann angelegt/bearbeitet werden | Alternative wird gespeichert | offen |  |
| Konzession kann angelegt/bearbeitet werden | Geben/Gegenleistung wird als Tauschobjekt sichtbar | offen |  |
| Argumentationslinie kann angelegt/bearbeitet werden | Claim, Evidence, Gegenargument und Reaktion bleiben sichtbar | offen |  |
| Nicht-MVP-Grenze passt | keine automatische ZOPA-Berechnung, BATNA-Bewertung oder KI-Strategie-Generierung | offen |  |

### 5.7 Simulation Scenario konfigurieren

| Pruefpunkt | Erwartung | Status | Notiz |
|---|---|---|---|
| `/simulation` oeffnet | Projektauswahl oder Empty State erscheint | offen |  |
| `/simulation?projectId=<id>` oeffnet | Projekt-, Strategie-, Rollen- und Supplier-Kontext werden geladen | offen |  |
| Szenario kann angelegt werden | Titel, Schwierigkeit, Phase, Sprache, Trainingsziel, Briefing und Erfolgskriterien werden gespeichert | offen |  |
| Szenario kann bearbeitet werden | Aenderungen bleiben sichtbar | offen |  |
| Kultur-/Rollenbriefing bleibt vorsichtig | Hinweise erscheinen als Arbeitshypothesen, nicht als stereotypes Laenderprofil | offen |  |
| Link zum Trainerreview funktioniert | Review kann projekt- oder szenariobezogen geoeffnet werden | offen |  |
| Nicht-MVP-Grenze passt | kein Chat, kein Voice-Modus, keine produktive Simulation, kein Streaming | offen |  |

### 5.8 Trainerreview erfassen

| Pruefpunkt | Erwartung | Status | Notiz |
|---|---|---|---|
| `/trainer-review` oeffnet | Auswahl nach Projekt oder Szenario erscheint | offen |  |
| `/trainer-review?projectId=<id>` oeffnet | Szenarien des Projekts werden angezeigt oder Empty State erscheint | offen |  |
| `/trainer-review?scenarioId=<id>` oeffnet | Szenario-, Projekt- und Strategie-Kontext werden angezeigt | offen |  |
| Trainerkommentar kann angelegt werden | Kommentartext, Typ, Kompetenzbezug, Severity und Sichtbarkeit werden gespeichert | offen |  |
| Sichtbarkeit kann markiert werden | trainerintern vs. trainee-sichtbar wird fachlich markiert | offen |  |
| Lernpunkt / naechster Fokus sichtbar | `learning_point` oder `next_focus` wird im Lernpunktebereich erkannt | offen |  |
| Kommentar kann bearbeitet werden | Aenderungen bleiben sichtbar | offen |  |
| Nicht-MVP-Grenze passt | keine automatische Bewertung, keine Score-Engine, keine Zertifikatslogik | offen |  |

## 6. Browser-Smoke-Test-Uebersicht

| Route | Erwartung | Status | Notiz |
|---|---|---|---|
| `/dashboard` | Dashboard laedt mit Zaehlern oder Empty/Fehlerzustand | offen |  |
| `/companies` | Company-Liste oder Empty State | offen |  |
| `/companies/[id]` | Company-Detail laedt fuer gueltige ID | offen |  |
| `/profiles` | Profil-Liste oder Empty State | offen |  |
| `/profiles/[id]` | Profil-Detail laedt fuer gueltige ID | offen |  |
| `/projects` | Projektliste oder Empty State | offen |  |
| `/projects/[id]` | Projektdetail mit Workflow-Links | offen |  |
| `/knowledge-base` | Datenbasis-Auswahl/Uebersicht | offen |  |
| `/knowledge-base?projectId=<id>` | projektbezogene Datenbasis | offen |  |
| `/analysis` | Projekt-Auswahl oder Empty State | offen |  |
| `/analysis?projectId=<id>` | projektbezogene Analyse | offen |  |
| `/strategy` | Projekt-Auswahl oder Empty State | offen |  |
| `/strategy?projectId=<id>` | Strategie-Builder | offen |  |
| `/simulation` | Projekt-Auswahl oder Empty State | offen |  |
| `/simulation?projectId=<id>` | Szenario-Konfiguration | offen |  |
| `/trainer-review` | Review-Auswahl | offen |  |
| `/trainer-review?projectId=<id>` | Szenario-Auswahl fuer Projekt | offen |  |
| `/trainer-review?scenarioId=<id>` | Kommentar- und Lernpunktansicht | offen |  |

## 7. Technische Checkliste

| Pruefung | Kommando / URL | Erwartung | Status | Notiz |
|---|---|---|---|---|
| Frontend Lint | `cd frontend && npm run lint` | erfolgreich | offen |  |
| Frontend Typecheck | `cd frontend && npm run typecheck` | erfolgreich | offen |  |
| Frontend Build | `cd frontend && npm run build` | erfolgreich | offen |  |
| Backend Start | `docker compose up --build` | Backend startet | offen |  |
| Backend Health | `http://localhost:8000/api/health` | erfolgreich | offen |  |
| Backend Docs | `http://localhost:8000/docs` | erreichbar | offen |  |
| Alembic Upgrade | `alembic upgrade head` mit lokaler DB-URL | erfolgreich | offen |  |
| Alembic Check | `alembic check` mit lokaler DB-URL | keine Drift | offen |  |
| API-Erreichbarkeit | Frontend ruft API erfolgreich auf | Listen und Details laden | offen |  |
| API-Konfiguration | `NEXT_PUBLIC_API_URL` | zeigt auf Backend oder nutzt Default | offen |  |

## 8. Erwartete Empty States

Empty States sind fuer C0 akzeptiert und teilweise gewuenscht. Sie gelten als bestanden, wenn sie verstaendlich erklaeren, welche Daten fehlen oder welcher Schritt zuerst erfolgen muss.

Typische erwartete Empty States:

- keine Companies vorhanden,
- keine Profile vorhanden,
- keine Projekte vorhanden,
- keine KnowledgeDocuments, Claims, Einkaufshistorie oder Anfragepositionen vorhanden,
- keine Strategie fuer ein Projekt vorhanden,
- keine ZOPA-/BATNA-/Konzessions-/Argumentationsbausteine vorhanden,
- kein Szenario fuer ein Projekt vorhanden,
- keine Trainerkommentare vorhanden.

Nicht bestanden ist ein Empty State, wenn er einen technischen Fehler verdeckt oder einen nicht vorhandenen produktiven Upload-/Import-/Simulationsflow suggeriert.

## 9. Erwartete Error States

Error States sind fuer C0 relevant, weil die Frontend-Flows vom Backend abhaengen.

Zu pruefen:

- Backend nicht erreichbar,
- falsche oder fehlende `NEXT_PUBLIC_API_URL`,
- ungueltige ID in Detailroute,
- API antwortet mit Fehlerstatus,
- JSON-Antwort ist nicht auswertbar.

Ein Error State gilt als bestanden, wenn er sichtbar, verstaendlich und nicht irrefuehrend ist. Er muss nicht alle technischen Details anzeigen, sollte aber eine sinnvolle Pruefung nahelegen, z. B. Backend-Erreichbarkeit.

## 10. Bewusste Nicht-MVP-Funktionen

Folgende Funktionen sind ausdruecklich nicht Teil des aktuellen MVP und duerfen in C0.1 nicht implementiert werden:

- produktiver Upload/Import,
- Dateiimport fuer Excel, CSV, PDF oder Markdown,
- Excel-/CSV-Parsing,
- automatische Zielobjekt-Erzeugung aus Importdaten,
- RAG,
- Embeddings,
- OCR,
- automatische Claim-Extraktion,
- produktive Simulation,
- Chat,
- Voice-Modus,
- Streaming,
- automatische Auswertung,
- Score-Engine,
- Zertifikatslogik,
- Lernhistorie,
- Admin-/Rechteverwaltung,
- komplexe Mandanten-/Rollenlogik,
- automatische Angebotsanalyse,
- vollautomatische ZOPA-Berechnung,
- automatische BATNA-Bewertung,
- verbindliche KI-Strategie-Generierung,
- Relationship Memory als eigenes Modul,
- Stakeholder-Graph,
- CRM-/ERP-Integration.

Diese Punkte duerfen in den bestehenden Screens als spaetere Zielbilder oder bewusst ausgeschlossene Funktionen erkennbar sein, aber nicht als aktuelle Produktfunktion erscheinen.

## 11. Abnahmeprotokoll

| Bereich | Ergebnis | Blocker? | Notiz |
|---|---|---|---|
| Technische Vorpruefung | offen | nein |  |
| Company | offen | nein |  |
| Profile | offen | nein |  |
| Project | offen | nein |  |
| Knowledge Base | offen | nein |  |
| Analysis | offen | nein |  |
| Strategy | offen | nein |  |
| Simulation Scenario | offen | nein |  |
| Trainerreview | offen | nein |  |
| Browser-Smoke-Test | offen | nein |  |
| Nicht-MVP-Grenzen | offen | nein |  |

Abnahmeentscheidung:

- [ ] bestanden
- [ ] bestanden mit offenen Punkten
- [ ] nicht bestanden wegen Blockern

Offene Punkte:

- 

Blocker:

- 

Naechste empfohlene Schritte:

- 

## 12. Empfehlungen fuer Folgeissues C0.2 bis C0.x

Empfohlene Folgearbeit nach C0.1:

1. C0.2: Browser-Smoke-Test-Plan fuer alle MVP-Routen dokumentieren.
2. C0.3: End-to-End-Testpfad mit konkretem Rheinwerk-Demo-Fall definieren.
3. C0.4: Technische Verifikations-Checkliste ausbauen.
4. C0.5: Roadmap und Nicht-MVP-Grenzen nach Phase B aktualisieren.
5. C0.6: Frontend-Konsolidierungsplan fuer grosse MVP-Seiten erstellen.

Erst nach erfolgreicher C0-Abnahme sollte Phase C Upload/Import begonnen werden.