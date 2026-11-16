# Build288: diagnostic and developer inspection only

Recovery checkpoint: checkpoint-before-diagnostic288 at 90fcf66c689b75e10789b26356e38aa4572cd159.

User review gate: stop before implementing combat, animation, balance or AI changes. Diagnostic scope is Niko versus ordinary Marcus. See the 13-page PDF and 240-frame CSV; baseline JSON traces and actual renderer pose transitions retain the evidence.

Confirmed: visible Developer Menu entry globally pauses the game and prevents manual playback steps; F9 entry permits stepping. Sparse Niko strike poses and Marcus recoil/fall/get-up source coverage; misleading theoretical timeline phase/actionable labels; one floating-point completion tick discrepancy. All four native standing-combo hits connected. Ordinary Marcus took full damage, interrupted attacks and had 0.5-second standing hitstun. Armor was not observed. Post-knockdown standing lock and next Director-admitted hook are recorded, not altered.

Authorized UI additions: sticky Save & Close saves practice selections and approved environment state, closes the panel and resumes the global pause while preserving independently paused playback. No experimental balance values are saved. Enemy AI logic/history is opt-in, observes actual native evaluation/admission/damage events and shows native selection source. Missing weights/reasons are explicitly N/A; persistent controller failure fields are not presented as current decision reasons. Works with active enemy selection; no new AI controller.

Executed checks: diagnostic288 observer-on/off 360-frame equivalence and selection-only persistence; devmenu268 37; playback265 137; playback265-input 14; practice282 4107; niko284 930. All passed. Keyboard UI verified +1/+5/+10, Save & Close and AI inspector. Physical controllers not tested. Full frozen release suite not rerun. Build is diagnostic, not certified stable.

Preservation: all 1493 original production files outside the three explicit UI entry files match Build287 byte-for-byte. Existing game.js change is only the Save & Close resume bridge. No gameplay damage, frame data, AI weights, animation assets or combat rules changed. Baseline/current scenario traces compare equal.

Rollback: restore the checkpoint through the established Sites/version-control workflow; do not confuse build rollback with experimental setting reset. Findings await user review.
