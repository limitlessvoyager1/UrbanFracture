# Gunner tactics173

Checkpoint: `checkpoint-before-gunner173`, source05b7af97f004e3a45be43ed50b3e84ac014143ad. Existing world, scenery, enemy definitions, Forest move timings and companion animation atlases are retained.

## Player flow and HUD

Selecting Forest opens CHOOSE GUNNER’S TACTICS. Balanced is the fresh-session default. Arrows or DualSense D-pad/stick navigate; Enter, × or Options confirm. Selection persists in this game instance across rooms/retries. Pause/resume does not reopen the menu. After an area is clear, pause and choose GUNNER TACTICS (G / L2 also opens it) to change the next area's profile. A new browser session defaults to Balanced; this is session persistence, not an additional full-game save system.

The pixel HUD uses a teal paw, orange crossed swords, blue shield or gold compass. READY means commanded moves remain possible, including while AUTO cooldown is visible. ATTACKING, RETURNING, STUNNED with timer/progress, RECOVERING, RETRIEVING and SEARCHING describe actual companion tasks. Selected mode stays visible. The indicator occupies x610–811/y38–65 in the960×540 HUD, away from player bars, charge, portraits, score and level name. Reduced-motion suppresses activity emphasis. No new sprite or combat-animation artwork was introduced.

## One controller and four profiles

| Profile | Independent attack CD | Protection CD | Retrieval CD | Follow distance | Attack damage | Priorities and limits |
|---|---:|---:|---:|---:|---:|---|
| Balanced |18s|25s|35s|105|5|Moderate offense; protection below50%, emergency knockdown guard below30%; existing health at50% or lower. No hidden search.|
| Offensive |12s|35s|45s|140|9|Vulnerable nearby targets, farther roaming/exposure; emergency protection below20%, retrieval below30%.|
| Defensive |30s|18s on success|40s|60|3|Closer escort; monitoring radius grows as health falls; emergency knockdown guard. Intercept damage4 trades damage for protection.|
| Tactical |20s|30s|20s|115|6|Targets must be at/below25%HP; retrieval at/below85%HP; finite designated searches. At least20s between tactical automatic actions.|

The existing12s shared automatic cooldown also applies. Per-ability timers are never reduced by changing mode. Remaining cooldown, stun and immunity durations survive level/retry clock resets. A genuinely new run starts fresh timers and cache inventory. Commands take precedence and do not consult automatic cooldowns; stun/recovery still gate them. Existing synchronized moves retain their owner, target, damage and animation clocks when modes change.

`companion126.js` remains the single task/state machine: its scan/task hooks consult `gunner-tactics173.js` profiles. Protection, knockdown guarding, item reservation/carry/delivery, stun and recovery stay in126. `combat134.js` keeps synchronized commands, continuous gait and follow hysteresis, with a profile leash distance. No second companion tick controller was created. Diagnostics map legacy state names to ProtectForest, GuardKnockedDownForest, RetrieveItem, ReturnToForest and Reposition where appropriate.

Independent attacks have a visible0.2s warning, require real distance/path contact, use normal damage/guard rules, do not knock down, and reject armor, invulnerability, inactive/airborne/downed actors and incompatible synchronized owners. Protection rejects boss/uninterruptible actions. The existing enemy director's3-point budget, two-commitment limit and one-Gunner-attacker restriction remain unchanged.

## Finite supplies

Only Tactical searches. There are explicit level-local cache markers (start+600/end−650, ordinary floor lane), replaceable with a level's `gunnerSearchLocations173` metadata. Only visible, nearby, unobstructed locations qualify; close enemies abort digging. Locations are remembered across retries. The whole run has only three searches with rewards12HP, empty,18HP: at most30 hidden HP total. A unique cache ID creates at most one item. Existing pickup identity, reservation, carry/drop and heal rules are retained. Searches do not create weapons or reroll supplies.

## Developer tools

F9's existing dashboard now includes GUNNER AI: mode/state, target, leash, per-ability/shared timers, stun/immunity, last auto/scripted/failed command, target eligibility reasons and measurements. Controls switch mode, reset auto cooldowns, inject a test stun, request an eligible attack/interception or retrieve an eligible item. Tests safely report no eligible target/state instead of bypassing protected attacks. These controls are developer-only. F9 JSON exports include the Gunner173 report.

## Controlled measurements

72 seeded live-AI fixtures: four modes × three situations × three seeds × two simple Forest policies;60s cap, one life, no enemy-stat changes. Situations are Marcus/Kevin brawl, Bruno/Marcus pressure and Marcus/Jesse supplies. These are engine probes, not human difficulty certification. All remained within the existing3-point enemy-pressure budget.

| Mode | Clears /18 | Survived /18 | Independent damage total | Interrupted-strike damage estimate | Items retrieved | Hidden items found |
|---|---:|---:|---:|---:|---:|---:|
|Balanced|6|6|10.0|10.0|6|0|
|Offensive|4|4|27.0|0.0|6|0|
|Defensive|6|6|24.0|66.0|0|0|
|Tactical|6|6|0.0|0.0|7|12|

Offensive produced the most independent damage; Defensive prevented the most nominal strike damage; Tactical retrieved/discovered the most supplies. No profile led all outcomes. Raw records include Forest damage, interrupted enemies, health retrieved, stun count, time away, completion time and survival. These short fixtures produced no Gunner stuns, so dedicated stun/immunity regressions cover that behavior. Prevented damage is an estimate based on the interrupted strike, not a claim that the player would necessarily have taken full damage without the intervention. Human balance sessions and physical DualSense hardware remain unverified.

## Validation

Focused tests cover four profiles/icons, real contact/target exclusions, scripted priority during auto cooldown, preserved committed moves, real interception/retrieval, finite search rewards/no duplicate pickups, mode/clock reset protection, stun/recovery and post-stun immunity. Standard/raw DualSense and DSX Reader outputs drive the menu adapter with direction edges and ×/Options confirmation. Browser checks cover Forest selection, Balanced default, arrow/Enter confirmation, gameplay HUD and F9 controls. Existing current150 combat, cabin168, environment162/integration, gamepad and controller157 suites are retained. Test output: reports173/tests.txt; raw balance: reports173/balance.json. Pixel UI is code-native and uses existing animations/assets.
