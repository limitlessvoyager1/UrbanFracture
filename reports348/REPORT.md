# Nightshade Build 348 — restoration and requested corrections

Checkpoint: `checkpoint-before-nightshade348`, source `a769551747c12887726de7951e69cd8f0318f777` (Build347). Isolated entry: `downtown348.html`. Original campaign, Build346 and Build347 remain recoverable and unchanged. This is a review build, not a stable publication.

## Changes and confirmed causes

| Request | Confirmed source issue | Build348 correction |
|---|---|---|
| Restore old front-forward grab | Today’s new sweep owner replaced the original native258 sequence and artwork. | Routes to the preserved native `NightshadeGrabs258.sweep`, documented in Build276. Original authored sweep/standing-baton poses restored:117frames, contacts18/47/65/83, damage8+6+6+6=26. Original artwork is deliberately restored for this move; it is not a newly painted match to the glasses artwork. The move remains vulnerable to ordinary interruption. |
| Faster rear-forward throw |347 used86frames and600initial horizontal flight velocity. | Shared actor/victim timeline runs1.12×, total77frames; release at44/1.12. Initial throw velocity720(+20%). Native landing damage27, three-collateral cap and wrong-plane exclusion retained. |
| Straddle rather than sit beside prone opponent | Actor and victim had separate final horizontal anchors; motion-atlas prone geometry did not match the mount. | Aligns actor over the victim’s torso during the mount; uses matching prone/head-reaction poses. Victim still faces the starting direction. |
| Attached laser and extra pushback | Socket metadata was in local sprite space, but world beam did not include fighter render scale. Beam endpoint was frozen between contacts. | Applies actual production fighter scale, follows the currently displayed wrist pose each render, and increases each pulse’s pushback22→32. Three2-point pulses and native sequential hitstun preserved. |
| Flying-kick fall/get-up | Melee recoil stored an action reference; presentation incorrectly treated that reference as an active paired grapple, showing a standing victim pose throughout the hero’s remaining recovery. | Pairing now requires `action.victim === fighter`. All ten illustrated enemies select intermediate loss-of-balance/fall/impact/grounded/get-up poses using actual native clocks. Short native martial-artist recoveries get a proportional visual timeline, with no recovery-duration change. |
| Faster, higher drone gun and one shot per tap | Projectile height80 was low relative to illustrated bodies;36-frame action rejected taps during recovery. | Upper-body height145, projectile speed1150(previous850),6startup/3active/9recovery. Distinct taps queue individual shots, each paid on action start. Held R2 never auto-fires; recovery, costs, energy limits and interruption still apply. R2+Attack/Dodge chords clear gun requests. |
| Higher drone knockdown | Charge used the same low80height. | Charge traverses upper-body height145. Regular-enemy knockdown and heavy/boss resistance rules remain. |
| Realistic longer horizontal flame | Previous effect was a smooth gradient cone, range335. | Original eight-frame transparent photographic-fire atlas: pale fuel core and turbulent yellow/orange tongues, straight anchored centerline, no dark smoke. Range470; existing damage ticks, energy cost, startup and recovery retained. |
| Miniature missile | Missiles were drawn as thick colored lines. | Both rear missile and throw-assisted missile draw a metal body, pointed nose, stabilizing fins and luminous exhaust. Rear missile travels at820(previous650), height145. |

## Verification

- Runtime: **253,151 assertions passed**, ten enemy families, both directions,30/60/120Hz,240 paired cases. Damage-once, recovery cleanup, lethal outcomes, ordinary interruption, faster vault release, three collateral victims, wrong-plane exclusion, high shots, longer flame and independent taps tested.
- Presentation: **5,425 assertions passed**, whole authored sprites, every enemy’s fall/impact/grounded/rise phases, live wrist attachment, drone visibility and actual world rendering.
- Input: actual `Reader` dispatch tested with synthetic standard DualSense, raw Sony and DSX mappings; three taps produced three paid hits each. Existing gamepad/recovery suites passed. This is not physical-controller testing.
- Build347 runtime regression: **38,191 assertions passed**.
- Native frame recordings: eleven scenarios,2,002 simulation frames, plus80 paired contact examples across ten enemy types and both directions.1×,0.5× and0.25× videos are supplied. These are silent fixed-seed native-render captures, not live browser gameplay or FPS certification.
- Rendered output inspected: restored sweep, centered mount, laser connection, multi-pose flying-kick fall/rise, photographic flame and missile sequences. No proprietary reference frames are shipped as game assets.

### Failures found and resolved during testing

The first heavy-enemy synthetic fixture attempted a full-health contested grab; the heavy correctly broke it. Paired-animation fixtures now put heavies within their native eligible health range; game permissions were not weakened. An initial presentation check exposed Saito’s short recovery causing generic fixed-length fall/get-up segments to overlap. The presentation now fits phases to his actual native duration, preserving his mechanical recovery. The standing-to-supine defect was separately fixed by requiring actual victim identity in the paired-state check. Earlier failed runs are not counted as passes.

## Files

New isolated runtime/view files: `dist/downtown348.html`, `game348.js`, `downtown-view348.js`, `nightshade-combat348.js`, `nightshade-drone348.js`, `nightshade-finish348.js`, `nightshade-art348.js`, `nightshade-view348.js`, `nightshade-world348.js`, `nightshade-fire348.js`, `nightshade-audio348.js`.

New art: `dist/assets/nightshade348/flame.webp` and original master/provenance under `source-art/nightshade348/`. Generated with the built-in image generator; the complete brief and import description are in `PROVENANCE.md`.

Tests/tools: `tests/nightshade348*.cjs`, `tools/nightshade348/`; registered critical suites in `qa/system242/suites.json`. Reporting and rollback rules appended to `AGENTS.md`.

## Limits and rollback

Live browser QA and physical DualSense testing were not performed in this revision. Previous browser validation was interrupted and remains unverified. Full campaign/performance/manual-art certification and existing UF-RENDER-025/027 holds remain open. Do not deploy this review as stable. The front-forward move intentionally uses its original retained hero art, including its older facial/device treatment; other actions retain the current illustrated identity. No unsupported claim that every pose was repainted or every anatomical detail certified.

Rollback: use unchanged Build347 entry/artifact or checkout the checkpoint above. No unrelated campaign systems or approved global enemy damage values were changed.
