
import { useState } from "react";
import { calculateSolarEstimate } from "../../utils/solarCalculations";

export default function SolarEstimator() {
  const [monthlyUsage, setMonthlyUsage] = useState(300);
  const [peakSunHours, setPeakSunHours] = useState(5);
  const [tariff, setTariff] = useState(6);
  const [performanceRatio, setPerformanceRatio] = useState(80);
  const [installationCostPerKw, setInstallationCostPerKw] =
    useState(55000);

  const estimate = calculateSolarEstimate({
    monthlyUsage: Number(monthlyUsage),
    peakSunHours: Number(peakSunHours),
    tariff: Number(tariff),
    performanceRatio: Number(performanceRatio),
    installationCostPerKw: Number(installationCostPerKw),
  });

  const formatNumber = (value) =>
    value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const formatCurrency = (value) =>
    `₹${Math.round(value).toLocaleString("en-IN")}`;

  return (
    <section className="solar-estimator-page">
      <div className="page-heading">
        <div>
          <h2>Solar Estimator</h2>
          <p>
            Estimate your rooftop solar capacity, generation and
            potential savings.
          </p>
        </div>
      </div>

      <div className="solar-estimator-grid">
        <div className="solar-input-card">
          <h3>Solar Configuration</h3>
          <p>Adjust the values to calculate your solar potential.</p>

          <div className="solar-form-group">
            <label>Monthly Electricity Consumption (kWh)</label>
            <input
              type="number"
              min="1"
              value={monthlyUsage}
              onChange={(e) => setMonthlyUsage(e.target.value)}
            />
          </div>

          <div className="solar-form-group">
            <label>Peak Sunlight Hours per Day</label>
            <input
              type="number"
              min="1"
              max="10"
              step="0.5"
              value={peakSunHours}
              onChange={(e) => setPeakSunHours(e.target.value)}
            />
          </div>

          <div className="solar-form-group">
            <label>Electricity Tariff (₹/kWh)</label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
            />
          </div>

          <div className="solar-form-group">
            <label>System Performance (%)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={performanceRatio}
              onChange={(e) => setPerformanceRatio(e.target.value)}
            />
          </div>

          <div className="solar-form-group">
            <label>Estimated Installation Cost per kW (₹)</label>
            <input
              type="number"
              min="1"
              step="1000"
              value={installationCostPerKw}
              onChange={(e) =>
                setInstallationCostPerKw(e.target.value)
              }
            />
          </div>
        </div>

        <div className="solar-results-card">
          <h3>Your Solar Estimate</h3>
          <p>Calculated from your current configuration.</p>

          <div className="solar-primary-result">
            <span>Recommended Solar Capacity</span>
            <strong>
              {formatNumber(estimate.recommendedCapacity)} kW
            </strong>
          </div>

          <div className="solar-result-list">
            <div className="solar-result-item">
              <span>Daily Solar Generation</span>
              <strong>{formatNumber(estimate.dailyGeneration)} kWh</strong>
            </div>

            <div className="solar-result-item">
              <span>Monthly Solar Generation</span>
              <strong>{formatNumber(estimate.monthlyGeneration)} kWh</strong>
            </div>

            <div className="solar-result-item">
              <span>Potential Monthly Savings</span>
              <strong>{formatCurrency(estimate.monthlySavings)}</strong>
            </div>

            <div className="solar-result-item">
              <span>Estimated Installation Cost</span>
              <strong>{formatCurrency(estimate.installationCost)}</strong>
            </div>

            <div className="solar-result-item">
              <span>Estimated Payback Period</span>
              <strong>{formatNumber(estimate.paybackYears)} years</strong>
            </div>
          </div>

          <p className="solar-disclaimer">
            These are illustrative estimates, not a guaranteed solar
            generation or savings forecast. Actual results depend on
            location, roof orientation, shading, system design,
            electricity tariffs and installation costs.
          </p>
        </div>
      </div>
    </section>
  );
}
