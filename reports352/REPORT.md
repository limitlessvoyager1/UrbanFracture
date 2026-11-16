# Urban Fracture352 — reference blitz kick

Checkpoint-before-blitz352, predecessor6b0e8e8e2cfb0842aaaa01d89aea55b386077f0c. Only the supported downtown352 entry loads the352 adapters. Prior351 entry and source art remain recoverable.

Reviewed0–2 seconds of the user's Screen Recording2026-11-13 203317(1).mp4, including a denser1.1–2.0 motion contact sheet. The visible action rises into a near-vertical extended kick, sweeps outward into a traveling side kick and lowers into a landing. Sixteen new original whole-body Nightshade frames reproduce that arc in her current illustrated costume; the supplied game's character/costume pixels were not copied. The old349 straight flying-kick atlas is not the active352 animation.

Root travel increases from360 to400 native world units, approximately11%. Damage22, total83 frames,22-frame startup,28-frame active window,33-frame recovery, costs and input binding remain unchanged. Root travel is authored over frames12–55 and the90-unit hop over12–61, then grounded recovery. The high extension is followed by outward/high, horizontal and lower forward poses. Every figure shares one scale; airborne poses use calibrated pelvis anchors and grounded poses retain sole anchors. Wrist-device/glasses/costume identity remains visible.

The physical contact path samples the actual illustrated hip-to-boot leg segment at240Hz within the active window, using the same pose/root/scale as rendering. Each enemy can receive one accepted hit. The move retains native guard/armor, knockdown and fall/get-up behavior and cannot reach an enemy merely because it is anywhere ahead. Rejected invulnerability contacts can retry while active. Both facings use the same mirrored path. Takeoff lane stays fixed. An interrupted blitz now clears its height/pose ownership, preventing a suspended recovery pose. No throw-style I-frames were added to the blitz.

## Checks and evidence

-1221 blitz assertions: both facings at30/60/120Hz,400-unit travel, unchanged lane, bounded hop,22 damage once, actual knockdown, high/outward/lower phases, crowd contacts, off-plane miss, interruption cleanup, wall clamp, real tap/release input, active new-atlas rendering, common body scale and grounded soles.
-39 retained Nightshade runtime/input assertions run through352.
-180 retained live-combat assertions run through352.
-Gamepad and controller recovery suites pass with simulated standard/raw Sony/DSX/custom mappings.

Total1440 targeted assertions pass. No failed final targeted checks. Native footage captures all208 full-HD simulation frames in both directions, supplied at1x,0.5x and0.25x. contact-sheet.jpg shows the successive arc and landing. These are silent controlled native-engine captures, not browser gameplay, browser60FPS or physical-controller proof.

## Files and limits

New dist/nightshade-repair352.js, nightshade-view352.js, nightshade-blitz352-data.js, downtown352.html and assets/nightshade352/blitz.webp; original source-art/nightshade352/blitz.png/provenance.json; import/build/render/capture tools; three targeted suites and QA registry.352 retains351 aerial kicks, throw I-frames/interruptible29-damage beatdown, hotel, signs, pickups and Flint corrections. The original asset was generated with the built-in image tool; the exact prompt and identity/motion reference roles are in provenance.json.

Browser playthrough/performance, physical DualSense and complete human frame approval remain untested/open. Existing manual/performance holds are not waived. This is owner-only review publication, not stable certification. Verify expanded512-byte-record TAR below268,435,456 bytes before publication.
