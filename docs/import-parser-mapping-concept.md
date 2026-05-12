# Import-Parser- und Mapping-Konzept

## Ziele

Dieses Konzept beschreibt, wie Excel- und CSV-Dateien spaeter aus dem Upload- und Storage-Kontext in das bestehende Importmodell ueberfuehrt werden koennen. Es ist eine Dokumentationsgrundlage und implementiert noch keine Parser-, Mapping-, Validierungs- oder Importlogik.

- Konzept fuer Parser- und Mapping-Logik vorbereiten.
- Excel- und CSV-Daten strukturiert in `ImportJob` und `ImportRow` ueberfuehren.
- Trennung zwischen Parsing, Mapping, Validierung und Zielobjekt-Erzeugung sicherstellen.
- Grundlage fuer eine spaetere Parser-Service-Implementierung schaffen.

Der Upload-Schritt ist im `docs/upload-storage-concept.md` beschrieben. Dieses Dokument schliesst daran an und beschreibt die naechsten fachlich-technischen Verarbeitungsschritte.

## Nicht-Ziele

Nicht Teil dieses Schritts sind:

- keine echte Parser-Implementierung
- keine automatische Datensatz-Erzeugung
- keine Frontend-Mapping-UI
- keine KI-gestuetzte Mapping-Erkennung
- keine Validierungsengine
- keine Background Jobs
- keine neuen Datenbanktabellen
- keine Migration

## Prozessabgrenzung

Die Importverarbeitung soll in klar getrennten Stufen erfolgen. Jede Stufe hat eine eigene Verantwortung und befuellt nur die dafuer vorgesehenen Felder.

### 1. Upload

Der Upload speichert die Datei und erzeugt einen `ImportJob`.

- Datei wird im Storage abgelegt.
- `ImportJob` wird mit Datei- und Importmetadaten erzeugt.
- `source_type` wird auf `csv` oder `excel` gesetzt.
- `target_entity` beschreibt das spaetere Zielobjekt.
- `status` startet mit `pending`.
- Es werden noch keine `ImportRow`-Datensaetze erzeugt.

### 2. Parsing

Parsing liest die gespeicherte Datei und erkennt die technische Tabellenstruktur.

- Datei wird aus dem Storage-Kontext gelesen.
- Excel-Sheets, Header und Datenzeilen werden erkannt.
- CSV-Header, Trennzeichen und Zeilenstruktur werden gelesen.
- Technische Rohdaten werden fuer `ImportRow.raw_data_json` vorbereitet.
- `row_number` und bei Excel optional `sheet_name` werden erhalten.

Der Parser erzeugt keine fachlichen Zielobjekte und fuehrt keine Business-Validierung aus.

### 3. Mapping

Mapping ordnet Quellspalten fachlichen Zielfeldern zu.

- Quellspalten werden explizit Zielfeldern zugeordnet.
- Mapping-Regeln koennen spaeter in `ImportJob.mapping_json` gespeichert werden.
- Ergebnis der Zuordnung wird spaeter in `ImportRow.mapped_data_json` abgelegt.
- Mapping bleibt zunaechst regelbasiert und nicht KI-gestuetzt.

### 4. Validierung

Validierung prueft die gemappten Daten gegen technische und fachliche Regeln.

- Pflichtfelder werden geprueft.
- Datentypen werden geprueft.
- Fachliche Regeln werden geprueft.
- `validation_status`, `error_message` und `warning_message` werden spaeter gesetzt.
- Aggregierte Ergebnisse werden spaeter in `ImportJob.validation_summary_json` abgelegt.

Die Validierungsregeln werden in einem separaten spaeteren Issue definiert.

### 5. Zielobjekt-Erzeugung

Die Zielobjekt-Erzeugung ueberfuehrt validierte Importzeilen in echte Fachobjekte.

- Spaeter koennen Objekte wie `ProcurementHistoryItem` oder `RequestItem` erzeugt werden.
- `ImportRow.target_entity` und `ImportRow.target_record_id` werden erst nach erfolgreicher Erzeugung oder Zuordnung gesetzt.
- Der `ImportJob.status` wechselt dabei spaeter in `processing`, `completed` oder `completed_with_errors`.

## Unterstuetzte Formate

Fuer den MVP werden folgende Importformate priorisiert:

- `.xlsx` fuer Excel-Dateien
- `.csv` fuer einfache strukturierte Daten

Nicht priorisiert sind:

- `.xls`
- Makro-Dateien
- passwortgeschuetzte Dateien
- stark formatierte oder verschachtelte Excel-Arbeitsmappen

Diese Abgrenzung haelt den MVP bewusst nah an tabellarischen, gut strukturierten Quelldaten.

## Parser-Architektur

Spaeter sollte eine kleine Service-Struktur eingefuehrt werden, die Dateiformate, technische Rohdaten und fachliches Mapping getrennt behandelt.

Konzeptionelle Bausteine:

- `ImportParserService`: Einstiegspunkt fuer Import-Parsing, waehlt anhand von `ImportJob.source_type` den passenden Parser.
- `ExcelParser`: liest `.xlsx`-Dateien, erkennt Sheets, Header und Datenzeilen.
- `CsvParser`: liest `.csv`-Dateien, beruecksichtigt Encoding, Trennzeichen, Quotes und Header.
- `ImportMappingService`: wendet explizite Mapping-Regeln auf Rohdaten an und erzeugt spaeter `mapped_data_json`.

Grundregeln:

- Parser erzeugen keine fachlichen Zielobjekte.
- Parser fuehren keine Business-Validierung aus.
- Parser schreiben konzeptionell nur technische Rohdaten nach `ImportRow.raw_data_json`.
- Mapping fuellt spaeter `ImportRow.mapped_data_json`.
- Validierung kommt in einem separaten spaeteren Issue.
- Zielobjekt-Erzeugung kommt in einem separaten spaeteren Issue.

Der `ImportParserService` sollte spaeter idempotent gedacht werden: Ein fehlgeschlagener Parse-Lauf darf nachvollziehbar fehlschlagen, ohne bereits erzeugte fachliche Zielobjekte zurueckrollen zu muessen. Da dieses Issue keine Implementierung erstellt, bleibt das ein Architekturziel.

## Beziehung zu ImportJob

`ImportJob` ist der Container fuer einen Importvorgang. Er verbindet Datei, Mandant, optionalen Projektbezug, Quelle, Zielobjekt, Status, Mapping und spaetere Validierungszusammenfassungen.

Wichtige Felder:

- `company_id`: Mandantenbezug des Imports.
- `project_id`: optionaler Projektbezug.
- `knowledge_document_id`: optionaler Bezug, falls ein Import fachlich aus einem Knowledge-Dokument abgeleitet wird.
- `filename`: Anzeige- oder Original-Dateiname der Quelle.
- `source_type`: bestimmt die Quelle, fuer dieses Konzept vor allem `csv` oder `excel`.
- `target_entity`: beschreibt das spaetere Zielobjekt, zum Beispiel `procurement_history_item` oder `request_item`.
- `status`: wird abhaengig vom Verarbeitungsschritt aktualisiert.
- `total_rows`, `processed_rows`, `valid_rows`, `error_rows`: halten spaeter Zaehler fuer Parsing, Validierung und Importverarbeitung.
- `mapping_json`: enthaelt spaeter die Mapping-Konfiguration.
- `validation_summary_json`: enthaelt spaeter aggregierte Validierungsergebnisse.
- `error_summary`: enthaelt spaeter Job-Level-Fehler.
- `started_at` und `completed_at`: koennen spaeter Verarbeitungszeitpunkte dokumentieren.

Der Upload erzeugt den `ImportJob` mit `status="pending"`. Nach erfolgreichem Parsing und vorbereiteten Rohdaten kann der Status konzeptionell auf `mapping` wechseln, weil dann eine explizite Zuordnung der Quellspalten zu Zielfeldern offen ist.

## Beziehung zu ImportRow

Eine `ImportRow` entspricht einer gelesenen Datenzeile aus der Quelldatei.

Wichtige Felder:

- `import_job_id`: Bezug zum uebergeordneten Importvorgang.
- `company_id`: Mandantenbezug der Zeile.
- `project_id`: optionaler Projektbezug, analog zum `ImportJob`.
- `row_number`: urspruengliche Zeilennummer in der Quelle.
- `sheet_name`: optionaler Sheet-Name bei Excel-Dateien.
- `raw_data_json`: originale Quellwerte als technische Rohdaten.
- `mapped_data_json`: spaeter fachlich gemappte Werte.
- `validation_status`: wird spaeter durch die Validierung gesetzt.
- `error_message`: zeilenbezogene Fehlerhinweise.
- `warning_message`: zeilenbezogene Warnhinweise.
- `target_entity`: wird erst bei spaeterer Zielobjekt-Erzeugung gesetzt.
- `target_record_id`: wird erst bei spaeterer Zielobjekt-Erzeugung gesetzt.
- `metadata_json`: flexible technische Zusatzinformationen, falls spaeter noetig.

Der Parser befuellt konzeptionell `row_number`, optional `sheet_name` und `raw_data_json`. Mapping, Validierung und Zielobjekt-Erzeugung befuellen ihre jeweiligen Felder erst in spaeteren Stufen.

## Mapping-Strategie

Mapping soll zunaechst explizit und regelbasiert erfolgen. Es soll keine KI-gestuetzte Mapping-Erkennung geben.

Eine Mapping-Konfiguration kann spaeter in `ImportJob.mapping_json` gespeichert werden. Sie sollte mindestens folgende Informationen abbilden koennen:

- Quellspalte zu Zielfeld
- Sheet-Auswahl
- Datentyp-Hinweis
- Pflichtfeld-Markierung
- Transformationshinweise, zum Beispiel Datum, Dezimalzahl, Waehrung oder Land

Beispielhafte Zielobjekte:

- `procurement_history_item`
- `request_item`

Beispielhafte Zielfelder fuer `procurement_history_item`:

- `article_name`
- `supplier_name`
- `supplier_country`
- `quantity`
- `unit_price`
- `currency`
- `order_date`
- `lead_time_weeks`
- `quality_rating`
- `price_assessment`
- `improvement_potential`

Beispielhafte Zielfelder fuer `request_item`:

- `article_name`
- `article_description`
- `quantity`
- `target_delivery_time`
- `rough_price_expectation`
- `target_region`
- `comment`

Eine spaetere Mapping-Struktur koennte konzeptionell so aussehen:

```json
{
  "target_entity": "procurement_history_item",
  "sheet": "Einkaufshistorie",
  "columns": [
    {
      "source_column": "Artikel",
      "target_field": "article_name",
      "required": true,
      "type_hint": "string"
    },
    {
      "source_column": "Preis",
      "target_field": "unit_price",
      "required": true,
      "type_hint": "decimal",
      "transform": "decimal_comma"
    },
    {
      "source_column": "Waehrung",
      "target_field": "currency",
      "required": true,
      "type_hint": "currency"
    }
  ]
}
```

Dieses Beispiel ist nur ein Zielbild fuer spaetere Implementierung. Es legt keine finale JSON-Struktur fest und erzeugt keine Mapping-UI.

## Multi-Sheet-Strategie

Excel-Dateien koennen mehrere Sheets enthalten. Fuer den MVP sollte zunaechst ein Sheet pro `ImportJob` priorisiert werden, damit Mapping, Fehlerbehandlung und Statuslogik ueberschaubar bleiben.

Konzeptionelle Regeln:

- `ImportRow.sheet_name` speichert den Sheet-Namen.
- Multi-Sheet-Faehigkeit bleibt vorbereitet.
- Mapping kann spaeter pro Sheet erfolgen.
- Leere oder irrelevante Sheets koennen uebersprungen werden.
- Bei mehreren fachlich relevanten Sheets sollte spaeter eine explizite Auswahl oder Mapping-Konfiguration verlangt werden.
- Mehrere Sheets koennen spaeter entweder in einem `ImportJob` mit Sheet-spezifischem Mapping oder in getrennten Importvorgaengen verarbeitet werden.

Fuer den MVP ist die bevorzugte Variante:

1. Parser erkennt die vorhandenen Sheets.
2. Ein explizit ausgewaehltes oder eindeutig bestimmtes Sheet wird fuer den Import verwendet.
3. Der Sheet-Name wird in jeder erzeugten `ImportRow` gespeichert.
4. Weitere Sheets werden ignoriert oder als Warnung auf Job-Ebene dokumentiert.

## CSV-Sonderfaelle

CSV-Dateien wirken einfach, benoetigen aber klare technische Regeln.

Zu beruecksichtigen sind:

