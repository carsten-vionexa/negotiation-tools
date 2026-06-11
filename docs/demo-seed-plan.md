# Demo-Seed-Plan fuer reproduzierbare Readiness-Testfaelle

## 1. Zweck

D12.2 leitete aus der D12.1-Testdatenmatrix einen technischen Plan fuer spaetere
Demo-Seed-Erweiterungen ab. D12.3 setzt daraus den kleinsten reproduzierbaren
Readiness-Satz im bestehenden idempotenten Demo-Seed um.

Die Umsetzung bleibt eine Seed-/Dokumentationsaenderung. Sie fuehrt keine neue
Produktfunktion, keine Datenbankmigration, keine Backend-API, keine Frontend-UI,
keine KI-, RAG-, Claim-, Simulations- oder Trainerreview-Logik und kein
Staging-Deployment ein.

## 2. Bestehender Demo-Stand

Der aktuelle technische Demo-Anker ist der idempotente Staging-Demo-Seed in
`backend/app/seeds/staging_demo.py`, dokumentiert in
`docs/deployment/staging-demo-data.md`.

| Objekt | Bestehender Demo-Stand | Einordnung fuer D12.2 |
| --- | --- | --- |
| Company | `Rheinwerk Robotics GmbH` mit fester Demo-UUID und Demo-Markern | Weiterverwenden als gemeinsamer synthetischer Kundenkontext |
| RequestItem | Strategische Beschaffung von `Praezisions-Servoantrieb RX-42` | Weiterverwenden fuer Bedarfskontext, Preparation Gaps und Briefing Preparation |
| SupplierProfile | `Aurum Motion Systems K.K.` mit Region, Beziehung, Verhandlungssignalen und kulturellem Kontext | Weiterverwenden fuer gepflegten Supplier Context |
| NegotiationProject | `Verhandlung: Praezisions-Servoantrieb RX-42`, verknuepft mit RequestItem und SupplierProfile | Als bestehendes vorfuehrbares Hauptprojekt erhalten, nicht mit allen Testzustaenden ueberladen |

Der Seed erhaelt den bestehenden Rheinwerk-/Aurum-Hauptfall und ergaenzt D12.3
um separate Demo-Projekte fuer die zentralen Readiness-Zustaende.

Weiterhin nicht durch den Seed angelegt werden:

- `SimulationScenario`
- `TrainerComment`
- feingranulare Zusatzvarianten wie Weak Supplier, No RequestItem oder Simulation Review

Der bestehende Rheinwerk-/Aurum-Fall enthaelt weiterhin in
`NegotiationProject.strategy_data` und `simulation_data` nur Demo-Notizen
beziehungsweise Readiness-Hinweise. Die neuen D12.3-Projekte bilden die
Readiness-Zustandspruefungen getrennt davon ab.

## 3. Planungsprinzipien

- Mehrere getrennte Demo-Projekte sind robuster als ein einziges Projekt, das
  fuer jeden Testlauf manuell in einen anderen Zustand gebracht wird.
- Der bestehende Rheinwerk-/Aurum-Fall bleibt als stabile Demo-Story erkennbar.
- Zusatzzustaende sollen synthetische Namen, feste IDs und klare Demo-Marker
  erhalten.
- Lokale Seeds duerfen mehr Varianten enthalten als Staging.
- Staging sollte nur vorfuehrbare, stabile und produktdatenfreie Zustaende
  enthalten.
- Testdaten duerfen keine neue Produktfunktion suggerieren. Sie machen nur
  vorhandene UI- und API-Zustaende reproduzierbar.
- D11 bleibt nicht zur Umsetzung freigegeben. AI Strategy Coach, RAG,
  Claim-Extraktion und KI-gestuetzte Vorschlaege bleiben separate spaetere
  Themen.

## 4. Empfohlene Demo-Projektstruktur

Der spaetere Seed sollte auf einer gemeinsamen synthetischen Rheinwerk-Company
aufbauen und mehrere klar benannte Projekte erzeugen. Die genaue Benennung kann
in D12.3 finalisiert werden; fachlich sinnvoll ist diese Struktur:

| Geplanter Zustand | Zweck | Umgebung | Empfehlung |
| --- | --- | --- | --- |
| D12-Empty-Strategy | Project mit RequestItem und SupplierProfile, aber ohne Strategy | lokal und Staging | Als stabile Empty-State-Referenz anlegen |
| D12-Partial-Strategy | Project mit unvollstaendiger Strategy und ersten Bausteinen | lokal und Staging | Als `Grundlage vorhanden`-Referenz anlegen |
| D12-Ready-Strategy | Project mit vollstaendiger Strategy und Bausteinen | lokal und Staging | Auf Basis der Rheinwerk-/Aurum-Story oder als separates Ready-Projekt anlegen |
| D12-No-Supplier | Project mit RequestItem, aber ohne SupplierProfile | lokal und Staging | Fuer Supplier-Empty-State klein halten |
| D12-Weak-Supplier | Project mit SupplierProfile, aber schwach gepflegtem Supplier Context | lokal | Fuer Missing-Information-Hints lokal ausreichend |
| D12-Rich-Supplier | Project mit gepflegtem Supplier Context | lokal und Staging | Bestehenden Aurum-Kontext weiterverwenden |
| D12-Simulation-Review | Project mit Strategy und optional SimulationScenario/TrainerComment | lokal, spaeter optional Staging | Erst ergaenzen, wenn Simulation/Trainerreview-Demo priorisiert ist |

Der bestehende Seed sollte nicht einfach zu einem Alles-in-einem-Projekt
ausgebaut werden. Ein ueberladenes Demo-Projekt wuerde Empty States,
unvollstaendige Strategy-Zustaende und vollstaendige Readiness gegenseitig
verdecken. Fuer Browser-Smoke-Tests waere dann unklar, welcher Test den
aktuellen Zustand veraendert oder voraussetzt.

## 4a. D12.3 umgesetzte Demo-Projekte

D12.3 nutzt weiter `backend/app/seeds/staging_demo.py` und legt die zentralen
Zustaende mit festen UUIDs und `demo_phase: D12.3` in `metadata_json` an.

| Demo | Project-ID | Strategy-ID | Erwartete Route | Erwarteter Zustand |
| --- | --- | --- | --- | --- |
| A: Empty Strategy | `f06a85a1-5d41-5a47-8d14-52af0493b606` | keine Seed-Strategy | `/projects/f06a85a1-5d41-5a47-8d14-52af0493b606`, `/strategy?projectId=f06a85a1-5d41-5a47-8d14-52af0493b606` | RequestItem und Aurum-Supplier vorhanden, Strategy Empty State |
| B: Unvollstaendige Strategy | `63154d03-dee6-5fc9-a1b4-d8eaeeed0de4` | `b7c21e7e-3e8a-5377-97b4-8c265c2db05d` | `/strategy?projectId=63154d03-dee6-5fc9-a1b4-d8eaeeed0de4` | `Unvollstaendig`, keine Next-Action-Guidance |
| C: Grundlage vorhanden | `0ca3270b-b999-5564-9756-265eddb5c835` | `ebfe2953-7bc1-5573-b86c-f94117efd525` | `/strategy?projectId=0ca3270b-b999-5564-9756-265eddb5c835` | Objectives, ZOPA und Konzessionen vorhanden; BATNA, WAP und Argumente offen |
| D: Bereit fuer Briefing / Simulation | `6a6f7d66-7fad-5a2b-93b5-4cfcdb7c4200` | `9182fa82-6b5e-525b-a34c-b35cf361412c` | `/strategy?projectId=6a6f7d66-7fad-5a2b-93b5-4cfcdb7c4200`, `/briefing?projectId=6a6f7d66-7fad-5a2b-93b5-4cfcdb7c4200` | alle Kernbausteine vorhanden, Next-Action-Guidance sichtbar |
| E: Kein SupplierProfile | `b0be8f1b-e08e-5def-bdbf-5cbca5123290` | keine Seed-Strategy | `/projects/b0be8f1b-e08e-5def-bdbf-5cbca5123290` | RequestItem vorhanden, Supplier Context Empty State |

