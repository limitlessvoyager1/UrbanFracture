# Broxton tactical shield and grapple reposition —181

Checkpoint: checkpoint-before-shield181 at6b2cedf5fcc66fd4f1b3d3edbacc967a3e15ef08.

The existing Grab Transition input is Jump while holding a captive: keyboard K / standard DualSense Cross (raw Sony and DSX mappings retained). For Broxton ordinary grabs, the old side-switch is replaced by holding this same button. Other heroes and counter captures retain their original behavior.

- Hold the button alone:12-frame vulnerable setup, then an outward-facing Human Shield. The original front/rear grab classification is retained. A standing opaque captive and existing rear-control art keep both bodies grounded at their normal scale.
- Human Shield has a110-degree frontal candidate arc. Actual weapon/projectile segments, captive body bounds and combat-lane depth must intersect. The arc alone never blocks. Firearm ammo, projectile movement and ordinary enemy attack timing remain real.
- One qualifying attack is redirected to the captive through the existing damage pipeline, including the attacker's ordinary modifiers and the captive's own resistance. No bonus shield damage. The hold breaks, the captive falls, Broxton has12 frames of vulnerable recovery. The intercepted contact cannot also hit Broxton; persistent weapon contact sets consume that strike. Separate later hits remain dangerous.
- Behind and physical side misses resolve against Broxton normally. Setup and repositioning provide no interception or extra invulnerability. Ordinary enemy grabs retain their eligibility checks.
- Release the shield button early: the hold ends immediately. A24-unit,0.18-second gentle separation creates space without damage, knockdown, forced stagger or enemy attack lock. Broxton has12 frames of recovery. No automatic block or dodge.
- Maximum tactical hold is2.5 seconds on Normal, including prior idle grab time. A single deadline is retained across shield/reposition cycling. BREAKING FREE appears near expiry; the captive then escapes with harmless separation.
- Hold the button with a direction: both actors reposition, with original facing/classification, at62 units/second. Cumulative path length is limited to one Broxton body-width (44 × his unchanged world-scale). Reversing direction or releasing/repressing cannot restore distance or reset the deadline. Releasing during repositioning returns to the original ordinary hold.
- Iron Will remains separate:10-second duration and75-second cooldown after expiration,50% ordinary damage once, normal stagger/grab resistance, no timer extension. Acid remains full damage; sticky ground can break the hold; lethal cabin fire cannot be deferred by the tactical state.

## AI, feedback and preservation

Director148 keeps its existing pressure budget and attack admission. Enemy-specific probabilities and a0.22–0.47-second decision delay allow some enemies to reposition while others continue their existing attacks. Ordinary thug fixtures yield30% reposition /70% continue. Committed attacks are never canceled by shield recognition; strong enemies are less likely to avoid Broxton. Existing Jesse, Carmen, Frankie and mixed encounters create opportunities naturally; waves were not changed.

SHIELD READY, BLOCKED and BREAKING FREE use compact yellow16-bit cues under the HUD. F9 adds state, startup/active frames, captive identity/orientation, original classification,110-degree arc, incoming path and body intersection, timers, reposition usage, Iron Will and redirected damage. The animation inspector has actual shield, firearm, release and reposition fixtures.

Preserved: Boxing Shuffle/its behind-opponent pivot, two-second dodge cooldown for all four heroes, turn-lock/rear-grab opportunities, enemy recovery/roll rules, Broxton179 attacks and scale, counters, other heroes, level geometry/progression, weather/seed logic and controller bindings. No new bitmap assets.

## Validation

`tests/shield181.cjs` covers both facings and grab orientations at30/60/120Hz, startup vulnerability, outward orientation, one-hit melee/firearm/taser/knife interception, physical side/rear bypass, misses inside the candidate arc, projectile removal and firearm ammo, ordinary damage/resistance, one-width cumulative reposition, nonresetting timers,2.5-second escape, zero-damage/nonstagger early shove, short recovery, interrupted/dead/removed/scene/reset cleanup, Iron Will interaction, actual acid/sticky/fire handling, and persistent weapon hit consumption. Simulated standard/raw Sony/DSX held transition/release and all-four-hero2-second dodges pass. Current26-suite combat regression, Broxton179 suite, cabin168, lab166, environment162 and gamepad checks also pass.

Browser review checks the outward captive, ground contact and production firearm interception. Physical controller and human balance/performance certification remain unverified.