- Encoding: UTF-8 als Standard, spaeter optional erkennbare oder konfigurierbare Alternativen.
- Trennzeichen: Komma oder Semikolon als priorisierte Varianten.
- Dezimaltrennzeichen: Punkt oder Komma, als Transformationshinweis im Mapping.
- Header-Zeile: fuer den MVP erforderlich oder spaeter explizit konfigurierbar.
- Leere Zeilen: koennen uebersprungen und als Warnung gezaehlt werden.
- Uneinheitliche Spaltenanzahl: sollte als Zeilenfehler oder Job-Fehler behandelt werden, je nach Ausmass.
- Quotes: Werte in Anfuehrungszeichen muessen korrekt gelesen werden.
- Zeilenumbrueche in Feldern: muessen bei gueltigem CSV-Quoting erhalten bleiben.

Der CSV-Parser sollte nicht versuchen, fachliche Werte selbst zu interpretieren. Hinweise wie Dezimaltrennzeichen, Waehrung oder Datumsformat gehoeren in Mapping- oder spaetere Validierungsregeln.

## Fehler- und Warnmodell

Dieses Konzept bereitet Fehler- und Warnkategorien vor, implementiert aber keine Validierungsengine.

Typische Parser-Fehler:

- Datei nicht lesbar
- ungueltiges Format
- kein Sheet gefunden
- kein Header gefunden
- Zeile kann nicht gelesen werden
- Encoding-Problem bei CSV

Typische Warnungen:

- leere Zeile uebersprungen
- unbekannte Spalte
- Spaltenname mehrfach vorhanden
- Wert wirkt leer oder ungewoehnlich
- Sheet wurde ignoriert

Zuordnung der Meldungen:

- Job-Level-Fehler gehoeren spaeter in `ImportJob.error_summary`.
- Zeilenfehler gehoeren spaeter in `ImportRow.error_message`.
- Zeilenwarnungen gehoeren spaeter in `ImportRow.warning_message`.
- Aggregierte Ergebnisse gehoeren spaeter in `ImportJob.validation_summary_json`.

Parser-Fehler betreffen vor allem technische Lesbarkeit und Tabellenstruktur. Fachliche Fehler wie fehlende Pflichtfelder, ungueltige Preiswerte oder unbekannte Laender gehoeren in die spaetere Validierung.

## Statuslogik

`ImportJob.status` beschreibt den aktuellen Verarbeitungsschritt.

- `pending`: Datei hochgeladen, noch nicht verarbeitet.
- `mapping`: Parser hat Rohdaten vorbereitet, Mapping offen.
- `validated`: Mapping und Validierung abgeschlossen.
- `processing`: Zielobjekt-Erzeugung laeuft spaeter.
- `completed`: Import abgeschlossen.
- `completed_with_errors`: Import teilweise abgeschlossen, einzelne Zeilen konnten nicht importiert werden.
- `failed`: Import konnte nicht verarbeitet werden.
- `cancelled`: Import wurde abgebrochen.

Konzeptioneller Statusfluss:

```text
pending -> mapping -> validated -> processing -> completed
                                   -> completed_with_errors
pending -> failed
mapping -> failed
validated -> failed
processing -> failed
pending/mapping/validated/processing -> cancelled
```

Ein reiner Parser-Lauf sollte nach erfolgreicher Rohdatenvorbereitung nicht direkt `validated`, `processing` oder `completed` setzen. Diese Status sind spaeteren Schritten vorbehalten.

## Spaetere Umsetzungsschritte

Empfohlene Reihenfolge:

1. Parser-Service-Schnittstelle definieren.
2. CSV-Parser implementieren.
3. XLSX-Parser implementieren.
4. Mapping-Konfiguration in `ImportJob.mapping_json` speichern.
5. `ImportRow`-Datensaetze aus Rohdaten erzeugen.
6. Validierungsregeln in separatem Issue definieren.
7. Zielobjekt-Erzeugung in separatem Issue implementieren.
8. Optional spaeter KI-gestuetzte Mapping-Vorschlaege ergaenzen.

Die optionalen KI-gestuetzten Mapping-Vorschlaege duerfen erst nach einer stabilen expliziten Mapping-Struktur betrachtet werden und sind nicht Teil dieses MVP-Konzepts.
