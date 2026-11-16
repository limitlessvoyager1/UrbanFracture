# Orion — build205 implementation and validation

Orion is the sixth selectable hero. His own directional art and character definitions extend the native command, charge130, damage, Director148 and synchronized119 systems. Existing characters retain their controllers. The production entry is `dist/index.html`; serve `dist` as static files. Editable code, original RGBA atlases, the reproducible importer and prompts are included. No external build dependencies are needed to play; regenerating sprites requires Python/Pillow. Tests use Node.

## Controls

| Action | Keyboard | DualSense |
|---|---|---|
| Move / run | WASD/arrows; Shift or double-tap and hold | Left stick/D-pad; R2 or double-tap |
| Attack / charge | J; hold3s then release | □; hold3s then release |
| Jump / aerial attack | K then J; down+J for hammer-fist | × then □; down+□ |
| Grab/release | G; contact grab | L2; contact grab |
| Directional throw | Hold forward/away + J in a grab | Hold forward/away + □ |
| Ground Current | Neutral L | Neutral △ |
| Golden Visor Laser | Forward+L | Forward+△ |
| Electric Ascension Slam | Grab+L | Grab+△ |
| Electric Meteor | Forward, forward+J | Forward, forward+□ |
| Retreating Boost | Q | ○ |
| Block | B | L1 |
| Counter | Reserved for separate design | R1 reserved |

Directions are relative to facing. Jump alone uses a neutral airborne pose; an attack requires its own press. The three aerial attacks preserve the takeoff lane. Other heroes' grounded follow-ups remain unchanged.

## Move definitions at60Hz

Frames are action-relative contact events, not repeated damage each frame. Damage is base damage before armor, guarding, encounter caps and difficulty modifiers. All physical throws require an actually acquired eligible target; the shared strong-target restriction/reversal system wraps Orion's inputs.

| Move | Damage | Startup / contact frame(s) | Active / travel | Recovery / total | Cost |
|---|---:|---|---|---|---:|
| Kick1 |5|8|One event, reach86|14f after contact /22f|0|
| Kick2 |6|9|One event, reach90|15f /24f|0|
| Turn kick3 |7|11|One event, reach96|15f /26f|0|
| Spinning piston4 |10|16|One event, reach104; step20|20f plus21f lock /36f|0|
| Lift/punch/smash grab combo |28|21,34,47,65|4,5,6,13 damage|Vulnerable72–92 /92f|0|
| Front forward: Shock Blast |26 +9×max2 chains|38,59|9,17; chains within160|Vulnerable72–96 /96f|0|
| Front away: Robo Slam |34 +6×max2 per side|36,68,84|14,14,6; two sides|Vulnerable91–114 /114f|0|
| Rear forward: Charged Piston |30 +light collision|48|Launch220; collision4|Vulnerable64–86 /86f|0|
| Rear away: Inverted Booster Slam |34|69|Lift/rotate/slam, rebound45|Vulnerable82–108 /108f|0|
| System Repair |Heal22 HP, full defense|180f hold, release|Once per life; max130HP|39f activation|Once/life|
| Electric Meteor |24×max3 +light collision|16f windup, impact45|29f arc, travel230, radius115|45f after impact /90f;3.6s Blitz lock|0|
| Ground Current |18 per crossed target, once|22|Two waves speed520, range260 each, lifetime≈30f|26f after wave /78f|16HP|
| Golden Visor Laser |22 per aligned target, once|30|6f beam, to visible edge/real tall solid|54f /90f|18HP|
| Electric Ascension Slam |62 +12×max2 nearby|24,87|12 uppercut +50 slam, radius140|Vulnerable105–132 /132f|25HP|
| Neutral jump kick |10|7|Contact window7–28, once|Landing plus6f|0|
| Forward knee |12|7|Contact window7–28, once; airspeed220|Landing plus6f|0|
| Downward hammer-fist |13|7|Contact window7–28, once; airspeed100|Landing plus6f|0|
| Retreating Boost |0|3|18f,82 backward; evasive4–12|11f /32f|25 defense;2s cooldown|

The full standing combo is28 damage and requires four separate presses. A missed opener cannot automatically advance. The last punch creates space. Synchronized throws protect only their committed interval, starting8–10f after commitment and ending at the listed recovery boundary. Ordinary holds, startup and recovery remain punishable; stage hazards keep their rules. Victim recovery is owned by shared119 until mandatory choreography ends. Invalid targets and interruptions clear ownership and deferred damage safely.

## Electrical rules and AI

