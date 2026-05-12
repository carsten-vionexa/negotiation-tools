# Data Model

## Aktueller Stand

Das Backend nutzt PostgreSQL mit pgvector, SQLAlchemy-Models und Alembic-Migrationen. Das aktuelle Datenmodell bildet eine bewusst MVP-reduzierte, aber fachlich geschaerfte Grundlage fuer ein KI-gestuetztes Verhandlungs-Cockpit ab: Unternehmen, Nutzerprofile, Wissensdokumente, Anfragepositionen, Lieferantenprofile, Einkaufshistorien und Verhandlungsprojekte koennen bereits strukturiert gespeichert werden.

Die vorhandenen JSONB-Felder dienen als flexible Erweiterungspunkte, ohne das relationale Kernmodell jetzt schon fachlich zu ueberdehnen. Die Knowledge Base ist nun dreistufig vorbereitet: Dokumente, zitierbare Textstellen und daraus abgeleitete Aussagen. Das Import-Datenmodell ist zweistufig vorbereitet: Importvorgaenge und einzelne Quelldatenzeilen. Detailmodelle fuer Strategien, Simulationen und Trainerfeedback sind weiterhin bewusst nicht implementiert.

## Vorhandene Kernmodelle

- `Company`: Mandantennahe Unternehmensbasis fuer Profile, Dokumente, Anfragen, Lieferanten und Projekte.
- `UserProfile`: Nutzer- oder Rollenprofil innerhalb eines Unternehmens.
- `KnowledgeDocument`: Originalquelle, Datei- und Dokumentmetadaten sowie optionaler Volltext fuer Wissensdokumente.
- `DocumentChunk`: Zitierbare und perspektivisch semantisch durchsuchbare Textstelle eines Wissensdokuments.
- `KnowledgeClaim`: Extrahierte oder KI-generierte Aussage mit Evidenz, Quelle, Confidence und Informationsart.
- `RequestItem`: Einkaufs- oder Anfrageposition als Gegenstand einer Verhandlung.
- `SupplierProfile`: Lieferantenprofil mit Kontakt-, Beziehungs- und Annahmedaten.
- `NegotiationProject`: Verhandlungsprojekt mit Verweisen auf Unternehmen, Owner, Anfrageposition und Lieferant.
- `ProcurementHistoryItem`: Historische Einkaufspositionen als Datenbasis fuer spaetere Analysen.
- `ImportJob`: Nachvollziehbarer Importvorgang fuer Datei, Quelltyp, Zielobjekt, Status und Mapping.
- `ImportRow`: Einzelne Quelldatenzeile mit Rohdaten, gemappten Daten, Validierungsstatus und optionalem Zielobjektbezug.

## Fachliche Schaerfung der Kernmodelle

Die bestehenden Kernmodelle wurden additiv erweitert. Es wurden keine bestehenden Spalten entfernt und keine neuen Workflow- oder Analyse-Tabellen eingefuehrt.

- `ProcurementHistoryItem`: `supplier_country`, `lead_time_weeks`, `quality_rating`, `price_assessment`, `improvement_potential`.
- `RequestItem`: `article_name`, `article_description`, `target_delivery_time`, `rough_price_expectation`, `target_region`, `status`, `comment`.
- `KnowledgeDocument`: `project_id`, `source_name`, `source_author`, `source_date`, `reliability_level`, `confidentiality_level`, `description`. Das bestehende `embedding`-Feld bleibt erhalten, wird aber perspektivisch nicht als primaere RAG-Basis betrachtet.
- `DocumentChunk`: `knowledge_document_id`, `company_id`, optionaler `project_id`, `chunk_index`, `content`, optionale Positions- und Quellenangaben, `metadata_json` und ein optionales `embedding` auf Chunk-Ebene.
- `KnowledgeClaim`: `company_id`, optionale Projekt- und Lieferantenreferenzen, Dokument- und optionale Chunk-Referenz, `claim_type`, `claim_category`, `claim_text`, `evidence_text`, `source_reference`, `confidence_level`, `information_kind`, `is_ai_generated` und `metadata_json`.
- `ImportJob`: `company_id`, optionale Projekt- und Dokumentreferenzen, `filename`, `source_type`, `target_entity`, `status`, Zeilenzaehler, `mapping_json`, `validation_summary_json`, optionale Fehlerzusammenfassung sowie Start- und Abschlusszeitpunkt.
- `ImportRow`: `import_job_id`, `company_id`, optionaler `project_id`, `row_number`, optionaler Sheet-Name, `raw_data_json`, `mapped_data_json`, `validation_status`, optionale Fehler- und Warnhinweise, flexible Zielreferenz ueber `target_entity` und `target_record_id` sowie `metadata_json`.
- `SupplierProfile`: `region`, `industry`, `supplier_type`, `power_level`, `risk_level`, `cultural_context`, `interests_json`, `likely_tactics_json`, `constraints_json`, `is_ai_generated`, `confidence_level`.
- `NegotiationProject`: `project_type`, `category`, `article_or_service`, `quantity`, `target_region`, `desired_delivery_time`, `internal_price_expectation`, `currency`, `current_supplier`, `priority`, `business_pressure`, `technical_dependency_level`, `supplier_power_level`, `risk_level`.

