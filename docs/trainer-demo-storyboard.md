# Trainer-Demo-Storyboard fuer den gefuehrten Tool-Ablauf

## 1. Ziel des Storyboards

Dieses Storyboard dient als Gespraechs- und Demonstrationsgrundlage fuer Trainer, Coaches und fachliche Stakeholder. Es uebersetzt das Screen-by-Screen-Konzept in eine konkrete, erzaehlbare Demo-Strecke: Eine Trainerin oder ein Trainer kann damit zeigen, wie ein Trainee durch Vorbereitung, Analyse, Strategie, Simulation, Auswertung und Lerntransfer gefuehrt wird.

Das Dokument ist kein technisches Konzept und keine UI-Spezifikation. Es definiert keine Frontend-Komponenten, keine Wireframes als Code, keine API-Endpunkte, keine Datenbankmodelle, keine Migrationen, keine Services und keine produktive KI- oder RAG-Logik. Es beschreibt stattdessen, welche fachliche Geschichte in einer Demo erzaehlt werden kann und welche Fragen im Trainergespraech geklaert werden sollten.

Der Bezugspunkt ist `docs/screen-by-screen-concept.md`. Dort sind Screens, Rollen, Backend-Objekte, MVP-Abgrenzungen und offene Produktentscheidungen strukturiert beschrieben. Dieses Storyboard macht daraus eine beispielhafte Demo-Reise mit konkreten Inhalten fuer Rheinwerk Robotics und Markus Schulz.

## 2. Demo-Ausgangslage

Die Demo nutzt eine fiktive, aber plausible Trainingsstrecke aus dem vorhandenen Rheinwerk-Kontext.

| Element | Demo-Festlegung |
|---|---|
| Kunde | Rheinwerk Robotics GmbH |
| Trainee | Markus Schulz |
| Rolle | Strategischer Einkaeufer und angehender Einkaufsleiter |
| Trainingsziel | Bessere Vorbereitung, klare Forderungen, Druck aushalten, Konzessionen koppeln |
| Verhandlungsprojekt | Einkauf einer kritischen Robotikkomponente: Praezisionsgetriebe HD-42 |
| Lieferant | Internationaler Spezialanbieter aus Japan fuer Praezisionsgetriebe / Harmonic Drives |
| Simulationsziel | Preisrunde, Lieferzeit, Kapazitaetszusage und Second-Source-Aufbau verhandeln |

Die Ausgangslage ist bewusst anspruchsvoll: Rheinwerk braucht das HD-42 fuer eine Premium-Roboterachse. Der Lieferant fordert eine Preiserhoehung, verweist auf hohe Auslastung und knappe Kapazitaeten. Markus soll lernen, nicht nur ueber Preis zu sprechen, sondern Forderungen, Gegenleistungen und Risikoabsicherung sauber miteinander zu verbinden.

## 3. Kurzer Nutzen-Pitch fuer Trainer

Das Tool wird als workflowbasiertes Verhandlungs-Cockpit gezeigt, nicht als freier Chatbot. Der Trainee beginnt nicht mit einer leeren Eingabezeile, sondern wird durch einen didaktisch sinnvollen Ablauf gefuehrt.

Aus Unternehmensdaten, Trainingsprofil und Projektkontext entsteht ein konkreter Verhandlungsfall: Wer ist Rheinwerk, welche Rolle hat Markus, welche Komponente ist kritisch, welche Lieferantenmacht liegt vor und wo sind noch Datenluecken?

Aus der Analyse entsteht eine strukturierte Strategie. Zielwerte, Walk-away-Grenzen, BATNA, Konzessionen und Argumentationslinien werden nicht als lose Notizen behandelt, sondern als pruefbare Bausteine. Damit kann der Trainer sehen, ob Markus wirklich verhandlungsbereit ist oder nur viele Informationen gesammelt hat.

