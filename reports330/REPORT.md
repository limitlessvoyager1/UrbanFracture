# Build330 — Worker, Nightshade and Industrial District corrections

Checkpoint: c97298e47a16cdb15115eb22e7c571ad2e63d872 (Build329), local tag checkpoint-before-repairs330. All earlier source/assets remain recoverable in Git. No master-city gate was advanced.

## Evidence reviewed
The supplied 34.4-second,30FPS recording was sampled every2seconds and inspected as a contact sheet. Source screenshot names174322,174353,174540,174815 and175401 identify the worker/weapon/access problems. The separate original throw reference and reviewed storyboard were revisited. User clarification now explicitly requires the vault, superseding the earlier written grounded-only constraint.

## Corrections
| Reported problem | Confirmed cause | Change |
|---|---|---|
| Worker legs/body distortion | Procedural stomp leg replaces part of the body; facial block overlays and broad palette masks alter features; old poses have only one intermediate rise | Replaced both worker-family atlases with32original connected poses each:8walk stages, anticipation/contact/follow-through, recoil, loss of balance/fall/impact/flat ground and5rise stages. Removed procedural limb and facial blocks. Only reflective vest colors are recolored, preserving authored faces and trousers. |
| Odd worker weapon swings | Detached hand geometry came from generic pose tables rather than the selected picture | Shared pose/socket adapter drives both the actual native crowbar segment and visible crowbar from the authored glove. Glove pixels cover the grip. Startup/active/recovery/damage/armor/cooldowns and Director limits preserved. |
| Nightshade pipe/grip/hand switching/pixelation | Weapon source was reduced to144px by nearest-neighbor import; walk anchors selected the forward fist and changed anatomical arm | Reimported original artwork at approximately280px standing height, with uniform logical scale; restored dedicated long-weapon guard/contact frames. Corrected source-space glove occlusion for non-unit texture scales. Near-arm sockets now follow that same arm across both8frame gait cycles; removed knife grip offset. |
| Solid-looking fence gate | Opaque rectangle behind the mesh | Removed backing fill. Actual scene remains visible through the chain-link diamonds; frame and gate handle preserved. |
| Storage looks out of place / floating sign | Flat procedural frontage placed over repeated substation backdrop | New textured brick/corrugated frontage and attached wall plaque. Access moved from outskirts2450 to freight-road1450; reciprocal return points to freight road. No floating destination label above the building. Native GO remains an intentional route cue. |
| Specials unavailable after rise | Native get-up ended with a second1s standing lock plus wake protection; measured61extra ticks for Nightshade/Reina/Forest | At a confirmed completed rise, Special cancels only the leftover post-rise lock and wake protection, uses native costs/eligibility and preserves its own invulnerability. Invalid/unfunded requests restore previous locks; unresolved knockdown cannot execute Special. Niko's existing short counter/Special chord window remains valid and no longer inherits stale wake locks. |
| Stop/street signs | Low-detail boards below Stop, pole in the wrong frontage position | New trimmed street-name blades above Stop on one shaded metal pole, moved to the corner at crossroads1260. GO cue moved away from the blades. |
| Missing Nightshade vault | Build329 deliberately followed former grounded-only instruction | Twelve new authored stages now include crouch, push-off, knee tuck, inverted vault, shoulder clearance, descent, landing drive, release and recovery. Logical depth remains fixed. Release moves to44 after the vault; hero total remains86; primary27 on actual landing. Independent swept flight,3-target cap, momentum loss and native15/10/8 nominal secondary tiers retained. |

## Verification
- tests/repairs330.cjs:788 assertions. Seven hero Special paths after complete rise, native costs, failed request restoration, both-direction vault/release/three contacts, worker anatomical sockets, reciprocal storage route and weapon density.
- nightshade258:12568 assertions across all4directional moves, both directions,30/60/120Hz,12target archetypes, arena bounds and finite recovery. Collision fixture updated to lie ahead of the new release position.
- Worker regular/heavy/grab suites and workers250 pass; workers250 has10214final assertions and retains mixed-crew/Director3point/max2 limits.
- industrial317:23643 final assertions; industrial324:220. Storage-route fixtures updated to the requested relocation.
- energy316:249 final assertions, including spending/HP overflow, native defenses and pricing; playback265:137.
- Nightshade258 view1574 and actual game.js input28; gamepad/controller recovery pass. Additional actual game.js Special edge after rise passes simulated standard/raw Sony/DSX. Physical hardware untested.
-21 native engine stills inspected: worker rises/contact, Nightshade idle/walk/run/contact, substation/freight-road/crossroads.160 native throw ticks rendered into normal/quarter speed videos; vault keyframe sheet inspected. These are engine renders, not browser recordings.

## Limits
The existing browser tab was visible, but reload was rejected by browser URL policy. No workaround was attempted. Current live browser gameplay and physical-controller verification are not claimed. Prior Build329 documented the legacy nightshade276-input assertion that also fails on its predecessor; it is not relabeled as passing here. Full campaign and every obstacle combination are not certified. Artistic preference still benefits from player testing.

## Files and reproducibility
Simulation: workers233.js, nightshade-grabs258.js, repairs330.js, industrial317.js.
Presentation: workers-view233.js, worker regular/heavy data+atlases, nightshade weapon/grab data+assets, nightshade-view251.js, combat-view248.js, enemy-view313.js, industrial-view317.js and new frontage asset. index.html cache versions updated.
Original generated source images and prompt notes in art-source330. Import scripts in tools/repairs330. No unrelated hero designs, enemy damage or threat budgets were changed.
