import {
  Activity,
  Wallet,
  Sun,
  TrendingUp,
} from "lucide-react";

const icons = {
  activity: Activity,
  wallet: Wallet,
  sun: Sun,
  trending: TrendingUp,
};

export default function MetricCard({ metric }) {
  const Icon = icons[metric.icon] || Activity;

  return (
    <article className="metric-card">
      <div className="metric-card-top">
        <span className={`metric-icon ${metric.color}`}>
          <Icon size={21} />
        </span>
        <span className="metric-period">{metric.change}</span>
      </div>

      <p className="metric-title">{metric.title}</p>

      <h3 className="metric-value">
        {metric.value}
        {metric.unit && <small> {metric.unit}</small>}
      </h3>
    </article>
  );
}
