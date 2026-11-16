# Native contact-frame index

These timestamps refer to the attached three-second Urban Fracture captures. Capture frame numbers are zero-based; video frame 0 displays the first completed tick at video time 0. Native simulation time is stored separately in each JSON trace. Uppercut admission includes an additional 0.2 seconds of native simulation setup. Both builds have identical damage events.

| Scenario | Capture frames with damage | Video times (s) | Actual damage |
|---|---|---|---|
| bruno-combo | 19, 34, 49 | 0.317, 0.567, 0.817 | 12, 12, 14 |
| bruno-grab | None — intentional whiff | N/A | 0 |
| bruno-hook | 19 | 0.317 | 19 |
| bruno-uppercut | 17 | 0.283 | 19 |
| marcus-combo | 16, 30, 44 | 0.267, 0.500, 0.733 | 5, 5, 8 |
| marcus-hook | 27 | 0.450 | 10 |
| marcus-knife | 14 | 0.233 | 14 |
| marcus-slash | 19 | 0.317 | 14 |
| reina-blitz | 10, 20, 31 | 0.167, 0.333, 0.517 | 8, 8, 14 |
| reina-combo | 9, 38, 74 | 0.150, 0.633, 1.233 | 7, 8, 10 |
| reina-dash-sword | 7 | 0.117 | 35 |
| reina-held | 14, 47, 85, 127 | 0.233, 0.783, 1.417, 2.117 | 6, 6, 5, 6 |
| reina-sword | 9 | 0.150 | 28 |
