# Procurement Process Concept

## 1. Ziel und Einordnung

Dieses Dokument buendelt die fachlichen Erweiterungen aus dem Kick-off, die ueber das urspruengliche Verhandlungstraining hinausgehen. Es beschreibt, wie reale Einkaufsprozesse, Bestandslieferanten, Ausschreibungen, Angebotsvergleiche, Stakeholderwissen und Hypothesenbildung im Negotiation Tool beruecksichtigt werden sollen.

Es ersetzt nicht `docs/workflow-v2.md`, sondern vertieft den Procurement-Teil des Gesamtworkflows. Technische Modellentscheidungen bleiben in `docs/data-model.md`. Screen-Details bleiben in `docs/screen-by-screen-concept.md`.

## 2. Warum dieser Baustein wichtig ist

Professionelle Verhandlungsfuehrung im Einkauf beginnt selten erst im Gespraech mit dem Lieferanten. Sie beginnt deutlich frueher:

```text
Bedarf
→ Lieferantenlandschaft
→ RFQ / Ausschreibung
→ Angebotsvergleich
→ interne Stakeholderklaerung
→ Hypothesenbildung
→ Verhandlungsanalyse
→ Strategie
→ Verhandlung
→ Review
→ Relationship Memory
```

Damit das Tool realistisch nutzbar wird, muss es diese Einkaufslogik zumindest fachlich abbilden.

## 3. Bestandslieferanten und Lieferantenbeziehungen

Das Tool soll nicht nur neue Lieferanten oder Ausschreibungen unterstuetzen, sondern auch reale Bestandslieferanten und laufende Geschaeftsbeziehungen abbilden.

Typische Situationen:

- Preiserhoehungen
- Vertragsverlaengerungen
- Kapazitaetsdiskussionen
- Lieferverzoegerungen
- Eskalationen
- Qualitaetsprobleme
- Software-Subscription-Umstellungen
- Diskussionen ueber Exklusivitaet oder Second Source

Wichtige Fragen:

- Welche Historie gibt es mit diesem Lieferanten?
- Welche Konditionen wurden frueher verhandelt?
- Welche Konflikte gab es?
- Welche Argumentationsmuster nutzt der Lieferant?
- Welche internen Stakeholder haben Erfahrungen mit dem Lieferanten?
- Wie hat sich das Machtverhaeltnis veraendert?

## 4. Lieferantenlandschaft

Die Lieferantenlandschaft beschreibt nicht nur einzelne Lieferanten, sondern deren Rolle im Sourcing-Kontext.

| Dimension | Beispiel |
|---|---|
| Lieferantentyp | strategisch, kritisch, Standard, Second Source, potenzieller Alternativlieferant |
| Beziehung | neu, bestehend, belastet, partnerschaftlich, eskaliert |
| Abhaengigkeit | niedrig, mittel, hoch, sehr hoch |
| Technische Kritikalitaet | Requalifizierung, Safety, Software, Freigaben |
| Kommerzielle Relevanz | Spend, Volumen, Preisentwicklung |
| Lieferperformance | OTIF, Lead Time, Reklamationen |
| Machtposition | Lieferantenmacht, Alternativen, Lock-in |

## 5. RFQ, Ausschreibung und Angebotsvergleich

Ein wichtiger neuer Schwerpunkt ist die Abbildung von Ausschreibungen und Angebotsvergleichen.

Der Angebotsvergleich sollte nicht nur Preise vergleichen, sondern echte Verhandlungsrelevanz erzeugen.

| Bereich | Relevante Fragen |
|---|---|
| Preis | Welches Angebot ist guenstig, welches nur scheinbar guenstig? |
| Lieferzeit | Wer kann rechtzeitig liefern? |
| TCO | Welche Integrations-, Service-, Risiko- und EOL-Kosten entstehen? |
| Technik | Sind die Angebote wirklich vergleichbar? |
| Risiko | Welche Lieferanten- oder Laenderrisiken bestehen? |
| Vertragslogik | Welche Zahlungs-, SLA-, IP-, Audit- oder Exit-Klauseln sind kritisch? |
| Strategie | Welche Punkte gehen in die Verhandlung? |

MVP-Abgrenzung:

- Im MVP reicht eine einfache manuelle oder halbstrukturierte Erfassung.
- Keine vollautomatische Angebotsanalyse.
- Keine komplexe RFQ-Plattform.
- Keine Lieferantenportale.

Spaeter denkbare Fachobjekte:

- `RFQ`
- `SupplierBid`
- `BidComparison`
- `BidEvaluationCriterion`

## 6. Stakeholderanalyse mit Freitext

Stakeholderinformationen sind haeufig implizit, politisch oder subjektiv. Sie sollten deshalb nicht zu frueh uebermodelliert werden.

Beispiele fuer relevante Notizen:

- Werkleitung will keine Lieferunterbrechung riskieren.
- Engineering blockiert Requalifizierung wegen Aufwand.
- Qualitaet hat schlechte Erfahrungen mit Alternativlieferant.
- CFO erwartet kurzfristige Savings.
- Lieferant eskaliert schnell ins Management.
- Bisheriger Einkaeufer hatte sehr gute persoenliche Beziehung zur Gegenseite.

Empfohlene einfache Struktur:

