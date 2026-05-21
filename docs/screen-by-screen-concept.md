# Screen-by-Screen-Konzept fuer das Negotiation Tool

## 1. Ziel und Einordnung

Dieses Dokument uebersetzt den bisherigen fachlichen Workflow des Negotiation Tools in konkrete Screens. Es beschreibt, welche Rollen welche Schritte durchlaufen und welche Informationen je Screen sichtbar oder bearbeitbar sind.

Das Konzept ist keine Frontend-Implementierung. Es definiert keine React-Komponenten, keine UI-Layouts, keine CSS-Regeln, keine API-Endpunkte, keine Datenbankmigrationen und keine Services. Die Screens sind fachliche Produktmodule, die spaeter UX- und Umsetzungsplanung strukturieren sollen.

Der Bezugspunkt ist das bestehende Datenmodell mit `Company`, `UserProfile`, `KnowledgeDocument`, `DocumentChunk`, `KnowledgeClaim`, `RequestItem`, `SupplierProfile`, `ProcurementHistoryItem`, `NegotiationProject`, `ImportJob`, `ImportRow`, `Strategy`, `ZopaItem`, `BatnaOption`, `ConcessionItem`, `ArgumentationLine`, `SimulationScenario`, `SimulationMessage`, `SimulationResult` und `TrainerComment`.

Das Tool wird als workflowbasiertes Verhandlungs-Cockpit verstanden. Der Trainee soll im MVP durch Projektverstaendnis, Analyse, Strategie, Briefing und Trainerfeedback gefuehrt werden. Der Trainer soll Vorbereitung, Szenarien, Simulationskonfiguration und Feedback steuern koennen. Freies, unstrukturiertes Prompting ist nicht der Zielmodus des MVP.

KI, RAG, Embeddings, Prompting und Simulation-Engine werden in diesem Dokument nur als spaetere Anschlussstellen markiert. Upload- und Import-Screens werden fachlich beschrieben, ohne Entscheidungen aus Issue #11 zu Datei-Metadaten, Upload-API oder Storage-Feldern vorzuziehen.

## 2. Nutzerrollen

### Trainee / Verhandler

**Hauptziele**

- Ein konkretes Verhandlungsprojekt verstehen.
- Relevante Analyse- und Kontextinformationen strukturiert aufnehmen.
- Eine Verhandlungsstrategie vorbereiten.
- Aus Trainerfeedback konkrete Lernpunkte ableiten.

**Typische Aktionen**

- Eigenes Rollen- oder Trainee-Profil ansehen und ergaenzen.
- Projektbriefing, Lieferantenannahmen und Datenbasis lesen.
- Analyseergebnisse, ZOPA, BATNA, Konzessionen und Argumentationslinien durcharbeiten.
- Simulationsbriefing und Konfiguration verstehen.
- Lernpunkte und Trainerkommentare lesen.

**Benoetigte Informationen**

- Eigene Rolle, Erfahrungsstand und Trainingsziel.
- Ziel der Verhandlung, Artikel oder Service, Mengen, Zielregion, Preis- und Lieferannahmen.
- Lieferantenprofil, Machtverhaeltnis, Risiken, kultureller Kontext.
- Evidenzen aus Knowledge Base, Einkaufshistorie und Anfragepositionen.
- Feedback zu Vorbereitung, Taktik, Argumentation und Lernpunkten.

**Moegliche Einschraenkungen im MVP**

- Keine freie KI-Chat-Oberflaeche ohne Workflow-Kontext.
- Eingeschraenkter Zugriff auf vertrauliche Daten oder interne Trainernotizen.
- Strategiebausteine koennen im MVP teilweise trainerseitig vorbereitet oder freigegeben werden.
- Simulation durchfuehren, Auswertung und Lernhistorie bleiben Zielbild-Screens und sind keine MVP-Pflicht.

### Trainer / Coach

**Hauptziele**

- Firmen-, Rollen- und Projektdaten fachlich vorbereiten.
- Die Datenbasis fuer Trainings- und Verhandlungsszenarien pruefen.
- Analyse, Strategie und Simulationskonfiguration so steuern, dass Trainees gefuehrt lernen.
- Menschliches Feedback und einfache Lernpunkte dokumentieren.

**Typische Aktionen**

- Company-Kontext, Trainee- oder Rollenprofile und Projektkontext pruefen.
- Knowledge Base und Importstatus fachlich bewerten.
- Verhandlungsprojekt oder Szenario auswaehlen, anlegen oder anpassen.
- Strategiebausteine pruefen, ergaenzen oder freigeben.
- Simulation konfigurieren.
- Trainerkommentare und Lernpunkte dokumentieren.

**Benoetigte Informationen**

- Firmen- und Mandantenkontext.
- Trainee-Profil, Rolle, Erfahrungsstand, Lernziel.
- Projektziele, Lieferantenprofil, Anfragepositionen und Einkaufshistorie.
- Status der Datenbasis, Importstatus, Wissensclaims und Quellenqualitaet.
- Simulationsbriefing, Trainerkommentare und einfache Lernpunkte.

**Moegliche Einschraenkungen im MVP**

- Keine ausgereifte Trainer-Dashboard-Logik.
- Keine produktive Rechteverwaltung.
- Keine automatische KI-Freigabekette.
- Trainerreview kann im MVP als fokussierter Kommentarbereich mit einfacher Sichtbarkeitsmarkierung starten.

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

## 3. Phase-A1-Scope nach Issue #14

Issue #14 finalisiert den MVP-Screen-Scope fachlich. Der MVP besteht aus zehn Core-Screens. Weitere fachliche Faehigkeiten duerfen im MVP nur als reduzierte Erweiterungen innerhalb dieser Screens erscheinen. Sie werden nicht als eigene produktive Module oder eigenstaendige Pflichtscreens verstanden.

### 3.1 MVP-Core-Screens

| Nr. | Screen | Primaere Rolle | MVP-Zweck | MVP-Status |
|---:|---|---|---|---|
| 1 | Dashboard | Trainer, Trainee eingeschraenkt oder spaeter | Schlanker Einstieg in aktive Projekte, Projektstatus, naechste Workflow-Schritte und offene Trainerreviews | MVP-Core |
| 2 | Firmenprofil / Company-Uebersicht | Trainer | Unternehmens- und Mandantenkontext fuer Verhandlungsprojekte bereitstellen | MVP-Core |
| 3 | Trainee- / Rollenprofil | Trainer, Trainee | Reale Person oder Trainingsrolle, Lernziel und Trainingskontext fuer Vorbereitung, Simulation und Feedback klaeren | MVP-Core |
| 4 | Knowledge Base / Datenbasis | Trainer | Vorhandene Quellen und strukturierte Datenlage als fachliche Grundlage sichtbar machen | MVP-Core |
| 5 | Verhandlungsprojekt anlegen / bearbeiten | Trainer, spaeter Trainee | Operatives Herzstueck des MVP: konkreten Verhandlungsfall mit Company, Rolle, Lieferant, Bedarf, Ziel, Rahmenbedingungen und Status definieren | MVP-Core |
| 6 | Analyseansicht | Trainee, Trainer | Projekt-, Firmen-, Lieferanten- und Datenbasis zu einer strukturierten Ausgangslage verdichten und Fakten, Annahmen und Hypothesen trennen | MVP-Core |
| 7 | Strategie-Builder | Trainee, Trainer | Analyse, Projektkontext, Hypothesen und Notizen in eine konkrete Verhandlungsstrategie mit Zielen, ZOPA, WAP, BATNA, Konzessionen und Argumentation uebersetzen | MVP-Core |
| 8 | Kultur- und Rollenbriefing | Trainee, Trainer | Lieferantenrolle, Gespraechsdynamik, Beziehungskontext, kulturelle Arbeitshypothesen und erwartete Taktiken vorsichtig vorbereiten | MVP-Core |
| 9 | Simulation konfigurieren | Trainer | Trainingsdurchlauf fachlich vorbereiten, ohne produktive Simulation-Engine vorauszusetzen | MVP-Core |
| 10 | Trainerreview / Trainerkommentar | Trainer | Menschliches Feedback erfassen, einordnen und fuer Trainees sichtbar machen | MVP-Core |

### 3.2 MVP-Erweiterungen innerhalb bestehender Screens

Diese Erweiterungen gehoeren zum MVP, aber nicht als eigene Screens:

- **Einfache Lieferantenbeziehungsnotiz:** Als Notiz im Verhandlungsprojekt, in der Analyseansicht oder im Kultur- und Rollenbriefing. Sie beschreibt Beziehungslage, Vorgeschichte, Vertrauen, Abhaengigkeiten oder offene Spannungen knapp und fachlich. Sie ist kein Relationship-Memory-Modul.
- **Einfache Stakeholdernotiz:** Als Notiz im Verhandlungsprojekt, in der Analyseansicht oder als strategierelevanter Hinweis im Strategie-Builder. Sie haelt relevante interne oder externe Stakeholder, Interessen, Einfluss, Quelle, Confidence und offene Rueckfragen fest. Sie ist kein Stakeholder-Management-System.
- **Einfache Hypothesenliste:** Als klar markierter Bereich in Analyseansicht, Strategie-Builder oder Kultur- und Rollenbriefing. Hypothesen muessen von Fakten und Annahmen getrennt bleiben und sollen Beobachtung, Confidence, Quelle oder Ursprung, Pruefaktion und Strategieimplikation enthalten koennen.
- **Reduzierter RFQ-/Angebotsvergleich:** Im MVP nur als einfache Notiz- oder Vergleichslogik innerhalb von Verhandlungsprojekt, Analyseansicht oder Strategie-Builder. Es gibt kein eigenstaendiges RFQ-Modul, keine RFQ-Engine, keine vollautomatische Angebotsanalyse und keine neuen Angebotsvergleichsmodelle.

