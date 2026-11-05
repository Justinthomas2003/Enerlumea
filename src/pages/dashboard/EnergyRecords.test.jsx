import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createEnergyRecord,
  listEnergyRecords,
} from "../../api/enerlumeaApi";
import { findWcagViolations } from "../../test/a11y";
import EnergyRecords from "./EnergyRecords";

vi.mock("../../api/enerlumeaApi", () => ({
  createEnergyRecord: vi.fn(),
  deleteEnergyRecord: vi.fn(),
  listEnergyRecords: vi.fn(),
  updateEnergyRecord: vi.fn(),
}));

describe("EnergyRecords", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    listEnergyRecords.mockResolvedValue([
      {
        id: 1,
        name: "Household use",
        type: "Consumption",
        date: "2026-11-01",
        energy: 12,
        notes: "Evening reading",
      },
    ]);
    createEnergyRecord.mockResolvedValue({ id: 2 });
  });

  it("creates a validated record through the API", async () => {
    listEnergyRecords
      .mockResolvedValueOnce([
        {
          id: 1,
          name: "Household use",
          type: "Consumption",
          date: "2026-11-01",
          energy: 12,
          notes: "Evening reading",
        },
      ])
      .mockResolvedValueOnce([
        {
          id: 1,
          name: "Household use",
          type: "Consumption",
          date: "2026-11-01",
          energy: 12,
          notes: "Evening reading",
        },
        {
          id: 2,
          name: "Solar reading",
          type: "Generation",
          date: "2026-11-02",
          energy: 8.5,
          notes: "",
        },
      ]);

    render(<EnergyRecords />);
    await screen.findByText("Household use");
    fireEvent.click(screen.getByRole("button", { name: "Add Record" }));

    const dialog = screen.getByRole("dialog", { name: "Add Energy Record" });
    fireEvent.change(screen.getByLabelText("Record name"), {
      target: { value: "Solar reading" },
    });
    fireEvent.change(screen.getByLabelText("Record type"), {
      target: { value: "Generation" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2026-11-02" },
    });
    fireEvent.change(screen.getByLabelText("Energy (kWh)"), {
      target: { value: "8.5" },
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "Add Record" }));

    await waitFor(() => expect(createEnergyRecord).toHaveBeenCalledWith({
      name: "Solar reading",
      type: "Generation",
      date: "2026-11-02",
      energy: 8.5,
      notes: "",
    }));
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    expect(await screen.findByText("Solar reading")).toBeInTheDocument();
  });

  it("has no detected WCAG 2.1 A or AA violations", async () => {
    const { container } = render(<main><EnergyRecords /></main>);
    await screen.findByText("Household use");

    await expect(findWcagViolations(container)).resolves.toEqual([]);
  });
});
