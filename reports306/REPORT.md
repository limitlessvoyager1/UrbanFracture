# Recording 306 — mall and combat corrections

Reference: `Screen Recording 2026-11-09 150520.mp4`, duration193.77 seconds. Recoverable baseline `a567b8ede54a2d2419119cd739e192afeab2c388`, tag `checkpoint-before-mall-combat306`. Gate11 has not started; this is correction work requested after Gate10.

## Issue ledger

| Recording location | Reported problem | Confirmed cause and correction | Verification |
|---|---|---|---|
| Beginning | Objects attached to civilians' legs | Mall renderer drew rectangular shopping bags independently of hands. Removed that drawing. | Source check; rendered mall scenes. |
| Beginning | Civilians float over planters | Lower panorama's ground crop cut the bottoms of pots; civilian paths had no planter footprints. Corrected backdrop registration and added background-only planter obstacles. | Native ground/obstacle checks and entrance render. |
| 0:03 | Door over electronics | Extra doorway image was composited over an already open store. Removed that overlay. | Native and browser render. |
| 0:03 | Railing blocks storefront | Glass railing was baked into upper-floor artwork. Repaired backdrop without railing; original-style code-drawn railing now occupies y522–540, below fighting ground maximum514. | Native and browser render. |
| Store entry | GO should point into the open store | Existing clear/settled encounter portal gates retained. Electronics/Italian GO points now identify open storefronts rather than added doors. | Native scene and existing progression tests. |
| Kiosks | Obstructed approaches | Moved shopping kiosks to lower lane edge y514; narrow depth leaves central travel clear, portals and screen-edge entries clear. Solidity remains until destruction. | Runtime geometry and six-hero real attack tests. |
| Kiosks / 0:55 | Small and hard to hit | Rendered height205→245; model widths211.5–230.4 now match artwork. Contact uses near edge of width and actual depth, not only centre distance. | Runtime contacts plus native render. |
| Kiosks | Need destroyed image then disappearance | Destroyed original-image sections form a low, broken display for0.8 simulation seconds, then disappear. Collision releases immediately; loot roll remains once,50/50 for shopping kiosks. | Native wreck/gone renders; loot/no-double-hit tests. |
| Carmen | Close taser absent | AI preferred82 units but contact taser requires56. After ordinary melee choices she can approach42 units and choose an eligible contact taser. Native capture/damage/cooldowns remain. | Actual capture/damage test and seeded native AI trials. |
| Carmen | Raises gun without probes | A real taser shot and a deliberate feint share the aim pose. Real shot reproduced in baseline isolation; do not call every no-shot pose a failed projectile. New bounded move rotation and ranged reposition give real eligible shots regular opportunities. Feints retain a separate action and0.35-second duration. | Real action emits probes and damages; feint emits none. Seeded AI observes both selections and actual probe objects. |
| 0:18 | Flint distorted/not flat on ground | Generic290 mesh deformed captured standing art. Excluded Flint floor/flight from that mesh; flat original frame11, original recoil/crouch/standing bodies now own ordinary ground sequence. | Mirrored per-frame floor/whole-body checks and contact sheet. |
| 0:32 | Bar detached while striking | Two Reina249 long-weapon fist sockets were misregistered. Corrected pose5/6 sockets in the shared data consumed by rendering and contact. | Source-image inspection, shared-rig assertions and rendered strike sequence. |
| Carmen prone | Distortion | Same generic standing-body deformation. Ordinary floor sequence now uses original fall9, flat10, kneel11, standing0 without mesh stretching. | Mirrored full sequence/floor checks. |
| Carmen | Wake sweep absent | Opportunity could be consumed outside102-unit range; previous AI also required a grab-specific wake marker. Preserve native22.5% selection chance but evaluate only when actually in range, past wake deadline and recovery. |24 seeded native wake trials. |
| Carmen | Baton anti-air absent | Ordinary positioning could consume the AI tick first. Eligible cop anti-air is evaluated before generic positioning, retaining startup, cooldown, legal target conditions and Director approval. | Seeded native airborne-approach trials. |
| 0:45 | Carmen clutches stomach before contact | Generic restrained source already showed pain. Ordinary Reina/Carmen hold now shows an original neutral restrained body (not her armed idle or stomach-pain pose), then original pain art only during an actual impact receipt. | Native held-state rendering checks. |
| 0:45 | Reina hand on wrong side | Equal-plane fighter sorting painted victim over near hand. Restore only the original near-hand/forearm pixels after fighters during this hold; no second body or extra limb. | Held render/contact inspection. |
| Hero hits | Reina looks like she blocks without block input | Native generic hit selection used raised-arm frame14. Actual clean damage now selects an original four-pose damage-recoil family; blocked hits retain guard feedback. | Clean-vs-block runtime test and native recoil rendering. |
| Approaching Kevin | “GRAB BROKEN” | Capture rejection was falsely labelled as escape. It now reads “GRAB UNAVAILABLE”; ordinary enemies still cannot randomly break a valid held grab. Post-get-up/committed-action protections remain. | Four-second regular hold test and rejection-label source check. |
| 1:09 | Kevin distorted/missing falls/fast rise | Later mesh renderer hid original six whole-body falling poses. It now delegates to the original sequence; ordinary Kevin down duration is at least1.45s including fall/ground/get-up. No normal armor or wake immunity added. | Six-pose observation, mirrored floor checks and runtime minimum-duration tests. |
| 1:25 | Enemies enter too far before active | Entry targets were player+300 instead of visible edge. Mall entry target now40/920 (clamped to current arena), without teleporting roots or removing initial recovery. | Runtime edge-entry test; encounter integration. |
| After knockdown | Reina specials fail | Late-down input was discarded, and zeroed recovery timers could precede absolute wake deadline by floating-point rounding. Buffer late-down/post-get-up special until all native locks and absolute deadline clear. New damage/scene change cancels queue. | Three exact wake-input timings; no early special. |
| 1:46 / 2:00 | Black line / tile seam | Repeating floor strips included black border pixels and fractional-edge gaps. Sample interior source pixels and overlap subpixel seam. Room-specific floor styles remain. | Native electronics/floor render. |
| Italian exterior | Unnecessary doorway | Removed only the extra Italian overlay; native restaurant remains open and clear-gated. | Native upper/restaurant scenes and portal tests. |
| Italian interior | Tiny seated people / placeholder tables | Seated reference126→150; original detailed wooden dining-table/chair sprite replaces rectangles. Added background-only table footprints and room-specific safe initial civilian positions. | Native restaurant scene; shared background controller tests. |

