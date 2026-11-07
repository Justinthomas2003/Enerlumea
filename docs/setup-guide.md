# Setup guide

## Prerequisites

- Node.js and npm
- Java 21
- Maven

## Install dependencies

From the repository root, install the frontend dependencies:

```powershell
npm.cmd ci
```

## Run locally

Start the backend and frontend in separate PowerShell terminals from the
repository root:

```powershell
mvn.cmd -f backend/pom.xml spring-boot:run
```

```powershell
npm.cmd run dev
```

The API listens on `http://localhost:8080`. Vite serves the frontend and
proxies `/api` requests to the API. The API seeds demonstration appliances
and energy readings when the local database is empty. H2 data is stored in
`backend/data/` and persists between API restarts.

## Configuration

By default, the frontend sends API requests to `/api`. To use a separately
hosted API, set `VITE_API_BASE_URL` to its API base path, such as
`https://api.example.com/api`, and set `CORS_ALLOWED_ORIGINS` on the backend
to the frontend origin or a comma-separated list of allowed origins.

The app does not currently include authentication or email delivery for
contact submissions. Do not expose the local API as a production service
without suitable security, database, HTTPS, and deployment configuration.

## Build and checks

Run the frontend checks from the repository root:

```powershell
npm.cmd run lint
npm.cmd run test:run
npm.cmd run build
```

Run the API test suite:

```powershell
mvn.cmd -f backend/pom.xml test
```

Run browser tests with Playwright:

```powershell
npm.cmd run test:browser
```

The first local browser-test run may require installing the browser binaries:

```powershell
npx.cmd playwright install chromium firefox webkit
```