# Build365 — Syndicate Backup / Assignment 1 review

Recoverable checkpoint: `checkpoint-before-backup365`, parent `a7bc8c2abc0d2e53e71872dfda8e517a30ca6460` (stable Build364). This assignment implements the phone prototype only, following the supplied requirement to stop for review before selection and the five-character roster.

## Gate0 audit

The engine is the existing Canvas2D/2.5D Brawler, with native start/advance/finish/damage hooks. UniqueAction251 had no Broxton handler; R2/F was unassigned for him. Iron Will is the approved three-second held-Attack charge through Charge130→Broxton179, not R2. It remains intact. No approved binding was removed. Grabs, counters, Blitz and specials remain on their original paths.

Shared Energy316 uses defense/maxDefense. Backup spends directly through its ledger rather than the special-payment adapter, preventing HP overflow. Existing Forest125/Companion126/GunnerTactics173 contains an owner-specific dog companion, not a general two-human ally roster; it must not be repurposed by overwriting `gunner125`. Hostile Director148 owns weighted attack reservations, two-attackers and response gaps. Those budgets remain unchanged in Assignment1. Future human allies require separate actor storage and hostile/friendly admission adapters in Assignments2/6. Existing scene lifecycle, camera bounds and companion ground clamps are reusable for later arrival/exit work.

Canonical fighter rendering is declared in tools/fighter-render/manifest.json; the new render owner is registered there. Audit135 now includes backup365 diagnostics. Diagnostics307 remains the existing combat inspector. Item319/Home327 journals remain authoritative; a validated backup snapshot API is supplied, but campaign save serialization and a dedicated developer UI belong to later integration. Neither is claimed complete here.

## Gates1–3 implementation

R2/F is an edge-triggered native action; mandatory startup blocks movement, attacks, block, dodge, jump, grabs and pickups. Holding cannot repeat. Existing PS5 standard/raw Sony/DSX paths remain. Calls while holding a weapon are rejected with clear feedback rather than generating an incorrect weapon/phone grip.

24 distinct painted whole-body frames, each displayed for three simulation frames, form the 72-frame/1.2s call. All use Broxton359's muscular burgundy/black identity and 151.8-unit standing height. Phone is painted in its gripping hand; no detached prop. A cool silhouette-clipped face/hand light grows while the phone is out and fades during pocketing. Brightness reads the shared environment hour, stronger at night. No new weather controller.

| Phase | Simulation frames | Duration |
| --- | --- | --- |
| Reach | 0–11 | .20s |
| Retrieve | 12–20 | .15s |
| Dial | 21–32 | .20s |
| Ring | 33–41 | .15s |
| Speak / connection at42 | 42–56 | .25s |
| Lower / pocket / recover | 57–71 | .25s |

A short original synthesized sine connection/busy tone uses the existing sound-toggle path. Subtitle hooks contain all supplied opening, five response pools, reply and operator lines, exclude consecutive repeats, and never block gameplay. The responder API takes a real future selector's two IDs; it does not fabricate a selection. No recorded voice acting exists or is claimed. The reviewed prototype plays Broxton's opening; defector answers are tested through the callback only until Assignment2.

Preconnection hits cancel with no30-energy cost and no90s cooldown; retry5s. Postconnection hits keep cost/request/cooldown. Call vulnerability overrides Iron Will's damage protection only while this call is active, preserving Iron Will otherwise. Cleanup removes the phone on the native hit-reaction transition, reset/death/scene/load; there is no lingering hand prop. Failed cooldown/retry/active/restricted/energy calls have no full animation or spend. Busy tone throttles to1s, occasional operator line to18s. No HP substitute.

## Gate4 timing contract — staged, not full ally certification

Cost30; cooldown90s begins at connection; request delay1–2s; maximum two unique actor handles, including staggered arrivals; one shared20s deadline starts at the first combat-ready actor handshake. Duplicate handshakes are rejected. Timer/both-defeated flags departure; scene/death/reset cleanup removes transient requests. These are tested lifecycle interfaces, not real ally movement.

**There is no roster/AI/arrival renderer in this assignment.** The prototype HUD explicitly labels this. At the requested arrival time, an unhandled prototype request logs `arrival-deferred` and clears rather than remaining stuck forever. Energy/cooldown remain demonstrable. Safe animated exits and offscreen-only despawn require the actual actors in later assignments; this stage cannot certify those Gate4 requirements. No hidden attackers, fake damage or visible character deletion are used.

## Files and assets

New: dist/backup365.js; dist/backup-view365.js; dist/assets/backup365/call.webp; source-art/backup365/call-source.png; tests/backup365.cjs; tools/backup365/render.cjs; reports365 evidence/receipts. Updated canonical/review manifests, game.js/game360.js audio/HUD hooks, fighter render registry, builder output receipts and AGENTS.md. Review starts as Broxton; other existing hero choices remain.

Atlas:228,894 bytes,24 full-body frames,6×4 grid; 256px cells,128/248 ground anchor;240px character registration, native151.8-unit height. Source image uses the supplied Broxton359 identity reference and an explicit reach/retrieve/dial/ring/speak/pocket sequence. Built-in image generation produced the source; deterministic packing only crops, registers and encodes it. No limb rotations or duplicated time-driven paper-doll gait. Prompt is saved with source art.

## Verification

Passed1,883 native assertions: both facings, mandatory-input rejection, full72-frame lifecycle, single30-energy payment,42-frame commit at30/60/120Hz, pre/post hits across nine phase points with/without Iron Will, all denial paths, transitions, snapshot validation, future actor timing handshake/departure flags, dialogue callback/duplicate validation and retained Iron Will. Render test passed25 checks including all24 displayed frame indices. The first run caught transition cleanup and a floating-point frame-boundary sampling issue; both corrected and rerun.

Passed existing gamepad, controller157, Broxton179, Broxton244, Broxton244-controller and Nightshade352 active-combat suites. Controller tests simulate standard DualSense/raw Sony/DSX, not physical hardware. Syntax and git diff whitespace checks passed. New tests are standalone alongside the existing tests/ suites; the render owner is registered in the shared certification manifest.

Native simulation benchmark:100 call lifecycles/7,300 ticks approximately1.05s total (~.144ms/tick including fixture setup). This is not browser FPS, memory-leak, or GPU certification. Source/render QA video is a native production-renderer capture on an isolated test floor, not a browser playthrough. Contact sheet visually inspected for continuity/feet/phone/body scale. It is not final artistic certification of all fingers/voice lip-sync.

Failed checks remaining: none in executed suites. Untested: physical DualSense, browser playthrough/audio listening, final voices, actual five-defector art/moves, selection rarity, hostile/friendly AI, actor arrivals/exits, full campaign save integration and browser performance. Existing manual/performance holds remain.

Evidence: call-sequence.png, native-tests.json, render-checks.json, registration.json, phone-call.mp4, individual native frame captures. Source full campaign retained; hosted artifact remains the bounded Downtown review. Package remains below256MiB expanded TAR limit; exact final receipt is package365.json.

Next: stop for review as instructed. Assignment2 implements Gates5–6 tactical pair selection and common friendly AI, before creating Bruiser/Gunner (Assignment3), Hammer/Enforcer (Assignment4) and Cutter (Assignment5).
