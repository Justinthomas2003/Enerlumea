import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { findWcagViolations } from "../../test/a11y";
import Navbar from "./Navbar";

describe("marketing navigation", () => {
  it("opens by button and closes on Escape with focus returned", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const toggle = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const aboutLink = screen.getByRole("link", { name: "About" });
    aboutLink.focus();
    fireEvent.keyDown(aboutLink, { key: "Escape" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("has no detected WCAG 2.1 A or AA violations", async () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    await expect(findWcagViolations(container)).resolves.toEqual([]);
  });
});
