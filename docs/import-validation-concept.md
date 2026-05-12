# Import-Validierungs- und Fehlerkonzept

## Ziele

Dieses Konzept beschreibt, wie gemappte Importdaten spaeter validiert, Fehler und Warnungen klassifiziert und Statuswerte auf `ImportJob` und `ImportRow` gesetzt werden koennen. Es ist eine Dokumentationsgrundlage und implementiert noch keine Validierungsengine.

- Konzept fuer Validierungslogik und Fehlerbehandlung vorbereiten.
- Validierung als eigenen Schritt zwischen Mapping und Zielobjekt-Erzeugung beschreiben.
- Fehler, Warnungen und Statuslogik fachlich trennen.
- Grundlage fuer eine spaetere Validierungsengine schaffen.
- Review- und Korrekturworkflow vorbereiten.

## Nicht-Ziele

Nicht Teil dieses Schritts sind:

- keine echte Validierungsengine
- keine UI
- keine automatische Korrektur
- keine KI-gestuetzte Fehlererkennung
- keine Zielobjekt-Erzeugung
- keine neuen Datenbanktabellen
- keine Migration

Das bestehende Importmodell mit `ImportJob` und `ImportRow` reicht fuer dieses Konzept aus. Eine Migration soll erst erfolgen, wenn bei der spaeteren Implementierung eine zwingende Modellluecke entsteht.

## Rolle der Validierung im Importprozess

Die Importverarbeitung bleibt in klar getrennte Schritte aufgeteilt:

1. Upload erzeugt `ImportJob`.
2. Parser erzeugt `ImportRow.raw_data_json`.
3. Mapping erzeugt `ImportRow.mapped_data_json`.
4. Validierung bewertet `mapped_data_json` und setzt Status, Fehler und Warnungen.
5. Zielobjekt-Erzeugung erfolgt spaeter in Issue #10.

Issue #9 behandelt ausschliesslich Schritt 4. Die Validierung erzeugt keine `ProcurementHistoryItem`-, `RequestItem`- oder sonstigen Fachobjekte. Sie entscheidet nur, ob die gemappten Zeilen fachlich und technisch belastbar genug sind, um spaeter verarbeitet zu werden.

Die Zielobjekt-Erzeugung bleibt ausdruecklich ein eigener Schritt. Dadurch kann ein Importjob zuerst geprueft, korrigiert und erneut validiert werden, bevor aus den Daten persistente Fachobjekte entstehen.

## Validierungsstufen

Die spaetere Validierung sollte mehrere Stufen unterscheiden. Die Stufen koennen technisch in einer Engine zusammenlaufen, bleiben fachlich aber getrennt, damit Fehlermeldungen, Warnungen und Review-Hinweise nachvollziehbar bleiben.

### Strukturvalidierung

Strukturvalidierung prueft, ob die Datenzeile und das Mapping grundsaetzlich verarbeitet werden koennen.

- Ist die Zeile grundsaetzlich lesbar?
- Sind erwartete Spalten vorhanden?
- Gibt es leere oder doppelte Header?
- Passt die Zeilenstruktur zur gespeicherten Mapping-Konfiguration?
- Wurde eine bewusst leere oder irrelevante Zeile uebersprungen?

Einige Strukturprobleme entstehen bereits beim Parsing. Die Validierung sollte diese Informationen aufgreifen koennen, ohne Parser-Logik zu wiederholen.

### Pflichtfeldvalidierung

Pflichtfeldvalidierung prueft die fuer `target_entity` notwendigen fachlichen Felder.

- Sind alle fuer `target_entity` erforderlichen Felder vorhanden?
- Sind Pflichtfelder nicht leer?
- Wurde ein Pflichtfeld zwar gemappt, aber ohne interpretierbaren Wert geliefert?
- Gibt es Zielobjekt-spezifische Pflichtfeldkombinationen?

Ein fehlendes Pflichtfeld ist in der Regel ein blockierender Zeilenfehler.

### Datentypvalidierung

Datentypvalidierung prueft, ob Werte in die erwarteten fachlichen Typen ueberfuehrt werden koennen.

- Zahlen, Dezimalwerte, Mengen und Preise
- Datumswerte
- Waehrungen
- Boolean- und Statusfelder
- Optionale Textfelder mit erwarteter Laenge oder Formatstruktur

