# Gate 12 — repeatable visual and automated QA

Date: 2026-11-10. Baseline: f152ab22bfc62ef25647d053d9c1b3077813c923 (published Gate 11). Recoverable checkpoint: checkpoint-before-quality308.

**Status: needs review. Gate 12 is not certified complete.** This assignment adds QA scenarios and evidence, with no changes to approved production code, damage, frame data, animation assets or AI parameters. The current `dist` tree is byte-identical to the baseline by tracked-source comparison.

## Repeatable scenarios

Every scenario uses seed 308, native 60 Hz ticks, actual world positions, and real registered actors. Native Playback265 runs at 1×, 0.5×, 0.25× and one-tick stepping produce identical per-tick traces and random-stream state. These are execution checks, separate from slowed video playback.

| Scenario | Conditions | Confirmed runtime results | Evidence |
|---|---|---|---|
| A — Reina / Marcus | Native HP, same ground plane, earned three-hit combination, AI disabled for repeatability | Contacts at ticks 10,39,75: damage 7,8,10. First-hit stun 0.533333s; separate interruption probe observed 32 locked ticks. Interrupted attack callbacks cannot deal delayed damage. Knockdown, landing and recovery execute. | A-runtime.json; A/normal.mp4; A/sequence.jpg |
| B — Reina / Bruno | Native HP, earned combination, AI disabled | Three native contacts and full logical knockdown/recovery. Separate native probes distinguish clean impact from active armor, capture Powerbomb and release both actors, and trigger eligible anti-air with its five-second cooldown. | B-runtime.json; specialist-probes.json; B/normal.mp4 |
| C — Reina / Marcus, Kevin, Bruno | Live native AI, normal difficulty, finite six-second inspection, native hero HP, patterned block/attack input | Maximum reserved threat 3, maximum commitments 2. Hero finishes at 73 HP. Actual AI admission events and offensive actions occur. | C-runtime.json; C/normal.mp4; C/sequence.jpg |
| D — Niko / Saito | Native HP, earned four-hit combination, AI disabled in main trace; separately controlled counter and block probes | Contacts at ticks 6,23,42,64: damage 3,3,4,6. Native counter cancels an isolated fourth-hit strike, deals 23 damage in controlled training fixture and releases the pair. Jump attack preserves y=470. AI-disabled main trace does not test complete get-up: down=0 alone is insufficient. Supplemental wake-enabled run executes martialKip212 and clears the pending request. | D-runtime.json; specialist-probes.json; D/normal.mp4 |
| E — subway civilians | Native subway platform crowd, four seconds, no enemies | 18 registered civilians. Actual movement bounded by configured speed; gait phase follows distance traveled; stopping gameplay freezes roots and gait. 207 moving-person samples. | E-runtime.json; E/normal.mp4; E/sequence.jpg |

Supplemental contact/counter probes deliberately position native actions at known phases; they are not claims of earned full fights. The Niko/Saito interceptor fixture uses 1000 training HP to isolate interruption. Main A–D scenarios retain native HP. Scenario C is a short seeded observation, not proof of all encounter behavior.

## Rendered inspection

The original renderer and assets generated every captured native tick. `render-verification.json` compares all rendered simulation rows with the independently executed scenario trace. All five traces must match exactly. Normal videos are 60-frame-per-second captures. Half-speed and quarter-speed videos repeat those same frames over longer playback; actual slowed simulation equivalence is verified separately by the runtime tests. Individual PNGs and JSON traces support tick inspection.

A and B contact sheets show recoil, falling, ground pose and return to standing. The contact PNG at A/frame-81.png shows Reina's extended kick and Marcus's backward recoil with planted logical ground positions. This is a sampled visual review, not automatic artistic approval.

C demonstrates active pressure and legal commitment counts, but close sprite overlaps remain visible. The laboratory baseline line is y=470; crowd actors occupy several depth lanes. A foot above that line does not alone prove floating. Persistent overlap quality still needs live gameplay review.

