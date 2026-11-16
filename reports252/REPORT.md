# Playtest252 · Nightshade Gate1 repair

Checkpoint: `checkpoint-before-nightshade-repair252` at `0c130207890c31a93078984c0685ca49ff4d415a`.

- Initial:43 suites passed,0failed. Five release-only suites andfive manual gates not executed in initial.
- Release:48 suites passed,0failed. Five manual gates remain open.
- Both accepted profiles used unchanged inputs and the same source fingerprint.
- New coverage: disconnected-pixel bad fixture;28 connected art silhouettes;8walk/8run phases; fixed native-resolution scales; ground anchors; three-stage get-up; slight Marcus/Kevin height advantage; actual-distance gait at30/60/120Hz; visible accepted/lockedR2 and pending combat-button feedback.
- Browser observed: same-plane scale comparison, walk/run cycle stepping, get-up without detached pixels, return to idle, visibleUnique confirmation. Evidence: `browser-repair.jpg`.
- No physical controller connected in the browser environment; simulatedstandard/rawSony/DSX controls passed. PhysicalDualSense, owner art approval, approved screenshot baselines, all-moves completeness andhuman balance are not certified.
- New artwork is a review candidate. No approved screenshot baseline was replaced.
- Gate2 handgun/HUD andGate3 ammo economy remain unimplemented; this build repairsGate1 only. R2 now visibly acknowledges input and does not yet shoot.
- Complete audit, file integration, art source paths, prompt brief, test commands, limitations and rollback: `IMPLEMENTATION.md`.
- Retired assets: `asset-migration.json`; visible-lossless storage proof: `lossless-repack.json`.
