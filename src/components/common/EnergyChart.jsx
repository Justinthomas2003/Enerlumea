import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function EnergyChart({ data }) {
  const totals = data.reduce(
    (result, item) => ({
      consumption: result.consumption + Number(item.consumption || 0),
      solar: result.solar + Number(item.solar || 0),
    }),
    { consumption: 0, solar: 0 },
  );

  return (
    <div
      className="energy-chart"
      role="img"
      aria-label={`Energy chart for ${data.length} readings. Total consumption ${totals.consumption.toFixed(2)} kilowatt hours and solar generation ${totals.solar.toFixed(2)} kilowatt hours.`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
        >
          <defs>
            <linearGradient id="consumptionFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d9b72" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#1d9b72" stopOpacity={0.02} />
            </linearGradient>

            <linearGradient id="solarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8ad43" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#e8ad43" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#edf1ed"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#58665f", fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#58665f", fontSize: 11 }}
          />

          <Tooltip
            contentStyle={{
              border: "1px solid #e8eee9",
              borderRadius: "10px",
              fontSize: "12px",
            }}
            formatter={(value, name) => [`${value} kWh`, name]}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              color: "#58665f",
              fontSize: "12px",
              paddingBottom: "20px",
            }}
          />

          <Area
            type="monotone"
            dataKey="consumption"
            name="Consumption"
            stroke="#1d9b72"
            strokeWidth={2.5}
            fill="url(#consumptionFill)"
            activeDot={{ r: 5 }}
          />

          <Area
            type="monotone"
            dataKey="solar"
            name="Solar generation"
            stroke="#e8ad43"
            strokeWidth={2.5}
            fill="url(#solarFill)"
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
