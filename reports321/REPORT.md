# Build321 — consume needed recovery pickups before reserve

Approved checkpoint: `e3977e90bde97a16fd769d7d91e1d191d82386f4` (Build320).

| Pickup | Automatic consumption | Reserve condition |
|---|---|---|
| Pizza / Small Health Pack | HP below maximum | HP full |
| Energy Battery / Canister | Energy below maximum | Energy full |
| First Aid Kit | Either HP or energy below maximum | Both full |

Needed world pickups consume immediately through the existing MasterItems319/Energy316 controllers, even when reserve is occupied. The existing reserve item remains unchanged. Unneeded pickups enter an empty reserve; an occupied slot leaves them on the ground. Existing stored items still require manual use. Approved effect amounts, resource clamping, safe combat-state restrictions, item receipts, wallet/ammunition/lives behavior, loot probabilities and controls remain unchanged.

Changed production files: `dist/items319.js` (shared need check and automatic-first collection/exchange), `dist/item-view319.js` (empty-slot hint), `dist/index.html` (Build321/caches). Exact321 receipts compose before320 proofs. No artwork changes, new assets, damage/AI tuning, or Gate3 work.

Verification: all10 targeted suites passed,0failed. New recovery coverage:1,790 checks across all seven heroes, all five consumables, partial/full HP and energy, empty/full reserve, duplicate receipts and prohibited states. Reserve505, actual UI/input51, unchanged-combat equivalence1,353, item170, loot/RNG12, energy249, ammunition183 and controller/input suites passed. Existing recovery fixtures now assert this approved priority while retaining reserve/manual-use checks at full resources. Full outputs: `tests.json`.

The existing native seven-hero HUD fixture was rerun using full resources at storage, then simulated damage to exercise manual reserve use; captures and `visual.json` accompany this report. Browser and physical-controller testing remain unverified. No new full-game release certification is claimed. The existing durable full-campaign save limitation is unchanged.

Next gate remains Gate3; this update only corrects Gate2 pickup priority. Gate11 still requires geography review before final map artwork.
