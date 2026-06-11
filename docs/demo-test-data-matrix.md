# Demo-/Testdatenmatrix fuer Strategy Readiness und Preparation Flow

## 1. Zweck

D12.1 beschreibt eine kleine, kontrollierte Demo-/Testdatenmatrix fuer
reproduzierbare lokale und spaetere Staging-Smoke-Tests. Die Matrix ist ein
Konzept- und Dokumentationsschritt. Sie legt keine Seeds an, aendert keine
Demo-Daten und fuehrt keine Produktlogik ein.

Ziel ist, zentrale MVP-Zustaende gezielt pruefbar zu machen:

- Strategy Readiness Guidance
- Strategy Next-Action Guidance
- Strategy Overview / Strategy Board
- Briefing Preparation mit und ohne `projectId`
- Project Preparation / Preparation Gaps
- Supplier Context Card
- Simulation Preparation
- Trainerreview

D12.1 aktiviert D11 nicht. Spaetere AI-Coaching-Testfaelle koennen vorgemerkt
werden, bleiben aber getrennte Folgearbeit ohne KI-, RAG-, Claim- oder
Kontextvertrags-Implementierung.

## 2. Bestehende Demo-Daten

Der aktuelle reproduzierbare Demo-Anker ist der synthetische Rheinwerk-/Aurum-
Datensatz aus `docs/deployment/staging-demo-data.md`.

| Objekt | Aktueller Demo-Stand | Nutzung fuer D12.1 |
| --- | --- | --- |
| Company | `Rheinwerk Robotics GmbH` | Stabiler Kundenkontext fuer Projekt-, Strategy- und Briefing-Flows |
| RequestItem | Strategische Beschaffung von Praezisions-Servoantrieben | Bedarfskontext fuer Project Detail, Preparation Gaps und Briefing Preparation |
| SupplierProfile | `Aurum Motion Systems K.K.` | Lieferantenkontext fuer Supplier Context Card und Preparation Gaps |
| NegotiationProject | `Verhandlung: Praezisions-Servoantrieb RX-42` | Hauptanker fuer lokale und Staging-Smoke-Tests |

Aktuell bewusst nicht durch den Staging-Demo-Seed abgedeckt sind mehrere
parallele Strategy-Readiness-Zustaende, mehrere Preparation-Gaps-Zustaende,
Knowledge-/Evidence-Daten, ProcurementHistoryItems, SimulationScenarios und
TrainerComments. Einige dieser Zustaende wurden lokal oder auf Staging in
frueheren Smoke-Tests manuell hergestellt, sind aber nicht als reproduzierbare
Testdatenmatrix gesichert.

## 3. Matrix-Prinzipien

- Testfaelle sollen synthetisch, klar benannt und als Demo/Testdaten markiert
  sein.
- Lokale Tests duerfen mehr Varianten enthalten als Staging.
- Staging sollte nur stabile, vorfuehrbare und produktdatenfreie Demo-Zustaende
  enthalten.
- Ein einzelnes Demo-Projekt reicht nicht fuer alle Readiness-Zustaende, weil
  sich unvollstaendige und vollstaendige Strategy-Zustaende gegenseitig
  ueberschreiben.
- Fuer Readiness- und Preparation-Varianten sind mehrere klar getrennte
  Demo-Projekte besser als ein laufend mutiertes Projekt.
- Testdaten duerfen keine neue Produktfunktion suggerieren. Sie machen nur
  vorhandene MVP-Zustaende reproduzierbar.

## 4. Strategy-Readiness-Testfaelle

