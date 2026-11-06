# @enerlumea/ui

The Enerlumea React component library is a private npm workspace package. It
provides small, accessible building blocks for use by this app and other
packages in the same repository.

## Components

- `Button`: native button with primary/secondary variants and small/medium/large sizes.
- `Card`: surface container; use `as` to select an appropriate semantic element.
- `TextField`: labeled input with optional hint and validation error associations.

Import the package stylesheet once in the application entry:

```js
import "@enerlumea/ui/style.css";
```

Then import components as needed:

```jsx
import { Button, Card, TextField } from "@enerlumea/ui";
```

The root `npm run dev` and `npm run build` commands build the library first.
Run `npm run build:ui` to build it alone. The package is private and is not
configured for publication to npm.
