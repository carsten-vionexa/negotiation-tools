# AI-assisted Strategy Coaching

## 1. Zweck dieses Dokuments

Dieses Dokument beschreibt einen spaeteren Produktblock fuer das Negotiation Tool: die dialogische, KI-gestuetzte Entwicklung einer Verhandlungsstrategie gemeinsam mit dem Nutzer.

Der Punkt ist bewusst als Zielbild und spaetere Roadmap-Ergaenzung dokumentiert. Er soll nicht kurzfristig mit Gewalt in den aktuellen MVP eingeschoben werden. Die Umsetzung darf erst erfolgen, wenn das technische Fundament fuer Knowledge Base, RAG beziehungsweise quellenbezogene Kontextnutzung, stabile Strategy-Datenstrukturen, projektspezifische Kontextuebergabe und sichere Persistenz ausreichend tragfaehig ist.

## 2. Grundidee

Die KI soll im Live-Betrieb nicht einfach eine fertige Strategie generieren. Sie soll als Strategie-Coach auftreten und den Nutzer durch einen fachlichen Entscheidungs- und Lernprozess fuehren.

Leitprinzip:

```text
Strategieentwicklung ist ein Lern- und Entscheidungsdialog, keine reine Textgenerierung.
```

Der Nutzer soll zusammen mit der KI eine belastbare Verhandlungsstrategie entwickeln. Dabei soll er wichtige Kennzahlen, Grenzen, Annahmen, Risiken und Argumentationslinien selbst verstehen und aktiv verarbeiten. Das Ziel ist nicht nur ein gespeichertes Strategieobjekt, sondern eine bessere mentale Vorbereitung auf die spaetere reale Verhandlung oder Simulation.

## 3. Fachlicher Nutzen

Der AI Strategy Coach verbindet zwei Nutzenebenen:

1. Operative Verhandlungsvorbereitung
   - Ziele, BATNA, WAP, ZOPA, Konzessionen und Argumente werden datenbasiert vorbereitet.
   - Der Nutzer erkennt zentrale Kennzahlen, Annahmen und Risiken.
   - Die Strategie wird nachvollziehbar aus Projekt-, Lieferanten- und Wissenskontext entwickelt.

2. Lern- und Trainingsnutzen
   - Der Nutzer erarbeitet die Strategie aktiv mit, statt nur einen KI-Text zu lesen.
   - Die KI fragt nach, spiegelt Daten, erklaert Zusammenhaenge und fordert Entscheidungen ein.
   - Der Nutzer soll zentrale Punkte in eigenen Worten wiedergeben koennen.
   - Dadurch bleiben Kennzahlen und Verhandlungslogik besser im Kopf.

## 4. Abgrenzung zu automatischer Strategieerzeugung

Nicht gewuenscht ist ein reiner Button wie:

```text
Strategie automatisch generieren
```

Ein solcher Modus wuerde den Lernwert reduzieren und koennte Nutzer dazu verleiten, eine Strategie zu uebernehmen, ohne sie verstanden zu haben.

Der spaetere Zielmodus ist stattdessen:

```text
Strategie gemeinsam mit KI entwickeln
```

Die KI darf Vorschlaege machen, muss diese aber als Vorschlag, Hypothese oder datenbasierte Ableitung markieren. Der Nutzer bestaetigt, korrigiert oder ergaenzt. Erst nach dieser Nutzerentscheidung werden Strategiebausteine gespeichert oder aktualisiert.

## 5. Datenbasis und Kontext

Der AI Strategy Coach soll spaeter auf vorhandene Daten zurueckgreifen, zum Beispiel:

- NegotiationProject
- Company / Mandant
- UserProfile / Trainee oder Rolle
- RequestItem
- SupplierProfile
- ProcurementHistoryItem
- KnowledgeDocuments
- KnowledgeClaims
- ImportRows und daraus erzeugte Zielobjekte
- Branchenreport, Firmenprofil, Einkaufshistorie und Anfragenkatalog
- spaeter RAG-/Embedding-Kontext mit Quellenbezug
- vorhandene Strategy-Bausteine
- TrainerComments und spaetere Lernpunkte, soweit freigegeben

Wichtig: Die KI soll zwischen Fakten, Annahmen, Hypothesen und offenen Fragen unterscheiden. Quellenbasierte Aussagen muessen spaeter nach Moeglichkeit mit Evidenz oder Herkunft gekennzeichnet werden.

