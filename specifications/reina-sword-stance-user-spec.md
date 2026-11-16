# URBAN FRACTURE — REINA SWORD STANCE OVERHAUL
## Complete Implementation Instructions for ChatGPT Work
### R2 Unique Action • Three Sword Attacks • Energy-Based Combat • Animation and AI Integration

---

# PRIMARY OBJECTIVE

Implement Reina's new Sword Stance as her Unique Action.

Sword Stance is a temporary alternate fighting mode in which Reina draws her katana, adopts a low, wide-legged sword posture, and gains access to three distinct sword attacks.

Her increased range and offensive power are balanced by:

- Slower movement.
- No blocking.
- No counters.
- No dodging.
- No ordinary grabs while in Sword Stance.
- Energy costs for every sword attack.
- Meaningful startup and recovery.
- Vulnerability when enemies approach from unfavorable positions.

The player may cancel the stance with R2.

The stance also ends automatically when Reina lacks sufficient energy to perform any available sword attack.

Preserve her existing Taekwondo moveset, sword specials, grabs, counters, Blitz, and other approved mechanics outside Sword Stance.

Do not modify other heroes.

---

# GATE 0 — AUDIT AND CHECKPOINT

Before implementation:

1. Create a recoverable checkpoint.
2. Identify Reina's current Unique Action binding.
3. Inspect her katana and scabbard assets.
4. Inspect her existing sword specials.
5. Inspect the shared Energy Meter.
6. Inspect input direction resolution.
7. Inspect attack-state ownership.
8. Inspect existing animation controllers.
9. Inspect hitbox and hurtbox systems.
10. Inspect the Developer Panel and regression registry.

Reuse existing systems wherever possible.

Do not introduce a separate sword-combat engine.

Preserve all approved combat-state and animation-lifecycle repairs.

---

# GATE 1 — SWORD STANCE VISUAL REFERENCE

Use the supplied screenshot as the reference for Reina's Sword Stance posture.

The reference establishes:

- Wide leg positioning.
- Bent knees.
- Lowered center of gravity.
- Stable balance.
- Grounded feet.
- Torso rotation.
- Sword held in a ready position.

Adapt this stance to Reina's own anatomy, outfit, and katana.

Do not copy the reference character's clothing, hair, facial features, or other protected visual details.

## Reina's approved identity

Preserve:

- Long blue hair.
- Blue-and-white outfit.
- White cherry blossom emblem.
- Black sandals.
- Black armguards.
- Gold Japanese lettering on armguards and scabbard.
- Left-cheek scar.
- Single arm scar.
- Stud earrings.
- Existing katana design.

Ensure her sword and scabbard remain consistent throughout every animation.

## Stance pose

Reina should adopt a low, wide stance with:

- Both feet firmly planted.
- Knees visibly bent.
- Weight distributed naturally.
- One hand controlling the katana.
- The other hand positioned for balance or a two-handed transition.
- Sword angled in a believable ready position.

Her stance must look deliberate and disciplined, not like an ordinary idle pose with a sword pasted into her hand.

---

# GATE 2 — R2 STANCE ACTIVATION

## Input

Tap R2 while in normal combat stance.

## Animation sequence

1. Reina shifts her weight.
2. Her hand reaches for the katana.
3. Her fingers establish a proper grip.
4. She begins drawing the sword.
5. The blade clears the scabbard.
6. She lowers her center of gravity.
7. Her feet move into the wider stance.
8. She settles into the Sword Stance idle animation.

## Requirements

- Complete draw animation.
- Correct sword-hand attachment.
- Correct scabbard attachment.
- No blade duplication.
- No teleportation.
- No abrupt body scaling.
- Smooth foot movement.
- Visible preparation and recovery.

## Energy

Entering Sword Stance costs no energy.

No cooldown is required initially.

The player must still complete the stance-transition animation before attacking.

## Vulnerability

Reina remains vulnerable during the transition.

She cannot instantly attack, block, or counter before the stance is established.

---

# GATE 3 — SWORD STANCE IDLE AND WALK

Create a complete Sword Stance movement set.

## Idle

Reina maintains the low, wide-legged posture.

Include:

- Subtle breathing.
- Small balance adjustments.
- Controlled sword movement.
- Natural hair and clothing movement.
- Stable foot contact.

Avoid exaggerated idle bouncing.

## Walking

Reina moves more slowly while maintaining her ready stance.

Initial movement speed: 70% of normal walking speed.

### Forward movement

