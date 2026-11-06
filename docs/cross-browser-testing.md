# Cross-browser test report

**Date:** November 5, 2026

**Target:** Production Vite preview build

**Result:** Passed in all three Playwright browser engines tested

## Browser engines

| Engine | Version |
| --- | --- |
| Chromium | 156.0.8078.4 |
| Firefox | 157.0 |
| WebKit | 27.2 |

WebKit is Playwright's Safari browser-engine build. It does not test the Apple
Safari product or its iOS/macOS integrations.

## Coverage and results

- All 13 marketing and dashboard routes were loaded at 320, 768, and 1440 CSS
  pixels (900 px height) in each engine: **117 route/viewport checks passed**.
  No horizontal document overflow or uncaught page errors were observed.
- Marketing and dashboard navigation keyboard interactions passed in all
  engines, including visible focus indicators and Escape-to-close behavior.
- Reduced-motion behavior and chart-axis text-color checks passed in all
  engines.
- axe-core WCAG 2.0/2.1 A/AA scans across all 13 routes reported no
  violations in any engine.
- Playwright result: **15 tests passed, 0 failed**.

To run the suite locally, install the browser binaries and start the browser
tests:

```powershell
npx.cmd playwright install chromium firefox webkit
npm.cmd run test:browser
```

GitHub Actions runs the same browser suite in its `browser-tests` job.

## Limitations

This is automated browser-engine testing, not physical-device testing. In
particular, WebKit does not establish compatibility with installed Safari,
and mobile layouts were checked at emulated viewport sizes rather than on
iOS or Android hardware. The test target was the frontend production preview;
the Spring API was not started, so API-backed success flows were outside the
scope of this run.
