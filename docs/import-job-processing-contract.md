# ImportJob-Verarbeitungs- und Review-Kontrakt (Phase C5)

## 1. Ziel und Abgrenzung von C5

Nach Upload und sicherer Ablage wird fachlich ein nachvollziehbarer Uebergang
von einer gespeicherten Importdatei zu pruefbaren Rohdaten benoetigt. C4
erzeugt dafuer ausschliesslich einen `ImportJob(status="pending")` mit
Dateimetadaten und `storage_key`; beim Upload entstehen keine `ImportRow`-
Datensaetze.

C5 definiert den Weg von `pending` zu kontrolliert pruefbaren Rohdaten. Der
naechste Verarbeitungsschritt muss die gespeicherte CSV- oder XLSX-Datei lesen,
ihre tabellarische Struktur technisch erkennen und Datenzeilen als
`ImportRow.raw_data_json` nachvollziehbar bereitstellen. Erst danach koennen
Quellspalten bewusst gemappt, gemappte Daten fachlich validiert und aus
freigegebenen Zeilen Zielobjekte erzeugt werden.

Diese Stufen bleiben getrennt, weil sie unterschiedliche Entscheidungen und
Fehlerarten besitzen:

- Parsing bewahrt die gelesene Quelle als technische Rohdaten.
- Mapping ordnet Quellspalten explizit fachlichen Zielfeldern zu.
- Validierung bewertet gemappte Werte gegen technische und fachliche Regeln.
- Zielobjekt-Erzeugung persistiert ausschliesslich freigegebene Fachobjekte.

Die Trennung ermoeglicht Review, Wiederholbarkeit und eine klare
Fehlerzuordnung, ohne die unveraenderte Quelle durch fachliche Annahmen zu
ueberschreiben. C5 ist deshalb nur Architektur und Kontrakt. Die eigentliche
Parser-Implementierung beginnt fruehestens mit C6.

C5 implementiert bewusst nicht:

- keinen CSV-, XLSX- oder PDF-Parser und kein OCR
- keine `ImportRow`-Erzeugung
- kein Mapping und keine KI-gestuetzte Mapping-Erkennung
- keine Validierungsengine
- keine Zielobjekt-Erzeugung
- keine neuen API-Endpunkte, keine Migration und keine Frontend-UI
- keine RAG-, Chunking- oder Embedding-Funktion
- keine Aenderung am Storage-Service oder an bestehenden Upload-Endpunkten

## 2. Ausgangslage nach C4

`POST /import-jobs/upload` akzeptiert derzeit `.csv` fuer
`source_type="csv"` und `.xlsx` fuer `source_type="excel"`. Die Datei liegt
anschliessend ueber einen serverseitigen relativen `storage_key` im
Storage-Service. Der erzeugte Job startet mit:

```text
status = "pending"
total_rows = processed_rows = valid_rows = error_rows = 0
mapping_json = {}
validation_summary_json = {}
error_summary = null
started_at = completed_at = null
```

Die vorhandenen `GET /import-jobs/{id}`- und
`GET /import-rows?import_job_id=...`-Routen bilden bereits die lesende Basis
fuer Status und spaeteres Review. Nach C4 bleibt die Row-Liste leer.

## 3. ImportJob-Lifecycle nach C4

### 3.1 Zielbild

Der fachliche Gesamtfluss soll folgende Zustaende unterscheidbar machen:

```text
pending -> parsing -> parsed
parsed -> mapping -> mapped
mapped -> validating -> validated
validated -> processing -> completed | completed_with_errors

pending | parsing | parsed | mapping | mapped | validating | validated | processing
  -> failed | cancelled
```

`parsed` bedeutet dabei ausschliesslich: Technische Rohdaten stehen fuer
Review und ein spaeteres Mapping bereit. Es bedeutet nicht, dass Spalten
fachlich verstanden oder Zeilen gueltig sind.

### 3.2 Kurzfristig benoetigte Statuswerte

Fuer C6/C7, also den CSV-/XLSX-Rohdatenparser, werden unmittelbar benoetigt:

