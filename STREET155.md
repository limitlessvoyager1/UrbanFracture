# Urban Fracture — Build 155

Checkpoint: `checkpoint-before-civilian155` (Build154). All changes remain reversible through Git.

## Confirmed defects and repairs

- Uptown sidewalks used fighter-adjacent pedestrian lanes and painted civilians over traffic. Promenade/mall civilians now use367/374 lanes and render before vehicles. Park feet use410/417 at the path edge. The shared civilian run renderer no longer adds a whole-body vertical sine or crossfade.
- Promenade repeated one2160-unit panorama across7200 units. It now has four distinct world-anchored stretches. Mall uses two different1800-unit blocks across3600 units, with a department store early and the Lakeside Park arch only at the far-right end. New art shares a fixed curb; ground and architecture scroll together.
- Existing car wheels were static. Rotating circular samples retain illustrated wheel detail, with rotation tied to vehicle distance independently of camera motion. Added box trucks, pickups and mounted motorcycles. Connected vehicle components are isolated so adjacent atlas rows cannot leak into another vehicle.
- Two existing promenade Frankie spawns now approach on motorcycles, jump off on a fixed-scale arc, land and become ordinary chain-armed enemies. No extra enemies, HP or damage changes. Pending approach counts toward encounter completion; the existing three-enemy cap remains. A jumping entrant cannot attack.
- Frankie punch/kick poses imported at.4 while his base poses used.32. All associated windup/contact/recovery poses now use the base.32 import scale, including the raised-leg dismount. No animated scaling, hitbox, attack timing or chain changes.
- Reina's ordinary front/rear grips now render a clipped far arm behind the victim, then the victim, then Reina with that far-arm area excluded. Her body and near arm remain visible. This is render-only; counter grabs and active throws are excluded.
- Saito's established block strings now queue a counter6/10 times, up from5/10. Frontal edge coverage extends7 units, with rear attacks, recovery vulnerability and grab weakness preserved. No new invulnerability or damage tuning.
- The final park gateway was offset from the existing up-route trigger. Its world artwork phase is aligned with the woods exit; both GO ↑ WOODS and GO → RIVERFRONT display at the cleared fork. Both routes retain player control.
- Riverfront boats previously painted over poles. A fixed, source-aligned near-scenery alpha layer now restores poles, banners, plants, stage and railings over boats. It shares the same world transform. Existing water animation and boat paths remain.

## Verification

- `node tests/current150.cjs`:26 current-contract suites, including controller, director, four heroes, grapples, woods/lab and Riverfront/Sterling/Dorian.
- `node tests/civilians155.cjs`: both civilian poses/all phases, lane/draw order, no artificial vertical bob.
- `node tests/street155.cjs`: four heroes, staged entries, cap, leap/landing/reset, mirrored front/rear idle grips with state-pure rendering, fixed Frankie punch/kick scale.
- `node tests/saito155.cjs`: counter frequency, recovery damage, grab weakness, both park destinations.
- `node tests/ground149.cjs`:8 scenes, every scenery/floor raster moves exactly with camera.
- Browser fixtures in `street155.html`: distinct storefronts, final mall arch, both park exits, front/rear mirrored grips, motorcycle leap and clean vehicle crops, boat behind lamp pole. Slow/frame stepping available. `review144.html` includes both Reina idle grips.
-24 large sprite PNGs converted to lossless WebP with full RGBA byte equality (including hidden RGB). No existing image resolution or visible detail reduction; recovered17,395,921 bytes. New scenery and traffic assets fit within hosting limit.

Automated and browser fixtures do not constitute physical DualSense hardware or full human difficulty certification. No global health, damage, controller or unrelated moveset changes.
