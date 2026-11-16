# Urban Fracture QA architecture — Build242

## Current policy extension

[QA242-POLICY.md](QA242-POLICY.md) is the authoritative change/acceptance contract. This document's Build242 counts and environment descriptions below are historical, not current inventory. The existing suite catalog, native/render adapters and comparator remain the foundation. `features.json` and the impact planner add reviewed semantic ownership and reverse dependencies; they do not replace the catalog or prove full coverage. The initial pilots cover shared admission, fighter rendering and controls only. Immutable run evidence, explicit result classes, owner review ingestion and read-only PR automation extend the same runner. An empty baseline registry, unperformed human checks, unknown coverage and missing historical evidence remain blockers. No gameplay rewrite or branch-protection activation is included.

Checkpoint: `checkpoint-before-qa242`, production source `7784bd683d851f6719b7c12f0f947720f7fa4ed4`. No game controller, character, asset or level has been rebuilt or resized by this task.

## Audit of operational infrastructure

The project is a buildless browser game: JavaScript IIFEs, Canvas2D renderer, one HTML production load order, native Brawler simulation and layer-specific extensions. Git and Sites provide source history and private deployment rollback. Node24.22.1 and Pillow13.0.0 are installed. No package manifest, Playwright test dependency or CI configuration was found.326 test files existed before this work; their presence is not proof of current full-load-order coverage.

| Framework | Existing state confirmed | Current validation / gaps |
|---|---|---|
| Combat regression | Extensive Node assert/VM suites; action/contact telemetry135/169 | Selected suites executed in reports242. Security216/current216 retain obsolete Orion-no-counter expectations; not silently waived. Older fixtures stop at earlier load boundaries. |
| AI behavior | Director148 budgets and222 admission; many mixed-enemy tests | Representative existing tests available; no complete per-enemy behavioral matrix. |
| Level integrity | Native222/223 arenas; per-level route/transition tests | Casino/lab/Prison/Subway/Stadium tests can be registered; not proof every campaign branch is covered. |
| Environment simulation |156/162/217/218 global simulation, replay seeds, integration tests | Existing weather/indoor/controller tests reused. Art response varies by prepared asset. |
| Controller reliability | Standard/raw Sony/DSX synthetic tests; native UI | Simulations run; physical hardware remains untested. |
| Combat balance | tools/balance169 and Gunner173 scripted-policy reports | Partial, old baselines and limited policies; human fairness is not automated certification. |
| Build/rollback | Git checkpoints, source helper, immutable Sites versions | Reusable fail-closed gate/report added; not a hosted CI service and cannot prevent someone bypassing the documented command. |
| Bug tracking | Scattered Markdown/report history | Initial structured issue registry242 added, with evidence and no failure waivers; no external tracker. |
| Deterministic replay | Environment save/reproduction and per-test seeded Math | Partial.242 adds fresh current-order VM, fixed clock/RNG and two-run entrance trace equality. Not a full input-record/save-state replay engine. |
| Cross-system | Prison224 aggregate plus grab/arena/controller/environment tests | Existing coverage reused, explicit suite results; not all possible combinations. |
| Asset/animation certification | Individual sprite imports/grounding/run tests | **First framework implemented now:** reusable validators,616-image retained inventory, Forest opaque-contact adapter, seeded runtime probes, deliberately failing fixtures and developer candidate gallery. Wider rendered-foot and attachment coverage pending. |

## Incremental roadmap

Only asset/animation certification is the new validation framework implemented in this iteration. The runner orchestrates existing tests; it does not replace their systems. Progress in order and keep each gate independently demonstrable.

| Order | Framework | Gate before expanding |
|---|---|---|
|1 current | Asset/animation certification | Negative fixtures must detect distortion, suspicious scale, floating, gliding, foot-slide, invalid phases and detached attachments; actual assets/runtime adapters pass; coverage omissions explicit. |
|2 | Combat regression modernization | Replace obsolete assertions against current move specifications; enumerate all six heroes' required moves and exits; verify contact/recovery mutations fail. |
|3 | AI behavior | Per-enemy factory/admission/recovery/entry scenarios; poisoned AI and denied-admission mutations detected. |
|4 | Level integrity | Config-driven route graph, each mandatory wave/GO/boss/branch, reentry and offscreen blockers; no force-clear as proof of combat fairness. |
|5 | Environmental simulation | Registry matrix across time, indoor/outdoor, freezing thresholds, storm scheduling, HUD state and camera transitions. |
|6 | Controller reliability | Current-order device matrix, buffer acceptance/rejection reasons, hardware procedure and evidence. |
|7 | Balance experiments | Seeded policies, distributions and pressure/actionability metrics; human Normal-difficulty acceptance remains separate. |
|8 | Build/rollback automation | Integrate release runner in hosted CI when a CI environment exists; retain previous deployment on critical failure. |
|9 | Bug tracking | Expand issue state/evidence/retest links; no suppression through a known-issue label. |
|10 | Deterministic gameplay replay | Record native inputs/RNG/clock/settings, replay all hero actions and compare state hashes across frame rates. |
|11 | Cross-system matrix | Pairwise grabs/weather/arena/Gunner/projectile/status combinations after component contracts are current. |

## Compatible tools

Use installed Node's built-in `node:test`, existing `assert`/VM fixtures, and Pillow for image metadata/opaque-alpha/contact/pixel comparisons. No dependency installation or engine migration is necessary. Node runner documentation: https://nodejs.org/api/test.html .

