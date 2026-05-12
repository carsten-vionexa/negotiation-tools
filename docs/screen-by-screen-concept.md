# Screen-by-Screen-Konzept fuer das Negotiation Tool

## 1. Ziel und Einordnung

Dieses Dokument uebersetzt den bisherigen fachlichen Workflow des Negotiation Tools in konkrete Screens. Es beschreibt, welche Rollen welche Schritte durchlaufen, welche Informationen sichtbar oder bearbeitbar sind und welche Backend-Objekte je Screen relevant werden.

Das Konzept ist keine Frontend-Implementierung. Es definiert keine React-Komponenten, keine UI-Layouts, keine CSS-Regeln, keine API-Endpunkte, keine Datenbankmigrationen und keine Services. Die Screens sind fachliche Produktmodule, die spaeter UX, API-Planung und technische Umsetzung strukturieren sollen.

Der Bezugspunkt ist das bestehende Datenmodell mit `Company`, `UserProfile`, `KnowledgeDocument`, `DocumentChunk`, `KnowledgeClaim`, `RequestItem`, `SupplierProfile`, `ProcurementHistoryItem`, `NegotiationProject`, `ImportJob`, `ImportRow`, `Strategy`, `ZopaItem`, `BatnaOption`, `ConcessionItem`, `ArgumentationLine`, `SimulationScenario`, `SimulationMessage`, `SimulationResult` und `TrainerComment`.

Das Tool wird als workflowbasiertes Verhandlungs-Cockpit verstanden. Der Trainee soll durch Analyse, Strategie, Briefing, Simulation und Lerntransfer gefuehrt werden. Der Trainer soll Vorbereitung, Szenarien, Simulationen und Feedback steuern koennen. Freies, unstrukturiertes Prompting ist nicht der Zielmodus des MVP.

KI, RAG, Embeddings, Prompting und Simulation-Engine werden in diesem Dokument nur als spaetere Anschlussstellen markiert. Upload- und Import-Screens werden fachlich beschrieben, ohne Entscheidungen aus Issue #11 zu Datei-Metadaten, Upload-API oder Storage-Feldern vorzuziehen.

## 2. Nutzerrollen

### Trainee / Verhandler

**Hauptziele**

- Ein konkretes Verhandlungsprojekt verstehen.
- Relevante Analyse- und Kontextinformationen strukturiert aufnehmen.
- Eine Verhandlungsstrategie vorbereiten und ueben.
- Aus Simulation und Trainerfeedback konkrete Lernpunkte ableiten.

**Typische Aktionen**

- Eigenes Rollen- oder Trainee-Profil ansehen und ergaenzen.
- Projektbriefing, Lieferantenannahmen und Datenbasis lesen.
- Analyseergebnisse, ZOPA, BATNA, Konzessionen und Argumentationslinien durcharbeiten.
- Simulation starten oder fortsetzen.
- Auswertung, Lernpunkte und Trainerkommentare lesen.

**Benoetigte Informationen**

- Eigene Rolle, Erfahrungsstand und Trainingsziel.
- Ziel der Verhandlung, Artikel oder Service, Mengen, Zielregion, Preis- und Lieferannahmen.
- Lieferantenprofil, Machtverhaeltnis, Risiken, kultureller Kontext.
- Evidenzen aus Knowledge Base, Einkaufshistorie und Anfragepositionen.
- Feedback zu Verhalten, Taktik, Argumentation und Lerntransfer.

**Moegliche Einschraenkungen im MVP**

- Keine freie KI-Chat-Oberflaeche ohne Workflow-Kontext.
- Eingeschraenkter Zugriff auf vertrauliche Daten oder interne Trainernotizen.
- Strategiebausteine koennen im MVP teilweise trainerseitig vorbereitet oder freigegeben werden.
- Simulation und Auswertung koennen zunaechst konzeptionelle Zielscreen-Funktion haben, bevor eine produktive Engine existiert.

### Trainer / Coach

**Hauptziele**

- Firmen-, Rollen- und Projektdaten fachlich vorbereiten.
- Die Datenbasis fuer Trainings- und Verhandlungsszenarien pruefen.
- Analyse, Strategie und Simulation so steuern, dass Trainees gefuehrt lernen.
- Menschliches Feedback und Lerntransfer dokumentieren.

**Typische Aktionen**

- Company-Kontext, Trainee- oder Rollenprofile und Projektkontext pruefen.
- Knowledge Base und Importstatus fachlich bewerten.
- Verhandlungsprojekt oder Szenario auswaehlen, anlegen oder anpassen.
- Strategiebausteine pruefen, ergaenzen oder freigeben.
- Simulation konfigurieren, beobachten oder nachbereiten.
- Trainerkommentare und Lernpunkte dokumentieren.

**Benoetigte Informationen**

- Firmen- und Mandantenkontext.
- Trainee-Profil, Rolle, Erfahrungsstand, Lernziel.
- Projektziele, Lieferantenprofil, Anfragepositionen und Einkaufshistorie.
- Status der Datenbasis, Importstatus, Wissensclaims und Quellenqualitaet.
- Simulationsergebnisse, Nachrichtenverlauf, Scores und Lerntransfer.

**Moegliche Einschraenkungen im MVP**

- Keine ausgereifte Trainer-Dashboard-Logik.
- Keine produktive Rechteverwaltung.
- Keine automatische KI-Freigabekette.
- Trainerreview kann im MVP als fokussierter Kommentar- und Freigabeprozess starten.

### Admin / Mandantenverwalter als spaetere Ausbaustufe

**Hauptziele**

- Mandanten, Nutzer, Rollen und Datenraeume verwalten.
- Datenqualitaet, Uploads, Compliance und Auditierbarkeit sicherstellen.
- Rechte, Sichtbarkeiten und Organisationsstrukturen steuern.

**Typische Aktionen**

- Companies und Nutzer verwalten.
- Rollen, Berechtigungen und Mandantenzugriffe konfigurieren.
- Uploads, Importjobs und Datenbereinigung ueberwachen.
- Audit- und Compliance-Informationen pruefen.

