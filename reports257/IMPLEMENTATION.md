# Nightshade257 — Gate4 standard combat

Checkpoint: `checkpoint-before-nightshade-melee257`, Build256 commit `836c75fc78928d056164afdbb99a61d5d75b6570`. This is a staged private playtest, not a stable-build certification.

## Audit and integration

Gate4 implements only the six items in master Phase40: four-stage standard combo, charged Poison Dart Pen, synchronized grab combo, neutral jump kick, forward jump kick and downward airborne baton. Directional throws, specials, counters and dodge remain future gates. Approved144logical presentation, original idle/walk/run/get-up art,110HP, handgun, finite ammunition ledger, levels, weather and six existing heroes are retained.

`nightshade-melee257.js` extends the native action clock and character hooks; no duplicate input, AI, grab, knockdown or projectile controller. Every attack has finite startup/active/recovery. Fresh Attack edges drive each standard combo stage; one new edge may buffer the next connected stage without canceling recovery. Misses reset the chain. The native hold-Attack charge owner accepts a registered Nightshade adapter rather than another charging timer. The dart uses the existing swept/nonpiercing bullet lifecycle with a different speed/range/payload and no ammunition cost.

Shared changes: Charge130 accepts character adapters; Forest177 poison accepts optional power/action-rate/walk fields while retaining its original defaults; the native enemy action block applies the optional action-rate multiplier to both timing and action travel. Status ticks do not repeatedly stagger. Native held-positioning delegates only Nightshade's anchors to the new character extension. Handgun255 accepts optional projectile payloads while preserving normal gun behavior. Shared119/223 own confirmed synchronization, heavy contests, anti-regrab and wake fairness.

## Move tuning at60FPS

| Move | Startup | Active | Transition/recovery | Damage |
|---|---:|---:|---:|---:|
| Baton1 |10|4|6|6|
| Baton2 |12|4|7|7|
| Wrist laser |16|12|8|2×3|
| Flying kick |19|6|32|11, knockdown|
| Dart Pen |15|3|28|4 direct|
| Neutral air kick |8|5|14 landing|9|
| Forward air kick |10|6|18 landing|11|
| Downward baton |14|6|24 landing|12, knockdown|

The flying combo kick uses a short actual native jump, can be intercepted in eligible airborne frames and restores the ordinary jump apex afterward. Aerial attacks require Jump then a fresh Attack edge; they follow native trajectories without homing. Source-authored hand, baton tip, wrist, boot and grip anchors supply contact geometry. Damage tuning is initial where the master does not provide a number; human balance approval remains open.

Grab: native contact hold followed by knees at12/24, taser42 and front kick58;28frame final recovery,23 total damage. The existing restrained/recoil victim renderer replaces idle art during the sequence; native electrical resistance/retrigger rules handle taser shock. All participant refs/session locks are released on completion, interruption or transition; deferred lethal damage resolves at release. HighHP heavy attempts still use one25% native roll; ordinary targets and heavy targets at40% do not gain hidden resistance.

Poison: one40% regular/20% strong/20% boss roll on accepted dart contact;5/3/2seconds respectively;50% outgoing attack damage,50% action clock speed,1HP/second controlled drain and existing purple tint. No stacking or refresh; script/status immunity and confirmed synchronized protections remain. This does not inherit Forest's separate defense/guard bypass buffs. No walking-speed penalty is added.

## Art and recovery

24 transparent, source-referenced combat frames are generated and imported at a fixed scale per atlas. `tools/import-nightshade257.py` preserves source proportions and creates alpha-based body/hand/contact anchors. Original generation sources are retained in `art-source257`; new frames are review candidates, not approved screenshot baselines. Existing approved character image bytes were not modified.

The deployment archive was near its size limit. A pixel-identical packing experiment increased size and was fully rejected/restored. Only the unused `downtown-extension-v1.webp` preload was retired from runtime, after confirming there are no image reads. Its exact original bytes remain in `art-source257/retired-runtime`; hashes and removed preload references are in `asset-migration.json`. Current Downtown scenery uses the districts atlas and is unchanged.

## Reproduce

`node tests/nightshade257.cjs`

`node tests/nightshade257-input.cjs`

`node tests/nightshade257-view.cjs`

`node tools/qa242/run.cjs --profile initial`

`node tools/qa242/run.cjs --profile release`

Developer scene: `nightshade251.html`. J=Attack; hold3s/release=Dart Pen; G=Grab; K=Jump; arrows choose aerial attack; F/R2=handgun. UI supports fixed-frame stepping, a nearby melee target, paused grab hold and charged release. Main game uses the existing controls and mappings. Physical controller testing remains unexecuted.

## Remaining review

Browser inspection verified baton contact, restrained victim pose, taser electrical reaction and pen aim/release at approved scale. Recorded screenshot is a review candidate. No approved baseline was overwritten. Broad all-enemy pose review, all-level combat playthroughs, physical DualSense, final artistic approval, performance profiling and human balance are not certified. Zero-ammo melee kill is tested; the full mixed-combat zero-ammo suite remains dependent on later dodge/counter/special gates.

During validation, the legacy input-feedback test caught stale Attack diagnostics while handgun recovery was active. The character command now records the blocked/queued/buffered outcome without canceling recovery. A subsequent full pass caught a missing `reason` fallback in historical input records; the renderer now tolerates those records. Both failures were corrected and their affected tests rerun. The rejected run is retained as evidence, not counted as a successful release run.
