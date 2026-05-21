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

## 3. Phase-A1-Scope nach Issue #14

Issue #14 finalisiert den MVP-Screen-Scope fachlich. Der MVP besteht aus zehn Core-Screens. Weitere fachliche Faehigkeiten duerfen im MVP nur als reduzierte Erweiterungen innerhalb dieser Screens erscheinen. Sie werden nicht als eigene produktive Module oder eigenstaendige Pflichtscreens verstanden.

### 3.1 MVP-Core-Screens

| Nr. | Screen | Primaere Rolle | MVP-Zweck | MVP-Status |
|---:|---|---|---|---|
| 1 | Dashboard | Trainer, Trainee eingeschraenkt oder spaeter | Schlanker Einstieg in aktive Projekte, Projektstatus, naechste Workflow-Schritte und offene Trainerreviews | MVP-Core |
| 2 | Firmenprofil / Company-Uebersicht | Trainer | Unternehmens- und Mandantenkontext fuer Verhandlungsprojekte bereitstellen | MVP-Core |
| 3 | Trainee- / Rollenprofil | Trainer, Trainee | Reale Person oder Trainingsrolle, Lernziel und Trainingskontext fuer Vorbereitung, Simulation und Feedback klaeren | MVP-Core |
| 4 | Knowledge Base / Datenbasis | Trainer | Vorhandene Quellen und strukturierte Datenlage als fachliche Grundlage sichtbar machen | MVP-Core |
| 5 | Verhandlungsprojekt anlegen / bearbeiten | Trainer, spaeter Trainee | Konkreten Verhandlungsfall mit Ziel, Lieferant, Rahmenbedingungen und Status definieren | MVP-Core |
| 6 | Analyseansicht | Trainee, Trainer | Projekt, Datenlage, Risiken, Chancen, Annahmen und Hypothesen verstehen | MVP-Core |
| 7 | Strategie-Builder | Trainee, Trainer | Zielbild, ZOPA, BATNA, Konzessionen, Argumentation und reduzierte Vergleichslogik strukturieren | MVP-Core |
| 8 | Kultur- und Rollenbriefing | Trainee, Trainer | Lieferantenrolle, Gespraechsdynamik und kulturelle Arbeitshypothesen vorbereiten | MVP-Core |
| 9 | Simulation konfigurieren | Trainer | Trainingsszenario, Rolle, Schwierigkeit, Erfolgskriterien und Briefing fachlich vorbereiten | MVP-Core |
| 10 | Trainerreview / Trainerkommentar | Trainer | Menschliches Feedback erfassen, einordnen und fuer Trainees sichtbar machen | MVP-Core |

### 3.2 MVP-Erweiterungen innerhalb bestehender Screens

Diese Erweiterungen gehoeren zum MVP, aber nicht als eigene Screens:

- **Einfache Lieferantenbeziehungsnotiz:** Als Notiz im Verhandlungsprojekt, in der Analyseansicht oder im Kultur- und Rollenbriefing. Sie beschreibt Beziehungslage, Vorgeschichte, Vertrauen, Abhaengigkeiten oder offene Spannungen knapp und fachlich.
- **Einfache Stakeholdernotiz:** Als Notiz im Verhandlungsprojekt oder in der Analyseansicht. Sie haelt relevante interne oder externe Stakeholder, Interessen, Einfluss und offene Rueckfragen fest.
- **Einfache Hypothesenliste:** Als klar markierter Bereich in Analyseansicht, Strategie-Builder oder Kultur- und Rollenbriefing. Hypothesen muessen von Fakten und belastbaren Quellen getrennt bleiben.
- **Reduzierter RFQ-/Angebotsvergleich:** Im MVP nur als einfache Notiz- oder Vergleichslogik innerhalb von Verhandlungsprojekt, Analyseansicht oder Strategie-Builder. Es gibt kein eigenstaendiges RFQ-Modul und keine vollautomatische Angebotsanalyse.

### 3.3 Zielbild-Screens und spaetere Screens

