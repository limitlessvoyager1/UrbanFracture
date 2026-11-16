# Build323 — Gate3: Prime City smartphone interface

Rollback checkpoint: `checkpoint-before-phone323` / `c1981a7e90334f820f1b857601759de084afb598` (Build322).

## Implemented
- Smartphone entry in the native pause menu. Opening requires an active, already-paused game and rejects conflicting scene, reserve, settings, developer or scripted navigation states.
- Original illustrated Prime City skyline wallpaper; six distinct rounded-square SVG icons: Messages, PromptDrop, Astro-Call, Prime City Pulse, City Map, Missions.
- Readable phone home screen with actual hero identity, native world clock, wallet and current reserve item.
- Actual current-area objective and enemy/pending counts in Missions. This is a runtime area view, not a newly invented campaign mission log.
- Keyboard arrows/WASD grid navigation, Enter/Space confirm, Escape back, Tab focus loop, page/arrow scrolling. DualSense standard/raw Sony/DSX and analog/D-pad navigation reuse existing mapped commands; × confirms, ○ backs out, Options closes to pause.
- Explicit selection outline, mouse controls, safe focus return, release gating and disconnect handling.
- Phone is a read-only paused interface at this gate. Normal loop, precision playback, manual developer stepping and direct simulation bridge cannot advance gameplay underneath it. Closing returns to the existing pause menu; it does not silently resume combat.
- App registration hook for subsequent gates. Future services are clearly marked unconnected; no fake purchases, inbox, feed, hero swap or map behavior.

## Files changed
Production: `dist/phone323.js`, `dist/assets/phone323.webp`, `dist/game.js`, `dist/audit-view135.js`, `dist/index.html`.
Tests/support: `tests/phone323-ui.cjs`, cache expectation in `tests/contact302-view.cjs`, `qa/system242/suites.json`, exact-source receipts in `tools/phone323`, composition hook in `tools/repairs322/approved.cjs`.
Artwork original, prompt, readable source and packer: `source-art/phone323`.

## Verification
-99 smartphone assertions passed: native loop and direct-step freeze, precision1/5/10-step denial, all six views, native facts, wallet/combat/inventory isolation, keyboard input, pause-menu access, actual audit capture delegation, standard/rawSony/DSX controller samples, release/reconnect gating, conflicting-menu rejection, and all7heroes while paused mid-action.
-14 existing regression suites passed: controller240, Nightshade ammunition256, diagnostics307 input, energy316, items319 runtime/loot baseline, reserve320 runtime/UI/equivalence, pickups321, repairs322, playback265 runtime/input, contact302 view. Exact outputs in `regressions.json` and `additional-regressions.json`.
- Browser inspection passed: native game launch, pause entry, keyboard phone access, grid navigation to PromptDrop and Missions, actual area/enemy/resource display, Escape home/back-to-pause, readable wallpaper/icons/footer and selection highlight. Evidence: `home.png`, `promptdrop.png`, `missions.png`, `browser.json`.
- Browser inspection exposed an initial conflict: the existing capture-phase developer listener swallowed phone keys. It now delegates to the phone handler. A targeted regression loads that actual listener and verifies app selection and F9 containment.
- A preexisting contact-view test required its expected game.js cache version to move from322 to323; it then passed.
- Exact rollback receipts reproduce all modified existing JS/HTML from Build322. No combat, damage, AI, approved balance or existing artwork changed.

## Limits / next gate
PromptDrop purchasing and delivery are Gate4; Astro-Call, headquarters, messages, Living City, feed and map remain their specified later gates. No new campaign-save system or relationship features were introduced. The required geography review remains mandatory at Gate11 before final map artwork. Wallpaper scenery is not approved geographic placement.

Physical controller hardware, small mobile/landscape rendering, complete campaign traversal and full release suite are untested. Controller claims refer to simulated standard/rawSony/DSX samples. Live browser checks used a desktop viewport.

Shipping wallpaper is a6150-byte derivative of the retained full original. Official preflight expanded TAR268434944bytes leaves512bytes under the host limit. No existing assets were removed or recompressed for this gate. Budget/package restructuring is required before adding substantial subsequent shipping code or artwork.

Next recommended gate: Gate4 — PromptDrop delivery service. Stop after Gate3 for this request.
