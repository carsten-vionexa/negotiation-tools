# AI Strategy Evidence Model

## 1. Zweck

D11.3 beschreibt das fachliche Quellen-, Claim- und Evidenzmodell fuer
spaeteres AI-assisted Strategy Coaching. Das Dokument ist bewusst keine
technische Modell-, API-, DTO-, RAG-, Persistenz- oder Score-Spezifikation. Es
klaert nur die Semantik, nach der spaetere fachliche Aussagen aus Dokumenten,
Importdaten, Stammdaten, Einkaufsdaten, Lieferantenprofilen und Nutzerangaben
im Coaching eingeordnet werden koennen.

Der AI Strategy Coach darf Quellen und Claims spaeter nutzen, um die Datenlage
zu spiegeln, Risiken zu markieren, Fragen vorzubereiten oder Argumentationsideen
zu entwickeln. Er darf daraus aber keine automatisch wahren Fakten und keine
automatisch gespeicherten Strategiebausteine machen.

## 2. Grundprinzipien

- Eine Quelle ist ein nachvollziehbarer Ursprung einer fachlichen Aussage.
- Ein Claim ist eine isolierbare fachliche Aussage mit Ursprung, kein ganzer
  Dokumenttext und kein ungepruefter KI-Text.
- Evidence beschreibt, warum eine Aussage belastbar, schwach, unklar,
  widerspruechlich oder veraltet ist.
- Confidence ist eine fachliche Transparenzmarkierung, kein numerischer Score
  und keine automatische Bewertung.
- Herkunft, Datum, Aktualitaet und Widerspruchsmarker bleiben sichtbar, wenn
  sie fuer eine Aussage relevant sind.
- Claims koennen Strategy Coaching vorbereiten, werden aber erst nach
  Nutzerbestaetigung zu Strategy-Bausteinen.
- KI-Hypothesen bleiben Hypothesen, bis Nutzer oder fachlich berechtigte
  Reviewer sie bestaetigen, korrigieren oder verwerfen.

## 3. Quellenbegriff

Eine Quelle ist der fachliche Ursprung, aus dem eine Aussage stammt oder auf den
eine Aussage verweist. Quellen koennen strukturierte Objekte, manuelle Angaben,
Dokumente, Importartefakte oder spaetere Knowledge-Bausteine sein.

Moegliche Quellentypen fuer spaeteres Strategy Coaching:

| Quellentyp | Fachliche Einordnung |
| --- | --- |
| `Company` | Stammdaten und Mandantenkontext, etwa Branche, Rahmenbedingungen oder interne Notizen. |
| `SupplierProfile` | Lieferantenbezogene Stammdaten, Beziehungshinweise, Risiken, kultureller Kontext und Verhandlungssignale. |
| `UserProfile` | Rolle, Trainingskontext oder freigegebene Lernziele, soweit fuer Coaching relevant. |
| `NegotiationProject` | Projektanker, Verhandlungsgegenstand, Status, Ziel, Prioritaet und Projektnotizen. |
| Strategy-Bausteine | Bereits manuell gepflegte Ziele, BATNA, WAP, ZOPA, Konzessionen, Argumente oder Risiken. |
| `RequestItem` | Bedarf, Menge, Zielpreis, Budgetrahmen, Liefertermin, Spezifikation und Prioritaet. |
| `ProcurementHistoryItem` | Historische Preis-, Mengen-, Lieferanten- und Einkaufsdaten. |
| `ImportJob` | Herkunft, Datei- und Verarbeitungskontext eines Imports. |
| `ImportRow` | Reviewbare Roh- oder Mappingdaten aus einem Import; direkt nur mit Herkunfts- und Reviewkontext belastbar. |
| `KnowledgeDocument` | Dokumentquelle mit Metadaten, Datum, Dokumenttyp und fachlichem Ursprung. |
| Spaetere `KnowledgeClaim`-Objekte | Bereits isolierte Aussagekerne mit Quelle, Evidenz, Confidence und fachlicher Typisierung. |
| Spaetere RAG-Snippets | Ausschnitte aus Such- oder Retrieval-Kontexten, nur mit Dokument-, Auszugs- und Aktualitaetsbezug nutzbar. |
| Nutzerangaben im Coaching-Dialog | Manuelle Annahmen, Korrekturen, Priorisierungen oder Entscheidungen des Nutzers. |
| `TrainerComment` oder Lernpunkte | Nur mit fachlicher Freigabe, Rollenbezug und klarer Trennung von Projektdaten nutzbar. |

