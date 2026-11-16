# Gate 9 — combat-plane and hitbox accuracy

Gate 9 only. Gate 10 has not started. Baseline source: `2d8f4e3b154d769bac2ced871f66832563528b2d`. Recovery checkpoint: `checkpoint-before-plane304`.

## Corrections

| Confirmed problem | Correction | Preserved behavior |
|---|---|---|
| Saito captures Reina's attack, then a stale callback damages him and cancels his counter | Track native hero action ownership; reject superseded hit/advance callbacks and later target damage in the same invocation | Independent released projectiles, legitimate paired/forced/grab/flight/status paths and native recovery owners |
| Reina's three kicks classified as punches; Niko normals unclassified and martial timing reads hitAt999 | Resolve current move category and Niko's actual hitFrame185 contact time inside the native martial evaluation | Existing9-frame reaction delay,8-frame counter window, chance weights, attack data and counter choreography |
| Reina's old collision coordinates change independently of the current active pose | Transform authored thigh/knee/foot polylines from current Attack297 active frames4/12/20 with their actual import factor, anchor, scale and visual lift | Configured115 reach, native active windows, forward movement, damage, knockback, armor and combo confirmation |
| Weapon sweeps/hurtboxes omit bank-scene1.12 draw conversion | Use the same world conversion for sampled weapon paths, target weapon boxes and thrown-weapon release sockets | Weapon profiles, five-contact durability, damage, armor bypass, startup/active/recovery and non-bank outcomes |
| Entrance flags missing from some target filters | Evaluate entry, entering and liftEntry explicitly in Niko/weapon eligibility | Existing lane widths, invulnerability, ground, facing, reach and phase protections |
| Ambiguous negative-hit messages | Record actual evaluated eligibility, sampled intersections and resolved damage/block/armor/counter outcomes separately | Unsupported move families retain native inspectors; no invented explanation for a missing native reason |

The stale callback defect was confirmed through a complete instrumented production-wrapper trace. The first contact starts Saito's counter and returns false without damage; a subsequent call with Reina's action already absent damages him. Enemy interruption protection from Gate4 existed; equivalent hero callback ownership was missing. The correction does not grant invulnerability or change hitstun to hide the defect.

Fast Niko normals still respect Saito's native reaction delay. Correct classification does not give Saito perfect reactions to6-frame contacts. The isolated fourth-hit counter rehearsal uses the native11-frame contact and is labeled as a lab setup, not an earned combo or proof of AI selection frequency.

## Actual geometry and plane boundaries

Reina retains her inclusive26-world-unit lane; Niko retains strict24; weapons retain inclusive23; native Saito martial eligibility retains inclusive25. Their different thresholds were measured and are not unified. Heroes are never moved onto an enemy's plane to manufacture a hit. Both Reina and Niko aerial attacks retain takeoff plane470 in the repeated test fixtures and reject targets32units away in depth. Native three-kick Saito links, protected targets, directional guard, manual hero counters and mandatory recovery retain their owners.

Reina source geometry uses the existing `attack297-reina` family calibration and canonical148/138 factor. Forest125.scale already includes her approved0.912 size factor; it must not be multiplied twice. The renderer test verifies the native atlas frame/anchor and opaque limb pixels in both directions and both standard/bank transforms. No sprite was resized, recolored, warped or regenerated. A source pose held during contact does not receive a moving legacy endpoint from a different pose.

Weapon sweeps record the actual samples used by the native collision loop. Curved chain polylines retain all native links. Reference hurtboxes are not claims of per-pixel anatomy; Niko's ordinary melee retains its native directed-reach/plane policy. Changing a reference overlay never changes a collision rule.

## Additional boundary and elevation corrections

The existing normalized native phase now rejects a newly entering target at the exclusive active end, including floating-point accumulation at nominal frame15. This uses the approved phase definitions rather than changing move timing. The original close-range Reina269 test caught a shin-only prototype missing a target at25 units; full-leg polylines corrected it without relaxing the test.

A shared height function exactly matches the approved renderer across1,774 checks. Martial and weapon target hurtboxes now use the same jump/dive elevation as the sprite. The renderer delegates to that identical function, retaining its native fallback and all jump trajectories. F8 draws every span of Reina’s actual contact polyline and uses the same normalized active phase.

## Developer Panel

Open the existing Developer Menu and find **Gate9 · Actual Contact Diagnostics**. It provides:

