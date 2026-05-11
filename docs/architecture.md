# Architektur

Das Projekt startet als Docker-Compose-basierter MVP mit drei Services:

- `frontend`: Next.js App Router fuer Cockpit, Formulare und Analyseansichten
- `backend`: FastAPI fuer Import, KI/RAG-Services und Datenzugriff
- `db`: PostgreSQL mit pgvector fuer relationale Daten, JSONB und Embeddings

Die fachliche Grundkette folgt dem Umsetzungsbriefing:

```text
Tenant -> Company -> Knowledge Base -> Request Item -> Negotiation Project
-> Supplier Profile -> Strategy -> Cultural Briefing -> Simulation Scenario
-> Simulation Result -> Learning History
```

Alle strategischen Aussagen sollen spaeter einen Quellenbezug erhalten und fachlich zwischen Fakt,
Annahme, Hypothese, Empfehlung und Trainingshinweis unterscheiden.
