# Urban Fracture — editable source, Rising Dragon Blade187

A side-scrolling arcade brawler implemented with plain JavaScript, HTML, CSS, Canvas2D and Web Audio. No framework, bundler, package installation or compilation is required. `dist/` contains the authoritative, editable source, despite its directory name.

## Run locally

Install Python3, open a terminal in this directory and run:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000 in a modern desktop browser. Serve over HTTP rather than opening index.html directly. Keyboard: WASD/arrows move, J attack/hold to charge, K jump, L special, B block, C counter, Q dodge, G manual grab, P pause. The game UI lists character-specific commands. DualSense: standard USB/Bluetooth, DSX virtual Xbox and custom mappings are retained; L1 block, R1 counter, L2 manual grab. Browser gamepad access may require a controller button press while the page is focused.

## Structure

- `dist/index.html`: production entry and ordered classic-script dependency chain.
- `dist/core.js`, character modules, counters, paired-motion and combat modules: movement, actions, contact, damage and grapples.
- `dist/director148.js`: one existing enemy pressure director; quality169 extends its observable repetition memory.
- `dist/combat-quality169.js`, `audit135.js`: shared grab protection and diagnostic combat telemetry.
- `dist/game.js`, sprites/view modules and `dist/assets/`: Canvas rendering, UI, images, sprite atlases, animation metadata and audio.
- `dist/environment*.js`, `outdoor-template-view162.js`: deterministic shared weather, clock, scene registration and rendering.
- `dist/gamepad.js`: controller reader/mapping and diagnostics.
- `tests/`: Node built-in assert/VM regression suites; no third-party test dependency.
- `tools/`: runtime ownership audit and repeatable encounter measurements.
- `reports169/`: architecture, corrections, measurements, limits and raw validation evidence.
- `.openai/hosting.json`: existing static hosting configuration; no secret credentials.

The root contains historical design/change notes documenting intentional per-character behavior. Keep script order: later wrappers deliberately delegate to earlier implementations. Do not delete older modules simply because their names contain older build numbers.

## Developer inspection

Open `/animation169.html` on the local server for the hidden animation/combat inspector. It starts paused and supports one-frame/ten-frame advance, 25/50/100% playback, hero/enemy selection, real production grab fixtures, hit/hurt references, scale/ground anchors, action timelines and damage events. F8 toggles contact diagnostics; F9 opens the existing audit dashboard/export. Generic boxes show logical contact predicates rather than pixel masks. `/environment162.html` and `/environment-template162.html` retain seed/clock/override/future-level diagnostics.

Run `node tests/current150.cjs`, `node tests/quality169.cjs`, `node tests/render169.cjs`, `node tests/environment162.cjs`, `node tests/gamepad.test.cjs` and `node tests/controller157.cjs` from the project root. The complete validated command list and results are in reports169/final-tests.txt. For the before/after benchmark, tools/balance169.cjs additionally requires the original168 Git commit; raw results are included so the downloaded ZIP does not need Git history to read them.

## Version and checkpoint

This incremental source revision is quality169 based on Cabin168 source320936293950b3a87c1d26f7e7875a1e85cd35f0. The older visible Build162 label is intentionally preserved from the user's restored layout. A pre-change tag `checkpoint-before-audit169` and complete source/assets checkpoint archive were created before editing. The export includes editable source and assets, not just a compiled game. No credentials, dependency caches or Git internals are required to run it.

Gunner tactics173: selecting Forest opens Balanced/Offensive/Defensive/Tactical choices (arrows, Enter; DualSense D-pad/stick, ×/Options). Pause after an area is clear to change tactics. The compact Gunner HUD distinguishes READY from automatic cooldown, attacks, return, stun and recovery. F9 contains developer profile/status controls. See GUNNER173.md for cooldowns, finite supply limits, architecture and measured trade-offs; run node tests/gunner173.cjs for focused validation.

