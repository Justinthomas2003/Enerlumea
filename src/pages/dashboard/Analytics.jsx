
import { useMemo, useState } from "react";
import {
  Activity,
  Sun,
  Zap,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

import EnergyChart from "../../components/common/LazyEnergyChart";
import ApiStatus from "../../components/common/ApiStatus";
import useApiCollection from "../../hooks/useApiCollection";
import { listEnergyRecords } from "../../api/enerlumeaApi";

function formatDate(date) {
  if (!date) return "—";

  const [year, month, day] = date.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day))
    .toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
}

export default function Analytics() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const {
    items: records,
    isLoading,
    error,
    reload,
  } = useApiCollection(listEnergyRecords);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const afterStart = !startDate || record.date >= startDate;
      const beforeEnd = !endDate || record.date <= endDate;

      return afterStart && beforeEnd;
    });
  }, [records, startDate, endDate]);

  const analytics = useMemo(() => {
    const dailyData = {};

    filteredRecords.forEach((record) => {
      if (!dailyData[record.date]) {
        dailyData[record.date] = {
          date: record.date,
          consumption: null,
          solar: null,
        };
      }

      const key =
        record.type === "Consumption" ? "consumption" : "solar";

      dailyData[record.date][key] =
        (dailyData[record.date][key] ?? 0) + Number(record.energy);
    });

    const chartData = Object.values(dailyData)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((item) => ({
        ...item,
        day: formatDate(item.date).replace(/, \d{4}$/, ""),
      }));

    const consumptionRecords = filteredRecords.filter(
      (record) => record.type === "Consumption"
    );

    const generationRecords = filteredRecords.filter(
      (record) => record.type === "Generation"
    );

    const totalConsumption = consumptionRecords.reduce(
      (sum, record) => sum + Number(record.energy),
      0
    );

    const totalGeneration = generationRecords.reduce(
      (sum, record) => sum + Number(record.energy),
      0
    );

    const highestConsumption = chartData
      .filter((item) => item.consumption !== null)
      .reduce(
        (highest, item) =>
          !highest || item.consumption > highest.consumption
            ? item
            : highest,
        null
      );

    const highestGeneration = chartData
      .filter((item) => item.solar !== null)
      .reduce(
        (highest, item) =>
          !highest || item.solar > highest.solar ? item : highest,
        null
      );

    return {
      chartData,
      totalConsumption,
      totalGeneration,
      netEnergy: totalGeneration - totalConsumption,
      recordCount: filteredRecords.length,
      consumptionCount: consumptionRecords.length,
      generationCount: generationRecords.length,
      highestConsumption,
      highestGeneration,
    };
  }, [filteredRecords]);

  const hasRecords = analytics.recordCount > 0;

  const generationCoverage =
    analytics.totalConsumption > 0
      ? (analytics.totalGeneration / analytics.totalConsumption) * 100
      : 0;

  function clearDateFilters() {
    setStartDate("");
    setEndDate("");
  }

  return (
    <section className="analytics-page">
      <header className="analytics-header">
        <div>
          <span className="dashboard-eyebrow">
            ENERGY MANAGEMENT
          </span>

          <h1>Energy Analytics</h1>

          <p>
            Understand your consumption, solar generation,
            and overall energy balance.
          </p>
        </div>

        <div className="analytics-date-filter">
          <CalendarDays size={18} />

          <label>
            <span>From</span>
            <input
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(event) => setStartDate(event.target.value)}
              aria-label="Filter analytics from date"
            />
          </label>

          <label>
            <span>To</span>
            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => setEndDate(event.target.value)}
              aria-label="Filter analytics to date"
            />
          </label>

          <button type="button" onClick={clearDateFilters}>
            Clear
          </button>
        </div>
      </header>

      <ApiStatus
        loading={isLoading}
        error={error}
        onRetry={reload}
        resource="energy analytics"
      />

      {!isLoading && !error && !hasRecords ? (
        <section className="analytics-empty-state">
          <Activity size={35} />
          <h2>No energy records found</h2>
          <p>
            Try changing the date range to view available analytics.
          </p>
          <button type="button" onClick={clearDateFilters}>
            Clear date filters
          </button>
        </section>
      ) : !isLoading && !error ? (
        <>
          <section className="analytics-metrics">
            <article className="analytics-metric-card">
              <div className="analytics-metric-icon consumption">
                <Zap size={21} />
              </div>
              <span>Total Consumption</span>
              <h2>{analytics.totalConsumption.toFixed(2)} kWh</h2>
              <p>{analytics.consumptionCount} consumption records</p>
            </article>

            <article className="analytics-metric-card">
              <div className="analytics-metric-icon generation">
                <Sun size={21} />
              </div>
              <span>Solar Generation</span>
              <h2>{analytics.totalGeneration.toFixed(2)} kWh</h2>
              <p>{analytics.generationCount} generation records</p>
            </article>

            <article className="analytics-metric-card">
              <div className="analytics-metric-icon balance">
                <Activity size={21} />
              </div>
              <span>Net Energy Balance</span>
              <h2>
                {analytics.netEnergy > 0 ? "+" : ""}
                {analytics.netEnergy.toFixed(2)} kWh
              </h2>
              <p>
                {analytics.netEnergy >= 0
                  ? "Generation meets or exceeds consumption"
                  : "Consumption exceeds generation"}
              </p>
            </article>

            <article className="analytics-metric-card">
              <div className="analytics-metric-icon coverage">
                <TrendingUp size={21} />
              </div>
              <span>Generation Coverage</span>
              <h2>{generationCoverage.toFixed(1)}%</h2>
              <p>Generation compared with consumption</p>
            </article>
          </section>

          <section className="analytics-chart-card">
            <div className="analytics-section-heading">
              <div>
                <h2>Energy Performance Trends</h2>
                <p>
                  Compare recorded consumption with solar generation.
                </p>
              </div>

              <span className="analytics-record-count">
                {analytics.recordCount} records
              </span>
            </div>

            <div className="analytics-chart-wrapper">
              <EnergyChart data={analytics.chartData} />
            </div>

            <p className="analytics-chart-note">
              Missing readings are shown as gaps, not assumed to be zero.
            </p>
          </section>

          <section className="analytics-insights">
            <div className="analytics-section-heading">
              <div>
                <h2>Energy Insights</h2>
                <p>Highlights calculated from the selected records.</p>
              </div>
            </div>

            <div className="analytics-insight-grid">
              <article className="analytics-insight-card">
                <div className="analytics-insight-icon consumption">
                  <Zap size={20} />
                </div>

                <div>
                  <span>Highest consumption day</span>
                  {analytics.highestConsumption ? (
                    <>
                      <h3>
                        {analytics.highestConsumption.consumption.toFixed(2)} kWh
                      </h3>
                      <p>{formatDate(analytics.highestConsumption.date)}</p>
                    </>
                  ) : (
                    <p>No consumption records available.</p>
                  )}
                </div>
              </article>

              <article className="analytics-insight-card">
                <div className="analytics-insight-icon generation">
                  <Sun size={20} />
                </div>

                <div>
                  <span>Highest generation day</span>
                  {analytics.highestGeneration ? (
                    <>
                      <h3>
                        {analytics.highestGeneration.solar.toFixed(2)} kWh
                      </h3>
                      <p>{formatDate(analytics.highestGeneration.date)}</p>
                    </>
                  ) : (
                    <p>No generation records available.</p>
                  )}
                </div>
              </article>
            </div>
          </section>
        </>
      ) : null}

      <p className="analytics-disclaimer">
        Analytics are calculated from energy records saved through the API.
      </p>
    </section>
  );
}
