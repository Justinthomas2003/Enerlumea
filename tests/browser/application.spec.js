import { createRequire } from "node:module";
import { test, expect } from "@playwright/test";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const routes = [
  "/",
  "/about",
  "/features",
  "/contact",
  "/dashboard",
  "/dashboard/analytics",
  "/dashboard/appliances",
  "/dashboard/energy-records",
  "/dashboard/solar-estimator",
  "/dashboard/settings",
  "/dashboard/savings-insights",
  "/dashboard/sustainability",
  "/dashboard/recommendations",
];
const widths = [320, 768, 1440];

test("all routes render without horizontal overflow at mobile, tablet, and desktop widths", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });

    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(
        page.locator("main h1").first(),
        `${route} should render its main heading`,
      ).toBeVisible({ timeout: 20_000 });
      const documentWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      expect(documentWidth, `${route} at ${width}px`).toBeLessThanOrEqual(
        width,
      );
    }
  }

  expect(pageErrors).toEqual([]);
});

test("marketing and dashboard navigation is keyboard operable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const marketingToggle = page.locator(".mobile-menu-toggle");
  for (let tabCount = 0; tabCount < 5; tabCount += 1) {
    if (await marketingToggle.evaluate((element) => element === document.activeElement)) {
      break;
    }
    await page.keyboard.press("Tab");
  }
  await expect(marketingToggle).toBeFocused();
  const focusOutline = await marketingToggle.evaluate(
    (element) => getComputedStyle(element).outlineStyle,
  );
  expect(focusOutline).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(marketingToggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(marketingToggle).toBeFocused();
  await expect(marketingToggle).toHaveAttribute("aria-expanded", "false");

  await page.goto("/dashboard");
  const dashboardToggle = page.locator(".menu-button");
  await dashboardToggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#dashboard-sidebar")).toHaveClass(
    /sidebar-open/,
  );
  const closeButton = page.locator(".close-sidebar");
  await closeButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#dashboard-sidebar")).not.toHaveClass(
    /sidebar-open/,
  );
});

test("reduced-motion preference limits decorative animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("main h1").first()).toBeVisible({
    timeout: 20_000,
  });

  const duration = await page.locator(".hero-content").evaluate((element) => {
    const value = getComputedStyle(element).animationDuration;
    return value.endsWith("ms")
      ? Number.parseFloat(value) / 1000
      : Number.parseFloat(value);
  });

  expect(duration).toBeLessThanOrEqual(0.00001);
});

test("energy chart axis labels use accessible text color", async ({ page }) => {
  await page.goto("/dashboard");
  const tickLabel = page.locator(".recharts-cartesian-axis-tick-value").first();
  await expect(tickLabel).toBeVisible({ timeout: 20_000 });
  await expect(tickLabel).toHaveAttribute("fill", "#58665f");
});

test("all routes have no automated WCAG 2.1 A/AA axe violations", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const route of routes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(
      page.locator("main h1").first(),
      `${route} should render its main heading`,
    ).toBeVisible({ timeout: 20_000 });
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => {
      const result = await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
      });

      return result.violations.map(({ id, impact, nodes }) => ({
        id,
        impact,
        nodes: nodes.map(({ target, failureSummary }) => ({
          target,
          failureSummary,
        })),
      }));
    });

    expect(violations, route).toEqual([]);
  }
});
