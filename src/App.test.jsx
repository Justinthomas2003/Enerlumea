import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("marketing home route", () => {
  it("renders the homepage content without a loading fallback", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Take control of your energy\.Make every unit count\./,
      }),
    ).toBeInTheDocument();
  });
});
