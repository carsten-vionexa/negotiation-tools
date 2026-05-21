# Project Overview

## Zweck dieses Dokuments

Dieses Dokument ist die zentrale Einstiegseite fuer das Projekt `negotiation-tools`. Es ersetzt nicht die Detaildokumente, sondern fuehrt sie zusammen und zeigt, wo welche Informationen gepflegt werden.

Ziel ist eine klare Dokumentationsstruktur ohne doppelte Pflege von Inhalten. Fachlicher Workflow, Produktlogik, Datenmodell, Technik-Stack, Trainer-Demo und Roadmap werden jeweils in eigenen Dokumenten vertieft.

## Projektvision

Das Negotiation Tool ist ein workflowbasiertes Verhandlungs-Cockpit fuer strategische Verhandlungsvorbereitung, Training, Simulation, Auswertung und spaeter reale Procurement-Workflows.

Es ist bewusst kein freier Chatbot. Nutzer sollen durch strukturierte Schritte gefuehrt werden: Unternehmenskontext, Datenbasis, Projekt, Lieferanten- und Stakeholderanalyse, Hypothesenbildung, Strategie, Simulation beziehungsweise reale Verhandlungsvorbereitung, Auswertung und Lerntransfer.

Durch die Kick-off-Erweiterungen entwickelt sich das Zielbild von einem reinen Training Cockpit in Richtung einer Procurement Negotiation Intelligence Platform.

## Zentrale Leitfrage

Wie uebersetzen wir Unternehmensdaten, Marktdaten, Einkaufshistorie, Lieferantenbeziehungen, Stakeholderwissen, Persoenlichkeitsprofile und kulturellen Kontext in konkrete, trainierbare und operativ nutzbare Verhandlungsstrategien?

## Dokumentationslandkarte

| Dokument | Zweck |
|---|---|
| `docs/project-overview.md` | Zentrale Projektlandkarte und Einstiegspunkt. |
| `docs/workflow-v2.md` | Aktualisiertes fachliches Hauptkonzept und Gesamtworkflow. |
| `docs/procurement-process-concept.md` | Einkaufsprozess, Bestandslieferanten, RFQ, Angebotsvergleich, Stakeholder und Hypothesen. |
| `docs/screen-by-screen-concept.md` | Produktnahe Screen-Logik fuer MVP, Trainer- und Trainee-Workflow. |
| `docs/trainer-demo-storyboard.md` | Erzaehlbare Demo-Strecke fuer Trainergespraeche mit Rheinwerk Robotics und Markus Schulz. |
| `docs/data-model.md` | Aktuelles technisches und fachliches Datenmodell. |
| `docs/upload-storage-concept.md` | Upload- und Dateiablage-Konzept. |
| `docs/parser-mapping-concept.md` | Parser- und Mapping-Konzept fuer Excel/CSV. |
| `docs/import-validation-concept.md` | Validierungs- und Importfehler-Konzept. |
| `docs/import-target-object-creation-concept.md` | Zielobjekt-Erzeugung aus validierten Importdaten. |
| `docs/technical-architecture.md` | Technik-Stack, Architekturprinzipien und aktueller Umsetzungsstand. |
| `docs/roadmap.md` | Reihenfolge der naechsten fachlichen und technischen Schritte. |
| `docs/codex-tasks.md` | Kompakte Codex-Aufgabenhistorie und naechste Arbeitspakete. |

## Aktueller fachlicher Scope

Der Kernscope umfasst:

- Unternehmens- und Mandantenkontext
- Trainee- und Rollenprofile
- Knowledge Base fuer Firmenprofile, Reports, Historien, Anfragen und spaetere Dokumentquellen
- Verhandlungsprojekte
- Lieferantenprofile
- strukturierte Analyse
- Strategie-Builder mit ZOPA, BATNA, WAP, Konzessionen und Argumentationslinien
- Kultur- und Rollenbriefing
- Simulation und Auswertung als Zielbild
- Trainerfeedback und Lerntransfer

Durch das Kick-off ergaenzt:

- Bestandslieferanten und Lieferantenhistorie
- RFQ / Ausschreibung / Angebotsvergleich
- Stakeholder-Analyse mit Freitext
- Hypothesenbildung als Vorbereitungskompetenz
- mehrere parallele Projekte und unterschiedliche Verhandler
- Relationship Memory als spaetere Wissensschicht
- OCR-Scans und handschriftliche Notizen als spaetere Ausbaustufe

## Aktueller technischer Stand

Vorhanden beziehungsweise vorbereitet:

- Docker Compose fuer frontend/backend/db
- FastAPI-Grundstruktur
- SQLAlchemy-Models
- Alembic-Migrationen
- PostgreSQL mit pgvector-Vorbereitung
- Pydantic-Schemas
- erste CRUD-Router
- Knowledge-Base-Modell mit Dokumenten, Chunks und Claims
- Importmodell mit ImportJob und ImportRow
- Strategiemodell mit Strategy, ZopaItem, BatnaOption, ConcessionItem und ArgumentationLine
- Simulations- und Auswertungsmodell mit SimulationScenario, SimulationMessage, SimulationResult und TrainerComment
- API-Fehlerbehandlung und Foreign-Key-Validierung
- additive Datei-Metadaten fuer spaetere Uploads

## MVP-Leitplanken

Der MVP soll den Kernnutzen beweisen:

Daten und Kontext hinein, strukturierte Verhandlungsstrategie heraus, Training beziehungsweise Simulation vorbereiten, Auswertung und Trainerfeedback dokumentieren.

MVP-relevant:

- gefuehrter Workflow
- Company- und Projektkontext
- Datenbasis-Uebersicht
- Trainee-/Rollenprofil
- Analyseansicht
- Strategie-Builder
- einfache Stakeholder- und Hypothesennotizen
- Simulation und Auswertung als gefuehrter Zielscreen
- Trainerreview

Nicht MVP:

- produktives RAG
- vollautomatische Angebotsanalyse
- OCR-Pipeline
- Voice-Simulation
- komplexe Rechteverwaltung
- CRM-/ERP-Anbindung
- autonome KI-Agenten

## Naechster Schwerpunkt

Nach Abschluss von Issue #11 liegt der sinnvollste naechste Schwerpunkt auf Option A: Produkt/MVP.

Konkret:

1. `workflow-v2.md` als fachliche Basis verwenden.
2. `screen-by-screen-concept.md` gegen die Kick-off-Erweiterungen pruefen.
3. MVP-Screens priorisieren.
4. Danach erst konkrete Frontend- und API-Arbeitspakete definieren.
