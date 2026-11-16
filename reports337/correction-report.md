# Urban Fracture — Slums and combat corrections, Build 337

Reviewed source: `Screen Recording 2026-11-11 205951.mp4` (2:44.63). The timestamps below refer to that supplied recording. Checkpoint: `checkpoint-before-slums337`, source commit `44cdc18e424b8e641a4cc47503e390c1cb2340db`.

All requested items have an implementation and targeted native-runtime check. The images and video below are rendered from the game’s actual JavaScript animation/controller stack using native Canvas. They are not mockups or a live browser/controller playthrough.

## Timestamp checklist

| Time / issue | Confirmed cause | Correction and evidence |
|---|---|---|
| Street background and foreground scroll separately | Backdrop camera was multiplied by a different ratio than cars, floor and actors. | Backdrop uses the same world camera; scenery width fits the street’s world extent. Street floor sampling excludes the baked store facade. Native moving-camera video shows the shared motion. |
| 0:03 fallen line looks artificial and is outside the lane | Thick straight placeholder segments; hazard depth was 456/495. | Curved dark insulated cable, exposed copper strands and active electrical arcs. Both native hazard centers are now depth 480, in the middle of the lane. Verified the existing 8-damage hazard contact and cooldown. |
| Civilians too small | Fixed 130-pixel background height. | Civilian reference height increased to 165 pixels and background enemy reference scale from 0.76 to 0.90. They remain behind the playable lane. |
| Cars floating / tilted | Different wheel baselines, angles and oversized overlapping footprints. | Four level parked cars share baseline 430 and width 390, behind the combat lane. Removed the final car from the entrance approaches. |
| 0:10 car over department store; hero floats over / walks through car | Baked backdrop store extended into the drawn foreground; last wreck occupied the branch approaches. | Store is a partial angled foreground facade beyond the playable right boundary. Cars end before the approaches. Both the apartment and store routes remain reachable. |
| Heroes glide into transitions | Some renderers use independent gait clocks rather than `walkPhase`; transition root travel did not advance those clocks. | Transition distance drives the ordinary walk renderer and Forest, Niko and Nightshade’s gait clocks. Actual rendered poses change for all seven heroes. Walking replaces running/action leftovers during door travel. |
| 0:27 collapse looks like a placeholder | Simplified flat polygon and rectangles. | Irregular fractured opening, shaded depth, exposed joists, chipped surface rim and broken edge fragments. Existing warning, collapse, collision and pit rules remain intact. |
| Bruno breaks hold without pushing hero | Native breakout released the hold and applied recovery but had no displacement or dedicated shove pose. | Four original two-palm shove poses: brace, extend, contact and withdraw. Hero receives an 82-unit push over 0.20 seconds, constrained by bounds and solid obstacles. Damage and grab-break eligibility remain unchanged. A new hit/knockdown interrupts the shove presentation. |
| Nova forward-special contacts flash like armor | Native clean-hit body flashes remained on forced multi-hit contacts even when there was no armor. | Unarmored `novaRush` contacts use clean reaction classification and suppress the misleading body flash. Real armor checks, damage, interruption and native contact cues remain authoritative. Verified multiple real Rush contacts with damage and hit reactions. |
| All enemies slightly too aggressive | No additional breathing interval after a completed offensive commitment. | Shared completion path adds 10% of that action’s duration, bounded to 0.06–0.18 seconds, to the next-action pause. Reactive counters, reversals and anti-air commitments are exempt. No attack startup, active frames, recovery, damage, approach speed or threat-budget settings changed. |
| 1:36 open room not explorable | Decorative doorway had no interior route. | Cleared first-floor hallway offers **GO ↑ OPEN APARTMENT** at the existing open doorway. New original apartment interior includes rear kitchen/sofa/bookshelf and a clear walking floor. Up at the left doorway returns to the same cleared hallway. No cache message is required, and entering does not grant a free heal or reset the encounter. |
| 1:47 stairs cut through room 103 | A 540-pixel stair overlay covered the adjacent door. | Replaced with a 182-pixel recessed stairwell in the wall, with jambs and lintel. Room 103 remains fully visible. |
| 1:56 smoke beyond window is static | Smoke was baked into the background image. | Time-driven rising smoke is clipped inside the actual window panes. Wall, mullion and frame pixels remain intact. Render checks confirm different visible smoke pixels at simulation times 1 and 3. |
| 2:06 delayed normal attack after get-up | Normal attack did not participate in the completed-get-up cancellation used by Specials, jump and counter; residual standing/recovery locks remained. | Normal command and press/hold input may clear only the residual lock after a confirmed completed native get-up. Failed input restores the prior locks. No attack is admitted during unresolved knockdown. Verified all seven heroes. |
| 2:14 Nova rear-away throw out of sync / floating landing | Piecewise contact offsets jumped; rotation changed discontinuously; whole-sprite rectangular bounds left a visual gap; rotated standing pose was reused on the floor. | Continuous keyed contact interpolation and shared hero/victim rotation clock. Final descent blends toward the same landing point. Airborne floor checks use the opaque body outline. Ground impact uses the enemy’s original connected prone pose, aligned to the floor, through release. Native damage remains 30 for this throw, once. |
| 2:26 Akari gets up twice | Native down recovery was followed by an unconditional `martialKip212` utility action; `wakePending212` also forced a down pose. | Removed the second default kip-up and stopped drawing the pending decision as a grounded body. Her eligible wake-up attack remains available. |
| Akari glides instead of walking | Step/pause utility handling could select an idle pose even while root movement was active. | Moving Akari uses her four original full-body walking poses, selected by gait phase. All four render differently, retain her purple identity and keep the ground anchor. No claim of 60 newly authored walking assets. |

