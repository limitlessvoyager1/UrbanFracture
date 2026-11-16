# Nightshade345 mechanics completion adapter

Files: `dist/nightshade-finish345.js`, `tests/nightshade345.cjs`.

Load after `nightshade-drone344.js`; activate only when `g.downtown345` is truthy and current hero is Nightshade. Original344 and all other heroes delegate to original methods. Shared Brawler, Energy316, Grab223, GrappleRecovery119, native armor/reaction/damage and Gamepad Reader remain authoritative. No separate combat or resource engine.

## Confirmed corrections

- R2/Unique tap is armed on press and resolves on release, minimum two simulation frames. Holding it waits for a chord, so R2 followed by Square or Circle does not spend gun energy or lock the requested charge/rear missile out. A pure hold cannot continuously fire. Action/recovery rejection remains native.
- Standing/aerial/drone strikes reject logical combat-plane or actual target-hurtbox elevation mismatches before native damage. Runtime diagnostics record the rejection reason. This is a logical collision check, not artistic hitbox alignment certification.
- Rolling front-away throw uses one shared keyframe timeline: capture0, lower8, roll16, feet plant24, upward kick/release32, missile command44, ground recovery60, rise84, ready110. Mirrored coordinates and depth are sampled from the same timeline.
- Atomic release at frame32 clears actual held/forest/session attachment and starts independent body physics. The native actor hook owns integration, with bornAt guarding against legacy double integration. Body cannot be reattached when hero recovers or is interrupted.
- Missile is a real travelling collision object from the actual drone position, with a minimum0.08s visible flight and scenery checks. Its15energy cost commits once on launch. It can hit only its still-airborne target, for12×mode damage, and has an independent SPECIAL energy receipt so it awards no energy.
- Physical20damage applies once on actual ground contact; original THROW energy classification grants12. Landing delegates native down/get-up handling at the actual impact location. Insufficient missile energy still produces a complete physical throw and costs no HP.
- An interrupted hero before release detaches safely; raised target falls without phantom throw damage. After release, target flight/landing and already-fired missile continue independently. The active throw reference survives a native damage call clearing player.act between ticks, preventing stranded forest locks.
- Swept body/scenery/arena collision, maximum3secondary targets, native15/10/8 regular/heavy/boss body-damage tiers, momentum loss and native armor handling preserve the existing thrown-body principles. No primary/collateral forced-armor rule was introduced for unrelated attacks.

## View integration API

`NeonCombat.Nightshade345.sample(g,a)` returns actual frame, phase, heroX/Z/angle, victimX/Z/angle, plane and release state for a.rolling345. `keys` exposes timeline keyframes. `missiles(g)` returns live travelling objects `{x,y,z,target,age}`. `flight(enemy)` returns the independent flight state or null; `enemy.flightPose345` reports ascending/falling and progress. `status(g)` is safe diagnostic data with recent actual events.

The new rolling action has `a.drone345=true`, `a.rolling345=true`, `a.move344='throw'`, and intentionally has `a.drone344=false`/`a.nightshade257=false` to prevent the earlier prototype cleanup from reattaching or grounding an independent target. New view must handle rolling345 explicitly; the old16pose344 renderer would otherwise select idle. Native drawActor still applies grappleZ/angle; authored full-body pose art should account for that transform rather than double rotating.

## Verification

PASS4,741 checks in `reports345/nightshade-runtime.log` and `.json`:

- Three synthetic Reader mappings: standard DualSense USB, raw Sony DualSense Wireless and standard DSX virtual Xbox; held-R2 then Square/Circle and completed-tap energy.
- Both facings at30/60/120Hz; no >70unit one-step victim snap, fixed depth, upward elevation, release, one missile/landing, correct total damage, recovery and cleanup.
- Interruptions at frames12/38/48/65, including owner interruption after release; no stranded hold/forestLock/flight.
- Energy-insufficient physical-only fallback and reset clearing old body/input/projectile state.
- Six abilities×three modes: exact native energy debits, no HP substitution, no drone energy awards, mandatory recovery.
- Wrong combat-plane misses and a gun below a genuinely elevated hurtbox; diagnostic rejection reason.
- Other six heroes retain counters; original344 behavior remains when opt-in flag absent.

This does not certify physical DualSense hardware, browser animation/art, full enemy roster visual alignment, durable campaign mode persistence, full campaign progression or performance. Existing344 mode snapshot API remains; no invented full-campaign save was added. Root owns frame-by-frame art and wider QA integration. No fullQA runner launched by this task.
