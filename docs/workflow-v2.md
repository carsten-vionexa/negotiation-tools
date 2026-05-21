# Workflow v2 fuer das Negotiation Tool

## 1. Ziel und Einordnung

Dieses Dokument ist das aktualisierte fachliche Hauptkonzept fuer das Negotiation Tool. Es baut auf dem urspruenglichen Workflow-Konzept auf und erweitert es um die Anforderungen aus dem Kick-off: Bestandslieferanten, Ausschreibung und Angebotsvergleich, Stakeholder-Freitext, Hypothesenbildung, parallele Projekte und spaeteres Relationship Memory.

Das Dokument ist keine technische Detailreferenz. Das technische Datenmodell wird in `docs/data-model.md` gepflegt. Screen-Details liegen in `docs/screen-by-screen-concept.md`. Die technische Architektur wird in `docs/technical-architecture.md` beschrieben. Dieses Dokument beschreibt den fachlichen Gesamtprozess und dient als Referenz fuer Produktentscheidungen, MVP-Scope und spaetere Codex-Aufgaben.

## 2. Leitidee

Das Tool ist kein freier Chatbot, sondern ein workflowbasiertes Verhandlungs-Cockpit. Es soll Unternehmensdaten, Marktdaten, Einkaufshistorie, Lieferanteninformationen, Stakeholderwissen, Persoenlichkeitsprofile und kulturellen Kontext in konkrete, trainierbare und operativ nutzbare Verhandlungsstrategien uebersetzen.

Die zentrale Leitfrage lautet:

> Wie uebersetzen wir Unternehmensdaten, Marktdaten, Lieferantenhistorie, Stakeholderwissen, Persoenlichkeitsprofile und kulturellen Kontext in eine konkrete, trainierbare und spaeter operativ nutzbare Verhandlungsstrategie?

Der urspruengliche Fokus lag auf Verhandlungstraining, KI-Simulation, Auswertung und Lerntransfer. Die neue Ausrichtung erweitert dieses Zielbild in Richtung Procurement Negotiation Intelligence Platform.

## 3. Zielbild

Das Tool verbindet drei Welten:

| Bereich | Ziel |
|---|---|
| Procurement | reale Einkaufs- und Lieferantenprozesse verstehen und vorbereiten |
| Negotiation | strukturierte Strategie, ZOPA, BATNA, WAP, Konzessionen und Argumente entwickeln |
| Training & Learning | Simulation, Feedback, Trainerreview und Lerntransfer ermoeglichen |

Damit entsteht ein System, das sowohl fuer Trainingsfaelle als auch spaeter fuer reale Einkaufsverhandlungen nutzbar ist.

## 4. Grundlogik des Systems

Der Nutzer soll nicht unstrukturiert prompten, sondern durch einen klaren Prozess gefuehrt werden. Gute Verhandlungsvorbereitung verlangt eine systematische Trennung von:

- Ausgangslage
- Fakten
- Annahmen
- Hypothesen
- Interessen
- Optionen
- Alternativen
- Machtverhaeltnissen
- technischen Abhaengigkeiten
- kommerziellen Zwaengen
- Stakeholderdynamik
- kulturellem Kontext
- Gespraechsverhalten
- Lernzielen

Der bisherige Kernworkflow lautete:

| Schritt | Beschreibung |
|---|---|
| 1 | Firma beziehungsweise Mandant anlegen |
| 2 | Nutzer- oder Rollenprofil anlegen |
| 3 | Verhandlungsprojekt anlegen |
| 4 | Datenbasis auswerten |
| 5 | Strategie entwickeln |
| 6 | Interkulturelles Briefing erzeugen |
| 7 | KI-Simulation durchfuehren |
| 8 | Auswertung und Lerntransfer dokumentieren |

Der erweiterte Workflow v2 lautet:

| Schritt | Beschreibung |
|---|---|
| 1 | Business Context / Unternehmen verstehen |
| 2 | Datenbasis und Knowledge Base aufbauen |
| 3 | Trainee- oder Rollenprofil anlegen |
| 4 | Lieferantenlandschaft und Bestandsbeziehungen pruefen |
| 5 | Bedarf, RFQ oder Verhandlungsprojekt anlegen |
| 6 | Angebotsvergleich und TCO-Betrachtung vorbereiten |
| 7 | Stakeholder und interne Interessen erfassen |
| 8 | Hypothesen zur Gegenseite und Situation bilden |
| 9 | Verhandlungsanalyse durchfuehren |
| 10 | Strategie entwickeln |
| 11 | Kultur- und Rollenbriefing erzeugen |
| 12 | Simulation oder reale Verhandlung vorbereiten |
| 13 | Auswertung, Trainerreview und Lerntransfer dokumentieren |
| 14 | Relationship Memory und organisationale Wissensbasis aktualisieren |

