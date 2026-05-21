# MVP API- und Frontend-Gap-Analyse

## 1. Zweck und Einordnung

Dieses Dokument leitet aus dem finalisierten MVP-Screen-Scope in `docs/screen-by-screen-concept.md` die API- und Frontend-Luecken fuer Phase B1 ab. Es gleicht die zehn MVP-Core-Screens gegen den aktuellen technischen Stand im Repository ab.

Die Analyse ist eine Planungsgrundlage. Sie implementiert keine neuen API-Endpunkte, Datenmodelle, Migrationen, Frontend-Komponenten, Router, Services, Upload-/Import-Funktionen, RAG-/OCR-Logik, Voice-Logik oder Simulation-Engine.

## 2. Gepruefte Referenzen

- `docs/screen-by-screen-concept.md`
- `docs/workflow-v2.md`
- `docs/procurement-process-concept.md`
- `docs/data-model.md`
- `docs/technical-architecture.md`
- `docs/roadmap.md`
- `docs/codex-tasks.md`
- Backend-Code unter `backend/app`
- Frontend-Code unter `frontend/app`, `frontend/lib` und `frontend/components`
- Alembic-Migrationen unter `backend/alembic/versions`

## 3. Aktueller technischer Stand

### 3.1 Backend

Vorhanden sind FastAPI-Grundstruktur, `get_db` Dependency, SQLAlchemy-Models, Pydantic-Schemas, Alembic-Migrationen und einfache CRUD-Router fuer erste Kernobjekte.

Registrierte Router:

- `GET /api/companies`, `GET /api/companies/{id}`, `POST /api/companies`
- `GET /api/user-profiles`, `GET /api/user-profiles/{id}`, `POST /api/user-profiles`
- `GET /api/knowledge-documents`, `GET /api/knowledge-documents/{id}`, `POST /api/knowledge-documents`
- `GET /api/request-items`, `GET /api/request-items/{id}`, `POST /api/request-items`
- `GET /api/supplier-profiles`, `GET /api/supplier-profiles/{id}`, `POST /api/supplier-profiles`
- `GET /api/negotiation-projects`, `GET /api/negotiation-projects/{id}`, `POST /api/negotiation-projects`
- `GET /api/health`

Pydantic-Schemas existieren bereits fuer alle aktuell modellierten Fachobjekte: `Company`, `UserProfile`, `KnowledgeDocument`, `DocumentChunk`, `KnowledgeClaim`, `RequestItem`, `SupplierProfile`, `ProcurementHistoryItem`, `ImportJob`, `ImportRow`, `NegotiationProject`, `Strategy`, `ZopaItem`, `BatnaOption`, `ConcessionItem`, `ArgumentationLine`, `SimulationScenario`, `SimulationMessage`, `SimulationResult` und `TrainerComment`.

Nicht registriert sind Router fuer:

- `DocumentChunk`
- `KnowledgeClaim`
- `ProcurementHistoryItem`
- `ImportJob`
- `ImportRow`
- `Strategy`
- `ZopaItem`
- `BatnaOption`
- `ConcessionItem`
- `ArgumentationLine`
- `SimulationScenario`
- `SimulationMessage`
- `SimulationResult`
- `TrainerComment`

Die vorhandenen Listenendpunkte haben aktuell nur `skip` und `limit`. Fachliche Filter nach `company_id`, `project_id`, `owner_id`, `supplier_profile_id`, `strategy_id`, `status`, `document_type`, `claim_type`, `information_kind`, `target_entity` oder Sichtbarkeit fehlen weitgehend.

Updates und Deletes fehlen fuer die registrierten Router. Fuer MVP-Screens mit Bearbeitung ist daher mindestens `PATCH` oder `PUT` zu klaeren, ohne daraus bereits eine Implementierung abzuleiten.

### 3.2 Datenbank und Migrationen

Alembic-Migrationen bilden den aktuellen Stand fuer Initialschema, geschaerfte Kernmodelle, Knowledge-Base-Erweiterungen, Importmodell, Strategiemodell, Simulations-/Auswertungsmodell und Datei-Metadaten ab.

Das Datenmodell ist fuer den MVP breit vorbereitet. Besonders wichtig sind:

- Relationale Kernbeziehungen zwischen `Company`, `UserProfile`, `RequestItem`, `SupplierProfile` und `NegotiationProject`.
- Knowledge-Base-Struktur mit Dokumenten, Chunks und Claims.
- Importstruktur mit Jobs und Rows als vorbereitete Persistenz.
- Strategieobjekte mit Unterlisten fuer ZOPA, BATNA, Konzessionen und Argumentation.
- Simulations- und Reviewpersistenz mit Scenario, Message, Result und TrainerComment.
- JSONB-Felder als flexible Ablage fuer einfache Notizen, Hypothesen, Stakeholderhinweise, Relationship-Kontext, reduzierte Vergleichsnotizen und spaetere KI-/Import-Zwischenstaende.

### 3.3 Frontend

Das Frontend ist eine Next-App mit `app/page.tsx`, `app/layout.tsx`, globalem CSS, `frontend/lib/utils.ts`, lucide-react und shadcn-nahem Setup (`components.json`). Aktuell gibt es:

- eine App-Shell mit Hauptnavigation fuer die MVP-Screen-Gruppen,
- App-Router-Routen und Platzhalterseiten fuer Dashboard, Firmen, Rollenprofile, Projekte, Datenbasis, Analyse, Strategie, Briefing, Simulation und Trainerreview,
- Detailrouten als Grundlage fuer `/companies/[id]` und `/projects/[id]`,
- eine zentrale API-Client-Grundlage mit `NEXT_PUBLIC_API_URL`, GET/POST/PATCH-Helfern, JSON-Parsing und einheitlicher Fehlerklasse,
- einfache wiederverwendbare Muster fuer Loading-, Error- und Empty-State sowie PageHeader,
- noch keine fachlichen Listen, Detailansichten, Formulare, Knowledge-Base-UI, Analyse-Logik, Strategie-Builder, Simulation, Chat, Voice, Upload-/Import-UI oder Trainerreview-Fachlogik.