Aus der Strategie entsteht spaeter eine Simulation. In dieser Demo wird sie als Zielbild gezeigt, nicht als produktive KI-Engine. Wichtig ist die didaktische Logik: Der Trainee uebt in einem vorbereiteten Szenario, mit klarer Rolle, klarer Verhandlungssituation und beobachtbaren Erfolgskriterien.

Aus der Simulation entsteht Feedback und Lerntransfer. Der Trainer bleibt die didaktische Steuerungs- und Feedbackinstanz: Er entscheidet, welche Analyseergebnisse freigegeben werden, wo Markus eingreifendes Coaching braucht und welche Lernpunkte in die naechste Runde uebernommen werden.

## 4. Gefuehrter Demo-Ablauf

### 1. Dashboard oeffnen

**Was der Trainer zeigt:** Eine Uebersicht mit laufenden Trainingsfaellen, offenen Reviews und dem naechsten empfohlenen Schritt fuer Markus Schulz.

**Was der Trainee sieht oder tut:** Markus sieht, dass fuer ihn ein aktives Projekt "Praezisionsgetriebe HD-42" vorbereitet ist und dass der Workflow bei der Analyse startet.

**Fachliche Botschaft:** Das Tool gibt Orientierung. Es ersetzt nicht den Trainer, verhindert aber, dass Vorbereitung, Strategie und Feedback in getrennten Dokumenten auseinanderfallen.

**Trainerfrage im Gespraech:** Welche Einstiegssicht brauchst du als Trainer zuerst: offene Trainee-Aufgaben, offene Trainerreviews oder aktive Kundenprojekte?

### 2. Rheinwerk Robotics auswaehlen

**Was der Trainer zeigt:** Das Firmenprofil mit Branche, Marktposition, Einkaufsschwerpunkten und kritischen Warengruppen.

**Was der Trainee sieht oder tut:** Markus liest eine kurze Einordnung: Rheinwerk ist ein mittelstaendischer Premiumanbieter fuer Robotik und Automation mit hoher Abhaengigkeit von Praezisionsmotion, Elektronik und Software.

**Fachliche Botschaft:** Die Verhandlung wird nicht isoliert betrachtet. Der Unternehmenskontext erklaert, warum Lieferfaehigkeit, TCO, Qualitaet und Abhaengigkeitsreduktion gleichzeitig wichtig sind.

**Trainerfrage im Gespraech:** Welche Firmeninformationen muessen fuer ein Training sichtbar sein, und welche gehoeren nur in trainerinterne Vorbereitung?

### 3. Trainee Markus Schulz oeffnen

**Was der Trainer zeigt:** Das Rollen- und Lernprofil von Markus: strategischer Einkaeufer, analytisch, ruhig, sehr gewissenhaft, mit Entwicklungsfeld Durchsetzungsstaerke.

**Was der Trainee sieht oder tut:** Markus sieht seine Trainingsziele: Forderungen klarer formulieren, Drucksituationen steuern, Zugestaendnisse koppeln und staerker priorisieren.

**Fachliche Botschaft:** Die Demo ist nicht nur ein Lieferantenfall, sondern ein personalisiertes Lernsetting. Dasselbe Projekt koennte fuer einen anderen Trainee andere Schwerpunkte haben.

**Trainerfrage im Gespraech:** Welche Profilinformationen darf ein Trainee selbst sehen, und welche Beobachtungen bleiben als Trainerhypothese intern?

### 4. Verhandlungsprojekt auswaehlen

**Was der Trainer zeigt:** Das Projektbriefing "Praezisionsgetriebe HD-42": kritische Komponente, japanischer Spezialanbieter, Preiserhoehung, Lieferzeitdruck, begrenzte Second Source.

**Was der Trainee sieht oder tut:** Markus prueft Ziel, Rahmenbedingungen, Verhandlungsgegenstaende und offene Vorbereitungsfragen.

**Fachliche Botschaft:** Ein guter Trainingsfall braucht einen klaren Verhandlungsgegenstand. Preis, Lieferzeit, Kapazitaet und Second Source werden als verknuepfte Interessen sichtbar.

