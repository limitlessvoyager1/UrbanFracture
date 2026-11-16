# Assignment4 update — 2026-11-15

Build377 adds completed K'marr (Hammer,65HP) and Ty Sly (Enforcer,75HP) native providers, each with two authored weapon attacks. Normal calls select two healthy, completed responders from the four live providers; one responder is allowed when only one remains eligible. Colton Sharpe remains Assignment5 with the10% gate preserved. See reports377/REPORT.md for actual frame data, artwork and verification.

# Defeated ally update — 2026-11-15

A zero-HP ally settles, gets off the ground, announces departure and quickly limps fully offscreen without fading or returning to combat. That individual role receives a300second injury cooldown, separate from the shared90second call cooldown. Injury timers follow simulation time, pause with gameplay, and survive save/load/reset. Healthy teammates remain eligible. These rules supersede old defeat removal below.

# Continuity and departure update — 2026-11-15

Active backup carries across ordinary street-section changes and locked-battle camera pans, preserving actor identity, HP and the original support deadline. Allies walk back into the arena rather than being deleted or clamped into view. Reacquisition/approach is modestly quicker, while native attack frame data, damage, mandatory recovery, protection and the single friendly attack budget remain. Each living defector announces departure by name before walking offscreen; subtitles are mandatory, with optional system speech under the existing Sound setting.

# Arrival update — 2026-11-15

Successful phone connections now wait3–4 seconds before dispatching the pair. All backup must begin fully outside the current camera and walk through a clear entrance route, never appear beside Broxton. Keep ENTER active through native entrance completion; do not start the shared20-second timer or offense while an actor is still entering. These timing/entry rules supersede the original arrival timing below.

# Canonical backup names — 2026-11-15

| Role | Character name |
|---|---|
| Bruiser | Byron Bastion |
| Gunner | Michelle Roxx |
| Hammer | K'marr |
| Enforcer | Ty Sly |
| Cutter | Colton Sharpe |

These names replace role-only display names; internal role IDs remain unchanged.

# Rate update — 2026-11-15
User requested Cutter on approximately 10% of successful calls, replacing the original 5% target wherever it appears below. All other staged requirements remain in force.

# URBAN FRACTURE — BROXTON'S SYNDICATE BACKUP
## Complete Work Implementation Specification
### Five Defectors • Tactical Selection • Cell Phone Animation • Friendly AI • Combat Director Integration • QA

---

# PRIMARY OBJECTIVE

Implement Broxton's new Unique Action, **Syndicate Backup**.

When Broxton presses his Unique Action button, he takes out his personal cell phone and calls former syndicate associates who remain loyal to him.

Two defectors enter the active encounter, assist him against enemies, and leave after a fixed duration or when defeated.

Five defectors are available from the beginning:

1. The Bruiser — Tank / Crowd Control
2. The Gunner — Ranged Support
3. The Hammer — Close-Range Disruptor
4. The Enforcer — Mid-Range Striker
5. The Cutter — Aggressor / Bleed / Rare Wildcard

Each defector has exactly two offensive moves.

All five have distinct artwork, animations, combat roles, positioning preferences, and simple AI.

The Cutter is a rare wildcard who deals considerably more damage than the others.

The system must integrate with Urban Fracture's existing:

- Unique Action input.
- Shared Energy Meter.
- Action lifecycle.
- Hitstun and recovery.
- Hitbox/hurtbox system.
- Smart AI Director.
- Friendly/hostile targeting.
- Level encounter controller.
- Developer Panel.
- Save/load and regression infrastructure.

Do not create parallel combat engines.

Preserve approved Broxton mechanics, including Iron Will, his grabs, Blitz, counters, and existing special moves.

## Scope restrictions

- All five defectors are available from the beginning.
- No story recruitment requirements.
- No manual backup selection.
- No backup selection through the phone pause menu.
- No alternate button combination for selecting defectors.
- The Unique Action button alone initiates the call.
- Maximum two defectors per successful call.
- Do not allow backup stacking.

Use the supplied five-defector concept image as the character-design reference.

---

# GATE 0 — AUDIT, CHECKPOINT AND INPUT RESOLUTION

Before modifying production code:

1. Create a recoverable project checkpoint.
2. Identify the current approved stable build.
3. Inspect Broxton's Unique Action input and current action bindings.
4. Identify any existing ability assigned to that input.
5. Inspect the shared Energy Meter.
6. Inspect existing ally AI, including Gunner's companion architecture.
7. Inspect enemy targeting and attack-budget rules.
8. Inspect spawn and exit systems.
9. Inspect existing animation certification.
10. Inspect the Developer Panel and test registry.

## Input conflicts

The new Syndicate Backup ability must occupy Broxton's Unique Action slot.

If another ability currently uses that slot, report the conflict and migrate or retire only the conflicting binding after confirming the approved move registry.

Do not silently remove Iron Will or other established abilities.

## Checkpoint

Create an isolated development branch or equivalent recoverable Work checkpoint.

Do not modify unrelated characters or levels.

---

# GATE 1 — CELL PHONE ACTIVATION

## Input

**Tap R2 — Unique Action**

One valid button press attempts to initiate Syndicate Backup.

Holding R2 must not repeatedly place calls.

Do not trigger backup from the pause-menu cell phone.

## Successful call animation

Broxton must perform a complete physical animation:

### Phase A — Reach

- Broxton reaches toward his pants pocket.
- His shoulder and torso move naturally.
- His hand approaches the pocket.