Nominal extra shock durations: standard.36s, strong.23s, mini-boss.16s, boss.10s. Native ordinary hit reactions and encounter resistance still apply. Same-target repeated shocks inside4s diminish by halves, down to one quarter. Every accepted shock has a1.15s retrigger-immunity interval after its duration. It cannot stack or refresh while immune. Scripted/uncounterable attacks, active armor and phase transitions reject the added electrical interrupt. Damage is separate from stun.

Shock Blast/Ascension chain to at most two nearby, same-plane targets. Each impact/beam/wave has a target-specific damage key. Current waves expire and stop at solid geometry. The laser checks the actual horizontal ray at visor height180 and stops at the closest sufficiently tall solid object; low furniture can legitimately be below it. No entire-level hits. Meteor is actually airborne during its arc and can be interrupted by anti-air attacks. Specials do not add blanket invulnerability.

Director148 still owns the attack-pressure budget. After a visible electrical/repair preparation cue, about30% of eligible enemies choose an observed, delayed response (0.22–0.37s). Melee enemies may reposition/flank; ranged enemies may sidestep. No Counter-input reading or second AI controller is installed.

## Appearance and movement

Original six4×4 atlases are retained under `design/orion205`. Runtime art uses distinct left/right views, constant per-sheet import normalization, a common32-color palette (including explicit gold visor colors), nearest-neighbor native150px cells, a fixed source-cell root and sole anchors. Existing hero and background assets were not recompressed. Two unused locomotion studies per facing are excluded; the electrical-fist idle uses combat15 instead. Ordinary walk135; booster top speed285, acceleration570 and braking760 world units/s². Idle inspection cancels with input.

## Checkpoints

- `checkpoint-before-orion205`: live204 baseline.
- `orion205-foundation`: character, movement and repair; tested/visually checked before combat.
- `orion205-physical-combat`: physical attacks, paired throws and directional art.
- `orion205-electrical`: electrical specials/resistance and integration.
- Final commit/tag includes HUD, final palette, diagnostics and delivery reports.

## Verification

Run from the repository root:

```
node tests/orion205-foundation.cjs
node tests/orion205-combat.cjs
node tests/orion205-electrical.cjs
node tests/orion205-integration.cjs
node tests/current150.cjs
```

The Orion suites pass at this revision:30/60/120Hz movement, actual physical charge/release and four-press combo, interruption without consuming repair, once/life reset on respawn, persistence across six route families, both-facing throws/specials, continuous victim paths, exact finite damage, lane invariants, protection versus vulnerable recovery, laser obstruction, shock immunity/diminishing resistance, anti-air interruption, guarded/armored targets and native moving-enemy pressure. Every registered Scene Select start creates Orion correctly.

`current150.cjs` passes its26 established-contract suites. Additional passing suites: gamepad, controller157, environment162, environment-integration156, grab198, shield181, Slums204, Niko counters186 and yacht195. Raw output is in `reports205`.

One legacy suite, `charge130.test.cjs`, fails because its fixture expects Reina to need3s; her shipped2s contract already fails identically at `checkpoint-before-orion205`. Both logs are included. This test was not rewritten to hide the discrepancy. Orion's actual3s contract passes.

Visual browser inspection covered production selection/portrait/HUD, walking, booster movement, the lift/punch grab, aerial catch, paired contact and visor laser. Live normal-game inputs exercised movement, jumping and Ground Current against attacking Marcus enemies; the screenshot shows a Marcus reduced from60 to42HP. The first pass found an overlapping HUD label, a muted visor palette and a low beam origin; all three were corrected and the final laser was rechecked visually.

## Normal balance assessment

This is an initial measured tuning pass, not a claim of exhaustive campaign balance. Standing damage28 is below Forest36 and Broxton's power specialization. Direct throws26–34 and costly62-damage Ascension leave Broxton's72-damage chokeslam above it. Ground Current trades16HP and long commitment for18 damage on each crossed opponent; its value rises with clusters. A lone target gives no chain value. Laser22 damage costs18HP and has0.5s startup/0.9s recovery. Walk135 limits chasing; booster acceleration and Meteor provide deliberate exceptions. Repair adds only22HP per life and requires a vulnerable3s setup. Niko's counter implementation and damage are unchanged.

No observed freeze or logical-plane drift remains in tested moves. Remaining limitations: physical DualSense hardware has not been connected here (mapping/hotplug paths are simulated); the entire branching campaign has not been manually beaten with Orion; hand-to-limb contact uses discrete pose anchors and merits further art polish on unusually large/small victims; counters are intentionally unimplemented pending the separately requested design. Long-session player balance remains subject to play feedback.
