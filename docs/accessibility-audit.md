# Accessibility audit

**Date:** November 5, 2026

**Scope:** Marketing and dashboard routes, including shared navigation and the energy chart

**Result:** No automated WCAG 2.1 A/AA violations were detected on the tested pages. This report is not a formal conformance certification.

## Automated audit

The production build was scanned with axe-core 4.14.0 for WCAG 2.0 and 2.1
Level A/AA rules using Playwright with Chromium, Firefox, and WebKit. All 13
routes were scanned in each engine (39 route/engine scans); no violations
were reported.

The scan used the reduced-motion preference so entrance animations would not
leave text temporarily partially transparent during contrast analysis.

## Manual checks and changes

- Marketing navigation is keyboard-accessible. Its menu opens with Enter,
  closes with Escape, and returns focus to the trigger. A visible keyboard
  focus indicator was verified.
- Dashboard navigation opens and closes with keyboard activation.
- The reduced-motion preference reduces the homepage hero animation to
  0.01 ms.
- `TextField` unit tests verify its visible label, hint, invalid state, and
  associated error message.
- Footer brand text was changed from dark-on-dark to white on the dark footer.
- Chart axis and legend text use `#58665f`, which has a 6.03:1 contrast ratio
  on white.
- Text over gradient backgrounds, which axe cannot reliably evaluate, was
  checked manually using the least favorable CSS gradient endpoint:

| Text color | Background endpoint | Contrast |
| --- | --- | ---: |
| `#b5db69` | `#1d604b` | 4.71:1 |
| `#ffffff` | `#1d604b` | 7.43:1 |
| `#d8e9df` | `#1d604b` | 5.89:1 |
| `#117343` | `#eff7ff` | 5.46:1 |
| `#163b2a` | `#eff7ff` | 11.47:1 |
| `#53665c` | `#eff7ff` | 5.67:1 |

These text pairs exceed the WCAG AA contrast thresholds: 4.5:1 for normal
text and 3:1 for large text. The chart text is also included in an accessible
chart summary.

## Limitations

- No screen-reader session (for example, NVDA, JAWS, or VoiceOver) was
  performed. Screen-reader announcements and the overall experience still
  need human verification.
- Browser automation does not replace a complete keyboard review of every
  control and workflow, physical-device testing, or user testing.
- Automated checks mark some gradient and SVG chart color checks incomplete
  because their backgrounds cannot be reliably inferred. Review these text
  pairs again after future color or style changes.
- Testing used local frontend preview data; it did not validate production
  API success or error announcements.

This report describes an automated audit and targeted manual checks. It does
not claim that the application is certified as conformant with WCAG 2.1 AA.