**Benoetigte Informationen**

- Mandantenstruktur, Nutzerlisten, Rollen- und Rechtezuordnung.
- Datenbestand je Company.
- Upload- und Importstatus.
- Protokolle, Datenklassifikation und Vertraulichkeitsstufen.

**Moegliche Einschraenkungen im MVP**

- Admin ist nicht MVP-Pflicht.
- Rechte- und Rollensystem bleibt spaetere Ausbaustufe.
- Datenbereinigung und Audit-Funktionen werden nur konzeptionell vorbereitet.

## 3. MVP-Screen-Landkarte

| Nr. | Screen | Primaere Rolle | Zweck | Hauptobjekte | MVP-Relevanz | Spaetere Ausbaustufe |
|---:|---|---|---|---|---|---|
| 1 | Dashboard | Trainer, Trainee | Einstieg in offene Projekte, Trainingsschritte und naechste Aktionen | `Company`, `UserProfile`, `NegotiationProject`, `SimulationScenario`, `SimulationResult` | Hoch | Ja, fuer Team-/Admin-Dashboards |
| 2 | Firmenprofil / Company-Uebersicht | Trainer | Unternehmenskontext und Mandantenbasis sichtbar machen | `Company`, `KnowledgeDocument`, `ProcurementHistoryItem`, `NegotiationProject` | Hoch | Ja |
| 3 | Trainee- bzw. Rollenprofil | Trainee, Trainer | Rolle, Lernziel und Verhandlungsprofil klaeren | `UserProfile`, `Company`, `SimulationResult`, `TrainerComment` | Hoch | Ja |
| 4 | Knowledge Base / Datenbasis | Trainer | Quellen, Claims und Datenlage pruefen | `KnowledgeDocument`, `DocumentChunk`, `KnowledgeClaim`, `ProcurementHistoryItem`, `RequestItem` | Hoch | Ja |
| 5 | Import- und Upload-Uebersicht | Trainer | Import- und Uploadstatus fachlich ueberblicken | `ImportJob`, `ImportRow`, `KnowledgeDocument` | Mittel | Ja |
| 6 | Verhandlungsprojekt anlegen / bearbeiten | Trainer, spaeter Trainee | Konkreten Verhandlungsfall definieren | `NegotiationProject`, `RequestItem`, `SupplierProfile`, `UserProfile`, `Company` | Hoch | Nein |
| 7 | Analyseansicht | Trainee, Trainer | Projekt, Datenlage, Risiken und Chancen verstehen | `NegotiationProject`, `SupplierProfile`, `KnowledgeClaim`, `ProcurementHistoryItem`, `RequestItem` | Hoch | Ja |
| 8 | Strategie-Builder | Trainee, Trainer | Zielbild, ZOPA, BATNA, Konzessionen und Argumentation strukturieren | `Strategy`, `ZopaItem`, `BatnaOption`, `ConcessionItem`, `ArgumentationLine` | Hoch | Ja |
| 9 | Kultur- und Rollenbriefing | Trainee, Trainer | Lieferantenrolle, kulturelle Hinweise und Verhaltensannahmen vorbereiten | `SupplierProfile`, `KnowledgeClaim`, `NegotiationProject`, `SimulationScenario` | Mittel | Ja |
| 10 | Simulation konfigurieren | Trainer | Trainingsszenario, Rolle, Schwierigkeit und Erfolgskriterien setzen | `SimulationScenario`, `Strategy`, `SupplierProfile`, `UserProfile` | Mittel | Ja |
| 11 | Simulation durchfuehren | Trainee | Gefuehrte Verhandlungssimulation absolvieren | `SimulationScenario`, `SimulationMessage`, `Strategy`, `SupplierProfile` | Konzeptioneller Zielscreen | Ja |
| 12 | Auswertung und Lerntransfer | Trainee, Trainer | Ergebnis, Feedback und naechste Lernschritte sichtbar machen | `SimulationResult`, `SimulationMessage`, `TrainerComment`, `Strategy` | Konzeptioneller Zielscreen | Ja |
| 13 | Trainerreview / Trainerkommentar | Trainer | Menschliches Feedback ergaenzen und freigeben | `TrainerComment`, `SimulationResult`, `SimulationMessage`, `SimulationScenario` | Hoch | Ja |
| 14 | Lernhistorie / Fortschritt | Trainee, Trainer | Entwicklung ueber Simulationen und Projekte hinweg nachvollziehen | `SimulationResult`, `TrainerComment`, `UserProfile`, `NegotiationProject` | Mittel | Ja |

## 4. Screen-by-Screen-Beschreibung

### 1. Dashboard

**Zweck des Screens:** Einstiegspunkt fuer aktuelle Verhandlungsprojekte, Trainingsaufgaben, offene Reviews und naechste Schritte im gefuehrten Workflow.

**Hauptnutzer:** Trainer und Trainee.

**Zentrale Nutzeraktionen:** Offenes Projekt oeffnen, naechsten Workflow-Schritt starten, offene Trainerreviews sehen, zuletzt bearbeitete Simulation fortsetzen, Lernfortschritt aufrufen.

**Wichtigste Eingaben:** Auswahl von Company, Projekt, Trainee oder Simulation; optional Statusfilter.

**Wichtigste Ausgaben / Anzeigen:** Aktive Projekte, faellige Trainerkommentare, gestartete Simulationen, letzte Ergebnisse, naechster empfohlener Schritt.

**Relevante Backend-Objekte:** `Company`, `UserProfile`, `NegotiationProject`, `SimulationScenario`, `SimulationResult`, `TrainerComment`.

**KI-/RAG-Anschlussstellen:** Spaeter koennen priorisierte naechste Schritte, Risiko-Hinweise oder Lernempfehlungen vorgeschlagen werden. Im MVP reicht eine regelbasierte Statussicht.

