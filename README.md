# Negotiation Tools

KI-gestuetztes Verhandlungs-Cockpit fuer Vorbereitung, Strategieentwicklung, Simulation und Auswertung von Verhandlungen.

## Development Workflow

For the project-specific development workflow, see:

`docs/skills/negotiation-tools-dev-workflow/SKILL.md`


## Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui-kompatible Struktur
- Backend: FastAPI, Python, Pydantic Settings
- Datenbank: PostgreSQL mit pgvector
- Lokale Umgebung: Docker Compose

## Lokaler Start

1. Env-Datei anlegen:

```bash
cp .env.example .env
```

2. Container starten:

```bash
docker compose up --build
```

3. URLs oeffnen:

- Frontend: http://localhost:3000
- Backend Healthcheck: http://localhost:8000/api/health
- Backend Docs: http://localhost:8000/docs

Das Frontend verwendet im Browser `NEXT_PUBLIC_API_URL` als Base URL fuer API-Aufrufe. Lokal ist in
`.env.example` `http://localhost:8000` voreingestellt. Im Docker-Setup verwendet Next.js serverseitig
`SERVER_API_URL=http://backend:8000`, weil `localhost` im Container den Frontend-Container meint,
waehrend der Browser vom Host aus weiterhin `http://localhost:8000` nutzt.

## Lokale Datenbankmigrationen

Die PostgreSQL-Datenbank laeuft per Docker Compose mit persistentem Volume `postgres_data`.
Auf dem Host wird standardmaessig Port `5433` genutzt, damit lokale Postgres-Installationen auf
`5432` nicht kollidieren.

Nur die Datenbank starten:

```bash
docker compose up -d db
```

Backend-Abhaengigkeiten installieren:

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
```

Migrationen gegen die lokale Compose-DB ausfuehren:

```bash
cd backend
ALEMBIC_DATABASE_URL=postgresql+psycopg://negotiation:negotiation_dev_password@localhost:5433/negotiation_tools \
  .venv/bin/alembic upgrade head
```

Drift-Check fuer SQLAlchemy-Models vs. Datenbank:

```bash
cd backend
ALEMBIC_DATABASE_URL=postgresql+psycopg://negotiation:negotiation_dev_password@localhost:5433/negotiation_tools \
  .venv/bin/alembic check
```

Neue Migration aus den SQLAlchemy-Models erzeugen:

```bash
cd backend
ALEMBIC_DATABASE_URL=postgresql+psycopg://negotiation:negotiation_dev_password@localhost:5433/negotiation_tools \
  .venv/bin/alembic revision --autogenerate -m "describe change"
```

## Struktur

```text
backend/        FastAPI-App und spaetere KI/RAG-Services
frontend/       Next.js-App mit UI-Komponenten
database/init/  PostgreSQL-Initialisierung
data_training/  Beispiel- und Trainingsdaten
dev/            Umsetzungsbriefing und Arbeitsnotizen
docs/           Architektur- und Projektdokumentation
uploads/        Lokale Upload-Ablage
```

## Naechste Ausbaustufen

- Datenmodell fuer Tenants, Companies, Knowledge Base, Dokumente und Negotiation Projects
- Dateiimport fuer Markdown, PDF, Excel und CSV
- Alembic-Migrationen
- RAG-Pipeline mit Embeddings und Quellenbezug
- Simulations- und Feedback-Workflows
