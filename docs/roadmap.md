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
- Trainer-Demo-Storyboard
- Workflow v2 und Procurement-Erweiterungen

## 3. Roadmap-Prinzipien

- Erst Produkt- und MVP-Logik schaerfen.
- Danach Screens und API-Luecken ableiten.
- Danach Frontend- und Backend-Arbeitspakete umsetzen.
- RAG, OCR, Voice und produktive Simulation erst nach tragfaehigem MVP-Scope vertiefen.

## 4. Phase A: Produkt- und MVP-Scope

Ziel: Den erweiterten Workflow v2 in einen klaren MVP ueberfuehren.

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

Moegliche Schritte:

1. API-Luecken fuer priorisierte MVP-Screens identifizieren.
2. Frontend-Grundstruktur planen.
3. Dashboard / Projektuebersicht erstellen.
4. Company-, UserProfile- und NegotiationProject-Flows anbinden.
5. Strategie-Builder als erste strukturierte Arbeitsansicht vorbereiten.
6. Trainerreview sichtbar machen.

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