- Short deliberate steps.
- Weight transfers naturally.
- Sword remains ready.
- No foot sliding.

### Backward movement

- Controlled retreating steps.
- Feet maintain balance.
- No sudden turning.
- Sword remains oriented toward the threat.

### Combat-plane movement

- Allow deliberate movement into and out of the screen's depth.
- Maintain proper combat-plane alignment.
- Avoid unnatural foot placement or sprite scaling.

## Turning

Create a dedicated stance-turn animation.

Reina must reposition her feet and sword naturally when changing facing direction.

Do not instantly mirror the sprite without an appropriate transition if that creates a visible snap.

## Restrictions

While in Sword Stance:

- No running.
- No ordinary dodge.
- No blocking.
- No counters.
- No standard grabs.
- No normal Taekwondo combo.
- No automatic energy regeneration.

The stance is an offensive commitment.

---

# GATE 4 — QUICK RISING DIAGONAL SLASH
## Input: Square

This is Reina's basic Sword Stance attack.

## Description

Reina delivers a fast, one-handed upward diagonal slash from her low stance.

The strike should feel sharp, efficient, and controlled.

## Animation choreography

1. Reina shifts her weight slightly.
2. She draws the katana backward into preparation.
3. Her striking shoulder rotates.
4. Her lead foot stabilizes.
5. She swings the sword upward diagonally.
6. The blade travels through a clear rising arc.
7. Her torso follows the movement.
8. The sword reaches its final extension.
9. Reina retracts the blade.
10. She settles back into Sword Stance.

## Proposed frame data — 60 FPS

- Startup: 11 frames.
- Active: 5 frames.
- Recovery on hit: 15 frames.
- Recovery on block: 19 frames.
- Recovery on miss: 23 frames.

## Energy

10 energy.

## Gameplay

- Quick sword attack.
- Good reach.
- Moderate damage.
- Primarily targets enemies in front.
- Can interrupt ordinary enemy attacks on a clean hit.
- Does not automatically knock down enemies.

## Suggested starting damage

14 HP, subject to comparison with Reina's approved attacks.

## Enemy reactions

Ordinary enemies:

- Visible recoil.
- Brief hitstun.
- Small backward displacement.

Heavy enemies:

- Damage and appropriate recoil.
- Existing armor rules apply.

Bosses:

- Damage and approved hit reaction.
- No automatic interruption through armor.

## Recovery

Reina must physically retract the sword and return to her ready stance.

Do not freeze the extended sword pose and snap to idle.

---

# GATE 5 — SPINNING RETREAT SWEEP
## Input: Away + Square

## Description

Reina performs a sword sweep, transitions into a controlled spin, and backsteps away from enemies in front of her.

The attack creates breathing room.

She must finish facing the same direction she faced when the move began.

## Animation choreography

1. Reina shifts weight onto her rear foot.
2. She lowers the sword into a sweeping position.
3. She initiates a horizontal sword sweep.
4. The blade travels through the frontal attack arc.
5. Her torso follows the sword's momentum.
6. She pivots into a controlled spin.
7. Her feet reposition during the rotation.
8. She completes the turn.
9. She takes a short backward step.
10. She plants her feet.
11. Her sword returns to the ready position.
12. She resumes Sword Stance facing her original direction.

## Critical direction rule

Record Reina's facing direction at move startup.

Do not allow the spin to reverse her final facing.

The move's backward displacement is relative to the original facing direction.

## Proposed frame data

- Startup: 16 frames.
- Active sweep: 7 frames.
- Spin and backstep: approximately 15 frames.
- Recovery on hit: 18 frames.
- Recovery on block: 22 frames.
- Recovery on miss: 27 frames.

Define whether movement and recovery overlap in the existing action system; do not simply add every phase together if the animation timeline already includes overlapping events.

## Energy

20 energy.

## Suggested starting damage

12 HP.

## Gameplay

- Hits eligible enemies in the frontal sweep.
- Moderate knockback.
- Creates separation.
- Can affect multiple ordinary enemies.
- Does not automatically grant full invulnerability.

## Displacement

Initial backstep distance: approximately one character width.

Adjust based on existing world scale and movement measurements.

Do not pass through:

- Walls.
- Locked arena boundaries.
- Solid scenery.
- Invalid level geometry.

## Enemy reactions

Ordinary enemies:

- Visible recoil.
- Moderate backward displacement.
- Possible knockdown only if explicitly approved after balancing.

Heavy enemies:

- Reduced displacement.
- Approved stagger resistance.

Bosses:

- Existing resistance rules.

