# Data Model

## Aktueller Stand

Das Backend nutzt PostgreSQL mit pgvector, SQLAlchemy-Models und Alembic-Migrationen. Das aktuelle Datenmodell bildet eine bewusst MVP-reduzierte, aber fachlich geschaerfte Grundlage fuer ein KI-gestuetztes Verhandlungs-Cockpit ab: Unternehmen, Nutzerprofile, Wissensdokumente, Anfragepositionen, Lieferantenprofile, Einkaufshistorien und Verhandlungsprojekte koennen bereits strukturiert gespeichert werden.

Die vorhandenen JSONB-Felder dienen als flexible Erweiterungspunkte, ohne das relationale Kernmodell jetzt schon fachlich zu ueberdehnen. Die Knowledge Base ist nun dreistufig vorbereitet: Dokumente, zitierbare Textstellen und daraus abgeleitete Aussagen. Das Import-Datenmodell ist zweistufig vorbereitet: Importvorgaenge und einzelne Quelldatenzeilen. Das Strategiemodell ist relational vorbereitet: Strategien, ZOPA-Elemente, BATNA-Optionen, Konzessionen und Argumentationslinien koennen strukturiert gespeichert werden. Das Simulations- und Auswertungsmodell ist als persistente Struktur fuer Szenarien, Dialogverlauf, Ergebnisse und menschliches Trainerfeedback vorbereitet.

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
- `Strategy`: Strukturierte Verhandlungsstrategie mit Projekt-, Unternehmens-, Status-, Versions- und Zielinformationen.
- `ZopaItem`: Einzelne Verhandlungsdimension oder Einigungszone einer Strategie.
- `BatnaOption`: Konkrete Alternative zur Verhandlung mit Machbarkeit, Kosten, Risiken und Bewertung.
- `ConcessionItem`: Moegliches Zugestaendnis mit Bedingung, Gegenleistung, Reihenfolge und Risiko.
- `ArgumentationLine`: Argumentationslinie mit Claim, Evidenz, erwarteter Gegenposition und Reaktionsstrategie.
- `SimulationScenario`: Konfiguration eines konkreten Trainings- oder Simulationsdurchlaufs.
- `SimulationMessage`: Einzelne Nachricht im Dialogverlauf eines Simulationsszenarios.
- `SimulationResult`: Zusammenfassende Auswertung oder Ergebnisnotiz eines Simulationsdurchlaufs.
- `TrainerComment`: Menschliches Trainerfeedback zu Szenario, Ergebnis oder einzelner Nachricht.

## Fachliche Schaerfung der Kernmodelle

Die bestehenden Kernmodelle wurden additiv erweitert. Es wurden keine bestehenden Spalten entfernt und keine neuen Workflow- oder Analyse-Tabellen eingefuehrt.

