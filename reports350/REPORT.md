# Urban Fracture350 — Flint and Downtown corrections

Review build350. Recoverable checkpoint: checkpoint-before-flint350, predecessor1c04cfab63ecf41a4cf12dc1a7dcfd0cfae23cc2. The349 entry and all original assets remain intact. Only downtown350.html loads the350 adapters. The348 runtime namespaces remain for game348 compatibility; do not load alternate adapter owners together.

## Changes

The new recording shows disarmed Flint. The old AI temporarily classified him as Bruno and selected Bruno210 attack definitions, while the illustrated view used a generic single-contact clock.350 gives disarmed Flint his own committed punch, two-punch sequence and front kick, with12/25-frame contacts and38/53/51-frame total durations. Sixteen original complete figure poses animate the punch and kick. The entire figure uses one shared scale and planted soles; the attack cannot change into another enemy. Unarmed hit admission requires the current live action, correct facing/plane and contact with the current hero hurtbox. A final range/contact guard covers the armed211 path and legacy direct melee receipts too. Interrupted/stale strikes cannot damage. The exact distant hit from the cropped recording was not reproduced before the fix; negative distance tests verify that the new guard rejects it. Flint's established armed211 damage, armor and180-frame punish recovery are preserved; the video complaint concerns the disarmed fallback.

Six distinct facade strips replace looping street tiles. Global world coordinates render adjoining blocks and a common road, so changing the native zone does not replace the whole visible street. Explicit calibrated source crops exclude adjacent atlas rows. Neon Cell is part of the retail artwork; the separate mini storefront and floating Grand Hotel plaque are gone. Hotel lettering is painted on its entrance canopy. The hotel GO uses its real world doorway and is no longer clamped to a screen edge. Original grand-hotel-lobby96 and hotel-kitchen72 art are used again. Native encounters, doors and alternate route progression remain. Optional pizza and club door anchors are calibrated to the new art at7580 and8790; they remain spread along the extended hotel route. The retail display pickup moves to2330 within the broken Neon Cell window.

Precomposed scenery explicitly opts out of the weather renderer's automatic sky segmentation. That generic segmentation mistook neon building pixels for sky; previous plain-canvas alpha tests did not exercise it. Shared native ambient lighting, weather, ground wetness and precipitation still apply. No separate weather controller was added.

Normal forward/neutral aerial attacks now select the empty-hand landing pose. Only the explicit down+Attack baton move selects the baton-down landing. The missile uses an original eight-frame white-hot/fire/spark detonation, growing from the actual impact point. Its flight vector controls the victim's knockback, independently of the hero's later facing. Sprite missile orientation is corrected for leftward vertical travel. Existing costs, primary/secondary damage and independent victim flight remain.

## Validation

-104 Flint checks: both directions; hook/two-punch/kick/uppercut; close hit versus220/480-unit misses; escape during startup; interrupted/stale receipts; all four armed weapons; retained recovery; live AI and connected sprite selection.
-27 Downtown checks: six precomposed facades; camera and floor coverage; world-scroll consistency with less than1% edge-sampling tolerance and mean error under0.1/255; exact original hotel assets; actual production weather interception; distinct ordinary aerial landing.
-39 existing Nightshade input/runtime checks rerun through the350 adapters.
-180 live-combat checks rerun through350, covering hitstun, enemy interruption, weapon pickup/attack and throw damage.
-14 missile/effect checks: accepted single impact, actual flight direction in both facings even when the hero turns, all eight visual phases, expiry, primary and missile damage.
-Gamepad and controller recovery regression suites pass. These are simulated USB/raw Sony/DSX/custom mapping tests, not physical hardware tests.

Total364 targeted assertions pass. The rendered native fixture captures all500 simulation frames at60Hz and is supplied at1x and0.5x. It is silent controlled native-engine QA, not a browser gameplay recording or proof of browser60FPS. Scenery screenshots include the actual weather interception path. Package file payload264,677,975 bytes; superseded street atlases are omitted only from this supported entry's distribution, while their source versions remain. Packaging must also verify final TAR-expanded bytes below268,435,456.

## Evidence and limits

Nightshade350-Native-QA-1x.mp4 and0.5x show native Flint, front-away missile and ordinary jump/attack landing. Flint350-Native-Combat.mp4 is an extended controlled combat fixture. Missile350-Direction-Test.mp4 includes an intentional facing change to exercise direction independence. qa-contact-sheet.jpg, missile-impact.jpg and scenes/*.jpg provide image evidence. Test JSONs retain the results. Tools under tools/flint350 reproduce imports, build, simulation captures and tests; uncompressed individual JPEG frames can be regenerated.

Browser playthrough, physical DualSense hardware, human approval of all art and full campaign certification remain untested/open. Historical UF-RENDER-025/027 and other manual/performance holds are not declared resolved. Legacy Nightshade weapon and dart artwork is still preserved rather than repainted by this pass. This is an owner-only review publication, not stable certification.

## Changed files

New350 entry, Flint runtime/art data and original source sprites; Downtown view/rooms and source facades; Nightshade view/world/finish/repair adapters; five targeted test suites; QA registry; import/build/capture scripts and this report. No gamepad, base combat controller, unrelated level or campaign-save architecture was replaced.
