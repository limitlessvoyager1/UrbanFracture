# Uptown Normal combat audit — Build 135

Checkpoint: `checkpoint-before-normal-audit135`, source `7b42b5e7e6346df064e1d62a0298b3a390cc9dc9` (deployed Build 134). All existing art, characters, routes and DualSense bindings are retained. No base damage or health tables changed.

## Confirmed defects and repairs

| Finding | Evidence | Repair |
|---|---|---|
| Reina's extended standing strikes used one contact instant | A controlled target entering the visible jab after frame 4 previously missed; the full-body extension remains through frame 6 | Check the existing anatomical strike segment during jab 4–6, cross 5–7, push kick 9–12 and final kick 12–15; each target can be contacted once. Existing reach and 26-unit lane limits remain. No blanket hitbox growth. |
| Bruno's armor helper protected the whole action | `DragonTail121.armor` previously returned breakable armor throughout oneTwo/hook/frontKick/uppercut, and Reina's combo converted it to stagger protection | A shared classifier limits normal strong attack armor to each actual contact minus .10 through plus .09 seconds, with at least .12 seconds vulnerable startup. Later Bruno hits use their .30/.53/.78 events. Startup outside the window and recovery can react normally. Damage still applies through armor. Explicit protected moves, counter commitment, boss phases and wake armor remain distinct. |
| Different enemies could reopen the player's hit immunity | Several `linked` branches set `p.inv=0` whenever the player was staggered, without checking who last damaged them | Only the same attacker AND same live action may continue its established string through its own hit immunity. Full enemy strings and their damage remain. |
| No common admission rule for specialist/ranged actions | The old local two-attacker check did not cover all AI paths | Uptown Normal uses a shared 2.25 pressure budget: regular melee 1, strong/ranged 1.25, at most two commitments. A secondary needs an actionable player, compatible approach side and .34-second spacing from every predictable hit, including later string hits. Projectiles retain their owner's reservation. Deferred actors approach/reposition within real floor bounds. |
| Forced unrelated damage could bypass a held state | `force`/`grab` damage could bypass the generic held-victim rejection | Only the holder/session attacker can damage the victim during an enemy's noncancelable hold. This grants no free-roaming invulnerability and does not cancel existing enemy abilities. New attacks wait while the player is held, down or staggered; admission leaves a .24-second response beat when control returns. |
| A regular clinch snapped the victim to the hold offset | Capture assigned its final x/y immediately | Ease the ordinary escapable clinch into its existing anchor over .14 seconds, aligning the holder's lane smoothly. Existing synchronized powerbomb/counter sessions remain intact. Three real Attack/Jump edges still escape during the existing window. |
| Frankie inherited unnecessary generic getup immunity | The generic wake branch excluded Marcus/Kevin but not Frankie | Frankie joins those ordinary enemies in receiving no generic getup immunity. Strong wake armor/boss protection and Carmen's established tactical wake behavior remain. |
| Independent anti-air cooldowns permitted group chains | Each enemy owned its own two-second cooldown | Uptown Normal shares one commitment per airborne episode and a .85-second encounter gap. Startup is at least .28 seconds; the added startup extends total duration, retaining recovery. Individual cooldowns and anti-air abilities remain. A later independent jump is eligible again. |

## Developer tools

During play, **F8** toggles the overlay; **F9** opens the hidden statistics dashboard with JSON and CSV export. No controller buttons were reassigned. Data is local to the running browser and resets with the game.

The overlay shows anatomical contact references, logical ground-plane contact zones, Reina/Forest strike segments, facing, target, lane difference, action frames/phases, armor/invulnerability/wake state and recent hit/miss reasons. General body rectangles are anatomical references for segment attacks; legacy root-coordinate attacks use the separately drawn logical contact zone. These are not newly enlarged collision boxes. Specialized cinematic moves continue using their established paired-contact logic.

