# Permanent QA242 change and acceptance policy

Every change must be tested before acceptance into the owner-designated stable version. This applies to new content, repairs, assets, refactors and changes made by Work, Codex or another contributor. QA242 remains the single authoritative process; its suite catalog, current native loader, renderer adapters, comparator, benchmark tools and repair history are retained.

## Current implementation boundary

This increment implements a **pilot** semantic dependency registry for shared combat admission, fighter rendering and controller input; source-bound impact plans; immutable per-run reports; negative fixtures; authenticated evidence validation; and one PR workflow. It does **not** certify every character, move, level or dependency, establish an approved performance target, approve artwork, or enable branch protection. `features.json` deliberately says `coverage: pilot` and incomplete feature certification remains visible. Main is not automatically designated an approved stable baseline.

The workflow may publish failing or Needs Review results while coverage, asset provenance, owner evidence or historical receipts remain incomplete. That is not a stable-build certification or a waiver. Existing draft repairs must be reviewed in dependency order. No gameplay implementation belongs in this QA-policy setup.

## One change-impact contract

Add a record under `qa/system242/changes/` matching `change.schema.json`. Declare changed/renamed/deleted paths, affected characters, moves, shared systems and levels, feature IDs, new-content registration, visual/performance/hardware risks and issue references. The planner binds the declaration hash to the **actual exact Git base/head** in its generated plan. A declaration does not contain its own future commit hash, avoiding a circular self-reference.

`features.json` is semantic ownership/dependency metadata, not another test catalog. Features reference existing suite IDs in `suites.json`, approved specifications, assets, source owners, visual scenarios and content IDs. The planner compares the real Git diff, verifies declared entities and direct ownership, and follows reverse dependencies. Source paths locate owned modules; path matching alone does not establish behavioral coverage. Unmapped changes, omitted files/entities, unknown dependencies, cycles, undeclared content or missing source-specific tests block acceptance. Pilot/bootstrap metadata also requires review.

The current pilots are conservative and do not infer every feature from a filename or pretend source analysis proves artistic quality. New features need reviewed declarations. Newly created or not-yet-integrated content receives no stable-certification exemption; prototypes remain uncertified on development branches.

## Required gates

| Gate | Required evidence and existing QA242 integration |
|---|---|
| A Build | Source/asset resolution, shipping browser load, critical runtime errors and production script order; current source-integrity/readiness adapters. |
| B Combat | Damage/contact, startup/active/recovery, stun, defense, counters, falls/get-up, grabs/throws, armor/invulnerability, resource costs and AI admission; existing native regressions plus affected move/target matrices. |
| C Animation | Identity, proportions, scale, anchors, intermediate poses, displacement/gait, recovery, sockets and stray-pixel/snapping review; current source/render adapters plus actual phase captures. Numeric durations alone do not certify natural motion. |
| D AI | Legal choices, ranges/positioning/recovery, Director budget, targets and friendly support; existing Director/observer/support suites with explicit dependent features. |
| E Levels | Navigation/branches, doors/transitions, encounters/bosses/GO, collision/civilians and softlocks; affected route/objective scenarios, not force-clear as proof. |
| F Environment | Weather, clock/lighting, foliage/wind, snow, interior/exterior consistency and HUD; affected deterministic temperature/time/scene matrix. |
| G Controls/UI | Keyboard, standard/raw-Sony/DSX/custom synthetic input, buffering, HUD/menus, switching, panel and save/load; physical DualSense reported separately. |
| H Performance | Mean/p95/worst frame time, memory, render and AI overhead, pinned environment/sample counts and comparison with an owner-approved baseline/target. Never remove required frames or mechanics to improve a number. |
| I Visual | Actual source-bound rendered gameplay captures for appearance, animation, movement, combat presentation and layout changes, plus owner artistic acceptance. Comparator fixtures are not gameplay certification. |

All new heroes, enemies, bosses, weapons, levels and major mechanics require registered source-specific tests and rendered scenarios. Unknown coverage is not a pass.

## Execution

Keep the existing `initial` and `release` profiles. A normal PR uses the impact plan plus mandatory shared smoke. Major integration/release candidates use the **full release profile**, including when requested through `qa:major-integration`, `qa:release-candidate` labels or workflow dispatch. Labels can increase coverage, not exempt required checks. Impact-required suites run even when their older catalog profile is release-only; they cannot silently disappear from a targeted initial plan. Explicit `--suite` remains available for development; omissions remain Not Tested and never certify a full release.

```sh
node tools/qa242/preflight.cjs
node tools/qa242/impact.cjs --base BASE_SHA --head HEAD_SHA --change qa/system242/changes/change-id.json --output reports242/impact-plan.json
node tools/qa242/run.cjs --profile initial --impact reports242/impact-plan.json
node tools/qa242/run.cjs --profile release --impact reports242/impact-plan.json
node tools/qa242/check-release.cjs
```

Use exact commit IDs. CI checks out the actual PR head, reads the base registry when available and records bootstrap fallback explicitly. Workflow and policy changes themselves require owner review. The first workflow is not claimed to protect the repository against bypass while required checks/protection remain disabled.

The workflow uses pinned actions/tool dependencies, read-only contents/review permissions, no persistent checkout credentials, no deployment or auto-merge, and failure-preserving artifact upload. Child test commands do not inherit the token used by the parent for authenticated review reads. Major/full profiles can remain blocked on preexisting failures and missing historical evidence. Cancelled/unavailable jobs do not pass.

