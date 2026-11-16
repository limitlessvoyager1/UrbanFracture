# QA report · Playtest249

Broxton now steps forward into a two-handed baseball cross swing, with hip rotation and an opposite-shoulder follow-through. The five weapon-using heroes have distinct attack profiles and48 fixed-scale attack poses. Weapon armor bypass,50% knockdown loss and universal electrical hit presentation are integrated into the existing systems.

- Recovery checkpoint: `checkpoint-before-weapons249` → `2801110b5ef8add8f01434e35e583f78c89c387b`.
- Initial profile:33 suites executed,33 passed,0 failed;5 release-only suites and5 manual gates not executed there.
- Release profile:38 suites executed,38 passed,0 failed. Five manual gates remain open.
- Gate: **needs-review / playtest**, not stable certification. The stable-release acceptance command correctly rejects the remaining manual gates.
- Automated corrections: none. Code/metadata changes were explicit implementation changes.
- Visual comparison: comparator self-tests passed; no approved screenshot comparison was available and no baselines were overwritten.
- Browser: Broxton baseball swing and hand/foot attachment inspected; Orion electrical knife contact dealt32HP and rendered a brief electrical reaction. Full browser batch timed out; no claim of complete browser coverage.
- Physical DualSense and human balance testing were not executed. Simulated controller regressions passed.
- New art remains review-required. Technical alpha/scale/anchor/grip checks passed for48 poses. Electrical render tests cover18 enemy families.
- No new critical regression detected in the executed suites. Complete all-move, artistic, approved screenshot, physical-controller and human-balance reviews before stable certification.

See `release.json` and `initial.json` for exact suite results; `IMPLEMENTATION.md` for timings, integration and rollback; `files-modified.json` for the changed-file list; `PROMPTS.json` and `asset-migration.json` for art provenance/migration (the migration file is named `asset-migration.json`).
