# AI Strategy Context Contract

## 1. Zweck

D11.2 beschreibt den fachlichen Kontextvertrag fuer eine spaetere
projektbezogene Nutzung eines AI Strategy Coach. Der Vertrag ist bewusst keine
finale API-, DTO-, Datenbank- oder RAG-Spezifikation. Er beschreibt, welches
strukturierte Kontextpaket ein spaeterer Coach erhalten duerfte, welche
Aussagearten getrennt bleiben muessen und wann ein Kontextpaket fuer
dialogisches Strategy Coaching fachlich belastbar genug ist.

Der AI Strategy Coach darf nicht als freier Chat starten. Er braucht einen
konkreten Projektanker, in der Regel ein `NegotiationProject`, oder einen
vergleichbar klaren Vorbereitungskontext. Das Kontextpaket soll dem Coach nur
die Informationen geben, die fuer Verhandlungsvorbereitung, Strategiearbeit und
Lernfuehrung fachlich erforderlich sind.

## 2. Leitprinzipien

- Projektbezug vor Chatfreiheit: Jede KI-Nutzung startet aus einem konkreten
  Verhandlungs- oder Vorbereitungskontext.
- Fakten, Nutzerannahmen, datenbasierte Hinweise, KI-Hypothesen und offene
  Fragen bleiben getrennte Aussagearten.
- Quellenbezug wird transportiert, wenn eine Aussage aus einem Objekt,
  Dokument, Import oder spaeteren Claim abgeleitet ist.
- Fehlende Informationen werden als Missing Information sichtbar, nicht durch
  erfundene Werte ersetzt.
- Widersprueche und schwache Evidenz bleiben markiert und duerfen nicht zu
  gesicherten Strategiebausteinen werden.
- Der Vertrag bereitet spaetere KI-Nutzung vor, fuehrt aber keine KI-, RAG-,
  Backend-, Frontend-, API-, Persistenz- oder Migrationslogik ein.

## 3. Kontextpaket-Grundstruktur

Ein spaeteres Kontextpaket kann konzeptionell aus diesen Bereichen bestehen.
Die Reihenfolge ist fachlich, nicht technisch verbindlich.

| Bereich | Zweck fuer Strategy Coaching |
| --- | --- |
| Project Context | Verhandlungsgegenstand, Projektziel, Status, Prioritaet, Kategorie, Region, Zeitdruck, Business Pressure und einfache Projektnotizen. |
| Company Context | Mandant, Branche, Einkaufsumfeld, interne Rahmenbedingungen und relevante Company-Notizen. |
| User / Role Context | Rolle des Nutzers, Trainingsrolle, Erfahrungsstand oder freigegebene Lernziele, soweit fuer Coaching relevant. |
| Request Item / Demand Context | Bedarf, Artikel oder Leistung, Menge, Zielpreis, Budgetrahmen, Liefertermin, Spezifikation, Prioritaet und offene Bedarfsfragen. |
| Supplier Context | Lieferant, Beziehung, Machtlage, Risiken, kultureller Kontext, bekannte Verhandlungssignale und Profil-Luecken. |
| Existing Strategy Context | Vorhandene Strategy, Objectives, Zielergebnis, Minimum, BATNA, WAP, ZOPA, Konzessionen, Argumente und Risiken. |
| Procurement History Context | Historische Preise, Mengen, Lieferanten, Zeitpunkte und auffaellige Vergleichswerte aus vorhandenen Einkaufsdaten. |
| Knowledge / Evidence Context | Dokumente, Importurspruenge, spaetere Claims oder RAG-Snippets mit Quellen- und Evidenzmarkern. |
| Open Questions / Missing Information | Fehlende, unklare oder zu klaerende Angaben, die der Coach aktiv adressieren soll. |
| Data Quality / Confidence Markers | Hinweise auf Aktualitaet, Widersprueche, schwache Evidenz, manuelle Annahmen und Kontextreife. |

## 4. Zulaessige Datenquellen

Zulaessige Datenquellen sind vorhandene fachliche Objekte und spaetere
Knowledge-Bausteine, sofern sie projektbezogen oder fuer den konkreten
Vorbereitungskontext freigegeben sind:

- `NegotiationProject`
- `Company`
- `UserProfile`
- `RequestItem`
- `SupplierProfile`
- `Strategy`
- `ZopaItem`, `BatnaOption`, `ConcessionItem` und `ArgumentationLine`
- `ProcurementHistoryItem`
- `KnowledgeDocument`
- `ImportRow` und daraus erzeugte Zielobjekte
- spaetere `KnowledgeClaim`-Objekte oder RAG-Snippets
- spaetere `TrainerComment`- oder Lernpunkte nur, wenn sie fachlich fuer den
  Coaching-Kontext freigegeben sind

ImportRows sind nur dann als direkte Kontextquelle geeignet, wenn sie fuer
Review, Herkunft oder Fehleranalyse gebraucht werden. Fuer normales Strategy
Coaching sind daraus erzeugte Zielobjekte meistens belastbarer als rohe
Importzeilen.

TrainerComments und Lernpunkte duerfen nicht automatisch in den KI-Kontext
gelangen. Sie koennen personenbezogene Trainingsbeobachtungen enthalten und
brauchen deshalb eine fachliche Freigabe, einen klaren Rollenbezug und eine
sichtbare Abgrenzung von Projektdaten.

## 5. Trennung von Aussagearten

Der Kontextvertrag muss jede Aussage fachlich typisieren. Ein spaeterer Coach
darf diese Typen nicht vermischen.

| Aussageart | Bedeutung | Beispielhafte Behandlung |
| --- | --- | --- |
| Gespeicherter Fakt | Direkt aus einem gespeicherten Objekt oder Dokument ableitbar. | Darf als vorhandene Datenlage gespiegelt werden, mit Herkunft wenn relevant. |
| Nutzerannahme | Vom Nutzer gepflegte Einschaetzung, Grenze, Priorisierung oder Hypothese. | Darf genutzt werden, muss aber als Nutzerannahme erkennbar bleiben. |
| Datenbasierter Hinweis | Aus vorhandenen Daten abgeleitet, aber nicht abschliessend gesichert. | Als Hinweis oder Muster markieren, nicht als Tatsache. |
| KI-Hypothese | Vom Coach vorgeschlagene Interpretation, Frage oder Strategieoption. | Bleibt Hypothese bis Nutzer oder Trainer bestaetigen, korrigieren oder verwerfen. |
| Offene Frage | Fehlende oder klaerungsbeduerftige Information. | Als Frage in den Dialog bringen und nicht still ergaenzen. |
| Widerspruch | Zwei oder mehr Angaben passen fachlich nicht zusammen. | Sichtbar markieren und vor belastbarer Ableitung klaeren. |
| Unzureichend belegte Angabe | Aussage mit schwacher, alter oder unklarer Evidenz. | Mit Confidence-/Evidence-Marker fuehren und vorsichtig formulieren. |

Besonders kritisch sind ZOPA-, BATNA- und WAP-Aussagen. Eine gespeicherte
Preis- oder Mengeninformation kann ein Fakt sein; eine daraus abgeleitete
Walk-away-Grenze oder vermutete Gegenseitengrenze ist ohne Nutzerbestaetigung
keine Tatsache.

## 6. Evidenz- und Quellenlogik

Quellenbezogene Aussagen brauchen spaeter Metadaten, damit der Nutzer erkennen
kann, worauf sich eine Aussage stuetzt. D11.2 legt keine technische Struktur
fest, beschreibt aber die fachlich relevanten Felder:

- `source_type`: zum Beispiel Datenbankobjekt, Import, Dokument, Claim,
  RAG-Snippet oder Nutzerangabe.
- `source_object_type`: fachlicher Ursprung wie `KnowledgeDocument`,
  `RequestItem`, `SupplierProfile` oder `ProcurementHistoryItem`.
- `source_object_id`: stabile Referenz auf das Ursprungsobjekt, sofern
  vorhanden.
- `source_title` oder `source_label`: kurze fuer Nutzer lesbare Bezeichnung.
- `excerpt` oder `claim_summary`: knapper Aussagekern, kein ungepruefter
  Volltext-Dump.
- `evidence_strength` oder `confidence`: fachliche Belastbarkeit, zum Beispiel
  stark, mittel, schwach oder unklar.
- `created_at`, `updated_at` oder `document_date`: Aktualitaetsbezug.
- `stale_or_unclear`: Marker fuer veraltete oder uneindeutige Quellen.
- `contradiction_marker`: Hinweis, dass andere Quellen widersprechen.

