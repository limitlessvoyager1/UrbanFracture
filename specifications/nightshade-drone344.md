# URBAN FRACTURE — NIGHTSHADE COMPLETE DRONE GAMEPLAY OVERHAUL
## Revised Implementation Instructions for ChatGPT Work
### Version 2 — Two Specials, Drone Dodge, Rear Missile, and Energy-Based Combat

---

# PRIMARY OBJECTIVE

Redesign Special Agent Nightshade into an advanced tactical drone specialist.

Nightshade relies on her personal drone for ranged attacks, crowd control, healing, mobility, and specialized throw support.

She must feel mechanically distinct from Reina, Broxton, Nova, Forest/Gunner, Niko, and Orion.

Her combat identity is based on:

- Tactical positioning.
- Energy management.
- Drone-assisted attacks.
- Crowd control.
- Limited defensive options.
- Punishable attack commitment.
- Intelligent spacing.
- High-risk, high-reward gameplay.

Nightshade has **no blocking and no counters**.

Her defensive options are her drone-assisted dodge, tactical interruptions, healing ray, and positioning.

Her two specials consume energy instead of health.

All drone abilities consume appropriate energy.

Preserve her approved visual design, story role, PCBI connections, and character personality.

Do not alter other heroes' combat systems.

---

# GATE 1 — AUDIT AND PRESERVE EXISTING SYSTEMS

Before implementation:

1. Create a recoverable checkpoint.
2. Inspect Nightshade's current move registry.
3. Inspect the existing Energy Controller.
4. Inspect her unique-action input.
5. Inspect special-move inputs.
6. Inspect her existing defensive roll.
7. Inspect front/rear grab moves.
8. Inspect drone implementation, if already created.
9. Inspect character-selection modes.
10. Inspect shared action lifecycle and recovery systems.
11. Inspect the Developer Panel.
12. Inspect save/load and controller mappings.

Identify which systems can be reused.

Do not create duplicate combat, energy, or input controllers.

Preserve approved shared combat repairs and existing AI Director rules.

---

# GATE 2 — FINAL NIGHTSHADE CONTROL MAPPING

Use the existing PS5 DualSense control architecture.

## Normal attacks

**Square:** Standard melee combo.

Preserve her approved melee identity unless separately changed.

## Special 1 — Defensive

**Neutral Triangle:** Healing Ray.

This activates only when Triangle is pressed without a directional special input.

## Special 2 — Offensive

**Forward + Triangle:** Flamethrower.

Forward is relative to Nightshade's current facing direction.

## Unique drone gun

**Tap Unique Action:** Fire one drone gun burst.

Each distinct valid tap commands one burst.

Holding Unique alone must not automatically produce unlimited continuous fire.

## Drone charge

**Unique + Attack:** High-speed drone charge.

This replaces the previous Unique + Triangle charge input.

## Drone dodge

**Circle:** Drone-assisted backward dodge.

This replaces Nightshade's ordinary defensive roll.

## Rear mini-missile

**Unique + Dodge:** Drone fires a mini-missile targeting an eligible enemy behind Nightshade.

This replaces the previous Unique + Dodge healing input.

## Front-grab away throw

**Front Grab + Away + Attack:** Rolling upward kick followed by drone missile launch.

Preserve the newly approved throw choreography.

## Removed controls

Remove:

- Handheld gunfire.
- Standard defensive roll.
- Blocking.
- Counters.
- Unique + Jump drone escape.
- Unique + Triangle drone charge.
- Unique + Attack flamethrower.
- Unique + Dodge healing ray.

## Input priority

Combination inputs must take precedence over single-button actions.

Examples:

- Unique + Dodge must activate the rear missile, not the drone dodge.
- Unique + Attack must activate drone charge, not ordinary melee.
- Forward + Triangle must activate flamethrower, not healing.
- Neutral Triangle must activate healing.

Use a deterministic input-resolution window compatible with existing controller timing.

Do not introduce perceptible input lag.

Preserve approved controls for other heroes.

---

# GATE 3 — PERSONAL DRONE FOUNDATION

Create or update Nightshade's personal companion drone.

## Visual design

The drone should be:

- Compact.
- Futuristic.
- Technologically advanced.
- Consistent with Urban Fracture's illustrated art style.
- Equipped with a gun.
- Equipped with a flamethrower.
- Equipped with mini-missile capability.
- Equipped with a healing emitter.
- Equipped with support handles or an equivalent believable carrying mechanism.

The drone must be visually recognizable and maintain consistent scale.

## Hover behavior

The drone normally follows slightly above and behind Nightshade.

It should:

- Accelerate smoothly.
- Decelerate smoothly.
- Maintain a consistent follow offset.
- Avoid solid obstacles.
- Respect combat-plane positioning.
- Face targets appropriately.
- Return naturally after attacks.
- Avoid blocking Nightshade's sprite.
- Never teleport without a valid scripted reason.

## Drone states

Support:

- FOLLOW.
- IDLE_HOVER.
- AIM.
- GUN_BURST.
- FLAMETHROWER.
- DODGE_SUPPORT.
- CHARGE_PREPARATION.
- CHARGE_FLIGHT.
- CHARGE_RETURN.
- MISSILE_AIM.
- MISSILE_FIRE.
- HEAL_PREPARATION.
- HEAL_ACTIVE.
- ABILITY_RECOVERY.
- REPOSITION.

The drone must not execute conflicting abilities simultaneously.

---

# GATE 4 — ENERGY SYSTEM

Use the existing shared Energy Meter as Nightshade's drone resource.

Do not create a separate second meter.

All drone-related actions consume energy.

## Critical Nightshade exception

Unlike the general special-move system, Nightshade's two specials consume energy only.

They must not consume health when energy is insufficient.

Disable health-for-energy overflow for Nightshade's drone specials and abilities.

If energy is insufficient:

- Reject the ability.
- Preserve the current energy.
- Provide subtle feedback.
- Do not deduct health.
- Do not activate the attack.
- Do not trigger its cooldown.

## Initial energy costs

Assuming a 100-point maximum:

| Ability | Base cost |
|---|---:|
| Gun burst | 6 |
| Drone dodge | 15 |
| Rear mini-missile | 20 |
| Drone charge | 30 |
| Flamethrower | 45 |
| Healing Ray | 50 |

These values are provisional and adjustable in the Developer Panel.

If the approved Energy Meter uses another maximum, scale appropriately.

## Energy regeneration

Preserve the existing approved energy-generation rules.

Eligible successful melee attacks may generate energy.

Do not permit drone attacks to generate more energy than they consume through repeated hitstun or damage ticks.

Recommended initial policy:

- Normal melee hits generate energy.
- Drone gunfire does not generate energy.
- Flamethrower ticks do not generate energy.
- Healing Ray does not generate energy.
- Drone charge does not generate energy.
- Rear missile does not generate energy.

This avoids energy loops.

Energy pickups continue to restore energy normally.

---

# GATE 5 — DRONE MODES

Allow the player to select one of three drone modes when choosing Nightshade.

## Offensive Mode

- Drone attack damage: 120%.
- Drone attack energy cost: 125%.
- Healing amount: 15% maximum HP.
- Healing cooldown: 35 seconds.

## Balanced Mode

- Drone attack damage: 100%.
- Drone attack energy cost: 100%.
- Healing amount: 20% maximum HP.
- Healing cooldown: 45 seconds.

## Defensive Mode

- Drone attack damage: 85%.
- Drone attack energy cost: 80%.
- Healing amount: 25% maximum HP.
- Healing cooldown: 60 seconds.

These are provisional balance values.

## Mode exceptions

- Healing Ray energy cost remains 50 in all modes.
- Drone dodge energy cost remains 15 in all modes.
- Mode attack multipliers apply to gun, missile, charge, and flamethrower.
- Healing Ray's surrounding damage may use the attack-damage modifier, but healing amount follows its own mode-specific value.
- Nightshade's ordinary melee damage is unaffected.

## Mode persistence

- Mode selected at character selection.
- Mode remains active throughout the level.
- Mode persists through save/load.
- No unrestricted mid-combat switching.

---

# GATE 6 — DRONE GUN BURST

## Input

Tap Unique Action.

## Purpose

A weak ranged interruption tool.

## Animation sequence

