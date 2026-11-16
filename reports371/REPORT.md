# Build371 — Bruiser and Gunner phone backup review

## Scope and checkpoint

Continues Assignment 3 (Gates 7–8) from the staged Syndicate Backup specification. Cutter's selection gate was raised from 5% to **10%**, as requested. Prior published source: `6b5163f5743f290e372eb730627be43e8acdb89f`; checkpoint tag `checkpoint-before-backup371`.

## Implemented

- Bruiser: 85 HP, slow close-range movement, Power Punch and Grab and Throw.
- Gunner: 55 HP, faster ranged movement, Power Gunshot and Triple Shot.
- Both register through the existing shared FriendlySupport370 controller. No separate character AI engine or hostile Director budget replacement.
- Two new whole-body atlases with 32 authored poses each: idle, eight walk poses, attacks, hit reactions, fall/down and recovery. Entry/exit reuse the walking poses. Gunner's pistol and bandana remain painted into each complete figure; no detached limb animation.
- Native bounds, solid-prop path checks, actor action creation, damage, hit reaction, knockdown, projectile segment/hurtbox collision and grab protection are retained. Bruiser's ordinary-target throw maintains native hold references and victim presentation, cleans up on interruption, and launches a native flight trajectory away from Broxton. Heavy/boss grabs are conservatively declined.
- Gunner checks friendly lanes and solid cover before firing and again along projectile travel. Shots are real moving projectiles; protected targets retain native protection. A per-target suppression window prevents every burst hit from restarting stagger. Reload excludes firing. Lane obstruction causes repositioning.
- Ally damage does not award score, kills, combo credit or pickups; player/friendly attacks cannot harm allies.
- One shared attack commitment remains held through complete recovery. The first combat-ready ally starts the shared 20-second timer. The second does not extend it; both walk out afterward.
- Fixed shared-action cleanup when native damage replaces an action, and respected native post-hit reassessment when admitting the next action.
- Added a passive practice link to the Downtown review page. That developer-only route always calls the completed Bruiser/Gunner pair and disables the practice opponent's AI. Normal calls retain tactical selection across all five roles.
- Phone HUD now uses the game's logical 960×540 coordinates so resolution scaling does not place subtitles/timer outside the visible canvas.

## Frame data at 60 FPS

| Move | Startup | Active / events | Recovery |
|---|---:|---|---:|
| Power Punch | 18f | 5f window, one contact | 20f hit / 25f block / 30f miss |
| Grab and Throw | 16f | 5f catch; release at frame 56, 40f from catch | 30f after release; miss 30f after catch window |
| Power Gunshot | 16f | One launch at frame 16 | 22f after launch window; then 1.1s reload exclusion |
| Triple Shot | 12f | Three launches at frames 12, 19, 26 | 28f after final firing window; then 1.1s reload exclusion |

Provisional damage: punch 12; throw 18; power shot 10; triple shot 4 per projectile (12 total). Throw cooldown: six seconds. No unapproved thrown-body collateral is applied. Full balance certification remains a later assignment.

The existing phone remains 141 frames: reach 0–12, retrieve 12–21, dial 21–45, lift 45–54, ring 54–114, connection/payment/selection at 114, speak 114–126, pocket 126–141. Cost remains 30 energy, successful cooldown 90 seconds and preconnection retry five seconds. Existing Broxton body/idle/walk/run/phone images were not edited.

## Verification

- PASS: 40,000 reproducible selections, exactly two different roles per call. Cutter selected in 4,030 calls (**10.075%**). The independent rarity roll remains separate from tactical suitability and damage. Full selector/shared-controller suite: 156,120 assertions.
- PASS: 145 new native role assertions, covering both facings and 30/60/120 Hz, exact damage, mandatory recovery, grab resistance and post-throw protection, synchronized native hold, late active-window contact and single-hit admission, interrupted cleanup, actual projectile existence and firing count, seven-frame burst spacing, reload exclusion, friendly interception, prop blocking, scene cleanup, 20-second expiry and completed exits.
- PASS: 3,541 phone regression assertions. Existing call vulnerability, timing, resource checks and input behavior remain.
- PASS: six regression suites: gamepad, controller recovery, controller157, Broxton179, Broxton244 and Broxton244 controller. These simulate controller input; physical DualSense hardware is not tested.
- PASS: retained Broxton gait tests — 219 transition checks and all 24 consecutive movement cases.
- PASS: 152 native rendering/image assertions. Six native scenario panels in `native-review.png`; 32 distinct authored poses per role checked in both facings in `all-frames.png`. The complete-frame review uses production frame metadata; scenario panels use actual production draw owners. Artist review remains open to user feedback.
- PASS: browser preview practice route loaded. Phone payment reduced Broxton's energy from 100 to 70; both new actors appeared, Bruiser damaged Marcus and secured a grab. Browser proof: `browser-review.jpg`. No game-page console error was observed in the inspected warning/error sample; unrelated browser-extension metadata errors were present. Browser FPS, long-session stability and physical controller behavior are not certified. The final logical-coordinate HUD correction was checked natively after this browser capture.
- Native shared-controller benchmark is recorded in `shared-controller-performance.json`. It measures isolated simulation on this host, not browser FPS or final role rendering performance.
- PASS: bounded deployment source/asset verification and archive size check. Original full campaign source/art remain in `dist`; the hosted artifact remains a Downtown review. To fit the existing 256 MiB artifact limit with the two new atlases, the package additionally omits later Yacht presentation (`yacht-view195.js` and its three scene panoramas). That code/art is preserved in editable source; the hosted artifact is not full-campaign certification.

No known failing checks remain in the completed scope.

## Files and assets

New runtime files: `dist/backup371.js`, `dist/backup371-data.js`, `dist/backup-view371.js`, `dist/assets/backup371/bruiser.webp`, `dist/assets/backup371/gunner.webp`.

Changed integration files: `dist/support370.js`, `dist/backup365.js`, `dist/backup-view365.js`, `dist/game.js`, `dist/game360.js`, and both source HTML entry points. Source image sheets and reproducible packing/render/build/verify scripts are retained under `source-art/backup371` and `tools/backup371`. Renderer manifest and relevant tests were updated. The retained original specification starts with the user's 10% rarity override.

## Stage boundary and next work

Bruiser and Gunner are the only completed production providers. When normal tactical selection includes Hammer, Enforcer or Cutter, arrival is still deferred with a pending-fighters notice; there is no substitute actor and no silent reroll. The passive practice link guarantees the completed pair for review without changing normal selection.

Full hostile target diversification and coordinated enemy attacks against allies are Assignment 6, and are **not complete** here. Native ally hurt/death handling is implemented and tested directly, but this is not final encounter balance. Final voice acting remains pending.

Assignment 3 stops for review. Next: Assignment 4 — Hammer and Enforcer, then Assignment 5 — Cutter with the updated 10% rate, followed by full hostile/ally encounter integration.
