# Reina — moveset v1

Design proposal for Neon Knuckle. These moves are not yet implemented in the playable prototype. All values are initial tuning targets at 60 simulation frames per second.

## Character
Adult Asian fighter; long black hair, vertical cheek scar, determined and focused. The syndicate took her family; their exact fate remains unspecified. Navy knee-length Japanese-style wrap dress and sash, sandals, fingerless gloves, forearm guards, no mask or tattoos. Visual reference: ../concept-art/reina-concept-v1.png. The short sword stays sheathed during ordinary attacks and grapples. Taekwondo supplies her movement and kick-heavy offense; sword draws are limited to specials. Secure the scabbard against the sash during vaults and throws.

## Role and controls
Fast technical fighter with excellent kick reach and positional grappling, moderate damage and lower durability. HP 110; walk speed 118 world units/s; run speed 170. Baseline grunt HP 60, heavy 100, boss 300. Neutral means no movement input. Forward/back are relative to Reina's facing; up/down refer to street depth.

Move: WASD/arrows. J: attack. K: jump or vault while holding a victim. G: grab/release. L: sword special. Double-tap left/right within 220 ms: run. P: pause. Mobile needs corresponding buttons; controller mapping is a later implementation task. Hold J repeats basic attacks, while other moves require a fresh press. The same 100 ms input buffer applies to keyboard and touch.

## Normal attacks and mobility
| Move | Input/context | Damage | Behavior |
|---|---|---:|---|
| Reed Combination | J, J, J, J | 6 + 8 + 10 + 16 | Palm check, front kick, roundhouse, spinning side kick. Last strike knocks down. Sword remains sheathed. |
| Spear Step | Run + J | 18 | Advancing side kick; long reach, knocks back; punishable on miss. |
| Rising Crane | K then J while rising | 14 | Short rising knee; intercepts close attackers. One air attack per jump. |
| Falling Crescent | K then J while descending | 20 | Forward jump kick; knocks down, longer landing recovery. |
| Backheel | Back + J while an enemy is within 38 units behind | 12 | Contextual rear kick without turning; otherwise turn and start normal combo. |
| Low Sweep | Down + J (fresh press) | 10 | Short-range knockdown, stationary during animation. |
| Heel Drop | Down + J beside a grounded enemy | 12 | Context overrides sweep; once per enemy knockdown. |
| Empty Step | Double-tap K on ground | 0 | Short forward evade; invulnerability frames 4–12; 0.8 s cooldown. First jump cancels into evade if second press arrives within 160 ms before air attack. |

Combo inputs buffer during the final 100 ms of each move; next input must arrive within 450 ms of recovery or the chain resets. Combo attacks last 24/26/30/40 frames, with damage active once during frames 7–9/8–10/10–13/14–17. Range 36/46/56/64 units; lane tolerance 18. Each victim can be hit once per move. Normal hits briefly stagger; combo finisher produces 0.9 s knockdown. Cosmetic impact pause 45–65 ms must not advance simulation timers.

## Front grabs
G attempts a grab on the closest eligible enemy in front within 25 units and 14 lane units. Grab startup 10 frames; whiff recovery 24 frames. A successful grab binds the characters in one paired state; a held enemy cannot attack or move independently. Reina can hold one enemy at a time.

| Move | Input while holding from front | Damage | Behavior |
|---|---|---:|---|
| Iron Knees | J, up to three presses | 7 each | Knee strikes; third strike shoves victim free and down. |
| Sash Toss | Forward + J | 24 | Directional hip throw; thrown enemy hits others for 12 each. |
| Reversal Toss | Back + J | 26 | Pivot and throw behind Reina; useful to reposition a crowd. |
| Swallow Vault | K | 0 | Vault over the held enemy and transition directly into a rear grab. |
| Release | G | 0 | Push apart with no damage; short mutual grab lockout. |

Attack priority while holding: direction + J selects a throw; neutral J selects knees. Up/down movement is disabled while holding. Grab lasts at most 2.2 s including strikes and vault. Knees can be used twice before vaulting, but front and rear attacks share one strike budget of three; changing side does not reset it. Sword specials release the victim first and cannot cancel a throw.

## Rear grabs and slipping behind
G from behind an enemy acquires a rear grab if spacing and vulnerability rules permit. Holding forward and tapping K while front-grabbing triggers the same vault as neutral K; vault changes Reina's side and facing while retaining the victim lock. Outside grabs, Empty Step can pass through a regular enemy; the player must turn and press G to acquire the rear grab. An evade is not an automatic grab.

