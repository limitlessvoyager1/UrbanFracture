# Airport recording corrections and live window weather — Build 312

Recovery reference: published Build311 source `3c6d62cb7045884608a5f5c8060196648defd462`. Earlier source and original artwork remain recoverable. This report distinguishes native-render inspection from browser and physical-controller certification.

## Airport windows: additional request

All seven airport interiors (check-in, escalator choice, shuttle bus, security, gate concourse, customs, baggage claim) read `game.environment156.effective()`, the HUD's actual authoritative state. No separate weather selection, random generator or real-time animation clock is introduced.

New terminal glass uses a masked live sky with the engine's time/cloud lighting and celestial functions. Existing terminal/concourse/customs glass retains its architectural artwork and apron silhouettes, color-graded to the actual sky, with rain and snow clipped to glass regions. The bus window view also follows current weather. Actual `rain` and `snow` intensities render independently, including mixed precipitation. Lightning and wind read existing state. Indoor counters, agents and lights remain indoors. Image caches are bounded to two source families and refresh from simulation time; paused identical state renders identically.

Evidence: `weather/{clear-noon,rain-night,snow-dawn,mixed-evening}.png`, `weather/section-{2,4,6,7,9,10}.png`, and `weather/results.json`. These are native scene renders, not browser screenshots.

## Recording fixes included

| Observation | Confirmed source cause | Correction |
|---|---|---|
| Armed idle is walking; knife changes in attacks | Style310 chooses armed frame0 for stationary stance and uses baked dagger attacks | New original planted guard and empty-hand short-weapon poses; shared serrated combat-knife drawing used for engine weapon presentation |
| Running weapon detaches | Approximate hand sockets plus a pixel search can select a different limb | Explicit source-space foreground-hand sockets and original finger occlusion patches |
| Tornado looks airborne | Style310 substitutes four generic jumping-kick poses over native Tornado130 | Delegate the charged Tornado to its original authored native renderer and timeline |
| Taser has no electrocution pose | Generic recoil branch handles shock | Dedicated original four-pose electrocution family |
| German, hip throw, Outer Reap and rear Hook lose original motion | Generic solo throw poses and approximate Style310 composite remapping replace original synchronized rendering | Retain native paired ownership, hip pivot, kneeling follow-up, release and recovery paths; remove superseded generic paired presentation assets, preserve exact originals outside shipping assets |
| Airport cut at planter/check-in | Repeated cropped old background does not share structural boundaries | New coherent modular check-in architecture with real seated counter agents and physical digital displays |
| Floating and duplicated signage | Generic overlaid sign boxes plus legacy campaign GO marker | Flight information stays inside physical display casings; a single airport edge GO marker; legacy campaign marker excluded only in airport |
| Escalator floats | Transition's ride branch explicitly raises visual elevation | Grounded walk toward selected route followed by the existing fade |
| Bus stop includes indoor escalator | Shuttle section reuses exterior atlas row containing escalator | Dedicated outdoor street/bus-front-door approach artwork |
| Vehicles too small / translucent presentation | Earlier presentation scale and inherited drawing state | 34% larger vehicle presentation, explicit full-opacity source-over drawing, existing wheel ground anchor retained |
| Kevin lacks readable throwing poses / changes appearance downed | Competing renderer branches and inconsistent white-shirt recovery assets | Explicit windup/release/recovery at original release frame17; coherent original green-shirt sixteen-pose reaction/fall/get-up family |
| Bruno changes appearance when hurt | Reaction artwork differs from actual idle face/body | Coherent original sixteen-pose reaction/fall/get-up family matched to native idle |
| Thrown weapons do not reliably interrupt or recoil | Missing projectile impact provenance; legacy hero interruption exception | Actual physical projectile contacts record native hitstun, trigger interruption when native stun applies, preserve invulnerability and blocking rules |
| Frankie chain too fast | Requested presentation/readability timing change | Explicitly authorized +4 startup, +2 active, +6 recovery frames; damage/range/cooldown unchanged |

The enemy-specific report and actual rendered evidence are in `enemies/repair-report.md`.

## Validation

Targeted checks cover both airport branches, all hero travel identities, native weather state and pause determinism, mixed precipitation, pair ownership and safe release against Marcus/Kevin/Bruno in both directions, weapon gait sockets, planted idle, electrocution, actual thrown-weapon interruption and invulnerability guards. The complete release run is recorded separately after completion. Interrupted exploratory runs are not represented as successful final-source verification.

Production edits to game.js are exactly scoped to the airport GO exclusion and high-resolution airport canvas. The historical source-proof adapters reverse only those two exact fragments before applying existing proofs. No broad source-file exclusion or approval inventory rewrite is used.

## Limits

The browser preview navigation timed out. Native renderer captures are the visual evidence; no new physical DualSense certification, owner artistic approval or uninterrupted full-airport gameplay recording is claimed. Restoring a native paired renderer does not constitute newly authoring every enemy-specific joint pose; broader choreography remains subject to visual playtesting. The older glass artwork retains its original airport silhouettes while adapting lighting and precipitation; it is not a fully procedural exterior world. Existing boss placeholders remain TBD.

## Final verification

All197 release suites have passing results. The frozen run completed196passes/one obsolete cache-version assertion failure; only that assertion was changed311→312 and its52checks rerun successfully. Canonical fingerprint proof verifies every other frozen input stayed unchanged; production files were unchanged after the full run. Original failure, rerun and exact proof remain in FINAL_VERIFICATION.json and cache-expectation-proof.json. Five manual categories remain unexecuted. The long-session interruption was resolved through per-suite checkpointed batches, not by treating a partial run as complete.
