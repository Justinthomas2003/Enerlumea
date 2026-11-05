export function calculateSolarEstimate({
  monthlyUsage,
  peakSunHours,
  tariff,
  performanceRatio,
  installationCostPerKw,
}) {
  const inputs = {
    monthlyUsage,
    peakSunHours,
    tariff,
    performanceRatio,
    installationCostPerKw,
  };

  if (Object.values(inputs).some((value) => !Number.isFinite(value))) {
    throw new TypeError("Solar estimate inputs must be finite numbers.");
  }

  if (monthlyUsage < 0 || tariff < 0 || installationCostPerKw < 0) {
    throw new RangeError("Usage, tariff, and installation cost cannot be negative.");
  }

  if (peakSunHours <= 0) {
    throw new RangeError("Peak sunlight hours must be greater than zero.");
  }

  if (performanceRatio <= 0 || performanceRatio > 100) {
    throw new RangeError("Performance ratio must be greater than zero and at most 100.");
  }

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
