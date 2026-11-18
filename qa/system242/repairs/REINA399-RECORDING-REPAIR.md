# Reina recording repair 399 — development review

Recording: `Screen Recording 2026-11-17 203231.mp4` (117.8 seconds). Source variants: GitHub stack above PR33; owner-only Site above source `1fe860aff527e382134025f97d549dcd6e9d80c5` / published393. Do not merge the stack or treat publication as certification.

| Reported defect | Correction and evidence to review |
|---|---|
| Blurry alternate outfit, white portrait outline | Repack the same approved 725 costume poses from the original lossless plates at up to220 pixels instead of86. Preserve aspect/foot anchor, high-quality Canvas sampling, selected AVIF transport. A new identity-preserving close-up removes the external white contour; white fabric trim remains. |
| Held knife changes model and detaches in run | Held short blades use the same CombatView248 canonical knife as dropped/thrown knives. Re-measured forward-hand sockets for all eight run poses, using the actual motion-atlas scale. |
| Walk/run hitching and gliding enemies | Remove whole-body crossfades. Delegate Downtown locomotion to the complete native gait owners, including martial step/pause motion; preserve clocks and movement speeds. |
| Front-away hip toss loses grip and rotation | Remove the independent eight-pose395 overlay. Restore native hip118 pose selection and turn, synchronized to the existing victim sample. |
| Takedown/ground punch loses contact and frames | Preserve native pair/held owners through Downtown rendering. Reap119/paired301 retain their takedown, ground punch and recovery; verify Saito and Marcus in both facings. |
| Saito pops upright, hook victim below floor | Stop overriding the last0.4 seconds of hook knockdown recovery. Measure actual rotated held/flight silhouettes and correct only their painted offset above the floor; native pair/flight state stays unchanged. |
| Combo appears shorter | Remove the additional0.9 body multiplier for the approved reina134 combo family, retaining all native contact clocks, lift and damage. |
| Grabbed Marcus raises fists/turns away | Four new identity-preserving restrained/pain poses, open lowered hands and facing relative to holder. Other victims retain identity-specific held poses; respect their source facing. |
| Bruno damages the hero without visible motion | Downtown delegates his existing hold/powerBomb/clinchKnee choreography to its native renderer instead of substituting generic attack poses. The existing lift, drive, damage and escape windows stay native. |

All raw failures and superseded attempts remain evidence. Initial audit fixtures inflated maxHp, which disabled identity-specific Marcus rendering, and put walkers out of view; those receipts are not certification. Corrected fixtures preserve native maxHp, use the actual40% heavy-grab threshold, and require observed native walking/capture/punch routes. The first socket revision had a load-order error; fixed before publication. The first package exceeded the hosting cap and had a Windows text-decoding error; retain those logs.

The broader GitHub combat-controller134 charge-readiness test fails `1 !== 0`; the retained PR33 game.js diagnostic also reproduces that mismatch. This is not an authenticated historical baseline or waiver. The current Site variant passes the corresponding test. Approved gameplay source is checked separately against each retained base.

Remaining gates: source-bound final raster review, owner art/feel approval, real DualSense through DSX virtual DS4, approved performance baseline, complete move/enemy coverage, and current inventory/ownership checks. No owner acceptance is authored by the agent. All previous certification holds remain visible.

Final source-bound validation: 70 native scenarios, 4200 raster samples, both facings; all three native combo stages and all three Bruno victim capture poses observed. Royal Uniform playback: 62 playbacks / 2790 samples / zero unmatched bindings. Native simulation preservation: 219 GitHub modules and 226 Site modules unchanged against their retained bases. The GitHub controller charge-readiness failure remains unresolved; the Site corresponding group passes 13 tests. These checks do not establish artistic, physical-controller, performance, or full-game acceptance.

Bruno uses the existing approved powerbomb clocks and damage. The old two-body joint artwork embedded an obsolete ponytail victim. Only that powerbomb joint presentation is bypassed, restoring separate native Bruno and current Reina rendering. Three uniformly hip-registered captured poses per outfit keep loose hair and the selected outfit through lift and drive. Ground/recovery stay native; the joint state is restored after painting. The costume now binds 728 poses (725 original + 3 capture bindings); regular repacked poses are up to220px, new capture cells256px.

GitHub inventory pinned to production commit f58484261ee3f1f2d3df4d487c7eaa27696fa819: zero unavailable source files;191 unmapped runtime modules remain across the broader inventory. Directly loaded ownership diagnostics pass. This is partial coverage, not certification.
