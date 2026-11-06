import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/marketing/Navbar";
import Footer from "./components/marketing/Footer";
import PageSuspense from "./components/common/PageSuspense";
import Home from "./pages/marketing/Home";

const AppLayout = lazy(() => import("./components/layout/AppLayout"));
const About = lazy(() => import("./pages/marketing/About"));
const Features = lazy(() => import("./pages/marketing/Features"));
const Contact = lazy(() => import("./pages/marketing/Contact"));

const Overview = lazy(() => import("./pages/dashboard/Overview"));
const Analytics = lazy(() => import("./pages/dashboard/Analytics"));
const Appliances = lazy(() => import("./pages/dashboard/Appliances"));
const EnergyRecords = lazy(() => import("./pages/dashboard/EnergyRecords"));
const SolarEstimator = lazy(() => import("./pages/dashboard/SolarEstimator"));
const Sustainability = lazy(() => import("./pages/dashboard/Sustainability"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const SavingsInsights = lazy(() => import("./pages/dashboard/SavingsInsights"));
const EnergyRecommendations = lazy(
  () => import("./pages/dashboard/EnergyRecommendations"),
);

function MarketingLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<PageSuspense><About /></PageSuspense>} />
          <Route path="features" element={<PageSuspense><Features /></PageSuspense>} />
          <Route path="contact" element={<PageSuspense><Contact /></PageSuspense>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<MarketingLayout />} />

      <Route path="/dashboard" element={<PageSuspense label="Loading dashboard…"><AppLayout /></PageSuspense>}>
        <Route index element={<PageSuspense><Overview /></PageSuspense>} />
        <Route path="analytics" element={<PageSuspense><Analytics /></PageSuspense>} />
        <Route path="appliances" element={<PageSuspense><Appliances /></PageSuspense>} />
        <Route path="energy-records" element={<PageSuspense><EnergyRecords /></PageSuspense>} />
        <Route path="solar-estimator" element={<PageSuspense><SolarEstimator /></PageSuspense>} />
        <Route path="settings" element={<PageSuspense><Settings /></PageSuspense>} />
        <Route path="savings-insights" element={<PageSuspense><SavingsInsights /></PageSuspense>} />
        <Route path="sustainability" element={<PageSuspense><Sustainability /></PageSuspense>} />
        <Route path="recommendations" element={<PageSuspense><EnergyRecommendations /></PageSuspense>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
