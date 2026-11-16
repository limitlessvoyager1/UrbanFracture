# Build 222 — shared encounter architecture

## Audit before changes

| System | Existing state | Decision |
|---|---|---|
| Smart Combat AI Director148 + Audit135 | Functional shared attack admission, reservations, impact spacing, roles, observed player tactics, anti-air coordination, pressure relief and projectile accounting. Normal budget is 3 points and at most 2 commitments. | Reuse unchanged as the only combat-pressure coordinator. |
| Enemy state machines | Functional attack timing, mandatory recovery, entries, knockdown/get-up, weapons, status effects and synchronized grapples. | Preserve; the arena layer gates starts and handles return only when actionable. |
| Native encounter queues | Functional finite `pending` queues, living limits and authored introductions across Downtown, Financial, Uptown, Government, Casino, Yacht, Estates, Route74 and Slums. | Keep the same queue objects and existing spawn factories. |
| Scripted encounters | Functional boss activation, support waves, cutscenes, elevator phases, fire timer, boss outcomes and exits. | Keep native owners and exact enemy configurations. Reserve their encounter slots. |
| Arena behavior | Visible-edge bounds existed in encounters.js; several levels had independent camera/boundary clamps. Some scripts clamped enemies instantly back inside. | Centralize arena ownership, visibility checks and physical reentry; retain special pool swim/climb behavior. |
| Adaptive Encounter Director | Enemy-specific eligibility metadata existed, but no global selector used section lists, difficulty, performance and story together. | Create Adaptive222. |
| Locked Battle System | No shared membership, encounter-count, wave-completion or free-roam-transfer controller. | Create LockedBattles222. |

Encounter logic was duplicated across core.js, financial.js, uptown113.js, government182.js, casino192.js, yacht195.js, estates196.js, route74197.js and slums202/203/204.js. Their native spawn/transition adapters remain intentionally: staged motorcycle/cell/scenery entrances and story phases are content-specific. The new layer centralizes encounter decisions and arena rules around those adapters, rather than introducing a second enemy AI or replacing their story state machines.

## Checkpoint and incremental rollout

- Recoverable baseline: `8494527778aec2fabeef4844aac37669598e1434`, also tagged locally `checkpoint-before-encounter222`.
- Verified Downtown-only pilot commit: `a58e9c6`. It was tested and committed before campaign enrollment.
- Recover without overwriting current work: `git worktree add ../urban-fracture-before222 8494527778aec2fabeef4844aac37669598e1434`.
- Campaign configuration was added only after the pilot passed progression, transitions and live-combat tests.

## Controllers and integration points

`dist/encounter222.js` loads after Aidan221. `Adaptive222` owns the ordinary enemy catalog, section registration, introduction gates, difficulty/performance limits, composition filtering and selection at spawn boundaries. `LockedBattles222` owns one active arena, a two-lock-per-section cap, fixed camera, arena bounds, actor membership, native queue references, wave counts, completion and physical reentry.

`dist/encounter-config222.js` enrolls existing section variants. Tests cover 76 checkpoint configurations, including the optional hotel lobby/kitchen/club/VIP route. Sixty-four ordinary sections use adaptive scheduling; other configurations retain scripted or endpoint ownership. A section containing a later story fight reserves one of its two slots. The elevator's three stops and the alley's warmup/boss phases remain one native scripted battle each.

The original finite enemy counts are preserved. Ordinary queue entries may choose eligible introduced enemies from their own section pool. First appearances, motorcycle arrivals and scenery-linked entries are pinned. Bosses, mini-bosses and scripted-only configurations are excluded from selection. Charlie remains deleted. Regular Aidan uses75 HP; the Tavern pair remains110 HP each with standard combat protections. The Colt route contains no Aidans.

Normal ordinary encounters allow at most3 living actors, complexity6, one strong enemy and one ranged/area-control specialist. Easy lowers population/complexity; difficulty limits never increase the native combat damage or movement values. Low health or significant recent damage temporarily lowers population/complexity. Recent successful performance modestly changes eligible selection weights. No extra enemies are generated to punish performance. Existing roaming actors can temporarily exceed a new-wave composition limit: they are preserved, and further admission waits.