1. Nightshade issues the command.
2. Drone turns toward the target.
3. Weapon deploys.
4. Drone fires a short burst.
5. Muzzle flash appears.
6. Projectiles travel toward the target.
7. Drone completes recovery.
8. Drone returns to normal hover.

## Gameplay

Suggested base total damage: 5 HP per burst.

The burst may contain multiple visual projectiles, but total damage must remain within the defined damage budget.

## Enemy response

Ordinary enemies:

- Briefly recoil on clean hit.
- May have their approach interrupted.

Heavy enemies:

- Receive appropriate damage.
- Follow approved armor and stagger rules.

Bosses:

- Receive appropriate damage.
- Do not suffer unlimited interruption.

## Restrictions

- Energy cost per burst.
- Short firing recovery.
- No automatic continuous firing from holding Unique.
- No firing during Nightshade's hitstun, knockdown, or grapple.
- No unlimited stunlock.

---

# GATE 7 — FLAMETHROWER OFFENSIVE SPECIAL

## Input

Forward + Triangle.

## Purpose

A powerful, long-reaching flame attack that halts enemy advances and inflicts heavy damage over time.

## Animation sequence

1. Nightshade commands the drone.
2. Drone moves into firing position.
3. Flamethrower assembly deploys.
4. Visible ignition occurs.
5. A long continuous flame projects forward.
6. Enemies within the valid flame area take repeated damage.
7. Flame continues for its approved duration.
8. Flame shuts off.
9. Drone completes recovery.
10. Drone returns to hover.

## Gameplay

- Long horizontal flame.
- Strong crowd control.
- Heavy tick damage.
- Can affect multiple enemies.
- Energy cost: 45 base.
- Meaningful startup.
- Meaningful recovery.

## Enemy advance interruption

Ordinary enemies entering the flame should have their forward advance halted or disrupted.

Use actual hitstun, pushback, or an approved fire-contact state.

Do not simply freeze their animation while their AI continues moving.

## Damage-over-time rules

- Use fixed damage ticks.
- Prevent multiple damage events per target within the same tick.
- Apply consistent hit effects.
- Do not trigger unlimited hitstun from every tick.
- Heavy and boss enemies retain resistance.

## Vulnerability

Nightshade remains vulnerable during appropriate startup and recovery.

The flame does not grant full-body invulnerability.

If Nightshade is interrupted, stop the ability according to its approved interruption policy.

## Energy

Deduct energy once at the committed activation event.

Do not charge energy for every flame tick unless a separate channeling policy is explicitly approved.

Do not allow health substitution.

---

# GATE 8 — HEALING RAY DEFENSIVE SPECIAL

## Input

Neutral Triangle.

## Purpose

Heal Nightshade while creating a short-lived defensive zone around her.

The Healing Ray is both restorative and mildly offensive.

## Animation sequence

1. Nightshade activates the drone.
2. Drone moves above her.
3. Healing emitter deploys.
4. A visible restorative beam surrounds Nightshade.
5. Light spreads around her body.
6. Nearby enemies are affected by the defensive energy field.
7. Healing completes.
8. Beam fades.
9. Drone retracts its emitter.
10. Nightshade returns to her fighting stance.

## Healing amounts

- Offensive: 15% maximum HP.
- Balanced: 20% maximum HP.
- Defensive: 25% maximum HP.

## Cooldowns

- Offensive: 35 seconds.
- Balanced: 45 seconds.
- Defensive: 60 seconds.

## Energy cost

50 energy in every mode.

No health substitution.

## Defensive field

During the active ray:

- Slightly damage nearby enemies.
- Interrupt eligible enemy attacks.
- Halt or push back ordinary approaching enemies.
- Create a short defensive breathing space.

## Proposed defensive damage

Base total damage: 6 HP per eligible target during one complete ray activation.

Apply mode damage multipliers only if appropriate.

Do not allow every visual light pulse to cause a separate full damage event.

## Anti-abuse rules

- Defined startup.
- Defined active duration.
- Defined recovery.
- Cooldown.
- Energy cost.
- No repeated healing from animation loops.
- No healing above maximum HP.
- No activation during hitstun, knockdown, or grapple.