Die Seed-Ausfuehrung bleibt idempotent: vorhandene Demo-Datensaetze mit diesen
festen IDs werden aktualisiert, fehlende werden angelegt, Nicht-Demo-Daten
werden nicht geloescht. D12.3 fuehrt kein Staging-Deployment aus.

## 5. Technische Zielzustaende

### 5.1 Empty Strategy

Ziel:

- pruefbarer Zustand fuer `/strategy?projectId=...` ohne vorhandene Strategy
- Preparation Gaps erkennt Strategy als offen
- Supplier Context und RequestItem duerfen vorhanden sein, damit nur die
  Strategy-Luecke isoliert sichtbar wird

Betroffene Entitaeten:

- `Company`
- `RequestItem`
- `SupplierProfile`
- `NegotiationProject`

Nicht anlegen:

- `Strategy`
- Strategy-Bausteine
- `SimulationScenario`
- `TrainerComment`

Erwartete UI-Zustaende:

- Strategy-Seite zeigt projektbezogenen Empty State und manuelle Anlage.
- Project Preparation fuehrt zum bestehenden Strategy-Einstieg.
- Keine automatische Strategieerzeugung wird suggeriert.

### 5.2 Partial Strategy / Grundlage vorhanden

Ziel:

- pruefbarer Zustand fuer eine teilweise belastbare Strategy
- Readiness soll wie `Grundlage vorhanden` wirken, nicht wie fertig
- fehlende Bausteine bleiben sichtbar

Betroffene Entitaeten:

- `Company`
- `RequestItem`
- `SupplierProfile`
- `NegotiationProject`
- `Strategy`
- optional ein `ZopaItem` oder eine `ArgumentationLine`

Mindestfelder:

- `Strategy.title`
- `Strategy.company_id`
- `Strategy.negotiation_project_id`
- `Strategy.overall_objective` oder `target_outcome`
- mindestens ein fachlicher Anker, zum Beispiel `zopa_summary` oder ein
  `ZopaItem.dimension`

Bewusst unvollstaendig lassen:

- `batna_summary` oder `BatnaOption`
- `walk_away_point`
- `concession_strategy` oder `ConcessionItem`
- vollstaendige Argumentations- und Risikoabdeckung

Erwartete UI-Zustaende:

- Readiness bleibt unterhalb von `Bereit fuer Briefing / Simulation`.
- fehlende BATNA-, WAP-, Konzessions- oder Argumentationsbausteine werden
  nachvollziehbar angezeigt.
- Next-Action-Guidance fuer fertige Folgeprozesse erscheint noch nicht als
  Vollstaendigkeitsversprechen.

### 5.3 Ready Strategy / Bereit fuer Briefing und Simulation

Ziel:

- stabiler Demo-Zustand fuer vollstaendige Strategy Readiness
- pruefbarer Einstieg in Briefing Preparation, Simulation Preparation und
  Trainerreview-Vorbereitung

Betroffene Entitaeten:

- `Company`
- `RequestItem`
- `SupplierProfile`
- `NegotiationProject`
- `Strategy`
- mindestens je ein `ZopaItem`, `BatnaOption`, `ConcessionItem` und
  `ArgumentationLine`

Mindestfelder:

- Strategy-Ziel: `overall_objective`, `target_outcome`,
  `minimum_acceptable_outcome`
- Grenzen: `walk_away_point`, `zopa_summary`, mindestens ein ZOPA-Datensatz
- Alternative: `batna_summary`, mindestens eine bevorzugte `BatnaOption`
- Tauschlogik: `concession_strategy`, mindestens ein `ConcessionItem`
- Argumentation: `argumentation_summary`, mindestens eine
  `ArgumentationLine`

Erwartete UI-Zustaende:

- Readiness wirkt vollstaendig.
- Next-Action-Guidance fuer Briefing-/Simulation-/Trainerreview-Vorbereitung ist
  sichtbar.
- Briefing bleibt Vorbereitung und erzeugt kein KI-Briefing automatisch.
- Simulation und Trainerreview bleiben vorhandene Vorbereitungsbereiche, keine
  produktive Simulation.

### 5.4 Kein SupplierProfile

