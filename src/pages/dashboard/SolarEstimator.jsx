
import { useState } from "react";
import { calculateSolarEstimate } from "../../utils/solarCalculations";

const initialValues = {
  monthlyUsage: "300",
  peakSunHours: "5",
  tariff: "6",
  performanceRatio: "80",
  installationCostPerKw: "55000",
};

const validationRules = {
  monthlyUsage: {
    label: "Monthly consumption",
    min: 1,
  },
  peakSunHours: {
    label: "Peak sunlight hours",
    min: 1,
    max: 10,
  },
  tariff: {
    label: "Electricity tariff",
    min: 0.1,
  },
  performanceRatio: {
    label: "System performance",
    min: 1,
    max: 100,
  },
  installationCostPerKw: {
    label: "Installation cost",
    min: 1,
  },
};

function getInputErrors(values) {
  const newErrors = {};

  Object.entries(validationRules).forEach(([name, rule]) => {
    const value = Number(values[name]);

    if (values[name].trim() === "" || !Number.isFinite(value)) {
      newErrors[name] = `${rule.label} is required.`;
    } else if (value < rule.min) {
      newErrors[name] = `Minimum value is ${rule.min}.`;
    } else if (rule.max !== undefined && value > rule.max) {
      newErrors[name] = `Maximum value is ${rule.max}.`;
    }
  });

  return newErrors;
}

export default function SolarEstimator() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = getInputErrors(values);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const estimate = Object.keys(getInputErrors(values)).length > 0
    ? null
    : calculateSolarEstimate({
        monthlyUsage: Number(values.monthlyUsage),
        peakSunHours: Number(values.peakSunHours),
        tariff: Number(values.tariff),
        performanceRatio: Number(values.performanceRatio),
        installationCostPerKw: Number(values.installationCostPerKw),
      });

  const formatNumber = (value) =>
    value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const formatCurrency = (value) =>
    `₹${Math.round(value).toLocaleString("en-IN")}`;

  const fields = [
    {
      name: "monthlyUsage",
      label: "Monthly Electricity Consumption (kWh)",
      min: 1,
      step: "any",
    },
    {
      name: "peakSunHours",
      label: "Peak Sunlight Hours per Day",
      min: 1,
      max: 10,
      step: 0.5,
    },
    {
      name: "tariff",
      label: "Electricity Tariff (₹/kWh)",
      min: 0.1,
      step: 0.5,
    },
    {
      name: "performanceRatio",
      label: "System Performance (%)",
      min: 1,
      max: 100,
      step: "any",
    },
    {
      name: "installationCostPerKw",
      label: "Estimated Installation Cost per kW (₹)",
      min: 1,
      step: 1000,
    },
  ];

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

          <form onSubmit={handleSubmit} noValidate>
            {fields.map((field) => (
              <div className="solar-form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.name]}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={
                    errors[field.name] ? `${field.name}-error` : undefined
                  }
                />
                {errors[field.name] && (
                  <span
                    className="solar-error"
                    id={`${field.name}-error`}
                    role="alert"
                  >
                    {errors[field.name]}
                  </span>
                )}
              </div>
            ))}

            <div className="solar-actions">
              <button type="submit" className="solar-calculate-button">
                Validate Estimate
              </button>
              <button
                type="button"
                className="solar-reset-button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="solar-results-card">
          <h3>Your Solar Estimate</h3>
          <p>Calculated from your current configuration.</p>

          {estimate ? (
            <>
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
            </>
          ) : (
            <p role="status">
              Please correct the input values to view your estimate.
            </p>
          )}

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