## Recovery

Reina must visibly regain balance after the backstep.

The final pose must transition naturally into Sword Stance.

---

# GATE 6 — CRESCENT CLEAVER
## Input: Forward + Square

## Description

Reina comes out of her low stance, steps forward, raises the katana with both hands, and delivers a powerful downward crescent-shaped slash.

This is the strongest of her three stance attacks.

It is deliberately slower and more punishable.

After the attack, Reina sheathes her sword and automatically returns to her normal Taekwondo stance.

## Animation choreography

### Phase A — Preparation

1. Reina shifts weight forward.
2. She rises slightly from the low stance.
3. Her second hand joins the katana grip.
4. She draws the blade upward.
5. Both hands establish a stable grip.

### Phase B — Forward step

6. Reina steps toward the enemy.
7. Her hips and shoulders rotate.
8. Her feet establish a strong attacking base.

### Phase C — Crescent slash

9. She drives the katana downward in a pronounced crescent arc.
10. Both arms move together.
11. The blade follows a continuous curved path.
12. Her torso follows through.
13. The sword reaches its final position.

### Phase D — Recovery

14. Reina decelerates the blade.
15. She regains balance.
16. Her feet settle.
17. She releases the two-handed grip appropriately.
18. She prepares to sheath the sword.

### Phase E — Sheathing

19. Reina aligns the blade with the scabbard.
20. She guides the katana into the opening.
21. The blade slides into the scabbard.
22. Her hand releases the grip.
23. She returns to her normal fighting stance.

## Proposed frame data

- Startup: 25 frames.
- Active: 7 frames.
- Follow-through: 12 frames.
- Recovery before sheathing: 18 frames.
- Sheathing: approximately 20–26 frames.

The sheathing animation is part of the move's committed recovery.

Reina must not become fully actionable before the approved recovery endpoint.

## Energy

30 energy.

## Suggested starting damage

28 HP.

## Gameplay

- High damage.
- Strong frontal reach.
- Can strike multiple enemies along the blade arc.
- Significant recoil.
- Knockdown against eligible ordinary enemies.
- Heavy enemies and bosses retain resistance.
- Long recovery.
- Automatic exit from Sword Stance.

## Critical

Do not automatically cancel the sheathing animation when the attack hits.

Do not make the sword disappear and reappear in the scabbard.

The sword must visibly travel back into the scabbard.

If Reina is struck during recovery, use the approved interruption and weapon-cleanup system.

After recovery, return her to normal combat stance.

---

# GATE 7 — R2 MANUAL STANCE CANCEL

## Input

Press R2 again while Sword Stance is active.

## Animation

1. Reina stops advancing.
2. She adjusts her sword grip.
3. She rises from the low stance.
4. She aligns the katana with the scabbard.
5. She slides the blade into the scabbard.
6. Her feet return to normal positioning.
7. She resumes her Taekwondo stance.

## Restrictions

Manual cancel is available only from legal neutral or recovery-complete states.

Do not allow R2 to cancel:

- Mandatory attack startup.
- Active attack frames.
- Mandatory recovery.
- Hitstun.
- Knockdown.
- Grapple ownership.

If R2 is pressed during a committed sword attack, buffer a single exit request only if compatible with the approved input system.

Do not allow the player to bypass recovery by repeatedly tapping R2.

## Energy

No energy cost.

---

# GATE 8 — AUTOMATIC EXIT ON LOW ENERGY

If Reina lacks enough energy to perform any available Sword Stance attack, automatically initiate the stance-exit animation at the next legal action boundary.

## Rules

- Minimum required energy is the cheapest available sword attack.
- With the proposed values, that threshold is 10 energy.
- Do not interrupt an active attack simply because its energy cost has been deducted.
- Do not force an instant stance change during hitstun or knockdown.
- Do not deduct additional energy to sheath the sword.
- Do not substitute health for missing energy.

## Important

The auto-exit must use the same physical sheathing animation as manual cancellation.

Do not instantly replace Sword Stance with normal idle.

---

# GATE 9 — INPUT RESOLUTION

Use Reina's existing directional-input system.

## Required mapping

- R2: Enter or request exit.
- Square: Rising Diagonal Slash.
- Away + Square: Spinning Retreat Sweep.
- Forward + Square: Crescent Cleaver.

## Direction interpretation

Forward and Away are relative to Reina's facing direction.

Resolve direction at the moment the attack is accepted.

Use the approved directional input tolerance.

Avoid accidental activation of the wrong sword move when the player is moving slightly.

