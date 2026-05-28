# Staging Deployment Prep

## Ziel und Scope

D0 bereitet das Repository fuer eine spaetere Staging-/Demo-Instanz auf einem Hostinger VPS KVM 2 mit Ubuntu 24.04 LTS, Docker, Docker Compose, PostgreSQL/pgvector, Frontend, Backend und HTTPS-Reverse-Proxy vor.

Noch nicht Bestandteil von D0:

- kein echter Serverzugriff
- kein Hostinger-Deployment
- keine echten Secrets, Tokens, IPs oder Domains im Repository
- keine CI/CD-Pipeline
- keine Produktlogik, Importlogik, RequestItem-, Project-, Strategy-, KI-, PDF- oder OCR-Erweiterung
- keine produktive Authentifizierung
- keine Domain- oder DNS-Konfiguration

## Ergebnis der Docker-/Compose-Pruefung

Das bestehende `docker-compose.yml` bleibt die lokale Entwicklungsumgebung. Es ist bewusst entwicklungsnah:

- Backend startet mit `uvicorn ... --reload`.
- Frontend startet mit `npm run dev:docker`.
- Backend- und Frontend-Code werden per Bind Mount eingebunden.
- PostgreSQL wird als `pgvector/pgvector:pg16` mit persistentem Volume `postgres_data` betrieben.
- `database/init/01_extensions.sql` aktiviert die Extension `vector`.

Fuer Staging ist ein separates `docker-compose.staging.yml` sinnvoll, weil dort andere Betriebsannahmen gelten:

- keine Hot-Reload-Startkommandos
- keine Code-Bind-Mounts fuer Frontend und Backend
- kein nach aussen offener PostgreSQL-Port
- App-Ports nur auf `127.0.0.1`, damit ein Reverse Proxy HTTPS davor setzen kann
- Platzhalterpflicht fuer Secrets und URL-Werte statt lokaler Dev-Defaults

## Staging-Dateien

- `docker-compose.staging.yml`: Staging-orientiertes Compose-File fuer `db`, `backend` und `frontend`.
- `.env.staging.example`: Beispiel fuer die auf dem VPS anzulegende `.env.staging`.
- `.env.staging`: echte Serverwerte, lokal auf dem VPS, nicht committen.

Grundstart auf dem spaeteren VPS:

```bash
cp .env.staging.example .env.staging
# .env.staging mit echten Serverwerten fuellen
docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build
```

Status und Logs:

```bash
docker compose --env-file .env.staging -f docker-compose.staging.yml ps
docker compose --env-file .env.staging -f docker-compose.staging.yml logs -f backend
docker compose --env-file .env.staging -f docker-compose.staging.yml logs -f frontend
```

## Environment Variables fuer Staging

| Variable | Dienst | Zweck |
| --- | --- | --- |
| `POSTGRES_DB` | db | Datenbankname, z.B. `negotiation_tools` |
| `POSTGRES_USER` | db | Datenbanknutzer |
| `POSTGRES_PASSWORD` | db | starkes, nur serverseitig gespeichertes Passwort |
| `DATABASE_URL` | backend | SQLAlchemy/psycopg-Verbindung zur Compose-DB |
| `BACKEND_CORS_ORIGINS` | backend | komma-separierte erlaubte Browser-Origin(s) |
| `UPLOAD_BASE_DIR` | backend | Upload-Ablage im Container, fuer Staging `/app/uploads` |
| `MAX_UPLOAD_SIZE_MB` | backend | Upload-Groessenlimit |
| `NEXT_PUBLIC_API_URL` | frontend/browser | Browser-facing API Base URL |
| `SERVER_API_URL` | frontend/server | interne API Base URL fuer serverseitige Next.js-Aufrufe |
| `FRONTEND_HOST_PORT` | compose | lokaler Host-Port auf `127.0.0.1` fuer Frontend |
| `BACKEND_HOST_PORT` | compose | lokaler Host-Port auf `127.0.0.1` fuer Backend |
| `STAGING_PUBLIC_ORIGIN` | dokumentarisch | oeffentliche HTTPS-Origin der Staging-Instanz |

