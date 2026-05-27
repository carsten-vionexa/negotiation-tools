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
- Phase C2: Lokale Storage-Service-Grundlage fuer sichere Upload-Dateiablage vorbereitet
- Phase C3: KnowledgeDocument-Upload-Endpunkt mit Datei- und Quellenmetadaten umgesetzt
- Phase C4: ImportJob-Upload-Endpunkt fuer CSV-/XLSX-Dateien ohne Parsing umgesetzt
- Phase C5: ImportJob-Verarbeitungs- und Review-Kontrakt fuer parsergestuetzte Rohdaten dokumentiert
- Phase C6: CSV-Parser-Endpunkt erzeugt reviewbare `ImportRow`-Rohdaten aus gespeicherten ImportJobs
- Phase C7: XLSX-Parser-Endpunkt erzeugt reviewbare `ImportRow`-Rohdaten aus dem ersten sichtbaren Worksheet gespeicherter ImportJobs
- Phase C8: Expliziter Mapping-Endpunkt befuellt `ImportJob.mapping_json` und `ImportRow.mapped_data_json` aus reviewbaren Rohdaten
- Phase C9: Minimaler Validierungs-Endpunkt bewertet gemappte `ImportRow`-Daten und setzt reviewbare Row-/Job-Status
- Phase C10: Zielobjekt-Endpunkt erzeugt `ProcurementHistoryItem` aus validierten gemappten `ImportRow`-Daten und setzt idempotente Row-Referenzen
- Phase C11: Derselbe Zielobjekt-Endpunkt erzeugt `RequestItem` aus validierten gemappten `ImportRow`-Daten mit defensiver Titelableitung und idempotenten Row-Referenzen
- Phase C12: Read-only-Frontend fuer ImportJobs und ImportRows unter `/imports` und `/imports/[id]` umgesetzt
- Phase C13: Upload-Frontend fuer CSV-/XLSX-ImportJobs unter `/imports/new` mit Redirect in die Read-only-Detailansicht umgesetzt
- Phase C14: Parse-Aktion fuer pending CSV-/XLSX-ImportJobs in `/imports/[id]` mit anschliessender Row-Reviewanzeige umgesetzt
- Phase C15: Explizite Mapping-Aktion fuer parsed ImportJobs in `/imports/[id]` mit sichtbarer Mapping-Konfiguration und gemappten Row-Daten umgesetzt
- Frontend-Nutzbarkeitsflow Issue #66: SupplierProfiles sind unter `/suppliers` anlegbar und bearbeitbar sowie als strukturierter Lieferantenbezug in Projekten nutzbar
- Frontend-Nutzbarkeitsflow Issue #69: RequestItems sind unter `/request-items` anlegbar und bearbeitbar sowie als strukturierte Anfrageposition in Projekten nutzbar
- Frontend-Hardening Issue #73: Frontend-Server-Actions weisen fehlende oder leere Pflichtfelder ueber einen gemeinsamen `FormData`-Helper mit nachvollziehbarer Meldung zurueck

Der aktuelle MVP-Workflow lautet:

`Company -> Profile -> Project -> Knowledge Base -> Imports -> Analysis -> Strategy -> Simulation Scenario Configuration -> Trainerreview`

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

- vollstaendig produktiver Dateiimport inklusive kompletter Processing-/Review-Automation; CSV-/XLSX-Upload, manueller Parse-Start und explizites Mapping fuer ImportJobs sind als begrenzte Phase-C-Strecke vorhanden
- Validate- und Create-Targets-UI fuer ImportJobs
- PDF-/OCR-Parsing und semantische Dokumentverarbeitung; technisches CSV-/XLSX-Parsing fuer ImportJobs ist bereits vorhanden
- KI-gestuetztes Mapping
- automatische Analyse oder Strategieerzeugung
- Zielobjekt-Erzeugung aus Importdaten fuer andere Zieltypen als die in C10/C11 implementierten `ProcurementHistoryItem` und `RequestItem`
- semantische Dokumentintelligenz mit Embeddings
- automatische Claim-Extraktion
- produktive Simulation
- Chat, Voice und Streaming
- automatische Auswertung, Score-Engine und Zertifikatslogik
- Lernhistorie
- komplexe Rechteverwaltung und Admin-Konsole
- produktive Enterprise-Import-/ERP-Integration
- Relationship Memory als eigenes Modul
- Stakeholder-Graph
- automatische Angebotsanalyse

