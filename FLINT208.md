# Recording review208 — Flint weapon readability

Checkpoint: checkpoint-before-video208 (f2c11e7629c679183fb6f2226a7abd42e0d0964a).
Reviewed the supplied92.53-second recording (Screen Recording2026-11-03 055441), including denser samples around the first crowd/grab exchange and Flint's repeated swings at54–59s.

Corrections:
- Flint's existing three-swing/heavy visual poses now sample the authoritative times101 contacts, rather than alternating from stale strike counters.
- Existing bent-knee recovery frame7 replaces the raised ready/swing pose during the mandatory recovery and subsequent cooldown. The weapon stays attached to a measured hand anchor and lowers near the ground. No sprite scaling or root translation is introduced.
- Heavy-swing armor no longer extends beyond recoveryStart147 (formerly .70 vs .65 seconds). Ordinary hits can interrupt from the actual recovery boundary; committed damage-taking armor, original damage, range and attack-pressure coordination remain.
- Flint and martial sprite fallback now honors actual hitFlash with restrained brightness, so accepted armored damage is visible. No new damage events.
- Includes prior207 opaque invulnerability feedback/get-up proportions/committed-throw crowd spacing, addressing the ghosting/overlap also visible in this older recording.

Validation: flint208 at60/120Hz and both facings; current15026-suite regression runner; gamepad/controller157; video207 and taser206. Browser visual checks use production modules through video207.html with new Flint scenarios. Physical controller hardware and exhaustive full-game balance are unverified. Unarmed Flint remains under the existing186 controller.