Stand nach Phase B6 / Issue #24: Die Frontend-Grundlage ist vorbereitet, damit Folgeissues echte Fachscreens auf bestehenden Routen ergaenzen koennen. Fachliche API-Clients wurden bewusst noch nicht vollstaendig ausgebaut; als Strukturbeispiel existiert nur eine schlanke Company-Lesefunktion.

## 4. Screen-by-Screen-Gap-Analyse

### 4.1 Dashboard

1. Zweck im MVP: Schlanker Einstieg in aktive Projekte, Status, naechste Workflow-Schritte und offene Trainerreviews.
2. Relevante bestehende Modelle: `NegotiationProject`, `Company`, `UserProfile`, `SimulationScenario`, `SimulationResult`, `TrainerComment`, optional `Strategy`.
3. Relevante bestehende Pydantic-Schemas: vorhanden fuer alle genannten Modelle.
4. Relevante bestehende Router / Endpunkte: `GET /api/negotiation-projects`, `GET /api/companies`, `GET /api/user-profiles`. Keine Router fuer `SimulationScenario`, `SimulationResult`, `TrainerComment` oder `Strategy`.
5. Fehlende oder unklare API-Endpunkte: echte Dashboard-Summary fehlt; Filter fuer aktive Projekte, Projektstatus, Company, Owner/Trainee und offene Reviews fehlen; Endpunkte fuer Review- und Szenario-Daten fehlen; Aggregation von Projekt, Company, Owner, Scenario und TrainerComment fehlt.
6. Daten, die im MVP gelesen werden muessen: aktive Projekte, Company-Name, Trainee/Rollenprofil, Projektstatus, Prioritaet, naechster fachlicher Schritt, offene sichtbare oder trainerinterne Kommentare.
7. Daten, die im MVP bearbeitet werden muessen: idealerweise nicht direkt im Dashboard; Status oder naechster Schritt nur, wenn sie am Projekt oder Review gepflegt werden.
8. Benoetigte Frontend-Ansicht oder Flow: Dashboard-Route mit Projektliste, Statuschips, naechster Aktion, Review-Hinweisen und Links in Company, Profil, Projekt, Strategie, Szenario und Review.
9. Abhaengigkeiten zu anderen Screens: Projekt, Company, Rollenprofil, Simulation konfigurieren, Trainerreview.
10. Nicht-MVP-Abgrenzung: kein Team-Dashboard, keine Admin-KPIs, keine Lernhistorie, keine automatische Priorisierung, kein produktiver Simulationsstart.

Bewertung: Eine einfache Dashboard-Komposition koennte zunaechst aus bestehenden Listenendpunkten fuer Projekte, Companies und UserProfiles entstehen. Fuer offene Reviews und Szenarien reicht der aktuelle API-Stand nicht, weil die Router fehlen. Eine echte Dashboard-Summary ist eine klare API-Luecke, sollte aber nach Basisfiltern und Review-Endpunkten kommen.

### 4.2 Firmenprofil / Company-Uebersicht

1. Zweck im MVP: Company-Kontext, Datenlage und verknuepfte Projekte sichtbar machen.
2. Relevante bestehende Modelle: `Company`, `KnowledgeDocument`, `KnowledgeClaim`, `DocumentChunk`, `ProcurementHistoryItem`, `RequestItem`, `SupplierProfile`, `NegotiationProject`, `ImportJob`, `ImportRow`.
3. Relevante bestehende Pydantic-Schemas: vorhanden fuer alle genannten Modelle.
4. Relevante bestehende Router / Endpunkte: `GET/POST /api/companies`, `GET/POST /api/knowledge-documents`, `GET/POST /api/request-items`, `GET/POST /api/supplier-profiles`, `GET/POST /api/negotiation-projects`. Keine Router fuer `KnowledgeClaim`, `DocumentChunk`, `ProcurementHistoryItem`, `ImportJob`, `ImportRow`.
5. Fehlende oder unklare API-Endpunkte: Company-Detail mit verknuepften Projekten und Datenlage fehlt; Filter `company_id` fuer KnowledgeDocuments, RequestItems, SupplierProfiles und NegotiationProjects fehlen; ProcurementHistoryItems, Claims, Chunks und Importstatus sind nicht per API verfuegbar; Update fuer Company fehlt.
6. Daten, die im MVP gelesen werden muessen: Stammdaten, Branche, Land, Beschreibung, `profile_data`, verknuepfte Projekte, Dokumentanzahl, Quellenarten, Anfragepositionen, Lieferantenprofile, Einkaufshistorie und Datenluecken.
7. Daten, die im MVP bearbeitet werden muessen: Company-Stammdaten und fachliche Profilhinweise in `profile_data`; verknuepfte Projekte eher im Projektscreen.
8. Benoetigte Frontend-Ansicht oder Flow: Company-Liste, Company-Detail mit Kontextabschnitten, Datenlage, verknuepften Projekten und Edit-Form fuer Stammdaten.
9. Abhaengigkeiten zu anderen Screens: Knowledge Base, Projekt, Dashboard, Rollenprofil.
10. Nicht-MVP-Abgrenzung: keine Mandantenadministration, keine Rechteverwaltung, keine CRM-/ERP-Synchronisation, keine Upload-Verwaltung als eigener Arbeitsbereich.

Bewertung: Das Grundmodell ist ausreichend vorbereitet. Die wichtigste Luecke ist nicht ein neues Modell, sondern API-Filterung und eine Company-Uebersichtsantwort oder Frontend-Komposition.

### 4.3 Trainee- / Rollenprofil

