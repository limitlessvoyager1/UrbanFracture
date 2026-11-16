# Gate 9 — combat-plane and contact accuracy

Baseline: `2d8f4e3b154d769bac2ced871f66832563528b2d`.
Checkpoint: `checkpoint-before-plane304`.

## Corrected behavior

- Saito’s successful capture invalidates the interrupted hero attack, including stale callbacks and remaining targets in the same invocation.
- Reina’s three standing kicks use the current authored full-leg poses rather than old strike coordinates. Existing normalized active phases prevent damage at the exclusive recovery boundary.
- Saito evaluates current Reina/Niko move categories and Niko’s real contact clock, preserving native reaction delay and counter odds.
- Bank weapons and target weapon boxes use the same1.12 scene conversion as the sprites.
- Martial/weapon hurtboxes share the renderer’s exact visual height. Logical plane coordinates and jump trajectories remain unchanged.
- Entry-protected targets reject Niko/weapon contacts.
- Developer Menu → Gate9 · Actual Contact Diagnostics shows actual candidate, intersection and resolved outcome data, current geometry and JSON export.

Approved damage, timing, cooldowns, AI weights, distinct lane thresholds and Normal3-point/2-commitment limits are preserved.

## Verification

Final full release run: **171/171 automated suites passed,0failed;5manual items not executed.** `sourceChangedDuringTests=false`. The runner exits2/needs-review because manual gates remain, not because an automated test failed. Source fingerprint: `afe6078c3c90c5ad514fc11d7bbf03c28a01c6ade7427328c28b566055e962e2`. See release-validation.json. The prior completed run passed170/171; the failure was a historical source-byte comparison that did not yet account for the exact Gate9 martial adapters. The original assertions remain; only the exact adapter-reversal helper was added. Its2,195 knockdown assertions then passed. The initial close-range prototype regression and interrupted run remain archived rather than hidden.

| New suite | Assertions |
|---|---:|
| Native runtime/ownership/plane/source proofs |4,580|
| Weapon geometry and compatibility |8,210|
| Native renderer/pose geometry |258|
| Developer UI logic |11|
| Shared renderer-height equivalence |1,774|

All1,800 recorded frames match fresh native simulations, including HP, positions, action state, world time and contact receipts. Six seeded40-second group trials recorded no threat-budget violations. Isolated mirrored successful-counter fixtures preserve the3/2 cap. Natural counter frequency was not established by those group trials.

## Evidence

- [Normal speed](before-after-1x.mp4)
- [Half speed](before-after-05x.mp4)
- [Quarter speed](before-after-025x.mp4)
- [Current contact overlay](contact-overlay.png)
- [Baseline geometry](baseline-geometry.jpg)
- [Corrected geometry](after-geometry.jpg)
- [Root-cause audit](AUDIT.md)
- [Implementation and file inventory](IMPLEMENTATION.md)

The clips use actual native sprites, clocks and simulation over an explicitly labeled neutral laboratory floor. Before/after conditions and seeds match. Isolated fixtures use1,000HP, with production HP/damage unchanged. The Niko counter example prearms the native fourth-hit lab setup; it is not an earned-combo or AI-selection-frequency claim.

## Limits

Native rendering and UI logic were tested; no fresh browser session or physical DualSense test was certified. Five existing manual acceptance items remain separate from automated tests. Saito/Akari retain abstract native reach profiles rather than per-pixel limb masks; pose-sheet offsets alone do not demonstrate a false hit and were not used to justify changing approved ranges. Existing recorded-frame navigation is telemetry review, not world rewind. This gate does not certify every move, level, art judgment or human balance outcome.

Gate10 has not started.
