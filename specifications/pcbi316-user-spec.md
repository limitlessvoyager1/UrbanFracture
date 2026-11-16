# URBAN FRACTURE — PCBI ENEMY OVERHAUL
## TALON — Corrupt Federal Agent Boss
## JAGUAR — Elite PCBI Field Agent
### Complete Combat, AI, Animation, Story, and QA Instructions for ChatGPT Work

---

# PRIMARY OBJECTIVE

Update the existing corrupt special-agent enemy and implement two distinct PCBI enemy classifications:

1. **Talon** — formerly Spectre, now a 160 HP boss-class enemy.
2. **Jaguar** — an 80 HP advanced regular enemy specializing in accurate gunfire, fast reloads, and close-range defensive tactics.

PCBI stands for **Prime City Bureau of Investigation**.

Both enemies are corrupt PCBI agents aligned with the Syndicate.

They must use the existing Urban Fracture combat systems, AI Director, animation framework, hit reactions, grappling rules, and energy mechanics.

Do not create competing combat controllers.

Create a recoverable checkpoint before modifying existing enemy definitions.

---

# PART I — TALON

## 1. Identity and classification

**Name:** Talon  
**Former name:** Spectre  
**Classification:** Boss  
**HP:** 160  
**Affiliation:** Corrupt PCBI / Syndicate  
**Combat role:** Elite hybrid gunfighter and close-quarters combatant  
**Primary weapon:** High-damage handgun  
**Secondary weapon:** Electrified baton  
**Difficulty baseline:** Normal

Rename the existing Spectre enemy to Talon throughout the project.

Update:

- Enemy registry.
- Display name.
- Boss UI.
- Encounter definitions.
- AI references.
- Developer Panel.
- Animation references.
- Spawn definitions.
- Dialogue references.
- Test presets.

Preserve legacy references through migration or aliases where necessary.

Do not leave an unintended duplicate Spectre enemy.

### Boss restrictions

Talon must be treated as a boss, not a regular enemy.

- Spawn only in designated boss encounters.
- Never appear in ordinary random waves.
- Use boss-specific HP display.
- Use applicable boss grab and recovery rules.
- Maintain his own AI state machine.
- Integrate with the existing AI Director.
- Preserve appropriate boss recovery and armor rules.

Do not give Talon permanent super armor.

---

# 2. Talon's appearance

Talon is a high-ranking corrupt federal operative.

Use a professional, intimidating appearance appropriate for an experienced PCBI agent.

Suggested visual design:

- White dress shirt.
- Dark tie.
- Black trousers.
- Black dress shoes.
- Open dark PCBI jacket.
- Yellow PCBI lettering on the front and back.
- Tactical handgun.
- Electrified baton.

Preserve any approved distinctive Talon design elements from the existing Spectre artwork unless explicitly superseded.

The PCBI uniform must remain visually consistent with Jaguar.

Talon should nevertheless be immediately distinguishable as a boss through his silhouette, posture, equipment details, and animation.

Do not distinguish him solely by making his sprite larger.

---

# 3. Talon's combat personality

Talon is confident, calculating, aggressive, and highly experienced.

Unlike ordinary gunmen, he does not constantly retreat to maximum shooting distance.

He is comfortable fighting at:

- Close range.
- Mid range.
- Long range.

His preferred fighting distance is **mid range**.

He should occasionally initiate close combat deliberately, rather than treating it as an emergency.

However, after prolonged close-range engagement, Talon should attempt to reposition to a suitable firing distance.

### Combat personality

Talon should:

- Pressure predictable players.
- Recognize repeated approaches.
- Punish poor positioning.
- Mix gunfire with baton attacks.
- Use close combat confidently.
- Reposition intelligently.
- Exploit valid shooting opportunities.
- Respect recovery and interruption rules.

He must not become a permanently retreating gunman.

He must not become an unstoppable close-range attacker.

---

