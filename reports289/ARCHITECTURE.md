# Reaction continuity standard289

Only ordinary unarmed Marcus is enrolled. Native state is authoritative: damage, armor eligibility, stun, flight, ground age, recovery locks and AI remain untouched. The presentation layer cannot grant actionability.

`reaction-templates289.js` supplies reusable normalized phase selectors: light/medium/heavy recoil, airborne fall, impact, ground, rise and guard. Native simulation time, not wall-clock or independent animation timers, drives selection. Every phase has original anatomical keyposes; no whole-body scaling, crossfade, blur or limb-slice rendering is used. Scale is one immutable atlas import factor. Per-pose horizontal registration and sole anchors compensate art packing, not combat position.

`marcus289-view.js` wraps the existing renderer after later-loaded modules. It delegates all other enemies, armed Marcus, synchronized pairs, special throw/floor presentations, shocks and non-palm flight styles. Missing art fails to the previous renderer. Native ordinary knockdowns without flight receive the same fall/impact/rise phases. Paired moves retain their shared native ownership. Original Marcus costume and proportions are the only appearance reference supplied to image generation.

Art import: original24-cell RGBA source retained under art-source289. Fixed scale137.2/215; alpha-bounded sole registration; high-quality WebP preserves source aspect ratios. No reference-game pixels, audio, code or extracted animations are shipped. The shipping atlas is assets/sprites/marcus-reactions289.webp. Generation prompt is retained with the source.

Future enrollment requires: character-owned original source poses; readable contact/peak/settle silhouettes; at least five recoil, six fall and ten get-up keyposes or a documented equivalent; pixel tests across all native ticks and both facings; no cropping, missing body or unintentional floor drift; native hitstun/interruption/recovery tests; before/after mechanical trace equivalence; unchanged control-character captures; visual owner review. Reusable templates are available but other characters are not automatically enrolled.

Run: node tests/marcus289.cjs; node --expose-gc tests/marcus289-render.cjs. Capture: node --expose-gc tools/marcus289/capture.cjs after. Before artifacts are checkpoint captures; do not regenerate them over approved evidence. Review normal/half/quarter playback and frame ledger. Full release: node tools/qa242/run.cjs --profile release. Manual art, physical DualSense and owner-approved all-scene screenshots remain separate gates.

Rollback: checkpoint-before-marcus289 at3b1bf5da662badab5265bfadc6c1620dbd8a01a5. For developer visual A/B only, reaction289=baseline delegates to the old renderer; it does not change simulation data. Build rollback uses the checkpoint/version workflow, not experimental setting reset.
