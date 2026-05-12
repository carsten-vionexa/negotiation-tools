# Negotiation Tool – Technisches Umsetzungsbriefing für Codex

**Projekt:** KI-gestütztes Negotiation Tool / Verhandlungs-Cockpit  
**Ziel:** MVP auf lokalem Mac entwickeln, später Deployment auf Hostinger VPS mit Docker Compose  
**Stand:** Finale technische Grundlage für einen konkreten Codex-Umsetzungsplan  
**Sprache der Anwendung:** zunächst Deutsch, später optional Deutsch/Englisch  
**Primärer Beispielkunde:** Rheinwerk Robotics GmbH  

---

## 1. Zielbild des Tools

Das Tool soll kein einfacher Chatbot sein, sondern ein workflowbasiertes Verhandlungs-Cockpit.

Es soll Unternehmensdaten, Brancheninformationen, Einkaufshistorie, Anfragenkataloge, Lieferantenannahmen, Persönlichkeitsprofile und kulturelle Hinweise in konkrete Verhandlungsstrategien übersetzen.

Der zentrale Nutzen besteht aus vier Ebenen:

1. **Verhandlungsvorbereitung**  
   Strukturierte Analyse von Ausgangslage, Interessen, Risiken, Machtverhältnissen, historischen Preisen und Lieferantenoptionen.

2. **Strategieentwicklung**  
   Entwicklung von Zielen, ZOPA, WAP, BATNA, Argumentationslinien, Konzessionslogik und Verhandlungspaketen.

3. **KI-Simulation**  
   Simulation eines realistischen Verhandlungspartners, z. B. Lieferant, Kunde, interner Stakeholder oder technischer Experte.

4. **Auswertung und Lerntransfer**  
   Feedback zu Strategie, Gesprächsführung, Druckmanagement, Fragetechnik, Konzessionsverhalten, interkultureller Sensibilität und persönlichem Lernfortschritt.

Die Anwendung soll zunächst als lokaler MVP laufen, aber von Anfang an so gebaut werden, dass sie später per Docker Compose auf einem VPS betrieben werden kann.

---

## 2. Grundsätzliche Architekturentscheidung

Es wird direkt mit der technisch stärkeren Variante gestartet:

```text
Frontend:        Next.js + React + TypeScript
UI:              Tailwind CSS + shadcn/ui
Backend/API:     FastAPI / Python
Datenbank:       PostgreSQL + pgvector
ORM:             SQLAlchemy oder SQLModel
Migrationen:     Alembic
KI/RAG:          Python Backend Services
Dateiimport:     Python Parser für Excel, CSV, PDF, Markdown
Deployment:      Docker Compose
```

Begründung:

- Das Tool benötigt von Anfang an Dokumentenverarbeitung, Excel-Importe, Embeddings, RAG, KI-Analyse und strukturierte Datenextraktion.
- Python/FastAPI ist für Dokumentenverarbeitung, KI-Pipelines und Datenimport besser geeignet als ein reiner Next.js-Backend-Stack.
- Next.js bleibt ideal für die Website, Formulare, Dashboards und Analyseansichten.
- PostgreSQL + pgvector reicht für den MVP als relationale Datenbank, JSONB-Speicher und Vector Store aus.

---

## 3. Lokale und spätere Server-Architektur

### 3.1 Lokale Entwicklung auf Mac

Die lokale Entwicklung soll bereits mit Docker Compose erfolgen.

```text
Browser
  ↓
Next.js Frontend Container
  ↓
FastAPI Backend Container
  ↓
PostgreSQL + pgvector Container
  ↓
Upload Volume
```

### 3.2 Späteres Deployment auf Hostinger VPS

Die spätere Zielarchitektur auf dem VPS:

```text
Internet
  ↓
Reverse Proxy: Caddy oder Traefik
  ↓
Next.js Frontend Container
  ↓
FastAPI Backend Container
  ↓
PostgreSQL + pgvector Container
  ↓
Persistent Volumes für DB und Uploads
```

Später optional ergänzbar:

```text
Redis          Queue, Cache, Job Status
Worker         lange KI- und Importjobs
MinIO/S3       externe Dateiablage
Monitoring     Logs, Health Checks, Backups
```

Für den MVP sind Redis, Worker und MinIO noch nicht zwingend erforderlich. Die Architektur sollte aber so vorbereitet werden, dass diese Komponenten später ergänzt werden können.

---

## 4. Repository-Struktur

Vorgeschlagene Projektstruktur:

```text
negotiation-tool/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── alembic/
│   ├── requirements.txt
│   └── Dockerfile
│
├── database/
│   └── init/
│
├── uploads/
│
├── docker-compose.yml
├── .env.example
├── README.md
└── docs/
    ├── architecture.md
    ├── data-model.md
    └── codex-tasks.md
```

---

## 5. Zentrale Designprinzipien

### 5.1 Projektzentrierte Architektur

Das Tool soll nicht primär als Chat-Anwendung gedacht werden, sondern als projektzentriertes Cockpit.

Fachliche Grundkette:

