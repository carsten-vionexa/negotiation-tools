# Roadmap

## 1. Zweck dieses Dokuments

Dieses Dokument beschreibt die fachliche und technische Reihenfolge der naechsten Schritte. Es ist bewusst eine Roadmap-Uebersicht und ersetzt nicht `docs/codex-tasks.md` als kompakte Aufgabenhistorie.

## 2. Aktueller Stand

Abgeschlossen beziehungsweise vorbereitet:

- Repo-Grundstruktur
- Backend-Grundstruktur mit FastAPI
- SQLAlchemy- und Alembic-Grundlage
- Kernmodelle
- Knowledge-Base-Modell
- Importmodell
- Strategiemodell
- Simulation- und Auswertungsmodell
- API-Fehlerbehandlung und Foreign-Key-Validierung
- Upload-/Import-Konzepte
- Datei-Metadaten fuer spaetere Uploads
- Screen-by-Screen-Konzept
- Phase A1 MVP-Screen-Scope fachlich abgeschlossen
- API- und Frontend-Gap-Analyse fuer die 10 MVP-Core-Screens begonnen
- Trainer-Demo-Storyboard
- Workflow v2 und Procurement-Erweiterungen

## 3. Roadmap-Prinzipien

- Erst Produkt- und MVP-Logik schaerfen.
- Danach Screens und API-Luecken ableiten.
- Danach Frontend- und Backend-Arbeitspakete umsetzen.
- RAG, OCR, Voice und produktive Simulation erst nach tragfaehigem MVP-Scope vertiefen.

## 4. Phase A: Produkt- und MVP-Scope

Ziel: Den erweiterten Workflow v2 in einen klaren MVP ueberfuehren.

Status: Abgeschlossen. Der MVP-Core-Scope ist in `docs/screen-by-screen-concept.md` fachlich finalisiert.

Aufgaben:

1. `docs/screen-by-screen-concept.md` gegen `docs/workflow-v2.md` und `docs/procurement-process-concept.md` pruefen.
2. MVP-Screens priorisieren.
3. Entscheiden, welche Kick-off-Erweiterungen in den MVP gehoeren:
   - einfache Stakeholdernotizen
   - einfache Hypothesenliste
   - einfache Lieferantenbeziehungsnotiz
   - RFQ / Angebotsvergleich nur konzeptionell oder als einfacher Screen
4. Offene Produktentscheidungen dokumentieren.
5. Naechste GitHub-Issues fuer konkrete Produkt-/Screen-Arbeit erstellen.

## 5. Phase B: API- und Frontend-Grundlage

Ziel: Erste nutzbare End-to-End-Strecke auf Basis vorhandener Modelle.

Status: Begonnen. Die initiale API- und Frontend-Gap-Analyse liegt in `docs/mvp-api-frontend-gap-analysis.md`.

Moegliche Schritte:

1. Backend API Readiness fuer Stammdaten und Projekte.
2. Backend API Readiness fuer Knowledge-Base-Lesezugriffe.
3. Backend API Readiness fuer Strategieobjekte.
4. Backend API Readiness fuer SimulationScenario und TrainerComment.
5. Frontend-Grundlayout, Navigation und API-Client.
6. Frontend-Flows fuer Company, UserProfile, SupplierProfile, RequestItem und Projects.
7. Frontend-Flow fuer Knowledge Base und Analyseansicht.
8. Frontend-Flow fuer Strategie-Builder.
9. Frontend-Flow fuer Simulation konfigurieren und Trainerreview.
10. Dashboard-Summary oder einfache Dashboard-Komposition.

## 6. Phase C: Upload und Import

Ziel: Datenbasis praktisch befuellbar machen.

Moegliche Schritte:

1. Upload-API entwerfen.
2. lokale Dateiablage fuer Entwicklung implementieren.
3. ImportJob beim Upload erzeugen oder verknuepfen.
4. Excel-/CSV-Parsing fuer Einkaufshistorie und Anfragenkatalog entwickeln.
5. Mapping- und Validierungslogik schrittweise implementieren.
6. Zielobjekt-Erzeugung fuer `ProcurementHistoryItem` und `RequestItem` vorbereiten.

## 7. Phase D: Analyse und Strategieunterstuetzung

Ziel: Aus Daten strukturierte Analyse- und Strategievorschlaege erzeugen.

Moegliche Schritte:

1. regelbasierte Analysebausteine fuer Einkaufshistorie und Projekte.
2. manuelle Hypothesen- und Stakeholderlogik.
3. KI-gestuetzte Vorschlaege spaeter, mit Quellen- und Confidence-Logik.
4. Strategiebausteine fuer ZOPA, BATNA, WAP und Konzessionen weiter operationalisieren.

## 8. Phase E: RAG und Knowledge Intelligence

Ziel: Dokumentwissen semantisch nutzbar machen.

Moegliche Schritte:

1. Chunking-Service.
2. Embedding-Erzeugung.
3. Retrieval ueber `DocumentChunk`.
4. Claim-Extraktion und Claim-Review.
5. Quellenbasierte Analyseansicht.

Nicht starten, bevor Phase A und zentrale MVP-Flows geklaert sind.

## 9. Phase F: Simulation und Auswertung

Ziel: Trainings- und Simulationsnutzen produktiv machen.

Moegliche Schritte:

1. SimulationScenario-Konfiguration als Screen.
2. Chat-basierte Simulation.
3. Dialogspeicherung ueber `SimulationMessage`.
4. Ergebnisstruktur ueber `SimulationResult`.
5. TrainerComment und Lerntransfer.
6. spaeter Voice und adaptive Schwierigkeit.

## 10. Phase G: Enterprise-Ausbau

Spaetere Themen:

- Rollen- und Rechteverwaltung
- Mandantenfaehigkeit
- Team-Dashboards
- Relationship Memory als eigenes Modul
- CRM-/ERP-Anbindung
- OCR fuer handschriftliche Notizen
- Audit Trail
- Management-Reporting
