# Reina’s Home — Gates 6–9, candidate 339

Tested implementation checkpoint: 9d10d915cea559b83607a7aa8d61f7a1c6f31baa.

Source parent: restoration checkpoint f1ead79a104f60b46b030b42944e8fc617a7fd75. Recovered foundation: 338 / 0f095736d6043de75a8b3d410354bde39fb0223f. This is the physically navigable Canvas2D / 2.5D home, not a 3D engine conversion.

## Implemented gates

| Gate | Result | Evidence and limits |
|---|---|---|
| 6 — Interaction framework | One nearest prompt; proximity, facing, floor, room and solid-path validation; object-specific dialogs; keyboard and native mapped controller input; safe return to exploration; no room picker | Seven-hero runtime checks; real backend/UI tests; modal input and reconnect/held-confirm checks. Offensive combat inputs remain consumed. |
| 7 — Foyer | Physical front-door entry/exit retained; actual console table and tablet added; messages, city map and Astro-Call roster open existing services; unread indicator reads existing messages | Native entry/foyer footage and room capture; browser checked title launch, home rendering, smartphone, actual Pulse empty state and return. Astro-Call still obeys its existing switching restrictions; roster review does not promise a replacement at HQ. |
| 8 — Living area | Physical sofa approach; four authored whole-body lowering/sitting poses per hero and reverse standing; messages/news while seated; one available visiting teammate; explicit conversation using existing hero briefings | 28 rendered pose/sole checks; seven-hero sit/stand and cancellation checks; availability/assignment filters; no combat-enemy insertion, automatic conversation or relationship mechanic. Walking retains native gait. |
| 9 — Kitchen | Actual purchased stored pizza can be packed into an empty reserve; ordering uses existing PromptDrop; approved meal recovers up to 25% max HP/energy once per completed major level; an eligible teammate walks through the hallway to share a short authored kitchen conversation | Receipt, failed-write, duplicate, zero-policy and delivery-clock checks. Default policy is unchanged, shared across heroes and future bedroom rest. No entry heal, free food, unlimited recovery, time skip or new economy. |

## Gameplay boundaries

- The hero walks between rooms. Menus are only object functions. The phone remains available anywhere in the home.
- Teammates are selected from actual availability and active assignment state; the active hero and unavailable/defeated heroes are excluded. One resident guest slot is used in this assignment. Broader NPC placement remains Gate 15.
- Paid delivery time advances once per unpaused home simulation step; the frozen campaign cannot advance it a second time. Phone and exploration pause halt the step. Ready packages remain governed by the existing delivery journal; the physical Storage collection room is Gate 14.
- New home-only art uses constant source scale per hero. It does not replace combat animations. The source PNGs, prompts, lossless importer and per-frame crop/anchor provenance are retained.
- HP/energy, paid supplies and spent recovery receipts use Home327 and the existing atomic supplies journal. Complete position/world campaign persistence remains Gate 17; interior window weather/day-night integration remains Gate 16.
- No Command Center, Workshop, Training or Bedroom function was substituted with a nonfunctional menu. Those room functions remain the next assignment.

## Fresh focused verification

- Interaction checks: 280 assertions across seven heroes.
- Integration: 104 assertions covering sit/stand, cancellation, guests, assignment/availability changes, walk to shared meal, duplicate-safe food, delivery clock and failed persistence.
- Existing home navigation: 113 assertions, all eight rooms and stairs for seven heroes.
- Existing Home327 economy: 190 assertions; PromptDrop325: 152 assertions.
- Existing phone/UI fixture: 119 assertions plus physical home and new object UI assertions. Standard DualSense, raw Sony and DSX are simulated through native mapping/polling, including R3 interaction, directional menu navigation, held-direction suppression, fresh confirm after neutral, and choosing HQ from the actual completion offer. Physical controller hardware was not tested. A later attempt to reconnect the final browser preview timed out; full final home traversal is therefore evidenced by native rendering and VM UI checks, not a claimed complete live-browser walkthrough.
- New art: 28 exact-source poses and two rejected bad fixtures (30 checks); actual rendered poses checked for clipping and sole anchors. A walking-guest render test protects travel facing from the idle look-at behavior. Additional regression cases ensure the guest cannot inherit the player’s stair arc, advance the player’s door timer or consume their doorway transition.
- Final-runtime replay: 1,469 recorded frames, 7,345 exact position/room/interaction/seat comparisons, plus final resource receipts. This confirms that the post-victory ordering fix does not change the recorded scenario.
- Syntax and whitespace checks pass. Broad QA status is in qa-initial/latest.json and QA-STATUS.md; focused passes are not a full-game certification.

