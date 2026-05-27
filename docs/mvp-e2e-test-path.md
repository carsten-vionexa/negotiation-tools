# MVP-End-to-End-Testpfad mit Rheinwerk-Demo-Fall

## 1. Zweck

Dieses Dokument beschreibt einen manuellen End-to-End-Testpfad fuer den MVP-Stand nach Phase B. Der Testpfad soll zeigen, ob der vorhandene Workflow fachlich zusammenhaengend durchlaufen werden kann:

`Company -> Profile -> Project -> Knowledge Base -> Imports -> Analysis -> Strategy -> Simulation -> Trainerreview`

Der Testpfad ist Teil von Phase C0. Er ist keine Feature-Implementierung und keine automatisierte Testausfuehrung. Er dient als fachliche Abnahme- und Demo-Grundlage, bevor Phase C Upload/Import beginnt.

## 2. Testfalluebersicht

Der empfohlene Demo-Fall basiert auf dem fiktiven, aber realistisch angelegten Kundenkontext Rheinwerk Robotics GmbH.

### 2.1 Company

| Feld | Testwert |
|---|---|
| Name | Rheinwerk Robotics GmbH |
| Branche | Industrierobotik / Automatisierung |
| Sitz | Augsburg, Deutschland |
| Rolle im Tool | einkaufende Organisation und Trainingskunde |
| strategischer Druck | Kosten-, Lieferfaehigkeits- und Technologiedruck bei kritischen Komponenten |
| kritische Warengruppe | Praezisionsgetriebe / Harmonic Drives |
| typische Verhandlungssituation | internationale Lieferantenverhandlung fuer technisch kritische Robotikkomponenten |

### 2.2 Profile / Rolle

| Feld | Testwert |
|---|---|
| Name | Markus Schulz |
| Rolle | Einkaeufer / angehender Einkaufsleiter |
| Erfahrung | erste internationale Einkaufserfahrung, noch nicht senior |
| Trainingsziel | strukturierte Vorbereitung, bessere Argumentation, Umgang mit Lieferantenmacht |
| Sprache | Deutsch oder Englisch, je nach Szenario |
| Entwicklungsfeld | Sicherheit bei Preis-/Lieferzeitdruck und konditionierten Konzessionen |

### 2.3 SupplierProfile

| Feld | Testwert |
|---|---|
| Name | Nippon Precision Motion Co. Ltd. |
| Land/Region | Japan / Asien |
| Lieferantentyp | Hersteller von Praezisionsgetrieben |
| Beziehung | technisch stark, kommerziell anspruchsvoll, begrenzte Alternativen |
| vermutete Interessen | stabile Abrufe, technische Spezifikationssicherheit, Preisstabilitaet, langfristige Planung |
| kulturelle Arbeitshypothese | indirekte Kommunikation, hoher Wert auf Verlaesslichkeit, gruendliche Abstimmung |

### 2.4 RequestItem

| Feld | Testwert |
|---|---|
| Titel | Praezisionsgetriebe RR-HG-42 |
| Kategorie | Praezisionsgetriebe / Harmonic Drive |
| Menge | 800 Stueck |
| Zielregion | Asien / Japan |
| Lieferzeit | 10 bis 12 Wochen |
| interne Preisannahme | 420 EUR pro Stueck |
| grobe Preisvorstellung | Zielkorridor 380 bis 410 EUR pro Stueck |

### 2.5 NegotiationProject

| Feld | Testwert |
|---|---|
| Titel | Rahmenverhandlung Praezisionsgetriebe 2026 |
| Company | Rheinwerk Robotics GmbH |
| Owner | Markus Schulz |
| Supplier | Nippon Precision Motion Co. Ltd. |
| RequestItem | Praezisionsgetriebe RR-HG-42 |
| Status | draft oder active |
| Prioritaet | high |
| Business Pressure | Marge in neuer Roboterbaureihe unter Druck |
| technische Abhaengigkeit | hoch |
| Supplier Power | hoch |
| Risiko | Lieferzeitverzug und Preissteigerung |
| Ziel | tragfaehiger Zielpreis, stabile Lieferzeiten und bessere Eskalations-/Forecast-Regelung |

