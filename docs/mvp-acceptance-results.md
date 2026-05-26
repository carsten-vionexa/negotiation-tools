# MVP-Abnahmetest Ergebnisse

## 1. Pruefuebersicht

- Datum der Pruefung: `2026-05-26`
- Branch: `main`
- Commit: `65fa6d5 Merge pull request #45 from carsten-vionexa/c0-frontend-plan`
- Gesamtergebnis: `bestanden mit offenen Nicht-Blockern`
- Empfehlung: Phase C kann nach Dokumentation und Merge von Issue #46 gestartet werden.

Der MVP-Abnahmetest wurde erfolgreich durchgefuehrt. Die technische Verifikation, der Browser-Smoke-Test und der Rheinwerk-E2E-Testpfad wurden bestanden. Es gibt keine harten Blocker fuer den Start von Phase C. Einige UX-/Fachhinweise und ein technischer Docker-Frontend-Hinweis wurden dokumentiert.

Gepruefter MVP-Workflow:

`Company -> Profile -> Project -> Knowledge Base -> Analysis -> Strategy -> Simulation Scenario -> Trainerreview`

## 2. Repository-Stand

Status: bestanden

Gepruefte Kommandos:

```bash
git branch --show-current
git status
git pull origin main
git log --oneline -5
```

Ergebnis:

- Lokaler Branch ist `main`.
- Lokaler Branch ist mit `origin/main` synchron.
- Working Tree ist sauber.
- Es gibt keine lokalen uncommitted Aenderungen.
- `git pull origin main` meldet `Already up to date.`
- Aktueller Commit:
  - `65fa6d5 Merge pull request #45 from carsten-vionexa/c0-frontend-plan`

Bewertung:

Der lokale Repository-Stand ist fuer den MVP-Abnahmetest geeignet.

## 3. Environment und Docker-Grundlage

Status: bestanden

Gepruefte Kommandos:

```bash
ls -la
test -f .env && echo ".env vorhanden" || echo ".env fehlt"
docker --version
docker compose version
```

Ergebnis:

- `.env` ist vorhanden.
- `docker-compose.yml` ist im Repository-Root vorhanden.
- Backend-, Frontend-, Docs- und Upload-Verzeichnisse sind vorhanden.
- Docker ist installiert und antwortet mit Version `28.0.4`.
- Docker Compose ist installiert und antwortet mit Version `v2.34.0-desktop.1`.

Bewertung:

Die lokale Umgebung ist fuer den weiteren MVP-Abnahmetest vorbereitet.

## 4. Systemstart per Docker Compose

Status: bestanden

Kommando:

```bash
docker compose up --build
```

Ergebnis:

- Backend-Image wurde erfolgreich gebaut.
- Frontend-Image wurde erfolgreich gebaut.
- Datenbankcontainer `negotiation-tools-db` laeuft.
- Backendcontainer `negotiation-tools-backend` wurde gestartet.
- Frontendcontainer `negotiation-tools-frontend` wurde gestartet.
- Backend laeuft ueber Uvicorn auf `http://0.0.0.0:8000`.
- Frontend laeuft ueber Next.js auf `http://localhost:3000`.
- Backend meldet `Application startup complete`.
- Frontend meldet `Ready`.
- Keine Portkonflikte, Tracebacks oder Runtime-Blocker beim Start sichtbar.

Hinweis:

Der Frontend-Build-Kontext war mit ca. `1.08 GB` relativ gross. Das ist kein Blocker fuer die MVP-Abnahme, kann aber spaeter als technischer Optimierungspunkt fuer `.dockerignore` geprueft werden.

Bewertung:

Der vollstaendige lokale Systemstart ist grundsaetzlich bestanden.

## 5. Backend Health und OpenAPI

Status: bestanden

Healthcheck:

```bash
curl http://localhost:8000/api/health
```

Antwort:

```json
{"status":"ok","service":"negotiation-tools-api"}
```

