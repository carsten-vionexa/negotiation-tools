# Frontend-Konsolidierungsplan nach Phase B

## Zweck

Dieser Plan beschreibt eine spaetere Konsolidierung der grossen MVP-Frontend-Seiten. Er ist Teil von Phase C0 und bleibt bewusst eine Dokumentation. In diesem Schritt wird kein Produktivcode refaktoriert.

## Relevante Seiten

Besonders gross und spaeter konsolidierungswuerdig sind:

- `frontend/app/(workspace)/strategy/page.tsx`
- `frontend/app/(workspace)/simulation/page.tsx`
- `frontend/app/(workspace)/trainer-review/page.tsx`
- `frontend/app/(workspace)/projects/[id]/page.tsx`

Diese Seiten enthalten aktuell Datenladen, Error Handling, Server Actions, Formulare, lokale UI-Helfer und fachliche Sections in einer Datei. Das war fuer Phase B zweckmaessig, sollte nach der MVP-Abnahme aber schrittweise entzerrt werden.

## Wiederkehrende Muster

Wiederkehrende UI-Bausteine:

- `ActionLink`
- `BackLink`
- `FlowLink`
- `SectionTitle`
- `Meta`
- `Read`
- `InlineEmpty`
- `ItemCard`
- `CreateBox`

Wiederkehrende Formularbausteine:

- `Field`
- `TextArea`
- `Select`
- `Checkbox`
- `SubmitButton`

Wiederkehrende Utilities:

- `getErrorDescription`
- `optionalString`
- `requiredString`
- `optionalNumber`
- einfache Format-Helfer

## Moegliche Zielstruktur

Spaeter denkbare gemeinsame Module:

- `frontend/components/forms/*`
- `frontend/components/detail/*`
- `frontend/components/workflow/*`
- `frontend/lib/forms.ts`
- `frontend/lib/format.ts`

Diese Struktur ist nur ein Vorschlag und soll erst nach erfolgreicher MVP-Abnahme umgesetzt werden.

## Fachliche Komponenten-Kandidaten

Strategie:

- `StrategyHeadSection`
- `ZopaSection`
- `BatnaSection`
- `ConcessionSection`
- `ArgumentationSection`

Simulation:

- `ProjectSelection`
- `ProjectContextPanel`
- `ScenarioCard`
- `ScenarioForm`
- `CultureRoleBriefingPanel`

Trainerreview:

- `ScenarioSelection`
- `ReviewContextPanel`
- `CommentList`
- `CommentCard`
- `CommentForm`
- `LearningPointsPanel`

Projektdetail:

- `ProjectForm`
- `ProjectRelationshipsPanel`
- `ProjectWorkflowLinks`

## Priorisierung

Empfohlene spaetere Reihenfolge:

1. Kleine gemeinsame UI- und Formularbausteine extrahieren.
2. Projektdetailseite in Formular, Beziehungen und Workflow-Links trennen.
3. Simulation-Seite in Kontext, Szenarioliste und Formular trennen.
4. Trainerreview-Seite in Auswahl, Kontext, Kommentare und Lernpunkte trennen.
5. Strategie-Seite zuletzt und in mehreren kleinen PRs modularisieren.

## Risiken und Schutzmassnahmen

Risiken:

- Server Actions koennen durch falsche Extraktion brechen.
- Query-Parameter-Flows fuer `projectId` und `scenarioId` koennen beeintraechtigt werden.
- Form-Feldnamen koennen sich unbemerkt aendern.
- Revalidate- und Redirect-Verhalten kann sich veraendern.

Schutzmassnahmen:

- Refactoring erst nach MVP-Abnahme.
- Kleine PRs.
- Keine fachlichen Verhaltensaenderungen im Refactoring-PR.
- Vorher/nachher Browser-Smoke-Test wiederholen.
- `npm run lint`, `npm run typecheck` und `npm run build` ausfuehren.

## Nicht Bestandteil

Dieses Dokument plant keine Umsetzung. Nicht Bestandteil eines spaeteren reinen Refactorings sind:

- Upload/Import
- RAG
- OCR
- Embeddings
- produktive Simulation
- Chat
- Voice
- Streaming
- automatische Auswertung
- Score-Engine
- Zertifikatslogik
- Admin-/Rechteverwaltung
- CRM-/ERP-Integration

## Ergebnis

Nach diesem Plan sind die groessten Frontend-Konsolidierungskandidaten, wiederkehrende Muster, eine moegliche Reihenfolge und wesentliche Risiken dokumentiert. Code-Aenderungen erfolgen erst in spaeteren, separaten Refactoring-Issues.