```text
Tenant
  → Company
  → Knowledge Base
  → Request Item
  → Negotiation Project
  → Supplier Profile
  → Strategy
  → Cultural Briefing
  → Simulation Scenario
  → Simulation Result
  → Learning History
```

### 5.2 Quellenfähige Wissensbasis

Eine zentrale Anforderung ist die Nachvollziehbarkeit aller KI-Aussagen.

Jede relevante Analyseaussage soll einer Quelle zugeordnet werden können:

```text
Dokument
Dokument-Chunk
Excel-Importzeile
manuelle Eingabe
KI-generierte Hypothese auf Basis konkreter Quellen
```

Prinzip:

```text
Keine strategische Empfehlung ohne Quellenbezug.
Keine Lieferantenannahme ohne Herkunft.
Keine Marktbehauptung ohne Dokument- oder Erfahrungsquelle.
Keine Simulation ohne erkennbares Profil der Gegenseite.
```

### 5.3 Unterscheidung von Fakt, Annahme und Hypothese

Das System soll fachlich trennen zwischen:

```text
Fact              belegte Information aus Quelle
Assumption        plausible Annahme auf Basis vorhandener Daten
Hypothesis        KI-generierte Arbeitshypothese
Recommendation    Handlungsempfehlung
Training Note      didaktischer Hinweis für den Trainee
```

Diese Unterscheidung soll später in der UI sichtbar werden.

---

## 6. Datenbankstrategie

### 6.1 Hauptdatenbank

```text
PostgreSQL
```

PostgreSQL dient für:

- relationale Stammdaten
- Projekt- und Simulationsdaten
- JSONB für flexible KI-Ergebnisse
- pgvector für Embeddings und semantische Suche

### 6.2 Vector Store

```text
pgvector in PostgreSQL
```

Verwendung für:

- Dokument-Chunks
- Embeddings
- semantische Suche über Branchenreport, Firmenprofil, DISC-Profil, Einkaufshistorie, Anfragenkataloge, Vertragsdaten und Marktinformationen

### 6.3 Dateiablage

Originaldateien werden nicht direkt in PostgreSQL gespeichert.

Stattdessen:

```text
/uploads/...
```

In PostgreSQL werden nur Metadaten gespeichert:

```text
Dateiname
Dateityp
MIME-Type
Speicherpfad
Upload-Datum
Dokumenttyp
Parsing-Status
Quelle
Autor
Verlässlichkeit
Vertraulichkeit
```

### 6.4 JSONB

JSONB wird genutzt für flexible KI-Ausgaben, z. B.:

```text
Analyseergebnisse
Kulturbriefings
Lieferantenannahmen
Scorecards
Risikoanalysen
Strategieentwürfe
Feedbackobjekte
```

---

## 7. Dokumenttypen und Quellenlogik

Das Tool muss verschiedene Wissensquellen aufnehmen können.

### 7.1 Dokumenttypen

```text
company_profile
industry_report
disc_profile
procurement_history
request_catalog
contract_document
commercial_terms
supplier_information
market_experience
training_note
other
```

### 7.2 Quellenfelder

Jedes Dokument benötigt Quelleninformationen:

```text
title
source_name
source_author
source_date
uploaded_at
document_type
reliability_level
confidentiality_level
description
```

### 7.3 Reliability Level

Mögliche Werte:

```text
high        belastbare interne oder externe Quelle
medium      plausible, aber nicht vollständig validierte Quelle
low         Erfahrungswert oder unsichere Quelle
unknown     noch nicht bewertet
```

### 7.4 Confidentiality Level

Mögliche Werte:

```text
public
internal
confidential
strictly_confidential
```

---

## 8. Datenmodell – MVP-Entitäten

Die folgenden Entitäten sollen im MVP angelegt werden.

---

## 8.1 tenants

Mandantenfähigkeit vorbereiten, auch wenn der MVP zunächst nur einen Mandanten nutzt.

```text
id
name
slug
created_at
updated_at
```

---

## 8.2 companies

Trainingskunde oder reales/fiktives Unternehmen.

```text
id
tenant_id
name
industry
country
company_size
revenue
description
negotiation_role
main_pressure
procurement_priorities_json
sales_priorities_json
cultural_style
typical_conflicts_json
strategic_goals_json
created_at
updated_at
```

---

## 8.3 user_profiles

Trainee-, Trainer- oder Nutzerprofil.

```text
id
tenant_id
company_id
name
email
role
experience_level
negotiation_role
disc_primary
disc_secondary
strengths_json
risks_json
training_goals_json
language
created_at
updated_at
```

---

## 8.4 knowledge_documents

Metadaten der hochgeladenen Wissensquellen.

```text
id
tenant_id
company_id
project_id nullable
title
document_type
source_name
source_author
source_date
uploaded_at
file_name
file_type
mime_type
storage_path
reliability_level
confidentiality_level
description
status
created_at
updated_at
```

Statuswerte:

```text
uploaded
parsing
parsed
chunked
embedded
failed
```

---

## 8.5 document_chunks

Semantisch durchsuchbare Textstücke aus Dokumenten.

