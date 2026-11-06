# Enerlumea

Enerlumea is an energy management dashboard built with React and Vite. Its Spring Boot API stores appliance records, energy readings, and contact submissions in a local H2 database.

## Run locally

Run the API and frontend in separate terminals from the repository root:

```powershell
mvn.cmd -f backend/pom.xml spring-boot:run
npm.cmd run dev
```

The API starts on `http://localhost:8080`. Vite proxies `/api` requests to it. The API seeds demonstration appliances and energy readings the first time the database is empty. H2 stores data under `backend/data/` so changes survive API restarts.

The frontend and API can also be started separately in other environments. Set `VITE_API_BASE_URL` to the API base path (for example, `https://api.example.com/api`) and set `CORS_ALLOWED_ORIGINS` on the API to the frontend origin or comma-separated list of origins.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/appliances` | List appliances |
| `POST` | `/api/appliances` | Add an appliance |
| `PUT` | `/api/appliances/{id}` | Update an appliance |
| `DELETE` | `/api/appliances/{id}` | Delete an appliance |
| `GET` | `/api/energy-records` | List readings |
| `POST` | `/api/energy-records` | Add a reading |
| `PUT` | `/api/energy-records/{id}` | Update a reading |
| `DELETE` | `/api/energy-records/{id}` | Delete a reading |
| `POST` | `/api/contact-messages` | Validate and store a contact submission |

Contact submissions are stored in the database; the API does not send email. The API currently has no authentication and is intended for local development. Add authentication and production database configuration before exposing it publicly.

## Checks

```powershell
npm.cmd audit --audit-level=moderate
npm.cmd run lint
npm.cmd run test:run
npm.cmd run test:browser
mvn.cmd -f backend/pom.xml test
npm.cmd run build
```

GitHub Actions runs these checks for pushes and pull requests.
The first local browser test run requires `npx.cmd playwright install chromium firefox webkit`.

## Verification snapshot

The production homepage loads about 90.45 KB of gzipped JavaScript, including the 83.73 KB entry, shared runtime, homepage route, and its icon chunks. The 106.30 KB gzipped Recharts chunk is loaded only on chart routes. The initial JavaScript is below the 150 KB budget.

`npm audit --audit-level=moderate` currently reports zero vulnerabilities.

The available Lighthouse report in `docs/lighthouse.report.json` predates the latest font and heading fixes. It recorded Performance 79, Accessibility 98, Best Practices 100, and SEO 100; rerun Lighthouse before treating those scores as current or claiming the 95+ performance target.

Responsive viewport test results are documented in [the mobile responsiveness report](docs/mobile-responsiveness.md). The checks used browser emulation and do not replace physical-device or cross-browser testing.

## PWA and SEO

The frontend includes a web app manifest, an offline service worker for the application shell, metadata for social previews, structured data, `robots.txt`, and a sitemap. Before deployment, replace `YOUR-PRODUCTION-DOMAIN` in `public/robots.txt` and `public/sitemap.xml` with the public frontend URL. Add canonical and Open Graph URL metadata after the final domain is known.

Dashboard appearance defaults to light and the selected theme is saved in the current browser. No sign-in or cross-device preferences are implemented.

## Architecture

See [the architecture overview](docs/architecture.md) for the client, API, and local database layout.

## Component library

The private `@enerlumea/ui` workspace package contains reusable Button, Card,
and TextField components with separate styles and tests. The dashboard Settings
page uses the library Card component. See [the component library guide](packages/ui/README.md).

## Quality reports

- [Accessibility audit](docs/accessibility-audit.md)
- [Cross-browser test results](docs/cross-browser-testing.md)
