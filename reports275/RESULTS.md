# Build275 verification

Recovery checkpoint: checkpoint-before-presentation275 (aea30ed1ca20b4761d016db59e9fd092a61b6965).

Automated release suites: 99 executed, 99 passed, 0 failed. 5 manual gates not executed. Source fingerprint: 115a0c8ba7f263ad0cb709c7137aa90bed3a03a7cccbab00d2477b1a373cb2e6. Inputs remained unchanged during the complete final run.

Gate: needs-review; stable=false. Exit2 denotes unresolved manual certification, not an automated failure. Physical DualSense, broad visual coverage, artistic approval, approved screenshot comparisons and human balance remain outside this certification. Existing approved screenshot baselines were not overwritten.

Browser checks: larger traffic, aspect-correct courthouse, Reina idle/walk, ordinary Kevin empty-hand recovery, straight hand-height thrown knife, forward hook collapse/prone landing and Fairways civilian scale/ground contact. Evidence: visual/*.jpg. These are review images, not automatically approved references.

Initial failures and exact fixture migrations are recorded in IMPLEMENTATION.md and first/second/third-release.json. Final production runtime and final test sources are covered by verified-release.json.

Run: node tools/qa242/run.cjs --profile release

Rollback: recover the checkpoint commit in a separate checkout and use the normal Sites source/package/deploy workflow. Preserve ongoing work; no destructive automatic reset or production balance-default change is introduced.