**Trainerfrage im Gespraech:** Ist der Fall konkret genug, damit ein Trainee daraus eine belastbare Strategie entwickeln kann?

### 5. Analyseansicht besprechen

**Was der Trainer zeigt:** Eine strukturierte Analyse mit Risiko, Lieferantenmacht, Preisanker, Abhaengigkeiten, Datenqualitaet und offenen Fragen.

**Was der Trainee sieht oder tut:** Markus erkennt, dass die Lieferantenmacht hoch ist, weil Qualifikation und Wechselkosten stark wirken. Gleichzeitig sieht er moegliche Hebel: Forecast-Qualitaet, Laufzeit, technische Workshops, Kapazitaetsplanung und Second-Source-Roadmap.

**Fachliche Botschaft:** Analyse ist keine fertige Wahrheit. Fakten, Annahmen und Hypothesen muessen getrennt werden, damit Markus nicht mit Scheinsicherheit verhandelt.

**Trainerfrage im Gespraech:** Welche Analyseergebnisse muessen von dir freigegeben werden, bevor Markus sie in der Simulation nutzt?

### 6. Strategie-Builder durchgehen

**Was der Trainer zeigt:** Strategiebausteine fuer Zielbild, ZOPA, Walk-away Point, BATNA, Konzessionen und Argumentationslinien.

**Was der Trainee sieht oder tut:** Markus formuliert seine Forderungen und prueft, welche Zugestaendnisse nur gegen Gegenleistungen angeboten werden duerfen.

**Fachliche Botschaft:** Die Strategie macht aus Analyse Handlungsfaehigkeit. Markus soll nicht nur verstehen, warum der Lieferant stark ist, sondern welche Tauschangebote und Grenzen daraus folgen.

**Trainerfrage im Gespraech:** Ist die Strategie-Logik didaktisch nachvollziehbar, oder braucht Markus vor der Simulation eine einfachere Ansicht?

### 7. Kultur- und Rollenbriefing nutzen

**Was der Trainer zeigt:** Ein vorsichtig formuliertes Rollen- und Kulturbriefing fuer den japanischen Spezialanbieter: formaler Stil, hoher Wert von Verlaesslichkeit, Planbarkeit und technischer Praezision.

**Was der Trainee sieht oder tut:** Markus nutzt das Briefing als Arbeitshypothese fuer Gespraechsfuehrung, nicht als Stereotyp. Er bereitet eine klare, respektvolle und gut belegte Argumentationslinie vor.

**Fachliche Botschaft:** Kulturhinweise sind Hypothesen, keine Zuschreibungen. Sie sollen helfen, Verhalten zu reflektieren und nicht Menschen zu kategorisieren.

**Trainerfrage im Gespraech:** Wie muss ein Kulturbriefing formuliert sein, damit es hilfreich ist und keine stereotype Abkuerzung wird?

### 8. Simulation konfigurieren

**Was der Trainer zeigt:** Die Konfiguration des Trainingsdurchlaufs: Rolle des Lieferanten, Schwierigkeit, Druckmomente, Erfolgskriterien, Sprache und Zeitlimit.

**Was der Trainee sieht oder tut:** Markus sieht ein klares Simulationsbriefing, aber nicht alle trainerinternen Eskalationspunkte.

**Fachliche Botschaft:** Die Simulation ist kein freier Chat. Sie ist ein vorbereiteter Trainingsraum mit Ziel, Rolle, Phasen und beobachtbaren Kriterien.

**Trainerfrage im Gespraech:** Welche Simulationseinstellungen brauchst du wirklich, um einen Lernfortschritt beobachten zu koennen?

### 9. Simulation durchfuehren

**Was der Trainer zeigt:** Den geplanten Simulationsverlauf als Zielscreen: Eroeffnung, Preisforderung, Druckmoment, Konzessionsangebot, Abschluss oder Vertagung.