| Zielbild-Screen | Primaere Rolle | Einordnung |
|---|---|---|
| Import- und Upload-Uebersicht | Trainer, spaeter Admin | Kein produktiver MVP-Screen. Upload- und Importstatus duerfen als Datenlage in Knowledge Base oder Company-Kontext referenziert werden, aber nicht als eigene Pflichtoberflaeche. |
| Simulation durchfuehren | Trainee | Kein produktiver MVP-Screen und keine produktive Engine. Die fachliche Durchfuehrung bleibt Zielbild nach der Konfiguration. |
| Auswertung und Lerntransfer | Trainee, Trainer | Kein vollwertiger eigener MVP-Screen. Lernpunkte koennen im Trainerreview oder als einfache Notiz vorkommen. |
| Lernhistorie / Fortschritt | Trainee, Trainer | Kein MVP. Fortschritt ueber mehrere Durchlaeufe, Zertifikate, Benchmarks und Historienlogik bleiben spaeter. |
| Admin / Rechteverwaltung | Admin | Kein MVP. Mandanten-, Nutzer-, Rechte- und Auditfunktionen bleiben spaetere Ausbaustufe. |
| Relationship Memory als eigenes Modul | Trainer, Trainee | Kein MVP. Beziehungskontext erscheint nur als einfache Lieferantenbeziehungsnotiz innerhalb bestehender Screens. |

### 3.4 Ausdruecklich nicht Teil des MVP

- Import- und Upload-Uebersicht als produktiver Screen.
- Simulation durchfuehren als produktive Engine oder Chat-/Voice-Erlebnis.
- Auswertung und Lerntransfer als vollwertiger eigener Screen.
- Lernhistorie, Fortschrittslogik, Zertifikate oder Benchmarks.
- Admin-, Rollen- und Rechteverwaltung.
- Relationship Memory als eigenes Modul.
- Vollautomatische Angebotsanalyse, eigenes RFQ-Modul oder automatische Angebotsbewertung.
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

**Zweck des Screens:** Einen konkreten Verhandlungsfall definieren, der Analyse, Strategie, Briefing, Simulationskonfiguration und Trainerreview zusammenhaelt.

**Hauptnutzer:** Trainer, spaeter ggf. Trainee im Self-Service-Modus.

**Zentrale Nutzeraktionen:** Projekt anlegen oder bearbeiten, Anfrageposition und Lieferant zuordnen, Verhandlungsziel und Rahmenbedingungen erfassen, Prioritaeten und Risiken beschreiben.

**Wichtigste Ausgaben / Anzeigen:** Projektbriefing, zugeordnete Anfrageposition, Lieferantenprofil, Datenlage, Status im Workflow, einfache Lieferantenbeziehungsnotiz und einfache Stakeholdernotiz.

**MVP-Erweiterungen:** Lieferantenbeziehungsnotiz und Stakeholdernotiz sind einfache fachliche Notizen innerhalb des Projekts. Sie sind kein Relationship-Memory-Modul und kein Stakeholder-Management-Modul.

**MVP-Abgrenzung:** Keine automatische Projektanlage aus Importdaten als Pflicht, keine CRM-Anbindung, keine komplexe Projektfreigabe und kein eigenes RFQ-Modul.

### 6. Analyseansicht

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Projektkontext, Datenbasis, Lieferantenannahmen, Risiken, Chancen und offene Informationsluecken strukturiert sichtbar machen.

**Hauptnutzer:** Trainee und Trainer.

**Zentrale Nutzeraktionen:** Analyse lesen, Quellen und Claims nachvollziehen, Risiken markieren, offene Fragen sammeln, Hypothesen von Fakten trennen.

**Wichtigste Ausgaben / Anzeigen:** Zusammenfassung des Verhandlungsfalls, relevante Claims, Einkaufshistorie, Anfragepositionen, Lieferantenprofil, Risiko- und Machtannahmen, offene Datenluecken, einfache Hypothesenliste, einfache Stakeholdernotiz.

