# Gate 11 — Runtime combat diagnostics

Gate11 extends the existing Audit135/F9 panel. Gate12 has not started. Recoverable published baseline: `5b17cf4353942e1635840b9a9da58c8a4b4452b0`; local annotated checkpoint `checkpoint-before-diagnostics307`.

## Audit and changes

| Tool | Existing behavior / gap | Gate11 change and evidence |
|---|---|---|
| Playback | All seven fixed60Hz speeds and1/5/10 ticks already existed. Controller/visible-menu pause also blocked stepping. Paused pumps cleared inspection inputs before they could be stepped. | Preserve the single full-game scheduler. Permit inspection steps only while the panel is open and readiness/start/play/focus/visibility checks pass. Retain queued inputs only during an authorized paused inspection. Normal pause, blur and hidden-page behavior remains fail-closed. Actual browser toolbar advanced30 then31ticks; actual queued attack started at actionframe1. |
| Runtime inspector | Combat/reaction/ground/grapple data scattered among reports; old playback notes implied no current adapters. | One live hero/enemy selector, actual native lock timers, armor/invulnerability, native actionclock and timing, current logical ground/elevation and scale. UI refresh uses wall-clock repaint while the simulation is paused. |
| Timeline | Existing265 snapshots had partial phases and renderer notes. | Add bounded900-tick history with two simultaneous hero/focus timelines, actual HP/displacement changes and transition/damage/stun-end/lock-clear events. Hitstop ticks are recorded even when native world time is frozen; tick and time-based world frame are distinct. History is observational only. |
| Frame data | Generic metadata could not establish exact active/cancel spans for every move. | Explicit native active-window adapters for Reina standing attacks, weapon profiles and Enemies210 definitions. Native missed openers show canceled followups and shortened recovery separately from configured sequences. Other actions retain actual native contacts/total/current clock and N/A for unadapted spans. Configured contacts are opportunities, never asserted successful hits. |
| Render monitoring | Renderer receipts could be absent or stale; a wet-sprite cache has different coordinates from the world canvas. | Capture fresh native render transforms and existing authored pose receipts. Label offscreen wet-cache space; do not present it as world scale. Source-specific opaque body/sole measurements remain separate. |
| Collision | Gate9 already provides actual candidate/intersection/resolution receipts and references. | Link directly from the lab to the existing inspector; retain F8 and its logical reference labels. New ground/scale guide toggle does not change collision. |
| Grapples | Original119 sessions and301 jointly authored timelines already exist. | Display actual owner, move, native clock, pose, capture mode, release, impact and ground. Unadapted119 sessions are labelled; no invented hand-gap measurement. |
| AI | Native AIObserver288 history/source/denials already exists. | Link to the same inspector, enable actual AI recording with diagnostics, and export it with contact/state evidence. Add observed move executions, damaging hits, completions and confirmed interruption counts. Eligibility opportunities and unexposed reasoning remain N/A. |
| Reversible tests | Reaction274 has an immutable approved baseline, safe queue, reset and its own Undo/Redo. Full generic animation retiming is not certified. | Add27 registered temporary move-property adapters: Reina standing damage, implemented hero weapon damage multipliers and extended recovery. Display baseline/current/difference/Modified, validate before apply, queue during actions/grapples, reset one/character/all move tests, Undo/Redo and cancel queued edit. Exports are proposals only. Reload restores approved source values. |
| Existing tools | Practice hero/enemy/group/section selection, infinite enemy health, environmental tools, Gunner, statistics and export already exist. | Retained in the same panel. Existing sticky Save & Close retained. Updated stale explanatory text only in older playback/statistics sections. |

## Verification

- `tests/diagnostics307.cjs`:79 native assertions, including successful edited damage, actual extended weapon recovery, no active-action rewrite, immutable baseline, reset/Undo/Redo, rejected invalid values, queued grapple safety and400-frame observer-on/off equivalence while reading reports.
- `tests/diagnostics307-input.cjs`:16 checks of the actual game bridge, exact1/5/10ticks, readiness/focus/visibility guards, paused-pump queue retention, native queued attack execution and blur clearing.
- `tests/diagnostics307-ui.cjs`:22 DOM-logic checks; existing mount retained, no duplicate panel, live data/export, reset confirmation, Undo/reset and fresh/offscreen render receipts. This is not a browser-layout substitute.
- Browser: actual paused toolbar1/5/10 behavior, queued attack startup/actionframe1, configured10/5/7 timing for Reina's native opening, authored pose0, real canvas transform, active-move deferred edit and cancellation. Export contains31ticks, two observational events, current attack/pose and zero applied move overrides.
- Existing targeted playback265:137 checks including all speeds and seven heroes; reaction settings274:16; stats266:289; civilians305:1,604,251. Assertion counts are not suite counts.
- Completed initial profile: **114/114 automated suites passed, 0 failed**, with65 release-only suites plus5 manual categories unexecuted (70 total outside this initial run); sourceChangedDuringTests=false. Final full release: **179/179 automated suites passed, 0 failed, 5 manual categories not executed**, sourceChangedDuringTests=false. New307 suites are critical. Five existing manual acceptance categories remain separate.

## Evidence

- [Browser inspector](browser-inspector.jpg).
- [Browser safe editor](browser-safe-editor.jpg).
- [Actual browser diagnostic export](browser-diagnostics.json).

This is a new-tool screenshot, not an approved artistic baseline. Baseline source inspection supplies the before-state evidence; no identical historical browser recording was captured. The browser screenshots do not certify a physical DualSense.

## Files and boundaries