# 4. Talon's handgun

Talon's handgun is significantly more dangerous than ordinary shooter weapons.

## Proposed handgun parameters

| Attribute | Initial value |
|---|---|
| Damage per bullet | 18 HP |
| Magazine | 10 rounds |
| First-shot startup | 13 frames |
| Interval between shots | 18–24 frames |
| Reload duration | 42 frames |
| Recovery after firing sequence | 18 frames |
| Preferred firing range | Mid range |
| Maximum firing range | Existing weapon system limits |

These values are proposed for testing.

Compare Talon's bullet damage with Jesse, Jaguar, and other implemented gunmen.

Talon must deal more damage per bullet than ordinary shooters.

### Firing behavior

Talon may fire when the hero is:

- At mid range.
- At long range.
- On a valid firing plane.
- Not protected by appropriate cover or invulnerability.

He should not require maximum distance before using his handgun.

### Accuracy

Talon is an elite marksman.

When the hero enters his firing plane, Talon should react quickly.

However:

- He must have visible aiming startup.
- His gun must align with the actual target.
- Bullets must originate from the muzzle.
- Bullets must travel through valid collision space.
- Shots must respect obstacles and cover.
- Missed shots must remain possible.
- The player must have legitimate opportunities to evade or interrupt him.

Do not implement unavoidable hitscan damage without an appropriate warning and counterplay.

---

# 5. Talon's electrified baton

Remove all ground-deployed taser devices from Talon's moveset.

Delete or disable:

- Ground taser deployment.
- Ground taser projectiles.
- Persistent taser traps.
- Associated AI decisions.
- Unused effects and cooldowns.

Do not remove unrelated electrical effects belonging to other characters.

Replace Talon's ordinary baton with an **electrified baton**.

### Visual requirements

- Visible electrical current along the baton.
- Brief electrical arcs during swings.
- Electrical impact effect on successful contact.
- Appropriate stun animation.
- Distinct sound effects.
- No detached electrical effects.
- No excessive screen flashing.

### Electrical stun

Use a brief, controlled stun effect.

Proposed duration: 18 frames on a qualifying electrical strike.

Apply stun resistance or reduced repeated-stun effects to prevent permanent stun loops.

The stun must not override protected recovery or invulnerability states.

---

# 6. Talon's attack moveset

## Attack A — Precision Handgun Fire

**Range:** Mid to long  
**Damage:** 18 per bullet  
**Startup:** 13 frames  
**Recovery:** 18 frames after firing sequence

Talon raises his handgun, aims, and fires.

May fire short bursts when tactically appropriate.

Each shot must respect ammunition, muzzle positioning, and firing-plane validation.

## Attack B — Electrified Baton Combination

**Range:** Close  
**Sequence:** Three strikes

1. Horizontal baton strike.
2. Reverse baton strike.
3. Electrified finishing blow.

Proposed damage:

- First hit: 10.
- Second hit: 12.
- Finisher: 18.

The finisher causes knockback and may apply brief electrical stun.

Proposed startup: 12 frames.

Each strike must have its own valid active and recovery timing.

Do not allow the combination to continue automatically if Talon is legitimately interrupted.

## Attack C — Electric Baton Thrust

**Range:** Close to short-medium  
**Damage:** 20  
**Startup:** 15 frames  
**Active:** 5 frames  
**Recovery:** 28 frames

Talon lunges forward and thrusts the electrified baton into the hero.

On a clean hit:

- Apply damage.
- Apply a brief electrical stun.
- Apply appropriate pushback.

On a miss:

- Talon completes full recovery.

## Attack D — Low Baton Sweep

**Range:** Close  
**Damage:** 16  
**Startup:** 18 frames  
**Active:** 5 frames  
**Recovery:** 32 frames

Targets a grounded hero's legs.

Causes knockdown on a clean hit.

Must not automatically hit airborne or invulnerable targets.