**MVP-Erweiterungen:** Die Hypothesenliste wird ausdruecklich als Hypothese markiert und von Fakten, Quellen und Empfehlungen getrennt. Eine einfache Angebots- oder RFQ-Vergleichssicht darf nur reduzierte Vergleichsnotizen, Eckwerte oder manuell gepflegte Gegenueberstellungen enthalten.

**MVP-Abgrenzung:** Keine produktive automatische Analysepflicht, keine vollautomatische Angebotsanalyse, keine OCR-/RAG-Pflicht und keine automatische Bewertung von Lieferantenangeboten.

### 7. Strategie-Builder

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Die Verhandlungsstrategie in handhabbare Bausteine uebersetzen: Ziele, ZOPA, BATNA, Konzessionen, Argumentationslinien, Risiken und reduzierte Vergleichsnotizen.

**Hauptnutzer:** Trainee und Trainer.

**Zentrale Nutzeraktionen:** Strategie anlegen oder bearbeiten, ZOPA-Dimensionen pflegen, BATNA-Optionen bewerten, Konzessionen ordnen, Argumentationslinien ableiten, Annahmen und Hypothesen markieren.

**Wichtigste Ausgaben / Anzeigen:** Aktive Strategie, strukturierte ZOPA, BATNA-Liste, Konzessionsplan, Argumentationslinien, Risiko- und Notizfelder, reduzierte Angebots- oder RFQ-Vergleichsnotizen.

**MVP-Erweiterungen:** RFQ-/Angebotsvergleich ist nur als einfache Notiz- oder Vergleichslogik innerhalb des Strategie-Builders vorgesehen. Er bleibt fachlich manuell nachvollziehbar und wird nicht zu einem eigenen Modul ausgebaut.

**MVP-Abgrenzung:** Keine automatische ZOPA-Berechnung, keine verbindliche KI-Strategie-Generierung, keine vollautomatische Angebotsanalyse und keine eigene RFQ-Arbeitsstrecke.

### 8. Kultur- und Rollenbriefing

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Trainee und Trainer auf Lieferantenrolle, Gespraechsdynamik, kulturelle Arbeitshypothesen und erwartete Taktiken vorbereiten.

**Hauptnutzer:** Trainee und Trainer.

**Zentrale Nutzeraktionen:** Lieferantenannahmen lesen, kulturelle Hinweise pruefen, Rollenbriefing fuer eine spaetere Simulation vorbereiten, Unsicherheiten markieren.

**Wichtigste Ausgaben / Anzeigen:** Lieferantenprofil, Beziehungskontext, kultureller Kontext, Interessen, wahrscheinliche Taktiken, Constraints, Rollenbriefing, einfache Hypothesenliste.

**MVP-Erweiterungen:** Lieferantenbeziehungsnotiz und Hypothesenliste koennen hier fachlich sichtbar werden, bleiben aber einfache Notizen und keine eigenstaendigen Module.

**MVP-Abgrenzung:** Kein stereotypes oder automatisiertes Kultururteil als harte Wahrheit. Keine Simulation-Engine und kein automatisches Rollenverhalten im MVP.

### 9. Simulation konfigurieren

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Einen Trainingsdurchlauf fachlich vorbereiten: Rolle, Szenario, Schwierigkeitsgrad, Ziele, Erfolgskriterien, Sprache und Briefing.

**Hauptnutzer:** Trainer.

**Zentrale Nutzeraktionen:** Szenario fachlich anlegen, Strategie und Lieferant zuordnen, Rollenbeschreibung festlegen, Erfolgskriterien und Zeitrahmen definieren, Trainee zuweisen.

**Wichtigste Ausgaben / Anzeigen:** Simulationsbriefing, Startbereitschaft als fachlicher Status, zugeordnete Strategie, Rollen- und Lieferantenannahmen.

**MVP-Abgrenzung:** Dieser Screen konfiguriert nur. Er beinhaltet keine produktive Simulation-Engine, keinen laufenden Dialog, keinen Voice-Modus, keine Streaming-Logik und keine automatische Auswertung.

### 10. Trainerreview / Trainerkommentar

**MVP-Status:** MVP-Core.

