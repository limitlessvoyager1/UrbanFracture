# Nightshade256 — Gate3 ammunition infrastructure

Recovery checkpoint: `checkpoint-before-nightshade-ammo256` at `44be7ca97046984648c8cd91c34a46706fc9ea08` (published Build255).

## Audit and integration

The existing engine has native enemyDrop/revealFurniture hooks, specialized scripted reward wrappers, one native item collision/collection loop, cached room item arrays, and shared222 arena bounds. It does not have a separate operational global loot Director. Gate3 extends these actual hooks; it does not invent a competing loot or encounter controller. Original health, treasure, extra-life, weapon, scripted room-reward and Director behavior are retained.

`nightshade-ammo256.js` provides the ammunition category and one run ledger; `nightshade-ammo-profiles256.js` supplies17 named whole-level profiles; `nightshade-ammo-view256.js` draws one/two magazines using the existing canvas item rendering path. No new raster art, altered character scale, new HUD inventory, or redesigned level scenery. Nightshade's accepted144logical height, gun animations, controls and all other heroes are preserved.

Small clips add3, large clips add6, magazine cap6; surplus is discarded. Native grounded pickup range and ordinary action/recovery restrictions are used. A dedicated pickup sound event is handled in the existing game audio loop. Items use logical ground anchors without floating/bobbing. Only Nightshade generates, renders or collects ammo; ammo never falls through to native treasure score or health behavior.

## Budgets and placement

Profiles cover Downtown/hotel, Financial, Uptown, Government, Casino, yacht, Fairways, Route74, Slums, Prison, Docks, Highway, Chinatown, Mall, Stadium, Subway and Hydro. Inputs include estimated duration, encounter/enemy counts, high threats, locks, bosses, melee and random-loot opportunities, expected shots and difficulty. These are initial tuning estimates, **not measured completed Nightshade playthrough durations**.

Budget bands follow the master specification. A level's budget is fixed before its first placement. Branch alternatives share slot IDs and a whole-level allowance. Boss-adjacent clips spend an existing slot. Only the exceptionally long Slums profile receives a guaranteed large clip. All other large clips arise only from the rare configured loot probability.

61 configured existing-area/alternate-route placement points were exercised through native level definitions, actual scenery, floor bounds, collection and stable IDs. Placement searches a small deterministic neighborhood for an accessible floor point; it avoids solids, vehicle footprints, highway holes, entry actors and locked boundaries. A clip beyond the active arena is held in the ledger until accessible. Camera movement and room/arena transfers cannot create extra copies. Uncollected branch alternatives share one movable slot; old cached copies are retired. Collected IDs stay collected.

Ordinary life respawn preserves the ledger, while the existing handgun grants its specified six rounds per life. Native nonzero checkpoint resets preserve collected IDs and frozen budgets, discard transient old floor drops, and recreate only uncollected scripted slots. Explicit reset0/new scene runs create a fresh ledger, matching the engine's new-run behavior. There is no new browser save system: the existing persistent save covers environment data, not complete battle snapshots.

## Random loot

Exactly one eligible ammo roll per enemy/destructible event, after the original reward logic: regular8%small/1%large, heavy12%/3%, destructible10%/2%. At most one ammo item per source event. Actual HP damage is recorded in the existing damage path **before** lethal native loot resolution. Gun-primary kills (over half actual/lifetime HP loss) halve both rates. Repeated calls cannot reroll a cached source. Finite sources and low expected gun-kill yield prevent a self-sustaining ordinary firearm loop. No shortage/pity refill is added.

## Future level configuration

The shared adapter inherits a campaign-wide budget for future section IDs sharing a prefix or campaignId; explicit `zoneDefinition.ammunition256` can provide `levelId`, `expectedMinutes`, encounter/enemy/threat estimates and `locations` (arrays of alternative `{section,at}` points). All sections of a branching future level should declare the same levelId and a shared location table. Registration requires enough locations for the maximum allowed budget. No future level needs a separate ammo controller. Review fallback estimates and branching placements when authoring content.

## Verification and remaining gate dependency

Targeted suites:182 assertions for native pickup/loot/persistence/cap/other-hero/arena/future behavior;61 real existing-area placement points; grounded single/double magazine rendering;51 firing/finite-supply/conservation economy scenarios. The economy scenarios execute native handgun/recovery/pickup code; balanced and conserving patterns are usage models, not certification of missing melee moves. Browser review verified both ground icons, empty HUD outlines and native movement collecting a small clip (ammo0→3, collectedRounds3).

**Gate3's full mixed-combat and zero-ammunition playability acceptance is blocked by Gate4 and later Nightshade melee/grab/dodge/counter implementation.** Those tests are not executed and not reported as passed. No firearm-required encounter is introduced. Physical controller hardware, human balance, and approved screenshot baseline review remain manual. Full QA results are recorded separately. This is a staged playtest, not a stable release certification.

## Test commands and rollback

Run `node tests/nightshade256.cjs`, `node tests/nightshade256-levels.cjs`, `node tests/nightshade256-view.cjs`, `node tests/nightshade256-economy.cjs`, then the frozen QA242 initial/release profiles. Do not edit test inputs during a runner.

Rollback to the checkpoint commit or redeploy the saved Build255 version. Source, profile tables, tests and verification evidence are retained with this implementation.