### Phase B — Retrieve phone

- His hand grips the phone.
- He removes it from the pocket.
- The phone remains attached to his hand.
- No floating or disconnected phone sprite.

### Phase C — Dial

- Broxton brings the phone in front of his face.
- He glances down.
- He presses a button with his thumb.
- The screen illuminates his face with a subtle cool glow.

### Phase D — Ring

- A short ringtone or connection tone plays.
- The phone remains visible.
- Broxton waits for the call to connect.

### Phase E — Speak

- Broxton raises the phone to his ear.
- He delivers his short dialogue.
- The selected defector responds.
- The second selected defector may add a brief acknowledgement when appropriate.

### Phase F — Finish

- Broxton lowers the phone.
- He returns it to his pocket.
- His arm returns naturally to position.
- His torso returns to fighting posture.
- He becomes fully actionable at the approved recovery endpoint.

## Timing

Initial total animation target: approximately 72 frames at 60 FPS.

This is a starting point, not a requirement to artificially freeze Broxton for 72 frames.

Allocate timing to actual animation phases.

The connection/commit event should occur before the entire animation finishes, so backup can arrive while Broxton pockets the phone.

## Vulnerability

Broxton is vulnerable during the call.

He cannot block, dodge, attack, or begin another committed action during mandatory call startup.

If struck before connection:

- Interrupt the call.
- Play the appropriate hit reaction.
- Cancel backup.
- Do not spend the full energy cost.
- Do not activate the 90-second cooldown.
- Apply a 5-second retry delay.
- Ensure the phone does not remain stuck in his hand.

If struck after connection:

- Backup still arrives.
- Full energy cost remains spent.
- Cooldown remains active.
- Broxton transitions into the correct hit reaction.
- The phone is safely returned, dropped/recovered through a valid animation, or hidden through a deliberate interruption cleanup.

Do not allow the phone prop to persist incorrectly after knockdown.

## Phone lighting

The phone screen should create a subtle cool light on Broxton's:

- Face.
- Jaw.
- Neck.
- Hand.

The light must:

- Follow the phone.
- Fade when the phone is lowered.
- Respect the current environmental lighting.
- Remain subtle during daylight.
- Be more noticeable at night.
- Avoid excessive rendering overhead.

Use a lightweight effect appropriate to the game's rendering system.

---

# GATE 2 — PHONE AUDIO AND PERSONALITY

Create a short connection tone and a collection of brief spoken exchanges.

Use original dialogue.

Do not copy real telecommunications recordings.

## Successful call format

Broxton speaks first.

The selected primary defector responds.

Occasionally the second defector adds a short acknowledgement.

Keep the entire exchange brief enough to avoid delaying gameplay.

### Broxton opening lines

Randomly choose from:

- "It's Broxton. I need backup."
- "Got some trouble. Get over here."
- "You boys still owe me a favor."
- "Time to earn your keep."
- "I need two of you. Now."
- "Things are getting ugly. Move."

## Bruiser response lines

- "Say less. I'm coming."
- "Who needs breaking?"
- "Been waiting for this call."
- "I'll clear you some room."

## Gunner response lines

She should sound cocky and confident.

- "Aw, you missed me already?"
- "Hope you saved me some targets."
- "Relax, big guy. I've got range."
- "Try not to get in my line of fire."

## Hammer response lines

- "Got my hammer. On my way."
- "Sounds like demolition time."
- "I'll loosen 'em up."
- "Tell 'em to hold still."

## Enforcer response lines

- "I'll keep 'em at a distance."
- "Already moving."
- "I'll open a path."
- "They won't get past me."

## Cutter response lines

The Cutter should sound intense and slightly unpredictable.

- "Heh. Finally."
- "You sure you want me there?"
- "This should be interesting."
- "Don't start without me."

## Broxton's short responses

Randomly choose a compatible response:

- "Make it quick."
- "Good. Move."
- "Don't get carried away."
- "I owe you one."
- "Just get here."
- "Keep it under control."

For Cutter calls, Broxton may specifically say:

- "And don't go crazy."
- "Remember whose side you're on."

## Dialogue rules

- Avoid the same exchange on consecutive successful calls.
- Keep dialogue synchronized with mouth and body animation where feasible.
- Allow subtitles.
- Respect voice-volume settings.
- Do not delay gameplay waiting for an audio file to finish.
- If recorded voices are unavailable, use subtitles and temporary original audio placeholders; do not claim final voice acting is complete.

---

# GATE 3 — FAILED CALLS AND OPERATOR HUMOR

If the player presses Unique Action during cooldown:

- Do not spend energy.
- Do not reset cooldown.
- Do not summon allies.
- Do not play the full call animation.
- Play a brief unavailable/busy tone.
- Show subtle cooldown feedback.

Occasionally play a humorous automated operator line.

## Example operator messages

- "We're sorry. Your backup is currently unavailable."
- "Your requested associates are outside the ass-kicking coverage area."
- "All available reinforcements are currently assisting other callers."
- "The person you are trying to reach is unavailable. Please try not to die."
- "Your associates have temporarily placed you on hold."
- "We're experiencing unusually high demand for violent assistance."

## Frequency

Most failed attempts should use only:

- A short busy tone.
- A brief phone-screen notification.
- Or a subtle HUD cooldown indication.

Full operator lines should be occasional.

Do not allow rapid button tapping to stack multiple voice lines.

