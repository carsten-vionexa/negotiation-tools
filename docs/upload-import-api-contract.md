# Upload-/Import-API-Kontrakt (Phase C1)

## 1. Ziel und Abgrenzung von Phase C1

Phase C beginnt nach der abgeschlossenen MVP-Abnahme mit zwei unterschiedlichen
Eingangskanaelen: Wissensdokumente und strukturierte Importdateien. Vor einer
Implementierung muss feststehen, welches Fachobjekt ein Upload erzeugt, welche
Metadaten dabei gespeichert werden, welcher Startstatus gilt und welche
Verarbeitung ausdruecklich noch nicht stattfindet. Andernfalls wuerden
Storage-, API-, Parser- und Review-Entscheidungen unkontrolliert miteinander
vermischt.

Dieses Dokument ist der verbindliche fachlich-technische Kontrakt fuer die
ersten Phase-C-Schritte. Es bereitet vor:

- C2: lokale Dateiablage und eine spaeter S3-kompatible Storage-Abstraktion.
- C3: einen echten Upload-Endpunkt fuer `KnowledgeDocument`.
- C4: einen echten Upload-Endpunkt fuer `ImportJob`.
- Spaetere, getrennte Issues fuer Parsing, Mapping, Validierung und
  Zielobjekt-Erzeugung.

Phase C1 ist ausschliesslich Architektur und Dokumentation. Es implementiert
bewusst nicht:

- keine Upload-Endpunkte und kein `UploadFile`- oder
  `multipart/form-data`-Handling
- keinen Storage-Service und keine Dateioperationen
- keinen Parser, kein Mapping und keine Validierungsengine
- keine `ImportRow`-Erzeugung und keine Zielobjekt-Erzeugung
- keine Migration und keine Aenderung an Modellen oder Schemas
- keine Frontend-Upload-UI
- kein RAG, OCR, Chunking, Embeddings oder automatische Claim-Extraktion
- keine produktive Simulation, kein Chat, Voice oder Streaming und keine
  Score-Engine

## 2. Upload-Arten

### 2.1 Knowledge-Upload

Ein Knowledge-Upload nimmt eine Wissensquelle fuer die spaetere
Verhandlungsvorbereitung auf.

- Fachliches Zielobjekt nach erfolgreichem Upload: `KnowledgeDocument`.
- Spaetere Verarbeitung: Chunking, Claims, Embeddings und Knowledge
  Intelligence.
- Erlaubte Dateitypen fuer das MVP: `.pdf`, `.md`, `.txt`.

Der Upload erzeugt lediglich das Dokument mit Datei- und Quellenmetadaten. Er
extrahiert keinen Inhalt und erzeugt weder `DocumentChunk` noch
`KnowledgeClaim`.

### 2.2 Import-Upload

Ein Import-Upload nimmt eine strukturierte Quelldatei auf, deren Zeilen
spaeter in Fachobjekte ueberfuehrt werden koennen.

- Fachliches Zielobjekt nach erfolgreichem Upload: `ImportJob`.
- Spaetere Verarbeitung: Parser, Mapping, Validierung, `ImportRow` und
  Zielobjekt-Erzeugung.
- Erlaubte Dateitypen fuer das MVP: `.xlsx`, `.csv`.

Der Upload erzeugt nur den Job und dessen Datei-Metadaten. Insbesondere
entstehen beim Upload keine `ImportRow`-Datensaetze.

## 3. Geplante API-Endpunkte

### 3.1 Zielendpunkte fuer Uploads

| Endpunkt | Zweck | Startobjekt | Nicht Teil des Aufrufs |
| --- | --- | --- | --- |
| `POST /knowledge-documents/upload` | Wissensdatei mit fachlichen Quellenmetadaten aufnehmen | `KnowledgeDocument` | Parsing, Chunks, Claims, Embeddings |
| `POST /import-jobs/upload` | CSV-/XLSX-Quelldatei mit Importkontext aufnehmen | `ImportJob` | Parsing, Mapping, Validierung, `ImportRow`, Zielobjekte |

Beide Endpunkte sind Zielvertraege fuer C3 beziehungsweise C4 und existieren
in C1 noch nicht.

### 3.2 Vorhandene Status- und Review-Basis

Die folgenden GET-Endpunkte existieren bereits. Sie bilden nach spaeteren
Uploads die lesende Status- und Review-Grundlage:

| Bestehender Endpunkt | Rolle in Phase C |
| --- | --- |
| `GET /knowledge-documents` | Knowledge-Dokumente nach Company, Projekt, Typ oder Parsing-Status auflisten |
| `GET /knowledge-documents/{id}` | Metadaten und Verarbeitungsstatus eines Dokuments anzeigen |
| `GET /import-jobs` | Importjobs nach Company, Projekt, Status, Quelle oder Zielobjekt auflisten |
| `GET /import-jobs/{id}` | Datei-, Status-, Zaehler- und Summary-Daten eines Jobs anzeigen |
| `GET /import-rows` | Spaeter entstandene Zeilen fuer Review/Fehleranalyse auflisten |
| `GET /import-rows/{id}` | Spaetere Roh-, Mapping-, Validierungs- und Zielreferenz einer Zeile anzeigen |

`GET /import-rows*` liefert erst dann Daten aus dem Upload-Kontext, wenn ein
spaeterer Parser-Schritt Zeilen erzeugt hat.

## 4. Request-Metadaten je Upload-Endpunkt

Die spaetere technische Transportform ist `multipart/form-data`, wird in C1
nur als Vertrag benannt und nicht implementiert. Die Datei ist ein
Binaerbestandteil; die uebrigen Werte sind Formular- oder strukturierte
Metadaten.

### 4.1 `POST /knowledge-documents/upload`

| Feld | Pflicht | Vertrag / Bezug zum bestehenden Modell |
| --- | --- | --- |
| Datei | ja | Eine `.pdf`-, `.md`- oder `.txt`-Datei; kein Modellfeld, sondern Upload-Inhalt |
| `company_id` | ja | Mandantenbezug; vorhanden in `KnowledgeDocument` |
| `project_id` | nein | Optionaler Projektbezug; muss zur Company gehoeren |
| `title` | nein | Anzeigename der Wissensquelle; als Metadatum vorgesehen, Modellfeld ist derzeit nullable |
| `document_type` | nein | Fachliche Dokumentklassifikation; als Metadatum vorgesehen, Modellfeld ist derzeit nullable |
| `source_name` | nein | Quellenbezeichnung |
| `source_author` | nein | Autor oder herausgebende Stelle |
| `source_date` | nein | Datum der Quelle |
| `reliability_level` | nein | Default gemaess Schema: `unknown` |
| `confidentiality_level` | nein | Default gemaess Schema: `internal` |
| `description` | nein | Freitextbeschreibung |

Die API darf `filename`, `original_filename`, `mime_type`, `file_size_bytes`,
`checksum`, `uploaded_at`, `storage_key`, `storage_path` und
`parsing_status` nicht als vom Client zu kontrollierende Speicherentscheidung
uebernehmen. Diese Werte werden aus Datei und Serververarbeitung bestimmt.

### 4.2 `POST /import-jobs/upload`

| Feld | Pflicht | Vertrag / Bezug zum bestehenden Modell |
| --- | --- | --- |
| Datei | ja | Eine `.xlsx`- oder `.csv`-Datei |
| `company_id` | ja | Mandantenbezug; vorhanden in `ImportJob` |
| `project_id` | nein | Optionaler Projektbezug; muss zur Company gehoeren |
| `knowledge_document_id` | nein | Optionaler Bezug, falls der Import fachlich aus einem Dokument abgeleitet wird |
| `source_type` | ja | Fuer das MVP nur `excel` oder `csv`; muss zum akzeptierten Format passen |
| `target_entity` | ja | Fuer erste Importstrecke nur `procurement_history_item` oder `request_item` |

Eine optionale fachliche Beschreibung oder weitere Metadaten sind sinnvoll als
spaetere Erweiterung, aber `ImportJob` besitzt aktuell weder `description`
noch `metadata_json`. C4 soll solche Felder deshalb nicht stillschweigend
versprechen oder eine Migration erzwingen; eine Erweiterung benoetigt eine
gesonderte Entscheidung.

Auch beim Import setzt der Server Datei-Metadaten, Storage-Key, Status,
Zaehler, JSON-Summaries und Verarbeitungszeitpunkte. Der Client liefert diese
nicht als initiale Steuerwerte.

## 5. Response-Strukturen je Upload-Endpunkt

Beide Upload-Endpunkte sollen bei erfolgreicher Erzeugung mit HTTP `201
Created` antworten. Die vorhandenen Read-Schemas sind der Ausgangspunkt; eine
spaetere Implementierung muss nur dann ein eigenes Upload-Response-Schema
einfuehren, wenn der bestehende Read-Vertrag nicht ausreicht.

### 5.1 Knowledge-Upload

Die Response entspricht `KnowledgeDocumentRead` und enthaelt insbesondere:

- `id`, `company_id`, optional `project_id`, `created_at` und `updated_at`
- `filename` und `original_filename`
- `title`, `document_type` und die gelieferten Quellenmetadaten
- `mime_type`, `file_size_bytes`, `checksum` und `uploaded_at`
- den serverseitig erzeugten relativen `storage_key`
- den fuer die bestehende Modellpflicht befuellten relativen `storage_path`
- `parsing_status="pending"`
- `content_text=null` und `chunk_count=0`

Der Upload liefert keine Chunks, keine Claims und keine Embeddings. Das
bestehende `KnowledgeDocumentRead` exponiert die Embedding-Spalte ohnehin
nicht; sie darf durch den Upload nicht befuellt werden.

### 5.2 Import-Upload

Die Response entspricht `ImportJobRead` und enthaelt insbesondere:

- `id`, `company_id`, optional `project_id`, optional
  `knowledge_document_id`, `created_at` und `updated_at`
- `filename`, `original_filename`, `mime_type`, `file_size_bytes` und
  `checksum`
- den serverseitig erzeugten relativen `storage_key`
- `source_type` und `target_entity`
- `status="pending"`
- `total_rows=0`, `processed_rows=0`, `valid_rows=0` und `error_rows=0`
- `mapping_json={}` und `validation_summary_json={}`
- `error_summary=null`, `started_at=null` und `completed_at=null`

Die Response enthaelt keine `ImportRow`-Datensaetze. `ImportJob` und
`ImportJobRead` haben aktuell kein eigenes `uploaded_at`; im unveraenderten
Modell ist `created_at` der verfuegbare Zeitpunkt der Job-Erzeugung. Ob
`uploaded_at` spaeter auch fuer Imports eingefuehrt wird, ist nach C4 separat
zu entscheiden.

## 6. Fehler- und Statusmodell

### 6.1 Typische Fehlerfaelle

Die konkrete Error-Payload soll den bestehenden API-Konventionen folgen. Die
Upload-Endpunkte muessen mindestens die folgenden Fehler fachlich trennen:

| Fehlerfall | Erwartete Einordnung |
| --- | --- |
| `company_id` fehlt oder ist syntaktisch ungueltig | Request ungueltig (`422`) |
| `company_id` verweist auf keine Company | Referenz nicht gefunden (`404`) |
| Optionales `project_id` existiert nicht | Referenz nicht gefunden (`404`) |
| Optionales `project_id` gehoert nicht zur Company | Kontextkonflikt (`400` oder bestehende Validierungskonvention) |
| Optionales `knowledge_document_id` beim Import ist ungueltig oder fachlich nicht zulaessig | Referenz-/Kontextfehler |
| Dateiendung ist fuer die Upload-Art nicht erlaubt | Validierungsfehler (`400`/`422`) |
| MIME-Type ist nicht erlaubt oder unplausibel zur Extension | Validierungsfehler; Datei nicht persistieren |
| Datei ueberschreitet das konfigurierte Groessenlimit | Payload zu gross (`413`) |
| Dateiname ist leer | Validierungsfehler |
| `source_type` ist nicht unterstuetzt oder widerspricht der Datei | Validierungsfehler |
| `target_entity` ist nicht unterstuetzt | Validierungsfehler |
| Ablage im Storage schlaegt fehl | Server-/Storage-Fehler; kein inkonsistenter Fachdatensatz |

Fuer das MVP gilt als Ausgangswert aus dem Storage-Konzept ein Limit von `25
MB` pro Datei; C2 soll den konfigurierbaren Grenzwert festlegen.

### 6.2 Statuslogik

Nach erfolgreichem Upload gilt ausschliesslich:

- `KnowledgeDocument.parsing_status="pending"`.
- `ImportJob.status="pending"`.

Spaetere Importstatus werden in C1 nur reserviert und nicht gesetzt:

- `mapping`
- `validated`
- `processing`
- `completed`
- `completed_with_errors`
- `failed`
- `cancelled`

Ein Storage- oder Requestfehler ist kein erfolgreich erzeugter Pending-Upload.
Wie technische Fehler vor oder nach Persistenz transaktional bereinigt werden,
wird mit Storage und Endpunktimplementierung in C2 bis C4 festgelegt.

## 7. Sicherheitsregeln

Fuer C2 bis C4 gelten verbindlich folgende Regeln:

- Der Original-Dateiname wird nie als Speicherpfad verwendet.
- Pfadbestandteile aus Clientdaten werden nicht uebernommen; insbesondere
  muessen Path-Traversal-Versuche mit `..`, absoluten Pfaden oder Separatoren
  verhindert werden.
- Der Storage-Key wird ausschliesslich serverseitig generiert.
- In der Datenbank werden nur relative Storage-Keys beziehungsweise relative
  Kompatibilitaetspfade gespeichert, niemals absolute lokale Pfade.