Telemetry records actual HP deltas and attempted damage with source identity/action, requested and applied amounts, victim state, defense, block/evade/counter eligibility, counter timing, grab/stagger/recovery status and simultaneous commitments. It also records player hit/miss outcomes, counter results, grab/escape inputs, knockdowns, enemy action frequency, time committed or involuntarily locked (separate reason counters), armor/wake activations and damage by encounter/source. Encounter episodes run from the arrival of hostiles until none remain, separately for each area.

Exports retain the newest 6,000 detailed events with an explicit dropped-event count; aggregate totals remain. The recent overlay trace is limited to 80 entries. Eligibility is an engine-state observation, not evidence that a human could react within that frame. Projectile/detached events whose original move is unavailable are explicitly labeled rather than assigned a guessed move.

## Recording: the 92 → 15 interval

Reviewed the supplied 69.73-second recording, including closer samples around 0:44–1:04. The displayed 92/110 to 15/110 decline is approximately 77 HP. The sequence includes captures, knockdowns and short returns to standing amid multiple nearby enemies. It does not establish a single continuous stuck-animation state.

The recording has no engine collision log, replay seed or controller-input telemetry. Therefore an exact source-by-source reconstruction or a claim that the player failed a particular block/escape is not supported. OCR of the small HUD was unreliable and was not treated as an authoritative damage ledger. The source audit independently confirms overlapping-attack admission and cross-attacker linked-immunity defects, both of which can contribute to excessive pressure. This is evidence of a stacking risk, not proof that those defects caused every point of the recorded loss. No enemy damage was reduced on that assumption.

The new report provides the requested exact event ledger for subsequent playtests. Further human playtesting with that export is needed to judge overall Normal difficulty; this build is a combat repair and observability checkpoint, not a claim of completed balance certification.

## Validation

- Targeted Build135 tests: late active contact, exact-once damage, facing/depth/protected whiffs, opener confirmation, all four hero HP values, vulnerable/armored/recovery Bruno timings, damage through armor, source-owned links, held-victim safety, actual escape input edges and bounded clinch alignment.
- Admission tests: primary/conditional secondary, later hits in strings, ranged budget, locked-state deferral and separate-jump anti-air reset.
- Isolated defense tests: front blocking mitigates Bruno's complete string, a paid timed evade avoids a punch, and Reina's actual counter executes without taking the intercepted hit; success is recorded once.
- Fifteen established suites run against the complete new module chain: combat134, charge130, Reina counters130, weapon counters122, Bruno130, grip124, reap/recovery119, Forest counters127, companion126, combo-confirm129, German123, Nova DDT116, live controller134, Uptown controller129 and startup133.
- 240 seeded engine simulations: four heroes × five encounter compositions × director on/off × passive/periodic-defensive scripts × three seeds, up to 20 seconds each. Compositions cover standards, Bruno alone, Bruno with standards, melee/ranged and four-enemy groups. Full results: `design/audit135/controlled-playtests.json`.
- These scripts are stress tests, not human skill models. Director-enabled runs respect the two-commitment ceiling; director-off runs can reach three. The periodic defensive script still takes substantial damage and is not evidence that the level is now easy or fully fair. No damage/aggression nerf was inferred from those totals.
- Browser QA: live Uptown rendering, F8 overlay, F9 statistics and real JSON/CSV downloads. Standard/raw DualSense/DSX inputs are simulated by the existing controller harness; physical controller hardware was not available.

## Remaining limits

1. Capture a fresh human Uptown playtest plus its JSON export to assess pressure around grabs/knockdowns with actual event attribution.
2. The director is deliberately scoped to Uptown Normal. Downtown, Easy/Hard and scripted boss encounters retain their existing admission behavior; global collision/armor/link fixes are regression tested with existing heroes.
3. Existing art was preserved. No broad sprite redesign, attack/jump scaling, or speculative gait rewrite was performed.
4. Overlay root zones describe legacy collision predicates. Cinematic anchor quality still requires visual review in the existing grapple inspectors; their shared-clock/recovery regressions remain passing.
