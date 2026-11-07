# Component hierarchy

The application is a React single-page app. `src/App.jsx` defines the public
routes and keeps the marketing and dashboard experiences in separate layouts.
Non-home pages are loaded lazily and use shared loading and error handling.

```text
App
|-- MarketingLayout
|   |-- Navbar
|   |-- main
|   |   |-- Home
|   |   |-- About
|   |   |-- Features
|   |   \-- Contact
|   \-- Footer
\-- AppLayout (/dashboard)
    |-- Sidebar
    |-- Header
    \-- page-content
        |-- Overview
        |-- Analytics
        |-- Appliances
        |-- EnergyRecords
        |-- SolarEstimator
        |-- Settings
        |-- SavingsInsights
        |-- Sustainability
        \-- EnergyRecommendations
```

## Shared components

`src/components/common` contains reusable interface pieces, including
`ApiStatus`, `MetricCard`, `EnergyChart`, `LazyEnergyChart`, `PageLoading`,
`PageSuspense`, and `RouteErrorBoundary`. `PageSuspense` wraps lazy routes so
loading and route errors are handled consistently.

`src/components/marketing` contains the public-site navigation, hero,
feature, call-to-action, and footer components. `src/components/layout`
contains the dashboard `AppLayout`, `Header`, and `Sidebar`.

The private `@enerlumea/ui` workspace package exports `Button`, `Card`, and
`TextField`. Its entry point and shared stylesheet are in
`packages/ui/src`.

## Data and page boundaries

`src/api/enerlumeaApi.js` owns HTTP requests for appliances, energy records,
and contact submissions. The dashboard collection hook
(`src/hooks/useApiCollection.js`) is shared by API-backed management screens.
Calculation helpers under `src/utils` keep solar, savings, sustainability,
and recommendation logic separate from page rendering.

Dashboard overview sample metrics and chart data are illustrative; appliance
and energy-record management use the API. See [architecture](architecture.md)
for the client-to-API flow and [project overview](project-overview.md) for the
route inventory.