# Build277 art provenance

Built-in image generation, with the approved Flint-v1 atlas and Nightshade foundation appearance as references. Source PNGs retained in art-source277. Flint prompt requested two right-facing full-body armed guards, matching orange coveralls/proportions, one raised fist for long weapons and a forward fist for knives, no drawn weapon. Nightshade prompt requested six distinct crouch/seated tuck/curled/inverted shoulder-roll/bracing/recovery poses, same teal/ivory/gold costume and fixed source scale.

First dodge output had a pale translucent matte. A second built-in background-extraction edit preserved the poses while clearing the background. The importer thresholds alpha at200, drops only detached small components, preserves source aspect, resamples once at a fixed scale per source, normalizes alpha to0/255 and writes eight new WebPs. Existing approved guard/landing poses provide the standing transitions without duplicate assets. No frame-specific scale fitting or whole-body rotation substitutes for the new dodge phases.

Reproduce with `python tools/import-277.py`. Metadata and source-derived dimensions in import.json. New assets total26876bytes. The original Flint atlas was measured during storage investigation but is byte-identical in the delivered build; no exploratory recompression was applied. Retired263 arc sprites are byte-identical source archives and remain recoverable in prior Git commits.

Art is a playtest candidate; no automatic screenshot or artistic-baseline approval.