- Die Dateiendung wird normalisiert und pro Upload-Art gegen eine Whitelist
  geprueft.
- Ein MIME-Type ist nur ein Signal und ersetzt keine Extension- und spaetere
  Inhaltspruefung.
- Das konfigurierte Groessenlimit wird vor beziehungsweise waehrend der
  Ablage eingehalten.
- Temporaere Dateien oder teilweise geschriebene Objekte werden bei Fehlern
  bereinigt.
- Hochgeladene Dateien werden nicht ausgefuehrt.
- Die Ablage wird so abstrahiert, dass ein spaeteres S3-kompatibles Backend
  moeglich bleibt; ein solches Backend wird in C1 nicht implementiert.

Erweiterungen wie Virenscan, Quarantaene oder tiefergehende
Content-Sicherheitspruefungen bleiben spaetere Entscheidungen.

## 8. Storage-Key- und Dateimetadaten-Kontrakt

### 8.1 Semantik der Datei-Metadaten

| Feld | Semantik | Serververantwortung |
| --- | --- | --- |
| `original_filename` | Vom Client gelieferter, bereinigter Anzeigename der Quelldatei | Nur als Metadatum speichern, nie als Pfad nutzen |
| `filename` | Fachlicher/anzeigbarer Dateiname; kann im MVP dem bereinigten Originalnamen entsprechen | Aus Upload bestimmen und laengen-/formatgerecht persistieren |
| `storage_key` | Kanonische relative Storage-Referenz, z. B. `knowledge/<uuid>.pdf` oder `imports/<uuid>.csv` | Generieren, normalisierte Extension verwenden |
| `storage_path` | Bestehendes Pflichtfeld nur bei `KnowledgeDocument`; relative Kompatibilitaetsreferenz | Bis zu einer spaeteren Modellentscheidung befuellen |
| `mime_type` | Beim Upload festgestellter beziehungsweise gemeldeter Content-Type | Validieren und als technisches Metadatum speichern |
| `file_size_bytes` | Groesse der gespeicherten Quelldatei in Bytes | Ermitteln; gegen Limit pruefen |
| `checksum` | Pruefsumme der gespeicherten Originaldatei, Algorithmus in C2 festzulegen | Serverseitig berechnen |
| `uploaded_at` | Zeitpunkt der erfolgreichen Aufnahme der Datei | Bei `KnowledgeDocument` vorhanden; Import-Gap siehe unten |

Beispielhafte relative Keys:

```text
knowledge/4b7f9e9e-7c0d-4f8b-8f8b-2f0a6f4f6d2f.pdf
imports/71eaf4d2-6f03-4c38-85d7-7f8c4f5e1229.csv
```

### 8.2 Aktueller Modellbefund und Konsequenz fuer C2/C3/C4

Der aktuelle Code ergibt folgenden verbindlichen Befund:

- `KnowledgeDocument.storage_path` ist ein Pflichtfeld
  (`nullable=False`) und auch in `KnowledgeDocumentCreate` erforderlich.
- `KnowledgeDocument.storage_key` ist optional vorhanden.
- `KnowledgeDocument` besitzt `uploaded_at`.
- `ImportJob.storage_key` ist optional vorhanden.
- `ImportJob` hat aktuell kein `storage_path` und kein `uploaded_at`.

Daraus folgt ohne sofortige Migration:

- C2 definiert `storage_key` als kanonische relative Referenz fuer neue
  Ablagen und eine einheitliche Key-Generierung fuer beide Upload-Arten.
- C3 setzt beim spaeteren Knowledge-Upload `storage_key` und befuellt zugleich
  das bestehende Pflichtfeld `storage_path` mit einer sicheren relativen
  Kompatibilitaetsreferenz, vorzugsweise demselben relativen Key. Es wird kein
  absoluter Dateisystempfad gespeichert.
- C4 verwendet fuer `ImportJob` den vorhandenen `storage_key`; ein
  `storage_path` wird fuer Imports nicht erfunden.
- C4 kann fuer den Aufnahmezeitpunkt zunaechst `created_at` als bestehenden
  Job-Zeitpunkt nutzen. Ein separates `uploaded_at` auf `ImportJob` ist eine
  moegliche spaetere Modellerweiterung, jedoch kein Vorwand fuer eine
  C1-Migration.
- Eine spaetere Bereinigung oder Angleichung von `storage_path` und
  `uploaded_at` wird erst entschieden, wenn die implementierten Endpunkte
  einen belegten Bedarf zeigen.

## 9. ImportJob-Lifecycle