1. Zweck im MVP: reale Person oder Trainingsrolle fuer Vorbereitung, Simulation und Trainerfeedback abbilden.
2. Relevante bestehende Modelle: `UserProfile`, `Company`, `NegotiationProject`, `SimulationScenario`, `SimulationResult`, `TrainerComment`.
3. Relevante bestehende Pydantic-Schemas: vorhanden fuer alle genannten Modelle.
4. Relevante bestehende Router / Endpunkte: `GET/POST /api/user-profiles`, `GET /api/companies`, `GET /api/negotiation-projects`. Keine Router fuer Szenarien, Ergebnisse oder Trainerkommentare.
5. Fehlende oder unklare API-Endpunkte: Filter `company_id` fuer UserProfiles fehlt; Filter `owner_id` oder `user_profile_id` fuer Projekte und Szenarien fehlt; Update fuer Profile fehlt; Sichtbarkeitslogik fuer trainerinterne Profilhinweise ist fachlich noch unklar.
6. Daten, die im MVP gelesen werden muessen: Name/Rollenname, E-Mail optional, Rolle, Department/Funktion, Notizen, Trainingsziele, Sprache, Erfahrung, Entwicklungsfelder und Profilzusatzdaten aus `profile_data`, zugeordnete Projekte und Szenarien.
7. Daten, die im MVP bearbeitet werden muessen: Display Name/Rollenname, Rolle/Funktion, Department, Notizen und strukturierte Profilhinweise in `profile_data`.
8. Benoetigte Frontend-Ansicht oder Flow: Rollenprofil-Liste nach Company, Profil-Detail, Profil-Edit, Abschnitt fuer zugeordnete Projekte und spaeter trainee-sichtbare Hinweise.
9. Abhaengigkeiten zu anderen Screens: Projekt, Simulation konfigurieren, Trainerreview, Dashboard.
10. Nicht-MVP-Abgrenzung: keine Nutzerverwaltung, keine Rollenrechte-Engine, keine Kompetenzmatrix, keine Zertifikate, keine Lernhistorie.

Bewertung: `UserProfile` kann den MVP-Zweck tragen. Einige Screen-Anforderungen wie Erfahrungsstand, Trainingsziel, Sprache und Entwicklungsfelder liegen aktuell eher in `profile_data` oder `notes` und brauchen vorerst Dokumentations-/UI-Konventionen statt neue Tabellen.

### 4.4 Knowledge Base / Datenbasis

1. Zweck im MVP: Quellen, Claims, Einkaufshistorie, Anfragepositionen, Importstatus und Datenluecken sichtbar machen.
2. Relevante bestehende Modelle: `KnowledgeDocument`, `DocumentChunk`, `KnowledgeClaim`, `ProcurementHistoryItem`, `RequestItem`, `ImportJob`, `ImportRow`, `Company`, `NegotiationProject`, `SupplierProfile`.
3. Relevante bestehende Pydantic-Schemas: vorhanden fuer alle genannten Modelle.
4. Relevante bestehende Router / Endpunkte: `GET/POST /api/knowledge-documents`, `GET/POST /api/request-items`. Keine Router fuer `DocumentChunk`, `KnowledgeClaim`, `ProcurementHistoryItem`, `ImportJob`, `ImportRow`.
5. Fehlende oder unklare API-Endpunkte: Listen/Details fuer Claims, Chunks, Einkaufshistorie, ImportJobs und ImportRows fehlen; Filter nach `company_id`, `project_id`, `supplier_profile_id`, `document_type`, `claim_type`, `information_kind`, `target_entity`, `status` fehlen; Update/Review von Claims oder Datenqualitaet fehlt.
6. Daten, die im MVP gelesen werden muessen: Dokumente mit Metadaten, Dokumentstatus, Claims mit Evidenz und Confidence, Anfragepositionen, Einkaufshistorie, Importstatus und erkannte Datenluecken.
7. Daten, die im MVP bearbeitet werden muessen: zunaechst nur vorhandene Dokument- und Claim-Einordnung, Qualitaets-/Vertrauenshinweise und manuelle Datenluecken; produktiver Upload oder Import bleibt ausgeschlossen.
8. Benoetigte Frontend-Ansicht oder Flow: Datenbasis-Route mit Tabs oder Filtern fuer Quellen, Claims, Einkaufshistorie, Anfragepositionen und Importstatus; Detail-Drawer fuer Quelle/Claim; keine Upload-UI als MVP-Pflicht.
9. Abhaengigkeiten zu anderen Screens: Company, Projekt, Analyseansicht, Strategie-Builder, Kultur- und Rollenbriefing.
10. Nicht-MVP-Abgrenzung: keine produktive Upload-/Import-Funktion, kein Parsing, kein OCR, kein RAG, keine Embeddings, keine automatische Claim-Extraktion.

Bewertung: Die Persistenz ist vorbereitet, aber die API-Oberflaeche ist fuer die Knowledge Base noch unvollstaendig. Fuer den MVP sollte diese Ansicht zunaechst lesend starten und nur manuelle Einordnung/Korrektur dort erlauben, wo Daten bereits vorhanden sind.

### 4.5 Verhandlungsprojekt anlegen / bearbeiten

