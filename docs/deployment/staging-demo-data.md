# Staging Demo Data

## Ziel

Die geschuetzte Staging-/Trainer-Demo-Instanz soll mit einem kleinen, reproduzierbaren
Demo-Datensatz vorfuehrbar bleiben. Der Datensatz ist synthetisch, gehoert nicht zu
echten Kunden- oder Produktivdaten und stuetzt den aktuell getesteten Flow:

```text
RequestItem -> NegotiationProject -> Project-Detailseite
```

## Minimaler Demo-Scope fuer D1.5

Der D1.5-MVP-Datensatz orientiert sich am Rheinwerk-Robotics-Trainingskontext und
enthaelt:

- eine Demo-Company: `Rheinwerk Robotics GmbH`
- ein Demo-RequestItem: strategische Beschaffung von Praezisions-Servoantrieben
- ein damit verknuepftes Demo-NegotiationProject

Bewusst noch nicht enthalten sind:

- UserProfile/Trainee
- ProcurementHistoryItems
- SupplierProfile
- KnowledgeDocuments, DocumentChunks oder KnowledgeClaims
- Strategien, BATNA-/ZOPA-/Concession-Detailobjekte
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
| NegotiationProject | `01d9d55b-87c3-5a5a-876a-b55a3ce2db33` |

Demo-Marker:

- `demo_seed`: `staging-demo-rheinwerk-robotics-v1`
- `demo_scope`: `staging`
- `synthetic`: `true`

Die aus dem ersten manuellen Staging-Test bekannten IDs bleiben nur historische
Referenzen und werden vom Seed nicht weiterverwendet:

- Company: `a9d1cc8b-b5b8-48d1-a7da-d211f03afbde`
- RequestItem: `55a1e9af-0774-439e-a84c-1d3a057159d0`
- NegotiationProject: `5d9b36ef-a117-474e-a1b9-43111d8fd26d4`

## Seed-Verhalten

Der Seed ist ein idempotenter Ensure-Mechanismus:

- vorhandene Demo-Datensaetze mit den festen IDs werden auf den dokumentierten
  D1.5-Demostand aktualisiert
- fehlende Demo-Datensaetze werden angelegt
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

Wenn spaeter groessere Demo-Szenarien noetig werden, sollte ein Folge-Issue die
Erweiterung auf optionale Demo-Objekte definieren, insbesondere:

- UserProfile/Trainee fuer Trainer- oder Teilnehmerkontext
- SupplierProfile fuer strukturierte Lieferantenauswahl
- ProcurementHistoryItems fuer Import- und Historienbezug
- KnowledgeDocuments fuer Analyse- und Strategievorbereitung
- Simulationsszenarien fuer Trainerreview
