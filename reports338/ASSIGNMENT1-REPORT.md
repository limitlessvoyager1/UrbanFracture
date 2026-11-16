# Reina’s Home — Assignment 1 navigation candidate 338

Status: review candidate, not a certified or deployed release. Scope: Gates 1–5 only. Production remains Build 337. Recoverable starting checkpoint: `checkpoint-before-home338`, commit `816c9aeb058e87a47bd7ec98e9cd7387c31bb3c7`.

## Architecture decision

Use the explicitly permitted 2.5D alternative. The engine renders Canvas2D illustrated environments and native hero sprites. It has no 3D geometry, model animation, navigation mesh, or 3D camera obstruction pipeline. True 3D would be a major conversion, which this assignment does not authorize. This implementation is physical navigation through a shared coordinate system, not clickable room selection. See GATE1-AUDIT.md for the audit and reusable systems.

## Gates and evidence

| Gate | Implemented in candidate | Validation | Limitations / next work |
|---|---|---|---|
| 1: Audit | Recoverable checkpoint; audited Canvas2D, native movement, controller, Home327, phone, inventory, deliveries, campaign and weather boundaries | Source inspection and backend regression | Full campaign position save does not exist in Home327; implement at Gate 17 |
| 2: Exterior | Playable front path; spatial front-door interaction; exterior return; current global environment drives rain/snow/fog, lamps and added plant sway | Seven heroes approach, enter and leave via actual movement | Baked illustration foliage is not a complete deformable-tree simulation; interior window weather is Gate 16 |
| 3: Layout | Ground floor: foyer, storage, kitchen, living, command; upper floor: training, workshop, bedroom; continuous stair route and open doorways | All eight rooms reached on foot by seven heroes; solid partition and furniture checks | Residential cutaway representation; no 3D wall volumes |
| 4: Movement | Selected native hero; direction-driven walking, depth travel, collision substeps, distance-driven gait, safe area, keyboard and mapped controller input | 113 navigation assertions; UI input isolation, reconnect neutral, phone return, campaign preservation; existing Home327 190 assertions | Physical DualSense hardware and live-browser rendering not verified; native controller mappings and VM UI exercised |
| 5: Camera | Smooth bounded shared-world follow; continuous stair tracking; foreground partitions fade nearby; spatial front-door fade | Ten native rendered views and input-driven normal-speed walkthrough | 2.5D camera has no 3D obstruction solver; not described as 3D |

## Changed implementation files

- `dist/home338.js`: navigation, room bounds, collision footprints, stairs, gait, camera, safe-home hooks.
- `dist/home-view338.js`: native scene renderer, world composition, cutaway walls, stairs, exterior weather, fixed-scale hero rendering.
- `dist/home-ui327.js`: exploration canvas and input lifecycle replace room navigation menus; existing offer/test entry contracts retained.
- `dist/home327.css`: exploration canvas presentation.
- `dist/phone323.js`: scoped home context for the existing smartphone, restored on close.
- `dist/index.html`: adapter/renderer loading and candidate identifier.
- `dist/assets/home-interior338.webp`, `home-exterior338.webp`: source-based home illustrations; high resolution sources retained.
- `tests/home338.cjs`, `tests/home338-ui.cjs`: focused runtime and native input/UI validation.
- `tools/home338/`: native render and directional-input recording harnesses.
- Prior home UI and CSS retained under `source-archive/home338/`.

## Test results

Focused tests passed: navigation 113 assertions across Reina, Broxton, Niko, Nightshade, Forest, Orion and Nova; Home327 backend 190 assertions; existing phone UI 119 assertions plus new HQ UI checks. Syntax checks and whitespace checks passed.

Initial broad QA: **170 executed, 141 passed, 29 failed, 73 not executed**. Exact results are retained in `qa-initial/latest.json` and `qa-initial/LATEST.md`. Failures include existing source/asset certification mismatches and old home UI assertions that require the menu this task replaces. These failures are not waived or relabeled as passes. The new home tests are separate focused checks, not replacements for broad certification. Release results are recorded separately when complete.

## Evidence and how it was made

`first-milestone.mp4` is a normal-speed native-engine recording: Home338.step at 60 simulation steps per second, HomeView338.draw with real PolishedSprites at 30 video frames per second. Directional input drives exterior approach → front door → foyer → living room → kitchen → foyer → exterior. No room-selection interface or room teleport is used. The doorway uses the normal spatial fade threshold. `first-milestone-trace.json` records inputs, coordinates, room, gait and camera for every video frame.

`visual/` contains ten native scene views, including all required rooms and the staircase. These static framing views position the hero for visual inspection and are not passed off as traversal evidence. The video is traversal evidence. Neither is a browser capture or a physical-controller recording.

## Explicitly not implemented or certified