```text
id
knowledge_document_id
tenant_id
company_id
project_id nullable
chunk_index
content
page_number nullable
sheet_name nullable
row_number nullable
section_title nullable
metadata_json
embedding vector
created_at
```

---

## 8.6 knowledge_claims

Extrahierte oder generierte Aussagen mit Quellenbezug.

```text
id
tenant_id
company_id
project_id nullable
supplier_profile_id nullable
knowledge_document_id
document_chunk_id nullable
claim_type
claim_text
evidence_text
source_reference
confidence_level
is_ai_generated
created_at
updated_at
```

Claim Types:

```text
market_risk
supplier_power
price_pressure
cultural_hint
technical_dependency
commercial_term
historical_price
quality_issue
lead_time_issue
negotiation_pattern
training_hint
other
```

Confidence Level:

```text
low
medium
high
```

---

## 8.7 procurement_history_items

Strukturierte Einkaufshistorie, importiert aus Excel oder manuell gepflegt.

```text
id
tenant_id
company_id
source_document_id nullable
import_job_id nullable
article_name
article_description
item_category
supplier_name
supplier_country
quantity
unit_price
currency
purchase_date
lead_time_weeks
quality_rating
price_assessment
improvement_potential
notes
created_at
updated_at
```

Diese Daten sollen für Preisanker, historische Vergleiche, Lieferantenmuster und Verbesserungspotenziale genutzt werden.

---

## 8.8 request_items

Anfragenkatalog / aktuelle Einkaufsbedarfe.

```text
id
tenant_id
company_id
source_document_id nullable
import_job_id nullable
article_name
article_description
category
quantity
target_delivery_time
rough_price_expectation
currency
target_region
priority
status
created_at
updated_at
```

Statuswerte:

```text
open
converted_to_project
archived
```

Request Items sollen per Formular oder Import angelegt werden können.

---

## 8.9 supplier_profiles

Lieferantenprofile können manuell angelegt oder KI-gestützt aus vorhandenen Quellen abgeleitet werden.

```text
id
tenant_id
company_id
project_id nullable
name
country
region
industry
supplier_type
power_level
risk_level
cultural_context
interests_json
likely_tactics_json
constraints_json
relationship_status
is_ai_generated
confidence_level
notes
created_at
updated_at
```

Wichtig: Ein Lieferantenprofil kann auch zunächst hypothetisch sein, wenn kein konkreter Lieferantenname bekannt ist.

Beispiel:

```text
Japanischer Präzisionsgetriebe-Lieferant
Chinesischer Mid-Cost-Komponentenlieferant
US-amerikanischer Softwarelizenzanbieter
Europäischer Elektroniklieferant
```

---

## 8.10 supplier_profile_sources

Verknüpfung zwischen Lieferantenprofil und Quellenbasis.

```text
id
supplier_profile_id
knowledge_document_id nullable
document_chunk_id nullable
knowledge_claim_id nullable
source_type
claim
evidence_text
confidence_score
created_at
```

---

## 8.11 negotiation_projects

Zentrales operatives Objekt.

```text
id
tenant_id
company_id
created_by_profile_id
request_item_id nullable
title
project_type
category
article_or_service
quantity
target_region
desired_delivery_time
internal_price_expectation
currency
current_supplier
priority
status
business_pressure
technical_dependency_level
supplier_power_level
risk_level
created_at
updated_at
```

Project Types:

```text
price_negotiation
new_supplier_award
framework_contract
escalation
software_license
supplier_development
customer_negotiation
other
```

---

## 8.12 project_stakeholders

```text
id
project_id
name
role
department
influence_level
interest_level
position
notes
created_at
updated_at
```

---

## 8.13 strategies

Strategieobjekt für ein Verhandlungsprojekt.

```text
id
project_id
created_by_profile_id
status
summary
max_goal
realistic_goal
minimum_goal
price_target
price_walkaway
zopa_summary
batna_summary
concession_strategy
argumentation_summary
analysis_json
created_at
updated_at
```

---

## 8.14 zopa_items

ZOPA nicht nur als Preis, sondern als mehrdimensionale Paketlogik.

```text
id
strategy_id
dimension
our_target
our_walkaway
estimated_counterparty_target
estimated_counterparty_walkaway
zopa_min
zopa_max
confidence_level
notes
created_at
updated_at
```

Dimensionen:

```text
unit_price
delivery_time
payment_terms
contract_duration
minimum_order_quantity
service_level
warranty
exclusivity
nre_costs
ip_rights
data_access
other
```

---

## 8.15 batna_options

```text
id
strategy_id
batna_type
description
cost_impact
time_impact
risk_impact
feasibility
strength_score
notes
created_at
updated_at
```

BATNA Types:

```text
commercial
technical
time_based
internal
relationship_based
no_deal
other
```

---

## 8.16 concession_items

```text
id
strategy_id
concession
value_to_counterparty
cost_to_us
condition_required
sequence_order
is_allowed
notes
created_at
updated_at
```

Grundprinzip:

```text
Kein Zugeständnis ohne Gegenleistung.
```

---

## 8.17 argumentation_lines