| Status | Bedeutung im Parser-Schritt |
| --- | --- |
| `pending` | Datei wurde hochgeladen, Parsing wurde noch nicht begonnen. |
| `parsing` | Die Quelldatei wird technisch gelesen und Raw Rows werden vorbereitet. |
| `parsed` | Das Parsing wurde atomar abgeschlossen; `ImportRow`-Rohdaten sind reviewbar. |
| `failed` | Ein Job-Level-/Parserfehler verhindert verlaessliche Rohdaten. |
| `cancelled` | Optionaler Abbruchzustand, falls spaeter ein Abbruch angeboten wird. |

Die Statuswerte `mapping`, `mapped`, `validating`, `validated`, `processing`,
`completed` und `completed_with_errors` sind Anschlusszustaende spaeterer
Issues. C6/C7 duerfen sie nicht setzen.

### 3.3 Tragfaehigkeit des aktuellen Modells

`ImportJob.status` ist derzeit ein nicht-nullbarer `String(50)`. Damit koennen
alle oben genannten Werte technisch ohne Migration gespeichert werden. Auch
das Read-Schema exponiert den Status als freien String.

Vor produktiver Schreiblogik sollte die Anwendung zentrale Konstanten oder
eine Enum-aehnliche Statusdefinition sowie erlaubte Transitionen erhalten.
Dies verhindert Schreibvarianten und ungueltige Spruenge. Eine echte
Datenbank-Enum- oder Check-Constraint-Entscheidung kann spaeter separat
getroffen werden; C5 erstellt keine Migration.

### 3.4 Zeitpunkte und Summaries

Mit den vorhandenen Feldern gilt fuer den Gesamtjob:

- `started_at` bezeichnet den Start der ersten Verarbeitung nach dem Upload,
  fuer C6/C7 also den Uebergang nach `parsing`.
- `completed_at` bezeichnet einen terminalen Gesamtjob-Zustand:
  `completed`, `completed_with_errors`, `failed` oder `cancelled`.
- Ein erfolgreich geparster, aber noch nicht vollstaendig importierter Job
  hat daher `started_at` gesetzt und `completed_at=null`.
- Schrittbezogene Start-/Endzeiten waeren spaeter eine eigene
  Audit-/Processing-History-Anforderung; die aktuellen zwei Felder sollen
  nicht gleichzeitig als Parse-, Validate- und Processing-Zeitpunkte
  ueberladen werden.

`error_summary` ist fuer kurze Job-Level-Fehler vorgesehen, insbesondere
Storage-, Datei- oder Parserfehler. Bei erfolgreichem Parsing bleibt es leer.
`validation_summary_json` gehoert zur spaeteren Validierungsaggregation und
bleibt beim reinen Parsing `{}`. Technische Parse-Metriken oder Warnsummaries
sollten nicht stillschweigend als Validierung ausgegeben werden; falls sie
spaeter benoetigt werden, ist dafuer ein klar benanntes Summary-Konzept zu
entscheiden.

## 4. Review- und Status-API-Kontrakt

Die folgenden Schreibendpunkte sind Zielvertraege fuer spaetere Issues. In C5
werden sie nicht implementiert. Vorhanden sind bereits die beiden lesenden
Review-Bausteine `GET /import-jobs/{id}` und `GET /import-rows`.

| Endpunkt | Zweck | Erwarteter Startstatus | Zielstatus | Erzeugte oder geaenderte Objekte | Darf nicht passieren |
| --- | --- | --- | --- | --- | --- |
| `POST /import-jobs/{id}/parse` | Gespeicherte strukturierte Datei technisch in Raw Rows aufloesen. | `pending`, spaeter ggf. bewusst wiederholbarer Parse-Zustand | `parsing` waehrend der Arbeit, danach `parsed` oder `failed` | In C6/C7: `ImportRow` mit Rohdaten; Jobstatus und Parser-Zaehler | Kein Mapping, keine fachliche Validierung, keine Zielobjekte. |
| `GET /import-jobs/{id}` | Status, Datei-Metadaten, Zaehler und Summaries eines Jobs anzeigen. | beliebig | unveraendert | keine | Kein Starten oder Mutieren einer Verarbeitung. |
| `GET /import-rows?import_job_id=...` | Rohzeilen und spaetere Review-Ergebnisse eines Jobs listen. | typischerweise ab `parsed` | unveraendert | keine | Keine automatische Korrektur, Validierung oder Erstellung. |
| `POST /import-jobs/{id}/map` | Explizite Mapping-Konfiguration auf Rohzeilen anwenden. | `parsed` | `mapping` nach `mapped`, oder `failed` bei Job-Level-Fehler | Spaeter `mapping_json` und `mapped_data_json` | Kein Parsing und keine Zielobjekte; keine implizite KI-Zuordnung. |
| `POST /import-jobs/{id}/validate` | Gemappte Zeilen regelbasiert bewerten. | `mapped` | `validating` nach `validated` oder definierter Review-/Fehlerzustand | Spaeter Validierungsstatus, Meldungen, Zaehler und `validation_summary_json` | Keine Zielobjekte und keine Aenderung der Rohquelle. |
| `POST /import-jobs/{id}/create-targets` | Freigegebene validierte Zeilen in Fachobjekte ueberfuehren. | `validated` | `processing` nach `completed` oder `completed_with_errors`; bei Jobfehler `failed` | Spaeter Zielobjekte und Row-Zielreferenzen | Keine unvalidierten oder nur geparsten Zeilen importieren. |
| `POST /import-jobs/{id}/cancel` (optional) | Noch laufende oder wartende Verarbeitung kontrolliert abbrechen. | nicht terminaler Status | `cancelled` | Jobstatus und terminaler Zeitpunkt | Keine bereits erzeugten Fachobjekte stillschweigend loeschen. |