## 5. Nutzenebenen

### 5.1 Strukturierte Vorbereitung

Das Tool unterstuetzt Nutzer dabei, Verhandlungen nicht spontan, sondern systematisch vorzubereiten:

- Was ist der Verhandlungsgegenstand?
- Wer ist die Gegenseite?
- Was ist unser Ziel?
- Wo liegt unser Walk-away Point?
- Welche Alternativen haben wir?
- Welche Informationen fehlen?
- Welche Stakeholder muessen eingebunden werden?
- Welche Risiken bestehen?

### 5.2 Strategieentwicklung

Das Tool verdichtet Daten und Einschaetzungen in eine belastbare Strategie:

- Zielbild
- ZOPA
- BATNA
- WAP
- Argumentationslinien
- Konzessionslogik
- Paketbildung
- Eskalationspfad
- Verhandlungsagenda
- Kommunikationsstrategie

### 5.3 Training und Simulation

Das Tool kann Verhandlungssituationen simulieren und auswerten:

- Rollenkonfiguration
- Schwierigkeitsgrad
- Gespraechsphase
- kultureller Kontext
- taktisches Verhalten der Gegenseite
- Feedback
- Lernpunkte
- Trainerkommentar

### 5.4 Procurement Intelligence

Perspektivisch unterstuetzt das Tool reale Einkaufsprozesse:

- Bestandslieferanten
- Lieferantenhistorie
- Ausschreibungen
- Angebotsvergleiche
- Risikobewertungen
- Vertrags- und Beziehungshistorie
- institutionelles Wissen
- wiederverwendbare Verhandlungsstrategien

## 6. Zentrale fachliche Objekte

| Objekt | Funktion im System |
|---|---|
| Company / Mandant | Unternehmenskontext, Branche, Maerkte, Strategie, typische Verhandlungssituationen |
| UserProfile / Trainee | Personalisierung von Vorbereitung, Simulation und Feedback |
| Knowledge Base | Ablage und Auswertung von Firmenprofil, Branchenreport, Einkaufshistorie, Anfragenkatalog und spaeter weiteren Quellen |
| RequestItem | aktueller Bedarf oder Anfrageposition |
| ProcurementHistoryItem | historische Einkaufsdaten als Preis-, Lieferanten- und Musterbasis |
| SupplierProfile | Gegenseite, Macht, Interessen, Kultur, Risiken, Taktiken |
| NegotiationProject | konkrete operative Verhandlung mit Artikel, Lieferant, Zielen und Rahmenbedingungen |
| Strategy | ZOPA, BATNA, WAP, Ziele, Argumente, Konzessionen und Optionen |
| SimulationScenario | Rolle, Land, Schwierigkeitsgrad, Gespraechsphase, Konfliktintensitaet |
| SimulationMessage | Dialogverlauf einer Simulation |
| SimulationResult | Ergebnis, Scores, Feedback, Lernpunkte |
| TrainerComment | menschliches Feedback, Freigabe, didaktische Einordnung |
| KnowledgeClaim | extrahierte Aussage mit Evidenz, Quelle, Confidence und Informationsart |
| ImportJob / ImportRow | strukturierter Importprozess fuer Excel-/CSV- und spaetere Datenquellen |

Spaeter denkbare, noch nicht implementierte Objekte:

- `RFQ`
- `SupplierBid`
- `BidComparison`
- `ProjectParticipant`
- `StakeholderNote`
- `NegotiationRound`
- `SupplierRelationshipHistory`
- `RelationshipMemoryItem`
- `CulturalBriefing`

Diese Objekte sind fachliche Kandidaten, aber keine automatische Umsetzungsentscheidung.

## 7. Workflow-Phasen im Detail

### 7.1 Unternehmen / Mandant anlegen

Ziel ist, dass das Tool die strategische Ausgangslage versteht. Es geht nicht nur um Stammdaten, sondern um Verhandlungsrelevanz.

