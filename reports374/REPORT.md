# Build374 — Delayed offscreen backup entry

Checkpoint: published Build373 source69796cdcb0885de2e80576f99eebcb6a8fd39a22, tag checkpoint-before-backup374.

Fixed two causes of the visible pop-in: the old factory clamped caller-relative spawn positions into the playfield, and the shared controller let the native entry cooldown replace ENTER after its first frame. That prematurely marked an ally ready and allowed follow movement to clamp the still-offscreen actor into view.

Backup now waits3–4 seconds after successful connection, then creates both actors fully outside the current960-unit camera viewport with180 units of clearance and96 units of separation. They walk through the native entrance timeline. The closest clear left/right street route is preferred; a clear offscreen foreground route is available if both sides are obstructed. Solid-prop path checks choose routes. If none is clear, the same paid request waits and retries rather than spawning through a wall. Decorative doors/stairwells are not invented as functional entrances.

ENTER now stays active through native entrance completion, including its cooldown. Entry resumes after an interruption. Readiness requires no active native entrance; no attacks start while entering. The shared20-second timer starts when the first ally actually completes entrance. Position history updates each simulation step for continuous render interpolation. Existing energy cost, cooldown, names, attacks, completed-roster selection and configured Colton rarity are retained.

Changed files: dist/backup365.js (delay), dist/backup371.js (entry planning/factory), dist/support370.js (entry lifecycle/readiness), both HTML source entries (Build374/cache versions), retained specification, tests and reproducible tools/backup374 scripts. No fighter artwork or unrelated character/level behavior was changed.

Verification:
- PASS18,029 entry/delay assertions across30/60/120 Hz, both camera sides, two world camera offsets, continuous bounded motion, completed native entrances before readiness, blocked-route waiting/retry, one payment, pause and cleanup.
- PASS145 existing role-combat assertions and3541 phone assertions; arrival-related waits updated for the requested new timing.
- PASS shared-controller/selection suite and three simulated-controller regression suites. Physical DualSense hardware is not certified.
- PASS native rendered entrance sequence and video. Actual current sprite owners produced zero visible actor pixels at creation; subsequent frames show continuous walking across the edge. Evidence: entry-sequence.png and entry-preview.mp4. This is native Canvas/simulation evidence; browser performance and hardware are not newly tested.
- PASS bounded package exact-source/retained-asset and256MiB-cap verification. Deployment remains the established Downtown review scope; complete source/art stay retained.

No known failing checks remain. The broader staged roster and hostile-retargeting work remain separate from this entry correction.
