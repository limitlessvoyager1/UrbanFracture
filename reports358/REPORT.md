# Build 358 — Broxton burgundy top and black gloves

Checkpoint: `checkpoint-before-broxton358` at `1a28ef588bd841c245ecee3aa8573a64278168ba` (Build357). Restored this saved source after the earlier transient checkout was no longer present.

## Implemented

Deep burgundy (#800020 material reference) sleeveless top and fitted black full-finger gloves throughout the 181 mapped body-pose slots, HUD portrait, twelve walking frames and twelve running frames. Natural highlights/shadows vary. Preserve his face, short fade, goatee, tiger tattoo, pants, boots, watch and support. Built-in image editing produced the revised atlases; final prompt sets are in `source-art/broxton358/prompts.json` and `correction-prompts.json`.

Walking and running remain separate complete sequences of twelve distinct whole-body frames. The production renderer uses each frame consecutively and advances from actual distance traveled, preserving its depth/scale compensation. No timed idle stepping or replacement with a partial four-frame cycle. The gameplay/controller logic and gait implementation match Build357 except version namespaces and wardrobe labels. Existing per-frame hand sockets and hand-over-weapon occlusion remain calibrated to the new black gloves. Native combat, jump, damage, grab, block and knockdown states retain priority.

The garment audit caught one heavily occluded combat pose with a black shirt (`combat179/5`). A dedicated correction now supplies the burgundy top and both fully gloved hands for that pose. The final body binding explicitly uses this corrected asset. Unused atlas cells are cleared during packing, removing an image-generation artifact outside the occupied pose cells.

## Files

`dist/broxton358-data.js`, `broxton-body358.js`, `broxton-gait358.js`, `assets/broxton358/`, `downtown358.html`, `game358.js`, canonical `index.html`; fighter-render manifest; `tools/broxton358/`; `source-art/broxton358/`; this report/evidence and AGENTS.md. Prior source/builds remain. The bounded hosted artifact retains the existing Downtown review scope and omits superseded Broxton356/357 atlases only from `out`.

## Verification

- Passed 1,187 native rendering/movement assertions: 181 body-pose bindings/ground anchors; 12 unique frames per gait; 24 walk/run/direction/frame-rate cases; stationary/pause/teleport behavior; combat-state priority; carried pipe movement; all24 black glove grip pixels. Recorded456 native simulation frames /7.6 seconds. Gait art was unchanged by the later isolated combat-pose correction.
- Passed a separate consecutive-frame audit in24 native controller cases: walk/run x four directions x30/60/120Hz. All twelve frames occurred in order without omission.
- Final asset audit passed all205 body/gait slots for visible burgundy cloth; all24 glove grip sockets were opaque and black; both movement atlases contained12 unique frames.
- Final full canonical renderer bootstrap passed after the correction:189 modules,77 owners,1,071 images,181 final body bindings/ground anchors, restored shared sources and unchanged native combat prototype.
- Broxton179, Broxton244 and Broxton244-controller suites passed. Controller inputs were simulated standard DualSense/raw Sony/DSX, not physical hardware.
- JS syntax and canonical/shipping dependency/launch-order checks passed. Missing checkout-local build dependencies were restored from their pinned lockfiles before packaging.

Final failed checks remaining: none in the executed suites. The costume exception and missing local dependency were corrected and checked again.

## Evidence and limits

`broxton-walk-full.png` and `broxton-run-full.png` show all production frames in order. `weapon-walk.jpg`, `weapon-run.jpg` and `corrected-combat-pose.png` show the final visual checks. `verification.json`, `frame-order.json`, `asset-audit.json` and `final-boot.json` retain results. The separate downloadable `Broxton358-Walk-Run-Review.mp4` is a native simulation capture, not browser or physical-controller footage.

Untested: physical DualSense, browser performance, complete campaign playthrough, every weapon/interruption/scene combination and final player acceptance of the gait feel. Existing manual/performance holds remain. Next: review the updated Broxton in the deployed Downtown build.
