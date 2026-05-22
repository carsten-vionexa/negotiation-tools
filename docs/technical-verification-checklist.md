# Technische Verifikations-Checkliste nach Phase B

## 1. Zweck

Diese Checkliste beschreibt die technische Mindestverifikation fuer den MVP-Stand nach Phase B. Sie ist Teil von Phase C0 und soll sicherstellen, dass lokale Umgebung, Backend, Datenbank, API-Konfiguration und Frontend reproduzierbar geprueft werden koennen.

Die Checkliste fuehrt keine neuen technischen Features ein. Sie dokumentiert ausschliesslich manuelle Pruefschritte.

## 2. Lokale Voraussetzungen

| Bereich | Erwartung | Pruefung | Ergebnis | Notiz |
|---|---|---|---|---|
| Repository | aktueller `main` oder aktueller Feature-Branch liegt lokal vor | `git status` | offen |  |
| Docker | Docker und Docker Compose sind verfuegbar | `docker --version` / `docker compose version` | offen |  |
| Node/npm | Node und npm sind verfuegbar | `node --version` / `npm --version` | offen |  |
| Python | Python 3 ist verfuegbar | `python3 --version` | offen |  |
| Env-Datei | `.env` existiert | `cp .env.example .env`, falls noch nicht vorhanden | offen |  |
| Ports | 3000, 8000 und DB-Port 5433 sind frei oder bewusst belegt | lokale Portpruefung | offen |  |

## 3. Systemstart

### 3.1 Vollstaendiger Start per Docker Compose

```bash
docker compose up --build
```

Erwartung:

- Datenbank startet.
- Backend startet.
- Frontend startet.
- Frontend ist unter `http://localhost:3000` erreichbar.
- Backend ist unter `http://localhost:8000` erreichbar.

| Pruefung | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Compose Build | Images werden gebaut | offen |  |
| DB Service | PostgreSQL startet ohne Blocker | offen |  |
| Backend Service | FastAPI startet ohne Importfehler | offen |  |
| Frontend Service | Next.js startet ohne Build-/Runtime-Fehler | offen |  |
| Frontend URL | `http://localhost:3000` oeffnet die App | offen |  |
| Backend URL | `http://localhost:8000` ist erreichbar | offen |  |

### 3.2 Nur Datenbank starten, falls Migrationen separat geprueft werden

```bash
docker compose up -d db
```

Erwartung:

- PostgreSQL laeuft lokal.
- Der in der README beschriebene Host-Port `5433` ist erreichbar.

## 4. Backend-Pruefung

### 4.1 Healthcheck

Browser oder Kommandozeile:

```bash
curl http://localhost:8000/api/health
```

Erwartung:

- Der Healthcheck antwortet erfolgreich.
- Kein 500er-Fehler.
- Keine Datenbank- oder Importfehler im Backend-Log.

| Pruefung | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Healthcheck | erfolgreiche Antwort | offen |  |
| Backend Log | keine kritischen Tracebacks | offen |  |

### 4.2 OpenAPI Docs

URL:

```text
http://localhost:8000/docs
```

Erwartung:

- Swagger UI laedt.
- Die registrierten MVP-Endpunkte sind sichtbar.
- Keine Runtime-Fehler beim Laden der OpenAPI-Spezifikation.

| Pruefung | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| Docs erreichbar | Swagger UI laedt | offen |  |
| OpenAPI JSON | Spezifikation wird geladen | offen |  |

