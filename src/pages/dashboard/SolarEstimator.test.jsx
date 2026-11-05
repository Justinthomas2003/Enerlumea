import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SolarEstimator from "./SolarEstimator";

describe("SolarEstimator", () => {
  it("hides the estimate while an input is incomplete", () => {
    render(<SolarEstimator />);

    fireEvent.change(screen.getByLabelText("Peak Sunlight Hours per Day"), {
      target: { value: "" },
    });

    expect(screen.getByRole("status")).toHaveTextContent(
      "Please correct the input values to view your estimate.",
    );
    expect(screen.queryByText(/NaN|Infinity/)).not.toBeInTheDocument();
  });

  it("announces validation errors and associates them with their fields", () => {
    render(<SolarEstimator />);

    fireEvent.change(screen.getByLabelText("Peak Sunlight Hours per Day"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Validate Estimate" }));

    const input = screen.getByLabelText("Peak Sunlight Hours per Day");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "peakSunHours-error");
    expect(screen.getByRole("alert")).toHaveTextContent("Minimum value is 1.");
  });
});