## Important defensive balance

The healing ray must not be an unavoidable panic button.

Nightshade should be vulnerable during startup.

The defensive interruption begins only when the ray becomes active.

Once active, ordinary enemies entering the defensive radius can be interrupted, but heavy enemies and bosses retain approved resistance.

Do not automatically make Nightshade invulnerable throughout the ray.

## Interruption policy

Recommended:

- Energy is committed when the active ray begins.
- Healing applies once at a defined active event.
- Interruption before that event grants no healing.
- Interrupted animations cannot retrigger healing.
- Cooldown begins when the ability successfully commits.

Verify this policy against existing energy and action-state architecture.

---

# GATE 9 — DRONE-ASSISTED DODGE

## Input

Circle.

Replaces Nightshade's normal defensive roll.

## Purpose

A short backward escape that helps Nightshade create space.

## Animation sequence

1. Nightshade prepares to retreat.
2. She reaches toward the drone.
3. Drone moves into reach.
4. Nightshade grabs its support handles.
5. Drone lifts her slightly.
6. Drone carries her backward.
7. She releases.
8. She lands naturally.
9. She regains balance.
10. Drone returns to hover.

## Gameplay

- Short backward displacement.
- Energy cost: 15.
- Limited protected frames.
- Defined startup and landing recovery.
- No unlimited invulnerability.
- No wall or arena-boundary bypass.
- No activation during grapple or mandatory hitstun.

## Critical visual requirements

- Hands connect to the drone.
- Natural lifting motion.
- Stable body scale.
- Correct foot placement.
- No teleportation.
- Smooth flight.
- Complete landing animation.
- Visible recovery before returning to idle.

## Energy exhaustion

If insufficient energy exists, the drone dodge cannot activate.

Provide clear feedback.

Do not automatically substitute a free defensive roll.

This is an intentional vulnerability of Nightshade's design.

---

# GATE 10 — HIGH-SPEED DRONE CHARGE

## Input

Unique + Attack.

## Purpose

Send the drone rapidly forward to strike multiple enemies along Nightshade's combat plane.

## Animation sequence

1. Nightshade commands the drone.
2. Drone aligns with her facing direction.
3. Propulsion visibly charges.
4. Drone accelerates forward.
5. Drone strikes enemies along its path.
6. Ordinary enemies are knocked down.
7. Heavy and boss enemies resist according to approved rules.
8. Drone decelerates at the end of travel.
9. Drone returns naturally.
10. Drone completes recovery.

## Gameplay

- Base energy cost: 30.
- Multi-target collision.
- Strong crowd control.
- Moderate damage.
- Defined cooldown and recovery.
- Limited travel distance.

## Collision requirements

Use swept collision detection or equivalent continuous collision.

Each target receives damage once per charge event unless explicitly designed otherwise.

No homing toward enemies outside the travel path.

Do not pass through solid walls.

## Enemy resistance

Ordinary enemies: knockdown on valid clean hit.

Heavy enemies: stagger or resist knockdown according to armor rules.

Bosses: preserve boss-specific resistance.

## Vulnerability

Nightshade remains vulnerable while the drone is committed away from her.

Do not permit simultaneous gunfire, healing, or missile launch during the charge.

---

# GATE 11 — REAR-TARGETING MINI-MISSILE

## Input

Unique + Dodge.

## Purpose

Protect Nightshade from enemies approaching from behind.

## Targeting

Identify eligible enemies behind Nightshade relative to her facing.

Prioritize:

1. Enemies within the correct combat-plane tolerance.
2. Enemies approaching Nightshade.
3. Enemies within approved missile range.
4. Nearest eligible threat when multiple candidates exist.

Do not target enemies through solid walls.

## Animation sequence

1. Nightshade commands rear defense.
2. Drone rotates toward the rear.
3. Missile launcher deploys.
4. Target lock occurs.
5. Mini-missile launches.
6. Missile travels toward the target.
7. Missile impacts.
8. Drone completes recovery.
9. Drone resumes normal hover.

## Gameplay

- Base energy cost: 20.
- Moderate damage.
- Brief knockback.
- Appropriate hit reaction.
- Limited tracking.
- Defined startup and recovery.