### 3.3 Zielbild-Screens und spaetere Screens

| Zielbild-Screen | Primaere Rolle | Einordnung |
|---|---|---|
| Import- und Upload-Uebersicht | Trainer, spaeter Admin | Kein produktiver MVP-Screen. Upload- und Importstatus duerfen als Datenlage in Knowledge Base oder Company-Kontext referenziert werden, aber nicht als eigene Pflichtoberflaeche. |
| Simulation durchfuehren | Trainee | Kein produktiver MVP-Screen und keine produktive Engine. Die fachliche Durchfuehrung bleibt Zielbild nach der Konfiguration. |
| Auswertung und Lerntransfer | Trainee, Trainer | Kein vollwertiger eigener MVP-Screen. Lernpunkte koennen reduziert im Trainerreview vorkommen. |
| Lernhistorie / Fortschritt | Trainee, Trainer | Spaetere Ausbaustufe, kein MVP. Fortschritt ueber mehrere Durchlaeufe, Zertifikate, Benchmarks und Historienlogik bleiben spaeter. |
| Admin / Rechteverwaltung | Admin | Kein MVP. Mandanten-, Nutzer-, Rechte- und Auditfunktionen bleiben spaetere Ausbaustufe. |
| Relationship Memory als eigenes Modul | Trainer, Trainee | Kein MVP. Beziehungskontext erscheint nur als einfache Lieferantenbeziehungsnotiz innerhalb bestehender Screens. |

### 3.4 Ausdruecklich nicht Teil des MVP

- Import- und Upload-Uebersicht als produktiver Screen.
- Simulation durchfuehren als produktive Engine oder Chat-/Voice-Erlebnis.
- Laufender Chat, Voice-Modus, Streaming-Logik, automatische Taktikerkennung und automatische Auswertung.
- Auswertung und Lerntransfer als vollwertiger eigener Screen.
- Lernhistorie, Fortschrittslogik, Zertifikate, Kompetenztrend-Analyse oder Benchmarks.
- Admin-, Rollen- und Rechteverwaltung.
- Relationship Memory als eigenes Modul.
- Vollautomatische ZOPA-Berechnung, verbindliche KI-Strategie-Generierung, automatische BATNA-Bewertung, vollautomatische Angebotsanalyse, eigenes RFQ-Modul oder automatische Angebotsbewertung.
- Stereotypes Kultururteil, automatisches Laenderprofil als Wahrheit, automatisches Kultur-Scoring oder `CulturalBriefing` als eigenes neues Datenmodell.
- SupplierBid-Modell, BidComparison-Modell, StakeholderNote-Modell, Relationship-Memory-Modul, Stakeholder-Graph oder politische Mapping-Engine.
- OCR, RAG, Embeddings, produktive Upload-Verarbeitung oder automatisierte Claim-Extraktion.
- Neue Datenmodelle, API-Endpunkte, Frontend-Komponenten oder technische Implementierungsdetails.

Die Folgeissues #15, #16, #17 und #18 sollten auf Basis dieser Abgrenzung als nachgelagerte Detail-Cluster behandelt werden. Sie konkretisieren einzelne fachliche Bereiche erst nach der hier festgelegten MVP-Screen-Grenze.

## 4. Screen-by-Screen-Beschreibung

### 1. Dashboard

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Schlanker Einstieg in aktive Verhandlungsprojekte und deren naechste fachliche Schritte. Der Dashboard-Screen soll im MVP helfen, schnell zu erkennen, welche Projekte laufen, wo sie im Workflow stehen und welche Traineraktion als naechstes ansteht.

**Rolle im Workflow:** Der Screen ist der Startpunkt fuer den trainergefuehrten MVP-Workflow. Von hier aus springt der Trainer in Company-Kontext, Trainee- oder Rollenprofil, Datenbasis, Projektbearbeitung, Analyse, Strategie, Simulationskonfiguration oder Trainerreview. Fuer Trainees kann der Dashboard-Zugang spaeter oder eingeschraenkt genutzt werden, etwa fuer zugewiesene Projekte und freigegebene naechste Schritte.

**Primaere Nutzer:** Zunaechst Trainer. Trainee-Nutzung ist im MVP optional, eingeschraenkt oder spaeter zu konkretisieren.

**Mindestens sichtbar im MVP:**

- Aktive Verhandlungsprojekte.
- Zugeordnete Company.
- Zugeordneter Trainee oder zugeordnete Trainingsrolle.
- Projektstatus im fachlichen Workflow.
- Naechster empfohlener Workflow-Schritt.
- Offene Trainerreviews oder offene Trainerkommentare.

**Im MVP editierbar:** Der Dashboard-Screen selbst ist primaer Navigation und Uebersicht. Direkt editierbar sollten hoechstens einfache Status- oder Review-Orientierungen sein, sofern diese fachlich bereits in den zugehoerigen Projekt- oder Review-Screens gepflegt werden. Die eigentliche Bearbeitung findet in den jeweiligen Fachscreens statt.

**Optional oder spaeter:** Trainee-Dashboard, persoenliche Lernuebersicht, Teamuebersicht, uebergreifende Priorisierung, Benachrichtigungen und tiefergehende Statuslogik.

**MVP-Abgrenzung:** Kein Team-Dashboard, keine Admin-KPIs, keine komplexen Analytics, keine Lernhistorie, keine automatisierte KI-Priorisierung als Pflicht und kein produktiver Simulationsstart als Pflicht.

**Offene Produktentscheidungen:** Welche Dashboard-Informationen ein Trainee sehen darf, ob der naechste Schritt rein statusbasiert oder trainergesetzt ist und welche Statuswerte fuer den MVP ausreichen.

### 2. Firmenprofil / Company-Uebersicht

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Unternehmens- und Mandantenkontext fuer Verhandlungsprojekte bereitstellen. Der Screen klaert, aus welchem Firmenkontext ein Projekt kommt, welche Verhandlungssituationen typisch sind und welche Datenbasis fuer diesen Kontext bereits vorhanden ist.

**Rolle im Workflow:** Der Screen liegt vor Projektdefinition, Analyse und Strategie. Er gibt dem Trainer den fachlichen Rahmen, aus dem Verhandlungsprojekte, Datenlage, Risiken und Trainingsszenarien abgeleitet werden.

**Primaere Nutzer:** Trainer.

**Mindestens sichtbar im MVP:**

- Firmenname.
- Branche.
- Rolle des Unternehmens in Verhandlungen, zum Beispiel einkaufende Organisation, Mandant oder Trainingsfall.
- Relevante Maerkte oder Regionen.
- Strategischer Druck, etwa Kosten-, Liefer-, Risiko- oder Transformationsdruck.
- Kritische Warengruppen.
- Typische Verhandlungssituationen.
- Relevante Datenquellen.
- Verknuepfte Verhandlungsprojekte.

**Im MVP editierbar:** Firmenname, Branche, Maerkte oder Regionen, strategischer Druck, kritische Warengruppen, typische Verhandlungssituationen und fachliche Hinweise zu relevanten Datenquellen. Verknuepfte Projekte werden fachlich sichtbar, sollten aber ueber Projektanlage oder Projektbearbeitung gepflegt werden.

**Optional oder spaeter:** Ausgereifte Mandantenstruktur, Organisationshierarchien, Ansprechpartnerlisten, CRM-/ERP-Synchronisation, Compliance- oder Auditinformationen, automatische Unternehmensanalyse und umfangreiche Datenqualitaetsauswertung je Company.

**MVP-Abgrenzung:** Keine komplexe Mandantenadministration, keine Rechteverwaltung, keine vollstaendige CRM-/ERP-Integration, keine automatische Unternehmensanalyse als Pflicht und keine Upload-Verwaltung als eigener Arbeitsbereich.

**Offene Produktentscheidungen:** Welche Company-Felder fuer alle Trainingsfaelle verpflichtend sind, wie stark Mandant und Company fachlich getrennt werden sollen und welche Datenquellen nur referenziert statt produktiv verarbeitet werden.

### 3. Trainee- / Rollenprofil

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Personalisierung von Vorbereitung, Simulation und Trainerfeedback. Der Screen beschreibt, wer trainiert wird oder welche Rolle im Trainingsfall eingenommen wird, damit Analyse, Strategie, Briefing und Trainerkommentar didaktisch passend eingeordnet werden koennen.

**Rolle im Workflow:** Das Profil beeinflusst Projektbriefing, Simulationskonfiguration und Trainerreview. Es hilft dem Trainer, Aufgaben, Schwierigkeitsgrad, Feedbacktiefe und sichtbare Hinweise passend zum Erfahrungsstand und Trainingsziel zu setzen.

**Primaere Nutzer:** Trainer und Trainee.

**Fachliche Entscheidung fuer den MVP:** `UserProfile` kann im MVP sowohl eine reale Person als auch eine Trainingsrolle abbilden. Das Profil muss deshalb nicht zwingend einen produktiven Nutzeraccount repraesentieren. Es kann auch eine Rolle wie "junioriger Einkaeufer", "Lead Buyer Packaging" oder "technischer Verhandler im Trainingsszenario" beschreiben.

**Mindestens sichtbar im MVP:**