Rohe ImportRows, RAG-Snippets und Volltextauszuege sind keine belastbaren Fakten
an sich. Sie brauchen einen erkennbaren Aussagekern, Herkunft, Datum oder
Reviewstatus, bevor sie als Claim-nahe Hinweise im Coaching verwendet werden.

## 4. Claim-Begriff

Ein Claim ist eine fachliche, isolierbare Aussage mit Ursprung. Er kann aus
einem gespeicherten Objekt, einer Importzeile, einem Dokument, einer
Nutzerangabe oder einer spaeteren Review-/Knowledge-Struktur stammen.

Ein Claim ist:

- eine konkrete fachliche Aussage, die im Coaching wiedergegeben, geprueft oder
  hinterfragt werden kann
- knapp genug, um von Quelle, Evidenz und Aktualitaet getrennt bewertet zu
  werden
- mit Herkunft verbunden, wenn er aus einem Objekt, Dokument, Import oder
  Retrieval-Kontext stammt
- je nach Quelle und Evidenz unterschiedlich belastbar

Ein Claim ist nicht:

- ein kompletter Dokumenttext
- ein freier Volltextauszug ohne Aussagekern
- eine ungepruefte KI-Ausgabe, die bereits wie ein Fakt klingt
- automatisch ein wahrer Fakt
- automatisch ein Strategy-Baustein
- automatisch eine Freigabe fuer Speicherung oder Strategieuebernahme

Beispiele fuer Claims oder claim-nahe Aussagen:

- `Lieferant hat in der Vergangenheit Lieferzeiten ueberschritten.`
- `Zielpreis liegt 8 Prozent unter dem letzten Einkaufspreis.`
- `Der Lieferant scheint technisch spezialisiert, aber moeglicherweise kapazitaetskritisch.`
- `WAP ist noch nicht belastbar, weil BATNA und Alternativkosten fehlen.`

Der erste Satz kann je nach Datenlage ein gespeicherter Fakt oder ein
dokumentbasierter Claim sein. Der dritte Satz ist eher eine Hypothese oder ein
schwacher Hinweis. Der vierte Satz ist keine Preisfeststellung, sondern ein
Klaerungshinweis zur Strategiequalitaet.

## 5. Aussagearten

Spaeteres Strategy Coaching muss Aussagearten sichtbar trennen. Die Trennung
verhindert, dass eine schwache Ableitung als Fakt erscheint oder eine
KI-Hypothese unbemerkt in Strategy-Logik uebergeht.

| Aussageart | Bedeutung | Nutzung im Coaching |
| --- | --- | --- |
| Gespeicherter Fakt | Aussage aus einem gespeicherten Fachobjekt oder freigegebenen Dokument mit nachvollziehbarem Ursprung. | Darf als vorhandene Datenlage gespiegelt werden, mit Herkunft wenn relevant. |
| Nutzerannahme | Vom Nutzer eingegebene Einschaetzung, Grenze, Erwartung oder Priorisierung. | Darf fuer Szenarien genutzt werden, muss als Nutzerannahme erkennbar bleiben. |
| Datenbasierter Hinweis | Muster oder Ableitung aus vorhandenen Daten, aber nicht abschliessend bewiesen. | Vorsichtig als Hinweis formulieren und bei Strategieableitung pruefen lassen. |
| Claim aus Dokument oder Import | Isolierte Aussage aus Dokument, ImportJob oder ImportRow mit Ursprung und Aussagekern. | Mit Quelle, Datum und Reviewstatus verwenden; nicht automatisch als Fakt. |
| KI-Hypothese | Vom Coach vorgeschlagene Interpretation, Erklaerung, Frage oder Strategieoption. | Bleibt Hypothese bis zur Nutzer- oder Reviewbestaetigung. |
| Offene Frage | Fehlende oder klaerungsbeduerftige Information. | In den Dialog bringen; nicht still ergaenzen oder erfinden. |
| Widerspruch | Zwei oder mehr Aussagen passen fachlich nicht zusammen. | Sichtbar markieren und klaerende Frage stellen. |
| Veraltete oder unklare Aussage | Aussage mit altem, fehlendem oder unklarem Aktualitaetsbezug. | Mit Stale-/Unclear-Marker fuehren und vorsichtig verwenden. |
| Trainer- oder reviewbezogener Hinweis | Beobachtung oder Lernpunkt aus Training, Review oder Feedback. | Nur mit Freigabe und Rollenbezug verwenden; nicht als Projektdatenfakt. |