**MVP-Abgrenzung:** Kein Team-Dashboard, keine Admin-Auswertung, keine komplexen Kennzahlen.

**Offene Fragen:** Soll der Dashboard-Einstieg trainerzentriert oder traineezentriert priorisiert werden? Welche Statuswerte reichen fuer den ersten MVP?

### 2. Firmenprofil / Company-Uebersicht

**Zweck des Screens:** Unternehmenskontext, Mandantenzugehoerigkeit und grobe Datenlage als Ausgangspunkt fuer Verhandlungsprojekte sichtbar machen.

**Hauptnutzer:** Trainer, spaeter Admin.

**Zentrale Nutzeraktionen:** Firmenprofil ansehen oder bearbeiten, relevante Projekte und Datenquellen pruefen, Datenbasis je Company ueberblicken.

**Wichtigste Eingaben:** Firmenname, Branche, Region, interne Notizen, ggf. Auswahl vorhandener Projekte oder Datenquellen.

**Wichtigste Ausgaben / Anzeigen:** Company-Stammdaten, Anzahl und Status von Knowledge-Dokumenten, Importjobs, Projekten, Anfragepositionen und historischen Einkaufspositionen.

**Relevante Backend-Objekte:** `Company`, `KnowledgeDocument`, `ImportJob`, `ProcurementHistoryItem`, `RequestItem`, `NegotiationProject`.

**KI-/RAG-Anschlussstellen:** Spaeter koennen aus Firmen- und Datenbasis ein Kontextprofil, Datenluecken und RAG-Abdeckungsgrad abgeleitet werden.

**MVP-Abgrenzung:** Keine Mandantenadministration, keine Rechteverwaltung, keine Datei-Metadatenentscheidung aus Issue #11.

**Offene Fragen:** Welche Company-Felder sind fuer Trainer im MVP editierbar? Welche Datenqualitaetsindikatoren sollen sichtbar sein?

### 3. Trainee- bzw. Rollenprofil

**Zweck des Screens:** Verhandlungsrolle, Lernziel und Erfahrungsprofil eines Trainees oder einer Trainingsrolle erfassen.

**Hauptnutzer:** Trainee und Trainer.

**Zentrale Nutzeraktionen:** Eigenes Profil ansehen, Rolle oder Lernziel ergaenzen, Trainer kann Profil fuer ein Szenario pruefen oder anpassen.

**Wichtigste Eingaben:** Rolle, Funktion, Erfahrungsstand, Trainingsfokus, bevorzugte Sprache, optionale Lernziele oder Kompetenzfelder.

**Wichtigste Ausgaben / Anzeigen:** Profilzusammenfassung, zugeordnete Projekte, relevante Simulationsergebnisse, sichtbare Trainerkommentare.

**Relevante Backend-Objekte:** `UserProfile`, `Company`, `NegotiationProject`, `SimulationResult`, `TrainerComment`.

**KI-/RAG-Anschlussstellen:** Spaeter koennen Lernpfade und Feedbackgewichtung anhand des Profils personalisiert werden.

**MVP-Abgrenzung:** Keine komplexe Kompetenzmatrix, keine Zertifikatslogik, keine vollstaendige Nutzerverwaltung.

**Offene Fragen:** Ist `UserProfile` im MVP echte Person, Rolle oder beides? Welche Profilinformationen darf der Trainee selbst bearbeiten?

### 4. Knowledge Base / Datenbasis

**Zweck des Screens:** Vorhandene Quellen, extrahierte Aussagen und strukturierte Daten als Grundlage fuer Analyse und Strategie pruefen.

**Hauptnutzer:** Trainer.

**Zentrale Nutzeraktionen:** Dokumente und Claims ansehen, Quellenqualitaet pruefen, Datenluecken erkennen, projektbezogene und firmenweite Datenbasis unterscheiden.

**Wichtigste Eingaben:** Filter nach Company, Projekt, Quelle, Vertraulichkeit, Reliability, Claim-Typ oder Informationsart.

**Wichtigste Ausgaben / Anzeigen:** Knowledge-Dokumente, zitierbare Chunks, Knowledge Claims, Einkaufshistorie, Anfragepositionen und Datenqualitaets-Hinweise.

**Relevante Backend-Objekte:** `KnowledgeDocument`, `DocumentChunk`, `KnowledgeClaim`, `ProcurementHistoryItem`, `RequestItem`, `ImportJob`, `ImportRow`.

**KI-/RAG-Anschlussstellen:** Spaeterer Einstieg fuer Chunking, Embeddings, Claim-Extraktion, Retrieval und Quellenbelege.

**MVP-Abgrenzung:** Keine produktive RAG-Suche, keine Embedding-Erzeugung, keine automatische Claim-Extraktion, keine echte Upload-UI als Pflicht.

**Offene Fragen:** Soll der Trainee bestimmte Quellen direkt sehen duerfen? Wie werden vertrauliche interne Quellen markiert?

### 5. Import- und Upload-Uebersicht

**Zweck des Screens:** Fachlicher Ueberblick ueber Uploads, Importvorgaenge, Mapping-/Validierungsstatus und daraus entstandene oder geplante Zielobjekte.

**Hauptnutzer:** Trainer, spaeter Admin.

**Zentrale Nutzeraktionen:** Importjobs ansehen, Status und Fehlerzusammenfassung pruefen, Importzeilen stichprobenartig kontrollieren, Datenbasis-Fortschritt einschaetzen.

**Wichtigste Eingaben:** Filter nach Company, Projekt, Quelltyp, Zielobjekt, Status oder Zeitraum.

**Wichtigste Ausgaben / Anzeigen:** ImportJob-Status, Zeilenzaehler, Validierungsergebnis, Fehler- und Warnhinweise, Bezug zu `KnowledgeDocument`.

**Relevante Backend-Objekte:** `ImportJob`, `ImportRow`, `KnowledgeDocument`, spaeter erzeugte `ProcurementHistoryItem` und `RequestItem`.