Diese Punkte bleiben spaetere Ausbaustufen und duerfen nicht als bereits gelieferte MVP-Funktionen bewertet werden.

## 8. Phase C: Upload und Import

Status: Begonnen. C1 bis C15, die Frontend-Nutzbarkeitsflows aus Issues #66 und #69 sowie die Frontend-Hardening-Nacharbeit aus Issue #73 sind umgesetzt.

Ziel: Die Datenbasis des MVP praktisch befuellbar machen. Dabei sollen Upload, Dateiablage, ImportJobs, Parsing, Mapping, Validierung und Zielobjekt-Erzeugung schrittweise umgesetzt werden.

Schritte:

1. C1 abgeschlossen: Upload-/Import-Architektur und API-Kontrakt in `docs/upload-import-api-contract.md` vorbereitet.
2. C2 abgeschlossen: Konfigurierbare lokale Dateiablage und Storage-Service mit sicheren Keys, Dateityp-Regeln, Pruefsumme und Groessenlimit vorbereitet.
3. C3 abgeschlossen: KnowledgeDocument-Upload-Endpunkt mit sicherer Storage-Ablage und Pending-Startzustand implementiert.
4. C4 abgeschlossen: ImportJob-Upload-Endpunkt mit sicherer Storage-Ablage und Pending-Startzustand ohne Parsing implementiert.
5. C5 abgeschlossen: ImportJob-Status-/Review-Kontrakt, Rohdatenvertrag, Fehlergrenzen und Parser-Vorbereitung in `docs/import-job-processing-contract.md` dokumentiert.
6. C6 abgeschlossen: `POST /api/import-jobs/{id}/parse` liest gespeicherte CSV-Dateien technisch und erzeugt atomar ausschliesslich pruefbare `ImportRow`-Rohdaten.
7. C7 abgeschlossen: Derselbe Parse-Endpunkt liest gespeicherte XLSX-Dateien mit separatem technischen Parser und erzeugt aus dem ersten sichtbaren Worksheet ausschliesslich pruefbare `ImportRow`-Rohdaten mit Sheet-Kontext.
8. C8 abgeschlossen: `POST /api/import-jobs/{id}/map` wendet ein explizites Mapping auf geparste CSV-/XLSX-Rohdaten an und befuellt ausschliesslich `mapping_json` und `mapped_data_json`.
9. C9 abgeschlossen: `POST /api/import-jobs/{id}/validate` bewertet gemappte Werte mit einem minimalen Regelsatz, setzt Row-Status, Job-Zaehler und eine Validierungszusammenfassung, ohne Zielobjekte anzulegen.
10. C10 abgeschlossen: `POST /api/import-jobs/{id}/create-targets` erzeugt fuer validierte `procurement_history_item`-Jobs echte `ProcurementHistoryItem`-Datensaetze aus `mapped_data_json`, setzt Row-Zielreferenzen und verhindert erneute Erzeugung bereits importierter Rows.
11. C11 abgeschlossen: Derselbe Create-Targets-Endpunkt erzeugt fuer validierte `request_item`-Jobs echte `RequestItem`-Datensaetze aus `mapped_data_json`, leitet bei Bedarf `title` aus `article_name` ab und belaesst den Modell-Defaultstatus `open`.
12. C12 abgeschlossen: `/imports` und `/imports/[id]` stellen bestehende ImportJobs, Status-, Mapping-/Validierungs- und Row-Reviewdaten rein lesend dar und verlinken die Ansicht aus der Navigation.
13. C13 abgeschlossen: `/imports/new` nimmt `.csv`- und `.xlsx`-Dateien mit Company, optionalem Project, `source_type` und `target_entity` als ImportJob entgegen und leitet nach erfolgreichem Upload auf `/imports/[id]` weiter; Processing-Aktionen bleiben ausserhalb der UI.
14. C14 abgeschlossen: `/imports/[id]` bietet fuer `pending`-Jobs ausschliesslich den Parse-Start an, aktualisiert nach Erfolg Status, Zaehler und vorhandene ImportRows fuer Review und zeigt API-Fehler nachvollziehbar an.
15. C15 abgeschlossen: `/imports/[id]` bietet fuer `parsed`-Jobs ein explizites Zielfeld-zu-Quellspalte-Mapping aus den geparsten Raw-Feldern an, startet `POST /api/import-jobs/{id}/map` und zeigt anschliessend `mapping_json` sowie `mapped_data_json` im bestehenden Review.
16. Frontend Issue #66 abgeschlossen: `/suppliers` und `/suppliers/[id]` bilden SupplierProfile-Liste sowie Create/Edit-Flow ab; Projektformular und Projektdetail machen den strukturierten Lieferantenbezug erreichbar und sichtbar.
17. Frontend Issue #69 abgeschlossen: `/request-items` und `/request-items/[id]` bilden RequestItem-Liste sowie Create/Edit-Flow ab; Projektformular und Projektdetail machen die strukturierte Anfrageposition erreichbar und sichtbar.
18. Frontend Issue #73 abgeschlossen: Ein gemeinsamer `FormData`-Helper trimmt Formularstrings und bricht Pflichtfelder in Server Actions bei fehlenden oder leeren Werten mit feldbezogenem Fehler ab.

