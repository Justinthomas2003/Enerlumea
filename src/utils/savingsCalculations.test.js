import { describe, expect, it } from "vitest";
import { calculateSavingsInsights } from "./savingsCalculations";

describe("calculateSavingsInsights", () => {
  it("caps daily solar savings at that day's consumption", () => {
    const records = [
      { date: "2026-06-02", type: "Consumption", energy: 20 },
      { date: "2026-06-02", type: "Generation", energy: 5 },
      { date: "2026-06-01", type: "Consumption", energy: 10 },
      { date: "2026-06-01", type: "Generation", energy: 15 },
    ];

    const result = calculateSavingsInsights(records);

    expect(result.days.map((day) => day.date)).toEqual([
      "2026-06-01",
      "2026-06-02",
    ]);
    expect(result.totalConsumption).toBe(30);
    expect(result.totalGeneration).toBe(20);
    expect(result.usableSolarEnergy).toBe(15);
    expect(result.estimatedCostWithoutSolar).toBe(180);
    expect(result.estimatedSavings).toBe(90);
    expect(result.estimatedGridCost).toBe(90);
    expect(result.solarContribution).toBe(50);
  });

  it("returns zero totals for an empty record set", () => {
    const result = calculateSavingsInsights([]);

    expect(result.days).toEqual([]);
    expect(result.totalConsumption).toBe(0);
    expect(result.totalGeneration).toBe(0);
    expect(result.estimatedSavings).toBe(0);
    expect(result.solarContribution).toBe(0);
  });
});