## Attack E — Disengagement Strike and Throw

**Range:** Grab range  
**Purpose:** Escape prolonged close-range pressure.

Talon lands a short body strike, secures a valid grapple, and throws the hero away.

Proposed damage:

- Body strike: 8.
- Throw: 20.

The throw creates space for gunfire.

### Requirements

- Use synchronized grapple animation.
- Respect boss grab restrictions.
- Validate target eligibility.
- No teleportation.
- No sprite scaling.
- No overlapping bodies.
- No premature release.

## Attack F — Tactical Sidestep

Talon quickly shifts out of a predictable attack line.

Proposed cooldown: 5 seconds.

Must have:

- Visible startup.
- Limited displacement.
- Defined vulnerability.
- Recovery.

Do not allow repeated invulnerable sidestep spam.

## Attack G — Baton Intercept

Talon may intercept predictable close-range approaches with a fast baton strike.

**Damage:** 17  
**Startup:** 11 frames  
**Recovery:** 30 frames

Only available when the player is in a valid intercept position.

Must respect existing anti-air and counter-frequency restrictions.

---

# 7. Talon's AI state machine

Implement the following states:

1. APPROACH
2. MID_RANGE_PRESSURE
3. CLOSE_COMBAT
4. FIRING
5. RELOAD
6. DISENGAGE
7. DEFENSIVE_REPOSITION
8. HITSTUN
9. KNOCKDOWN
10. RECOVERY
11. BOSS_PHASE_TRANSITION
12. DEFEATED

## Preferred range behavior

Talon should prefer mid-range engagements.

### At long range

- Advance toward useful firing range.
- Fire when a valid opportunity exists.
- Avoid unnecessary full-screen retreating.

### At mid range

- Prioritize accurate gunfire.
- Occasionally advance to threaten with baton attacks.
- Use sidesteps to maintain positioning.

### At close range

- Use baton combinations.
- Use thrusts.
- Use sweeps when appropriate.
- Attempt a disengagement throw when conditions are valid.
- Occasionally remain engaged rather than retreating immediately.

### After prolonged close combat

Talon should attempt to reposition to mid range.

Do not force disengagement after every close-range exchange.

---

# 8. Talon's initial AI selection weights

These weights apply only when the corresponding moves are eligible.

| Eligible action | Starting weight |
|---|---:|
| Precision gunfire | 35 |
| Baton combination | 25 |
| Electric thrust | 15 |
| Baton sweep | 10 |
| Disengagement throw | 10 |
| Tactical reposition | 5 |

Normalize weights among eligible actions.

Do not select attacks that are:

- Out of range.
- On cooldown.
- Invalid for the target state.
- Blocked by the AI Director.
- Illegal during recovery.

Sidesteps and intercepts may also be triggered through situational defensive logic.

### Important

Do not let Talon select gunfire continuously merely because its weight is highest.

Use context, distance, ammunition, player behavior, and recent action history.

---

# 9. Talon's boss phases

Talon has 160 HP.

## Phase 1 — Controlled Engagement

**HP:** 160–101

Behavior:

- Balanced gunfire and baton combat.
- Moderate aggression.
- Tactical repositioning.
- Limited defensive reads.

## Phase 2 — Increased Pressure

**HP:** 100–51

Behavior:

- More frequent mid-range gunfire.
- Slightly faster repositioning decisions.
- More deliberate close-range punishes.
- Increased use of baton thrust.

Do not shorten required animation recovery.

## Phase 3 — Desperate Precision

**HP:** 50–1

Behavior:

- More aggressive target tracking.
- Greater willingness to fire at mid range.
- More frequent tactical disengagement attempts.
- Increased use of the electrified baton.

Do not grant permanent armor, unlimited ammunition, or impossible reaction speeds.

### Phase transitions

Phase changes must not interrupt mandatory hitstun, throws, or knockdowns.

---

# PART II — TALON AND NIGHTSHADE STORY ENCOUNTER