- Name oder Rollenname.
- Funktion.
- Erfahrungsstand.
- Verhandlungsrolle.
- Trainingsziele.
- Sprache.
- Optionale Persoenlichkeits- oder DISC-Hinweise.
- Bekannte Entwicklungsfelder.

**Im MVP editierbar:** Name oder Rollenname, Funktion, Erfahrungsstand, Verhandlungsrolle, Trainingsziele, Sprache und fachliche Entwicklungsfelder. Persoenlichkeits- oder DISC-Hinweise bleiben optional und sollten nur gepflegt werden, wenn sie fuer das Training fachlich sinnvoll und verantwortbar sind.

**Sichtbarkeit im MVP:** Einige Hinweise koennen trainee-sichtbar sein, etwa Rolle, Trainingsziele, Sprache und ausgewaehlte Entwicklungsfelder. Sensible Trainerhinweise, interne Einschaetzungen oder didaktische Notizen koennen trainerintern bleiben. Die konkrete Sichtbarkeitslogik bleibt fachlich zu klaeren und wird in diesem Dokument nicht technisch spezifiziert.

**Optional oder spaeter:** Kompetenzmatrix, Lernhistorie, Zertifikate, Benchmarking, fein granularer Skill-Fortschritt, ausgereifte Nutzerverwaltung und komplexe Rollenrechte.

**MVP-Abgrenzung:** Keine Kompetenzmatrix, keine Zertifikatslogik, keine ausgereifte Nutzerverwaltung, keine komplexen Rollenrechte und keine Pflicht zur Abbildung produktiver Organisationsaccounts.

**Offene Produktentscheidungen:** Welche Profilfelder Trainees selbst bearbeiten duerfen, welche Trainerhinweise intern bleiben, wie reale Personen und reine Trainingsrollen sprachlich unterschieden werden und ob DISC- oder Persoenlichkeitshinweise im MVP ueberhaupt aktiv genutzt werden.

### 4. Knowledge Base / Datenbasis

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Vorhandene Quellen und strukturierte Daten als fachliche Grundlage sichtbar machen. Der Screen soll dem Trainer zeigen, welche belastbaren Informationen fuer Company und Projekt bereits vorliegen, welche Aussagen daraus bekannt sind und wo Datenluecken bestehen.

**Rolle im Workflow:** Die Datenbasis stuetzt Analyseansicht, Strategie-Builder, Kultur- und Rollenbriefing sowie Simulationskonfiguration. Sie ist im MVP eine Uebersicht ueber vorhandenes Material und Datenlage, keine produktive Such- oder Import-Engine.

**Primaere Nutzer:** Trainer.

**Mindestens sichtbar im MVP:**

- Vorhandene Dokumente.
- Quelle oder Dokumenttyp.
- Bezug zu Company oder Verhandlungsprojekt.
- Vorhandene Einkaufshistorie.
- Vorhandene Anfragepositionen.
- Vorhandene Knowledge Claims, falls bereits vorhanden.
- Erkennbare Datenluecken.
- Einfache Qualitaets- oder Vertrauenshinweise.

**Im MVP editierbar:** Fachliche Hinweise zu Quellen, einfache Qualitaets- oder Vertrauenseinschaetzungen, Markierung erkannter Datenluecken und ggf. manuelle Korrektur oder Einordnung vorhandener Claims, sofern Claims bereits im Datenbestand existieren. Dokument-Upload, Parsing und automatische Extraktion werden hier nicht als Screen-Funktion definiert.

**Optional oder spaeter:** Produktive RAG-Suche, semantische Suche, Embeddings, automatische Claim-Extraktion, OCR, Upload- und Import-Engine, Mapping- und Validierungsoberflaechen, Importjob-Monitoring und umfassende Datenqualitaetsmetriken.

**MVP-Abgrenzung:** Keine produktive RAG-Suche, keine Embedding-Erzeugung, keine automatische Claim-Extraktion als Pflicht, keine OCR-Funktion, keine Upload-/Import-Engine in diesem Screen und keine Import-/Upload-Uebersicht als eigenstaendiger MVP-Screen. Eine Import-/Upload-Uebersicht bleibt Zielbild oder spaetere Ausbaustufe.

**Offene Produktentscheidungen:** Welche einfachen Qualitaets- oder Vertrauenshinweise ausreichen, wie Datenluecken fachlich markiert werden, ob Claims im MVP nur gelesen oder auch manuell gepflegt werden und wie Company-weite von projektbezogenen Quellen unterschieden werden.

### 5. Verhandlungsprojekt anlegen / bearbeiten

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Das Verhandlungsprojekt ist das operative Herzstueck des MVP. Der Screen definiert den konkreten Verhandlungsfall und verbindet Company, Trainee oder Rolle, Lieferant, Bedarf, Ziel, Rahmenbedingungen, Business Pressure, technische Abhaengigkeiten, Supplier Power und Workflow-Status. Aus diesem Screen entsteht der fachliche Bezugspunkt fuer Analyse, Strategie, Briefing, Simulationskonfiguration und Trainerreview.

**Rolle im Workflow:** Der Screen uebersetzt den Company- und Datenkontext in eine konkrete Verhandlungssituation. Er liegt nach Firmenprofil, Trainee- oder Rollenprofil und Datenbasis und vor Analyse und Strategie. Ohne sauber beschriebenes Projekt bleiben Analyse, Hypothesen und spaetere Trainingslogik zu abstrakt.

**Primaere Nutzer:** Zunaechst Trainer. Eine Projektanlage durch Trainees ist optional oder spaeter zu entscheiden.

**Mindestens sichtbar im MVP:**

- Projekttitel.
- Company.
- Zugeordneter Trainee oder zugeordnete Rolle.
- Verhandlungsart.
- Warengruppe.
- Artikel oder Leistung.
- Menge.
- Zielregion.
- Gewuenschte Lieferzeit.
- Interne Preisannahme oder Zielgroesse.
- Aktueller oder potenzieller Lieferant.
- Projektprioritaet.
- Projektstatus.
- Business Pressure.
- Technische Abhaengigkeit.
- Supplier Power oder Lieferantenmacht.
- Risikoindikatoren.
- Einfache Lieferantenbeziehungsnotiz.
- Einfache Stakeholdernotiz.

**Im MVP editierbar:** Die wichtigsten Projekt- und Kontextfelder sollen trainerseitig manuell pflegbar sein: Titel, Company-Bezug, Rolle oder Trainee, Verhandlungsart, Warengruppe, Artikel oder Leistung, Menge, Region, Lieferzeit, interne Zielgroesse, Lieferant, Prioritaet, Status, Business Pressure, technische Abhaengigkeit, Supplier Power, Risikoindikatoren und einfache Kontextnotizen. Eine automatische Projektanlage aus Importdaten ist keine MVP-Pflicht.

**Einfache Lieferantenbeziehungsnotiz:** Diese Notiz beschreibt im MVP nur die qualitative Beziehung zum Lieferanten im Kontext dieses Projekts. Moegliche Inhalte sind Beziehungslage wie neu, etabliert, belastet, partnerschaftlich oder eskaliert, bisherige Erfahrungen, bekannte Konflikte, bekannte Argumentationsmuster, technische oder kommerzielle Abhaengigkeit, persoenliche Beziehungsebene, offene Spannungen sowie bisherige Zugestaendnisse oder Eskalationen. Sie ist ausdruecklich kein Relationship-Memory-Modul, keine vollstaendige Beziehungshistorie und keine automatische Dokumentenauswertung.

**Einfache Stakeholdernotiz:** Diese Notiz macht interne oder externe Stakeholderinteressen sichtbar, ohne ein eigenes Stakeholder-System zu bauen. Moegliche Inhalte sind Stakeholder oder Bereich, Rolle wie Entscheider, Einflussnehmer, Betroffener, Blockierer oder Unterstuetzer, Interesse, Haltung, Einfluss, Notiz, Quelle, Confidence und Sichtbarkeit als trainerintern oder trainee-sichtbar. Sie ist keine Rechte- oder Freigabelogik und kein politisches Mapping.

**Optionale oder spaetere Informationen:** Automatische Ableitung aus Importdaten, feinere Freigabe- oder Eskalationslogik, mehrere Verhandlungsrunden, umfangreiche Beziehungshistorie, strukturierte Stakeholderlandschaft, integrierte Ausschreibungsakte und technische Angebotsauswertung bleiben spaeter.

**MVP-Abgrenzung:** Keine automatische Projektanlage aus Importdaten, keine CRM-/ERP-Anbindung, keine komplexe Projektfreigabe, kein eigenes RFQ-Modul, keine RFQ-Engine, kein Relationship Memory, kein Stakeholder-Graph, kein ProjectParticipant-Modell, kein StakeholderNote-Modell und keine neuen technischen Implementierungsdetails.

**Offene Produktentscheidungen:** Welche Projektfelder im MVP Pflichtfelder sind, ob Trainees Projekte selbst anlegen duerfen, welche Notizen trainee-sichtbar sind, welche Risikoindikatoren minimal reichen und wann aus reduzierten Notizen spaeter eigene Procurement- oder Relationship-Funktionen werden.

### 6. Analyseansicht

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Die Analyseansicht macht aus Projekt-, Firmen-, Lieferanten- und Datenbasis eine strukturierte Verhandlungsausgangslage. Sie soll Trainee und Trainer helfen, das Verhandlungsproblem zu verstehen, belegte Informationen von Einschaetzungen zu trennen und offene Pruefpunkte in Strategiearbeit zu uebersetzen.

