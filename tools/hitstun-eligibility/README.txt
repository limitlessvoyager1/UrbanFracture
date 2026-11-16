Hitstun eligibility repair verification

Normal regression (no Git history or third-party modules required):
  node tests/hitstun-eligibility.cjs

Optional review comparisons (require the recorded starting commit):
  node tools/hitstun-eligibility/compare.cjs
  node tools/hitstun-eligibility/render.cjs

Set UF_GIT to a Git executable if Git is not on PATH. Both tools compare against the real starting commit 3ee2b86e37f581bb0087d108293fb2cc6eadc586, not the unavailable historical reaction receipt commit.

Rendering additionally requires a separately installed Playwright package/Chromium; UF_PLAYWRIGHT_MODULE can specify the package path and PLAYWRIGHT_BROWSERS_PATH its browser cache. These are optional verification dependencies, not new game/runtime dependencies. The game is served from dist on a temporary local HTTP port. Baseline rendering intercepts only reactions298.js with its recorded baseline bytes; the repaired run uses current source. No production file is swapped or rewritten by these tools.

The render checks use native hero contact and the production Canvas2D/sprite renderer. Whole-game crops and isolated native-body images are saved. An idle-start attempt at a fixed simulation time must leave recoil pixels and HP/stun/deadlines unchanged in the repaired run; after stun, normal idle starts must work. Browser evidence is a controlled eight-family fixture, not full campaign/art/hardware certification.

compare.cjs verifies damage/timer trajectories and eight native move definitions against baseline. It also records 64 unchanged knockdown admissions, including 24 known unresolved direct-start failures. That parity comparison preserves scope; those knockdown failures are not claimed to be fixed or passing desired gameplay contracts.