Room-object interactions, seated poses, team conversations/NPCs, kitchen recovery, command terminal, real training sessions, workshop economy, bedroom rest UI, delivery collection UI, full home save/load, developer home controls, full interior day/night window rendering and final performance certification remain later gated work. Existing backends are preserved, but their existence is not claimed as new physical object integration. Smartphone remains available throughout exploration.

The new illustrations exceed the already nearly full deployment asset budget in their current high-resolution form. Resolve packaging before any future release without degrading unrelated art or deleting retained originals. This review candidate does not justify changing unrelated combat systems or waiving QA.

## Stop boundary

Stop after demonstrating Assignment 1. Recommended next step after review: Gate 6, reusable proximity-based object interactions, then Gates 7–9. Do not begin later room functions before navigation review.

Publication constraint: AGENTS.md requires “Keep last production build if critical gate fails; QA-only source can be saved without deploying gameplay.” Production therefore remains unchanged while the candidate is provided for review.

Video trace validation passed: 714 frames, 23.8 seconds, 960×540 at 30 FPS. Maximum travel between adjacent video frames within the same area is 6.475 world units; no room-to-room repositioning was used. Every interior frame keeps the hero’s logical feet in the viewport. Extracted contact frames were inspected in `walkthrough-contact.jpg`; living/kitchen/foyer views and stair framing were also reviewed. This validates the inspected route, not every possible pixel intersection in the house. Furniture remains authored 2.5D scenery with collision footprints, rather than independently modeled 3D furniture.

Additional integration checks passed (`node tools/home338/ui-flow.cjs`): actual title scene-select route; in-game paused scene-select route and return; actual native level-completion HQ offer; campaign actor walking while native simulation stays frozen; queued-route return restores the campaign position. The native gamepad reader was exercised for standard DualSense USB, standard DualSense wireless, raw Sony, and DSX: R3 entered the spatial front door and Options paused/resumed exploration in each profile. This verifies software mappings, not a physical controller connection.

The old home UI failures are confirmed fixture/contract mismatches: `tests/home327-ui.cjs` and `tests/home328-ui.cjs` load an older runtime fixture, search for the removed `.hq327` room menu, and attempt menu-based room selection/recovery/delivery functions. The requested exploration UI is `.hq338`; current native-loader navigation and entry-route checks pass separately. Migrating the object-function assertions belongs with their physical interaction implementation, rather than replacing them with false passes at this milestone. No baselines were approved or overwritten.

## Review files

- [23.8-second native gameplay recording](sandbox:/workspace/scratch/96a3e452279b/recovered327/.sites-checkout/reports338/first-milestone.mp4)
- [Walkthrough contact frames](sandbox:/workspace/scratch/96a3e452279b/recovered327/.sites-checkout/reports338/walkthrough-contact.jpg)
- [Exterior, eight rooms and staircase overview](sandbox:/workspace/scratch/96a3e452279b/recovered327/.sites-checkout/reports338/room-overview.jpg)
- [Navigation assertions](sandbox:/workspace/scratch/96a3e452279b/recovered327/.sites-checkout/reports338/navigation-checks.json)
- [Input and native entry-route checks](sandbox:/workspace/scratch/96a3e452279b/recovered327/.sites-checkout/reports338/ui-checks.log)

Native render checks also passed for Reina, Broxton, Niko and Nightshade: each produces a full opaque body inside the viewport at fixed home scale, with logical feet at the same floor anchor. The four-hero image was visually inspected. This is a representative walk pose, not certification of every frame in each hero’s animation library. See [four-hero render](sandbox:/workspace/scratch/96a3e452279b/recovered327/.sites-checkout/reports338/four-heroes.png) and `hero-render-checks.json`.

## Release run and final focused correction

The broad release run completed: **238 executed, 199 passed, 39 failed, 5 manual gates not executed**. Its input fingerprint remained unchanged during execution. Exact results are retained in `qa-release/latest.json` and `qa-release/LATEST.md`. This is a blocked release, not certification.

After that run, a focused exterior test confirmed a mixed-precipitation defect: the initial overlay selected one precipitation type for the entire scene. Corrected the particle selection so the current global rain and snow amounts both render, with their respective movement speeds. Clear-weather rendering is unaffected because that particle loop has zero iterations when rain and snow are zero. Before-failure and after-pass logs are `weather-before.log` / `weather-after.log`; native global clear/day, rain/night, snow/day and mixed weather are checked in `weather-checks.json`. Interior window weather remains Gate 16.

Registered four new critical adapters in `qa/system242/suites.json`: home338-navigation, home338-input, home338-weather and home338-render. Focused commands run directly provide the home evidence. The broad release run preceded this final weather correction and registry registration; it is explicitly not a certification of the final candidate fingerprint. `release-gate.log` records the resulting blocked/stale release check. No failures were waived and no approved baselines were changed. Future broad certification must run against the final source after the existing failures are resolved.
