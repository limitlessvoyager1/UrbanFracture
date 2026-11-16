# Nightshade · Gate 1 foundation · Playtest251

Recoverable checkpoint: `checkpoint-before-nightshade251`, source `bb58aaaba54df67cd07e3f7835fe1ed0229a6c42` (published Playtest250). The master specification and supplied appearance reference are preserved in `art-source251/`.

## Implemented scope

Nightshade is selectable from the ordinary character menu, controller cycling and saved selection. She has110HP, the native100-point defense meter,195walk/280run/260air speed and104jump apex. These are initial above-average movement values using the existing movement/collision system. No attack armor was added.

Twenty new fixed-scale foundation frames cover idle, alternating walk/run, jump, landing, hit reaction, fall/prone, get-up, guard and a cosmetic wrist inspection. The outfit follows the supplied teal/ivory/gold reference. Frames share one import scale, use measured opaque sole anchors, and never resize in response to movement or damage. The original artwork remains in source. Art approval and screenshot baselines remain separate manual reviews.

UniqueAction251 is an extensible input admission/registration hook, not a new combat controller. R2 reaches it through the existing gamepad reader and production input pump. Nightshade's R2 no longer invokes the legacy run shortcut; other heroes retain their existing R2 run behavior without receiving a new ability. Double-tap-and-hold running remains native. Keyboard defaults toF withF/U/V choices in the existing persistent Settings menu; touch has a Unique button. L1/R1/L2/R3 mappings remain separate.

At this gate, Unique records the accepted press and diagnostics without firing. Nightshade's future-gate attack, special, grab, counter, dodge and foreign-weapon handlers are explicitly disabled so she cannot accidentally execute Reina's fallback moves. The UI labels the selection and combat HUD as a foundation preview. Existing heroes retain their moves.

## Audit and integration points

- `core.js` exported registry/actor initialization: reused, no replacement actor or movement controller.
- `gamepad.js`: existing Reader, setup and profile migration extended with Unique; physical andDSX selection unchanged.
- `game.js`: existing edge-triggered keyboard/touch/gamepad dispatch, hero cycling and portrait/HUD extended.
- `environment217.js`: existing persistent Settings controls extended with the keyboard equivalent; environment simulation unchanged.
- `nightshade251.js`: registry, scoped native-state restrictions, landing/idle bookkeeping and Unique admission.
- `nightshade-view251.js`: Nightshade-only renderer extension; other heroes delegate to the prior renderer.
- Shared148/222/223/248/249/250 systems retained. No new AI, encounter, grab, knockdown, weather or foreign-weapon state machine.

## Tests and observed corrections

- Native foundation suite:83 assertions across30/60/120Hz, character initialization, movement, double-tap run, jump/landing, damage, knockdown/get-up, prohibited inputs and other-hero isolation.
- Actual production `game.js` input pump: simulated standardDualSense, rawSony andDSX R2 press/hold/release; one event per edge, no Nightshade run alias, unchanged legacy run, L1/R1/L2 separation, keyboard repeat suppression.
- Art importer checks all20 distinct transparent frames, constant import scale, aspect-preserving nearest import, centered horizontal anchors and opaque bottom contact; running airborne strides explicitly offset8px.
- Production renderer pose matrix checks idle/walk/run/jump/land/hit/down/get-up/block/cosmetic idle and other-hero renderer/HUD delegation.
- Existing environment settings and controller157/gamepad tests executed separately and passed.
- Browser: selected Nightshade in the main game and observed110HP/100defense; inspected reference outfit/proportions and ordinary scene rendering. Developer inspector demonstrated accepted Unique input, jump/landing, knockdown and get-up returning to idle. Evidence: `browser-foundation.jpg`. This is a candidate capture, not an approved regression baseline.
- Corrected one-pixel transparent bottom padding in several frame anchors and inconsistent horizontal anchors that could cause pose-to-pose shifts. Replaced inherited Sword/Blitz ready/help labels with foundation status. Browser restart testing also caught and repaired a duplicate default that overrode the saved Unique key; fresh-module persistence tests now coverF/U/V.

Frozen initial/release QA results are recorded separately in this folder. Do not treat assertion counts as suite counts or manual gates as passed.

## Hosting storage preservation

The retained asset bundle was near the256MiB expanded hosting limit. Eighteen existing images were losslessly repacked, saving788,380bytes. `lossless-repack.json` records original/final hashes and proves equal dimensions, alpha and every visible RGBA pixel. Only hiddenRGB under fully transparent pixels may differ. Existing paths, anatomy, scale, anchors and visible art are unchanged. Inventory updates change hashes only and do not grant artistic approval.

## Remaining gate evidence and next work

No physical controller is connected in this environment. Simulated trigger coverage does not establish physicalDualSense feel, trigger behavior or comfort. Human review of the new animation/art and physical R2 verification remain pending. Gate1 is therefore an implemented, automatically tested foundation, not a fully certified stable character.

The requested next gates remain ordered: Gate2 handgun/firing/recovery/collision/enemy responses/six-cartridge HUD; then Gate3 finite level-wide ammo placement, drops and anti-farming. They are not included or claimed complete in this foundation build. Later melee/grab/counter/gadget gates are also pending. Full zero-ammo combat viability cannot be certified before standard melee is implemented.

Rollback: redeploy the retained Playtest250 saved version, or restore the checkpoint in an isolated checkout. Do not discard unrelated later work with a hard reset.

## Repeatable Gate1 checks

```sh
node tests/nightshade251.cjs
node tests/nightshade251-input.cjs
node tests/nightshade251-view.cjs
python tests/nightshade251-art.py
node tools/qa242/run.cjs --profile initial
node tools/qa242/run.cjs --profile release
```

In `nightshade251.html`, verify feet/proportions while walking, running, jumping and recovering; inspect accepted Unique serials with a connectedDualSense. HoldR2 to confirm it does not repeat or activate running. In this foundation build, R2 is an input test and does not yet fire a gun. Test keyboardF/U/V through ordinary Settings and a reload. Record physical controller identity/mapping and any visual defects before declaring the gate fully verified.
