# Cross-browser test report

**Date:** 2026-11-05  
**Target:** Production Vite preview build  
**Result:** Pass in the three Playwright browser engines tested

## Browser engines

| Engine | Version |
| --- | --- |
| Chromium | 156.0.8078.4 |
| Firefox | 157.0 |
| WebKit | 27.2 |

WebKit is Playwright's Safari browser engine build; it is not a test of the Apple Safari product or its iOS/macOS integrations.

## Coverage and results

- All 13 marketing and dashboard routes were loaded at 320, 768, and 1440 CSS pixels (900 px height) in each engine: **117 route/viewport checks passed**, with no horizontal document overflow or uncaught page errors.
- Marketing and dashboard navigation keyboard interactions passed in all engines, including the visible focus indicator and Escape-to-close behavior.
- Reduced-motion behavior and chart axis text color checks passed in all engines.
- axe-core WCAG 2.0/2.1 A/AA scans across all 13 routes reported no violations in any engine.
- Playwright result: **15 tests passed, 0 failed**.

Run the suite locally after installing its browser binaries:

```powershell
npx.cmd playwright install chromium firefox webkit
npm.cmd run test:browser
```

GitHub Actions runs the same browser suite in its `browser-tests` job.

## Limits

This is browser-engine testing in automation, not physical-device testing. In particular, WebKit does not prove compatibility with installed Safari, and mobile layouts were checked as viewport sizes rather than on iOS/Android hardware. The test target was the frontend production preview; the Spring API was not started, so API-backed success flows were outside this test's scope.