## Scope and evidence

Approved enemy/hero damage, Director3-point/two-commitment limits, controller mappings, counter costs, other heroes and specialized grapple owners are retained. Explicit requested changes include Carmen's move access, short feint, Kevin's minimum ground interval, and Reina's wake-special buffering. Native fall/ground/stand bodies replace distorted meshes; this does not claim newly authored full falling art for Flint or Carmen. Kevin's existing six full-body fall poses are restored. No global all-cast art certification is claimed.

New original art: railing-free mall backdrop, dining furniture, Reina clean-hit recoil and Carmen neutral restrained pose. Original generated sources are retained under `source-art/review306`; exact prompts are in `source-art/review306/PROMPTS.md` and export geometry in `tools/review306/import-art.py`; runtime imports use a fixed family scale and the existing Reina #0095FD palette. No proprietary reference assets used.

- `mall-0.png`, `mall-5.png`, `mall-10.png`, `mall-11.png`: native rendered locations.
- `kiosk-destroyed.png` / `kiosk-gone.png`: actual timed destruction states.
- `ground-sequences.png`: native ordinary Flint/Carmen/Kevin samples.
- `hero-clean-hit.png`: actual damage receipt selects original recoil.
- `ai.json`: meaningful native AI selections and observed projectiles, not invented reasoning.
- `runtime.json`, `view.json`, release report: validation receipts.

Initial targeted native AI run:60 real-shot selections,55 observed probe objects,5 close-taser selections,7 baton anti-air selections across16 seeded40-second trials;7 wake sweeps in24 separate seeded opportunities. Selection and emission are measured separately; these counts do not infer reasons for an individual unobserved emission (an action may not have reached its firing frame before a trial ends). These are controlled lab observations, not difficulty balance certification.

