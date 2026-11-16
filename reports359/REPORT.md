# Build359 — Broxton reference physique and rebuilt locomotion

Checkpoint: `checkpoint-before-broxton359`, commit `4b732520cc99379c2ed91aae5359a1ad819fa178` (Build358).

## Changes

Used the supplied burgundy reference as the body standard: broad chest/shoulders, substantial deltoids and muscular arms/forearms, thick neck and stronger legs. Redrew the mapped body atlases, rare-pose atlas and both movement cycles. Burgundy top, black full-finger gloves, black cargo pants/boots, tiger tattoo, fade/goatee, stud, watch and support remain. The previously corrected, already muscular knee-hold pose retains its dedicated asset. Body mass comes from redrawn anatomy and a broad three-quarter view, without a horizontal-stretch rendering shortcut or a height increase.

Rebuilt the walking pose guide around a higher hip, straighter support leg, lower swing clearance and opposing arm motion. The previous guide placed the hip too low and kept the stance knee bent. The new walk and run maintain a consistent broad three-quarter torso, replacing the narrow side-on movement depiction. Both cycles have twelve distinct whole-body frames. Visual stride calibration is88 local units per walking cycle and136 per running cycle; native movement speeds remain145/210. Actual displacement still drives the phase with depth/scale compensation. When movement is blocked, the renderer now returns to a neutral pose instead of holding a frozen mid-stride image.

Recalibrated all24 weapon hand sockets against the new gloves and checked the carried-pipe captures. Native combat, controls, damage and action priority remain. Added a body/pose comparison and an upper-body coverage audit because frame-count tests alone had missed the earlier visual problem.

## Files

`dist/broxton359-data.js`, `broxton-body359.js`, `broxton-gait359.js`, `assets/broxton359/`, `downtown359.html`, `game359.js`, canonical `index.html`; fighter-render manifest; `tools/broxton359/`, `source-art/broxton359/`, `reports359/`, AGENTS.md and capture exclusions. Built-in image generation redrew the raster assets; final prompt set is `source-art/broxton359/prompts.json`. Source reference and pose guides are retained there.

Full campaign source and prior builds remain. Hosted review retains the existing Downtown scope. Only superseded Broxton atlases are omitted from the bounded review artifact.

## Tests and evidence

- Passed1,187 native asset/render/movement checks:181 mapped body bindings and ground anchors;12 distinct frames per gait;24 direction/rate cases; stationary/pause/teleport handling; combat-state priority; black glove sockets and carried-pipe movement. Final capture456 frames/7.6 seconds, including unarmed/armed walk/run. Recording starts earlier in the test lane so motion does not end against its boundary.
- Passed separate consecutive-frame checks for walk/run x4 directions x30/60/120Hz. All12 frames occurred in order without omission. Additional checks confirm blocked motion returns to neutral and actual displacement selects the gait.
- Passed wardrobe audit for205 body/gait slots,24 black glove sockets and12 unique frames per cycle. The shade-aware burgundy classifier accommodates the new reference's desaturated cloth highlights/shadows.
- Body-coverage audit passed: in common staging, opaque upper-body area averaged1.50x Build358 for walking and1.23x for running. This measures the rendered silhouette and camera view, not biological muscle volume; the visual comparison remains necessary.
- Final full canonical renderer boot passed:189 modules,77 owners,1,071 images,181 final body anchors, shared-source restoration and unchanged native combat prototype. Final capture verification was repeated against the full canonical renderer.
- Broxton179, Broxton244 and simulated DualSense/raw Sony/DSX controller tests passed. JS syntax and source/shipping launch dependencies passed.

Evidence: `body-and-walk-comparison.png`, `broxton-walk-full.png`, `broxton-run-full.png`, `weapon-walk.jpg`, `weapon-run.jpg`, `verification.json`, `frame-order.json`, `asset-audit.json`, `mass-audit.json` and `final-boot.json`. Separate downloadable video: `Broxton359-Physique-Walk-Review.mp4`. These are native simulation captures, not browser or physical-controller footage.

Resolved during QA: initial guide-based weapon sockets required visual recalibration; the recording's previous start position reached the scene boundary early. No unresolved failures in executed checks.

Untested: physical DualSense, browser performance, full campaign playthrough, every interruption/weapon/scene combination and final player acceptance of the visual gait. Existing manual/performance holds remain. Next: player review of the updated physique and normal-speed walk/run in Downtown.
