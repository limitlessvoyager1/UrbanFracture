# Reina armed and published-render follow-up

Owner recordings 2026-11-17 064128 and064508. DSX DS4. Previous Passed/Failed/Blocked evidence remains. No GitHub merge or protection changes.

Confirmed:382 armed locomotion always chose walk, including native running. Weapon poses had hard frame changes and independent sockets. Now the native distance phase selects separate current-design run and walk families, blends complete bodies and interpolates the displayed hand. Knife carry uses an unobscured front grip and directly paints the standard363 knife after the body; grip redraw cannot hide its blade. All native weapon inventory/durability/action/damage values remain.

Rear-hook paired sourceDir is temporary. After it clears, the victim can face opposite the attack, reversing a fixed positive90degree render rotation. The final body transform now explicitly retains hookFall.dir through landing, while preserving 40damage,25/60contact,56/60total,.32s flight and90unit travel. Held enemies use a constrained neutral body rather than stacking recoil rotation with a large generic hitstun lean. HP, hitstun, grab admission and action clocks are not edited.

Flint's Downtown HD body lacks a painted carried pipe. Reviewed per-pose fist landmarks now place the shared metal pipe with highlights and hollow end on its hand. This changes neither weapon length/contact definitions nor AI/damage.

The earlier native392 audit loaded legacy modules omitted by the published bounded build. New explicit QA contract records the26 actual exclusions from Sites tools/orion384/build.py. The393 audit uses those exclusions, enables actual Downtown presentation, checks real running, knife paints, held bodies, Flint pipe and forward head rotation AFTER pairVisual clears. Both facings are required. No prior native pass is promoted to shipping or physical-controller certification. Visual blending/scale/design, all-moves, balance and hardware/performance approval stay open.

Live keyboard review found that rotated recoil art curls after landing. Grounded hook victims now use the existing authored face-down Repair262 pose, explicitly cancelling temporary paired transforms and retaining the original forward direction. Flight remains native/cached recoil; the floor phase uses its actual ground anchor. The earlier curled-floor screenshots are retained.