## Reports and failure policy

Each run writes new files under `reports242/runs/<unique-run-id>/`; previous files are never overwritten by the runner. `latest.json`, `LATEST.md` and `latest-run.json` are replaceable summaries/pointers, not immutable history. A started/aborted run invalidates the latest acceptance pointer until a complete bound report exists. Logs and selected generated artifacts carry hashes. Declared generated artifacts are copied then restored; no production file can be designated a generated report output.

Every report contains base/tested commits, source fingerprint, changed files, affected systems/entities, selection and reasons, commands/environment, Passed/Failed/Blocked/Not Tested/Needs Review rows, raw process outcomes, attribution, visual evidence, performance comparison, remaining risks and recommendation. Legacy statuses are understood only for compatibility; new reports use the five explicit outcome classes.

Missing tools, dependencies, permissions or evidence are Blocked/Not Tested. An assertion failure stays Failed. New versus preexisting attribution requires an authenticated baseline envelope (`--baseline-report` with `report` and an owner-reviewed `baseline-report` certificate), a comparable bound base report, matching commands/environment and matching failure receipt; otherwise it is Unknown. A known-issue label never waives a failure. Failed tests must not be disabled or assertions changed merely for green output.

Recommendations: **Reject** for a required failure, changed inputs or critical finding; **Needs Review** for missing coverage/evidence, dirty inputs, pilot metadata or pending human acceptance; **Approve** only with complete applicable gates and authenticated owner acceptance. No automated result can approve feel, art direction or major balance changes by itself. Release checking recomputes policy and receipts rather than trusting the recommendation label.

## Owner evidence and baselines

`certifications.json` and `performance-baselines.json` start empty/unapproved. No snapshots or baselines are auto-created/updated. A current certificate binds exact tested commit, source fingerprint, feature/scenario scope and artifact SHA-256 values to an authorized owner review. Approval ingestion reads GitHub's authenticated review API and checks review ID, author, APPROVED state, exact commit and a separate line:

```text
QA242-EVIDENCE: <canonical evidence-record digest>
```

The digest excludes the review reference and approval timestamp, which is attached after review. Current approval bundles can be supplied outside source via `--certifications FILE`; the runner copies/hash-binds them into immutable run evidence. This avoids changing the tested commit merely to insert its own approval. Approval lookup without authorized access is Blocked. An edited passed flag or arbitrary reviewer string is insufficient. The owner must have a valid review arrangement, including for owner-authored PRs; unavailable/self-incompatible review paths are not silently bypassed.

Visual evidence must include actual raster captures and all required scenario IDs. Performance evidence includes a measured benchmark JSON matching the signed fields, an approved target hash, environment identity, all six metrics and sample count. Limits are part of the approved target. A missing/unapproved baseline, changed hardware or incomplete metrics is not a performance pass. Owner acceptance remains required for animation quality, gameplay feel, artwork and major balance.

## Defect traceability and stable acceptance

Every confirmed defect references a GitHub issue, reproducible failure, detecting regression where technically possible, approved repair commit, passing retest, permanent suite registration and evidence/acceptance decision. Existing repair logs and issue records remain historical evidence, not automatic current certificates. Do not close visually judged defects based only on unit tests.

Use feature branches and PRs. **Branch protection is not enabled by this implementation.** Required checks and stable-branch designation need separate owner approval and supported GitHub administration/plan capabilities. CI existing in a file is not proof that it has run successfully or that contributors cannot bypass it. Until full coverage and protection are verified, the process remains a reviewed pilot rather than repository-wide operational enforcement.

## QA-only pilot acceptance

A declaration with `acceptanceScope: qa-infrastructure-pilot` may change only QA242 tooling, tests, schemas, policy documentation and its workflow. Runtime/game assets, game entities, new content and game-risk flags are rejected against the complete base-to-head diff. Missing/failed/blocked required automated suites remain blockers. Mandatory shared combat, input and render regressions still run. Unselected catalog entries remain Not Tested.

Pilot acceptance is separate from game certification. The registry remains `pilot` and feature certifications remain `partial`; bootstrap review notes, artistic approval, all-moves coverage, physical controller and hardware/performance holds remain visible. A pilot owner comment cannot satisfy `check-release.cjs` or certify gameplay.

The automated job emits an immutable `pilot-evidence.json` and `OWNER-ACCEPTANCE.txt`, with exact repository, PR, base/head commits, source fingerprint, required outcomes, log/artifact hashes, and report digest. Review the run artifact and copy the exact comment from the Actions summary onto that PR using the repository owner's GitHub account. The separate **QA242 pilot owner acceptance** job authenticates owner login and numeric ID through the API; self-review is unnecessary. Latest owner marker comment wins; `REVOKE`, malformed or stale comments block acceptance. Credentials/API failures never approve.

After posting the comment, rerun **failed jobs only** so the owner job reuses the successful automated job's exact immutable artifact. Rerunning all checks produces new evidence requiring a fresh comment. New source/base commits invalidate previous signoff. No workflow posts acceptance for the owner, merges, deploys, or changes branch protection. Read permissions suffice. Game changes continue through the existing full certification path; this owner job fails closed for non-pilot evidence.
