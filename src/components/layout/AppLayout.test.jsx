import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import AppLayout from "./AppLayout";
import Settings from "../../pages/dashboard/Settings";
import { findWcagViolations } from "../../test/a11y";

function renderSettings() {
  return render(
    <MemoryRouter initialEntries={["/dashboard/settings"]}>
      <Routes>
        <Route path="/dashboard" element={<AppLayout />}>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("dashboard theme preference", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("defaults to light and persists a selected theme", async () => {
    const firstRender = renderSettings();

    expect(screen.getByRole("button", { name: "Light" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(document.querySelector(".app-shell")).toHaveClass("light");
    await expect(findWcagViolations(firstRender.container)).resolves.toEqual([]);

    fireEvent.click(screen.getByRole("button", { name: "Dark" }));

    expect(document.querySelector(".app-shell")).toHaveClass("dark");
    expect(window.localStorage.getItem("enerlumea-theme")).toBe("dark");

    firstRender.unmount();
    renderSettings();

    expect(screen.getByRole("button", { name: "Dark" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(document.querySelector(".app-shell")).toHaveClass("dark");
  });
});
