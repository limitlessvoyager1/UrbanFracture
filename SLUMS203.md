# Slums continuation — department store and apartment fire escape

Reversible checkpoint: `checkpoint-before-slums203`, source `587b46bc9ae794e8b876538f571ae12d85d9853d`.

This build supersedes the short store-to-apartments connector and the temporary rooftop endpoint in build202. All earlier heroes, native combat/Director, controls, dynamic world, existing levels and Slums street/five-floor ascent remain.

## Routes

| From | Sequence | Endpoint |
| --- | --- | --- |
| Slums street, Down choice | Store entrance/food court → departments → receiving/storage → back personnel door beside the shutters → loading alley with grounded detached trailer | Clear T-junction: straight Marian St., Down Arnell Way |
| Marian St. choice | Proceed along the road | Common scene across from the department store, outside the apartment front doors |
| Arnell Way choice | Step south through the marked junction | Explicit future-route boundary; no invented continuation |
| First apartment rooftop | Clear, run to the edge, physically jump the gap and land on the second roof | Fight on the second roof, enter its rooftop door |
| Second apartment | Floor5 Right → floor4 Left → floor3 Right → floor2 Left → floor1 Right | Front-door transition into the same Marian St. scene |

The store now has three distinct connected scenes. The entrance passes rusted carts and two shuttered restaurant fronts. Departments include clothing, shoes, electronics, housewares, grocery, garden and hardware. The receiving bay has warehouse racks, pallets, a parked forklift and closed truck shutters with a separate personnel exit. Three modest health pickups and ordinary score items are finite per visit; no new inventory or economy controller.

New scenes remain part of Slums202's native route engine, flags and finite encounter plans. Its existing ground limits450–510, max3 living enemies/max1 Bruno and Smart Director3-pressure/2-commitment rules are preserved. No new combat or input controller. All new checkpoints are in Scene Select and support native restart/retry.

## Rooftop crossing

One authoritative transition clock:0.70s running approach,0.95s visible nonattacking jump across a170-unit roof gap,0.35s planted landing, then covered origin/fade handoff. The hero travels305 units during flight at the existing fixed body scale and on the same ground plane. Only visual jump height changes. Roof edges, floor, gap and actor use the same camera. No shadow is painted onto empty space. Gunner uses bounded physical movement (max360 units/s) and his availability rules; covered scene loading may safely recover an offscreen companion. Hero HP, score, world clock, resources and ongoing cooldowns carry over.

## Arson and escape

On floor4, moving Right-to-Left to the open apartment doorway triggers two visible Molotov bottles through the windows. The first impact ignites the building and starts a **240-second red countdown** below the main HUD. The environmental event does not cancel an ongoing attack, grab or charge. Normal gameplay input remains available.

The same countdown instance continues through floors4→3→2→1 and their transitions. It stops when the front-door transition places the player outside. Gameplay pause freezes it. Expiry is a terminal escape failure with a clear retry message, never a late victory. A direct developer/checkpoint start on a lower burning floor gets a fresh escape clock; the live descent never resets it.

Burning patches alternate between upper, lower and middle lanes, with visible ember warning/active flames and gaps to maneuver. Actual grounded proximity deals4 environmental damage with a0.8s per-actor repeat gate to hero and enemies. Ordinary holds/shielding do not grant fire immunity; native mandatory paired recovery remains protected. Iron Will retains its hazard exceptions. Two ceiling sites per floor warn for1.25s before debris falls for10 environmental damage at the actual footprint. Broken floors/holes persist. Elevators remain visibly OUT OF ORDER and are not routes.

## Holes in both buildings

Player contact with an open hole triggers a0.65s fall. The hero takes **12 environmental damage once**, then returns to the nearby edge on the side they fell from, with brief native recovery/grace. Horizontal fall targets are pinned, preventing a camera chase toward stale knockdown coordinates. A scoped back-edge bypass avoids moving the respawn across the hole or creating an automatic re-fall loop. Ordinary held captives can be released by falling; owned mandatory grapple timelines are not detached. Airborne actors wait until near floor contact.

Enemies physically knocked or thrown into a hole receive an immediate native defeat, then visually fall below the rim. No second damage/score event occurs on disappearance; exits wait for the fall to settle. No random kill of unrelated actors outside the footprint.

## Art and packaging

New original PNGs and exact built-in image-generation prompts are in `design/slums203/` (`prompts.json`). Runtime: `slums-store203.webp`, `slums-dock203.webp`, `slums-apartments203.webp`, `slums-merge203.webp`. Source dimensions2172×724 remain intact. Scenery keeps its aspect and ground anchors; no scene tiling or per-animation character scaling.

The three existing Route74 backdrop WebPs were re-encoded at maximum quality100, with **unchanged source dimensions/draw geometry**, to keep the expanded static archive under the hosting limit. Their original lossless files are preserved intact in `art-archive203/`. This is lossy color encoding, not an RGBA-identical conversion. Riverfront and character sprites were not re-encoded or redesigned.

`slums203.html` loads production modules for developer inspection of scenes, camera, rooftop apex, Molotovs, timer, falls and transitions. It does not write the player's saved world.

## Validation

`tests/slums203.cjs`: five heroes ×19 checkpoints; all-hero route transitions at30/60/120Hz; both intersection inputs; physical rooftop trajectory; both sides of holes in both buildings; no respawn loop; instant ordinary/strong enemy pit kills with one credit; two arson projectiles and delayed ignition; pause/transition clock continuity; fire friendly damage; terminal timeout; all-hero safe front-door exit; finite pickups; full native walking through both extended routes and every finite wave; arson preserves current action; ordinary holds remain exposed to fire.

Also run Slums202, current150(26 suites), Route74197, combat200, rooftop201, environment162, environment-integration156, gamepad and controller157. Browser QA includes native store entry and production inspector views of the roof jump, arson/projectiles, red clock, store departments/storage, junction, holes and merge geography. Simulated controller testing is not a claim of physical DualSense hardware testing; automated fixtures are not human balance certification.
