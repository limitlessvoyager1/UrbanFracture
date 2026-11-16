# Build324 — Nightshade and Industrial District recording corrections

Approved predecessor: e66d709716a6f32b073777eedeec59d12ced3656. Changes follow the supplied129-second recording. Existing damage values remain unchanged.

| Clip timestamp | Confirmed cause | Correction |
|---|---|---|
|16s,1:46|Laser added only6 units per pulse; reaction could finish between combo strikes|22 added units per pulse plus native hit displacement, .70s laser stun/.65s ordinary combo stun, finite .8s burn-smoke cue|
|19s|Rotated victim support ignored actual opaque floor bounds; late reaction renderer replaced synchronized prone source|Clamp actual rotated support, animate sweep fall before impact, retain one prone source through beatdown and release|
|19s|Baked baton and foreground baton used different representations|Common telescopic baton renderer in combo and beatdown contact|
|Recurring notice|Automatic rejected captures displayed manual failure text|Automatic failures remain diagnostics; manual notice throttled1.5s|
|36s|Knife origin located at handle end rather than center|Nightshade-specific handle-center correction with fist overlay|
|36s|Optional substation required full street clearance; hospital door reused|Enter between unlocked encounters via chain-link gate; cannot bypass locked battles|
|44s|Spin atlas frames used another sheet's .32 scale|Use spin atlas .4 scale; kick height138–139px versus idle139/walk140|
|1:01|Short authored combo cadence; shock state survived release kick|Slower individually readable stages and grab contacts; electrical cue ends on kick|
|1:14|Storage doorway reused generic door without building|Grounded corrugated storage frontage, roller shutter and mounted sign|
|1:51,1:58|Generic downtown route renderer overlapped native district arrows; storage exit faced wrong end|Native route owner only; storage right exit is real and returns to street|
|2:04|Street plates drawn without a support|Attached route plates to an anchored stop-sign pole|
|Background|Only fixed art/haze showed stack exhaust|Simulation-clock plumes from actual stack mouths with wind drift|

## Additional correction
Optional room return preserves actual street actors, HP, pending waves and Director state instead of replacing the unfinished street encounter. No loot reroll introduced.

## Verification and evidence
Native before/after captures: `before/combat.png`, `after/combat.png`, six scenery captures per version, `frankie-after.png` and JSON opaque bounds. Native render inspection caught an intermediate sweep pose returning to another ground position; the final sweep now settles at impact and remains prone. Gate mesh is clipped to its fence rectangle; GO labels moved above mounted entrance plates.

Passed: Nightshade257200 assertions, native input10;2761017;25812568;Repair262559 plus view85;Repairs322330;Industrial324220. Industrial31723643 route/hazard/Director assertions, phone32399 and Nightshade2646315 also pass.Nightshade267803 assertions pass; rerun log retained separately. Sweep timeline checks verify every post-impact frame retains the logical480 plane and prone source. Tests updated only where the user authorized slower timing or shock-ending behavior. No failed test waived.

Live managed browser: reloaded game, entered Industrial District as Nightshade, observed active enemies/scenery, paused successfully. This was a launch/render smoke test, not full browser choreography or physical-controller certification. Full campaign/release suite not run.

## Shipping and restoration
Original airport window-mask PNGs preserved under source-art/industrial324; shipping WebP replacements decode to exactly identical RGBA bytes. No mask/art quality loss. Exact source reversal receipts under tools/industrial324 compose before323. New220-check suite registered in QA. Source checkpoint and before captures retained. Standard512-byte TAR records required.

## Scope
No additional Master City Systems gate implemented. Gate4 PromptDrop remains next; mandatory Gate11 geography approval remains before final map artwork. No relationship systems.