## 10. Relationship

Talon and Special Agent Nightshade know each other from their work within Prime City's federal investigative community.

Talon recognizes Nightshade immediately.

He believes she is fighting for the wrong side.

He attempts to convince her that the Syndicate's takeover is inevitable and that joining them would place her on the winning side.

Nightshade refuses.

The conversation establishes:

- Their professional familiarity.
- Talon's corruption.
- His loyalty to the Syndicate.
- Nightshade's refusal to compromise her mission.
- The extent of PCBI infiltration.

## Suggested pre-boss dialogue

**Talon:** "Nightshade. I wondered how long it would take you to find me."

**Nightshade:** "You always did have a talent for being where you shouldn't."

**Talon:** "You're looking at this all wrong. The city's changing. You can either help shape what's coming or get buried under it."

**Nightshade:** "You traded your badge for a paycheck from criminals."

**Talon:** "I traded uncertainty for power. There's still room for you."

**Nightshade:** "Then you've forgotten everything that badge was supposed to mean."

**Talon:** "Last chance."

**Nightshade:** "You already had yours."

Talon draws his handgun.

The boss battle begins.

### Requirements

- Use the existing dialogue/cutscene framework.
- Do not force Nightshade to be the playable hero.
- If Nightshade is present, use the personal dialogue.
- If another hero encounters Talon, use an appropriate alternate introduction.
- Preserve story continuity.
- Do not reveal unrelated future plot twists prematurely.

---

# PART III — JAGUAR

## 11. Jaguar identity

**Name:** Jaguar  
**Classification:** Advanced regular enemy  
**HP:** 80  
**Affiliation:** Corrupt PCBI / Syndicate  
**Role:** Elite ranged shooter with close-range defensive options  
**Primary weapon:** Handgun  
**Secondary weapon:** Handheld taser  
**Unarmed option:** Two-hit knockdown punch combination

Jaguar is not a boss.

He should be more dangerous than an ordinary gunman but less capable than Talon.

---

# 12. Jaguar appearance

Jaguar agents wear:

- White dress shirt.
- Tie.
- Black trousers.
- Black shoes.
- Open jacket.
- Yellow PCBI lettering on the front.
- Yellow PCBI lettering on the back.

PCBI means Prime City Bureau of Investigation.

### Visual requirements

- Correct clothing proportions.
- Legible PCBI markings.
- Consistent front and rear views.
- Correct weapon placement.
- Smooth walking and running.
- No detached handgun.
- No detached taser.
- No sprite scale changes.
- Correct hit reactions and knockdowns.

Jaguar should look like an elite federal field agent rather than an ordinary street criminal.

---

# 13. Jaguar handgun

Jaguar agents are highly skilled marksmen.

Being on the same combat plane as Jaguar should be dangerous.

### Proposed firearm parameters

| Attribute | Initial value |
|---|---|
| Bullet damage | 12 HP |
| Magazine | 10 rounds |
| First-shot startup | 17 frames |
| Interval between shots | 24 frames |
| Reload duration | 48 frames |
| Post-firing recovery | 20 frames |

### Relative performance

Jaguar should:

- Aim faster than ordinary shooters.
- Reload faster than ordinary shooters.
- Fire more accurately than ordinary shooters.
- Begin firing quickly when aligned with the player.
- Have shorter vulnerability windows than ordinary shooters.

However, Talon must:

- Aim faster.
- Deal more bullet damage.
- Reload faster.
- Show superior combat adaptability.

### Important

Do not implement unavoidable gunfire.

The hero must have visible opportunities to:

- Move out of the firing plane.
- Interrupt Jaguar.
- Dodge.
- Use appropriate cover.
- Exploit reload recovery.

---

# 14. Jaguar close-range attacks

## Attack A — Handgun Fire

**Range:** Medium to long  
**Damage:** 12 per bullet  
**Startup:** 17 frames

