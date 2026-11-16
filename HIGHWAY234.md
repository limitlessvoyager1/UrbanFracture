# Highway Under Construction — Build234

Recoverable checkpoint: checkpoint-before-highway234, published Build233 source812c9b014aaf1628811ed6858b00ae8b75f7018d. The previous saved Site version remains available for rollback.

Two main scrolling stretches follow the current Prison Warden confrontation. The existing pending Warden boss design remains untouched; an interim forward GO exit connects to the highway after dialogue. Five Scene Select starts cover the approach, roadworks, trailer and two destination arrivals.

Construction approach: visible arrival on-ramp, skyline/interchange, modern abandoned sedan/SUV/pickup, optional full-size semi/trailer, cones, barrels, potholes and open deck holes. Roadworks: numbered advance signs and Exit18 Airport; continuing leads to Exit19 Hydroelectric Power Station at the concrete-barrier dead end. Exits use normal Up/GO transitions. Both future destinations have explicit arrival placeholders and a return route, without invented combat or victory.

Existing Adaptive222/LockedBattles222 own finite encounter waves, camera, pressure and offscreen/reentry restrictions; maximum two locks in each main section and one in the optional trailer. No new combat director. Regular enemies only from configured pools; no Dock Workers/Spectre/Torrance enrollment in this location.

The optional trailer can be skipped. It clears three looters, creates its health/item rewards once, then offers a left GO exit whether rewards are collected or left behind. Returning restores highway actor/item/prop/pending-wave/encounter references and removes that trailer entry GO. Airport detours likewise preserve the remaining roadworks waves and vehicles.

Shared Slums203 pit functions accept an optional level adapter; prior Slums behavior remains the default. Player falls cost12HP, animate for0.65s, respawn beside the near edge, then give exactly1s invincibility plus edge grace. Valid jumps and mandatory synchronized grapples are preserved. Knocked/thrown enemies can fall through openings inside the shared arenas; native damage/drop/score and tracked defeat occur once. Walking AI steers around open holes.

Modern vehicles have40HP, native197 collision/contact rules, intact/destroyed artwork and one guaranteed collectible reward each. Destroyed vehicles stop blocking. A Highway-only Orion contact adapter connects the rebuilt physical combo to native vehicle damage; other character moves and unrelated areas are untouched.

Visuals: original generated16-bit highway/trailer background atlas and transparent modern-vehicle atlas, imported under dist/assets/highway. Green signs/exit numbers are engine-rendered for exact readable text. Sky segmentation supports existing dynamic sky/weather/lighting; trailer remains indoors. Existing assets were repacked losslessly to fit hosting: each changed sprite verified byte-identical decoded RGBA; qa/highway234-lossless.json records sizes.

Verification: tests/highway234.cjs and highway234-integration.cjs cover all six heroes, both destinations, optional return with uncollected items, partially unspawned waves, same actor/environment identities, shared lock budgets,12HP falls/exact1s protection at30/60/120Hz, jump/sync protection, native launch pit defeat/arena release, real ordinary attack contacts against vehicles, unique safe rewards, retry/reset and Prison continuation. Docks231, Slums203, Workers233 integration and full Prison224/current combat/grab/controller/weather regressions pass. Browser inspected entrance/skyline/vehicle scale/trailer; physical DualSense and full human balance playtests not performed.