**Rolle im Workflow:** Die Analyseansicht folgt auf Projektdefinition und Datenbasis. Sie bereitet Strategie-Builder, Kultur- und Rollenbriefing, Simulationskonfiguration und Trainerreview vor. Sie ist kein automatischer Wahrheitsgenerator, sondern ein strukturierter Arbeitsraum fuer Ausgangslage, Datenluecken, Risiken, Chancen, Annahmen und Hypothesen.

**Primaere Nutzer:** Trainer und Trainee.

**Mindestens sichtbar im MVP:**

- Kurzbriefing des Verhandlungsfalls.
- Relevante Projektinformationen.
- Relevante Lieferanteninformationen.
- Einkaufshistorie, falls vorhanden.
- Anfragepositionen, falls vorhanden.
- Relevante Knowledge Claims, falls vorhanden.
- Datenluecken.
- Risiken.
- Chancen.
- Supplier Power oder Lieferantenmacht.
- Technische Abhaengigkeit.
- Business Pressure.
- Offene Fragen.
- Einfache Stakeholdernotiz.
- Einfache Hypothesenliste.
- Optional reduzierte RFQ-/Angebotsvergleichsnotizen.

**Im MVP editierbar:** Trainerseitig sollen Datenluecken, Risiken, Chancen, offene Fragen, einfache Stakeholdernotizen und Hypothesen manuell gepflegt oder korrigiert werden koennen. Trainee-Bearbeitung ist fachlich moeglich, aber je nach Trainingssetting optional oder trainerfreizugeben. Knowledge Claims, Einkaufshistorie und Anfragepositionen koennen in der Analyse sichtbar sein, ohne dass dieser Screen Import-, Claim-Extraktions- oder Datenpflegefunktionen uebernimmt.

**Trennung von Fakten, Annahmen und Hypothesen:** Fakten, Annahmen und Hypothesen muessen im MVP sichtbar getrennt werden.

- **Fakten:** Belegte oder vorhandene Informationen aus Datenbasis, Einkaufshistorie, Anfragepositionen, Knowledge Claims oder manuell bestaetigten Quellen.
- **Annahmen:** Plausible, aber nicht sicher belegte Einschaetzungen, etwa zur Preisentwicklung, internen Prioritaet oder Lieferfaehigkeit.
- **Hypothesen:** Ueberpruefbare Vermutungen ueber Motive, Zwaenge, Taktiken oder Interessen der Gegenseite oder interner Stakeholder.

**Einfache Hypothesenliste:** Die Hypothesenliste ist eine eingebettete MVP-Erweiterung der Analyseansicht und ggf. des Strategie-Builders oder Briefings. Sie soll Verhandler bewusst darin trainieren, belegte Fakten von pruefbaren Vermutungen zu unterscheiden.

Moegliche Hypothesentypen:

- Lieferantenmotiv.
- Preisdruck.
- Kapazitaetsargument.
- Taktischer Anker.
- Interner Entscheidungsdruck.
- Technische Abhaengigkeit.
- Verhandlungsbereitschaft.
- Kulturelle oder organisatorische Arbeitshypothese.

Mindeststruktur einer Hypothese:

- Beobachtung.
- Hypothese.
- Confidence.
- Quelle oder Ursprung.
- Pruefaktion.
- Moegliche Strategieimplikation.

Qualitaetsregel: Hypothesen duerfen nicht als Fakten dargestellt werden. Jede relevante Hypothese soll idealerweise eine Pruefaktion bekommen und ihre moegliche Strategieimplikation sichtbar machen.

**Einfache Stakeholdernotiz in der Analyse:** Stakeholderinformationen koennen hier sichtbar werden, wenn sie die Ausgangslage, interne Interessen, Freigabedruck oder Konflikte beeinflussen. Sie bleiben eingebettete Notizen mit Stakeholder oder Bereich, Rolle, Interesse, Haltung, Einfluss, Notiz, Quelle, Confidence und Sichtbarkeit. Daraus entsteht im MVP kein Stakeholder-Graph, kein ProjectParticipant-Modell, kein eigenes StakeholderNote-Modell, keine Rechte- oder Freigabelogik und keine politische Mapping-Engine.

**Reduzierter RFQ-/Angebotsvergleich:** Falls ein Projekt aus einer Ausschreibung oder mehreren Angeboten entsteht, darf die Analyseansicht verhandlungsrelevante Unterschiede als eingebettete Notiz- oder Vergleichslogik sichtbar machen. Moegliche Inhalte sind Lieferant, Preis, Menge, Lieferzeit, Zahlungsziel, technische Vergleichbarkeit, Risiko, TCO-Hinweis, offene Rueckfragen und verhandlungsrelevanter Punkt. Diese Logik dient der Vorbereitung von Fragen und Hebeln, nicht einer produktiven Angebotsbewertung.

**Optionale oder spaetere Informationen:** KI-gestuetzte Analysevorschlaege, automatische Angebotsvergleiche, automatische Lieferantenbewertungen, OCR-/RAG-gestuetzte Quellenarbeit, detaillierte TCO-Berechnungen und komplexe Scoringmodelle bleiben spaeter.

**MVP-Abgrenzung:** Keine produktive automatische Analysepflicht, keine automatische Angebotsanalyse, keine automatische Lieferantenbewertung, keine OCR-/RAG-Pflicht, keine KI-generierte Analyse als verbindliche Wahrheit, keine automatische Hypothesengenerierung als Pflicht, keine KI-Wahrheitsbewertung, kein komplexes Scoringmodell, kein eigenes RFQ-Modul, kein SupplierBid-Modell, kein BidComparison-Modell, keine Lieferantenportale, keine automatische TCO-Berechnung und keine neuen Datenmodelle.

**Offene Produktentscheidungen:** Welche Analysebestandteile fuer Trainees sichtbar sind, wer Hypothesen bearbeiten darf, wie Confidence sprachlich standardisiert wird, welche reduzierte RFQ-/Angebotsvergleichslogik fuer den MVP ausreicht und ab wann spaeter eigenstaendige Procurement-Module gerechtfertigt sind.

### 7. Strategie-Builder

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Der Strategie-Builder uebersetzt Analyse, Projektkontext, Lieferantenannahmen, Stakeholdernotizen, Hypothesen und Datenlage in eine konkrete Verhandlungsstrategie. Er macht aus der strukturierten Ausgangslage handlungsfaehige Ziele, Grenzen, Alternativen, Argumentationslinien und Konzessionslogik.

**Rolle im Workflow:** Der Screen folgt auf Verhandlungsprojekt, Datenbasis und Analyseansicht. Er ist die Bruecke zwischen Verstehen und Handeln: Fakten, Annahmen, Hypothesen, offene Fragen, Stakeholderinteressen und Lieferantenbeziehungsnotizen werden hier daraufhin geprueft, welche strategische Konsequenz sie fuer Zielsetzung, Verhandlungsfuehrung, Konzessionen, Argumentation, Eskalation und spaetere Simulationsvorbereitung haben.

**Primaere Nutzer:** Trainer und Trainee.

**Mindestens sichtbar im MVP:**

- Strategietitel.
- Bezug zum Verhandlungsprojekt.
- Zielbild.
- Muss-Ziele.
- Soll-Ziele.
- Nice-to-have-Ziele.
- ZOPA-Dimensionen.
- WAP / Walk-away-Grenzen.
- BATNA-Optionen.
- Bewertung der BATNA-Staerke.
- Konzessionslogik.
- Konzessionen nur gegen Gegenleistung.
- Argumentationslinien.
- Erwartete Gegenargumente.
- Reaktionsoptionen.
- Offene Fragen.
- Hypothesen mit Strategieimplikation.
- Einfache Stakeholder- und Lieferantenbeziehungsnotizen, falls strategierelevant.
- Eskalationspfad als einfache Notiz.
- Reduzierte RFQ-/Angebotsvergleichsnotizen, falls relevant.

**Uebersetzung von Analyse in Strategie:** Die Analyseansicht liefert Fakten, Annahmen, Hypothesen, Risiken, Chancen, Datenluecken, Stakeholdernotizen, Lieferantenbeziehungsnotizen und reduzierte Angebotsvergleichsnotizen. Der Strategie-Builder uebersetzt diese Elemente in konkrete strategische Entscheidungen:

- Fakten und Datenlage werden zu Zielbild, Muss-/Soll-/Nice-to-have-Zielen, WAP und Argumentationslinien verdichtet.
- Hypothesen werden nicht als Wahrheit uebernommen, sondern mit Strategieimplikation und Pruefaktion gefuehrt.
- Stakeholdernotizen zeigen, welche internen Interessen, Freigaben, Blockaden oder Eskalationswege in der Strategie beruecksichtigt werden muessen.
- Lieferantenbeziehungsnotizen zeigen, ob Beziehungspflege, Eskalation, Vertrauensaufbau, harte Abgrenzung oder vorsichtige Paketbildung strategisch sinnvoll sind.
- Reduzierte RFQ-/Angebotsvergleichsnotizen koennen Preis-, Lieferzeit-, Risiko-, Technik- oder TCO-Hebel fuer Argumente, Alternativen und Konzessionspakete liefern.

**Konzessionsverstaendnis:** Konzessionen sollen im MVP ausdruecklich als Tauschobjekte verstanden werden, nicht als reines Nachgeben. Jede relevante Konzession sollte deshalb fachlich mit moeglicher Gegenleistung, Wert fuer die Gegenseite, Kosten oder Risiko fuer die eigene Seite und Reihenfolge im Gespraech gedacht werden. Die Grundregel lautet: Konzessionen nur gegen Gegenleistung oder gegen strategischen Nutzen.

