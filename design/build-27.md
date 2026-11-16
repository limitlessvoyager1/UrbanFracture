# Build 27 — late-stage lightning and thunder

Occasional smooth pale-blue lightning illuminates the playfield from the condo district onwards, excludes the Velvet Room interior and fades, and strengthens in Jackal’s alley. First strike after5–10 seconds of eligible outdoor time; later flashes15–27 seconds apart (10–22 in alley). Each flash lasts.65s with max13% overlay; HUD untouched. Reduced-motion mode suppresses flashes. Thunder follows.65–1.75 seconds later, using filtered procedural low-frequency noise with a2.8s fading envelope, respecting Sound On/Off. Timers follow simulation time and stop when paused. Indoor entry/fades cancel queued thunder. Reset clears weather.

Validation: storm scheduler regressions plus existing combat and controller suites. No new sprite assets or input changes.
