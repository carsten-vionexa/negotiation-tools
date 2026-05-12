# Import-Zielobjekt-Erzeugungs-Konzept

## Ziele

Dieses Konzept beschreibt, wie validierte Importdaten spaeter in echte Fachobjekte ueberfuehrt werden koennen. Es ist eine Dokumentationsgrundlage und implementiert noch keine Importverarbeitung, Batch-Engine oder Persistierungslogik.

- Konzept fuer automatische Zielobjekt-Erzeugung aus validierten Importdaten vorbereiten.
- Beschreiben, wie `ImportRow.mapped_data_json` auf Fachobjekte gemappt wird.
- `ProcurementHistoryItem` und `RequestItem` als MVP-Fokus beschreiben.
- Idempotenz und Dublettenerkennung vorbereiten.
- Fehler- und Rollback-Verhalten konzipieren.
- Anforderungen fuer spaetere Batch-Verarbeitung dokumentieren.

Die Zielobjekt-Erzeugung ist der Schritt nach Upload, Parsing, Mapping und Validierung. Sie arbeitet auf bereits geprueften Daten und soll keine vorgelagerte Parser-, Mapping- oder Validierungsverantwortung uebernehmen.

## Nicht-Ziele

Nicht Teil dieses Schritts sind:

- keine echte Importverarbeitung
- keine Batch-Engine
- keine Hintergrundjobs
- keine automatische KI-Klassifikation
- keine Parser-Implementierung
- keine Validierungsengine
- keine neuen Datenbanktabellen
- keine Migration

Das vorhandene Importmodell mit `ImportJob` und `ImportRow` reicht fuer dieses Konzept aus. Eine Migration sollte erst erfolgen, wenn bei der spaeteren Implementierung eine zwingende Modellluecke sichtbar wird.

## Rolle im Importprozess

Die Importverarbeitung bleibt in fachlich getrennte Stufen aufgeteilt:

1. Upload erzeugt `ImportJob`.
2. Parser erzeugt `ImportRow.raw_data_json`.
3. Mapping erzeugt `ImportRow.mapped_data_json`.
4. Validierung setzt `ImportRow.validation_status`.
5. Zielobjekt-Erzeugung verarbeitet nur freigegebene Zeilen.

Die Zielobjekt-Erzeugung darf erst nach erfolgreicher Validierung erfolgen. Ihre Arbeitsgrundlage ist `ImportRow.mapped_data_json`, weil dort die fachlich gemappten und validierten Werte liegen. `ImportRow.raw_data_json` bleibt die unveraenderte Quelle und darf durch die Zielobjekt-Erzeugung nicht ueberschrieben oder fachlich interpretiert werden.

Die Zielobjekt-Erzeugung wiederholt keine umfassende Validierung. Sie darf technische Schutzpruefungen ausfuehren, etwa ob der Job im erwarteten Status steht, ob eine Zeile bereits importiert wurde oder ob ein Zielobjekttyp unterstuetzt ist. Pflichtfeld-, Datentyp- und Plausibilitaetsvalidierung gehoeren jedoch in den vorgelagerten Validierungsschritt.

## Unterstuetzte Zielobjekte im MVP

Fuer den MVP werden zwei Zielobjekte priorisiert:

- `ProcurementHistoryItem`
- `RequestItem`

Andere Zielobjekte koennen spaeter ergaenzt werden. Sie sind nicht Teil dieses MVP-Konzepts und sollten erst betrachtet werden, wenn die Importstrecke fuer Einkaufsvergangenheit und Anfragepositionen fachlich stabil ist.

## Verarbeitung nach `target_entity`

`ImportJob.target_entity` bestimmt, welche Zielobjektart aus den freigegebenen Zeilen erzeugt oder zugeordnet wird.

Typische Werte:

- `procurement_history_item`
- `request_item`

`ImportRow.target_entity` und `ImportRow.target_record_id` werden erst nach erfolgreicher Erzeugung oder sicherer Zuordnung gesetzt. Dadurch bleibt nachvollziehbar, welche Importzeile zu welchem Fachobjekt gefuehrt hat. Vor der Zielobjekt-Erzeugung bleiben diese Felder leer, damit eine validierte, aber noch nicht importierte Zeile klar erkennbar ist.

