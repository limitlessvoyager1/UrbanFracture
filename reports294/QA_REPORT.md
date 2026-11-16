# Subway, combat presentation and enemy ground contact — Build294

Recovery checkpoint: `checkpoint-before-subway-combat294`, Build293 commit `1b4352222a6bfe1970ef5be463326e8e0a213a9f`.

## Confirmed causes and corrections

- Grounded enemy rendering inherited a whole-body knockdown bounce: the actual production `zheight` returned20 world units at .16 seconds. Grounded enemies now return0. Airborne flight, jump, held throw and hero behavior retain their native height calculations. The final native body raster is registered to its own combat-plane floor, including down/get-up poses, without changing its dimensions, physics or location. Specialized paired throws, pool/pit and wake-up presentations retain their own owner. This corrects Flint and prevents the same resting-anchor defect across the implemented roster. Actors on different combat depths retain different screen y coordinates; they are not teleported onto Reina's plane.
- Subway running adults used an assumed115-unit source height even though their extracted frame family had a different source height. They now use the measured family height and the same195.5 adult reference as stationary civilians. Panic movement and complete frame cycles remain.
- Reina is5% smaller through the shared actor scale and corresponding hand/grapple transforms. Her block no longer adds a sinusoidal whole-body displacement. Frankie’s generated melee source family receives a fixed .92 import calibration across all its poses; no per-frame size normalization.
- Reina's chain has alternating long linked lash and low sweep attacks. The hand-attached rendered chain and damage checks use the same segmented curve. The sweep knocks down; successful contacts consume one use per action and misses remain free.
- Reina's first three held combo impacts now produce hit-triggered original-identity recoil while preserving ownership, floor and native damage. Flint closes to a tighter depth alignment before starting a swing.
- Ordinary Bruno evaluates an eligible incoming jump ahead of generic reposition/guard selection. Random anti-air refusal no longer rejects his eligible uppercut. Native protections, recovery, attack commitments and range remain mandatory. Uppercut cooldown is5seconds, retained if interrupted.
- The train ends in an original engineer cab with grounded console/seat. The final required crew is3normal Workers and1heavy, in reflective lime vests. Adaptive encounter selection cannot substitute unrelated types. There are at most2locks. All required enemies must be defeated and the hero must reach the engineer seat before the destination option becomes available. Existing environment/controller/progression systems remain.

## Execution evidence

- `ground-checks.json`:483 rendered assertions across30 enemy identities, four down/get-up ages in both directions; nonempty native bodies and floor bounds within1local pixel. Also planted block and held Flint impact checks. `ground-anchors.png` is a candidate contact sheet.
- `world-anchor.json`:13 checks against the actual production renderer height function; old Flint lift20, corrected0. Flight, held, jumping, Gunner and hero behavior comparisons passed.
- `tests/review294.cjs`:97 assertions covering actual production anti-air admission and cooldown, chain damage/reach/durability, held impact events, and seven-hero train progression rehearsals. Enemy offense is disabled only in the layout/progression rehearsal; this does not certify human fight balance.
- `scene-run.log` and `civilian-scale.json`:actual image-backed civilian measurements and cab/chain scene rendering. `Engineer_Cab.png` and `Reina_Chain.png` are review candidates.
- Browser:Build294 launch, subway presentation and isolated Reina/Flint practice loaded. The browser capture is `browser-practice.jpg`; it does not prove a complete campaign playthrough or all animations.

Fresh frozen release:146 executed,146passed,0failed,5manual checks not executed. Source fingerprint did not change during execution. Gate:needs-review, stable=false. See final-release.json and release.log. The runner exits2 for pending manual review, not for an automated failure.

Full reaction roster:22507 assertions across30identities and2520actual mirrored pose samples passed. One assertion compares retained historical290native traces; it is not a new294mechanics comparison. See roster-validation.json and roster.log.

The initial run was blocked by two stale expected formulas:Reina’s prior size and the previous civilian source-height denominator. Those tests now assert the approved294size reduction and measured source-height formula; all unrelated assertions remain. Targeted reruns and the complete fresh release passed. The initial failed report/log are retained. No unexecuted check is a pass.

## Limits and rollback

Physical DualSense, owner-approved screenshot comparisons, exhaustive all-moves coverage, human art review and human balance approval remain separate manual checks. The roster tool's historical290 native trace equality is historical evidence only; it must not be represented as proof that Build294's intentionally changed mechanics are identical to Build290. The new ground checks concern sampled rendered states, not every possible specialized throw/water/wake-up frame.

Restore the checkpoint commit/saved Build293 to roll back the build. Developer-panel Restore Defaults only affects temporary experiments. No approved screenshot baseline was replaced. Existing passenger-car art and all other approved bitmap assets remain unchanged; the previously unused legacy car238 slot is replaced by the new cab, with its original and generated source archived. See ART.md.