**KI-/RAG-Anschlussstellen:** Spaeter optional KI-Hinweise zu Mappingvorschlaegen oder Datenqualitaet. Nicht Teil des MVP.

**MVP-Abgrenzung:** Upload- und Import-Screens duerfen fachlich beschrieben werden, aber keine Upload-API, keine Parser-/Mapping-UI und keine Datei-Metadatenentscheidung aus Issue #11 vorziehen.

**Offene Fragen:** Muss dieser Screen im MVP aktiv bedienbar sein oder reicht eine Status-/Konzeptansicht? Wer darf fehlerhafte Importzeilen korrigieren?

### 6. Verhandlungsprojekt anlegen / bearbeiten

**Zweck des Screens:** Einen konkreten Verhandlungsfall definieren, der Analyse, Strategie, Briefing und Simulation zusammenhaelt.

**Hauptnutzer:** Trainer, spaeter ggf. Trainee im Self-Service-Modus.

**Zentrale Nutzeraktionen:** Projekt anlegen, Anfrageposition und Lieferant zuordnen, Verhandlungsziel und Rahmenbedingungen definieren, Prioritaet und Risiken erfassen.

**Wichtigste Eingaben:** Projektname, Kategorie, Artikel oder Service, Menge, Zielregion, gewuenschte Lieferzeit, interne Preisannahme, Waehrung, aktueller Lieferant, Prioritaet, Business Pressure, technische Abhaengigkeit, Supplier Power und Risiko.

**Wichtigste Ausgaben / Anzeigen:** Projektbriefing, zugeordnete Anfrageposition, Lieferantenprofil, Datenlage und Status im Workflow.

**Relevante Backend-Objekte:** `NegotiationProject`, `Company`, `UserProfile`, `RequestItem`, `SupplierProfile`, `KnowledgeDocument`.

**KI-/RAG-Anschlussstellen:** Spaeter koennen Projektdaten gegen Knowledge Base und Einkaufshistorie plausibilisiert und mit ersten Analysehinweisen angereichert werden.

**MVP-Abgrenzung:** Keine automatische Projektanlage aus Importdaten als Pflicht, keine CRM-Anbindung, keine komplexe Projektfreigabe.

**Offene Fragen:** Darf der Trainee Projekte selbst anlegen oder nur vom Trainer zugewiesen bekommen? Welche Pflichtfelder braucht der erste MVP?

### 7. Analyseansicht

**Zweck des Screens:** Projektkontext, Datenbasis, Lieferantenannahmen, Risiken, Chancen und offene Informationsluecken strukturiert sichtbar machen.

**Hauptnutzer:** Trainee und Trainer.

**Zentrale Nutzeraktionen:** Analyse lesen, Quellen und Claims nachvollziehen, Risiken markieren, offene Fragen sammeln, Trainerfreigabe oder Anpassung vorbereiten.

**Wichtigste Eingaben:** Auswahl eines Projekts, optional Filter nach Analysebereich, Informationsart, Confidence oder Quelle.

**Wichtigste Ausgaben / Anzeigen:** Zusammenfassung des Verhandlungsfalls, relevante Knowledge Claims, Einkaufshistorie, Anfragepositionen, Lieferantenprofil, Risiko- und Machtannahmen, offene Datenluecken.

**Relevante Backend-Objekte:** `NegotiationProject`, `SupplierProfile`, `KnowledgeClaim`, `KnowledgeDocument`, `DocumentChunk`, `ProcurementHistoryItem`, `RequestItem`.

**KI-/RAG-Anschlussstellen:** Spaeter Retrieval aus `KnowledgeDocument`, `DocumentChunk`, `KnowledgeClaim`, `ProcurementHistoryItem` und `RequestItem`; KI-gestuetzte Zusammenfassungen und Hypothesen mit Quellenbezug.

**MVP-Abgrenzung:** Keine produktive automatische Analysepflicht. Im MVP koennen Analysen manuell, regelbasiert oder vorbereitend dargestellt werden.

**Offene Fragen:** Muss der Trainer KI-Analysen freigeben, bevor Trainees sie sehen? Wie werden Hypothesen von Fakten getrennt?

### 8. Strategie-Builder

**Zweck des Screens:** Die Verhandlungsstrategie in handhabbare Bausteine uebersetzen: Ziele, ZOPA, BATNA, Konzessionen, Argumentationslinien und Risiken.

**Hauptnutzer:** Trainee und Trainer.

**Zentrale Nutzeraktionen:** Strategie anlegen oder bearbeiten, ZOPA-Dimensionen pflegen, BATNA-Optionen bewerten, Konzessionen ordnen, Argumentationslinien aus Evidenz ableiten, Strategieversion aktiv setzen.

**Wichtigste Eingaben:** Strategietitel, Zielbeschreibung, Zielwerte, Walk-away-Grenzen, Alternativen, Konzessionsbedingungen, Gegenleistungen, Argumente, Evidenz, erwartete Gegenargumente und Reaktionsstrategie.

**Wichtigste Ausgaben / Anzeigen:** Aktive Strategie, strukturierte ZOPA, BATNA-Liste, Konzessionsplan, Argumentationslinien, Risiko- und Notizfelder.

**Relevante Backend-Objekte:** `Strategy`, `ZopaItem`, `BatnaOption`, `ConcessionItem`, `ArgumentationLine`, `NegotiationProject`, `SupplierProfile`, `KnowledgeClaim`.

**KI-/RAG-Anschlussstellen:** Spaeter KI-gestuetzte Vorschlaege fuer ZOPA, BATNA, Konzessionen und Argumentationslinien auf Basis von Projekt, Lieferant, Claims und Einkaufshistorie.

**MVP-Abgrenzung:** Strategie kann manuell oder trainergefuehrt gepflegt werden. Keine automatische ZOPA-Berechnung, keine verbindliche KI-Strategie-Generierung.

**Offene Fragen:** Welche Strategiebausteine darf der Trainee selbst veraendern? Braucht jede Strategie eine Trainerfreigabe?

