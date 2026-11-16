# Urban Fracture — Build240

Checkpoint `checkpoint-before-stabilization240`, source918f4b5adf821979841f50f3fa6e30785a67b8c8. Issue records, causes, affected files and verified statuses are in STABILIZATION240-ISSUES.md.

## Player-facing behavior

Ticket-gate GO enters the central stadium gate, not a ticket booth. The westbound concourse ends at an elevator built into a connected wall. Its dedicated cabin supports Up forVIP Suites, Down forTeam Facilities, then Attack orJump to confirm. Doors and native travel phases lead to the selected existing section, with state carried through. The ordinary gamepad mappings, Forest tactics menu, pause/scene selection and native combat recovery remain.

Deep Woods has a continuous full-width dirt trail. The old added log crossing and its collision restriction are gone. The original detailed background bridge, stream, waterfall and woodland lab remain. Water stays behind the trail and has masked flow/foam animation.

Flint uses whole connected attack figures with weapon/collision grips from one sample. Existing weapon damage, frame targets, selective armor and punishable recovery remain. Weapon-specific selection weights adapt mildly after repeated identical choices. Forest has8 running frames with fixed scale and distance-driven playback; walking and established attacks are retained. Gunner's four actual profiles and scripted attacks remain.

Ordinary procedural signage was audited across all active view families. Known detached stadium labels were removed, existing duplicate environment captions removed where HUD/art already provide names, and remaining Mall/Subway/Docks/Chinatown panels receive physical mounting. HUD, dialogue,GO, properly posted highway signs and baked architectural labels are preserved.

## Validation

New stabilization240 tests cover both floor destinations across6heroes/3frame rates, same actor/dog/world and stats, single activation, correct booth/gate geometry, shared entrances and actual weighted Flint decisions. Controller240 uses actual game.js keyboard and standard/rawSony/DSX input readers, including simultaneousDown+Confirm and the full Forest239 moveset tests. Run240 checks all8 asset cells and contact anchors.

Existing211,211-groups,237routes/contracts/view,239Gunner/layout,173mode-controller,Forest127movement/177protection, Woods139/148, completePrison224 aggregate, Subway238flow/view/audio and relevant Docks231/Mall236/Chinatown235/Highway234 view/route checks passed. Syntax and diff checks passed. Browser inspection covered Woods former crossing, Flint's timeline, Forest run, final elevator lobby/cabin and actual arrival at Team Facilities through game controls.

Physical DualSense hardware feel, long human balance sessions and exhaustive frame-by-frame visual certification of every existing background remain unverified. The additional Woods recording mentioned in the report was not present in the active attachment; source/art inspection independently established its log/collision defect. No blanket claim is made that every baked sign in the entire game has been human-reviewed.

## Art provenance and size

Built-in image generation produced the two-panel Rhinos elevator atlas, imported as natural-aspect center crops by tools/import-elevator240.py to dist/assets/stadium/elevator-lobby240.webp and elevator-cabin240.webp. Prompt: detailed16-bit grey/electric-blue stadium wall lobby with recessed centered double doors, call panel/floor indicator; matching cabin with panels/handrails/doors, no people orGO.

Built-in image generation used the existing forest-gait127.webp as an identity reference for an8-frame run atlas. The first noisy result was discarded; cleanup prompt required transparent clean alpha,8 distinct alternating chronological run poses, consistent uniform/knife/crossbow and proportions. tools/import-run240.py imports dist/assets/sprites/forest-run240.webp and metadata forest-run240-data.js. Contact roots are fixed per row; no per-animation sprite scaling.

Three existing atlases were losslessly repacked solely for hosting headroom. Dimensions, alpha and every visibleRGBA pixel were verified identical; see qa/stabilization240-lossless.json. Original level/character art remains recoverable from the checkpoint. No new weather, enemy, knockdown, grapple or companion controller was created.
