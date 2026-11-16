# Build356 — Broxton reference appearance

Checkpoint: checkpoint-before-broxton356 at359b861b5e85b24576641ffc60c5d5bf51566efa.

Implemented the supplied bouncer design throughout Broxton's mapped pose library and HUD portrait: muscular medium-brown African-American face/body, short fade, black goatee/mustache, diamond stud, plain black tank, black cargo pants/belt, lace-up combat boots, watch/support and roaring tiger tattoo. Seven transparent atlases cover181 source slots. These include alternate/legacy poses and are not181 distinct moves. Rare pool-pain/calibration poses received a dedicated redraw to remove inherited generic hair and proportions.

Source audit covers base/tech, whole walk/shuffle, counter/grip, refined motion/walk/run/combat/grapples,179 charge,189 lariat/recovery,244 lariat,245 throw,137 spear/ground punches, weapon pickup/attack/throw/motion and193 rare pain. Excluded Carmen's walk and301 enemy Bruno powerbomb; neither is Broxton. Native181 shield uses the same hero pose sources. Full campaign source remains available; hosted review is Downtown356 with Broxton selected initially.

Native frame clocks, controller bindings, choreography, physics, damage and collision remain. Uniform alpha-height/ground registration retains original source anchors; frame-image swaps occur only within Broxton rendering and restore shared references in finally. Native skin recolor accepts new art without recoloring the reference skin. Other heroes keep their existing rendering.

Files changed: dist/sprites.js data-only export; broxton-bindings356.js, broxton356-data.js, broxton-view356.js, assets/broxton356, downtown356.html, game356.js; campaign index/game portrait hook; tools/broxton356, fighter-render manifest, QA suite registry, source-art/broxton356, AGENTS.md.

Tests:811 native asset/binding/ground-anchor checks passed for all181 slots, with unchanged Brawler prototype. Broxton179, Broxton244 and simulated-controller244 suites passed. Full campaign renderer bootstrap passed:188 modules,76 owners,1068 images. JS syntax passed. Native capture includes27 scenarios /3630 frames covering locomotion, combo, aerials, dodge, clearout, spear, lariat, forward/back/choke/shield, grab strikes, Iron Will, equipment, shock/hitstun/down/recovery and punch/kick counters. Fixed-seed fixtures suppress AI; counter incoming capture is seeded. The earlier duplicate powerbomb-labelled fixture resolved to current front-grab choke and was removed, along with an unavailable counter-special fixture; no claim of those distinct actions passing. Asset coverage includes dormant legacy frames even when their old input route is superseded.

Evidence: all-181-poses.jpg, contact-sheet.jpg, Broxton356-Animation-Review-1x.mp4 and0.5x.mp4. Background placement in native grapple fixtures was corrected to use the Downtown presentation without changing their gameplay state. These are native simulation recordings, not browser/controller footage.

Failed checks remaining: none in the executed targeted suites. Untested: physical DualSense, browser performance, full campaign playthrough, every possible interruption/weapon/scene combination and subjective final player acceptance. Existing manual/performance holds remain open. Next: player review of Broxton across Downtown and the retained campaign levels, especially paired grips and equipment sockets.

Launch-path correction: standalone Downtown355 had omitted the katana scripts due an exact query-string mismatch, and the new356 page inherited that omission. Corrected both source entries with explicit katana/Broxton modules before game startup; added a shipping-entry dependency-order check after packaging. Native capture alone is insufficient to verify an HTML launch path.
