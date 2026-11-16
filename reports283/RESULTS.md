# Build283 verification

130 automated suites executed and passed; zero failed. Five manual gates remain unexecuted. Source did not change during the frozen release run. Framework decision: needs-review; this is not a stable-build certification.

Fingerprint: 3287b492b703eea14b6b845059b431938791e70e406ef3fe55f5ea606c1946d8

Recovery: checkpoint-before-niko283 at6facb8fd50d4ad5f583956205802a1dcf195b43b. The raw QA242 report retains its historical framework metadata; this build-specific report records the actual current checkpoint.

New focused coverage:98,486 native simulation assertions,130 presentation assertions,44 imported assets, and a real published-baseline reproduction of Marcus frontKick falling through to idle plus the old duplicated injury-arm overlay. Native tests cover11 enemy families, both directions,30/60/120Hz, eight stages per move, impact-only damage, simultaneous arm twist/stomp, logical and visual floor constraints, landing direction, actual input selection, stale-contact rejection, action-name substitutions, interruption/removal/reset/death cleanup, eventual wake-up and unlimited-practice deferred lethal settlement.

Browser QA reviewed the shoulder grip, wrist raise/pivot, descent, forward prone landing, away arm-twist/head-stomp finish, attached ready knife and visible kick at contact. The previously hidden attack produced the same13HP loss with a visible front kick. Final preview reload reported no application console errors. Screenshot files are adjacent. Earlier development iterations exposed optional-state guards and canvas-vs-image dimension handling; these were repaired and covered before the final frozen run.

Existing combat, grabs, input/controller simulation, AI Director, practice, movement, progression, environment and retained asset suites passed in the complete130-suite run. See QA.json for executed commands and logs.

Not executed: physical DualSense hardware, owner-approved screenshot baseline registry, broad all-move artistic certification and subjective human balance/playtest approval. The new dedicated victim bitmap set is Marcus; other enemies retain their own source artwork under shared synchronization. No claim is made that every existing game issue or every animation in every level is certified.

Run: node tools/qa242/run.cjs --profile release. Focused: node tests/niko283.cjs; node tests/niko283-view.cjs; python tests/niko283-assets.py; node tests/niko283-baseline.cjs. Read IMPLEMENTATION.md for change details, generation provenance and a stage-by-stage table. choreography.json records native60Hz frames rather than predicted move definitions.

The final recovery-pose refinement was followed by a second complete frozen130-suite run; all passed with unchanged test inputs. The previous report is retained as QA-before-recovery.json.
