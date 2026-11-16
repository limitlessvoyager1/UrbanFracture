# Nightshade255 — Gate2 handgun

Checkpoint: `checkpoint-before-nightshade-gun255` → `dd98dc6a691c796ab93b66a1d44856ae1dd9b0cc` (approved Build254 size).

The approved144logical presentation height, movement, foundational artwork, and all other heroes are retained. Gate2 extends UniqueAction251 and native advanceHeroAction; NightshadeView251 remains the single character renderer. No duplicate character controller.

Implemented: six rounds per new life; one12HP nonpiercing projectile per accepted R2/F/U/V/touch press; source-authored muzzle and locked lane/facing; draw10frames/aim4/release14/recoil7/reholster4 with26frame commitment; twelve-frame empty feedback; six fixed cartridge silhouettes below defense. Ammo is consumed on release; interrupted startup consumes nothing. Native stun/down/grab/sync/recovery rules remain authoritative. No automatic fire or shooting while jumping.

Bullets bypass only armor damage reduction and ordinary hand guarding. Existing invulnerability, scripted protections, synchronized safety, cover and armor stagger rules remain. Ordinary targets receive at most one0.12second stagger per0.9second window; heavy/boss bullet impacts do not cancel their actions. No knockdown or refreshing stun loop. Collision sweeps prevent tunneling and choose nearest cover/enemy before any farther target. Existing torso geometry is extended upward for the visible head, preserving plane collision; short cover below muzzle does not block a bullet above it.

Enemy responses use a visible draw cue, one eligibility-filtered seeded probability attempt, real plane movement, a2.4second attempt cooldown and mandatory step recovery. They do not use direct button state, invulnerability or attack cancellation. Shared Director attack admission is untouched; defensive steps do not create attacks.

Seven new firing poses use one fixed atlas import scale; the final holstered stance reuses the approved idle image and measured waist/sole/barrel anchors. New artwork remains a review candidate, not an automatically approved baseline. Existing visual assets may receive visible-lossless storage repacking only with full alpha/visibleRGBA equivalence evidence.

Validation: tests/nightshade255.cjs covers actual production order at30/60/120Hz, ammo/admission/recovery, cover/plane/nonpiercing/guard/armor, stagger limits, seeded cue response and native respawn. tests/nightshade255-view.cjs checks all26firing frames, size/aspect/sole/muzzle and six cartridge positions at0–6ammo. Existing foundation/input tests now expect the actual Gate2 action instead of obsolete pending-gun feedback. Simulated standard/rawSony/DSX edges are distinct from physical-controller verification.

Browser inspector observed source-based aiming, six rounds then five after release, Marcus120→108 while Kevin remains120, and return through holstering. Main game launch and HUD checked. Inspector: `nightshade251.html`.

Gate3 ammo placement/drop economy and later melee/gadgets/grabs/counters are NOT implemented in this gate. The master specification explicitly requires stopping after Gate2; do not present later gates as complete. No stable-build claim, artistic baseline approval or physical-pad certification.

Rollback: restore the checkpoint commit and redeploy the prior saved Build254 version. Checkpoint does not depend on generated QA output.
