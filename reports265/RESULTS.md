# Build265 QA evidence

Targeted playback: 136 checks passed; actual game.js keyboard and simulated standard/raw Sony/DSX input:14 checks passed. Physical DualSense hardware remains untested.

Browser: F9 opened existing dashboard and new Precision Lab. Enable playback and pause before starting yielded frame0. +1, +5, +10 produced frames1,6,16 and elapsed .017,.100,.267 seconds. 0.1× resumed the same simulation. Previous recorded frame selected39 while live world stayed40. Existing environment controls and combat exports remained visible.

Initial development attempts: a malformed synthetic projectile lacked the native hits Set; fixed the test fixture rather than game logic. One attempted obsolete tests/gamepad.cjs path did not exist; current registered controller suites are used by QA242. During UI review, legacy dashboard's unscoped pre selector was corrected to preserve both original report and new frame details.

Additional seven-hero native clock comparisons detected a fractional accumulator loss on character changes at0.75x; preserving the fractional carry fixed it. Native projectiles, hero/enemy cooldowns and environment elapsed time now match at equal simulation durations across all requested speeds.

Final profile results are retained in initial.json / release.json after execution. Remaining manual art, screenshots, physical controller and balance gates are not claimed passed. Historical telemetry is not full-state rewind.

Browser evidence is saved as browser-playback.jpg. Developer toolbar and frame10/.167s state are visible. The completion-summary-only browser call failed backend schema validation after saving the evidence; this did not alter the observed UI result.

Initial 76/76 passed on the first implementation snapshot. The final release includes the additional seven-hero comparisons and accumulator-carry correction; its exact frozen fingerprint is authoritative for publication. Storage preflight expanded tar:268431360 bytes, below268435456, with no asset edits.

Final frozen release:81 executed,81 passed,zero failed,five manual gates unexecuted. sourceChangedDuringTests=false; current fingerprint equals release fingerprint. Decision remains needs-review/stable=false. No approved screenshot baseline was overwritten. Publication source is the helper commit containing this report.