### 9. Kultur- und Rollenbriefing

**Zweck des Screens:** Trainee und Trainer auf Lieferantenrolle, Gespraechsdynamik, kulturelle Arbeitshypothesen und erwartete Taktiken vorbereiten.

**Hauptnutzer:** Trainee und Trainer.

**Zentrale Nutzeraktionen:** Lieferantenannahmen lesen, kulturelle Hinweise pruefen, Rollenbriefing fuer Simulation vorbereiten, Unsicherheiten markieren.

**Wichtigste Eingaben:** Auswahl von Projekt, Lieferant, Zielregion, Szenariotyp und ggf. Rollenannahmen.

**Wichtigste Ausgaben / Anzeigen:** Lieferantenprofil, kultureller Kontext, Interessen, wahrscheinliche Taktiken, Constraints, Briefing fuer die Simulation.

**Relevante Backend-Objekte:** `SupplierProfile`, `KnowledgeClaim`, `NegotiationProject`, `SimulationScenario`.

**KI-/RAG-Anschlussstellen:** Spaeter kontextbezogene kulturelle Arbeitshypothesen und Rollenbriefings mit Quellenhinweisen. Ergebnisse muessen klar als Hypothesen markiert werden.

**MVP-Abgrenzung:** Kein stereotypes oder automatisiertes Kultururteil als harte Wahrheit. Im MVP koennen Trainernotizen und strukturierte Lieferantenannahmen reichen.

**Offene Fragen:** Welche kulturellen Hinweise sind didaktisch sinnvoll und rechtlich unkritisch? Wie wird Bias vermieden?

### 10. Simulation konfigurieren

**Zweck des Screens:** Einen Trainingsdurchlauf fachlich vorbereiten: Rolle, Szenario, Schwierigkeitsgrad, Ziele, Erfolgskriterien und Sprache.

**Hauptnutzer:** Trainer.

**Zentrale Nutzeraktionen:** Szenario anlegen, Strategie und Lieferant zuordnen, Rollenbeschreibung festlegen, Erfolgskriterien und Zeitlimit definieren, Trainee zuweisen.

**Wichtigste Eingaben:** Szenariotitel, Szenariotyp, Rolleninformationen, Kontext, Ziel, Briefing, Erfolgskriterien, Sprache, Zeitlimit, zugeordnete Strategie und Trainee.

**Wichtigste Ausgaben / Anzeigen:** Simulationsbriefing, Startbereitschaft, zugeordnete Strategie, Rollen- und Lieferantenannahmen.

**Relevante Backend-Objekte:** `SimulationScenario`, `NegotiationProject`, `Strategy`, `SupplierProfile`, `UserProfile`.

**KI-/RAG-Anschlussstellen:** Spaeter Rollen- und Szenario-Prompting, Engine-Konfiguration und Retrieval-Kontext fuer die Simulation.

**MVP-Abgrenzung:** Keine Simulation-Engine, kein Voice, keine Streaming-Logik. Der Screen kann zunaechst als Konfigurations- und Zielbild beschrieben werden.

**Offene Fragen:** Welche Szenariotypen werden zuerst gebraucht? Muss der Trainer Simulationen live beobachten koennen?

### 11. Simulation durchfuehren

**Zweck des Screens:** Gefuehrte Verhandlungssimulation durchlaufen, bei der der Trainee im Projektkontext uebt und nicht frei ohne Struktur promptet.

**Hauptnutzer:** Trainee.

**Zentrale Nutzeraktionen:** Simulation starten, Nachrichten austauschen, Phasen durchlaufen, bei Bedarf Briefing oder Strategie einsehen, Simulation abschliessen.

**Wichtigste Eingaben:** Trainee-Antworten, optionale Phasenentscheidungen, Abschluss oder Pausenstatus.

**Wichtigste Ausgaben / Anzeigen:** Rollenbriefing, laufender Dialog, Phasenstatus, ggf. kurze kontextuelle Hinweise, Abschlussstatus.

**Relevante Backend-Objekte:** `SimulationScenario`, `SimulationMessage`, `Strategy`, `SupplierProfile`, `NegotiationProject`, `UserProfile`.

**KI-/RAG-Anschlussstellen:** Spaeter Simulation-Engine mit rollen- und szenariobasiertem Prompting, optional RAG-Kontext aus Projekt, Strategie und Knowledge Base.

**MVP-Abgrenzung:** Kein produktiver KI-Dialog, kein Voice-Modus, keine automatische Taktikerkennung als Pflicht. Simulation ist im MVP mindestens als konzeptioneller Zielscreen zu fuehren.

**Offene Fragen:** Startet die erste Simulation textbasiert? Welche Gespraechsphasen sollen fest gefuehrt werden?

### 12. Auswertung und Lerntransfer

**Zweck des Screens:** Ergebnis eines Simulationsdurchlaufs, Zielerreichung, Lernpunkte und naechste Schritte nachvollziehbar machen.

**Hauptnutzer:** Trainee und Trainer.

**Zentrale Nutzeraktionen:** Auswertung lesen, Lernpunkte bestaetigen, naechste Schritte festhalten, Trainerfeedback einsehen, Wiederholung planen.

**Wichtigste Eingaben:** Manuelle Lernnotizen, Trainerergaenzungen, ggf. Bewertung oder Abschlussstatus.

**Wichtigste Ausgaben / Anzeigen:** Zusammenfassung, Outcome, Zielerreichung, vereinbarte Konditionen, Lernpunkte, naechste Schritte, optionale Scores und sichtbare Trainerkommentare.

**Relevante Backend-Objekte:** `SimulationResult`, `SimulationScenario`, `SimulationMessage`, `TrainerComment`, `Strategy`.

**KI-/RAG-Anschlussstellen:** Spaeter Gespraechsanalyse, Kompetenzfeedback, Taktikerkennung, Score-Vorschlaege und Lerntransfer-Empfehlungen.

