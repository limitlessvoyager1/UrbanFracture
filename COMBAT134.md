# Combat repair134

Checkpoint: f05146dc0fefae7fd97b7512eccdea5b445ce509, tag checkpoint-before-forest-reina-repair134.

Forest's old knife range ended at95–105 units while the drawn blade reached substantially farther; contacts were also a single instant. The new segment follows the active blade from atlas wrist/tip landmarks, uses small anatomical hurtboxes and an active window, and retains protected states/per-strike duplicate prevention. His reverse slash visibly steps32 units to match its shorter blade extension. Existing opener whiffs still discard chaining.

Gunner's commands now reserve one coordinated action, supersede automatic tasks safely, and use real contact distance. The old fixed28-frame tackle could expire before a distant Dog arrived; the Maul now adds necessary approach time, and a miss/blocked path completes safely. Scripted control can no longer be skipped because an automatic task owns the Dog. The old final15-frame follow pass no longer overwrites his Blitz rebound. Maul remains44 damage; Blitz changes from four4 slashes plus16 tackle to three6/6/8 slashes plus12 tackle,32 total. Solo stunned-Dog Blitz is20. Gait stutter came from reusing the42-unit start threshold to stop;60-unit start/12-unit stop hysteresis and smoothed velocity replace this, with phase driven once by actual distance. One neutral atlas covers idle/walk/run/leap/rebound/landing, removing the bright gait-sheet swap.

Forest's shoulder poses have bent connected arms and measured palm landmarks. Normal/tall variations change separation instead of sprite scale or arm length. The existing same hold object persists through the switch. Paired moves and knee artwork remain on their existing path.

Reina has jab/cross/push kick/grounded chest-facing turning head kick. Four presses,25 total damage,64 animation frames plus3 hitstop. Counters/charge/throws remain separate.

Validation: combat134 (mirrored states, full44 Maul from follow/beside/behind/return/retrieval, lethal/obstacle/stun cleanup,32/20 Blitz and rebound, front guard, moving blade chains, two lanes,6 shoulder sizes, opener whiffs and four-press Reina combo); combat-controller134 (standard/raw Sony/DSX simulated controls under final logic); all charge/counter tests, companion126, grip124, gamepad, Uptown routes and Nova128. Browser checked chest-facing grounded finisher, normal shoulder grip, Dog rebound and actual Maul contact. No physical hardware or auditory listening claim.

## Artwork and prompts

Built-in ImageGen. Assets copied into this git-backed Site; no pixel recoloring or pose deformation. Import metadata records connected-component rectangles/seeds, constant scales, palm and blade anchors.

- dist/assets/sprites/reina-repair134.png — exec-326bf02d-8205-4d33-96ec-251fbd16a71d. Prompt:16 isolated full-body poses, reference Reina design plus supplied Taekwondo screenshot, jab/cross/push/grounded turning head kick, final torso faces camera; preserve blue floral dress/sash/sandals/arm guards/long black hair, no jumping or trails.
- dist/assets/sprites/dog-repair134.png — exec-a48f41b5-2e2c-43b5-b42c-54297cfd2ddc. Prompt:16 same-scale Gunner poses,8 quadruped walk phases,4 run, idle/chest tackle/backward rebound/landing; same dark saddle, tan coat, black muzzle and olive harness as established reference, constant lighting/palette, transparent background.
- dist/assets/sprites/forest-repair134.png — exec-01660ffc-3792-4d42-a167-c2b70cdaac11 edited from exec-e8c246a9-d64b-4d95-8346-7f32c29b3058. Prompt:12 connected unchanged ranger poses, three grab heights/side control, three knife windup/contact pairs and recovery/guard; then lower only first two grab poses' palms to shoulder landmarks, preserve other poses, floor/design/scale.

Reference screenshot retrieved from the user's Library: Screenshot2026-10-29 140639.png. It guides Taekwondo choreography; the final torso orientation intentionally changes to face the screen as requested. Game metadata: dist/repair134-data.js. Inspector: dist/repair134.html.
