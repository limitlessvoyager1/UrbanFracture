# Build370 — Syndicate Backup, Assignment 2

Implemented the next staged assignment from the original specification: tactical selection and one shared Friendly Support AI controller (Gates 5–6). This is a foundation review, not a complete reinforcement mechanic.

## Checkpoint

Previous published source: `0b79195dcb0f7d2c534b3bacc82046d535aab995` (Build369). Local checkpoint tag: `checkpoint-before-backup370`. The previous Broxton idle/walk/run and phone atlases are retained without image edits.

## Changes

- `dist/support370.js`: seeded tactical pair selection, role-provider registry, common support state machine, isolated friendly attack commitment and native actor/action lifecycle bridge.
- `dist/backup365.js`: connection/arrival hooks, support cleanup, first-combat-ready timer, staggered actor readiness, persisted selection serial. Existing phone controls and resource rules retained.
- `dist/backup-view365.js`: responder-selection stage messaging.
- `dist/index.html`, `dist/downtown360.html`: current native load order and Build370 review label.
- `specifications/syndicate-backup-user-spec.md`: retained original user implementation specification.
- `tests/support370.cjs`, updated `tests/broxton366.cjs`, and `tools/backup370/`: verification and reproducible package scripts.

## Mechanics

Successful connection chooses exactly two distinct responders. Cutter has a separate first roll with a 5% chance; he never enters the ordinary tactical pool. The remaining slots use 75% normalized tactical suitability plus 25% uniform variation, with complementarity on the second pick. Inputs include melee/ranged/heavy/aggressive threats, distance outside grab range and nearby crowding. The selector reuses `UrbanEnvironment156.Random` and its hash with a separate stream derived from scene seed, zone and request serial. It does not advance weather randomness. `FriendlySupport370.select(game, requestId)` exposes reproducible developer diagnostics, including context, weights and roll receipts.

The single shared controller implements ENTER, FOLLOW, ACQUIRE_TARGET, APPROACH_IDEAL_RANGE, POSITION, ATTACK, RECOVER, REASSESS, HITSTUN, KNOCKDOWN, DEFEATED, DISENGAGE and EXIT. All five roles use the same engine. Providers supply native actor creation and exactly two complete move definitions; their finished art and attacks are later assignments.

Movement uses native bounds, ground-plane bounds, walk phase and Companion126 solid-prop path checks. Combat uses native `start`, registered move impact adapters, native damage, hit reactions, knockdown and entry progression. Allies are independent handles outside the hostile enemy list. No temporary player substitution, invisible damage, dog-controller reuse or hostile Director budget changes.

Only one ally owns an attack commitment, held through startup, active frames and full recovery. A 0.35-second shared response gap and 0.65-second target-pressure gate supplement normal hitstun/wake checks. The other ally positions or follows. Turn ordering gives the previous attacker lower admission priority. Targets are ranked for Broxton grabs, attacks on Broxton, dangerous nearby startup and ideal range. Invalid/dead/protected/staged/offscreen/wall-blocked targets are excluded; chase attempts are bounded to three seconds and a 600-unit player leash. Guarded targets are conservatively declined until role adapters implement their approved guard behavior.

The shared 20-second participation timer begins at the first actor's combat readiness; a later second arrival cannot extend it. Exit/death/scene/reset/load cleanup releases commitments and actor references. Full hostile retargeting and production exit choreography remain Assignment 6.

## Actual frame data and assets

| Sequence | Startup / phase | Active / phase | Recovery / phase |
|---|---|---|---|
| Phone call, 141 frames | Reach 0–12; retrieve 12–21; dial 21–45; lift 45–54 | Ring 54–114; connect/pay/select at 114; speak 114–126 | Pocket 126–141 |
| Temporary QA punch adapter only | 12 frames | 4 frames | 24 frames |

Phone resource rules remain 30 energy, 90-second successful-call cooldown, five-second preconnection interruption retry and 1–2-second arrival delay. No HP substitution. Phone art remains the existing 24-frame `assets/broxton366/call.webp`; idle/walk/run remain Build369. No new fighter artwork or final move animations were added or certified. QA deliberately reuses existing thug art and two test punch adapters, clearly labeled temporary.

## Verification

- PASS: 158,169 assertions in `tests/support370.cjs`. Across 40,000 reproducible selections there were no duplicate pairs and 1,981 Cutter calls (4.9525%). Context suitability, independent rarity, actor registry, native damage admission, guard/plane/range exclusions, solid-prop blocking, target priority, turn-taking, complete recovery, hit interruption, pause, death, cleanup, bounded chase and serial persistence were checked. Native action completion tested at 30/60/120 Hz.
- PASS: 3,541 phone lifecycle/resource/input assertions in `tests/broxton366.cjs`; updated the former manual answer expectation to automatic responder selection.
- PASS: six regression suites — gamepad, controller recovery, controller157, Broxton179, Broxton244 and Broxton244 controller. Controller tests simulate DualSense/raw Sony/DSX input; physical hardware is not certified.
- PASS: retained idle/walk/run transition and consecutive frame-order tests (219 transition assertions and all 24 movement cases).
- PASS: six native rendered snapshots in `native-review.png`, using actual production sprite owners with clearly labeled temporary test actors. `render.json` records the simulation states. This is native Canvas rendering, not browser gameplay certification.
- PASS: deployment package verification — 573 exact source strings, 465 retained entry scripts, 1,150 byte-identical retained assets, estimated expanded archive 268,363,264 bytes under the 268,435,456-byte cap. Source campaign assets are preserved; deployment remains the existing Downtown review scope.
- Native simulation benchmark: 4,816 ticks across eight temporary-actor scenarios, 1,406.9 ms total, about 0.292 ms per tick on this host. This does not measure browser FPS or low-end hardware performance.
- No known failing checks remain. Browser play, physical controller testing, final voice recording, finished five-defector artwork/moves, hostile target diversification and full encounter balancing are not tested/complete in this assignment.

## Live review behavior and next assignment

Normal play selects and names the two responders with their dialogue. Production role providers are intentionally unregistered: on reaching the arrival point the HUD identifies pending fighters and releases the request while retaining its cost/cooldown. It does not spawn unfinished thug stand-ins into normal gameplay. Temporary actors exist only in automated QA/render scripts.

Stop point: Assignment 2 foundation verified. Next is Assignment 3: Bruiser and Gunner, each with their specified two moves, full-body art, complete frame sets and native combat/animation QA. Hammer/Enforcer and Cutter follow in their separate assignments before full hostile/ally encounter integration.