**MVP-Abgrenzung:** Keine automatische Bewertungspflicht. Scores bleiben optional und didaktisch zu klaeren.

**Offene Fragen:** Welche Scores sind wirklich hilfreich? Soll der Trainee eigene Reflexionen speichern koennen?

### 13. Trainerreview / Trainerkommentar

**Zweck des Screens:** Menschliches Trainerfeedback zu Szenario, Ergebnis oder einzelner Nachricht erfassen und steuern, was fuer Trainees sichtbar ist.

**Hauptnutzer:** Trainer.

**Zentrale Nutzeraktionen:** Kommentar schreiben, Kompetenzbezug setzen, Severity markieren, Sichtbarkeit fuer Trainee steuern, Kommentar mit Ergebnis oder Nachricht verknuepfen.

**Wichtigste Eingaben:** Kommentartext, Kommentartyp, Kompetenzbezug, Severity, Sichtbarkeit, Bezug auf Szenario, Ergebnis oder Nachricht.

**Wichtigste Ausgaben / Anzeigen:** Bestehende Kommentare, Kontext der Simulation, sichtbare und interne Feedbackanteile.

**Relevante Backend-Objekte:** `TrainerComment`, `SimulationScenario`, `SimulationResult`, `SimulationMessage`, `UserProfile`.

**KI-/RAG-Anschlussstellen:** Spaeter kann KI Feedbackvorschlaege vorbereiten; der Trainer bleibt fuer didaktisch relevantes Feedback und Freigabe zentral.

**MVP-Abgrenzung:** Kein komplexer Review-Workflow, keine Rollenrechte-Engine, keine automatische Feedbackfreigabe.

**Offene Fragen:** Welche Kommentare sind intern, welche trainee-sichtbar? Muss Feedback versioniert werden?

### 14. Lernhistorie / Fortschritt

**Zweck des Screens:** Lernentwicklung ueber mehrere Projekte und Simulationen hinweg sichtbar machen.

**Hauptnutzer:** Trainee und Trainer.

**Zentrale Nutzeraktionen:** Vergangene Simulationen ansehen, Lernpunkte vergleichen, Fortschritt diskutieren, naechste Trainingsziele ableiten.

**Wichtigste Eingaben:** Filter nach Zeitraum, Projekt, Kompetenzfeld oder Trainee.

**Wichtigste Ausgaben / Anzeigen:** Simulationsergebnisse, Trainerkommentare, Lernpunkte, naechste Schritte, grobe Entwicklung ueber Zeit.

**Relevante Backend-Objekte:** `UserProfile`, `SimulationResult`, `TrainerComment`, `SimulationScenario`, `NegotiationProject`.

**KI-/RAG-Anschlussstellen:** Spaeter Lernpfad-Vorschlaege, Kompetenztrend-Analyse und Benchmarking.

**MVP-Abgrenzung:** Keine Zertifikatslogik, keine Benchmark-Datenbank, keine komplexen Team-Auswertungen.

**Offene Fragen:** Welche Fortschrittsindikatoren sind didaktisch tragfaehig? Soll Fortschritt privat, trainerseitig oder teamweit sichtbar sein?

## 5. Trainer-Workflow

Der Trainer-Workflow ist im MVP der stabilste Startpunkt, weil Datenbasis, Szenarioqualitaet und didaktische Freigabe kontrolliert werden muessen.

| Schritt | Beschreibung | Zwingende Screens im MVP | Optional im MVP |
|---|---|---|---|
| Mandant/Firma vorbereiten | Company-Kontext pruefen und vorhandene Datenbasis einschaetzen | Firmenprofil / Company-Uebersicht | Dashboard |
| Trainee oder Rolle anlegen | Rolle, Lernziel und Trainingskontext erfassen | Trainee- bzw. Rollenprofil | Lernhistorie / Fortschritt |
| Datenbasis pruefen | Knowledge-Dokumente, Claims, Einkaufshistorie und Importstatus bewerten | Knowledge Base / Datenbasis | Import- und Upload-Uebersicht |
| Projekt oder Szenario auswaehlen | Konkreten Verhandlungsfall definieren oder vorhandenen Fall oeffnen | Verhandlungsprojekt anlegen / bearbeiten | Dashboard |
| Analyse und Strategie pruefen | Analyse, ZOPA, BATNA, Konzessionen und Argumentationslinien fachlich pruefen | Analyseansicht, Strategie-Builder | Kultur- und Rollenbriefing |
| Simulation konfigurieren oder beobachten | Szenario, Rolle, Schwierigkeit und Erfolgskriterien setzen | Simulation konfigurieren | Simulation durchfuehren |
| Feedback ergaenzen | Ergebnis, Nachrichten oder Gesamtdurchlauf kommentieren | Trainerreview / Trainerkommentar | Auswertung und Lerntransfer |
| Lerntransfer dokumentieren | Lernpunkte und naechste Trainingsschritte festhalten | Auswertung und Lerntransfer | Lernhistorie / Fortschritt |

Der Trainer braucht fuer einen sinnvollen MVP zwingend Zugriff auf Firmenprofil, Rollenprofil, Datenbasis, Projekt, Analyse, Strategie und Trainerkommentar. Simulation, Auswertung und Lernhistorie koennen zunaechst als fachliche Zielscreen-Kette vorbereitet werden, solange die produktive Simulation-Engine noch nicht existiert.

## 6. Trainee-Workflow

Der Trainee-Workflow soll gefuehrt sein. Der Trainee startet nicht mit einem freien Chat, sondern bewegt sich schrittweise durch Projektverstaendnis, Analyse, Strategie, Briefing, Simulation und Lerntransfer.

