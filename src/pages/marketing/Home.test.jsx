import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { findWcagViolations } from "../../test/a11y";
import Home from "./Home";

describe("home page accessibility", () => {
  it("has no detected WCAG 2.1 A or AA violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await expect(findWcagViolations(container)).resolves.toEqual([]);
  });
});