```text
id
strategy_id
argument_type
claim
supporting_evidence
counterparty_objection
response
source_reference
created_at
updated_at
```

Argumenttypen:

```text
tco
market
relationship
risk
quality
capacity
compliance
cultural
other
```

---

## 8.18 cultural_briefings

```text
id
project_id
supplier_profile_id nullable
country
culture_model_used
opening_advice
decision_logic
dos_json
donts_json
communication_advice
risk_warnings_json
briefing_json
created_at
updated_at
```

Kulturelle Hinweise sollen als Arbeitshypothesen formuliert werden, nicht als stereotype Festlegungen.

---

## 8.19 simulation_scenarios

```text
id
project_id
strategy_id
supplier_profile_id nullable
user_profile_id
ai_role
country
difficulty_level
negotiation_phase
communication_style
simulation_goal
language
duration_minutes
trainer_intervention_enabled
system_prompt
status
created_at
updated_at
```

Difficulty Levels:

```text
1_guided_practice
2_realistic_standard
3_pressure
4_tactical
5_executive_escalation
```

---

## 8.20 simulation_messages

```text
id
scenario_id
sender_type
sender_name
message_text
message_index
timestamp
metadata_json
```

Sender Types:

```text
trainee
ai_counterparty
trainer
system
```

---

## 8.21 simulation_results

```text
id
scenario_id
user_profile_id
project_id
transcript
summary
score_overall
score_strategy
score_questioning
score_concession_control
score_pressure_management
score_cultural_awareness
score_closing
feedback_json
learning_points_json
created_at
updated_at
```

---

## 8.22 trainer_comments

```text
id
simulation_result_id
trainer_profile_id
comment
rating
created_at
updated_at
```

---

## 8.23 import_jobs

Jeder Import soll nachvollziehbar sein.

```text
id
tenant_id
company_id
uploaded_by
document_id
import_type
status
total_rows
successful_rows
failed_rows
mapping_json
error_summary
created_at
completed_at
```

Import Types:

```text
procurement_history
request_catalog
supplier_data
contract_terms
other
```

Statuswerte:

```text
uploaded
mapping_required
validated
importing
completed
failed
```

---

## 8.24 import_rows

```text
id
import_job_id
row_number
raw_data_json
parsed_data_json
status
error_message
created_at
```

---

## 9. Importfunktionen im MVP

Zwei Importfunktionen sind von Anfang an wichtig.

---

## 9.1 Import Einkaufshistorie

Die Einkaufshistorie liegt typischerweise als Excel-Datei vor.

MVP-Anforderung:

```text
Excel Upload
↓
Datei speichern
↓
KnowledgeDocument anlegen
↓
ImportJob anlegen
↓
Excel-Zeilen lesen
↓
ImportRows speichern
↓
Spalten gegen erwartetes Template mappen
↓
Validieren
↓
procurement_history_items erzeugen
↓
optional: KnowledgeClaims erzeugen
```

Erwartete Spalten im MVP:

```text
Artikel
Beschreibung
Warengruppe
Lieferant
Land
Menge
Preis
Währung
Kaufdatum
Lieferzeit
Qualitätsbewertung
Preiseinschätzung
Verbesserungspotenzial
Kommentar
```

Später kann semantisches Spaltenmapping ergänzt werden.

---

## 9.2 Import Anfragenkatalog

Der Anfragenkatalog kann per Formular oder Excel/CSV-Import gepflegt werden.

MVP-Anforderung:

```text
Excel Upload
↓
Datei speichern
↓
KnowledgeDocument anlegen
↓
ImportJob anlegen
↓
ImportRows speichern
↓
Validierung
↓
request_items erzeugen
↓
optional: aus RequestItem ein NegotiationProject erzeugen
```

Erwartete Spalten:

```text
Artikel
Beschreibung
Warengruppe
Stückzahl
Gewünschte Lieferzeit
Grobe Preisvorstellung
Währung
Zielregion
Priorität
Kommentar
```

---

## 10. Knowledge Base / RAG-Verarbeitung

### 10.1 Dokumentverarbeitung

Für jedes hochgeladene Dokument:

```text
1. KnowledgeDocument erzeugen
2. Datei speichern
3. Text extrahieren
4. Chunks erzeugen
5. Embeddings erzeugen
6. document_chunks speichern
7. optionale knowledge_claims extrahieren
```

### 10.2 Chunking

Für den MVP:

```text
Chunk-Größe: ca. 800–1200 Tokens
Overlap: ca. 100–150 Tokens
```

Jeder Chunk muss Metadaten enthalten:

```text
Dokumenttyp
Dokumenttitel
Quelle
Seite
Sheet
Zeile
Abschnitt
Sprache
```

### 10.3 Quellenreferenzen

Jede KI-Antwort im Analysemodul soll intern mit Quellen arbeiten.

Beispielhafte Datenstruktur für Analyseausgaben:

```json
{
  "claim": "Bei Präzisionsgetrieben ist mit hoher Lieferantenmacht zu rechnen.",
  "claim_type": "supplier_power",
  "basis": "Branchenreport und Einkaufshistorie",
  "confidence": "high",
  "sources": [
    {
      "document_id": "...",
      "chunk_id": "...",
      "quote": "..."
    }
  ]
}
```

