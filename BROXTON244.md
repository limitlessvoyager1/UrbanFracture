# Broxton / Subway repair — Playtest244

Checkpoint: `checkpoint-before-broxton244`, parent `938a330ff1a8606c46b50b7002e2bbd91f9e774f` (published Hydroelectric243). Existing levels, bosses, other heroes, weather, grabs and controller mappings remain in place.

## Recording audit and confirmed causes

Reviewed the 49.30s Subway gameplay recording, 3.77s wrestling reference and floating-board screenshot. The second clip shows a running arm sweep into a diving follow-through, palm landing and return to standing. Source art was inspected beside the existing Broxton atlas. The user identified an extra rear arm in the first generated follow-through; it was corrected before publication. Only that frame is imported from the corrected atlas, preserving the other eleven poses.

| Defect | Confirmed cause | Repair |
|---|---|---|
| Small station civilians | Idle body height110, runner115 at the near platform edge; around half Broxton's visible adult height |170 logical-pixel adult reference at .85 depth, opaque sole anchored to432/434. Running uses the same height reference. No universal NPC resize. |
| Floating departures sign | Programmatic310×100 board was placed over and offset from the baked mounted housing | Read the real panorama dimensions; map authored inner-screen/source support coordinates through the same scene transform. Text now sits inside the existing frame, with visible ceiling attachments. Both station and departure platform use this mapping. |
| Stiff/failed combo presses | Input226 treated `broxCombo179` as a generic locked action instead of its native press-driven combo | Pass those presses to Broxton's existing queue, preserving confirmation and full timing. A whiff still cannot chain. |
| Same-frame double-tap + Attack could become a punch |190's broad charge anticipation masked the movement edge before130 dispatched Attack | Preserve a prospective second tap and process Broxton's direction before Attack only when no Blitz intent is already latched. Existing latched/recovery-buffered intent remains valid. |
| Close Blitz whiff | Rush moved past a25-unit target before active contact and rejected targets inside16 units | Revised run-in/contact motion and source-authored arm geometry; close and farther targets now connect. Continuous half-frame contact samples avoid the30FPS narrow-window miss, without extended invisible reach. |
| Blitz diagnostics listed no strike | Old action used `hitAt:999` despite explicit contact calls | Actual23-frame strike event, active23–38,68 total. Mandatory landing/get-up recovery retained. |
| Get-up tail presses vanished |189 canceled both press and release through the protected wake, clearing any queued intent | Buffer Attack/Special only in final240ms of the existing wake, execute after protection. No early offense, recovery cancellation or added invulnerability. |
| Basic enemies crowded Broxton's torso | Marcus's cooldown approach target was45 units regardless of Broxton's larger frame | Broxton-specific72-unit unarmed /78-unit armed approach spacing in Street209; actual movement and normal attack admission retained. |

## New lariat and combat behavior

Twelve connected whole-body poses: brace, shoulder windup, two run steps, arm sweep, diving extension, corrected two-arm follow-through, palm landing, low landing, push-up, rise and guard. Native `broxRush179` remains the only action owner. New data and view files replace only that move's art; old189 locomotion, dodge, get-up, counters, grabs and other hero renderers remain.

All poses use one fixed151.8-local-pixel standing import and Broxton's existing1.05 world factor. No per-frame sprite scaling or torso/leg composites. Authored forearm points and the same frame clock drive contacts. The small diving lift is presentation of committed ground-attack motion, not a replacement for the universal jump system. Foot/hand landing offsets and imported alpha are retained. Anatomy is visually reviewed; numeric QA cannot automatically certify limb counts.

Original170-unit travel,64 primary /48 subsequent target damage and2.2s cooldown beyond action are unchanged. One contact per target; wrong lanes, grounded/protected enemies and inactive frames remain excluded. Startup, rear hits and missed landing/get-up recovery remain punishable. The active sweep may resist stagger from one ordinary frontal hit while taking normal HP damage; it does not grant invulnerability, damage reduction or grab immunity. Anti-air, armor-breaking/forced attacks, hazards, rear attacks and later hits interrupt normally. Iron Will's separate existing rules remain unchanged.

The Normal Director remains148:3 threat points, at most2 commitments. Enemy HP, damage and movement speeds were not reduced. Crowd handling improves through functioning inputs, source-aligned lariat contact, limited commitment poise and body-appropriate spacing. Human balance remains a separate playtest gate.

## Verification and limitations

New current-order suites: `tests/broxton244.cjs`, `broxton244-controller.cjs`, `broxton244-view.cjs`. Cover both facings at30/60/120Hz,25/45/100/210-unit contacts,64/48 damage, plane misses, single contacts,170 travel, full exits, startup/rear/recovery interruption, one-hit damage-taking poise, native combo confirmation, real get-up tail buffering, keyboard and standard/raw Sony/DSX mappings. Three seeded mixed-enemy runs retain the shared budget. The view suite checks12 asset paths, fixed import/aspect, corrected frame reference and source-mounted sign geometry. These checks supplement visual review; they do not infer artistic approval from dimensions.

Existing Broxton179, animation189, playtest226, gamepad/controller157 and Subway view/audio regressions are rerun. Full registered initial/release profiles and exact source fingerprints are recorded in `reports242/latest.json`, `reports242/LATEST.md` and `reports244`. Physical DualSense hardware, owner-approved screenshot baselines and human combat-balance approval remain unexecuted. No build is labeled stable based on simulations alone.

Browser review uses the real game menu/Subway render plus developer-only `broxton244.html` for individual poses, both facings, mounted board/civilian scale and native simulation playback. Inspector screenshots are candidates, not approved regression baselines. The full-body atlas prompt and correction prompt are saved in `source-art/broxton244/prompts.json`; import metadata and authored contact anchors in `manifest.json`.

## Integration and recovery

Modified existing owners:179 combat,130 charge dispatch,190 anticipation,189 wake handling,226 buffer classification,209 spacing and239 input diagnostics. Core damage adds a scoped damage-taking-poise flag used only by179. The new lariat view runs after the existing sprite stack; all other states fall back to existing art. F9 includes Broxton input acceptance/buffering/rejection and actual lariat frame/arm state. The Subway view's sign and near-platform civilians are repaired in place.

Rollback: create a recovery branch from the checkpoint or redeploy the saved Build243 version; do not destructively reset unrelated work. No user save schema or access policy changed.
