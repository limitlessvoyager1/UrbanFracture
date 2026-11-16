# Build 357 — Broxton full locomotion and burnt-orange top

Recoverable checkpoint: `checkpoint-before-broxton357`, commit `bb62862b305a8c372dac75d936bc850ee2987acf` (Build 356).

Replaced Broxton's truncated four-frame walking renderer and older running path with separate twelve-frame, whole-body walk and run cycles. Both include alternating steps, passing poses, foot lift and arm counter-swing. The new presentation follows actual distance traveled, compensates for the existing depth-movement ratio and character scale, and preserves phase across walking/running changes. Repeated renders, pauses, stationary movement and teleports do not advance the gait. Attacks, jumps, damage states, grabs, knockdowns and blocking retain native renderer priority. The native controller, physics, combat prototype, speed, damage and input bindings remain unchanged.

The tank top is now burnt orange (#CC5500 material reference) across 181 existing source-pose slots, the HUD portrait and both twelve-frame movement sheets. Lighting and shaded folds vary naturally. Pants, boots, tiger tattoo, face, hair, watch, stud and support retain the bouncer identity. Frame imports use uniform scaling and grounding; no separate limb stretching. The new gait uses dedicated, visually calibrated per-frame weapon grip sockets and foreground hand occlusion. All 24 sockets were checked against opaque hand pixels and the final weapon captures were visually inspected.

## Files changed

- `dist/broxton357-data.js`, `dist/broxton-body357.js`, `dist/broxton-gait357.js`, `dist/assets/broxton357/`.
- `dist/index.html`, `dist/downtown357.html`, `dist/game357.js`, fighter-render manifest.
- `source-art/broxton357/`, `tools/broxton357/`, `reports357/`, AGENTS.md and capture exclusions.

The canonical campaign entry and Downtown review explicitly load the new data/body/gait modules before gameplay. Broxton remains the default Downtown test hero. Full campaign source and prior builds remain in the repository; the hosted review remains Downtown-only. Superseded Broxton356 atlases are omitted only from the bounded hosted artifact.

## Verification

Passed: 1,163 targeted assertions; 181 pose-slot bindings and ground anchors; unchanged native Brawler prototype; twelve unique walk and twelve unique run frames; all twelve frames observed for walk/run in four directions at 30/60/120 Hz (24 cases); stationary/repeated-render cadence; teleport rejection; combat-state priority; carried-pipe walk/run and 24 opaque hand sockets. Final native capture: 456 frames / 7.6 seconds, normal speed, showing walk, run, pipe walk and pipe run with scrolling Downtown art.

Passed: Broxton179, Broxton244 and Broxton244-controller regressions. Controller test uses simulated standard DualSense/raw Sony/DSX inputs, not physical hardware. Full canonical renderer bootstrap passed: 189 modules, 77 owners, 1,070 images. New JS syntax and canonical/shipping HTML dependency/launch-order checks passed. Hosted files total 257,457,506 bytes before tar headers; archive expansion is checked before publication.

Visual review caught and corrected initial weapon-hand offsets. The depth fixture was adjusted to reset within the native lane rather than testing movement against its boundary. Final executed targeted checks have no unresolved failures.

Evidence: `broxton-walk-full.png` and `broxton-run-full.png` display every production frame in runtime order. `Broxton357-Walk-Run-Review.mp4` is a native simulation recording, saved as a separate downloadable artifact. It is not browser or physical-controller footage.

Untested: browser performance, physical DualSense, complete campaign playthrough, every possible interruption/weapon/scene combination, and final player acceptance of gait feel. Existing manual/performance holds remain. Next: player review in the deployed Downtown build.