- `ProcurementHistoryItem`: `supplier_country`, `lead_time_weeks`, `quality_rating`, `price_assessment`, `improvement_potential`.
- `RequestItem`: `article_name`, `article_description`, `target_delivery_time`, `rough_price_expectation`, `target_region`, `status`, `comment`.
- `KnowledgeDocument`: `project_id`, Datei-Metadaten (`original_filename`, `storage_key`, `mime_type`, `file_size_bytes`, `checksum`, optional `uploaded_at`), `source_name`, `source_author`, `source_date`, `reliability_level`, `confidentiality_level`, `description`. Das bestehende `embedding`-Feld bleibt erhalten, wird aber perspektivisch nicht als primaere RAG-Basis betrachtet.
- `DocumentChunk`: `knowledge_document_id`, `company_id`, optionaler `project_id`, `chunk_index`, `content`, optionale Positions- und Quellenangaben, `metadata_json` und ein optionales `embedding` auf Chunk-Ebene.
- `KnowledgeClaim`: `company_id`, optionale Projekt- und Lieferantenreferenzen, Dokument- und optionale Chunk-Referenz, `claim_type`, `claim_category`, `claim_text`, `evidence_text`, `source_reference`, `confidence_level`, `information_kind`, `is_ai_generated` und `metadata_json`.
- `ImportJob`: `company_id`, optionale Projekt- und Dokumentreferenzen, `filename`, Datei-Metadaten (`original_filename`, `storage_key`, `mime_type`, `file_size_bytes`, `checksum`), `source_type`, `target_entity`, `status`, Zeilenzaehler, `mapping_json`, `validation_summary_json`, optionale Fehlerzusammenfassung sowie Start- und Abschlusszeitpunkt.
- `ImportRow`: `import_job_id`, `company_id`, optionaler `project_id`, `row_number`, optionaler Sheet-Name, `raw_data_json`, `mapped_data_json`, `validation_status`, optionale Fehler- und Warnhinweise, flexible Zielreferenz ueber `target_entity` und `target_record_id` sowie `metadata_json`.
- `SupplierProfile`: `region`, `industry`, `supplier_type`, `power_level`, `risk_level`, `cultural_context`, `interests_json`, `likely_tactics_json`, `constraints_json`, `is_ai_generated`, `confidence_level`.
- `NegotiationProject`: `project_type`, `category`, `article_or_service`, `quantity`, `target_region`, `desired_delivery_time`, `internal_price_expectation`, `currency`, `current_supplier`, `priority`, `business_pressure`, `technical_dependency_level`, `supplier_power_level`, `risk_level`.
- `Strategy`: `company_id`, `negotiation_project_id`, `title`, `status`, `version`, `is_active`, Ziel-, ZOPA-, BATNA-, Konzessions-, Argumentations-, Risiko- und Notizfelder sowie `metadata_json`.
- `ZopaItem`: `strategy_id`, Dimension, Ziel-/Walk-away-Werte beider Seiten, moegliche Einigungsrange, Waehrung, Einheit, Prioritaet, Confidence, Informationsart, Quelle und `metadata_json`.
- `BatnaOption`: `strategy_id`, Titel, Typ, Beschreibung, Machbarkeit, Kosten, Lead Time, Risiko, Impact, notwendige Aktionen, Praeferenz, Ranking, Confidence und `metadata_json`.
- `ConcessionItem`: `strategy_id`, Titel, Typ, Beschreibung, Wert fuer beide Seiten, Kosten, Bedingung, Gegenleistung, Reihenfolge, Final-Offer-Markierung, Risiko und `metadata_json`.
- `ArgumentationLine`: `strategy_id`, Titel, Argumenttyp, Claim, Evidenz, Quelle, erwartetes Gegenargument, Reaktionsstrategie, Prioritaet, Confidence, Informationsart und `metadata_json`.
- `SimulationScenario`: `company_id`, `negotiation_project_id`, optionale Strategie-, Lieferanten- und Nutzerreferenzen, Titel, Status, Szenario- und Rolleninformationen, Kontext, Ziel, Briefing, Erfolgskriterien, Zeitlimit, Sprache, Start-/Abschlusszeitpunkte und `metadata_json`.
- `SimulationMessage`: `simulation_scenario_id`, optionale Nutzerreferenz, Sequenznummer, Senderinformationen, Nachrichtentext, Nachrichtentyp, Phase sowie JSONB-Speicherorte fuer spaetere Taktik- und Analyseinformationen.
- `SimulationResult`: `simulation_scenario_id`, optionale Nutzerreferenz, Status, Zusammenfassung, Outcome, Zielerreichung, vereinbarte Konditionen, Lernpunkte, naechste Schritte, optionale Score-Felder sowie `feedback_json` und `metadata_json`.
- `TrainerComment`: `simulation_scenario_id`, optionale Ergebnis-, Nachrichten- und Trainerreferenzen, Kommentartyp, Kommentartext, Kompetenzbezug, Schweregrad, Sichtbarkeit fuer Trainees und `metadata_json`.

`KnowledgeDocument` kann optional einem `NegotiationProject` zugeordnet werden. Die Beziehung ist nullable und nutzt `ondelete="SET NULL"`, damit Dokumente beim Entfernen eines Projekts nicht geloescht werden.

## Datei-Metadaten fuer Uploads

`KnowledgeDocument` und `ImportJob` sind additiv fuer spaetere Upload- und Storage-Logik vorbereitet. Die neuen Felder sind nullable und ergaenzen die bestehenden Anzeige- und Businessfelder, ohne bestehende Create-Flows oder Daten zu brechen.

Folgende Datei-Metadaten werden relational gespeichert:

- `original_filename`: Der vom Nutzer gelieferte Dateiname als nachvollziehbares Metadatum. Bestehende Felder wie `filename` bleiben erhalten und koennen weiter als Anzeige- oder fachliches Businessfeld genutzt werden.
- `storage_key`: Technische Referenz auf eine spaetere Dateiablage. Der Wert ist bewusst neutral benannt und legt weder lokale Pfade noch S3, MinIO oder eine andere Storage-Architektur fest.
- `mime_type`: Technischer Content-Type fuer spaetere Validierung, Filterung und Anzeige. Bei `KnowledgeDocument` existierte dieses Feld bereits und bleibt erhalten.
- `file_size_bytes`: Dateigroesse als numerischer Wert fuer Groessenlimits, Validierung und Betriebsdiagnose.
- `checksum`: Pruefsumme fuer Integritaetspruefung, Dubletten-Erkennung und nachvollziehbare Wiederverarbeitung.
- `uploaded_at`: Nur bei `KnowledgeDocument` als optionaler fachlicher Upload-Zeitpunkt. `created_at` bleibt der technische Erstellzeitpunkt des Datensatzes.

Diese Felder sind relationale Spalten, weil sie stabile, haeufig benoetigte technische Datei-Metadaten sind und spaeter fuer Validierung, Suche, Dublettenpruefung, Auditing oder Betriebsdiagnose direkt adressierbar sein sollen. Flexible oder noch nicht standardisierte Informationen bleiben in `metadata_json`, etwa Parser-spezifische Hinweise, erkannte Dateieigenschaften, Upload-Client-Details, Validierungsdetails, Content-Inspection-Ergebnisse oder spaetere KI-/Pipeline-Zwischenergebnisse.

Diese Erweiterung implementiert noch keine Upload-API, keine Dateiablage, keinen Storage-Service, kein S3 oder MinIO, kein Parsing, kein Chunking, keine Embeddings und keine RAG-Logik. `storage_key` ist nur ein vorbereiteter technischer Bezugspunkt.

## Knowledge-Base-Struktur

Die Knowledge Base besteht kuenftig aus drei fachlichen Ebenen:

1. `KnowledgeDocument`: Originalquelle, Datei-Metadaten, Dokumentmetadaten, Quelleninformationen, Projektbezug, Reliability/Confidentiality und optionaler Volltext.
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

Die Datei-Metadaten auf `ImportJob` spiegeln die Upload-Vorbereitung fuer strukturierte Quelldateien: `filename` bleibt als Anzeige- oder Businessfeld erhalten, waehrend `original_filename`, `storage_key`, `mime_type`, `file_size_bytes` und `checksum` die technische Dateiherkunft und Integritaet nachvollziehbar machen.

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

## Strategiemodell

Das Strategiemodell besteht aus `Strategy`, `ZopaItem`, `BatnaOption`, `ConcessionItem` und `ArgumentationLine`.

`Strategy` ist das zentrale Objekt fuer die strukturierte Verhandlungsvorbereitung. Eine Strategie gehoert zu genau einem `NegotiationProject` und einer `Company`. Ein `NegotiationProject` kann mehrere Strategien haben, etwa fuer Versionen oder Varianten. Eine aktive Strategie kann ueber `status` und `is_active` markiert werden; es gibt bewusst keine harte 1:1-Einschraenkung.

Die Kindobjekte haengen an `strategy_id` und werden mit der Strategie geloescht. Strategien werden mit dem zugehoerigen `NegotiationProject` geloescht. Die bestehenden JSONB-Felder in `NegotiationProject`, insbesondere `strategy_data`, bleiben erhalten und dienen weiter als flexible Erweiterungs- oder Scratchpad-Felder.

`ZopaItem` modelliert einzelne Verhandlungsdimensionen wie Preis, Lieferzeit, Zahlungsziel, SLA, Laufzeit oder andere qualitative und quantitative Einigungsbereiche. Werte bleiben in dieser Stufe bewusst Strings, weil nicht jede ZOPA-Dimension numerisch oder direkt berechenbar ist.

`BatnaOption` beschreibt konkrete Alternativen mit Machbarkeit, Kosten, Lead Time, Risiko, Impact und Bewertung. `ConcessionItem` beschreibt Zugestaendnisse als Tauschobjekte mit Bedingung und Gegenleistung, nicht als reines Nachgeben. `ArgumentationLine` trennt Claim, Evidenz, Quelle, erwartete Gegenposition und Reaktionsstrategie.

