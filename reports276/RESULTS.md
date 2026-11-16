# Build276 QA results

Executed 103 automated suites: 103 passed, 0 failed. 5 manual gates not executed. Runtime/test source stayed frozen during the final run. Source fingerprint: `2184a06ced5826ecd5aedc7423d4cb2ba8e985952297586236058855268bfba1`.

Gate: **needs-review**, stable=false. Physical DualSense hardware, subjective balance/art approval, approved screenshot comparisons and broader visual/performance certification remain separate. No screenshot baseline was replaced or automatically approved.

New targeted suites pass1017 runtime assertions,23 actual-input-pump checks,49 rendering checks and616 water-mask/current checks.13 new sprites verified nonempty with binary alpha. Managed-browser visual inspection covered running heel contact, equipped knife stance, long-weapon contact, slowed grounded baton beatdown, and lake/stream before/after frames. Browser errors observed were extension metadata errors, not game-script exceptions.

Initial run had three fixture failures; see FIXTURE-MIGRATION.md and first-run evidence. Final full run passed every automated suite after those documented updates.

Recovery: checkpoint-before-nightshade276 / fb436742c9b821a9f9d8d9a1363e93c98afca946. Deployment package cap check:268431360 expanded bytes against268435456 limit. Existing source/history and approved production data retained.

Controls: running + Attack (J / Square) → jumping spin hook kick; E / R3 → pickup or throw; R2 / F → handgun. Neutral ground taser provides3seconds of admitted shock.

See IMPLEMENTATION.md for systems/files, GENERATION.md for artwork provenance, and final-run.json for per-suite logs, tests not executed, known limitations and modified-file inventory.