Ein spaeterer Parse-Endpunkt muss zudem festlegen, ob Wiederholung erlaubt ist
und wie bestehende Raw Rows dabei atomar ersetzt oder abgelehnt werden.
Unkontrolliertes Anhangen doppelter `ImportRow`-Datensaetze ist kein
zulaessiges Wiederholungsverhalten.

## 5. Parser-Vorbereitung fuer CSV und XLSX

### 5.1 Verantwortung des spaeteren Parsers

Ein Parser fuer C6/C7 soll:

1. den `ImportJob` im erwarteten Startstatus laden und anhand von
   `storage_key` ueber den Storage-Service auf die gespeicherte Datei
   zugreifen;
2. anhand von `source_type` zwischen CSV (`csv`) und XLSX (`excel`)
   unterscheiden und widerspruechliche oder nicht unterstuetzte Quellen
   ablehnen;
3. die Tabellenstruktur technisch lesen und eine Header-Zeile erkennen;
4. jede beruecksichtigte Datenzeile mit ihrer Quellzeilennummer als
   `ImportRow.row_number` und ihren Rohwerten als `raw_data_json`
   vorbereiten;
5. bei Excel zusaetzlich den verwendeten `sheet_name` erhalten;
6. neue Rows initial mit `validation_status="pending"` anlegen;
7. den Job nach erfolgreichem, konsistentem Abschluss auf `parsed` setzen;
8. Fehler beim Lesen oder Strukturieren knapp nachvollziehbar in
   `ImportJob.error_summary` dokumentieren und den Job auf `failed` setzen.

Der Parser liest technische Tabellenwerte. Datums-, Preis-, Mengen-,
Waehrungs- oder Zielfeldinterpretation ist kein Parsing.

### 5.2 Zaehler nach erfolgreichem Parsing

Fuer die erste Parser-Stufe gilt folgende klare Semantik:

| Feld | Wert nach erfolgreichem Parsing |
| --- | --- |
| `total_rows` | Anzahl der als Rohdaten persistierten, nicht leeren Datenzeilen. |
| `processed_rows` | Anzahl erfolgreich als `ImportRow` persistierter Rohzeilen; nach atomarem Erfolg gleich `total_rows`. |
| `valid_rows` | `0`, weil noch keine fachliche Validierung stattgefunden hat. |
| `error_rows` | `0`, weil fachliche Zeilenfehler erst die Validierung bewertet. |

Uebersprungene leere Zeilen zaehlen nicht als Datenzeilen. Sobald spaeter
Parser-Warnstatistiken benoetigt werden, muessen sie getrennt von
Validierungszaehlern definiert werden.

### 5.3 Konsistenz und Transaktionsgrenze

Ein Parse-Lauf darf keinen Zustand erzeugen, in dem ein Job `parsed` meldet,
obwohl nur ein Teil seiner Rohzeilen gespeichert wurde. Fuer C6/C7 ist daher
ein atomarer Abschluss anzustreben: Rows und abschliessende Job-Zaehler werden
gemeinsam sichtbar oder der Job endet ohne als erfolgreich dargestellte
Row-Menge in `failed`.