## 6. Evidence und Confidence

Evidence beschreibt, worauf sich eine Aussage fachlich stuetzt. Confidence
beschreibt, wie vorsichtig der Coach die Aussage verwenden soll. Beide
Kategorien sind Transparenzmarkierungen. Sie sind keine Score-Engine, keine
automatische Priorisierung und keine automatische Wahrheitsermittlung.

| Stufe | Bedeutung | Coaching-Konsequenz |
| --- | --- | --- |
| Strong evidence | Mehrere aktuelle, nachvollziehbare oder direkt gespeicherte Quellen stuetzen dieselbe Aussage ohne relevanten Widerspruch. | Darf als belastbare Datenlage gespiegelt werden, trotzdem mit Quelle bei kritischen Aussagen. |
| Medium evidence | Eine plausible Quelle oder mehrere teilweise passende Hinweise stuetzen die Aussage. | Als wahrscheinlich oder gut begruendet formulieren, bei kritischen Strategiebausteinen bestaetigen lassen. |
| Weak evidence | Einzelhinweis, unvollstaendige Quelle, geringe Datenbasis oder indirekte Ableitung. | Nur als vorsichtigen Hinweis oder Frage nutzen. |
| User-provided assumption | Aussage stammt vom Nutzer und ist fachlich relevant, aber nicht extern belegt. | Als Nutzerannahme verwenden und bei Bedarf nach Belegen oder Grenzen fragen. |
| Unverified hypothesis | Aussage stammt aus KI-Interpretation oder nicht gepruefter Ableitung. | Nicht als Fakt ausgeben; nur als Hypothese oder Vorschlag. |
| Conflicting evidence | Mindestens zwei relevante Quellen widersprechen sich. | Nicht aufloesen; Widerspruch sichtbar machen und klaeren. |
| Stale evidence | Quelle oder Aussage ist moeglicherweise veraltet. | Aktualitaet markieren und aktuelle Daten anfragen. |
| Insufficient evidence | Datenlage reicht fuer eine belastbare Aussage nicht aus. | Als offene Frage oder fehlende Information behandeln. |

Eine Evidence-Stufe kann sich fachlich aendern, wenn neue Quellen hinzukommen,
Nutzer Annahmen korrigieren oder alte Dokumente durch aktuellere Importdaten
ersetzt werden. D11.3 legt nicht fest, wie diese Aenderung technisch berechnet
oder gespeichert wird.

## 7. Herkunft, Aktualitaet und Marker

Jede quellenbezogene Aussage sollte spaeter genug Kontext tragen, damit der
Nutzer ihre Herkunft und Belastbarkeit einschaetzen kann. Fachlich relevant
sind insbesondere:

- Ursprungstyp, etwa gespeichertes Objekt, Dokument, Import, Nutzerangabe,
  Claim, RAG-Snippet oder Trainerhinweis
- fachlicher Ursprung, etwa `RequestItem`, `SupplierProfile`,
  `ProcurementHistoryItem`, `KnowledgeDocument` oder Strategy-Baustein
- lesbarer Quellenname oder kurze Quellenbeschreibung
- Datum der Quelle oder Aktualisierung, wenn Aktualitaet fuer die Aussage
  relevant ist
- Aussagekern oder knapper Auszug, kein unkontrollierter Volltext-Dump
- Aussageart, Evidence-Stufe und Confidence-/Vorsichtsmarker
- Hinweis auf Widerspruch, veraltete Quelle oder unklare Herkunft
- Review- oder Freigabestatus, wenn personenbezogene oder trainerbezogene
  Hinweise betroffen sind

Fehlt Herkunft oder Datum bei aktualitaetskritischen Aussagen, darf der Coach
diese Aussage nicht als belastbaren Fakt behandeln.

## 8. Widerspruchslogik

Widersprueche sind kein Fehler, der automatisch repariert werden soll. Sie sind
fachliche Klaerungspunkte.

Regeln fuer widerspruechliche Aussagen:

- Widerspruch nicht automatisch aufloesen.
- Betroffene Quellen, Aussagearten und Datenpunkte sichtbar benennen.
- Keine der widerspruechlichen Aussagen still zur Wahrheit erklaeren.
- Coach soll eine klaerende Frage oder einen Review-Schritt vorschlagen.
- Kein automatisches Speichern als Strategy-Baustein.
- Bei kritischen ZOPA-, BATNA-, WAP-, Preis-, Risiko- oder Lieferfaehigkeits-
  Aussagen besonders vorsichtig formulieren.

