# Build316 — PCBI Office, Talon/Jaguar and aggression-based Energy

Approved checkpoint:4808adc0f7f1e4ecfd35d747f17aec3db4b40b19 (Build315). Do not describe this build as stable or artistically certified without separate human acceptance.

## Implemented scope

The bank helicopter's Feds destination now lands outside the Local Prime City Feds Office. Eight connected sections cover the landing field, lobby, squad/cubicles, interrogation/interview, evidence/property, crime lab, optional armory and command/operations. Existing hospital destination and witness mission remain separate. Cleared rooms, items and remaining energy persist through ordinary office travel. The finale uses Talon, with the supplied personal Nightshade dialogue and alternate dialogue for other heroes; next destination remains TBD.

Talon is a160HP designated boss; Jaguar is an80HP regular agent. Legacy Spectre/Specter identifiers resolve to Talon without duplicate registry entries. Both use original PCBI artwork. Talon has timed real-projectile gunfire, a ten-round magazine/reload, baton combination/thrust/sweep/intercept, sidestep, synchronized disengagement throw and recovery-gated phases. Jaguar has real gunfire/reload, a capture-before-contact hand taser and two-punch knockdown. Character-specific move eligibility, the native Director pressure/commitment budget, firing-lane/cover checks and the single-shooter safeguard remain authoritative. A rare armory variant can include another shooter. Talon's26 bullet damage is above the existing ordinary Jesse shot24; the proposed18 would not satisfy the supplied higher-than-ordinary requirement. Existing shooter damage is unchanged.

Developer practice accepts both new enemies and the new sections. PCBI diagnostics expose actual state, eligibility rejections, decision history, ammo, phase, recovery and legal test actions. These are native simulation actions, not a separate combat loop.

## Energy

The existing golden defense/maxDefense compatibility fields remain the single resource. Passive9/sec recharge is disabled. Explicit action adapters grant LIGHT3, MEDIUM5, HEAVY7, COMBO_FINISHER10, THROW12, COUNTER8 and blocked-normal1, with per-event deduplication and action/target caps. Unknown moves, specials, ordinary Nightshade gunfire, poison and autonomous Gunner do not generate energy.

Standard/powerful/grab specials initially cost20/30/25. Actual legacy activation/payment sites now use the shared controller. HP overflow is ceil(shortfall×.5), rejects a payment that would leave HP below1 and does not discount the cost. Registered move-specific overrides use the same move ID for validation and payment. Existing defensive defaults, including Broxton's15/20 shuffle variants and Counter248 percentages, are preserved. Reina's50% Dragon Tail remains an energy-only unique action. Orion's once-per-life repair grants energy through the controller without HP overflow; its life restriction and Broxton's Iron Will cooldown remain unchanged.

**User exception: blocking is unchanged.** Existing block eligibility, costs, chip ratios, restrictions and guard-break behavior remain authoritative. The attachment's proposed weakened zero-energy guard is not implemented.

Original energy pickups restore15/35/60, collect once and clamp to capacity. Low-probability enemy drops preserve existing drops and practice does not farm additional energy drops. Office placement uses native item collection and reachable ground coordinates. Major mission zone events use a configurable40 minimum, preserving higher energy; room changes never refill it. Financial travel no longer forces a100-point refill.

The Energy developer section shows actual events, capacity, gains/spends and overflow. Shared/hero/recorded-move overrides remain separate from immutable approved values. Value/move/hero/subsystem restoration, confirmation for broad resets, Undo/Redo/history, safe queued application, explicit presets, previous snapshots and export are provided. Restart restores approved values; saved presets are never loaded silently. Defensive costs use hero/subsystem scope. Counter costs are validated together to prevent negative confirmation charges.

## Evidence and limits

- `ENERGY_AUDIT.md` identifies native resource readers, costs and compatibility risks before implementation.
- `pcbi-gates.json` and `tests/pcbi316-gates.cjs`: native timings, projectile damage/avoidance, reload, interruption, capture/release, recovery and character-specific registration.
- `tests/energy316.cjs`:244 focused assertions across generation, native heroes, spending/overflow, unchanged blocking, pickups, restoration/presets, safe move pricing, restart and defensive overrides.
- `tests/feds316.cjs`:88 route/mission assertions, including bank-preserved values, return portal coordinates and four hero intros/finales.
- `visual.json`:17 native rendered captures. First render pass caught landing-height and test-scenario setup issues; the retained captures use legal actions and authored weapon sockets. Static captures are not complete motion/video or live-browser certification.
- `energy-balance.json`:18 seeded trials, three heroes×Marcus/Bruno/Jackal×baseline/current. The baseline completed5/9 and current policy completed5/9 scripted encounters; the energy version used118HP overflow and spent48.48seconds at zero. This is a limited scripted comparison, not a human balance approval.
- Managed preview returned its local URL, but cloud-browser navigation timed out. No live-browser or physical-controller certification is claimed.
- The first full run had182passes/31failures and is retained in `first-full-release.json`. Confirmed dodge/practice-isolation faults were repaired; obsolete HP-cost/placeholder assertions were replaced with current-behavior checks. The source-proof helper now uses a literal callback replacement, avoiding JavaScript dollar-expansion in minified source. Two historical movement equivalence proofs explicitly isolate the later Energy system, while current-runtime Energy tests exercise it. No failed suite is waived. The final release report must be checked separately; preliminary/interrupted runs are not final evidence.

## Asset and source preservation

Eight original office crops, fixed-anchor PCBI frames and three original energy pickups are retained with prompts/source art. Two attempted Talon bridge sheets failed identity review and were not imported. Jaguar's accepted bridge frames are isolated and validated; the original96 base frames remain unchanged. Four large existing backgrounds have explicitly recorded reversible derivatives: dimensions/alpha unchanged, maximum decoded RGB difference1/255, verified original/current hashes. This is not pixel identity or blanket art approval. All four originals are preserved. `asset-validation.json` enforces these limits without replacing the retained inventory.

`tools/feds316/approved-source-lines.json` records exact changed source lines against Build315. Historical byte proofs reverse these exact receipts, while current-runtime tests exercise the new behavior. No broad source exclusion or damage/timing waiver is used.

## Final verification

All214 automated suites passed on the frozen source,0failed,0missing; source remained unchanged during the run. Five manual categories remain unexecuted. Afterward, six explicit files corrected event-level grab energy classification and agent phase diagnostics/disarmed baton eligibility and the PCBI HUD classification label, with added native assertions. All18 affected integration, UI, controller, balance and rendered-scene rechecks passed. All other frozen inputs, including artwork, remain byte-identical. See FINAL_VERIFICATION.json for exact fingerprints, delta and evidence. No failed suite was waived.

The final grab adapters distinguish knees/body strikes, finishers and throws for all seven heroes; Forest companion bites generate no energy. PCBI diagnostics distinguish startup, active contacts, follow-through and recovery, show scheduled frames versus resolved events, and retain reload/phase states. These changes do not modify damage or move timing.
