# QA242 — execution, acceptance and rollback

Current change declarations, impact planning, immutable reports, CI and acceptance semantics are defined in [QA242-POLICY.md](QA242-POLICY.md). Use `preflight.cjs`, then `impact.cjs` with exact base/head and a reviewed declaration, and pass the generated plan using `run.cjs --impact`. A major integration or explicit release with an impact plan executes every registered release suite. `reports242/runs/<id>/` holds immutable reports/logs/artifacts; latest files are pointers. Exit 2 also represents unavailable/blocked execution. Do not interpret the historical build/module counts or the older Orion limitation below as current results; consult current catalog and source-bound reports. Current policy is a pilot, and branch protection remains disabled.

Run from `/workspace/sites/urban-fracture`. No Node packages are required. Installed Node and Python/Pillow are used. Do not run two QA runner processes simultaneously because evidence paths are shared.

## Routine development

For a scoped change, `--suite id1,id2` runs an explicit subset of either profile. Unknown IDs are rejected. Every omitted suite remains `not-executed` in the report; a selected release run cannot certify the omitted coverage. Example: `node tools/qa242/run.cjs --profile initial --suite source-integrity,qa242-integrity,qa242-release-integrity`. Omit `--suite` for the complete profile. Do not run these processes concurrently.

The current input fingerprint includes production files, all test/helper/QA/design/template sources, root Markdown contracts and package descriptors, and the `reportsNNN/package.json` files used by renderer bootstrap. Installed dependencies/caches are excluded; the runner records Node/platform/architecture separately. It does not claim a complete transitive dependency graph for every historical report or external artifact.

Release checking now recomputes the gate using current suite policy, validates counts and process outcomes, and verifies log hashes. A stored `stable-candidate` summary alone is insufficient. Manual approvals still require a separate reviewed ingestion workflow; editing result rows does not approve screenshots, art, hardware or balance. Current-build native and render registrations supplement older fixtures; they do not certify every retained entry point.

1. Preserve a Git checkpoint before substantial changes.
2. Read `QA242-ARCHITECTURE.md`, the Style Bible, registry and open issues.
3. Run `node tools/qa242/run.cjs --profile initial` after the affected implementation. Read `reports242/LATEST.md` and `latest.json`, not only process exit status. Initial is deliberately incomplete and never certifies a stable release.
4. Add a bad fixture before claiming a new detector works. Then add an adapter that observes real production data; synthetic fixtures alone do not certify gameplay.
5. For major/release work run `node tools/qa242/run.cjs --profile release`. Exit1 is blocked; exit2 means review/incomplete gates; exit0 means automated stable candidate only. Do not label a blocked/incomplete build stable.
6. Preserve logs and exact source fingerprint. Do not claim unexecuted tests passed or count nested assertions as separate suites without measurements.

The test registry orchestrates existing suites; those fixtures have different load boundaries. `current-runtime-certification` separately loads current123-module simulation order and records outermost ownership. A new simulation module before the render boundary is automatically loaded. If that boundary moves, the adapter intentionally fails for review.

## Candidate screenshots

Start managed preview with `sites-preview start /workspace/sites/urban-fracture` and open its returned URL with `/qa242.html`. This separate developer gallery freezes seed242, clock30s, fixed camera, lighting/weather and1920×1080 capture. Wait for READY. Choose a scenario, download candidate PNG and metadata. Keep the same browser/OS/renderer/DPR/font state for comparisons. Do not use full-page UI screenshots as if they were canvas baseline captures.

No gameplay screenshot baseline is approved in this iteration. Comparator fixture tests are only proof that the comparator detects image differences.

An owner-reviewed baseline entry in `qa/system242/baselines.json` must contain `id`, `path`, exact `sha256`, `approvedBy`, `approvedAt`, and `captureMetadata` copied from the reviewed capture. Add it as a reviewed source change; never overwrite the reference image. Save new revisions under new filenames. Pending scenario IDs must remain visible until separately reviewed.

Then run:

```sh
python tools/qa242/compare.py --id casino --candidate /absolute/path/casino-candidate.png --metadata /absolute/path/casino-metadata.json
```

The command refuses unsigned/missing/modified references or changed capture metadata. It compares equal dimensions without resizing and writes a diff plus a result for that explicit pair. It does not certify all scenarios or automatically satisfy the release-wide approved-screenshot gate. Complete gallery integration is the next visual-certification increment. No automatic screenshot regeneration or artistic approval is installed.

