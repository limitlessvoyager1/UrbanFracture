# Build 264 — Nightshade Gate 7

Scope: character counters only. Gate 8 is not implemented in this build.

Retained the authoritative Counter248 input admission, timing, meter costs, heavy eligibility, native119 synchronization, Gun255 projectile collision/ammunition, electrical resistance, native enemy recovery, and approved character presentation. Added a Nightshade adapter rather than another combat controller.

| Response | Behavior | Timing at 60 FPS | Base direct damage |
|---|---|---|---|
| Punch | Catch, takedown, grounded hand taser | 84 total | 38 |
| Kick | Catch into native front grab; next confirmed grab move +50% once | 38 total | 0 |
| Knife | Arm control, disarm, takedown, baton | 84 total | 44 |
| Special | Wrist laser, pushback, draw, three real handgun shots | 98 total | 64 |

Punch/kick captures require Attack after the visible stopped-limb beat. Special is available with at least three rounds and consumes exactly three at commitment. Knife response executes automatically. Long-weapon counter behavior is not specified for this gate and remains unavailable.

Shared meter costs: 15% attempt, 40% total regular success, 80% total heavy success. Heavy counters require strictly below 40% HP. Special retains the established nonlethal 8% maximum-HP cost. Kick bonus cannot bypass native heavy grab contests, stack, affect poison damage, or buff collateral.

Temporary states have finite cleanup on recovery, interruption, defeat, reset and transition. Floor taser presentation retains native enemy appearance and grounded pose. Hazard damage remains eligible during synchronized counters.

Two existing background files were losslessly repacked to fit the hosting limit. Full decoded RGBA, alpha and dimensions match archived originals; no scenery redesign or art approval was implied. See lossless-storage.json and preserved initial failure evidence.

Recovery checkpoint: Git tag checkpoint-before-nightshade264, commit 3d3391bca236640b562a0d19f65bb947246149d5. Restore/redeploy the prior saved Build263 version for production rollback; use an isolated checkout rather than discarding later work.