**ZOPA, WAP und BATNA im MVP:** ZOPA, WAP und BATNA duerfen im MVP manuell oder trainergefuehrt gepflegt werden. Es gibt keine automatische Berechnungspflicht. Eine BATNA-Staerke kann als einfache fachliche Einschaetzung sichtbar sein, ohne dass das System sie automatisch oder verbindlich bewertet.

**Im MVP editierbar:** Trainerseitig sollten alle Strategiebausteine bearbeitbar sein: Ziele, ZOPA-Dimensionen, WAP, BATNA-Optionen, BATNA-Staerke, Konzessionen, Argumentationslinien, Gegenargumente, Reaktionsoptionen, offene Fragen, Hypothesenimplikationen, strategierelevante Notizen und Eskalationspfad. Trainee-Bearbeitung kann je nach Trainingssetting erlaubt, eingeschraenkt oder durch Trainer freizugeben sein.

**Optional oder spaeter:** KI-gestuetzte Strategievorschlaege, automatische ZOPA- oder BATNA-Ableitung, komplexe Strategieversionierung, verbindliche Freigaben, automatische Angebotsanalyse, detaillierte Paketoptimierung und wiederverwendbare Strategie-Templates bleiben spaeter.

**MVP-Abgrenzung:** Keine automatische ZOPA-Berechnung, keine verbindliche KI-Strategie-Generierung, keine automatische BATNA-Bewertung, keine rechtliche oder kommerzielle Freigabelogik, keine komplexe Strategieversionierung, keine automatische Angebotsanalyse, keine eigene RFQ-Arbeitsstrecke und keine technische Implementierung.

**Offene Produktentscheidungen:** Welche Strategiebausteine sind Pflicht, welche Felder bleiben optional, welche Strategiebausteine darf der Trainee selbst bearbeiten, braucht eine Strategie Trainerfreigabe und wie sichtbar werden trainerinterne Strategiehinweise.

### 8. Kultur- und Rollenbriefing

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Der Screen bereitet Trainee und Trainer auf Lieferantenrolle, Gespraechsdynamik, Beziehungskontext, kulturelle Arbeitshypothesen und erwartete Taktiken vor. Er hilft, die Gegenseite nicht nur als Organisation, sondern als Rolle im konkreten Gespraech zu verstehen.

**Rolle im Workflow:** Das Kultur- und Rollenbriefing folgt auf Analyse und Strategie und bereitet Simulationskonfiguration oder reale Gespraechsvorbereitung fachlich vor. Es macht sichtbar, welche Annahmen ueber Interessen, Constraints, Taktiken, Beziehung und Kommunikation fuer das Gespraech relevant sind und welche davon noch geprueft werden sollten.

**Primaere Nutzer:** Trainer und Trainee.

**Mindestens sichtbar im MVP:**

- Bezug zum Verhandlungsprojekt.
- Lieferant oder Gegenrolle.
- Rollenbeschreibung der Gegenseite.
- Erwartete Interessen.
- Erwartete Constraints.
- Moegliche taktische Muster.
- Beziehungskontext.
- Kulturelle Arbeitshypothesen.
- Do's / Don'ts als praktische Hinweise.
- Kommunikationsrisiken.
- Hierarchie- oder Entscheidungslogik, falls relevant.
- Offene Unsicherheiten.
- Hinweise, welche Annahmen geprueft werden sollten.

**Kulturelle Arbeitshypothesen:** Kulturelle Hinweise sind im MVP Arbeitshypothesen, keine Zuschreibungen und keine harten Wahrheiten. Sie muessen kontextbezogen, vorsichtig formuliert und als Hypothesen gekennzeichnet sein. Sinnvoll sind Hinweise wie moegliche Kommunikationsrisiken, Entscheidungswege, Hierarchieerwartungen oder Gespraechsrituale, sofern sie aus Projektkontext, Trainerwissen, Lieferantenerfahrung oder plausiblen Quellen abgeleitet und nicht deterministisch formuliert werden.

**Bias-Abgrenzung:** Der Screen darf keine stereotypen oder deterministischen Aussagen erzeugen. Er soll nicht behaupten, dass Personen aufgrund von Land, Kultur oder Herkunft auf eine bestimmte Weise handeln. Kulturhinweise sollen immer an Kontext, Rolle, Organisation, Situation und Unsicherheit gebunden sein. Offene Unsicherheiten und Prueffragen sind ausdruecklich Teil des Briefings.

**Im MVP editierbar:** Trainerseitig sollten Rollenbeschreibung, Beziehungskontext, kulturelle Arbeitshypothesen, erwartete Taktiken, Do's / Don'ts, Kommunikationsrisiken, offene Unsicherheiten und Pruefhinweise bearbeitbar sein. Trainee-Bearbeitung ist optional und kann je nach Trainingssetting eingeschraenkt oder freigegeben werden.

**Optional oder spaeter:** Eigenes Kulturbriefing-Fachobjekt, automatische Bias-Bewertung, quellenbasierte Laender- oder Organisationsprofile, produktive KI-Rollenengine, dynamisch simuliertes Gegenrollenverhalten und systematische Auswertung kultureller Interaktionsmuster bleiben spaeter.

**MVP-Abgrenzung:** Kein stereotypes Kultururteil, kein automatisches Laenderprofil als Wahrheit, kein `CulturalBriefing` als eigenes neues Datenmodell, keine automatische Bias-Bewertung, keine automatische Simulation der Gegenseite, keine produktive KI-Rollenengine und keine technische Implementierung.

**Offene Produktentscheidungen:** Welche kulturellen Hinweise didaktisch sinnvoll sind, welche Inhalte trainerintern bleiben, wie Bias sprachlich vermieden wird, wie klar Kulturhinweise als Hypothesen markiert werden muessen und wann ein Kulturbriefing spaeter ein eigenes Fachobjekt wird.

### 9. Simulation konfigurieren

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Der Screen bereitet einen Trainingsdurchlauf fachlich vor, ohne eine produktive Simulation-Engine vorauszusetzen. Er beschreibt, was eine spaetere Simulation braucht: Szenario, Rolle, Ziel, Schwierigkeit, Gespraechsphase, Sprache, Briefing, Erfolgskriterien und trainerinterne Hinweise.

**Rolle im Workflow:** Die Simulationskonfiguration folgt auf Strategie-Builder und Kultur- und Rollenbriefing. Sie verdichtet Strategie, Gegenrolle, erwartete Einwaende, taktische Muster und Lernziel in ein vorbereitetes Szenario. Im MVP ist sie Vorbereitung, nicht Durchfuehrung.

**Primaere Nutzer:** Trainer.

**Mindestens sichtbar im MVP:**

- Szenariotitel.
- Bezug zum Verhandlungsprojekt.
- Zugeordnete Strategie.
- Zugeordneter Trainee oder Rolle.
- Lieferant / Gegenrolle.
- Rollenbeschreibung der Gegenseite.
- Gespraechsphase.
- Schwierigkeitsgrad.
- Sprache.
- Ziel der Simulation.
- Erfolgskriterien.
- Zeitrahmen oder Laenge.
- Briefing fuer den Trainee.
- Interne Trainerhinweise.
- Erwartete Einwaende oder taktische Muster.
- Startbereitschaft als fachlicher Status.

**Vorbereitung statt Durchfuehrung:** Simulation konfigurieren ist im MVP ein Vorbereitungsscreen. Er beschreibt, welche fachlichen Parameter eine spaetere Simulation braucht. Er ist nicht gleichbedeutend mit produktiver Simulationsdurchfuehrung, laufendem Chat, Voice-Modus, Streaming, automatischer Taktikerkennung oder automatischer Auswertung.

**Schwierigkeitsgrade als fachliche Orientierung:** Die folgenden Level koennen im MVP als Orientierung fuer Trainer dienen. Sie beschreiben didaktische Intensitaet, keine technische Engine-Logik.

1. **Guided Practice:** Gefuehrte Uebung mit klaren Hinweisen, niedriger Druckintensitaet und Fokus auf Grundstruktur.
2. **Realistic Standard:** Realistischer Standardfall mit typischen Einwaenden und normaler Verhandlungsdynamik.
3. **Pressure:** Hoeherer Zeit-, Kosten- oder Lieferdruck, der Priorisierung und Standfestigkeit trainiert.
4. **Tactical:** Staerker taktisches Gegenverhalten, etwa Anker, Fristen, Eskalationsandrohung oder Informationsasymmetrie.
5. **Executive Escalation:** Managementnahe oder eskalierte Situation mit hoher Sichtbarkeit, knapper Zeit und sensibler Stakeholderdynamik.

**Moegliche Gespraechsphasen:** Fuer die fachliche Vorbereitung sind diese Phasen sinnvoll:

- Vorbereitung / Briefing.
- Opening.
- Exploration.
- Bargaining.
- Closing.
- Debriefing.

**Im MVP editierbar:** Trainerseitig sollten Szenariotitel, zugeordnete Rolle, Schwierigkeitsgrad, Gespraechsphase, Sprache, Ziel, Erfolgskriterien, Zeitrahmen, Trainee-Briefing, interne Trainerhinweise und erwartete Einwaende oder taktische Muster bearbeitbar sein.

**Optional oder spaeter:** Produktive Simulation, laufender Chat, Dialogspeicherung, automatische Auswertung, Scorelogik, Voice, Streaming, automatische Taktikerkennung, RAG-Anbindung, Prompt-Engine-Spezifikation und adaptive Schwierigkeit bleiben spaeter.

