# Animation/recovery review — Build145

Checkpoint: checkpoint-before-animation145 / Build144.

Added308 production-logic grapple cases at120Hz:11 moves ×7 victim types ×2 facings ×2 lanes. Includes Reina German/reap/hip, Nova DDT/Exploding Nova, Broxton tackle/Powerbomb/spin/German/Nelson and Forest spinebuster. Strong-enemy eligibility remains respected (Nova special tests Bruno below60%). Assertions check finite positions, exact logical ground lanes, no grounded victim returning to standing before the same action ends, action completion and release. All pass; no gameplay change was justified by these tests.

Browser samples: Forest spinebuster grounded follow-up, Nova Exploding Nova midair corkscrew. Found a tool defect: inspector cropped high aerial poses. Added automatic preview framing and background/center/foreground lane selection. This changes only the inspector's viewing zoom, never game sprite proportions or move trajectories. Generic debug attachment text now distinguishes Forest, Powerbomb and Nova sequences.

The308 cases supplement previous104 tackle/104 Powerbomb cases,112 encounter fixtures and72 controller timing fixtures. They do not constitute exhaustive visual approval of every frame. Human balance comparisons, physical controller tests and full animation/audio acceptance remain open. No damage, health, AI or moveset changes in this build.