OpenAPI / Swagger UI:

- `http://localhost:8000/docs` wurde im Browser geoeffnet.
- Die Website wird angezeigt.
- Keine Fehler beim Laden der API-Dokumentation gemeldet.

Bewertung:

Backend ist erreichbar. Healthcheck und OpenAPI-Dokumentation funktionieren.

## 6. Frontend-Erreichbarkeit und Diagnose Docker/Turbopack

Status: bestanden mit technischem Hinweis

Gepruefte URLs:

- Docker-Frontend: `http://localhost:3000`
- lokales Frontend: `http://localhost:3001`

### 6.1 Ausgangsbefund Docker-Frontend

Das Docker-Frontend unter `http://localhost:3000` zeigte instabiles Verhalten:

- Die Seite laedt grundsaetzlich.
- Es tritt permanentes Dashboard-Reloading auf.
- Das sichtbare Next.js-/Tab-Icon flackert.
- Die Docker-Frontend-Logs zeigen wiederholte Turbopack-Fatal-Errors.

Log-Fehlermuster:

```text
FATAL: An unexpected Turbopack error occurred
Failed to write app endpoint /(workspace)/dashboard/page
Caused by: Next.js package not found
```

Zusaetzlich wiederholte sich:

```text
GET /dashboard 200 ...
```

Bewertung des Ausgangsbefunds:

Das Docker-Frontend-Dev-Setup ist in dieser lokalen Umgebung instabil. Dies wurde zunaechst als moeglicher Blocker behandelt und anschliessend weiter eingegrenzt.

### 6.2 Diagnose 5C: Lokaler Frontend-Dev-Server ausserhalb von Docker

Status: bestanden / Blocker eingegrenzt

Gegenprobe ausserhalb von Docker:

```bash
cd frontend
npm run dev
```

Ergebnis:

- Port `3000` war durch den Docker-Frontend-Container belegt.
- Next.js startete automatisch auf Port `3001`.
- Ausgabe:
  - `Next.js 16.2.6 (Turbopack)`
  - `Local: http://localhost:3001`
  - `Ready`
- `/` antwortete mit Redirect `307`.
- `/dashboard` antwortete mit `200`.
- Dashboard wurde unter `http://localhost:3001/dashboard` stabil angezeigt.
- Browser-Konsole zeigte keine roten Fehler.
- Sichtbare Console-Hinweise waren nur:
  - React DevTools-Hinweis
  - `[HMR] connected`

Bewertung:

Der urspruengliche Frontend-Blocker betrifft nach aktuellem Stand das Docker-Frontend-Dev-Setup, nicht den Frontend-Code grundsaetzlich. Der lokale Dev-Server ausserhalb von Docker laeuft stabil.

Fuer den weiteren Browser-Smoke-Test und den Rheinwerk-E2E-Testpfad wurde daher bewusst verwendet:

- Frontend: `http://localhost:3001`
- Backend: `http://localhost:8000`
- Datenbank: Docker-Container

Einordnung:

- Kein Blocker fuer die MVP-Abnahme, da lokaler Dev-Server, Production Build, Lint, Typecheck und Browser-Flows erfolgreich sind.
- Separater technischer Verbesserungspunkt:
  - `Docker-Frontend-Dev-Setup mit Next.js/Turbopack stabilisieren`

## 7. Frontend-Technikchecks

Status: bestanden

Kommandos:

```bash
cd frontend
npm run lint
npm run typecheck
npm run build
```

Ergebnis:

- `npm run lint` laeuft ohne Fehlermeldung durch.
- `npm run typecheck` laeuft ohne TypeScript-Fehler durch.
- `npm run build` laeuft erfolgreich durch.
- Next.js-Version im Build: `16.2.6`.
- Der Production Build kompiliert erfolgreich.
- Static/Dynamic Routes werden erzeugt.

Zentrale MVP-Routen sind im Build enthalten:

- `/dashboard`
- `/companies`
- `/companies/[id]`
- `/profiles`
- `/profiles/[id]`
- `/projects`
- `/projects/[id]`
- `/knowledge-base`
- `/analysis`
- `/strategy`
- `/simulation`
- `/trainer-review`

Bewertung:

Frontend Lint, Typecheck und Production Build sind bestanden. Der zuvor beobachtete Docker-Frontend-Fehler betrifft nach aktuellem Stand nicht den Production Build.

## 8. Backend-Code und Pytest

Status: bestanden

Kommandos:

```bash
cd backend
python3 -m compileall app
.venv/bin/pytest
```

Ergebnis:

- `python3 -m compileall app` laeuft ohne Syntaxfehler durch.
- Lokale virtuelle Umgebung `.venv` ist vorhanden.
- Pytest startet erfolgreich.
- 13 Tests werden gesammelt.
- 13 Tests bestehen.
- Testbereiche:
  - Simulation-/Trainerreview-API
  - Strategie-API

Pytest-Ergebnis:

```text
13 passed in 0.91s
```

Hinweis:

Die lokale `.venv` nutzt Python `3.13.3`; der Docker-Backend-Build verwendet Python `3.12-slim`. Fuer diese Abnahme wurde daraus kein Fehler ersichtlich.

Bewertung:

Backend-Code und vorhandene automatisierte Backend-Tests sind bestanden.

## 9. Alembic Upgrade und Drift-Check

Status: bestanden

Kommandos:

```bash
ALEMBIC_DATABASE_URL=postgresql+psycopg://negotiation:negotiation_dev_password@localhost:5433/negotiation_tools \
  .venv/bin/alembic upgrade head
```

```bash
ALEMBIC_DATABASE_URL=postgresql+psycopg://negotiation:negotiation_dev_password@localhost:5433/negotiation_tools \
  .venv/bin/alembic check
```

Ergebnis:

- Alembic verwendet `PostgresqlImpl`.
- Alembic nimmt transactional DDL an.
- `alembic upgrade head` laeuft ohne Fehler durch.
- `alembic check` meldet:

```text
No new upgrade operations detected.
```

Bewertung:

Datenbankmigrationen sind auf dem aktuellen Stand. Kein Alembic-Blocker sichtbar.

## 10. Browser-Smoke-Test der Kernrouten

Status: bestanden

Geprueftes Frontend:

`http://localhost:3001`

Geprueftes Backend:

`http://localhost:8000`

Gepruefte Routen:

- `/dashboard`
- `/companies`
- `/profiles`
- `/projects`
- `/knowledge-base`
- `/analysis`
- `/strategy`
- `/simulation`
- `/trainer-review`

Ergebnis:

- Alle Links bzw. Routen laden.
- Kein Flackern sichtbar.
- Keine roten Fehler in der Browser-Konsole gemeldet.
- Keine unhandled Runtime Errors beobachtet.
- Die App ist ueber das lokale Frontend stabil bedienbar.

Bewertung:

Der Browser-Smoke-Test der zentralen MVP-Kernrouten ist bestanden.

## 11. Rheinwerk-E2E-Testpfad

Getesteter Workflow:

`Company -> Profile -> Project -> Knowledge Base -> Analysis -> Strategy -> Simulation Scenario -> Trainerreview`

Getesteter Kontext:

- Company: `Rheinmetall Robotiks GmbH`
- Projekt: `Servomotoren Rahmenvertrag 2026`
- Owner / Trainee-Rolle: `Markus Schulz`
- Supplier / Gegenrolle: `Testlieferant`

Hinweis:

Der urspruengliche Demo-Fall in der Dokumentation nutzt `Rheinwerk Robotics GmbH`. Im tatsaechlich vorhandenen Testdatenbestand wurde ein vergleichbarer Datensatz `Rheinmetall Robotiks GmbH` verwendet. Dies ist fuer die technische und fachliche MVP-Abnahme ausreichend, sollte aber bei spaeteren Demo-Daten bereinigt oder vereinheitlicht werden.