1. Zweck im MVP: konkreten Verhandlungsfall definieren und Company, Rolle, Lieferant, Bedarf, Ziel, Status und Kontextnotizen verbinden.
2. Relevante bestehende Modelle: `NegotiationProject`, `Company`, `UserProfile`, `SupplierProfile`, `RequestItem`, `KnowledgeDocument`, `Strategy`, `SimulationScenario`, optional `ProcurementHistoryItem`.
3. Relevante bestehende Pydantic-Schemas: vorhanden fuer alle genannten Modelle.
4. Relevante bestehende Router / Endpunkte: `GET/POST /api/negotiation-projects`, `GET /api/companies`, `GET /api/user-profiles`, `GET /api/supplier-profiles`, `GET /api/request-items`.
5. Fehlende oder unklare API-Endpunkte: Update fuer Projekte fehlt; Filter nach `company_id`, `owner_id`, `supplier_profile_id`, `request_item_id`, `status` fehlen; Projekt-Detail mit eingebetteter Company/Owner/Supplier/RequestItem fehlt; Endpunkte fuer Strategien und Szenarien fehlen; fachlicher `next_step` ist noch nicht modelliert oder abgeleitet.
6. Daten, die im MVP gelesen werden muessen: Titel, Status, Typ, Kategorie, Artikel/Leistung, Menge, Region, Lieferzeit, interne Preisannahme, Waehrung, Lieferant, Prioritaet, Business Pressure, technische Abhaengigkeit, Supplier Power, Risiko, Ziel, Kontext, `strategy_data`, `simulation_data`, `metadata_json`.
7. Daten, die im MVP bearbeitet werden muessen: Projektfelder, Beziehungen zu Company/UserProfile/SupplierProfile/RequestItem, Status, Prioritaet, Ziel/Kontext und einfache Kontextnotizen in JSONB.
8. Benoetigte Frontend-Ansicht oder Flow: Projektliste, Projektanlage, Projekt-Edit, Detailuebersicht mit Sprungmarken zu Analyse, Strategie, Briefing, Simulation und Review.
9. Abhaengigkeiten zu anderen Screens: Dashboard, Company, Rollenprofil, Knowledge Base, Analyse, Strategie, Simulation, Trainerreview.
10. Nicht-MVP-Abgrenzung: keine automatische Projektanlage aus Importdaten, kein CRM-/ERP, keine komplexe Freigabe, kein RFQ-Modul, kein Relationship Memory, kein Stakeholder-Graph.

Bewertung: Das Projektmodell deckt viele MVP-Felder bereits ab. Fachliche Felder wie Stakeholdernotiz, Lieferantenbeziehungsnotiz, Hypothesen oder reduzierte Angebotsvergleiche sollten fuer den MVP als `metadata_json`, `strategy_data`, `context` oder `notes`-Konvention dokumentiert werden, bevor neue Modelle entstehen.

### 4.6 Analyseansicht

1. Zweck im MVP: Fakten, Annahmen, Hypothesen, Risiken, Chancen, Stakeholdernotizen und einfache Vergleichsnotizen sichtbar machen.
2. Relevante bestehende Modelle: `NegotiationProject`, `Company`, `SupplierProfile`, `KnowledgeClaim`, `KnowledgeDocument`, `DocumentChunk`, `ProcurementHistoryItem`, `RequestItem`, optional `Strategy`.
3. Relevante bestehende Pydantic-Schemas: vorhanden fuer alle genannten Modelle.
4. Relevante bestehende Router / Endpunkte: Projekt, KnowledgeDocument, RequestItem und SupplierProfile sind verfuegbar; Claims, Chunks, ProcurementHistoryItems und Strategy sind nicht verfuegbar.
5. Fehlende oder unklare API-Endpunkte: Analyse-Summary fehlt; Filter fuer Claims, Einkaufshistorie und Anfragepositionen nach Projekt/Company/Supplier fehlen; Bearbeitung von manuellen Analyse-Notizen, Hypothesen, Risiken und Chancen ist nicht als eigener API-Kontrakt geklaert; Strategy-Router fehlt fuer strategierelevante Uebernahme.
6. Daten, die im MVP gelesen werden muessen: Projektbriefing, Lieferantendaten, Anfrageposition, Einkaufshistorie, Claims nach Fakt/Annahme/Hypothese, Risiken, Chancen, offene Fragen, Datenluecken, Stakeholder- und Relationship-Notizen.
7. Daten, die im MVP bearbeitet werden muessen: manuelle Datenluecken, Risiken, Chancen, offene Fragen, Hypothesen, Stakeholdernotizen und einfache Vergleichsnotizen.
8. Benoetigte Frontend-Ansicht oder Flow: Analyse-Route pro Projekt mit getrennten Bereichen fuer Fakten, Annahmen, Hypothesen, Risiken/Chancen, Datenluecken und Notizen; klare Uebergabe in Strategie.
9. Abhaengigkeiten zu anderen Screens: Projekt, Knowledge Base, Strategie-Builder, Kultur- und Rollenbriefing, Trainerreview.
10. Nicht-MVP-Abgrenzung: keine automatische Analyse, keine KI-Wahrheitsbewertung, keine automatische Angebotsanalyse, kein SupplierBid/BidComparison-Modell, kein komplexes Scoring.

Bewertung: Vorhandene Modelle koennen viel lesen, aber Analyseinformationen sind noch nicht durchgaengig strukturiert. Fuer den MVP sind manuelle Notiz-/JSONB-Konventionen sinnvoll; spaetere Produktentscheidungen koennen klaeren, ob daraus eigene Analyseobjekte entstehen.

### 4.7 Strategie-Builder