## Visual evidence

- `gates6-9-walkthrough.mp4`: normal-speed native controller/renderer replay, entering the front door, foyer objects, sofa, teammate conversation, kitchen meal, teammate walking to the kitchen, kitchen conversation, stored food and return outside. No room-selection menu and no scripted position assignment after navigation begins; only the native door transition changes scene coordinates.
- `walkthrough-trace.json`: directional inputs, positions, rooms, interaction IDs, seat state and actual meal/packing receipts.
- The recording’s interaction text is drawn from actual runtime state; it is not a browser DOM recording. The actual object DOM is exercised separately by the UI fixture.
- `visual/foyer.png`, `living.png`, `seated.png`, `kitchen.png`: native room captures. `visual/seven-heroes-seating.png`: unwarped pose contact sheet.
- Before: existing checkpoint-338 `reports338/first-milestone.mp4`; navigation existed, room functions were absent. The earlier partial-339 restoration report is retained as history, not the final status.

## Failures found and corrected

The initial image sheet’s Orion row had inadequate boot margin; the shipped Orion frames use a separate complete strip. A recorder run was killed while independent render work overlapped, so visual work was serialized. The recording harness also oscillated around a waypoint because its two-frame movement exceeded its arrival tolerance; the harness tolerance was fixed without changing gameplay speed. The raw Sony UI test initially used the standard-controller Cross index; the fixture now uses the native raw mapping. Guest rendering originally faced the speaker while walking; it now preserves travel facing and turns toward the speaker only while idle. A later source audit found that the guest navigation clone could inherit the player’s stair/door state. The guest now owns an explicitly grounded interior navigation context. Earlier broad QA attempts were interrupted to fix that issue and the post-victory ordering guard before the final run; their logs (including the attempt before the menu fix) are retained and are not described as completed test profiles. Directional object/offer menus initially read only pressed actions, but the native reader reports directions through held state. The menus now consume held directional edges; expanded native-poll tests cover navigation and confirmation in all three layouts. Paid ordering now explicitly permits an authorized home visit even when final victory has stopped combat or left suspended sequence flags, without changing those flags or enabling practice orders.

No failures were waived and no approved screenshot baseline was overwritten. Source art remains available for owner review.

## Files changed

Runtime: `dist/home-interactions339.js`, `home338.js`, `home327.js`, `items319.js`. Presentation/input: `home-view338.js`, `home-view339.js`, `home339-data.js`, `home-room-ui339.js`, `home-ui327.js`, `home327.css`, `index.html`, `assets/home339/sitting.webp`.

Verification: `tests/home339.cjs`, `home339-extra.cjs`, `home339-art.py`; `tools/home339/`; six registered critical adapters in `qa/system242/suites.json`; reports and source artwork under their 339 folders.

## Remaining limits and next gate

This assignment supplies the Gate 6–9 functionality and focused evidence. It is not owner artistic acceptance, physical DualSense certification, a completed full-game release gate, or a full campaign save system. Production must remain on its last approved build if the mandatory release checks fail. The deployment archive also needs to satisfy the existing 256 MiB expanded limit before publication; do not reduce unrelated artwork to hide that limit.

Next recommended work after verification/review: Gate 10 — connect the physically approached Command Center to existing mission, evidence and city interfaces. Do not begin a major engine conversion.

## Completed broad QA result

180 executed; 151 passed; 29 failed; 73 not executed. All 6 new home suites: passed. Source unchanged during the run: true. No production deployment. See QA-STATUS.md for every failure and verification limit.

## File ownership by gate

| Gate | Main implementation files | Focused checks |
|---|---|---|
| 6 | home-interactions339.js, home-room-ui339.js, home-ui327.js, home327.css, index.html | home339 runtime/UI and mapped controller fixtures |
| 7 | home-view338.js, home-view339.js; existing home338.js doors retained | Native foyer/entry/exit, actual offer selection and phone return |
| 8 | home-interactions339.js, home339-data.js, home-view339.js, home338.js sofa footprint; assets/home339 | Seven-hero sit/stand, availability, exact-source art and rendered poses |
| 9 | home327.js, items319.js, home-interactions339.js | Meal policy, persistence failure, stock receipts, post-victory ordering, shared-meal traversal and final replay |

All new Gate 6–9 suites passed; no new home-suite failures remain in the completed initial profile. Physical hardware, complete final live-browser traversal, release-wide certification and owner art approval remain untested/unapproved as described above.
