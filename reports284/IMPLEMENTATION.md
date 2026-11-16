# Build 284 — Niko reliability and section practice

Recovery checkpoint: `checkpoint-before-niko284` (`cdd4af28faaddd9541647676c95c89107f80647a`).

## Confirmed causes

- Niko's non-knockdown melee explicitly capped stun at 0.20 seconds. The ordinary-enemy response now preserves at least 0.50 seconds for clean standing hits from all seven heroes. Marcus/Kevin lose active attacks on a clean hit; heavy/specialist protections remain separate. Ordinary damage flashes are hit feedback, not damage reduction.
- Niko's interrupted native actions do not call their completion handler, leaving `nikoPose185` behind. Stale poses are retired when no action owns them.
- Legacy Niko walking/running selected only two frames; moving weapons used a generic hand coordinate. Eight complete-body poses per gait now use distance-driven phase and authored per-pose weapon sockets. Existing move and paired-pose renderers retain ownership during actions.
- Niko's native combo rejected early continuation taps. One continuation can now queue throughout a combo; final-hit recovery and other eligible recovery tails use a bounded 0.24-second queue. Recovery is not canceled. Neutral Special still requires one eligible target on each side; Forward Special retains its existing health cost and eligibility.
- Air mount and plain jumping could retain combat-plane velocity. Niko's airborne movement now holds the takeoff lane; synchronized ground takedowns retain their own plane owner.
- Existing practice fixed the scene to restaurant district. The new selector uses all 148 registry entries and preserves the section, enemy group, speed, and health option on restart. Native scene initialization supplies background/route state, then practice removes campaign encounters/props and disables progression finalizers. No campaign tab or save is changed.
- Rooftop cinematic tick previously replaced practice simulation; practice now bypasses that story controller.

## Validation

`node tests/niko284.cjs`: 930 assertions: seven heroes against both ordinary types, full damage/interruption, thirty-frame stun, native combo continuation, bounded normals/specials, stale pose cleanup, air lane/completion in both directions, all 148 scene entries with live groups and after finite-health defeat.

`node tests/niko284-view.cjs`: 138 assertions: sixteen gait frames, short/long weapon sockets, single-body presentation and synchronized-state exclusions.

Existing tests `practice282.cjs` (4107), `niko283.cjs` (98486), and `stats266.cjs` (297) passed during implementation. Final frozen release report is recorded separately; preliminary runs are not release certification.

Browser: native practice launch into hydro control room, actual Developer Menu selector, section-specific launch URL, restart and playback controls inspected. Broader artistic review and physical DualSense remain manual, not passed by VM tests. This remains a playtest build.

## Art

New bitmap gait source: `art-source284/niko-gaits.png`, generated using built-in image generation with the existing approved Niko atlas as identity/style reference. Production: `dist/assets/niko284/gait-0.webp` through `gait-15.webp`. Prompt: exactly sixteen transparent full-body frames in a 4x4 grid, eight sequential walk and eight run poses, identical crimson shirt/black tactical vest/sunglasses/boots, consistent anatomy, visible foot articulation, no extra arms, weapons, shadows or text. Import preserves uniform anatomical scale with individual ground/hand anchors; no unrelated character scales change.

## Execution and rollback

Run `node tools/qa242/run.cjs --profile release`. Manual gates must remain open unless separately reviewed. Restart browser practice to load the current approved configuration. To recover source, use a separate checkout/worktree at the checkpoint above and package/deploy that verified commit; do not hard-reset unrelated work. Restore Defaults is separate from build rollback.