**Zweck des Screens:** Menschliches Trainerfeedback zu Projekt, Analyse, Strategie, Briefing, Simulationskonfiguration oder spaeteren Ergebnissen erfassen und sichtbar machen.

**Hauptnutzer:** Trainer.

**Zentrale Nutzeraktionen:** Kommentar schreiben, Kompetenzbezug oder fachlichen Bezug setzen, Sichtbarkeit fuer Trainee steuern, Lernpunkt oder Korrekturhinweis festhalten.

**Wichtigste Ausgaben / Anzeigen:** Bestehende Kommentare, sichtbare und interne Feedbackanteile, fachlicher Kontext des Kommentars, einfache Lernpunkte.

**MVP-Abgrenzung:** Kein komplexer Review-Workflow, keine Rollenrechte-Engine, keine automatische Feedbackfreigabe und kein vollwertiger Lerntransfer-Screen.

### Zielbild A. Import- und Upload-Uebersicht

**Status:** Zielbild, nicht MVP-Core.

**Einordnung:** Uploads, Importvorgaenge, Mapping, Validierung und Importfehler koennen fachlich beschrieben und in der Datenbasis referenziert werden. Ein produktiver Import-/Upload-Screen ist nicht Teil des MVP-Screen-Scopes aus Issue #14.

**MVP-Abgrenzung:** Keine Upload-API, keine Parser-/Mapping-Oberflaeche, keine OCR-Strecke und keine Entscheidung ueber produktive Upload-Flows in diesem Dokument.

### Zielbild B. Simulation durchfuehren

**Status:** Zielbild, nicht MVP-Core.

**Einordnung:** Die gefuehrte Simulation bleibt ein spaeterer produktiver Screen nach der Konfiguration. Im MVP wird fachlich vorbereitet, was eine Simulation braucht; die Durchfuehrung selbst ist keine Pflicht.

**MVP-Abgrenzung:** Kein produktiver KI-Dialog, keine Chat- oder Voice-Engine, keine automatische Taktikerkennung und kein RAG-Kontext als Pflicht.

### Zielbild C. Auswertung und Lerntransfer

**Status:** Zielbild, nicht MVP-Core.

**Einordnung:** Ergebnis, Feedback, Lernpunkte und naechste Schritte sind fachlich wichtig, erscheinen im MVP aber reduziert im Trainerreview oder als einfache Notiz. Ein vollwertiger eigener Screen bleibt spaeter.

**MVP-Abgrenzung:** Keine automatische Bewertung, keine Score-Pflicht, keine vollwertige Lerntransfer-Arbeitsstrecke.

### Zielbild D. Lernhistorie / Fortschritt

**Status:** Zielbild, nicht MVP-Core.

**Einordnung:** Fortschritt ueber mehrere Projekte und Simulationen hinweg ist eine spaetere Ausbaustufe.

**MVP-Abgrenzung:** Keine Lernhistorie, keine Zertifikatslogik, keine Benchmark-Datenbank und keine Team-Auswertungen.

## 5. Trainer-Workflow im MVP

Der Trainer-Workflow ist im MVP der stabilste Startpunkt, weil Datenbasis, Szenarioqualitaet und didaktische Freigabe kontrolliert werden muessen.

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
| Feedback geben | Trainerkommentar und einfache Lernpunkte dokumentieren | Trainerreview / Trainerkommentar |

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
| Verhandlungsprojekt anlegen / bearbeiten | Projektbriefing, Lieferant, Anfrageposition, Ziel, Risiken, Lieferantenbeziehungsnotiz, Stakeholdernotiz | MVP-Core |
| Analyseansicht | Fakten, Annahmen, Hypothesen, Risiken, Chancen, Datenluecken, reduzierte Vergleichsnotizen | MVP-Core |
| Strategie-Builder | Ziele, ZOPA, BATNA, Konzessionen, Argumentation, reduzierte Angebots-/RFQ-Notizen | MVP-Core |
| Kultur- und Rollenbriefing | Lieferantenrolle, Beziehungskontext, kulturelle Arbeitshypothesen, erwartete Taktiken | MVP-Core |
| Simulation konfigurieren | Szenario, Rolle, Schwierigkeit, Erfolgskriterien, Briefing | MVP-Core |
| Trainerreview / Trainerkommentar | Trainerfeedback, Sichtbarkeit, Lernpunkt, fachlicher Bezug | MVP-Core |
| Import- und Upload-Uebersicht | Upload- und Importstatus, Validierung, Mapping | Zielbild, nicht MVP |
| Simulation durchfuehren | Laufender Dialog, Phasen, Nachrichten, Abschluss | Zielbild, nicht MVP |
| Auswertung und Lerntransfer | Ergebnis, Scores, Lerntransfer, naechste Schritte | Zielbild, nicht MVP |
| Lernhistorie / Fortschritt | Entwicklung ueber mehrere Projekte oder Simulationen | Zielbild, nicht MVP |