`KnowledgeDocument` kann optional einem `NegotiationProject` zugeordnet werden. Die Beziehung ist nullable und nutzt `ondelete="SET NULL"`, damit Dokumente beim Entfernen eines Projekts nicht geloescht werden.

## Knowledge-Base-Struktur

Die Knowledge Base besteht kuenftig aus drei fachlichen Ebenen:

1. `KnowledgeDocument`: Originalquelle, Datei, Dokumentmetadaten, Quelleninformationen, Projektbezug, Reliability/Confidentiality und optionaler Volltext.
2. `DocumentChunk`: Primaere zitierbare und semantisch durchsuchbare Einheit. Embeddings liegen perspektivisch primaer auf Chunk-Ebene.
3. `KnowledgeClaim`: Aussageebene, die Claim, Evidenz, Quelle, Confidence und Informationsart voneinander trennt.

`KnowledgeDocument.embedding` bleibt vorerst aus Kompatibilitaets- und Migrationsgruenden bestehen. Fuer spaetere RAG-Funktionen soll jedoch `DocumentChunk.embedding` die primaere technische Grundlage werden.

Fachliche Werte werden in dieser Stufe bewusst als freie Strings modelliert und noch nicht als technische Enums erzwungen.

Moegliche Werte fuer `information_kind`:

- `fact`
- `assumption`
- `hypothesis`
- `recommendation`
- `training_note`

Moegliche Werte fuer `claim_type`:

- `market_risk`
- `supplier_power`
- `price_pressure`
- `cultural_hint`
- `technical_dependency`
- `commercial_term`
- `historical_price`
- `quality_issue`
- `lead_time_issue`
- `negotiation_pattern`
- `training_hint`
- `other`

Moegliche Werte fuer `confidence_level`:

- `low`
- `medium`
- `high`
- `unknown`

## Importmodell

Das Importmodell besteht aus `ImportJob` und `ImportRow`.

`ImportJob` beschreibt einen vollstaendigen Importvorgang fuer eine Datei, einen Datentyp, ein Zielobjekt, den Status und das verwendete Mapping. Die Zaehlfelder halten fest, wie viele Zeilen insgesamt, verarbeitet, gueltig oder fehlerhaft sind. `mapping_json` und `validation_summary_json` bleiben flexible JSONB-Strukturen fuer spaetere Mapping- und Validierungsschritte.

`ImportRow` beschreibt eine einzelne Quelldatenzeile aus Excel, CSV oder manueller Erfassung. Gespeichert werden Rohdaten, gemappte Daten, Validierungsstatus, Fehler, Warnungen und ein optionaler Bezug auf ein spaeter erzeugtes oder zugeordnetes Zielobjekt.

`target_entity` und `target_record_id` werden bewusst als flexible Zielreferenz verwendet, noch ohne polymorphe Foreign Keys. Dadurch koennen spaetere Importlaeufe insbesondere `ProcurementHistoryItem`, `RequestItem` oder weitere Zielobjekte referenzieren, ohne das Datenmodell jetzt schon auf konkrete Zieltabellen festzulegen.

Moegliche Werte fuer `ImportJob.status`:

- `pending`
- `mapping`
- `validated`
- `processing`
- `completed`
- `completed_with_errors`
- `failed`
- `cancelled`

Moegliche Werte fuer `ImportRow.validation_status`:

- `pending`
- `valid`
- `warning`
- `error`
- `imported`
- `skipped`

Moegliche Werte fuer `source_type`:

- `excel`
- `csv`
- `manual`

Typische Werte fuer `target_entity`:

- `procurement_history_item`
- `request_item`
- spaeter weitere

Fuer diese Stufe bleiben alle diese Werte freie Strings. Upload, Dateiablage, Excel-/CSV-Parsing, Mapping-UI, automatische Validierung und automatische Datensatz-Erzeugung sind weiterhin spaetere Arbeitspakete.

## Bewusste MVP-Reduktion

Das Modell ist weiterhin absichtlich fokussiert gehalten. Es soll eine stabile technische Grundlage bereitstellen, bevor Importpipelines, produktive RAG-Strukturen oder Simulationsdaten festgelegt werden. Upload, Dateiablage, Parsing, Mapping-UI, automatische Validierung, automatische Zielobjekt-Erzeugung, Chunking-Service, Embedding-Erzeugung und RAG sind weiterhin spaetere Arbeitspakete.

## Noch nicht implementierte Fachobjekte

- `tenants`
- `strategies`
- `zopa_items`
- `batna_options`
- `concession_items`
- `argumentation_lines`
- `cultural_briefings`
- `simulation_scenarios`
- `simulation_messages`
- `simulation_results`
- `trainer_comments`
