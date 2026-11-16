# Casino level192

Reversible checkpoint: `checkpoint-before-casino192`, source3497d13b2755940bab8b1df158d7752ff410eb3c.

## Playable route

Scene Select → Level4 · Casino → Gaming floor. Three new scenes are available for direct starts/retries; the existing Downtown destination fork and unfinished Governor boss are preserved.

- Gaming floor:2800world units; slots, blackjack/poker tables, roulette, high-limit lounge, dressed-up diverse patrons playing in the rear plane, gold penthouse elevator. Eight paced opponents, including two separated Security guards.
- Penthouse:2600units; lounge, fireplace, dining room, bedroom, window wall, rear glass patio door. Six opponents with two separated Security guards. Interior lighting stays warm while masked window glass reflects the shared time, clouds, fog and rain. Rain does not enter the suite.
- Pool terrace:2000units; pool, bar, loungers, side tables, glass rail and city skyline. Three supporting opponents, including one Security. Player stays on the dry deck. After clearing support, the boss staging area remains available with a future-boss notice. No invented boss, fake boss victory or automatic campaign ending.

Clear all living/queued enemies and settle defeated bodies before walking up to the marked elevator. The elevator has a walk-in, fade, short ride and arrival. Clear the penthouse before using the rear patio door. Transitions preserve the actual hero, world clock/weather, companion state and Iron Will cooldown. Combat floor roots442..510 match the rear floor430. Backdrop depth uses one unique panorama per section; the world-locked foreground floor and all combat props use the actual game camera. No repeated room tiles or stretched architecture.

## Destructibles and loot

Exactly five interactable slots at330/840/1350/1860/2370. Each has18HP and exactly one50% roll when destroyed. Each successful roll creates exactly one ordinary collectible. No global enemy-drop cap silently suppresses that50%. Four additional games/card tables have16HP and30% drop chance. Background machines/tables remain scenery. Walking or enemy overlap cannot silently topple machines or roll loot. Real attack contact/facing/depth and per-action hit sets apply; ordinary attacks from all five heroes are supported. Broken art, debris/impact events and ordinary pickup/score/health collection are reused. No extra lives or progression items. Loot uses an independent seeded RNG, not the AI stream. No real wagering or money transactions.

## Security

130HP, black shirt/cargo trousers/boots, white SECURITY back lettering, recognizably muscular Bruno silhouette. Existing `enforcer` archetype plus `casinoSecurity192` identity retains strong-enemy grab/counter thresholds, status resistance, wake rules, armor calculation and Director pressure budget. Otis remains unchanged. `spawnCasinoSecurity192(x,y)` is reusable by appropriate future encounters.

Aggressive94-unit approach, punch strings,19-damage front kicks and existing heavy throw/capture. Punch strings are15% stronger than ordinary Bruno strings. Recognizable ≥.30s startup; existing narrow active armor windows, not permanent invulnerability. Every string completes its recovery. After a string,35% chance of a shorter.30s opening before one follow-up; at most two consecutive commitments. Otherwise a.72–1.02s explicit open interval and.90–1.15s cooldown. Guards cannot guard during this open interval. Only one living Security can be active; two floor placements are1100units apart and suite placements1310apart. Shared Director3-point/max2-attacker pressure restrictions remain authoritative.

## Visual comfort

Steady neon and chandelier artwork; no casino strobe, flashing reels or repeated bright full-screen pulses. Small card/roulette/water details move slowly and stop under system reduced-motion preferences. Casino pool lightning flashes are suppressed while its global weather simulation continues. Ordinary game combat feedback is unchanged. This is a design precaution, not medical certification.

## Art and source

Built-in ImageGen produced the three panoramas,16-pose guard atlas and6-prop atlas. Prompt set: `design/casino192-prompts.txt`. Runtime editable assets: `dist/assets/casino-{floor,suite,pool}192.webp`, `dist/assets/sprites/casino-security192-0..15.webp`, `dist/assets/sprites/casino-props192-0..5.webp`; metadata `dist/casino192-data.js`. One fixed guard import scale; no pose-specific body scaling. Lift torso uses original guard boots/legs for an intact planted silhouette; back lettering stays readable when mirrored.

To fit the existing static artifact limit, three existing PNG atlases (Gunner125, Carmen walk, Broxton spear) were encoded as lossless WebP. Decoded RGBA bytes were compared exactly, including transparent pixels; all match. Original PNGs are retained in `art-archive192/`, and all HTML/script references/cache versions updated. No visual or combat change to these assets.

Simulation: `dist/casino192.js`; rendering: `dist/casino-view192.js`; main HUD/scene/retry integration: `dist/game.js`/`index.html`. Security dispatch is inside the existing core AI→Audit/Director chain. Developer inspector: `casino192.html` (section/camera/day-night/prop hits/clear/transition controls).

## Verification

`tests/casino192.cjs`: all5heroes×3rooms, shared world/cooldown continuity, exactly5slots,50% threshold and one-roll limit, old drop-cap independence, all-hero actual punch contact, non-destructive movement, spaced130HP guards/maxone, clear-gated elevator/patio, boss placeholder, startup/active armor/recovery and Director budget. Existing current15026-suite regressions, gamepad/controller157, environment162/integration156, Niko air191, Broxton179, animation189 and Government182 pass. Browser inspected casino scale/patrons/uniform, elevator marker, penthouse rain/night and pool deck. Physical DualSense hardware and human difficulty balance remain unverified.

Reinforcements walk into the playfield from its right edge at the same grounded depth; they do not materialize next to the player or drop from above. The reserved pool boss scene rejects further transitions until a future encounter is defined. Fullscreen was unavailable in the remote preview browser, so visual verification used its normal game window.
