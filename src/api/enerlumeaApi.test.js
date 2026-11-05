import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createEnergyRecord,
  listEnergyRecords,
} from "./enerlumeaApi";

afterEach(() => vi.unstubAllGlobals());

describe("Enerlumea API client", () => {
  it("loads records from the same-origin API path", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => [{ id: 3, name: "Solar" }],
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(listEnergyRecords()).resolves.toEqual([
      { id: 3, name: "Solar" },
    ]);
    expect(fetchMock).toHaveBeenCalledWith("/api/energy-records", {
      headers: { Accept: "application/json" },
    });
  });

  it("sends JSON and surfaces API validation messages", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      headers: { get: () => "application/problem+json" },
      json: async () => ({ detail: "Energy must be positive." }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(createEnergyRecord({ energy: 0 })).rejects.toThrow(
      "Energy must be positive.",
    );
    expect(fetchMock).toHaveBeenCalledWith("/api/energy-records", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: '{"energy":0}',
    });
  });
});