Nicht interpretierbare Pflichtwerte sind Fehler. Interpretierbare, aber ungewoehnlich formatierte Werte koennen Warnungen ausloesen, wenn eine spaetere Transformation eindeutig waere.

### Fachliche Plausibilitaetsvalidierung

Plausibilitaetsvalidierung prueft, ob interpretierbare Werte fachlich sinnvoll wirken.

- Menge groesser als `0`
- Preis nicht negativ
- Lieferzeit plausibel
- Waehrung im erwarteten Format
- Country/Region plausibel
- Qualitaets- oder Bewertungswerte innerhalb einer erwarteten Skala

Diese Regeln koennen je nach Zielobjekt entweder blockierend oder warnend sein. Eine negative Menge ist typischerweise ein Fehler, ein aussergewoehnlich hoher Preis dagegen eher eine Warnung.

### Kontextvalidierung

Kontextvalidierung prueft, ob der Import in den fachlichen Mandanten- und Projektkontext passt.

- `company_id` existiert und passt zum Importjob.
- Optionaler `project_id` gehoert zur Company.
- `target_entity` ist fuer den Import erlaubt.
- Zeilenbezogene Kontextwerte widersprechen nicht dem Job-Kontext.
- Ein optionaler Projektbezug wird nicht auf Daten einer anderen Company angewendet.

Kontextfehler sind meist blockierend. Ein ungueltiger Job-Kontext kann die gesamte Validierung verhindern und gehoert dann auf Job-Level.

## Fehler vs. Warnungen

Fehler und Warnungen muessen fachlich klar getrennt werden.

Fehler blockieren die spaetere Zielobjekt-Erzeugung fuer die betroffene Zeile. Typische Fehler sind:

- Pflichtfeld fehlt
- Datentyp nicht interpretierbar
- negative Menge
- ungueltige Waehrung
- nicht unterstuetztes Zielobjekt
- Company-/Projektkontext passt nicht

Warnungen blockieren nicht zwingend, sollten aber vor der spaeteren Zielobjekt-Erzeugung ueberprueft werden. Typische Warnungen sind:

- ungewoehnlich hoher Preis
- ungewoehnlich lange Lieferzeit
- unbekannte optionale Spalte
- leere optionale Felder
- ungewoehnliches Datumsformat, aber interpretierbar
- Qualitaetsbewertung ausserhalb erwarteter, aber noch akzeptierter Skala

Eine Zeile mit Warnungen kann fachlich importierbar bleiben. Die spaetere Zielobjekt-Erzeugung sollte jedoch entscheiden koennen, ob sie nur `valid`-Zeilen oder auch `warning`-Zeilen verarbeitet.

## Beziehung zu ImportJob

`ImportJob` sammelt die Aggregation der Validierung. Er beschreibt nicht jede einzelne Regelverletzung, sondern den Gesamtzustand des Importvorgangs.

Relevante Felder:

- `total_rows`: Anzahl der fachlich betrachteten Zeilen.
- `processed_rows`: Anzahl der validierten oder bewusst uebersprungenen Zeilen.
- `valid_rows`: Anzahl der Zeilen ohne blockierende Fehler.
- `error_rows`: Anzahl der Zeilen mit blockierenden Fehlern.
- `validation_summary_json`: strukturierte Aggregation der Validierung.
- `error_summary`: kurze Job-Level-Fehlerzusammenfassung.
- `status`: aktueller Verarbeitungs- oder Fehlerzustand des Jobs.

`validation_summary_json` kann spaeter enthalten:

- Anzahl Fehler je Feld
- Anzahl Warnungen je Typ
- betroffene Zeilenbereiche
- Hinweise fuer UI/Review
- Zusammenfassung nach Zielobjekt
- Anzahl uebersprungener Zeilen
- grobe Severity-Verteilung

`error_summary` bleibt fuer Job-Level-Fehler gedacht, etwa wenn der Job-Kontext ungueltig ist, das Mapping fehlt oder die Validierung wegen eines strukturellen Problems nicht sinnvoll gestartet werden kann.

## Beziehung zu ImportRow

`ImportRow` traegt den Zeilenstatus und die zeilenbezogenen Meldungen.

Relevante Felder:

