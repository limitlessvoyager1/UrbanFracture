# Build239 — Stadium stabilization and Forest/Gunner QA

Checkpoint: `checkpoint-before-stadium239` at e3e343ddab9c1c7d258060df9d9b6c1d5017160d.

See STADIUM239-AUDIT.md for confirmed defects recorded before modifications.

## Changes

The first parking section uses two unique world spans: varied outer tailgates (0–1800) and a single stadium approach (1800–3200). Gate1 aligns with the existing end transition. No complete facade repeats. Existing subsequent sections, routes, Rhinos branding and Baylor encounter remain.

Parked vehicles now live in background art, with no parking-section vehicle colliders. A finite independent supply replaces the previous car reward. Runtime spectators have fixed ground roots behind the combat lane, perspective heights of138/168/175 logical pixels, stable poses, and bounded reactions/fleeing. The scene uses existing Scenery230 sky, vegetation, cloth and runoff preparation recipes, without another environment controller.

Stadium entrances use physical speed and distance-driven gait, pausing during incompatible damage/grapple states and withholding offense until entry completes. Other levels retain established entry timing unless explicitly configured.

Forest's native240ms buffer now catches attacks pressed during his last0.1s combo cooldown, executing only after recovery. Mandatory recovery remains. Existing controller mappings and move handlers remain. F9 audit data includes bounded input acceptance/buffering/rejection traces, recovery, grapple/charge state, controller connection, Gunner profile/task/target/cooldown and stadium encounter diagnostics. Gunner HUD moved clear of charge/blitz information.

Gunner continues using Companion126/Tactics173, not a second controller. All four modes perform autonomous actions in controlled tests. Defensive following now respects its shorter leash. Tactical prioritizes weak targets. Balanced now occasionally searches authored finite caches (supersedes the older no-search policy). Searches retain the whole-run3-cache/30HP ceiling, unique IDs, cooldowns, threat aborts and native pickup collection. Removed targets are invalidated. Shared path checks and Forest's dog movement honor full vehicle/wreck footprints and use persistent physical detours. Scripted assists retain priority over autonomous cooldowns.

## Verification

| Check | Result |
|---|---|
| New stadium239 layout/entry tests | Pass at30/60/120Hz; single facade world placement, no vehicle colliders, fan scale/depth |
| New stadium239 controller tests | Pass native keyboard buffer and standardUSB/rawSony/DSX polling; all6combo presses, front/rear/assisted grabs,3air attacks, run, counter, charge/Maul |
| New stadium239 Gunner tests | Pass actual autonomous attacks in all4modes, interception, weak targets, stale cleanup, retrieval/search limits, mode persistence, leash, wreck detour |
| New stadium239 environment test | Pass all9sections, cold snow/wind, same environment identity during camera/encounter ticks |
| Existing stadium237 routes/contracts/view | Pass all6heroes, both branches, Baylor remains scripted |
| Forest177/protection177/Maul175, Forest125/127, Gunner173/controller173, Playtest226 | Pass relevant combat, synchronized assists, input and controller regressions |
| Prison224 aggregate | Pass |
| Subway238 route/view/audio | Pass |
| Browser visual review | Outer tailgate and end approach inspected with native Forest/Gunner; adult spectators, clear combat lane, single Gate1 stadium; idle/bite poses reviewed |

Tests use deterministic simulations, mocked controller reports and rendered browser inspection. Physical DualSense feel, every frame of every animation, long human balance sessions and exhaustive weather combinations are not certified. The supplied video has no button overlay; missed presses were diagnosed by reproductions, not inferred as recorded inputs. Stadium lighting continues using the global environment renderer; no separate lighting clock was added.

## Assets and preservation

Generated outer panorama prompt: high-detail16-bit Rhinos tailgate parking, varied blue/gray tents, grills, coolers, background vehicles, no stadium, clear asphalt foreground. Approach prompt: one large Rhinos stadium at right/end with Gate1, believable perspective, open fighting lane. Imported using tools/import-stadium239.py into outer-tailgate239.webp and single-approach239.webp; original stadium art preserved.

Two existing sprite atlases were losslessly repacked to stay within hosting size limits: dimensions, alpha and every visibleRGBA pixel verified identical. See qa/stadium239-lossless.json. No hero damage, frame timing, grab threshold, enemy pressure budget or scripted route progression was changed.
