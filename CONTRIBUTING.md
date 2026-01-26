# Contributing to BizBuch

Thank you for your interest in contributing to BizBuch — your help is appreciated.

## Reporting issues
- Search existing issues before opening a new one.
- Provide a clear title, steps to reproduce, expected vs actual behavior, and relevant logs/screenshots.

## Feature requests
- Use the feature request issue template (if available). Describe use case and proposed API/UX.

## Development setup
Prerequisites: Node >= 20, Yarn or npm, Java/Android SDK for Android, Xcode for iOS (macOS).

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Start Metro:

```bash
npm start
```

3. Android (local build):

```bash
cd android
./gradlew assembleDebug
```

4. iOS (macOS):

```bash
cd ios
pod install
```

5. Run tests:

```bash
npm test
```

## Backend setup (Docker)

The backend services run via Docker Compose. This includes the Django API, PostgreSQL, Redis, and MinIO (S3-compatible storage).

### Prerequisites
- Docker and Docker Compose installed

### Quick start

1. Start all services:

```bash
docker compose up -d
```

2. Check logs:

```bash
docker compose logs -f web
```

3. Stop services:

```bash
docker compose down
```

### Available services

| Service       | URL                          | Description                    |
|---------------|------------------------------|--------------------------------|
| Backend API   | http://localhost:8000        | Django REST API                |
| pgAdmin       | http://localhost:5050        | PostgreSQL admin UI            |
| MinIO Console | http://localhost:9001        | S3-compatible storage UI       |
| RedisInsight  | http://localhost:5540        | Redis management UI            |

### Environment variables

Key environment variables in `docker-compose.yml`:

| Variable                  | Default | Description                              |
|---------------------------|---------|------------------------------------------|
| `DEBUG`                   | `True`  | Enable Django debug mode                 |
| `OTP_VERIFICATION_ENABLED`| `False` | Set to `True` to require email OTP       |
| `EMAIL_HOST_USER`         | -       | Gmail address for sending OTP emails     |
| `EMAIL_HOST_PASSWORD`     | -       | Gmail app password (not regular password)|

### Pull latest backend image

```bash
docker compose pull web
docker compose up -d --force-recreate web
```

### Create a admin user

```bash
docker exec -it bizbuch_backend python manage.py createsuperuser
```

### Database management

Access PostgreSQL via pgAdmin at http://localhost:5050 (credentials: `admin@admin.com` / `admin`).

Or via command line:

```bash
docker exec -it bizbuch-db-1 psql -U postgres -d bizbuch
```

## Code style
- Project uses `eslint` and `prettier`. Run `npm run lint` before opening a PR.
- Keep changes focused and include tests for new behavior when feasible.

## Branching & commits
- Use feature branches: `feat/<short-desc>` or `fix/<short-desc>`.
- Commit messages: short, imperative, and reference issues (Conventional Commits encouraged).

## Pull request checklist
- All CI checks pass.
- Linting and tests added/updated where relevant.
- Documentation updated if behavior or APIs changed.

## Contributor support
If you need help, open an issue and tag `help wanted` or email `Ujjwal.Kar@zohomail.in`.

Thanks for contributing!
