# Build 25 — separate block and counter

Source opened from published build24 into a fresh checkout `/workspace/sites/neon-knuckle-build25`; old checkout contained an earlier unsynced state and was left intact. Publication base d3278446541065924c6f0e27b6a67cf2c2706849.

PS5/XInput mappings: L1/LB block, R1/RB counter/weapon evade, L2/LT manual grab/release, R2/RT run. Keyboard B block/C counter/G manual grab; touch counter button added. Saved old custom grab/R1 mappings migrate to counter in Reader; optional grab uses free L2 or requires custom remapping if occupied. New calibration prompts include counter and separate grab. AGENTS.md standing map updated.

Block no longer arms catches. Counter is a distinct ground/free-state action with.55second window instead of.45. Each valid grounded press costs10defense even if it misses or is pressed during cooldown; repeated presses cannot extend the active window. Re-arm cooldown.7seconds. Blocking excludes counter activation and cancels pending counter window. On success, remaining cost is paid so total stays33⅓unarmed/50knife or weapon/75Jackal, including initial10. Insufficient remaining defense fails counter and retains failed-attempt cost.

Bruno/Brick/Jackal counters are rejected at>=60%HP. Lower-health counter catches retain their existing bypass of ordinary40%grab threshold. Dormant/wake protections retained. Frankie is a regular biker and is not subject to heavy-enforcer/boss HP gate.

Punch or knife-arm counter freezes opponent for a.85second follow-up window. Attack executes7+7+14 combo ending in palm-strike artwork and knockback; direction+Attack throws. Kick counter Attack executes24damage outer-reap takedown. Weapon evade still slips behind non-knife weapon attacker instead of grabbing. Counter success has subtle gold diamond, small COUNTER label, sound, and HUD follow-up indicator. Unused window releases cleanly without idle-grab penalty. Existing normal grabs and grip switches unaffected.

Brick anti-air uppercut simulation retained and tested; dedicated suited-frame uppercut rendering now takes priority with startup/extension/recovery instead of falling through generic heavy animation. Existing2second anti-air cooldown and1second standing lock retained.

Blitz retains2second post-action cooldown. Removed broad blue circular slash and blue impact ring; kick keyframes now carry only small localized blue light at foot. Physical hit reaction, shake and impact audio retained. Palm-charge aura unchanged.

## Validation

All27 regression suites pass, including new counter/block exclusion, per-attempt/no-extension spam cost, exact60%gate, success cue, follow-up expiry, palm combo/takedown, controller mappings and Brick uppercut. Updated legacy catch tests to use Counter rather than Block. Full ordinary-input route passes44kills/430.8seconds/6HP/no checkpoint retries. Browser QA verified success cue/67meter, foot glow without broad flash, Brick suited uppercut and new controller guide. Temporary QA removed before packaging. Physical DualSense unavailable; simulated standard/raw/custom/DSX tests pass. No new bitmap assets required.
