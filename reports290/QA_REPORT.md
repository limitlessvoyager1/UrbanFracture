# Build 290 QA report

Checkpoint: `checkpoint-before-enemy-reactions290` / `20662bacb7724368c1507d788b7a95f48bb90836`.

| Check | Result |
|---|---|
| Roster validation | 22507 assertions passed; 30 identities; 2520 pose samples |
| Mechanical comparison | 10,800 native ticks identical to baseline |
| Source packaging | Eight canonical AST equivalence checks passed; no image changes; game.js unchanged |
| Browser playback | Quarter-speed practice loaded; one step advanced94→95 |
| Owner-approved art baselines | Not executed |
| Physical DualSense | Not executed |
| Every move/weapon/costume pairing | Not executed |

The final project-wide profile passed all142 suites, with0 failures and unchanged test inputs. Five manual gates remain unexecuted; the build is not certified stable. Full results are in `release-report.json`. The first broad run exposed four source-introspection test incompatibilities in the packaging trial; the sprite compactor now preserves identifiers referenced by tests. All four affected checks passed after that correction, and the final full profile passed on unchanged production files.

The rollout changes reaction presentation only. Existing damage, timing, hitstun, collision, AI, armor and specialized grapple rules remain intact. The source-textured articulation is subject to human artistic review; no automatic approval is inferred from these tests.

Files: `dist/enemy-reactions290.js`, script registration/cache versions in `dist/index.html`, eight semantics-preserving packaged JavaScript files listed in `packaging-preservation.json`, readable source archives, roster tools, AGENTS.md and reports.

See `IMPLEMENTATION.md` for architecture, execution commands, exclusions and rollback.

Native canvas validation requires serial enemy processes in this executor. Batched export attempts exceeded its memory limit and were discarded; successful per-enemy checks are retained with explicit evidence logs. This is not a browser memory or FPS certification.

Final roster validation:22,507 assertions passed, including2,520 actual mirrored pixel renders across30 identities; native mechanics remain identical over10,800 ticks. Accepted evidence is `validation.json` and the successful per-enemy logs in `final-roster-run.log`, `parallel-roster-run.log` and `serial-roster-run.log` (the unsuccessful batched attempts are retained as infrastructure evidence, not passes).