- `validation_status`: fachlicher Status der Zeile nach Validierung.
- `error_message`: kurze, menschenlesbare Fehlerbeschreibung.
- `warning_message`: kurze, menschenlesbare Warnbeschreibung.
- `mapped_data_json`: Grundlage der Validierung und spaeterer Korrekturen.
- `metadata_json`: flexible Zusatzinformationen fuer strukturierte Details.

Moegliche freie Werte fuer `validation_status`:

- `pending`
- `valid`
- `warning`
- `error`
- `skipped`

Der im Datenmodell bereits vorbereitete Wert `imported` gehoert fachlich eher zu Issue #10, weil er erst nach erfolgreicher Zielobjekt-Erzeugung sinnvoll gesetzt werden kann. In Issue #9 sollte `imported` deshalb nicht als reiner Validierungsstatus verwendet werden.

`error_message` und `warning_message` koennen zunaechst einfache Textzusammenfassungen enthalten. Strukturierte Details wie Fehlercodes, Feldpfade, Severity, Regelname oder urspruenglicher Rohwert koennen spaeter in `metadata_json` abgelegt werden, ohne neue Tabellen einzufuehren.

## Zielobjekt-spezifische Beispielregeln

Die folgenden Regeln sind exemplarisch. Sie definieren noch keine finale Engine-Struktur und erzeugen keine Zielobjekte.

### `procurement_history_item`

Typische Pflichtfelder:

- `article_name`
- `supplier_name`
- `quantity`
- `unit_price`
- `currency`
- `order_date`

Typische Plausibilitaetsregeln:

- `quantity > 0`
- `unit_price >= 0`
- `currency` als ISO-aehnlicher 3-Buchstaben-Code
- `order_date` darf nicht weit in der Zukunft liegen
- `lead_time_weeks`, falls vorhanden, `>= 0`

Typische Fehler:

- `article_name` oder `supplier_name` fehlt.
- `quantity` ist nicht numerisch oder kleiner/gleich `0`.
- `unit_price` ist nicht numerisch oder negativ.
- `currency` ist leer oder kein plausibler 3-Buchstaben-Code.
- `order_date` ist nicht interpretierbar.

Typische Warnungen:

- `unit_price` ist ungewoehnlich hoch.
- `lead_time_weeks` ist ungewoehnlich lang.
- `supplier_country` oder Region ist unbekannt, aber optional.
- `quality_rating` liegt ausserhalb der erwarteten, aber noch akzeptierten Skala.

### `request_item`

Typische Pflichtfelder:

- `article_name`
- `quantity`

Typische Plausibilitaetsregeln:

- `quantity > 0`
- `rough_price_expectation`, falls vorhanden, `>= 0`
- `target_delivery_time` darf nicht leer sein, wenn ein Liefertermin gefordert wird

Typische Fehler:

- `article_name` fehlt.
- `quantity` fehlt, ist nicht numerisch oder kleiner/gleich `0`.
- `rough_price_expectation` ist negativ, wenn das Feld gesetzt ist.
- Ein als verpflichtend markierter Liefertermin ist nicht vorhanden.

Typische Warnungen:

- `rough_price_expectation` ist auffaellig hoch oder sehr niedrig.
- `target_region` ist ungewoehnlich oder nicht eindeutig.
- `article_description` oder `comment` ist leer, obwohl zusaetzlicher Kontext hilfreich waere.

## Korrektur- und Review-Workflow

Der spaetere Workflow sollte ohne automatische Korrektur und ohne UI-Vorgabe vorbereitet werden:

1. `ImportJob` wird geparst und gemappt.
2. Validierung laeuft.
3. `ImportJob` erhaelt `status="validated"`, wenn keine blockierenden Fehler vorliegen.
4. Bei Fehlern bleibt der Job in einem Review- oder Fehlerzustand.
5. Nutzer kann spaeter fehlerhafte Zeilen pruefen.
6. Korrekturen koennen spaeter `mapped_data_json` aktualisieren.
7. Validierung kann erneut ausgefuehrt werden.
8. Erst valide Zeilen werden spaeter in Issue #10 zu Zielobjekten verarbeitet.

Dabei sollten mehrere Problemarten unterschieden werden:

- Job-Level-Fehler: verhindern die Validierung insgesamt, etwa fehlendes Mapping oder ungueltiger Company-Kontext.
- Zeilenfehler: blockieren nur die betroffene Zeile.
- Warnungen: markieren pruefbeduerftige, aber grundsaetzlich verarbeitbare Zeilen.
- Uebersprungene Zeilen: bewusst ausgeschlossene Zeilen, etwa leere Datenzeilen oder nicht relevante Sheets.

