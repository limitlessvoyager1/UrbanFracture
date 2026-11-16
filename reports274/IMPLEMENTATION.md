# Build274 — Downtown combat corrections

Recoverable checkpoint: `checkpoint-before-combat274` at `14974053df0520c64bc20186284f4ed1f968fd33` (audit commit; runtime identical to approved live Build272). Live production parent runtime commit321178a29373cb9f1ebe75327980d6e4b1c90aeb. No new controller, level rebuild or weather system.

## Recording and audit

Reviewed the supplied122.8second Downtown video, restaurant/retail/Grand Hotel exchanges. Contact sheets and VIDEO_REVIEW.md retain observations. Frame timings, hitstun and armor conclusions come from runtime probes rather than video inference. Prior273 rear-armor fixture turned the attacker toward its target during native startup: corrected274fixture latches committed facing after startup. This was a test-label error; production rear-hit immunity was independently reproduced and corrected with source-aware armor evaluation.

## Repairs

1. **Actual reaction state** extends the shared damage pipeline, classifies known move families and records clean/armor/knockdown outcomes, damage, interrupted action and source. No damage/HP reductions. Existing generic.28s and move-specific stun retained; newly classified heavy non-knockdown contacts have a24frame minimum. No global shortening that could break confirmed combos. Light/medium/heavy are move classifications, not guessed solely from damage numbers.
2. **Interruption/reassessment:** successful vulnerable hits still cancel the native action and its pending contacts. Native Director prunes ended reservations. After mechanical stun, offensive admission waits a6/8/10frame light/medium/heavy decision beat; defense/repositioning and mandatory recovery remain native. No random armor, perfect retaliation or added immunity.
3. **Directional Bruno commitment:** standard Bruno committed armor consults the actual damage source. Rear hits bypass committed-strike armor; frontal active windows retain damage-taking stagger resistance. Wake/capture protection and other specialist armor rules remain separate. Marcus/Kevin ordinary armor exclusion is preserved.
4. **Continuous local separation:** ordinary street enemies only,54world-unit desired clearance,48units/s per-actor maximum correction. No player movement, teleport or damage. Excludes active moves, grabs, flight, jumps, knockdowns, entries, protected synchronization and specialist formation owners. Furniture and combat/ground bounds constrain proposed movement. Walking cadence advances with displacement, including persistent Bruno gait state. Dock Workers/Gus/casino/other specialist spacing stays authoritative.
5. **Recoil presentation:** existing whole-body frames for sampled standard enemies, category-dependent small horizontal recoil, fixed scale and ground origin. Three new Carmen standing recoil/stagger/recovery frames prevent the old idle/fall fallback from presenting airborne standing hitstun. Held, electric, airborne, downed and active-action poses take priority. No sprite blending or live scaling.
6. **Collision safety:** native per-flight target hit Set still owns duplicate prevention. Secondary damage/knockdown now requires positive collateral allowance; zero-collateral moves cannot produce accidental forced knockdowns. Held, synchronized, dormant, fleeing and protected victims are excluded. Approved positive collision damage retained.
7. **Developer diagnostics/experiments:** same F9/L3+Options dashboard shows actual reaction, stun, recovery, reassessment, action and role data. Scoped reaction settings expose baseline/current/Modified, per-value reset, Undo/Redo and history. Reset-all confirms affected count. Values validate, apply only at a safe all-actor boundary, and queue through attacks/grabs without changing their state. Immutable approved baseline; experiments stay separate and reset on reload. Reassessment/minimum fields use simulation frames, spacing world units, speed world units/s. These are scoped reaction experiments, not the full previously planned per-move balance editor.

## Gate evidence

- Gates2–4: combat274 native category/interruption/ghost-contact, front/rear windows, clean damage, reassessment/end tests; shared269/248/272 regressions.
- Gate5: renderer105checks plus9custom Carmen cases; binary-alpha/fixed-scale/sole asset tests; browser observed Carmen,Marcus,Bruno recoil. Full per-enemy artistic certification remains manual.
- Gate6: bounded separation at30/60/120Hz, excluded states, heavy cadence, six native seeded group trials. Existing workers250 complete heavy-pair/mixed-five attack rotation and budget tests pass after specialist exclusion.
- Gates7–8: existing lane/contact/grapple regressions; direct positive/zero collateral and one-event damage tests. No blanket hitbox shrink or combat-plane remapping.
- Gate9:16settings assertions plus invalid-value exceptions, native attack/grab deferral and reload isolation. Browser verified8→12Modified,Undo8,Redo12,Reset8. UI now refreshes immediately while paused; stale labels found during browser verification were repaired.
- Gate10: final frozen QA242 release report contains actual results. No art screenshot baseline silently approved.

## First-run regression and resolution

First full run96executed/95passed/1failed: workers250 mixed-group attack rotation. Generic separation interfered with an already functioning crew formation. Corrected scope excludes worker/specialist owners, without weakening that test. It now passes unchanged. Also corrected persistent Bruno gait accumulation for spacing-only movement. First-run machine evidence retained as first-release.json/log, final evidence separate.

## Preserved / remaining review

Preserve playable moves, timings, damage, controls, input buffers, defense costs, grapples/recovery, environment, progression and level geometry. No AI-budget increase. The broader Developer Panel per-move editors/A-B presets/build rollback workflow are not claimed complete by this scoped repair. Existing boss-specific resistance/phase rules are not indiscriminately removed. Exhaustive all-character art/move review, physical DualSense, approved screenshot comparisons and human difficulty/balance remain manual; final build is a playtest, not stable certification. No all-defects claim is made from one recording.

## Recovery and execution

Run `node tests/combat274.cjs`, `node tests/combat274-view.cjs`, `python tests/combat274-assets.py`, `node tests/reaction-settings274.cjs`, `node tests/workers250.cjs`, then `node tools/qa242/run.cjs --profile release`. Restore verified Git checkpoint or prior saved production version separately from developer setting resets; review newer work before discarding it.