1. **Eigenes Profil sehen oder bearbeiten:** Der Trainee sieht Rolle, Lernziel und relevante Trainingsannahmen im Trainee- bzw. Rollenprofil.
2. **Verhandlungsprojekt verstehen:** Der Trainee oeffnet das zugewiesene Projekt und liest Ziel, Rahmenbedingungen, Lieferant, Anfrageposition und Prioritaeten.
3. **Analyse lesen:** Die Analyseansicht zeigt relevante Daten, Risiken, Chancen, Claims und offene Informationsluecken.
4. **Strategie vorbereiten:** Im Strategie-Builder arbeitet der Trainee mit ZOPA, BATNA, Konzessionen und Argumentationslinien. Je nach MVP-Entscheidung kann der Trainer Inhalte vorbereiten oder freigeben.
5. **Kulturbriefing nutzen:** Das Kultur- und Rollenbriefing liefert Lieferantenannahmen, Gespraechsdynamik und vorsichtig formulierte kulturelle Arbeitshypothesen.
6. **Simulation starten:** Der Trainee startet eine konfigurierte Simulation und wird durch Phasen oder Aufgaben gefuehrt.
7. **Feedback und Lernpunkte erhalten:** Nach Abschluss liest der Trainee Auswertung, Lernpunkte und naechste Schritte.
8. **Trainerkommentar lesen:** Sichtbare Trainerkommentare werden im Kontext von Auswertung, Nachricht oder Gesamtszenario angezeigt.

Wichtig ist, dass jede Station eine klare naechste Aktion vorgibt. Der Trainee soll verstehen, was jetzt zu tun ist, welche Daten belastbar sind und welche Annahmen nur Hypothesen darstellen.

## 7. Admin-Workflow als spaetere Ausbaustufe

Der Admin-Workflow ist kein MVP-Pflichtbestandteil. Er wird nur als spaetere Ausbaustufe skizziert.

- **Mandanten verwalten:** Companies anlegen, deaktivieren, zusammenfuehren oder organisatorisch strukturieren.
- **Nutzer verwalten:** Nutzer einladen, aktivieren, deaktivieren und Companies zuordnen.
- **Rechte/Rollen verwalten:** Sichtbarkeiten fuer Trainer, Trainees, Admins und spaetere Teamrollen steuern.
- **Datenbereinigung / Upload-Verwaltung:** Uploads, ImportJobs, verwaiste Dokumente, fehlerhafte Imports und Datenqualitaet verwalten.
- **Audit-/Compliance-Themen:** Zugriff, Datenveraenderungen, Vertraulichkeitsstufen und Loeschkonzepte nachvollziehbar machen.

Diese Funktionen sollten erst konkretisiert werden, wenn MVP-Workflow, Upload-API, Rechtebedarf und Datenklassifikation klarer sind.

## 8. Backend-Objekt-Mapping je Screen

| Screen | Liest | Erzeugt/veraendert | Spaetere Services | Bemerkung |
|---|---|---|---|---|
| Dashboard | `Company`, `UserProfile`, `NegotiationProject`, `SimulationScenario`, `SimulationResult`, `TrainerComment` | Keine oder nur Status-/Auswahlkontext | Workflow-Service, Lernempfehlungen | Im MVP regelbasierte Uebersicht ausreichend |
| Firmenprofil / Company-Uebersicht | `Company`, `KnowledgeDocument`, `ImportJob`, `ProcurementHistoryItem`, `RequestItem`, `NegotiationProject` | `Company` | Datenqualitaets-Service, Admin-Service | Keine Mandantenverwaltung im MVP |
| Trainee- bzw. Rollenprofil | `UserProfile`, `Company`, `SimulationResult`, `TrainerComment` | `UserProfile` | Lernprofil-Service | `UserProfile` kann Person oder Trainingsrolle abbilden |
| Knowledge Base / Datenbasis | `KnowledgeDocument`, `DocumentChunk`, `KnowledgeClaim`, `ProcurementHistoryItem`, `RequestItem`, `ImportJob`, `ImportRow` | Optional `KnowledgeDocument` oder manuelle Claim-Pflege spaeter | Chunking, Embeddings, RAG, Claim-Extraktion | Keine produktive RAG-Funktion im MVP |
| Import- und Upload-Uebersicht | `ImportJob`, `ImportRow`, `KnowledgeDocument` | Spaeter `ImportJob`, `ImportRow`; ggf. Zielobjekte durch Importverarbeitung | Upload-Service, Parser-Service, Mapping-Service, Validierungsengine, Zielobjekt-Erzeugung | Issue #11 bleibt offen; keine Datei-Metadaten vorziehen |
| Verhandlungsprojekt anlegen / bearbeiten | `Company`, `UserProfile`, `RequestItem`, `SupplierProfile`, `KnowledgeDocument` | `NegotiationProject`, ggf. Zuordnung zu `RequestItem` und `SupplierProfile` | Projektanlage-Service, Plausibilitaetspruefung | Kernscreen fuer MVP |
| Analyseansicht | `NegotiationProject`, `SupplierProfile`, `KnowledgeClaim`, `KnowledgeDocument`, `DocumentChunk`, `ProcurementHistoryItem`, `RequestItem` | Optional Analyse-Notizen in bestehenden JSONB-Feldern spaeter | Analyse-Service, RAG, Claim-Ranking | Fakten, Annahmen und Hypothesen trennen |
| Strategie-Builder | `NegotiationProject`, `SupplierProfile`, `KnowledgeClaim`, `ProcurementHistoryItem`, `RequestItem` | `Strategy`, `ZopaItem`, `BatnaOption`, `ConcessionItem`, `ArgumentationLine` | KI-Strategie-Service, RAG | Im MVP manuell oder trainergefuehrt |
| Kultur- und Rollenbriefing | `SupplierProfile`, `KnowledgeClaim`, `NegotiationProject`, `Strategy` | `SimulationScenario`-Briefing oder spaeter eigene Briefing-Struktur | Kulturbriefing-Service, RAG | Kulturelle Hinweise als Hypothesen markieren |
| Simulation konfigurieren | `NegotiationProject`, `Strategy`, `SupplierProfile`, `UserProfile` | `SimulationScenario` | Simulation-Config-Service, Prompt-Orchestrierung | Keine Engine-Implementierung in diesem Issue |
| Simulation durchfuehren | `SimulationScenario`, `Strategy`, `SupplierProfile`, `NegotiationProject` | `SimulationMessage`, Status auf `SimulationScenario` | Simulation-Engine, Chat/Voice, RAG-Kontext | Konzeptioneller Zielscreen im MVP |
| Auswertung und Lerntransfer | `SimulationScenario`, `SimulationMessage`, `Strategy`, `TrainerComment` | `SimulationResult`, ggf. Lernnotizen in `metadata_json` | Auswertungs-Service, Kompetenzfeedback, Taktikerkennung | Scores optional und didaktisch zu klaeren |
| Trainerreview / Trainerkommentar | `SimulationScenario`, `SimulationResult`, `SimulationMessage`, `UserProfile` | `TrainerComment` | Feedback-Assistenz, Review-Service | Menschliches Feedback bleibt zentral |
| Lernhistorie / Fortschritt | `UserProfile`, `SimulationResult`, `TrainerComment`, `SimulationScenario`, `NegotiationProject` | Optional Fortschrittsnotizen spaeter | Lernpfad-Service, Benchmarking | Keine Zertifikatslogik im MVP |