**MVP-Abgrenzung:** Keine produktive Simulation-Engine, kein laufender Chat, kein Voice-Modus, keine Streaming-Logik, keine automatische Taktikerkennung, keine automatische Auswertung, keine technische Prompt-Engine-Spezifikation und keine RAG-Anbindung als Pflicht.

**Offene Produktentscheidungen:** Welche Szenariotypen zuerst gebraucht werden, welche Schwierigkeitsgrade fuer den MVP reichen, welche Gespraechsphasen fest gefuehrt werden sollen, wann aus der Konfiguration ein produktiver Simulationsscreen wird und welche Trainerhinweise fuer Trainees unsichtbar bleiben.

### 10. Trainerreview / Trainerkommentar

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Trainerreview sichert im MVP den didaktischen Mehrwert des Tools. Der Screen erlaubt menschliche Einordnung, Feedback, Korrektur und Lernfokus zu Projekt, Analyse, Strategie, Kultur- und Rollenbriefing oder Simulationskonfiguration, ohne automatische Auswertung oder produktive Simulationsdurchfuehrung vorauszusetzen.

**Rolle im Workflow:** Trainerreview ist der menschliche Reflexions- und Qualitaetspunkt am Ende oder zwischen den Vorbereitungsschritten. Der Trainer kann fachlich korrigieren, strategische Hinweise geben, kommunikative oder taktische Muster benennen, interkulturelle Vorsichtshinweise einordnen und naechste Lernschritte festhalten. Fuer Trainees wird aus Vorbereitung und Feedback ein konkreter Lernauftrag statt nur eine Dokumentensammlung.

**Primaere Nutzer:** Trainer.

**Sekundaere Nutzer:** Trainees sehen nur Kommentare oder Lernpunkte, die fachlich als trainee-sichtbar markiert sind. Trainerinterne Notizen bleiben aus Trainee-Sicht ausgeblendet oder werden nicht als Trainee-Inhalt verstanden.

**Mindestens sichtbar im MVP:**

- Bezug zum Verhandlungsprojekt.
- Optionaler Bezug zu Strategie, Analyse, Briefing oder Simulationskonfiguration.
- Kommentartext.
- Kommentartyp, zum Beispiel fachlich, strategisch, kommunikativ, taktisch, interkulturell oder Lerntransfer.
- Kompetenzbezug als einfache Kategorie.
- Severity / Prioritaet als einfache Einordnung.
- Sichtbarkeit als trainerintern oder trainee-sichtbar.
- Lernauftrag oder naechster Fokus.
- Einfache Lernpunkte.
- Erstellungsdatum oder Aenderungsstand als fachliche Orientierung, falls bereits vorhanden.

**Im MVP editierbar:** Trainerseitig sollen Kommentartext, Kommentartyp, Kompetenzbezug, Severity / Prioritaet, Sichtbarkeit, Lernauftrag und einfache Lernpunkte bearbeitbar sein. Der Bezug zum Projekt und optional zu Analyse, Strategie, Briefing oder Simulationskonfiguration dient der Einordnung und sollte fachlich nachvollziehbar sein.

**Sichtbarkeit im MVP:** Sichtbarkeit bedeutet im MVP eine fachliche Markierung, keine ausgereifte Rechteverwaltung. Die Markierung hilft zu unterscheiden, ob ein Kommentar nur der trainerinternen Vorbereitung dient oder ob er als Feedback, Lernpunkt oder naechster Fokus fuer den Trainee sichtbar sein soll. Daraus entsteht im MVP keine Rollenrechte-Engine, kein komplexer Freigabeprozess und keine automatische Feedbackveroeffentlichung.

**Moegliche Kommentartypen:**

- Fachliche Korrektur.
- Strategiehinweis.
- Kommunikationsfeedback.
- Taktikfeedback.
- Interkultureller Hinweis.
- Reflexionsfrage.
- Lernauftrag.
- Trainerinterne Notiz.

**Moegliche Kompetenzkategorien:**

- Zielklarheit.
- Interessen klaeren.
- Fragetechnik.
- Argumentation.
- Konzessionsmanagement.
- Druckmanagement.
- Beziehungsmanagement.
- Interkulturelle Sensibilitaet.
- Abschlussorientierung.
- Selbstreflexion.

**Einfache Lernpunkte:** Lernpunkte sind im MVP kurze, trainergefuehrte Hinweise auf den naechsten Fokus. Sie koennen aus einem Kommentar entstehen oder direkt im Trainerreview dokumentiert werden, etwa "naechstes Mal Interessenfragen vor Preisargumenten stellen" oder "Konzession nur gegen Gegenleistung anbieten". Sie ersetzen keinen vollwertigen Lerntransfer-Screen, keine Kompetenzmatrix und keine automatische Lernpfadlogik.

**Optional oder spaeter:** Ausgereifter Review-Workflow, Versionierung von Feedback, automatische Feedbackvorschlaege, Kompetenzmatrix, Lernhistorie, Zertifikate, Benchmarking, automatische KI-Bewertung, automatische Score-Berechnung und formale Freigabestrecken bleiben spaeter.

**MVP-Abgrenzung:** Kein komplexer Review-Workflow, keine Rollenrechte-Engine, keine automatische Feedbackfreigabe, keine automatische Score-Berechnung, keine vollstaendige Kompetenzmatrix, kein Zertifikat, keine Benchmarking-Logik, keine automatische KI-Bewertung als Pflicht und kein vollwertiger Lerntransfer-Screen.

**Offene Produktentscheidungen:** Welche Kommentartypen wirklich fuer den MVP reichen, welche Kompetenzkategorien didaktisch tragfaehig sind, welche Kommentare trainerintern bleiben, ob Feedback versioniert werden soll oder einfache Bearbeitung reicht und wie stark Lernpunkte strukturiert werden sollen.

### Zielbild A. Import- und Upload-Uebersicht

**Status:** Zielbild, nicht MVP-Core.

**Einordnung:** Uploads, Importvorgaenge, Mapping, Validierung und Importfehler koennen fachlich beschrieben und in der Datenbasis referenziert werden. Ein produktiver Import-/Upload-Screen ist nicht Teil des MVP-Screen-Scopes aus Issue #14.

**MVP-Abgrenzung:** Keine Upload-API, keine Parser-/Mapping-Oberflaeche, keine OCR-Strecke und keine Entscheidung ueber produktive Upload-Flows in diesem Dokument.

### Zielbild B. Simulation durchfuehren

**Status:** Zielbild, nicht MVP-Core.

**Zweck im Zielbild:** Dieser spaetere Screen fuehrt eine Verhandlungssimulation durch, in der der Trainee mit einer KI-Gegenrolle oder einem Trainingsszenario interagiert. Er waere der Ort fuer den laufenden Dialog, Gespraechsphasen und spaetere Ergebnisgrundlagen.

**Einordnung im MVP:** Der MVP bereitet Simulationen fachlich vor, fuehrt sie aber nicht produktiv durch. Simulation konfigurieren beschreibt Szenario, Rolle, Schwierigkeit, Sprache, Briefing und Erfolgskriterien. Simulation durchfuehren bleibt nur konzeptionell beschrieben und ist kein MVP-Core.

**Moegliche spaetere Inhalte:**

- Laufender Dialog.
- Rollenbriefing.
- Sichtbare Gespraechsphase.
- Zugriff auf Strategie oder Kurznotizen.
- Abschlussstatus.
- Spaetere Dialogspeicherung.
- Spaetere Auswertungsgrundlage.

**MVP-Abgrenzung:** Keine produktive KI-Verhandlungsengine, kein Chat als Pflicht, kein Voice-Modus, kein Streaming, keine automatische Taktikerkennung, keine automatische Gespraechsauswertung und keine RAG-Anbindung als Pflicht.

### Zielbild C. Auswertung und Lerntransfer

**Status:** Zielbild, nicht MVP-Core.

**Zweck im Zielbild:** Dieser spaetere Screen buendelt Ergebnis, Feedback, Zielerreichung, Lernpunkte und naechste Entwicklungsschritte nach Simulationen oder realen Verhandlungsvorbereitungen. Er macht aus Durchfuehrung und Review eine strukturierte Reflexion.

**Einordnung im MVP:** Auswertung und Lerntransfer bleiben wichtig, werden im MVP aber nur reduziert ueber Trainerreview und einfache Lernpunkte abgedeckt. Ein eigener vollwertiger Auswertungs- und Lerntransfer-Screen ist keine MVP-Pflicht.

**Moegliche spaetere Inhalte:**

- Ergebniszusammenfassung.
- Zielerreichung.
- Vereinbarte Konditionen.
- Relevante Gespraechsmomente.
- Lernpunkte.
- Trainerfeedback.
- Selbstreflexion.
- Naechste Uebung.
- Transferaufgabe.
- Optionale Scores.

**MVP-Abgrenzung:** Keine automatische Bewertung, keine Score-Pflicht, keine automatische Kompetenzanalyse, keine Taktikerkennung, keine vollwertige Lerntransfer-Arbeitsstrecke und keine Zertifikatslogik.

### Zielbild D. Lernhistorie / Fortschritt

**Status:** Spaetere Ausbaustufe, nicht MVP-Core.

**Zweck im Zielbild:** Lernhistorie / Fortschritt zeigt langfristige Entwicklung ueber mehrere Projekte, Simulationen, Reviews und Lernpunkte hinweg. Der Screen waere erst sinnvoll, wenn genuegend Wiederholung, Feedback und Auswertungsdaten vorhanden sind.

