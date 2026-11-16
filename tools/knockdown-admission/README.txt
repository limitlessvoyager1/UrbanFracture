# Knockdown/recovery admission verification

Run portable regression from project root: `node tests/knockdown-admission.cjs`.

Optional parity: set UF_GIT if Git is not on PATH, then run `node tools/knockdown-admission/compare.cjs`. It compares against recorded starting commit 004585024f5579cfbbb7413916ac2d2e246eca38. This is a review comparison, not an assertion that unavailable historical receipts are verified.

Optional native browser: set UF_PLAYWRIGHT_MODULE to an installed Playwright package and PLAYWRIGHT_BROWSERS_PATH as needed; run `node tools/knockdown-admission/render.cjs`. It serves dist locally, uses a real Reina sweep and captures fall/ground/rise/recovery/ready states for all eight families. Offensive start attempts during protected phases must fail. The native renderer is observed throughout fall and get-up windows. No new production dependencies are required.

The existing nonoffensive utility policy and paired-state exception set remain intact. This correction changes admission only; it does not rewrite fall art, physics, recovery durations or wake controllers.
