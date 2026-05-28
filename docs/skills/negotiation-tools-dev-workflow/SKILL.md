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
