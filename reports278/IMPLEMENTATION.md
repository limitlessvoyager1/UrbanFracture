# Build278 — Reina advancing three-kick combo and developer opponent selection

Recovery checkpoint: `checkpoint-before-reina278`, commit `e16b3ef429fad99718fc6eef4435c1de641d09b7` (Build277). Restore through a new reviewed revert/version; do not discard subsequent work with an unreviewed hard reset.

The supplied 17.43-second video contains three example sequences. The third sequence, near12–15seconds, has three kicks: roundhouse, jumping tornado roundhouse, spinning hook kick. The first two examples are two-kick sequences. This build follows the three-kick example.

## Combat

Extend existing Combat134/Audit135, native damage/knockdown and Combat274 reaction owners. No replacement combat/input controller. Three deliberate Attack presses, opener confirmation and whiff/recovery restrictions remain. A held button does not automatically complete the string. Existing charge, blitz, weapon and grab systems retain their inputs.

| Kick | Total frames | First contact | Active interval | Damage | Forward travel | Added target travel |
|---|---:|---:|---|---:|---:|---:|
| Roundhouse |22|10|10–14|7|22|35|
| Tornado roundhouse |30|17|17–21|8|38|45|
| Spinning hook |38|22|22–27|10|40|native knockdown|

25total base damage preserves the former combo's total. All distances are logical world units and clamp to valid bounds/solid props. First two pushes ease over10frames in addition to native hit displacement. Source-derived shin/foot segments determine contact. Every eligible target is hit at most once per kick; wrong-plane, behind, held, airborne, wake-protected and invulnerable targets retain their exclusions. Committed heavy armor retains its established rules. Clean first/second kicks interrupt ordinary attacks and apply33/38frames of stun; actual Combat274 telemetry/reassessment uses those durations. Third kick uses native knockdown and recovery. No idle snapshot substitutes for an enemy reaction.

The root's facing and combat plane are latched per action and carried into queued kicks. A regression test caught and corrected native free-movement occurring on the tick between queued actions. Near an edge, the advance stops short of an eligible target instead of passing through it. The current melee source art uses a fixed scale across all16poses. On the same combat plane, Reina draws over the enemy during her kicking action so her contact leg stays visible; unrelated scenery layering remains unchanged.

## Developer menu

The existing F9 / L3+Options dashboard receives an Enemy practice dropdown and Start practice link. It opens the current hero against the chosen enemy in a separate tab with the native game renderer, keyboard/gamepad controls, fixed-step loop, AI Director and production enemy factories. The original campaign tab and its encounter objects remain intact. Practice suppresses campaign waves/transitions and does not overwrite the saved environment. Restart duel resets both fighters; ordinary Restart/retry paths also retain the selected opponent and dismiss end/pause overlays. Close the tab to return.

23available opponents: Saito, Akari, Flint, Marcus, Bruno, Jackal, Frankie, Carmen, Kevin, Brick, Jesse, Otis, Leroy, Gus, Casino Security, Aidan, Colt Dawson, tavern Aidan, Prison Guard, unarmed Flint, regular/heavy Dock Workers and Torrance Baylor. Registry entries without an isolated adapter remain disabled and labeled; Spectre is metadata-only in the existing build. No generic impostor is spawned for an unsupported specialist. This task does not certify new specialist practice adapters or add unimplemented enemies.

## Files and execution

Simulation: combat134.js, audit135.js, combat274.js, core.js. Art/metadata: reina-repair134.webp, repair134-data.js, import-reina278.py and art-source278. UI/integration: practice278.js, audit-view135.js, game.js, environment-ui156.js, index.html. Existing query-only repair259 harness adds five deterministic combo-frame buttons. Existing audit135/combat134/reina269 fixtures migrate intentionally superseded jab timing/damage/stage counts; no protected-target, exact-hit or recovery assertions removed. Historical header/comment proofs exclude deliberately edited files instead of claiming their bodies remain identical.

Run `node tests/reina278.cjs`, `python tests/reina278-assets.py`, `node reports278/input.cjs`, `node reports278/baseline.cjs`, then `node tools/qa242/run.cjs --profile release`. A release exit2 means manual review remains, not an automated failure; inspect the actual report. Manual art/balance/controller/screenshot gates remain open.
