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
npm.cmd run lint
npm.cmd run test:run
mvn.cmd -f backend/pom.xml test
npm.cmd run build
```
