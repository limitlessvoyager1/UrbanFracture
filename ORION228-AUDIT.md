# Orion rebuild audit
Checkpoint: checkpoint-before-orion228 (published Build227,9da90a5). Original character controllers and renderer retained under source-archive/orion205-before228; art retained.

Confirmed defects before editing:
- Ordinary interrupted attacks leave orionPose205 populated; renderer prioritizes it even without an action, explaining the persistent kick image.
- Combo and queued-stage dispatch use unchecked indexes and force cooldown to zero; no finite-state watchdog.
- System Repair restores HP/defense and consumes its life flag at action startup, not the completion event.
- Old moves use different timings from the supplied specification; one-event melee checks miss valid later active-frame collisions.
- Aerial attacks latch a live target and continuously clamp travel toward it, introducing tracking; downward contact is not restricted to descent.
- Laser damage is an instant one-frame lane-wide query with a fixed torso-relative visual offset, rather than visor-owned contact geometry.
- Counter input explicitly says RESERVED instead of entering the shared counter system.
- Multiple Orion-specific advance/tick wrappers compete across the four modules; scene/charge/recovery cleanup is incomplete.

Replacement scope: the four Orion205 controller files and Orion renderer/diagnostic harness, in place, with one character dispatch and shared119 synchronization. Compatibility namespace/fields are retained where shared charge, grab, Director and counter infrastructure requires them. Existing six-hero input, movement/collision, life/HP, defense, shared198/223 grab policy,119 synchronized recovery, enemy AI, electrical resistance, weather, arenas and other heroes remain authoritative.

Verified replacement and integration:

| Area | Build228 ownership | Retained shared authority |
|---|---|---|
| Animation/action clock | One finite Orion dispatch, startup/contact/follow-through/recovery definitions, stale-pose cleanup, fault recovery | Native actor advancement/render infrastructure |
| Ordinary offense | Three kicks plus right-hand piston; per-event collision and bounded collateral | Native damage, collision, defense, enemy protection |
| Grabs | Lift/punch/smash; four directional attacks; aerial electrical slam | Grab198/223 classifications, contested decisions,119 synchronization/get-up safeguards |
| Repair | Established3s charge, completion20f, recovery24f,22HP/full defense; life flag at completion | Charge130 input and native life events |
| Electrical | Bilateral traveling currents, visor-anchored laser, airborne ground smash; event-keyed effects | Existing electric205 tier resistance, diminishing repeats, retrigger immunity; special HP costs/CDs |
| Defense | Backward booster dodge5/12/12,2s CD; native counter capture followed by finite retaliation | Universal input, costs, counter eligibility, weapon evade |
| Developer inspection | Hidden orion205.html move/frame/rate/target controls and read-only Audit135 diagnostics | Existing engine loaded directly, no second game controller |

Additional defects caught by final verification: an aerial definition object shadowed the numeric air speed; native counterCapture required a post-capture transition; interrupted held charging required an independent release latch. All repaired with regression coverage.

Validation completed: tests/orion228-all.cjs (six focused suites;30/60/120Hz and both facings where applicable), tests/grab223-all.cjs (six-hero threshold/contested/repetition/get-up/encounter regressions plus established combat/controllers), tests/prison224-all.cjs (full campaign, all six heroes, environment/weather and controller integration), tests/prison227.cjs (all15 background selections and overlay state). Browser inspection covered production artwork, live visor beam and synchronized lift. Original artwork is reused at one fixed import scale; no new combat sprite generation.

Limitations: physical DualSense USB/Bluetooth hardware and human balance testing were not available. Automated native/raw-Sony/DSX mapping tests pass; this does not certify physical hardware feel or final balance.