| ID | Zustand | Benoetigte Daten | Erwartete Pruefung | Lokal | Spaeter Staging |
| --- | --- | --- | --- | --- | --- |
| SR-01 | Projekt ohne Strategy | Project mit Company, optional SupplierProfile und RequestItem, keine Strategy | `/strategy?projectId=...` zeigt Empty State und manuelle Anlage; Project Preparation markiert Strategy als offen | ja | ja |
| SR-02 | Leere oder stark unvollstaendige Strategy | Strategy-Kopf mit minimalem Titel, keine tragfaehigen Ziele, keine ZOPA/BATNA/WAP/Konzessionen/Argumente | Readiness bleibt `Unvollstaendig`; keine Next-Action-Guidance fuer Briefing/Simulation/Trainerreview | ja | optional |
| SR-03 | Teilweise gefuellte Strategy / Grundlage vorhanden | Strategy Objectives und mindestens ein tragfaehiger Anker, aber nicht alle Bausteine | Readiness zeigt `Grundlage vorhanden`; fehlende Bausteine bleiben sichtbar | ja | ja |
| SR-04 | Vollstaendige Strategy / Bereit fuer Briefing / Simulation | Strategy Objectives, ZOPA, BATNA, WAP, Konzessionslogik und Argumente vorhanden | Readiness zeigt `Bereit fuer Briefing / Simulation`; Next-Action-Guidance erscheint | ja | ja |
| SR-05 | ZOPA vorhanden, BATNA fehlt | Strategy mit ZOPA und ggf. Ziel/WAP, aber ohne BATNA | Guidance warnt, dass Alternative fehlt; Status darf nicht als vollstaendig wirken | ja | optional |
| SR-06 | BATNA vorhanden, WAP fehlt | Strategy mit BATNA, aber ohne Walk-away Point | Guidance trennt BATNA und WAP; fehlende Abbruchgrenze bleibt sichtbar | ja | optional |
| SR-07 | Argumente vorhanden, Konzessionslogik fehlt | Strategy mit ArgumentationLines, aber ohne ConcessionItems oder Konzessionsstrategie | Guidance erkennt Gespraechsargumente, markiert fehlende Tauschlogik | ja | optional |

Empfehlung: SR-01, SR-03 und SR-04 sollten mittelfristig auf Staging stabil
verfuegbar sein. SR-02, SR-05, SR-06 und SR-07 reichen zunaechst lokal, weil sie
vor allem Regressionen in der Readiness-Logik und Microcopy absichern.

## 5. Preparation-Flow-Testfaelle

| ID | Zustand | Benoetigte Daten | Erwartete Pruefung | Lokal | Spaeter Staging |
| --- | --- | --- | --- | --- | --- |
| PF-01 | Projekt ohne SupplierProfile | Project mit Company und optional RequestItem, kein `supplier_profile_id` | Supplier Context Card zeigt Empty State; Preparation Gaps markiert Lieferantenprofil offen | ja | ja |
| PF-02 | SupplierProfile mit schwachem Supplier Context | Project mit SupplierProfile, aber wenig gepflegte Kontextfelder | Supplier Context Card zeigt vorhandene Basisdaten und Missing-Information-Hints | ja | optional |
| PF-03 | SupplierProfile mit gepflegtem Supplier Context | Project mit SupplierProfile inklusive Region, Kategorie, Beziehung, Signalen und kulturellem Kontext | Supplier Context Card zeigt Nicht-Empty-State und Edit-Guidance | ja | ja |
| PF-04 | Projekt mit RequestItem / Bedarfskontext | Project ist mit RequestItem verknuepft | Project Detail zeigt Bedarfskontext; Preparation Gaps erkennt RequestItem als vorhanden | ja | ja |
| PF-05 | Projekt ohne RequestItem | Project ohne `request_item_id` | Project Detail bleibt stabil; Preparation Gaps markiert Bedarfskontext offen | ja | optional |
| PF-06 | Projekt mit vorhandener Strategy | Project mit mindestens einer Strategy | Preparation Gaps erkennt Strategy; Strategy Overview / Board kann Projektkontext nutzen | ja | ja |
| PF-07 | Projekt ohne Strategy | Project ohne Strategy | Preparation Gaps fuehrt zum bestehenden Strategy-Einstieg; keine automatische Strategy-Erzeugung | ja | ja |
| PF-08 | Projekt mit Simulation Preparation | Project mit vorhandenem SimulationScenario, sofern im aktuellen MVP angelegt | `/simulation?projectId=...` zeigt Vorbereitungskontext; Project Preparation erkennt Simulation als vorhanden | ja | optional |
| PF-09 | Projekt mit Trainerreview-Kontext | Project mit SimulationScenario und optional TrainerComment, sofern im aktuellen MVP angelegt | `/trainer-review?projectId=...` beziehungsweise `scenarioId`-Flow ist pruefbar; kein automatisches Review | ja | optional |

Empfehlung: PF-01, PF-03, PF-04, PF-06 und PF-07 bilden den kleinsten
stagingtauglichen Preparation-Satz. PF-02, PF-05, PF-08 und PF-09 koennen lokal
bleiben, bis Simulation Preparation und Trainerreview als Demo-Strecke stabiler
priorisiert werden.

## 6. Vorgeschlagene Demo-Projektstruktur

Mehrere getrennte Demo-Projekte sind robuster als ein einziges Projekt mit
wechselndem Zustand.