**Einordnung im MVP:** Im MVP ist dieser Screen nicht erforderlich, weil noch keine ausreichende Historie aus mehreren produktiven Simulationen, Auswertungen und Reviews vorausgesetzt werden soll. Lernhistorie wird erst sinnvoll, wenn produktive Simulation, Auswertung und mehrere Reviews vorhanden sind.

**Moegliche spaetere Inhalte:**

- Fruehere Simulationen.
- Fruehere Trainerkommentare.
- Wiederkehrende Lernmuster.
- Kompetenzentwicklung.
- Offene Entwicklungsfelder.
- Abgeschlossene Lernauftraege.
- Fortschritt ueber Zeit.
- Optionale Zertifikats- oder Nachweislogik.

**MVP-Abgrenzung:** Keine Lernhistorie, keine Kompetenztrend-Analyse, keine Benchmark-Datenbank, keine Team-Auswertungen, keine Zertifikate und keine automatisierte Lernpfad-Logik.

## 5. Trainer-Workflow im MVP

Der Trainer-Workflow ist im MVP der stabilste Startpunkt, weil Datenbasis, Szenarioqualitaet und didaktische Einordnung kontrolliert werden muessen.

| Schritt | Beschreibung | MVP-Screen |
|---|---|---|
| Einstieg und Priorisierung | Offene Projekte, Rollen und Reviews finden | Dashboard |
| Mandant/Firma vorbereiten | Company-Kontext pruefen und Datenlage einschaetzen | Firmenprofil / Company-Uebersicht |
| Trainee oder Rolle klaeren | Rolle, Lernziel und Trainingskontext erfassen | Trainee- / Rollenprofil |
| Datenbasis pruefen | Quellen, Claims, Einkaufshistorie und Anfragepositionen bewerten | Knowledge Base / Datenbasis |
| Projekt definieren | Konkreten Verhandlungsfall und einfache Kontextnotizen erfassen | Verhandlungsprojekt anlegen / bearbeiten |
| Analyse und Strategie pruefen | Fakten, Annahmen, Hypothesen, ZOPA, BATNA und Argumentation fachlich pruefen | Analyseansicht, Strategie-Builder |
| Briefing vorbereiten | Lieferantenrolle, Beziehungskontext und kulturelle Arbeitshypothesen klaeren | Kultur- und Rollenbriefing |
| Simulation vorbereiten | Szenario, Rolle, Schwierigkeit und Erfolgskriterien setzen | Simulation konfigurieren |
| Feedback geben | Trainerkommentar, Sichtbarkeitsmarkierung, Lernauftrag und einfache Lernpunkte dokumentieren | Trainerreview / Trainerkommentar |

Import/Upload, produktive Simulationsdurchfuehrung, vollwertiger Lerntransfer und Lernhistorie sind in diesem Workflow bewusst nicht als MVP-Pflichtschritte enthalten.

## 6. Trainee-Workflow im MVP

Der Trainee-Workflow soll gefuehrt sein. Der Trainee startet nicht mit einem freien Chat, sondern bewegt sich schrittweise durch Projektverstaendnis, Analyse, Strategie, Briefing und Trainerfeedback.

1. **Eigenes Profil sehen oder bearbeiten:** Der Trainee sieht Rolle, Lernziel und relevante Trainingsannahmen im Trainee- / Rollenprofil.
2. **Verhandlungsprojekt verstehen:** Der Trainee oeffnet das zugewiesene Projekt und liest Ziel, Rahmenbedingungen, Lieferant, Anfrageposition, Prioritaeten und einfache Kontextnotizen.
3. **Analyse lesen:** Die Analyseansicht zeigt relevante Daten, Risiken, Chancen, Claims, offene Informationsluecken und klar markierte Hypothesen.
4. **Strategie vorbereiten:** Im Strategie-Builder arbeitet der Trainee mit ZOPA, BATNA, Konzessionen, Argumentationslinien und ggf. reduzierten Angebotsvergleichsnotizen.
5. **Kultur- und Rollenbriefing nutzen:** Das Briefing liefert Lieferantenannahmen, Beziehungskontext, Gespraechsdynamik und vorsichtig formulierte kulturelle Arbeitshypothesen.
6. **Konfiguriertes Szenario verstehen:** Der Trainee sieht, was fuer die Simulation fachlich vorbereitet wurde, ohne dass eine produktive Simulation-Engine Teil des MVP sein muss.
7. **Trainerkommentar lesen:** Sichtbare Trainerkommentare und einfache Lernpunkte werden im Kontext des Projekts oder der Vorbereitung angezeigt.

Wichtig ist, dass jede Station eine klare naechste Aktion vorgibt. Der Trainee soll verstehen, was belastbar ist, was Annahme bleibt und welche Hypothesen noch geprueft werden muessen.

## 7. Admin-Workflow als spaetere Ausbaustufe

Der Admin-Workflow ist kein MVP-Pflichtbestandteil. Er wird nur als spaetere Ausbaustufe skizziert.

- **Mandanten verwalten:** Companies anlegen, deaktivieren, zusammenfuehren oder organisatorisch strukturieren.
- **Nutzer verwalten:** Nutzer einladen, aktivieren, deaktivieren und Companies zuordnen.
- **Rechte/Rollen verwalten:** Sichtbarkeiten fuer Trainer, Trainees, Admins und spaetere Teamrollen steuern.
- **Datenbereinigung / Upload-Verwaltung:** Uploads, Importvorgaenge, verwaiste Dokumente, fehlerhafte Imports und Datenqualitaet verwalten.
- **Audit-/Compliance-Themen:** Zugriff, Datenveraenderungen, Vertraulichkeitsstufen und Loeschkonzepte nachvollziehbar machen.

Diese Funktionen sollten erst konkretisiert werden, wenn MVP-Workflow, Upload-Bedarf, Rechtebedarf und Datenklassifikation klarer sind.

## 8. Fachliches Objekt-Mapping je Screen

Diese Tabelle dient nur der fachlichen Orientierung. Sie legt keine neuen Datenmodelle, API-Endpunkte oder technische Umsetzung fest.

| Screen | Fachlich relevante Informationen | MVP-Einordnung |
|---|---|---|
| Dashboard | Aktive Projekte, Company, Trainee oder Trainingsrolle, Projektstatus, naechster Workflow-Schritt, offene Trainerreviews | MVP-Core |
| Firmenprofil / Company-Uebersicht | Firmenname, Branche, Verhandlungsrolle, Maerkte/Regionen, strategischer Druck, Warengruppen, Verhandlungssituationen, Datenquellen, Projekte | MVP-Core |
| Trainee- / Rollenprofil | Reale Person oder Trainingsrolle, Funktion, Erfahrungsstand, Verhandlungsrolle, Trainingsziele, Sprache, Entwicklungsfelder, sichtbare und trainerinterne Hinweise | MVP-Core |
| Knowledge Base / Datenbasis | Dokumente, Quelle/Dokumenttyp, Company-/Projektbezug, Einkaufshistorie, Anfragepositionen, Knowledge Claims, Datenluecken, Qualitaets- oder Vertrauenshinweise | MVP-Core |
| Verhandlungsprojekt anlegen / bearbeiten | Projekttitel, Company, Trainee oder Rolle, Verhandlungsart, Warengruppe, Artikel oder Leistung, Menge, Zielregion, Lieferzeit, interne Zielgroesse, Lieferant, Prioritaet, Status, Business Pressure, technische Abhaengigkeit, Supplier Power, Risiken, Lieferantenbeziehungsnotiz, Stakeholdernotiz | MVP-Core |
| Analyseansicht | Kurzbriefing, Projektinformationen, Lieferanteninformationen, Einkaufshistorie, Anfragepositionen, Knowledge Claims, Fakten, Annahmen, Hypothesen, Risiken, Chancen, Datenluecken, offene Fragen, Stakeholdernotiz, reduzierte Vergleichsnotizen | MVP-Core |
| Strategie-Builder | Strategietitel, Projektbezug, Zielbild, Muss-/Soll-/Nice-to-have-Ziele, ZOPA-Dimensionen, WAP, BATNA-Optionen und BATNA-Staerke, Konzessionen als Tauschobjekte, Argumentation, Gegenargumente, Reaktionsoptionen, offene Fragen, Hypothesenimplikationen, strategierelevante Stakeholder- und Lieferantenbeziehungsnotizen, Eskalationsnotiz, reduzierte Angebots-/RFQ-Notizen | MVP-Core |
| Kultur- und Rollenbriefing | Projektbezug, Lieferant oder Gegenrolle, Rollenbeschreibung, erwartete Interessen und Constraints, taktische Muster, Beziehungskontext, kulturelle Arbeitshypothesen, Do's / Don'ts, Kommunikationsrisiken, Entscheidungslogik, offene Unsicherheiten, Pruefhinweise | MVP-Core |
| Simulation konfigurieren | Szenariotitel, Projektbezug, zugeordnete Strategie, Trainee oder Rolle, Lieferant oder Gegenrolle, Rollenbeschreibung, Gespraechsphase, Schwierigkeit, Sprache, Ziel, Erfolgskriterien, Zeitrahmen, Trainee-Briefing, interne Trainerhinweise, erwartete Einwaende oder taktische Muster, Startbereitschaft | MVP-Core |
| Trainerreview / Trainerkommentar | Projektbezug, optionaler Bezug zu Analyse, Strategie, Briefing oder Simulationskonfiguration, Kommentartext, Kommentartyp, Kompetenzbezug, Severity / Prioritaet, Sichtbarkeit als trainerintern oder trainee-sichtbar, Lernauftrag, einfache Lernpunkte, Erstellungsdatum oder Aenderungsstand falls vorhanden | MVP-Core |
| Import- und Upload-Uebersicht | Upload- und Importstatus, Validierung, Mapping | Zielbild, nicht MVP |
| Simulation durchfuehren | Laufender Dialog, Rollenbriefing, Gespraechsphase, Strategie- oder Kurznotizen, Abschlussstatus, Dialogspeicherung, Auswertungsgrundlage | Zielbild, nicht MVP |
| Auswertung und Lerntransfer | Ergebniszusammenfassung, Zielerreichung, Konditionen, relevante Gespraechsmomente, Lernpunkte, Trainerfeedback, Selbstreflexion, naechste Uebung, Transferaufgabe, optionale Scores | Zielbild, nicht MVP |
| Lernhistorie / Fortschritt | Fruehere Simulationen und Trainerkommentare, wiederkehrende Lernmuster, Kompetenzentwicklung, Entwicklungsfelder, abgeschlossene Lernauftraege, Fortschritt ueber Zeit, optionale Nachweislogik | Spaetere Ausbaustufe, nicht MVP |

