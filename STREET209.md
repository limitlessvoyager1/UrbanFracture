# Marcus and Kevin overhaul — Build209

Checkpoint: checkpoint-before-street209 at4354f52712d0421f8b8aa8df0a2fd76c34dbb1cf (published208).
Both supplied specs end mid-sentence; all complete requirements were used. Optional morale remains disabled on Normal.

## Active architecture audit
- `core.js` creates60HP thug/knifeThug actors, advances native actions, damage, knockdowns, body/projectile collisions, cooldowns and drops.
- `encounters.js` overrides Marcus via `marcusAI`; its Patient/Opportunist orbit/commit gate could prevent armed Marcus reaching the original core knife selector. Its old Kevin path rearmed any empty hand; this conflated throwing with disarming.
- `audit135.js` plus `director148.js` remain the only attack admission/reservation controller. All new offensive choices use enemyAct; three-point budget/max two commitments stay. Revised Kevin throws cost2, keep detached reservations and reject allied firing lanes. Legacy non209 projectile categories remain untouched.
- `combat-quality169.js` retains grab-only post-recovery protection and combat metrics. WeaponCounters122/Niko186 retain counter/disarm ownership. Shields181 use the new measured projectile height before legacy fallback heights.
- `street209.js` supplies character-specific decisions through the existing encounters dispatcher/Marcus method and native action hooks. Later environment, poison, injury, companion and story wrappers remain in their original order. It excludes Aidan/other scripted variants, preserves spawn tables, appearance and health, and does not create a parallel simulation, counter controller or damage system.
- `sprites.js` uses existing imported full-body frames/sole anchors. Kevin's tattooed throwing arm is articulated from the existing throw frame; a shared hand anchor drives projectile release. Armed/empty hand states and rearming are distinct. Cloth colors/import scale unchanged.

## Normal timing and damage
Frames at60Hz. Existing post-action attack cadence remains; no new invulnerability/armor.

| Move | Startup | Active | Mandatory recovery | Base damage |
|---|---:|---:|---:|---:|
| Marcus stab |14|5|22|16|
| Marcus slash |20|6|28|16|
| Kevin stab |14|4|22|17|
| Kevin step slash |20|6|30|18|
| Kevin throw |17 release|one projectile|19|22 existing projectile baseline|
| Kevin Hyper Slash |19.2,33,46.8 contacts|5 each|38.2 after last window|8 per contact, maximum24|
| Marcus stepping hook |existing27.6|existing contact|existing|10|
| Delayed hook |existing+8|existing contact|existing|10|
| Marcus punch combo |existing16.8/30/44.4 contacts|existing|existing|5/6/9|
| Knife draw |18 event|no damage|18|0|
| Kevin rearm |24 event|no damage|15|0|
| Backstep/sidestep |21.6 total|no hitbox|native cadence|0|
| Feint |28.8 total|no hitbox|native cadence|0|
| Disarm reaction |20.4 total|no hitbox|native cadence|0|

Knife ranges retain modest weapon geometry and strict lane checks, not oversized hitboxes. Kevin's slash advances at most28 units in a fixed direction; hyper cannot follow a missed opener. Ordinary clean hits interrupt these standard enemies. Their wake-up damage immunity remains zero.

## Behavior and resources
Marcus makes one25% draw decision below half HP; draw is interruptible. A successful draw enters actual knife attacks. Interrupted pre-draw leaves him safely unarmed; knocked-away/disarmed knives never regenerate. Marcus never throws/rearms/uses Hyper Slash.
Persistent Aggressive/Patient/Opportunistic moods influence approach speed, finite waiting/commit periods, delayed hooks and staggered flank destinations. Guards use18% baseline (less for Aggressive), .5s frontal only; movement has6s cooldown, feints10s. Observable attack age/repetition and delayed successful-counter history drive probabilistic responses, never player button reads. Optional morale off.
Kevin uses close stabs, advancing slashes and occasional ranged throws. Throw17/36 frame hand release, fixed lane/facing, tumbling visual, finite1.1s life; native projectile ownership/immunity/one-hit collision. Tall solids block; low tables can be passed over. Six-second throw cooldown begins at commitment and cannot be bypassed through direct native calls. Throw alone enables rearming. Successful disarm permanently locks rearming and produces a brief empty-hand reaction followed by limited native punches. Hyper Slash is at<=35% HP, once per instance, admission required, no blanket armor. Guard13%, finite lateral/retreat movement and counter-based feints respect cooldowns and completed recovery. Hero-specific positioning reacts to visible fighting behavior, not inputs.

Developer `Audit135.report(g).street209` exposes temperament, draw roll/state, inventory, target distance/depth, action frames/contacts/recovery, hitbox, cooldowns, release coordinates, last failed reason and Director reservation. `video207.html` provides frame stepping and mixed-combat playback using production modules.

## Validation / limits
- `tests/street209.cjs`: one-time draw, real armed contact/both facings, interruption/disarm, no redraw, no Marcus throw, release frame/anchor, fixed off-lane trajectory, one hit, independent projectile, tall solid, guard/rear/grab, movement/feint cooldowns, six-hero Hyper single-use.
- `tests/street209-groups.cjs`:60 deterministic fixtures (six heroes ×10 solo/mixed arrangements),15 seconds each; attacks occur, finite positions, max2 commitments/max3 pressure.
- Current15026-suite regression runner, gamepad/controller157, Shield181, Flint208 and Taser206 verified separately.
- Browser review checks throw wind-up/release, empty-hand recovery/disarm and mixed combat. This is not a claim of exhaustive full campaign or physical DualSense hardware testing. Human Normal-difficulty balancing remains iterative.
