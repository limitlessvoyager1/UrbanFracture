# Build361 — remove ammo pickups

Checkpoint: checkpoint-before-ammo361 at 8d42b9f5df9693d765d8c0cb2a275152052e742c.

Removed scripted ammunition budgets/placements, random enemy/furniture ammo drops, and ammunition catalog entries. Direct ammo creation returns no item. Existing floor items and saved ammo floor ledgers are cleared for every hero; stale collection grants no ammunition, and the renderer suppresses stale clips even before a simulation tick. Legacy aliases remain recognizable solely for cleanup. Existing firearm resource values and combat are unchanged. Other pickups remain available.

Changed: dist/nightshade-ammo256.js, dist/nightshade-ammo-view256.js, dist/items319.js; canonical/review entry cache versions; tools/ammo361/verify.cjs.

Passed: 291 targeted assertions across all playable heroes, legacy small/large clips and aliases, zero scripted slots, random-drop rolls, direct creation, saved-floor cleanup, no stale ammo reward/render, repeated ticks, and creation/collection of ten other pickup kinds. Updated master-item regression expectations for removal; all 170 item-system assertions pass. JavaScript syntax and shipping entry checks pass. Browser/hardware/performance holds from Build360 remain; this change is verified in the native simulation, not a physical controller session.

Full campaign source retains the change; published review remains Downtown with Nightshade360 visuals. Next check: manual playtest pickup flow.
