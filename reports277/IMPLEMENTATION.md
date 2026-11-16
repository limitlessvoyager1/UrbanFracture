# Build277 — Flint weapon rig and Nightshade grounded rolls

Recovery checkpoint `checkpoint-before-flint277`, immutable source commit `793905d83012bee9648aeb2f05982f1a2b646782` (Build276). Existing combat, inventory, Director and paired-grapple controllers retained.

## Recording audit

Reviewed all17.53seconds of the supplied133152 recording at2frames/second and inspected the native pose/weapon code. Flint's weapon length was recomputed from each pose's horizontal hand coordinate, making it telescope as his hands moved. Generic idle grip metadata did not match the actual fist. Recovery reused an upright pose; the old opening was base recovery +120frames, below3seconds for many weapons. Body poses already represented windup/contact/follow-through but had no continuous waist contribution.

Nightshade's rear roll authored its own paired placement, then the older paired-motion tick overwrote the landing with a generic90-degree body and12-unit vertical offset. Earlier support calculations also used unrounded sprite coordinates, ignored translucent edge pixels and omitted the bank zoom. Her dodge consisted of rotating one curled bitmap,112unit travel and30frames total.

## Repairs

- Flint: calibrate actual fist points on existing full-body poses. Fixed weapon length per type throughout windup, contact and follow-through. Physical hand/tip path and renderer use the same sample. A small continuous waist twist affects upper body and grip together; legs remain planted. The weapon renders completely, with only an8unit fist patch covering the grip.
- New distinct armed-ready bodies: long weapons raised beside the shoulder in one hand; knife held forward in a ready guard. Native walking and unarmed poses retained. Existing Flint atlas bytes unchanged; no recolor/recompression or anatomy scaling.
- Flint vulnerable/tired phase: exactly180frames (3seconds) after the final strike's follow-through, both wild and power moves, every weapon. Crouched tired body, no guard/armor/movement/new attack. Native interruption and shared Director admission remain in force. Existing damage, hit count, active/startup/follow-through and weapon eligibility preserved.
- Nightshade rear-away roll: active authored roll owns its paired state; generic landing defers only while that exact roll action owns the victim. At impact, use a single grounded prone pose at the logical plane, zero pivot/rotation and no crossfade between conflicting transforms. Existing held-body support now follows actual drawFrame rounding/edge pixels with cached per-frame/per-scale bounds, bank zoom included. Damage8+24 and the slow elbow finish unchanged. Cleanup still native119/223/258.
- Nightshade dodge: six new whole-body poses plus established guard/landing transitions. Crouch → seated tuck → ball → shoulder roll → bracing squat → recovery. No instant rotated standing/ball sprite. Travel145units backward (formerly112), smoothly over frames3–22, still30frames total, same25defense cost,2second cooldown and4–17invulnerability. Ground plane and sprite scale unchanged.

## Artwork / storage

See GENERATION.md and import.json. Eight new transparent native-resolution assets. Three arc-only sprites superseded by Build276 were moved byte-for-byte to art-source277/retired-arc263; their unused data slots reference an existing recovery pose so no preload path dangles. The active blitz uses blitz276, not those retired slots. No currently executing animation was removed. Existing Flint and other production artwork remains unchanged. This avoids compressing unrelated art to satisfy the268435456byte expanded hosting cap.

## Validation

Run `node tools/qa242/run.cjs --profile release`. New `tests/repair277.cjs` reproduces old telescoping and landing overwrite from the immutable checkpoint, then checks native commitments, constant paths,180frame recovery, mirrored rear rolls across8archetypes and30/60/120Hz, and all dodge phases. `tests/repair277-assets.py` validates transparent cutouts, fist metadata, body height/aspect, unchanged old Flint atlas and byte-identical archived source art. Existing Flint211 bank-tip test now compares actual rendered hand+direction+constant length, rather than requiring a hand-dependent stretching weapon to reach a theoretical maximum at one angle.

Developer-only `?qa259` scenarios expose Flint pipe/knife/swing/tired, six dodge phases, and rear-roll pre/post-impact; native commands/ticks drive each scene. Browser screenshots are review evidence, not approved baselines. Full-suite results in RESULTS.md/final-run.json. Physical controller feel, human artistic/balance approval and broader visual/performance certification remain separate.

### Final grip calibration / fixture migration

The first full run executed105 suites:104passed and one old controls260 expectation failed because it still required base-recovery+120frames. The assertion now requires exactly180frames for every wild/power weapon profile; mandatory-recovery, no-armor and finite-completion checks remain. First-run evidence retained.

Final visual inspection also found the tired fist several pixels above the original nominal hand point. `tools/import-277.py` now reproduces the native source-frame isolation and sole scan, then projects authored fist source pixels through drawFrame's rounded origin/size. Both simulation and renderer read that single hands277 table. The final tired screenshot shows the handle inside the fist. No underlying source body was altered. Reports/import metadata records the measured joints.