---

## 11. KI-Funktionen im MVP

Die KI soll nicht monolithisch arbeiten, sondern modulweise.

### 11.1 Analysemodul

Endpoint:

```text
POST /api/projects/{project_id}/analyze
```

Input:

```text
NegotiationProject
Company
UserProfile
RequestItem
ProcurementHistoryItems
SupplierProfiles
KnowledgeChunks
KnowledgeClaims
```

Output:

```text
Risiken
Lieferantenmacht
Preisanker
historische Vergleichswerte
offene Fragen
mögliche BATNAs
erste ZOPA-Hypothese
relevante Quellen
persönliche Trainingshinweise
```

---

### 11.2 Lieferantenprofil-Generierung

Endpoint:

```text
POST /api/projects/{project_id}/generate-supplier-profile
```

Ziel:

Aus Branchenreport, Einkaufshistorie, Anfragenkatalog und Marktinformationen ein plausibles Lieferantenprofil erzeugen.

Output:

```text
Name oder hypothetischer Lieferantentyp
Land/Region
Lieferantenmacht
Interessen
wahrscheinliche Taktiken
Risiken
kultureller Kontext
Quellenbasis
Confidence-Level
```

---

### 11.3 Strategie-Builder

Endpoint:

```text
POST /api/projects/{project_id}/build-strategy
```

Output:

```text
Maximalziel
realistisches Ziel
Minimalziel / WAP
ZOPA nach Dimensionen
BATNA-Optionen
Argumentationslinien
Konzessionslogik
Risiken
offene Fragen
Quellenbezüge
```

---

### 11.4 Kulturbriefing

Endpoint:

```text
POST /api/projects/{project_id}/cultural-briefing
```

Output:

```text
kulturelle Arbeitshypothesen
Entscheidungslogik
Do's
Don'ts
Kommunikationshinweise
Risiken
konkrete Formulierungs- und Verhaltenshinweise
```

---

### 11.5 Simulation

Endpoint:

```text
POST /api/simulation-scenarios/{scenario_id}/messages
```

Die KI übernimmt eine Rolle:

```text
Lieferant
Kunde
interner Stakeholder
technischer Experte
Legal/Finance
```

Sie muss konsistent bleiben mit:

```text
SupplierProfile
Strategy
CulturalBriefing
Difficulty Level
Negotiation Phase
Communication Style
```

---

### 11.6 Auswertung

Endpoint:

```text
POST /api/simulation-scenarios/{scenario_id}/evaluate
```

Output:

```text
Transkript-Zusammenfassung
Score Gesamt
Score Strategie
Score Fragetechnik
Score Konzessionskontrolle
Score Druckmanagement
Score kulturelle Sensibilität
Score Closing
beobachtungsnahes Feedback
konkrete bessere Formulierungen
Lernpunkte
Trainerhinweise
```

---

## 12. Frontend-Screens im MVP

### 12.1 Dashboard

Inhalte:

```text
Companies
aktive Projekte
offene Imports
letzte Simulationen
letzte Analysen
```

### 12.2 Company Detail

Inhalte:

```text
Firmenprofil
strategische Ziele
Verhandlungsstil
kritische Warengruppen
zugehörige Dokumente
zugehörige Projekte
```

### 12.3 Knowledge Upload

Funktionen:

```text
Dokument hochladen
Dokumenttyp auswählen
Quelle erfassen
Reliability Level setzen
Confidentiality Level setzen
Parsing Status anzeigen
```

### 12.4 Import Preview

Funktionen:

```text
Excel-Datei anzeigen
Spalten prüfen
Fehler anzeigen
Import bestätigen
ImportJob Status anzeigen
```

### 12.5 Einkaufshistorie

Funktionen:

```text
Tabelle anzeigen
filtern nach Lieferant, Warengruppe, Land, Datum
Preis- und Mengenhistorie anzeigen
```

### 12.6 Anfragenkatalog

Funktionen:

```text
Request Items anzeigen
manuell anlegen
importieren
aus Request Item ein Negotiation Project erzeugen
```

### 12.7 Project Detail

Inhalte:

```text
Projektstammdaten
Artikel/Leistung
Menge
Lieferzeit
Preisvorstellung
Lieferant / Lieferantentyp
Risiko
Stakeholder
zugehörige Quellen
```

### 12.8 Analyseansicht

Inhalte:

```text
Preisanker
Lieferantenmacht
Risiken
offene Fragen
historische Daten
Quellenbelege
persönliche Hinweise für Trainee
```

### 12.9 Strategie-Builder

Inhalte:

```text
Ziele
ZOPA
WAP
BATNA
Argumente
Konzessionen
Paketlogik
```

### 12.10 Kulturbriefing

Inhalte:

```text
Arbeitshypothesen
Do's
Don'ts
Entscheidungslogik
Kommunikationshinweise
```

### 12.11 Simulation

Inhalte:

```text
Chat-Interface
Rolle der KI
Schwierigkeitsgrad
Nachrichtenverlauf
Simulation beenden
Auswertung starten
```

### 12.12 Auswertung

Inhalte:

```text
Scores
Feedback
Transkript
bessere Formulierungen
Lernpunkte
Trainerkommentar
```

---

## 13. API-Struktur – erster Vorschlag

### Companies

```text
GET    /api/companies
POST   /api/companies
GET    /api/companies/{company_id}
PUT    /api/companies/{company_id}
DELETE /api/companies/{company_id}
```

### User Profiles

```text
GET    /api/user-profiles
POST   /api/user-profiles
GET    /api/user-profiles/{profile_id}
PUT    /api/user-profiles/{profile_id}
```

### Knowledge Documents

```text
POST   /api/knowledge/upload
GET    /api/knowledge/documents
GET    /api/knowledge/documents/{document_id}
POST   /api/knowledge/documents/{document_id}/parse
POST   /api/knowledge/documents/{document_id}/embed
```

### Imports

```text
POST   /api/imports/procurement-history
POST   /api/imports/request-catalog
GET    /api/imports/{import_job_id}
POST   /api/imports/{import_job_id}/confirm
```

### Procurement History

```text
GET    /api/procurement-history
POST   /api/procurement-history
GET    /api/procurement-history/{item_id}
PUT    /api/procurement-history/{item_id}
DELETE /api/procurement-history/{item_id}
```

### Request Items

```text
GET    /api/request-items
POST   /api/request-items
GET    /api/request-items/{request_item_id}
PUT    /api/request-items/{request_item_id}
POST   /api/request-items/{request_item_id}/convert-to-project
```

### Projects

```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/{project_id}
PUT    /api/projects/{project_id}
POST   /api/projects/{project_id}/analyze
POST   /api/projects/{project_id}/generate-supplier-profile
POST   /api/projects/{project_id}/build-strategy
POST   /api/projects/{project_id}/cultural-briefing
```

### Simulation

```text
POST   /api/simulation-scenarios
GET    /api/simulation-scenarios/{scenario_id}
POST   /api/simulation-scenarios/{scenario_id}/messages
POST   /api/simulation-scenarios/{scenario_id}/evaluate
GET    /api/simulation-results/{result_id}
```

---

## 14. Docker Compose – Zielservices

MVP:

```text
frontend
backend
postgres
```

Später:

```text
redis
worker
reverse-proxy
```

Beispielhafte Service-Logik:

```text
frontend:
  Next.js App
  Port: 3000

backend:
  FastAPI App
  Port: 8000

postgres:
  PostgreSQL mit pgvector
  Port: 5432
  Volume: postgres_data

uploads:
  lokales Volume für hochgeladene Dateien
```

---

## 15. Codex-Arbeitsweise

Da Codex mit einem Prompt oder einer Spezifikation durch ein Repository navigieren, Dateien bearbeiten, Befehle ausführen und Tests starten kann, sollte die Umsetzung in klar abgegrenzten Arbeitspaketen erfolgen.

Nicht ideal:

```text
Baue mir das komplette Tool.
```

Besser:

```text
Erstelle die Repository-Grundstruktur mit Docker Compose, FastAPI Backend, Next.js Frontend und PostgreSQL/pgvector.
```

Dann Schritt für Schritt:

```text
Implementiere die SQLAlchemy Models für Company, UserProfile und KnowledgeDocument.
```

```text
Erstelle die Alembic Migrationen für das initiale Datenmodell.
```

```text
Implementiere den Excel-Import für procurement_history_items mit ImportJob und ImportRows.
```

```text
Baue die Frontend-Seite für den Upload von Knowledge Documents.
```

---

## 16. Empfohlene Codex-Aufgabenreihenfolge

### Phase 1: Projektbasis

**Aufgabe 1:** Repository-Struktur erstellen  
**Aufgabe 2:** Docker Compose mit Frontend, Backend und PostgreSQL/pgvector erstellen  
**Aufgabe 3:** FastAPI Grundapp mit Health Check  
**Aufgabe 4:** Next.js Grundapp mit Startseite  
**Aufgabe 5:** Environment Handling mit `.env.example`

### Phase 2: Datenbankbasis

**Aufgabe 6:** SQLAlchemy/SQLModel Setup  
**Aufgabe 7:** Alembic Setup  
**Aufgabe 8:** Models für Tenant, Company, UserProfile  
**Aufgabe 9:** CRUD Endpoints für Company und UserProfile  
**Aufgabe 10:** einfache Frontend-Forms für Company und UserProfile

### Phase 3: Knowledge Base

**Aufgabe 11:** Models für KnowledgeDocument und DocumentChunk  
**Aufgabe 12:** Datei-Upload Endpoint  
**Aufgabe 13:** Dokument-Metadaten erfassen  
**Aufgabe 14:** Markdown/Text Parsing  
**Aufgabe 15:** PDF/Excel Parsing vorbereiten  
**Aufgabe 16:** Embedding-Feld mit pgvector vorbereiten

### Phase 4: Importfunktionen

