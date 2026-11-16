# Build 233 — Dock Workers

Checkpoint: checkpoint-before-workers233 (Build232).

Implemented regular80HP and heavy105HP Dock Workers with shared native director, encounter, grapple and recovery systems. Names use29 common first names; Frank is excluded. Independent seeded cosmetics, stable names/appearance, living-name deduplication, permanent crowbar disarm, regular/heavy movesets, damage-taking frontal heavy armor and shared contested grab rules are integrated. Crews appear only in configured syndicate Docks sections. Native HUD uses instance names/current HP. Developer inspector: workers233.html; runtime audit includes worker state.

Validation: regular, heavy, grapple and Docks integration suites pass; contacts/recovery tested at30/60/120Hz, all six heroes tested with both worker classes and configured Docks encounters. Complete prison224/current combat/environment regression suite passes. Browser inspection checked regular and mixed crew artwork, portraits, differing names/HP and stable palettes. Physical controller and human balance playtesting remain unverified.

Spectre metadata is100HP/REGULAR and Torrance Baylor450HP/HEAVY_BOSS, but neither is spawnable. Both saved specifications and the user paste end during Spectre Phase19 step2; no Torrance combat details/individual overrides were supplied. Remaining combat implementation requires that continuation.