## Other failure conditions

If Broxton has insufficient energy:

- Show an insufficient-energy indication.
- Do not play a misleading successful-call sound.
- Do not spend HP as a substitute unless separately approved.

If backup is already active:

- Do not create additional allies.
- Play a brief busy/unavailable response.

If the level temporarily prohibits reinforcements:

- Display a context-appropriate unavailable message.
- Do not consume energy.

---

# GATE 4 — BACKUP RESOURCE AND DURATION

## Starting balance

- Energy cost: 30.
- Cooldown: 90 seconds.
- Maximum active defectors: 2.
- Active duration: 20 seconds.
- Arrival delay: approximately 1–2 seconds.
- No backup stacking.
- No health-for-energy substitution for this ability initially.

## Cooldown

Begin the cooldown when the call successfully connects.

Do not begin cooldown when the defectors leave.

## Duration

Start the 20-second active timer when the first defector becomes combat-ready.

The second defector must not receive an unintentionally longer duration because of staggered arrival.

## End conditions

Backup ends when:

1. The duration expires.
2. Both defectors are defeated.
3. A level transition safely ends the summon.
4. A scripted encounter explicitly requires safe cleanup.

If one defector is defeated, the surviving ally continues until their own defeat or the shared timer expires.

## Departure

At timer expiration:

- Stop selecting new attacks.
- Allow an already committed attack to resolve safely or cancel through a defined non-damaging disengagement.
- Play a short disengagement animation.
- Run toward a valid exit.
- Despawn only after reaching the exit or leaving the visible playable area.

If a valid physical exit cannot be reached, use an approved offscreen cleanup transition rather than leaving the ally trapped indefinitely.

Do not abruptly erase visible allies in the middle of attacks.

---

# GATE 5 — BACKUP SELECTION DIRECTOR

Create a lightweight selection component within the existing encounter/AI infrastructure.

## Available roster

All five defectors are eligible from the beginning.

No recruitment system.

No manual selection.

## Selection

Choose two different defectors when the call connects.

Use a combination of:

- Enemy composition.
- Enemy distance.
- Ranged threats.
- Heavy threats.
- Enemy aggression.
- Current crowding.
- Role complementarity.
- Controlled randomness.

## General selection behavior

Approximately 75% tactical suitability influence and 25% controlled variation.

This is a weighting concept, not a hard rule that the same two characters must appear 75% of the time.

Avoid always selecting perfect counters.

## Cutter wildcard

The Cutter is intentionally rare.

Target approximately 5% of successful calls containing the Cutter during long-run balancing tests.

He may appear alongside any of the other four defectors.

Do not let his high damage cause the selection algorithm to favor him automatically.

Use a separate rarity gate before normal tactical selection.

Suggested process:

1. Roll for Cutter wildcard eligibility.
2. If selected, reserve one ally slot for Cutter.
3. Select the second ally using tactical suitability.
4. Otherwise, select two allies from Bruiser, Gunner, Hammer, and Enforcer.
5. Apply role-complementarity weighting.
6. Prevent duplicates.

## Example tendencies

- Many melee enemies: Bruiser and Hammer favored.
- Gunmen/projectiles: Gunner favored.
- Enemies outside grab range: Enforcer favored.
- Fast aggressive enemies: Hammer favored.
- Heavy enemies: Bruiser and Enforcer favored.
- Cutter: rare wildcard regardless of ordinary suitability ranking.

## Randomness

Use the game's seeded random system where available.

Allow Developer Panel tests to reproduce the same selection.

---

# GATE 6 — SHARED FRIENDLY SUPPORT AI

Create a simple Friendly Support AI controller.

Reuse the existing:

- Character movement.
- Combat-plane navigation.
- Attack registry.
- Collision system.
- Hit reactions.
- Hitstun.
- Knockdown.
- Recovery.
- Animation lifecycle.
- Targeting rules.

Do not create five separate AI engines.

## Common AI states

- ENTER.
- FOLLOW.
- ACQUIRE_TARGET.
- APPROACH_IDEAL_RANGE.
- POSITION.
- ATTACK.
- RECOVER.
- REASSESS.
- HITSTUN.
- KNOCKDOWN.
- DEFEATED.
- DISENGAGE.
- EXIT.

## Common decision process

1. Find eligible hostile targets.
2. Evaluate target priority.
3. Select a legal attack.
4. Move to ideal range and combat plane.
5. Request friendly attack commitment.
6. Execute the attack.
7. Complete recovery.
8. Reassess.

## Target priorities

Favor:

- Enemies attacking Broxton.
- Enemies grabbing Broxton.
- Enemies preparing dangerous attacks.
- Enemies within the defector's ideal range.
- Enemies whose positioning allows safe attacks.

Avoid:

- Unreachable enemies.
- Enemies behind solid walls.
- Invalid combat-plane targets.
- Already defeated enemies.
- Repeatedly chasing targets across the entire level.

## Friendly attack budget

Initially allow only one defector to begin a committed offensive attack at a time.

The other ally may:

- Reposition.
- Guard its spacing.
- Approach another target.
- Recover.
- Evade an incoming threat.

The friendly attack budget must remain separate from the hostile enemy threat budget.

Do not let the allies continuously attack without recovery.

---

# GATE 7 — THE BRUISER
## Tank / Crowd Control

## Appearance

Use the approved concept:

- Bruno-sized.
- Very muscular.
- Shirtless.
- Long rugged pants.
- Several chest tattoos.
- Heavy boots.
- Large intimidating silhouette.

## Combat role

The Bruiser protects Broxton by occupying space, absorbing pressure, and disrupting nearby enemies.

## Initial stats

- HP: 85.
- Movement: Slow.
- Attack power: Moderate.
- Durability: High for a temporary ally.
- Ideal range: Close.

## Move 1 — Power Punch

### Proposed frame data at 60 FPS

- Startup: 18 frames.
- Active: 5 frames.
- Recovery on hit: 20 frames.
- Recovery on block: 25 frames.
- Recovery on miss: 30 frames.

### Animation

1. Plants his lead foot.
2. Pulls his striking shoulder backward.
3. Rotates his torso.
4. Throws a heavy punch.
5. Transfers weight into the strike.
6. Follows through.
7. Retracts his arm.
8. Regains balance.
9. Returns to fighting stance.

### Gameplay

- Strong single-target strike.
- Moderate knockback.
- Significant recoil on ordinary enemies.
- Can interrupt ordinary attacks.
- Heavy/boss armor rules still apply.

### AI

Prefer when:

- Enemy is directly ahead.
- Enemy is within close range.
- Enemy is threatening Broxton.
- Grab is unavailable or unsafe.

## Move 2 — Grab and Throw

### Proposed timing

- Grab startup: 16 frames.
- Grab active: 5 frames.
- Throw choreography: approximately 35–45 frames.
- Recovery: 25–35 frames.

### Animation

1. Reaches toward target.
2. Secures a valid grab.
3. Pulls target close.
4. Establishes stable grip.
5. Lifts or redirects target.
6. Throws target away from Broxton.
7. Target travels along a valid trajectory.
8. Target lands.
9. Bruiser completes follow-through.
10. Bruiser returns to stance.

### Gameplay

- Crowd-control throw.
- Creates space.
- Can knock down eligible ordinary enemies.
- Thrown-body collisions use approved rules.
- Heavy and boss resistance remains intact.

### AI

Prefer when:

- Enemy is too close.
- Broxton is being crowded.
- Multiple enemies are approaching.
- A legal grab opportunity exists.

Do not spam grabs.

---

# GATE 8 — THE GUNNER
## Ranged Support

## Appearance

Use the approved concept:

- Cocky female.
- Red bandana.
- Dark crop top.
- Olive cargo pants.
- Tactical belt.
- Pistol.
- Confident posture.

## Combat role

The Gunner provides ranged pressure and disrupts distant threats.

## Initial stats

- HP: 55.
- Movement: Fast.
- Durability: Low.
- Ideal range: Mid-to-long.

## Move 1 — Power Gunshot

### Proposed frame data

- Startup: 16 frames.
- Active/projectile launch: 1 defined firing event.
- Recovery on fire: 22 frames.
- Additional reload/cooldown as configured.

### Animation

1. Raises pistol.
2. Establishes firing stance.
3. Aims toward target.
4. Fires a powerful shot.
5. Visible muzzle flash.
6. Recoil moves wrist and arm.
7. Stabilizes weapon.
8. Returns to ready stance.

### Gameplay

- Strong single projectile.
- Moderate damage.
- Clear impact reaction.
- Can briefly interrupt eligible enemies.
- Does not permanently suppress bosses.

### AI

Prefer when:

- A high-priority target is at range.
- A gunman threatens Broxton.
- A clear firing lane exists.

## Move 2 — Triple Shot

### Proposed frame data

- Startup: 12 frames.
- Three firing events separated by approximately 7 frames.
- Recovery after final shot: 28 frames.

### Animation

1. Acquires target.
2. Raises pistol.
3. Fires shot one.
4. Shows recoil.
5. Re-centers aim.
6. Fires shot two.
7. Shows recoil.
8. Re-centers aim.
9. Fires shot three.
10. Lowers pistol slightly.
11. Completes recovery.

### Gameplay

- Three separate lower-damage projectiles.
- Total damage balanced against Power Gunshot.
- Useful against approaching enemies.
- Limited interruption per target.
- No infinite stunlock.

### AI

Prefer when:

- An enemy is advancing toward her.
- A target remains within the firing lane.
- Multiple eligible threats are aligned.
- Power Gunshot is unavailable.

## Gunner safety

- No friendly fire.
- Requires clear line of fire.
- Repositions if Broxton or another ally obstructs the shot.
- Vulnerable at close range.
- Cannot fire during hitstun or reload.

---

# GATE 9 — THE HAMMER
## Close-Range Disruptor

## Appearance

Use the approved concept:

- Mixed-race male.
- Athletic muscular build.
- Short curly hair.
- Gray sleeveless shirt.
- Rugged pants.
- Gloves.
- Claw hammer.

## Combat role

Fast close-range disruption.

## Initial stats

- HP: 65.
- Movement: Fast.
- Durability: Medium.
- Ideal range: Very close.

## Move 1 — Fast Hammer Combo

### Proposed frame data

- First swing startup: 10 frames.
- First active: 4 frames.
- Second swing startup: 12 frames.
- Second active: 4 frames.
- Recovery on completion: 22 frames.
- Whiff recovery: 28 frames.

### Animation

1. Raises hammer near shoulder.
2. Delivers fast first strike.
3. Recoils slightly.
4. Redirects hammer.
5. Delivers second strike.
6. Follows through.
7. Lowers weapon into ready position.

