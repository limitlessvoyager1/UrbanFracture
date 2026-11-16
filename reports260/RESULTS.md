# Build260 QA results

Checkpoint: checkpoint-before-nightshade-controls260 at b1b4944e774b48021b56e97de325a9a6bff91803.

| Profile | Executed | Passed | Failed | Not executed |
|---|---:|---:|---:|---:|
| Initial | 62 | 62 | 0 | 10 |
| Release | 67 | 67 | 0 | 5 |

No inputs changed during either frozen run. Between profiles, the negative fixture's historical-source reference changed from a local tag to its identical full commit SHA so future source checkouts need no unpublished local tag. Runtime inputs did not change. The release reran every registered automated suite, including that fixture.

Initial fingerprint: `0f27ae055f9f2f87d511785e36f75ba7690a57c8d28f07c6d52929f652e37200`.
Release fingerprint: `438a537c8f938ac61559ef51d84e7eeabaf5b65ad1e4c6094d8705de2a0cf89b`.

Decision: needs-review; stable=false. All67automated release suites passed. Five unexecuted manual gates remain: approved screenshots, artistic review, exhaustive every-move coverage, physical DualSense and human balance. No approved screenshot pair comparison was executed or baseline overwritten. No new regression is known within tested coverage.

New policy suite:459assertions; native input suite:12assertions. Negative fixtures reproduce two real prior-build defects, then distinguish current behavior. Full Flint211 and existing shared223/124/native257–259 tests also passed. Counts are nested assertions, not extra suites. See IMPLEMENTATION.md for exact tests, browser evidence, scope and limitations.

Browser candidate: browser-grip.jpg shows Marcus retained in front hold after the grounded rear-to-front switch and3.25s elapsed, beyond the old regular timeout. Other browser observations include Flint's continued power-swing recovery at2.75s and absence of terminal.local console errors in the sampled logs. Developer-controlled scenarios do not certify physical hardware or full human balance.

Automatic correction: none through the generic fixer; targeted code repairs were implemented and tested. No art assets modified. Exact GNU archive preflight268410880 bytes, below268435456-byte hosting limit.

Still missing by design/stage: Nightshade Blitz/specials/ground-roll/counters and foreign-weapon pickup/use profile/art. Full bespoke hand-contact transition artwork remains a manual art task; current grounded footwork reuses approved walking frames. This build does not certify missing moves as working.

Files modified at report time:

```text
 M AGENTS.md
 M GRAB223-results.json
 M dist/core.js
 M dist/flint211.js
 M dist/game.js
 M dist/grip124.js
 M dist/index.html
 M dist/nightshade-grabs258.js
 M dist/nightshade-lab251.js
 M dist/nightshade-melee257.js
 M dist/nightshade-view251.js
 M dist/nightshade251.html
 M dist/nightshade251.js
 M dist/repair259.js
 M qa/system242/suites.json
 M reports242/LATEST.md
 M reports242/campaign224-PRISON224-results.json
 M reports242/current216-legacy.log
 M reports242/latest.json
 M reports242/runtime.json
 M reports242/security216-legacy.log
 M reports242/validator-self-tests.log
 M tests/nightshade257.cjs
?? reports242/controls260-input.log
?? reports242/controls260-negative-fixtures.log
?? reports242/controls260-policy.log
?? reports242/flint211-full.log
?? reports260/
?? tests/controls260-input.cjs
?? tests/controls260-negative.cjs
?? tests/controls260.cjs
```
