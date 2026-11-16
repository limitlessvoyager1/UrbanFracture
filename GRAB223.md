# Build 223 — universal grabs

Checkpoint: `checkpoint-before-grab223` at `b819091a40ef2709f7f12c051e6e465f19277da6`. The pre-change findings are in GRAB223-AUDIT.md. Restore into a separate worktree to compare without overwriting later work.

## Ownership and integration

`grab223.js`, loaded after encounter-config222, defines shared eligibility, one-decision risk, post-throw state and wake fairness. It delegates contact, hold, reversal, release and animation ownership to Grab198, native hero modules and GrappleRecovery119. Native core/hero knockdown machines still own falling/get-up. No second AI, grapple controller or knockdown state machine was introduced.

Grab198 now asks this policy for classification and eligibility. Its existing synchronized retaliation timelines remain the only retaliation path. Quality169's competing repetition timers and Martial212's random initial grab rejection are disabled only when the new policy is loaded. Core and Route197 no longer generate unused random initial breaks. Broxton's paid dash uses the same visible contested hold before its existing slam.

The Smart Combat Director148 recognizes the existing retaliation contact timings and threat cost. A confirmed retaliation temporarily owns the hero interaction; unrelated existing animations and their recovery continue, but cannot add unavoidable damage or new commitments to that interaction. Their saved reservations are restored and expired rows pruned on cleanup. LockedBattles222 retains the same enemy object, protection deadline and memory through arena displacement/reentry. Its visible-arena attack admission remains authoritative.

## Rules

| Rule | Build 223 |
|---|---|
| Regular initial valid grabs | Reliable; no resistance roll |
| Heavy/Boss above 40% max HP | 0.42-second visible contested hold; one 25% roll per committed attempt |
| Heavy/Boss at or below 40% | Ordinary eligibility, no resistance roll |
| No input before contested timeout | Nondamaging release and separation |
| Failed committed attempt | Existing enemy-appropriate clinch/throw retaliation, synchronized and command locked |
| After actual throw/get-up | Regular 0.8 seconds; Heavy/Boss 1.2 seconds of grab-only protection |
| Repetition memory | Per enemy, 8 seconds; third/fourth grabs encourage a short visible step away/along the combat plane |
| Wake fairness | At least 0.3 seconds of the throwing hero's defensive actionability after mandatory recovery |
| Throw damage | Unchanged; no scaling |

Classification is independent of scripted encounter role. Marcus, Kevin, Frankie, Carmen, Flint, Saito, Akari, Jesse, Ethan, Nora and both Aidans are REGULAR. Bruno, Security, Gus, Dorian, Brick, Otis, Jackal and actual strong/boss actors are HEAVY_BOSS. Explicit overrides remain available through `grabRules223.classification` / `grabClassificationOverride223`. Dirk and the enraged pool survivor keep their existing individual exceptions. Niko's separate counter/debuff categories are untouched.

Broxton's Iron Will bypass remains intact. Dedicated counter-origin holds do not inherit the ordinary grab risk roll. Existing hero-specific special eligibility gates, including Exploding Nova's target restrictions, remain authoritative. Nova Hype retains its half damage benefit during confirmed retaliation; it cannot erase the synchronized retaliation. All directional inputs, selected actions, impact damage and synchronized completion remain on existing hero paths.

## State and fairness

An actual successful grapple impact/floor event marks a thrown target. An ordinary knockdown does not. One deadline in `enemy.grab223` owns protection; legacy gate fields mirror it rather than accumulating independent timers. Protection starts after standing, and waits for an authorized utility kip to finish. Minor hits and AI state changes do not refresh it. Death clears timers, history and owner references. Reset/death/removal cleanup releases retaliation anchors and reservations.

The response clock waits for the source throw action and shared119 ownership to end. Forced incapacitation pauses it. A voluntarily chosen follow-up action does not freeze the enemy indefinitely. This grants no invulnerability. Existing wake attacks retain visible startup and damaging contact once eligible. Only enemies already authorized to roll, kip or use wake attacks retain those abilities. Repetition movement waits for native recovery and arena reentry and respects poison and native Niko injury movement reduction.

## Diagnostics and verification

F9 includes class, HP percentage, contested timer/result, selected retaliation, protection, last throw/hero, repetition memory, get-up type, defensive actionability, response opportunity, synchronization and failed eligibility reason. Hidden `grab223.html` stages all six heroes, native/forced classification, HP, natural/forced outcomes, deterministic test seeds and frame stepping. Forced outcomes require a developer instance; reset/page exit clears them.

Run `node tests/grab223-all.cjs`. GRAB223-results.json records the completed suite results. Coverage includes six heroes at 30/60/120 Hz, inclusive 40% threshold, exactly 100 successes in 400 uniform probability samples, once-only rolls, timeout, Iron Will, paid dash, dedicated counters, post-standing timers, damage through protection, ordinary-knockdown distinction, real repeated positioning, authorized kips/wake contacts, cleanup, and an A/B comparison of all 24 directional throws against the previous implementation. Existing encounter suites run with Grab223 active, including 76 enrolled checkpoints, 64 ordinary finite-wave sections, scripted fights, mixed enemies, pressure limits and identity-preserving arena return. The established 26-suite combat entry point and gamepad/DSX/controller157 checks also run.

Browser QA covers the inspector's rendered contested hold, confirmed retaliation, regular Flint contact and main game loading. Automated checks establish timing/eligibility/cleanup contracts; a complete human Normal-difficulty balance playthrough and physical controller feel remain unverified.