Die konkrete Wiederholungs- und Bereinigungsstrategie wird in der
Implementierung festgelegt. Verbindlich ist: Nach einem Parserfehler duerfen
keine halbfertigen, als reviewbar behaupteten Rohdaten verbleiben.

### 5.4 Festgelegter Einstieg der Folge-Implementierung

- C6: CSV-Parser erzeugt `ImportRow`-Rohdaten aus gespeicherten CSV-Dateien.
- C7: XLSX-Parser erzeugt `ImportRow`-Rohdaten aus gespeicherten XLSX-Dateien.

Die getrennte Umsetzung macht CSV-Sonderfaelle wie Encoding, Delimiter und
Quoting pruefbar, bevor Workbook-/Sheet-Entscheidungen fuer XLSX dazukommen.

## 6. ImportRow-Rohdatenkontrakt

### 6.1 Inhalt von `raw_data_json`

Im ersten Parser-Schritt stehen `raw_data_json` und `row_number` im
Mittelpunkt. `raw_data_json` enthaelt eine Abbildung der gelesenen
Original-Spaltennamen auf die gelesenen Zellen der jeweiligen Datenzeile:

```json
{
  "Artikel": "Bearing 6204",
  "Menge": "10",
  "Preis": "12,50"
}
```

Grundsaetze:

- Original-Spaltennamen werden erhalten, damit Quelle und Review
  nachvollziehbar bleiben.
- Rohwerte werden nicht fachlich konvertiert oder normalisiert.
- Eine spaetere Normalisierung von Spaltennamen kann als Mapping-Hilfe oder
  technische Metadaten sinnvoll sein, ersetzt aber die Original-Keys nicht.
- Doppelte oder leere Header sind fuer die Minimalparser nicht sicher als
  Objekt-Keys abbildbar und deshalb ein struktureller Job-Level-Fehler.
- Bei XLSX wird der verwendete Sheet-Kontext in `sheet_name`, nicht durch
  Veraenderung der Rohfelder, festgehalten.

### 6.2 Leere und unvollstaendige Zeilen

- Vollstaendig leere Datenzeilen werden nicht als `ImportRow` persistiert.
- Zeilen mit einzelnen leeren Zellen bleiben Rohdatenzeilen; der leere
  Quellwert bleibt erkennbar, zum Beispiel als `null` oder leerer gelesener
  Wert nach einer in C6/C7 festgelegten technischen Serialisierungsregel.
- Eine Zeile mit weniger Zellen als Headern kann technisch erhalten werden,
  wenn fehlende Endwerte eindeutig den bekannten Headern als leer zugeordnet
  werden koennen. Dies ist hoechstens eine technische Review-Warnung, keine
  fachliche Gueltigkeitsentscheidung.
- Mehrdeutig verschobene oder ueberschuessige Zellen, die nicht verlustfrei
  Headern zugeordnet werden koennen, fuehren im Minimalparser zu einem
  strukturellen Parserfehler statt zu stillschweigender Datenveraenderung.

### 6.3 Felder ausserhalb der Rohdaten

Nach reinem Parsing gilt fuer eine neue Row:

| Feld | Parser-Vertrag |
| --- | --- |
| `mapped_data_json` | bleibt `{}`; es gibt noch kein fachliches Mapping. |
| `validation_status` | startet mit `pending`; Parser urteilt nicht ueber fachliche Gueltigkeit. |
| `target_entity` | bleibt `null`. |
| `target_record_id` | bleibt `null`. |
| `error_message` / `warning_message` | nur falls eine erhaltene Row eine rein technische Review-Notiz benoetigt; keine fachlichen Validierungsfehler. |
| `metadata_json` | bleibt standardmaessig `{}`; spaetere strukturierte technische Notizen beduerfen eines klaren Formats. |

Die Aufgabenstellung nennt `errors_json` und `warnings_json`. Das aktuelle
`ImportRow`-Modell besitzt diese Felder nicht, sondern die Textfelder
`error_message` und `warning_message` sowie `metadata_json`. C5 verspricht
keine neuen JSON-Felder und erstellt keine Migration. Falls strukturierte
zeilenbezogene Meldungen fuer Review notwendig werden, ist vor der
Implementierung gesondert zu entscheiden, ob ein definiertes
`metadata_json`-Format ausreicht oder das Modell erweitert werden soll.