| Move | Input in rear grab | Damage | Behavior |
|---|---|---:|---|
| Rear Knee | Neutral J | 8 | Up to remaining shared strike budget; final allowed strike releases victim. |
| Moonfall | Back + J | 32 | Rear suplex; locked paired animation; lands enemy behind Reina. |
| Syndicate Breaker | Forward + J | 22 | Shove enemy into crowd; collateral 14 per other enemy. |
| Side Switch | K | 0 | Hop around to front; once per grab session, within original timeout. |
| Release | G | 0 | Safe manual release, no damage. |

Suplex and hip throws are non-graphic arcade impacts. Vault takes 28 frames and suplex 58; victim and fighter anchor points are keyed together. Vault cannot cross a wall; reject with a brief blocked cue and preserve the existing hold. A throw chooses the nearest valid landing spot and stops at level bounds.

## Sword specials
| Move | Input | Damage | Cost / recovery |
|---|---|---:|---|
| Crescent Draw | Neutral L | 26 per nearby enemy, once | 12 HP; circular defensive draw, 70-unit radius, invulnerable frames 1–18, total 48 frames. |
| Silent Horizon | Forward + L | 36 per enemy, once | 18 HP; grounded dash slash up to 110 units, lane tolerance 19, armor but no invulnerability, total 58 frames. |
| Falling Star | L while airborne | 30 per enemy, once | 16 HP; downward diagonal cut on landing, radius 55; no added invulnerability, 30-frame landing recovery. |

Do not permit a special if HP is less than or equal to its cost. Costs are immediate, non-refundable, and cannot kill Reina. Sword returns to scabbard at animation end, including interrupted moves. Specials have a shared 1.2 s cooldown and cannot overlap with grabs/throws. No passive sword damage and no free ranged projectile. Hit flashes and arcs, no blood required.

## Damage, defense, food and enemy rules
Damage is direct HP subtraction: actual = round(base damage × target multiplier), clamped to remaining health. Standard multiplier 1; blocking multiplier 0.25 for normal attacks; throws bypass block. Bosses have normal damage multiplier rather than an unexplained defense reduction. Ground attacks only hit grounded targets; ordinary strikes do not. No random critical hits in v1.

Small food +15 HP; meal +30 HP; rare feast +55 HP, capped at 110. Example: 92 HP plus a meal becomes 110. Food stays on the floor at full HP. Pickup requires grounded, free movement within 18 units. It cannot trigger during a grab, hit reaction, jump, or throw.

Reina receives 0.45 s hit invulnerability and 1.0 s after standing from knockdown. Throw invulnerability starts at committed lift and ends on recovery; she is vulnerable during initial grab and knee strikes. Getting hit releases a held victim, cancels pending attacks, and clears shared animation links. Enemy death releases links safely. No automatic damage from touching enemies.

Regular enemies can be grabbed when grounded, not attacking, and outside wake-up immunity. Heavies must first be staggered; replace lifting moves with a 20-damage leg reap using the same throw inputs. Bosses can be grabbed only during a visibly signaled stagger: knees limited to two, no lift/vault/suplex, G releases and directional J becomes an 18-damage shove. Rejected grabs show a short cue and incur whiff recovery, with no damage. After any release, victim gets 1.2 s grab immunity; after knockdown, 0.6 s wake-up grab immunity. These rules prevent infinite grab loops.

Thrown bodies hit each other enemy at most once per throw, within 18 lane units, and stop dealing damage after landing. Collateral cannot launch another damaging projectile. Heavy collisions knock down normal enemies, stagger heavies, and do not move an unstaggered boss. Throws remain inside level geometry.

## Animation and implementation plan
Create the approved idle sprite first, then walk/run, normal combo, jump, reactions, and get-up. Next create paired front-grab/knees, throw flight/landing, vault, rear grab, suplex, and sword draw/resheath. Plan approximately 90–130 distinct Reina frames depending on reuse, plus matching enemy victim frames. This is an estimate, not a completed sprite inventory. Use consistent foot anchors and per-frame weapon/hitbox data; do not mirror her cheek scar or swap the scabbard side inadvertently.

States: idle, walk, run, normal attack, jump, air attack, evade, grab startup, front hold, knee, vault, rear hold, throw, special, hurt, knockdown, get-up, defeated. Every paired state stores partner ID, timer, shared strike count, and release cleanup. All attack states define startup, active, recovery, and a per-target hit set.

First playable implementation: normal combo, jump kick, front hold, knees, directional throw, vault, rear suplex, defensive sword special. Follow with evade, contextual rear kick, ground attack, dash special, aerial special, and heavy/boss variations. Test hit detection across lanes, all grab exits, wall vault rejection, interrupted throws, collateral once per victim, unaffordable specials, healing cap, pause/resume, and simultaneous enemy defeat.
