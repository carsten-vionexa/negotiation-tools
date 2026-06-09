# UI- und Visual-Design-Konzept

## 1. Zweck dieses Dokuments

Dieses Dokument sammelt erste konzeptionelle Leitgedanken zur spaeteren grafischen und interaktiven Gestaltung des Negotiation Tools.

Der aktuelle MVP ist bewusst funktional und fachlich getrieben. Viele Seiten zeigen bereits wichtige Inhalte, wirken aber stellenweise noch ueberladen. Das ist fuer die aktuelle Entwicklungsphase akzeptabel, soll aber nicht das Zielbild fuer eine spaetere Demo-, Test- oder Produktversion bleiben.

Dieses Dokument dient als Sammelstelle fuer spaetere Mockups, Wireframes, Designprinzipien und UX-Entscheidungen. Es implementiert nichts und ersetzt keine spaetere UI-Spezifikation.

## 2. Ausgangspunkt

Das Negotiation Tool ist als KI-gestuetztes Verhandlungs-Cockpit gedacht. Es soll Unternehmensdaten, Einkaufsdaten, Lieferanteninformationen, Strategiebausteine, Briefing, Simulation und Trainerreview in einem gefuehrten Prozess verbinden.

Die fachliche Tiefe ist hoch. Deshalb besteht das zentrale UX-Problem nicht darin, moeglichst viele Informationen sichtbar zu machen, sondern darin, diese Tiefe so zu fuehren, dass der Nutzer:

- den Gesamtprozess versteht,
- immer weiss, wo er steht,
- die naechste sinnvolle Aktion erkennt,
- nicht von Detailinformationen erschlagen wird,
- die fertige Strategie auf einen Blick erfassen kann,
- Freude an der Benutzung hat.

## 3. Zielbild: Calm Negotiation Workspace

Das Zielbild ist eine ruhige, hochwertige und gefuehrte Arbeitsumgebung.

Die Software soll sich nicht wie ein ueberladenes ERP-Formular anfuehlen, sondern wie ein klarer Arbeitsraum fuer strategische Vorbereitung.

Leitbild:

```text
Fachlich tief, visuell ruhig, gefuehrt und motivierend.
```

Das Design soll professionell wirken, aber nicht kalt. Es soll intelligent wirken, aber nicht akademisch schwer. Es soll dem Nutzer helfen, sich auf die Verhandlung zu konzentrieren, nicht auf die Bedienung der Software.

## 4. Designprinzipien

### 4.1 Calm Workspace

Die Oberflaeche soll Ruhe erzeugen.

Konsequenzen:

- klare visuelle Hierarchie
- ausreichend Weissraum
- wenige konkurrierende Elemente
- reduzierte Farbpalette
- klare Typografie
- keine lauten Alerts ohne Notwendigkeit
- wichtige Inhalte zuerst, Details spaeter

### 4.2 Summary first, details on demand

Jede zentrale Seite sollte zuerst eine kurze, gut lesbare Zusammenfassung zeigen.

Details erscheinen erst:

- per Expand,
- in einem Fokusbereich,
- in einer Detailspalte,
- oder auf einer Unterseite.

Dadurch bleibt die Seite auch bei hoher fachlicher Tiefe bedienbar.

### 4.3 One primary action

Pro Seite oder Zustand sollte es genau eine dominante naechste Aktion geben.

Beispiele:

- Strategie anlegen
- BATNA schaerfen
- WAP festlegen
- Briefing vorbereiten
- Simulation konfigurieren
- Trainerreview oeffnen

Nebenaktionen duerfen vorhanden sein, sollen aber visuell zuruecktreten.

### 4.4 Guided, not noisy

Die Software soll den Nutzer fuehren, nicht mit Hinweisen ueberladen.

Gute Fuehrung bedeutet:

- klarer Status
- klare naechste Aktion
- kurze Erklaerung, warum dieser Schritt wichtig ist
- keine langen Hilfetexte im Standardzustand
- bei Bedarf kontextbezogene Vertiefung

### 4.5 Progressive Disclosure

Die Komplexitaet wird stufenweise sichtbar.

Moegliche Stufen:

1. Executive Summary
2. Statuskarten
3. Fokusbereich
4. Detailansicht
5. Experten-/Datenansicht

Die Standardansicht soll nicht alle Details gleichzeitig zeigen.

### 4.6 Human-readable Strategy

Eine Strategie darf nicht nur als Datenstruktur existieren. Sie muss fuer Menschen schnell lesbar sein.

Der Nutzer sollte auf einen Blick verstehen:

- Was wollen wir erreichen?
- Wo liegt unsere Grenze?
- Welche Alternative haben wir?
- Welche Argumente tragen?
- Welche Konzessionen duerfen wir nur gegen Gegenleistung geben?
- Was ist der naechste Vorbereitungsschritt?

### 4.7 Friendly professional

Das Tool soll professionell bleiben, aber motivierend und angenehm wirken.

Moegliche Tonalitaet:

- ruhig
- klar
- respektvoll
- positiv bestaerkend
- nicht verspielt
- nicht technisch trocken

Beispiele fuer positive Rueckmeldung:

- „Strategie deutlich klarer.“
- „BATNA jetzt belastbarer.“
- „Briefing kann vorbereitet werden.“
- „WAP fehlt noch als zentrale Entscheidungsgrenze.“

## 5. Apple-/Mac-Prinzip als Orientierung

Das Ziel ist nicht, Apple visuell zu kopieren. Gemeint ist ein Produktgefuehl:

- wenig Reibung
- klare Fokusfuehrung
- hochwertige Details
- reduzierte Oberflaeche
- angenehme Mikrointeraktionen
- Komplexitaet im Hintergrund, Klarheit im Vordergrund

Fuer das Negotiation Tool bedeutet das:

- keine vollgestopften Formularseiten als Zielbild
- keine gleich lauten Informationsbloecke
- keine dauerhafte Anzeige aller technischen Details
- klare Karten, Panels und Fokuszonen
- sanfte Uebergaenge
- eindeutige Hauptaktionen
- ruhige Erfolgsmeldungen

## 6. Grafische Darstellung der fertigen Strategie

### 6.1 Strategy Board als Zielbild

Die fertige oder wachsende Strategie sollte spaeter als Strategy Board dargestellt werden.

Der Strategy Builder wird damit nicht nur Formular, sondern visuelles Cockpit.

Moegliche Struktur:

1. Projektkopf / Executive Summary
2. Readiness und naechster Schritt
3. Strategiebausteine als Karten
4. Fokusbereich fuer den aktuell wichtigsten Baustein
5. Naechste sinnvolle Schritte
6. Detail- oder Quellenbereich optional

### 6.2 Projektkopf / Executive Summary

Oben steht eine kurze, ruhige Zusammenfassung:

- Projekttitel
- Lieferant / Gegenseite
- Verhandlungsart
- Status
- Readiness
- wichtigste Kennzahlen
- naechster sinnvoller Schritt

Beispiel:

```text
Projekt: Precision Gearbox Negotiation
Lieferant: Aurum Motion Systems K.K.
Status: Strategy in Arbeit
Readiness: bereit fuer BATNA-Schaerfung
Naechster Schritt: WAP aus BATNA ableiten
```

### 6.3 Strategiebausteine als Karten

Die Kernstrategie kann in sechs Karten dargestellt werden:

- Ziele
- ZOPA
- BATNA
- WAP
- Konzessionen
- Argumente

Jede Karte zeigt im Standardzustand nur:

- Status
- 1 bis 2 Kernaussagen
- fehlende Punkte
- naechste Aktion

Details werden erst im Fokusbereich oder per Expand sichtbar.

### 6.4 Statuslogik

Moegliche Zustandsarten:

- Offen
- Angelegt
- Teilweise belastbar
- Belastbar
- Pruefung erforderlich
- Bereit fuer Briefing

Die Statuslogik sollte verbal verstaendlich bleiben. Ein abstrakter Score allein reicht nicht.

### 6.5 Fokusbereich

Unter den Strategie-Karten kann ein Fokusbereich den aktuell wichtigsten Baustein zeigen.

Beispiel:

