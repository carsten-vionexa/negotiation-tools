# Staging Demo Data

## Ziel

Die geschuetzte Staging-/Trainer-Demo-Instanz soll mit einem kleinen, reproduzierbaren
Demo-Datensatz vorfuehrbar bleiben. Der Datensatz ist synthetisch, gehoert nicht zu
echten Kunden- oder Produktivdaten und stuetzt den aktuell getesteten Flow:

```text
RequestItem -> NegotiationProject -> Project-Detailseite -> Supplier Context Card
```

## Minimaler Demo-Scope fuer D1.5 und D3.4

Der D1.5-MVP-Datensatz orientiert sich am Rheinwerk-Robotics-Trainingskontext und
enthaelt:

- eine Demo-Company: `Rheinwerk Robotics GmbH`
- ein Demo-RequestItem: strategische Beschaffung von Praezisions-Servoantrieben
- ein damit verknuepftes Demo-NegotiationProject

D3.4 ergaenzt denselben reproduzierbaren Datensatz um:

- ein Demo-SupplierProfile: `Aurum Motion Systems K.K.`
- eine direkte Verknuepfung des Demo-NegotiationProject mit diesem SupplierProfile

D12.3 ergaenzt denselben Seed um separate Readiness-Testprojekte:

- Demo A: RequestItem + SupplierProfile, keine Seed-Strategy
- Demo B: unvollstaendige Strategy
- Demo C: teilweise gefuellte Strategy / `Grundlage vorhanden`
- Demo D: vollstaendige Strategy / `Bereit fuer Briefing / Simulation`
- Demo E: Projekt ohne SupplierProfile

Bewusst noch nicht enthalten sind:

- UserProfile/Trainee
- ProcurementHistoryItems
- KnowledgeDocuments, DocumentChunks oder KnowledgeClaims
- Simulationsszenarien oder Trainerkommentare

Diese Objekte koennen spaeter gezielt ergaenzt werden, sobald der Demo-Ablauf mehr
als die RequestItem-zu-Project-Strecke zeigen soll.

## Eindeutige Erkennung

Der Seed verwendet feste, deterministische Demo-UUIDs und zusaetzliche Demo-Marker in
`profile_data` beziehungsweise `metadata_json`.

Aktuelle D1.5-IDs:

| Objekt | ID |
| --- | --- |
| Company | `0bcb61e7-f15c-5d7d-8c52-c4f45b53d3a0` |
| RequestItem | `7a7b65e3-94fa-5f59-9101-6f7ad8f33e5d` |
| SupplierProfile | `d5470daa-5772-4c10-bd77-b7aaef3f4a1d` |
| NegotiationProject | `01d9d55b-87c3-5a5a-876a-b55a3ce2db33` |

Aktuelle D12.3-Readiness-IDs:

| Demo | Project-ID | Strategy-ID |
| --- | --- | --- |
| A: Empty Strategy | `f06a85a1-5d41-5a47-8d14-52af0493b606` | keine Seed-Strategy |
| B: Unvollstaendige Strategy | `63154d03-dee6-5fc9-a1b4-d8eaeeed0de4` | `b7c21e7e-3e8a-5377-97b4-8c265c2db05d` |
| C: Grundlage vorhanden | `0ca3270b-b999-5564-9756-265eddb5c835` | `ebfe2953-7bc1-5573-b86c-f94117efd525` |
| D: Bereit fuer Briefing / Simulation | `6a6f7d66-7fad-5a2b-93b5-4cfcdb7c4200` | `9182fa82-6b5e-525b-a34c-b35cf361412c` |
| E: Kein SupplierProfile | `b0be8f1b-e08e-5def-bdbf-5cbca5123290` | keine Seed-Strategy |

Demo-Marker:

- `demo_seed`: `staging-demo-rheinwerk-robotics-v1`
- `demo_scope`: `staging`
- `synthetic`: `true`
- D12.3-Datensaetze ergaenzen `demo_phase: D12.3` und `demo_case`

Die aus dem ersten manuellen Staging-Test bekannten IDs bleiben nur historische
Referenzen und werden vom Seed nicht weiterverwendet:

- Company: `a9d1cc8b-b5b8-48d1-a7da-d211f03afbde`
- RequestItem: `55a1e9af-0774-439e-a84c-1d3a057159d0`
- NegotiationProject: `5d9b36ef-a117-474e-a1b9-43111d8fd26d4`

## Seed-Verhalten

Der Seed ist ein idempotenter Ensure-Mechanismus:

- vorhandene Demo-Datensaetze mit den festen IDs werden auf den dokumentierten
  Demo-Stand aktualisiert
- fehlende Demo-Datensaetze werden angelegt
- das Demo-NegotiationProject wird mit dem Demo-SupplierProfile verknuepft
- D12.3-Projekte und ihre Strategy-Bausteine werden idempotent aktualisiert
- der Seed loescht nichts
- der Seed setzt keine Datenbank zurueck
- der Seed greift nicht in Auth, Caddy, Authelia oder Docker-Gateway ein
- der Seed verwendet keine echten Kunden-, Personen- oder Produktivdaten

Es gibt in D1.5 bewusst keinen Reset-Mechanismus. Fuer Staging ist zunaechst
`ensure/upsert` sicherer als ein Loesch- oder Neuaufbaupfad, weil vorhandene manuelle
Demo-Experimente nicht versehentlich entfernt werden.

## Ausfuehrung auf Staging

Der Seed-Befehl wird im Backend-Container ausgefuehrt:

```bash
cd /opt/negotiation-tools
docker compose --env-file .env.staging -f docker-compose.staging.yml run --rm backend python -m app.seeds.staging_demo --confirm-staging-demo
```

Der Guard `--confirm-staging-demo` ist absichtlich erforderlich, damit der Befehl
nicht versehentlich als allgemeiner Produktiv-Seed genutzt wird.

Vor dem Seed sollten Migrationen auf dem aktuellen Head stehen:

```bash
docker compose --env-file .env.staging -f docker-compose.staging.yml run --rm backend alembic upgrade head
```

## Aktualisierungsstrategie

Kleine Text-, Preis- oder Kontextanpassungen am Demo-Datensatz erfolgen im Seed-Modul
`backend/app/seeds/staging_demo.py` und werden danach erneut mit demselben Befehl
eingespielt. Damit bleibt der Staging-Datensatz reproduzierbar und reviewbar.

D3.4 dient ausschliesslich der Demo-Readiness fuer die bereits vorhandene Supplier
Context Card. Der Seed nutzt nur bestehende SupplierProfile- und
NegotiationProject-Felder, erzeugt keine Migration und fuehrt keine neue
Produktfunktion ein.

D12.3 dient ausschliesslich reproduzierbaren Readiness- und Preparation-Smoke-
Testzustaenden. Es gibt kein Staging-Deployment, keine Produktlogik, keine neue
Frontend-UI, keine Backend-API, keine Migration und keine KI-, RAG-, Claim-,
Simulations- oder Trainerreview-Implementierung.

Wenn spaeter groessere Demo-Szenarien noetig werden, sollte ein Folge-Issue die
Erweiterung auf optionale Demo-Objekte definieren, insbesondere:

- UserProfile/Trainee fuer Trainer- oder Teilnehmerkontext
- ProcurementHistoryItems fuer Import- und Historienbezug
- KnowledgeDocuments fuer Analyse- und Strategievorbereitung
- Simulationsszenarien fuer Trainerreview
