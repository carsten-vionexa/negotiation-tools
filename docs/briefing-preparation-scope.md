# Briefing Preparation Scope

## Zweck

D13.1 schneidet die naechste Produktkante nach dem abgeschlossenen
Demo-Readiness-Block D12 fachlich zu. Der Schritt entscheidet, ob D13 zuerst
`Strategy -> Briefing Preparation` oder `Simulation Preparation` vertieft.

Das Dokument ist ein Konzept- und Scope-Dokument. Es fuehrt keine
Produktfunktion, keine UI, keine API, keine Migration, keine Seeds und keine
KI- oder Simulationslogik ein.

## Produktentscheidung

D13 startet mit `Strategy -> Briefing Preparation`.

Simulation Preparation bleibt ein moeglicher spaeterer Folgeblock, wird aber
nicht vorgezogen.

Begruendung:

- Briefing Preparation ist bereits als Route und Workflow-Schritt sichtbar.
- Die bestehende Strategy-Readiness-Guidance verweist bei ausreichender
  Strategiebelastbarkeit bereits auf Briefing als naechsten sinnvollen
  Vorbereitungsschritt.
- D12 hat lokal und auf Staging demonstrierbare Readiness-Zustaende
  abgeschlossen, einschliesslich `Bereit fuer Briefing / Simulation` und
  `/briefing?projectId=...`.
- Ein Briefing-Zwischenschritt kann vorhandene Strategy-, Projekt-, Bedarfs-
  und Lieferanteninformationen in eine kompakte Gespraechsvorbereitung
  uebersetzen, ohne schon Simulation, KI-Dialog, Rollenverhalten oder
  automatische Auswertung zu benoetigen.
- Simulation Preparation setzt fachlich staerker auf spaetere
  Simulationslogik, Gespraechsdynamik, Rollenverhalten, Auswertung und
  Trainingsfeedback auf.

## Empfohlene Erste Briefing-Bausteine

Ein erstes Strategy-based Briefing sollte spaeter klein und manuell
nachvollziehbar bleiben. Sinnvolle Bausteine sind:

- Ausgangslage des Projekts: Projektname, Verhandlungsanlass, Status,
  Beschreibung und relevante Notizen.
- Zielbild der Verhandlung: Strategy Objectives, Zielergebnis, Minimum und
  Walk-away Point als manuelle Grenzen.
- Zentrale Strategiebausteine: ZOPA, BATNA, WAP, Konzessionslogik und
  Argumentationslinien.
- Bedarfskontext: RequestItem-Informationen wie Artikel, Kategorie, Menge,
  Liefertermin, Zielpreis, Budgetrahmen, Prioritaet, Beschreibung,
  Spezifikation und Notizen.
- Lieferantenkontext: vorhandenes SupplierProfile, Beziehung, Region,
  Kategorie, Verhandlungssignale und kultureller Kontext.
- Persoenliche Vorbereitungshinweise: vorhandene UserProfile-Informationen,
  falls sie fuer Rolle, Erfahrung oder Kommunikationsstil sinnvoll nutzbar
  sind.
- Offene Informationsluecken: fehlende Strategiebausteine, fehlender
  Bedarfskontext, fehlender Supplier Context oder nicht ausreichend
  belastbare Annahmen.
- Empfohlene naechste Vorbereitungsschritte: kleine manuelle Schritte vor dem
  Gespraech, zum Beispiel Strategie vervollstaendigen, Lieferantenprofil
  nachpflegen oder Argumente mit Belegen schaerfen.
- Grenze zur Simulation: Das Briefing bereitet das Gespraech vor, startet aber
  keine produktive Simulation, keinen KI-Dialog und keine automatische
  Auswertung.

## Zulaessige Vorhandene Datenquellen

D13 darf fuer Briefing Preparation fachlich nur vorhandene Datenquellen
betrachten:

- `NegotiationProject`
- `RequestItem`
- `SupplierProfile`
- `Strategy`
- `ZopaItem`
- `BatnaOption`
- `ConcessionItem`
- `ArgumentationLine`
- `UserProfile`, falls fuer persoenliche Vorbereitungshinweise sinnvoll
- vorhandene Readiness- und Preparation-Guidance aus Project Detail,
  Strategy Readiness, Preparation Gaps und Next-Action-Guidance

Keine neuen Datenquellen, Persistenzobjekte oder externen Datenzufluesse werden
durch D13.1 freigegeben.

## Nicht-Ziele

D13.1 ist kein Implementierungsschritt.

Nicht Bestandteil sind:

- keine Frontend-UI-Aenderung
- keine Backend-API-Aenderung
- keine Migration
- keine Seed-Aenderung
- kein Staging-Deployment
- keine KI-Briefing-Erzeugung
- kein RAG
- keine Claim-Extraktion
- keine automatische Strategy-Erzeugung
- keine Simulation
- keine automatische Auswertung
- keine Score-Engine
- kein Trainerreview-Ausbau
- keine neuen Produktdaten und keine neue Persistenz

## Sinnvolle Folgeissues

Aus D13.1 lassen sich kleine, getrennte Folgeissues ableiten:

1. D13.2: Briefing-Preparation-Informationsarchitektur fuer
   `/briefing?projectId=...` spezifizieren, einschliesslich Reihenfolge der
   Bausteine, Empty States und fachlicher Grenzen.
2. D13.3: Minimalen read-only Briefing-Preparation-Prototyp aus vorhandenen
   Projekt-, Strategy-, RequestItem- und SupplierProfile-Daten vorbereiten,
   ohne neue Persistenz, KI-Briefing, Simulation oder Backendmodell.
3. D13.4: Lokalen Browser-Smoke-Test fuer den read-only Briefing-Preparation-
   Flow dokumentieren, falls D13.3 umgesetzt wird.

## D13.2 Umsetzung

D13.2 setzt den ersten kleinen read-only UI-Schritt direkt auf der bestehenden
Route `/briefing?projectId=...` um.

Die Briefing Preparation Scope Card nutzt ausschliesslich vorhandene Daten aus
bestehenden Frontend-API-Helpern:

- `NegotiationProject`
- `RequestItem`
- `SupplierProfile`
- `Strategy`
- `ZopaItem`
- `BatnaOption`
- `ConcessionItem`
- `ArgumentationLine`

Die Card ordnet Projektkontext, Strategiegrundlagen, Briefing-Bausteine,
offene Informationen und naechste Aktion sichtbar ein. Bei fehlender Strategy
fuehrt sie zur Strategy Preparation zurueck; bei vorhandener Strategy benennt
sie offene Bausteine oder bestaetigt, dass die Briefing-Struktur geprueft
werden kann.

D13.2 bleibt nicht-generativ und read-only. Es werden keine Backend-API, keine
Migration, keine Seeds, keine neue Persistenz, kein KI-Briefing, kein RAG,
keine Claim-Extraktion, keine automatische Strategy-Erzeugung, keine Simulation
und keine Score- oder Trainerreview-Logik eingefuehrt.

## Ergebnis

D13.1 priorisiert `Strategy -> Briefing Preparation` als naechste Produktkante.
D13.2 macht diesen Zwischenschritt erstmals auf `/briefing?projectId=...`
kompakt aus vorhandenen Daten sichtbar. Simulation Preparation bleibt spaeter
moeglich, wird aber erst nach einem sauberen Briefing-Zwischenschritt fachlich
erneut bewertet.
