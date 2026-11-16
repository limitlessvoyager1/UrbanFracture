# Build276 regression-fixture migration

Initial full run:103 executed,100 passed,3 failed. Original logs retained as first-run.log / first-run.json. No production behavior was weakened to satisfy these failures.

1. nightshade252 resolved-distance gait asserted195/150 despite explicitly requested speed increase. It now compares phase to actual traveled distance / existing150-unit stride, retaining30/60/120Hz and stopped-phase checks.
2. nightshade263 old blitz assumed no contact through frame39 and targets225/245 in its long arc. New jumping heel sweep explicitly contacts22–30. Check now verifies no contact through21, exactly22HP once to both205/225 targets, and no hit to point-blank25, outside245, or wrong-plane targets. Native startup interruption, anti-air vulnerability, locked bounds and cleanup remain tested.
3. presentation275 used a local Git tag absent from a fresh remote checkout. Read the same baseline directly from the immutable commit documented in AGENTS instead. Preserve exact15% ratio, relative type scales, native jump clearance and rendering assertions. New276 checkpoint repro likewise uses its immutable baseline commit rather than depending on local tags.

Earlier fixture changes made before the first full run:251 walking expectation220,259 recovery-tail shot expectation reflects276.32s queue while retaining259native.24s buffer assertions and no duplicate shot checks;263view loads the new atlas and uses actual pose.sheet. These are explicit current requirements, not skipped assertions.