## 6. Typischer Dialogablauf

Ein spaeterer AI-Strategy-Coaching-Dialog kann in Phasen strukturiert werden.

### 6.1 Ausgangslage klaeren

Die KI spiegelt kurz das Projekt:

- Verhandlungsgegenstand
- Lieferant oder Gegenseite
- Menge, Zielregion, Preisannahme, Lieferzeit
- vorhandene Datenlage
- fehlende Informationen

Beispiel:

```text
Ich sehe ein Verhandlungsprojekt fuer Praezisionsgetriebe mit einem japanischen Lieferanten. Es gibt einen vorhandenen Lieferantenkontext und erste Preis-/Lieferannahmen. Bevor wir Ziele definieren, klaeren wir zuerst: Geht es primaer um Preis, Lieferfaehigkeit, Zweitquelle oder Vertragsrisiko?
```

### 6.2 Datenlage und Kennzahlen spiegeln

Die KI stellt die wichtigsten Datenpunkte heraus:

- bisherige Preise
- Zielpreise
- Mengen
- Lieferzeiten
- Preisanker
- Abweichungen aus Einkaufshistorie
- Markt- oder Lieferantenrisiken
- Lieferantenmacht
- technische Abhaengigkeiten

Der Nutzer soll diese Kennzahlen nicht nur sehen, sondern verstehen.

### 6.3 Ziele entwickeln

Die KI fuehrt durch Zielklaerung:

- Maximalziel
- realistisches Ziel
- Minimalziel
- Nicht-Preis-Ziele
- Beziehungsziel
- Risiko-/Vertragsziele

Die KI fragt nach Priorisierung, Zielkonflikten und internen Grenzen.

### 6.4 BATNA klaeren

Die KI hilft, echte Alternativen zu unterscheiden:

- anderer Lieferant
- Redesign
- Verzoegerung
- Bestandslieferant verlaengern
- Projektumfang aendern
- Eskalation oder Managemententscheidung

Sie prueft mit dem Nutzer, wie stark diese BATNA wirklich ist und welche Kosten, Risiken oder Zeitfolgen sie hat.

### 6.5 WAP ableiten

Die KI fuehrt zur Walk-away-Grenze:

- Preis-WAP
- Lieferzeit-WAP
- Qualitaets-WAP
- Risiko-WAP
- Vertrags-WAP

Die WAP-Ableitung soll begruendet werden. Der Nutzer soll verstehen, warum eine Grenze sinnvoll ist und wann ein Abschluss schlechter waere als die Alternative.

### 6.6 ZOPA als Hypothese entwickeln

Die KI darf eine moegliche ZOPA als Hypothese vorschlagen, aber nicht als Wahrheit darstellen.

Sie sollte fragen:

- Welche Annahmen liegen der ZOPA zugrunde?
- Welche Seite hat welche vermutete Grenze?
- Welche Daten fehlen?
- Ist die ZOPA ueber Preis allein erreichbar oder nur ueber Paketlogik?

### 6.7 Konzessionslogik entwickeln

Die KI unterstuetzt beim Denken in Tauschobjekten:

- Welche Konzession kostet uns wenig, ist fuer die Gegenseite aber wertvoll?
- Welche Gegenleistung brauchen wir?
- Welche Konzession darf nicht isoliert gegeben werden?
- In welcher Reihenfolge koennen Zugestaendnisse angeboten werden?

Grundregel:

```text
Keine Konzession ohne Gegenleistung oder klaren strategischen Nutzen.
```

### 6.8 Argumentationslinien und Fragen vorbereiten

Die KI entwickelt mit dem Nutzer:

- Kernargumente
- TCO-Argumente
- Risikoargumente
- Beziehungsargumente
- marktbezogene Argumente
- technische Argumente
- kritische Fragen an den Lieferanten
- erwartete Gegenargumente
- passende Reaktionsoptionen

### 6.9 Lerncheck und mentale Verankerung

Zum Schluss soll die KI den Nutzer auffordern, zentrale Punkte selbst zu formulieren:

- Was ist unser Ziel?
- Was ist unsere BATNA?
- Wo liegt der WAP?
- Was ist unser erstes Angebot beziehungsweise unsere erste Forderung?
- Welche drei Zahlen muessen im Kopf bleiben?
- Welche Konzession duerfen wir nur gegen Gegenleistung geben?

Dieser Lerncheck ist zentral, weil das Tool nicht nur Strategie dokumentieren, sondern Verhandlungsfaehigkeit aufbauen soll.

### 6.10 Speichern nach Bestaetigung

Erst nach Nutzerbestaetigung werden Strategiebausteine gespeichert oder aktualisiert.

Moegliche Speicherlogik:

- Entwurf erzeugen
- bestehende Strategy ergaenzen
- einzelne Bausteine aktualisieren
- offene Fragen als To-dos oder Hinweise stehen lassen
- Quellen und Annahmen markieren

## 7. Didaktische Leitplanken

Der AI Strategy Coach soll den Nutzer nicht entmuendigen, sondern aktivieren.

Leitplanken:

- Fragen stellen statt nur Antworten liefern.
- Daten spiegeln und erklaeren.
- Unsicherheiten offen markieren.
- Keine unbegruendeten Zahlen erfinden.
- Fakten, Annahmen und Hypothesen trennen.
- Nutzerentscheidungen einfordern.
- Wichtige Kennzahlen wiederholen und verankern.
- Lernchecks einbauen.
- Trainer- oder Expertenreview weiterhin ermoeglichen.

## 8. D11.1 Preconditions vor Umsetzung

D11.1 ist ein Konzept- und Preconditions-Schritt. Dieser Schritt dokumentiert,
welche fachlichen, datenbezogenen, dialogischen und technischen Grundlagen vor
einer spaeteren Implementierung des AI Strategy Coach vorhanden oder geklaert
sein muessen. D11.1 ist keine Implementierungsfreigabe fuer KI-Logik, RAG,
Persistenz, Simulation, Trainerreview oder automatische Strategieerzeugung.

### 8.1 Fachliche Preconditions

Vor einer Umsetzung muessen die manuellen und regelbasierten Strategiefluesse
stabil genug sein, damit der AI Strategy Coach nicht ein unfertiges
Grundmodell kaschiert. Erforderlich sind:

- stabile Strategy-Objekte und Strategy-CRUD-Flows
- klare Strategy-Bausteine fuer Ziele, BATNA, WAP, ZOPA, Konzessionen und
  Argumentationslinien
- vorhandener Projektkontext mit Company, RequestItem, SupplierProfile und
  Strategy
- definierter Umgang mit fehlenden, alten, unklaren oder widerspruechlichen
  Daten
- klare Abgrenzung zwischen Coaching, Analyse, Simulation und Trainerreview
- Nutzer- oder Trainerreview als Pflichtprinzip vor Speicherung kritischer
  Strategiebausteine

Der bestehende Strategy Builder bleibt bis dahin der aktuelle manuelle
beziehungsweise regelbasierte Vorbereitungsbereich. Der AI Strategy Coach darf
ihn spaeter nur ergaenzen, nicht ersetzen.

### 8.2 Daten- und Kontext-Preconditions

Der spaetere KI-Kontext muss als expliziter projektbezogener Kontextvertrag
modelliert werden. Zulaessige Kontextquellen koennen sein:

- NegotiationProject
- Company
- UserProfile
- RequestItem
- SupplierProfile
- ProcurementHistoryItem
- KnowledgeDocument
- ImportRows und daraus erzeugte Zielobjekte
- vorhandene Strategy-Bausteine
- spaetere KnowledgeClaims oder RAG-Snippets

Vor produktiver KI-Nutzung muss dokumentiert und technisch abbildbar sein,
welche Informationen als Fakten, Nutzerannahmen, KI-Hypothesen oder offene
Fragen gelten.

- Fakten stammen aus gespeicherten Projekt-, Stamm-, Import-, Einkaufs- oder
  Knowledge-Objekten und brauchen bei datenbasierten Aussagen einen
  nachvollziehbaren Ursprung.
- Nutzerannahmen sind vom Nutzer eingegebene Einschaetzungen, Grenzen oder
  Bewertungen und duerfen nicht als externe Evidenz dargestellt werden.
- KI-Hypothesen sind Vorschlaege oder Ableitungen aus verfuegbarem Kontext und
  muessen als Hypothese markiert bleiben, bis der Nutzer sie bestaetigt oder
  korrigiert.