- Current evaluated contact history with source, target, native action frame, eligibility result and actual resolution.
- An optional current-geometry/ground-anchor overlay.
- Export of the bounded512-entry collision history as JSON.
- Explicit separation of candidates, geometric intersections, clean damage, block, actual native armor feedback, successful counter and canceled ownership.
- Native grab resolution, front/rear classification and attempted distance/depth. A native failure field is labeled fresh only when demonstrably updated; missing fresh reasons remain unknown rather than invented.

The frame field indexes simulation world time (`game.time ×60`); it is not the independent counter since enabling the playback toolbar. Existing recorded-frame navigation remains telemetry review, not a world rewind. The new overlay shows the current live world. Existing F9, PS5 L3+Options, Save&Close, practice selection, playback, AI inspector, balance/reset and other panel tools are preserved.

## Source changes

- `dist/plane304.js`: action ownership, current Reina contact geometry, actual collision/grab receipts and shared draw conversion.
- `dist/plane-view304.js`: additive developer panel, overlay and export.
- `dist/martial212.js`: narrow current-move/contact-time adapters and native eligibility/geometry observation points.
- `dist/niko185.js`: actual candidate-evaluation hook.
- `dist/weapons248.js`: shared conversion, entry eligibility and actual sweep observation points.
- `dist/game.js`: shared native-height delegation, preserving the exact approved fallback.
- `dist/audit-view135.js`: full polyline display and native phase coloring.
- `dist/index.html`: module wiring and cache refresh for changed runtime sources.
- Five `tests/plane304*.cjs` suites, native replay/capture tools and release registration.
- Historical Gate298/Gate299/Gate8 byte proofs reverse only the exact registered Gate9 adapter substitutions before comparing all remaining bytes. `tools/plane304/approved.cjs` rejects missing or duplicated adapters; no broad normalization or balance waiver is used.

Core, Director148, Combat134, Audit135, Combat274, Street209, Enemies210, Workers233, Counters248, Reactions298, Grapples301, Contact302 and Crowd303 retain their approved source bytes. Move parameters in the adapted owners also remain unchanged. Existing three-point/two-commitment Normal limits, regular-enemy armor rules, worker coordination, synchronized throws and controller mappings remain.

## Evidence and limits

Five matching before/after scenarios use seed304, identical starts and native60Hz clocks: Reina counter, isolated Niko fourth-hit counter, earned Reina/Niko combinations and bank weapon contact. Each phase records180frames per scenario: **1,800 actual rendered frames** total. Every recorded hero/enemy position, HP, native action state and world time matches a fresh simulation replay. The isolated fixtures use1000HP to keep scenarios alive; production HP/damage are not modified. The captures use production sprites over a labeled neutral floor and contain no audio.

Normal, half and quarter-speed videos contain the same frames. Source-space contact sheets and a native aerial audit supplement the recordings. Startup/recovery reference lines are marked inactive. Actual full-combo comparisons and live-group tests are separate from pose inspection and forced-ready rehearsals.

Native renderer output was inspected. Programmatic UI tests verify additive mount, labels, toggle and export; they do not certify a browser session. The browser route was previously unavailable, so no new browser, physical DualSense, human balance, all-move or owner art approval is claimed. This is a focused Gate9 correction, not a per-pixel collision rewrite or complete civilian/level audit. Gate10 remains separate.

## Remaining geometry limits

Saito/Akari pose sheets also show their existing abstract strike segments, which are reach profiles rather than per-pixel limb masks. High and flying poses have visible offsets from these reference lines. Those images alone do not establish a false hit: no new global martial range/profile rewrite was made. The reproducible target-elevation and ownership defects above were corrected and tested. Future authored per-pose martial shapes require a separate contact/outcome investigation.

The first completed release run passed170/171 suites; the sole failure was Gate299’s historical byte check against the deliberately adapted martial source. That proof now reverses the exact same validated adapters as Gate298/Gate8 and still compares every remaining byte. The unchanged knockdown runtime checks pass2,195 assertions. All initial reports are retained; a fresh complete run is required after this test-only correction.

Final frozen release:171/171 automated suites passed,0failed,5manual not executed,sourceChangedDuringTests=false. Runner exit2 is needs-review for manual gates and is not stable-build/hardware/art certification. Capture scripts/adapter maps/render helper SHA256s match the frozen fixture inventory.