## No target

If no valid enemy exists behind Nightshade:

- Do not launch.
- Do not consume energy.
- Do not trigger cooldown.
- Provide subtle invalid-target feedback.

## Restrictions

- No unlimited missile spam.
- No firing while drone is committed to another ability.
- No attack through solid obstacles.
- No duplicate damage.
- No unintended front-target selection.

---

# GATE 12 — REVISED FRONT-GRAB AWAY THROW

## Input

Front Grab + Away + Attack.

Preserve the newly approved rolling throw assisted by the drone.

## Required choreography

1. Nightshade captures the opponent.
2. She shifts her grip.
3. She falls backward.
4. She rolls onto her back with the opponent.
5. Her legs rise.
6. She plants her feet against the opponent.
7. She kicks the opponent upward.
8. Opponent becomes airborne.
9. Nightshade releases.
10. Drone targets the airborne opponent.
11. Drone fires a mini-missile.
12. Missile strikes the airborne target.
13. Opponent is launched away.
14. Opponent lands.
15. Nightshade rises naturally.
16. Nightshade returns to stance.
17. Drone returns to hover.

## Energy policy

The drone missile component uses energy.

Use a separate, modest throw-missile cost configurable in the Developer Panel.

Recommended initial cost: 15 energy.

If insufficient energy is available, complete a valid non-missile upward throw fallback rather than leaving the grapple stuck.

## Requirements

- Synchronized animation.
- Correct attachment points.
- No teleportation.
- No sprite scaling.
- Visible upward kick.
- Valid missile origin.
- Valid missile collision.
- Correct landing.
- Complete recovery.
- No duplicate damage.

Preserve approved thrown-body secondary collision rules.

---

# GATE 13 — NO BLOCKING OR COUNTERS

Remove Nightshade's playable blocking and counter abilities.

## Requirements

- No block input.
- No counter input.
- No counter animation triggered accidentally.
- No hidden counter advantage.
- No unintended defense-meter logic.
- No obsolete gun-related input conflicts.

Do not remove shared block or counter systems used by other characters.

Nightshade's defenses are:

- Drone-assisted dodge.
- Drone gun interruption.
- Rear mini-missile.
- Flamethrower crowd control.
- Healing Ray.
- Positioning.

Her defensive weaknesses must remain meaningful.

---

# GATE 14 — ACTION LIFECYCLE AND ANIMATION QUALITY

All Nightshade and drone abilities must comply with the shared action lifecycle.

Required phases:

- Startup.
- Active.
- Follow-through.
- Recovery.
- Ready.

Support outcome-dependent behavior where relevant:

- On hit.
- On block.
- On miss.
- On interruption.

## Critical requirement

Do not implement recovery by freezing the final pose and snapping to idle.

Every ability must have meaningful motion.

Examples:

- Flamethrower: drone shuts down emitter and returns to hover.
- Healing Ray: beam fades, emitter retracts, Nightshade regains stance.
- Drone dodge: Nightshade lands and visibly regains balance.
- Drone charge: drone decelerates and returns.
- Rear missile: drone rotates back into hover alignment.
- Grab throw: Nightshade rises from her back and returns to stance.

## Vulnerability

Nightshade remains vulnerable during appropriate recovery frames.

Do not grant invisible invulnerability to conceal missing animation transitions.

---

# GATE 15 — DRONE ABILITY CONCURRENCY

The drone can execute only one committed ability at a time.

## Requirements

- No simultaneous gunfire and flamethrower.
- No simultaneous healing and charge.
- No missile launch while drone is away charging.
- No overlapping dodge and healing.
- No duplicate ability activation.
- No duplicate energy spending.
- No stuck drone states.

## Recovery

The drone must finish its committed ability or enter a valid interruption/return state before another drone action begins.

Nightshade's own actionability and drone readiness may differ.

The system must correctly evaluate both.

---

# GATE 16 — DEVELOPER PANEL

Add or update Nightshade Drone Testing.

Display:

- Drone mode.
- Drone state.
- Drone position.
- Drone facing.
- Current ability.
- Energy cost.
- Energy remaining.
- Cooldowns.
- Startup frames.
- Active frames.
- Recovery frames.
- Current actionability.
- Healing event.
- Flame hit area.
- Missile target.
- Charge collision path.
- Dodge displacement.
- Grapple missile event.

