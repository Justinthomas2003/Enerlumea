# Design decisions

This document records implementation choices visible in the current
codebase. It is not a product roadmap.

## Frontend and routing

- **React with Vite:** the frontend is a client-rendered single-page
  application with Vite providing development, build, and preview workflows.
- **Separate marketing and dashboard layouts:** public pages share a
  navigation bar and footer; dashboard pages share a header, sidebar, and
  content outlet.
- **Lazy-load secondary routes:** non-home marketing pages and dashboard
  pages are dynamically imported. The chart library is loaded only on chart
  routes to reduce the initial page payload.
- **Shared UI workspace:** reusable `Button`, `Card`, and `TextField`
  components live in a private npm workspace package rather than being
  duplicated in the application.

## Data and persistence

- **REST API for managed records:** appliances and energy records use the
  Spring Boot API for create, read, update, and delete operations. Contact
  submissions are validated and stored by the API.
- **Illustrative dashboard metrics:** overview metrics and chart samples are
  client-side demonstration data; they should not be treated as persisted
  account analytics.
- **H2 for local development:** the API uses a file-backed H2 database under
  `backend/data/` for the local workflow. Configure a production database
  before deployment.
- **Local API proxy:** the frontend defaults to `/api`, with Vite proxying to
  the local API. `VITE_API_BASE_URL` supports a separately hosted API.

## User experience and deployment

- **Remember the dashboard theme locally:** the light/dark choice is stored
  in browser local storage and is not synchronized across devices.
- **Cache the application shell:** the service worker is registered for
  production builds. This supports shell caching but does not make
  API-dependent management operations work offline.
- **Keep deployment configuration explicit:** frontend API origin, backend
  CORS origins, HTTPS, a production database, authentication, and public
  sitemap/robots URLs must be configured for a production deployment.

The application currently has no authentication. Do not expose the API
publicly as a production service without adding and configuring appropriate
access controls.