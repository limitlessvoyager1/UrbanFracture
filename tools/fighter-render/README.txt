CURRENT FIGHTER RENDER TESTS - A3-R01

Scope
The shared test renderer now follows an explicit reviewed manifest in shipping
index order. It loads all current fighter draw owners and their authored data,
including mixed scene/fighter files needed by the dispatcher. It does not run
general scene/UI controllers or replace gameplay rendering/source artwork.
The old tools/reactions290/render.cjs remains a compatible entry point.
Style310/Recording312/Recording313 facade loaders skip already loaded modules.

Install (development only)
Use Node22 or later; Node22.21.0/win32-x64 was verified for this repair.
From tools/fighter-render, run:
  npm ci --ignore-scripts --include=dev
The lockfile pins @napi-rs/canvas1.1.1 and Playwright1.57.0. Native platform
bindings are optional npm packages selected by the lockfile/platform. No install
script or production dependency is required. Do not ship node_modules in dist.
Canvas upstream: https://github.com/Brooooooklyn/canvas
Playwright upstream: https://github.com/microsoft/playwright

For browser tests, from tools/fighter-render run:
  npx playwright install chromium
Alternatively set UF_CHROMIUM_EXECUTABLE to a compatible Chromium executable.
This repair used the existing Chromium headless-shell143.0.7499.4/revision1200.
The browser executable path is an environment setting, not a repository constant.

Commands (repository root)
  node tools/fighter-render/prerequisites.cjs
  node tests/fighter-render-prerequisites.cjs
  node --expose-gc tests/fighter-render-bootstrap.cjs
  node tools/fighter-render/verify.cjs behavior
  node tools/fighter-render/verify.cjs render
  node tools/fighter-render/browser.cjs

The render verifier runs five isolated family processes and the original shared
grapple view suite, which retains its existing powerbomb facing isolation.
For a single family use:
  node --expose-gc tests/fighter-grapple-render.cjs forest
Valid families: forest, niko, broxton, nightshade, shared.
The captures verifier mode regenerates family captures/bootstrap checks without
repeating the original shared view suite. Browser verification needs successful
current family receipts with matching source fingerprints; stale/running/failed
captures cannot pass. Native game-canvas snapshots supplement dispatcher tests.

Missing package/native binding/browser/asset/readiness -> explicit unavailable
and nonzero exit (normally2). Wrong pin/API/bootstrap or assertion -> failed,
nonzero exit. A nonpassing prerequisite never certifies rendered gameplay.
Nine new critical QA entries retain every existing profile/gate, including
strict historical receipt gates. No historical source proof is synthesized.

Coverage and limits
Current fixtures: six Forest/Gunner pairs, seven Niko pairs, three Broxton179
pairs and finite-duration human shield, Nightshade rear launch with generic and
Kevin victims, and shared Reina reap/German/enemy powerbomb variants. Both
facings, ten sampled native ticks per case. Isolated fixtures disable ambient
AI and use explicit target HP; native damage/clocks/configuration remain intact.
Each draw checks physical state and gameplay event counts. The bootstrap checks
native Brawler descriptors and selected approved combat configuration.
Comparison fixtures seed both Math and the native Environment156 stream and fix
the native target/hero tactic field to rush, with AI disabled. This aligns legal
pose inputs without forcing injury results, capping bonuses or changing damage.
Browser comparisons use a fresh context per family, matching Node isolation.

The diagnostic surface is1600x900 with logical plane at600 to retain complete
paired poses; it is not a new game viewport. Its fighter-root/copy contract follows
game.js. World/HUD/weather composition is checked in the actual game canvas.
Generic-thug Nightshade flight uses the existing shipping fallback; dedicated
Review287 flight artwork currently exists for Kevin/Sato, not every archetype.
Only Kevin/generic-thug were exercised by the new Nightshade render fixtures.
Cross-backend tolerances are <=3pixels bounds difference and >=0.96 alpha-mask
intersection-over-union. Physical sampled outcomes match within1e-6. These do
not weaken the original shared-grapple pixel/sole/duplicate-body assertions.
No full campaign, physical controller, all-archetype/artistic certification.
The earlier mixed-family browser trial exposed two generic ready-pose differences
despite matching primitive physical fields; matching family isolation removes
them. Cache-history sensitivity remains a separate audit candidate, not a fixed
shipping defect. Native Niko reverse samples also retain visible texture seams;
this repair does not change that authored projection or certify its art quality.
Legacy capture tools that manually replay modules or label historical before/
after baselines are not certified historical renderers by this current bootstrap.

Offline install author check
  node tools/fighter-render/portability.cjs
Uses a fresh repository-free work directory, cached npm packages and no network.
Provide UF_NPM_CLI if npm-cli.js is not alongside the Node executable. The cache
must already contain the pinned platform packages. It tests package absence,
clean locked install, and missing artwork remaining unavailable, without Git.