Jaguar raises his weapon and fires when the hero enters a valid firing plane.

He should not wait unnecessarily after obtaining a clear shot.

## Attack B — Grab and Hand Taser

**Range:** Grab range

Jaguar attempts to grab the hero.

On successful capture:

1. Secure the hero.
2. Draw or activate the handheld taser.
3. Apply the taser directly to the hero.
4. Deliver electrical damage and a brief stun.
5. Release the hero.
6. Enter recovery.

### Proposed values

- Grab startup: 15 frames.
- Taser damage: 18.
- Electrical stun: 20 frames.
- Recovery after release: 32 frames.
- Missed-grab recovery: 36 frames.

### Requirements

- Taser only works after a successful grab.
- No ranged taser projectiles.
- No ground taser devices.
- Use synchronized grapple animations.
- Respect grab eligibility and recovery protections.
- No repeated grab loops.
- No permanent electrical stun.

## Attack C — Two-Hit Knockdown Combination

**Range:** Close

Sequence:

1. Straight punch.
2. Heavy hook causing knockdown.

### Proposed damage

- First punch: 9.
- Second punch: 16.

### Proposed timing

- First startup: 12 frames.
- Second startup: 14 frames.
- Final recovery: 30 frames.

### Requirements

- Correct hit reactions.
- Correct knockdown.
- No instant animation snapping.
- No automatic continuation after valid interruption.
- Appropriate recovery on miss.

---

# 15. Jaguar AI behavior

Jaguar is primarily a ranged fighter.

Unlike Talon, Jaguar does not deliberately seek prolonged close combat.

### At long range

- Seek firing alignment.
- Maintain appropriate distance.
- Fire when the hero is on a valid combat plane.

### At mid range

- Fire aggressively when aligned.
- Adjust position when shots are obstructed.
- Avoid unnecessary movement when a valid firing opportunity exists.

### At close range

- Attempt a grab-and-taser attack when eligible.
- Occasionally use the two-hit punch combination.
- Attempt to disengage after completing an action.
- Seek firing distance again.

### Reloading

Jaguar is vulnerable during reload.

However, his reload window should be slightly shorter than ordinary shooters.

He cannot fire while reloading.

Do not allow instant reload cancellation into gunfire.

### AI personality

Jaguar should be:

- Disciplined.
- Accurate.
- Quick to recognize firing opportunities.
- Dangerous when aligned.
- Vulnerable to sustained close-range pressure.
- Less adaptable than Talon.

---

# 16. Jaguar AI decision weights

Apply weights only to eligible actions.

## Mid to long range

| Action | Weight |
|---|---:|
| Handgun fire | 70 |
| Reposition for firing alignment | 20 |
| Defensive movement | 10 |

## Close range

| Action | Weight |
|---|---:|
| Grab and taser | 40 |
| Two-hit punch combination | 35 |
| Disengage | 25 |

### Important

Do not let Jaguar repeatedly spam grabs.

Use existing re-grab limitations and wake-up protection.

Do not allow Jaguar to ignore mandatory recovery.

---

# PART IV — SHARED PCBI COMBAT RULES

## 17. Firearm and combat-plane behavior

Both Talon and Jaguar must use the existing combat-plane alignment system.

### Firing requirements

- Valid target.
- Valid facing.
- Valid range.
- Valid firing lane.
- Clear line of fire.
- Available ammunition.
- Legal attack state.
- Available AI Director commitment.

### Important

Gunfire must not hit the player merely because the enemy is visually close.

Actual projectile collision and lane alignment must agree with the animation.

### Aiming feedback

Provide a readable aiming pose before firing.

The player should recognize that a shot is coming.

Talon's warning window may be shorter than Jaguar's.

Jaguar's warning window may be shorter than ordinary shooters.

---

# 18. Shared combat quality requirements

Apply the completed Urban Fracture combat-quality standards.

Both enemies must have:

- Smooth animation transitions.
- Correct startup frames.
- Correct active frames.
- Correct recovery frames.
- Visible recoil.
- Correct hitstun.
- Complete knockdowns.
- Complete get-ups.
- Correct sprite scale.
- Correct ground anchoring.
- Correct weapon alignment.
- Accurate hitboxes and hurtboxes.
- Valid blocking and armor feedback.
- No fake armor flashes.
- No illegal AI state overrides.

### Talon

Use boss-specific hit reactions, resistance, and grapple rules.

### Jaguar

Use advanced regular-enemy reactions and regular grab rules.

---

# 19. AI Director integration

Preserve the existing Normal difficulty AI Director rules:

- Three-point threat budget.
- Maximum two simultaneous offensive attack commitments.

Talon and Jaguar must request attack commitments through the existing system.

Do not bypass the Director because they use firearms.

### Important

Aiming, firing, melee attacks, grabs, and other offensive commitments must respect the existing coordination framework.

Do not allow Jaguar gunfire to overlap with other enemies in ways that make encounters unfair.

Boss-specific encounters may use explicitly defined encounter overrides, but do not silently change global Normal difficulty rules.

---

# 20. Energy Meter integration

Use the new aggression-based Energy Meter system.

### Requirements

- Successful hero attacks generate energy according to their registered classification.
- Talon and Jaguar receive damage and hitstun correctly.
- Successful hero counters generate appropriate energy.
- Specials use energy and applicable HP overflow.
- No energy farming from invalid hits.
- No energy farming from repeated invulnerable or armored states.

Do not create enemy-specific energy systems.

---

# 21. Enemy spawning

## Talon

- Boss encounters only.
- No random waves.
- No ordinary reinforcement spawns.
- Boss HP display required.
- Defeat triggers designated mission progression.

## Jaguar

- Appears in PCBI-related areas.
- May appear in security-heavy environments.
- Can serve as an elite reinforcement.
- Should not overwhelm the player through excessive simultaneous gunfire.

### Suggested encounter limits

On Normal difficulty:

- Initially test a maximum of one Jaguar actively firing at a time.
- Additional Jaguars may reposition, reload, or wait for attack commitments.
- Avoid simultaneous Jaguar and other shooter attacks that eliminate reasonable evasion opportunities.

These are starting encounter safeguards, not permanent global spawn restrictions.

---

# 22. Developer Panel integration

Add Talon and Jaguar to enemy selection.

### Talon controls

- Force boss phase.
- Force handgun fire.
- Force baton combo.
- Force electric thrust.
- Force sweep.
- Force disengagement throw.
- Force sidestep.
- Force reload.
- Inspect range decisions.
- Inspect AI selection weights.
- Inspect firing-plane alignment.

### Jaguar controls

- Force handgun fire.
- Force grab and taser.
- Force punch combination.
- Force reload.
- Force disengagement.
- Inspect firing alignment.
- Inspect reload vulnerability.
- Inspect AI selection weights.

### Shared diagnostics

Display:

- HP.
- Current state.
- Current move.
- Startup frames.
- Active frames.
- Recovery frames.
- Hitstun.
- Armor.
- Invulnerability.
- Ammunition.
- Reload timer.
- Distance to hero.
- Combat-plane difference.
- Eligible attacks.
- Rejected attacks.
- AI decision history.
- Attack commitment status.

All values must come from actual runtime state.

---

# 23. Animation requirements

Create or update animations for:

## Talon

- Idle.
- Walk.
- Run.
- Aim.
- Fire.
- Reload.
- Baton draw.
- Electrified baton idle.
- Baton combination.
- Electric thrust.
- Baton sweep.
- Disengagement grapple.
- Throw.
- Sidestep.
- Intercept.
- Hit reactions.
- Knockdown.
- Get-up.
- Defeat.

## Jaguar