## Evidence

- [Native rendered correction video — 17 seconds](corrections-native.mp4): street camera/cable at normal speed; rising window smoke; Bruno shove and Nova rear-away throw at 0.25× simulation; Akari walk.
- [Rendered overview](overview.jpg).
- [Nova rear-away throw contact sheet](visual/novaFranken.png), [front-away throw](visual/novaBelly.png), [rear-forward throw](visual/novaFace.png).
- [Bruno shove poses](visual/bruno-shove.png), [Akari walking poses](visual/akari-walk.png).
- [Optional room entrance](visual/optional-room-entrance.png), [new interior](visual/optional-room.png).
- [Street exits](visual/street-exits.png), [room 103 and stairwell](visual/room103-stairwell.png), [collapsed floor](visual/collapsed-floor.png).
- Original recording stills: [0:03](before/3.jpg), [0:10](before/10.jpg), [0:27](before/27.jpg), [1:36](before/96.jpg), [1:47](before/107.jpg), [1:56](before/116.jpg), [2:06](before/126.jpg), [2:14](before/134.jpg), [2:26](before/146.jpg).

The before stills and after native scenarios are evidence of the reported defects and implemented behavior, not identical-input recordings. For a matched native throw fixture with the same seed, the largest head-contact displacement between simulation frames decreased from 70.26 to 38.60 world units; see `before-throw-trace.json` and `after-throw-trace.json`. This measurement is a discontinuity diagnostic, not an animation-quality score.

## Validation

| Check | Result |
|---|---|
| `slums337.cjs` | 39 assertions: seven-hero post-rise normals, seven-hero transitions, actual cable damage, car/exit placement, optional-room round trip, Akari recovery and Bruno pushback. |
| `slums337-view.cjs` | 9,201 assertions: actual walking renders for all seven heroes, four Akari poses, four Bruno shove poses, interruption and moving window-clipped smoke. |
| `slums337-throw-view.cjs` | 486 rendered samples, seven enemy identities and both facings. Actual opaque pixels remain above the floor; grounded paired bodies touch within two pixels. |
| `slums337-balance.cjs` | 37,826 assertions. Approved hero/move/configuration definitions equal Build 336; seven mixed fights retain the Normal three-point/two-commitment budget; actual Nova Rush contacts have clean reactions. |
| `nova333.cjs` | 17,057 assertions, plus civilian admission checks: paired identity/plane/damage, single impacts, finite recovery, jump and late dropkick contacts. |
| `slums202.cjs`, `slums203.cjs`, `slums204.cjs` | Passed native branches, stairs, hazards, collapses, fire escape, encounters and extensions at tested simulation rates. |
| `reactions298.cjs`, `knockdowns299.cjs`, `grapples301.cjs` | Passed 751 / 2,195 / 22,798 assertions respectively. Historical source assertions normalize only the expressly removed duplicate kip-up; the new test separately requires that repair. |
| `contact302.cjs` | 4,261 checks: clean/block/armor/counter distinctions and native contact behavior. |
| `plane304-height.cjs`, `plane304-weapons.cjs` | Passed 1,774 / 7,754 shared-height and swept-weapon geometry checks. |
| `repairs330.cjs`, `jump333-input.cjs`, `counter331-input.cjs`, `guard331.cjs` | Passed recovery, vault, worker, seven-hero jump/counter controller paths and guard refill checks. |
| `caches336.cjs`, `notifications336.cjs` | Passed cache spacing, visited-location restrictions, existing storefronts, notification preferences and persistence. Optional apartment is not inserted into the cache-report catalog. |
| Syntax / patch checks | Changed runtime scripts parse; `git diff --check` passes. |

Two archival whole-source guards are not green: `plane304.cjs` rejects existing HomeUI/cache changes in `game.js`, and `crowd303.cjs` rejects an existing `workers233.js` change. Those files are unchanged by this repair. Their relevant current runtime behavior is covered by the dedicated plane/weapon checks and new seven-hero mixed-fight budget test; the archival failures are not presented as passes.

## Files and recoverability

- Simulation: `slums202.js`, `repairs337.js`, `nova333.js`, `martial212.js`, `cache-rooms336.js`.
- Presentation: `slums-view202.js`, `slums-view203.js`, `slums-view204.js`, `slums-view337.js`, `sprites.js`, `nova-view333.js`, `cache-rooms-view336.js`.
- Loader: `index.html`; new art: `open-apartment337.webp`, `bruno-shove337.webp`.
- Original generated sources: `art-source337/open-apartment.png`, `art-source337/bruno-shove.png`; runtime assets are resized/compressed copies. Other shipped art was not degraded to accommodate them.
- Checkpoint `checkpoint-before-slums337` preserves the prior complete source. The new files are versioned separately; rollback can restore the prior build without reconstructing assets.

## Art provenance and remaining confidence limits

Built-in image generation produced two original Urban Fracture assets. Apartment prompt: “wide side-view gritty illustrated derelict Rivermere apartment; cracked plaster, rear sofa/kitchen/bookcase, left exit, continuous unobstructed floor, no people/text/UI.” Bruno prompt: “preserve original Bruno identity, burgundy tank/black cargo trousers/boots/fingerless gloves; four equal-cell full-body two-handed shove poses, brace/extend/push/withdraw; stable baseline, transparent background, no extra limbs.” Bruno’s existing original attack sheet was the identity/style reference. No Streets of Rage assets were used.

Rendered outputs were inspected, including frames from the evidence video. Live production-browser playback and a physical controller were not available for this verification. Input tests exercised the game’s actual keyboard and standard/raw Sony/DSX mappings in the native harness. Existing normal enemy grab restrictions and actual heavy/boss armor rules remain in force.
