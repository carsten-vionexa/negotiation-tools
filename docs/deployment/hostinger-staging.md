# Hostinger Staging Deployment

## Ziel und Scope

Dieses Dokument haelt den aktuellen erfolgreichen Hostinger-Staging-Stand fuer Negotiation Tools fest. Es dokumentiert die lauffaehige Staging-Architektur, wichtige Serverpfade, Compose-Nutzung, Reverse-Proxy-/Login-Einbindung, Migrationen und Smoke-Test-Schritte.

Nicht Bestandteil dieses Dokuments:

- keine Aenderung an Caddy, Authelia oder Server-Konfiguration
- keine Aenderung an laufenden Containern
- keine neue Seed-Logik
- keine technischen Docker-Fixes
- keine Secrets, Tokens, Passwoerter oder echten `.env.staging`-Werte

## Server-Stand

- Anbieter/Server: Hostinger VPS KVM 2
- Betriebssystem: Ubuntu 24.04 LTS
- SSH: `deploy`-User mit SSH-Key
- Root-/Passwort-SSH: deaktiviert
- Firewall: UFW aktiv
- Container-Runtime: Docker und Docker Compose aktiv
- Repository-Pfad auf dem VPS: `/opt/negotiation-tools`
- Staging-Env-Datei: `/opt/negotiation-tools/.env.staging`
- Env-Datei-Rechte: `600`
- Env-Datei-Tracking: nicht getrackt, darf nicht committed werden

## Oeffentliche Endpunkte

- Portal: `https://tools.hawkins-consulting.de`
- App: `https://negotiation.tools.hawkins-consulting.de`
- Healthcheck: `https://negotiation.tools.hawkins-consulting.de/api/health`

Die App ist ueber Authelia geschuetzt. Caddy stellt HTTPS bereit und routet die App-Anfragen an die lokal gebundenen Containerports.

## Architektur

```text
Browser
  -> HTTPS / Caddy
  -> Authelia Login
  -> negotiation.tools.hawkins-consulting.de
       /api/* -> 127.0.0.1:8000 -> backend
       /*      -> 127.0.0.1:3000 -> frontend

Compose Stack in /opt/negotiation-tools
  frontend -> backend
  backend  -> db
  db       -> pgvector/pgvector:pg16
```

Interne Ports:

- Frontend: `127.0.0.1:3000`
- Backend: `127.0.0.1:8000`
- Datenbank: intern im Compose-Netzwerk, nicht oeffentlich exponiert

Compose-Services:

- `db`: PostgreSQL mit `pgvector/pgvector:pg16`, Healthcheck aktiv
- `backend`: FastAPI-App, intern auf Port `8000`
- `frontend`: Next.js-App, intern auf Port `3000`

Persistente Volumes aus `docker-compose.staging.yml`:

- `postgres_data`: PostgreSQL-Daten
- `uploads_data`: Backend-Uploads unter `/app/uploads`

## Compose-Nutzung

Der Staging-Stack wird im Repository-Verzeichnis auf dem VPS betrieben:

```bash
cd /opt/negotiation-tools
docker compose --env-file .env.staging -f docker-compose.staging.yml ps
```

Start beziehungsweise Rebuild:

```bash
docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build
```

Logs:

```bash
docker compose --env-file .env.staging -f docker-compose.staging.yml logs -f backend
docker compose --env-file .env.staging -f docker-compose.staging.yml logs -f frontend
docker compose --env-file .env.staging -f docker-compose.staging.yml logs -f db
```

Wichtig: `docker compose down -v` darf auf Staging nur bei bewusstem Datenreset verwendet werden, weil dadurch persistente Volumes entfernt werden koennen.

## `.env.staging`

`.env.staging` bleibt ausschliesslich serverlokal unter `/opt/negotiation-tools/.env.staging`. Die Datei enthaelt echte Datenbank-Zugangsdaten und Staging-Konfiguration und darf nicht getrackt, committed oder in Tickets, Logs oder Screenshots offengelegt werden.

Repository-seitig ist nur `.env.staging.example` als Platzhalter- und Strukturreferenz vorgesehen.