- Idle.
- Walk.
- Run.
- Aim.
- Fire.
- Reload.
- Hand taser draw.
- Grab.
- Taser contact.
- Taser release.
- Straight punch.
- Heavy hook.
- Disengage.
- Hit reactions.
- Knockdown.
- Get-up.
- Defeat.

### Critical requirement

Do not use one static pose for multiple unrelated animation phases.

Do not substitute movement by sliding the sprite while its legs remain stationary.

Ensure upper and lower body animations remain synchronized.

---

# 24. Automated QA

Test both enemies against:

- Reina.
- Niko.
- Broxton.
- Nightshade.

Include:

1. Firearm accuracy.
2. Firing-plane alignment.
3. Bullet damage.
4. Reload timing.
5. Reload vulnerability.
6. Close-range reactions.
7. Grab eligibility.
8. Taser synchronization.
9. Electrical stun.
10. Knockdown recovery.
11. Attack interruption.
12. AI state transitions.
13. AI Director limits.
14. Hitbox alignment.
15. Boss phase transitions.
16. Energy generation interactions.
17. Sprite scale.
18. Weapon attachment.
19. Animation continuity.
20. Encounter completion.

### Talon-specific

Verify:

- 160 HP.
- Boss classification.
- Higher bullet damage than Jaguar and ordinary shooters.
- Mid-range firing.
- Close-range engagement.
- Eventual disengagement.
- Electric baton.
- No ground taser devices.
- Nightshade dialogue.
- Boss encounter restrictions.

### Jaguar-specific

Verify:

- 80 HP.
- PCBI jacket markings.
- Fast firing response.
- Fast reload.
- Vulnerability during reload.
- Grab-and-taser attack.
- Two-hit knockdown combination.
- Regular enemy grab rules.
- No unintended boss classification.

---

# 25. Implementation order

Do not implement everything simultaneously.

## Gate 1 — Registry and identity

Rename Spectre to Talon.

Change classification to Boss.

Set Talon HP to 160.

Create or update Jaguar at 80 HP.

Verify registry and encounter references.

## Gate 2 — Talon combat

Remove ground tasers.

Implement electric baton.

Update handgun.

Implement mid-range and close-range AI.

Verify moves individually.

## Gate 3 — Jaguar combat

Implement handgun behavior.

Implement fast reload.

Implement grab-and-taser attack.

Implement two-hit punch combination.

Verify moves individually.

## Gate 4 — Story and presentation

Implement PCBI uniforms.

Add Nightshade/Talon dialogue.

Add alternate dialogue for other heroes.

Integrate boss presentation.

## Gate 5 — AI integration

Verify both enemies with the AI Director.

Validate attack commitments and coordination.

## Gate 6 — QA and balancing

Run combat tests.

Record gameplay.

Inspect frame by frame.

Verify all acceptance criteria.

---

# FINAL ACCEPTANCE CRITERIA

Talon must:

- Be named Talon.
- Be classified as a boss.
- Have 160 HP.
- Use a high-damage handgun.
- Fire effectively at mid range.
- Engage willingly at close range.
- Eventually reposition to firing range.
- Use an electrified baton.
- Have no ground taser devices.
- Have complete boss AI.
- Have appropriate Nightshade dialogue.
- Respect combat recovery and AI coordination.

Jaguar must:

- Have 80 HP.
- Be classified as an advanced regular enemy.
- Wear the approved PCBI uniform.
- Have yellow PCBI markings on the front and back of the jacket.
- Fire quickly when aligned with the hero.
- Reload faster than ordinary shooters.
- Remain vulnerable during reload.
- Use a grab followed by a handheld taser.
- Optionally use a two-hit knockdown punch combination.
- Disengage after appropriate close-range exchanges.
- Respect the AI Director and combat quality systems.

Both enemies must pass animation, combat, collision, AI, and regression certification.

**Do not mark implementation complete until the actual gameplay has been inspected and verified.**
