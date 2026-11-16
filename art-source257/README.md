# Nightshade Gate4 artwork

New combat-only art referenced the approved Nightshade appearance: dark tied-up hair, deep teal/ivory fitted outfit with gold piping and lily motif, charcoal pants, black boots and gloves. Existing144logical body presentation and approved foundation/gait assets remain unchanged.

- `melee.png`:4×4 transparent pose sheet; first14cells used for baton startup/contact, wrist laser, flying kick/landing and three aerial attacks. Final2unused cells were not suitable pen poses and were excluded.
- `grab.png`:4×2 transparent corrected grab sheet: reaching/holding, two bent-knee contacts, hand taser, front kick and recovery. A rejected initial white-background/straight-leg attempt is not imported.
- `pen.png`:two transparent poses holding an actual silver pen, not a pistol. Only this sheet supplies the Dart Pen visual.

Import with `python tools/import-nightshade257.py`. The importer extracts the main opaque body per cell, uses one fixed scale per sheet, derives body root/ground anchors and snaps authored limb/contact anchors to opaque pixels. It writes24WebPframes, metadata and the import report. Original PNG sources are retained here for review and correction. Pixel dimensions are not an artistic approval; approved screenshot baselines remain untouched.

`retired-runtime/downtown-extension-v1.webp` is the byte-identical original of an unused preload. It is retained for rollback; see reports257/asset-migration.json. No approved visible Downtown art was removed.
