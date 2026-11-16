# Chemical vulnerability update — Build 214

Reversible baseline: `checkpoint-before-chemical214`, Build 213 (`2de5cc435c65228994ec7bcd3e8a61afb7ffdf5f`).

Lab166 remains the sole flask/puddle pool. Its native release-time target snapshot, .58s windup, .95s flight, 3.1s cooldown, two-slot capacity, five-second puddles and worker melee artwork are preserved. Chemical214 extends that controller and the existing Director; it does not replace either.

## Normal settings

| State | Behavior |
|---|---|
| Acid | 1.25 offensive decision weight; 4 damage per .5s maximum across overlapping acid pools; no input restrictions |
| Sticky slowdown | 1.25s; 55% ordinary movement displacement, including Nova running and Orion boosters; attacks retain their native movement/timing |
| Full restraint | At most .5s; actively held directional block only; fixed logical root/facing, native guard/chip/meter/damage |
| Retrigger protection | 4s after release, full-restraint protection only, no damage immunity |
| Sticky aggression | 1.40 offensive decision weight; bounded probabilistic positioning decisions; no cooldown, speed or damage increase |
| New unblockables after release | Wait for .3s actual free defensive actionability; not merely elapsed time |

A hero must remain in adhesive through the slowdown to be fully caught. Owned synchronized interactions are not interrupted. If multiple attacks already have legitimate commitments, full capture is deferred rather than canceling them or trapping the hero beneath multiple threats. Existing precommitted attacks remain legitimate, and may still hit. Full restraint admits at most one new frontal blockable threat, after an observable .18s reaction delay and normal native startup/admission. No new firearm, taser, grab, flask, bomb or unavoidable boss commitment is admitted. Ordinary missed attacks remain misses; the vulnerability never applies direct melee damage or target snapping.

Acid plus restraint applies pressure relief when health is below 35% or recent damage reaches 15% maximum HP. No offensive cooldown is shortened. The old Lab166 `.65 * dt` cooldown acceleration has been disabled. Enemy defense, individual recovery, gunfire coordination, pressure budget and character-specific decisions remain authoritative. Ranged/chemist roles retain spacing behavior.

All six heroes use the final native sprite renderer with a fixed lower-body clip and responsive guarding upper-body clip. Orion uses his existing grapple15 guard study for the upper-body guard. There is no sprite resize. Adhesive strands fade as restraint expires.

## Diagnostics and checks

Hidden Audit135 report now includes `chemical214`: stage, timers, acid, overlapping hazards, permitted controls, blocking, defense, aggression weight, pressure cap/current commitments, last admission rejection and recent approach decisions. `chemical214.html` provides frame stepping, all-six-hero selection, block toggling and mixed-hazard staging.

- `tests/chemical214.cjs`: six heroes at 30/60/120Hz, block-only input, immediate release/retrigger immunity, native incoming damage, nonstack acid, one offensive commitment, rear/unblockable denial, actual defensive-action timer, no forced contact, unchanged flask target/timing, preserved cooldown, six-hero movement slowdown including booster/running overrides, fixed-scale render calls.
- `tests/current214.cjs`: retained Flint211, Martial212 and Jesse213 suites with final chemical wrappers installed.
- `tests/current150.cjs`: 26 historical/current regression suites passed.
- `tests/gamepad.test.cjs` and `tests/controller157.cjs`: mapping/device regression passed. No physical controller claim.
- Browser inspection: all-six-hero restrained guard poses, release frame and guard/struggle toggle. This is controlled visual verification, not a completed human Normal-difficulty playthrough.

Developer-only pages with duplicated script dependency lists now use the existing shared review loader. Their unique inspectors remain; no artwork was recompressed to accommodate this change.
