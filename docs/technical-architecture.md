# Technical Architecture

## 1. Zweck dieses Dokuments

Dieses Dokument beschreibt den aktuellen technischen Architekturrahmen des Projekts `negotiation-tools`. Es ist bewusst eine Uebersicht und keine vollstaendige API- oder Datenbankreferenz.

Fachlicher Workflow: `docs/workflow-v2.md`  
Datenmodell: `docs/data-model.md`  
Screen-Konzept: `docs/screen-by-screen-concept.md`  
Codex-Aufgabenstand: `docs/codex-tasks.md`

## 2. Architekturprinzipien

- MVP-first: zuerst tragfaehige Produktlogik, dann technische Tiefe.
- Workflow statt Chatbot: Nutzer werden durch definierte Schritte gefuehrt.
- Additive Entwicklung: keine unnoetigen Breaking Changes.
- Relationale Kernobjekte plus JSONB fuer flexible Erweiterung.
- Dokumentation vor Implementierung bei groesseren Architekturentscheidungen.
- KI, RAG und Simulation werden als spaetere Anschlussstellen vorbereitet, nicht vorschnell implementiert.

## 3. Aktueller Stack

| Bereich | Technologie |
|---|---|
| Backend | FastAPI |
| ORM | SQLAlchemy |
| Schemas | Pydantic |
| Datenbank | PostgreSQL |
| Migrationen | Alembic |
| Vektorfaehigkeit | pgvector vorbereitet |
| Infrastruktur lokal | Docker Compose |
| Entwicklung | GitHub, Issue-getriebene Codex-Arbeit |

## 4. Backend-Stand

Vorhanden:

- FastAPI-Grundstruktur
- Healthcheck
- Datenbankverbindung ueber Settings
- `get_db` Dependency
- SQLAlchemy-Models
- Pydantic-Schemas
- erste CRUD-Router
- API-Fehlerbehandlung und Foreign-Key-Validierung fuer bestehende Create-Endpunkte

Nicht Ziel dieses Dokuments:

- vollstaendige API-Spezifikation
- Service-Schicht-Design
- Authentifizierung und Rollenrechte
- Frontend-Implementierung

## 5. Datenbank- und Modellierungsprinzipien

Das Datenmodell nutzt:

- UUID Primary Keys
- `created_at` und `updated_at`
- Foreign Keys fuer stabile Beziehungen
- JSONB-Felder fuer flexible Erweiterung
- additive Alembic-Migrationen
- freie Strings statt frueher harter Enums, solange Fachwerte noch in Bewegung sind

Die aktuelle Modellstruktur ist in `docs/data-model.md` beschrieben.

## 6. Knowledge Base und spaeteres RAG

Vorbereitet sind:

- `KnowledgeDocument`
- `DocumentChunk`
- `KnowledgeClaim`

Zielbild:

- Dokumente speichern Originalquellen und Metadaten.
- Chunks werden perspektivisch primaere semantische Such- und Zitierbasis.
- Claims trennen Aussage, Evidenz, Quelle, Confidence und Informationsart.

Noch nicht implementiert:

- Chunking-Service
- Embedding-Erzeugung
- Retrieval
- RAG-Pipeline
- Quellenzitierung in produktiven KI-Antworten

## 7. Import- und Upload-Architektur

Vorbereitet sind:

- `ImportJob`
- `ImportRow`
- Datei-Metadaten fuer `KnowledgeDocument` und `ImportJob`
- Upload- und Dateiablage-Konzept
- Parser- und Mapping-Konzept
- Validierungs- und Fehlerkonzept
- Zielobjekt-Erzeugungs-Konzept

Wichtig: Es gibt noch keine produktive Upload-API, keine Storage-Implementierung, kein Parsing und keine automatische Zielobjekt-Erzeugung.

## 8. Strategie- und Simulationspersistenz

Vorbereitet sind:

- `Strategy`
- `ZopaItem`
- `BatnaOption`
- `ConcessionItem`
- `ArgumentationLine`
- `SimulationScenario`
- `SimulationMessage`
- `SimulationResult`
- `TrainerComment`

Diese Modelle schaffen Persistenzgrundlagen. Sie implementieren noch keine KI-Strategieerzeugung, keine Simulations-Engine und keine automatische Bewertung.

## 9. Frontend-Zielrichtung

Das Frontend ist noch nicht final umgesetzt.

Naheliegende Zielrichtung:

- Dashboard-orientierte UI
- gefuehrter Workflow
- Trainer- und Trainee-Sichten
- Projekt- und Strategie-Fokus
- keine Chat-first-Oberflaeche

Moeglicher Stack:

- React oder Next.js
- API-Anbindung an FastAPI
- spaeter komponentenbasierte Screen-Umsetzung gemaess `docs/screen-by-screen-concept.md`

## 10. Naechste technische Schritte

Die naechsten technischen Schritte sollten erst nach MVP-Screen-Priorisierung definiert werden.

Sinnvolle Reihenfolge:

1. MVP-Screens aus `workflow-v2.md` und `screen-by-screen-concept.md` priorisieren.
2. API-Luecken fuer diese Screens identifizieren.
3. Frontend-Grundstruktur planen.
4. Erst danach Upload, Import, Chunking, RAG oder produktive Simulation vertiefen.
