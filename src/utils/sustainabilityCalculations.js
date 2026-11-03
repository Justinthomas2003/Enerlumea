export function calculateSustainabilityMetrics(
  records,
  gridEmissionFactor = 0.7
) {
  const dailyData = {};

  records.forEach((record) => {
    if (!dailyData[record.date]) {
      dailyData[record.date] = {
        consumption: 0,
        generation: 0,
      };
    }

    if (record.type === "Consumption") {
      dailyData[record.date].consumption += Number(record.energy);
    }

    if (record.type === "Generation") {
      dailyData[record.date].generation += Number(record.energy);
    }
  });

  const days = Object.values(dailyData);

  const totalConsumption = days.reduce(
    (sum, day) => sum + day.consumption,
    0
  );

  const totalGeneration = days.reduce(
    (sum, day) => sum + day.generation,
    0
  );

  const usableSolarEnergy = days.reduce(
    (sum, day) =>
      sum + Math.min(day.consumption, day.generation),
    0
  );

  const renewableContribution =
    totalConsumption > 0
      ? (usableSolarEnergy / totalConsumption) * 100
      : 0;

  const co2Avoided =
    usableSolarEnergy * gridEmissionFactor;

  return {
    totalConsumption,
    totalGeneration,
    usableSolarEnergy,
    renewableContribution,
    co2Avoided,
    gridEmissionFactor,
  };
}