**Aufgabe 17:** Models für ImportJob und ImportRows  
**Aufgabe 18:** Excel-Import für Einkaufshistorie  
**Aufgabe 19:** Excel-Import für Anfragenkatalog  
**Aufgabe 20:** Import Preview API  
**Aufgabe 21:** Import Confirmation API  
**Aufgabe 22:** Frontend Import Preview

### Phase 5: Projektlogik

**Aufgabe 23:** Models für RequestItem, ProcurementHistoryItem und NegotiationProject  
**Aufgabe 24:** Formular für RequestItem  
**Aufgabe 25:** Convert RequestItem to NegotiationProject  
**Aufgabe 26:** Project Detail Screen

### Phase 6: Lieferantenprofile und Claims

**Aufgabe 27:** Models für SupplierProfile, SupplierProfileSource und KnowledgeClaim  
**Aufgabe 28:** manuelle Anlage von SupplierProfiles  
**Aufgabe 29:** KI-gestützte Lieferantenprofil-Generierung vorbereiten  
**Aufgabe 30:** Quellenbezüge in SupplierProfile anzeigen

### Phase 7: Analyse und Strategie

**Aufgabe 31:** Analyse-Endpoint mit strukturiertem Mock-Output  
**Aufgabe 32:** Analyseansicht im Frontend  
**Aufgabe 33:** Strategy Models  
**Aufgabe 34:** Strategy Builder Endpoint  
**Aufgabe 35:** Strategy Builder Frontend

### Phase 8: Simulation

**Aufgabe 36:** Models für SimulationScenario, SimulationMessage, SimulationResult  
**Aufgabe 37:** Chat-Interface  
**Aufgabe 38:** KI-Gegenseite mit System Prompt  
**Aufgabe 39:** Auswertungs-Endpoint  
**Aufgabe 40:** Auswertungsansicht mit Scores und Feedback

---

## 17. Erste konkrete Codex-Prompts

### Prompt 1: Projektgerüst

```text
Erstelle ein neues Monorepo für das Projekt "negotiation-tool".

Anforderungen:
- frontend/ mit Next.js, TypeScript, Tailwind CSS
- backend/ mit FastAPI, SQLAlchemy oder SQLModel, Alembic
- PostgreSQL mit pgvector in docker-compose.yml
- lokales uploads/ Volume
- .env.example
- README.md mit Startanleitung
- Health Check Endpoint im Backend: GET /health
- einfache Startseite im Frontend

Bitte implementiere nur die Projektbasis und keine fachlichen Features.
```

### Prompt 2: Initiales Datenmodell

```text
Implementiere im FastAPI Backend das initiale Datenmodell mit SQLAlchemy/SQLModel und Alembic Migrationen.

Entitäten:
- Tenant
- Company
- UserProfile
- KnowledgeDocument
- DocumentChunk

Anforderungen:
- UUID Primary Keys
- created_at / updated_at
- JSONB-Felder wo sinnvoll
- pgvector Feld für DocumentChunk.embedding vorbereiten
- Alembic Migration erzeugen
- einfache CRUD Endpoints für Company und UserProfile
- Pydantic Schemas für Create/Update/Read
- Tests oder zumindest manuelle Testbeschreibung im README ergänzen
```

### Prompt 3: Knowledge Upload

```text
Implementiere einen Datei-Upload für Knowledge Documents.

Anforderungen:
- Endpoint POST /api/knowledge/upload
- multipart file upload
- Metadaten: company_id, title, document_type, source_name, source_author, source_date, reliability_level, confidentiality_level, description
- Datei im uploads/ Verzeichnis speichern
- KnowledgeDocument Datensatz anlegen
- Status zunächst "uploaded"
- Endpoint GET /api/knowledge/documents
- Frontend-Seite zum Upload und zur Anzeige der hochgeladenen Dokumente
```

### Prompt 4: Excel-Import Einkaufshistorie

```text
Implementiere den Excel-Import für Einkaufshistorie.

Anforderungen:
- Endpoint POST /api/imports/procurement-history
- Upload einer .xlsx Datei
- Anlage eines KnowledgeDocument mit document_type procurement_history
- Anlage eines ImportJob
- Auslesen der Excel-Zeilen mit openpyxl oder pandas
- Speichern jeder Rohzeile in import_rows.raw_data_json
- Mapping auf procurement_history_items anhand folgender Spalten:
  Artikel, Beschreibung, Warengruppe, Lieferant, Land, Menge, Preis, Währung, Kaufdatum, Lieferzeit, Qualitätsbewertung, Preiseinschätzung, Verbesserungspotenzial, Kommentar
- Fehlerhafte Zeilen markieren
- ImportJob Status und Counts aktualisieren
- GET /api/imports/{import_job_id} zur Prüfung des Imports
```

### Prompt 5: Anfragenkatalog Import und Formular