**Was der Trainee sieht oder tut:** Markus fuehrt die Verhandlung entlang der vorbereiteten Strategie. Er soll eine Preiserhoehung nicht sofort akzeptieren, sondern Gegenleistungen einfordern und Druck aushalten.

**Fachliche Botschaft:** Geuebt wird nicht spontanes Prompting, sondern strukturiertes Verhandlungsverhalten unter realistischem Druck.

**Trainerfrage im Gespraech:** An welchen Stellen wuerdest du live unterbrechen, beobachten oder erst nachtraeglich Feedback geben?

### 10. Auswertung ansehen

**Was der Trainer zeigt:** Eine kompakte Auswertung mit Ergebnis, Zielerreichung, beobachteten Staerken, kritischen Momenten und naechsten Lernpunkten.

**Was der Trainee sieht oder tut:** Markus erkennt, wo er gut vorbereitet war und wo er zu frueh Entgegenkommen signalisiert hat.

**Fachliche Botschaft:** Feedback wird an beobachtbares Verhalten gebunden. Es geht nicht um eine abstrakte Punktzahl, sondern um Lerntransfer.

**Trainerfrage im Gespraech:** Welche Feedbackform hilft dir mehr: Score, Beobachtung, konkrete Alternativformulierung oder Lernauftrag?

### 11. Trainerreview ergaenzen

**Was der Trainer zeigt:** Einen menschlichen Trainerkommentar mit Kompetenzbezug, Sichtbarkeit fuer Markus und optionaler interner Notiz.

**Was der Trainee sieht oder tut:** Markus sieht nur freigegebenes Feedback, zum Beispiel zu klareren Forderungen und besser gekoppelten Konzessionen.

**Fachliche Botschaft:** Der Trainer bleibt verantwortlich fuer Feedbackqualitaet, Tonalitaet und didaktische Dosierung.

**Trainerfrage im Gespraech:** Welche Kommentare sollten fuer Trainees sichtbar sein, und welche brauchst du nur fuer deine eigene Nachbereitung?

### 12. Lerntransfer festlegen

**Was der Trainer zeigt:** Konkrete naechste Schritte: eine Wiederholung mit hoeherem Druck, ein Mini-Training zu Konzessionslogik oder eine zweite Runde mit Fokus auf Kapazitaetszusage.

**Was der Trainee sieht oder tut:** Markus uebernimmt zwei bis drei Lernpunkte in seinen naechsten Trainingsauftrag.

**Fachliche Botschaft:** Das Tool endet nicht beim Simulationsergebnis. Es macht den Transfer in die naechste Vorbereitung sichtbar.

**Trainerfrage im Gespraech:** Welche Lernpunkte sollen nach einer Simulation verbindlich dokumentiert werden, und welche bleiben Teil des persoenlichen Coachings?

## 5. Beispielinhalte je Demo-Schritt

### Company-Zusammenfassung Rheinwerk Robotics

Rheinwerk Robotics GmbH ist ein mittelstaendischer deutscher Premiumanbieter fuer Industrieroboter, Automationszellen und robotergestuetzte Produktionsloesungen mit Sitz in Augsburg. Das Unternehmen beliefert unter anderem Automotive, Maschinenbau, Elektronikfertigung, Medizintechnik und Logistikautomation. Aus Einkaufssicht sind Praezisionsgetriebe, Servoantriebe, Steuerungselektronik, Industrie-PCs, Sicherheitskomponenten und Softwarelizenzen besonders kritisch.

### Kurzprofil Markus Schulz

Markus Schulz ist 33 Jahre alt, strategischer Einkaeufer bei Rheinwerk Robotics und entwickelt sich in Richtung Einkaufsleitung. Sein Stil ist analytisch, ruhig, professionell und sehr gewissenhaft. Seine Staerken liegen in Vorbereitung, TCO-Argumentation, Vertragsklarheit und langfristigem Lieferantenmanagement. Entwicklungsfelder sind klarere Forderungen, schnelleres Entscheiden unter Unsicherheit, Durchsetzungsstaerke und konsequentes Koppeln von Zugestaendnissen.