1. Zweck im MVP: Strategie, Ziele, ZOPA, WAP, BATNA, Konzessionen und Argumentationslinien sichtbar und bearbeitbar machen.
2. Relevante bestehende Modelle: `Strategy`, `ZopaItem`, `BatnaOption`, `ConcessionItem`, `ArgumentationLine`, `NegotiationProject`, `Company`, optional `KnowledgeClaim`.
3. Relevante bestehende Pydantic-Schemas: vorhanden fuer alle genannten Strategieobjekte.
4. Relevante bestehende Router / Endpunkte: `GET/POST/PATCH /api/strategies`, `GET/POST/PATCH /api/zopa-items`, `GET/POST/PATCH /api/batna-options`, `GET/POST/PATCH /api/concession-items`, `GET/POST/PATCH /api/argumentation-lines`; Projekt- und Company-Endpunkte existieren.
5. Fehlende oder unklare API-Endpunkte: API fuer Strategie-Detail mit eingebetteten Unterlisten fehlt; Aktiv-/Versionierungslogik ist nur modellseitig vorbereitet.
6. Daten, die im MVP gelesen werden muessen: Strategie-Kopf, Zielbild, Ziel-/Grenzwerte, ZOPA-Dimensionen, WAP, BATNA-Optionen, Konzessionen, Argumentationslinien, Risiken, offene Fragen und strategierelevante Notizen.
7. Daten, die im MVP bearbeitet werden muessen: Strategie-Kopf und alle Unterlisten fuer ZOPA, BATNA, Konzessionen und Argumentation.
8. Benoetigte Frontend-Ansicht oder Flow: Strategieuebersicht je Projekt, Strategie bearbeiten, Unterlisten mit Inline- oder Drawer-Edit fuer ZOPA/BATNA/Konzessionen/Argumente, Status/Active-Markierung.
9. Abhaengigkeiten zu anderen Screens: Analyseansicht, Projekt, Simulation konfigurieren, Kultur- und Rollenbriefing, Trainerreview.
10. Nicht-MVP-Abgrenzung: keine automatische ZOPA-Berechnung, keine verbindliche KI-Strategie-Generierung, keine automatische BATNA-Bewertung, keine komplexe Freigabe oder Versionierung.

Bewertung: Die Datenbasis und API-Readiness fuer den Strategie-Builder sind fuer einfache MVP-Flows vorbereitet. Eine zusammengesetzte Strategie-Detailantwort mit Unterlisten bleibt eine spaetere Komfort- oder Performance-Option.

### 4.8 Kultur- und Rollenbriefing

1. Zweck im MVP: Lieferantenrolle, Beziehungskontext und kulturelle Arbeitshypothesen vorsichtig abbilden.
2. Relevante bestehende Modelle: `SupplierProfile`, `NegotiationProject`, `Strategy`, `KnowledgeClaim`, `SimulationScenario`, optional `UserProfile`.
3. Relevante bestehende Pydantic-Schemas: vorhanden fuer alle genannten Modelle.
4. Relevante bestehende Router / Endpunkte: `GET/POST /api/supplier-profiles`, `GET /api/negotiation-projects`, `GET/POST/PATCH /api/strategies`; KnowledgeClaim ist lesend verfuegbar, SimulationScenario fehlt noch.
5. Fehlende oder unklare API-Endpunkte: Briefing-Summary fehlt; Update fuer SupplierProfile fehlt; Filter fuer SupplierProfiles nach Company und Projekte nach Supplier fehlen; Claims mit `claim_type=cultural_hint` oder `information_kind=hypothesis` sind nicht per Router verfuegbar; kein API-Kontrakt fuer Do's/Don'ts, offene Unsicherheiten oder Pruefhinweise.
6. Daten, die im MVP gelesen werden muessen: SupplierProfile mit Rolle, Beziehung, Macht, Risiko, kulturellem Kontext, Interessen, Taktiken, Constraints; Projektkontext; strategierelevante Hinweise; optional Szenario-Briefing.
7. Daten, die im MVP bearbeitet werden muessen: Rollenbeschreibung, Beziehungskontext, kulturelle Arbeitshypothesen, erwartete Taktiken, Kommunikationsrisiken, Do's/Don'ts und offene Unsicherheiten, vermutlich zunaechst in `SupplierProfile`-JSONB/Freitext oder `SimulationScenario`.
8. Benoetigte Frontend-Ansicht oder Flow: Briefing-Route pro Projekt oder Supplier mit Abschnitten fuer Gegenrolle, Beziehung, Interessen/Constraints, Taktiken, Kulturhypothesen, Unsicherheiten und Prueffragen.
9. Abhaengigkeiten zu anderen Screens: Projekt, Analyse, Strategie, Simulation konfigurieren.
10. Nicht-MVP-Abgrenzung: kein neues `CulturalBriefing`-Modell im MVP, keine automatische Kultur-Engine, kein stereotypes Laenderprofil, keine Bias-Bewertungsautomatik.

Bewertung: `SupplierProfile` ist fuer den MVP ausreichend, solange Briefing-Inhalte als vorsichtige Arbeitshypothesen und flexible Felder gefuehrt werden. Ein eigenes CulturalBriefing-Objekt bleibt eine spaetere Option, nicht B1-Folgearbeit.

### 4.9 Simulation konfigurieren

1. Zweck im MVP: `SimulationScenario` fachlich vorbereiten, ohne produktive Simulation durchzufuehren.
2. Relevante bestehende Modelle: `SimulationScenario`, `NegotiationProject`, `Strategy`, `SupplierProfile`, `UserProfile`, optional `TrainerComment`.
3. Relevante bestehende Pydantic-Schemas: vorhanden fuer `SimulationScenario` und alle Bezugsobjekte.
4. Relevante bestehende Router / Endpunkte: keine SimulationScenario-Router; Bezugsobjekte Projekt, SupplierProfile, UserProfile und Strategy sind lesend/anlegend verfuegbar.
5. Fehlende oder unklare API-Endpunkte: CRUD fuer SimulationScenario fehlt; Filter nach `negotiation_project_id`, `strategy_id`, `supplier_profile_id`, `user_profile_id`, `status` fehlen; Validierung gleicher Company ueber verknuepfte Objekte waere fuer Create/Update zu klaeren; Startbereitschaft ist fachlich in `status` oder `metadata_json` zu definieren.
6. Daten, die im MVP gelesen werden muessen: Szenariotitel, Projekt, Strategie, Trainee/Rolle, Supplier/Gegenrolle, Rolle, Land/Region, kultureller Kontext, Schwierigkeit, Kommunikationsstil, Phase, Trainingsziel, Brief, Erfolgskriterien, Zeitlimit, Sprache, Status.
7. Daten, die im MVP bearbeitet werden muessen: alle Konfigurationsfelder von `SimulationScenario`; keine Messages, keine Ergebnisse, keine Engine-Steuerung.
8. Benoetigte Frontend-Ansicht oder Flow: Szenario-Liste je Projekt, Szenario-Detail/Edit, Formular fuer Schwierigkeitsgrad, Phase, Sprache, Briefing, Erfolgskriterien und interne Hinweise.
9. Abhaengigkeiten zu anderen Screens: Projekt, Strategie-Builder, Kultur- und Rollenbriefing, Rollenprofil, Trainerreview.
10. Nicht-MVP-Abgrenzung: keine produktive Simulation, kein Chat, keine Voice-/Streaming-Logik, keine automatische Taktikerkennung, keine automatische Auswertung.