```text
Fokus: BATNA

Aktuelle Alternative:
Second Source in Suedkorea, technisch noch nicht voll qualifiziert.

Risiko:
Lieferzeit +6 Wochen, Engineering-Freigabe offen.

Naechste Aktion:
Engineering-Freigabe klaeren und kommerzielle Alternative bewerten.
```

Aktionen:

- Bearbeiten
- Mit KI schaerfen
- Als geklaert markieren
- Offene Frage erfassen

## 7. Grafische Darstellung des Weges zur Strategie

### 7.1 Guided Journey

Der Weg zur Strategie sollte als gefuehrte Journey sichtbar sein.

Moegliche Stationen:

```text
Projekt verstehen -> Daten pruefen -> Analyse schaerfen -> Strategie bauen -> Briefing vorbereiten -> Simulation vorbereiten -> Review
```

Diese Journey kann horizontal, vertikal oder als kompakte Workflow-Leiste dargestellt werden.

### 7.2 Stepper statt reiner Navigation

Die bestehende Sidebar bleibt fuer globale Navigation sinnvoll. Zusaetzlich sollte es innerhalb eines Projekts eine kontextuelle Schrittanzeige geben.

Beispiel:

```text
1 Kontext   2 Analyse   3 Strategie   4 Briefing   5 Simulation   6 Review
```

Jeder Schritt hat einen Zustand:

- nicht begonnen
- in Arbeit
- vorbereitet
- bereit
- abgeschlossen

### 7.3 Fokusmodus pro Schritt

Eine spaetere UX-Variante kann staerker auf Fokusmodus setzen.

Prinzip:

- ein zentraler Schritt im Mittelpunkt
- wenige Nebeninformationen
- vorheriger und naechster Schritt sichtbar
- klare Primaeraktion
- Hilfen nur bei Bedarf

Das eignet sich besonders fuer:

- Strategy Board
- Briefing Preparation
- AI-assisted Strategy Coaching
- Simulation Preparation

## 8. Gefuehrte Strategieentwicklung mit KI als UX-Zielbild

D11 beschreibt den AI-assisted Strategy Coach als spaeteren Zielblock. Das Visual Design sollte diesen Modus frueh mitdenken.

Der spaetere Dialog darf nicht wie ein beliebiger Chat wirken. Er sollte eine gefuehrte Strategie-Session sein.

Moegliche Aufteilung:

- links: Journey / Strategiebausteine
- mitte: Dialog mit KI-Coach
- rechts: Daten- und Quellenkontext oder aktuelle Strategie-Summary

Wichtig:

- Der Nutzer sieht jederzeit, welcher Baustein gerade bearbeitet wird.
- KI-Vorschlaege werden als Vorschlag, Hypothese oder datenbasierte Ableitung markiert.
- Bestaetigte Punkte wandern sichtbar in die Strategie.
- Nicht bestaetigte KI-Aussagen werden nicht als Fakten gespeichert.
- Lernchecks koennen als eigene kleine Karten erscheinen.

## 9. Moegliche Schluesselscreens fuer erste Mockups

### 9.1 Strategy Overview / Strategy Board

Prioritaet hoch.

Warum:

- zentraler fachlicher Nutzen
- aktuell besonders ueberladungsgefaehrdet
- gute Grundlage fuer spaetere D11-Logik
- ideal fuer Summary-first und Progressive Disclosure

Zu klaeren im Mockup:

- Wie sieht die Executive Summary aus?
- Wie viele Strategie-Karten sind sichtbar?
- Wo steht der Readiness-Zustand?
- Wo wird die naechste Aktion angezeigt?
- Wie werden Details geoeffnet?
- Wie stark ist die KI-Aktion sichtbar?

### 9.2 Guided Workflow / Getting Started

Prioritaet mittel bis hoch.

Warum:

- wichtig fuer Testnutzer
- verbindet D10 User Onboarding mit Produktnavigation
- macht den Gesamtprozess sichtbar

Zu klaeren im Mockup:

- Workflow-Leiste oder Journey Map?
- Demo-Testpfad sichtbar?
- Welche Schritte sind im MVP aktiv, welche spaeter?
- Wie werden nicht implementierte KI-Funktionen ruhig abgegrenzt?

### 9.3 Guided Strategy Coaching Screen

