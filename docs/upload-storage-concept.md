# Upload- und Dateiablage-Konzept

## Ziele

Dieses Konzept beschreibt die technische Zielstruktur fuer spaetere Uploads und Dateiablage im MVP. Es ist eine Dokumentationsgrundlage und implementiert noch keine Upload-Logik.

- Sichere lokale Dateiablage fuer MVP und Entwicklung bereitstellen.
- Dateiablage und fachliche Metadatenobjekte klar trennen.
- `KnowledgeDocument` und `ImportJob` als fachliche Anker fuer hochgeladene Dateien nutzen.
- Eine spaetere Erweiterung in Richtung S3-kompatibler Object Storage vorbereiten.
- Eine Grundlage fuer spaetere Upload-Endpunkte schaffen, ohne Parser-, RAG- oder Importlogik vorzuziehen.

Dateien sollen perspektivisch nicht direkt in der Datenbank gespeichert werden. Die Datenbank speichert fachliche Bezuege, Metadaten und einen sicheren relativen Storage-Key bzw. Pfad zur Datei.

## Nicht-Ziele

Nicht Teil dieses Schritts sind:

- keine echte Upload-API
- keine Frontend-Upload-UI
- kein PDF-, Excel- oder CSV-Parsing
- kein Chunking
- keine Embedding-Erzeugung
- keine RAG-Logik
- keine automatische Importverarbeitung
- keine Background Jobs
- kein produktiver Object Storage
- keine Datenbankmigration, solange kein zwingender Bedarf besteht

## Upload-Arten

### Knowledge-Uploads

Knowledge-Uploads dienen der Ablage von Wissensquellen fuer Verhandlungsvorbereitung und spaetere Knowledge-Base-Funktionen. Typische Beispiele sind Branchenreports, Firmenprofile, DISC-Profile, Marktinformationen, Verhandlungsunterlagen oder interne Notizen.

- Zielobjekt: `KnowledgeDocument`
- Spaetere Verarbeitung: Chunking, Claims, Embeddings und RAG
- Erlaubte Dateitypen im MVP:
  - `.pdf`
  - `.md`
  - `.txt`
- Optional spaeter:
  - `.docx`

`KnowledgeDocument` ist dabei nicht nur ein Datei-Blob, sondern das fachliche Dokumentobjekt. Es verbindet Datei-Metadaten, Quelleninformationen, Vertraulichkeit, Zuverlaessigkeit und optionale Projektzuordnung.

### Import-Uploads

Import-Uploads dienen der Ablage strukturierter Quelldaten, die spaeter in fachliche Zielobjekte ueberfuehrt werden koennen. Typische Beispiele sind Einkaufshistorien, Anfragenkataloge sowie CSV- oder Excel-Daten.

- Zielobjekt: `ImportJob`
- Spaetere Verarbeitung: Parser, Mapping, Validierung, `ImportRow`-Erzeugung und Zielobjekt-Erzeugung
- Erlaubte Dateitypen im MVP:
  - `.xlsx`
  - `.csv`
- Nicht priorisiert:
  - `.xls`

`ImportRow`-Datensaetze entstehen erst in spaeteren Parser- und Mapping-Schritten. Der Upload selbst erzeugt nur den `ImportJob` und speichert die Quelldatei sicher ab.

## Lokale Speicherstruktur

Empfohlene lokale Struktur:

```text
uploads/
uploads/knowledge/
uploads/imports/
uploads/tmp/
```

Knowledge-Dateien und Import-Dateien sollen getrennt gespeichert werden. Temporare Uploads werden zunaechst unter `uploads/tmp/` abgelegt. Erst nach erfolgreicher Validierung von Dateityp, Groesse, Mandantenbezug und optionalem Projektbezug wird die Datei in den passenden Zielordner verschoben.

Pfade duerfen nicht aus Original-Dateinamen abgeleitet werden. Der Original-Dateiname ist nur ein Metadatum. Der tatsaechliche Dateiname bzw. Storage-Key wird serverseitig generiert.