### Gameplay

- Two-hit close-range combo.
- Moderate total damage.
- Good against ordinary enemies.
- Brief interruption on valid hits.
- No guaranteed stun lock.

### AI

Prefer when:

- Target is within close range.
- Enemy is aggressively advancing.
- Target is already committed to an unsafe attack.

## Move 2 — Hammer Bash

### Proposed frame data

- Startup: 17 frames.
- Active: 5 frames.
- Recovery on hit: 22 frames.
- Recovery on miss: 32 frames.

### Animation

1. Widens stance.
2. Draws hammer backward.
3. Shifts body weight.
4. Delivers a powerful bash.
5. Weapon follows through.
6. Arm and torso recover.
7. Returns to ready stance.

### Gameplay

- Stronger single hit.
- Significant stagger or knockback.
- Can interrupt eligible ordinary attacks.
- Punishable on miss.

### AI

Prefer when:

- Enemy is recovering.
- Enemy is attacking Broxton.
- A clean opening exists.

---

# GATE 10 — THE ENFORCER
## Mid-Range Striker

## Appearance

Use the approved concept:

- Muscular Black male.
- Braided hair.
- Sleeveless dark vest.
- Rugged olive pants.
- Gloves.
- Rusty rebar weapon.

## Combat role

Controls the space between close-range brawlers and ranged shooters.

## Initial stats

- HP: 75.
- Movement: Moderate.
- Durability: Medium.
- Ideal range: Mid-range.

## Move 1 — Rusty Rebar Swing

### Proposed frame data

- Startup: 16 frames.
- Active: 6 frames.
- Recovery on hit: 20 frames.
- Recovery on miss: 28 frames.

### Animation

1. Positions rebar across body.
2. Rotates shoulders.
3. Sweeps weapon horizontally.
4. Rebar follows a continuous arc.
5. Weapon passes through the active attack zone.
6. Torso completes follow-through.
7. Returns weapon to ready position.

### Gameplay

- Broad horizontal hit area.
- Moderate damage.
- Can strike multiple eligible enemies.
- Creates space.
- Knockback is controlled.

### AI

Prefer when:

- Multiple enemies are within mid-range.
- Enemies approach from the same side.
- Broxton needs space.

## Move 2 — Rebar Rush Thrust

### Proposed frame data

- Startup: 20 frames.
- Forward travel and active phase: 8–12 frames.
- Recovery on hit: 26 frames.
- Recovery on miss: 36 frames.

### Animation

1. Lowers stance.
2. Aligns rebar forward.
3. Plants rear foot.
4. Accelerates toward target.
5. Thrusts rebar forward.
6. Reaches maximum extension.
7. Decelerates.
8. Pulls weapon back.
9. Regains balance.
10. Returns to ready stance.

### Gameplay

- Linear advancing attack.
- Good reach.
- Moderate knockback.
- Can interrupt eligible enemies.
- Must stop at walls and arena boundaries.

### AI

Prefer when:

- Enemy is outside ordinary swing range.
- A clear approach lane exists.
- Target is preparing a ranged attack.
- No collision hazard blocks the route.

---

# GATE 11 — THE CUTTER
## Rare Wildcard / Aggressor / Bleed

## Appearance

Use the approved concept:

- White male.
- Short light hair.
- Rugged face.
- Tattoos.
- Sleeveless dark vest.
- Black cargo pants.
- Machete.

## Combat role

High-damage aggressive specialist.

He should be dangerous, intense, and noticeably less predictable than the other defectors.

## Selection rarity

Approximately 5% of successful calls.

He is not a guaranteed response to any enemy composition.

## Initial stats

- HP: 60.
- Movement: Fast.
- Durability: Low-to-medium.
- Damage: High.
- Ideal range: Close.

## Move 1 — Machete Chop

### Proposed frame data

- Startup: 18 frames.
- Active: 5 frames.
- Recovery on hit: 22 frames.
- Recovery on miss: 32 frames.

### Animation

1. Raises machete.
2. Draws shoulder backward.
3. Plants lead foot.
4. Delivers a forceful downward chop.
5. Weapon follows through.
6. Pulls blade back.
7. Returns to stance.

### Gameplay

- High single-target damage.
- Strong hit reaction.
- Limited bleed application to eligible enemies.
- Heavy/boss resistance remains intact.

### AI

Prefer when:

- Target is recovering.
- Target is already staggered.
- Target is within close range.
- A clear attack opening exists.

## Move 2 — Machete Double Slash

### Proposed frame data

- First slash startup: 12 frames.
- First active: 4 frames.
- Second slash startup: 14 frames.
- Second active: 5 frames.
- Recovery on completion: 30 frames.
- Whiff recovery: 38 frames.

### Animation

1. Rotates torso.
2. Delivers first diagonal slash.
3. Weapon follows through.
4. Shifts footing.
5. Reverses direction.
6. Delivers second slash.
7. Completes momentum.
8. Regains balance.
9. Returns to ready stance.

### Gameplay

- Two-hit high-damage attack.
- Strong pressure.
- Bleed effect may apply under approved rules.
- Longer recovery than ordinary attacks.
- No unlimited bleed stacking.

### AI

Prefer when:

- Target is isolated.
- Target has an extended recovery window.
- The Cutter can complete both strikes safely.

## Bleed policy

Use the existing status-effect system.

If no approved bleed status exists, propose a small capped damage-over-time effect rather than inventing an uncontrolled new subsystem.

