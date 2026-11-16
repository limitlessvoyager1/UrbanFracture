# Build240 issue audit (before edits)
Checkpoint: checkpoint-before-stabilization240 at918f4b5adf821979841f50f3fa6e30785a67b8c8.
Evidence: attached stabilization instructions; original stadium recording; supplied ticket/elevator screenshots image(6), image(7), Screenshot2026-11-04 220125. The additional woods recording is not present in the active upload; woods defects below are independently confirmed in active source and artwork.

| ID | Current / root cause | Required / files | Initial status |
|---|---|---|---|
| STAD001–004 | Build239 already replaced repeated facade, fixed adult scales/background vehicles/variety | Preserve stadium237/view237 and regression evidence | Revalidate |
| STAD005 | tickets portal=end−140=1260 over booth; actual painted gate≈725 | Same gate coordinate for GO and trigger, stadium237/view237 | Confirmed |
| STAD006 | procedural TICKETS/STADIUMENTRY plaque floats over detailed art | Remove duplicate overlay, view237 | Confirmed |
| STAD007 | Stadium signs float; Mall generic plates lack supports; other route views need classification | Remove duplicates/add architectural supports, preserve HUD/GO | Audit open |
| STAD008–009 | Fake elevator rectangle overlays a pro-shop picture; reused concourse at choice screen | Dedicated connected wall lobby and cabin, view237/art | Confirmed |
| STAD010 | Two ground portals implement route choice rather than elevator interior UI; no travel sequence | Existing section3 becomes cabin, native transition lifecycle, stadium237/game | Confirmed |
| WOODS001 | woods139 paints an extra water gap/log, WoodsTraversal148 constrains crossing to463–480 despite full ground in deep-woods147 | Remove override and obsolete collision, retain full438–510 ground | Confirmed |
| WOODS002 | Masked stream/waterfall animation already implemented; reduced-effects deliberately static | Retain and verify water behind trail; add foam mask where appropriate, woods139 | Revalidate |
| ENEMY001 | Flint211 renderer stretches narrow arm strips and cuts body into disconnected polygons | Use connected body frames with authored hand anchors, sprites/Flint211 | Confirmed source defect |
| ENEMY002 | Two attacks exist (weapon-specific wild3hit/power); random selection can repeat indefinitely | Range/weapon weighted bounded repetition memory, Flint211; keep damage/timing | Confirmed selection behavior |
| HERO001 | Forest distance gait exists, only4 running poses; check rendered cadence/anchors | Refine gait timing/pose progression without movement speed change, locomotion127/view125 | Audit open |
| HERO002–003 | Build239 buffer and four actual modes verified, preserve | Re-run controls/tasks, QA239 | Revalidate |
| ENEMY003 | Core239 physical entry applies stadium only; other levels retain fixed1.1s interpolation regardless distance | Shared physical distance/gait, protected entry gate, core and Director integration | Confirmed |

Resolved statuses and actual test evidence will be appended after verification; code changes alone do not resolve these issues.

## Verified disposition

| Issue | Final change / files | Evidence and regression result |
|---|---|---|
| STAD001–004 | Preserved239 one-stadium spans, varied scenery/background vehicles; all fan soles now432 to avoid the unsupported405-depth row indoors | stadium239-layout,237-view; browser outer approach from239 and240 lobby/grounds inspection |
| STAD005–006 | Gate725 is shared by portal/trigger/GO; floating ticket-entry overlay removed, stadium237/view237 | stabilization240 rejects Up at booth1260, accepts Up at725; native whole routes pass |
| STAD007 | Stadium duplicate overlays removed; door plates have masonry surrounds; Mall ceiling supports added; subway timetable/maintenance supports added; dock door/stair labels attached to frames/rails; redundant floating dock/highway labels removed; Chinatown plaques receive brackets | Relevant231/234/235/236/238 view tests pass. Source audit distinguishes ordinary environment signs from HUD/dialogue/GO. No blanket deletion of baked architectural text or UI. Exhaustive human visual certification of every existing panorama is not claimed |
| STAD008–009 | Dedicated wall-lobby crop, natural aspect, recessed doors, frame, call panel and floor indicator; new cabin crop, stadium-view237/assets | Browser confirmed connected wall and grounded fans;239/237 render tests pass; no unrelated section rebuild |
| STAD010 | Existing elevator section3 reused as cabin; latched floor selection, native boarding/closing/ride/arrival transition phases; onlyVIP4/Facilities5 selectable; game.js native keyboard/pad paths | 6heroes×2destinations×30/60/120Hz; same hero/dog/environment/HP/score/lives/cooldowns/mode, one transition; actual browser used game controls and arrived in Team Facilities |
| WOODS001 | Removed extra rendered log/water gap and retired crossing-only collision in WoodsTraversal148; original detailed backdrop/bridge remains behind continuous ground | Woods148 full-width lanes440/471/506 with four heroes, jump, lab entry and workers; Woods139 flow; browser inspected former crossing |
| WOODS002 | Existing masked waterfall/stream flow retained, white foam included in bounded water matte; no hazard or trail water | Browser water backdrop; preserved destination-in masking belowbank cutoff; native environment regressions pass; reduced-effects mode intentionally suppresses small water animation |
| ENEMY001 | Replaced211 stretched-arm strips/body polygons with connected full frames. Authored frame grip drives both weapon rendering and211 collision. Knife uses forward fist grip soHumanShield remains physically interceptable | Full211:4weapons×2facings×30/60/120Hz, actual contacts/misses, rear hits, armor HP/stagger, recovery, counters, shield; browser pipe timeline |
| ENEMY002 | Existing weapon-specific wild/heavy definitions retained; after3identical same-weapon choices, modify the next heavy weight ±.35 with bounded probabilities; no equalization | New live selection tests and211-groups24fixtures/6heroes/4weapons, pressure≤3/two commitments |
| HERO001 | New8-frame whole-body run art, fixed.36 import scale, planted contact roots and existing distance/185 gait; original walk/attacks/equipment preserved | run240-art validates seeds/unclipped8uniqueframes/contact roots; Forest127 movement, controller240 double-tap run; browser run cycle |
| HERO002 |239 native buffer retained; diagnostics include recovery frames/input lock; keyboard/standardUSB/rawSony/DSX move tests pass | controller240, input226/prison aggregate; no recovery cancellation or duplicate input handler |
| HERO003 |239 four real profiles/tasks and finite searches retained unchanged | Gunner239 actual autonomous behavior/leash/search/target tests, mode menu173 controller tests, Forest177 protection |
| ENEMY003 | Native advanceEntry now uses physical travel and distance-based gait on all shared entry routes, not just stadium. Existing type-specific entry handling retained | City/Financial/Stadium entrances bothfacings×30/60/120Hz, enemies210 native arrivals, Flint211 left/lift/bottom, whole prison/subway/highway/stadium regressions |

Tests were updated only where the requested behavior intentionally superseded old assertions: no narrow log-only lane; longer physical entries rather than1.1s regardless distance; cabin choices replacing two ground arrows; longer elevator travel. The probabilistic unarmed-Flint regression now uses a deterministic seed and60s observation instead of an unseeded22s sample; underlying unarmed probabilities/damage are unchanged.
