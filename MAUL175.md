# Gunner Maul refinement and fog correction

Checkpoint: `checkpoint-before-maul175` at `8e35f445045e22b721a2c56a95df07f5106845e5`.

Forest uses the shared Charge130 owner with a hero-specific three-second threshold. Other heroes retain their existing timings. Charging movement is 60% of walking speed; fixed-scale, original knife-guard torso and distance-driven gait frames replace the prolonged pointing pose. Root, floor, controls, portraits, weapons and level geometry are unchanged.

On release a valid forward, aligned, alive, unprotected enemy within340 units is reserved. A14-frame planted command belongs to Forest; a5-frame head-turn/alert/bark acknowledgment begins at frame6. The command event enters the existing Companion126 task machine, which owns travel, tackle, three timed bites, disengagement and return independently of Forest's action. Original44 damage remains14+10+10+10. No additional cooldown. Commands work equally in all four173 profiles; autonomous cooldowns do not block commands. Stun and other synchronized commitments remain authoritative. Invalid commands store the charge and return Forest safely to control.

The target is held grounded during biting and deferred lethal damage settles on release. No retargeting, per-frame damage, teleporting or overlapping Mauls. Temporary hurt invulnerability caused by Forest's independent attacks is waited out with a bounded timeout. Manual block, normal knife/crossbow attacks, walking and solo actions remain available after14 frames. Incompatible Blitz/clear commands are refused while Gunner is committed.

Existing fixed-scale sprites are reused; no assets were replaced or generated. Acknowledgment uses existing alert/launch silhouettes and latched head-facing direction. Production audio consumes one command event, one bark event, running/jump/land/tackle/bite events. F9 Gunner diagnostics include charge, target, phase, distance, acknowledgment, bark, contact, timed damage and failure reasons. `animation169.html` has charge/release and night-fog fixtures.

The reported rectangular Riverfront gray overlay was the shared fog pass beginning at y140 with nonzero alpha. It now fades from zero at y68 to its central haze and back to zero at y470, preserving dynamic weather. The new Riverfront artwork is unchanged.

Validation: `tests/maul175.cjs`, `tests/fog175.cjs`, current15026-suite regression, gunner173, environment162/environment-integration156, gamepad.test/controller157, riverfront16072 render cases; browser charge-walk and night-fog fixtures. Physical DualSense hardware was not available. Three historical current-contract assertions now reflect the explicit new Forest timing, brief command and60% movement; other hero assertions remain.
