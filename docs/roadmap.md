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
- Phase C16: Validate-Aktion fuer mapped ImportJobs in `/imports/[id]` mit sichtbarer Summary und Row-Validierung umgesetzt
- Phase C17: Create-Targets-Aktion fuer validated ImportJobs in `/imports/[id]` mit sichtbaren Zielreferenzen umgesetzt
- Phase C18: ImportJob-Liste nach `updated_at DESC` sortiert, damit zuletzt bearbeitete Jobs oben erscheinen
- Phase C19: Completed-Hinweis bei `Zielobjekte erzeugen` verbessert und erzeugte Zielreferenzen fachlich klarer eingeordnet
- Phase C20: ImportJob-Detailseite als Stepper-Flow geglaettet, damit Parse, Mapping, Validierung, Zielobjekte und Ergebnis als Prozess sichtbar sind
- Phase C21: Frontend-Lint-Script stabilisiert und auf konkrete App-/Config-Pfade begrenzt
- Phase C23: Aus einer `RequestItem`-Detailseite kann ein vorausgefuelltes `NegotiationProject` erzeugt und direkt geoeffnet werden
- Phase C24: Project-Detailseite zeigt nach RequestItem-Initialisierung den Bezug, uebernommene Bedarfsdaten und den naechsten sinnvollen Arbeitsschritt klarer an
- Phase D3.1: Project-Detailseite zeigt eine kompakte Supplier Context Card aus dem verknuepften `SupplierProfile` mit Empty State und Link zum vollstaendigen Lieferantenprofil
- Phase D0: Hostinger-VPS-Staging-Deployment ist repo-seitig vorbereitet: separates Staging-Compose, Beispiel-Env, Reverse-Proxy-Empfehlung, persistente Volumes und Backup-Grundidee sind in `docs/staging-deployment-prep.md` dokumentiert
- Phase D1.1: Hostinger-Staging ist serverseitig erfolgreich bereitgestellt und unter `https://negotiation.tools.hawkins-consulting.de` ueber Caddy/Authelia geschuetzt erreichbar
- Phase D1.2: Der erfolgreiche Hostinger-Staging-Stand ist in `docs/deployment/hostinger-staging.md` ohne serverlokale Secrets dokumentiert
- Phase D1.3: Das Backend-Docker-Image enthaelt `alembic.ini` und `alembic/`, damit Migrationen im Backend-Container reproduzierbar ohne hostseitige Alembic-Bind-Mounts laufen
- Phase D1.4: Das Frontend-Docker-Image baut Next.js reproduzierbar als `output: "standalone"`-Production-Image und startet in Staging den Standalone-Server statt eines Dev- oder Runtime-Build-Kommandos
- Phase D1.5: Eine kleine Staging-Demo-Datenstrategie ist in `docs/deployment/staging-demo-data.md` dokumentiert; ein idempotenter Backend-Seed stellt Company, RequestItem und NegotiationProject fuer den Rheinwerk-Robotics-Demo-Flow bereit
- Phase D3.2: Dokumentations-Guardrails fuer Roadmap- und Codex-Task-Pruefung sind im Issue-Template, in `docs/codex-tasks.md` und als nicht-blockierende PR-Warnung ergaenzt
- Phase D3.4: Der Staging-Demo-Seed stellt ein synthetisches SupplierProfile fuer `Aurum Motion Systems K.K.` sicher und verknuepft das Rheinwerk-Robotics-Demo-Projekt damit, sodass die Supplier Context Card inklusive Profil-Link demonstrierbar ist
- Phase D3.5: Staging-Smoke-Test fuer den verknuepften Supplier Context bestanden
- Phase D3.6: Die Supplier Context Card zeigt kompakte Readiness-/Missing-Information-Hints aus vorhandenen `SupplierProfile`-Daten, ohne Scoring, KI, Backend- oder Seed-Aenderungen
- Phase D3.7: Staging-Smoke-Test fuer Supplier Readiness Hints bestanden
- Phase D3.8: Die Supplier Context Card zeigt bei verknuepftem `SupplierProfile` einen ruhigen Edit-Guidance-CTA zum bestehenden Lieferantenprofil, damit fehlende Vorbereitungsinformationen gezielt nachgepflegt werden koennen
- Phase D3.9: Staging-Smoke-Test fuer Edit Guidance bestanden
- Phase D3.10: D3 Supplier Context ist als erster UX-Strang vorlaeufig dokumentarisch abgeschlossen; D4 ist nur als moegliche spaetere Project-Preparation-/Preparation-Gaps-Richtung abgegrenzt
- Phase D4.1: Project-Detailseite zeigt eine kompakte Preparation Gaps Card aus vorhandenen Project-, RequestItem-, SupplierProfile-, Strategy-, SimulationScenario- und TrainerComment-Daten, ohne Backend, Migration, KI, Scoring oder neues Datenmodell
- Phase D4.2: Die Preparation Gaps Card fuehrt klarer zum bestehenden Strategie-Einstieg, priorisiert bei fehlender Strategie den Strategie-Kopf vor Strategiebausteinen und betont, dass keine Strategie automatisch erzeugt wird
- Phase D4.3: Der bestehende Strategy-Einstieg mit `projectId` zeigt bei Projekten ohne Strategie einen ruhigen Empty State und fuehrt zur manuellen Strategieanlage, ohne automatische Strategieerzeugung
- Phase D4.4: D4.1 bis D4.3 sind als D4-Preparation-UX-Zwischenstand inklusive kompaktem Smoke-Test-Plan dokumentiert
- Phase D5.1: Nach manueller Strategieanlage aus `/strategy?projectId=...` zeigt der bestehende Strategy-Flow eine Success Guidance mit Rueckweg zum Projekt und ordnet ZOPA, BATNA, Argumente und Konzessionen als nachgelagerte Schritte ein
- Phase D5.2: Bei vorhandener Strategie zeigt der bestehende Strategy-Flow eine kompakte Building-Blocks-Guidance fuer ZOPA, BATNA, Argumente und Konzessionen mit Status aus vorhandenen Bausteinen, ohne automatische Erzeugung
- Phase D5.3: Die bestehende Strategy-Guidance ordnet WAP / Walk-away Point als manuelle Abbruchgrenze zwischen BATNA, ZOPA und Konzessionen ein, ohne Berechnung, Backend, Migration oder Datenmodell-Aenderung
- Phase D5.4: Die MVP-Workflow-Sidebar nennt WAP im Strategie-Menuepunkt und nutzt konsistente lesbare Normal-, Hover- und Active-States fuer die Navigation
- Phase D5.5: Lokaler Browser-Smoke-Test fuer D5.1 bis D5.4 bestanden und als Strategy-Guidance-Zwischenabschluss dokumentiert
- Phase D5.6: Hostinger-Staging auf `46b045f` aktualisiert und D5-Strategy-Guidance-Flow browserseitig auf Staging bestanden dokumentiert
- Phase D6.1: Strategy-Formularfelder, Pflichtfeldsignale, Placeholder und Hilfetexte fuer Strategy Objectives, ZOPA, BATNA, WAP, Konzessionen und Argumente fachlich geschaerft
- Phase D6.2: Lokaler Browser-Smoke-Test fuer die D6.1-Strategy-Field-Guidance mit laufendem Backend, Frontend und DB bestanden dokumentiert
- Phase D6.3: Hostinger-Staging auf `59e293d` aktualisiert und D6.1/D6.2-Strategy-Field-Guidance browserseitig auf Staging bestanden dokumentiert
- Phase D7.1: Die Strategy-Seite zeigt eine regelbasierte Completion-/Readiness-Guidance fuer Strategy Objectives, ZOPA, BATNA, WAP, Konzessionen und Argumente, ohne Score, KI, Backend, Migration oder neue Persistenz
- Phase D7.2: Lokaler Browser-Smoke-Test fuer die D7.1-Strategy-Readiness-Guidance mit drei Fuellstaenden, `/strategy`, `/strategy?projectId=...`, Mobile-Spotcheck und Console-Check bestanden dokumentiert
- Phase D7.3: Hostinger-Staging auf aktuellen `origin/main`-Stand gebracht und die Strategy Readiness Guidance dort browserseitig mit drei Readiness-Zustaenden, Healthchecks, Alembic-Stand, D6-Feldfuehrung, Save-Verhalten, Mobile-Spotcheck und Console-Check bestanden dokumentiert
- Phase D8.1: Bei Strategy-Readiness `Bereit fuer Briefing / Simulation` zeigt die Strategy-Seite eine kompakte Next-Action-Guidance fuer Briefing-, Simulations- und Trainerreview-Vorbereitung; die generische Briefing-Placeholder-Route bleibt unverlinkt, Simulation und Trainerreview nutzen nur bestehende Vorbereitungsrouten
- Phase D8.2: Lokaler Browser-Smoke-Test fuer die D8.1 Strategy Next-Action-Guidance bestanden dokumentiert; drei Readiness-Zustaende, Briefing-Grenze, projektbezogene Simulation-/Trainerreview-Routen, D6-/D7-Feldfuehrung, Mobile-Breite und Console wurden geprueft
- Phase D8.3: Hostinger-Staging auf `2aa47a2` aktualisiert und Strategy Next-Action-Guidance dort browserseitig geprueft; vollstaendiger Readiness-Zustand, Briefing-Coming-next-Abgrenzung, projektbezogene Simulation-/Trainerreview-Routen, `/strategy`, Mobile, Console, Healthchecks und Alembic Head sind dokumentiert
- Phase D8.4: D8 als kleiner Strategy-Readiness-zu-Next-Action-Uebergangsblock dokumentarisch abgeschlossen; D9 als moeglicher naechster kleiner Block `Briefing Preparation` abgegrenzt, ohne KI-Briefing, Simulation, Trainerreview-Logik, Backend, Migration, Seed, Env oder Staging-Aenderung
- Phase D9.1: `/briefing` ist als Briefing-Preparation-Einstieg fachlich geglaettet; der Schritt wird nach Strategy Readiness eingeordnet, spaetere Briefing-Bausteine sind sichtbar und KI-Briefing, Simulation sowie Trainerreview bleiben klar nicht implementiert
- Issue #146: Codex-Arbeitsanweisungen sind getrennt: die ausfuehrliche Projektsteuerung bleibt in `docs/skills/negotiation-tools-dev-workflow/SKILL.md`, die kompakte operative Codex-Anweisung liegt als `CODEX.md` im Repository-Root
- C17-Browser-Smoke-Test in `docs/browser-smoke-test-plan.md` dokumentiert: bestanden fuer `request_item` und `procurement_history_item`, ohne Blocker
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
- Supplier Context schrittweise im Project-Detail und anschliessenden Analyse-, Strategie-, Briefing- und Simulationsflows ausbauen, ohne automatische Analyse oder neues Datenmodell vorzuziehen.
- Vollstaendig formulierte Issues duerfen mit kompakten Codex-Prompts umgesetzt werden; `CODEX.md` ist dafuer die operative Kurzanweisung, waehrend die Projekt-SKILL die ausfuehrliche Steuerungslogik behaelt.

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

