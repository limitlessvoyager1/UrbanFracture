# Urban Fracture · Build248 QA report

Checkpoint: `checkpoint-before-counters248` → `7c45c36b2be9ec729fc1d409b43fc4ee54695de3` (Build247).

Automated release suites: **35 passed,0 failed,5 manual gates not executed**. Source remained frozen throughout the final execution. Source fingerprint: `aa3d7ed760740d2d796b705680194e1cb5002e8da0d5da9de6bf33c2851066ba`.

## Implemented

- One neutral punch and kick counter per hero; automatic short/long weapon responses; Attack or Reina/Niko Special confirmation after a visible stopped attack.
-15% attempt cost;40% regular /80% heavy total; strict below40% heavy HP gate; widest Reina/Niko and narrowest Broxton windows.
- Hero-specific synchronized follow-ups, injuries, electrical status, Forest/Gunner navigation and native grounded impact/recovery poses.
- Reina's grounded Down+Attack removed; counter-created rear grip cannot switch front; its next native takedown verified at34→51 damage.
- Broxton Human Shield restrained pose.
- E / R3 / touch pickup and throw, five-use inventory, interruptions, permanent per-instance disarm, per-hero proficiency, charged Orion attacks and ordinary enemy hit reactions.
-48 native-density sprite frames and per-pose hand attachment metadata; retained full art sources/importer; current inspector and guide.

## Tests executed

The full release runner includes current runtime, movement, controller adapters, AI/combat, laboratory, casino, prison/campaign, subway, stadium, hydropower progression, Broxton/lariat, grabs, reactions, screenshot comparator self-tests, new counter/weapon integration,48-frame technical art validation and20 render-adapter cases.

New counter tests cover all six heroes and four attack classes,30/60/120Hz native lifecycles, meter/health/geometry gates, confirmation and timeout, Specials, physical Attack press/release, five-use misses/interruption/throws,15 enemy reaction families, native Reina rear bonus, projectile exclusion, cinematic/recovery restrictions, continuous endpoints, grounded anchors and synchronized protection cleanup.

Browser checks: real game launches Build248 with the new pickup control; counter hold and meter display; Broxton weapon pickup and corrected hand grip; Frankie Human Shield restraint; Orion Rugbeat three impacts, grounded recovery and clean release. Evidence: `human-shield248.jpg`, `weapon-grip248.jpg`, `counter-grounding248.jpg`.

## Defects found and corrected during QA

- Disarmed Kevin's old fallback referenced an undefined namespace.
- Baked prop art prevented distinct weapon silhouettes; props now attach to explicit hand metadata.
- Drawing the weapon behind the torso hid its shaft; body→weapon→hand occlusion is now regression-tested.
- Rotated held bodies could remain above the floor; landed victims use their own native grounded artwork.
- Nova vault and Rugbeat/running-cross endpoints needed continuity corrections.
- Projectile damage could be confused with its owner's current melee action; explicit non-melee exclusions added.
- Counter/weapon input now respects cutscenes, synchronized states and mandatory recovery.

## Remaining manual gates / limitations

Approved screenshot baselines, full art-style review, all-move visual coverage, physical DualSense hardware and human Normal-difficulty balance remain unexecuted. This report does **not** certify a stable build or every hero/enemy artistic pairing. Existing approved screenshots were not overwritten.

## Reproduce

`node tools/qa242/run.cjs --profile release`

Focused: `node tests/counters248.cjs`, `node tests/counters248-view.cjs`, `python tests/art248.py`.

Architecture: `AUDIT.md`; art prompts: `PROMPTS.md`; exact result details: `../reports242/latest.json`. Changes to retained image bytes are proven lossless in `lossless-repack.json`; no approved scenery was resized.

## Rollback

Restore the checkpoint commit in a separate checkout, or redeploy the retained Build247 Site version `appgprj_6adb9b94a3788191809a764c3e7bbb37~appgver_ee8cdb7a9ad88191963bc95bef179b4c`. The prior deployed source and version remain recoverable.

## Files modified

```
 M AGENTS.md
 M dist/assets/armored-truck-v1.webp
 M dist/assets/arthur195-20.webp
 M dist/assets/arthur195-21.webp
 M dist/assets/arthur195-22.webp
 M dist/assets/bank-elevator-v2.webp
 M dist/assets/bank-interior-v2.webp
 M dist/assets/club-vip76.webp
 M dist/assets/enforcer-concept-v1.webp
 M dist/assets/estates-cart196-0.webp
 M dist/assets/estates-cart196-1.webp
 M dist/assets/estates-cart196-2.webp
 M dist/assets/estates-club196.webp
 M dist/assets/estates-court196.webp
 M dist/assets/estates-golf196.webp
 M dist/assets/financial-alt76.webp
 M dist/assets/grand-hotel-lobby96.webp
 M dist/assets/helicopter-pilot201.webp
 M dist/assets/hotel-kitchen72.webp
 M dist/assets/hydro/control-room243.webp
 M dist/assets/hydro/dam-crest243.webp
 M dist/assets/hydro/pressure-gallery243.webp
 M dist/assets/hydro/turbine-hall243.webp
 M dist/assets/mall-a155.webp
 M dist/assets/nightclub76.webp
 M dist/assets/nightlife-pedestrians95.webp
 M dist/assets/nova-portrait81.webp
 M dist/assets/ophelia-pin193-0.webp
 M dist/assets/ophelia-pin193-1.webp
 M dist/assets/park-visitors161.webp
 M dist/assets/pool-extra193-0.webp
 M dist/assets/reina-concept-v1.webp
 M dist/assets/route74-cars197-0.webp
 M dist/assets/route74-cars197-1.webp
 M dist/assets/route74-cars197-2.webp
 M dist/assets/route74-cars197-3.webp
 M dist/assets/street-thug-concept-v1.webp
 M dist/assets/subway/car245.webp
 M dist/assets/subway/passengers247.webp
 M dist/assets/subway/tunnel245.webp
 M dist/assets/thug-leader-concept-v1.webp
 M dist/assets/uptown-block-b155.webp
 M dist/assets/uptown-traffic113.webp
 M dist/assets/velvet-exterior-v1.webp
 M dist/assets/velvet-interior-v2.webp
 M dist/assets/venue-furniture-v2.webp
 M dist/assets/yacht-city195.webp
 M dist/assets/yacht-deck195.webp
 M dist/assets/yacht-lounge195.webp
 M dist/core.js
 M dist/counters.js
 M dist/game.js
 M dist/gamepad.js
 M dist/index.html
 M dist/shield-view181.js
 M qa/system242/asset-inventory.json
 M qa/system242/suites.json
 M reports242/LATEST.md
 M reports242/assets.json
 M reports242/campaign224-PRISON224-results.json
 M reports242/campaign224.log
 M reports242/current-runtime-certification.log
 M reports242/current216-legacy.log
 M reports242/latest.json
 M reports242/runtime.json
 M reports242/security216-legacy.log
 M reports242/validator-self-tests.log
 M reports246/focused-results.json
?? art-source248/
?? dist/assets/combat248/
?? dist/combat-review248.html
?? dist/combat-view248.js
?? dist/counters248.js
?? dist/weapon-art248.js
?? dist/weapons248.js
?? reports242/combat-art248.log
?? reports242/counter-weapon248.log
?? reports242/weapon-render248.log
?? reports248/
?? tests/art248.py
?? tests/counters248-view.cjs
?? tests/counters248.cjs
?? tools/import-combat248.py
```