### 11.1 Company

Status: bestanden

Route:

`/companies`

Ergebnis:

- Die Company `Rheinwerk Robotics GmbH` bzw. ein vergleichbarer Rheinwerk/Rheinmetall-Testdatensatz war bereits aus einem vorherigen Test vorhanden.
- Der Datensatz ist sichtbar und nutzbar.
- Die Detailseite laesst sich oeffnen.
- Die geprueften Punkte sind in Ordnung.
- Keine roten Fehler in der Browser-Konsole beobachtet.

Bewertung:

Der Company-Schritt des Rheinwerk-E2E-Testpfads ist bestanden.

### 11.2 Profile / Rollenprofil

Status: bestanden mit Hinweis

Route:

`/profiles`

Ergebnis:

- Das Profil `Markus Schulz` ist vorhanden bzw. nutzbar.
- Die Verknuepfung mit der Test-Company ist im Testkontext plausibel.
- Die Profil-Detailseite laesst sich oeffnen.
- Die relevanten Profilinformationen sind erreichbar und nutzbar.
- Keine roten Fehler in der Browser-Konsole beobachtet.

Hinweis:

Ein eigenes Feld `Trainingsziel` ist im aktuellen Formular bzw. Datenmodell nicht vorhanden. Das ist kein Blocker fuer die MVP-Abnahme, da dieses Feld bisher nicht als vorhandene Produktfunktion umgesetzt war. Trainingsziel-Informationen koennen bei Bedarf spaeter ueber Notizen, Profil-Metadaten oder ein eigenes Feld ergaenzt werden.

Bewertung:

Der Profile-Schritt des Rheinwerk-E2E-Testpfads ist bestanden. Das fehlende Trainingsziel-Feld wird als fachlicher Verbesserungspunkt, nicht als Abnahmeblocker dokumentiert.

### 11.3 SupplierProfile / Lieferantenbezug

Status: bestanden mit fachlichem Verbesserungspunkt

Route:

`/projects/[id]`

Ergebnis:

- Im Projektbearbeitungsformular existiert ein Feld `Supplier Profile`.
- Das Feld ist als Dropdown angelegt.
- Im getesteten Projekt ist `Supplier Profile` auf `Nicht gesetzt`.
- Es konnte zunaechst kein SupplierProfile ausgewaehlt werden.
- Ein Lieferantenbezug ist zusaetzlich als Freitextfeld `Aktueller Lieferant` vorhanden.
- Im Testprojekt ist dort ein Freitextwert `Testlieferant` gepflegt.
- Das Projekt bleibt trotz fehlendem strukturiertem SupplierProfile nutzbar.

Bewertung:

Kein Blocker fuer den aktuellen MVP-Abnahmetest, weil der Projektflow weiter nutzbar ist. Fachlich ist dies jedoch ein relevanter Verbesserungspunkt. Fuer ein Verhandlungstool und besonders fuer Phase C Upload/Import sollten Lieferanten als strukturierte `SupplierProfile`-Datensaetze angelegt, gepflegt und in Projekten ausgewaehlt werden koennen.

Empfohlener Folgepunkt:

`SupplierProfile-Frontend-Flow ergaenzen und SupplierProfile-Auswahl im Projektformular nutzbar machen`

### 11.4 RequestItem / Anfrageposition

Status: bestanden mit fachlichem Verbesserungspunkt

Route:

`/projects/[id]`

Ergebnis:

- Im Projektbearbeitungsformular existiert ein Feld `Request Item`.
- Das Feld ist als Dropdown angelegt.
- Im getesteten Projekt ist `Request Item` auf `Nicht gesetzt`.
- Es konnte kein RequestItem ausgewaehlt werden.
- Ein eigener sichtbarer Frontend-Flow zur Anlage von RequestItems / Anfragepositionen ist in der Navigation nicht erkennbar.
- Anfrageinformationen sind teilweise direkt im Projektformular als Felder vorhanden:
  - `Artikel / Service`
  - `Menge`
  - `Zielregion`
  - `Ziel-Lieferzeit`
  - `Interne Preisannahme`
  - `Waehrung`
  - `Kategorie`
- Der Projektflow bleibt dadurch grundsaetzlich nutzbar, aber die strukturierte Anfrageposition ist im Frontend noch nicht vollstaendig als eigener Datensatz pflegbar.

Bewertung:

Kein Blocker fuer den aktuellen MVP-Abnahmetest, weil der Projektflow mit projektinternen Anfragefeldern weiter nutzbar ist. Fachlich ist dies jedoch ein relevanter Verbesserungspunkt. Fuer Phase C Upload/Import sollten RequestItems als strukturierte Datensaetze angelegt, importiert, geprueft und Projekten zugeordnet werden koennen.

Empfohlener Folgepunkt:

`RequestItem-Frontend-Flow ergaenzen und RequestItem-Auswahl im Projektformular nutzbar machen`

### 11.5 NegotiationProject

Status: bestanden

Route:

`/projects/[id]`

Getestetes Projekt:

`Servomotoren Rahmenvertrag 2026`

Ergebnis:

- Das Projekt laesst sich oeffnen.
- Aenderungen koennen gespeichert werden.
- Aenderungen bleiben nach Speichern und Neuladen erhalten.
- Die Workflow-Links sind sichtbar:
  - `Datenbasis anzeigen`
  - `Analyse vorbereiten`
  - `Strategie vorbereiten`
  - `Szenario konfigurieren`
  - `Trainerreview`
- Keine roten Fehler in der Browser-Konsole beobachtet.

Bewertung:

Der Projekt-Schritt des Rheinwerk-E2E-Testpfads ist bestanden.

### 11.6 Projektbezogene Datenbasis

Status: bestanden

Route:

`/knowledge-base?projectId=<project-id>`

Ergebnis:

- Die Datenbasis-Seite laedt.
- Der Projektkontext wird angezeigt.
- Die Seite ist als lesende Datenbasis fuer das Projekt gekennzeichnet.
- Quellen / Dokumente werden als Empty State dargestellt:
  - `Keine Quellen vorhanden.`
- Claims / Wissensaussagen werden als Empty State dargestellt:
  - `Keine Claims vorhanden.`
- Anfragepositionen werden als Empty State dargestellt:
  - `Keine Anfragepositionen vorhanden.`
- Einkaufshistorie wird als Empty State dargestellt:
  - `Keine Einkaufshistorie vorhanden.`
- Datenluecken werden verstaendlich ausgewiesen:
  - Quellenlage offen
  - Wissenslage offen
  - Anfragekontext offen
  - Einkaufshistorie offen
- Importstatus / Datenlage zeigt:
  - keine Importjobs oder Importzeilen fuer diesen Kontext vorhanden.
- Keine produktive Upload-/Import-Funktion wird suggeriert.
- Keine roten Fehler in der Browser-Konsole beobachtet.

Bewertung:

Der Datenbasis-Schritt des Rheinwerk-E2E-Testpfads ist bestanden. Fehlende Quellen, Claims, Anfragepositionen, Einkaufshistorie und Importjobs sind akzeptierte MVP-Datenluecken und kein Blocker.

### 11.7 Projektbezogene Analyse

Status: bestanden

Route:

`/analysis?projectId=<project-id>`

Ergebnis:

- Die Analyse-Seite laedt.
- Der Projektkontext wird angezeigt.
- Sichtbare Kontextdaten:
  - Company
  - Status
  - Kategorie
  - Prioritaet
  - Artikel / Service
  - Zielregion
  - Supplier als Freitext
  - Request Item als `Nicht gesetzt`
  - Projektziel / Objective