`uploads/` soll nicht committed werden. Das Repository ignoriert Upload-Inhalte bereits ueber `.gitignore` mit `uploads/*` und erlaubt gleichzeitig `uploads/.gitkeep`. Daher ist fuer dieses Issue keine Aenderung an `.gitignore` erforderlich.

## Storage-Key-Konzept

Der Original-Dateiname wird nur als fachliches oder technisches Metadatum gespeichert, beispielsweise in `filename` oder spaeter explizit als `original_filename`. Er wird nie ungeprueft als Speicherpfad verwendet.

Der Storage-Key wird serverseitig erzeugt, zum Beispiel als UUID plus validierte Extension:

```text
knowledge/4b7f9e9e-7c0d-4f8b-8f8b-2f0a6f4f6d2f.pdf
imports/71eaf4d2-6f03-4c38-85d7-7f8c4f5e1229.csv
```

Grundregeln:

- Storage-Keys werden serverseitig generiert.
- Die Extension stammt aus einer erlaubten und normalisierten Liste.
- In der Datenbank werden relative Pfade bzw. Keys gespeichert, keine absoluten lokalen Pfade.
- User-Eingaben werden nicht als Pfadbestandteile uebernommen.
- Optional koennen spaeter company- oder project-basierte Unterordner eingefuehrt werden, zum Beispiel `knowledge/company/<company_id>/...`.
- Die Storage-Service-Abstraktion sollte spaeter lokale Pfade und S3-kompatible Object Keys gleichartig behandeln koennen.

## Beziehung zu KnowledgeDocument

Ein Knowledge-Upload erzeugt perspektivisch ein `KnowledgeDocument` und speichert die Datei getrennt davon im Storage.

Relevante Metadaten fuer `KnowledgeDocument`:

- `company_id`
- optional `project_id`
- Original-Dateiname, aktuell naheliegend ueber `filename`, spaeter ggf. explizit `original_filename`
- `storage_path` oder spaeter `storage_key`
- `mime_type`
- Dateigroesse, spaeter ggf. `file_size_bytes`
- Pruefsumme, spaeter ggf. `checksum`
- Upload-Zeitpunkt, aktuell naheliegend ueber `created_at`
- `source_name`
- `source_author`
- `source_date`
- `reliability_level`
- `confidentiality_level`
- `description`

Nicht alle genannten Datei-Metadaten muessen sofort als eigene Spalten existieren. Fehlende Felder wie `original_filename`, `file_size_bytes` oder `checksum` koennen spaeter additiv ergaenzt werden, wenn die echte Upload-API umgesetzt wird. Bis dahin kann die Dokumentation als Zielbild dienen.

`KnowledgeDocument.content_text`, `DocumentChunk`, `KnowledgeClaim` und Embeddings werden durch den Upload nicht befuellt. Diese Daten entstehen erst in spaeteren Verarbeitungsschritten.

## Beziehung zu ImportJob

Ein Import-Upload erzeugt perspektivisch einen `ImportJob` fuer Excel- oder CSV-Dateien.

Konzeptioneller Startzustand:

- `company_id` wird validiert.
- Optionales `project_id` wird validiert und muss zur `company_id` gehoeren.
- `filename` speichert den Original-Dateinamen oder eine fachlich sinnvolle Anzeigeform.
- `source_type` ist `excel` oder `csv`.
- `target_entity` beschreibt das spaetere Zielobjekt, zum Beispiel `procurement_history_item` oder `request_item`.
- `status` startet mit `pending`.
- `mapping_json` bleibt leer bzw. Default.
- `validation_summary_json` bleibt leer bzw. Default.
- Zeilenzaehler starten bei `0`.
- `ImportRow`-Datensaetze entstehen erst in spaeteren Parser-, Mapping- und Validierungsschritten.

Falls ein Import fachlich aus einem Knowledge-Dokument abgeleitet wird, kann die vorhandene optionale Beziehung `knowledge_document_id` genutzt werden. Fuer reine Excel- oder CSV-Uploads ist dieser Bezug nicht zwingend erforderlich.

## Sicherheitsregeln

Upload-Endpunkte muessen spaeter mindestens folgende Regeln einhalten:

- Original-Dateinamen niemals ungeprueft als Speicherpfad verwenden.
- Path Traversal verhindern, insbesondere Eingaben mit `..`, absoluten Pfaden oder Pfadseparatoren.
- Dateitypen ueber Extension und MIME-Type pruefen.
- MIME-Type nicht blind vertrauen, sondern nur als ein Signal verwenden.
- Nur erlaubte Extensions je Upload-Art zulassen.
- Groessenlimit vor oder waehrend der Speicherung pruefen.
- Hochgeladene Dateien niemals ausfuehren.
- Dateien nur unter sicher generiertem Storage-Key speichern.
- Temporare Dateien nach Fehlern bereinigen.
- `company_id` immer validieren.
- Optionales `project_id` validieren und sicherstellen, dass das Projekt zur `company_id` gehoert.
- Dateien ausserhalb des Upload-Verzeichnisses nicht les- oder schreibbar machen.
- Spaeter ggf. Virenscan, Content-Security-Pruefungen und Quarantaene-Mechanismen ergaenzen.

## Groessenlimits

Startwert fuer das MVP:

- 25 MB pro Datei

Das Limit soll spaeter ueber Settings oder Environment Variable konfigurierbar sein, zum Beispiel `MAX_UPLOAD_SIZE_MB`. Groessere Dateien koennen spaeter eine eigene Upload-Strategie erfordern, etwa Multipart Uploads, direkte Object-Storage-Uploads oder asynchrone Verarbeitung.

## Spaetere API-Skizze

Diese Endpunkte sind nur als Zielbild beschrieben und werden in diesem Issue nicht implementiert.

### `POST /knowledge-documents/upload`

Nimmt eine Datei plus Knowledge-Metadaten entgegen.

Konzeptioneller Ablauf:

1. Datei und Metadaten entgegennehmen.
2. `company_id` validieren.
3. Optionales `project_id` validieren und Company-Konsistenz pruefen.
4. Dateigroesse gegen das konfigurierte Limit pruefen.
5. Extension und MIME-Type gegen die erlaubten Knowledge-Typen pruefen.
6. Datei zunaechst nach `uploads/tmp/` schreiben.
7. Sicheren Storage-Key fuer `uploads/knowledge/` erzeugen.
8. Datei nach erfolgreicher Validierung in den Zielordner verschieben.
9. `KnowledgeDocument` mit Metadaten und relativem `storage_path` erzeugen.
10. Kein Chunking, keine Claims, keine Embeddings und kein RAG in diesem Schritt ausfuehren.

### `POST /import-jobs/upload`

Nimmt eine Excel- oder CSV-Datei plus Importmetadaten entgegen.

Konzeptioneller Ablauf:

1. Datei und Importmetadaten entgegennehmen.
2. `company_id` validieren.
3. Optionales `project_id` validieren und Company-Konsistenz pruefen.
4. Dateigroesse gegen das konfigurierte Limit pruefen.
5. Extension und MIME-Type gegen die erlaubten Import-Typen pruefen.
6. Datei zunaechst nach `uploads/tmp/` schreiben.
7. Sicheren Storage-Key fuer `uploads/imports/` erzeugen.
8. Datei nach erfolgreicher Validierung in den Zielordner verschieben.
9. `ImportJob` mit `status="pending"`, `source_type`, `target_entity` und Default-JSON-Feldern erzeugen.
10. Kein Parsing, kein Mapping und keine `ImportRow`-Erzeugung in diesem Schritt ausfuehren.

## Spaetere Umsetzungsschritte

Empfohlene Reihenfolge:

1. Settings fuer Upload-Verzeichnis und Groessenlimit ergaenzen.
2. Lokale Storage-Service-Abstraktion ergaenzen.
3. Upload-Endpunkte fuer `KnowledgeDocument` und `ImportJob` implementieren.
4. Parser- und Mapping-Service fuer Excel/CSV planen und spaeter implementieren.
5. Validierung und Importfehler-Handling planen.
6. Automatische Zielobjekt-Erzeugung planen.
7. Chunking, Embeddings und RAG fuer `KnowledgeDocument` planen.