| Feld | Beschreibung |
|---|---|
| Unternehmensname | Name des Kunden oder Mandanten |
| Branche | z. B. Robotik, Automotive, Pharma, Maschinenbau |
| Rolle in Verhandlungen | Kaeufer, Verkaeufer, Partner oder Mischrolle |
| Kernprodukte | relevante Produkte und Dienstleistungen |
| Maerkte | Laender und Regionen |
| Hauptdruck | Kosten, Wachstum, Lieferfaehigkeit, Marge, Risiko |
| Verhandlungsstil | sachlich, hart, beziehungsorientiert, analytisch |
| Kritische Warengruppen | z. B. Getriebe, Sensorik, Software, Steuerungen |
| Interne Stakeholder | Einkauf, Technik, Legal, Finance, Vertrieb, Qualitaet |
| Strategische Ziele | Kosten senken, Risiken reduzieren, Second Source aufbauen |

KI-Funktion: Die KI erstellt daraus ein verdichtetes Firmenprofil, erkennt typische Verhandlungsthemen und schlaegt relevante Verhandlungsarten vor.

### 7.2 Datenbasis / Knowledge Base aufbauen

Die Knowledge Base ist mehr als eine Dokumentenablage. Das Tool muss daraus verhandlungsrelevante Erkenntnisse extrahieren.

| Datentyp | Inhalt | Zweck |
|---|---|---|
| Firmenprofil | Unternehmenskontext | Ausgangslage, Rolle, Marktposition |
| Branchenreport | Markt- und Lieferantenumfeld | Argumente, Risiken, Marktlogik |
| Einkaufshistorie | Preise, Lieferanten, Mengen, Bewertungen | Preisanker, Muster, Schwaechen |
| Anfragenkatalog | aktuelle Einkaufsbedarfe | konkrete Verhandlungsprojekte |
| DISC-Profil | Trainee-Verhalten | personalisiertes Training |
| Vertragsdaten | Konditionen, SLA, Laufzeiten | ZOPA, WAP, BATNA, Risiken |
| Lieferantendaten | Profile, Laender, Kultur, Macht | Simulation der Gegenseite |
| Stakeholdernotizen | interne Interessen und Einschaetzungen | politische und implizite Dynamik |
| Meeting-/Workshopnotizen | spaetere Wissensquellen | Relationship Memory, Hypothesen |
| OCR-Quellen | Fotos, Scans, Whiteboards | spaetere RAG-/Knowledge-Erweiterung |

KI-Funktion: Die KI extrahiert Aussagen, trennt Fakten von Annahmen und Hypothesen, erkennt Preisanker, Risiken und offene Fragen.

### 7.3 Trainee / Rollenprofil anlegen

Das Trainee-Profil macht das Tool zu einem echten Trainingssystem. Es analysiert nicht nur die Verhandlung, sondern auch den Verhandler.

| Feld | Beschreibung |
|---|---|
| Name | Name des Trainees |
| Funktion | z. B. strategischer Einkaeufer |
| Erfahrung | Anfaenger, fortgeschritten, senior |
| Verhandlungsrolle | Lead Negotiator, Beobachter, Fachexperte, Trainer |
| Persoenlichkeitsprofil | DISC, optional Big Five oder Selbsteinschaetzung |
| Trainingsziele | Durchsetzung, Fragetechnik, Closing, Druckmanagement |
| Bekannte Schwaechen | z. B. zu fruehe Zugestaendnisse |
| Sprache | Deutsch, Englisch oder weitere Sprachen |
| Sichtbarkeit | Welche Profilinformationen sieht der Trainee selbst? |

Beispiel Markus Schulz: analytisch, strukturiert, ruhig und faktenorientiert. Unter Druck kann er zu vorsichtig reagieren, Zugestaendnisse zu frueh machen oder in Analyse ausweichen.

### 7.4 Lieferantenlandschaft und Relationship Context

Diese Phase ist in v2 neu betont. Das Tool soll die Lieferantensituation nicht nur projektbezogen, sondern beziehungsbezogen erfassen.

| Feld | Beschreibung |
|---|---|
| Bestehender Lieferant | aktueller oder historischer Lieferant |
| Lieferantentyp | strategisch, kritisch, Standard, Second Source |
| Beziehungshistorie | fruehere Verhandlungen, Konflikte, Konditionen |
| Leistungsdaten | OTIF, Qualitaet, Reklamationen, Lieferzeiten |
| Machtposition | niedrig, mittel, hoch, sehr hoch |
| Technische Abhaengigkeit | Requalifizierungsaufwand, Lock-in, Freigaben |
| Bekannte Taktiken | Preisanker, Kapazitaetsdruck, Eskalation |
| Interne Erfahrungen | Freitext aus Einkauf, Technik, Qualitaet, Management |
| Offene Risiken | Single Source, EOL, Cyber, IP, Compliance |