## 9. KI-, RAG- und Automatisierungsgrenzen

Dieses Konzept erstellt keine Prompts und keine Implementierung. Es markiert nur fachliche Andockpunkte fuer spaeter.

- **Knowledge Base / Datenbasis:** Spaeter koennen Chunking, Embeddings, Claim-Extraktion, OCR oder Quellenqualitaetsbewertung ergaenzt werden. Sie sind nicht Teil des MVP-Screen-Scopes.
- **Analyseansicht:** Spaeter koennen KI-gestuetzte Zusammenfassungen, Hypothesen oder Empfehlungen entstehen. Im MVP muss die Trennung von Fakt, Annahme, Hypothese und Empfehlung fachlich sichtbar sein.
- **Strategie-Builder:** Spaeter koennen Vorschlaege fuer ZOPA, BATNA, Konzessionen und Argumentationslinien entstehen. Im MVP bleiben Strategie, ZOPA, WAP und BATNA manuell oder trainergefuehrt; es gibt keine automatische Berechnungspflicht und keine verbindliche KI-Strategie-Generierung.
- **Kultur- und Rollenbriefing:** Hinweise muessen als Arbeitshypothesen formuliert werden und duerfen nicht als deterministische Aussagen erscheinen. Der MVP erzeugt kein stereotypes Kultururteil, kein automatisches Laenderprofil als Wahrheit und kein eigenes `CulturalBriefing`-Datenmodell.
- **Simulation konfigurieren:** Spaeterer Andockpunkt fuer eine Simulation-Engine; im MVP nur fachliche Vorbereitung. Produktive Simulation, Chat, Voice, Streaming, automatische Taktikerkennung und automatische Auswertung bleiben ausgeschlossen.
- **Simulation durchfuehren, Auswertung und Lernhistorie:** Zielbild nach dem MVP, nicht Pflicht in Phase A1.

## 10. MVP-Abgrenzung

### MVP-relevant

- Dashboard.
- Firmenprofil / Company-Uebersicht.
- Trainee- / Rollenprofil.
- Knowledge Base / Datenbasis.
- Verhandlungsprojekt anlegen / bearbeiten.
- Analyseansicht.
- Strategie-Builder.
- Kultur- und Rollenbriefing.
- Simulation konfigurieren.
- Trainerreview / Trainerkommentar.
- Trainerreview mit Kommentartext, Projekt- oder Vorbereitungskontext, Kommentartyp, Kompetenzbezug, Severity / Prioritaet, fachlicher Sichtbarkeitsmarkierung, Lernauftrag und einfachen Lernpunkten.
- Einfache Lieferantenbeziehungsnotiz innerhalb bestehender Screens.
- Einfache Stakeholdernotiz innerhalb bestehender Screens.
- Einfache Hypothesenliste innerhalb bestehender Screens.
- Reduzierter RFQ-/Angebotsvergleich als Notiz- oder Vergleichslogik innerhalb bestehender Screens.
- Klare Trennung von Fakten, Annahmen, Hypothesen und Empfehlungen.
- Manuell oder trainergefuehrt gepflegte Strategiebausteine inklusive ZOPA, WAP, BATNA und Konzessionslogik.
- Kulturelle Hinweise als vorsichtig formulierte Arbeitshypothesen mit Bias-Abgrenzung.
- Simulationskonfiguration als Vorbereitungsscreen ohne produktive Durchfuehrung.

### Spaeter oder Zielbild

- Import- und Upload-Uebersicht als produktiver Screen.
- Produktive Upload-, Import-, Parser-, Mapping- oder OCR-Strecken.
- Produktives RAG, Chunking, Embeddings und automatische Claim-Extraktion.
- Simulation durchfuehren als produktive Engine.
- Laufender Chat, Voice-Modus, Streaming-Logik, automatische Taktikerkennung und automatische Auswertung.
- Auswertung und Lerntransfer als vollwertiger eigener Screen.
- Lernhistorie, Fortschritt, Kompetenztrend-Analyse, Zertifikate, Benchmark-Datenbank und automatisierte Lernpfad-Logik.
- Team-/Admin-Dashboards.
- Rechte- und Rollensystem.
- CRM-Anbindung.
- Relationship Memory als eigenes Modul.
- Vollautomatische ZOPA-Berechnung, verbindliche KI-Strategie-Generierung, automatische BATNA-Bewertung, vollautomatische Angebotsanalyse oder eigenes RFQ-Modul.
- Automatisches Laenderprofil als Wahrheit, automatische Bias-Bewertung, eigenes `CulturalBriefing`-Modell oder produktive KI-Rollenengine.

### Nicht-Ziele dieses Dokuments

- Keine React-/Frontend-Komponenten.
- Keine API-Endpunkte.
- Keine Datenbankmigration.
- Keine neuen Datenmodelle.
- Keine Upload-API.
- Keine Parser-/Mapping-Logik.
- Keine Validierungsengine.
- Keine RAG-Implementierung.
- Keine Embedding-Erzeugung.
- Keine OCR-Implementierung.
- Keine KI-Prompts im Detail.
- Keine Simulation-Engine.
- Keine produktive Chat-, Voice- oder Streaming-Logik.
- Keine automatische Taktikerkennung.
- Keine Rechteverwaltung.
- Keine komplexen Review-Workflows.
- Keine automatische Feedbackfreigabe.
- Keine automatische Score-Berechnung.
- Keine Zertifikatslogik.
- Keine Benchmarking-Logik.

## 11. Nachgelagerte Detail-Cluster

Die Folgeissues #15, #16, #17 und #18 sollten nach Issue #14 auf dieser Scope-Grenze aufbauen. Sie koennen einzelne Bereiche fachlich vertiefen, ohne den MVP-Core-Screen-Scope wieder zu erweitern.

Moegliche Cluster sind:

- Detailklaerung der MVP-Core-Screens und ihrer Pflichtinformationen.
- Fachliche Ausarbeitung der Notiz- und Hypothesenlogik innerhalb bestehender Screens.
- Eingrenzung von Strategie, Briefing und Simulationskonfiguration.
- Spaetere Zielbildklaerung fuer Simulation, Auswertung, Lernhistorie, Upload/Import und Automatisierung.

## 12. Offene Produktentscheidungen

- Soll der MVP zuerst trainergefuehrt oder trainee-self-service sein?
- Welche Dashboard-Informationen sieht ein Trainee im MVP oder erst spaeter?
- Welche Profil- und Projektdaten sieht ein Trainee nicht?
- Welche Trainernotizen bleiben intern?
- Wie werden reale Personen und reine Trainingsrollen im `UserProfile` fachlich unterschieden?
- Welche Strategiebausteine sind Pflicht, welche optional?
- Welche Strategiebausteine duerfen Trainees selbst bearbeiten und braucht eine Strategie Trainerfreigabe?
- Welche Pflichtinformationen braucht ein Verhandlungsprojekt im MVP?
- Welche Datenqualitaetsindikatoren braucht die Knowledge Base?
- Welche vorhandenen Claims duerfen im MVP manuell gepflegt werden?
- Wie werden Hypothesen, Fakten, Annahmen und Empfehlungen visuell und sprachlich getrennt?
- Welche minimale Angebots- oder RFQ-Vergleichslogik reicht im MVP als Notiz- oder Vergleichsansicht?
- Welche kulturellen Hinweise sind didaktisch sinnvoll und rechtlich unkritisch?
- Wie klar muessen kulturelle Hinweise als Hypothesen markiert werden und welche Inhalte bleiben trainerintern?
- Welche Szenariotypen, Schwierigkeitsgrade und Gespraechsphasen reichen fuer die MVP-Simulationsvorbereitung?
- Wann wird aus der Simulationskonfiguration ein produktiver Simulationsscreen?
- Welche Kommentartypen reichen im Trainerreview wirklich fuer den MVP?
- Welche Kompetenzkategorien sind didaktisch tragfaehig?
- Welche Trainerkommentare bleiben intern und welche Lernpunkte werden trainee-sichtbar?
- Reicht einfache Bearbeitung von Feedback oder wird spaeter Versionierung gebraucht?
- Welche Funktionen gehoeren erst in Zielbild-Screens statt in den MVP-Core?
