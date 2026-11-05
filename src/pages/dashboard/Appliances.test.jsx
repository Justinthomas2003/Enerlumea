import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createAppliance,
  listAppliances,
} from "../../api/enerlumeaApi";
import { findWcagViolations } from "../../test/a11y";
import Appliances from "./Appliances";

vi.mock("../../api/enerlumeaApi", () => ({
  createAppliance: vi.fn(),
  deleteAppliance: vi.fn(),
  listAppliances: vi.fn(),
  updateAppliance: vi.fn(),
}));

describe("Appliances", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    listAppliances.mockResolvedValue([
      {
        id: 1,
        name: "Air Conditioner",
        category: "Cooling",
        power: 1500,
        hoursPerDay: 6,
        status: "Active",
      },
    ]);
    createAppliance.mockResolvedValue({ id: 2 });
  });

  it("creates an appliance through the API", async () => {
    listAppliances
      .mockResolvedValueOnce([
        {
          id: 1,
          name: "Air Conditioner",
          category: "Cooling",
          power: 1500,
          hoursPerDay: 6,
          status: "Active",
        },
      ])
      .mockResolvedValueOnce([
        {
          id: 1,
          name: "Air Conditioner",
          category: "Cooling",
          power: 1500,
          hoursPerDay: 6,
          status: "Active",
        },
        {
          id: 2,
          name: "Desk fan",
          category: "Cooling",
          power: 40,
          hoursPerDay: 4,
          status: "Active",
        },
      ]);

    render(<Appliances />);
    await screen.findByRole("heading", { name: "Air Conditioner" });
    fireEvent.click(screen.getByRole("button", { name: "Add Appliance" }));

    const dialog = screen.getByRole("dialog", { name: "Add Appliance" });
    expect(screen.getByRole("button", { name: "Close form" })).toHaveFocus();

    fireEvent.change(screen.getByLabelText("Appliance name"), {
      target: { value: "Desk fan" },
    });
    fireEvent.change(screen.getByLabelText("Power rating (Watts)"), {
      target: { value: "40" },
    });
    fireEvent.change(screen.getByLabelText("Daily usage (Hours)"), {
      target: { value: "4" },
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "Add Appliance" }));

    await waitFor(() => expect(createAppliance).toHaveBeenCalledWith({
      name: "Desk fan",
      category: "Other",
      power: 40,
      hoursPerDay: 4,
      status: "Active",
    }));
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    expect(await screen.findByRole("heading", { name: "Desk fan" })).toBeInTheDocument();
  });

  it("closes the accessible dialog on Escape and returns focus", async () => {
    render(<Appliances />);
    await screen.findByRole("heading", { name: "Air Conditioner" });
    const trigger = screen.getByRole("button", { name: "Add Appliance" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Add Appliance" });
    fireEvent.keyDown(dialog, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("has no detected WCAG 2.1 A or AA violations", async () => {
    const { container } = render(<main><Appliances /></main>);
    await screen.findByRole("heading", { name: "Air Conditioner" });

    await expect(findWcagViolations(container)).resolves.toEqual([]);
  });
});
