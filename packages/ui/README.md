# `@enerlumea/ui`

`@enerlumea/ui` is a private npm workspace package containing reusable React
components for this application and other packages in the repository.

## Components

- **`Button`** — a native button with primary and secondary variants and
  small, medium, and large sizes.
- **`Card`** — a surface container with an `as` prop for selecting an
  appropriate semantic element.
- **`TextField`** — a labeled input with optional hint text and validation
  error associations.

Import the package stylesheet once from the application entry point:

```js
import "@enerlumea/ui/style.css";
```

Import components where needed:

```jsx
import { Button, Card, TextField } from "@enerlumea/ui";
```

From the repository root, `npm run dev` and `npm run build` build the library
before starting or building the application. To build the library by itself,
run:

```powershell
npm run build:ui
```

The package is private and is not configured for publication to npm.
