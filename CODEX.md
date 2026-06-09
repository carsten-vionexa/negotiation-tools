# Codex Instructions

Compact execution rules for Codex work in this repository.

## Start

- Read the assigned GitHub issue first.
- Read `README.md`.
- Read this `CODEX.md`.
- Read `docs/skills/negotiation-tools-dev-workflow/SKILL.md` only when the task needs broader project workflow context.
- Check `git status` before changing files.

## Scope

- If the GitHub issue is complete, the issue is the primary scope source.
- Do not duplicate the full issue scope in the prompt; follow the issue precisely.
- Change only files needed for the issue.
- Do not add side features, opportunistic refactors, or cosmetic changes outside the scope.
- For documentation issues, do not change product files.
- For product changes, run appropriate checks for the touched area.

## Safety

- Do not commit secrets, `.env` values, tokens, credentials, or local artifacts.
- Do not change backend, frontend, migrations, staging, tests, or build scripts unless the issue explicitly requires it.
- Do not stage or commit changes unless explicitly requested.
- Preserve unrelated user or local changes.

## Checks

- Always run `git diff --check`.
- If product code changed, run suitable lint, typecheck, build, unit, or smoke checks.
- If a check cannot be run, explain why.

## Report

Keep the final report short and include:

- changed files
- implementation
- tests
- result
- open points