Wenn `ImportJob.target_entity` nicht unterstuetzt wird, ist das ein Job-Level-Fehler. Wenn einzelne Zeilen widerspruechliche oder nicht passende Zielinformationen enthalten, sollte dies als Zeilenfehler dokumentiert werden, sofern der Job grundsaetzlich weiterverarbeitet werden kann.

## Zeilen-Selektion

Die Zielobjekt-Erzeugung verarbeitet nur Zeilen, die fachlich freigegeben sind und noch kein Zielobjekt referenzieren.

- `valid`: kann verarbeitet werden
- `warning`: kann optional verarbeitet werden, wenn der Workflow Warnungen erlaubt oder sie bestaetigt wurden
- `error`: nicht verarbeiten
- `skipped`: nicht verarbeiten
- `pending`: nicht verarbeiten

Ob `warning`-Zeilen verarbeitet werden duerfen, sollte spaeter konfigurierbar oder explizit freigegeben sein. Der sichere Default ist, nur `valid`-Zeilen automatisch zu verarbeiten und `warning`-Zeilen erst nach Bestaetigung einzuschliessen.

Zeilen mit bestehender `target_record_id` sollten nicht erneut erzeugt werden. Sie gelten als bereits verarbeitet oder zugeordnet und duerfen bei Wiederholungslaeufen hoechstens referenziell geprueft werden.

## Mapping auf `ProcurementHistoryItem`

Bei `ImportJob.target_entity="procurement_history_item"` erzeugt oder referenziert jede freigegebene Zeile perspektivisch ein `ProcurementHistoryItem`.

Beispielhafte Felder aus `ImportRow.mapped_data_json`:

- `company_id`
- optional `project_id`
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
- weitere optionale Felder in `metadata_json`

Die Werte muessen bereits validiert und typisiert sein oder in eindeutig transformierbarer Form vorliegen. Die Zielobjekt-Erzeugung sollte beispielsweise nicht erneut entscheiden, ob ein Preis plausibel ist oder ein Pflichtfeld fachlich fehlt. Sie darf aber defensiv abbrechen, wenn die Daten trotz vorheriger Validierung technisch nicht persistierbar sind.

Optionale oder quellenspezifische Zusatzfelder sollten in `metadata_json` des Zielobjekts abgelegt werden, sofern sie fachlich relevant bleiben, aber noch keine stabile eigene Spalte rechtfertigen. Dabei sollte erkennbar bleiben, dass diese Metadaten aus einem Import stammen, zum Beispiel ueber spaetere strukturierte Hinweise auf `import_job_id`, `import_row_id` oder Mapping-Versionen, falls die Zielobjekte solche Metadaten aufnehmen koennen.

## Mapping auf `RequestItem`

Bei `ImportJob.target_entity="request_item"` erzeugt oder referenziert jede freigegebene Zeile perspektivisch ein `RequestItem`.

Beispielhafte Felder aus `ImportRow.mapped_data_json`:

- `company_id`
- optional `project_id`, falls fachlich benoetigt oder spaeter ergaenzt
- `article_name`
- `article_description`
- `quantity`
- `target_delivery_time`
- `rough_price_expectation`
- `target_region`
- `status`
- `comment`
- weitere optionale Felder in `metadata_json`

Auch hier gilt: Die Datenbasis ist `mapped_data_json`, nicht `raw_data_json`. Werte sollen bereits durch Mapping und Validierung in einer Form vorliegen, die direkt oder mit klar definierten technischen Transformationen persistiert werden kann.

`status` kann aus dem Import stammen oder spaeter durch einen Default gesetzt werden, wenn die Validierungs- und Mappingregeln dies ausdruecklich erlauben. Unklare Statuswerte gehoeren nicht in die Zielobjekt-Erzeugung, sondern in Mapping oder Validierung.

## Idempotenz

Die Verarbeitung muss idempotent geplant werden. Ein erneuter Lauf darf nicht unkontrolliert Duplikate erzeugen.