KI-Funktion: Die KI kann Muster erkennen, bekannte Lieferantenargumente verdichten, Risiken priorisieren und Hypothesen zur Motivation der Gegenseite vorschlagen.

### 7.5 Verhandlungsprojekt, Bedarf oder RFQ anlegen

Das Verhandlungsprojekt ist das operative Herzstueck. Hier entsteht aus allgemeinem Unternehmenswissen eine konkrete Verhandlungssituation.

| Feld | Beschreibung |
|---|---|
| Projekttitel | z. B. Einkauf Praezisionsgetriebe HD-42 |
| Verhandlungsart | Preisverhandlung, Neuvergabe, Rahmenvertrag, Eskalation |
| Workflow-Typ | Training, echte Vorbereitung, Angebotsvergleich, Review |
| Warengruppe | z. B. Praezisionsgetriebe |
| Artikel / Leistung | technische Kurzbeschreibung |
| Menge | z. B. 600 Stueck |
| Zielregion | Japan, China, Suedkorea, USA, Europa |
| Gewuenschte Lieferzeit | z. B. 18-22 Wochen |
| Preisvorstellung | grobe interne Zielgroesse |
| Aktueller Lieferant | falls vorhanden |
| Moegliche Lieferanten | bekannte oder vorgeschlagene Optionen |
| Interne Stakeholder | Einkauf, Technik, Qualitaet, Legal |
| Projektprioritaet | niedrig, mittel, hoch, kritisch |
| Projektstatus | Entwurf, Analyse, Strategie, Simulation, Review, abgeschlossen |

KI-Funktion: Das Tool erkennt automatisch, welche Verhandlungsart vorliegt, welche Risiken bestehen, welche Informationen fehlen und welche Lieferantenmaerkte relevant sind.

### 7.6 Ausschreibung und Angebotsvergleich

Diese Phase erweitert das urspruengliche Konzept. Sie bildet den Einkaufsprozess vor der eigentlichen Verhandlung ab.

| Analysefeld | Beschreibung |
|---|---|
| RFQ-Kontext | Was wurde angefragt und warum? |
| Lieferantenliste | Welche Anbieter wurden einbezogen? |
| Angebotsstruktur | Preis, Menge, Lieferzeit, Zahlungsziel, SLA |
| Technische Vergleichbarkeit | Sind Angebote wirklich vergleichbar? |
| TCO | Einstand, Integration, Risiko, Service, EOL |
| Risiko | Qualitaet, Lieferfaehigkeit, Single Source, Compliance |
| Entscheidungslogik | Welche Kriterien sind ausschlaggebend? |
| Verhandlungsrelevanz | Welche Punkte werden in die naechste Runde genommen? |

MVP-Abgrenzung: Im MVP kann diese Phase zunaechst als einfache manuelle oder halbstrukturierte Ansicht abgebildet werden. Eine vollautomatische Angebotsauswertung ist spaeter.

### 7.7 Stakeholder und interne Interessen erfassen

Interne Stakeholder beeinflussen Verhandlungen oft massiv. Das Tool soll diese Dynamik sichtbar machen, ohne sie zu frueh in ein starres Schema zu pressen.

| Stakeholder | Typische Interessen |
|---|---|
| Einkauf | Kosten, Konditionen, Risiko, Lieferantenmacht |
| Engineering | technische Sicherheit, Spezifikation, Requalifizierung |
| Qualitaet | Lieferantenqualitaet, Audit, Prozessfaehigkeit |
| Produktion | Lieferfaehigkeit, Planbarkeit, Ramp-up |
| Legal | Haftung, IP, Vertragsrisiken |
| Finance | Budget, Savings, Cashflow |
| Management | strategische Risiken, Eskalationsfaehigkeit |
| Sales / Projektleitung | Kundenzusagen, Timing, Marge |

Freitext bleibt wichtig: Nicht alle Stakeholderinformationen sollten sofort strukturiert werden. Qualitative Notizen sind ein Kernbestandteil der Verhandlungsvorbereitung.

### 7.8 Hypothesenbildung

Das Tool soll Nutzer aktiv dabei unterstuetzen, aus Beobachtungen Hypothesen abzuleiten.

