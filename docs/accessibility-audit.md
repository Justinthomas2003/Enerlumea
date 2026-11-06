# Accessibility audit report

**Date:** 2026-11-05  
**Scope:** All marketing and dashboard routes, including the shared navigation and energy chart  
**Result:** No automated WCAG 2.1 A/AA violations in the tested pages. This report is not a formal conformance certification.

## Automated audit

The production build was scanned with axe-core 4.14.0 for WCAG 2.0 and 2.1 Level A/AA rules in Playwright Chromium, Firefox, and WebKit. All 13 routes were scanned in each engine (39 route/engine scans); no violations were reported.

The accessibility scan uses the reduced-motion preference so entrance animations do not produce transient, partially transparent text during contrast analysis.

## Manual checks and changes

- Marketing navigation is keyboard reachable; its menu opens with Enter, closes with Escape, and returns focus to the trigger. A visible keyboard focus indicator was verified.
- Dashboard navigation opens and closes with keyboard activation.
- The reduced-motion preference limits the homepage hero animation to 0.01 ms.
- `TextField` unit tests verify its visible label, hint, invalid state, and associated error message.
- Corrected footer brand text from dark-on-dark to white on the dark footer.
- Changed chart axis and legend text to `#58665f`; its contrast on white is 6.03:1.
- Manually checked text over the gradient backgrounds that axe cannot resolve automatically, using the least favorable CSS gradient endpoint:

| Text color | Background endpoint | Contrast |
| --- | --- | ---: |
| `#b5db69` | `#1d604b` | 4.71:1 |
| `#ffffff` | `#1d604b` | 7.43:1 |
| `#d8e9df` | `#1d604b` | 5.89:1 |
| `#117343` | `#eff7ff` | 5.46:1 |
| `#163b2a` | `#eff7ff` | 11.47:1 |
| `#53665c` | `#eff7ff` | 5.67:1 |

These are above the WCAG AA text contrast thresholds of 4.5:1 for normal text and 3:1 for large text. The tested chart text is also contained in an accessible chart summary.

## Remaining limits

- No screen-reader session (for example NVDA, JAWS, or VoiceOver) was performed. Screen-reader announcement quality and user experience still need human verification.
- Browser automation does not replace a full keyboard review of every control and workflow, physical-device testing, or user testing.
- Automated checks report some gradient and SVG chart color checks as incomplete because their backgrounds cannot be reliably inferred. The listed text pairs were manually checked, but review future color/style changes again.
- Testing used local frontend preview data; it did not validate production API error or success announcements.

The audit should therefore be described as an automated and targeted manual review, not a claim that the application is certified WCAG 2.1 AA conformant.