Playwright Test is compatible with the browser game and offers screenshot assertions (https://playwright.dev/docs/test-snapshots). It is not installed here and no independent browser automation was introduced. In this Work environment, browser checks use the supported browser tool and managed preview. A future ordinary CI environment may adopt Playwright after dependencies/renderer are pinned. Never auto-update snapshots in release checks. Godot frameworks are inapplicable to this engine.

## Architecture and extension points

- `qa/system242/standards.json`: category ratios, depth policy, explicit no-redesign/no-autoapproval rules.
- `qa/system242/asset-inventory.json`: source hashes/dimensions for every retained image; initial inventory is **not**616 artistic certificates.
- `tools/qa242/validators.cjs`: pure measurement predicates. They accept evidence, never modify game state or artwork.
- `tools/qa242/assets.py`: detects changed/new/removed images and measures actual opaque run contacts.
- `tools/qa242/runtime.cjs`:123 current production simulation modules, outermost method ownership, deterministic seed/clock. It fails if its explicit simulation boundary disappears. Rendering modules are not simulated as if a real browser.
- `tests/qa242-*`: representative bad/good fixtures, real source and current native entrance probes.
- `tools/qa242/run.cjs`: bounded child-process execution, logs, exact suites/not-run results, source fingerprint, issues, checkpoint and acceptance decision.
- `tools/qa242/compare.py`: read-only same-geometry pixel comparison; refuses unknown/unsigned/changed baselines and mismatched capture metadata. No baseline-writing command.
- `dist/qa242.html`: separate developer-only frozen gallery; seeded scene, fixed1920×1080 canvas, clock/weather/camera; downloadable candidate PNG and metadata. Not linked in ordinary player menus, not an authentication boundary.

Future characters and levels add adapters/certificates and suite registrations. Merely adding an asset or controller does not certify it. New/modified image hashes create a review finding; intentional perspective must be explained and reviewed. The initial source-inventory file is write-once through `--initialize`; manual changes require review.

## Detection boundaries

Numeric checks catch reproducible geometry/state defects, not all artistic problems. A shadow/ground coordinate alone cannot prove the rendered feet are grounded. The first actual opaque-pixel foot checks cover Forest contact frames0,1,4,5; other figures need pixel-aware adapters or approved screenshots. Runtime movement probes cover8 enemy entries and6 heroes' basic movement, not every move. Ground/attachment/attack validators currently have representative negative fixtures, not automatic coverage of every render call. Style, perspective intent, all NPC proportions and rich16-bit detail require human review against the Style Bible.

Screenshot comparator tests use generated fixture pixels to prove detection. They are **not** gameplay screenshot regression results. Historical screenshots have no explicit approval registry; current scene comparisons remain not executed until reviewed references exist. Pixel agreement also cannot prove good art: it only detects changes.

## Automatic correction policy

No automatic artistic corrections or combat edits were applied. One validated filename metadata repair was applied after a browser resource failure; its exact source/asset hashes and lossless-equivalence evidence are recorded. All other findings remain evidence plus proposals. A future low-risk repair must name an exact metadata field, expected prior source hash, known replacement value, post-check and reversible patch; any unexpected input must stop for review. Baselines, characters and scenery are never silently redesigned or refreshed.

### Additional measured scene coverage

`qa242-scenes.cjs` reads native stadium spectator metadata with real image dimensions and extracts the current casino renderer height. Smaller fans are conservatively flagged when no explicit perspective certificate is present; these are review findings, not confirmed art defects. The validator never silently assigns a depth exemption to make a measurement pass. Source adapter changes fail rather than falling back to an old hardcoded value.

### Validated low-risk correction added after browser detection

The browser readiness probe found a real stale `uptown-traffic113.png` reference. The existing WebP was compared with the archived original PNG at `36c9a07^`:2048×768, identical RGBA and alpha. A single opt-in guarded rule (`known-repair.json`, `fix-known.cjs --apply`) corrects only that filename expression. Exact loader-before/after and asset hashes are required; mismatch refuses, repeat application is idempotent. No image pixels, geometry or combat were changed. `reports242/corrections.json` records the applied repair. All other artistic/gameplay changes still require review.

## QA-only pilot acceptance

A declaration with `acceptanceScope: qa-infrastructure-pilot` may change only QA242 tooling, tests, schemas, policy documentation and its workflow. Runtime/game assets, game entities, new content and game-risk flags are rejected against the complete base-to-head diff. Missing/failed/blocked required automated suites remain blockers. Mandatory shared combat, input and render regressions still run. Unselected catalog entries remain Not Tested.

Pilot acceptance is separate from game certification. The registry remains `pilot` and feature certifications remain `partial`; bootstrap review notes, artistic approval, all-moves coverage, physical controller and hardware/performance holds remain visible. A pilot owner comment cannot satisfy `check-release.cjs` or certify gameplay.

The automated job emits an immutable `pilot-evidence.json` and `OWNER-ACCEPTANCE.txt`, with exact repository, PR, base/head commits, source fingerprint, required outcomes, log/artifact hashes, and report digest. Review the run artifact and copy the exact comment from the Actions summary onto that PR using the repository owner's GitHub account. The separate **QA242 pilot owner acceptance** job authenticates owner login and numeric ID through the API; self-review is unnecessary. Latest owner marker comment wins; `REVOKE`, malformed or stale comments block acceptance. Credentials/API failures never approve.

After posting the comment, rerun **failed jobs only** so the owner job reuses the successful automated job's exact immutable artifact. Rerunning all checks produces new evidence requiring a fresh comment. New source/base commits invalidate previous signoff. No workflow posts acceptance for the owner, merges, deploys, or changes branch protection. Read permissions suffice. Game changes continue through the existing full certification path; this owner job fails closed for non-pilot evidence.