### 4.3 Python-Abhaengigkeiten lokal installieren, falls ohne Docker geprueft wird

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
```

Erwartung:

- Requirements werden erfolgreich installiert.
- FastAPI, SQLAlchemy, Alembic, psycopg, pgvector, pandas, openpyxl, pypdf, httpx und pytest sind verfuegbar.

### 4.4 Backend Import-/Compile-Pruefung

Falls lokal sinnvoll:

```bash
cd backend
.venv/bin/python -m compileall app
```

Erwartung:

- Python-Dateien koennen kompiliert werden.
- Keine Syntaxfehler.

| Pruefung | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| compileall | keine Syntaxfehler | offen |  |

### 4.5 Pytest, falls Tests vorhanden oder sinnvoll ausfuehrbar

```bash
cd backend
.venv/bin/pytest
```

Erwartung:

- Falls Tests vorhanden sind: Tests laufen durch.
- Falls keine Tests vorhanden sind: Ergebnis dokumentieren, aber nicht als MVP-Blocker werten.

| Pruefung | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| pytest | bestanden oder keine Tests dokumentiert | offen |  |

## 5. Datenbank- und Alembic-Pruefung

### 5.1 Datenbank erreichbar

```bash
docker compose up -d db
```

Optional mit lokalem Client pruefen:

```bash
psql postgresql://negotiation:negotiation_dev_password@localhost:5433/negotiation_tools
```

Erwartung:

- Datenbank ist erreichbar.
- Zugangsdaten entsprechen `.env.example` oder lokaler `.env`.

### 5.2 Alembic Upgrade

```bash
cd backend
ALEMBIC_DATABASE_URL=postgresql+psycopg://negotiation:negotiation_dev_password@localhost:5433/negotiation_tools \
  .venv/bin/alembic upgrade head
```

Erwartung:

- Migrationen laufen erfolgreich bis `head`.
- Keine fehlenden Revisionen.
- Keine SQL-Fehler.

### 5.3 Alembic Drift-Check

```bash
cd backend
ALEMBIC_DATABASE_URL=postgresql+psycopg://negotiation:negotiation_dev_password@localhost:5433/negotiation_tools \
  .venv/bin/alembic check
```

Erwartung:

- Alembic meldet keine unbeabsichtigte Model-/Datenbank-Drift.
- Falls bewusst nicht pruefbar, Ergebnis dokumentieren.

| Pruefung | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| DB erreichbar | Verbindung erfolgreich | offen |  |
| Alembic upgrade | Migrationen auf head | offen |  |
| Alembic check | keine Drift oder dokumentierter Sonderfall | offen |  |

## 6. Frontend-Pruefung

Alle Frontend-Kommandos im Verzeichnis `frontend` ausfuehren.

### 6.1 Dependencies installieren

```bash
cd frontend
npm install
```

Erwartung:

- Dependencies werden installiert.
- Keine kritischen Installationsfehler.

### 6.2 Lint

```bash
cd frontend
npm run lint
```

Erwartung:

- ESLint laeuft ohne Fehler.

### 6.3 Typecheck

```bash
cd frontend
npm run typecheck
```

Erwartung:

- TypeScript meldet keine Typfehler.

### 6.4 Build

```bash
cd frontend
npm run build
```

Erwartung:

- Next.js Build laeuft erfolgreich.
- Keine fehlenden Imports.
- Keine Server-Component-/Route-Fehler im Build.

| Pruefung | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| npm install | erfolgreich | offen |  |
| npm run lint | erfolgreich | offen |  |
| npm run typecheck | erfolgreich | offen |  |
| npm run build | erfolgreich | offen |  |

## 7. API-Konfiguration

Das Frontend verwendet `NEXT_PUBLIC_API_URL` als Base URL fuer API-Aufrufe. Wenn die Variable nicht gesetzt ist, wird lokal der Default `http://localhost:8000` verwendet.

### 7.1 Korrekte lokale Konfiguration

Pruefen:

```bash
cat .env
```

Erwartung:

```text
NEXT_PUBLIC_API_URL=http://localhost:8000
```

oder eine bewusst gleichwertige lokale Backend-URL.

### 7.2 Frontend-Backend-Integration

Pruefung im Browser:

- `/projects`
- `/companies`
- `/profiles`
- `/strategy`
- `/simulation`
- `/trainer-review`

Erwartung:

- API-abhaengige Seiten laden Daten, Empty States oder verstaendliche Error States.
- Keine dauerhaft weisse Seite.
- Keine unhandled Runtime Errors.

### 7.3 Falsch gesetzte API-URL