Bewertung: Das Modell deckt die reine Konfiguration gut ab. Die API-Luecke ist klar: Router, Filter und Update fuer Szenario-Konfiguration.

### 4.10 Trainerreview / Trainerkommentar

1. Zweck im MVP: menschliches Feedback, Sichtbarkeit, Lernpunkte und einfache Kompetenzbezuge dokumentieren.
2. Relevante bestehende Modelle: `TrainerComment`, `SimulationScenario`, `SimulationResult`, `SimulationMessage`, `UserProfile`, indirekt `NegotiationProject`, `Strategy`.
3. Relevante bestehende Pydantic-Schemas: vorhanden fuer `TrainerComment`, SimulationScenario, SimulationResult, SimulationMessage und UserProfile.
4. Relevante bestehende Router / Endpunkte: keine Router fuer TrainerComment, SimulationScenario, SimulationResult oder SimulationMessage; UserProfile-Router existiert.
5. Fehlende oder unklare API-Endpunkte: CRUD fuer TrainerComment fehlt; Filter nach `simulation_scenario_id`, `trainer_user_profile_id`, `is_visible_to_trainee`, `comment_type`, `severity` fehlen; direkter Bezug zu Projekt, Strategie, Analyse oder Briefing fehlt im Modell; Review ohne produktive Simulation braucht entweder ein vorbereitendes Scenario als Anker oder spaetere Modell-/Kontraktentscheidung.
6. Daten, die im MVP gelesen werden muessen: Kommentartext, Typ, Kompetenzbezug, Severity/Prioritaet, Sichtbarkeit, Trainer, Erstell-/Aenderungszeit, Szenario- und Projektkontext.
7. Daten, die im MVP bearbeitet werden muessen: Kommentartext, Typ, Kompetenzbezug, Severity, Sichtbarkeit und Lernpunkte, vermutlich in `metadata_json` oder `comment_text`, solange keine Lernpunkt-Tabelle existiert.
8. Benoetigte Frontend-Ansicht oder Flow: Review-Liste je Projekt/Szenario, Kommentar-Editor, Sichtbarkeitsmarkierung, einfache Lernpunkte, Trainee-sichtbare Ansicht gefiltert nach Sichtbarkeit.
9. Abhaengigkeiten zu anderen Screens: Simulation konfigurieren, Projekt, Strategie, Briefing, Rollenprofil, Dashboard.
10. Nicht-MVP-Abgrenzung: keine automatische Bewertung, keine Score-Engine, keine Zertifikatslogik, keine komplexe Rechte-/Freigabe-Engine, kein vollwertiger Lerntransfer-Screen.

Bewertung: Trainerreview kann im MVP auch ohne produktive Simulation sinnvoll sein, wenn ein `SimulationScenario` als fachlicher Vorbereitungsanker existiert. Die groesste konzeptionelle Luecke ist der fehlende direkte Review-Bezug zu Projekt/Strategie/Briefing, wenn noch kein Szenario angelegt wurde. Fuer den MVP sollte daher frueh entschieden werden, ob Reviews immer ueber ein vorbereitetes Scenario laufen oder ob spaeter ein allgemeinerer Review-Anker benoetigt wird.

## 5. Querschnittliche API-Luecken

Stand nach Phase B4 / Issue #22: Die Backend-Readiness fuer Strategieobjekte ist umgesetzt. Fuer `Strategy`, `ZopaItem`, `BatnaOption`, `ConcessionItem` und `ArgumentationLine` gibt es nun Listen-, Detail-, Create- und PATCH-Endpunkte mit MVP-relevanten Filtern. Create-Endpunkte validieren referenzierte Objekte; PATCH-Endpunkte aktualisieren nur gesetzte Felder. Es wurden keine automatische ZOPA-Berechnung, BATNA-Bewertung, KI-Strategie-Generierung, Angebotsanalyse, neue Versionierungslogik, Frontend-Aenderungen, Modell- oder Migrationsaenderungen eingefuehrt.

1. Filterfaehige Listenendpunkte: Fuer Stammdaten, Projekte, Knowledge-Base-Lesebasis und Strategieobjekte sind erste Filter vorhanden. Weitere Filter bleiben fuer SimulationScenario, TrainerComment und spaetere Sichtbarkeitslogik offen.
2. Update-Endpunkte: Fuer Company, UserProfile, SupplierProfile, RequestItem, NegotiationProject und Strategieobjekte sind `PATCH`-Endpunkte vorhanden. Updates fuer Knowledge-Base-, Simulation- und Review-Objekte bleiben Folgearbeit.
3. Fehlende Router fuer bereits modellierte Objekte: Besonders wichtig sind nun SimulationScenario und TrainerComment. Fuer Knowledge Base sind Claims, Chunks, ProcurementHistoryItems und Importstatus lesend verfuegbar; Strategieobjekte sind CRUD-nah verfuegbar; fachliche Schreib- und Review-Flows bleiben Folgearbeit.
4. Detail-/Summary-Antworten: Viele Screens brauchen zusammengesetzte Daten, etwa Projekt mit Company/Owner/Supplier/RequestItem, Strategie mit Unterlisten, Company mit Datenlage oder Dashboard-Summary.
5. JSONB-Konventionen: Analyse-, Stakeholder-, Relationship-, Hypothesen- und reduzierte Angebotsvergleichsnotizen sollten fuer den MVP als klare Dokumentationskonventionen gefuehrt werden, bevor neue Tabellen entstehen.
6. Sichtbarkeit: Trainerinterne vs. trainee-sichtbare Inhalte sind fachlich markiert, aber noch keine Rechteverwaltung. API-Filter duerfen das als fachlichen Parameter behandeln, nicht als vollstaendige Auth-Loesung.
7. Validierung gleicher Company: Create/Update-Endpunkte fuer verknuepfte Objekte sollten wie `NegotiationProject` sicherstellen, dass referenzierte Objekte zur gleichen Company gehoeren.