Full frozen-source release validation: **176/176 automated suites passed, 0 failed**, with `sourceChangedDuringTests=false`. Exit2 records the five unexecuted manual categories, not a failing automated suite. See `release-validation.json`. Five existing manual acceptance categories remain separate: approved screenshots, artistic review, all-move coverage, physical DualSense and human balance. Browser preview verified open electronics and bottom railing; physical hardware was not tested.

## Changed systems and files

- `dist/mall236.js`: prop geometry, contacts, edge placement, disappearance clock, room civilian starts.
- `dist/mall-view236.js`: open storefronts, foreground railing, source floor sampling, detailed tables, civilian bags, calibrated kiosk/wreck display.
- `dist/civilians305.js`: shared background-only planter/table paths.
- `dist/enemies210.js`: actual taser spacing/rotation, eligible anti-air priority and correctly ranged wake opportunity.
- `dist/enemy-reactions290.js`, `dist/review-view306.js`: whole native ground bodies, current damage/hold presentation, original near-hand foreground pixels.
- `dist/weapon-motion249.js`: two original fist socket calibrations, shared by visible weapon and contact geometry.
- `dist/recording306.js`: legal wake-special buffering, actual clean-damage receipt, minimum Kevin down interval and visible edge entry.
- `dist/grab198.js`: truthful failed-capture label.
- `dist/recoil306-data.js`, original sprite assets, `dist/index.html`, `dist/game.js`: original recoil art and explicit wiring.
- Three new recording306 suites, current QA registration and narrowly updated legacy fixtures. The kiosk loot test observes spawned items before automatic collection; it still requires one roll/zero-or-one drop. Collision tests use actual model width/depth rather than retired constants. Mall asset fixture verifies loaded source paths, including new table art. Gate305 gameplay-byte check removes only the new rendering call from game.js before comparing; combat source protections remain intact.

The first release preflight was interrupted while the controls260 historical fixture was running; it produced no final release result. A retained per-suite log is not evidence that this interrupted trial completed. Its log is preserved as `preflight-interrupted.log`; it is not a completed release or a failure waiver. New original recoil art uses one uniform4:1 import reduction at a fixed family scale (matching the engine’s native sprite density), with lossless sprite storage; dining/background assets use documented WebP exports. Final streaming release will test this exact packaged source.

## Visual review links

- [User recording timestamp contact sheet](reference-timestamps.jpg) — original observations.
- [Corrected native demonstrations, normal speed](corrections-1x.mp4).
- [Same source frames at quarter speed](corrections-025x.mp4) — playback slowdown, not additional authored poses.
- [Enemy grounded/fall/get-up samples](ground-sequences.png).
- [Electronics store](mall-5.png), [restaurant](mall-11.png), [clean hero hit](hero-clean-hit.png).

The demonstrations use controlled native-renderer conditions, not a browser gameplay capture or an identical replay of the uploaded recording. They have no audio.

Historical fixture failures in the interrupted fixture-review run were retained: Orion271’s all-other-hero-data equality now permits only Reina’s two explicitly calibrated hand arrays; all other fields and heroes remain exact. Review280 now expects245-unit shopping models and knows two new source dimensions. The verified294 checkpoint tag is restored.297/298/299/301/303/304 byte proofs reverse only six exact reviewed Carmen-source deltas (and the one new rendering call) before their strict historical comparisons; unrelated edits still fail. Final fresh checks are required after these corrections.

Native held-state regression also requires neutral306 before contact and pain274 only after a real knee connects. Both matched; final native assertion count1,419. Forward-special wake input was additionally exercised at73/90/126down-sequence frames and reached dashSword after native locks expired.

Final loading check: after the full run, only the game.js URL cache token changed304→306 so browsers load the corrected foreground call. Script order, JavaScript, assets and test inputs remain identical. Canonical fingerprint matches the tested source; `cache-validation.json` records both fingerprints. This token-only check is separate from the full176-suite run.
