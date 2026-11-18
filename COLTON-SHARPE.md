# Colton Sharpe — Syndicate Backup Assignment 5

Adds the fifth responder to the existing Broxton R2/F phone system. No new player input or roster-selection menu. The current 30-energy call, 90-second cooldown, 141-frame animation/frame114 connection, two-actor maximum, shared attack owner and common 20-second support clock remain. This is an Assignment5 review candidate, not completion of Assignments6–7 or stable certification.

## Character and attacks

Colton has 60 HP, fast close-range positioning, a machete and one new whole-body 48-pose atlas. The atlas includes idle, eight walk/four run, turns, both attacks, hurt, fall/prone, four get-up and four injured-retreat poses. One import/draw scale and authored whole-body weapon attachment are retained; each facing uses the engine's standard reflection.

| Attack | Startup | Active | Recovery hit/block / miss | Direct damage |
|---|---:|---|---|---:|
| Chop |18f|18–23f|22f / 32f|19|
| Double slash |12f|12–16f;30–35f|30f / 38f|12+13=25|

Each strike needs actual native frontal/plane/clear-path/contact eligibility. A rejected contact can retry during that strike's remaining active window; accepted hits have per-strike receipts. Recoveries cannot be skipped. No automatic knockdown or stun-lock subsystem was added.

The spec supplies no approved bleed implementation or exact DOT values. Proposed bounded candidate: one lifetime application per target, one HP per second, maximum four damage for regular enemies/two for heavy enemies/zero for bosses. Wounds never stack or refresh. Native non-staggering status damage preserves grabs, movement and invulnerability; protected ticks are discarded rather than banked. Review these provisional values before accepting balance.

Healthy full-roster selection retains the latest requested 10% Cutter gate. A deterministic 40,000-call sample selected him3,937 times (9.8425%), with all four possible partners. Scarce-roster exception: if Cutter is the sole healthy provider, he answers solo rather than charging for an empty call. Individual defeat still triggers the existing zero-HP fall/get-up/limp exit and five-minute unavailability.

## Validation and limits

`node tests/cutter-support.cjs`:40,167 checks, including40,000 selector samples plus167 native assertions covering both facings at30/60/120Hz, exact damage/recovery, misses, guard/plane/rear/wall/invulnerability, interruption, bleed caps/immunity/pause, friendly-fire exclusion, injury and AI choice. New provider registration required older roster fixtures to expect five providers; isolated Assignment3/4 tests explicitly retain their four-role pools. Arrival regression found a missing role371 compatibility field in the new factory; the field was added and the unchanged arrival suite passed17,252 assertions.

Ten existing targeted software regressions pass: shared controller, entry, departure, injury, four-provider moves, selection, phone pacing/feedback, gamepad and controller157. Gamepad is simulated, not physical hardware. See reports/cutter-support for raw evidence. Native render captures255 frames covering both attacks/facings and defeat/get-up/limp retreat, plus a short video/contact sheet. These are controlled production-simulation/draw fixtures, not browser screenshots, approved baselines, a foot-slide certificate or complete artistic acceptance.

Targeted native checks also pass against the patched GitHub entry using an explicitly mixed Site-source fallback for untouched dependencies; this is not an exact full-checkout GitHub release test. Focused patches preserve GitHub's distinct index and Orion/QA stack.

Packaging built with tools/orion384/build.py, but verify.py rejects the candidate: expanded TAR estimate268,948,480 bytes exceeds268,435,456 by513,024 bytes (501KiB). Source and frames are retained. No deployment, live build-number change or merge. Browser, physical pad, approved performance evidence and full integration/certification remain pending. Broader QA diagnostics are recorded separately and cannot be waived by these targeted passes.

Checkpoint: local checkpoint-before-colton-sharpe at fa914b7 (prior phone work). GitHub base9a31acc3308d233a4fc202cde23a52598b71d086 on work/syndicate-phone-feedback. Stop here for Assignment5 review per the user specification.

## Interrupted initial diagnostic

The broader hosted-source QA242 initial diagnostic was interrupted after 97 Passed, 13 Failed, 1 Blocked, 225 Not Tested. Failures retain Unknown attribution; raw logs, transcript and omissions are preserved in reports/cutter-support/qa-initial-partial.json and adjacent files. This is not a completed initial profile. The source fallback used for the targeted GitHub entry does not establish exact-checkout release evidence. No stable publication is proposed.