## Controller

Test on the PS5 DualSense.

Preserve all other heroes' input bindings.

## Existing specials

Audit Reina's existing Triangle-based specials.

Define their interaction with Sword Stance before implementation.

Recommended initial rule:

Triangle-based specials cannot start during Sword Stance. The player must sheath the katana first.

This prevents conflicting sword ownership and animation states.

Do not delete existing specials.

---

# GATE 10 — SWORD COLLISION AND DAMAGE

Every sword attack must use the existing hitbox/hurtbox system.

## Requirements

- Correct sword arc.
- Correct active frames.
- Correct combat-plane tolerance.
- Correct facing.
- No duplicate damage.
- No phantom hits.
- No attacks through solid walls.
- No unintended rear hits.
- Correct multiple-target handling.

## Blade collision

The visual blade and active hit region must remain synchronized.

Do not allow sword damage before the blade reaches the target.

Do not allow damage after the active attack has ended.

## Damage rules

Use the approved damage and armor system.

Sword attacks do not automatically bypass boss armor or invulnerability.

---

# GATE 11 — ENEMY REACTIONS

Create appropriate enemy reactions to each sword attack.

## Rising Diagonal Slash

- Brief recoil.
- Moderate hitstun.
- Small knockback.
- No guaranteed knockdown.

## Spinning Retreat Sweep

- More pronounced recoil.
- Moderate knockback.
- Crowd separation.
- Heavy/boss resistance.

## Crescent Cleaver

- Strong impact.
- Significant recoil.
- Knockdown against eligible ordinary enemies.
- Heavy/boss resistance.

## Visual effects

Use restrained, readable sword effects:

- Brief slash trails.
- Small impact flashes.
- Appropriate hit sparks.
- Optional short hitstop.
- Correct impact sound.

Do not obscure Reina's sword choreography with excessive effects.

---

# GATE 12 — ENEMY AI RESPONSE TO SWORD STANCE

Enemies must recognize Sword Stance as an observable combat state.

Do not give enemies access to future player inputs.

## Ordinary enemies

May:

- Approach cautiously.
- Attempt to flank.
- Pressure Reina after missed attacks.
- Exploit long recovery when legally possible.

## Advanced enemies

May:

- Maintain distance from the sword's frontal reach.
- Attempt to bait the slow Crescent Cleaver.
- Punish missed sword attacks.
- Approach during sheathing recovery.
- Exploit Reina's inability to block or dodge.

## Heavy enemies

May challenge her sword range when protected by legitimate armor.

## AI fairness

All responses must respect:

- Reaction delay.
- Distance.
- Combat-plane alignment.
- Attack eligibility.
- Cooldowns.
- Hitstun.
- Recovery.
- AI Director attack budget.

Preserve Normal difficulty:

- Three-point hostile threat budget.
- Maximum two simultaneous offensive commitments.

Do not allow enemies to instantly punish stance activation simply because the player pressed R2.

---

# GATE 13 — ANIMATION CONSISTENCY

Use Reina's approved model sheet.

All Sword Stance animations must preserve:

- Facial identity.
- Hair length and color.
- Dress design.
- White cherry blossom.
- Black sandals.
- Black armguards.
- Gold Japanese lettering.
- Scabbard position.
- Sword length.
- Character proportions.
- World scale.

## Required animation set

1. Normal idle to sword draw.
2. Sword Stance idle.
3. Sword Stance forward walk.
4. Sword Stance backward walk.
5. Combat-plane movement.
6. Sword Stance turn.
7. Rising Diagonal Slash.
8. Rising Slash recovery.
9. Spinning Retreat Sweep.
10. Spin and backstep.
11. Sweep recovery.
12. Crescent Cleaver preparation.
13. Crescent Cleaver strike.
14. Crescent Cleaver follow-through.
15. Crescent Cleaver sheathing.
16. Manual sheathing.
17. Automatic low-energy sheathing.
18. Hit reaction while sword is drawn.
19. Knockdown while sword is drawn.
20. Recovery and weapon cleanup.

## Critical

Do not use unrelated Reina sprites from older artwork generations.

Do not implement recovery by freezing a pose.

Every transition must have appropriate intermediate frames.

---

# GATE 14 — DEVELOPER PANEL

Add a Reina Sword Stance test section.

Display:

- Current stance.
- Current sword state.
- Energy.
- Current attack.
- Startup frames.
- Active frames.
- Recovery frames.
- Sheathing state.
- Facing.
- Movement speed.
- Hitboxes.
- Hurtboxes.
- Collision results.
- Enemy hit reactions.
- Attack eligibility.
- AI response.

