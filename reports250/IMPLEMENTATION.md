# Worker identity and crew rules · Playtest250

Recovery checkpoint: `checkpoint-before-workers250` at `02d6fa3fe10126f3096679981321824d09050aa3` (published Playtest249). Workspace maintenance removed the prior local checkout; the unchanged source was restored from the existing Site repository before this checkpoint and implementation.

Regular name pool: **Mike, John, Andrew, Thomas, Luke**.
Heavy name pool: **Dax, Harland, Lionel, Quentin**.

EnemyIdentity233 still assigns one frozen per-instance identity. Name selection uses the appropriate variant's pool and avoids names already used by living workers. Names remain independent of the existing seeded appearance generator. Damage, attacks, falls, disarming, ordinary AI transitions, locked-battle transfer and arena reentry never regenerate names or appearances. The old normal `names` export remains an alias for compatible diagnostics; `namePools` and `namesFor` expose the explicit variants.

## Population admission

Workers233 applies one shared spawn predicate at the actual worker creation boundary:

- No more than5 living workers combined.
- No more than2 living heavy workers.
- When any regular worker is present, no more than1 heavy worker.
- A regular worker cannot join two surviving heavies. It waits until a heavy is defeated.
- Entrants, downed survivors and offscreen survivors retain their slots; defeated/fleeing actors free slots. No actors are deleted, converted, renamed or respawned to satisfy a limit.

Adaptive222's existing per-section configuration now accepts optional worker-crew and batch-size settings. Only configured syndicate Docks worker sections opt in: healthy Normal/Hard populations may reach5, Easy remains capped at3 and low-health/performance relief retains2. The worker complexity allowance supports4 regulars+1 heavy without changing other enemies' ordinary budgets. The native finite plans are retained; batching their existing rows in groups of up to5 permits real five-worker encounters without adding enemies or a third locked battle. Other sections retain their existing limits.

Adaptive eligibility checks the same spawn predicate before selection. Docks231 now safely retains a denied pending row instead of dereferencing a null actor or discarding a required wave. No second scheduler, encounter controller or AI state machine was added.

## Onscreen coordination

The existing Director148 stores a shared visible work-crew view. All living, fully entered workers within the visible combat arena join it regardless of spawn group or distance from each other. Offscreen workers never enter offensive eligibility. A rotating request priority gives actionable workers opportunities; support workers move into distinct physical flank/depth slots and a heavy anchors the group. Denied commitments lead to repositioning/waiting. Actual movement, individual startup/recovery/cooldowns, synchronized states and all existing attack definitions remain authoritative.

Director148 remains the sole attack-admission owner: Normal three-point offensive budget, at most two simultaneous commitments, impact spacing and player-response protection. Worker count never increases raw damage, animation speed or the offensive budget.

## Verification and limits

`tests/workers250.cjs` exercises the production script order: exact pools, unique living names, persistent cosmetic identities, admission failures, entrants/downed reservations, a real five-worker adaptive encounter, Easy/relief limits, onscreen membership, actual five-worker/mixed/heavy-pair attack rotation, shared reservations/budget and native roaming→locked→reentry identity. It also proves that each member actually attacks over time rather than merely receiving a menu/diagnostic label. Existing regular/heavy/grab/Docks integration tests remain required, including six heroes through five Docks sections.

The developer inspector `workers233.html` now offers five regulars, two heavies and four regulars+one heavy, with all names/HP visible in its existing HUD and actual crew diagnostics. No new artwork, sprite scaling, animation, player controls or combat move definitions were changed.

Full QA and browser results are recorded after execution. Physical DualSense, artistic approval, approved screenshot baselines, complete manual move coverage and human balance remain separate review gates; this is a playtest update, not stable certification.

## Rollback

Redeploy the retained Playtest249 Site version `appgprj_6adb9b94a3788191809a764c3e7bbb37~appgver_35169bf8c7dc8191aa7c5141af919b9e` with the existing private audience. For source inspection, use a separate worktree at the checkpoint/commit rather than destructively resetting ongoing work.

## Coordination edge-case regression

A new failing fixture demonstrated that a closer regular worker could monopolize the candidate slot while the hero was grounded, despite an eligible heavy stomp. Turn selection now filters through the same actual weighted move list and eligibility checks used by Worker AI. Grounded/airborne mixed-crew fixtures failed before this repair and pass afterward (`turn-fixture-before.log`, `turn-fixture-after.log`). The final full QA runs are repeated after this change; the earlier43-pass result is retained only as before-turn-fix evidence.
