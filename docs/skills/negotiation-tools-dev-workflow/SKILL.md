# Skill: Negotiation Tools – Entwicklungsworkflow

## Ziel

Dieser Skill standardisiert die gemeinsame Arbeit am Projekt **Negotiation Tools**.
Ziel ist ein konsistenter, nachvollziehbarer und risikoarmer Entwicklungsprozess mit kleinen Issues, klaren Codex-Prompts, sauberer Prüfung und vollständiger GitHub-Dokumentation.

## Grundprinzipien

* Immer auf Deutsch antworten.
* Professionell, präzise und projektorientiert arbeiten.
* Kleine, fokussierte Issues bevorzugen.
* Ein Issue soll genau einen klaren Nutzen haben.
* Keine Nebenfeatures, Refactorings oder kosmetischen Zusatzänderungen ohne explizite Entscheidung.
* Nach jedem abgeschlossenen Schritt den nächsten sinnvollen Schritt benennen, aber nicht automatisch starten.
* GitHub Issues dienen als zentrale Dokumentation für Aufgaben, Umsetzung, Tests und Abschluss.
* Codex-Prompts sollen so konkret sein, dass Codex mit möglichst wenig Interpretationsspielraum arbeiten kann.

## Standardablauf pro Entwicklungsschritt

### 1. Aktuellen Stand einordnen

Zu Beginn eines neuen Schritts den aktuellen Projektstand kurz bewerten:

* aktueller Branch
* aktueller HEAD / Commit
* Status von `main` und `origin/main`
* Working Tree sauber oder nicht
* zuletzt abgeschlossenes Issue
* fachlicher Stand im Produkt

Wenn der Nutzer lokale Git-Ausgaben liefert, diese prüfen und einordnen.

Typische Kommandos:

```bash
git status
git diff --stat
git log --oneline -5
```

Bei Branch- oder PR-Arbeit zusätzlich:

```bash
git branch
git log --oneline --decorate -10
```

### 1a. Issue- und PR-Hygiene vor dem nächsten Schritt prüfen

Bevor ein neuer Entwicklungsschritt gestartet oder ein neues C-Issue formuliert wird, muss der aktuelle GitHub-Stand kurz geprüft werden.

Ziel ist nicht, alle offenen Issues oder Pull Requests automatisch zu schließen. Ziel ist, vor dem nächsten Schritt bewusst zu klären, ob offene Arbeiten noch relevant, bereits erledigt, überholt oder blockierend sind.

Pflichtprüfung vor einem neuen Schritt:

* Welche Issues sind aktuell offen?
* Welche Pull Requests sind aktuell offen?
* Sind offene Issues durch bereits gemergte Commits faktisch erledigt?
* Sind offene Issues durch spätere Roadmap-, Dokumentations- oder Codeänderungen überholt?
* Blockiert eines der offenen Issues den geplanten nächsten Schritt?
* Gibt es offene Pull Requests, die zuerst gemergt, aktualisiert oder geschlossen werden sollten?

Offene Issues dürfen nicht blind geschlossen werden. Ein Issue gilt erst dann als erledigt, wenn die relevante Änderung auf `main` vorhanden ist. Eine reine Absicht, Planung oder Roadmap-Formulierung reicht nicht.

Ein Issue darf geschlossen werden, wenn alle folgenden Punkte erfüllt sind:

* der aktuelle Code- oder Dokumentationsstand erfüllt die Akzeptanzkriterien,
* die Umsetzung liegt auf `main`,
* der Sachverhalt ist in Code, Dokumentation oder Roadmap nachvollziehbar,
* es gibt keinen offenen Rest-Scope, der ausdrücklich in diesem Issue bleiben soll.

Beim Schließen eines Issues soll ein kurzer Kommentar ergänzt werden, zum Beispiel:

```text
Completed. Erledigt durch <Commit/Komponente/Dokumentation>. Akzeptanzkriterien sind durch den aktuellen main-Stand erfüllt.
```

Wenn ein Issue weiterhin relevant ist, aber nicht zum nächsten Schritt gehört, bleibt es offen und wird kurz eingeordnet, zum Beispiel:

* späteres Konzeptissue
* technisches Stabilitätsissue
* blockierend
* nicht blockierend
* bewusst außerhalb des aktuellen Scopes

Offene Pull Requests müssen vor einem neuen Schritt geprüft werden:

* Wenn ein PR fertig und geprüft ist, soll er vor dem nächsten Schritt gemergt werden.
* Wenn ein PR veraltet oder ersetzt ist, soll er geschlossen oder aktualisiert werden.
* Wenn ein PR den nächsten Schritt beeinflusst, darf nicht parallel auf `main` weitergearbeitet werden, ohne den Konflikt bewusst zu klären.
* Wenn ein PR unabhängig ist, darf der nächste Schritt fortgesetzt werden, aber der PR muss im Statusbericht erwähnt werden.

Vor Beginn eines neuen Schritts kurz berichten:

* Anzahl offener Issues
* Anzahl offener Pull Requests
* welche davon erledigt, überholt oder blockierend sind
* welche offen bleiben und warum
* ob der nächste Schritt sicher gestartet werden kann

Beispiel:

```text
Issue-/PR-Prüfung:
- Offene Issues: 2
- Offene PRs: 0
- #55 bleibt offen als späteres PDF-Konzeptissue.
- #90 bleibt offen als separates Docker-/Turbopack-Stabilitätsissue.
- Keine offenen PRs.
- Der nächste Schritt C23 kann gestartet werden.
```

### 2. Nächsten sinnvollen Schritt festlegen

Den nächsten Schritt als kleines C-Issue formulieren, zum Beispiel:

```text
C19: Completed-Hinweis bei „Zielobjekte erzeugen“ verbessern
```

Dabei kurz begründen:

* Warum ist dieser Schritt jetzt sinnvoll?
* Welches konkrete UX-, Backend- oder Produktproblem löst er?
* Warum sollte er isoliert umgesetzt werden?

### 3. Mini-Scope definieren

Vor dem Issue immer den Scope schärfen:

* Was soll geändert werden?
* Was soll ausdrücklich nicht geändert werden?
* Welche Akzeptanzkriterien gelten?
* Welche Tests oder Smoke-Tests sind sinnvoll?
* Gibt es Risiken oder Stellen, die Codex besonders prüfen soll?

Wichtig:

```text
Ein Issue = ein klarer Nutzen.
```

### 4. GitHub Issue anlegen

Wenn der Nutzer zustimmt, ein GitHub Issue anlegen.

Das Issue soll enthalten:

* Titel
* Kontext
* Ziel
* fachliche Erwartung
* technische Hinweise
* Akzeptanzkriterien
* manueller Smoke-Test
* Codex-Prompt oder Hinweis, dass der Codex-Prompt separat folgt

Issue-Titel bevorzugt im Format:

```text
C19: Kurzer präziser Titel
```

### 5. Codex-Prompt erstellen

Nach Anlage des Issues einen klaren Codex-Prompt erstellen.

Der Prompt soll enthalten:

* Repository
* Issue-Nummer und Titel
* Ausgangslage
* konkrete Aufgabe
* technische Erwartung
* Nicht-Ziele
* Akzeptanzkriterien
* Testanforderungen
* gewünschtes Abschlussformat

Codex soll am Ende immer berichten:

* geänderte Dateien
* technische Umsetzung
* ausgeführte Tests
* Ergebnis
* offene Punkte

Wenn sinnvoll, Codex auffordern:

* auf einem eigenen Branch zu arbeiten
* einen Pull Request anzulegen
* keine größeren Refactorings vorzunehmen
* keine nicht angeforderten UI- oder Backend-Änderungen einzubauen

### 6. Codex-Ergebnis prüfen

Wenn der Nutzer das Codex-Ergebnis in den Chat kopiert, prüfen:

* Wurde der Scope eingehalten?
* Wurden nur passende Dateien geändert?
* Sind die Akzeptanzkriterien erfüllt?
* Wurden sinnvolle Tests ausgeführt?
* Gibt es Seiteneffekte auf bestehende Funktionen?
* Gibt es offene Punkte?
* Ist ein manueller Smoke-Test sinnvoll oder erforderlich?

Keine bloße Bestätigung geben, sondern fachlich bewerten.

### 7. Worktree und Repo-Konsistenz prüfen

Nach Umsetzung immer lokale Git-Ausgaben vom Nutzer prüfen, insbesondere:

```bash
git status
git diff --stat
git log --oneline -5
```

Bewerten:

* Ist der Working Tree sauber?
* Ist `main` synchron mit `origin/main`?
* Ist der relevante Commit sichtbar?
* Gibt es uncommitted changes?
* Gibt es Hinweise auf Merge-/Branch-Inkonsistenzen?

Wenn etwas nicht sauber ist, konkrete nächste Kommandos vorschlagen.

### 8. Abschlusskommentar im GitHub Issue hinterlegen

Nach erfolgreicher Prüfung einen Abschlusskommentar im GitHub Issue hinterlegen.

Der Abschlusskommentar soll enthalten:

```text
Implemented.

Changed files:
- ...

Technical implementation:
- ...

Tests:
- ...

Result:
- ...

Open points:
- None.
```

Falls es offene Punkte gibt, diese klar benennen.

### 9. Merge, Close und Abschluss

Wenn ein Pull Request existiert:

* PR-Status prüfen, sofern möglich.
* Tests und Review-Status bewerten.
* Wenn technisch und über die verfügbaren Tools möglich, beim Merge unterstützen.
* Wenn nicht möglich, dem Nutzer klare Merge-Anweisungen geben.

Wenn direkt auf `main` gearbeitet wurde:

* prüfen, ob Commit auf `main` und `origin/main` liegt
* prüfen, ob Working Tree sauber ist
* Issue schließen, wenn möglich und vom Nutzer gewünscht

Abschluss immer mit kurzer Einordnung:

```text
C19 ist sauber abgeschlossen.
main ist synchron.
Working Tree ist sauber.
Keine offenen Punkte.
```

### 10. Nächsten Schritt vorschlagen

Nach Abschluss eines Issues den nächsten sinnvollen Schritt benennen.

Beispiel:

```text
Nächster sinnvoller Schritt:
C20: ImportJob-Detailseite als Stepper-Flow glätten
```

Nicht automatisch starten, sondern zunächst kurz einordnen und auf Zustimmung warten.

## Standardstruktur für Issues

```markdown
## Kontext

Kurze Einordnung des aktuellen Stands und warum dieses Issue sinnvoll ist.

## Ziel

Was soll nach Umsetzung besser funktionieren?

## Fachliche Erwartung

- Erwartung 1
- Erwartung 2
- Erwartung 3

## Technische Hinweise

- Relevante Dateien oder Module prüfen
- Bevorzugte Implementierungsrichtung
- Keine unnötigen Refactorings

## Nicht-Ziele

- Was ausdrücklich nicht geändert werden soll

## Akzeptanzkriterien

- Kriterium 1
- Kriterium 2
- Kriterium 3

## Manueller Smoke-Test

1. Schritt
2. Schritt
3. Erwartetes Ergebnis

## Codex-Prompt

Separater oder eingebetteter Prompt.
```

## Standardstruktur für Codex-Prompts

```text
Bitte implementiere Issue #[Nummer] – [Titel].

Repository:
carsten-vionexa/negotiation-tools

Ausgangslage:
- Branch: main oder Feature Branch
- Working Tree soll vor Beginn sauber sein
- Kurzkontext

Aufgabe:
1. ...
2. ...
3. ...

Technische Erwartung:
- ...

Nicht-Ziele:
- ...

Akzeptanzkriterien:
- ...

Tests:
- Relevante Tests ausführen
- Falls Tests nicht ausführbar sind, transparent begründen

Bitte gib am Ende eine kurze Zusammenfassung:
- geänderte Dateien
- technische Umsetzung
- ausgeführte Tests
- Ergebnis
- offene Punkte
```

## Standardstruktur für Abschlusskommentare

```text
Implemented.

Changed files:
- ...

Technical implementation:
- ...

Tests:
- ...

Result:
- ...

Open points:
None.
```

## Projektkontext

Das Projekt **Negotiation Tools** entwickelt ein KI-gestütztes, workflowbasiertes Verhandlungstool.
Der fachliche Zielzustand ist ein strukturiertes Verhandlungs-Cockpit, das Unternehmensdaten, Importdaten, Einkaufshistorie, Anfragen, Lieferantenprofile, Strategieelemente und später Simulation/Auswertung verbindet.

Die Entwicklung soll deshalb ebenso workflowbasiert geführt werden:

```text
kleiner Schritt → klares Issue → Codex-Umsetzung → Prüfung → Dokumentation → sauberer Abschluss → nächster Schritt
```