- vollstaendig produktiver Dateiimport inklusive kompletter Processing-/Review-Automation; CSV-/XLSX-Upload, manueller Parse-Start, explizites Mapping, Validierung und explizite Create-Targets-Aktion fuer ImportJobs sind als begrenzte Phase-C-Strecke vorhanden
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
- Supplier Scoring, automatische Lieferantenanalyse, RAG oder KI-generierte Supplier-Context-Bewertung; D3 zeigt nur vorhandene `SupplierProfile`- und Projektbeziehungen kompakt an und ergaenzt daraus Readiness-Hints sowie Edit-Guidance
- produktiver Betrieb, echte Serverprovisionierung, Domain-/DNS-Konfiguration, CI/CD und produktive Authentifizierung; D0 dokumentiert nur die Staging-Vorbereitung ohne echtes Deployment

Diese Punkte bleiben spaetere Ausbaustufen und duerfen nicht als bereits gelieferte MVP-Funktionen bewertet werden.

## 8. Phase C: Upload und Import

Status: Fortgeschritten und fuer den begrenzten MVP-Importflow fachlich nutzbar. C1 bis C21, C23, C24, die Frontend-Nutzbarkeitsflows aus Issues #66 und #69 sowie die Frontend-Hardening-Nacharbeit aus Issue #73 sind umgesetzt. Der C17-Browser-Smoke-Test ist bestanden und in `docs/browser-smoke-test-plan.md` dokumentiert.

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
16. C16 abgeschlossen: `/imports/[id]` bietet fuer `mapped`-Jobs `POST /api/import-jobs/{id}/validate` als explizite Aktion an und zeigt nach Erfolg `validation_summary_json`, Row-Validierungsstatus sowie Row-Fehler-/Warnmeldungen im bestehenden Review; Create-Targets wird nicht angeboten.
17. C17 abgeschlossen: `/imports/[id]` bietet fuer `validated`-Jobs `POST /api/import-jobs/{id}/create-targets` als explizite Aktion an, aktualisiert nach Erfolg Status, Zaehler und ImportRows und verlinkt erzeugte `request_item`-Zielreferenzen auf `/request-items/{id}`; fuer `procurement_history_item` wird ohne vorhandene Detailroute kein Link erzeugt.
18. C18 abgeschlossen: `/imports` listet ImportJobs nach `updated_at DESC`, damit neu angelegte oder zuletzt verarbeitete Jobs zuerst sichtbar sind.
19. C19 abgeschlossen: `/imports/[id]` zeigt bei `completed` und `completed_with_errors` einen klareren Abschluss-Hinweis fuer `Zielobjekte erzeugen`; erzeugte Zielreferenzen bleiben in den ImportRows nachvollziehbar.
20. C20 abgeschlossen: `/imports/[id]` fuehrt einen Stepper fuer den Importprozess ein und macht aktuellen Schritt, erledigte Schritte, offene Schritte sowie Fehlerzustand sichtbar.
21. C21 abgeschlossen: Das Frontend-Lint-Script wurde auf konkrete Quell- und Config-Pfade stabilisiert, damit generierte oder lokale Duplikatdateien nicht versehentlich den Lint-Lauf stoeren.
22. Frontend Issue #66 abgeschlossen: `/suppliers` und `/suppliers/[id]` bilden SupplierProfile-Liste sowie Create/Edit-Flow ab; Projektformular und Projektdetail machen den strukturierten Lieferantenbezug erreichbar und sichtbar.
23. Frontend Issue #69 abgeschlossen: `/request-items` und `/request-items/[id]` bilden RequestItem-Liste sowie Create/Edit-Flow ab; Projektformular und Projektdetail machen die strukturierte Anfrageposition erreichbar und sichtbar.
24. Frontend Issue #73 abgeschlossen: Ein gemeinsamer `FormData`-Helper trimmt Formularstrings und bricht Pflichtfelder in Server Actions bei fehlenden oder leeren Werten mit feldbezogenem Fehler ab.
25. C23 abgeschlossen: `/request-items/[id]` bietet die Aktion `Verhandlungsprojekt erstellen`; die Server Action erzeugt ein `NegotiationProject` aus der Anfrageposition und leitet nach erfolgreicher Erstellung auf `/projects/[id]` weiter.
26. C24 abgeschlossen: `/projects/[id]` zeigt den RequestItem-Bezug, zentrale uebernommene Bedarfsdaten und den Kontext als lesbare Zusammenfassung; eine kleine Orientierung benennt als naechsten Schritt die Pruefung der Projektdaten und anschliessende Analyse- oder Strategievorbereitung.