- Offene Fragen entstehen bei fehlenden, widerspruechlichen oder zu schwach
  belegten Informationen und muessen als Klaerungsbedarf sichtbar bleiben.

Quellenbasierte Aussagen brauchen eine Evidenzmarkierung. Spaetere
RAG-Snippets oder KnowledgeClaims muessen Herkunft, Aktualitaet, Aussagekern
und Belastbarkeit so tragen, dass der Nutzer erkennen kann, worauf sich eine
KI-Aussage stuetzt. Nicht belegte ZOPA-, BATNA- oder WAP-Ableitungen duerfen
nicht als Fakten erscheinen.

### 8.3 Dialog- und UX-Preconditions

Der AI Strategy Coach darf nicht als freier Chat ohne Projektkontext starten.
Der Einstieg muss aus einem konkreten NegotiationProject beziehungsweise einem
vergleichbar klaren Vorbereitungskontext erfolgen. Der Dialog muss phasenweise
gefuehrt werden; jede Phase braucht einen erkennbaren Zweck, zum Beispiel
Ausgangslage klaeren, Datenlage spiegeln, Ziele entwickeln, BATNA pruefen, WAP
ableiten, ZOPA als Hypothese entwickeln, Konzessionslogik klaeren,
Argumentationslinien vorbereiten und Lerncheck durchfuehren.

KI-Ausgaben muessen visuell und sprachlich unterscheidbar sein:

- Vorschlag
- datenbasierte Ableitung
- Nutzerannahme
- KI-Hypothese
- offene Frage
- bestaetigter Strategiebaustein

Strategiebausteine duerfen erst nach expliziter Nutzerbestaetigung gespeichert
oder aktualisiert werden. Der Calm-Negotiation-Workspace-Ansatz bleibt
Leitplanke: ruhig, nachvollziehbar, uebersichtlich, ohne KI-Magie zu
suggerieren und ohne den Nutzer aus der fachlichen Entscheidung zu nehmen.

### 8.4 Technische Preconditions

Vor Implementierung sind mindestens folgende technische Grundlagen erforderlich:

- stabiler Kontextvertrag fuer projektbezogene KI-Nutzung
- Modell fuer Quellen-, Claim- und RAG-Kontext
- Evidenzmarkierung fuer datenbasierte Aussagen
- Persistenzmodell fuer Dialogentwuerfe, bestaetigte Strategiebausteine,
  offene Fragen, verworfene Vorschlaege und Nutzerkorrekturen
- klare Regeln, welche KI-Ausgaben niemals direkt als Fakten gespeichert
  werden
- Fehler- und Unsicherheitsmodell fuer fehlende Daten, widerspruechliche Daten,
  zu geringe Evidenz, alte oder unklare Quellen und nicht belastbare ZOPA-,
  BATNA- oder WAP-Annahmen
- Review- und Korrekturmoeglichkeit durch Nutzer beziehungsweise Trainer

Die Speicherlogik muss strikt bleiben:

```text
KI-Ausgabe -> Entwurf / Vorschlag -> Nutzerpruefung -> Bestaetigung -> Speicherung
```

Ohne Bestaetigung bleibt eine KI-Aussage ein Entwurf, eine Hypothese oder eine
offene Frage. Sie darf keine bestehende Strategy ueberschreiben und nicht als
gesicherter Strategiebaustein gelten.

### 8.5 Risiken einer zu fruehen Implementierung

Eine verfruehte Umsetzung wuerde zentrale Produktrisiken erzeugen:

- automatisch wirkende Strategieerzeugung ohne echtes Nutzerverstaendnis
- Vermischung von Fakten, Annahmen und KI-Hypothesen
- scheinbar praezise ZOPA-, BATNA- oder WAP-Aussagen ohne belastbare Evidenz
- Speicherung ungepruefter KI-Ausgaben als Strategie
- freier Chat ohne Projektanker und ohne fachlichen Lernpfad
- Umgehung des bestehenden Strategy Builders
- unklare Haftungs-, Trainings- und Review-Erwartungen
- spaetere RAG- oder Claim-Nacharbeit gegen bereits etablierte falsche
  Produktannahmen

### 8.6 Sinnvolle D11-Folgephasen