## 3. Vorbedingungen

Vor dem Test:

1. Lokale Umgebung gemaess README starten.
2. Backend Healthcheck pruefen.
3. Frontend im Browser oeffnen.
4. Datenbankmigrationen muessen aktuell sein.
5. Fuer den vollen Testpfad sollten die oben beschriebenen Testdaten entweder bereits vorhanden sein oder manuell im bestehenden MVP angelegt werden.

Akzeptiert ist, wenn Knowledge-Base-Daten, Claims oder Einkaufshistorie teilweise fehlen. Diese Datenluecken sollen im MVP sichtbar und nicht als technischer Fehler behandelt werden.

## 4. Schritt-fuer-Schritt-Testpfad

### Schritt 1: Company anlegen oder pruefen

Route: `/companies`

Aktion:

1. Company-Liste oeffnen.
2. Falls Rheinwerk Robotics GmbH nicht vorhanden ist, Company anlegen.
3. Company-Detail oeffnen.
4. Branche, Markt-/Regionshinweise, strategischen Druck und kritische Warengruppe pruefen oder pflegen.

Erwartetes Ergebnis:

- Company ist sichtbar.
- Company-Detail laedt ohne Fehler.
- Bearbeitete Stammdaten bleiben nach dem Speichern erhalten.
- Verknuepfte Projekte sind sichtbar oder plausibel leer.

Abbruchpunkt:

- Company kann nicht geladen oder nicht gespeichert werden.

### Schritt 2: Profile / Rollenprofil anlegen oder pruefen

Route: `/profiles`

Aktion:

1. Profil-Liste oeffnen.
2. Markus Schulz oder eine passende Einkaufsrolle anlegen.
3. Profil mit Rheinwerk Robotics GmbH verknuepfen.
4. Rolle, Funktion, Trainingsziel und Entwicklungsfelder pruefen oder pflegen.

Erwartetes Ergebnis:

- Profil ist sichtbar.
- Profil-Detail laedt ohne Fehler.
- Profil kann als reale Person oder Trainingsrolle verwendet werden.
- Zugeordnete Projekte erscheinen, sobald ein Projekt mit Owner-Verknuepfung existiert.

Abbruchpunkt:

- Profil kann nicht mit Company-Bezug angelegt oder geladen werden.

### Schritt 3: SupplierProfile und RequestItem vorbereiten

Routen:

- `/projects` fuer Projektanlage mit bestehenden Beziehungen
- vorhandene Supplier-/Request-Flows, sofern im aktuellen Frontend sichtbar
- alternativ vorhandene API- oder Demo-Daten nutzen

Aktion:

1. Sicherstellen, dass ein SupplierProfile fuer Nippon Precision Motion Co. Ltd. oder einen vergleichbaren Lieferanten existiert.
2. Sicherstellen, dass ein RequestItem fuer Praezisionsgetriebe RR-HG-42 oder eine vergleichbare Anfrageposition existiert.
3. Fehlende Daten fuer C0 notieren, nicht als Upload-/Import-Fehler bewerten.

Erwartetes Ergebnis:

- SupplierProfile und RequestItem koennen im Projekt referenziert werden.
- Fehlende Daten werden als Datenluecke akzeptiert, sofern der Project-Flow trotzdem pruefbar bleibt.

Abbruchpunkt:

- Ein Projekt kann nicht angelegt werden, weil zwingende Beziehungen fehlen und nicht gepflegt werden koennen.

### Schritt 4: NegotiationProject anlegen

Route: `/projects`

Aktion:

1. Neues Projekt anlegen: `Rahmenverhandlung Praezisionsgetriebe 2026`.
2. Company, Owner, SupplierProfile und RequestItem verknuepfen.
3. Status, Prioritaet, Kategorie, Business Pressure, technische Abhaengigkeit, Supplier Power und Risiko pflegen.
4. Projekt speichern.
5. Projekt-Detail oeffnen.

Erwartetes Ergebnis:

- Projekt erscheint in der Projektliste.
- Projektdetail zeigt Beziehungen und Bearbeitungsformular.
- Workflow-Links zu Datenbasis, Analyse, Strategie, Simulation und Trainerreview sind sichtbar.

Abbruchpunkt:

- Projekt kann nicht gespeichert oder danach nicht wieder geladen werden.

### Schritt 5: Knowledge Base projektbezogen pruefen

Route: `/knowledge-base?projectId=<project-id>`

Aktion:

1. Aus dem Projektdetail den Link `Datenbasis anzeigen` oeffnen.
2. Projekt- und Company-Kontext pruefen.
3. Vorhandene Quellen, Claims, Anfragepositionen und Einkaufshistorie pruefen.
4. Fehlende Daten als Datenluecken dokumentieren.

Erwartetes Ergebnis:

- Die Route laedt projektbezogen.
- Vorhandene Daten werden angezeigt.
- Fehlende Daten erzeugen verstaendliche Empty States.
- Keine produktive Upload-/Import-Funktion wird erwartet oder gestartet.

Akzeptierte Datenluecken:

- Keine Einkaufshistorie vorhanden.
- Keine KnowledgeClaims vorhanden.
- Keine DocumentChunks vorhanden.
- Keine ImportJobs vorhanden.

Abbruchpunkt:

- Projektbezogene Datenbasis kann fuer eine gueltige Projekt-ID nicht geladen werden.

### Schritt 6: Analysis projektbezogen pruefen

Route: `/analysis?projectId=<project-id>`

Aktion:

1. Aus Knowledge Base oder Projektdetail die Analyseansicht oeffnen.
2. Projekt-, Company-, Supplier- und RequestItem-Kontext pruefen.
3. Fakten, Annahmen, Hypothesen, Datenluecken, Risiken, Chancen und offene Fragen pruefen.
4. Link zur Strategie pruefen.

Erwartetes Ergebnis:

- Analyseansicht laedt fuer das Projekt.
- Datenluecken werden als fachlicher Arbeitszustand dargestellt.
- Risiken und Chancen sind von Fakten/Annahmen/Hypothesen unterscheidbar.
- Kein automatisches Scoring oder verbindlicher KI-Wahrheitsanspruch wird suggeriert.

Abbruchpunkt:

- Analyseansicht kann fuer gueltige Projekt-ID nicht geladen werden.

### Schritt 7: Strategy vorbereiten

Route: `/strategy?projectId=<project-id>`

Aktion:

1. Strategie-Builder oeffnen.
2. Falls noch keine Strategie existiert, Strategie-Kopf anlegen.
3. Strategie-Kopf pflegen:
   - Gesamtziel
   - Zielergebnis
   - Minimum akzeptables Ergebnis
   - Walk-away Point
   - Risikoannahmen / Hypothesen
   - Notizen / offene Fragen
4. ZOPA-Dimension anlegen, z. B. Preis pro Stueck:
   - Buyer Target: 390 EUR
   - Buyer Walk-away: 430 EUR
   - Supplier Expected Target: 455 EUR
   - moeglicher Einigungsbereich: 410 bis 430 EUR plus Lieferzeit-/Forecast-Zusagen
5. BATNA-Option anlegen, z. B. alternativer europaeischer Lieferant mit hoeherem Preis und kuerzerer Kommunikation.
6. Konzession als Tauschobjekt anlegen, z. B. groesserer Forecast gegen Preisstabilitaet oder kuerzere Lieferzeit.
7. Argumentationslinie anlegen, z. B. Gesamtvolumen, langfristige Partnerschaft, Forecast-Sicherheit, technische Standardisierung.

Erwartetes Ergebnis:

- Strategie-Kopf wird gespeichert.
- ZOPA, BATNA, Konzession und Argumentation werden sichtbar.
- Manuelle Strategiearbeit ist moeglich.
- Keine automatische ZOPA-Berechnung, BATNA-Bewertung oder KI-Strategie-Generierung wird erwartet.

Abbruchpunkt:

- Strategie kann nicht angelegt oder Unterobjekte koennen nicht gespeichert werden.

### Schritt 8: Simulation Scenario konfigurieren

Route: `/simulation?projectId=<project-id>`

Aktion:

1. Simulation-Konfiguration oeffnen.
2. Projekt-, Strategie-, Supplier- und Rollenbezug pruefen.
3. Neues Szenario anlegen:
   - Titel: `Nippon Precision Preis- und Lieferzeitverhandlung`
   - Schwierigkeit: `intermediate`
   - Gespraechsphase: `preparation` oder `opening`
   - Sprache: `de` oder `en`
   - Trainingsziel: Markus soll Preisanker, Lieferzeitargumente und konditionierte Konzessionen strukturiert einsetzen.
   - Szenario-Briefing: Lieferant betont Rohstoffkosten, Auslastung und Qualitaetsrisiken.
   - Kulturelle Arbeitshypothesen: indirekte Kommunikation, Konsensbedarf, hoher Wert auf Verlaesslichkeit.
   - Erfolgskriterien: Zielkorridor klaeren, Gegenleistung fuer Konzession fordern, offene technische Risiken dokumentieren.
4. Szenario speichern und erneut oeffnen/bearbeiten.

Erwartetes Ergebnis:

- Szenario wird angelegt und in der Szenario-Liste angezeigt.
- Bearbeitung bleibt erhalten.
- Kultur-/Rollenbriefing wird als Arbeitshypothese dargestellt.
- Kein Chat, kein Voice-Modus, keine produktive Simulation und keine automatische Auswertung werden angeboten.

Abbruchpunkt:

- Szenario kann nicht angelegt oder nicht mit Projekt/Strategie verknuepft werden.

### Schritt 9: Trainerreview erfassen

Routen:

- `/trainer-review?projectId=<project-id>`
- `/trainer-review?scenarioId=<scenario-id>`

Aktion:

1. Aus Simulation oder Projektdetail Trainerreview oeffnen.
2. Projektbezogene Szenarioauswahl pruefen.
3. Szenario-Review oeffnen.
4. Trainerkommentar anlegen:
   - Typ: `trainer_note`
   - Sichtbarkeit: trainerintern
   - Text: Hinweis zur Vorbereitung, z. B. BATNA und Walk-away Point noch schaerfen.
5. Lernpunkt anlegen:
   - Typ: `learning_point` oder `next_focus`
   - Sichtbarkeit: trainee-sichtbar
   - Kompetenzbezug: Konzessionsstrategie oder Umgang mit Supplier Power
   - Text: Naechster Fokus ist, jede Konzession an eine konkrete Gegenleistung zu knuepfen.
6. Kommentar bearbeiten und Sichtbarkeit pruefen.

Erwartetes Ergebnis:

- Kommentare werden angezeigt.
- Lernpunkt erscheint im Lernpunkte-/naechster-Fokus-Bereich.
- Sichtbarkeit ist als fachliche Markierung erkennbar.
- Keine Score-Engine, automatische Bewertung, Zertifikatslogik oder Lernhistorie wird erwartet.

Abbruchpunkt:

- Trainerreview kann fuer ein vorhandenes Szenario nicht geladen werden oder Kommentare koennen nicht gespeichert werden.

## 5. Erwartete Gesamtergebnisse je Workflow-Stufe

| Stufe | Muss-Ergebnis | Akzeptierte Einschraenkung | Status | Notiz |
|---|---|---|---|---|
| Company | Company ist angelegt und editierbar | keine Mandanten-/Rechteverwaltung | offen |  |
| Profile | Profil/Rolle ist angelegt und verknuepfbar | keine Lernhistorie | offen |  |
| Project | Projekt verbindet Company, Owner, Supplier, RequestItem | keine automatische Projektanlage | offen |  |
| Knowledge Base | Datenlage ist sichtbar | fehlende Claims/History erlaubt | offen |  |
| Analysis | Ausgangslage, Datenluecken und Risiken sind sichtbar | keine automatische Analyse | offen |  |
| Strategy | Strategie-Kopf und Unterlisten sind pflegbar | keine automatische Berechnung | offen |  |
| Simulation | Szenario ist konfigurierbar | keine Simulation-Engine | offen |  |
| Trainerreview | Kommentare und Lernpunkte sind pflegbar | keine automatische Bewertung | offen |  |

