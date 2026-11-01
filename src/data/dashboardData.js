export const weeklyEnergyData = [
  { day: "Mon", consumption: 32, solar: 18 },
  { day: "Tue", consumption: 38, solar: 22 },
  { day: "Wed", consumption: 29, solar: 25 },
  { day: "Thu", consumption: 45, solar: 30 },
  { day: "Fri", consumption: 35, solar: 27 },
  { day: "Sat", consumption: 25, solar: 32 },
  { day: "Sun", consumption: 30, solar: 28 },
];

export const monthlyEnergyData = [
  { day: "Week 1", consumption: 210, solar: 145 },
  { day: "Week 2", consumption: 235, solar: 170 },
  { day: "Week 3", consumption: 190, solar: 185 },
  { day: "Week 4", consumption: 250, solar: 195 },
];

export const yearlyEnergyData = [
  { day: "Jan", consumption: 820, solar: 420 },
  { day: "Feb", consumption: 760, solar: 450 },
  { day: "Mar", consumption: 790, solar: 510 },
  { day: "Apr", consumption: 720, solar: 560 },
  { day: "May", consumption: 850, solar: 610 },
  { day: "Jun", consumption: 780, solar: 590 },
  { day: "Jul", consumption: 810, solar: 620 },
  { day: "Aug", consumption: 740, solar: 580 },
  { day: "Sep", consumption: 790, solar: 600 },
  { day: "Oct", consumption: 830, solar: 640 },
  { day: "Nov", consumption: 760, solar: 570 },
  { day: "Dec", consumption: 800, solar: 610 },
];

export const dashboardMetrics = [
  {
    title: "Total Consumption",
    value: "284",
    unit: "kWh",
    change: "This period",
    icon: "activity",
    color: "green",
  },
  {
    title: "Estimated Cost",
    value: "₹1,704",
    unit: "",
    change: "At ₹6/kWh",
    icon: "wallet",
    color: "blue",
  },
  {
    title: "Solar Generation",
    value: "182",
    unit: "kWh",
    change: "Estimated output",
    icon: "sun",
    color: "orange",
  },
  {
    title: "Potential Savings",
    value: "₹546",
    unit: "",
    change: "Illustrative estimate",
    icon: "trending",
    color: "purple",
  },
];

export const dashboardNotifications = [
  {
    id: 1,
    title: "Consumption summary available",
    message: "Your latest sample energy summary is ready to view.",
    time: "Today",
    type: "info",
  },
  {
    id: 2,
    title: "Solar opportunity",
    message: "Explore the solar estimator to understand your rooftop potential.",
    time: "Yesterday",
    type: "success",
  },
  {
    id: 3,
    title: "Appliance review",
    message: "Review appliance usage details to improve your estimates.",
    time: "2 days ago",
    type: "warning",
  },
];