## 9. KI- und RAG-Anschlussstellen

Dieses Konzept erstellt keine Prompts und keine Implementierung. Es markiert nur fachliche Andockpunkte.

- **Knowledge Base / Datenbasis:** Spaeter Chunking, Embedding-Erzeugung, Claim-Extraktion und Quellenqualitaetsbewertung fuer `KnowledgeDocument`, `DocumentChunk` und `KnowledgeClaim`.
- **Analyseansicht:** Retrieval aus `KnowledgeDocument`, `DocumentChunk`, `KnowledgeClaim`, `ProcurementHistoryItem` und `RequestItem`; Zusammenfassungen mit klarer Trennung von Fakt, Annahme, Hypothese und Empfehlung.
- **Strategie-Builder:** KI-gestuetzte Vorschlaege fuer ZOPA, BATNA, Konzessionen und Argumentationslinien. Vorschlaege sollten editierbar und quellenbasiert sein.
- **Kultur- und Rollenbriefing:** Kontextbezogene kulturelle Arbeitshypothesen, Rollenannahmen und moegliche Taktiken. Diese Hinweise duerfen nicht als deterministische Aussagen erscheinen.
- **Simulation konfigurieren:** Ableitung von Rollenbriefing, Schwierigkeit, Erfolgskriterien und Kontextpaket fuer eine spaetere Simulation-Engine.
- **Simulation durchfuehren:** Rollen- und Szenario-Prompting, phasenbasierter Dialog, optional RAG-Kontext und spaeter Voice-Simulation.
- **Auswertung und Lerntransfer:** Gespraechsanalyse, Kompetenzfeedback, Taktikerkennung, Score-Vorschlaege und naechste Lernschritte.
- **Trainerreview:** KI kann Entwuerfe oder Auffaelligkeiten liefern; menschlicher Trainer entscheidet ueber Feedbackqualitaet und Sichtbarkeit.
- **Lernhistorie:** Spaeter personalisierte Lernpfade, Kompetenztrend-Analyse und Benchmarking.

## 10. MVP-Abgrenzung

### MVP-relevant

- Gefuehrter Workflow statt freier Chatbot.
- Firmenprofil / Company-Uebersicht.
- Trainee- bzw. Rollenprofil.
- Datenbasis-Uebersicht.
- Verhandlungsprojekt.
- Analyseansicht.
- Strategie-Builder.
- Simulation und Auswertung als konzeptioneller Zielscreen.
- Trainerkommentar.
- Klare Trennung von Fakten, Annahmen, Hypothesen und Empfehlungen.

### Spaeter

- Echte Upload-UI.
- Echte Parser-/Mapping-UI.
- Datei-Metadatenentscheidung und ggf. additive Migration aus Issue #11.
- Produktives RAG.
- Chunking-Service und Embedding-Erzeugung.
- KI-Prompts im Detail.
- Simulation-Engine.
- Voice-Simulation.
- Team-/Admin-Dashboards.
- Rechte- und Rollensystem.
- CRM-Anbindung.
- Zertifikatslogik.
- Benchmark-Datenbank.

### Nicht-Ziele dieses Dokuments

- Keine React-/Frontend-Komponenten.
- Keine API-Endpunkte.
- Keine Datenbankmigration.
- Keine Upload-API.
- Keine Parser-/Mapping-Logik.
- Keine Validierungsengine.
- Keine RAG-Implementierung.
- Keine Embedding-Erzeugung.
- Keine KI-Prompts im Detail.
- Keine Simulation-Engine.
- Keine Rechteverwaltung.

## 11. Offene Produktentscheidungen

- Soll der MVP zuerst trainergefuehrt oder trainee-self-service sein?
- Muss der Trainer jede KI-Analyse freigeben, bevor ein Trainee sie sieht?
- Welche Screens brauchen editierbare KI-Vorschlaege?
- Welche Daten sieht ein Trainee nicht?
- Welche Trainernotizen bleiben intern?
- Wird Simulation zunaechst Chat-only oder spaeter Voice?
- Welche Auswertungsscores sind didaktisch sinnvoll?
- Wie stark soll RAG im MVP sichtbar sein?
- Welche Strategiebausteine sind Pflicht, welche optional?
- Soll `UserProfile` im MVP primaer echte Nutzer oder Trainingsrollen modellieren?
- Welche Datenqualitaetsindikatoren braucht die Knowledge Base?
- Ab wann braucht das Produkt ein echtes Rechte- und Rollensystem?
- Wie wird sichergestellt, dass kulturelle Hinweise als Arbeitshypothesen und nicht als stereotype Zuschreibungen genutzt werden?
- Welche Upload- und Datei-Metadaten werden erst im Rahmen von Issue #11 bzw. der spaeteren Upload-API entschieden?