Aus D11.1 ableitbare Folgephasen bleiben separate, spaeter zu priorisierende
Schritte:

1. D11.2: Kontextvertrag fuer projektbezogene KI-Nutzung konzipieren.
2. D11.3: Quellen-, Claim- und Evidenzmodell fuer Strategie-Coaching
   konkretisieren.
3. D11.4: Dialogphasen und UX-Vertrag fuer den Strategy Coach spezifizieren.
4. D11.5: Persistenz- und Reviewmodell fuer Entwuerfe, Bestaetigungen,
   Korrekturen und verworfene Vorschlaege definieren.
5. D11.6: Erst danach einen begrenzten technischen Prototyp pruefen, weiterhin
   ohne automatische Strategieuebernahme.

### 8.7 D11.2 Kontextvertrag

D11.2 ist als eigener Konzeptschritt in
`docs/ai-strategy-context-contract.md` dokumentiert. Das Dokument beschreibt
den fachlichen Kontextvertrag fuer eine spaetere projektbezogene KI-Nutzung:
Kontextbereiche, zulaessige Datenquellen, Trennung von Fakten,
Nutzerannahmen, datenbasierten Hinweisen, KI-Hypothesen, offenen Fragen und
Widerspruechen, Quellen-/Evidenzmarker, Mindestqualitaet sowie ungeeignete
Kontextbestandteile.

D11.2 bleibt konzeptionell. Es fuehrt keine Produkt-, Backend-, Frontend-,
KI-, RAG-, API-, Persistenz-, Migrations-, Simulations- oder
Trainerreview-Logik ein.

## 9. Technische Voraussetzungen vor Umsetzung

D11 darf erst umgesetzt werden, wenn das Fundament passt.

Vorbedingungen:

- stabile Strategy-Datenstrukturen und bestehende Strategy-CRUD-Flows
- projektbezogene Kontextuebergabe an KI-Services
- klares Modell fuer Knowledge-Kontext, Claims oder RAG-Snippets
- Quellenbezug beziehungsweise Evidenzmarkierung fuer datenbasierte Aussagen
- sichere Abgrenzung zwischen gespeicherten Fakten, Nutzerannahmen und KI-Hypothesen
- definierter Umgang mit unvollstaendigen oder widerspruechlichen Daten
- UI-Konzept fuer dialogische Strategy-Erarbeitung
- Persistenzkonzept fuer Zwischenergebnisse, Bestaetigungen und gespeicherte Strategiebausteine
- Review- oder Korrekturmoeglichkeit durch Nutzer beziehungsweise Trainer

## 10. Nicht-Ziele fuer die fruehe Umsetzung

D11 soll nicht als schneller KI-Button umgesetzt werden.

Nicht-Ziele:

- keine sofortige Implementierung im aktuellen D9-/D10-Kontext
- kein unkontrollierter freier Chat ohne Projektkontext
- keine automatische Strategie ohne Nutzerbestaetigung
- keine Speicherung ungepruefter KI-Hypothesen als Fakten
- keine vollautomatische ZOPA-/BATNA-/WAP-Berechnung ohne Transparenz
- keine RAG-Simulation ohne belastbaren Quellen- und Kontextmechanismus
- keine Umgehung des bestehenden Strategy Builders
- kein Ersatz fuer Trainerreview in Trainingskontexten

## 11. Roadmap-Einordnung

Dieser Block wird als spaeterer Roadmap-Block D11 vorgemerkt:

```text
D11: AI-assisted Strategy Coaching / Dialogische Strategieentwicklung
```

D11.1 dokumentiert nur Preconditions und ist kein Start der Implementierung.
D11.2 dokumentiert den fachlichen Kontextvertrag und ist ebenfalls keine
Implementierungsfreigabe.
D11 ist kein Blocker fuer D9 Briefing Preparation oder D10 User Onboarding.
D11 soll erst starten, wenn die technischen Grundlagen fuer KI-Kontext,
RAG/Knowledge, Strategy-Persistenz, Quellen-/Evidenzlogik und Dialogfuehrung
tragfaehig sind.

Bis dahin bleibt der bestehende Strategy Builder ein manueller beziehungsweise regelbasiert gefuehrter Vorbereitungsbereich. D11 beschreibt das Zielbild fuer den spaeteren Live-Betrieb.