Relationale Tabellen werden fuer die stabilen fachlichen Bausteine genutzt: Strategie, ZOPA-Dimensionen, BATNA-Optionen, Konzessionsobjekte, Argumentationslinien sowie zentrale Status-, Prioritaets-, Ranking- und Confidence-Felder. JSONB bleibt fuer flexible Zusatzdaten, Rohannahmen, spaetere KI-Outputs und noch nicht standardisierte Bewertungsdetails erhalten.

Fachliche Werte bleiben freie Strings. Es werden weiterhin keine harten technischen Enums fuer Status, Typen, Prioritaeten, Confidence-Werte oder Informationsarten eingefuehrt.

Nicht Teil dieses Schritts sind KI-Strategie-Generierung, automatische ZOPA-Berechnung, Simulation, Auswertung oder eine neue Service-Schicht.

## Simulations- und Auswertungsmodell

Das Simulations- und Auswertungsmodell besteht aus `SimulationScenario`, `SimulationMessage`, `SimulationResult` und `TrainerComment`.

`SimulationScenario` ist der fachliche Anker fuer einen konkreten Trainings- oder Simulationsdurchlauf. Ein Szenario gehoert zu einer `Company` und einem `NegotiationProject`. Optional kann es auf eine vorbereitete `Strategy`, ein `SupplierProfile` und ein `UserProfile` verweisen. Dadurch kann ein spaeterer Trainingslauf mit Projektkontext, Strategievorbereitung, Lieferantenannahmen und Nutzerbezug gespeichert werden, ohne schon eine Simulations-Engine festzulegen.

`SimulationMessage` speichert einzelne Nachrichten im Verlauf eines Szenarios. Die Reihenfolge wird ueber `sequence_number` gehalten. Senderrolle, Name, Nachrichtentyp und Phase bleiben freie Strings. `detected_tactics_json` und `analysis_json` sind nur Speicherorte fuer spaetere Auswertungen; in dieser Stufe wird daraus keine Analyse erzeugt.

`SimulationResult` speichert eine zusammenfassende Ergebnis- oder Auswertungsstruktur zu einem Szenario. Es gibt bewusst keine harte technische 1:1-Einschraenkung zwischen Szenario und Ergebnis, damit spaeter Wiederholungen, alternative Auswertungslaeufe oder Trainer-/KI-Vergleiche moeglich bleiben. Score-Felder sind optional und werden nicht automatisch berechnet.

`TrainerComment` speichert menschliches Trainerfeedback. Ein Kommentar gehoert immer zu einem Szenario und kann optional auf ein Ergebnis, eine einzelne Nachricht und ein Trainer-`UserProfile` verweisen. Damit kann Feedback sowohl allgemein zum Durchlauf als auch konkret zu einem Moment im Dialog oder zu einer Ergebnisbewertung abgelegt werden.

Relationale Felder werden fuer stabile Beziehungen, Szenario-Konfiguration, Nachrichtenreihenfolge, Ergebnisstatus, Outcome, Score-Felder und Feedback-Zuordnung genutzt. JSONB bleibt fuer spaetere Taktik-Erkennung, detaillierte Rubrics, Rohdaten, flexible Zusatzinformationen und noch nicht standardisierte Bewertungsdetails reserviert.

Fachliche Werte bleiben freie Strings. Es werden weiterhin keine harten technischen Enums fuer Status, Szenariotypen, Rollen, Senderarten, Outcomes, Kommentararten, Kompetenzen oder Severity-Werte eingefuehrt.

Nicht Teil dieses Modells sind KI-Simulation, Echtzeit-Dialoglogik, Chat-/Streaming-/Voice-Logik, automatische Bewertung, Trainer-UI, komplexe Lernhistorie oder eine neue Service-Schicht. Die Tabellen bilden nur die additive, migrationsfaehige Persistenzgrundlage.

## Bewusste MVP-Reduktion

Das Modell ist weiterhin absichtlich fokussiert gehalten. Es soll eine stabile technische Grundlage bereitstellen, bevor Importpipelines, produktive RAG-Strukturen, Simulationslogik oder Auswertungslogik festgelegt werden. Upload, Dateiablage, Parsing, Mapping-UI, automatische Validierung, automatische Zielobjekt-Erzeugung, Chunking-Service, Embedding-Erzeugung, RAG, KI-Strategie-Generierung, KI-Simulation, Echtzeit-Dialoglogik, automatische Bewertung und Trainer-UI sind weiterhin spaetere Arbeitspakete.

## Noch nicht implementierte Fachobjekte

- `tenants`
- `cultural_briefings`
