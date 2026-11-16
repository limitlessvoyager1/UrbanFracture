# Orion current-adapter coverage pass

This pass adds QA assertions and matrix bindings without changing any gameplay source. Accepted PR #12's source and evidence remain unchanged. Registry coverage remains `pilot`, all fifteen features remain `partial`, and no row becomes certified.

## Current and superseded rows

The original matrix had twenty Orion definition/ability rows without assertion bindings. Nineteen correspond to active command/data paths tested here. The remaining `orion/combat/counter` row is an older 24-damage definition retained in `Orion205.config.moves.counter`; current R1 capture and follow-up use `Counter248` instead. Exercising that old table directly would not prove current input coverage.

The old row is retained with a `superseded-definition` annotation and negative input-route assertion. Its execution status can become `supersession-verified`, never `partial-assertions-passed`. Four new `orion/current-counter/` rows describe punch, kick, short-weapon and long-weapon variants. The matrix now contains 97 rows overall, including 24 Orion rows: 23 active rows can have partial passing assertion evidence and one row can have verified supersession. These are definition/ability rows, not a claim that all distinct moves have been enumerated or certified.

## Fixtures and assertions

`tests/qa242-orion-current.cjs` uses the existing current 219-module simulation adapter, with isolated seeded RNG/clock and unmodified native combat controllers. It imports no executable Orion205/228 test or old fixture loader. Enemy AI/reinforcement are disabled solely to isolate the regular-target fixture, as in the existing current-adapter suites. Actors are positioned relative to the real scene camera/bounds; no native admission, collision, damage or timing method is replaced.

The suite has 119 cases. Positive groups run both facings at 30/60/120Hz, with independent expected damage/timing constants:

- Four separately selected combo stages: 5/6/7/12 damage and their native durations.
- Neutral grab, four directional grabs and held-target Ascension: 28/30/30/28/34/48 damage, synchronized session ownership, sampled contact frames, duration, plane/facing locks and cleanup.
- Neutral, directional knee and downward aerial attacks: 10/12/13 damage. The neutral attack begins during descent (.42s after the jump) so a grounded regular target is actually in its vertical contact region. Knee and downward fixtures begin at .04s and .32s. This does not claim coverage of all airborne target heights or jump timings.
- Current, Laser and Meteor: 17/23/22 damage, native command routes, no premature damage, finite recovery and cleanup. At the Current fixture's 150-unit target distance the wave arrives around frame40, after its frame26 startup; the test does not treat wave startup as immediate distant impact.
- Dodge: planted startup, relative-facing retreat, no offensive damage, finite completion and cooldown.
- Actual held-attack/release System Repair: planted charge, no pre-completion healing, 22HP heal/full defense, finite recovery, once-per-life availability and native respawn reset. The charge-label and repair-data matrix rows share this evidence rather than representing two independent attacks.
- Current R1 counter capture and native follow-up: punch48, kick48, short weapon38 and long weapon steal with zero damage. The old 24-damage pair definition is explicitly rejected as the current R1 route.

Four selected interruption cases cover blast recovery, Current recovery, airborne Meteor and interrupted repair. They do not establish every move's behavior at every interruption frame. Sampling tolerances account for 30/60/120Hz integration; a no-startup-damage assertion and bounded actual contact observation are kept separate from raw data definitions.

## Provenance and limits

The `orion-current-coverage` catalog suite runs through Node's test runner. Raw TAP output, exit code and `reports242/orion-current.json` case ledger are preserved by the existing immutable suite executor. Matrix bindings pin the exact test blob, assertion excerpt, line, row scope and fixture restrictions. The selected matrix run now executes nine suites; the full release catalog grows from342 to343. Passing selected suites never implies all343 were run.

Infrastructure fixtures reject malformed/orphan supersession mappings, self/cross-hero replacements, missing Orion bindings, changed source anchors, and any hardware/render inference. An unverified or failed execution cannot establish either active-move evidence or supersession. Parent ownership/impact checks, source fingerprints, pilot owner-comment gates and full game-certification checks remain in place.

Strong/boss resistance, electrical retrigger/collateral, all arena/weapon interactions, exhaustive contact boundaries, every interruption phase, artistic contact/pose review, full browser execution and real controller modes remain incomplete. The tests exercise semantic native input commands, not physical DualSense hardware or a complete gamepad/browser input path. No rendered-evidence or physical-controller dimension gains a passing assertion from this pass.

## Expanded regression orchestration

The approved ownership registry selects70 affected regressions for this QA change. The first CI attempt stopped before `campaign224` because its legacy catalog output was `PRISON224-results.json` at repository root. The reports-only containment rule remains strict. `run-prison224.cjs` now verifies the retained orchestrator's pinned Git blob, extracts its unchanged nine-child list, runs those existing assertion files, and writes the summary under `reports242/`. No campaign assertion or game source is edited. Raw child status, signal, unavailable tools and nested skips remain failures/blockers; a failed child cannot produce a complete summary.
