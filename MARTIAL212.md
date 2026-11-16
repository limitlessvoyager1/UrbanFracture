# Build212 — Saito and Akari

Checkpoint: `checkpoint-before-martial212` at Build211 (`ee0fcc644744087b2576a9bc0a6f0a8c52c04723`). Supplied specifications retained in `design/martial212/` exactly as provided (both end mid-section). Implementation follows the supplied portions and keeps existing later campaign placements.

## Audit and integration

The active actor factory in core.js establishes Saito90HP and Akari72HP. Neither is increased. Akari's combo24, flying16, intercept14, anti-air13, punch counter18, kick counter20 and grab reversal17 are below Saito31/20/18/17/23/25/22 respectively.

The Build205 Enemy Field Guide pages11–12 were checked against the active source: both HP values, violet Akari identity, flying approaches and conditional offensive recoveries match the retained foundations.

Confirmed legacy defects: encounters.js automatically rejected eligible frontal HP damage; every other block queued retaliation; wake-up truncated knockdown clocks and forced a proximity attack; combo tick chased its target; native finish added1.05s after attack timelines; shared anti-air padded faster starts. Forest's input-time category omitted martial kicks. Build212 replaces those paths only for these enemies, inside the existing specialist AI dispatch and native enemyAct / advanceHeroAction flow. No competing global AI controller, second Director, or replacement damage engine.

Both keep existing body/costume artwork and connected walk52 frames. Animation poses use the existing atlas at fixed import scale, sole anchors and the existing outer actor scale. Akari has a lowered snap kick, turning body kick and spinning hook, plus a roundhouse flying pose; Saito uses front/turning/heel kicks and a flying side-kick pose. Native119 owns successful counter/throw victim recovery. Captured-limb anchors, movement and damage follow one action clock; no damage at interception.

## Frame data at60Hz

Each tuple is startup / active / transition-or-final-recovery. Transitions precede the following strike's own startup.

| Move | Saito | Akari | Base damage |
|---|---|---|---|
| Three kicks |14/4/7 →17/5/8 →22/6/32|11/4/6 →14/4/7 →18/5/26|8+9+14 /6+7+11|
| Flying kick |23/7/36|19/6/30|20 /16|
| Blitz intercept |13/5/30|11/4/25|18 /14|
| High anti-air |15/6/29|12/5/25|17 /13|
| Punch counter retaliation |20/4/24|16/4/22|23 /18|
| Kick counter retaliation |23/5/28|19/5/24|25 /20|
| Frontal grab reversal |28/1/25|24/1/23|22 /17|
| Nearby wake attack |20/5/31 rising kick|18/5/29 low sweep|14 /12|
| Non-attacking kip-up |27 total|24 total|0|

Outgoing damage still passes through existing Normal difficulty, blocking, Iron Will, statuses and hero protections. No new damage multiplier or armor. A missed combo opener disables later hits and completes the listed final recovery. Flight direction/lane lock at launch; travel175/185 units, visible arc, no homing. Sidesteps travel bounded62units maximum over25frames plus12frames recovery, with no extra invulnerability.

## Defense and AI

Visible incoming actions are observed after.15s. One roll per incoming action, not repeated every tick. Attack classification excludes weapons, confirmed synchronized moves and explicitly unblockable specials. Counter attempts reserve the existing Director budget; success is confirmed only by an eligible actual incoming damage contact during the counter-ready window. Failed preparation has22frames vulnerable recovery and no last-minute guard conversion. Frontal grabs reverse at12.5%/10%, only before confirmed acquisition; rear and special/counter-protected captures remain weaknesses. Strike counters4–5s, reversal8–10s, intercept6s, flight5–7s, evasion5–7s, high kick2s. Cooldowns survive interruption/knockdown.

Saito uses25/25/20/20/10 controlled advance/pause/guard/combo/flying relative priorities, filtered by range and eligibility; three consecutive pauses force an offensive decision. Guard attempts40%,55% for observed repetition; strike counter22.5%,32.5% for repetition. Low Composure reduces defensive confidence, recovering gradually over10s. Composure never changes damage, armor or movement stats.

Akari's boundary-only modes use50/35/15 relative weights, modified by observed pressure and repetition. Assertive2–4s, Defensive2–3s, Deceptive.6–1.2s. Momentum increases from clean hits and visible retreat under pressure; drops on misses, throws and interruption, returning to neutral over8s. It affects selection only. Counter attempts17.5%,22.5% defensive,32.5% deceptive; guards30%/40% repetition. Feigned recovery is a voluntary.6–1.0s planted-foot bait,10–14s cooldown. It never cancels genuine recovery. Unsuccessful bait response commits to vulnerable recovery.

Guard has7frame raising vulnerability, finite meter and18% chip on valid frontal contact. Side/rear attacks, throws and unblockable specials bypass it. There is no automatic counter after a block. Intercepts and anti-airs use actual contact and shared admission; Iron Will retains its own50% damage and resistance rules.

Early Downtown specialist appearances are solo: pending arrivals wait for existing enemies to clear, and ordinary reinforcements wait while a specialist lives. Middle encounters permit one specialist with one Marcus/Kevin. Later encounters permit two specialists or a small group within existing3enemy spawn caps. Existing finite spawn references remain unchanged. The single Director retains3points /2attacker limits.

## Wake fairness and diagnostics

Ordinary knockdowns retain at least.40s; player throws at least.70s, heavy throws.95s, plus native119 ownership/recovery ordering. No offensive wake before the hero has.30s of defensive actionability after the synchronized throw. Nearby wake selection is22.5% Akari/25% Saito; otherwise non-attacking kip-up. Neither has wake armor.

`NeonCombat.Martial212` exposes definitions and geometry; `Audit135.report(game).martial212` reports mode, Momentum/Composure, exact timelines, contacts, hand anchor, guard/meter, counter results, cooldowns, wake opportunity and history. `martial212.html` provides actor/hero/move selection, staging, playback and single-frame stepping.

## Validation and limits

`tests/martial212.cjs`: both enemies at30/60/120Hz and both facings; HP/timelines; distinct contact events; invalid opener; no armor; startup/active/recovery interruption; front chip/rear/unblockable bypass; actual contact counters/no early retaliation; failed commitment; all six hero grabs, flight plane, finite cooldowns, early/middle crowds; six-hero actual synchronized throws; anti-air admission/contact; one response per incoming action;12seeded40s mixed groups; mirrored native manual counters; rear grab weakness; all three boundary-only Akari modes.

`tests/current212.cjs` runs Flint211 assertions with Martial212 active. Existing current15026suite regression, gamepad and controller157 are also run. Physical DualSense hardware was not available; mapping verification is simulated. Sustained human Normal difficulty play remains useful for final probabilistic tuning. No claim that seeded tests establish human reaction-time balance.

Six dedicated later lab pages now share current dependencies through review-loader211; their individual lab entrypoints remain. This avoids repeated script lists without recompressing artwork or reducing game features.