### Projektbriefing Praezisionsgetriebe HD-42

Rheinwerk benoetigt das Praezisionsgetriebe HD-42 fuer eine Premium-Roboterachse. Der bestehende japanische Spezialanbieter fordert fuer das kommende Rahmenvertragsjahr eine Preiserhoehung von 11 Prozent und verweist auf hohe Auslastung, gestiegene Praezisionsbearbeitungskosten und knappe Kapazitaeten. Rheinwerks Ziel ist maximal 4 Prozent Preissteigerung, kuerzere Lieferzeiten, eine priorisierte Kapazitaetszusage und ein geregelter Pfad zum Second-Source-Aufbau.

### Beispielanalyse

| Analysefeld | Beispielinhalt |
|---|---|
| Risiko | Sehr hoch, weil das HD-42 fuer eine Premiumachse technisch kritisch ist und eine Requalifikation lange dauert. |
| Lieferantenmacht | Hoch. Der Lieferant hat technologische Spezialisierung, knappe Kapazitaeten und geringe Austauschbarkeit auf seiner Seite. |
| Rheinwerk-Hebel | Forecast-Verbindlichkeit, laengere Laufzeit, technische Standardisierung, VA/VE-Workshop, NRE-Beteiligung, belastbarer Second-Source-Plan. |
| Preisanker | Lieferant fordert +11 Prozent; Rheinwerk startet mit Zielkorridor 0 bis +4 Prozent gegen Gegenleistungen. |
| Offene Fragen | Welche Mindestmenge kann Rheinwerk verbindlich zusagen? Welche Performance-Daten hat die Second Source? Welche Lieferzeit ist wirklich kritisch? Welche Kostensteigerungen sind belegbar? |

### Beispiel-ZOPA / WAP / BATNA

| Dimension | Ziel Rheinwerk | Walk-away Point | Vermutete Lieferantenseite | Einigungsraum |
|---|---|---|---|---|
| Preis | 0 bis +4 Prozent | +6 Prozent ohne Gegenleistung | +11 Prozent Forderung, moeglich +7 bis +8 Prozent | +4 bis +6 Prozent bei klaren Gegenleistungen |
| Lieferzeit | 10 Wochen | 14 Wochen | 18 Wochen bei hoher Auslastung | 12 bis 14 Wochen mit Forecast-Freeze |
| Kapazitaet | Reserviertes Quartalskontingent | Keine Projektfreigabe ohne Mindestkontingent | Bevorzugt flexible Zuteilung | Kontingent gegen Forecast-Verbindlichkeit |
| Second Source | Transparenter Qualifikationspfad | Keine Exklusivitaet ohne Exit-Regel | Moechte Second Source begrenzen | Second Source akzeptiert, wenn Laufzeit und Volumen gesichert werden |

**BATNA:** Parallelqualifikation eines alternativen Lieferanten auf niedrigerem Performance-Level, kurzfristig nur fuer ausgewaehlte Varianten nutzbar. Die BATNA ist real, aber nicht stark genug fuer eine reine Drohstrategie.

### Beispiel-Konzessionslogik

| Zugestaendnis Rheinwerk | Nur gegen Gegenleistung | Risiko bei falscher Nutzung |
|---|---|---|
| Laengere Vertragslaufzeit | Preisdeckel, Kapazitaetszusage, klare EOL-/PCN-Regeln | Bindung ohne Flexibilitaet |
| Forecast-Freeze-Zone | Lieferzeitverkuerzung und Priorisierung | Rheinwerk uebernimmt Planungsrisiko ohne Nutzen |
| NRE-Beteiligung | Dokumentationsrechte, VA/VE-Ziele, definierter Second-Source-Pfad | Finanzierung des Lieferanten ohne strukturellen Hebel |
| Hoehere Mindestmenge | Mengenrabatt oder Preissteigerung maximal +4 Prozent | Lager- und Absatzrisiko |

