# Downtown345 optional room mechanics

Owned files: `dist/downtown-rooms345.js`, `tests/downtown-rooms345.cjs`, this report and rooms runtime evidence. No shared runtime/artwork/UI files edited.

The module is loaded after the native simulation and optionally after Drone344. It changes per-game behavior only when `g.downtown345` is truthy. New scenes register as indoor Environment162/native Adaptive222 scripted arenas; original scene controllers continue when the flag is off.

## Entry locations

| ID | Parent | World x | Authored opponents | Clear rewards |
|---|---|---:|---|---|
| phone | Retail zone1, either original route |2600|Marcus + Kevin|Cell phone + cash|
| pizza | Nightlife zone4, hotel route only |7200|2Marcus + Kevin|2pizza slices|
| dance | Nightlife zone4, hotel route only |8050|Frankie + Marcus + Kevin|3cash pickups|

These coordinates place the first room before the Hotel, and the others after the Hotel route before the lounge. Root may adjust authored coordinates to the final artwork. All labels are English; place names remain fictional Prime City locations.

## Integration API

`globalThis.DowntownRooms345` and `NeonCombat.DowntownRooms345` expose:

- `definitions`: immutable room metadata, dynamically assigned native zone indices and stable scene IDs.
- `portals(g)`: optional exterior markers with `x`, `available`, `cleared`, `name`, etc. Renderer should not attach destination text to these optional GO markers.
- `enter(g,id)`, `leave(g)`: validated transitions; normal input already invokes them for Up within62world units and y<=454.
- `active(g)` and `viewdata(g)`: room render selection. Inside data has `interior` phone/pizza/club and `exit:{x:130,y:440,available:cleared}`. Draw room background before the default district backdrop. Exterior data includes portal rows.
- `ledger(g)`: current-run room state and event history. `update(g)` checks actual native settled defeats and spawns rewards once.

## Native behavior and invariants

Entry requires a free grounded hero, no active native battle lock, no actionable visible parent enemies or other committed enemy actions, and no hostile/thrown/drone projectiles. Offscreen/dormant actors and pending parent waves remain stored, rather than deleted. This permits optional entry between parent battles without escaping an active combat lock.

Each fight uses native `deployEnemy`, normal health/damage/recoil/falling, native scripted222 lock, and unchanged Director148 budget3/max2. Exit remains unavailable until actual enemies are defeated and falls settle. The module does not simulate combat separately.

Parent zone, route, actor/item/prop arrays, pending waves, target, encounter and director/audit objects, and environment binding restore on return. Parent actor readiness/status deadlines are rebased by room elapsed time. Global player HP/energy/score/wallet/receipts remain current. The global native event queue is never frozen/replayed. The existing drone moves with the scripted door transition but keeps energy and cooldowns.

Rewards use native MasterItems319 IDs `downtown345-reward:<room>:<index>` and room-qualified receipt identities. Phone uses the actual existing cell-phone valuable; cash uses the native wallet system. Pizza uses native automatic healing/reserve policy. Uncollected room reward instances persist on revisits. Cleared rooms do not respawn enemies or rewards during the same run. No new recovery grant on entry or exit.

## Verification

`node tests/downtown-rooms345.cjs` PASS98checks: authored enemies, actual native lock and constants, damage/fall completion, rewards only after clear, no repeat rewards, exact parent arrays/routes/position, revisit state, disabled/Uptown/air/projectile/live-enemy rejection, paused parent deadline rebasing and actual phone wallet receipt.

This is simulation evidence only. Artwork, portal placement against final panorama, visual entrance/exit effects, human combat balance, full campaign persistence and physical hardware remain for root integration and review. The run ledger is not a new durable campaign save. No full QA runner was launched by this subtask.