Wichtige Hinweise aus der MVP-Abnahme fuer Phase C:

- SupplierProfile-Frontend-Flow wurde mit Issue #66 ergaenzt, damit Lieferanteninformationen als strukturierter Projektbezug nutzbar sind.
- RequestItem-Frontend-Flow wurde mit Issue #69 ergaenzt, damit importierte Anfragenkataloge als strukturierte Projektbezuege im Frontend nutzbar sind.
- Die Importlogik soll nicht als grosser Block umgesetzt werden, sondern in klar getrennten Schritten: Upload, Storage, ImportJob, Parsing, Mapping, Validierung, Zielobjekt-Erzeugung.
- Die derzeit statischen Mapping-Zielfeldlisten im Frontend sollten mittelfristig zentralisiert oder aus Backend-/Contract-Metadaten abgeleitet werden, damit Frontend und Backend nicht auseinanderlaufen. Dies ist kein Refactoring-Bestandteil von C16.
- Die nicht-blockierenden UX-Follow-ups aus dem C17-Browser-Smoke-Test sind mit C18 bis C20 abgeschlossen.
- C21 stabilisiert den Frontend-Lint-Lauf nach den beobachteten lokalen Google-Drive-Duplikaten, ohne generierte Dateien einzubeziehen oder neue Artefakte zu erzeugen.

### Aktueller fachlicher Stand nach C23

Der Import-/Zielobjekt-Workflow ist als begrenzte, manuell ausgeloeste Phase-C-Strecke nutzbar:

- CSV- und XLSX-Dateien koennen als ImportJob hochgeladen werden.
- Die Verarbeitung bleibt bewusst in getrennten Schritten: Parse, Mapping, Validierung und Zielobjekt-Erzeugung.
- Validierte `procurement_history_item`-Rows erzeugen echte `ProcurementHistoryItem`-Datensaetze.
- Validierte `request_item`-Rows erzeugen echte `RequestItem`-Datensaetze.
- ImportRows zeigen Zieltyp und Ziel-ID; `request_item`-Zielreferenzen verlinken in das Frontend.
- ImportJob-Liste und ImportJob-Detailseite sind fuer Review und Prozesssteuerung ausreichend nutzbar.

Frontend-nutzbar sind derzeit:

- `/imports`, `/imports/new` und `/imports/[id]` fuer Upload, Review und manuelle Verarbeitung.
- `/request-items` und `/request-items/[id]` fuer Anlage, Bearbeitung und Sichtung strukturierter Anfragepositionen.
- `/suppliers` und `/suppliers/[id]` fuer strukturierte Lieferantenprofile.
- `/projects` und `/projects/[id]` fuer manuelle Anlage und Bearbeitung von Verhandlungsprojekten inklusive Auswahl vorhandener SupplierProfiles und RequestItems.
- `/request-items/[id]` kann aus einer bestehenden Anfrageposition direkt ein neues, vorausgefuelltes Verhandlungsprojekt starten.
- `/projects/[id]` macht bei verknuepften Anfragepositionen den Ursprung sowie zentrale RequestItem-Bedarfsdaten wie Titel, Artikel, Kategorie, Menge, Liefertermin, Zielpreis, Budgetrahmen, Zielregion, Prioritaet, Beschreibung, Spezifikation und Notizen lesbar sichtbar.
- `/projects/[id]` zeigt bei verknuepftem SupplierProfile eine kompakte Supplier Context Card mit Lieferant, Land/Region, Branche/Kategorie, Beziehung, Verhandlungssignalen, kulturellem Kontext, vorbereitungsorientierten Readiness-/Missing-Information-Hints sowie einem ruhigen Edit-Guidance-CTA und Link zum vollstaendigen Profil; ohne verknuepftes SupplierProfile erscheint ein ruhiger Empty State.
- `/projects/[id]` zeigt zusaetzlich eine kompakte Preparation Gaps Card, die Bedarfskontext, Lieferantenprofil, Supplier Context, Strategie, Strategiebausteine, Simulation und Trainerreview als vorhanden, offen oder optional spaeter pruefbar einordnet. Bei fehlender Strategie fuehrt sie zuerst zum bestehenden Strategie-Einstieg und ordnet Strategiebausteine nachgelagert ein.
- `/strategy?projectId=...` zeigt bei vollstaendiger Readiness eine kompakte Next-Action-Guidance, die Briefing als Coming-next einordnet und die bestehenden Vorbereitungsbereiche fuer Simulation und Trainerreview verlinkt. `/briefing` ist mit D9.1 als fachlich klarer Briefing-Preparation-Einstieg geglaettet, bleibt aber ohne automatische KI-Briefing-Erzeugung und ohne projektbezogene Folgeprozesslogik.
- Projektbezogene Einstiege in Datenbasis, Analyse, Strategie, Simulation und Trainerreview.

Mapping in C23:

- `company_id` wird aus dem `RequestItem` uebernommen.
- `request_item_id` referenziert die Ausgangs-Anfrageposition.
- `title` wird als `Verhandlung: <article_name|title>` abgeleitet.
- `category`, `quantity`, `target_region`, `currency` und `priority` werden aus gleichwertigen RequestItem-Feldern uebernommen.
- `article_or_service` nutzt `article_name` oder faellt auf den RequestItem-Titel zurueck.
- `desired_delivery_time` nutzt `target_delivery_time` oder alternativ `required_delivery_date`.
- `internal_price_expectation` nutzt `target_price` oder alternativ `rough_price_expectation`.
- `context` sammelt vorhandene Beschreibung, Spezifikation, benoetigtes Lieferdatum, Einheit und Kommentar.
- `status` bleibt der bestehende Projekt-Default `draft`; zusaetzlich dokumentiert `metadata_json` die Initialisierung aus einem RequestItem.

Bewusste Grenzen in C23:

- Keine Backend-Migration, weil `request_item_id` und die benoetigten Projektfelder bereits existieren.
- Keine automatische Supplier-, Owner-, Strategie-, Analyse- oder Simulationsanlage.
- Der manuelle Projektanlage- und Bearbeitungsflow unter `/projects` bleibt unveraendert.

