Grounded-pose cache validity / UF-RENDER-025

Only dist/sprites.js cache generation/key and its index cache token change.
Native actor clocks, data, draw dispatch, crop/sole anchors and AI are preserved.

Git-free current-runtime regression (pinned fighter-render dependencies required):
  node --expose-gc tests/grounded-pose-cache.cjs
  node tools/grounded-cache/negative.cjs
The first uses a private source-buffer export to observe the actual native cache;
original renderer functions execute. It does not import executable old suites or
look up historical commits. Negatives remove time/flash validity or quantize cache
time in child-process read buffers only. All must be detected by pixel assertions.
Actor render copies mirror native drawActor; existing cosmetic diagnostic writes
on the copy are permitted, all original actor fields must be unchanged.

Relevant existing checks / regenerate current Node references:
  node tools/fighter-render/verify.cjs behavior
  node tools/fighter-render/verify.cjs render
  node tools/fighter-render/browser.cjs
The last uses fresh per-family Chromium contexts. Do not substitute it for the
persistent mixed-family regression below.

Rendered histories, persistent mixed comparison, full-scene performance:
Set UF_CHROMIUM_EXECUTABLE to pinned Chromium143.0.7499.4 headless-shell.
  node tools/grounded-cache/browser.cjs
  node tools/grounded-cache/browser.cjs matrix
  node tools/grounded-cache/browser.cjs performance
  node tools/grounded-cache/preservation.cjs
  node tools/grounded-cache/verify.cjs
Requires localhost access and successful current source-fingerprint Node receipts
from the existing render verifier. Original shipping index is served, RAF startup
suppressed for controlled history. Primary comparisons use original drawActor with
fresh cold references. All five families then run on ONE persistent page without
cache clears or family resets. Fixtures retain their native deterministic inputs.

Performance uses native full draw (world/HUD/weather), seeded/reset original game,
1/4/8 enemy actors plus hero, identical and mixed rosters, 180 measured frames after
30 warm-up per condition. Baseline source is a literal reversal of this tiny repair
with SHA256 checked against the audited shipping source; HTTP response only, no
historical Git lookup or disk mutation. Current side serves original repaired
shipping bytes. Physics is matched at equal ticks; drawing cannot advance physics.
Headless CPU-wall and optional JS heap samples are not physical-GPU/campaign or
60-FPS certification. GC/heap samples are noisy; inspect report limits explicitly.
Matrix is the corrected 1/4/8 visible-enemy fixture; performance repeats mixed-eight
in repair/baseline/baseline/repair order. Camera is held after native ticks in the
fixture only, with every enemy root asserted inside the viewport. Original
browser.json performance and exploratory-camera-drift captures are exploratory:
camera follow moved some earlier nominal-roster actors offscreen. Use the corrected
matrix and confirmation for performance conclusions. Verify returns1 if confirmed
repair p95 exceeds a 16.667ms frame budget, even with all functional checks passed.
Do not promote this repair on functional pixel success alone.

Existing strict historical gates remain UNAVAILABLE when receipts are absent.
These tools never convert unavailable source proof into a preservation pass.
Missing renderer/browser prerequisites must remain nonpassing; outputs and source
fingerprints document the source actually exercised. No downloaded artwork or
animation retiming is part of this correction.
