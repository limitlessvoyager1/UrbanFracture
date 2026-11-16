# Build 285 — Niko reverse DDT

Checkpoint `checkpoint-before-reverse-ddt285` at `6f96990b8c4f25f9b04916ad45653a63f5f300e7` preserves Build284.

Reference: user-supplied Screen Recording 2026-11-07 222143.mp4, especially 0–2 and9–11 seconds; landing continuity immediately after11 seconds inspected as well. No wrestler pin sequence is implemented.

Rear grab + away + Attack uses the existing native Niko185/Grab223/119/Forest125 ownership and class restrictions. Dedicated reverse DDT dispatch supersedes the old whole-body rotation/neck-chop shortcut. Front throws, rear-forward attack, counters, movement, input mappings and global sprite scales stay with their existing owners.

## Timeline at 60Hz

| Frame | Action |
|---|---|
|0|Reach|
|8|Reverse headlock|
|18|Pull head back|
|28–43|Hold|
|44|Knee bend|
|52|Backward drop|
|60|Head-first descent|
|68|Head/shoulder contact; damage and concussion roll|
|82|Release|
|94|Kneeling recovery|
|108–119|Standing recovery|
|120|Native actionable state|

Eight new source poses support continuous 60Hz source-textured enemy articulation; the final standing recovery returns to the approved native Niko sprite. Native enemy artwork is captured by identity, then its neck, spine and legs follow the same simulation sample and shared head anchor. A bounded64-body cache avoids capturing each render frame. Each enemy retains its own visual identity; there is no substitution with Marcus. Ground vertices are constrained above the combat plane. The attacker renders in front of only his own victim. Native paired-motion rotation yields to this owner.

Base damage remains15, now applied at a single landing contact. Native retaliation and injury bonuses remain. Regular concussion chance80%; native resistance multipliers give strong52%, mini36%, boss24%, with existing duration resistance and no refresh/stacking. Heavy/boss grab eligibility and Baylor's individual escape rules remain unchanged. Unimplemented enemies are not falsely certified.

Native practice factories: all23 available types tested in both directions at30/60/120Hz. Their capture, locked ownership, same plane, head anchor, impact, damage settlement, release and hazards are tested. Renderer checks exercise every ENEMY_NAMES type with source-body fixtures; those geometry fixtures are not artistic approval of every rendered costume.

A developer-only one-opponent Niko practice rehearsal button queues the real rear-away command through native capture. It does not bypass heavy/boss eligibility or add a second simulation clock. Existing Pause/+1/+5/+10 controls remain authoritative. Restart duel restores the practice instance.

## Checks

- `node tests/reverse285.cjs`:124948 assertions.
- `node tests/reverse285-view.cjs`:70810 assertions.
- Existing Niko283 (98486 assertions), Niko284, and Stats266 checks passed during development.
- Frozen full release results are in QA.json / RESULTS.md; only executed tests are reported as passed.

Physical DualSense, human balance, approved screenshot baselines and broad artistic review remain separate manual gates. No stable-build claim is made from geometry or VM tests alone.

## Files and recovery

Runtime: dist/reverse-ddt285.js. Rendering: dist/reverse-ddt-view285.js. Practice rehearsal: dist/reverse-ddt-ui285.js. New art metadata: dist/reverse-art285.js, eight referenced WebP files under dist/assets/reverse285. Source art/import: art-source285. Production script order and victim-specific depth comparison updated in index.html/game.js.

Rollback: create a separate checkout at the checkpoint SHA, run its required checks, package and deploy that exact verified source. Do not hard-reset unrelated work. Restore Defaults remains distinct from restoring a prior build.
