# Build375 — Backup continuity, urgency and departure announcements

Checkpoint: Build374 source4124c74871ba945c0b32e15b215c5b3715877cbf; local checkpoint tag checkpoint-before-backup375.

## Locked-battle continuity

Removed the phone lifecycle rule that cleaned up an active request whenever the ordinary street zone changed or a transition started. Active allies retain the same actor handles, HP, request and original support deadline through native street-section crossings and native locked-battle camera pans. Their remaining duration is not refreshed. Invalid old-scene actions release their contacts while retaining their remaining mandatory recovery; reload exclusion is preserved as well. Native resets, death, hero changes and explicit loads still clean up temporary backup.

Scripted hero movement during a battle camera pan now carries allied formation smoothly, including a held victim's synchronized position/visual socket. Outside-arena allies use native LockedBattles222.reentry to walk back into the fight. Ordinary support movement clamps its destination before taking a bounded step, rather than clamping an outside actor directly into the new arena. Allies remain outside hostile encounter membership, hostile population limits and the hostile Director budget.

Scene context is retained between simulation ticks, so exterior/interior coordinate remaps performed by outer scene adapters are detected as well. Remapped scenes reuse the offscreen entrance planner with the same actors and deadline. No replacement fighters, new payment or timer extension is used.

## Modestly stronger combat urgency

Shared decision interval:0.12 to0.08 seconds; shared post-recovery response gap:0.35 to0.22 seconds. Target pressure gap remains at least0.5 seconds; normal invulnerability, hitstun, wake protection, guard, full native startup/active/recovery frames and the single friendly attack commitment remain enforced.

Combat approach is15% quicker; allies that fall behind get a catch-up pace. Native entrance speeds remain unchanged. Target retention no longer abandons a foe merely because of brief hit invulnerability, while actual attack admission still respects it. Allies can punish a vulnerable enemy recovery or broken guard instead of waiting for that enemy to become fully ready again. The bounded chase allowance is four seconds, with shorter failed-chase retry. Michelle's additional reload exclusion is0.95 seconds rather than1.1. HP, damage and move frame data remain unchanged.

An isolated10-second native scenario measured first contact at2.13 seconds versus2.40 seconds under previous timing/movement settings, with six rather than four committed attacks. This is a scenario comparison, not a universal encounter or FPS measurement.

## Announced departures

Each living defector gets one named leaving line. Examples: Byron says “We're heading out. Stay standing, Broxton.” Michelle says “I'm out, big guy. Stay sharp.” Lines avoid immediate repetition when alternatives exist. The pair finishes any committed action and remains visible during the brief announcement window before walking offscreen. Defeated allies do not announce; a queued line is suppressed if its speaker is defeated before delivery. Repeated end calls do not duplicate announcements.

Subtitles always render through the existing phone HUD. Optional browser system speech follows the existing Sound switch and stops on pause/mute. Recorded character voices are not claimed; speech availability and voice quality depend on the user's browser/OS. Browsers without speech support retain the departure subtitles and exit behavior. No audio is requested merely by loading the module.

## Files

Runtime: dist/backup365.js, dist/support370.js, dist/backup371.js, new dist/backup-voice375.js; both game controllers and HTML source entries. Specification overrides, tests and tools/backup375 contain the retained rules and reproducible checks. No fighter artwork was changed.

## Verification

- PASS1,312 new native checks: real campaign street-zone crossings and real locked-battle pans at30/60/120Hz, same identities/HP/deadline, bounded arena reentry, no hostile membership contamination, held-victim pan synchronization, between-tick room remap, living-only departure ordering, speech fallback/stop behavior and comparative urgency.
- PASS18,029 retained offscreen entrance/delay checks,145 role-combat checks and3,541 phone lifecycle checks.
- PASS156,118 shared-controller/selection checks, including one friendly commitment and mandatory recovery; five controller/combat regression suites pass. Controller input is simulated, not physical DualSense certification.
- PASS native rendering of the actual campaign crossing, locked camera pan, participation and two named departure lines before exit. See native-review.png and render.json. Current production sprite owners were used.
- PASS exact-source, retained-asset and archive-cap validation. Deployment remains the established bounded Downtown review, with complete campaign source/art retained.
- No new browser playback, audible voice quality, browser FPS or physical hardware certification is claimed. The voice module was checked with supported and unsupported speech interfaces.

No known failing checks remain. The broader unfinished-roster and hostile-target-diversification stages are unchanged.