Suggested initial limit:

- One bleed application per target from the Cutter.
- No unlimited stacking.
- Bosses may have reduced effect or immunity according to existing rules.

## Wildcard balancing

The Cutter should deliver significantly more damage than ordinary defectors, but should not be invulnerable or permanently stagger enemies.

His rarity, lower durability, and longer recovery provide counterbalance.

---

# GATE 12 — PROVISIONAL DAMAGE BALANCE

Inspect the game's current damage scale before applying final values.

Use the following only as starting targets.

| Defector | Move | Proposed total damage |
|---|---|---:|
| Bruiser | Power Punch | 12 |
| Bruiser | Grab and Throw | 18 |
| Gunner | Power Gunshot | 10 |
| Gunner | Triple Shot | 12 total |
| Hammer | Fast Hammer Combo | 12 total |
| Hammer | Hammer Bash | 15 |
| Enforcer | Rebar Swing | 12 |
| Enforcer | Rebar Rush Thrust | 16 |
| Cutter | Machete Chop | 19 |
| Cutter | Machete Double Slash | 25 total |

These values must be adjusted against existing enemy HP, armor, hitstun, and difficulty rules.

## Balance goals

- Bruiser controls crowds rather than dealing maximum damage.
- Gunner provides safe ranged pressure but is fragile.
- Hammer interrupts aggressive enemies.
- Enforcer maintains mid-range control.
- Cutter provides the highest damage but appears rarely.
- Broxton remains the primary source of sustained damage.

Do not allow the two defectors to defeat an entire normal encounter without Broxton participating.

---

# GATE 13 — ENEMY AI REACTIONS TO BACKUP

Extend the existing hostile AI Director to recognize temporary friendly reinforcements.

Do not replace its existing coordination rules.

## Hostile target selection

Enemies may target:

- Broxton.
- Bruiser.
- Gunner.
- Hammer.
- Enforcer.
- Cutter.

Only include currently active, valid targets.

## Target priorities

Enemies should consider:

- Distance.
- Combat-plane alignment.
- Current threat.
- Recent damage.
- Whether a defector is attacking them.
- Whether Broxton is vulnerable.
- Whether a ranged ally is exposed.
- Existing AI personality.

## Broxton priority

Broxton remains the primary enemy target.

Backup should divert some pressure but must not make Broxton completely safe.

Initial tuning target:

Approximately 20–35% of eligible hostile target selections may favor defectors when they are nearby and threatening.

Do not apply a fixed percentage blindly every frame.

## Enemy response to phone call

During Broxton's call animation:

- Enemies may recognize his vulnerability.
- Nearby enemies may attempt to approach.
- Advanced enemies may attempt to punish the call startup.
- Existing reaction delays and attack eligibility still apply.
- No instantaneous input-reading response.

## Enemy response to arriving backup

- Nearby enemies may turn toward arriving defectors.
- Enemies already committed to attacks complete or cancel according to approved rules.
- Do not instantly redirect active hitboxes.
- Enemies must not teleport or snap toward new targets.

## Enemy response to Gunner

- Close-range enemies may attempt to pressure her.
- Ranged enemies may exchange fire when valid.
- Enemies must respect firing lanes and normal recovery.

## Enemy response to Bruiser

- Enemies may attempt to avoid his grab range.
- Heavy enemies may challenge him.
- Ordinary enemies should not endlessly walk into repeated throws.

## Enemy response to Cutter

- Enemies may react more cautiously to his high damage.
- Do not give enemies supernatural knowledge of his future actions.

---

# GATE 14 — AI DIRECTOR INTEGRATION

Preserve Normal difficulty:

- Hostile threat budget: 3.
- Maximum simultaneous hostile offensive commitments: 2.

## Friendly Director

Create or extend a separate friendly attack-admission system.

Initial limit:

- Maximum one committed defector offensive attack at a time.

## Important

Friendly attacks do not consume the hostile enemy threat budget.

Hostile enemies may attack Broxton or defectors while respecting the same hostile budget.

Do not create a loophole where attacks against allies bypass normal attack admission.

## Coordination

Prevent:

- Both defectors endlessly attacking the same target.
- Infinite hitstun.
- Duplicate damage.
- Repeated knockdown loops.
- Allies blocking Broxton's movement.
- Allies disrupting Broxton's active grabs.
- Allies pushing mandatory enemies outside encounter boundaries.

## Friendly collision

Broxton and defectors do not damage one another.

Defectors do not damage one another.

They may pass or reposition around each other according to approved friendly-collision rules.

Hostile attacks can damage defectors.

Environmental hazards can affect defectors where appropriate.

---

# GATE 15 — HIT REACTIONS AND RECOVERY

Every defector must have complete:

- Idle animation.
- Walk.
- Run.
- Turn.
- Attack startup.
- Attack active.
- Attack follow-through.
- Hit recovery.
- Block recovery where relevant.
- Miss recovery.
- Light hit reaction.
- Heavy hit reaction.
- Knockback.
- Knockdown.
- Prone.
- Get-up.
- Defeat.
- Exit.

## Critical

Do not create recovery by freezing the final attack pose.

Use meaningful physical movement:

- Arm retraction.
- Weapon repositioning.
- Foot adjustment.
- Torso realignment.
- Balance recovery.

## Weapon attachment

The Hammer's claw hammer, Enforcer's rebar, Cutter's machete, and Gunner's pistol must remain correctly attached to their hands.

