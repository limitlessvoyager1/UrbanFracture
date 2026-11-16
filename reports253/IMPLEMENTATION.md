# Nightshade size and clarity · Playtest253

Checkpoint: `checkpoint-before-nightshade-size253` → `08d01f42943080b8e3c824309f6c7a5b74d978b3` (Playtest252).

The latest user request supersedes252's size target. Nightshade now has131logical-pixel idle height rather than123, a uniform6.5% increase. The same fixed multiplier applies to all existing pose dimensions and foot/waist anchors; there is no per-animation resizing. Her proportions, eight-frame walk/run cycles and clean recovery silhouettes are preserved.

Clarity is improved in the existing renderer by using high-quality canvas sampling when reducing the original335–416px artwork. When magnifying, sampling remains pixel-preserving. This replaces jagged nearest-neighbor reduction without adding blur filters, inventing extra resolution or repainting approved costume details. Canvas state is saved/restored so other heroes, scenery and HUD are unaffected. Original full-resolution image files are unchanged.

Integration: `nightshade-art252.js` presentation metadata; existing `nightshade-view251.js` renderer; importer preserves the same factor; index cache versions/header and inspector label updated. Collision, movement speeds, AI, gameplay inputs and later-gate combat remain unchanged.

Checks:253 explicitly verifies131height,6.5% fixed scaling, correct downsample/magnification modes, aspect/sole preservation and sampling-state isolation. Existing252 art/view/gait and251 input/foundation checks remain applicable, with the relative-size assertion updated to the user's latest target. Frozen initial/release reports are saved separately after completion. New rendering is a review candidate, not an automatically approved screenshot baseline. PhysicalDualSense and human artistic/balance acceptance remain unverified.

Rollback: retained Playtest252 version or isolated checkout at the checkpoint. No old artwork was deleted or overwritten.