## 9. KI-, RAG- und Automatisierungsgrenzen

Dieses Konzept erstellt keine Prompts und keine Implementierung. Es markiert nur fachliche Andockpunkte fuer spaeter.

- **Knowledge Base / Datenbasis:** Spaeter koennen Chunking, Embeddings, Claim-Extraktion, OCR oder Quellenqualitaetsbewertung ergaenzt werden. Sie sind nicht Teil des MVP-Screen-Scopes.
- **Analyseansicht:** Spaeter koennen KI-gestuetzte Zusammenfassungen, Hypothesen oder Empfehlungen entstehen. Im MVP muss die Trennung von Fakt, Annahme, Hypothese und Empfehlung fachlich sichtbar sein.
- **Strategie-Builder:** Spaeter koennen Vorschlaege fuer ZOPA, BATNA, Konzessionen und Argumentationslinien entstehen. Im MVP bleibt Strategie manuell oder trainergefuehrt.
- **Kultur- und Rollenbriefing:** Spaetere Hinweise muessen als Arbeitshypothesen formuliert werden und duerfen nicht als deterministische Aussagen erscheinen.
- **Simulation konfigurieren:** Spaeterer Andockpunkt fuer eine Simulation-Engine; im MVP nur fachliche Vorbereitung.
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
- Einfache Lieferantenbeziehungsnotiz innerhalb bestehender Screens.
- Einfache Stakeholdernotiz innerhalb bestehender Screens.
- Einfache Hypothesenliste innerhalb bestehender Screens.
- Reduzierter RFQ-/Angebotsvergleich als Notiz- oder Vergleichslogik innerhalb bestehender Screens.
- Klare Trennung von Fakten, Annahmen, Hypothesen und Empfehlungen.

### Spaeter oder Zielbild

- Import- und Upload-Uebersicht als produktiver Screen.
- Produktive Upload-, Import-, Parser-, Mapping- oder OCR-Strecken.
- Produktives RAG, Chunking, Embeddings und automatische Claim-Extraktion.
- Simulation durchfuehren als produktive Engine.
- Auswertung und Lerntransfer als vollwertiger eigener Screen.
- Lernhistorie, Fortschritt, Zertifikate und Benchmarks.
- Team-/Admin-Dashboards.
- Rechte- und Rollensystem.
- CRM-Anbindung.
- Relationship Memory als eigenes Modul.
- Vollautomatische Angebotsanalyse oder eigenes RFQ-Modul.

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
- Keine Rechteverwaltung.

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
- Welche Pflichtinformationen braucht ein Verhandlungsprojekt im MVP?
- Welche Datenqualitaetsindikatoren braucht die Knowledge Base?
- Welche vorhandenen Claims duerfen im MVP manuell gepflegt werden?
- Wie werden Hypothesen, Fakten, Annahmen und Empfehlungen visuell und sprachlich getrennt?
- Welche minimale Angebots- oder RFQ-Vergleichslogik reicht im MVP als Notiz- oder Vergleichsansicht?
- Welche kulturellen Hinweise sind didaktisch sinnvoll und rechtlich unkritisch?
- Welche Funktionen gehoeren erst in Zielbild-Screens statt in den MVP-Core?