Empfohlene URL-Konfiguration:

- `SERVER_API_URL=http://backend:8000`
- `NEXT_PUBLIC_API_URL=https://<staging-domain>`
- `BACKEND_CORS_ORIGINS=https://<staging-domain>`

Wenn der Reverse Proxy spaeter `/api` an das Backend und alle anderen Pfade an das Frontend routet, kann der Browser dieselbe Origin verwenden. Fuer lokale Tests ohne Reverse Proxy kann `NEXT_PUBLIC_API_URL` alternativ auf eine direkt erreichbare Backend-URL zeigen.

## Reverse Proxy und HTTPS

Empfehlung fuer D1: Caddy.

Begruendung:

- Caddy hat automatische HTTPS-Zertifikate per ACME.
- Die Konfiguration fuer ein kleines Staging-Setup ist deutlich kuerzer als bei Nginx.
- Basic Auth vor der Demo-Instanz ist spaeter einfach am Reverse Proxy ergaenzbar.
- Caddy kann statisch auf die lokal gebundenen Containerports `127.0.0.1:3000` und `127.0.0.1:8000` weiterleiten.

Noch offen fuer D1:

- echte Domain festlegen
- DNS auf den VPS zeigen lassen
- Caddy installieren oder als separaten Compose-Service betreiben
- HTTPS aktivieren
- Zugriffsschutz entscheiden, z.B. Basic Auth am Reverse Proxy fuer die Staging-/Demo-Instanz oder spaeter App-Login

Skizze fuer eine spaetere Caddy-Konfiguration, ohne echte Domain:

```text
<staging-domain> {
  route /api/* {
    reverse_proxy 127.0.0.1:8000
  }

  route /docs* {
    reverse_proxy 127.0.0.1:8000
  }

  route /openapi.json {
    reverse_proxy 127.0.0.1:8000
  }

  reverse_proxy 127.0.0.1:3000
}
```

## Persistente Daten

`docker-compose.staging.yml` definiert zwei benannte Volumes:

- `postgres_data`: PostgreSQL-Datenverzeichnis unter `/var/lib/postgresql/data`
- `uploads_data`: Upload-Ablage des Backends unter `/app/uploads`

Das PostgreSQL-Volume darf bei Updates nicht entfernt werden. Insbesondere ist `docker compose down -v` auf Staging zu vermeiden, sofern kein bewusster Datenreset geplant ist.

## Backup-Grundidee

Fuer D1 reicht eine einfache, nachvollziehbare PostgreSQL-Backup-Routine:

```bash
mkdir -p backups
docker compose --env-file .env.staging -f docker-compose.staging.yml exec -T db \
  sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' > "backups/negotiation_tools_$(date +%Y%m%d_%H%M%S).sql"
```

Spaeter sollte daraus ein regelmaessiger Serverjob mit Rotation entstehen, z.B. taeglich, Aufbewahrung 7 bis 14 Tage, plus gelegentlicher Restore-Test in einer separaten Umgebung. Upload-Dateien aus `uploads_data` sollten separat gesichert werden, wenn Demo-Uploads erhaltenswert sind.

## D1-Schritte mit echtem Server

1. Hostinger VPS KVM 2 mit Ubuntu 24.04 LTS bereitstellen.
2. Docker und Docker Compose installieren.
3. Repository auf den VPS bringen.
4. `.env.staging` aus `.env.staging.example` erstellen und echte Werte setzen.
5. Compose-Stack mit `docker compose --env-file .env.staging -f docker-compose.staging.yml up -d --build` starten.
6. Migrationen gegen die Staging-Datenbank ausfuehren.
7. Caddy oder Nginx konfigurieren, bevorzugt Caddy.
8. HTTPS und optional Basic Auth fuer die geschuetzte Demo-Instanz aktivieren.
9. Healthcheck, Frontend-Flow und Demo-Flow RequestItem -> NegotiationProject -> Project-Detail pruefen.
10. Backup- und Restore-Grundroutine testen.