E shows civilians moving along the platform with stable perspective, instead of animating all scenery. The isolated scene does not render the hero or full game HUD. It does not certify every subway section, train carriage, obstacle or civilian asset.

### Resolved fixture finding QA308-D1 — disabled wake-up dispatcher

In the AI-disabled D capture, Saito remains drawn on the ground after ordinary timers clear. Inspection found wakePending212=true. This extra state was absent from the first condensed trace, so ordinary timers alone incorrectly suggested he was actionable. The fixture disabled the AI routine that consumes the native wake request. This is not a confirmed production defect.

Confirmed cause: dist/martial212.js:67 queues wakePending212 after down expires; dist/martial212.js:28 consumes it through native AI; dist/sprites.js:358 intentionally renders the pending ground pose. Supplemental wake-enabled inspection permits only that native dispatch, observes martialKip212, and confirms the pending flag clears. See wake-probe.json and D-wake/normal.mp4. No production correction or balance change is warranted for this fixture limitation.

### Open finding QA308-C1 — close crowd overlaps

Observed at several sampled C frames despite legal threat reservations. The test proves commitment limits, not ideal visual separation. Candidate areas are crowd spacing/root displacement and depth sorting; an exact internal cause has not been established. Review at normal speed and with ground-anchor overlays.

## Prior before/after evidence

This gate performs no gameplay modification, so it has no newly corrected "after" build. Existing original before/after artifacts remain in reports297 (attacks), reports298 (reactions), reports299 (knockdowns), reports301 (grapples), reports302 (contact feedback), reports303 (crowds), reports304 (combat plane), and reports305 (civilians). Their own reports describe source scope and limitations. Current Gate 12 captures must not be presented as a recreated historical entire build.

## Reproduction

Run from the repository root:

```
node tests/quality308.cjs A
node tests/quality308.cjs B
node tests/quality308.cjs C
node tests/quality308.cjs D
node tests/quality308.cjs E
node tests/quality308-specialists.cjs
node tools/quality308/capture.cjs A
node tools/qa242/run.cjs --profile release
```

Replace A in the capture command with B,C,D,E as needed. Suites are registered as critical in initial and release profiles. The scenario contract is also checked against deliberately invalid threat and hitstun traces to ensure those violations are detected.

## Files added or changed

- tools/quality308/scenarios.cjs — deterministic native scenarios and trace collection.
- tools/quality308/capture.cjs — original native renderer, video and individual frame capture.
- tests/quality308.cjs — speed/step equivalence, mechanics, movement and approved-source protection.
- tests/quality308-specialists.cjs — controlled armor/block, Powerbomb, anti-air, counter and jump probes.
- qa/system242/suites.json — six critical suite registrations.
- reports308 — report, traces, capture evidence and release results.

## Acceptance remaining

Human artistic and balance review, owner-approved screenshots, broad all-move/all-level coverage, physical DualSense validation, and normal-speed live gameplay review remain open. No source or asset baseline has been automatically approved. This QA gate must not be called a stable-build certification merely because automated suites pass.

## Full frozen regression result

**185/185 automated suites passed; 0 failed; 5 manual acceptance categories unexecuted.** SourceChangedDuringTests=false. Frozen test fingerprint: `4e182c5c0cd340ba74e50f08d35b748752ed23c33aaa3b2958d67f6fa89e6ae9`. See release-results.json and release-run.log. Release exit code 2 correctly means needs-review, not an automated test failure. This release includes the existing 179 suites and six new critical suites.

A separate supplemental native Saito wake probe also verifies identical states at 1×, 0.5×, 0.25× and individual tick stepping, with martialKip212 observed and wakePending212=false at completion. Reproduce with `node tools/quality308/wake.cjs` and `WAKE308=1 node tools/quality308/capture.cjs D`. The first attempt to render this supplement concurrently with the full regression was terminated under memory pressure; the final supplement is captured serially. No incomplete video is accepted as evidence.

No new browser or physical gamepad session was executed in Gate 12. Native raster captures and automated tests supplement, rather than replace, live gameplay and human artistic review. Game publication remains unchanged because this assignment adds only tests, tools and reports.
