# QA242 — first implementation delivery

The first new framework is reusable asset/animation certification. The other10 frameworks were audited and ordered in the roadmap; existing tests are orchestrated, not replaced or falsely described as complete new frameworks.

Start here:

- [Architecture audit,11-framework roadmap and tool selection](QA242-ARCHITECTURE.md)
- [Visual Style Bible and retained reference board](QA242-STYLE-BIBLE.md)
- [Execution instructions, acceptance checklist and rollback](QA242-RUNBOOK.md)
- [Executed report](reports242/LATEST.md) and machine-readable [evidence](reports242/latest.json)
- [QA report template](qa/system242/REPORT-TEMPLATE.md)
- Initial suites: `tests/qa242-validators.cjs`, `qa242-runtime.cjs`, `qa242-scenes.cjs`, `qa242-compare.py`, `qa242-repair.cjs`; registry at `qa/system242/suites.json`.

Implemented measurements include aspect, category/depth scale, ground-contact evidence, movement/gait and planted-foot sliding, finite attack phases/exits and structure attachments. Representative bad fixtures prove each detector catches its intended defect. Actual adapters currently cover616 retained source images, Forest running contact frames, six hero movement envelopes, eight enemy entries,18 stadium spectator measurements and the casino machine height. Missing adapters remain explicitly unverified.

Six smaller stadium spectator measurements require perspective review; no resizing was applied. Candidate hero captures reproduced with zero changed pixels on the same browser. They are not owner-approved artistic baselines. A real broken Uptown PNG reference was detected, checked against a pixel-identical retained WebP, and repaired by the sole exact-hash metadata rule. No art was redesigned.

Release acceptance remains blocked by the existing Security216/current216 Orion-no-counter test contracts and unresolved visual/manual gates. The live Build241 is preserved. QA source/evidence can be saved as an undeployed version; it must not be presented as a newly stable gameplay release.

Checkpoint: `checkpoint-before-qa242` / `7784bd683d851f6719b7c12f0f947720f7fa4ed4`.
