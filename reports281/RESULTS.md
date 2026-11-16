# Build281 executed QA report

Recovery checkpoint: `checkpoint-before-highway-animation281` / `94d1b42393436cfb872e6699e08680bb0a7e8001` (published Build280).

Full release-profile execution: **120 passed,0failed,5not executed**. Source fingerprint `498f045d3f560efbfdde4b7ff305964b3d4200ca018feed02b16026ff1d24f3e` matched before/after execution. No critical visual validation errors. The runner returns2for its honest `needs-review` state, not a failed automated suite. This is a playtest build; it is not labeled stable.

New runtime suite:190513assertions covering all six parked vehicles, both approach directions, every sampled legal lane,30/60/120Hz, all five ordinary enemy types, native AI approach, invalid-overlap correction, continuous eight-phase distance clocks and original single-reward behavior. New view suite:1073checks of whole-body gait, finite draw coordinates, one body per frame, exact active-contact poses, visible inter-hit retraction and original protected-state delegation. New asset suite verifies48unique cutouts, binary alpha, fixed sequence scales, proportions and opaque sole roots. Immutable-baseline suite reproduces the actual previous car trap and verifies the same movement succeeds now; see baseline.log.

Existing highway routes/optional trailer/both exits/hazards/respawn/rewards pass. Existing AI, workers, combat, counters, grabs, weapons, recent hero input/animation repairs and mall/slums suites pass within the complete120suite run. No production combat balance was modified. This does not certify every possible move/level combination.

Browser review used the real game renderer and developer-only controls. Observed the ordinary enemies reaching Reina beyond the shoulder sedan, grounded connected walking poses and Frankie's extended chain attached to the attacking fist. `shoulder-clearance.jpg` and `chain-contact.jpg` preserve observed frames. No application errors appeared in the inspected browser error log; unrelated browser-extension metadata errors were excluded. The browser completion-summary API returned its known schema error after the completed review; captures remain valid.

Not executed/approved: owner-approved screenshot baseline comparisons, complete art-style review, all-moves coverage, physical DualSense testing and human balance review. Targeted browser observations do not count as these broad approvals.

Modified files and limitations: IMPLEMENTATION.md. Art source/import/attachment details: GENERATION.md and asset-import.json. Automated raw results: QA.json; focused test logs alongside this report. No automatic artistic redesign/correction was applied beyond the requested layout and targeted animation replacements. Current public assets total267070793bytes before tar headers, within the hosting budget; final packaging verifies expanded archive size separately.