- Stakeholder- bzw. Lieferantenbeziehung wird als eigener Bereich angezeigt.
- Analysebereiche sind sichtbar:
  - Fakten
  - Annahmen
  - Hypothesen
  - Datenluecken
  - Risiken
  - Chancen
  - Offene Fragen
- Die Bereiche zeigen aktuell leere Zustaende, z. B. keine Fakten-Claims, keine Annahmen, keine Hypothesen.
- Es wird keine automatische KI-Auswertung, kein verbindliches Scoring und keine fertige Analyse suggeriert.
- Link `Datenbasis anzeigen` ist vorhanden.
- Link `Strategie vorbereiten` ist vorhanden.
- Keine roten Fehler in der Browser-Konsole beobachtet.

Bewertung:

Der Analyse-Schritt des Rheinwerk-E2E-Testpfads ist bestanden. Fehlende Claims und daraus resultierende leere Analysebereiche sind akzeptierte MVP-Datenluecken.

### 11.8 Strategie

Status: bestanden

Route:

`/strategy?projectId=<project-id>`

Ergebnis:

- Die Strategie-Seite laedt.
- Der Projekt- und Strategiekontext wird angezeigt.
- Zunaechst war noch kein Strategieobjekt vorhanden.
- Ein Strategie-Kopf konnte angelegt werden.
- Der Strategie-Kopf ist danach sichtbar und bearbeitbar.
- Aenderungen im Strategie-Kopf konnten gespeichert werden.
- Sichtbare Strategie-Bereiche:
  - Strategie-Kopf
  - ZOPA-Dimensionen
  - BATNA-Optionen
  - Konzessionen als Tauschobjekte
  - Argumentationslinien
- Leere Unterbereiche werden verstaendlich als noch nicht gepflegt dargestellt.
- Die Seite grenzt automatische Funktionen korrekt ab:
  - keine automatische ZOPA-Berechnung
  - keine automatische BATNA-Bewertung
  - keine KI-Strategie-Generierung
- Workflow-Links sind vorhanden:
  - Zum Projekt
  - Zur Analyse
  - Szenario konfigurieren
  - Trainerreview
- Keine roten Fehler in der Browser-Konsole beobachtet.

Bewertung:

Der Strategie-Schritt des Rheinwerk-E2E-Testpfads ist bestanden.

### 11.9 Simulation / Szenario-Konfiguration

Status: bestanden mit kleinem UX-Hinweis

Route:

`/simulation?projectId=<project-id>`

Ergebnis:

- Die Simulation-Seite laedt.
- Der Projekt- und Vorbereitungskontext wird angezeigt.
- Kultur- und Rollenbriefing wird angezeigt.
- Hinweise werden als Arbeitshypothesen dargestellt.
- Es wird ausdruecklich kommuniziert:
  - kein Chat
  - kein Voice-Modus
  - keine automatische Auswertung
  - kein automatisches Laenderprofil
  - keine Zuschreibung
  - keine Bias-Bewertung
- Die Szenarioliste zeigt einen verstaendlichen Empty State:
  - `Noch kein Szenario vorbereitet.`
- Ein Formular zur Szenarioanlage ist sichtbar.
- Ein neues Szenario kann grundsaetzlich angelegt werden.
- Der zuvor angelegte Strategie-Kopf ist auf der Strategie-Seite sichtbar.
- Das Strategiebezug-Dropdown in der Simulation bietet die Strategie zur Auswahl an.
- Keine roten Fehler in der Browser-Konsole beobachtet.

UX-Hinweis:

Der Strategiebezug war zunaechst nicht automatisch vorausgewaehlt. Da die Strategie im Dropdown angeboten wird, ist dies kein Funktionsfehler. Spaeter koennte geprueft werden, ob bei genau einer vorhandenen Strategie diese automatisch vorausgewaehlt werden sollte.

Bewertung:

