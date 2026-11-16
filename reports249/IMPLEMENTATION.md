# Weapon proficiency · Playtest249

Recovery checkpoint: `checkpoint-before-weapons249` at `2801110b5ef8add8f01434e35e583f78c89c387b` (deployed248). Rollback by deploying the retained248 saved version, or restore the checkpoint in an isolated worktree. Do not reset ongoing work destructively.

The248 foreign-weapon inventory, input admission, durability, pickup/throw and animation adapter are extended in place. No second weapon or AI controller was created. Forest retains his own knife and refuses foreign weapons.

| Hero | Knife startup/active/recovery | Knife damage | Long startup/active/recovery | Long damage |
|---|---|---:|---|---:|
| Reina |10/6/18|26|20/6/28|22.8|
| Broxton |18/4/30|14|14/6/24|32.4|
| Nova |26/6/42|12|32/8/48|15.6|
| Niko |16/5/26|20|20/6/28|24|
| Orion |22/6/34|32|26/7/38|38.4|

All timings are frames at60Hz. Startup+active+recovery defines the entire action once; no durations are stacked. Damage occurs once per target per committed swing. Five commitments, including misses, break the weapon. Startup/recovery remain interruptible; no new armor, invulnerability, homing or recovery cancellation.

Reina uses a fast hyper slash and ordinary cross swing. Broxton uses a short stab and a step-forward, two-handed baseball cross swing. Nova uses an awkward downward knife slash and wild long swing. Niko uses a diagonal slice and downward chop. Orion uses deliberate, less accurate electrical strikes; his long reach falls slightly below Broxton's. Aim error is a small angle selected once on commitment for Nova/Orion, visibly applied to the weapon, never an invisible random damage rejection. Geometry uses the same authored hand anchors, active phase, facing and shaft angle as the renderer. Actual blade/shaft lengths differ for scalpel, knife, plank and crowbar.

The shared knockdown boundary rolls once with the existing seeded Math.random framework only when a weapon-holding hero actually enters knockdown. A result below.5 removes the weapon, shows a short falling/fading prop, and creates no collectible. Further calls during the same grounded state do not reroll. Misses and ordinary standing hits do not roll.

Armor-only damage options bypass stagger armor and armor damage reductions in core, Otis, Brick, Flint, Gus, Security, Heavy Workers, Colt, Baylor and Enemies210 handlers. Ordinary guarding, invulnerability, synchronized captures, dormant actors and scripted phase protections remain separate. This affects player-held/thrown foreign weapons; unrelated abilities are retained.

Every enemy family passes the same brief electrical jolt/arc presentation on connected electrical contact. Native damage reactions and electrical stun resistance/retrigger immunity remain authoritative. Cosmetic reactions do not add damage, general invulnerability or another status controller.

## Art and storage

New source atlases are in `art-source249`; final runtime poses are in `dist/assets/combat249`. The built-in image tool created the full-body candidates, followed by technical crop/alpha/import processing in `tools/import-weapons249.py`. The six atlases include separately authored left-facing Orion anatomy. Each atlas uses one fixed import scale and authored hand coordinates. Broxton has two authored grips on the same shaft. Source atlases248/history preserve superseded art.24 obsolete hosted attack poses are replaced with new pose references, documented in `asset-migration.json`; pickup, ready and throw-release frames remain. Inventory removal records this explicit migration, without certifying new art or changing screenshot baselines.

## Validation scope

`tests/weapons249.cjs`: individual timelines, damage ordering, actual reach hierarchy, active contact/recovery, both facings, Nova startup interruption, exact50% loss boundary and no reroll/collectible, armor exemptions, guard/invulnerability preservation, all enemy electrical visuals and stun immunity.

`tests/weapons249-view.cjs`:98 actual render-adapter cases, synchronized visual/collision shaft angles, fixed pose selection, two authored Broxton hands, universal electrical expiry.

`tests/art249.py`:48 runtime frames, alpha, dimensions, opaque ground anchors, hand pixels and two-grip spacing. Artistic quality, complete gameplay balance and physical DualSense remain manual review items. No stable certification is claimed.

Full test and browser results are recorded separately after execution. Unexecuted checks are never counted as passed.
