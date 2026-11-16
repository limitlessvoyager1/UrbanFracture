# Urban Fracture — Build377 / Assignment4

K'marr (Hammer) and Ty Sly (Enforcer) now answer normal Syndicate Backup calls. The selector chooses up to two distinct, completed, non-injured responders from Byron Bastion, Michelle Roxx, K'marr and Ty Sly. Colton Sharpe remains the next roster assignment; his configured10% gate is preserved and does not select an unfinished actor.

Checkpoint: `checkpoint-before-backup377`, based on published Build376 source `2b82f0707de583b7392ee1ff7545ae5dd8d20d2b`.

## Characters and actual frame data

| Character | HP | Move | Startup | Active | Recovery on hit/block | Recovery on miss | Damage |
|---|---:|---|---:|---|---:|---:|---:|
| K'marr |65| Fast Hammer Combo |10|10–13, then26–29;12 intervening frames|22|28|6+6|
| K'marr |65| Hammer Bash |17|17–21|22|32|15|
| Ty Sly |75| Rusty Rebar Swing |16|16–21|20|28|12 per eligible target|
| Ty Sly |75| Rebar Rush Thrust |20|20–29|26|36|16|

All timing is simulation frames at60FPS; damage resolves only once per target per strike. Native armor, invulnerability, blocking, hurtboxes, combat-plane alignment and hit reactions apply. The swing covers enemies in front on the same combat plane. Thrust movement is bounded to70px, respects clear paths, and stops at walls and combat/camera boundaries. K'marr favors his bash against recovering enemies, otherwise his fast combo. Ty favors a sweep at closer range and a thrust from farther away.

The four providers share the existing FriendlySupport370 attack admission and action lifecycle. One ally commits at a time. Attacks include meaningful animated recovery rather than holding a contact pose. Ally hits do not grant Broxton energy, score or combo credit; native hostile death/drop processing remains single-pass. Full hostile target diversification is still Assignment6.

## Artwork and animation

New original raster source sheets are `source-art/backup377/hammer.png` and `source-art/backup377/enforcer.png`, with exact final prompts in `source-art/backup377/PROMPTS.txt`. Generated with the built-in image tool, then registered into transparent256px cells by `tools/backup377/pack.py`. The first Enforcer attempt was rejected for inconsistent layout; the retained Enforcer sheet uses the corrected6×8 layout.

Each character has48 authored full-body poses:4 idle,8 walk,4 run,2 turn,10 first-attack phases,8 second-attack phases,2 hurt,2 fall/prone,4 get-up,4 injured limp. Weapons are painted into the gripped hands, with no separate floating prop. Original input packing and per-frame registration measurements are retained. The runtime atlas/data files are `dist/assets/backup377/hammer.webp`, `dist/assets/backup377/enforcer.webp` and `dist/backup377-data.js`. Native draw ownership is in `dist/backup-view377.js`; it is registered with the fighter-render manifest.

Inherited lifecycle:3–4second dispatch delay, fully offscreen entrance, common20second support deadline, continuity through street changes/locked pans, departure announcements, zero-HP getup/limp retreat and individual300second injury cooldown. No healing/resurrection during retreat. Cooldowns pause with simulation and persist through save/load/reset.

## Changed integration and review

`dist/backup377.js` adds the two native providers and four moves. `dist/support370.js` admits role-specific engagement range and tactical move choice without adding another AI engine. Both HTML entry points include the new runtime/data/draw modules. `dist/game360.js` supports a passive developer-only preview through `?practice=1&hero=broxton&backup377=1`; normal play has no manual ally selection. `dist/backup-view365.js` labels that preview pair correctly. Existing tests were updated only where the roster expanded from two to four providers or a solo-availability fixture needed the other two providers marked injured.

## Verification and limits

`tests/backup377.cjs` verifies all four attacks at30/60/120Hz and both facings, exact damage, native mandatory recovery, whiff recovery, shared friendly admission, sweep multi-target/facing/plane limits, guarding, hit interruption, obstruction, damage/score protection, injury retreat, availability, tactical preferences and scene carry. Detailed results: `tests.json`.

Existing role/combat, entrance/delay, continuity/departure, phone, selector/shared-AI, gamepad and controller-recovery suites passed. No unresolved failed tests. Controller checks exercise software mappings; physical DualSense hardware has not been tested.

Rendered evidence: `native-review.png`, `native-combat.mp4`, `native-combat-half-speed.mp4`, atlas reviews, registration measurements and `render.json`. These are actual production controller/action states with current sprite draw owners, in a controlled native combat fixture. They are not browser gameplay capture or full artistic/final-animation certification. All source poses were retained for frame inspection. Final voice acting remains pending.

Performance: `performance.json` measures600 native simulation ticks for4/6/8 enemies, with and without the new pair. It excludes browser rendering, audio, input-device latency and end-device performance; do not interpret it as60FPS certification. No performance optimization or unrelated level changes were made.

Package checks preserve exact source strings, required scripts and assets, and the existing Downtown-only deployment size limit. Details in `package-verification.json`.

Next roster step: Assignment5 — Colton Sharpe, his two machete attacks, capped native bleed integration and10% wildcard verification. Full hostile/ally encounter integration and final performance/visual certification follow in Assignments6–7. The requested cooldown-operator interaction and two-silhouette HUD enhancement remain a separate unfinished feedback pass; they were not bundled into Assignment4.
