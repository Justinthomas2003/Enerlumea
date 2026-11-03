export function calculateSolarEstimate({
  monthlyUsage,
  peakSunHours,
  tariff,
  performanceRatio,
  installationCostPerKw,
}) {
  const dailyUsage = monthlyUsage / 30;

  // Estimated solar capacity required to meet average daily usage.
  const recommendedCapacity =
    dailyUsage / (peakSunHours * (performanceRatio / 100));

  // Estimated energy generation.
  const dailyGeneration =
    recommendedCapacity * peakSunHours * (performanceRatio / 100);

  const monthlyGeneration = dailyGeneration * 30;

  // Savings are capped at the user's estimated monthly consumption.
  const usableSolarEnergy = Math.min(monthlyGeneration, monthlyUsage);

  const monthlySavings = usableSolarEnergy * tariff;

  const installationCost =
    recommendedCapacity * installationCostPerKw;

  const annualSavings = monthlySavings * 12;

  const paybackYears =
    annualSavings > 0 ? installationCost / annualSavings : 0;

  return {
    recommendedCapacity,
    dailyGeneration,
    monthlyGeneration,
    monthlySavings,
    installationCost,
    paybackYears,
  };
}
