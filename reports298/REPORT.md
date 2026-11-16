# Gate 4 — Hit reactions and mechanical hitstun

Build 298. Baseline: Build 297, `3ecb645f0c84a4ea6117519a42f08de2bd001dda`. Recovery checkpoint: `checkpoint-before-reactions298`.

## Confirmed defects and corrections

| Defect | Confirmed cause | Correction | Evidence |
|---|---|---|---|
| Bruno resists a valid rear kick during a vulnerable committed hook | `combat134.js` derives `hypeArmor` before `combat274.js` installs the attacker context used by the existing rear-vulnerability rule. The stale flag reaches `core.js` even when the source-aware armor query returns none. | `reactions298.js` discards that stale flag for ordinary Bruno's existing rear-vulnerable punch/kick families, respecting wake armor and synchronized owners. | `native-rear-before.json`, `native-rear-after.json`: actual attack input, first contact at capture frame9; 7damage both builds; kept action/zero stun becomes interrupted action/native stun. |
| Saito's guarded chip damage appears in diagnostics as armor | `combat274.js` inferred armor from the original action surviving a damaging hit. A guard action also survives blocked chip. | Classify the actual block-flash transition separately from actual source-aware armor; correct the original reaction event and the new receipt. | `baseline-audit.json`, `after-audit.json`; `saito-block` videos: one chip damage and guard survival unchanged, result armor→block. |
| Explicit non-staggering bullets are mislabeled armor | The same fallback labeled any standing damage without stun as armor, even with no active armor. | Report `clean-no-stagger`; preserve the existing bullet behavior. | Audit JSON: Bruno/Saito bullet cases, damage4 and stun0 unchanged. This does not change ordinary Marcus/Kevin hitstun. |
| Native recoil timeline advances while the previous attack's withdrawal body is still displayed | 296/297 display up to six authored withdrawal frames; 289/290 already sample recoil progress from the original contact time. Early recoil poses are skipped when recoil finally becomes visible. | Use a shared visual clock that starts recoil after that withdrawal and fits it inside the remaining native stun. Its delay persists independently of temporary render metadata. | Marcus/Bruno captures, renderer tests, exact per-frame receipts. No stun extension. |
| Deferred melee entry points can accept an already-interrupted action object | `enemyHit`/`advanceHeroAction` have no shared invalidated-action identity barrier. Normal native ticks usually stop dispatching once `act` clears, but a stale callback can still be invoked. | WeakSet of exact interrupted actions rejects those callbacks; offensive starts and enemy-action admission cannot bypass remaining native hitstun. | Runtime tests deliberately invoke stale callbacks. This is a reproduced API failure/hardening case, not a claim that a particular reference-video phantom hit used this path. |

## Preserved mechanics and scope

No damage values, startup/active/recovery definitions, cooldowns, AI selection weights, threat budget, sprite scale or combat-plane positions were retuned. The Bruno rear interruption is the intentional mechanical correction: his existing unarmored hitstun now applies where it was previously bypassed. Frontal active armor still keeps the action running; regular Marcus/Kevin remain armorless and interruptible. Already-released projectiles remain independent when their thrower is struck.

The provisional 8–30 frame tuning ranges were not applied. Current ordinary-enemy hits already enforce the previously requested 0.5 seconds, while Reina's first two standing hits have approved 33/38-frame stun for their existing combo timing. Reducing these to provisional reference ranges could break those links. There is no evidence here supporting that balance change.

Light/medium/heavy recoil retains the existing original whole-body Marcus/Bruno poses and the existing Kevin/Saito reaction families. A bounded cosmetic displacement follows the actual impact direction; native root movement and ground anchoring remain unchanged. No new art, asset recoloring, anatomical mesh or full-body crossfade was introduced. Existing fall, launch, knockdown, get-up, counter and paired-grapple owners remain intact; their redesign belongs to later gates.

## Before/after visual evidence

