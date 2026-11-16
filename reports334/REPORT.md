# Build334 — Gate7: Living City Director

## Outcome

Added a single persistent city director alongside the existing Combat AI and Encounter Directors. No damage, attack timing, AI aggression, threat budgets, character art, or level geography was changed. Checkpoint: `checkpoint-before-living-city334` at Build333 commit `934944a26febdd9c61f64316eaa21a4a67bec8bd`.

Open **Reina’s HQ → Command center → Living City status** to inspect the city journal. The isolated title-screen HQ test shows empty sample city state; it does not alter the campaign. A campaign visit shows actual discovered districts, conditions, offscreen assignments, alerts and recent events.

## Before and after

| System | Build333 | Build334 |
|---|---|---|
| City ownership | Separate supplies, HQ and environment records | Central city snapshot included in both existing checkpoint paths |
| Scheduling | No shared city boundary scheduler | Actual scene/district travel, mission completion, HQ entry and authored script triggers |
| Offscreen heroes | No persistent assignment timeline | Seeded investigation, tracking, informant and reconnaissance assignments; report at the next boundary |
| Story consequences | Hospital outcome exists in its mission controller | Actual saved/lost outcome also enters city flags and consequence records; next destination remains TBD |
| Conditions | No shared district state | Discovered district control, confidence and safety fields; unknown until authored data establishes values |
| Duplicate protection | No city receipts | Stable receipts, unique journal IDs, validated restore and bounded history |
| Status inspection | Investigation board only | Read-only city status and an explicit city/supplies save action |

An assignment means a hero is conducting reconnaissance, not that a suspect or item was found. Routine reports explicitly state that no lead was confirmed. No major mission completes offscreen. Active or unavailable heroes are excluded; selecting or restoring an assigned hero cancels the contradictory offscreen activity. Offscreen work does not consume combat RNG or lock Astro-Call.

## Shared architecture

- `dist/city334.js`: district adapter based on existing mission IDs; centralized state, independent seeded RNG, boundary scheduling, hero activity, typed authored-event API, resolution records, persistence validation and actual-runtime audit export.
- `dist/home-ui327.js`: existing HQ command-center status view, error feedback, retry save and isolated-test protection.
- `dist/phone323.js`: save/restore wording now states that city state is included and combat position is not.
- `dist/index.html`: load director after supplies, Astro and HQ, before view/controller consumers; refresh changed UI script versions.

Tracked fields include district conditions, threats, transit disruption records, side mission records, hero availability, assignments, cache discovery records, story flags, mission consequences and queued Pulse events. Authored producers require stable IDs and an implemented, discovered district. Unknown or nonexistent districts are rejected. Resolution targets must already exist. Active records are retained at capacity rather than silently discarded. History is bounded to120 entries and stable receipts to4096; the receipt limit produces a visible error rather than replaying events.

**No fabricated world facts:** completion marks the actual mission cleared, but does not invent percentages for control, safety or civilian confidence. Those fields remain unknown until an authored condition event supplies values. No transit outage, side mission, cache, social post or secret connection was invented. Cache activation and private Messages belong to Gate8; inbox notifications Gate9; public Pulse content Gate10. No relationship scores or perks.

## Persistence

The city snapshot travels through the existing `MasterItems319` supplies/HQ journal and `saveEnvironment156` / `loadEnvironment156` path used by Continue Saved World. Saves are validated before restoring their respective existing systems. Legacy snapshots migrate to an empty city. Failed browser-storage writes keep the live city state and expose a retry warning. Scene restarts retain the city; explicit `City334.newCampaign` provides a clean seeded city for campaign initialization/testing.

These are extensions of existing save contracts, **not a new full combat-position save system**. Restoring a weather/world checkpoint still uses the selected scene as before. The next real travel observation reconciles city location; no mission is marked complete by restore.

## Evidence and tests

- [Native runtime sequence](runtime-evidence.json): fixed-seed, explicitly isolated QA fixture; fresh city → observed location → scene travel → actual level-clear callback → actual HQ entry → journal restore. Includes actual city and combat snapshots and exact restore result. This is simulation evidence, not a browser recording.
- [Test results](tests.json) and individual logs:22 scoped suites.
- `tests/city334.cjs`:1293 assertions across deterministic replay, no per-frame event progression, actual boundaries, saves/legacy migration, corrupt restore rejection, practice/HQ isolation, unavailable/active heroes, authored conditions, resolution, quotas, hospital outcomes and unchanged combat resources.
- `tests/city334-ui.cjs`: production HQ/phone/native input handlers in the existing DOM fixture; navigation, truthful empty states, save and close controls. Also exercises existing keyboard/controller/modal isolation tests.
- `tests/city334-equivalence.cjs`:4207 exact frame/state/RNG comparisons against the full immediate predecessor, Build333, for all seven heroes.600 simulation frames per hero.
- Regression coverage: items/loot, reserve/pickups, PromptDrop, Astro, HQ, hospital, Industrial, airport, prison guard, counters, jump recovery, Nova and worker/Nightshade repairs.

The legacy reserve320 equivalence suite compares against much older319 combat. It already fails on unmodified Build333 at Nightshade/Saito frame9; this was reproduced separately in `legacy320-on333.log`. It remains unchanged and is **not reported as passing**. The new direct333 comparison checks this gate’s combat preservation without erasing previously approved combat changes. The PromptDrop UI fixture now uses the changed save-button label. The HQ roundtrip fixture restores into the matching active hero, since supplies restore does not switch heroes; a separate new test verifies that loading under a different hero reconciles assignments.

## Verification limits and next gate

The browser surface remains unavailable under the previously observed URL-policy restriction. No alternate browser route was used. DOM/native simulation checks do not certify responsive layout, physical DualSense hardware or a full campaign playthrough. No new artwork or animation quality is claimed.

Stop after Gate7. Next: Gate8, Messages and actual item-cache discovery integration. At Gate11, present proposed geography for review **before final map artwork**, including Reina’s HQ and only established connections.
