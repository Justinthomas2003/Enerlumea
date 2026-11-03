import { useState } from "react";
import {
  Wallet,
  Activity,
  Sun,
  TrendingDown,
  Info,
} from "lucide-react";

import { initialEnergyRecords } from "../../data/energyRecords";
import { calculateSavingsInsights } from "../../utils/savingsCalculations";

export default function SavingsInsights() {
  const [tariff, setTariff] = useState(6);

  const validTariff = Number(tariff);
  const safeTariff =
    Number.isFinite(validTariff) && validTariff > 0
      ? validTariff
      : 0;

  const insights = calculateSavingsInsights(
    initialEnergyRecords,
    safeTariff
  );

  const formatNumber = (value) =>
    value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const formatCurrency = (value) =>
    `₹${Math.round(value).toLocaleString("en-IN")}`;

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const metrics = [
    {
      title: "Recorded Consumption",
      value: `${formatNumber(insights.totalConsumption)} kWh`,
      description: "Total recorded electricity usage",
      icon: Activity,
    },
    {
      title: "Solar Generation",
      value: `${formatNumber(insights.totalGeneration)} kWh`,
      description: "Total recorded solar generation",
      icon: Sun,
    },
    {
      title: "Estimated Savings",
      value: formatCurrency(insights.estimatedSavings),
      description: "Estimated bill reduction",
      icon: TrendingDown,
    },
    {
      title: "Estimated Grid Cost",
      value: formatCurrency(insights.estimatedGridCost),
      description: "Cost after usable solar generation",
      icon: Wallet,
    },
  ];

  return (
    <section className="savings-page">
      <div className="overview-heading">
        <div>
          <span className="dashboard-eyebrow">
            ENERGY INTELLIGENCE
          </span>
          <h1>Savings Insights</h1>
          <p>
            Understand your recorded energy usage and estimated
            electricity savings.
          </p>
        </div>
      </div>

      <div className="demo-notice">
        <Info size={17} />
        <span>
          Insights are calculated from the sample energy records
          currently included in this demonstration.
        </span>
      </div>

      <div className="savings-tariff-card">
        <div>
          <h3>Electricity Tariff</h3>
          <p>Adjust the rate used in the savings calculation.</p>
        </div>

        <label>
          <span>₹ per kWh</span>
          <input
            type="number"
            min="0.1"
            step="0.5"
            value={tariff}
            onChange={(event) => setTariff(event.target.value)}
          />
        </label>
      </div>

      <section className="metrics-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article className="savings-metric-card" key={metric.title}>
              <div className="savings-metric-icon">
                <Icon size={20} />
              </div>

              <span>{metric.title}</span>
              <strong>{metric.value}</strong>
              <small>{metric.description}</small>
            </article>
          );
        })}
      </section>

      <section className="savings-detail-grid">
        <article className="savings-panel">
          <h2>Solar Contribution</h2>
          <p>
            Percentage of recorded consumption offset by usable
            solar generation on the same day.
          </p>

          <div className="savings-progress-track">
            <div
              className="savings-progress-fill"
              style={{
                width: `${Math.min(insights.solarContribution, 100)}%`,
              }}
            />
          </div>

          <strong className="savings-percentage">
            {formatNumber(insights.solarContribution)}%
          </strong>

          <div className="savings-breakdown">
            <div>
              <span>Usable solar energy</span>
              <strong>{formatNumber(insights.usableSolarEnergy)} kWh</strong>
            </div>

            <div>
              <span>Consumption not offset by solar</span>
              <strong>
                {formatNumber(
                  insights.totalConsumption - insights.usableSolarEnergy
                )}{" "}
                kWh
              </strong>
            </div>

            <div>
              <span>Estimated cost without solar</span>
              <strong>
                {formatCurrency(insights.estimatedCostWithoutSolar)}
              </strong>
            </div>
          </div>
        </article>

        <article className="savings-panel">
          <h2>Daily Energy Comparison</h2>
          <p>Recorded consumption and solar generation by date.</p>

          <div className="savings-legend">
            <span>
              <i className="consumption-dot" />
              Consumption
            </span>
            <span>
              <i className="generation-dot" />
              Generation
            </span>
          </div>

          <div className="daily-savings-list">
            {insights.days.map((day) => {
              const maxValue = Math.max(
                day.consumption,
                day.generation,
                1
              );

              return (
                <div className="daily-savings-item" key={day.date}>
                  <strong>{formatDate(day.date)}</strong>

                  <div className="daily-bars">
                    <div className="daily-bar-row">
                      <div className="daily-bar-track">
                        <div
                          className="consumption-bar"
                          style={{
                            width: `${(day.consumption / maxValue) * 100}%`,
                          }}
                        />
                      </div>
                      <span>{formatNumber(day.consumption)}</span>
                    </div>

                    <div className="daily-bar-row">
                      <div className="daily-bar-track">
                        <div
                          className="generation-bar"
                          style={{
                            width: `${(day.generation / maxValue) * 100}%`,
                          }}
                        />
                      </div>
                      <span>{formatNumber(day.generation)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <p className="savings-disclaimer">
        Savings are illustrative estimates. This calculation assumes
        usable solar generation offsets electricity consumption on
        the same day at the entered tariff. It does not account for
        fixed charges, export credits, net-metering rules or time-based
        electricity tariffs.
      </p>
    </section>
  );
}
