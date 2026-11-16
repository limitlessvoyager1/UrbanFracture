# Nightshade258 — Gate5 directional grabs

Checkpoint `checkpoint-before-nightshade-grabs258` at Build257 commit `02dd0784ffa2625f99e6c43e44595f3e73f2d5fb`. Preserve the existing owner-private Site and all previous gameplay. This is a staged playtest, not stable certification.

## Scope and architecture audit

Master Phase41 requires four directional grabs, followed by STOP AFTER GATE5. Specials, Blitz, dodge and counters remain later gates. Approved144logical presentation,110HP, original foundation/walk/run/gun artwork, Gate4 melee/poison and finite ammunition remain unchanged.

The live engine already has shared119 synchronization/recovery,198/223 grab admission and heavy contests, native actor/action clocks,222 arena membership/bounds and a single Nightshade renderer. `nightshade-grabs258.js` supplies only move selection, finite choreography and contact events on those systems. It uses `NightshadeMelee257.begin/clean` and the existing registered `nightshadeGrab257` action/session. No second grapple, knockdown, input, AI or collision controller is added. One active-action reference exists solely to clean up interruption occurring between ticks;119 remains the session owner.

The Gate4 module has two narrow extension hooks: directional pose delegation and bypassing ordinary hold-anchor positioning while the directional sequence owns the actors. The existing renderer discovers the new atlas metadata; native drawActor supplies rotation/elevation and paired-victim transforms. The developer scene now applies these same transforms and resets fresh target instances.

## Selection and timings at60FPS

Direction is relative to the held facing, not world-left/right. Rear/front status comes from the native acquired hold. Direction and selected move are latched at commitment. Neutral Attack retains the Gate4 grab combo. Ordinary highHP heavy selections pass through the native22325% contest once; failures use the existing retaliation. At40% or below no highHP roll is added. Explicit individual overrides, including Baylor’s accepted hold, remain in the native acquisition chain and are not rerolled.

| Hold and input | Move | Contact events | Total | Recovery | Initial damage |
|---|---|---|---:|---:|---:|
| Front, forward+Attack | Baton Sweep and Beatdown | Sweep18; baton45,59,73 |107|28|8+6+6+6=26|
| Front, away+Attack | Ura-Nage | Impact40; settle45 |75|30|30|
| Rear, forward+Attack | Leap-Over Momentum Throw | Impact50; release completes56 |86|30|27;5 collision|
| Rear, away+Attack | Rolling Prone Takedown | Takedown37; elbow57 |97|32|8+24=32|

Damage is initial tuning where the master specifies qualitative strength; no previous throw damage is scaled. Sweep18/active5, transition14,42frame beatdown and28recovery are retained. Ura setup16/rotation24/impact5/recovery30; leap12/18/20/6/30; roll12/25/12/16/32.

## Motion, vulnerability and recovery

Actor coordinates use continuous phase curves, actual fixed combat planes and native render elevation/rotation. Source-authored grip keys improve the arching throw; the vault advances over the shoulder, rotates and returns to a grounded landing. Both actors roll; separate windup/contact elbow sprites make the final strike visible. No sprite scale changes during a move. Impact transitions use the existing paired-to-ground blend rather than a new grounded state machine.

Confirmed control is protected through its synchronized portion. The standing beatdown becomes vulnerable to other enemies after the sweep window, including its three strikes and mandatory recovery; it is not invincible. Other throws become vulnerable at their defined recovery. Grounded victims stay under shared119 recovery ordering, then get up normally. Shared223 starts anti-regrab after standing. Repeated beatdown cannot reattach the victim during protection. Normal attacks remain able to damage actionable actors.

Leap collision uses the carried body’s actual swept path, plane alignment and one per-action target set. Eligible bystanders take5 once, respecting ordinary protection. Roll has no area/collision damage. Deferred lethal damage resolves at the last contact; original drop/death hooks remain authoritative.

Native `combatBounds` intentionally spans the level for knockback, so paired motion explicitly uses active222 arena bounds when present. Both actors remain tracked as the same instances. Ground impact pushback is clamped within that synchronized arena as well.

## Confirmed defects and corrections

- External interruption between ticks could orphan the victim’s movement lock because both legacy tick wrappers saw an already-cleared player action. An active cleanup reference now releases all owned locks/session/elevation exactly once.
- The first arc used world/combat bounds rather than active locked-arena bounds. Native222 tests detected this; directional motion and impact now honor the active arena.
- Visual review found early hand separation during Ura-Nage and the vault. Source-grip key timing and the vault path were revised.
- The original roll had no distinct elbow-contact pose. Two new source-referenced frames now separate windup and contact, followed by crouched rise.
- An initial displacement threshold flagged legitimate rapid continuous motion at30Hz. The check now accounts for timestep and contact pushback; it does not assert that every fast throw is teleportation.

No approved artwork was redesigned or automatically corrected. All new art remains review-required.

## Artwork and storage

14 new transparent frames in `dist/assets/nightshade258`, two source atlases and deterministic importer. Fixed scale per source atlas comes from its standing reference, then the approved144/123 presentation factor. The elbow source is uniformly imported at a density matching the existing sprite sheets; no per-pose resizing. Original generation PNGs are retained in `art-source258`. See art-import.json and PROMPTS.md.

The deployment archive is near its256MiB limit. Only new art was calibrated to its appropriate source density; no existing assets were removed, resized or recolored. Inspect the actual expanded GNU tar before publication.

## Reproduce and limits

`node tests/nightshade258.cjs` exercises all four moves, both facings and30/60/120Hz; exact contacts, finite completion, interruption, heavy success/failure, zero extra roll, native222 tracking/bounds, anti-regrab timing/expiry, checkpoint cleanup and12 target archetypes. `node tests/nightshade258-input.cjs` drives actual game.js L2/directional Attack for keyboard and simulated standard/raw Sony/DSX devices. `node tests/nightshade258-view.cjs` traverses every finite pose state and checks fixed source aspect and144presentation.

Run frozen QA242 initial/release. Developer `nightshade251.html` exposes four native-action buttons and frame stepping; main game retains the normal grab/direction/Attack inputs.

Browser review covered all four moves with Marcus, including baton ground contact, Ura arch, vault grip and elbow contact. Screenshots are candidates, not approved baselines. Broad all-enemy visual review, physical DualSense, full level playthroughs, performance profiling and human balance remain unexecuted. No stable label or Gate6 advancement is authorized by automated success alone.