Wichtige Hinweise aus der MVP-Abnahme fuer Phase C:

- SupplierProfile-Frontend-Flow wurde mit Issue #66 ergaenzt, damit Lieferanteninformationen als strukturierter Projektbezug nutzbar sind.
- RequestItem-Frontend-Flow wurde mit Issue #69 ergaenzt, damit importierte Anfragenkataloge als strukturierte Projektbezuege im Frontend nutzbar sind.
- Die Importlogik soll nicht als grosser Block umgesetzt werden, sondern in klar getrennten Schritten: Upload, Storage, ImportJob, Parsing, Mapping, Validierung, Zielobjekt-Erzeugung.

Naechster sinnvoller Schritt:

1. Naechsten fachlichen Schritt separat priorisieren.

### Manuelle Pruefhilfe C13

- `/imports` oeffnen und den Einstieg `ImportJob hochladen` pruefen.
- `/imports/new` oeffnen.
- Das Upload-Formular mit fehlenden Pflichtfeldern absenden und nachvollziehbare Fehler pruefen.
- Eine gueltige CSV-Datei mit `source_type=csv` und passender `target_entity` hochladen.
- Eine gueltige XLSX-Datei mit `source_type=excel` und passender `target_entity` hochladen.
- Nach jedem erfolgreichen Upload den Redirect auf `/imports/[id]` pruefen.
- In `/imports` pruefen, ob die neuen Jobs sichtbar sind.
- Sicherstellen, dass keine Validate-/Create-Targets-Buttons sichtbar sind.

### Manuelle Pruefhilfe C14

- Eine CSV-Datei ueber `/imports/new` hochladen.
- Auf `/imports/[id]` pruefen, ob der Job im Status `pending` angezeigt wird und die Aktion `ImportJob parsen` sichtbar ist.
- Die Parse-Aktion ausloesen und nach Erfolg pruefen, ob Status und Zaehler aktualisiert sowie erzeugte ImportRows mit Roh- und Reviewdaten sichtbar sind.
- Eine XLSX-Datei ueber `/imports/new` hochladen und denselben Parse-Test ausfuehren; bei den ImportRows insbesondere den Sheet-Kontext pruefen.
- Bei einem nicht mehr `pending` Job pruefen, dass keine Parse-Aktion angeboten wird und stattdessen eine Statusinformation erscheint.
- Sicherstellen, dass keine Validate-/Create-Targets-Buttons sichtbar sind.

### Manuelle Pruefhilfe C15

- Eine CSV-Datei ueber `/imports/new` hochladen, parsen und pruefen, ob `ImportRows.raw_data_json` sichtbar sind.
- Bei Status `parsed` das Mapping-Formular nutzen und fuer `target_entity=procurement_history_item` die angebotenen Zielfelder explizit auf vorhandene Quellfelder mappen.
- Das Mapping ausloesen und pruefen, ob der Job danach `mapped` meldet sowie `mapping_json` und `ImportRow.mapped_data_json` sichtbar sind; Raw-Daten bleiben sichtbar.
- Eine XLSX-Datei beziehungsweise einen `request_item`-Import ueber dieselbe Upload-, Parse- und Mapping-Strecke pruefen.
- Bei einem nicht `parsed` Job pruefen, dass keine Mapping-Aktion angeboten wird und stattdessen eine Statusinformation erscheint.
- Sicherstellen, dass keine Validate-/Create-Targets-Buttons sichtbar sind.

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
