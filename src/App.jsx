import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import Navbar from "./components/marketing/Navbar";
import Footer from "./components/marketing/Footer";

import Home from "./pages/marketing/Home";
import About from "./pages/marketing/About";
import Features from "./pages/marketing/Features";
import Contact from "./pages/marketing/Contact";

import Overview from "./pages/dashboard/Overview";
import Analytics from "./pages/dashboard/Analytics";
import Appliances from "./pages/dashboard/Appliances";
import EnergyRecords from "./pages/dashboard/EnergyRecords";
import SolarEstimator from "./pages/dashboard/SolarEstimator";
import Settings from "./pages/dashboard/Settings";

function MarketingLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="contact" element={<Contact />} />
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

      <Route path="/dashboard" element={<AppLayout />}>
        <Route index element={<Overview />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="appliances" element={<Appliances />} />
        <Route path="energy-records" element={<EnergyRecords />} />
        <Route path="solar-estimator" element={<SolarEstimator />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