Optionaler Negativtest:

1. `NEXT_PUBLIC_API_URL` bewusst auf eine falsche URL setzen.
2. Frontend neu starten.
3. API-abhaengige Route oeffnen.

Erwartung:

- Ein Error State erscheint.
- Fehlermeldung verweist sinngemaess auf Backend/API-Erreichbarkeit.
- Nach Ruecksetzung auf korrekte URL funktionieren die Routen wieder.

| Pruefung | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| NEXT_PUBLIC_API_URL korrekt | zeigt auf Backend | offen |  |
| Default-Verhalten | ohne Env lokal plausibel | offen |  |
| API-Routen laden | Daten/Empty/Error State sichtbar | offen |  |
| falsche API-URL | Error State statt Crash | offen |  |

## 8. Frontend-Backend-Integrationsrouten

Mindestens diese Routen im Browser pruefen:

| Route | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| `/companies` | Company-Liste oder Empty State | offen |  |
| `/profiles` | Profil-Liste oder Empty State | offen |  |
| `/projects` | Projektliste oder Empty State | offen |  |
| `/knowledge-base` | Datenbasis-Uebersicht oder Empty State | offen |  |
| `/analysis` | Projekt-Auswahl oder Empty State | offen |  |
| `/strategy` | Projekt-Auswahl oder Empty State | offen |  |
| `/simulation` | Projekt-Auswahl oder Empty State | offen |  |
| `/trainer-review` | Review-Auswahl oder Empty State | offen |  |

Mit Testdaten zusaetzlich:

| Route | Erwartung | Ergebnis | Notiz |
|---|---|---|---|
| `/projects/<id>` | Projektdetail laedt | offen |  |
| `/knowledge-base?projectId=<id>` | projektbezogene Datenbasis laedt | offen |  |
| `/analysis?projectId=<id>` | projektbezogene Analyse laedt | offen |  |
| `/strategy?projectId=<id>` | Strategie-Builder laedt | offen |  |
| `/simulation?projectId=<id>` | Szenario-Konfiguration laedt | offen |  |
| `/trainer-review?projectId=<id>` | Szenarien fuer Review laden | offen |  |
| `/trainer-review?scenarioId=<id>` | Szenario-Review laedt | offen |  |

## 9. Ergebnisprotokoll

| Bereich | Kommando / URL | Ergebnis | Blocker? | Notiz |
|---|---|---|---|---|
| Docker Compose | `docker compose up --build` | offen | nein |  |
| Backend Health | `/api/health` | offen | nein |  |
| Backend Docs | `/docs` | offen | nein |  |
| Alembic Upgrade | `alembic upgrade head` | offen | nein |  |
| Alembic Check | `alembic check` | offen | nein |  |
| Frontend Lint | `npm run lint` | offen | nein |  |
| Frontend Typecheck | `npm run typecheck` | offen | nein |  |
| Frontend Build | `npm run build` | offen | nein |  |
| API-Konfiguration | `NEXT_PUBLIC_API_URL` | offen | nein |  |
| Browser-Integration | zentrale Routen | offen | nein |  |

Gesamtergebnis:

- [ ] technisch bestanden
- [ ] technisch bestanden mit offenen Punkten
- [ ] technisch nicht bestanden wegen Blockern

Offene Punkte:

- 

Blocker:

- 

## 10. Nicht Bestandteil dieser technischen Verifikation

Nicht Bestandteil dieses Issues oder dieser Checkliste sind:

- Einrichtung einer CI/CD-Pipeline,
- GitHub-Actions-Konfiguration,
- neue Testskripte,
- neue Backend- oder Frontend-Features,
- neue API-Endpunkte,
- Datenbankmodell-Aenderungen,
- Alembic-Migrationen,
- Upload-/Import-Funktionen,
- produktive Simulation,
- Chat,
- Voice,
- RAG,
- OCR,
- Embeddings,
- Frontend-Refactoring.

Diese Punkte bleiben spaetere Arbeitsphasen und duerfen in C0.4 nicht umgesetzt werden.