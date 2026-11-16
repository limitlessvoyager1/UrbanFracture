# Security216 — active-source audit

Baseline: Build215/db3a97cc, checkpoint-before-security216. The supplied document's Build205 label is historical; work extends current215 and preserves the cap.

Confirmed defects before implementation:
- Casino192 dispatch owns Security AI, but Leroy102 converts its punches into Bruno's three-contact 20/35/50 timeline.
- Casino192 rolls its35% chain after an action disappears, not at commitment; it replaces recovery using new CD values without reserving the extension.
- Native core still applies a65% reactive anti-mashing guard to Security, despite Combat200 correctly excluding it from Bruno's newer patch. It can also inherit block-count retaliation.
- The deterministic five-choice casino AI has no separate Security anti-air selection, limited guard telegraph or distinct clinch throw.
- Security inherits bombGrab→powerBomb rather than a separate ground-based heavy slam.
- CasinoView192 does not render Security hit flashes or armor feedback.
- Casino spawning already enforces one living Security,130HP, max3 total; preserve.
- No active shared locked-battle controller exists in this checkout. The Build205 Enemy Field Guide, profile E13/page17, was located and read separately: it confirms130HP, armored pressure, occasional extensions, strong-target rules and one living Security. Its stated exclusion from Bruno's anti-mashing patch was contradicted by the older native core guard branch noted above. Current runtime source is authoritative for this audit. Security will gate attacks to current visible/combat bounds and physically reenter after recovery; this does not invent a replacement global encounter controller.

Implementation/testing results appended below.

## Implemented Normal definitions

| Move | Contact frames | Active frames | Final recovery | Base damage before existing modifiers |
|---|---|---|---|---|
| Punch combination | 17,42 | 5,6 | 34f | 12.65,14.95 |
| Missed opener | 17 only | 5 | 25f, total47f | No automatic follow-up damage |
| Committed extension | 76 after8f visible reset and20f startup | 6 | 34f | 20.7 |
| Front kick | 21 | 6 | 32f | 19 |
| Heavy hook | 20 | 6 | 34f | 20.7 |
| Anti-air uppercut | 17 | 6 | 32f;2s cooldown | 18 |
| Clinch reach | 26 | 6 | 39f on miss | 0 at capture |
| Clinch after capture | 18,36 body punches; release54; landing78 | Individual events | 27f | 6,6,20 |
| Heavy-slam reach | 28 | 6 | 41f on miss | 0 at capture |
| Slam after capture | release48; landing65 | Individual event | 27f | 31 |
| Ordinary guard | 7f raise;24f guard | Frontal guard only | 14f | None |

Punch totals are deliberately lower than the previous inherited three-hit string unless an optional extension is committed. Existing difficulty/hero/status damage modifiers still apply. No HP or movement-speed increase:130HP/94 approach speed retained. Close weights50/20/15/10/5 are normalized after eligibility; clinch favors observed blocking and approach patterns, slam requires a missed committed attack in range. Follow-up27.5%/6s cooldown/one maximum, selected at initial admission; no reaction to later punish input. Major grabs8s attempt cooldown. Anti-air uses native observed jump, distance, plane, shared lottery/admission and2s post-action cooldown, not every jump.

Security216 is dispatched through existing Audit135/Director148. Native Casino192 no longer rerolls/replaces recovery; Leroy102 no longer converts its attacks to Bruno102. Native strong grab thresholds, manual-counter gates, Iron Will, all six hero identities and Otis are preserved. Capture names join GrappleRecovery119; reservations transfer to the new synchronized action and include actual final active frames. The victim's logical plane remains fixed; lift rotation converts its visual foot anchor continuously into native flight at release. Landing is one damage event, and shared recovery ordering prevents premature wake. Startup and final recovery remain vulnerable; ordinary committed grab protection ends at impact. Recovery deadlines survive being interrupted by damage.

Selective damage-taking armor: no opening startup armor; opening active and late second/extension swing frames, brief late kick/uppercut windows only. No idle/movement/recovery armor; native living strong-enemy wake armor is retained without an automatic wake attack. Metallic-white4f flash accompanies actual suppressed stagger, using native impact audio. Guard12.5% per observed frontal startup, finite duration, no anti-mashing guard or automatic block retaliation.

Existing16-frame black uniform/cap atlas retains its import scale and ground anchors. The uppercut reuses a clipped forearm rig to show a rising arm rather than an invisible high hitbox. Lift art remains overhead through release. Portrait and SECURITY lettering remain intact. No background or hero assets were recompressed. A developer-only cabin page's repeated dependency list now uses the existing shared review loader to preserve deployment capacity.

## Verification

- Security216: actual move contacts at30/60/120Hz; finite events; both grab types ×all six heroes ×both facings, continuous root movement and fixed plane, actual flight, synchronized recovery, protection versus vulnerable recovery, death cleanup, misses/invulnerability/Iron Will capture gates.
- Counter input interactions on punches and kicks for all six heroes: five existing counter implementations still interrupt; Orion's reserved future-counter framework remains unchanged. Six native dodge checks; Iron Will still takes damage and suppresses ordinary knockdown.
- Native Human Shield physical interception redirects exactly one strike and consumes that contact. Directional Security guard checked front/rear; idle anti-mash and automatic retaliation absent.
- Exact recovery survives interruption; final cooldown is not stacked on frame-defined recovery. Native entry completes; offscreen attack requests are denied and living actors move back inside while preserving HP/CD.
- Native queue and public casino spawn helper enforce one living Security;130HP and175HP Otis identities verified separately.
- Six seeded35-second mixed encounters: Security initiated11–14 attacks, peak pressure≤3 and at most2 commitments. This is a simulation sample, not a human Normal-difficulty certification.
- Current216 retained Flint/Martial/Jesse move contracts; Current150's26 regression suites; simulated gamepad/controller157 suites passed.
- Browser production-renderer inspection: punch contact, kick, rising uppercut, clinch, lift, released throw and recovery; fixed scales and black cap retained. Frame controls, live mixed encounter and incoming-hit control are available in security216.html. Audit report includes security216 diagnostics, contacts, commitment timing, armor, arena gate and recovery.

## Limits

The attached specification stops mid-sentence in Phase24 (Forest/Gunner); no unseen continuation was inferred. No new global Adaptive/Locked Battle System exists in the inspected source. Security honors current combat/visible bounds, reservations and reentry, but cannot be certified against an unavailable future controller. Existing weather, routes and controllers were retained. Physical DualSense hardware and a full human Normal-difficulty playthrough remain unverified.
