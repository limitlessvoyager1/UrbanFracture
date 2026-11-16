UF-RENDER-027 — bounded exact-size cropped-canvas reuse

Only inactive private crop canvases are pooled, max32 and4MiB RGBA-accounted bytes.
Active entries are deleted before retirement; exact-size borrow removes ownership
and clears the full canvas. Oldest inactive size buckets supply eviction at caps,
so unused old-roster sizes cannot permanently starve new sizes. Empty buckets are
deleted. Oversized surfaces are dropped. Original same-time>512cache eviction is
unchanged and does not recycle its evictions. No actor/game objects stored.

Native rasterization, full readback, sole/bounds scans, crop/anchor/scale and
time/flash identity are unchanged. The production index changes only cache token.
The literal source-reversal baseline is exactly audited UF-RENDER-025 SHA256,
not a fabricated old Git receipt. Regression/control execution requires no Git.
Historical receipt adapters and strict unavailable gates remain unchanged.

Runtime/negatives (pinned fighter-render Canvas prerequisites required):
  node --expose-gc tests/grounded-crop-surfaces.cjs
  node --expose-gc tests/grounded-pose-cache.cjs
  node tools/grounded-surfaces/negative.cjs
  node tools/grounded-cache/negative.cjs
Negative mutations are child-process read buffers only. A private export exposes
actual native functions/cache/pool for tests; shipping exports are unchanged.

Existing regressions and current capture receipts:
  node tools/fighter-render/verify.cjs behavior
  node tools/fighter-render/verify.cjs render
  node tools/fighter-render/browser.cjs
If entries time out, retain raw initial reports and rerun only those entries:
  node tools/grounded-surfaces/recheck.cjs
Do not run that tool while the original verifier is still writing its report.

Shipping browser (set UF_CHROMIUM_EXECUTABLE to pinned Chromium143.0.7499.4):
  node tools/grounded-surfaces/browser.cjs pixels
  node tools/grounded-surfaces/browser.cjs matrix
  node tools/grounded-surfaces/browser.cjs performance
  node tools/grounded-surfaces/browser.cjs allocation
  node tools/grounded-surfaces/browser.cjs lifetime
Or run matrix/ABBA/counters/lifetime in bounded serial processes with clean exits:
  node tools/grounded-surfaces/run-browser.cjs matrix performance allocation lifetime
Run benchmarks serially with no other heavy tests. Matrix: baseline then candidate,
1/4/8visible enemies+hero, same/mixed/synthetic-changing rosters. Performance:
candidate/baseline/baseline/candidate blocks for8mixed/changing enemies. Both use
30warm-up and360measured native draws, exact native ticks, held fixture camera,
seeded environment and viewport/physical invariants. Changing flags are synthetic
graphic-state stress after native ticks, not contact-frequency or campaign proof.
Counter mode is a separate observed page; uninstrumented timings do not include
that observer. CDP heap snapshots are not total GPU/native memory certification.

Pixel mode compares480current native samples between two persistent shipping pages,
with original025control source served in memory and no cache/family clears. Exact
PNG or decoded RGBA and native state/bounds equality are required. Identical PNG
blobs are stored once with both hashes. Prior fresh-family renderer comparisons
retain their original cross-backend tolerances as a separate check.

Verification/preservation:
  node tools/grounded-surfaces/preservation.cjs
  node tools/grounded-surfaces/verify.cjs
Report any performance acceptance hold separately from functional-suite results.
The final verifier exits1 for the retained frame-budget hold, even when all15
functional/evidence checks pass. Static mixed mean gain is not established; the
measured allocation reduction is a separate result. Initial timeout/host-crash
records are retained and final isolated clean exits are required.
Do not infer full60FPS, hardware, controller/campaign or release certification.
