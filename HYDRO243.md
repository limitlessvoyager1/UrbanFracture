# Hydroelectric Power Plant — Playtest Build 243

Recovery checkpoint: `checkpoint-before-hydro243`, commit `1b017c5c2119c5e29113e3046e7227633c0ba041`.

## Route and integration

Highway Exit 19 now leads into the plant while preserving the existing hero instance, health, score, cooldowns, world environment and Gunner mode. The four selectable scenes are turbine hall, operations control, pressure gallery and dam crest. The turbine hall includes green generators, pumps, pipes, overhead machinery and a raised manager's office. Double steel doors lead to the control room. A service door leads to the blue penstock and red-valve pressure gallery, visually distinct from the first hall. Its elevator boards, closes, ascends and opens onto a broad dam-top arena overlooking a huge reservoir.

The route uses the existing Combat AI Director148, Adaptive/Locked222, shared spawn entrances, grapples223, environment162 and native gamepad mapping. No parallel AI, encounter or weather controller was added. Enemies enter through the established shared pipeline; required groups, camera locks, reentry and GO restrictions remain native. Each section has at most two finite locked groups. Outdoor dam weather, lighting, accumulation, windsocks and runoff read the global environment. Indoor weather is clipped to window panes; the pressure gallery is sealed. The window landscape is baked artwork with time/weather tint, not a newly reconstructed 3D exterior.

The dam has ordinary approach guards, then stops in an explicit boss-pending state. No boss, victory, next destination or invented boss damage was added. When the future boss is specified, reserve a scripted lock and reduce ordinary lock groups so the combined section stays within the two-lock limit.

## Art and scale

Four distinct 2172×724 lossless WebP panoramas are in `dist/assets/hydro`. Generation prompts and final doorway edits are recorded in `source-art/hydro243/prompts.json`. Architecture retains its source aspect ratio. Only the floor texture is projected to the existing world floor; hero proportions and collision dimensions are unchanged. Main doors/elevator are source-aligned to their GO points. Machinery and railings stay behind the clear combat lane.

Browser inspection covered the native game's menu launch and turbine gameplay, plus all four scene compositions, doorway scale, pressure elevator, control-room night windows, dam daylight and nighttime snow. The inspector deliberately clears enemies and is not combat-balance evidence. These screenshots are candidates, not owner-approved regression baselines.

## Validation

Run `node tools/qa242/run.cjs --profile release`. Exact results are in `reports242/latest.json` and `reports242/LATEST.md`. The new `hydro243` progression suite covers all six heroes at 30/60/120 FPS, required waves, two-lock limits, native pressure budget, premature GO rejection, actual Highway Exit19 handoff, physical elevator, state preservation, retries, displaced-enemy tracking and offscreen attack denial. The view suite checks aspect, floor alignment, main doorway sizes and source-aligned portals. The input suite checks keyboard and three simulated DualSense mappings across every plant transition for all six heroes. These are simulation tests, not physical controller certification.

Two inherited test assertions incorrectly rejected the already implemented Orion counter. Their fixtures now require the existing eligible counter; no hero combat code was altered to satisfy them. Both full legacy suites pass.

Physical controller hardware, owner art approval, approved screenshot comparisons, broad all-move certification and human balance remain outstanding. The QA verdict is needs-review, not stable certification. No unexecuted check is reported as passed.

## Deployment storage repair

To keep the static archive within the hosting limit, 20 existing lossless sprite sheets were repacked after normalizing only RGB under fully transparent pixels. Dimensions, alpha and every visible RGBA pixel were verified identical. This saved 9,808,000 bytes; proof and hashes are in `reports243/lossless-repack.json`. Inventory hashes were updated with that proof. Existing artwork was not resized or redesigned. Four new panoramas remain review-required rather than automatically artistically approved.

## Files and rollback

New level/view/inspector: `dist/hydro243.js`, `dist/hydro-view243.js`, `dist/hydro243.html`; assets in `dist/assets/hydro`; three new suites and input fixture in `tests`; main rendering/menu/status and F9 integration in `dist/game.js`, `dist/index.html`, `dist/audit-view135.js`. QA registry/issues/inventory and the two legacy test contracts were updated. Generated reports record execution and modified files.

For source rollback, create a branch from `checkpoint-before-hydro243`; avoid destructive reset of unrelated work. For production rollback, redeploy the previous saved Build241 version through Sites history. No persistent user data schema changed.

### Reproduced legacy QA false positive

The final unseeded release run exposed Jesse213's mixed-Bruno case. Seed12 reproduces zero admitted Jesse actions: the Director denies his attempted stabs for overlapping commitments while he physically repositions and waits through the hero's knockdowns. `reports243/jesse-mixed-probe-more.log` preserves those requests and coordinates. The old assertion equated zero admitted actions with a freeze, contradicting pressure admission. The test now requires measurable physical repositioning plus an actual recorded pressure denial when no action is admitted; ordinary firing/reload/contact tests remain mandatory. Current216 runs seeds216 and12 for Jesse, with fixed RNG per child. No AI, pressure budget or admission rule was weakened. The original failed report/log are preserved in reports243.