Glaettung in C24:

- Die Project-Detailseite stellt die verknuepfte Anfrageposition im Abschnitt `Anfrageposition / Bedarfskontext` zusaetzlich zum Bearbeitungsformular als lesbare Zusammenfassung dar.
- Der RequestItem-Bezug bleibt verlinkt, wenn eine verknuepfte Anfrageposition vorhanden ist; falls die Listenansicht den Datensatz nicht enthaelt, wird der verknuepfte RequestItem direkt nachgeladen.
- Beschreibung, Spezifikation, Notizen und der Projektkontext werden mit Zeilenumbruechen lesbar angezeigt.
- Bewusst unveraendert bleiben die RequestItem-zu-Project-Erzeugungslogik, automatische Supplier-Zuordnung sowie Analyse-, Strategie-, ZOPA-, BATNA- oder WAP-Erzeugung.

D3 Supplier Context:

- Die Project-Detailseite stellt den verknuepften SupplierProfile-Kontext als eigene Supplier Context Card zwischen Verhandlungsvorbereitung und Strategie-Snapshot dar.
- Die Karte nutzt ausschliesslich vorhandene Project- und SupplierProfile-Daten und fuehrt keine automatische Lieferantenanalyse, kein Supplier Scoring, keine KI-Generierung und kein neues Datenmodell ein.
- Bei verknuepftem SupplierProfile zeigt sie Lieferant, Land/Region, Branche/Kategorie, Beziehung, Verhandlungssignale und kulturellen Kontext, soweit gepflegt.
- Bei fehlendem SupplierProfile zeigt sie einen ruhigen Empty State, damit fehlender Lieferantenkontext nicht wie ein Fehler wirkt.
- Der Link zum vollstaendigen SupplierProfile bleibt auf `/suppliers/[id]` verfuegbar.
- D3.6 ergaenzt Readiness-/Missing-Information-Hints aus vorhandenen Profilfeldern.
- D3.8 fuehrt mit einem Edit-Guidance-CTA zur Nachpflege im bestehenden Lieferantenprofil.
- D3.4 stellt die Staging-Demo-Readiness fuer `Aurum Motion Systems K.K.` und das Rheinwerk-Robotics-Demo-Projekt her; D3.5, D3.7 und D3.9 sind als Staging-Smoke-Tests bestanden.
- D3.10 schliesst diesen ersten Supplier-Context-UX-Strang vorlaeufig dokumentarisch ab.

Noch fehlende fachliche Luecken:

- Das Projektformular erlaubt zwar die Auswahl eines `RequestItem`, uebernimmt aber keine Bedarfsdaten automatisch in Projektfelder wie Titel, Artikel, Menge, Zielregion, Lieferzeit, Preisannahme oder Waehrung.
- Es gibt weiterhin keine Detailroute fuer `ProcurementHistoryItem`; deshalb bleiben Einkaufshistorie-Zielreferenzen in ImportRows bewusst unverlinkt.
- Mapping-Zielfeldlisten sind im Frontend weiterhin statisch und sollten spaeter zentralisiert oder aus Backend-/Contract-Metadaten abgeleitet werden.
- KI-Mapping, PDF/OCR, automatische Analyse- oder Strategieerzeugung bleiben Nicht-MVP beziehungsweise spaetere Phasen.
- Issue #55 bleibt fuer eine spaetere PDF-/Upload-/Parsing-Strecke offen und blockiert D3 nicht.
- Issue #113 bleibt als Next/PostCSS-audit-Finding zur Beobachtung offen und blockiert D3 nicht.

## 9. Phase D: Staging und Demo-Betrieb

Status: D0 abgeschlossen, D1.1 abgeschlossen, D1.2 umgesetzt, D1.3 umgesetzt, D1.4 umgesetzt, D1.5 umgesetzt.

Ziel: Den vorzeigbaren Demo-Flow aus Phase C auf eine geschuetzte Staging-/Demo-Instanz vorbereiten und spaeter auf einem Hostinger VPS KVM 2 betreiben.

Umgesetzte D0-Vorbereitung:

1. Das lokale `docker-compose.yml` wurde als Development-Setup eingeordnet.
2. Ein separates `docker-compose.staging.yml` wurde ergaenzt, weil Staging andere Startkommandos, keine Code-Bind-Mounts, intern gehaltene DB und nur lokal gebundene App-Ports braucht.
3. `.env.staging.example` dokumentiert die benoetigten Staging-Env-Werte ohne echte Secrets.
4. `.env.staging` und `.env.production` sind in `.gitignore` ausgeschlossen.
5. `docs/staging-deployment-prep.md` dokumentiert URL-Konfiguration, Caddy-Empfehlung, PostgreSQL-/Upload-Volumes, Backup-Grundidee und D1-Folgeschritte.

Umgesetzte D1-Schritte:

1. D1.1 abgeschlossen: Hostinger VPS KVM 2 mit Ubuntu 24.04 LTS ist bereitgestellt, Docker/Compose laufen, Caddy HTTPS und Authelia Login sind aktiv, die App ist unter `https://negotiation.tools.hawkins-consulting.de` erreichbar und der Demo-Flow `RequestItem -> NegotiationProject -> Project-Detailseite` wurde erfolgreich getestet.
2. D1.2 umgesetzt: `docs/deployment/hostinger-staging.md` dokumentiert den erfolgreichen Staging-Stand, Serverpfade, Compose-Nutzung, Caddy-/Authelia-Einbindung, Migrationen, Smoke-Test, Redeploy-Checkliste und bekannte Follow-ups ohne echte `.env.staging`-Werte.
3. D1.3 umgesetzt: Das Backend-Docker-Image kopiert `alembic.ini` und `alembic/` in `/app`, sodass `docker compose ... run --rm backend alembic upgrade head` ohne hostseitig gemountete Alembic-Dateien ausfuehrbar ist.
4. D1.4 umgesetzt: Das Frontend-Docker-Image nutzt einen Multi-Stage-Build fuer Next.js `output: "standalone"`, kopiert `.next/static` und `public/` in das Runtime-Image und startet in Staging den Standalone-Server mit `node server.js`.
5. D1.5 umgesetzt: `docs/deployment/staging-demo-data.md` definiert Scope, Demo-IDs, Marker, Idempotenz und Aktualisierungsstrategie fuer synthetische Staging-Demo-Daten. `python -m app.seeds.staging_demo --confirm-staging-demo` stellt im Backend-Container die Demo-Company, ein RequestItem und ein verknuepftes NegotiationProject sicher, ohne vorhandene Daten zu loeschen.

### Manuelle Pruefhilfe C13

- `/imports` oeffnen und den Einstieg `ImportJob hochladen` pruefen.
- `/imports/new` oeffnen.
- Das Upload-Formular mit fehlenden Pflichtfeldern absenden und nachvollziehbare Fehler pruefen.
- Eine gueltige CSV-Datei mit `source_type=csv` und passender `target_entity` hochladen.
- Eine gueltige XLSX-Datei mit `source_type=excel` und passender `target_entity` hochladen.
- Nach jedem erfolgreichen Upload den Redirect auf `/imports/[id]` pruefen.
- In `/imports` pruefen, ob die neuen Jobs sichtbar sind.
- Sicherstellen, dass vor dem Mapping keine Validate-Aktion und weiterhin keine Create-Targets-Aktion sichtbar ist.