| Beobachtung | Hypothese | Pruefgegenstand |
|---|---|---|
| Lieferant fordert starke Preiserhoehung | echter Kostendruck oder Margenausbau | Kostenindizes, Open-Book, Vergleichsdaten |
| Lieferant verweist auf Kapazitaet | Engpass oder taktische Verknappung | Werksauslastung, Forecast, Lieferhistorie |
| Lieferant blockiert Second Source | Angst vor Volumenverlust | Gegenleistung, Laufzeit, Exklusivitaet |
| Lieferant verlangt lange Laufzeit | Planungssicherheit oder Lock-in | Kuendigung, Preisdeckel, Exit-Rechte |
| Interner Druck auf Abschluss | Projekttermin gefaehrdet | BATNA, Eskalationspfad, Freigaben |

Qualitaetsregel: Jede Hypothese sollte mit Confidence, Quelle und naechster Pruefaktion versehen werden.

### 7.9 Analysemodul

Das Analysemodul verknuepft Einkaufshistorie, Anfragenkatalog, Branchenreport, Firmenprofil, Trainee-Profil, Lieferantenhistorie, Stakeholdernotizen und Angebotsdaten.

| Input | Analysefrage | Output |
|---|---|---|
| Einkaufshistorie | Welche Preise wurden frueher erzielt? | Preisanker, Verbesserungspotenziale |
| Anfragenkatalog | Welche Bedarfe sind strategisch relevant? | priorisierte Verhandlungsprojekte |
| Branchenreport | Wie stark ist die Lieferantenseite? | Lieferantenmacht, Risiken, Argumente |
| Firmenprofil | Welche strategischen Zwaenge bestehen? | interne Interessen und Grenzen |
| Trainee-Profil | Welche persoenlichen Risiken sind relevant? | individuelle Trainingshinweise |
| Lieferantenhistorie | Welche Muster sind bekannt? | Relationship Memory, Taktikmuster |
| Angebotsvergleich | Wo liegen Preis- und Leistungsunterschiede? | Verhandlungshebel, Nachfragen |
| Stakeholdernotizen | Welche internen Konflikte bestehen? | Freigabe- und Eskalationsbedarf |

Typische Outputs:

- Verhandlungsrisiko
- Lieferantenmacht
- technische Abhaengigkeit
- Preisanker
- offene Fragen
- moegliche Alternativen
- persoenliche Warnhinweise
- konkrete Verhandlungshebel
- Hypothesen zur Gegenseite
- Stakeholderrisiken
- Angebotsvergleichslogik

### 7.10 Strategie-Builder

Der Strategie-Builder verwandelt Analyse in einen Plan. Er fuehrt den Nutzer durch zentrale Entscheidungen:

- Ziele
- ZOPA
- WAP
- BATNA
- Konzessionen
- Argumentationslinien
- Fragen an die Gegenseite
- Informationsluecken
- Paketlogik
- Eskalationspfad
- Abschlusslogik

Konzessionen werden als Tauschobjekte verstanden, nicht als reines Nachgeben.

### 7.11 Kultur- und Rollenbriefing

Das interkulturelle Modul soll direkt am konkreten Verhandlungsprojekt haengen. Es darf kein isolierter Theorieblock sein.

Wichtige Regel: Kulturhinweise sind Arbeitshypothesen, keine Zuschreibungen.

Beispiel: Bei japanischen Industriepartnern ist haeufig mit staerkerer interner Abstimmung, langfristiger Beziehungspflege und hoeherem Gewicht von Verlaesslichkeit zu rechnen.

### 7.12 Simulation oder reale Verhandlung

In der Simulation wird die Vorbereitung in Verhalten uebersetzt. Die KI uebernimmt die Rolle eines realistischen Verhandlungspartners. Perspektivisch kann dieselbe Struktur auch echte Verhandlungen vorbereiten und dokumentieren.

Schwierigkeitslevel:

| Level | Beschreibung |
|---|---|
| 1 - Guided Practice | KI ist kooperativ, gibt klare Hinweise, wenig Druck |
| 2 - Realistic Standard | normale Verhandlung mit Einwaenden |
| 3 - Pressure | KI nutzt Zeitdruck, Preisanker und knappe Kapazitaet |
| 4 - Tactical | KI nutzt Machtspiele, Nebelargumente und Forderungspakete |
| 5 - Executive Escalation | harte Eskalation, mehrere Interessen, wenig Spielraum |

### 7.13 Auswertung und Lerntransfer

Nach der Simulation sollte das Tool mehrere Auswertungsebenen erzeugen:

| Ebene | Bewertungskriterien |
|---|---|
| Sachliche Auswertung | Zielklarheit, Interessenklaerung, ZOPA-Nutzung, BATNA-Nutzung |
| Strategische Ebene | Konzessionen, Paketlogik, Argumentation, Abschluss |
| Verhaltensebene | Gespraechsfuehrung, Druckmanagement, Durchsetzung, Fragetechnik |
| Interkulturelle Ebene | kulturelle Sensibilitaet, Kommunikationsstil, Hierarchie, Timing |
| Persoenliches Feedback | Abgleich mit DISC-Profil, Staerken, Risiken und Entwicklungsfeldern |
| Trainerfeedback | menschliche Einordnung, Priorisierung, Lernauftrag |
| Lerntransfer | naechste Uebung, Wiederholungsaufgabe, Fokus fuer Trainerreview |
| Relationship Memory | was wurde ueber Lieferant, Stakeholder oder Taktik gelernt? |

## 8. MVP-Scope

Der MVP muss den Kernnutzen beweisen: Aus Daten und Kontext wird eine strukturierte Verhandlungsstrategie, die trainiert, ausgewertet und didaktisch reflektiert werden kann.

MVP-relevant:

- Firmenprofil-Modul
- Datenbasis-Uebersicht
- Trainee-/Rollenprofil
- Verhandlungsprojekt-Modul
- Analyse-Modul
- Strategie-Modul
- Kultur- und Rollenbriefing
- einfache Simulationskonfiguration
- Auswertung / Trainerreview
- einfache Stakeholder- und Hypothesennotizen
- einfache Lieferantenbeziehungsnotiz

Nicht MVP:

- produktives RAG
- vollautomatische Angebotsanalyse
- OCR-Pipeline
- Voice-Simulation
- komplexe Rechteverwaltung
- CRM-/ERP-Anbindung
- autonome KI-Agenten

## 9. Fachlicher Qualitaetsanspruch

Das Tool muss mehr leisten als generische Tipps. Es sollte Daten, Strategie, Verhalten und Lerntransfer verbinden.

Wichtige Qualitaetsprinzipien:

1. Fakten, Annahmen und Hypothesen trennen.
2. Kulturelle Hinweise als Arbeitshypothesen formulieren.
3. ZOPA, WAP und BATNA fachlich plausibel behandeln.
4. Konzessionen als Tauschobjekte verstehen.
5. Feedback beobachtungsnah machen.
6. Trainerfeedback integrieren.
7. Simulation konsistent halten.
8. Quellen und Confidence sichtbar machen.
9. MVP-Komplexitaet begrenzen.
10. Workflow statt Chatbot.

## 10. Beispielstrecke Rheinwerk Robotics / Markus Schulz

Beispielprojekt: Einkauf Praezisionsgetriebe HD-42.

Ausgangslage:

- kritische Komponente fuer eine Premium-Roboterachse
- bestehender japanischer Spezialanbieter
- Lieferant fordert +11 Prozent Preissteigerung
- Rheinwerk-Ziel: maximal +4 Prozent
- Konfliktpunkte: Lieferzeit, Kapazitaet, Forecast, Second Source
- technische Abhaengigkeit hoch
- Lieferantenmacht hoch
- BATNA vorhanden, aber kurzfristig schwach

Lernziel fuer Markus Schulz:

- Forderungen frueher klar formulieren
- Druck aushalten
- Preiszugestaendnisse koppeln
- nicht zu frueh harmonisieren
- Alternativen sachlich sichtbar machen, ohne Beziehung zu destabilisieren

## 11. Offene Produktentscheidungen

- Ist der MVP primaer trainergefuehrt oder trainee-self-service?
- Welche Screens sind zwingend?
- Welche Informationen bleiben trainerintern?
- Wann werden RFQ und Angebotsvergleich eigene Objekte?
- Wann wird StakeholderNote relational?
- Wann braucht es ProjectParticipant?
- Wann wird Relationship Memory implementiert?
- Wird CulturalBriefing ein eigenes Objekt oder bleibt es zunaechst Teil von Strategy/Scenario?
- Welche KI-Ausgaben muessen belegbar sein?
- Welche Bereiche bleiben manuell?
- Chat zuerst oder Voice spaeter?

## 12. Naechste Schritte

1. Dieses Dokument als fachliche Basis verwenden.
2. `docs/screen-by-screen-concept.md` gegen die Kick-off-Erweiterungen pruefen.
3. MVP-Screens priorisieren.
4. Danach konkrete Frontend- und API-Arbeitspakete definieren.
5. RAG, Embeddings, OCR und produktive Simulation erst nach fachlicher MVP-Schaerfung vertiefen.
