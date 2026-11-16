# Gate1 audit — master items

Approved checkpoint:195c4afdd91ca2f72e8d7e9cf31bcd176de1544b (Build318). The working documentation change recording the supplied master specification and Gate11 geography approval checkpoint is preserved.

| Area | Confirmed implementation | Gate1 action |
|---|---|---|
| Loot | core.js enemyDrop/revealFurniture; casino192, route74197, highway234, docks231 and mall props wrap the same pipeline. No single public Loot Director registry exists. | Reuse these native rolls/budgets/one-time flags; normalize collection through a shared item registry. Do not add another loot roller. |
| Health | core.js pickupHealing/pickup loop; pizza already30% maxHP, fullHeal onlyHP. | First aid also restores energy; add50% health pack; clamp all resources. |
| Energy | Energy316 plus temporary settings; legacy cell15/battery35/canister60. | Approved battery50 and canister100% capacity. Legacy cells migrate to the approved battery without adding rolls or placements. Canister editor uses percentage units. |
| Lives | Native lives/awardScore/respawn; testingUnlimited prototype flag presents infinity. | Use native lives increment; leave the existing unlimited-lives test mode unchanged. |
| Valuables | Native money/phone/jewelry award their legacy value as score. | Approved fixed cash values go only to a separate wallet. Collectible phone remains a valuable, not a smartphone interface. |
| Score | Per-hit score and native kill awards, with special cases for older bosses. | Preserve native base score and add documented danger-class bonuses from real Director/identity metadata. No automatic wallet reward on kills. |
| Ammo | NightshadeAmmo256 owns six-round capacity,3/6 clips, planned budgets, drop rates, claimed IDs and native art. | Registry delegates, without new ammo rolls/capacity. Current game has one active hero; a true multi-hero campaign is not implemented. |
| Inventory | World items/held weapons exist; no one-slot per-hero reserve. | Gate2 only; do not create it in Gate1. |
| Persistence | Room snapshots retain items and drops; Playback265 records simulation snapshots; controller/environment settings and developer presets use browser storage. No unified durable full-campaign save exists. | Add validated economy export/restore data, keep it on the run state for snapshots/transitions. Do not claim full-campaign save/load. Fresh run resets the economy; restore is replacement, never additive. |
| Input/pause | game.js pause/menus, gamepad.js DualSense/DSX/raw Sony, InputPolicy260 and diagnostics307. | Reuse native walk-over pickup eligibility; no new combat binding. |
| World | ZONES/NeonScenes71 plus native district links, subway destinations and bank helicopter choices. | Retain all routes. Gate11 geography review is mandatory before final map art. |
| Developer tools | PrecisionLab265, experiments/diagnostics307 and Energy316 settings. | Actual item/economy audit data only; full new developer UI is reserved for Gate12. |

## Scope decisions

The new registry does not introduce extra random calls or alter existing enemy/prop loot probabilities. Existing scripted supply positions remain. Legacy small energy-cell placements now use the approved battery, retaining their count and source chance. Prototype unlimited lives remain visible as infinity even though1-Up increments the underlying native counter.

Initial danger bonuses supplement existing kill points: regular0, advanced150, heavy500, miniboss1000, boss3000. These are score-only configuration values selected for the new classification requirement; existing attack damage, timing and AI are not retuned. Classification uses actual registered boss/miniBoss/strong flags and native heavy classification, with no character-name guessing.

No reserve inventory, phone, purchases, hero switching, home base, city director, messages, feed, map artwork or relationship system is implemented in this gate.