| Feld | Bedeutung |
|---|---|
| Stakeholder | Person oder Bereich |
| Rolle | Entscheider, Einflussnehmer, Betroffener, Blockierer |
| Interesse | Was ist dieser Person wichtig? |
| Haltung | unterstuetzend, neutral, kritisch, unklar |
| Einfluss | niedrig, mittel, hoch |
| Notiz | Freitext |
| Quelle | Wer sagt das? |
| Confidence | niedrig, mittel, hoch, unbekannt |
| Sichtbarkeit | trainerintern, teamintern, trainee-sichtbar |

Spaeter denkbare Fachobjekte:

- `StakeholderNote`
- `InternalInterest`
- `EscalationContext`
- `DecisionInfluence`

## 7. Hypothesenbildung

Hypothesenbildung ist ein Kernbestandteil professioneller Verhandlungsvorbereitung.

Die Leitfrage lautet:

> Warum fordert die Gegenseite das?

Beispiele:

| Beobachtung | Hypothese | Pruefaktion |
|---|---|---|
| Lieferant fordert +11 Prozent | echte Kostensteigerung | Indexdaten, Cost Breakdown, Zeitraum pruefen |
| Lieferant fordert +11 Prozent | taktischer Anker | Marktpreise, Alternativangebote, historische Marge pruefen |
| Lieferant verweist auf Kapazitaet | realer Engpass | Lieferhistorie, Werksauslastung, Forecast-Gespraech |
| Lieferant blockiert Second Source | Angst vor Volumenverlust | Laufzeit-/Volumenpaket anbieten |
| Lieferant setzt kurze Frist | taktischer Zeitdruck | interne Deadline und BATNA klaeren |
| Engineering blockiert Alternative | Requalifizierungsaufwand | Aufwand, Risiko und Zeitplan quantifizieren |

Qualitaetsregeln:

- Hypothesen duerfen nicht als Fakten dargestellt werden.
- Jede Hypothese sollte eine Confidence haben.
- Jede relevante Hypothese sollte eine Pruefaktion bekommen.
- Hypothesen muessen in die Strategie uebersetzt werden.

## 8. Relationship Memory

Relationship Memory ist eine spaetere Wissensschicht. Ziel ist, organisationales Verhandlungswissen zu sichern.

Typische Inhalte:

- fruehere Verhandlungen
- bekannte Lieferantentaktiken
- Eskalationsmuster
- erfolgreiche Gegenargumente
- interne Stakeholdererfahrungen
- kulturelle und persoenliche Beobachtungen
- Entscheidungshistorie
- Konditionsentwicklung

Leitfragen:

- Was wissen wir ueber diesen Lieferanten?
- Was hat frueher funktioniert?
- Was ist gescheitert?
- Welche Zusagen wurden gemacht?
- Welche Risiken wurden erkannt?
- Welche Hypothesen haben sich bestaetigt?

MVP-Abgrenzung:

- Im MVP maximal einfache Beziehungsnotizen.
- Kein vollstaendiges Relationship-Memory-Modell.
- Keine automatische Extraktion aus allen Dokumenten.

## 9. OCR und handschriftliche Notizen

Langfristig sollen auch visuelle oder unstrukturierte Quellen nutzbar werden:

- Workshop-Notizen
- Whiteboards
- handschriftliche Verhandlungsnotizen
- Fotos
- PDFs
- Flipcharts
- Meeting-Mitschriften

Dies ist nicht MVP. Es bestaetigt aber die Bedeutung von:

- Datei-Metadaten
- KnowledgeDocument
- DocumentChunk
- KnowledgeClaim
- spaeterer OCR- und RAG-Faehigkeit

## 10. Verbindung zum bestehenden Datenmodell

Bereits vorhandene Modelle, die diesen Procurement-Workflow teilweise tragen:

- `Company`
- `SupplierProfile`
- `NegotiationProject`
- `ProcurementHistoryItem`
- `RequestItem`
- `KnowledgeDocument`
- `KnowledgeClaim`
- `Strategy`
- `ZopaItem`
- `BatnaOption`
- `ConcessionItem`
- `ArgumentationLine`

Noch nicht implementierte, aber fachlich relevante Kandidaten:

- `RFQ`
- `SupplierBid`
- `BidComparison`
- `ProjectParticipant`
- `StakeholderNote`
- `NegotiationRound`
- `SupplierRelationshipHistory`
- `RelationshipMemoryItem`

Diese Kandidaten sollen erst nach MVP-Scope-Entscheidung umgesetzt werden.

## 11. Konsequenz fuer den MVP

Der MVP sollte die neuen Procurement-Anforderungen beruecksichtigen, aber nur reduziert umsetzen.

MVP-relevant:

- bestehender Lieferant im Projektkontext
- einfache Lieferantenbeziehungsnotiz
- einfache Stakeholdernotiz
- einfache Hypothesenliste
- Analyse unterscheidet Fakten, Annahmen und Hypothesen
- Strategie kann Hypothesen und offene Fragen beruecksichtigen

Nicht MVP:

- vollstaendige RFQ-Engine
- automatischer Angebotsvergleich
- OCR
- Relationship Memory als eigenes Modul
- komplexe Stakeholder-Graphen
- Rechte- und Freigabesystem fuer alle Stakeholder

## 12. Naechste Schritte

1. `docs/screen-by-screen-concept.md` gegen diese Anforderungen pruefen.
2. Entscheiden, welche neuen Screens oder Screen-Erweiterungen MVP-relevant sind.
3. Noch keine neuen Datenmodelle implementieren, bevor der MVP-Screen-Scope klar ist.
4. Danach gezielte Issues fuer Stakeholdernotizen, Hypothesen oder RFQ/Angebotsvergleich erstellen.
