import { useState } from "react";
import {
  CalendarDays,
  Bell,
  Activity,
  Sun,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";

import MetricCard from "../../components/common/MetricCard";
import EnergyChart from "../../components/common/LazyEnergyChart";

import {
  weeklyEnergyData,
  monthlyEnergyData,
  yearlyEnergyData,
  dashboardMetrics,
  dashboardNotifications,
} from "../../data/dashboardData";

const chartPeriods = {
  Week: weeklyEnergyData,
  Month: monthlyEnergyData,
  Year: yearlyEnergyData,
};

const notificationIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
};

export default function Overview() {
  const [period, setPeriod] = useState("Week");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const chartData = chartPeriods[period];

  return (
    <div className="overview-page">
      <div className="overview-heading">
        <div>
          <span className="dashboard-eyebrow">ENERGY MANAGEMENT</span>
          <h1>Energy Overview</h1>
          <p>Understand your energy usage at a glance.</p>
        </div>

        <div className="overview-actions">
          <button
            className="notification-button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="Toggle notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell size={19} />
            <span className="notification-dot" />
          </button>

          <label className="date-display">
            <CalendarDays size={17} />

            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              aria-label="Select chart period"
            >
              <option value="Week">This week</option>
              <option value="Month">This month</option>
              <option value="Year">This year</option>
            </select>
          </label>
        </div>
      </div>

      {notificationsOpen && (
        <section className="notification-panel">
          <div className="notification-heading">
            <h3>Notifications</h3>
            <span>{dashboardNotifications.length} updates</span>
          </div>

          {dashboardNotifications.map((notification) => {
            const Icon = notificationIcons[notification.type];

            return (
              <div className="notification-item" key={notification.id}>
                <span className={`notification-icon ${notification.type}`}>
                  <Icon size={18} />
                </span>

                <div>
                  <strong>{notification.title}</strong>
                  <p>{notification.message}</p>
                  <small>{notification.time}</small>
                </div>
              </div>
            );
          })}
        </section>
      )}

      <div className="demo-notice">
        <Info size={17} />
        <span>
          Demonstration dashboard — all displayed energy figures are sample data.
        </span>
      </div>

      <section className="metrics-grid">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </section>

      <section className="dashboard-chart-card">
        <div className="chart-card-heading">
          <div>
            <h2>Energy Performance</h2>
            <p>Consumption compared with estimated solar generation</p>
          </div>

          <div className="period-filter">
            {["Week", "Month", "Year"].map((item) => (
              <button
                key={item}
                className={period === item ? "active" : ""}
                onClick={() => setPeriod(item)}
                aria-pressed={period === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="chart-summary">
          <div>
            <span><Activity size={15} /> Consumption</span>
            <strong>
              {chartData.reduce((total, item) => total + item.consumption, 0)} kWh
            </strong>
          </div>

          <div>
            <span><Sun size={15} /> Solar generation</span>
            <strong>
              {chartData.reduce((total, item) => total + item.solar, 0)} kWh
            </strong>
          </div>
        </div>

        <EnergyChart data={chartData} />

        <p className="chart-footnote">
          Values are illustrative and change with the selected period.
        </p>
      </section>
    </div>
  );
}
