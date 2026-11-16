# QA report · Playtest250

**Completed:** separate approved regular/heavy worker name pools;5 total workers maximum,2 heavy-only maximum,1 heavy maximum when any regular worker is present; one shared onscreen work-crew view and coordinated attack opportunities through the existing Director.

- Checkpoint: `checkpoint-before-workers250` → `02d6fa3fe10126f3096679981321824d09050aa3` (Playtest249).
- Final initial profile:38 executed,38 passed,0 failed. Five release-only suites and five manual gates were not executed there.
- Final release profile:43 executed,43 passed,0 failed. Five manual gates remain open.
- Source remained unchanged throughout the final test run. Exact fingerprint and all suite results: `release.json`.
- Native production-order tests cover actual five-worker spawning, heavy-pair/mixed-five AI, every member attacking over time, correct name persistence through actual locked transfer/reentry, offscreen restrictions and shared3-point/max2 attack commitments.
- The existing233 regular/heavy/grapple and six-hero×five-Docks-section progression tests passed, alongside current campaign, controls, combat, environment, subway and visual-adapter regressions.
- A new fixture reproduced ineligible regulars monopolizing situational attack turns. The fixture failed before the repair and passes after filtering candidates through their actual eligible move list. Both before/after logs are retained; the final full profiles were rerun after repair.
- Browser inspection confirmed all five normal names, approved heavy pair names, a four-regular/one-heavy population, shared visible membership and unchanged names after disarming. Evidence: `browser-checks.json`, `crew-evidence.jpg`.
- No artwork was generated/resized and no character stats, player controls, move timing/damage or baseline attack budget were changed. Cosmetic randomization remains independent of names.
- No automatic artistic correction or screenshot-baseline promotion. Screenshot comparator self-tests passed, but approved baseline comparisons were not available.
- Stable acceptance remains **needs-review** because approved screenshots, art review, complete manual move coverage, physical DualSense and human balance are not certified. This is a playtest publication.

Implementation/integration/rollback details: `IMPLEMENTATION.md`. Modified files: `files-modified.json`. The last published249 saved version remains recoverable.
