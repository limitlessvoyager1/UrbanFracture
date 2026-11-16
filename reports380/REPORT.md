# Build380 — Ty Sly rebar length

Updated all48 Ty Sly poses with longer rusty rebar, targeting the requested75% increase (1.75× original). Painted, angled sprites are an approximate visual proportion rather than a mathematically uniform pixel stretch. Original Ty Sly source and assets remain preserved under backup377.

The built-in image editor produced the weapon revisions. An initial oversized result and a shorter result were rejected before retaining the final source `source-art/rebar380/enforcer.png`. Original/final generation prompts are retained alongside it. Character identity, pose timing and clothing are retained. Registration preserves every previous frame's body height and foot anchor so the larger weapon does not shrink or reposition the whole character.

Runtime atlas: `dist/assets/rebar380/enforcer.webp`. Updated canonical data in `dist/backup377-data.js` uses384px-wide transparent cells for extra weapon room. `dist/backup-view377.js` now draws each cell at its declared dimensions, preserving actor scale and grip placement. The change also supports the unchanged256px K'marr cells. Existing attack damage, timings and shared AI remain intact.

Checkpoint: `checkpoint-before-rebar380`, Build379 source `d0fb3f717bb7410a7f7262ee7553a41f50d60475`.

Verification: all48 cells registered without output clipping, native weapon-combat regression passed595 assertions, current renderer loaded/drew revised art, and before/after frames were reviewed for idle, locomotion, swing, thrust, prone and injured retreat. Evidence: `atlas-review.png`, `native-comparison.png`, `registration.json`, `render.json`. Package verification checks exact source strings and deployed assets under the existing Downtown cap. Browser and physical-controller testing were not performed for this art change.
