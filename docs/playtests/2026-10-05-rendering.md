# Rendering extraction browser comparison

- Ticket: TRI-045; date: 2026-10-05.
- Before: immutable game.js from 23c6cf9f6a427bc6a0c85b63e148a75ffe3df52f, served by disposable ignored work/rendering-baseline-preview.cjs on read-only loopback port2146. Other assets/modules from this task checkout; baseline does not invoke renderer.
- After: chore/extract-rendering working tree, same assets, read-only serve.cjs port2145; final implementation commit recorded in session038.
- Chrome154.0.8037.93 on Windows; unmodified viewport, both full-page screenshots863×1269. Normal difficulty; gm-bank.js absent (fallback), audio not listened to.
- Tester: implementation worker via browser UI; mission selector and Start mission button only. Both captures immediately after deployment, tactical mode, unchanged actors, default troop control, no rally/selection.

| Scenario | Result | Evidence |
| --- | --- | --- |
| Original Desert Canyon tactical map/sprites/HUD/border | pass | [Before](rendering-2026-10-05/before-original-tactical.jpg), [after](rendering-2026-10-05/after-original-tactical.jpg). Viewed both; byte-identical JPEG files, SHA25675cd622d55b5b793bcb32f9c063f8e8405dbdff06773b061d0f5bab7b77c5d64. |
| Custom Relay Breaker/Split Ridge tactical map/sprites/HUD | pass | [Before](rendering-2026-10-05/before-custom-tactical.jpg), [after](rendering-2026-10-05/after-custom-tactical.jpg). Viewed both; byte-identical JPEG files, SHA2569fe1a4abf40701776ec377bfbb10d2760ec20552c51845dcbc437761178a1e8f. |
| Browser console | pass for candidate observation | No errors returned by tab.dev.logs during bounded original/custom run. |
| Mounted composites/live headings, combat/manual/audio/full mission acceptance | not run | Covered where relevant by VM command/rule fixtures; no corresponding live claim. |

## Limits and reproduction

File navigation was blocked by browser protocol policy. HTTP read-only loopback preview used. Start each server from this task checkout, load each URL, choose Desert Canyon or Relay Breaker and Start mission; verify tactical overlay before capture. Screenshot transport returned JPEG rather than PNG, so artifacts use .jpg. Byte identity applies to these captured frozen views, not all gameplay/viewport states. No asset generation, original game access, publication or audio check performed. Awaiting director review.