### Beispiel-Argumentationslinie

**Kernaussage:** Rheinwerk erkennt die technische Qualitaet und Kapazitaetssituation des Lieferanten an, akzeptiert aber keine isolierte Preiserhoehung ohne Leistungs- und Risikoausgleich.

**Evidenz:** HD-42 ist kritisch fuer die Premiumachse, gleichzeitig erzeugen lange Lieferzeiten und Single-Source-Abhaengigkeit ein Projektrisiko fuer Rheinwerk. Ein stabiler Forecast und eine laengere Laufzeit haben fuer den Lieferanten messbaren Planungswert.

**Erwartetes Gegenargument:** "Unsere Kapazitaeten sind knapp, und andere Kunden akzeptieren hoehere Preise."

**Reaktionsstrategie:** "Genau deshalb schlagen wir ein Paket vor: verbindlichere Forecasts und laengere Laufzeit gegen begrenzte Preisanpassung, priorisierte Kapazitaet und einen gemeinsamen Qualifikationsplan. Ohne dieses Paket koennen wir intern keine hoehere Bindung vertreten."

### Beispiel-Kulturbriefing als Arbeitshypothese

Der Lieferant wird als formal, qualitaetsorientiert und auf langfristige Verlaesslichkeit bedacht angenommen. Diese Einschaetzung ist eine Arbeitshypothese fuer die Simulation, keine Aussage ueber einzelne Personen oder eine Kultur als Ganzes. Fuer Markus bedeutet das: gut vorbereitet starten, Respekt fuer Qualitaet und Beziehung zeigen, Forderungen klar begruenden, keine improvisierten Drohungen nutzen und Second-Source-Themen sachlich als Risikomanagement rahmen.

### Beispiel-Simulationskonfiguration

| Feld | Beispiel |
|---|---|
| Szenariotitel | HD-42 Preis- und Kapazitaetsrunde |
| Trainee | Markus Schulz |
| Gegenrolle | Senior Sales Manager des japanischen Praezisionsgetriebe-Lieferanten |
| Schwierigkeit | Mittel bis hoch |
| Druckmoment | Lieferant verweist auf andere Kunden und droht mit laengeren Lieferzeiten |
| Erfolgskriterien | Forderung klar formuliert, Preiszugestaendnisse gekoppelt, Kapazitaet eingefordert, Second Source nicht eskalierend platziert |
| Sprache | Deutsch fuer Training, Lieferantenrolle mit internationalem Business-Kontext |
| Zeitlimit | 15 Minuten Simulation plus 10 Minuten Review |

### Beispiel-Feedback nach Simulation

Markus hat den technischen Kontext sauber zusammengefasst und die Beziehungsebene stabil gehalten. Er hat die Preiserhoehung nicht sofort akzeptiert und Forecast-Verbindlichkeit als Gegenleistung eingebracht. Kritisch war, dass er beim ersten Druckmoment zu schnell eine Preiserhoehung von +5 Prozent in Aussicht gestellt hat, bevor Kapazitaet und Lieferzeit verbindlich zugesagt waren. In der Wiederholung soll Markus zuerst das Paket rahmen und danach einzelne Konzessionen freigeben.

### Beispiel-Trainerkommentar

Markus, deine Vorbereitung war sehr stark und du hast ruhig gefuehrt. Der naechste Entwicklungsschritt liegt in der Reihenfolge: Erst Forderung und Paketlogik setzen, dann Konzessionen anbieten. Formuliere frueher deinen Walk-away-Rahmen und halte eine kurze Pause aus, wenn der Lieferant Druck macht. Fuer die naechste Runde ueben wir genau diesen Moment: nicht sofort stabilisieren, sondern Gegenleistung einfordern.

## 6. Trainerfragen fuer das Gespraech

