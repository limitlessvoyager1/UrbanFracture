# Uploaded project integration — Build341

Compared against saved Build340 (`0edbd5077f71be8a3b3071d8d27d1b4b161b0d5a`) using common Build338 (`0f095736d6043de75a8b3d410354bde39fb0223f`). Recoverable tag: `checkpoint-before-upload341`.

Upload inventory: 2,592 identical files, 35 differing files, 1,992 additions. This is a partial overlay, not a replacement/deletion manifest. All missing upload paths remain present from the complete saved source. Original archive SHA256 and complete path classifications are in IMPORT.json/comparison.json.

| System | Incorporated changes |
|---|---|
| Combat admission | Direct starts obey post-hit reassessment, actual hitstun/shock, knockdown and recovery; Director reservations and contested-grab starts share admission gates. |
| Recovery diagnostics | Actual offensive readiness, reaction deadlines, Niko phases and flight versus contact history labels; no invented completion time. |
| AI inspector | Correlated decision/outcome reasons instead of stale or guessed explanations. |
| Collision | Reina standing strike tests use elevation-aware enemy hurtboxes. |
| Rendering | Grounded crop cache includes time/flash identity; bounded exact-size inactive canvas reuse. Uploaded performance hold remains open. |
| QA | Portable fixtures/historical-receipt separation, current fighter-render bootstrap, new mechanics/cache tests, audit tools and evidence. Permanent-QA architecture is a proposal, not an implemented framework. |

Eight uploaded differences are unchanged Build338 copies: AGENTS.md, items319.js, home327.js, home-ui327.js, home338.js, home327.css, audit-view135.js and home-view338.js. Retained newer339/340 copies. Production index merged only the upload's script cache-token changes; retained later HQ scripts, UI and resource overrides. QA catalog combines uploaded entries with current HQ/resource suites, including uploaded reaction-fixture modernization; manual gates/policy unchanged. Fighter-render manifest additionally declares the existing Home339 data module so its strict discovery remains valid; no relaxed detector.

No artwork or approved combat balance retuned during integration. Imported source repaired mechanics as supplied; no broader gameplay redesign. All uploaded production repair files match archive bytes exactly except index integration. Hosting identity and private audience preserved. No Git history from the uploaded project's separate repository is fabricated. Historical unavailable receipts remain unavailable.

Verification so far: seven-hero resource runtime231/UI19 and home navigation replay7,345 checks/1,469 frames passed. Browser preview launched, active downtown combat rendered, pause worked, and DOM script URLs confirmed imported repairs plus retained HQ/resource scripts. Initial create-tab navigation timed out but existing preview tab loaded; no full motion/art/hardware certification. Mandatory initial regression completed:204 executed,172 passed,32 failed,82 not executed; source fingerprint unchanged. Detailed current logs and failure delta are alongside this report. All imported combat-admission/hitstun/recovery/diagnostic/airborne collision suites passed; original cache-validity tests passed. Crop-surface reuse received SIGKILL and is unverified.

Release limits: upload explicitly retains UF-RENDER-025/027 frame-budget holds; whole-game QA/manual certification incomplete. Existing expanded-package cap is still exceeded. Source integration does not mean a production deployment or stable certification.

Fresh renderer prerequisite check passed with pinned Canvas1.1.1 and declared current Home339 data. The standalone grounded-crop native-pixel suite was terminated by the host with exit137 before a result (not a passing renderer certification; original uploaded evidence is not reused as a current pass). No test assertions or performance holds were weakened.


Completeness recheck against the original9258-file Build338 manifest:9185 exact hashes,73 changed,0 missing. This supersedes the upload audit’s6460-missing-path finding for its selective checkout; it does not certify all game behavior. Full path/hash outcome is in completeness.json.

Source saving exceeded the64MiB per-push transport limit with the full evidence bundle. Ten smaller source commits were saved successfully; final tree5115a2f4e41f352967d5a13eadd86ff8a92e524e exactly matches the integrated candidate2368bf077261cb90c18180c65d0c5f041a91e95c. Final QA documentation follows separately; no source content omitted to fit transport.

## Fresh QA failure delta and publication decision

Relative to Build340's29failing IDs, three additional suites are nonpassing: civilians305-view timed out after several subchecks (SIGTERM/180-second runner limit); recording306-view asserts that all six older Kevin falling-pose receipts were displayed; grounded-crop-surfaces received SIGKILL. The Kevin assertion is a confirmed test failure, not yet a diagnosed shipping-animation defect: the imported fixture loader now follows current render owners, so old receipt expectations require investigation before any code or test change. No assertions were removed. All prior29failure IDs remain nonpassing.

Imported post-hit reassessment, hitstun eligibility, knockdown admission, actionability/deadline metadata, playback flight, airborne hurtbox, Niko phase labels, direct Director admission and AI reason correlation suites all pass on this combined source. Grounded cache-validity and fighter prerequisite/bootstrap suites pass. The newly added crop-pool pixel suite is not certified by the uploaded older pass; current host termination remains explicit.

The packaged game is270,376,960 expanded TAR bytes, exceeding268,435,456 by1,941,504 bytes. Full source/evidence storage succeeded using batched pushes; that does not bypass this separate deployment cap. No production deployment was attempted. Full release/hardware/whole-campaign/artistic certification and UF-RENDER-025/027performance acceptance remain open. The saved integration can be reviewed/reverted independently of the previous live version.
