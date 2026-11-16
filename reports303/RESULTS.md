# Gate 8 — results and evidence

Implemented ordinary enemy approach coordination and prop-aware spacing. Gate 9 has not started. The final full-profile result is appended after the frozen run completes.

## Matching 15-second seeded fights

Counts exclude the first 60 frames for overlap measurement. An overlap pair means two standing enemies within 44 horizontal and 20 depth world units. It is not a pixel-overlap score. Attack starts use actual native threat events over all 900 ticks.

| Scenario | Overlap pair samples before → after | Threat attack starts before → after | Distinct attackers before → after | Maximum observed points / commitments after |
|---|---:|---:|---:|---:|
| Marcus, Kevin, Bruno | 529 → 150 | 12 → 12 | 2 → 2 | 2 / 1 |
| Five enemies at wall edge | 5 → 0 | 10 → 8 | 3 → 3 | 2 / 1 |
| Four enemies with solid obstacle | 304 → 248 | 12 → 10 | 2 → 2 | 3 / 2 |
| Five mixed ordinary enemies | 466 → 144 | 10 → 13 | 3 → 3 | 2 / 1 |
| Total | 1304 → 542 | 44 → 43 | — | At most 3 / 2 |

Combined overlap pair samples decreased **58.44%**. Some close crowd/contact overlap remains. This sample does not establish a universal reduction across every level. Attack starts were 43 versus 44 before, with all scenarios retaining offensive activity; actual variety and human difficulty remain reviewable rather than automatically approved.

## Targeted checks

- Runtime: **161,928 assertions**, 28 live hero/group scenarios (seven heroes × four scenarios), 600 ticks each. Native threat limits checked every tick; finite actors, active clock continuity, distinct valid staging, activity, state guards, bounds, movement limits and reset/removal tested.
- Actual admission: two separate light commitments accepted; a third rejected. Forced planning leaves admitted actions and their clocks untouched. Native attack/recovery/source definitions remain byte-identical to Gate 7.
- Specialized guards: Worker formation/roster tests pass unchanged (**10,214 assertions**); protected/specialized actor ownership delegates. Gate 7 contact, Gate 6 grapple and Gate 5 knockdown targeted suites also pass.
- Renderer: **68 assertions** across four groups. Native complete bodies visible and unclipped, fixed scale reused, paused poses repeatable, rendering cannot mutate actor positions, damage, stun or action state.
- Captures: **7,200 rendered simulation frames** (four before and four after fights, each 900 frames at 60 Hz). Selected frame sheets and per-tick state traces accompany each clip.

## Reviewable evidence

- [Normal-speed comparison — solid obstacle](before-after-1x.mp4)
- [Quarter-speed comparison — same recorded frames](before-after-025x.mp4)
- [Before obstacle contact sheet](before/obstacle-sheet.jpg)
- [After obstacle contact sheet](after/obstacle-sheet.jpg)
- [Before wall-edge contact sheet](before/edge-sheet.jpg)
- [After wall-edge contact sheet](after/edge-sheet.jpg)
- [Implementation, causes and limitations](IMPLEMENTATION.md)

Street, edge and obstacle contact sheets were inspected. Actors approach around the obstruction with less bunching; native attack, recoil and grounded sprites remain visible. The deliberately plain diagnostic floor exposes actual ground anchors. Dashed overlays represent planned paths only. Individual native clips and JSON traces allow examination at any captured simulation frame. Full level backdrops/browser interactions and physical hardware are outside these renderer-only captures.

Owner-approved screenshots, artistic review, all-move coverage, physical DualSense and human balance remain manual gates. No whole-game stable certification or Gate 9 completion is claimed.

## Regression findings and corrections

The first full run had four failures, retained in `initial-release-validation.json`. Two historical visual-only equivalence tests compared current group positions/AI against pre-Gate8 configurations. They now explicitly disable only the later Gate8 module while retaining their exact historical comparisons; current coordination is covered independently by the new live tests. One historical grounded-renderer test referenced a missing local checkpoint tag; it was restored at the exact Build293 SHA recorded in committed reports294 (`1b4352222a6bfe1970ef5be463326e8e0a213a9f`).

The waiting-slot assertion exposed a diagnostic compatibility omission, then an actual third close-approach edge case in a larger seeded crowd. The actual new staging target is now mirrored into the existing approach diagnostics, second approaches defer when two allies already occupy close lanes, and support flank routes use a wider clearance corridor around the player. The nine legacy crowd trials retain their strict maximum-two-close-enemies and native threat-budget assertions. Their waiting-position check now measures staging during the fight rather than insisting on a waiting actor on the final tick when actors may be recovering or attacking. All nine trials pass; none of these failures was waived. Earlier 67% overlap figures were exploratory and are superseded by the final safety-corrected measurements above.

## Final frozen release

**166 executed, 166 passed, 0 failed; 5 manual gates not executed.** No test input changed during execution. The final tested fingerprint is `5a3fb48a4e0f833018b326296b102b57adc90f5ad768b81993031fa29458ac35`; the independently recorded harness hashes also match. Final logs confirm 161,928 runtime assertions and 68 renderer assertions. All four initial failures are resolved in this run.

Release status is **needs-review**, not a whole-game stable/art/hardware certification. The runner's exit code 2 reflects the five pending manual gates, not an automated failure. Gate 9 has not started.
