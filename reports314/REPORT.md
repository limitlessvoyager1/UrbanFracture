# Build314 — Prime City General Hospital

Source checkpoint:7b2160145b1df8d75ee44cda8fd43d1fa58ba824 (published Build313). Original combat values, hero animations and enemy AI remain unchanged. Hospital uses native combat, Director limits and environment clock.

## Implemented building

| Stop | Areas |
|---|---|
| Roof | Helicopter landing, Syndicate patrol, rooftop hospital access |
| 5 | VIP wing |
| 4 | Oncology, cardiology |
| 3 | Psychiatric wing, rehabilitation, enclosed windowed walkway to garage level3 |
| 2 | Surgical wing, administrative wing |
| 1 | ER, outpatient wing, cafeteria |
| B1 | Laboratory, x-ray/radiology, chemotherapy, pharmacy, morgue, laundry room, loading dock |

26 selectable/practice sections comprise7roof/floor lobbies,17clinical/service wings, walkway and garage. Every area is reachable from the roof and can return. Floor lobbies have adjacent-floor stairs and a complete elevator directory. Rooftop access offers stairs into5F or elevator service. Garage connects through the3F skybridge and service stairs to the loading dock. The boss and final mission flow remain intentionally TBD; no substitute boss or false victory is added.

## Gameplay integration

Choosing Hospital in the existing bank rooftop helicopter menu now preserves the chosen hero, HP, score and shared weather clock, lands at the hospital helipad, then releases control for the roof patrol. Mouse/keyboard and native PS5 menu-confirm paths are connected; the FBI lead is unchanged. Normal hero, weapon, grapple and enemy controllers are reused. Patrol encounters obey native3point/max2offensive commitments and at most2encounter locks. Hubs and walkway use endpoint configuration, preventing empty encounter locks.

Doors require a cleared area and an actionable hero; synchronized attacks/grabs cannot be escaped through a floor transition. Safe fade/ride/fade transitions do not heal, reset weapons or award points. Cleared areas do not respawn enemies on return and consumed supplies do not regenerate. Up opens nearby entrances; elevator offers keyboard, native controller and clickable accessible controls. Menu freezes simulation and supports cancel. Every area appears in Scene Select and the existing practice level registry; a PLAY HOSPITAL button offers quick rooftop entry. Restart returns to the selected hospital section.

## Original visuals

Fourteen new hand-illustrated environment crops cover helipad, clinical ward, VIP/admin, rehabilitation, cafeteria, diagnostics, garage, skybridge, pharmacy, morgue, laundry, loading, surgery and infusion. All original PNGs, prompts, source metadata and packer are preserved. Native mounted signage, access architecture and cardiac monitors distinguish areas. Geometry/floor backgrounds share one world camera; art is uniformly scaled and continuous floor strips match each background. Garage cars use the existing painted vehicle family with wheels anchored to the parking pavement, outside combat collision. The bank helicopter reuses its approved original sprite family.

Original scene atlases770142bytes plus crisp floor/door materials168814bytes ship. To fit the existing static hosting cap without degrading other art, the unused977190byte armored-truck-v1 preload is retired from both game and old environment snapshot; its original hash-matched file is archived. Actual financial truck remains PolishedSprites.drawTruck from financial-opening-v1 frames4/5. Explicit source-patch adapters and retirement hash/reference checks preserve historical proofs.

## Verification

Native hospital runtime tests cover1323assertions:26section registrations, full reversible graph, actual opponent spawning, budgets, every lift pair, floor stairs, all7heroes at30/60/120Hz on travel routes, bank mouse/keyboard/controller branches, preserved HP/score/weapon/environment, menu freeze, no supply farming and practice integration. The initial physical-door fixture teleported the hero without moving the camera and was clamped by the native visible-world bound; the fixture now supplies the consistent camera, without altering production bounds. Native rendered captures and final regression results are stored separately. Visual review rejected stretched low-height floor samples and primitive access doors; six full-resolution floor materials and authored door frames replace them. The full native patrol fixture retains actual enemy AI for entry traversal; disabling AI prevented entering enemies from completing their entrance and was corrected in the test fixture, without weakening production entry protection.

Boss placement and final linear flow remain open for later direction. This is an explorable combat level rather than an invented finished boss encounter. Native renders/simulated controller checks do not certify physical controller hardware or owner artistic approval.

An early regression batch was stopped and retained when HUD inspection found that the custom hospital title covered the native score. The title was moved to the level-name region, a rendered HUD-preservation check was added, and the release run was restarted on the corrected frozen source. No early partial run is counted as final validation.

Final directory input validation adds release-to-rearm after cancel and suppresses the separate pause overlay while the floor directory is open. This prevents holding Up from immediately reopening a cancelled menu. The release run is restarted after this scoped input correction.

Final scoped polish anchors each arrival to its actual destination stair/elevator door, grounds the helicopter on the helipad, and synchronizes Forest and Gunner’s disembark. Hospital titles preserve the native score and practice HUD. Exact post-full-run deltas are recorded and reversed against the frozen source hashes; targeted rechecks cover these changes. Browser preview timed out, so live browser and physical-controller verification remain unexecuted.

Final verification:205 unique automated suites passed,0failed. The frozen full run initially passed203; an obsolete game-cache312 assertion and an aggregate civilian-render timeout were retained as failures, then explicitly rechecked. The assertion now checks314 and the civilian aggregate passed with a300-second outer allowance, retaining its original per-part checks. Eight targeted suites rechecked the recorded seven-file final polish; all other source bytes and all artwork remained unchanged. No failed check was waived. Thirty native captures are retained. Final runtime/test fingerprint: 14fc0c81d0b7317bd356f8ab672473eb2927a34464a0dc44c209f48d92397a7b. Five manual review categories remain unexecuted; this is not stable, hardware, live-browser or artistic certification.
