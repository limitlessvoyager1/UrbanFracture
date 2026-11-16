# Build360 — Nightshade magenta tactical identity and complete locomotion

Recoverable checkpoint: `checkpoint-before-nightshade360` / `8b49f8f1a4af01adf60f06b42347981cbb67a2b9`.

Implemented the supplied black/white/magenta outfit, magenta glasses and wrist device, dark curly ponytail, and matching drone. 400 unique pose slots across current and legacy combat, recovery, grabbing and weapon render sources are mapped. Twelve individually authored full-body walking frames and twelve running frames replace the split four/six/eight-frame movement paths. Actual displacement drives cadence, with scale/depth compensation, consecutive progression, stationary neutral and teleport/action rejection. Twenty-four visually calibrated dominant-hand sockets and hand-over-weapon occlusion support carried weapons without switching hands. Existing attacks, timings, costs, balance, controller bindings and native weapon actions remain intact; the card does not replace approved current moves.

## Files

- `dist/assets/nightshade360/`: 13 pose atlases, walk/run atlases, drone.
- `dist/nightshade360-data.js`, `nightshade-skin360.js`, `nightshade-gait360.js`: registrations, scoped per-hero raster substitution and movement.
- `dist/downtown360.html`, `dist/game360.js`: Downtown review entry/default Nightshade; other hero selection remains.
- `dist/index.html`, `tools/fighter-render/manifest.json`: full campaign load order.
- `source-art/nightshade360/`, `tools/nightshade360/`: source artwork and reproducible packing, checks and bounded build.
- `reports360/`: evidence and check results. Source includes earlier levels; the published review remains Downtown only.

## Verification

Passed:

- 2,458 native rendering/movement assertions; 24 direction/rate cases (walk/run × four directions × 30/60/120 Hz).
- Separate frame-order check: every one of the twelve frames used in consecutive order in all 24 cases. Blocked motion returns neutral.
- Pipes, knives, chains and batons: both facings, walk/run, all twelve frames, opaque calibrated grip pixels; action priority and stopped/teleport handling.
- 400/400 nonempty pose substitutions and magenta coverage; scoped Canvas2D method restored after an exception.
- Sixteen rendered action scenarios: sweep/beatdown, vault, backroll, grab combo, standard combo, drone gun/charge/flame/heal/missile, blitz, aerial downward baton, pipe/knife/chain swings and pickup.
- Full canonical renderer: 192 modules, 79 draw owners, 1,194 loaded images, 400 Nightshade registrations; native combat prototype/configuration preserved; Broxton359 preserved.
- Existing active combat352 (180), active combat351 (180), blitz352 (1,221) and controller157 regression suites.
- Syntax and source/shipping entry dependency order.

Failures encountered and corrected: one generated sheet had an opaque backdrop; a running toe clipped the import cell; initial hand coordinates missed two gloves; native-canvas `currentSrc` contained a data URI and masked the real asset path. Corrected transparency, expanded import cells, visually calibrated sockets, and asset-path resolution. Final targeted checks have no outstanding failures.

## Evidence

- `nightshade-walk-full.png`, `nightshade-run-full.png`: all twelve frames per gait.
- `weapon-preview.png`, `weapon-walk.jpg`, `weapon-run.jpg`: new identity and weapon holds.
- Sixteen `*-proof.webp` contact sheets: sampled native actions.
- `canonical-idle.png`: full campaign renderer skin.
- `Nightshade360-native-capture.mp4`: 42.27-second native simulation capture, real-time movement/actions. Persistent video: https://chatgpt.com/library?file_id=libfile_fde3_f-622d695739ec81919867aa724d118985_883c12a6af488191be4a998f74e329db&account_id=personal

The recording is native simulation/Canvas2D evidence, not a browser recording or physical DualSense verification. Contact sheets and complete gait sheets were visually inspected. Full artistic inspection of every combat frame, physical hardware, browser performance/memory, and full-campaign manual traversal remain untested; previous manual/performance holds remain. No stable-game certification is claimed.

Next recommended check: play Downtown with the new skin and a connected DualSense, review gait cadence and weapon grips at normal speed, then complete browser memory/performance QA. Existing Home gate status is unchanged.