## New assets/levels/characters

The initial616-image inventory records retained sources, not artistic approval. New/modified/removed hashes generate findings. Do not rerun `--initialize` to hide changes: it refuses overwrite. Review the asset, update the inventory/certificate through an explicit reviewed commit, and add source-specific tests. Declare depth and purpose rather than resizing to a universal number. Extend opaque-foot adapters to each source family and register move/level suites. Unknown coverage must appear as unexecuted/review, not passed.

## Acceptance checklist

- [ ] Correct checkpoint and exact source fingerprint recorded; test inputs unchanged during run.
- [ ] Launch and required controls tested in the current browser; device simulation distinguished from physical hardware.
- [ ] All affected moves/AI recover and release synchronized interactions correctly.
- [ ] Required waves, boss conditions, GO signs, transitions and offscreen reentry pass.
- [ ] Measured scale/aspect/movement/contact/collision checks pass for affected adapters.
- [ ] Approved screenshot pairs match on pinned renderer; unexplained changes reviewed.
- [ ] Artistic detail/perspective/lighting and combat readability reviewed.
- [ ] No unresolved critical failure or stale test contract remains.
- [ ] Report lists failures, omissions, manual findings and corrections honestly.
- [ ] Previous deployed version and source checkpoint remain recoverable.

A `stable-candidate` decision is never an automatic owner acceptance. Current release certification is expected to remain blocked by the two obsolete Orion test contracts until reviewed and corrected. Publishing QA tooling does not relabel gameplay as stable or waive those issues.

## Rollback

The original runtime source is preserved at `checkpoint-before-qa242` / `7784bd683d851f6719b7c12f0f947720f7fa4ed4`. Inspect safely without touching ongoing work:

```sh
git worktree add /workspace/sites/urban-fracture-qa242-recovery checkpoint-before-qa242
```

For production recovery, select the previously saved Build241 Site version `appgprj_6adb9b94a3788191809a764c3e7bbb37~appgver_ab670c3533588191a64dd876d2d37cb6` and redeploy that saved version with the existing private audience. Do not recreate the Site or change sharing. Verify terminal deployment success. For a source rollback, create a separate recovery branch/worktree, review the diff and push a reversible revert/recovery commit through the source helper; avoid destructive reset of the active project. Retain failed QA evidence outside the runtime deployment.

One known filename rule is available: `node tools/qa242/fix-known.cjs` proposes it; adding `--apply` permits only the exact validated Uptown PNG→WebP loader reference. Unexpected hashes refuse. It never repairs arbitrary filenames, resizes art or updates a screenshot baseline. Record corrections.json and rerun the release profile after any applied repair.

## QA-only pilot acceptance

A declaration with `acceptanceScope: qa-infrastructure-pilot` may change only QA242 tooling, tests, schemas, policy documentation and its workflow. Runtime/game assets, game entities, new content and game-risk flags are rejected against the complete base-to-head diff. Missing/failed/blocked required automated suites remain blockers. Mandatory shared combat, input and render regressions still run. Unselected catalog entries remain Not Tested.

Pilot acceptance is separate from game certification. The registry remains `pilot` and feature certifications remain `partial`; bootstrap review notes, artistic approval, all-moves coverage, physical controller and hardware/performance holds remain visible. A pilot owner comment cannot satisfy `check-release.cjs` or certify gameplay.

The automated job emits an immutable `pilot-evidence.json` and `OWNER-ACCEPTANCE.txt`, with exact repository, PR, base/head commits, source fingerprint, required outcomes, log/artifact hashes, and report digest. Review the run artifact and copy the exact comment from the Actions summary onto that PR using the repository owner's GitHub account. The separate **QA242 pilot owner acceptance** job authenticates owner login and numeric ID through the API; self-review is unnecessary. Latest owner marker comment wins; `REVOKE`, malformed or stale comments block acceptance. Credentials/API failures never approve.

After posting the comment, rerun **failed jobs only** so the owner job reuses the successful automated job's exact immutable artifact. Rerunning all checks produces new evidence requiring a fresh comment. New source/base commits invalidate previous signoff. No workflow posts acceptance for the owner, merges, deploys, or changes branch protection. Read permissions suffice. Game changes continue through the existing full certification path; this owner job fails closed for non-pilot evidence.
