# Roadmap

## 1. Zweck dieses Dokuments

Dieses Dokument beschreibt die fachliche und technische Reihenfolge der naechsten Schritte. Es ist eine Roadmap-Uebersicht und ersetzt nicht `docs/codex-tasks.md` als Aufgabenhistorie.

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
- Phase A1: MVP-Screen-Scope fachlich abgeschlossen
- Phase B: Backend-API-Readiness und Frontend-Flows fuer die MVP-Kernstrecke abgeschlossen
- Phase C0: MVP-Konsolidierung nach Phase B abgeschlossen
- MVP-Abnahmetest in `docs/mvp-acceptance-results.md` dokumentiert: bestanden mit offenen Nicht-Blockern
- Phase C1: Upload-/Import-API-Kontrakt in `docs/upload-import-api-contract.md` dokumentiert

Der aktuelle MVP-Workflow lautet:

`Company -> Profile -> Project -> Knowledge Base -> Analysis -> Strategy -> Simulation Scenario Configuration -> Trainerreview`

## 3. Roadmap-Prinzipien

- Erst Produkt- und MVP-Logik schaerfen.
- Danach Screens und API-Luecken ableiten.
- Danach Frontend- und Backend-Arbeitspakete umsetzen.
- Vor neuen Feature-Phasen den bestehenden MVP fachlich und technisch abnehmen.
- Upload/Import, Knowledge Intelligence und produktive Simulation erst nach sauberer C0-Konsolidierung starten.
- Phase C Upload/Import schrittweise starten und nicht direkt grosse Importlogik bauen.

## 4. Phase A: Produkt- und MVP-Scope

Status: Abgeschlossen.

Der MVP-Core-Scope ist in `docs/screen-by-screen-concept.md` fachlich finalisiert.

## 5. Phase B: API- und Frontend-Grundlage

Status: Abgeschlossen.

Umgesetzt wurden:

1. Backend API Readiness fuer Stammdaten und Projekte.
2. Backend API Readiness fuer Knowledge-Base-Lesezugriffe.
3. Backend API Readiness fuer Strategieobjekte.
4. Backend API Readiness fuer SimulationScenario und TrainerComment.
5. Frontend-Grundlayout, Navigation und API-Client.
6. Frontend-Flows fuer Stammdaten und Projekte.
7. Frontend-Flow fuer Knowledge Base und Analyse.
8. Frontend-Flow fuer Strategie-Builder.
9. Frontend-Flow fuer Szenario-Konfiguration und Trainerreview.
10. Einfache Dashboard-Komposition.

## 6. Phase C0: MVP-Konsolidierung nach Phase B

Status: Abgeschlossen.

Ziel: Den vorhandenen MVP-Stand stabilisieren, fachlich pruefen und besser testbar machen, bevor Phase C Upload/Import beginnt.

C0 ist keine Feature-Phase. Sie dient Abnahme, Testbarkeit und Dokumentationskonsistenz.

Umgesetzte Arbeitspakete:

1. MVP-Abnahme-Checkliste.
2. Browser-Smoke-Test-Plan.
3. End-to-End-Testpfad mit Rheinwerk-Demo-Fall.
4. Technische Verifikations-Checkliste.
5. Roadmap und Nicht-MVP-Grenzen.
6. Frontend-Konsolidierungsplan.
7. MVP-Abnahmetest mit Ergebnisdokumentation in `docs/mvp-acceptance-results.md`.

Ergebnis der MVP-Abnahme:

- Gesamtergebnis: bestanden mit offenen Nicht-Blockern.
- Keine harten Blocker fuer den Start von Phase C.
- Docker-Frontend-Dev-Setup mit Next.js/Turbopack ist als technischer Nicht-Blocker dokumentiert.
- SupplierProfile- und RequestItem-Frontend-Flows sind als fachlich wichtige Verbesserungspunkte fuer Phase C dokumentiert.

## 7. Nicht-MVP-Grenzen

Nicht Teil des aktuellen MVP sind:

- produktiver Datei-Upload und Dateiimport
- Excel-/CSV-/PDF-/Markdown-Parsing
- automatische Zielobjekt-Erzeugung aus Importdaten
- semantische Dokumentintelligenz mit Embeddings
- OCR
- automatische Claim-Extraktion
- produktive Simulation
- Chat, Voice und Streaming
- automatische Auswertung, Score-Engine und Zertifikatslogik
- Lernhistorie
- komplexe Rechteverwaltung und Admin-Konsole
- CRM-/ERP-Integration
- Relationship Memory als eigenes Modul
- Stakeholder-Graph
- automatische Angebotsanalyse

Diese Punkte bleiben spaetere Ausbaustufen und duerfen nicht als bereits gelieferte MVP-Funktionen bewertet werden.

## 8. Phase C: Upload und Import

Status: Begonnen. C1 ist dokumentiert; C2 lokale Dateiablage / Storage-Service ist der naechste Schritt.

Ziel: Die Datenbasis des MVP praktisch befuellbar machen. Dabei sollen Upload, Dateiablage, ImportJobs, Parsing, Mapping, Validierung und Zielobjekt-Erzeugung schrittweise umgesetzt werden.

Schritte:

1. C1 abgeschlossen: Upload-/Import-Architektur und API-Kontrakt in `docs/upload-import-api-contract.md` vorbereitet.
2. C2 naechster Schritt: Lokale Dateiablage / Storage-Service vorbereiten.
3. C3/C4: Upload-Endpunkte fuer KnowledgeDocument und ImportJob getrennt implementieren.
4. ImportJob beim Upload erzeugen oder verknuepfen, noch ohne Parsing.
5. Excel-/CSV-Parsing fuer Einkaufshistorie und Anfragenkatalog entwickeln.
6. Mapping- und Validierungslogik implementieren.
7. Zielobjekt-Erzeugung fuer `ProcurementHistoryItem` vorbereiten.
8. Zielobjekt-Erzeugung fuer `RequestItem` vorbereiten.

Wichtige Hinweise aus der MVP-Abnahme fuer Phase C:

- SupplierProfile-Frontend-Flow sollte ergaenzt oder parallel eingeplant werden, weil importierte Einkaufsdaten typischerweise Lieferanteninformationen enthalten.
- RequestItem-Frontend-Flow sollte ergaenzt oder parallel eingeplant werden, weil importierte Anfragenkataloge sonst nicht vollstaendig im Frontend nutzbar sind.
- Die Importlogik soll nicht als grosser Block umgesetzt werden, sondern in klar getrennten Schritten: Upload, Storage, ImportJob, Parsing, Mapping, Validierung, Zielobjekt-Erzeugung.

## 9. Phase D: Analyse und Strategieunterstuetzung

Ziel: Aus Daten strukturierte Analyse- und Strategievorschlaege erzeugen.

## 10. Phase E: Knowledge Intelligence

Ziel: Dokumentwissen semantisch nutzbar machen.

Nicht starten, bevor der MVP abgenommen und Phase C sauber priorisiert ist.

## 11. Phase F: Simulation und Auswertung

Ziel: Trainings- und Simulationsnutzen produktiv machen.

## 12. Phase G: Enterprise-Ausbau

Spaetere Themen:

- Rollen- und Rechteverwaltung
- Mandantenfaehigkeit
- Team-Dashboards
- CRM-/ERP-Anbindung
- Audit Trail
- Management-Reporting