```text
Implementiere Request Items für den Anfragenkatalog.

Anforderungen:
- Model RequestItem
- CRUD Endpoints
- Formular im Frontend zur manuellen Anlage
- Excel Import Endpoint POST /api/imports/request-catalog
- Erwartete Spalten:
  Artikel, Beschreibung, Warengruppe, Stückzahl, Gewünschte Lieferzeit, Grobe Preisvorstellung, Währung, Zielregion, Priorität, Kommentar
- Funktion POST /api/request-items/{request_item_id}/convert-to-project
- Dadurch soll ein NegotiationProject erzeugt werden
```

---

## 18. MVP-Abgrenzung

Im MVP enthalten:

```text
Next.js Frontend
FastAPI Backend
PostgreSQL + pgvector
Company Management
UserProfile Management
Knowledge Upload
quellenfähige Dokumentenlogik
Excel-Import Einkaufshistorie
Excel-Import Anfragenkatalog
RequestItem Formular
NegotiationProject Anlage
SupplierProfile Anlage
Basis für KI-Analyse
Basis für Strategie-Builder
Basis für Simulation
```

Nicht im MVP enthalten:

```text
komplexe Rechteverwaltung
Mandanten-Abrechnung
CRM-Anbindung
automatische Web-Lieferantensuche
echtes Vertragsmanagement
Team-Dashboards
Voice-Simulation
Trainer-Marktplatz
Kubernetes
separate Vektordatenbank
```

---

## 19. Qualitätsanforderungen

### 19.1 Fachliche Qualität

Das Tool muss fachlich zwischen Daten, Annahmen und Empfehlungen unterscheiden.

Jede Analyse soll enthalten:

```text
Aussage
Begründung
Quelle
Confidence-Level
offene Fragen
Empfehlung
```

### 19.2 Technische Qualität

- klare Trennung Frontend / Backend
- API-first Denken
- nachvollziehbare Datenmodelle
- migrationsfähige Datenbank
- robuste Importlogs
- saubere Fehlerbehandlung
- Docker-basierte lokale Entwicklung
- später VPS-fähig

### 19.3 Didaktische Qualität

Die spätere Simulation und Auswertung muss beobachtungsnah sein:

```text
Was wurde gesagt?
Was war die Wirkung?
Was war stark?
Was war riskant?
Welche bessere Alternative hätte es gegeben?
Was soll der Trainee als Nächstes üben?
```

---

## 20. Wichtige fachliche Leitlinien

1. Das System ist kein freier Chatbot, sondern ein geführtes Verhandlungs-Cockpit.
2. Das Verhandlungsprojekt ist das operative Zentrum.
3. Die Knowledge Base ist quellenfähig und nicht nur Dokumentenablage.
4. Lieferantenprofile können manuell oder KI-gestützt entstehen.
5. KI-generierte Aussagen müssen als Annahmen oder Hypothesen markiert werden, wenn sie nicht direkt belegt sind.
6. Excel-Importe sind Kernfunktion, kein späteres Nice-to-have.
7. ZOPA, BATNA und WAP müssen mehrdimensional gedacht werden, nicht nur als Preislogik.
8. Kulturelle Hinweise sind Arbeitshypothesen, keine Stereotype.
9. Konzessionen sollen immer mit Gegenleistungen gekoppelt werden.
10. Die Anwendung muss lokal und später auf dem VPS per Docker Compose lauffähig sein.

---

## 21. Definition of Done für den ersten technischen Meilenstein

Der erste echte technische Meilenstein ist erreicht, wenn Folgendes funktioniert:

```text
1. docker compose up startet Frontend, Backend und PostgreSQL/pgvector.
2. Backend Health Check ist erreichbar.
3. Frontend Startseite ist erreichbar.
4. Company kann angelegt und angezeigt werden.
5. UserProfile kann angelegt und angezeigt werden.
6. KnowledgeDocument kann hochgeladen werden.
7. Einkaufshistorie.xlsx kann importiert werden.
8. Anfragenkatalog.xlsx kann importiert werden.
9. RequestItem kann manuell angelegt werden.
10. Aus einem RequestItem kann ein NegotiationProject erzeugt werden.
11. Alle Imports sind über ImportJob und ImportRows nachvollziehbar.
12. Jedes Dokument enthält Quellen- und Verlässlichkeitsinformationen.
```

---

## 22. Nächster Schritt

Mit dieser Spezifikation soll Codex zuerst keinen vollständigen Produktcode erzeugen, sondern einen konkreten Umsetzungsplan und anschließend das technische Grundgerüst.

Empfohlener erster Codex-Auftrag:

```text
Lies diese Spezifikation und erstelle daraus einen konkreten technischen Umsetzungsplan in Phasen.

Bitte prüfe:
- ob die vorgeschlagene Repository-Struktur sinnvoll ist
- ob das Datenmodell für den MVP konsistent ist
- welche Models und Migrationen zuerst gebaut werden sollten
- welche Risiken bei Docker, pgvector, FastAPI, Next.js und Excel-Importen bestehen
- welche Reihenfolge du für die Implementierung empfiehlst

Erstelle noch keinen Code. Liefere zuerst einen präzisen Implementierungsplan mit Arbeitspaketen.
```

Danach kann Codex schrittweise mit den einzelnen Implementierungsaufgaben beauftragt werden.