## 7. Fehler- und Teilfehler-Modell

### 7.1 Parserfehler gegen spaetere Zeilenfehler

Parserfehler sind technische oder strukturelle Fehler: Die Quelle kann nicht
zuverlaessig als pruefbare Raw Rows bereitgestellt werden. Sie setzen den
gesamten Job auf `failed`.

Fachliche Validierungsfehler entstehen erst nach Mapping/Validierung. Dann
duerfen einzelne Rows fehlerhaft sein, waehrend andere Rows weiterhin
pruefbar oder spaeter verarbeitbar bleiben.

| Fall | Einordnung in der Parser-Stufe | Ergebnis / Dokumentation |
| --- | --- | --- |
| Datei nicht lesbar | Job-Level-Fehler | `status="failed"`; kurze Ursache in `error_summary`; keine als `parsed` ausgewiesenen Rows. |
| Technisches Storage-Problem oder ungueltiger `storage_key` | Job-Level-Fehler | `failed`; Storage-/Zugriffsursache in `error_summary`. |
| Nicht unterstuetzte Quelle oder Widerspruch von `source_type` und Datei | Job-Level-Fehler | `failed`; Quelle in `error_summary` benennen. |
| Ungueltiges CSV/XLSX-Format oder Abbruch beim Parsen | Job-Level-Fehler | `failed`; Parserursache in `error_summary`; keine halbfertigen Review-Daten. |
| Vollstaendig leere Datei | Job-Level-Strukturfehler fuer den Minimalparser | `failed`; kein Header und keine Rohdaten vorhanden. |
| Header, aber keine Datenzeilen | Strukturell lesbar, aber nicht importierbar | bevorzugt `parsed` mit `total_rows=0` und nachvollziehbarer technischer Review-Hinweis; keine fachliche Validierung vortaeuschen. |
| Kein Header, leere oder doppelte Header | Job-Level-Strukturfehler | `failed`, weil `raw_data_json` nicht eindeutig schluesselbar ist. |
| Leere Datenzeile zwischen Daten | Ueberspringbare technische Besonderheit | Keine Row und kein `error_rows`; spaeter optional technische Warnsumme. |
| Einzelne eindeutig unvollstaendige Zeile | Erhaltbare Rohzeile | Persistieren mit leeren Rohwerten; spaetere Bewertung in Mapping/Validierung. |
| Mehrdeutige oder nicht verlustfrei zuordenbare Zeilenstruktur | Job-Level-Strukturfehler im Minimalparser | `failed`, statt Daten stillschweigend umzudeuten. |

Ob ein Header-ohne-Daten-Job spaeter im Statusmodell einen eigenen
Review-Hinweis benoetigt, kann C6 konkretisieren, ohne aus ihm einen
fachlichen Fehler zu machen.

### 7.2 Ablage der Meldungen

| Feld | Verantwortlicher Inhalt |
| --- | --- |
| `ImportJob.error_summary` | Job-Level-Fehler, die Parsing, Mapping, Validierung oder Verarbeitung insgesamt blockieren; beim Parser kurze technische Ursache. |
| `ImportJob.validation_summary_json` | Spaetere aggregierte fachliche Validierungsresultate; beim Parsing weiterhin `{}`. |
| `ImportRow.error_message` | Spaetere zeilenbezogene blockierende Fehler oder klar definierte technische Row-Meldungen, falls eine Row dennoch reviewbar bleibt. |
| `ImportRow.warning_message` | Spaetere zeilenbezogene Warnungen oder eng begrenzte technische Review-Hinweise. |
| `ImportRow.metadata_json` | Nur nach festgelegtem Schema strukturierte Zusatzdetails; kein undokumentierter Ersatz fuer fehlende Fehlerfelder. |

`completed_with_errors` ist kein Parserstatus. Er bedeutet spaeter, dass die
Zielobjekt-Erzeugung abgeschlossen wurde, aber einzelne freigegebene Zeilen
nicht erfolgreich in Zielobjekte ueberfuehrt werden konnten oder bewusst
ausgeschlossen blieben. Ein technisch nicht parsebarer Job ist dagegen
`failed`.

## 8. Grenzen zu Mapping, Validierung und Zielobjekten

Fuer C6/C7 und alle spaeteren Parser gilt verbindlich:

