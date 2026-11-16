# Build322 — HUD, Jaguar and enemy corrections

Approved predecessor / rollback checkpoint: `a15fb5afa7e4bcb7a654d88b2d440d51f07b27ac` (Build321).

| Reported defect | Confirmed cause | Correction |
|---|---|---|
| Reserve box placement | Reserve overlay used the right-hand HUD column | Box now below energy at x73/y69; Nightshade y82 below ammunition. Enemy health card and combo text moved down to avoid overlap. |
| Jaguar fires too soon / magazine | Registered aim startup17frames and10 rounds | Startup47frames (+30frames /0.5sec at60Hz);8 rounds; existing48frame reload. Alignment, range, Director and damage preserved. |
| Bruno ignores gun hits | Firearm adapter suppressed stagger for every heavy | Ordinary Bruno now recoils on clean standard and piercing gun contacts. Genuine armor and wake protection remain valid. |
| Frankie grows when attacking | Chain-family import had a .92 scale reduction while walk/other actions did not | Uniformly recalibrated the entire chain family, including anchors and weapon sockets. No per-pose enlargement; guard/walk heights now within3px. |
| Frankie lacks a get-up | Procedural mesh recovery produced an unreadable squat transition | Original8-pose atlas: grounded, roll, support, knee, crouch, rise, stand, guard. Shared constant scale and ground anchors; existing recovery duration preserved. |
| Office floating signs | Unattached room and exterior titleplates plus overwide portal labels | Removed floating titleplates; portal labels constrained to their physical frame backing. HUD room names remain. |
| Regulars escape grabs | Approach reversal guard depended on an already-held victim; stale legacy break flags and Niko pin timeout could bypass classification | Regular reversal denied at shared entry, legacy break branch classification checked, Niko pin escape limited to heavy/boss class. Existing capture eligibility and third-party interruptions preserved. |

## Files
Production: `dist/item-view319.js`, `game.js`, `pcbi316.js`, `nightshade-gun255.js`, `grab198.js`, `core.js`, `niko185.js`, `enemy281-data.js`, `enemy313-data.js`, `enemy-view313.js`, `feds-view316.js`, `index.html`; new `assets/enemies313/frankie-getup322.webp`; optimized `assets/sprites/frankie-mask167.webp`.

Exact reversible source receipts: `tools/repairs322/approved-source-lines.json`, composed before321 proofs. Original artwork, metadata, generation prompt and packing scripts retained under `source-art/frankie322`.

## Validation
- New runtime suite:330 assertions. Actual Jaguar shots, reload and wrong-plane rejection; all7heroes ×8regular enemy capture cases; held/approach escape denial; retained heavy reversal; actual Bruno gun recoil and wake-armor behavior.
- New native visual validation:47 checks. All8 Frankie recovery frames observed during actual knockdown ticks, fixed scale, grounded silhouettes, no renderer mutation of actor position/health/recovery. Guard/walk scale consistency and office titleplate removal.
-13 scoped regression suites passed: controller, Nightshade gun/ammunition, Niko283/284, reactions298, input diagnostics307, enemy313 runtime, PCBI combat, Feds runtime, energy, reserveUI and pickups321. Exact results in `regressions.json`.
-5 presentation regressions passed: Nightshade gun view, continuity296 runtime/equivalence, contact302 view, enemy313 render. Results in `presentation-regressions.json`.
- Native seven-hero HUD captures inspected; reserve below correct meters. Frankie before/after contact sheets and all8 get-up poses inspected. Office before/after captures inspected.
- Managed browser loaded Build322 and the Feds launch control changed game state to office landing/lobby. This is a browser launch smoke check, not full live-browser combat or physical-controller certification.
- Exact modified-source reversal matches predecessor for every existing modified JS/HTML file.

## Evidence
`hud-roster.png`, `frankie-before.png`, `frankie-after.png`, `frankie-getup.png`, `office-before-after.png`, `gun-runtime.json`, `visual-validation.json`.

## Asset budget and limits
Hosting counts the entire expanded TAR. To fit the original get-up atlas, optimized Frankie167's alpha-only mask: unused RGB zeroed; alpha differs by at most1/255. Exceptions preserve all runtime opacity classifications at19/80/97/129/191. Original full-color atlas unchanged; original mask retained. Actual composed alpha and visible premultiplied RGB maximum difference1/255;666 exceptions. See authoritative `source-art/frankie322/mask-validation.json` for exception count and hashes. New atlas38644bytes; mask savings61540bytes. This is a bounded near-lossless mask derivative, not byte-identical existing artwork.

No approved damage, general hitstun, grapple choreography, attack ranges or Director limits changed. No full release-suite run or hardware certification claimed. Gate3 smartphone remains unimplemented; required Gate11 geography review still applies before final map artwork.
