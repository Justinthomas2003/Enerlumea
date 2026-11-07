# Project overview

Enerlumea is a household energy management web application. Its public
marketing pages introduce the service, while its dashboard provides
appliance and energy-record management and energy-related estimates and
insights.

## Technology

- **Frontend:** React, React Router, and Vite.
- **Reusable components:** private `@enerlumea/ui` npm workspace package.
- **Backend:** Java 21 and Spring Boot REST API.
- **Local persistence:** Spring Data JPA with file-backed H2.
- **Testing:** Vitest and Testing Library for frontend tests, Playwright for
  browser tests, and Maven/Spring Boot tests for the API.

## User-facing routes

Marketing pages:

- `/` - home
- `/about` - about
- `/features` - product features
- `/contact` - contact form

Dashboard pages:

- `/dashboard` - overview
- `/dashboard/analytics` - energy charts
- `/dashboard/appliances` - appliance records
- `/dashboard/energy-records` - energy readings
- `/dashboard/solar-estimator` - solar estimate
- `/dashboard/settings` - dashboard settings
- `/dashboard/savings-insights` - savings calculations
- `/dashboard/sustainability` - sustainability information
- `/dashboard/recommendations` - energy recommendations

## Data and limitations

Appliances and energy records are managed through the Spring Boot API.
Contact messages are validated and stored by the API; no email is sent.
Overview sample metrics and chart data are illustrative. The local API seeds
demonstration appliance and energy data when the database is empty.

Authentication is not implemented. Theme preference is stored in the
current browser and is not synchronized across devices. The app should be
treated as a development/demo application until production authentication,
database, CORS, HTTPS, and domain configuration are in place.

## Further reading

- [Setup guide](setup-guide.md)
- [Architecture overview](architecture.md)
- [Component hierarchy](component-hierarchy.md)
- [Design decisions](design-decisions.md)
- [Mobile responsiveness report](mobile-responsiveness.md)
- [Accessibility audit](accessibility-audit.md)
- [Cross-browser test report](cross-browser-testing.md)