Production additions: `diagnostics307.js`, `experiments307.js`, `diagnostics-ui307.js`; explicit script registration in `index.html`. `game.js` changes only the developer step-eligibility predicate. `playback265.js` retains input during an authorized paused inspection rather than clearing it; simulation pumping while ordinary game pause remains blocked. Older playback/statistics text is corrected. No artwork, character proportions, AI weights, default damage, approved active windows or production recovery values were retuned.

Tests preserve historical source equality by reversing only the exact307 developer step-eligibility expression before the prior306/304 comparisons. Civilians305 uses the same exact adapter. Stats266 reverses only the updated descriptive sentence before its retained-body proof. Unexpected unrelated changes still fail.

## Remaining limits

- No simulation rewind, generic pre-move snapshot restore, permanent balance approval/build rollback, all-move retiming or new authored animation is claimed.
- Startup/active edits remain unavailable without safe authored-contact adapters. Recovery tests can only lengthen registered weapon recovery. No animation completion is shortened.
- Move tests and existing reaction274 tests have explicitly separate queues and Undo/Redo histories. Reset-all move tests does not claim to reset environment, AI, or reaction settings; their existing controls remain separate.
- Not every native renderer exposes an exact pose index; fresh unknown indices stay N/A. Ground crosshairs/transform values do not prove opaque-foot contact.
- AI rejection/selection fields are native data; unexposed weights, random rolls and eligibility opportunities are not reconstructed. A completed move with no damaging contact can include a block, not just a miss.
- The collision shortcut now synchronizes the existing native checkbox immediately, including while paused; the DOM regression checks both the real overlay flag and checkbox state.
- Gate12, owner-approved screenshots, broad all-move coverage, physical controller testing and human artistic/balance review remain pending.

The first initial-profile preflight was stopped after source review confirmed that native Enemies210 missed openers shorten their timelines. Diagnostics now distinguish configured3-hit windows from the actual1-hit shortened recovery; a native negative-regression fixture verifies this. The interrupted preflight is retained and is not counted as a completed run.

A second initial preflight was stopped to add a historical-actor selector regression: recorded actors must remain selectable after leaving the live roster. The UI now uses the selected record’s roster during history review. Its interrupted log is retained separately; only final completed profiles count.

## Using the panel

1. Open **Developer Menu**, **F9**, or **L3 + Options**. Use the existing practice section to select a hero matchup/group and level if needed.
2. Click **Enable playback**, then **Pause simulation**. Check **Record runtime diagnostics**.
3. Select the hero or an enemy. Use **+1 / +5 / +10 frames**. **Queue attack / special / jump** requests a native input for the next tick; native admission still decides whether it is legal. Inputs are not forced through recovery or entry locks.
4. Inspect the runtime table, animation/frame/grapple details and contact-event details. The selected enemy and hero appear together in the timeline. Select a recorded tick to review detached historical data, including actors no longer in the live roster.
5. Use **AI logic & history** for native decision fields/source and **Hitbox / hurtbox inspector** for actual sampled collision receipts. Ground/scale guides are references, not pixel-perfect contact certificates.
6. Temporary move tests display current approved defaults beside changes. An active action/grapple queues edits; **Cancel queued move edit** discards a pending request. Individual reset needs no confirmation; character/all-move reset does. Existing reaction settings have their own controls below.
7. **Export diagnostic report** includes recorded frames, events, contacts, AI data and both experimental-setting reports. **Save & Close** saves panel/practice/environment choices; it never makes experimental balance permanent. The persistent playback toolbar remains available; click Resume simulation when finished inspecting.

Loading metadata was finalized before the full release run: playback265, playback-ui265 and stats-ui266 cache keys now use307. The completed initial run has fingerprint `c1565efe18dfdc75b94769a0365d09c3a5562ba20fc9af3a4c39b372303f1320`; an exact reversal proves that only those three query tokens changed. Executable script bodies, assets, tests and ordered paths are identical. `cache-validation.json` records the cache-only intermediate fingerprint `1f637dc820c4c8dea52f0d6f78018cc1b2c280b1eced56e2983792f5290f1009`. The final full release checks use these loading keys plus the telemetry corrections documented below. The earlier release-cache preflight was interrupted and is not counted as a complete release.

Final telemetry corrections: weapon contact frames now come from profile windows (including all3 Reina knife contacts), rather than the generic unused999-frame hit marker. Damage attribution uses explicit action metadata or the actual native enemyHit/advanceHeroAction callback; detached damage without such a receipt remains N/A instead of being assigned to the attacker’s current move. Guard-break, flight, held, dormant and entry states are explicitly distinguished. The interrupted full preflight also found Contact302’s cache fixture still required game304; only that expected token was updated to307, preserving its image/audio/contact checks. The failed log is retained; no failure is waived. The prior initial114pass receipt precedes these narrow final fixes; targeted307 checks and the final full release cover the updated source, including all114 initial-profile suites.

Weapon profile timing applies only to actual weapon attacks; pickup/throw utility actions do not borrow melee windows. Generic out-of-duration999 markers are omitted and unadapted hit counts remain N/A. These boundaries have separate regression fixtures.

Final state-label validation explicitly covers a native neutral jump/elevation and guard/guard-break flags, so airborne or defensive actors are not labelled idle. Live cooldown is explicitly named cooldownSeconds. The brief state preflight was stopped before completion and is retained separately.

Final frozen full-release fingerprint: `58316f045fb90f0360c804578c56307d39a63fc27b142800742b159291dd5c41`. This final run includes every initial-profile suite and all three new307 critical suites on the corrected source. Decision remains **needs-review**, not stable certification: approved screenshots, art review, all-move coverage, physical DualSense and human balance are unexecuted. The final source helper commit will include these receipts without changing tested executable inputs.