## Test controls

- Enter Sword Stance.
- Force each attack.
- Set energy.
- Force manual cancel.
- Force low-energy exit.
- Force interruption.
- Pause.
- Advance one simulation frame.
- Slow motion.
- Compare before/after animation.
- Restore Defaults.

Use actual runtime values.

---

# GATE 15 — REGRESSION AND BALANCING

Test Reina against:

- Marcus.
- Kevin.
- Bruno.
- Saito.
- Jaguar.
- Talon.
- Representative bosses.

## Required scenarios

1. R2 activates Sword Stance.
2. R2 cancels Sword Stance.
3. Low energy triggers safe exit.
4. Normal melee remains unchanged outside stance.
5. Rising Slash hits correctly.
6. Rising Slash misses correctly.
7. Rising Slash has correct recovery.
8. Sweep creates separation.
9. Sweep ends facing the original direction.
10. Sweep cannot pass through walls.
11. Crescent Cleaver has visible startup.
12. Crescent Cleaver knocks down eligible enemies.
13. Crescent Cleaver sheaths sword naturally.
14. Reina cannot block in stance.
15. Reina cannot dodge in stance.
16. Reina cannot counter in stance.
17. Reina cannot grab in stance.
18. Enemies punish legal recovery windows.
19. Heavy/boss armor rules work.
20. No health substitution occurs.
21. No duplicate energy spending.
22. No duplicate sword damage.
23. No stuck sword props.
24. No inconsistent Reina sprites.
25. DualSense input works.
26. AI Director limits remain intact.
27. Save/load restores a valid sword state.
28. Performance remains acceptable.

## Visual certification

Record each attack at:

- Normal speed.
- Half speed.
- Quarter speed.
- Frame-by-frame.

Inspect sword trajectories, foot placement, body movement, recovery, and sheathing.

Do not certify the mechanic solely through code tests.

---

# IMPLEMENTATION ORDER

## Assignment 1 — Audit and stance foundation

Complete Gates 0–3.

Implement draw, idle, walking, turning, and basic state transitions.

Stop for visual review.

## Assignment 2 — Rising Diagonal Slash

Complete Gate 4.

Implement one-handed attack, energy use, collision, recoil, and recovery.

Stop and verify.

## Assignment 3 — Spinning Retreat Sweep

Complete Gate 5.

Implement sweep, spin, backstep, facing preservation, and recovery.

Stop and verify.

## Assignment 4 — Crescent Cleaver

Complete Gate 6.

Implement two-handed downward crescent strike, knockdown, follow-through, and complete sheathing.

Stop and verify.

## Assignment 5 — Exit and input integration

Complete Gates 7–9.

Implement manual cancel, automatic low-energy exit, and input resolution.

Stop and verify.

## Assignment 6 — Combat and AI integration

Complete Gates 10–12.

Verify collision, enemy reactions, and AI behavior.

Stop and verify.

## Assignment 7 — Full certification

Complete Gates 13–15.

Run visual QA, performance tests, and critical shared regressions.

Stop for approval.

---

# FINAL ACCEPTANCE CRITERIA

Reina must:

- Enter Sword Stance using R2.
- Adopt the screenshot-inspired low sword posture.
- Walk naturally while in stance.
- Move at reduced speed.
- Use three energy-consuming sword attacks.
- Perform a quick rising diagonal slash with Square.
- Perform a sweep, spin, and backstep with Away + Square.
- Finish the sweep facing her original direction.
- Perform a powerful two-handed crescent slash with Forward + Square.
- Automatically sheath the sword after Crescent Cleaver.
- Manually cancel Sword Stance with R2.
- Automatically exit when insufficient energy remains.
- Have no blocking, counters, dodging, or ordinary grabs during Sword Stance.
- Have complete draw and sheathing animations.
- Have complete attack startup, active, follow-through, and recovery animations.
- Produce appropriate enemy hit reactions.
- Preserve existing armor, knockdown, and AI Director rules.
- Preserve her established visual identity.
- Pass DualSense, combat, animation, and performance QA.

# FINAL DESIGN GOAL

Sword Stance should reward careful spacing, anticipation, and energy management.

It should feel powerful when used intelligently, but dangerous when used recklessly.

Reina must remain a Taekwondo specialist whose katana provides an alternate tactical fighting style—not a permanent replacement for her existing combat identity.

Begin with Assignment 1 only and stop for approval before proceeding.