- Ist dieser Ablauf aus Trainersicht sinnvoll?
- Welche Informationen brauchst du frueher?
- Wo wuerdest du als Trainer eingreifen?
- Welche Analyseergebnisse muessen vom Trainer freigegeben werden?
- Welche Informationen darf ein Trainee sehen?
- Welche Informationen sollten trainerintern bleiben?
- Ist die Strategie-Logik didaktisch nachvollziehbar?
- Welche Simulationseinstellungen brauchst du wirklich?
- Welche Feedbackform ist hilfreich?
- Welche Screens waeren fuer einen ersten MVP verzichtbar?
- Wie viele Beispielinhalte braucht ein Trainer, damit die Demo lebendig wirkt, ohne zu textlastig zu werden?
- Soll der Trainee eigene Reflexionen vor dem Trainerreview erfassen?
- Welche Lernpunkte sollten projektbezogen und welche personen-/profilbezogen gespeichert werden?
- Wie wird verhindert, dass kulturelle Hinweise als stereotype Wahrheit gelesen werden?
- Welche Stellen eignen sich fuer Trainerfreigabe, bevor ein Trainee weitergeht?

## 7. Was in einer Demo bewusst nicht gezeigt wird

In dieser Demo wird klar abgegrenzt, was noch nicht vorhanden ist und nicht als bestehende Funktion dargestellt werden darf:

- Keine echte Upload-API.
- Keine echte Parser- oder Mapping-UI.
- Keine produktive RAG-Suche.
- Keine produktive KI-Simulation.
- Kein Voice-Modus.
- Keine Admin- und Rechteverwaltung.
- Keine CRM-Anbindung.
- Keine fertige UI.
- Keine Datei-Metadatenentscheidung, keine Storage-Felder und keine Vorwegnahme von Issue #11.
- Keine neuen Datenmodelle, Services, Endpunkte oder Migrationen.

Diese Themen duerfen als spaetere Perspektive genannt werden. In der Demo werden sie aber nur als Anschlussstellen beschrieben, nicht als implementierte oder verbindlich entschiedene Funktion.

## 8. Moegliche Demonstrationsformate

**Gespraechsleitfaden:** Das Storyboard kann direkt in einem Trainergespraech genutzt werden. Jede Station liefert eine fachliche Botschaft und eine konkrete Rueckfrage.

**Einfache Praesentation:** Die Schritte koennen als Folienstruktur dienen: Ausgangslage, Workflow, Beispielinhalte, offene Trainerfragen, MVP-Abgrenzung.

**Klickbarer Prototyp spaeter:** Wenn der fachliche Ablauf bestaetigt ist, kann daraus ein klickbarer Prototyp entstehen. Dieses Storyboard entscheidet aber noch keine UI.

**Statische Mock-Screens spaeter:** Die Beispielinhalte eignen sich als Textgrundlage fuer spaetere Mock-Screens, ohne jetzt Wireframes als Code zu bauen.

**Grundlage fuer MVP-Scope-Diskussion:** Trainerfeedback kann genutzt werden, um zu entscheiden, welche Screens fuer den ersten MVP wirklich notwendig sind und welche nur als spaetere Ausbaustufe gelten.

## 9. Anschluss an spaetere Arbeit

Trainerfeedback aus dieser Demo sollte gesammelt und in MVP-Scope und Roadmap ueberfuehrt werden. Besonders wichtig sind Rueckmeldungen zu Sichtbarkeit, Trainerfreigabe, Strategiebausteinen, Simulationskonfiguration und Feedbackformat.

Auf dieser Basis kann das naechste MVP-Scope-Issue fundierter vorbereitet werden. Die offenen Produktentscheidungen aus `docs/screen-by-screen-concept.md` sollten priorisiert werden, bevor technische RAG-Planung, Frontend-Planung oder eine produktive Simulation vertieft werden.

Erst wenn der gefuehrte Trainingsablauf fachlich traegt, sollten RAG, Embeddings, KI-Prompts, Simulation-Engine, Upload-Flows, Rechteverwaltung oder konkrete UI-Umsetzung im Detail geplant werden.
