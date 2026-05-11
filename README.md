# Negotiation Tools

KI-gestuetztes Verhandlungs-Cockpit fuer Vorbereitung, Strategieentwicklung, Simulation und Auswertung von Verhandlungen.

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