## Testing controls

- Select drone mode.
- Set energy.
- Set HP.
- Force ability.
- Force interruption.
- Spawn enemies behind Nightshade.
- Spawn multiple enemies ahead.
- Spawn heavy enemy.
- Spawn boss.
- Pause.
- Single-frame advance.
- Slow motion.
- Restore Defaults.

Use actual runtime values.

---

# GATE 17 — QA AND BALANCING

Test all abilities in all three drone modes.

## Required enemies

- Marcus.
- Kevin.
- Bruno.
- Saito.
- Jaguar.
- Talon.

## Required scenarios

1. Gun burst interrupts ordinary approach.
2. Gun burst does not infinitely stun.
3. Flamethrower damages multiple enemies.
4. Flame ticks do not duplicate damage.
5. Healing restores correct HP.
6. Healing damages nearby enemies slightly.
7. Healing interrupts eligible attacks.
8. Healing cannot be spammed.
9. Drone dodge moves Nightshade backward.
10. Dodge cannot pass through walls.
11. Drone charge strikes multiple enemies.
12. Heavy/boss resistance works.
13. Rear missile selects a valid rear target.
14. Rear missile rejects invalid targets.
15. Front-grab throw completes.
16. Throw missile fallback works.
17. Insufficient energy rejects abilities.
18. No HP substitution occurs.
19. No simultaneous drone abilities occur.
20. All animations have visible startup and recovery.
21. Character sprite identity remains consistent.
22. Save/load preserves drone mode and state.
23. DualSense input mapping works.
24. AI Director coordination remains valid.
25. Performance remains acceptable with multiple enemies.

## Visual verification

Record gameplay at:

- 1× speed.
- 0.5× speed.
- 0.25× speed.
- Frame-by-frame.

Verify the actual animations rather than relying solely on code tests.

---

# IMPLEMENTATION ORDER

Do not implement all gates simultaneously.

## Assignment 1 — Audit and control migration

Gates 1–5.

Verify existing systems, new controls, energy policy, and drone modes.

Stop for review.

## Assignment 2 — Basic drone offense

Gates 6–7.

Implement gun burst and flamethrower.

Stop and verify.

## Assignment 3 — Healing and dodge

Gates 8–9.

Implement Healing Ray and drone-assisted dodge.

Stop and verify.

## Assignment 4 — Charge and rear missile

Gates 10–11.

Implement drone charge and rear-targeting missile.

Stop and verify.

## Assignment 5 — Grab and defense overhaul

Gates 12–13.

Implement the revised throw and remove blocking/counters.

Stop and verify.

## Assignment 6 — Integration and certification

Gates 14–17.

Verify action lifecycle, concurrency, Developer Panel, QA, and balancing.

Stop for approval.

---

# FINAL ACCEPTANCE CRITERIA

Nightshade must have:

- A persistent personal drone.
- No handheld gun.
- No blocking.
- No counters.
- No conventional defensive roll.
- Drone gun burst on Unique tap.
- Flamethrower on Forward + Triangle.
- Healing Ray on Neutral Triangle.
- Drone-assisted backward dodge on Circle.
- Drone charge on Unique + Attack.
- Rear-targeting missile on Unique + Dodge.
- Revised Front Grab + Away + Attack throw.
- Three selectable drone modes.
- Energy-only drone specials.
- Appropriate energy costs.
- Meaningful recovery and vulnerability.
- Correct heavy/boss resistance.
- Correct DualSense input behavior.
- No ability overlap or energy exploits.
- Complete animation and collision certification.

Do not claim completion until the redesigned Nightshade has been demonstrated in actual gameplay.

# FINAL DESIGN GOAL

Nightshade should be a sophisticated, high-skill tactical character.

Her drone provides exceptional offensive versatility and limited defensive support, but her lack of blocking and counters creates genuine risk.

Success should depend on spacing, resource management, enemy awareness, and choosing the right drone ability at the right moment.

**Preserve approved shared systems, implement in verified stages, and do not silently substitute different moves or controls.**