### Manuelle Pruefhilfe C14

- Eine CSV-Datei ueber `/imports/new` hochladen.
- Auf `/imports/[id]` pruefen, ob der Job im Status `pending` angezeigt wird und die Aktion `ImportJob parsen` sichtbar ist.
- Die Parse-Aktion ausloesen und nach Erfolg pruefen, ob Status und Zaehler aktualisiert sowie erzeugte ImportRows mit Roh- und Reviewdaten sichtbar sind.
- Eine XLSX-Datei ueber `/imports/new` hochladen und denselben Parse-Test ausfuehren; bei den ImportRows insbesondere den Sheet-Kontext pruefen.
- Bei einem nicht mehr `pending` Job pruefen, dass keine Parse-Aktion angeboten wird und stattdessen eine Statusinformation erscheint.
- Sicherstellen, dass vor dem Mapping keine Validate-Aktion und weiterhin keine Create-Targets-Aktion sichtbar ist.

### Manuelle Pruefhilfe C15

- Eine CSV-Datei ueber `/imports/new` hochladen, parsen und pruefen, ob `ImportRows.raw_data_json` sichtbar sind.
- Bei Status `parsed` das Mapping-Formular nutzen und fuer `target_entity=procurement_history_item` die angebotenen Zielfelder explizit auf vorhandene Quellfelder mappen.
- Das Mapping ausloesen und pruefen, ob der Job danach `mapped` meldet sowie `mapping_json` und `ImportRow.mapped_data_json` sichtbar sind; Raw-Daten bleiben sichtbar.
- Eine XLSX-Datei beziehungsweise einen `request_item`-Import ueber dieselbe Upload-, Parse- und Mapping-Strecke pruefen.
- Bei einem nicht `parsed` Job pruefen, dass keine Mapping-Aktion angeboten wird und stattdessen eine Statusinformation erscheint.
- Sicherstellen, dass vor Status `mapped` keine Validate-Aktion und weiterhin keine Create-Targets-Aktion sichtbar ist.

### Manuelle Pruefhilfe C16

- Eine CSV-Datei ueber `/imports/new` hochladen, den Job parsen und mappen.
- Bei Status `mapped` die Aktion `ImportJob validieren` ausloesen.
- Nach Erfolg pruefen, ob Status `validated`, `validation_summary_json`, Row-Validierungsstatus sowie Row-Fehler-/Warnhinweise sichtbar beziehungsweise aktualisiert sind; Raw- und Mapped-Daten bleiben sichtbar.
- Einen `request_item`-Import beziehungsweise XLSX-Import mit derselben Upload-, Parse-, Mapping- und Validate-Strecke pruefen, soweit Testdaten vorhanden sind.
- Bei einem nicht `mapped` Job pruefen, dass keine Validate-Aktion angeboten wird und stattdessen eine Statusinformation erscheint.
- Sicherstellen, dass vor Status `validated` kein Create-Targets-Button sichtbar ist.

### Manuelle Pruefhilfe C17

- Einen CSV- oder XLSX-Import ueber `/imports/new` anlegen.
- ImportJob parsen.
- Mapping fuer `target_entity=request_item` durchfuehren.
- ImportJob validieren.
- Bei Status `validated` pruefen, ob die Create-Targets-Aktion sichtbar ist.
- Aktion ausloesen.
- Pruefen, ob die Detailseite danach aktualisiert ist und der Job `completed` oder `completed_with_errors` zeigt.
- Pruefen, ob valide Rows als importiert erscheinen und `target_entity` sowie `target_record_id` sichtbar sind.
- Bei `request_item` pruefen, ob der Link zum erzeugten RequestItem funktioniert.
- Einen Import mit `target_entity=procurement_history_item` analog pruefen; falls keine Detailroute existiert, darf keine kaputte Verlinkung entstehen.
- Sicherstellen, dass bei nicht validierten Jobs keine Create-Targets-Aktion sichtbar ist.
- Sicherstellen, dass C17 keine Backendlogik, keine Migration, keine PDF-/OCR-Logik, kein KI-Mapping und keine automatische Analyse eingefuehrt hat.

## 10. Phase D3: Supplier Context / Lieferantenkontext

Status: D3.1 bis D3.10 fuer den ersten Supplier-Context-UX-Strang umgesetzt beziehungsweise geprueft; Strang vorlaeufig abgeschlossen.

Ziel: Lieferantenkontext auf der Project-Detailseite verhandlungsnah nutzbar machen, ohne automatisch zu bewerten oder neue Datenmodelle vorzuziehen.

Umgesetzte D3-Schritte:

1. D3.1 abgeschlossen: `/projects/[id]` zeigt eine kompakte Supplier Context Card aus dem verknuepften `SupplierProfile`, inklusive Empty State ohne SupplierProfile und Link zum vollstaendigen Profil.
2. D3.4 umgesetzt: Der Staging-Demo-Seed erzeugt idempotent ein synthetisches Demo-SupplierProfile fuer `Aurum Motion Systems K.K.` und verknuepft das bestehende Rheinwerk-Robotics-Demo-Projekt ueber `supplier_profile_id`, ohne Migration, neue API oder Frontend-Aenderung.
3. D3.6 umgesetzt: Die bestehende Supplier Context Card zeigt eine kleine Sektion `Vorbereitungsstand Lieferant` mit maximal fuenf ruhigen Hints zu gepflegten oder gezielt nachpflegbaren Profilinformationen wie Region, Kategorie, Beziehung, Verhandlungssignalen und kulturellem Kontext.
4. D3.8 umgesetzt: Die Readiness-Sektion enthaelt bei verknuepftem `SupplierProfile` einen kompakten Edit-Guidance-CTA zum bestehenden Lieferantenprofil, damit fehlende Angaben dort nachgepflegt werden koennen.
5. D3.10 umgesetzt: Die Projektdokumentation ordnet D3 als vorlaeufig abgeschlossenen Supplier-Context-UX-Strang ein und grenzt D4 als moegliche, noch nicht begonnene Project-Preparation-/Preparation-Gaps-Richtung ab.

Ergebnis von D3:

- Vorhandener Lieferantenkontext wird auf der Project-Detailseite aus bestehenden Daten sichtbar.
- Readiness-/Missing-Information-Hints zeigen vorbereitungsrelevante Profilstaende ohne Bewertung.
- Edit-Guidance fuehrt zur Nachpflege im bestehenden SupplierProfile-Flow.
- Der Rheinwerk-/Aurum-Demo-Fall ist fuer diesen Scope auf Staging demonstrierbar.

Bewusste Grenzen von D3:

- Keine Backendaenderung.
- Keine Migration.
- Keine neuen API-Endpunkte.
- Keine neuen SupplierProfile-Felder.
- Kein neues Datenmodell.
- Keine automatische Analyse.
- Kein Supplier Scoring.
- Keine KI-Generierung.
- Keine RAG-/Knowledge-Auswertung.
- Keine Import-/PDF-Themen.

Offene Nicht-Blocker:

- Issue #55: PDF-Verarbeitung bleibt als spaetere Upload-/Parsing-Strecke offen.
- Issue #113: Next/PostCSS-audit-Finding bleibt zur Beobachtung offen.

## 11. Phase D4: Project Preparation / Preparation Gaps

Status: D4.1 bis D4.3 umgesetzt; D4.4 dokumentiert den aktuellen Zwischenstand und den manuellen Smoke-Test. D5.1 bis D5.4 sind umgesetzt; D5.5 dokumentiert den bestandenen lokalen Strategy-Guidance-Smoke-Test, D5.6 den bestandenen Staging-Update- und Smoke-Test. D6.1 schaerft die manuelle Strategy-Erfassung mit kleinen UI-/Text-/Validation-Verbesserungen. D6.2 bestaetigt diese Feldfuehrung lokal browserseitig mit laufendem Backend, Frontend und DB. D7.1 ergaenzt eine regelbasierte Strategy-Completion-/Readiness-Guidance. D7.2 bestaetigt diese Guidance lokal browserseitig mit drei Fuellstaenden. D8.1 ergaenzt daraus eine kompakte Next-Action-Guidance; D8.2 bestaetigt diese lokal browserseitig, D8.3 auf Staging mit dokumentierter Einschraenkung fuer die unteren Staging-Readiness-Zustaende. D8.4 schliesst D8 dokumentarisch ab und grenzt D9 `Briefing Preparation` als naechsten moeglichen kleinen Produktblock ab. D9.1 glaettet den bestehenden `/briefing`-Einstieg fachlich, ohne KI-Briefing- oder Folgeprozesslogik einzufuehren.

Ziel: Project-Detail-/Preparation-UX ausbauen, ohne automatische Bewertung oder neue Datenmodelle vorzuziehen.

Umgesetzte Schritte:

1. D4.1: Preparation Gaps Card auf der Project-Detailseite.
2. D4.2: Strategy Entry Guidance in der Preparation Gaps Card geschaerft.
3. D4.3: Strategy Entry Page fuer Projekte ohne Strategie geglaettet.
4. D4.4: D4-Preparation-UX-Zwischenabschluss und Smoke-Test-Plan dokumentiert.
5. D5.1: Success Guidance nach manueller Strategieanlage mit Rueckweg zum Projekt ergaenzt.
6. D5.2: Building-Blocks-Guidance fuer vorhandene Strategien ergaenzt.
7. D5.3: WAP / Walk-away Point als manuelle Abbruchgrenze fachlich eingeordnet.
8. D5.4: Sidebar-Beschreibung und Navigation-Kontrast fuer Strategie/WAP geglaettet.
9. D5.5: Lokalen Browser-Smoke-Test fuer den D5.1-D5.4-Flow dokumentiert.
10. D5.6: Hostinger-Staging auf aktuellen `origin/main`-Stand gebracht und denselben Strategy-Guidance-Flow dort browserseitig geprueft.
11. D6.1: Strategy-Felder, Pflichtfeldsignale, Placeholder und Hilfetexte fachlich geschaerft.
12. D6.2: Lokalen Browser-Smoke-Test fuer die D6.1-Strategy-Field-Guidance mit laufendem Backend, Frontend und DB dokumentiert.
13. D6.3: Hostinger-Staging auf aktuellen `origin/main`-Stand gebracht und die D6.1/D6.2-Strategy-Field-Guidance dort browserseitig geprueft.
14. D7.1: Strategy-Completion-/Readiness-Guidance fuer zentrale Strategiebausteine ergaenzt.
15. D7.2: Lokalen Browser-Smoke-Test fuer Strategy Readiness Guidance mit drei Fuellstaenden dokumentiert.
16. D7.3: Hostinger-Staging-Smoke-Test fuer Strategy Readiness Guidance mit drei Fuellstaenden dokumentiert.
17. D8.1: Strategy Next-Action-Guidance bei ausreichender Readiness ergaenzt.
18. D8.2: Lokalen Browser-Smoke-Test fuer Strategy Next-Action-Guidance dokumentiert.
19. D8.3: Hostinger-Staging-Smoke-Test fuer Strategy Next-Action-Guidance dokumentiert.
20. D8.4: D8-Zwischenabschluss und D9-Abgrenzung dokumentiert.
21. D9.1: Briefing-Preparation-Einstieg unter `/briefing` fachlich geglaettet.

D4.1 macht Vorbereitungsluecken ausschliesslich aus vorhandenen Objekten und bestehenden API-Listen sichtbar: Bedarfskontext, SupplierProfile, Supplier Context, Strategy, Strategiebausteine aus ZOPA/BATNA/Argumentation/Konzession, SimulationScenario und Trainerreview. Die Card bleibt eine ruhige Vorhanden-/Offen-/Spaeter-Sicht mit kurzem naechstem Schritt und fuehrt keine KI-Integration, kein Supplier Scoring, kein RAG, keine automatische Lieferantenanalyse und keine neue Datenstruktur ein.

D4.2 nutzt weiterhin den bestehenden Einstieg `/strategy?projectId=...`. Wenn noch keine Strategie vorhanden ist, verweist der naechste sinnvolle Schritt klar auf Strategiearbeit und stellt ZOPA, BATNA, Argumente und Konzessionen erst nach einer angelegten Strategie dar. Die Aenderung erzeugt keine Strategie automatisch, aendert keine Daten und fuehrt keine neue Route, kein Backend, keine Migration und kein neues Datenmodell ein.

D4.3 verbessert denselben bestehenden Strategy-Einstieg fuer Projekte ohne Strategie. `/strategy?projectId=...` zeigt nun einen ruhigen, projektbezogenen Empty State, erklaert die manuelle Strategieanlage, betont die fehlende automatische Erzeugung und ordnet ZOPA, BATNA, Argumente und Konzessionen als nachgelagerte Schritte ein. Der bestehende Anlage-Workflow bleibt unveraendert; es gibt keine neue Route, keine Backend-Aenderung, keine Migration und keine automatische Datenveraenderung.

D4.4 haelt diesen Zwischenstand als dokumentierten Preparation-UX-Flow fest: Project Detail -> Preparation Gaps Card -> Strategie vorbereiten -> Strategy Empty State -> Strategie manuell anlegen. Der Smoke-Test-Plan steht in `docs/browser-smoke-test-plan.md`. D4 bleibt weiterhin begrenzt auf Orientierung aus vorhandenen Daten; es gibt keine automatische Strategieerzeugung, keine KI-Analyse, kein Scoring, kein RAG, keine neuen Datenmodelle und keine Seed- oder Deployment-Aenderung.

D5.1 nutzt weiterhin den bestehenden Strategy-Create-Flow und die Route `/strategy?projectId=...`. Nach der manuellen Anlage redirectet der Flow auf dieselbe Strategy-Seite mit Success-Hinweis, macht klar, dass die Strategie angelegt wurde, bietet einen Rueckweg zu `/projects/<projectId>` und ordnet ZOPA, BATNA, Argumente und Konzessionen als nachgelagerte naechste Schritte ein. `/strategy` ohne `projectId` bleibt die allgemeine Projektauswahl; es gibt keine neue Route, keine Backend-Aenderung, keine Migration und keine automatische Strategieerzeugung.

