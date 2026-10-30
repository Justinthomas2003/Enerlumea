
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Overview from "./pages/Overview";
import Analytics from "./pages/Analytics";
import Appliances from "./pages/Appliances";
import SolarEstimator from "./pages/SolarEstimator";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/appliances" element={<Appliances />} />
        <Route path="/solar-estimator" element={<SolarEstimator />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
