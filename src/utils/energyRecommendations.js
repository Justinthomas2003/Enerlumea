export function generateEnergyRecommendations(appliances, energyRecords) {
  const recommendations = [];

  // Rule 1: Identify appliances with high daily energy consumption.
  appliances
    .filter((appliance) => appliance.status === "Active")
    .forEach((appliance) => {
      const dailyEnergy =
        (Number(appliance.power) * Number(appliance.hoursPerDay)) / 1000;

      if (dailyEnergy >= 5) {
        recommendations.push({
          id: `high-usage-${appliance.id}`,
          category: "Appliance Usage",
          priority: "High",
          title: `Review ${appliance.name} usage`,
          description: `${appliance.name} is estimated to consume ${dailyEnergy.toFixed(2)} kWh per day.`,
          reason: `Its rated power is ${appliance.power} W and its recorded usage is ${appliance.hoursPerDay} hours per day.`,
          suggestion:
            "Review its operating schedule and consider reducing unnecessary usage where practical.",
          energyUsage: dailyEnergy,
        });
      }
    });

  // Rule 2: Identify appliances operating for long hours.
  appliances
    .filter(
      (appliance) =>
        appliance.status === "Active" &&
        appliance.hoursPerDay >= 5 &&
        appliance.category === "Cooling"
    )
    .forEach((appliance) => {
      recommendations.push({
        id: `long-hours-${appliance.id}`,
        category: "Usage Schedule",
        priority: "Medium",
        title: `Review ${appliance.name} operating hours`,
        description: `${appliance.name} is recorded as operating ${appliance.hoursPerDay} hours per day.`,
        reason: "Long operating hours can increase daily electricity consumption.",
        suggestion:
          "Review the operating schedule and avoid unnecessary operation.",
      });
    });

  // Rule 3: Compare daily consumption with solar generation.
  const dailyRecords = {};

  energyRecords.forEach((record) => {
    if (!dailyRecords[record.date]) {
      dailyRecords[record.date] = {
        consumption: 0,
        generation: 0,
      };
    }

    if (record.type === "Consumption") {
      dailyRecords[record.date].consumption += Number(record.energy);
    }

    if (record.type === "Generation") {
      dailyRecords[record.date].generation += Number(record.energy);
    }
  });

  Object.entries(dailyRecords).forEach(([date, values]) => {
    if (values.consumption > values.generation) {
      const difference = values.consumption - values.generation;

      recommendations.push({
        id: `solar-gap-${date}`,
        category: "Solar Utilization",
        priority: "Medium",
        title: "Review daily solar energy coverage",
        description: `Recorded consumption exceeded solar generation by ${difference.toFixed(2)} kWh on ${date}.`,
        reason: `Consumption was ${values.consumption.toFixed(2)} kWh, while solar generation was ${values.generation.toFixed(2)} kWh.`,
        suggestion:
          "Where practical, consider scheduling suitable electricity usage during periods of solar generation.",
        energyGap: difference,
      });
    }
  });

  // Rule 4: Compare total recorded consumption and generation.
  const totalConsumption = energyRecords
    .filter((record) => record.type === "Consumption")
    .reduce((sum, record) => sum + Number(record.energy), 0);

  const totalGeneration = energyRecords
    .filter((record) => record.type === "Generation")
    .reduce((sum, record) => sum + Number(record.energy), 0);

  if (totalConsumption > totalGeneration) {
    recommendations.push({
      id: "overall-energy-gap",
      category: "Energy Overview",
      priority: "High",
      title: "Review overall energy balance",
      description:
        "Your recorded electricity consumption is higher than your recorded solar generation.",
      reason: `Total consumption is ${totalConsumption.toFixed(2)} kWh compared with ${totalGeneration.toFixed(2)} kWh of solar generation.`,
      suggestion:
        "Review appliance usage patterns and investigate whether additional solar generation or energy-efficiency improvements are appropriate.",
      energyGap: totalConsumption - totalGeneration,
    });
  }

  return recommendations;
}