### 5.1 Phase B3 Read-API-Status

Ergaenzte read-only Endpunkte:

- `GET /api/document-chunks`, `GET /api/document-chunks/{id}`
- `GET /api/knowledge-claims`, `GET /api/knowledge-claims/{id}`
- `GET /api/procurement-history-items`, `GET /api/procurement-history-items/{id}`
- `GET /api/import-jobs`, `GET /api/import-jobs/{id}`
- `GET /api/import-rows`, `GET /api/import-rows/{id}`

Umgesetzte Filter:

- `DocumentChunk`: `knowledge_document_id`, `company_id`, `negotiation_project_id`
- `KnowledgeClaim`: `company_id`, `negotiation_project_id`, `supplier_profile_id`, `knowledge_document_id`, `document_chunk_id`, `claim_type`, `information_kind`, `confidence_level`, `is_ai_generated`
- `ProcurementHistoryItem`: `company_id`, `category`, `item_name`, `country`, `supplier_name`, `purchased_from`, `purchased_to`
- `ImportJob`: `company_id`, `negotiation_project_id`, `status`, `source_type`, `target_entity`
- `ImportRow`: `import_job_id`, `company_id`, `negotiation_project_id`, `status`, `target_entity`, `row_number`
- `KnowledgeDocument`: `company_id`, `negotiation_project_id`, `document_type`, `status`, `source_type`

Bewusst nicht umgesetzt wurden Filter fuer Felder, die im aktuellen Modell nicht existieren: `DocumentChunk.chunk_type`, `DocumentChunk.status`, `KnowledgeClaim.status`, `KnowledgeClaim.target_entity`, `ProcurementHistoryItem.supplier_profile_id`, `ProcurementHistoryItem.article_name`, `ImportJob.created_by_user_profile_id`. Bei `ImportRow.status` wird der API-Filter bewusst auf das vorhandene Feld `validation_status` gemappt; bei projektbezogenen Filtern wird `negotiation_project_id` auf das interne Feld `project_id` gemappt.

### 5.2 Phase B4 Strategy-API-Status

Ergaenzte Endpunkte:

- `GET /api/strategies`, `POST /api/strategies`, `GET /api/strategies/{id}`, `PATCH /api/strategies/{id}`
- `GET /api/zopa-items`, `POST /api/zopa-items`, `GET /api/zopa-items/{id}`, `PATCH /api/zopa-items/{id}`
- `GET /api/batna-options`, `POST /api/batna-options`, `GET /api/batna-options/{id}`, `PATCH /api/batna-options/{id}`
- `GET /api/concession-items`, `POST /api/concession-items`, `GET /api/concession-items/{id}`, `PATCH /api/concession-items/{id}`
- `GET /api/argumentation-lines`, `POST /api/argumentation-lines`, `GET /api/argumentation-lines/{id}`, `PATCH /api/argumentation-lines/{id}`

Umgesetzte Filter:

- `Strategy`: `company_id`, `negotiation_project_id`, `status`, `is_active`
- `ZopaItem`: `strategy_id`, `dimension`, `priority`, `information_kind`
- `BatnaOption`: `strategy_id`, `option_type`, `feasibility_level`, `risk_level`, `ranking`
- `ConcessionItem`: `strategy_id`, `concession_type`, `concession_order`, `is_final_offer_item`, `risk_level`
- `ArgumentationLine`: `strategy_id`, `argument_type`, `priority`, `information_kind`

Bewusst ohne Schemaaenderung umgesetzt wurden die API-Filter `option_type` und `concession_order`: `option_type` wird auf das vorhandene Modellfeld `batna_type` gemappt, `concession_order` auf `sequence_order`.

### 5.3 Phase B5 Simulation- und Review-API-Status

Ergaenzte Endpunkte:

- `GET /api/simulation-scenarios`, `POST /api/simulation-scenarios`, `GET /api/simulation-scenarios/{id}`, `PATCH /api/simulation-scenarios/{id}`
- `GET /api/trainer-comments`, `POST /api/trainer-comments`, `GET /api/trainer-comments/{id}`, `PATCH /api/trainer-comments/{id}`

Umgesetzte Filter:

- `SimulationScenario`: `company_id`, `negotiation_project_id`, `strategy_id`, `supplier_profile_id`, `user_profile_id`, `status`, `scenario_type`, `difficulty_level`, `language`
- `TrainerComment`: `simulation_scenario_id`, `simulation_result_id`, `simulation_message_id`, `trainer_user_profile_id`, `comment_type`, `severity`, `is_visible_to_trainee`

Create- und PATCH-Endpunkte validieren die vorhandenen Foreign Keys und die fachlichen Zugehoerigkeiten: Szenarien bleiben an Company und NegotiationProject gebunden; optionale Strategy-, SupplierProfile- und UserProfile-Referenzen muessen zum gleichen Kontext passen. TrainerComments haengen im MVP weiterhin immer an einem `SimulationScenario`. Optionale Bezuege auf `SimulationResult`, `SimulationMessage` und Trainer-`UserProfile` werden gegen dieses Szenario beziehungsweise dessen Company geprueft.