Diese Metadaten dienen nicht dazu, RAG oder Claim-Extraktion jetzt zu bauen.
Sie beschreiben nur, welche Herkunftsinformation spaeter erhalten bleiben muss,
damit der Coach keine unbelegten Aussagen als Fakten ausgibt.

## 7. Mindestqualitaet

Ein Kontextpaket muss nicht vollstaendig sein, um nutzbar zu sein. Es braucht
aber eine Mindestqualitaet, damit ein Coaching-Dialog sinnvoll starten kann:

- ein Projekt oder Vorbereitungskontext mit erkennbarem Verhandlungsgegenstand
- ein Company- oder Mandantenkontext
- wenigstens rudimentaere Ziel-, Bedarfs- oder Problemlage
- erkennbare Nutzerrolle oder Trainingsrolle, falls der Dialog didaktisch
  gefuehrt werden soll
- optional ein `SupplierProfile`
- optional ein `RequestItem`
- optional vorhandene Strategy-Bausteine
- sichtbare Missing-Information-Hinweise, wenn zentrale Daten fehlen

Fehlende Informationen sind kein harter Fehler. Sie muessen als offene Fragen
in das Paket eingehen. Beispiel: Fehlt ein SupplierProfile, kann der Coach den
Dialog mit Bedarf, Ziel und Projektkontext beginnen, muss aber die fehlende
Lieferantenperspektive als Klaerungspunkt nennen.

## 8. Unvollstaendige oder widerspruechliche Kontexte

Der Kontextvertrag sollte Kontextreife nicht als numerischen Score erzwingen.
Ausreichend ist eine fachliche Einordnung, zum Beispiel:

- `ready_for_initial_coaching`: Mindestkontext vorhanden, offene Punkte sind
  benannt.
- `needs_clarification`: zentrale Informationen fehlen, der Coach sollte zuerst
  klaerende Fragen stellen.
- `conflicting_context`: relevante Angaben widersprechen sich, etwa Zielpreis,
  Budgetrahmen oder Liefertermin.
- `insufficient_evidence`: datenbasierte Ableitungen waeren zu schwach belegt.

Widersprueche duerfen nicht automatisch aufgeloest werden. Der Coach soll sie
spiegeln, priorisieren und den Nutzer zur Klaerung fuehren.

## 9. Nicht geeignete Kontextbestandteile

Nicht oder nur stark eingeschraenkt in den KI-Kontext gehoeren:

- Secrets, Env-Werte, Tokens, Zugangsdaten oder lokale Serverkonfigurationen
- interne technische Logs ohne fachlichen Verhandlungsnutzen
- personenbezogene Daten ohne klaren Rollen-, Trainings- oder Projektbezug
- ungepruefte KI-Ausgaben, die als Fakten erscheinen koennten
- veraltete oder widerspruechliche Quellen ohne Marker
- freie Chatverlaeufe ohne Projektbezug
- vollstaendige Dokumentinhalte, wenn ein knapper Claim, Auszug oder
  Quellenhinweis fachlich genuegt
- Trainer- oder Lernfeedback ohne Freigabe fuer den konkreten Nutzer- oder
  Trainingskontext

Der Kontext soll so knapp wie moeglich und so vollstaendig wie noetig sein. Er
ist kein Datenexport aller verfuegbaren Informationen.

## 10. Abgrenzung zu Folgearbeit

D11.2 klaert nur den fachlichen Kontextvertrag. Daraus entstehen Folgefragen
fuer spaetere, separate Issues:

- D11.3: Wie sehen Quellen-, Claim- und Evidenzmodelle fachlich und technisch
  aus?
- Wie werden RAG-Snippets oder KnowledgeClaims erstellt, geprueft und
  aktualisiert?
- Wie wird entschieden, welche TrainerComments oder Lernpunkte in einen
  konkreten Coaching-Kontext duerfen?
- Wie werden KI-Hypothesen, Nutzerkorrekturen und bestaetigte Strategiebausteine
  persistiert?
- Wie wird der Kontext im UI sichtbar, ohne den Coach wie eine Black Box wirken
  zu lassen?
- Welche Audit- oder Reviewinformationen braucht ein spaeterer produktiver
  KI-Dialog?

D11.2 ist keine Implementierungsfreigabe. Produktcode, Backend, Frontend,
Persistenz, Migrationen, KI-Services, RAG, Claim-Extraktion, Simulation und
Trainerreview-Logik bleiben unveraendert.
