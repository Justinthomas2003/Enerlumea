import { Suspense } from "react";
import PageLoading from "./PageLoading";
import RouteErrorBoundary from "./RouteErrorBoundary";

export default function PageSuspense({ children, label }) {
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<PageLoading label={label} />}>
        {children}
      </Suspense>
    </RouteErrorBoundary>
  );
}
