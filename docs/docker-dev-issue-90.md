# Docker Dev Stabilisierung fuer Issue #90

Datum: 2026-06-03

## Fehlerbild

Im lokalen Docker-Dev-Setup trat zuvor ein instabiles Next.js-Frontend auf. Das sichtbare Symptom war wiederholtes Neuladen bzw. Flackern im Browser. Die Frontend-Logs enthielten wiederholte Turbopack-Fatal-Errors, unter anderem:

```text
Failed to write app endpoint
Next.js package not found
```

## Entscheidung

Das produktionsnahe Hostinger-Staging bleibt unveraendert. Issue #90 betrifft ausschliesslich das lokale Docker-Dev-Setup.

Der lokale Docker-Frontend-Service nutzt bewusst Webpack statt Turbopack:

- `frontend/package.json`: `dev:docker` startet `next dev --webpack --hostname 0.0.0.0`.
- `docker-compose.yml`: der Frontend-Service startet mit `command: npm run dev:docker`.
- `frontend/Dockerfile`: die Development-Stage nutzt `CMD ["npm", "run", "dev:docker"]`.

Damit bleibt `npm run dev` fuer lokale Host-Entwicklung unveraendert, waehrend Docker-Dev konsequent ohne Turbopack laeuft.

## Pruefbefehle

```bash
docker compose build frontend
docker compose up -d db backend frontend
docker compose logs frontend
curl -i http://localhost:3000/imports

cd frontend
npm run lint
npm run typecheck
```

## Ergebnis

Verifikation am 2026-06-03:

- `docker compose build frontend` erfolgreich.
- `docker compose up -d db backend frontend` erfolgreich.
- Frontend-Logs zeigen `next dev --webpack --hostname 0.0.0.0` und `Next.js 16.2.6 (webpack)`.
- `/imports` antwortet mit `200 OK` und rendert ImportJob-Daten.
- Browser-Gegenprobe auf `http://localhost:3000/imports`: Heading `Imports` und Link `ImportJob hochladen` sichtbar, keine Browser-Console-Errors nach kurzer Beobachtung.
- Docker-RestartCount des Frontend-Containers: `0`.
- Keine Logtreffer fuer `Failed to write app endpoint`, `Next.js package not found`, Turbopack-Fatal-Errors oder wiederholte Frontend-Restarts.
- `npm run lint` im Frontend erfolgreich.
- `npm run typecheck` im Frontend erfolgreich.
- `frontend/next-env.d.ts` blieb unveraendert.
