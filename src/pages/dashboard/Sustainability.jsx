import { useState } from "react";
import {
  Leaf,
  Sun,
  Cloud,
  Recycle,
  Info,
} from "lucide-react";

import ApiStatus from "../../components/common/ApiStatus";
import useApiCollection from "../../hooks/useApiCollection";
import { listEnergyRecords } from "../../api/enerlumeaApi";
import { calculateSustainabilityMetrics } from "../../utils/sustainabilityCalculations";

export default function Sustainability() {
  const [emissionFactor, setEmissionFactor] = useState(0.7);
  const {
    items: records,
    isLoading,
    error,
    reload,
  } = useApiCollection(listEnergyRecords);

  const factor = Number(emissionFactor);

  const safeFactor =
    Number.isFinite(factor) && factor >= 0 ? factor : 0;

  const metrics = calculateSustainabilityMetrics(
    records,
    safeFactor
  );

  const formatNumber = (value) =>
    value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const cards = [
    {
      title: "CO₂ Emissions Avoided",
      value: `${formatNumber(metrics.co2Avoided)} kg`,
      description: "Estimated emissions avoided",
      icon: Cloud,
    },
    {
      title: "Renewable Contribution",
      value: `${formatNumber(metrics.renewableContribution)}%`,
      description: "Consumption offset by solar",
      icon: Leaf,
    },
    {
      title: "Solar Energy Generated",
      value: `${formatNumber(metrics.totalGeneration)} kWh`,
      description: "Total recorded generation",
      icon: Sun,
    },
    {
      title: "Usable Solar Energy",
      value: `${formatNumber(metrics.usableSolarEnergy)} kWh`,
      description: "Solar energy matched to consumption",
      icon: Recycle,
    },
  ];

  return (
    <section className="sustainability-page">
      <div className="overview-heading">
        <div>
          <span className="dashboard-eyebrow">
            ENERGY INTELLIGENCE
          </span>
          <h1>Sustainability Metrics</h1>
          <p>
            Understand the estimated environmental contribution
            of your recorded solar energy.
          </p>
        </div>
      </div>

      <ApiStatus
        loading={isLoading}
        error={error}
        onRetry={reload}
        resource="energy records"
      />

      <div className="demo-notice">
        <Info size={17} />
        <span>
          Environmental metrics are estimates based on saved energy records.
        </span>
      </div>

      <div className="sustainability-factor-card">
        <div>
          <h3>Grid Emissions Factor</h3>
          <p>
            Assumed kilograms of CO₂ per kWh of grid electricity.
          </p>
        </div>

        <label>
          <span>kg CO₂ / kWh</span>
          <input
            type="number"
            min="0"
            step="0.05"
            value={emissionFactor}
            onChange={(event) =>
              setEmissionFactor(event.target.value)
            }
          />
        </label>
      </div>

      <section className="metrics-grid">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              className="sustainability-metric-card"
              key={card.title}
            >
              <div className="sustainability-icon">
                <Icon size={21} />
              </div>

              <span>{card.title}</span>
              <strong>{card.value}</strong>
              <small>{card.description}</small>
            </article>
          );
        })}
      </section>

      <section className="sustainability-impact-card">
        <div>
          <span className="dashboard-eyebrow">
            ENVIRONMENTAL IMPACT
          </span>

          <h2>Your Solar Contribution</h2>

          <p>
            Based on the recorded data, solar generation offset
            approximately{" "}
            <strong>
              {formatNumber(metrics.renewableContribution)}%
            </strong>{" "}
            of recorded electricity consumption during the
            available period.
          </p>
        </div>

        <div className="sustainability-progress">
          <div className="sustainability-progress-track">
            <div
              className="sustainability-progress-fill"
              role="progressbar"
              aria-label="Renewable contribution to recorded consumption"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.min(metrics.renewableContribution, 100)}
              style={{
                width: `${Math.min(
                  metrics.renewableContribution,
                  100
                )}%`,
              }}
            />
          </div>

          <strong>
            {formatNumber(metrics.renewableContribution)}%
          </strong>
        </div>
      </section>

      <div className="sustainability-summary">
        <h3>Calculation Summary</h3>

        <div>
          <span>Total recorded consumption</span>
          <strong>
            {formatNumber(metrics.totalConsumption)} kWh
          </strong>
        </div>

        <div>
          <span>Total recorded solar generation</span>
          <strong>
            {formatNumber(metrics.totalGeneration)} kWh
          </strong>
        </div>

        <div>
          <span>Usable solar energy</span>
          <strong>
            {formatNumber(metrics.usableSolarEnergy)} kWh
          </strong>
        </div>

        <div>
          <span>Applied emissions factor</span>
          <strong>
            {formatNumber(metrics.gridEmissionFactor)} kg CO₂/kWh
          </strong>
        </div>

        <div>
          <span>Estimated CO₂ avoided</span>
          <strong>
            {formatNumber(metrics.co2Avoided)} kg
          </strong>
        </div>
      </div>

      <p className="sustainability-disclaimer">
        CO₂ avoidance is an estimate calculated by multiplying
        usable solar energy by the selected emissions factor.
        Actual environmental impact depends on the electricity
        grid, solar system lifecycle, location and other factors.
        This is not verified carbon accounting.
      </p>
    </section>
  );
}
