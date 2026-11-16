# Build342 resolution — work in progress

Checkpoint: `checkpoint-before-resolution342` at `09bb59f80b054cbd2bacdfa0840cecc74cae2027`.
This is a development checkpoint, not release or artistic approval. The live site has not been replaced.

## Confirmed production correction

A denied worker attack request reset `crewRequestAt250`, moving that worker to the back of the request queue. The existing `begin` function already records successful attack commitments. Removing the premature assignment prevents starvation while retaining the Director's three-point budget, maximum two offensive commitments, existing move probabilities, damage, startup, active, recovery and cooldown values.

Evidence: `worker-debug.log` records the pre-fix missing regular-worker attack history; `workers-fairness.log` passes 10,227 checks plus situational regressions after the one-line repair.

Two missing archived vault images (8 and9) were restored byte-for-byte from `art-source329/previous-vault-{8,9}.webp`. Current Nightshade choreography/aliases were retained. No artwork was redrawn or recompressed.

## Test failures investigated

The uploaded project combines later approved combat, physical HQ and presentation revisions with tests written for older revisions. Tests must exercise current behavior without pretending it is byte-identical to an obsolete checkpoint.

- Packed art metadata is evaluated in a DOM-free sandbox rather than parsed by splitting on the last equals sign. Existing image dimensions, source hashes, palettes, hand positions and structural assertions remain.
- Current combat preservation checks use the actual immutable Build341 Git object. Only the explicitly documented worker queue line is normalized. These are current source preservation checks, not historical balance receipts.
- Energy316 compares against a complete actual315 Git snapshot, including that snapshot's index and dependencies. It no longer combines old energy code with future mission modules.
- Reserve320 compares current native combat with a filled versus empty passive reserve. This proves passive-slot isolation; it does not claim full319-to341 behavioral identity.
- Charge controls test the approved one-second318 boundary.
- Completed knockdown recovery accepts current immediate input; tests continue to reject attacks while still down and observe the actual ensuing attack rather than checking after it has already finished.
- Security follow-up checks retain the exact50/50 choice and approved337 aggression gap.
- The current390px curbside wreck footprint is tested for legal lane clearance and native enemy approach at30/60/120Hz.
- Home327/328 UI checks now exercise physical338 navigation,339 object interactions and the actual title/dropdown entry and safe return paths. Restoring room-selection menus would contradict the home requirements. Historical phone/Astro-Call, resource/RNG isolation and controller-neutral checks remain.
- Worker246 negative controls run against the actual matching historical44d5352a artwork. Current330 gets additional64-pose connected-body and sole-root checks with unchanged imported source pixels. This grants no artistic approval.
- Recording306 view checks current312 four-pose Kevin falls and current310 Reina recoil rather than obsolete287/306 diagnostic receipts. Body visibility, ground alignment and current identity remain mandatory.
- Civilian view batches are registered separately, keeping all seven families and assertions within the per-process timeout rather than skipping them.

## Renderer test memory

The old crop test retained two complete native renderer realms simultaneously. A separate reference process now writes all336 losslessly compressed raw RGBA images and crop metadata, then exits before candidate loading. Candidate bytes are compared exactly after decompression. All27,293 ownership/pooling and336 native pixel comparisons pass. Neither production renderer output nor cache invalidation was changed by this memory correction.

This fixes the QA host memory failure. It does **not** resolve or waive the separate renderer frame-time hold.

## Deployment size

Readable editable source remains in `dist`. `tools/resolution342/build.py` copies every non-JavaScript file byte-for-byte and compresses all483 original JavaScript strings into a lossless LZMA source table. Parser-time wrappers preserve classic script execution order and lexical scope. No sprite quality, audio, scene or move content was removed.

Actual official-helper archive:

| Measurement | Bytes |
|---|---:|
| Compressed archive |266,551,255|
| File payload |266,849,890|
| Aligned tar entries including headers |268,209,152|
| Deployment limit |268,435,456|
| Remaining aligned margin |226,304|

All483 source files have identical UTF-8 bytes after round-trip decompression. The managed-browser smoke test displayed the title, started combat and exercised pause/resume without observed application JavaScript errors. This is startup evidence, not full campaign QA.

## Verification status

Targeted passing logs are in this directory. The canonical initial profile is running against frozen inputs. Its eventual report, not the number of individual fixes listed here, determines remaining automated failures.

Still open: renderer performance acceptance, final full-profile results, release-only/manual and physical-controller validation. No automatic image baseline or inventory approval was granted.

## Completed initial-profile result

`qa-initial.json`:210executed,210passed,0failed,82notexecuted (outside profile),`sourceChangedDuringTests=false`. The extra six suite entries split the existing seven civilian families; no family or assertion was removed. All32 previous initial-profile failures have been addressed.

`package-verification.log`:483 exact browser-decoded source strings; all non-JavaScript bytes preserved; decoder globals isolated; unknown script rejected. MIT decoder notice is shipped.

The visible browser benchmark **confirms** the performance hold. Mixed8 p95=42.8ms; changing-state8 p95=49.7ms versus16.67ms target,360measured frames each. This is an observed development-browser measurement, not a hardware-independent frame-rate claim. It is retained in `performance-before.json`.

## Performance audit and stopping boundary

`performance-profile.json` and `performance-profile.jpg` preserve the actual visible browser profiler. Across720 measured frames, scenery drawing accumulated9934.4ms (13.8ms/frame), actor drawing12013.1ms (16.7ms/frame), with5130 pixel readbacks accumulating8475.1ms (11.8ms/frame). Readbacks are **inside** actor cost; they cannot be added as independent work. Instrumentation adds overhead, so these values identify expensive paths, not a clean acceptance comparison. An earlier test tab was unresponsive to browser focus/close; shared browser contention is not ruled out.

Source paths: `dist/game.js` draw/drawDistricts/drawActor; `dist/uptown-view113.js` world/traffic composition; `dist/sprites.js` drawGrounded114 rasterization, exact-time invalidation and crop scans. These observations do not prove that a particular asset or scan alone causes the missed frame budget.

A safe continuation needs to profile individual scenery layers and native pose owners, distinguish immutable source/crop data from time-dependent drawing, then trial bounded caches only where exact source/state dependencies are explicit. Re-run exact RGBA/anchor comparisons and a clean paired browser frame-time test. Do not freeze traffic/weather, reduce animation frames, quantize timestamps, lower resolution, alter combat timing, or waive this hold.

This is the significant architectural uncertainty stopping boundary required by the audit instructions. The functional and packaging corrections are complete, but **the performance issue remains unresolved**. Source is saved; production deployment is withheld. Release-only checks and manual review remain outstanding. The initial-profile result must not be described as final game certification.

Saved functional checkpoint:Site version327, source`2b6905fdd9b5f0cc0bbf64c65bf5e96c0014ed2f`. Backend accepted the archive at268,185,600bytes. The MIT-notice-inclusive local tar has268,211,200aligned entry bytes (224,256bytes below limit).
