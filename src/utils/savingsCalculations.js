export function calculateSavingsInsights(records, tariff = 6) {
  const dailyData = {};

  records.forEach((record) => {
    const date = record.date;

    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        consumption: 0,
        generation: 0,
      };
    }

    if (record.type === "Consumption") {
      dailyData[date].consumption += Number(record.energy);
    }

    if (record.type === "Generation") {
      dailyData[date].generation += Number(record.energy);
    }
  });

  const days = Object.values(dailyData).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const totalConsumption = days.reduce(
    (total, day) => total + day.consumption,
    0
  );

  const totalGeneration = days.reduce(
    (total, day) => total + day.generation,
    0
  );

  // Only generation that can offset consumption on the same
  // day is counted as estimated bill savings.
  const usableSolarEnergy = days.reduce(
    (total, day) =>
      total + Math.min(day.consumption, day.generation),
    0
  );

  const estimatedCostWithoutSolar = totalConsumption * tariff;

  const estimatedSavings = usableSolarEnergy * tariff;

  const estimatedGridCost =
    estimatedCostWithoutSolar - estimatedSavings;

  const solarContribution =
    totalConsumption > 0
      ? (usableSolarEnergy / totalConsumption) * 100
      : 0;

  return {
    days,
    totalConsumption,
    totalGeneration,
    usableSolarEnergy,
    estimatedCostWithoutSolar,
    estimatedSavings,
    estimatedGridCost,
    solarContribution,
  };
}
