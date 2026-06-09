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

## 8. Technische Voraussetzungen vor Umsetzung

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

## 9. Nicht-Ziele fuer die fruehe Umsetzung

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

## 10. Roadmap-Einordnung

Dieser Block wird als spaeterer Roadmap-Block D11 vorgemerkt:

```text
D11: AI-assisted Strategy Coaching / Dialogische Strategieentwicklung
```

D11 ist kein Blocker fuer D9 Briefing Preparation oder D10 User Onboarding. D11 soll erst starten, wenn die technischen Grundlagen fuer KI-Kontext, RAG/Knowledge, Strategy-Persistenz und Dialogfuehrung tragfaehig sind.

Bis dahin bleibt der bestehende Strategy Builder ein manueller beziehungsweise regelbasiert gefuehrter Vorbereitungsbereich. D11 beschreibt das Zielbild fuer den spaeteren Live-Betrieb.