Grundregeln:

- Wenn `ImportRow.target_record_id` bereits gesetzt ist, wird die Zeile nicht erneut erzeugt.
- Wenn `ImportRow.target_entity` und `ImportRow.target_record_id` bereits auf ein existierendes Zielobjekt zeigen, kann die Zeile als bereits verarbeitet betrachtet werden.
- Wenn ein Zielobjekt bereits existiert und sicher zugeordnet werden kann, sollte die Zeile nur referenziert oder uebersprungen werden.
- Wiederholung nach Fehlern darf nur nicht erfolgreich verarbeitete Zeilen erneut versuchen.
- Erfolgreiche und fehlgeschlagene ImportJob-Laufe muessen ueber Status, Zaehler, Fehlerfelder und Zielreferenzen nachvollziehbar bleiben.

Die einfachste Idempotenzgrenze ist `ImportRow.target_record_id`: Sie verhindert, dass dieselbe Importzeile mehrfach persistente Fachobjekte erzeugt. Dublettenerkennung gegen bereits bestehende Zielobjekte ist eine zusaetzliche fachliche Schutzschicht, ersetzt aber nicht die zeilenbezogene Importreferenz.

## Dublettenerkennung

Die Dublettenerkennung sollte zunaechst konservativ sein. Ziel ist, offensichtliche doppelte Fachobjekte zu erkennen oder zu markieren, ohne zu frueh harte Datenbankregeln einzufuehren.

Fuer `ProcurementHistoryItem` moegliche fachliche Schluessel:

- `company_id`
- `article_name`
- `supplier_name`
- `order_date`
- `quantity`
- `unit_price`
- `currency`

Fuer `RequestItem` moegliche fachliche Schluessel:

- `company_id`
- `article_name`
- `quantity`
- `target_delivery_time`
- `target_region`

Noch sollte keine harte Unique Constraint eingefuehrt werden. Echte Importdaten koennen Schreibvarianten, Rundungsunterschiede, Lieferterminabweichungen oder bewusst wiederkehrende Positionen enthalten. Die spaetere Implementierung sollte Datenqualitaet und fachliche Schluessel zuerst beobachten.

Als MVP-nahe Strategie bietet sich an:

- Dubletten als fachliche Pruefung oder Warnung konzipieren.
- Nur bei sehr sicherem Match automatisch zuordnen oder ueberspringen.
- Bei unsicherem Match keine automatische Zusammenfuehrung vornehmen.
- Dublettenhinweise in `ImportRow.warning_message`, `ImportRow.error_message` oder strukturiert in `metadata_json` dokumentieren, je nach spaeterer Workflow-Entscheidung.

## Fehler- und Rollback-Verhalten

Das Konzept unterscheidet Zeilenfehler und Job-Level-Fehler.

### Zeilenfehler

Ein Zeilenfehler betrifft eine einzelne Importzeile, waehrend der Job grundsaetzlich weiterlaufen kann.

- Einzelne Zeile kann nicht verarbeitet werden.
- Fehler wird in `ImportRow.error_message` oder strukturiert in `ImportRow.metadata_json` dokumentiert.
- `ImportRow.validation_status` kann auf `error` gesetzt werden.
- Job kann mit anderen freigegebenen Zeilen fortfahren.

Typische Beispiele sind ein unerwarteter Persistierungsfehler fuer eine Zeile, ein inzwischen geloeschter Projektbezug oder ein Dublettenfall, der nicht automatisch aufgeloest werden darf.

### Job-Level-Fehler

Ein Job-Level-Fehler verhindert die Zielobjekt-Erzeugung insgesamt oder macht den Job-Zustand unzuverlaessig.

- Grundlegender Fehler verhindert Verarbeitung.
- Fehler wird in `ImportJob.error_summary` dokumentiert.
- `ImportJob.status` erhaelt `failed`.

Typische Beispiele sind ein nicht unterstuetztes `target_entity`, ein fehlender oder ungueltiger Job-Kontext, fehlende Mappingdaten fuer den gesamten Job oder ein technischer Fehler, der keine sichere Fortsetzung erlaubt.

