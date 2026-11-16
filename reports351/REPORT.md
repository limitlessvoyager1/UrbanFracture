# Urban Fracture351 — aerial combat, throws and presentation

Review build351. Recoverable checkpoint: checkpoint-before-aerial351, predecessor31174b97c50cc1d8971758a88089c337fca9e69b. The350 publication and source remain recoverable. The supported entry is downtown351.html / game351.js. All350 street, missile, landing, input and disarmed-Flint corrections remain included.

## Changes

Nightshade's neutral kick uses the upright one-leg kick pose; the forward kick uses the distinct flying kick pose. Jump alone remains a tucked jump and requires Attack to kick. Both latch the takeoff lane, including while depth input is held, and recover without lane drift. Clean aerial contacts request knockdown for neutral and forward kicks as well as the downward baton attack; native blocking/armor rules still apply. Rejected invulnerability contacts can retry during the active window. Native fall/impact/get-up clocks and full-figure art remain the visual owners.

Her front-away throw and rear forward/rear away throws have combat I-frames for the complete action. The capture admission path respects them too. Protection ends with the action and restores prior invulnerability timing rather than granting a new post-action bonus. The front-forward sweep/beatdown remains interruptible. Its unchanged8-damage sweep and three baton contacts increase from6 to7 each, for29 nominal total instead of26. No hit timing, recovery, cost or choreography change accompanies that increase.

Eight original complete figure armed swing frames now show Flint's actual knife/pipe/plank/bat instead of rendering him as empty-handed. Their calibrated hand sockets drive both the visible weapon and native211 contact sampling. Body selection follows each actual windup/rear/forward/follow-through stage; recovery returns to a ready pose instead of holding a strike pose for the whole punish window. The original180-frame armed recovery, armor, weapon profiles and damage remain. The211 source change is a conditional sample hook used only by actions explicitly marked351; original entries remain inert. Disarmed350 punch/kick corrections remain. Armed and unarmed distant contact guards remain active. The recording's empty hands did not establish whether Flint was disarmed;350's initial inference was incomplete, and351 corrects both states.

The Grand Hotel lobby and kitchen are newly generated illustrated assets based on the original96/72 architecture, not relabeled old assets. Reception, seating, fountain, windows, right service doors and the commercial kitchen arrangement remain recognizable. New assets replace those preloads in game351. Exterior facades start at140 with the same430 curb, keeping store lettering below the fixed78-pixel HUD and the target/reserve panel bounds. An upper masonry band fills the space naturally. Signs stay part of the facade. Neon Cell remains an integrated broken display window. Its display item stays at2330; other authored storefront items retain their ledger IDs but move onto the sidewalk at480 with no elevation, preserving rewards without placing them inside intact windows.

## Tests and evidence

-1941 aerial assertions: both facings, neutral/forward selection and distinct poses, jump-then-Attack, held depth input, unchanged takeoff lane, five enemy types including Bruno and Flint, actual knockdown/fall art, off-lane miss and clean landing.
-240 armed Flint assertions: four weapons, wild/heavy, both facings,70-unit contact and240/480-unit misses, multiple body poses, visible ready recovery and preserved180-frame recovery.
-626 interaction assertions: full protected throw lifetimes, native capture rejection, damage restored afterward, interruptible beatdown,29 nominal damage, broken-window versus sidewalk item placement, real scene geometry and new hotel paths.
-39 retained Nightshade input/runtime assertions run through351.
-180 retained live-combat assertions run through351.
-14 retained missile/direction/effect assertions run through351.

Total3040 targeted assertions pass. The existing flint211 suite also passes, including original phase/recovery/armor, Human Shield, counter and entrance behavior. Gamepad and controller-recovery suites pass using simulated standard/raw Sony/DSX/custom mappings. No physical controller claim is made.

Nightshade351-Native-QA-1x.mp4 and0.5x contain all720 captured native simulation frames: armed Flint whiff, neutral kick, forward kick,29-damage beatdown and front-away throw. Flint351-Armed-Contact.mp4 and Missile351-Native-Test.mp4 provide additional controlled fixtures. These are silent native-engine QA recordings, not browser or human-controller recordings. scenes/*.jpg include new hotel art and street titles with explicitly labeled production HUD occupied bounds. The black rectangles in those images are occupied-bound guides, not a fabricated full HUD. The scenery fixture removes developer-practice geometry overrides and renders fighters with the actual world camera; a preliminary striped room capture from the practice override was rejected and replaced.

## Limits and files

Live browser playthrough/performance, physical DualSense, full campaign certification and complete human art approval remain open. Existing manual/performance holds are not waived. Nightshade's legacy weapon/dart artwork is still preserved. Publication is owner-only review, not stable certification.

Changed:351 entry/game, drone/view/Flint adapters and art data; optional351 sample hook in flint211;351 Downtown view; original source-art/flint351 and source-art/hotel351 masters/provenance; import/build/capture tools; six targeted suites and QA registry. Original campaign controllers, gamepad mappings, save architecture and unrelated levels were not rebuilt. New sprite and hotel assets were generated with the built-in image tool; exact prompts are in the provenance JSONs. Deployment must verify the final expanded TAR below268,435,456 bytes.