Der Simulation-Schritt des Rheinwerk-E2E-Testpfads ist bestanden.

### 11.10 Trainerreview

Status: bestanden mit UX-/Fachhinweisen

Route:

`/trainer-review?projectId=<project-id>`  
und szenariobezogener Trainerreview

Ergebnis:

- Die Trainerreview-Seite laedt.
- Projekte werden angezeigt.
- Vorhandene Szenarien werden angezeigt.
- Der Wechsel in den szenariobezogenen Review funktioniert.
- Trainerkommentar bzw. Lernpunkt kann angelegt werden.
- Sichtbarkeit zwischen trainerintern und trainee-sichtbar ist erkennbar bzw. pflegbar.
- Es wird keine automatische Bewertung, keine Score-Engine und keine Zertifikatslogik suggeriert.
- Keine roten Fehler in der Browser-Konsole beobachtet.

UX-/Fachhinweise:

1. Trainerprofil:
   - Im Formular steht bei `Trainerprofil` zunaechst `Nicht gesetzt`.
   - Zur Auswahl steht `Markus Schulz`.
   - Das ist fachlich uneindeutig, weil Markus Schulz im Testfall die Trainee-/Einkaeuferrolle ist.
   - Die Rollenlogik zwischen Trainee, Trainer und Reviewer sollte spaeter klarer getrennt werden.

2. Kommentartyp:
   - Der Kommentartyp erscheint als `trainer_note`.
   - Es ist kein Auswahlfeld sichtbar.
   - Wenn der Typ aktuell nicht bewusst vom Nutzer gewaehlt werden kann, sollte geprueft werden, ob das Feld im UI notwendig ist oder intern gesetzt werden kann.
   - Alternativ sollte ein verstaendliches Auswahlfeld mit Labels wie `Trainerhinweis`, `Lernpunkt`, `Naechster Fokus` oder `Risiko` angeboten werden.

Bewertung:

Der Trainerreview-Schritt des Rheinwerk-E2E-Testpfads ist bestanden. Die genannten Punkte sind UX-/Fachverbesserungen, aber keine Blocker fuer die aktuelle MVP-Abnahme.

## 12. Gefundene Blocker

Status: keine harten Blocker

Im MVP-Abnahmetest wurden keine harten Blocker gefunden, die den Start von Phase C verhindern.

Der zunaechst beobachtete Docker-Frontend-Fehler wurde eingegrenzt:

- Docker-Frontend-Dev-Setup mit Next.js/Turbopack ist instabil.
- Lokaler Frontend-Dev-Server ausserhalb Docker laeuft stabil.
- Production Build, Lint, Typecheck und Browser-Flows sind bestanden.

Daher wird der Docker-Frontend-Befund als technischer Nicht-Blocker und Fix-Kandidat dokumentiert.

## 13. Offene Nicht-Blocker / Verbesserungspunkte

1. Docker-Frontend-Dev-Setup mit Next.js/Turbopack stabilisieren.
   - Docker-Frontend auf Port `3000` zeigt Turbopack-Fatal-Errors.
   - Lokaler Dev-Server auf Port `3001` laeuft stabil.
   - Production Build ist bestanden.

2. SupplierProfile-Frontend-Flow ergaenzen.
   - SupplierProfile-Dropdown existiert im Projektformular.
   - Strukturierte Lieferanten sind im getesteten Flow nicht sauber anlegbar/auswaehlbar.
   - Fuer Phase C Upload/Import fachlich wichtig.

3. RequestItem-Frontend-Flow ergaenzen.
   - RequestItem-Dropdown existiert im Projektformular.
   - Strukturierte Anfragepositionen sind im getesteten Flow nicht sauber anlegbar/auswaehlbar.
   - Fuer Phase C Upload/Import fachlich wichtig.

4. Trainingsziel im Rollenprofil pruefen.
   - Kein eigenes Feld `Trainingsziel` im Profilformular sichtbar.
   - Kein Blocker, aber fachlich fuer Trainingskontext relevant.

