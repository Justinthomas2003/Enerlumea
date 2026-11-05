import { describe, expect, it } from "vitest";
import { calculateSustainabilityMetrics } from "./sustainabilityCalculations";

describe("calculateSustainabilityMetrics", () => {
  it("counts only solar generation that can offset same-day consumption", () => {
    const records = [
      { date: "2026-06-01", type: "Consumption", energy: 10 },
      { date: "2026-06-01", type: "Generation", energy: 15 },
      { date: "2026-06-02", type: "Consumption", energy: 20 },
      { date: "2026-06-02", type: "Generation", energy: 5 },
    ];

    const result = calculateSustainabilityMetrics(records, 0.5);

    expect(result.totalConsumption).toBe(30);
    expect(result.totalGeneration).toBe(20);
    expect(result.usableSolarEnergy).toBe(15);
    expect(result.renewableContribution).toBe(50);
    expect(result.co2Avoided).toBe(7.5);
    expect(result.gridEmissionFactor).toBe(0.5);
  });

  it("returns zero contribution when there is no consumption", () => {
    const result = calculateSustainabilityMetrics([
      { date: "2026-06-01", type: "Generation", energy: 12 },
    ]);

    expect(result.totalGeneration).toBe(12);
    expect(result.usableSolarEnergy).toBe(0);
    expect(result.renewableContribution).toBe(0);
    expect(result.co2Avoided).toBe(0);
  });
});
