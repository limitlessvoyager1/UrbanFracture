# Reina — bright blue and movement adjustment (Build291)

Checkpoint: `checkpoint-before-reina291`, commit `5aa43144a0eb9e485e60511cbb43643033a7ab2d`.

Changes: Reina's configured walking speed increases185→194.25 world units/s, and running265→278.25 (+5% each). Existing displacement-driven gait clocks remain in control. Air movement, combat timing and damage are unchanged. The dress's navy palette maps to the supplied bright blue #0095FD, retaining shadow/highlight variations and neutral embroidery. Cached source-image recoloring preserves source dimensions and all draw/grip coordinates; enemy rendering unwraps the Reina-only context. Original bitmap assets are unchanged.

Executed and passed:
- Native half-second movement probes in both directions:194.25 walk and278.25 run.
- Palette and actual-render checks: idle, walking, running, charge, combo and knockdown. Skin/neutral silver/transparent sample pixels remain unchanged. Three control enemy renders remain byte-identical. Native canvas sampling changes a handful of antialiased edge pixels; recorded silhouette-mask differences are <=12 pixels and no draw dimensions/anchors change.
- stats266:295 assertions; review282 runtime720; review282 view721; reina278:3621 assertions.
- stadium240-controller: actual keyboard and simulated standard/rawSony/DSX inputs, attack buffers, grapples, commands and route handling passed. No physical controller test.
- Browser launch and live level: Reina's new blue costume visibly renders in character selection and combat; other enemies retain their original colors.
- Node syntax and git whitespace checks passed.

Packaging: the existing deployment is near its256MiB expanded-archive ceiling. game.js is compacted with canonical AST equivalence and test-referenced binding preservation; its readable source is retained in source-archive/build291. Existing controller tests passed after compaction. No image quality is reduced. Expanded package:268431360 bytes (limit268435456).

Not executed: a fresh full142-suite release profile, every animation/weapon permutation, physical DualSense, owner art approval. The prior Build290 report is historical and is not presented as a fresh Build291 full-profile pass. This minor update is ready for playtesting, not a new stable-build certification.

Files: dist/broxton.js, dist/reina291.js, dist/index.html, semantics-preserving dist/game.js packaging, tests/stats266.cjs (removes the obsolete fixed185 expectation in favor of the current approved registry), tools/reina291/check.cjs, readable game source and reports291 evidence.

Rollback: restore the checkpoint commit/saved Build290 version. Keep build rollback separate from resetting practice overrides.