Produktentscheidung fuer den MVP: Es wird kein allgemeinerer Trainerreview-Anker eingefuehrt. Trainerfeedback nutzt weiterhin `SimulationScenario` als fachlichen Vorbereitungs- und Review-Anker, auch wenn keine produktive Simulation stattfindet. Ein direkterer oder allgemeinerer Review-Bezug zu Projekt, Strategie, Analyse oder Briefing bleibt eine spaetere Produktentscheidung.

## 6. Querschnittliche Frontend-Luecken

1. App-Shell und Navigation: Es fehlt eine fachliche Navigation fuer Dashboard, Companies, Profile, Datenbasis, Projekte, Analyse, Strategie, Briefing, Simulation und Reviews.
2. Routing: Es fehlen Next-Routes fuer Listen-, Detail- und Edit-Flows.
3. API-Client: Es fehlt eine zentrale Client-Struktur fuer FastAPI-Aufrufe, Fehlerbehandlung und spaetere Typisierung.
4. Datenlisten und Detailansichten: Tabellen, Statuschips, Filter, Detailseiten und Bearbeitungsformulare fehlen.
5. Workflow-Kontext: Projektbezogene Screens brauchen eine gemeinsame Kontextnavigation, damit Analyse, Strategie, Briefing, Simulation und Review zusammenhaengen.
6. Unterlisten-Editoren: Strategie-Builder braucht robuste UI-Muster fuer ZOPA, BATNA, Konzessionen und Argumentationslinien.
7. Sichtbarkeits- und Notiz-UI: Trainerreview, Profilhinweise, Hypothesen und Stakeholdernotizen brauchen einfache, klar markierte Eingabe- und Anzeigeformen.

## 7. Empfohlene technische Folgeissues

Die Reihenfolge sollte Backend-Readiness und Frontend-Nutzbarkeit so staffeln, dass zuerst die Stammdaten- und Projektstrecke steht, danach Strategie und Review. RAG, Upload, OCR, Chat, Voice und produktive Simulation bleiben bewusst ausserhalb dieser Phase.

1. Backend API Readiness fuer Stammdaten und Projekte  
   Begruendung: Company, UserProfile, SupplierProfile, RequestItem und NegotiationProject sind die Grundlage fast aller Screens. Prioritaet haben Filter, Update-Endpunkte und Detail-Kompositionen.

2. Backend API Readiness fuer Knowledge-Base-Lesezugriffe  
   Status: umgesetzt in Phase B3 / Issue #21. Upload/Import selbst bleibt ausgeschlossen.

3. Backend API Readiness fuer Strategieobjekte  
   Status: umgesetzt in Phase B4 / Issue #22. Automatische Strategie-, ZOPA-, BATNA- oder Angebotslogik bleibt ausgeschlossen.

4. Backend API Readiness fuer SimulationScenario und TrainerComment  
   Begruendung: Simulation konfigurieren und Trainerreview benoetigen eigene Router, Filter, Updates und Sichtbarkeitsmarkierung. `SimulationMessage` und `SimulationResult` koennen zunaechst nachrangig oder lesend geplant werden, solange keine produktive Simulation entsteht.

5. Frontend-Grundlayout, Navigation und API-Client  
   Begruendung: Ohne App-Shell, fachliches Routing und API-Client lassen sich die MVP-Flows nicht sinnvoll aufbauen.

6. Frontend-Flows fuer Company, UserProfile, SupplierProfile, RequestItem und Projects  
   Begruendung: Diese Flows schaffen die operative Basis fuer Projektdefinition, Dashboard-Komposition und Folge-Screens.

7. Frontend-Flow fuer Knowledge Base und Analyseansicht  
   Begruendung: Die Datenbasis muss sichtbar werden, bevor Strategiearbeit fachlich belastbar ist. Die Analyse kann zunaechst mit manuellen Notiz-/JSONB-Konventionen starten.

8. Frontend-Flow fuer Strategie-Builder  
   Begruendung: Nach Strategy-API-Readiness koennen Strategie-Kopf und Unterlisten in einem gefuehrten Projektkontext umgesetzt werden.

9. Frontend-Flow fuer Simulation konfigurieren und Trainerreview  
   Begruendung: Diese Screens schliessen den trainergefuehrten MVP-Workflow ab und brauchen die Vorarbeit aus Projekt, Strategie und Briefing.

10. Dashboard-Summary oder einfache Dashboard-Komposition  
    Begruendung: Fuer einen ersten MVP kann das Dashboard aus bestehenden Listen und Filtern komponiert werden. Eine dedizierte Summary-API lohnt sich, wenn die Review-, Scenario- und Statuslogik stabiler ist.

## 8. Entscheidungspunkte fuer Phase B1/B2

- Sollen Reviews im MVP immer an einem `SimulationScenario` haengen, auch wenn keine produktive Simulation stattfindet?
- Welche JSONB-Konventionen gelten fuer Hypothesen, Stakeholdernotizen, Relationship-Kontext, Kulturhypothesen und reduzierte Vergleichsnotizen?
- Welche Projektstatuswerte reichen fuer Dashboard und Workflow-Navigation?
- Welche Felder duerfen Trainees bearbeiten, und welche sind trainerintern?
- Welche Strategie-Unterobjekte muessen im ersten Strategie-Builder wirklich editierbar sein?
- Reicht fuer das erste Dashboard Frontend-Komposition, oder wird direkt eine Summary-API geplant?

## 9. Nicht-MVP bleibt ausgeschlossen

- Neue Datenmodelle fuer `CulturalBriefing`, `StakeholderNote`, `SupplierBid`, `BidComparison`, `RelationshipMemoryItem` oder `ProjectParticipant`
- Alembic-Migrationen
- neue produktive Upload-/Import-Funktion
- Parser, OCR, Chunking-Service, Embeddings, RAG oder automatische Claim-Extraktion
- produktive Simulation, Chat, Voice, Streaming oder Prompt-Engine
- automatische Analyse, automatische Bewertung, Score-Engine, Zertifikate oder Lernhistorie
- Rollenrechte-, Admin- oder Mandantenverwaltungslogik
