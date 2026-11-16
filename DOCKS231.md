# Build231 — Docks campaign

Checkpoint: `checkpoint-before-docks231`, published Build230 commit `a06993ca313db00228f4914f64a19074dec782d3`.

## Routes

The actual yacht clear now continues into the Docks, retaining the hero, HP, score and environment instance. Twelve appended scenes (78–89), available through native Scene Select/retry/restart:

- Waterfront, right to left: Sterling’s moored yacht → Shepard Shipping Company and adjoining office → dockside bar/repair/chandlery → UP to container yard.
- Shepard shortcut, left to right: freight hall → warehouse district → transit warehouse → receiving bay boss arena.
- Container route: yard → lower cargo-ship deck → stairs to topside → stairs to command center boss arena.
- Optional rooms: Anchor Bar, storage building, open container. Bar’s last defeated thug drops one guaranteed jewelry reward; collecting it automatically returns to the same waterfront actors/items/encounter state. Storage/container rooms contain native breakable crates and manual return GO; completing them removes their exterior GO marker. Shepard becomes available after the first waterfront encounter, so the player can genuinely take the early shortcut without clearing the lower route first.

Both arenas contain an initial ordinary guard encounter and then remain playable, marked as awaiting boss design. No invented boss, level victory or further destination is added.

## Existing systems retained

Docks231 supplies scene definitions, finite content rows, native transitions and room snapshots. Adaptive222/LockedBattles222 still own all encounter selection, arena membership/camera/reentry, Normal complexity and two-lock maximum. No new enemy AI. The shared controller gained one optional configuration `suspend(g)` hook, used only while a forklift crosses; no active battle is suspended to start a vehicle.

Native hero controls, gamepad mappings, all six movesets,223 grabs and119 synchronized protection remain unchanged. Environment156/217/218/162 continues across every transition; exterior exposure and source sky profiles, interior dry roofs/high-window weather are configured, with no new clock/weather state.

## Forklifts and container entrants

Two finite Shepard passes at progress820 and2380, in different logical lanes458/502. Each waits for an actionable hero, no living enemies and no active locked battle.1.10s visual lane warning plus sound precedes a620-unit/sec straight pass from beyond the right camera edge. No homing. Swept collision prevents frame-rate tunneling,26 base damage/knockdown through native damage rules, one successful hit per pass. Lane change, jumping and normal dodge/invulnerability work; synchronized holds/throws are protected. New encounter admission pauses until the vehicle leaves. Vehicle/driver are visual hazard content, never added as fake combatants.

Up to two native Marcus entrants in the yard descend visibly from container height with a finite one-second landing, no AI or attack hitbox until landing/cooldown. Same enemy instance remains tracked by the shared arena.

## Art and integration

Four generated pixel-art atlas briefs produced14 distinct imported WebP backgrounds in `dist/assets/docks/`. Prompt set: moored-yacht/company/waterfront/bar; freight hall/district/storage/transit warehouse; receiving bay/container yard/lower deck/topside; command center/open container. Built-in image generation; source PNGs remain preserved. Production code uses imported assets, source aspect ratio for scrolling halls, exact one-time bridge at topside end, separate native crates/door/stairs overlays and restrained animated seagulls. No old artwork replaced.

Integration: `docks231.js` after Prison224, `docks-view231.js` after existing hero renderers, common game readiness/render/prop/HUD/events/retry paths, Scenery230 recipe registration. Hidden `docks231.html` exposes production scene staging and hazard inspection without adding player cheats.

## Validation

- `tests/docks231.cjs`: both complete routes and all optional rooms for six heroes; same-object room return, one-time rewards, crates, endings, retry; forklift collision/fairness at30/60/120Hz.
- `tests/docks231-flow.cjs`: actual yacht clear continuation without reset/victory; early Shepard shortcut with remaining waterfront rows; shared admission suspension; same-instance container landing.
- `tests/docks231-view.cjs`: all12 scenes at both camera edges,14 assets, crate/gull/vehicle/depth paths.
- Existing full Prison224 regressions, Environment229 integration, Encounter222 contracts, Playtest226 and native gamepad/controller suites pass.
- Browser visual review: yacht arrival, Shepard proportions/crates, forklift driver/vehicle, container yard and ship command center. Full human balance and physical DualSense testing remain unverified.

One unseeded pre-existing Prison224 unarmed-Flint test initially sampled only punches and missed its probabilistic kick assertion. The targeted rerun and full suite pass; seeded current-versus-Build230 comparisons (seeds1/2/3) are identical. No Flint balance or randomness was changed to satisfy this test. Main-game browser Scene Select successfully starts the Docks with native HUD, controls and dynamic snow.

## Build232 forklift size correction

Checkpoint `checkpoint-before-forklift232`. Forklifts render at1.75× their original dimensions, around238px tall from wheel contact to beacon, above even the taller heroes. Wheels now meet the logical ground anchor, with a separately grounded shadow. Shared visual scale also sets actual front/rear swept collision reach (fork tips included), offscreen start and complete offscreen removal. Lane depth, warning time, speed, damage and synchronized protection are unchanged. Existing Docks flow/hazard/renderer and controller tests pass; visual comparison checked against Reina and Broxton.
