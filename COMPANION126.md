# Build 126 — Gunner companion AI

Checkpoint: `checkpoint-before-companion-ai-126` (published Build 125).

Gunner's controller owns Follow/Idle, Threatened, Stunned/Recovering, ScriptedAttack, Protection, KnockdownProtection and Retrieving states. It suspends legacy follow and scripted companion motion while an automatic task owns him. Forest-only portions of coordinated actions remain playable during stun. A completed Maul charge stays held until the companion is available or the player cancels.

Enemy targeting is a configurable 20% opportunity for nearby ordinary enemies, 6% for designated defensive boss opportunities, capped at one Dog attacker and two active encounter attacks. Kevin and Carmen use their actual knifeThug/cop actor types. Gunfire never targets Gunner. Enemy attack hit events resolve against his position; each action contributes stun only once. Post-stun immunity prevents new deliberate targeting.

Normal settings: 3 hidden points in a rolling 5-second window, standard 1/heavy or boss 2; 5-second incapacitation plus a brief 0.45-second stand/shake recovery, then 8-second immunity. Easy/Hard settings match the supplied table. No companion health bar, death or graphic injury.

Automatic protection requires Forest at 30% HP or below and a reachable, visible interruptible attack. It cannot cancel armor, cinematic, phase or area attacks. A separate enemy-caused knockdown serial gates the one-attacker defensive stance. Neither behavior grants Forest invulnerability, heals him, revives him or changes get-up timing. Protection uses its 25-second cooldown and the shared 12-second cooldown at activation. A brief warning bark precedes the rush; stance discourages one opponent after its anticipation, rather than continuously interrupting the group.

Retrieval requires Forest at 50% HP or below, an existing eligible item within 360 units and a clear route. The original item is reserved, remains collectible by Forest before pickup, and is hidden/excluded from normal collection only while physically carried. Normal healing occurs only on delivery. Retrieval/shared cooldowns begin at pickup; canceled reservations cost no cooldown. Stun/commands drop the same object with its unchanged value. Stage/reset cleanup releases reservations; nothing is cloned or spawned. Emergency protection can supersede retrieval only if the shared cooldown permits it.

Supplemental Gunner atlas: `dist/assets/sprites/gunner-extra126.png`, generated from the existing Gunner reference through the built-in ImageGen tool. Six states: stagger, dazed side/rest, push-up, shake-off, pickup, planted guard. One constant import scale preserves body proportions. Carry icon and subtle dazed markers are canvas overlays.

QA: `companion126.html` replays the actual simulation for stun/recovery, intercept, enemy knockdown guard, delivery, carried-item drop and unavailable blitz. Companion tests cover difficulty values, one-hit identity, rolling reset, immunity targeting, HP gates, armor, enemy-induced knockdown, cooldowns, same-item delivery/drop, manual preemption, Maul interruption, held charge and Forest-only fallback. Existing combat, grapples, sprite and controller suites pass; original three heroes retain A/B parity with the new controller loaded. DualSense USB/raw Sony/DSX verification is simulated; physical controller hardware was not available.