D5.2 zeigt bei vorhandener Strategie eine kompakte Guidance fuer ZOPA, BATNA, Argumente und Konzessionen. Vorhandene Bausteine werden aus bestehenden Listen als vorhanden markiert, fehlende Bausteine bleiben normale naechste Arbeitsschritte. Es gibt keine automatische Baustein-Erzeugung und keine neuen Felder.

D5.3 nutzt die vorhandenen Strategy- und ZOPA-Felder fuer reine Guidance/Microcopy. Der Walk-away Point wird als manuelle Abbruchgrenze erklaert, die aus Ziel, Risiko, Kosten/Nutzen und BATNA abgeleitet wird. ZOPA bleibt der moegliche Ueberschneidungsbereich zwischen eigener Grenze und angenommener Grenze der Gegenseite; Konzessionen bleiben geplante Tauschobjekte oder Zugestaendnisse. Es gibt keine automatische WAP-, ZOPA- oder BATNA-Berechnung und keine neuen Felder.

D5.4 passt nur die bestehende MVP-Workflow-Sidebar an: Der Strategie-Menuepunkt nennt nun ZOPA, BATNA, WAP, Konzessionen und Argumente. Die Navigation nutzt ruhige Normal-States sowie explizit kontrastreiche Hover- und Active-States fuer Icon, Titel und Beschreibung. Routen, Menuestruktur, Backend, Migrationen und Strategy-Daten bleiben unveraendert.

