import { describe, it, expect } from 'vitest'
import { calculateSolarEstimate } from './solarCalculations'

describe('calculateSolarEstimate', () => {
  const defaultInputs = {
    monthlyUsage: 300,
    peakSunHours: 5,
    tariff: 6,
    performanceRatio: 80,
    installationCostPerKw: 55000,
  }

  it('calculates the recommended solar capacity', () => {
    const result = calculateSolarEstimate(defaultInputs)

    expect(result.recommendedCapacity).toBeCloseTo(2.5)
  })

  it('calculates daily and monthly solar generation', () => {
    const result = calculateSolarEstimate(defaultInputs)

    expect(result.dailyGeneration).toBeCloseTo(10)
    expect(result.monthlyGeneration).toBeCloseTo(300)
  })

  it('calculates estimated monthly savings', () => {
    const result = calculateSolarEstimate(defaultInputs)

    expect(result.monthlySavings).toBeCloseTo(1800)
  })

  it('calculates installation cost', () => {
    const result = calculateSolarEstimate(defaultInputs)

    expect(result.installationCost).toBeCloseTo(137500)
  })

  it('calculates the estimated payback period', () => {
    const result = calculateSolarEstimate(defaultInputs)

    expect(result.paybackYears).toBeCloseTo(6.3657, 3)
  })

  it('does not calculate savings beyond monthly consumption', () => {
    const result = calculateSolarEstimate({
      ...defaultInputs,
      monthlyUsage: 100,
    })

    expect(result.monthlySavings).toBeCloseTo(600)
  })

  it('returns zero payback when annual savings are zero', () => {
    const result = calculateSolarEstimate({
      ...defaultInputs,
      tariff: 0,
    })

    expect(result.monthlySavings).toBe(0)
    expect(result.paybackYears).toBe(0)
  })

  it('returns all expected calculation properties', () => {
    const result = calculateSolarEstimate(defaultInputs)

    expect(result).toHaveProperty('recommendedCapacity')
    expect(result).toHaveProperty('dailyGeneration')
    expect(result).toHaveProperty('monthlyGeneration')
    expect(result).toHaveProperty('monthlySavings')
    expect(result).toHaveProperty('installationCost')
    expect(result).toHaveProperty('paybackYears')
  })

  it('rejects zero sunlight hours instead of returning infinite capacity', () => {
    expect(() => calculateSolarEstimate({
      ...defaultInputs,
      peakSunHours: 0,
    })).toThrow(RangeError)
  })

  it('rejects performance ratios above 100 percent', () => {
    expect(() => calculateSolarEstimate({
      ...defaultInputs,
      performanceRatio: 101,
    })).toThrow(RangeError)
  })

  it('rejects non-finite inputs', () => {
    expect(() => calculateSolarEstimate({
      ...defaultInputs,
      monthlyUsage: Number.NaN,
    })).toThrow(TypeError)
  })
})
