# Gate 8 — enemy spacing and coordination

Gate 8 only. Gate 9 has not started. Baseline: Gate 7 source `027ed578b782d4fc437e84c637d9ab37de7172d6`. Recovery checkpoint: `checkpoint-before-crowd303`.

## Confirmed causes

The existing Director had a single ordinary approach owner. Its other ordinary fighters used a small set of waiting lanes. At boundaries, clamped target coordinates could collapse multiple slots together. Staging was not aware of all solid prop footprints or occupied attack lanes. A waiting actor could therefore bunch behind an ally or attempt a direct approach through an obstruction. This is a coordination/path selection defect, not proof that attack definitions or animation assets need retuning.

The existing threat ledger already enforces the Normal three-point budget, at most two offensive commitments, native recovery, response opportunities, impact separation and specialist rules. Gate 8 retains that ledger rather than creating competing attack reservations.

## Implemented behavior

`dist/crowd303.js` wraps the existing exported Director entry points. It enrolls ordinary Marcus, Kevin, Bruno, Frankie and Carmen variants accepted by the existing ordinary-approach classifier. Workers, bosses, strong variants, laboratory, prison, dock, pool, scripted entrances and other specialized controllers remain with their established owners. Worker250 formation/rotation remains unchanged and was tested directly.

| Role | Actual behavior |
|---|---|
| Primary attacker | Stable approach lease, selected from native commitments or eligible actors using distance and measured waiting/progress. Native specialist priority remains. |
| Approach support | A second eligible ordinary fighter may approach while the ledger has room. This grants no attack commitment; native request checks still decide. It defers if two allies already occupy the close approach lanes. |
| Support threat | A unique, unclamped staging point outside solids and occupied target slots. |
| Flanker | A staging point behind the hero's current facing, reached through physical movement. No teleport or permission to bypass opposing-side attack restrictions. |
| Repositioning | No safe slot is currently available; reevaluate without inventing an attack. |
| Recovering/committed | Preserve native action, stun, ground, protected, grapple or recovery ownership. Do not move these actors to solve crowding. |

Plans refresh on the native 0.35-second role interval. A short 0.85-second approach lease reduces needless reassignment; measured lack of progress can release a stalled approach owner. Planning consumes no simulation randomness. Staging positions stay distinct at wall edges instead of clamping to identical coordinates. Planned paths are diagnostics, not claimed actual movement.

Physical support movement is bounded to 65 world units/s. Obstructed primary/support approaches use their existing character-specific base approach speeds and reach goals, including Broxton-specific grab distances. Routes use clear lanes around solid rectangles and a wider support corridor around the player, consider occupied allies, and do not enter highway collapse footprints. A bounded residual separation pass moves only free ordinary enemies away from active/recovering allies; it never pushes the hero or moves an unresolved attack/grapple. Existing displacement-based gait tracking observes the resolved movement. Stopped/blocked staging does not falsely set a walking pose.

New offensive starts from ordinary actors outside current combat bounds or inside an occupied ally attack lane are denied with the actual reason recorded. Existing hold continuations retain native ownership. Exact legal boundary coordinates remain valid. All other admission checks remain in Director148, including threat costs, two-commitment limit, native impact gaps, one grab, one Gunner attacker, anti-air opportunities, cooldowns, recovery and player protection.

Diagnostics expose actual approach owner, approach support, current position, planned target/path, role and decision reason through `Audit135.report().crowd303`, plus the existing Director role and approach279 data. The bounded decision list records actual assignments; denied requests record their actual admission reason.

## Preserved systems

No source changes to core damage, Director148, Combat274, Street209, Enemies210, Martial212, Workers233, Counters248, Reactions298, Grapples301 or Contact302. Tests compare their exact bytes against the Gate 7 checkpoint. No damage, armor, native attack timing, hitstun, counter windows, cooldowns, AI attack selection weights or difficulty rules were retuned. Easy/Hard delegate to their existing coordination behavior. Specialized native movement/capture/scene transitions remain delegated. This is not a whole-game pathfinding rewrite.

## Files

- `dist/crowd303.js`: ordinary tactical planning, physical routing, bounds/occupied-lane admission and actual diagnostics.
- `dist/index.html`: load the new module at the simulation boundary.
- `tools/reactions290/render.cjs`: optional test flags; default production-renderer loading unchanged.
- `tools/crowd303/fixture.cjs`, `audit.cjs`, `capture.cjs`: fixed-seed native scenarios, measurements and production-sprite recordings.
- `tests/crowd303.cjs`, `tests/crowd303-view.cjs`: runtime and raster checks.
- `qa/system242/suites.json`: two new critical release suites.
- `tests/reina279.cjs`: retain strict crowd bounds; measure staging across the trial rather than its final tick.
- `tools/continuity296/equivalence.cjs`, `tools/attack297/equivalence.cjs`: isolate historical visual-only equivalence from the later authorized coordination change; preserve exact baseline comparisons.

## Evidence and limits

Four scenarios use identical authored starting positions, seed 303, hero, difficulty, obstacle layout and input schedule. Each runs 900 actual 60 Hz simulation ticks. Before disables only the new module, restoring the Gate 7 controller. Recordings draw the production sprite/paired/contact renderers over an explicitly neutral diagnostic floor; the solid obstacle is labeled as a logical footprint, not replacement level artwork. Ground markers and dashed planned-path overlays are diagnostics. The normal-speed recordings contain every simulation frame; quarter-speed playback repeats these recorded frames without changing gameplay timing.

Native production-renderer contact sheets were inspected for the street, wall-edge and solid-obstacle scenarios. The comparison demonstrates less bunching and an unobstructed approach around the footprint. Complete before/after clips and per-tick traces are retained for review. Raster tests verify complete visible bodies, no clipping, repeatable paused frames and no rendering mutation of world/combat data.

The logical overlap metric is an observation (standing actors within 44 horizontal/20 depth world units), not a universal silhouette-overlap or artistic score. Some close overlap remains during contact, recoil and crowd combat. Seeded attack counts show maintained activity; they are not human balance certification. These neutral-floor captures do not certify every level's full scenery, every specialist path, physical DualSense or broad visual/animation quality. The previously unavailable browser session was not presented as successful browser evidence. Owner art approval, all-move coverage, physical controller and human balance remain manual gates.