Fuer den MVP sollte eher zeilenweise Verarbeitung mit nachvollziehbarer Fehlerprotokollierung geplant werden. Ein harter Alles-oder-nichts-Rollback ueber den gesamten Import sollte nicht der Standard sein. Ob spaeter pro Batch, pro Zeile oder pro Importlauf committed wird, muss bewusst entschieden werden, wenn Service, Transaktionsgrenzen und UI-Review-Workflow feststehen.

## Statuslogik

### `ImportJob.status`

Fuer die Zielobjekt-Erzeugung sind folgende Status relevant:

- `validated`: bereit zur Verarbeitung
- `processing`: Zielobjekt-Erzeugung laeuft
- `completed`: alle freigegebenen Zeilen erfolgreich verarbeitet
- `completed_with_errors`: teilweise verarbeitet, einzelne Zeilen fehlgeschlagen
- `failed`: Job-Level-Fehler
- `cancelled`: abgebrochen

Konzeptioneller Statusfluss:

```text
validated -> processing -> completed
validated -> processing -> completed_with_errors
validated -> processing -> failed
validated/processing -> cancelled
```

Ein Job sollte nur aus einem validierten Zustand in die Zielobjekt-Erzeugung wechseln. Jobs mit offenen Mapping-, Parser- oder Validierungsproblemen bleiben ausserhalb dieses Schritts.

### `ImportRow.validation_status`

Fuer das aktuelle Modell kann `ImportRow.validation_status` zunaechst auch den Importfortschritt der Zeile ausdruecken:

- `imported`: Zielobjekt erfolgreich erzeugt oder zugeordnet
- `error`: Verarbeitung fehlgeschlagen oder bereits vorher blockierend
- `skipped`: bewusst nicht verarbeitet

Falls `validation_status` semantisch zu eng wird, kann spaeter ein separates Feld fuer Importverarbeitungsstatus geprueft werden. Fuer das aktuelle Modell soll jedoch keine neue Spalte eingefuehrt werden.

## Batch-Verarbeitung

Batch-Verarbeitung soll vorbereitet, aber nicht implementiert werden.

Konzeptionelle Anforderungen:

- Verarbeitung in kleinen Batches muss spaeter moeglich sein.
- Fortschritt kann ueber `processed_rows`, `valid_rows` und `error_rows` nachvollzogen werden.
- Wiederaufnahme nach Fehlern muss moeglich sein, indem nur nicht erfolgreich verarbeitete Zeilen erneut versucht werden.
- Zeilen mit gesetzter `target_record_id` werden bei Wiederaufnahme nicht erneut erzeugt.
- Keine Background Jobs in diesem Issue.
- Spaetere Background-Worker oder Queues bleiben optional.

Die Zaehler auf `ImportJob` muessen bei der spaeteren Implementierung klar definiert werden. `processed_rows` kann dann die Zahl der im Zielobjekt-Schritt betrachteten Zeilen abbilden, waehrend `valid_rows` und `error_rows` je nach Workflow Validierungs- oder Importergebnisse ausdruecken. Falls diese Mehrdeutigkeit stoert, sollte spaeter ein separates Status- oder Summary-Feld geprueft werden, bevor weitere Spalten eingefuehrt werden.

## Spaetere Umsetzungsschritte

Empfohlene Reihenfolge:

1. Zielobjekt-Factory oder Importverarbeitungsservice konzipieren.
2. Verarbeitung fuer `procurement_history_item` definieren.
3. Verarbeitung fuer `request_item` definieren.
4. Idempotenzpruefung ueber `target_record_id` implementieren.
5. Konservative Dublettenerkennung ergaenzen.
6. Zeilenweises Fehlerhandling ergaenzen.
7. Fortschritts- und Statusupdates auf `ImportJob` ergaenzen.
8. Optional spaeter Batch-/Background-Verarbeitung planen.

Die Implementierung sollte erst beginnen, wenn Parser, Mapping und Validierung stabil genug sind, um `mapped_data_json` verlaesslich als Arbeitsgrundlage zu nutzen.
