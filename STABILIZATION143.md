# Game-wide stabilization — Build143

User-confirmed precedence: retain2-second charges; Nova automatically enters Hype while others release. Reina stands from her suplex bridge, no kip-up. No new difficulty modes, HP/damage tables, character redesigns or moveset replacements.

Reversible checkpoints: checkpoint-before-engine143, checkpoint-before-diagnostics143. Base Build142 /1d2b1b30d13668124b7de7e67f929d2c1f08cf8d. Source restored after workspace maintenance; published source remained intact.

## Implemented this pass

- Existing Normal attack director now covers standard encounters on both routes, including Financial District. Same2.25 budget, maximum2 admissions, melee/ranged shared pressure, .34 impact spacing, .24 response opportunity and .85 shared anti-air gap. Scripted transitions/introductions remain outside scheduling. Denied enemies retain repositioning. No global aggression/damage reduction.
- Outer command gate rejects attack/special/counter/grab while staggered, electrocuted or guard-broken; clears stale combo buffers. Grab escape inputs and established grounded recovery remain separate. A damaging interruption clears pending generic/Nova chaining.
- Enemy actions expose a diagnostic armor profile derived from existing classifiers. Armor windows and damage-through-armor behavior remain unchanged.
- F9 JSON now includes enemy HP/armor/wake/down states; per-source damage; move use/connection/miss counts;2-second damage-spike buckets; hit/counter/grab rates; anti-air attempts; specials; Gunner availability; completion/defeat observations. Existing F8 hitboxes/active states and JSON/CSV events remain. No data is automatically transmitted.
- Nonblocking reusable dialogue cue queue with speaker/kind/duration and on-canvas display; no combat freeze or replacement of working boss scripts. No new story scenes were written.

## Preserved and regression-checked

Shared grapple session/contact paths, front/rear switches, attacker-first recovery, scale/lane locks; standard combo opener hit confirmation; strong-enemy vulnerable/armor windows and rear exposure; existing costs/counter timing; companion commands/stun/retrieval; two-second charge141; Broxton tackle104 cases and Powerbomb104 cases; all four heroes' distinctive tuning. Existing diagnostics/sounds/art are reused rather than unnecessarily rewritten.

## Tests

-112 seeded10-second fixtures: four heroes × two routes × seven enemy compositions × passive/defensive scripts. Cases include Marcus, Kevin, Bruno, Frankie, two standards, Bruno+two standards, Frankie+melee+ranged. Assertions: finite positions, integer score, at most2 director-admitted commitments. Data: NORMAL143-results.json. These are stress fixtures, not human difficulty ratings.
-13 compatible full-chain suites: combat134, Reina counters, weapon counters, Bruno, grip transitions, reap recovery, Forest counters, Gunner AI, first-hit combos, Reina German, Nova DDT, route controller, startup. All pass. Older three-second release-only Nova suites are superseded by charge141; not claimed passing.
- Targeted143 status/input/report/dialogue tests; charge141 and woods progression; tackle and Powerbomb focused suites pass.
- Browser: Downtown starts, F9 renders extended metrics and export controls.

## Remaining master-plan work / limits

This pass does not certify every animation frame or every possible hitbox. No physical DualSense hardware, exhaustive slow-motion visual review, human encounter completion/survival comparison or matched before/after gameplay recordings were performed. Hero balance should not be retuned from short scripted survival totals. Adaptive feints/block recognition/low-health tactics are preserved where already present; no new blanket AI adaptation has been added. Expanded cinematic strategy scenes and new art/audio polish remain future content work. All phases requiring human feel/visual acceptance remain open rather than being marked complete by automated tests.