- [Before/after contact sheet](comparison.png)
- [Normal speed](before-after-1x.mp4), [0.5×](before-after-05x.mp4), [0.25×](before-after-025x.mp4).
- Each combined clip places the approved baseline on the left and current rendering on the right. Normal-speed sequence: 0–2s Marcus light; 2–4s Kevin medium; 4–6s Bruno heavy; 6–8s Saito medium; 8–10s Bruno rear; 10–12s Bruno front armor; 12–14s Saito block; 14–16s Marcus knockdown regression.
- Eight isolated scenarios, each with120native frames, selected PNGs and JSON state/receipt traces, are in `before/` and `after/`. Baseline captures run against a detached worktree of the exact approved commit. Clinical recoil captures apply a controlled four-damage native hit with AI disabled; they do not purport to be complete hero-attack recordings. The separate native rear-kick test uses actual Reina input and native Bruno attack admission.
- Slow clips time-expand those exact 60Hz frames. Fixed-step mechanics and browser stepping are checked separately; these exports are not presented as independent slow-simulation runs.
- [Browser screenshot](browser-proof.jpg) and [actual developer-panel telemetry](browser-frame.json): a real queued attack at0.25× drops Marcus60→53HP, interrupts hook, and reports `clean`, `armor:none`, `locked:true`. Five frames later27stun frames remain. +1 frame advances279→280, 4.650→4.667simulation seconds.

Rendered before/after and [recoil progression contact sheets](recoil-progression.png) were inspected, including the recoil's beginning, peak and recovery, the retained front-armored action, and the blocked Saito guard. These captures are review candidates, not owner-approved art baselines.

## Measurements and AI resumption

`capture-equivalence.json` compares840native ticks across seven unchanged scenarios. HP, world position, plane, action, native stun, knockdown and time match exactly. Bruno rear is the explicit exception, retaining equal damage while gaining the intended interruption and native stun.

`ai-after-stun.json` contains actual native AI observation events, sampled states and Director requests, rather than reconstructed explanations. Seed298 observations:

| Enemy | Stun release | Next native action | Action time |
|---|---:|---|---:|
| Marcus |0.500s|hook|0.700s|
| Kevin |0.500s|knifeSlash|0.700s|
| Bruno |0.283s|oneTwo|0.750s|
| Saito |0.283s|martialPause212 — utility pause|0.833s|

No actor has an attack action while mandatory stun remains in these runs. These are fixed-condition observations, not claims that the AI always selects those moves. Existing reassessment, cooldown, Director and martial recovery remain authoritative.

## Source changes and diagnostics

- `dist/reactions298.js`: source-aware outcomes, invalidated-action ownership, native hitstun admission guards, actual release observations and shared visual clock.
- `dist/combat274.js`: correct original block/armor/non-staggering reaction classification; configured minimums/reassessment values unchanged.
- `dist/reaction-templates289.js`, `dist/enemy-reactions290.js`: consume the shared recoil clock.
- `dist/reactions-view298.js`: one original body, bounded directional cosmetic offset, fresh render receipt.
- `dist/playback265.js`: actual contact outcome, interrupted move, remaining stun and release information in captured runtime frames. The existing timeline/focus JSON displays it without replacing the developer panel.
- `dist/index.html`, render adapter and QA registry: build/version/load integration.

Existing 297/296 authored withdrawal remains presentation-only. It never preserves the old action or hitbox. Missing fresh render receipts remain N/A, rather than being represented as a verified animation frame.

## Validation and limits

`runtime-validation.json` records targeted interruption, exact-duration, guard/armor, explicit-bullet, stale-callback, direct-start, independent-projectile and native rear-kick checks. `view-validation.json` covers Marcus/Kevin/Bruno/Saito in both facings over native stun: visible complete bodies, ground soles, monotonic recoil progression, no mutation of HP/world/plane/action/stun, and actual playback telemetry. `release-validation.json` records the final full regression run and whether source inputs stayed frozen.

No new reference-video frame counts or AI rules are inferred. This gate does not certify every move, every enemy's artwork, physical DualSense hardware or human balance. Existing ordinary damage brightness, native armor sparks and block feedback remain; a broader contact-effect redesign is Gate7. Stop before Gate5.

Final frozen-source regression: **154 automated suites passed, zero failed; five manual review gates remain unexecuted.** Source fingerprint `8a24fb8a4c99956698efac8b9b5ca2e385d8d4d7956c03a75e6ffebc45656f40` stayed unchanged. Targeted runtime:751assertions; rendered checks:1,138. Automated status is `needs-review`, not artistic/hardware/stable-build certification.
