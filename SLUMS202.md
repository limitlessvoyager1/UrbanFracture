> Store/rooftop continuation is superseded by SLUMS203.md. The remaining build202 rules are retained.

# Slums / Rivermere — build 202

Checkpoint: `checkpoint-before-slums202` at `c7374f91a556ac827a460117ed467ceb6c659623`.

Route74's final cleared homesteads now fade into Rivermere Street, preserving the chosen hero, health, score, companion, cooldowns and shared environment. Scene Select includes all eight new checkpoints. Restart/retry remains local to the current Slums scene. The department-store branch is a short playable connector to the same apartment climb.

| Section | Direction | Exit |
| --- | --- | --- |
| Burning street, 3400 units | Right | Clear + Up apartments, or Down department store |
| Department store, 1800 | Right | Clear + Up service stairs to apartment floor 1 |
| Apartment floor 1, 3200 | Right | Clear + Up stairs |
| Floor 2, 2700 | Left | Clear + Up stairs |
| Floor 3, 2200 | Right | Mid-corridor stairs before a terminal collapse |
| Floor 4, 2900 | Left | Clear + Up stairs |
| Floor 5, 2100 | Right | Mid-corridor stairs before the damaged corridor end |
| Rooftop, 2200 | Right | Clear the encounter and reach the overlook; scope ends here |

All encounters use existing actors, attacks, damage, shared grab protections and the single Smart Director. Finite plans keep at most three living enemies and one Bruno; Saito/Akari/Flint are spaced through the level. Street scenery actors are separate from combat; three marked background participants visibly enter once, replacing plan entries rather than adding enemies.

Five 40-HP street wrecks use the established native collision/contact/55%-single-drop rules, stay solid after destruction, and have small varied parking angles. Final wreck positions leave both fork entrances physically reachable. Opaque reused patrol cars/fire engine and background cops accompany the disturbed civilians. The twelve-frame generated crowd supplies three distinct poor/homeless identities with grounded steps and sitting/blanket poses; runtime alpha normalization makes body cores opaque. Fleeing begins when the actor is near the visible action, on bounded sidewalk segments free of vehicle footprints. No sprite crossfading or movement through foreground objects.

The street has red smoke-darkened albedo even in daylight, a further night reduction, restrained fire glow, cabin-window-clipped fire, window-specific building fire, trash barrels, rising smoke, litter and fallen utility poles. Reduced-motion mode freezes cosmetic fire, smoke and paper drift. The underlying seeded world clock/weather remain unchanged; indoor floors suppress outdoor effects while the same clock advances. Fire light is a gradual low-amplitude pulse, not a strobe; no medical safety certification is implied.

Live wires telegraph before a one-second active interval in a 3.6-second cycle; actual grounded proximity affects both hero and enemies, 8 environmental damage with a 1.3-second per-actor repeat gate. Paired interactions and airborne actors are excluded. Hazard flags preserve Iron Will's environmental exceptions.

Apartment cracks warn for one second before plaster falls and a hole opens. Back-edge progress is monotonic, preventing retreat past collapsed sections. Enemies physically knocked/thrown across a hole fall below its lip, then settle a single native defeat. Ordinary NPC movement steers around the partial-depth holes. Two terminal gaps only open after their room is cleared, so they cannot strand a required enemy. Stairs on these short floors sit before the void. No new combat controller or attack input.

`slums202.html` is a developer-only inspector for camera, floors, transitions, collapse/pit and day/night views. It loads current production modules; it does not modify the player's stored world.

Assets and image-generation briefs/originals: `design/slums202/`. Three high-quality WebP scenic atlases and one transparent crowd atlas are deployed. Geometry samples preserve wall aspect ratios and use a common world-locked floor; no scenic modulo repeats. To stay within the existing deployment size limit, the **unused** legacy Riverfront155 occlusion texture was moved intact to `art-archive202/` and its unused preload removed. Riverfront174/199's active generated shore mask and actual scenery remain unchanged.

Validation: `node tests/slums202.cjs` covers all5 heroes ×8 checkpoints, clear/session gates, both actual input-driven street exits, 30/60/120Hz apartment transitions, native car contact/drop/solid wrecks, live-wire friendly fire, collapse/pit defeat, and finite waves at <=3 living actors. Also run current150 (26 suites), Route74197, rooftop201, combat200, grab198, environment162, environment-integration156, gamepad and controller157. Browser inspection covers street/crowd/fire, floor proportions, collapsed-floor presentation, store, short-floor stairs and rooftop. These automated checks are not physical-controller testing or human balance certification.
