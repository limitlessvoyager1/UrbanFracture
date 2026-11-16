# Enforcer — heavy regular enemy concept
Status: proposed; not implemented. Reference: ../concept-art/enforcer-concept-v1.png.
Taller and more muscular than the basic thug, burgundy tank, rugged pants, boots, tattoos, dark brown hair, wrapped fists. Unarmed heavy regular enemy, not a boss.
HP 110; slower than the thug. Numbers are initial balancing targets.

| Move | Damage | Behavior |
|---|---:|---|
| Heavy one-two | 9 + 12 | Interruptible close punch combo. |
| Power hook | 20 | 0.6 s shoulder wind-up, knockdown, 0.7 s recovery on miss. |
| Clinch punishment | 6 + 6 | Telegraph a two-handed grab for 0.55 s, then two body blows or knees. |
| Body slam | 20 | Finisher after clinch; total sequence capped at 32 damage including strikes. |
| Overhead slam | 26 | Alternative direct grab finisher; replaces clinch strikes and body slam, never stacks with them. 0.8 s lifting tell. |

Counterplay: sidestep the lane or interrupt grab startup. Held player may press J or K three times within 0.9 s to escape before the first blow, with an explicit prompt; count distinct presses, not keyboard repeats. No escape opportunity after committed lift. Other enemies cannot damage the player during a clinch or slam. After release/landing grant 1.2 s player invulnerability and 2 s enemy grab lockout, preventing repeated grabs. Maximum hold 2.5 s. Release paired states safely if enforcer is defeated or interrupted. Player never takes contact damage merely for touching him.
Reina can grab him while staggered; use her heavy-enemy leg-reap substitution rather than ordinary lifts/vaults/suplexes per her moveset specification. Sword special interrupts grab startup; it cannot activate after the player is held. Slow movement and clear tells compensate for durability and damage. Initial encounter should pair one enforcer with at most two basic thugs.