| Demo-Projekt | Zweck | Mindestobjekte |
| --- | --- | --- |
| D12-Empty-Strategy | SR-01, PF-07 | Company, RequestItem, optional SupplierProfile, Project ohne Strategy |
| D12-Partial-Strategy | SR-03, SR-05 bis SR-07 in lokaler Variante | Company, RequestItem, SupplierProfile, Project, teilweise Strategy |
| D12-Ready-Strategy | SR-04, PF-06, Briefing/Simulation/Trainerreview-Links | Company, RequestItem, SupplierProfile, Project, vollstaendige Strategy |
| D12-No-Supplier | PF-01 | Company, RequestItem, Project ohne SupplierProfile |
| D12-No-RequestItem | PF-05 | Company, SupplierProfile, Project ohne RequestItem |
| D12-Simulation-Review | PF-08, PF-09 | Company, RequestItem, SupplierProfile, Project, Strategy, SimulationScenario, optional TrainerComment |

Der bestehende Rheinwerk-/Aurum-Fall kann als `D12-Ready-Strategy` oder als
Basis fuer ein spaeteres `D12-Ready-Strategy`-Projekt dienen. Fuer die anderen
Zustaende sollten spaeter separate synthetische Projekte angelegt werden, damit
Staging-Smoke-Tests keine produktiven oder vorfuehrbaren Demo-Daten
verfaelschen muessen.

## 7. Lokale und Staging-Reproduzierbarkeit

Lokal:

- alle SR- und PF-Zustaende duerfen reproduzierbar angelegt werden
- schreibende Tests duerfen klar markierte Entwicklungsdaten veraendern
- lokale Smoke-Tests koennen niedrigere Readiness-Zustaende gezielt herstellen
- direkte DB- oder Seed-Hilfen koennen spaeter separat konzipiert werden

Spaeter Staging:

- nur synthetische, vorfuehrbare Demo-Zustaende
- keine produktiven Daten und keine echten Kundeninformationen
- kein manueller Umbau eines einzigen Demo-Projekts fuer jeden Testlauf
- mindestens ein Projekt ohne Strategy, ein Projekt mit teilweiser Strategy und
  ein Projekt mit vollstaendiger Strategy
- mindestens ein Projekt mit SupplierProfile/RequestItem und ein Projekt mit
  sichtbar fehlendem SupplierProfile oder fehlender Strategy

## 8. Nutzung fuer Browser-Smoke-Tests

Die Matrix unterstuetzt spaetere Smoke-Test-Formulierungen:

- Strategy Readiness Guidance: SR-01 bis SR-07
- Strategy Next-Action Guidance: SR-04
- Strategy Overview / Strategy Board: SR-03 und SR-04
- Briefing Preparation mit `projectId`: SR-04 und PF-06
- Briefing Preparation ohne `projectId`: generischer `/briefing`-Check ohne
  Demo-Projekt
- Project Preparation / Preparation Gaps: PF-01 bis PF-09
- Supplier Context Card: PF-01 bis PF-03
- Simulation Preparation: PF-08
- Trainerreview: PF-09

Die Matrix ersetzt keinen manuellen Smoke-Test und keine E2E-Automation. Sie
klaert nur, welche Datenzustaende fuer solche Tests stabil vorhanden sein
sollten.

## 9. Spaetere Demo-Datenbedarfe

Sinnvolle spaetere Ergaenzungen:

- mehrere Strategy-Varianten mit deterministischen IDs und klaren Demo-Markern
- optionale lokale Seed- oder Fixture-Hilfe fuer SR- und PF-Zustaende
- Staging-Erweiterung nur fuer den kleinsten stabilen Demo-Satz
- SimulationScenario fuer eine vorfuehrbare Simulation Preparation
- TrainerComment fuer einen nachvollziehbaren Trainerreview-Kontext
- KnowledgeDocuments oder KnowledgeClaims erst, wenn Knowledge-/Evidence-Flows
  konkret priorisiert sind
- AI-Coaching-Testfaelle erst nach separater Freigabe von D11-Folgeissues

## 10. Offene Nicht-Blocker

- Issue #55 bleibt als PDF-/Upload-/Parsing-Folgearbeit offen und blockiert
  D12.1 nicht.
- Issue #113 bleibt als Next/PostCSS-audit-Finding zur Beobachtung offen und
  blockiert D12.1 nicht.
- Issue #155 bleibt als D11 / AI-assisted Strategy Coaching offen. D12.1
  beschreibt nur Testdatenzustaende und ist keine Implementierungsfreigabe fuer
  KI, RAG, Claim-Extraktion, Kontextvertrag, Strategy Coach, Simulation oder
  Trainerreview-Logik.

## 11. Explizite Nicht-Ziele

D12.1 fuehrt nicht ein:

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