5. Strategiebezug in Simulation optional vorauswaehlen.
   - Strategie ist im Dropdown verfuegbar.
   - Bei genau einer Strategie koennte automatische Vorauswahl geprueft werden.

6. Trainerreview-Rollenlogik schaerfen.
   - Trainerprofil-Dropdown bietet `Markus Schulz`, obwohl Markus im Testfall Trainee/Einkaeufer ist.
   - Trennung zwischen Trainee, Trainer und Reviewer sollte spaeter geklaert werden.

7. Kommentartyp im Trainerreview UI-seitig klaeren.
   - `trainer_note` erscheint als technischer Wert.
   - Entweder intern setzen oder verstaendliche Auswahl anbieten.

8. Demo-Daten vereinheitlichen.
   - Dokumentierter Demo-Fall nennt `Rheinwerk Robotics GmbH`.
   - Getesteter vorhandener Datensatz verwendet `Rheinmetall Robotiks GmbH`.
   - Spaeter sollten Demo-Daten einheitlich benannt werden.

## 14. Akzeptierte Datenluecken

Diese Datenluecken wurden beobachtet und sind fuer den aktuellen MVP akzeptiert:

- keine produktiv hochgeladenen Dokumente
- keine KnowledgeDocuments im getesteten Projektkontext
- keine KnowledgeClaims
- keine DocumentChunks
- keine ImportJobs
- keine ImportRows
- keine Einkaufshistorie
- keine Anfragepositionen als strukturierte RequestItems im getesteten Projekt
- kein strukturiertes SupplierProfile im getesteten Projekt
- keine automatische KI-Auswertung
- keine automatische ZOPA-Berechnung
- keine automatische BATNA-Bewertung
- keine produktive Simulation
- kein Chat
- kein Voice-Modus
- kein Streaming
- keine Score-Engine
- keine Zertifikatslogik

Bewertung:

Diese Luecken entsprechen der bisherigen MVP-Abgrenzung und sind kein Fehler der Phase-B-/C0-Abnahme.

## 15. Entscheidung

Gesamtergebnis:

`bestanden mit offenen Nicht-Blockern`

Begruendung:

- Technische Grundpruefung bestanden.
- Backend laeuft.
- Frontend laeuft lokal stabil.
- Frontend Lint, Typecheck und Build bestanden.
- Backend Compile, Pytest und Alembic Check bestanden.
- Browser-Smoke-Test der Kernrouten bestanden.
- Rheinwerk-E2E-Testpfad vollstaendig durchlaufen.
- Keine harten Blocker gefunden.
- Offene Punkte sind fachliche bzw. UX-bezogene Verbesserungspunkte oder technische Nicht-Blocker.

Entscheidung:

- [x] bestanden mit offenen Punkten
- [ ] nicht bestanden wegen Blockern

Empfehlung:

Phase C Upload und Import kann nach Dokumentation und Merge dieses Issues gestartet werden.

## 16. Empfehlung fuer Phase C

Vor Start der eigentlichen Importlogik sollte Phase C weiterhin schrittweise geplant werden:

1. Upload-/Import-Architektur und API-Kontrakt vorbereiten
2. lokale Dateiablage / Storage-Service
3. Upload-Endpunkte fuer KnowledgeDocument und ImportJob
4. ImportJob-Erzeugung ohne Parsing
5. CSV-/Excel-Parsing
6. Mapping
7. Validierung
8. Zielobjekt-Erzeugung fuer `ProcurementHistoryItem`
9. Zielobjekt-Erzeugung fuer `RequestItem`

Wichtig:

SupplierProfile- und RequestItem-Frontend-Luecken sollten fuer Phase C priorisiert oder zumindest parallel eingeplant werden, weil Upload-/Importdaten sonst nicht vollstaendig sinnvoll im Frontend nutzbar werden.