No detached weapons.

No oversized weapons.

No sprite-style mismatches.

## Hitstun

Use the approved shared hitstun system.

Do not allow allies or enemies to start attacks during mandatory hitstun or recovery.

## Knockdowns

Falling and prone animations must be continuous.

Do not allow characters to change prone poses unexpectedly while grounded.

---

# GATE 16 — FRIENDLY DEFEAT AND EXIT

Each defector has its own HP.

When HP reaches zero:

1. Stop offensive decisions.
2. Cancel invalid active attacks.
3. Play defeat animation.
4. Remove hostile targeting after defeat.
5. Clean up projectiles and collision state.
6. Remove the ally after the approved defeat cleanup.

Do not immediately despawn the character on the same frame HP reaches zero.

## Timed exit

When the shared timer expires:

- Stop new attacks.
- Disengage.
- Deliver a short exit line occasionally.
- Run toward an available exit.
- Despawn offscreen.

## Example exit dialogue

Bruiser: "You're good. I'm out."

Gunner: "Don't miss me too much."

Hammer: "Call if you need more work."

Enforcer: "Area's clear."

Cutter: "Already? I was having fun."

---

# GATE 17 — SCORE, ENERGY AND EXPLOIT RULES

## Energy

Broxton does not gain energy from attacks performed by defectors.

Only Broxton's own eligible actions generate energy according to approved rules.

## Score

Initial recommendation:

Defector kills grant reduced combat score, or no normal combat score, pending review of the existing scoring system.

Do not allow easy score farming by repeatedly summoning backup.

## Enemy drops

Avoid duplicate reward generation from ally-caused kills.

Use existing drop eligibility rules.

Do not silently change approved drop tables.

## Summon exploits

Prevent:

- Backup stacking.
- Repeated calls during cooldown.
- Infinite ally lifetime.
- Infinite friendly hitstun loops.
- Repeated energy generation.
- Duplicate score awards.
- Multiple simultaneous Cutter appearances.
- Duplicate projectile damage.

---

# GATE 18 — LEVEL AND STORY INTEGRATION

All five defectors are available from the start.

They are former syndicate associates loyal to Broxton.

They do not require recruitment.

## Level entry

Backup should enter from:

- Valid side boundaries.
- Accessible doors.
- Appropriate offscreen entrances.

Do not spawn directly inside solid objects.

Do not spawn inside active hitboxes.

Do not teleport visibly into the scene.

## Encounter restrictions

Backup may be used in ordinary encounters and approved boss fights.

Do not allow calls to break:

- Boss introductions.
- Scripted cutscenes.
- Escape timers.
- Locked arena boundaries.
- Mission objectives.
- Level transitions.

If backup cannot safely enter a particular scene, reject the call without spending energy.

## City continuity

Defectors may have brief dialogue reflecting the current district, but they are available regardless of location unless an explicit level rule prevents arrival.

Do not create recruitment dependencies.

---

# GATE 19 — PERFORMANCE

Benchmark the mechanic with:

1. Broxton versus four enemies.
2. Broxton plus two defectors versus four enemies.
3. Broxton plus two defectors versus six enemies.
4. Broxton plus two defectors versus eight enemies, where supported.

## Measure

- Average frame time.
- p95 frame time.
- Worst-case frame time.
- Rendering time.
- AI decision time.
- Collision time.
- Memory use.
- Projectile/effect costs.

Target the game's intended 60 FPS baseline.

Do not sacrifice animation quality by skipping important frames or disabling hit reactions.

## Optimization

Use:

- Shared animation systems.
- Bounded AI decision frequency.
- Reusable collision data.
- Efficient sprite rendering.
- Correct cache invalidation.
- Safe projectile cleanup.
- Limited effect pooling.

Review existing Codex rendering findings before expanding scene complexity.

---

# GATE 20 — DEVELOPER PANEL

Add a Syndicate Backup testing section.

## Controls

- Select Broxton.
- Force a successful call.
- Force a failed call.
- Set energy.
- Set cooldown.
- Select any two defectors for testing only.
- Force Cutter appearance.
- Set ally HP.
- Set enemy composition.
- Adjust backup duration.
- Adjust ally damage.
- Adjust ally attack frequency.
- Set hostile target preference.
- Pause.
- Single-frame advance.
- Slow motion.
- Restart encounter.
- Restore Defaults.

## Diagnostics

Display:

- Selected defectors.
- Selection weights.
- Cutter wildcard roll.
- Call state.
- Connection event.
- Cooldown.
- Remaining backup duration.
- Ally HP.
- Ally AI state.
- Current target.
- Ideal attack range.
- Current move.
- Startup/active/recovery.
- Friendly attack commitments.
- Hostile attack commitments.
- Frame-time measurements.

Use actual runtime values.

Do not fabricate AI decisions or test results.

---

# GATE 21 — AUTOMATED REGRESSION TESTS

Create tests for:

## Activation

- R2 initiates call.
- Holding R2 does not repeatedly call.
- Successful call spends 30 energy.
- Cooldown begins on connection.
- Interrupted call before connection does not summon.
- Failed call does not spend energy.
- No backup stacking.

## Selection

- Exactly two distinct defectors.
- All five available from the beginning.
- Tactical selection works.
- Cutter remains rare.
- Cutter can appear with any other eligible defector.
- Deterministic selection with fixed random seed.

## Combat