Roaming enemies transfer by reference into a Set; they are never recreated. Membership retains a living enemy even if it is removed accidentally from the visible list. Entries, cooldowns, weapons, injuries, poison and one-time healing state stay on the same actor. Outside enemies cannot start attacks. After knockdown, synchronized actions and mandatory recovery end, return uses bounded movement and obstacle-aware lane choice. Niko's injury adjustment and the Riverfront/Yacht native clamps no longer teleport returning actors. Specialized pool fall/swim/climb remains native.

Camera/bounds getters, spawnZone, reinforce/reinforceFinancial, AI dispatch, enemyAct/start, tick, zoneClear reads, shared GO rendering and F9 reports are integration points. The native queue stays authoritative; group Sets contain references to its rows. Completion waits for pending rows, living tracked actors and settled mandatory interactions. Native laboratory escape is an explicit exception for already defeated bodies: the existing fire sequence owns its completion and does not advance corpse landing clocks during the escape cinematic. Living actors and synchronized interactions cannot be bypassed by that exception.

## Future section configuration

An existing level definition with a stable `id` can use the shared scheduler without writing a new encounter controller:

```js
NeonCombat.Adaptive222.register('future-street', {
  eligibleEnemies: ['thug', 'knifeThug', 'biker'],
  coordinate: 'distance',
  spawnPolicy: 'shared',
  maxLocks: 2,
  maxLiving: 3,
  complexity: 6,
  spawnInterval: 1.1
});
```

The level supplies its finite native `pending` rows (`type`, `at`, `y`) and ordinary level definition/transition. The shared policy uses existing enemy factories and entry animation. A `spawn` callback may select an existing factory for a custom archetype. Register its metadata with `registerEnemy`; mark bosses/mini-bosses/scripted-only enemies accordingly. Section eligibility never overrides boss exclusion or progression gates.

Existing scripted phases can be enrolled with `scriptedSlots:1`, `lockWhen`, `scriptComplete` and optional camera/bounds configuration. `scriptedTypes` keeps authored boss queue entries out of ordinary selection; `scriptedFirst` supports the armored-car encounter before ordinary waves. These callbacks observe the native story phase rather than creating another phase machine. `mode:'endpoint', maxLocks:0` is for noncombat destinations.

## Verification and limits

- `encounter222-pilot.cjs`: all six heroes at30/60/120Hz, original finite count, same-object transfer, camera/bounds/GO, native transition, recovery/reentry, six20-second live-combat runs with the Normal3/2 budget.
- `encounter222-rollout.cjs`:76 checkpoints, safe authored pools, scripted/endpoint registration, two-lock cap, finite-wave completion across64 ordinary sections. These cross-section scheduling fixtures open the scenery lane and suppress player pit falls; they are not full human traversal playthroughs.
- `encounter222-contracts.cjs`: difficulty/performance/story filters, complexity/strong/control caps, boss exclusion, future configuration, duplicate prevention, missing living actors, landing gates, direct/offscreen attack starts, GO rendering, Niko injury and Gus/Security/Aidan recovery/state persistence.
- `encounter222-scripts.cjs`: six-hero Tavern completion; Colt-only route/introduction/outro; crash pair; three elevator stops; Otis; laboratory initial/arson/fire/escape; Pool/Yacht/Riverfront phases and boundary returns.
- `encounter222-mixed.cjs`: eighteen15-second mixed encounters across all six heroes with Gus/Aidan/Security plus Jesse/Marcus; actual pressure, visibility and identity checks.
- Preserved regression suites: current150 (26 suites), gamepad, controller157, environment218/162/integration156, Aidan221 and Gus219.
- Browser: production-logic diagnostics confirmed initial camera/GO lock, retained outside enemy identity and recovery/return, and two110HP Tavern Aidans with required pending support waves.

Full human Normal-difficulty balance, every physical scenery traversal and physical DualSense/DSX hardware remain separate acceptance work. Simulated controller tests are not hardware certification.