Der Phase-C-Lifecycle lautet:

```text
Upload -> ImportJob(status=pending)
pending -> parsing/mapping spaeter
mapping -> validated spaeter
validated -> processing spaeter
processing -> completed oder completed_with_errors spaeter
failed/cancelled als Fehler-/Abbruchzustaende spaeter
```

Verantwortungsgrenzen:

- Upload erzeugt noch keine `ImportRow`.
- Parsing erzeugt spaeter hoechstens Rohdaten in
  `ImportRow.raw_data_json`.
- Mapping fuellt spaeter `ImportRow.mapped_data_json`.
- Validierung setzt spaeter `validation_status`, Fehler und Warnungen.
- Zielobjekt-Erzeugung setzt spaeter `target_entity` und
  `target_record_id`.

Diese Grenzen verhindern, dass ein erfolgreicher Datei-Upload bereits als
fachlich erfolgreicher Import missverstanden wird.

`parsing` bezeichnet hierbei einen spaeteren Verarbeitungsschritt, nicht einen
bereits verbindlich persistierten Wert von `ImportJob.status`. Der erste
reservierte Folgestatus nach vorbereiteten Rohdaten ist gemaess aktuellem
Konzept `mapping`.

## 10. Modell- und API-Gaps aus aktuellem Code

Die folgenden Luecken sind fuer Folge-Issues sichtbar zu halten:

- `ImportJobCreate` existiert, aber es gibt aktuell keinen
  `POST`-Endpunkt fuer ImportJobs.
- `ImportRowCreate` existiert, aber es gibt aktuell keinen
  `POST`-Endpunkt fuer ImportRows. Ein solcher Endpunkt ist fuer den
  Upload-Schritt auch nicht erforderlich.
- `KnowledgeDocument` hat mit `POST /knowledge-documents` bereits einen
  Metadaten-Endpunkt, jedoch keinen echten Datei-Upload-Endpunkt.
- `ImportJob` und `ImportRow` sind aktuell ueber ihre GET-Endpunkte lesend
  nutzbar.
- Ein Import-Upload benoetigt bei optionalem `knowledge_document_id` spaeter
  eine klare Referenz- und Company-/Projekt-Kontextpruefung.
- `ImportJob` besitzt derzeit keine allgemeinen Beschreibungsmetadaten und
  kein eigenes `uploaded_at`; C1 erzwingt dafuer keine Migration.

Aus den bisherigen Konzeptdokumenten uebernommene fachliche Mapping-Namen
muessen vor der Implementierung auf die echten Zielmodelle abgebildet werden.
Beispiele:

| Konzeptname | Echtes Zielfeld |
| --- | --- |
| `article_name` fuer Einkaufshistorie | `ProcurementHistoryItem.item_name` |
| `order_date` | `ProcurementHistoryItem.purchased_at` |
| `quantity` fuer Anfrageposition | `RequestItem.requested_quantity` |

Weitere Pflichtfeld- und Feldnamenabgleiche gehoeren in die spaeteren
Mapping-/Validierungs-Issues, nicht in eine Upload-Implementierung.

## 11. Folge-Issues C2 bis C4

### C2: Lokale Dateiablage / Storage-Service vorbereiten

- Konfigurierbares lokales Ablageverzeichnis und Groessenlimit festlegen.
- Serverseitige relative Storage-Key-Erzeugung und Checksummenstrategie
  definieren/implementieren.
- Fehlerbereinigung und spaetere S3-kompatible Abstraktionsgrenze festlegen.
- Noch keine Upload-Endpunkte, Parser oder Fachobjekterzeugung vorziehen.

### C3: KnowledgeDocument-Upload-Endpunkt implementieren

- `POST /knowledge-documents/upload` gemaess diesem Vertrag implementieren.
- Datei- und Quellenmetadaten validieren und `KnowledgeDocument` im Status
  `pending` zurueckgeben.
- Das bestehende `storage_path` kompatibel und relativ befuellen.
- Kein Chunking, keine Claims und keine Embeddings erzeugen.

### C4: ImportJob-Upload-Endpunkt implementieren

- `POST /import-jobs/upload` gemaess diesem Vertrag implementieren.
- CSV-/XLSX-Datei und Importkontext validieren und `ImportJob` im Status
  `pending` mit leeren Summaries und Zaehlern erzeugen.
- Keine `ImportRow`, kein Parsing, Mapping, Validieren oder Erzeugen von
  Zielobjekten ausloesen.

Nach C4 bleiben Parser, Mapping, Validierung und Zielobjekt-Erzeugung bewusst
eigenstaendige Folge-Issues.
