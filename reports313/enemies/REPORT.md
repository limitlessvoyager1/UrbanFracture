# Stadium enemy corrections — Build 313

## Confirmed defects and corrections

- **Baylor changing into Bruno:** generic enforcer presentation, knockdown and grapple-family selectors admitted Baylor. Six narrow identity exclusions in `source-patches.json` keep him in his own original family, including joint grapple composites. Final presentation owns his identity in every state.
- **Baylor helmet disappearing:** original native bodies 8–15 actually omit the helmet. Original repair counterparts preserve those bodies, contact clocks and common scale, with helmet/faceguard retained. His intentional helmet-removal attack remains native; he returns to helmeted guard afterward.
- **Baylor sliding:** native gait reused insufficient poses. Eight original heavyweight walking poses now follow resolved world displacement; movement speed and attack timing remain unchanged.
- **Baylor permanent armor:** ordinary successful hits apply the existing reduced damage and armored feedback while preserving his action. Native weapon penetration and force/grab exceptions remain effective; invulnerability still rejects hits. Mandatory recovery and AI budgets remain unchanged.
- **Frankie attack size:** the confirmed defect is mismatched source anatomy between slim upright idle and broader authored chain attack family, rather than demonstrated scale multiplication. Matching combat-ready guard and attacks use the same family at fixed scale. Authored per-frame wrist sockets place chain links around the punching wrist through anticipation, contact and recovery.
- **Flint floating:** the idle/guard source has a detached black fragment below the connected boot sole. Raw alpha bounds falsely appeared grounded while the boot was 15 units above ground. Connected-sole anchoring ignores the detached fragment and places the boot at local −1. Unowned leftover grapple elevation is cleared; actual airborne, grapple, environmental and prone owners remain untouched. Logical lane and scale remain unchanged.

## Evidence and verification

`before.png`, `after.png`, `baylor-original-poses.png` were rendered from the real runtime and inspected. `runtime.json` and `visual.json` contain reproducible assertions. Run `node tools/enemy313/runtime.cjs` and `node tools/enemy313/view.cjs`.

Runtime checks cover idle/active permanent armor, damage receipts, weapon penetration, invulnerability, ordinary-enemy isolation and stale Flint elevation without lane movement. Render checks cover eight Baylor gait phases, all eight helmet repair poses, return identity, fixed Frankie family scale, wrist-chain display and eight Flint grounded phases.

Original generated PNG sources are retained in `source/`; shipping WebP atlases are imported by `tools/enemy313/pack.py` using common anatomical scale, not independent frame normalization. New code: `dist/recording313-enemies.js`, `dist/enemy-view313.js`, `dist/enemy313-data.js`. Historical selector changes are recorded exactly in `source-patches.json`.

## Limits

The local 20-second stadium recording confirms the Baylor identity substitution. The exact paused Flint screenshot state cannot be reconstructed from that clip; native guard/walk/punch and stale-elevation fixtures cover the confirmed source defect and ownership issue. These checks do not claim a full campaign visual audit.
