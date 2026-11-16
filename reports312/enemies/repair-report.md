# Recording 312: enemy corrections

Video reviewed: uploaded 2026-11-10 10:52:38 recording, particularly99–100seconds. Native render captures were compared with the video rather than inferring internal causes from appearance alone.

## Confirmed causes and corrections

- Kevin's grounded and rising appearance changed to a white/gray shirt and a different hair/face. `review287-view.js` fall family and `sprites.js` Update22 getup family used inconsistent authored bodies. New original sixteen-pose Kevin artwork preserves curlyhair, tattooed arms, greentank, charcoalpants andbrownboots through recoil, fall, impact, ground andrising. Native fall andgetup clocks stay authoritative.
- Bruno's burgundy tank and pants were consistent, but his face/body changed across296reaction artwork versus his idle source, visible at99–100seconds. A new original sixteen-pose family uses the actual idle squareface/shortdarkhair/redtank identity. New bodies are painted whole, without mesh distortion, rigid-body spinning or opacitycrossfades.
- Kevin's knife release required a clear telegraph and an explicit handoff after release. Final view now explicitly shows original262 windup/release/emptyguard frames at native frame0/7/17/26. Actual release remains17; total timing unchanged.
- Entrance movement can reach render branches that present a stance or limited gait, especially weapon/entry branch combinations. Final entry presentation uses whole-body gait poses driven by resolved logical displacement. Existing281 already tracks ordinary movement;312 extends explicit entry observation and final presentation ownership rather than adding anotherclock or rootmotion.
- Thrown physical projectiles lacked a shared provenance used by hero reaction presentation, and the legacy `thugCannotInterrupt` exception could prevent hero interruption for thrown attacks. Only actual thrown physical contacts now use249 weapon armor penetration, record actualHP loss andnative stun in `projectileImpact312`, andinvalidate an unresolved attack if native stun was applied. No force flag, invulnerability bypass, invented damage, or global melee rewrite.
- Frankie chain lash, sweep andrise now each have+4startup/+2active/+6recovery frames. Damage, range, cooldowns, weights andhitcount unchanged. These timing increases are explicitly authorized by the current user.

## Files

Simulation: `dist/recording312-enemies.js`, after unique311 andbefore woods139 boundary.
Presentation: `dist/enemies312-data.js` then `dist/enemy-view312.js`, after existing style310/unique311 presentation.
Original art: `dist/assets/enemies312/{kevin,bruno}-reactions.webp`.
Generation sources preserved outside shippingdist: `reports312/enemies/source/*.png`.
Pack script: `tools/recording312/pack-enemies.py`.

All synchronized paired grapples, scripted ground owners, electrified states andspecial owners delegate to existing renderer through shared blocked-owner guards. No game balance file is permanently mutated; module load adapts approved definitions for explicitly requested Frankie changes.

## Verification

- `node --check dist/recording312-enemies.js`:PASS.
- `node --check dist/enemy-view312.js`:PASS.
- `node tools/recording312/enemy-test.cjs`:PASS. Three chain timing deltas, unchangeddamage; actual enemy projectile stun; actual hero combo interruption; enemy/hero invulnerability still reject projectile hits.
- `node tools/recording312/enemy-view-test.cjs`:PASS. Allfour explicit Kevin throw poses; native17release; fourfallposes; grounded andrising authoredposes; correct ownKevin/Bruno family; fixed137logical standingheight. Actual source/runtimelog in `visual-test.json`.
- Native render inspected: `before.png`, `after.png`, `throw-reactions-after.png`. Ownidentity, completebodies andfloor anchors verified visually.

## Scope and limitations

The captures use the native sprite pipeline and native simulation fixtures, not a new entire airport playthrough. Integration ordering and controller-route gameplay remain for the owning agent's final build checks. Airborne paired/special throws remain delegated to their choreography owner. No newenemy AIaggression or othercharacter timing/damage changes were made.