Beispiele:

- `RequestItem` nennt Zielpreis 100 EUR, waehrend `ProcurementHistoryItem`
  letzte Preise deutlich hoeher zeigt.
- `SupplierProfile` beschreibt eine stabile Beziehung, waehrend
  Einkaufshistorie oder Trainerhinweise wiederholte Eskalationen nennen.
- Ein altes `KnowledgeDocument` beschreibt stabile Kapazitaet, aktuelle
  Importdaten zeigen aber Lieferverzug oder Mengenengpaesse.

In solchen Faellen soll der Coach die Datenlage spiegeln, den Widerspruch
benennen und den Nutzer zur Einordnung fuehren.

## 9. Nutzung im Strategy Coaching

Claims und Evidence duerfen spaeter im Strategy Coaching eingesetzt werden,
wenn ihre Aussageart und Belastbarkeit sichtbar bleiben.

Zulaessige Nutzungen:

- Datenlage spiegeln: `Die vorhandenen Einkaufsdaten zeigen ...`
- Hinweis formulieren: `Ein moeglicher Hinweis ist ...`
- Risiko markieren: `Diese Aussage wirkt schwach belegt und sollte geprueft werden.`
- offene Frage stellen: `Welche aktuelle Lieferzeit gilt fuer dieses Projekt?`
- Argumentationsidee vorschlagen: `Aus den historischen Lieferverzoegerungen koennte eine Risikoargumentation entstehen.`
- Lerncheck verwenden: `Welche Zahl oder Annahme wuerdest du vor der Verhandlung noch absichern?`
- nach Nutzerbestaetigung in Strategy-Bausteine ueberfuehren

Nicht zulaessig:

- schwache Hinweise als gesicherte Fakten ausgeben
- KI-Hypothesen automatisch speichern
- Widersprueche automatisch aufloesen
- aus personenbezogenen Trainerhinweisen ohne Freigabe Strategieargumente
  ableiten
- WAP, BATNA oder ZOPA aus unvollstaendigen Daten als belastbare Grenze
  darstellen

## 10. Nicht geeignete Claims oder Quellen

Nicht als belastbarer Claim gelten:

- ungepruefte KI-Ausgaben
- reine Volltextfragmente ohne Aussagekern
- Quellen ohne Herkunft oder Datum, wenn Aktualitaet fachlich relevant ist
- personenbezogene Trainerkommentare ohne Freigabe
- technische Logs ohne fachlichen Verhandlungsbezug
- Secrets, Tokens, Env-Werte oder Serverkonfigurationen
- alte oder widerspruechliche Aussagen ohne Marker
- ImportRows ohne Mapping-, Review- oder Herkunftskontext
- RAG-Snippets ohne Dokumentbezug, Auszugskontext oder Aktualitaetsmarker

Solche Informationen koennen hoechstens als Klaerungsbedarf sichtbar werden.
Sie duerfen nicht zu Fakten, Strategiebausteinen, Argumentationslinien oder
automatischen Coach-Empfehlungen aufgewertet werden.

## 11. Folgefragen fuer spaetere Modellierung

D11.3 erzeugt fachliche Folgefragen, aber keine Implementierungsfreigabe:

- Welche Felder braucht ein spaeteres Claim-Modell, um Ursprung, Aussageart,
  Evidence, Confidence, Aktualitaet und Widerspruch sichtbar zu halten?
- Wie werden Nutzerannahmen, KI-Hypothesen, bestaetigte Aussagen und verworfene
  Aussagen technisch getrennt?
- Wie wird ein Widerspruch zwischen gespeicherten Objekten, Dokumentclaims und
  Nutzerangaben nachvollziehbar dargestellt?
- Welche Review- oder Freigaberegeln braucht personenbezogenes
  Trainerfeedback?
- Wie werden stale oder unklare Quellen im UI markiert, ohne einen Score zu
  suggerieren?
- Wann darf ein Claim als Vorschlag fuer einen Strategy-Baustein angeboten
  werden?
- Wie wird Nutzerbestaetigung protokolliert, bevor ein Claim in Strategy-Daten
  uebergeht?
- Welche spaeteren RAG-Snippets sind kurz genug fuer Coaching und belegt genug
  fuer quellenbezogene Antworten?

Diese Fragen bleiben separaten Issues vorbehalten. D11.3 fuehrt keine
Produkt-, Backend-, Frontend-, KI-, RAG-, API-, Persistenz-, Migrations-,
Simulations-, Score- oder Staging-Logik ein.