## 6. Fehler- und Abbruchpunkte

Der E2E-Test gilt als blockiert, wenn einer dieser Punkte eintritt:

- Backend ist nicht erreichbar und Frontend zeigt keinen verstaendlichen Error State.
- Company kann nicht angelegt oder geladen werden.
- Profil kann nicht angelegt oder geladen werden.
- Projekt kann nicht angelegt, gespeichert oder wieder geladen werden.
- Projektbezogene Analyse-, Strategie-, Simulation- oder Review-Routen laden fuer gueltige IDs nicht.
- Strategie-Unterobjekte koennen nicht gespeichert werden.
- Szenario kann nicht angelegt werden.
- Trainerkommentar kann nicht angelegt werden.

Nicht blockierend fuer C0.3:

- fehlende Importdaten,
- fehlende Einkaufshistorie,
- fehlende KnowledgeClaims,
- fehlende DocumentChunks,
- keine automatische Simulation,
- keine automatische Auswertung,
- keine Seed-Daten-Implementierung.

## 7. Akzeptierte MVP-Datenluecken

Im aktuellen MVP duerfen folgende Luecken bestehen:

- keine produktiv importierte Einkaufshistorie,
- keine hochgeladenen Dokumente,
- keine automatisch extrahierten Claims,
- keine Embeddings,
- keine RAG-Suche,
- keine OCR-Ergebnisse,
- keine automatisierten Angebotsvergleiche,
- keine SimulationMessages aus einer echten Simulation,
- keine SimulationResults aus automatischer Auswertung.

Diese Luecken sollen in der Abnahme dokumentiert werden, sind aber kein Fehler des Phase-B-MVP.

## 8. Nicht-MVP-Abgrenzung

Der E2E-Test darf folgende Funktionen nicht als erforderlich behandeln:

- Upload-/Import-API,
- Dateiimport,
- Excel-/CSV-Parsing,
- automatische Zielobjekt-Erzeugung,
- RAG,
- Embeddings,
- OCR,
- produktive Simulation,
- Chat,
- Voice,
- Streaming,
- automatische Taktikerkennung,
- automatische Auswertung,
- Score-Engine,
- Zertifikatslogik,
- Lernhistorie,
- Admin-/Rechteverwaltung,
- Relationship Memory als eigenes Modul,
- Stakeholder-Graph,
- CRM-/ERP-Anbindung.

## 9. Abnahmeprotokoll

| Pruefschritt | Ergebnis | Blocker? | Notiz |
|---|---|---|---|
| Company angelegt/geprueft | offen | nein |  |
| Profile angelegt/geprueft | offen | nein |  |
| SupplierProfile/RequestItem verfuegbar | offen | nein |  |
| Project angelegt/geprueft | offen | nein |  |
| Knowledge Base projektbezogen geprueft | offen | nein |  |
| Analysis projektbezogen geprueft | offen | nein |  |
| Strategy erstellt/geprueft | offen | nein |  |
| SimulationScenario erstellt/geprueft | offen | nein |  |
| Trainerreview erstellt/geprueft | offen | nein |  |
| Nicht-MVP-Grenzen eingehalten | offen | nein |  |

Gesamtergebnis:

- [ ] bestanden
- [ ] bestanden mit offenen Punkten
- [ ] nicht bestanden wegen Blockern

Offene Punkte:

- 

Blocker:

- 

Empfohlene Folgearbeit:

- C0.4 technische Verifikations-Checkliste anwenden.
- C0.5 Roadmap und Nicht-MVP-Grenzen aktualisieren.
- C0.6 Frontend-Konsolidierungsplan erst nach Abnahme fuer spaeteres Refactoring nutzen.
- Phase C Upload/Import erst nach abgeschlossener C0-Abnahme beginnen.
