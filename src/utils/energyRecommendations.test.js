import { describe, expect, it } from "vitest";
import { generateEnergyRecommendations } from "./energyRecommendations";

describe("generateEnergyRecommendations", () => {
  it("reports high appliance use, cooling hours, and daily solar gaps", () => {
    const appliances = [
      {
        id: 1,
        name: "Air conditioner",
        category: "Cooling",
        status: "Active",
        power: 2000,
        hoursPerDay: 6,
      },
      {
        id: 2,
        name: "Inactive heater",
        category: "Heating",
        status: "Inactive",
        power: 5000,
        hoursPerDay: 8,
      },
    ];
    const records = [
      { date: "2026-06-01", type: "Consumption", energy: 10 },
      { date: "2026-06-01", type: "Generation", energy: 4 },
      { date: "2026-06-02", type: "Consumption", energy: 2 },
      { date: "2026-06-02", type: "Generation", energy: 5 },
    ];

    const recommendations = generateEnergyRecommendations(appliances, records);
    const ids = recommendations.map(({ id }) => id);

    expect(ids).toContain("high-usage-1");
    expect(ids).toContain("long-hours-1");
    expect(ids).toContain("solar-gap-2026-06-01");
    expect(ids).toContain("overall-energy-gap");
    expect(ids).not.toContain("high-usage-2");
    expect(recommendations.find(({ id }) => id === "high-usage-1").energyUsage)
      .toBe(12);
  });

  it("returns no recommendations for empty data", () => {
    expect(generateEnergyRecommendations([], [])).toEqual([]);
  });
});
