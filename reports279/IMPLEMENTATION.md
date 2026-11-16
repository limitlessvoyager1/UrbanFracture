# Build279 — Reina grabs, input and approach coordination

Recovery checkpoint: checkpoint-before-reina279 at451b89c5f47d5e4bf37b59a02d71af46559781ba. Existing Brawler, Grab223, Counter248, Director148 and native paired-motion remain authoritative.

Front neutral grab: four fresh Attack presses now produce two knees, a12unit step with elbow to face, and an opposite-hand palm to midsection from a slight crouch. Stage durations32/34/40/46frames; contacts14/16/20/22; damage6/6/5/6 preserves23total. Final palm releases safely, retains standing pain, and pushes96units over.24s with plane and bounds safety. Early physical edges can queue; holding Attack does not auto-combo. Heavy/boss thresholds remain in shared Grab223. Rear/directional/counter moves are not replaced. Native grip eases into authored hand reach; fixed sole and body scale throughout.

Front forward outer reap preserves original damage and event timings, but advances56 instead of100units and places the landing/punch root closer. Hero no longer travels from takedown to the face punch.

Neutral special: legacy special/counter chord defers to current Counter248. Reina late neutral Special can queue through at most.32s of ordinary recovery/cooldown; native recovery, HP cost and cooldown remain. Damage, jump, new actions and scene/reset invalidate stale intent. Runtime diagnostics state accepted/buffered/rejected reasons.

Air Down+Attack already had10damage and.65s stun. Added light reaction classification and existing held-pain sprite for Kevin/Frankie, replacing the idle-body recoil. No new knockdown or armor bypass.

Director148 now spaces ordinary support enemies before native approach rather than constraining only attack admission. Ready primary/committed actors retain native approach; others stage on stable side/lane targets using grounded walking. Original3point/two-commitment limits and recovery remain. Worker crews and specialist controllers are excluded. Full regression caught Flint's own weapon logic being starved; Flint and martial specialists are explicitly excluded from this new positioning layer and retains his existing coordination/admission.

Runtime changes: dist/reina279.js, reina-grab279-data.js, reina-grab-view279.js, reina119.js, director148.js, rising-blade187.js, combat274.js, combat-view274.js, game.js, index.html, repair259.js. New8cutouts under dist/assets/reina279. Added4suites and importer. Historical266/269 source-body proof records exclude intentionally modified modules; unaffected bodies retain exact hashes. Stats266 now counts exact retained-header savings plus the already-approved dedicated278atlas saving, rather than an arbitrary header-only threshold one byte above the retained9999bytes. Expanded deployment cap still checked independently.