Ziel:

- isolierter Empty State fuer Supplier Context Card und Preparation Gaps

Betroffene Entitaeten:

- `Company`
- optional `RequestItem`
- `NegotiationProject` ohne `supplier_profile_id`

Erwartete UI-Zustaende:

- Supplier Context Card zeigt Empty State.
- Preparation Gaps markiert Lieferantenprofil oder Supplier Context als offen.
- Es entsteht kein fehlerhafter Link zu einem nicht vorhandenen SupplierProfile.

### 5.5 Schwacher Supplier Context

Ziel:

- pruefbarer Zustand fuer Missing-Information-Hints ohne kompletten
  Lieferantenkontext

Betroffene Entitaeten:

- `Company`
- `SupplierProfile` mit Name und Company, aber wenigen Kontextfeldern
- `NegotiationProject` mit `supplier_profile_id`

Bewusst leer oder schwach halten:

- `region`
- `relationship_status`
- `cultural_context`
- `interests_json`
- `likely_tactics_json`
- `constraints_json`

Erwartete UI-Zustaende:

- Supplier Context Card zeigt Basisdaten.
- Readiness-/Missing-Information-Hints fuehren zur Nachpflege.
- Keine automatische Bewertung, kein Supplier Scoring, keine KI-Analyse.

### 5.6 Gepflegter Supplier Context

Ziel:

- stabiler Nicht-Empty-State fuer Supplier Context Card
- vorfuehrbare Rheinwerk-/Aurum-Story erhalten

Betroffene Entitaeten:

- bestehende Rheinwerk-Company
- bestehendes Aurum-SupplierProfile
- bestehendes oder separates NegotiationProject

Erwartete UI-Zustaende:

- Supplier Context Card zeigt Region, Kategorie, Beziehung, Signale und
  kulturellen Kontext.
- Edit-Guidance fuehrt zum bestehenden SupplierProfile.
- Daten wirken synthetisch und nicht wie echte Kunden- oder Personendaten.

### 5.7 Simulation- und Trainerreview-Kontext

Ziel:

- spaetere optionale Pruefung von Simulation Preparation und Trainerreview

Betroffene Entitaeten:

- `Company`
- `RequestItem`
- `SupplierProfile`
- `NegotiationProject`
- `Strategy`
- optional `SimulationScenario`
- optional `TrainerComment`

Abgrenzung:

- fuer D12.3 nur aufnehmen, wenn Simulation-/Trainerreview-Demo explizit
  priorisiert wird
- kein Chat, kein Voice, keine produktive Simulation, keine automatische
  Bewertung

## 6. Idempotenz und Wartbarkeit

Ein spaeterer D12.3-Seed sollte als Ensure-/Upsert-Mechanismus geplant werden:

- feste UUIDs pro Demo-Objekt oder stabile natuerliche Schluessel in
  `metadata_json`
- gemeinsamer `demo_seed`-Marker, zum Beispiel ein neuer D12-spezifischer Tag
- `demo_scope` getrennt nach `local` und `staging`, falls lokale Varianten
  umfangreicher sind
- keine unkontrollierte Duplikation bei wiederholter Ausfuehrung
- keine Loesch- oder Reset-Logik als Standardpfad
- keine echten Personen-, Kunden-, Lieferanten-, Preis- oder Geheimdaten
- `.example.invalid` oder vergleichbare nicht-produktive Kontakt- und Webdaten
- keine Veraenderung manueller Nicht-Demo-Daten
- klare Trennung zwischen bestehendem Rheinwerk-/Aurum-Hauptfall und
  zusaetzlichen D12-Testfaellen

Schreibende Browser-Smoke-Tests duerfen die Seed-Zustaende nicht dauerhaft
beschaedigen. Wenn Tests Daten veraendern muessen, sollte D12.3 entweder
separate lokale Spielwiesen-Projekte vorsehen oder dokumentieren, dass der Seed
vor einem Testlauf erneut ausgefuehrt wird.

## 7. Lokale und spaetere Staging-Verfuegbarkeit

Lokal empfohlen:

- alle Empty-, Partial-, Ready- und Supplier-Kontext-Zustaende
- zusaetzliche Varianten fuer fehlende BATNA, fehlenden WAP und fehlende
  Konzessionslogik
- optional SimulationScenario und TrainerComment, wenn die lokalen
  Vorbereitungsrouten gezielt geprueft werden

Staging empfohlen:

- Empty Strategy
- Partial Strategy
- Ready Strategy
- No Supplier
- gepflegter Supplier Context auf Basis Rheinwerk/Aurum

Staging vorerst nicht zwingend:

- alle feingranularen Readiness-Untervarianten
- schwacher Supplier Context, sofern er fuer Demos eher irritiert als hilft
- SimulationScenario und TrainerComment, solange Simulation und Trainerreview
  nicht als vorfuehrbarer Demo-Strang priorisiert sind

## 8. Risiko bei Ueberladung des bestehenden Demo-Projekts

Das bestehende Rheinwerk-/Aurum-Projekt ist als vorfuehrbarer Hauptfall
wertvoll. Es sollte nicht gleichzeitig Empty Strategy, Partial Strategy, Ready
Strategy, No Supplier, Weak Supplier und Simulation-Review abbilden muessen.

Risiken einer Ueberladung:

- Smoke-Tests muessen denselben Datensatz vor jedem Test mutieren.
- Readiness-Zustaende ueberschreiben sich gegenseitig.
- Empty States sind nicht mehr pruefbar, sobald das Hauptprojekt vollstaendig
  gepflegt ist.
- Staging-Demos werden schwer erklaerbar, weil absichtlich fehlende Daten wie
  Produktluecken wirken koennen.
- Manuelle Tests koennen den vorfuehrbaren Demo-Zustand beschaedigen.

Empfehlung:

- Rheinwerk/Aurum als Hauptstory weiterverwenden.
- Zusatzzustaende als kleine, klar benannte D12-Demo-Projekte anlegen.
- Lokale Sonderfaelle umfangreicher halten als Staging-Sonderfaelle.

## 9. D12.3-Zuschnitt

D12.3 ist als kleiner Seed-Zuschnitt umgesetzt:

1. Nur Seed-Implementierung fuer den kleinsten D12-Demo-Satz.
2. Bestehendes Seed-Modul erweitern.
3. Feste Demo-IDs, Demo-Marker und Idempotenz dokumentieren.
4. Zunaechst Company, RequestItem, SupplierProfile, NegotiationProject,
   Strategy und Strategy-Bausteine anlegen.
5. SimulationScenario und TrainerComment nicht aufnehmen.
6. Keine Migration, keine Produktlogik, keine UI-Aenderung, kein Staging-
   Deployment und keine KI-/RAG-/Claim-Implementierung.

D12-Ready-Strategy ist bewusst ein separates Projekt. Der bestehende
Rheinwerk-/Aurum-Hauptfall bleibt nachvollziehbar und wird nicht mit allen
Readiness-Zustaenden ueberladen.

## 10. Offene Nicht-Blocker

- Issue #55 bleibt als PDF-/Upload-/Parsing-Folgearbeit offen und blockiert
  D12.2 nicht.
- Issue #113 bleibt als Next/PostCSS-audit-Finding zur Beobachtung offen und
  blockiert D12.2 nicht.
- Issue #155 bleibt als D11 / AI-assisted Strategy Coaching offen. D12.2 ist
  nur ein Seed-Plan und keine Implementierungsfreigabe fuer KI, RAG,
  Claim-Extraktion, Kontextvertrag, Strategy Coach, Simulation oder
  Trainerreview-Logik.

## 11. Explizite Nicht-Ziele

D12.2 fuehrt nicht ein:

- Produktcode
- Frontend- oder Backend-Aenderungen
- Datenbankmigrationen
- Seed-Implementierung oder Seed-Aenderung
- Staging-Deployment
- neue API-Endpunkte
- neue Models oder Tabellen
- neue Strategy-, Readiness-, Simulation- oder Trainerreview-Logik
- automatische Strategieerzeugung
- KI-, RAG-, Claim- oder Evidence-Implementierung
- PDF-Verarbeitung