D5.5 bestaetigt den D5.1-D5.4-Flow lokal im Browser fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`: Project Detail mit Preparation Gaps, Strategy-Einstieg, vorhandener Strategy-Kopf, Building-Blocks-Guidance inklusive WAP-Abgrenzung, Rueckweg zum Projekt, Sidebar-Zustaende, allgemeines `/strategy` ohne `projectId` und kleine Browserbreite sind bestanden. Das Ergebnis steht in `docs/browser-smoke-test-plan.md`; weil bereits eine Strategie vorhanden ist, wurde keine zweite Strategie angelegt. Es gibt keine Produkt-, Backend-, Migrations-, Seed-, KI-, Scoring- oder RAG-Aenderung.

D5.6 aktualisiert Hostinger-Staging in `/opt/negotiation-tools` per Fast-Forward von `21028cb` auf `46b045f` und startet den bestehenden Compose-Stack neu. Healthchecks fuer Backend, Frontend, DB und Alembic Head sind bestanden. Der D5-Strategy-Guidance-Flow wurde browserseitig auf Staging geprueft: Project Detail, Preparation Gaps Card, Strategy-Einstieg, manuelle Strategieanlage, Success Guidance, Building-Blocks-Guidance, WAP-Abgrenzung, Sidebar, `/strategy` ohne `projectId` und kleine Breite sind bestanden. Auf Staging existierte vor D5.6 noch keine Strategie fuer das Demo-Projekt; fuer den Success-Guidance-Test wurde genau ein manueller Strategie-Kopf ueber den bestehenden UI-Flow angelegt. Es gibt keine Produktcode-, Backend-, Migrations-, Seed-, KI-, Scoring- oder RAG-Aenderung.

D6.1 verbessert gezielt die manuelle Strategy-Erfassung im bestehenden `/strategy?projectId=...`-Flow. Der Strategie-Kopf markiert Titel sichtbar als Pflichtfeld und erklaert Strategy Objectives, Zielergebnis, Minimum, WAP, ZOPA, BATNA, Konzessionsstrategie, Argumentationssummary, Risiken und Notizen mit fachlich abgegrenzten Placeholdern und Hilfetexten. ZOPA-Dimensionen nutzen nun `Dimension` als minimalen Pflichtanker, waehrend BATNA als beste externe Alternative, WAP als minimale akzeptable Grenze und ZOPA als moeglicher Einigungskorridor getrennt bleiben. Konzessionen werden als Tauschlogik und Argumente als moeglichst fakten-, TCO-, risiko-, qualitaets- oder beziehungsbezogene Claims gefuehrt. Es gibt keine neue Route, keine Backend-Aenderung, keine Migration, keine neue Datenstruktur und keine automatische Strategie-, WAP-, ZOPA-, BATNA-, Scoring-, KI- oder RAG-Logik.

D6.2 bestaetigt D6.1 lokal im Browser fuer das Demo-Projekt `01d9d55b-87c3-5a5a-876a-b55a3ce2db33`: Project Detail und Strategy-Einstieg, `/strategy?projectId=...`, `/strategy` ohne Projektkontext, Strategy-Kopf, ZOPA, BATNA, WAP, Konzessionen, Argumente, Pflichtfeldverhalten der ZOPA-Dimension, Placeholder/Hilfetexte, Save-Verhalten, Rueckweg zum Projekt und kleiner Browser-Viewport sind bestanden. Das Ergebnis steht in `docs/browser-smoke-test-plan.md`. Fuer den lokalen Test wurden nur klar markierte `D6.2 Smoke`-Werte in der synthetischen Demo-DB gespeichert; Produktcode, Backend, Migrationen, Seed-Dateien, neue UI-Funktionalitaet, KI, Scoring und RAG blieben unveraendert.

D6.3 aktualisiert Hostinger-Staging in `/opt/negotiation-tools` per Fast-Forward von `46b045f` auf `59e293d` und startet den bestehenden Compose-Stack neu. Healthchecks fuer DB, Backend, Frontend, `pg_isready` und Alembic Head sind bestanden; unauthentifizierte externe Checks fuehren erwartungsgemaess zu Authelia. Browserseitig wurden Project Detail, Strategy-Einstieg, `/strategy?projectId=...`, `/strategy` ohne Projektkontext, Strategy Objectives, ZOPA, BATNA, WAP, Konzessionen, Argumente, ZOPA-Dimension als Pflichtanker, Hilfetexte/Placeholder, unveraendertes Save-Verhalten, Rueckweg zum Projekt, Browser-Console und kleiner Viewport geprueft. Auf Staging existierte bereits die D5.6-Strategie fuer das Demo-Projekt; deshalb wurde keine neue Strategie angelegt und keine Success Guidance erneut reproduziert. Es gibt keine Produktcode-, Backend-, Migrations-, Seed-, KI-, Scoring- oder RAG-Aenderung.

D7.1 ergaenzt auf `/strategy?projectId=...` bei vorhandener Strategie eine kleine Completion-/Readiness-Box. Die Box prueft transparent aus vorhandenen Strategy-Feldern und bestehenden ZOPA-, BATNA-, Concession- und Argumentation-Listen, ob Strategy Objectives, ZOPA, BATNA, WAP / Walk-away Point, Konzessionen und Argumente vorhanden sind. Der Status bleibt verbal (`Unvollstaendig`, `Grundlage vorhanden`, `Bereit fuer Briefing / Simulation`) und ist kein numerischer Score. Fachliche Warnhinweise unterscheiden ZOPA, BATNA und WAP, markieren fehlende Walk-away-Grenzen, fehlende Tauschlogik bei Konzessionen und fehlende Gespraechsfuehrung bei Argumenten. D7.1 fuehrt keine KI, keine Simulation, keine neue Persistenz, keine Backend-Aenderung, keine Migration und kein Staging-Deployment ein. `/strategy` ohne `projectId` bleibt die allgemeine Projektauswahl.

D7.2 bestaetigt diese Guidance lokal im Browser mit drei klar markierten Entwicklungsdaten-Zustaenden: leer/stark unvollstaendig, teilweise gefuellt und vollstaendig gefuellt. Geprueft wurden `/strategy` ohne Projektkontext, `/strategy?projectId=...`, die erwarteten Statuswerte, vorhandene Anker, fehlende Bausteine, fachliche Warnhinweise, Mobile-Breite und Browser-Console. Das Ergebnis steht in `docs/browser-smoke-test-plan.md`. D7.2 aendert keine Produktlogik, keine UI-Funktionalitaet, keine Backendlogik, keine Migration, keine Seed-Datei und fuehrt keine KI-, Scoring-, Simulations- oder RAG-Logik ein.

D7.3 aktualisiert Hostinger-Staging in `/opt/negotiation-tools` per Fast-Forward von `c195d0c` auf `7e80fce` und startet den bestehenden Compose-Stack neu. Healthchecks fuer DB, Backend, Frontend, `pg_isready` und Alembic Head sind bestanden; `alembic current` meldet weiterhin `2f4b7c8d9e0a (head)`. Browserseitig wurden `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33`, `/strategy` ohne Projektkontext, die drei Readiness-Zustaende `Unvollstaendig`, `Grundlage vorhanden` und `Bereit fuer Briefing / Simulation`, vorhandene Anker, fehlende Bausteine, fachliche Warnhinweise, ZOPA/BATNA/WAP-Abgrenzung, Konzessionen als Tauschlogik, D6-Feldfuehrung, Save-Verhalten, Browser-Console und kleiner Viewport geprueft. Fuer die drei Zustaende wurden nur klar markierte `D7.3 Smoke`-Werte in vorhandenen Staging-Strategy-Feldern gepflegt. Es gibt keine Produktcode-, Backend-, Migrations-, Seed-, KI-, Scoring-, Simulations- oder RAG-Aenderung.

D8.1 zeigt bei Strategy-Readiness `Bereit fuer Briefing / Simulation` eine kompakte Next-Action-Guidance fuer den Uebergang von Strategiearbeit zu Briefing-, Simulations- und Trainerreview-Vorbereitung. Briefing bleibt bewusst ein Coming-next-Hinweis ohne projektbezogenen Link, weil `/briefing` weiterhin nur generisch ist. Simulation und Trainerreview verlinken nur auf bestehende projektbezogene Vorbereitungsrouten. Es gibt kein KI-Briefing, keine produktive Simulation, keine neue Trainerreview-Logik, keine Backend-Aenderung und keine Migration.

D8.2 bestaetigt diese Next-Action-Guidance lokal im Browser mit vorhandenen D7.2-Smoke-Testdaten fuer `Unvollstaendig`, `Grundlage vorhanden` und `Bereit fuer Briefing / Simulation`. Geprueft wurden `/strategy` ohne Projektkontext, `/strategy?projectId=...`, Sichtbarkeit nur im vollstaendigen Readiness-Zustand, Briefing als unverlinkter Coming-next-Hinweis, projektbezogene Simulation-/Trainerreview-Routen, D6-/D7-Feldfuehrung, Mobile-Breite und Browser-Console. Das Ergebnis steht in `docs/browser-smoke-test-plan.md`; es gibt keine Produktcode-, Backend-, Migrations-, Seed-, KI-Briefing-, produktive Simulations-, Trainerreview- oder RAG-Aenderung.

D8.3 aktualisiert Hostinger-Staging in `/opt/negotiation-tools` per Fast-Forward von `7e80fce` auf `2aa47a2` und startet den bestehenden Compose-Stack neu. Healthchecks fuer DB, Backend, Frontend, `pg_isready` und Alembic Head sind bestanden; `alembic current` meldet weiterhin `2f4b7c8d9e0a (head)`. Browserseitig wurden `/strategy?projectId=01d9d55b-87c3-5a5a-876a-b55a3ce2db33`, `/strategy` ohne Projektkontext, `/briefing`, die projektbezogenen Simulation-/Trainerreview-Routen, die Next-Action-Guidance im Zustand `Bereit fuer Briefing / Simulation`, Briefing als Coming-next ohne Link, D6-/D7-Feldfuehrung, Save-Verhalten, Browser-Console und kleiner Viewport geprueft. Auf Staging existiert aktuell nur eine Strategy; die unteren Zustaende `Unvollstaendig` und `Grundlage vorhanden` wurden deshalb als nicht sauber reproduzierbar dokumentiert, weil leere Formularwerte bestehende Felder im PATCH-Flow nicht loeschen und keine neuen Seed-/Testdaten eingefuehrt wurden. Es gibt keine Produktcode-, Backend-, Migrations-, Seed-, KI-Briefing-, produktive Simulations-, Trainerreview- oder RAG-Aenderung.

D8.4 schliesst D8 dokumentarisch als kleinen UX-/Workflow-Uebergangsblock ab. D8 fuehrt den vorhandenen Strategy-Readiness-Stand in eine handlungsorientierte Next-Action-Guidance weiter, liefert aber keine neue Folgeprozesslogik. Die D8.3-Einschraenkung bleibt als Testdaten-/Demo-Daten-Thema sichtbar: Auf Staging existiert aktuell nur eine Strategy, deshalb wurden `Unvollstaendig` und `Grundlage vorhanden` dort ohne neue Testdaten oder direkte DB-Manipulation nicht sauber reproduziert. Das ist kein D8-Produktblocker.

D9 ist als kleiner Produktblock `Briefing Preparation` gestartet. D9.1 glaettet den bestehenden `/briefing`-Einstieg fachlich: Die Seite erklaert Briefing Preparation als vorbereitenden Schritt nach ausreichender Strategy Readiness, nennt spaetere Briefing-Bausteine wie Ziel, Interessen, BATNA / WAP / ZOPA, Argumente, Konzessionen, Risiken, Agenda und Trainee-Hinweise und grenzt automatische KI-Briefing-Erzeugung, produktive Simulation und Trainerreview sichtbar aus. Es gibt keine neue Backendlogik, keine Persistenz, keine Migration und keine neue Folgeprozessautomatisierung.

Offene Nicht-Blocker nach D8.4:

- Issue #55: PDF-/Upload-/Parsing-Folgearbeit bleibt offen und blockiert D8 oder den D9-Einstieg nicht.
- Issue #113: Next/PostCSS-audit-Finding bleibt zur Beobachtung offen und blockiert D8 oder den D9-Einstieg nicht.

## 12. Phase E: Knowledge Intelligence

Ziel: Dokumentwissen semantisch nutzbar machen.

Nicht starten, bevor der MVP abgenommen und Phase C sauber priorisiert ist.

## 13. Phase F: Simulation und Auswertung

Ziel: Trainings- und Simulationsnutzen produktiv machen.

## 14. Phase G: Enterprise-Ausbau

Spaetere Themen:

- Rollen- und Rechteverwaltung
- Mandantenfaehigkeit
- Team-Dashboards
- CRM-/ERP-Anbindung
- Audit Trail
- Management-Reporting
- deutsche und englische Menüs
