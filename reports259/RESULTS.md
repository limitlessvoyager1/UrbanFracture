# Build259 QA results

Recovery checkpoint: checkpoint-before-loading-kevin259 atc1195106c3ff7344550b12906e121c8a9bf095a4.

Frozen source fingerprint: `ed13a6eac6e29e330937aa8f30652d099057bb4c2e1aae249ee683098610cdd3`. Initial and release used identical inputs; no source changes during either run.

| Profile | Executed | Passed | Failed | Not executed |
|---|---:|---:|---:|---:|
| Initial | 58 | 58 | 0 | 10 |
| Release | 63 | 63 | 0 | 5 |

Release decision: needs-review; stable=false. All automated suites pass. Five manual gates remain open: approved screenshot comparison, artistic review, exhaustive every-move coverage, physical DualSense, and human balance. No approved screenshot comparison was executed; browser images are evidence/candidates only.

Targeted repair259:235 assertions. Nightshade259:48 assertions. Native258 directional regression:11784 assertions. These counts are nested assertions and are not extra suite counts.

Browser: observed complete front/rear throws, cleared action/hold/held states and one-round R2 consumption, coherent Kevin release body, approved-size landing metadata, camera1680/bounds1704..2616. No terminal.local-origin console errors were observed in the captured log sample. Screenshot browser-recovery.jpg is a developer-controlled main-renderer scenario, not an approved baseline.

The first initial attempt failed two introduced feedback/early-fixture compatibility checks. Production code was corrected, original tests retained, and the complete initial/release profiles rerun successfully. No failures are waived. No new regression is known within the executed coverage.

Exact GNU deployment-size preflight:268410880 bytes of a268435456-byte limit. No artwork was deleted, resized or recolored to fit.

See IMPLEMENTATION.md for causes, changes, retained systems, limits and rollback. The original user freeze cannot be proven identical to the reproduced between-tick neutral-grab interruption; that specific cleanup defect is now tested and fixed. This report does not certify physical hardware or every possible interruption combination.

Files modified at reporting time (includes generated QA evidence):

```text
 M AGENTS.md
 M dist/encounter222.js
 M dist/game.js
 M dist/index.html
 M dist/nightshade-gun255.js
 M dist/nightshade-melee257.js
 M dist/nightshade-view251.js
 M dist/nightshade251.js
 M dist/sprites.js
 M qa/system242/suites.json
 M reports242/LATEST.md
 M reports242/campaign224-PRISON224-results.json
 M reports242/campaign224.log
 M reports242/current216-legacy.log
 M reports242/latest.json
 M reports242/runtime.json
 M reports242/security216-legacy.log
 M reports242/validator-self-tests.log
 M tests/nightshade257-view.cjs
?? dist/repair259.js
?? reports242/nightshade259-input-recovery.log
?? reports242/repair259-regressions.log
?? reports259/
?? tests/nightshade259.cjs
?? tests/repair259.cjs
```