Erwartete Eigenschaften auf dem VPS:

- Pfad: `/opt/negotiation-tools/.env.staging`
- Rechte: `600`
- Besitzer: `deploy` beziehungsweise der betreibende Servernutzer
- Git-Status: nicht getrackt

## Caddy- und Authelia-Einbindung

Caddy ist als HTTPS-Reverse-Proxy aktiv. Authelia schuetzt den Zugriff auf die Staging-App.

Routing fuer `negotiation.tools.hawkins-consulting.de`:

- `/api/*` wird an das Backend auf `127.0.0.1:8000` weitergeleitet.
- `/*` wird an das Frontend auf `127.0.0.1:3000` weitergeleitet.

Dieses Repository dokumentiert die Einbindung nur. Caddy- und Authelia-Konfigurationen liegen serverseitig und werden in diesem Issue nicht geaendert.

## Migrationen und Datenbank

Die Staging-Datenbank laeuft als `pgvector/pgvector:pg16` im Compose-Stack und ist gesund (`healthy`).

Alembic-Migrationen wurden erfolgreich bis zum Head ausgefuehrt:

```text
2f4b7c8d9e0a (head)
```

Der verifizierte Datenbankstand umfasst 21 Tabellen.

Das Backend-Image enthaelt `alembic.ini` und `alembic/`, sodass Alembic-Kommandos im Backend-Container ohne hostseitigen Bind-Mount dieser Dateien ausgefuehrt werden koennen.

Migrationen werden bei Bedarf manuell gegen die Compose-Datenbank ausgefuehrt:

```bash
docker compose --env-file .env.staging -f docker-compose.staging.yml run --rm backend alembic upgrade head
```

## Smoke-Test

Der erfolgreiche Staging-Smoke-Test umfasst:

1. Browser oeffnet `https://negotiation.tools.hawkins-consulting.de`.
2. Authelia-Anmeldung funktioniert.
3. App-Frontend ist sichtbar.
4. `GET /api/health` funktioniert ueber `https://negotiation.tools.hawkins-consulting.de/api/health`.
5. Demo-Flow funktioniert:
   - `RequestItem` erstellen
   - daraus ein `NegotiationProject` erstellen
   - Project-Detailseite oeffnen

Der getestete Demo-Flow bestaetigt, dass Frontend, Backend, Datenbank, Migrationen, Caddy-Routing und Authelia-Zugriffsschutz fuer den aktuellen Staging-Stand zusammenspielen.

## Update- und Redeploy-Checkliste

1. Lokal nur dokumentierte und reviewte Aenderungen committen.
2. Auf dem VPS als `deploy` einloggen.
3. In das Repository wechseln:

```bash
cd /opt/negotiation-tools
```

4. Sicherstellen, dass `.env.staging` weiter serverlokal vorhanden ist und nicht getrackt wird:

```bash
test -f .env.staging
git status --short .env.staging
```

5. Aktuellen Code holen:

```bash
git fetch origin
git merge --ff-only origin/main
```

6. Stack neu bauen und starten:

```bash
docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build
```

7. Containerstatus pruefen:

```bash
docker compose --env-file .env.staging -f docker-compose.staging.yml ps
```

8. Falls neue Backend-Migrationen enthalten sind, Alembic im Backend-Container gegen Staging ausfuehren und den Head dokumentieren.
9. Healthcheck pruefen:

```bash
curl -s https://negotiation.tools.hawkins-consulting.de/api/health
```

10. Browser-Smoke-Test ausfuehren:
    - Authelia Login
    - App sichtbar
    - `RequestItem -> NegotiationProject -> Project-Detailseite`

## Known follow-ups

- Backend Docker image: D1.3 hat `alembic.ini` und `alembic/` ins Image aufgenommen, damit Migrationen im Container sauber verfuegbar sind.
- Frontend Docker/Startkommando wegen Next.js `output: standalone` pruefen.
- Optional `favicon.ico` ergaenzen.
- Optional Staging-Demo-Daten/Seed-Strategie definieren.