Government Sector (Level3) is available in Scene Select. Clear Civic Avenue and walk up at either courthouse entrance; both routes meet at Dirk's courtroom, then continue through secret tunnels into the governor's building. The final office awaits its future boss. See GOVERNMENT182.md for progression, assets, checkpoint and validation notes.

## Niko185

Fifth playable hero Niko has110HP; Reina has105HP. See `NIKO185.md` for move budgets, injury rules, retaliation and reserved manual-counter choreography. Run `node tests/niko185.cjs`. Niko-only grounded submissions preserve all other heroes' scripted throw follow-ups.

## Final counters186

Niko's final counters replace the185 placeholder. See `NIKO_COUNTERS186.md`; run `node tests/niko-counters186.cjs`. Open `/niko-counters186.html` for frame stepping. Weaponless Flint now raises his fists and closes with strong punches/front kicks after any weapon loss.

## Rising Dragon Blade187

Reina's Counter + Special is now implemented. See `RISING_BLADE187.md`, run `node tests/rising-blade187.cjs`, and use `/rising-blade187.html` for frame-step diagnostics. Existing specials, ordinary counters and Tornado Kick are preserved.

Government Sector repair190: see [GOVERNMENT190.md](GOVERNMENT190.md) for open-cell entrances, street scenery fixes, Broxton's planted Iron Will/floor-correct spin throw, Dirk gait/firing feedback, and Niko's extended Blur Dash/locked-lane kick/palm-strike animation. Developer visual checks are available at `government190.html`.

Niko's aerial repair and directional mounted submissions are documented in [NIKO_AIR191.md](NIKO_AIR191.md). The frame inspector is available at `niko-air191.html`.

Casino: choose **Scene Select → Level 4 · Casino → Gaming floor**. Clear the casino to use the penthouse elevator, cross the suite, then reach the pool terrace. The pool boss is reserved for a future update. See [CASINO192.md](CASINO192.md) for source, loot, Security and verification details. The production inspector is `casino192.html`.

Casino pool boss update: see [POOL_BOSSES193.md](POOL_BOSSES193.md). Scene Select → Casino → Pool terrace / Ophelia & Jameson. Frame inspector: `/pool-boss193.html`. Regression: `node tests/pool-boss193.cjs`.

Arthur’s yacht continuation (build195): after Riverfront, board the moving deck, clear the lounge approach and face200HP Arthur Sterling with one Dorian. Also available in Scene Select. Implementation, rebuild and QA notes: [YACHT195.md](YACHT195.md). Developer scene inspector: `dist/yacht195.html`.

Fairways Estates (build196) follows the woodland lab escape: gated village → day-spa shortcut or club front → shared country club → golf course or pool/fitness/rear tennis court. Final encounters are reserved for later bosses. All eight areas are available in Scene Select. See [FAIRWAYS196.md](FAIRWAYS196.md) for routes, assets, rebuild instructions and checks; `dist/estates196.html` is the developer inspector.

Route 74 (build197): wooded outskirts → truck stop/service strip → abandoned garages and homesteads, following both cleared Fairways routes. Gus and crowbar variant Charlie have115HP and require a stun/stagger before ordinary grabs. Selected wrecks yield finite ordinary loot. See ROUTE74197.md and route74197.html for the production combat inspector.

## Permanent QA standards (Build242)

Start with [QA architecture and roadmap](QA242-ARCHITECTURE.md), [Visual Style Bible](QA242-STYLE-BIBLE.md), and [execution/acceptance/rollback runbook](QA242-RUNBOOK.md). Run `node tools/qa242/run.cjs --profile initial` for first-stage checks or `--profile release` for registered release suites. Read `reports242/LATEST.md` and `reports242/latest.json`. A blocked/incomplete gate must never be labeled stable. `node tools/qa242/check-release.cjs` rejects stale/failed evidence. Developer frozen candidates: `qa242.html` under managed preview, separate from player menus. Approved screenshot baselines require explicit review; no silent updates.