Prioritaet spaeter hoch.

Warum:

- wichtig fuer D11
- zentrale Differenzierung des Produkts
- verbindet Lernen, Strategie und RAG-/Datenkontext

Zu klaeren im Mockup:

- Wie wirkt der KI-Coach als gefuehrter Arbeitsmodus statt freier Chat?
- Wo sind Datenquellen sichtbar?
- Wie werden Nutzerentscheidungen bestaetigt?
- Wie wandern bestaetigte Punkte in die Strategy?
- Wie sieht der Lerncheck aus?

## 10. Erste Low-Fidelity-Skizze: Strategy Board

```text
┌──────────────────────────────────────────────────────────────┐
│ Projekt: Precision Gearbox Negotiation                       │
│ Lieferant: Aurum Motion Systems K.K.                         │
│ Status: Strategy in Arbeit                                   │
│ Naechster Schritt: BATNA schaerfen                            │
└──────────────────────────────────────────────────────────────┘

┌───────────────┬───────────────┬───────────────┐
│ Ziele         │ ZOPA          │ BATNA         │
│ Belastbar     │ Teilweise     │ Unklar        │
│ 3 Kernziele   │ 1 Hypothese   │ 2 Optionen    │
└───────────────┴───────────────┴───────────────┘

┌───────────────┬───────────────┬───────────────┐
│ WAP           │ Konzessionen  │ Argumente     │
│ Fehlt         │ Gut           │ Gut           │
│ Preisgrenze   │ 4 Tauschobj.  │ 5 Linien      │
└───────────────┴───────────────┴───────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Fokusbereich: BATNA                                          │
│                                                              │
│ Aktuelle Alternative: Second Source in Suedkorea             │
│ Risiko: Lieferzeit +6 Wochen                                 │
│ Noch zu klaeren: Engineering-Freigabe                         │
│                                                              │
│ [BATNA bearbeiten]   [Mit KI schaerfen]                      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Naechste sinnvolle Schritte                                  │
│ 1. BATNA konkretisieren                                      │
│ 2. WAP festlegen                                             │
│ 3. Briefing vorbereiten                                      │
└──────────────────────────────────────────────────────────────┘
```

## 11. Visual Direction

### 11.1 Layout

- breite, ruhige Arbeitsflaeche
- klare Seitenkopfzone
- Kartenraster fuer Uebersicht
- Fokusbereich fuer aktive Arbeit
- optional rechte Kontextspalte fuer Quellen, Notizen oder naechste Schritte

### 11.2 Farben

- neutrale Basis
- eine ruhige Primaerfarbe
- sparsame Statusfarben
- keine uebermaessige Ampellogik
- Warnungen nur dort, wo fachlich noetig

### 11.3 Typografie

- kurze Ueberschriften
- gut scanbare Labels
- keine langen Fliesstextbloecke im Standardzustand
- Kernaussagen als kurze Saetze

### 11.4 Interaktion

- sanfte Expand-/Collapse-Muster
- klare Hover- und Active-States
- positive Rueckmeldung nach Fortschritt
- keine modalen Unterbrechungen ohne Notwendigkeit
- Tastatur- und Mobile-Nutzbarkeit spaeter mitdenken

## 12. Spaetere Dokumentationserweiterungen

Dieses Dokument kann spaeter erweitert werden um:

- konkrete Wireframes
- visuelle Mockups
- Design Tokens
- Farb- und Typografieentscheidungen
- Komponentenprinzipien
- Accessibility-Regeln
- Responsive-Verhalten
- konkrete UI-Issues fuer Strategy Board, Getting Started und AI Strategy Coach

## 13. Nicht-Ziele dieses Dokuments

Dieses Dokument ist kein Umsetzungsauftrag.

Nicht Bestandteil:

- keine Frontend-Implementierung
- keine Komponentenentwicklung
- keine Routenanpassung
- keine CSS-/Tailwind-Aenderung
- keine Design-System-Migration
- keine Backend-Aenderung
- keine Datenmodell-Aenderung
- kein Issue-Scope fuer Codex

Es dient ausschliesslich dazu, die spaetere Designrichtung konzeptionell festzuhalten.