- Der Parser erzeugt nur technische Rohdaten.
- Der Parser entscheidet nicht fachlich, ob eine Zeile gueltig ist.
- Der Parser erzeugt kein `ProcurementHistoryItem`.
- Der Parser erzeugt kein `RequestItem`.
- Der Parser erzeugt keine Lieferantenprofile.
- Der Parser fuehrt kein KI-Mapping aus.
- Der Parser befuellt `mapped_data_json` nicht mit fachlichen Zielfeldern.
- Mapping und Validierung bleiben getrennte Folge-Issues.
- Zielobjekt-Erzeugung bleibt eine spaetere Stufe nach erfolgreicher
  Validierung.

Diese Grenze gilt auch dann, wenn eine CSV- oder XLSX-Spaltenbezeichnung einem
Feld eines Zielobjekts augenscheinlich entspricht.

## 9. PDF-Beruecksichtigung aus Issue #55

PDF-Verarbeitung ist fuer das Produkt zwingend wichtig. Sie wird jedoch nicht
in den CSV-/XLSX-Minimalparser hineingezogen, weil PDF keine verlaesslich
tabellarische Eingangsstruktur garantiert und andere Qualitaets- und
Reviewentscheidungen verlangt.

Fuer PDF ist spaeter eine eigene fachlich-technische Entscheidung erforderlich:

- Wird ein PDF als Knowledge-Dokument fuer die Knowledge-Pipeline behandelt?
- Soll ein bestimmter PDF-Typ als strukturierte Importquelle verarbeitet
  werden?
- Wird OCR fuer gescannte Dokumente benoetigt?
- Wie werden Tabellen extrahiert und mit ihrer Quelle nachvollziehbar
  verknuepft?
- Welche Qualitaetssicherung und welches manuelle Review sind vor einer
  Weiterverarbeitung erforderlich?

PDF kann spaeter entweder zur Knowledge-Pipeline oder zu einer eigenen
Import-Pipeline gehoeren. C6 und C7 konzentrieren sich weiterhin ausschliesslich
auf CSV beziehungsweise XLSX. Damit bleibt Issue #55 sichtbar und wichtig,
ohne die minimalen strukturierten Parser mit PDF-/OCR-Fragen zu vermischen.

## 10. Empfohlene Folge-Issues

| Phase | Inhalt | Warum an dieser Stelle |
| --- | --- | --- |
| C6 | CSV-Parser erzeugt `ImportRow`-Rohdaten aus gespeicherten CSV-Dateien. | Einfachste tabellarische Quelle validiert Status-, Raw-Row- und Fehlervertrag zuerst. |
| C7 | XLSX-Parser erzeugt `ImportRow`-Rohdaten aus gespeicherten XLSX-Dateien. | Baut auf demselben Raw-Row-Vertrag auf und ergaenzt Workbook-/Sheet-Fragen getrennt. |
| C8 | Mapping-Kontrakt konkretisieren und explizites Mapping anwenden. | Erst stabile Rohdaten duerfen fachlichen Zielfeldern zugeordnet werden. |
| C9 | Gemappte `ImportRow`-Daten validieren. | Fachliche Fehler und Warnungen beziehen sich auf bewusst gemappte Werte. |
| C10 | Zielobjekt-Erzeugung fuer `ProcurementHistoryItem`. | Validierte Einkaufshistorie ist ein klar abgegrenzter erster Persistenzfall. |
| C11 | Zielobjekt-Erzeugung fuer `RequestItem`. | Zweiter Zieltyp folgt, ohne beide Persistenzpfade in einem Schritt zu vermischen. |
| separates PDF-Konzept-/Parser-Issue auf Basis von #55 | Knowledge-PDF, strukturierter PDF-Import, OCR, Tabellenextraktion und Review entscheiden. | PDF bleibt produktrelevant, braucht jedoch eine eigene Qualitaets- und Pipeline-Entscheidung. |

Die Reihenfolge haelt die Verantwortlichkeiten beobachtbar: Zuerst werden
Rohdaten reproduzierbar, dann ihre Bedeutung und Gueltigkeit beurteilt und
erst anschliessend Fachobjekte erzeugt. PDF bleibt parallel planbar, ohne die
CSV-/XLSX-Lieferstrecke zu blockieren oder fachlich zu verkuerzen.