Korrekturen duerfen konzeptionell `mapped_data_json` aktualisieren, sollten aber die urspruenglichen Rohdaten in `raw_data_json` unveraendert lassen. Dadurch bleibt nachvollziehbar, welche Daten aus der Quelle kamen und welche Daten fuer die spaetere Verarbeitung korrigiert wurden.

## Statuslogik

### `ImportJob.status`

`ImportJob.status` beschreibt den Zustand des gesamten Importvorgangs. Fuer Issue #9 sind vor allem folgende Werte relevant:

- `pending`: noch nicht validiert oder noch nicht verarbeitet.
- `mapping`: Mapping offen oder in Vorbereitung; Validierung kann noch nicht abschliessend laufen.
- `validated`: Validierung abgeschlossen, keine blockierenden Fehler.
- `failed`: Job-Level-Fehler verhindert Validierung.
- `completed_with_errors`: eher spaeter nach Teilverarbeitung, nicht als reiner Validierungsstatus ueberdehnen.

Ein Importjob mit Zeilenfehlern sollte nicht automatisch als erfolgreich `validated` gelten. Solange blockierende Zeilenfehler bestehen, ist ein Review-Zustand fachlich sinnvoller. Falls kein eigener Review-Status existiert, kann die spaetere Implementierung die Kombination aus `status`, `error_rows` und `validation_summary_json` nutzen, ohne sofort neue Statuswerte oder Migrationen einzufuehren.

`completed`, `processing` und `completed_with_errors` gehoeren primaer in den Schritt der Zielobjekt-Erzeugung. Sie sollten in Issue #9 nur als spaetere Anschlusszustaende beschrieben werden.

### `ImportRow.validation_status`

`ImportRow.validation_status` beschreibt das Ergebnis der Validierung pro Zeile:

- `pending`: noch nicht geprueft.
- `valid`: keine Fehler oder blockierende Warnungen.
- `warning`: importierbar, aber pruefbeduerftig.
- `error`: blockierend.
- `skipped`: bewusst ausgeschlossen.

Zeilen mit `error` duerfen spaeter nicht automatisch zu Zielobjekten verarbeitet werden. Zeilen mit `warning` koennen grundsaetzlich verarbeitet werden, sofern der spaetere Workflow dies erlaubt oder der Nutzer die Warnungen akzeptiert.

## Fehleraggregation

Fehleraggregation soll sowohl eine schnelle Gesamtbewertung als auch eine spaetere Review-Ansicht ermoeglichen.

- Job-Level-Fehler gehoeren in `ImportJob.error_summary`.
- Aggregierte Validierungsuebersicht gehoert in `ImportJob.validation_summary_json`.
- Zeilenfehler gehoeren in `ImportRow.error_message`.
- Zeilenwarnungen gehoeren in `ImportRow.warning_message`.
- Strukturierte Details koennen spaeter in `ImportRow.metadata_json` abgelegt werden.

Eine moegliche spaetere Struktur fuer `validation_summary_json` koennte Zaehler nach Feld, Fehlertyp, Warnungstyp, Zielobjekt und Zeilenbereich enthalten. Diese Struktur sollte erst bei der Implementierung finalisiert werden, damit sie zu Engine, API und Review-UI passt.

## Spaetere Umsetzungsschritte

Empfohlene Reihenfolge:

1. Validierungsregel-Struktur definieren.
2. Zielobjekt-spezifische Pflichtfeldregeln definieren.
3. Datentyp- und Transformationspruefungen definieren.
4. Plausibilitaetsregeln ergaenzen.
5. Aggregation in `validation_summary_json` vorbereiten.
6. Korrektur-/Review-Workflow konzeptionell mit spaeterer UI abstimmen.
7. Validierungsengine implementieren.
8. Danach Zielobjekt-Erzeugung in Issue #10 vorbereiten/umsetzen.

Die Validierungsengine sollte erst entstehen, wenn Regeln, Statuslogik und Aggregationsstruktur ausreichend stabil sind. Die Zielobjekt-Erzeugung sollte erst danach geplant und umgesetzt werden, damit sie ausschliesslich validierte Importzeilen verarbeitet.
