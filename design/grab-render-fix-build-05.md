# Build 05 — grab render crash fix

Reproduced grab → attack crash in the shipped game.js renderer. zheight attempted to invoke the holder's act object as a function instead of reading act.name. A held victim could render when its holder was idle, but a knee/throw action triggered TypeError and terminated the animation callback. Combat-only tests had not exercised this renderer path.

Replaced the malformed optional call with an explicit holderAction lookup and named slam/suplex/throw cases. Existing grab strike, paired positioning, lift, throw flight, and landing behavior remains in place; some actions share illustrated poses rather than having full bespoke frame-by-frame sequences.

New tests/grab-render.test.cjs executes actual game.js render functions with actual core combat states, reproducing the original failure and verifying knee, vault, throw, suplex, reap, shove, and both Enforcer slams render throughout their simulation. Existing combat, contact/poise, sprite bounds/state, and full-level regressions pass.

Browser QA used a temporary fixture with the real loaded artwork, combat code and renderer. Grab/knee, throw and rear suplex each rendered through 65 simulated frames with expected enemy HP 53/36/28. The fixture was removed from deployment assets after verification.
