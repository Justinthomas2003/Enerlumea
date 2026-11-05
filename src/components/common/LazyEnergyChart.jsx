import { lazy, Suspense } from "react";
import PageLoading from "./PageLoading";

const EnergyChart = lazy(() => import("./EnergyChart"));

export default function LazyEnergyChart(props) {
  return (
    <Suspense
      fallback={
        <PageLoading
          className="energy-chart chart-loading"
          label="Loading energy chart…"
        />
      }
    >
      <EnergyChart {...props} />
    </Suspense>
  );
}
