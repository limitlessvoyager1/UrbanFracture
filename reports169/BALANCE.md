# Controlled balance measurements169

168 fixtures:84 baseline168 and84 quality169. Four heroes × seven enemy groups × three fixed policies,20s limit,60Hz, seeded AI separate from world weather. Groups: Marcus, Kevin, Bruno, Flint, Frankie, Jesse and Marcus/Kevin/Flint mixed. Policies close, varied and ranged; ranged is meaningful primarily for Forest. Live enemy AI, one life, no heal items/reinforcements. These are engine probes, not human win-rate estimates.

| Hero | Version | Clears /21 | Survived /21 | Mean dealt | Mean taken | Mean elapsed s |
|---|---|---:|---:|---:|---:|---:|
| Reina | baseline168 | 17 | 17 | 88.4 | 37.0 | 11.49 |
| Reina | quality169 | 17 | 18 | 88.5 | 36.2 | 11.54 |
| Nova | baseline168 | 12 | 15 | 80.4 | 53.6 | 12.00 |
| Nova | quality169 | 12 | 13 | 73.9 | 56.3 | 11.80 |
| Broxton | baseline168 | 21 | 21 | 97.6 | 30.1 | 9.80 |
| Broxton | quality169 | 21 | 21 | 97.6 | 31.9 | 10.03 |
| Forest | baseline168 | 12 | 15 | 82.3 | 58.7 | 13.04 |
| Forest | quality169 | 12 | 15 | 82.0 | 58.7 | 13.02 |

The fixture asserts finite actor coordinates and the existing pressure budget of3 throughout. Raw per-encounter damage, time, counter/grab rates, knockdowns, inability to act and new metrics are in balance-results.json. Telemetry includes blocked contact as a successful connection; it does not imply full damage.

Broxton is strongest under these simple scripts, which repeatedly close and exploit his intended grappling strength. Nova has a lower survival result after opponent adaptation changes. No HP/damage homogenization was applied on the strength of bot policies alone. Human Normal-difficulty sessions with each hero, especially Nova versus mixed groups and Broxton repeated grabs, are the next balance priority. Forest volley is now blockable/chipped with piercing falloff and longer intended timing, rather than guaranteed force damage.

Interpretation limits:20s fixtures can time out; surviving is not equivalent to clearing. The benchmark is deterministic when rerun from both retained source versions. It does not measure controller ergonomics, human reaction windows or hardware frame pacing. Existing character-specific combat/animation suites provide the broader mechanics coverage.
