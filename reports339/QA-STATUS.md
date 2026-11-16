# Gate 6–9 final verification — candidate 339

Tested implementation checkpoint: 9d10d915cea559b83607a7aa8d61f7a1c6f31baa.
Runtime/test fingerprint: d57bc6efe0bab805740a033f65b3541b46902dd94911f6a89d0ae94f0f77b7d5.
Source changed during tests: false. Current fingerprint still matches: true.

## New home suites

- home339-interactions: **passed**
- home339-integration: **passed**
- home339-ui: **passed**
- home339-assets: **passed**
- home339-render: **passed**
- home339-replay: **passed**

Initial full-game profile: **180 executed; 151 passed; 29 failed; 73 not executed**. Decision: **blocked**.
Previously failing suite IDs still failing: 29. New failing suite IDs relative to the retained 338 initial report: 0. This is a suite-ID comparison, not a waiver or proof that every failure has the same underlying cause.

## Failed suites

- image-certification — reports242/image-certification.log
- scene-scale-certification — reports242/scene-scale-certification.log
- broxton244 — reports242/broxton244.log
- worker-reaction246 — reports242/worker-reaction246.log
- combat-art248 — reports242/combat-art248.log
- weapon-render248 — reports242/weapon-render248.log
- worker-crew250 — reports242/worker-crew250.log
- nightshade-art252 — reports242/nightshade-art252.log
- controls260-policy — reports242/controls260-policy.log
- repair262-asset-certification — reports242/repair262-asset-certification.log
- stats266 — reports242/stats266.log
- reina269-view — reports242/reina269-view.log
- orion271-assets — reports242/orion271-assets.log
- reina278-assets — reports242/reina278-assets.log
- review280-runtime — reports242/review280-runtime.log
- casino293 — reports242/casino293.log
- civilians305-runtime — reports242/civilians305-runtime.log
- recording306-runtime — reports242/recording306-runtime.log
- diagnostics307-input — reports242/diagnostics307-input.log
- quality308-A — reports242/quality308-A.log
- quality308-B — reports242/quality308-B.log
- quality308-C — reports242/quality308-C.log
- quality308-D — reports242/quality308-D.log
- quality308-E — reports242/quality308-E.log
- hospital315-render — reports242/hospital315-render.log
- energy316-baseline-comparison — reports242/energy316-baseline-comparison.log
- reserve320-equivalence — reports242/reserve320-equivalence.log
- home327-ui — reports242/home327-ui.log
- home328-ui — reports242/home328-ui.log

## Limits

The expanded deployment archive is 270,366,720 bytes, 1,931,264 above the 268,435,456-byte limit. No production deployment was attempted. The last production build is retained.
No final release-profile run, physical DualSense session, owner-approved screenshot baseline, or full final live-browser traversal is claimed. Native rendering, exact replay, and actual DOM/native-reader VM tests are separate evidence. Earlier incomplete QA attempts are retained as interrupted/superseded logs; only qa-initial/latest.json is this completed final run.

Focused tests passed before this profile: 280 interaction assertions; 104 integration assertions; 113 navigation assertions; 190 Home327 assertions; 152 PromptDrop assertions; 30 source-art checks; 28 rendered poses plus guest-facing checks; phone/home/object and three-layout controller UI checks. Replay: 1,469 frames and 7,345 per-frame comparisons.

## Evidence

- gates6-9-walkthrough.mp4 — normal-speed native renderer replay, not browser DOM footage.
- walkthrough-trace.json, video-validation.json and replay-checks.json — physical input/interaction and receipt evidence.
- visual/seven-heroes-seating.png and visual/foyer.png / living.png / seated.png / kitchen.png — inspected native captures.

Implementation of Gates 6–9 is present in this review candidate. Wider release certification remains blocked. Next recommended gate after review: Gate 10, Command Center functions.