- Each defector has exactly two attacks.
- Correct attack eligibility.
- Correct damage.
- Correct hitboxes.
- Correct combat-plane alignment.
- Correct hit reactions.
- Correct recovery.
- Correct knockdown.
- Correct defeat.

## AI

- Defectors maintain ideal range.
- Friendly attack budget enforced.
- Hostile attack budget enforced.
- Enemies can target defectors.
- Broxton remains a valid primary target.
- No attacks during hitstun.
- No duplicate damage.
- No AI deadlocks.

## Lifecycle

- Backup leaves after timer.
- Defeated allies do not continue attacking.
- No stuck allies.
- No stale targeting.
- No orphaned projectiles.
- No progression softlocks.

## Rendering

- Correct character scale.
- Consistent sprite identity.
- No stray pixels.
- No detached weapons.
- No frozen recovery poses.
- Complete call animation.
- Correct phone glow.
- No rendering-cache regression.

---

# GATE 22 — VISUAL CERTIFICATION

Record actual rendered gameplay showing:

1. Successful call.
2. Interrupted call.
3. Cooldown failure/operator message.
4. Bruiser Power Punch.
5. Bruiser Grab and Throw.
6. Gunner Power Gunshot.
7. Gunner Triple Shot.
8. Hammer Fast Hammer Combo.
9. Hammer Bash.
10. Enforcer Rebar Swing.
11. Enforcer Rebar Rush Thrust.
12. Cutter Machete Chop.
13. Cutter Machete Double Slash.
14. Two allies coordinating.
15. Enemies attacking defectors.
16. Ally knockdown.
17. Ally defeat.
18. Timed departure.
19. Crowded encounter performance.

Inspect:

- Normal speed.
- 0.5× speed.
- 0.25× speed.
- Frame-by-frame.

Do not certify visual animation quality based solely on passing code tests.

---

# IMPLEMENTATION PLAN

Do not attempt the entire mechanic in one Work task.

## Assignment 1 — Audit and phone system

Complete Gates 0–4.

Implement Broxton's call animation, phone prop, screen glow, ringtone, dialogue hooks, cooldown, and failure handling.

Do not implement the full defector roster yet.

Verify the call lifecycle.

Stop for review.

## Assignment 2 — Selection and shared AI

Complete Gates 5–6.

Implement the tactical selection logic, Cutter rarity gate, and common Friendly Support AI.

Use temporary test actors if necessary.

Stop and verify.

## Assignment 3 — Bruiser and Gunner

Complete Gates 7–8.

Create both characters and their two attacks each.

Verify movement, combat, targeting, and animation.

Stop for review.

## Assignment 4 — Hammer and Enforcer

Complete Gates 9–10.

Create both characters and their two attacks each.

Verify movement, weapon attachment, attack range, and hit reactions.

Stop for review.

## Assignment 5 — Cutter

Complete Gate 11.

Create Cutter and his two attacks.

Verify damage, bleed, rarity, and recovery.

Stop for review.

## Assignment 6 — Full integration

Complete Gates 12–18.

Integrate balance, hostile AI reactions, friendly attack coordination, hit reactions, timed exits, scoring, and level rules.

Stop and verify.

## Assignment 7 — Performance and certification

Complete Gates 19–22.

Run full QA, rendered gameplay verification, and critical shared-system regressions.

Stop for final approval.

---

# REQUIRED REPORTING

After every assignment provide:

1. Branch/checkpoint.
2. Files changed.
3. Assets created.
4. Animations completed.
5. Implemented mechanics.
6. Actual frame data.
7. Tests executed.
8. Passed tests.
9. Failed tests.
10. Not-tested items.
11. Rendered evidence.
12. Performance results.
13. Remaining limitations.
14. Next recommended action.

Do not claim a feature is complete merely because code or art assets exist.

---

# FINAL ACCEPTANCE CRITERIA

The mechanic is complete when:

- Broxton summons backup using only Unique Action.
- The call has complete retrieve/dial/raise/speak/pocket animations.
- Phone screen creates subtle facial illumination.
- A short connection tone plays.
- Defectors respond with varied short dialogue.
- Broxton responds appropriately.
- Failed cooldown calls provide humorous occasional operator feedback.
- Exactly two different defectors arrive.
- All five are available from the beginning.
- Cutter is a rare wildcard.
- Each defector has exactly two offensive moves.
- Defectors position at their ideal ranges.
- Defectors use legal attacks according to battlefield conditions.
- Defectors can take damage and be defeated.
- Surviving defectors leave after 20 seconds.
- Cooldown is 90 seconds from successful connection.
- Energy cost is 30.
- Broxton is vulnerable during call startup.
- Friendly and hostile AI Directors remain coordinated.
- Hitstun, recovery, armor, and knockdown rules are respected.
- No infinite stunlock or duplicate damage occurs.
- The mechanic does not break level progression.
- Performance remains within approved targets.
- All five characters visually match their approved designs.
- All attacks have complete startup, active, follow-through, and recovery animations.
- Regression tests are registered for future builds.

# FINAL DESIGN GOAL

Syndicate Backup should feel like Broxton calling in favors from his former life.

The mechanic should be cinematic, tactical, occasionally funny, and useful without becoming overpowering.

The defectors should behave like capable but imperfect allies who help Broxton create opportunities rather than win the fight for him.

Preserve the existing game architecture, implement incrementally, and verify every completed stage in rendered gameplay.
