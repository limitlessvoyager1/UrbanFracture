# Reina Sword Stance — Build378 / Assignment1

This implements only Gates0–3 and the user's explicit hit-cancellation rule. The supplied instructions end with: “Begin with Assignment1 only and stop for approval before proceeding.” The foundation is ready for visual review; the three offensive sword moves are not implemented in this stage. While stance is active, Square shows a next-stage notice. Sheath with R2 to use Reina's normal combat again.

Checkpoint: `checkpoint-before-reina378`, based on Build377 source `6180f4d03c4c009224a0132eba1de107352e453e`.

## Audit and input resolution

Reina's R2 Unique Action was Dragon Tail in `unique311.js`. The requested Sword Stance now owns this slot. Dragon Tail's legacy implementation remains callable through `NeonCombat.Unique311.start` and `SwordStance378.previousUnique`, with its native combat regression retained. No new player button was invented for the old action. The new behavior supersedes its old R2 binding. Reina's existing Triangle sword specials, airborne sword wheel, counters, grabs, charge, Blitz and normal Taekwondo combat remain unchanged outside stance. Other heroes' bindings delegate to their existing owners.

Audited native UniqueAction251, Weapons248/Counter248 eligibility, Charge130, Unique311, Energy316, Combat134/Plane304, Companion126 clear paths, Reina354/Katana355 draw ownership, shared director and actual controller input fixtures. No separate combat engine or energy resource was added.

## Implemented foundation

- R2 begins a36frame sword draw, without energy spend or cooldown.
- Physical preparation, draw, knee bend and stance settling use8 authored poses.
- Low, wide, bent-knee idle uses4 breathing poses. The attached screenshot supplies posture only; Reina's model reference supplies her identity and outfit.
- Forward/backward stance locomotion uses8 poses each. Depth movement uses4 poses. Movement is70% of native walking speed; native depth multiplier remains65%. No running or automatic grabs.
- Nearby threat direction controls facing so backward movement remains a retreat rather than an instant mirror. With no nearby threat, movement direction controls the dedicated turn. Four turn poses run over12frames before native facing changes.
- R2 from legal neutral begins a30frame,8pose sheath transition back to normal. It cannot skip draw, turn or mandatory recovery. Attack-exit buffering and automatic low-energy exit are later Assignment5 work.
- A real damaging/staggering hit cancels stance immediately during draw, ready, turn or sheathing. Native hitstun/knockdown remains authoritative. Brief compatible hit-cleanup poses keep the sword under control; flight/down reactions use normal native hurt ownership. Ignored invulnerable contacts do not falsely cancel stance.
- Blocking, counters, dodging, ordinary grabs, normal combos, Triangle specials and jumping are disabled while the foundation owns the stance. No automatic energy regeneration. No HP substitution or stance damage is implemented.
- State lives on the current player actor and is cleared naturally by native reset/hero replacement; stance interrupts on scene transitions, death, knockdown and loss of ownership. Full save/load certification remains later work.
- Audit135 exposes actual phase, sword state, energy, facing, movement mode, configured speed and transition frame. A small HUD identifies the current stance and R2 sheathing.

## Art and files

Built-in image generation created48 full-body poses using `source-art/reina354/blue-reference.png` for Reina's approved appearance and the supplied screenshot for posture. Source art, exact prompt and posture reference are retained in `source-art/reina378/`. Her long blue hair, blue/white outfit, blossom emblem, sandals, armguards, gold detailing, scabbard and katana are carried into the new poses. Final artistic/model consistency remains subject to this visual review.

`tools/reina378/pack.py` registers source rows into transparent256px cells using one anatomical scale for every pose, preserving the naturally lower stance instead of enlarging crouched bodies. Runtime asset: `dist/assets/reina378/foundation.webp`; data: `dist/reina-stance378-data.js`; action owner: `dist/reina-stance378.js`; draw owner: `dist/reina-stance-view378.js`. The entry points, production HUD and fighter-render manifest include these modules. Exact per-frame registration measurements and atlas review are retained.

No existing Reina art generations or katana assets were replaced. The stance draw owner delegates back to current Reina354/Katana355 presentation outside the stance/brief interruption cleanup.

## Verification

`tests/reina378.cjs`:2,255 native foundation assertions, including30/60/120Hz, both facings, exact movement speed, backwards facing, frame-locked draw, restrictions, single R2 press, hit cancellation in all transition states, manual sheathing, no regeneration, no HP substitution, reset and Broxton R2 preservation.

`tests/reina378-input.cjs`:32 real input-pipeline assertions using simulated standard DualSense, raw Sony, DSX and keyboard edges. Physical DualSense hardware is untested.

Passed existing Reina269/270/279 combat, grip input, legacy Unique311 combat adapter, Energy316 spending/generation/pickup/defensive integration, Broxton phone, Assignment4 ally attacks, gamepad and controller-recovery regressions. Legacy Unique311 combat tests now call the retained adapter directly rather than expecting its superseded R2 binding. No unresolved failed tests.

Rendered current production controllers with actual Reina354/Katana355 and stance378 art owners, showing normal stance, sword draw, low idle, forward/backward movement, turning, depth movement, manual sheath and hit cancellation. Evidence: `native-review.png`, `stance-foundation.mp4`, half/quarter-speed derivatives, `atlas-review.png`, `registration.json` and `render.json`. These are controlled native simulation captures, not browser or physical-controller footage. No final artistic, browser-performance or full mechanic certification is claimed.

Package verification confirms exact native source strings, required scripts and retained assets under the existing Downtown deployment cap. No unrelated level or hero changes.

Next, after visual approval: Assignment2 — Rising Diagonal Slash,10energy, native collision/recoil and hit/block/miss recovery. Spinning Retreat Sweep, Crescent Cleaver, full low-energy/input policy, stance-aware enemy AI, expanded Developer Panel and final certification remain later assignments.
