# Carmen taser alignment206

Input was one paused PNG, not a video. Confirmed screenshot defect: both taser leads originated below/detached from the barrel because world-space hardcoded70/-91 ignored the firing sprite's actual import/world scale. Probes were also drawn at that incorrect height.

New taser206.js measures frame6's barrel(352,823) against root(176,1053), atlas.39 and the renderer's actor/elevator scale. Leads start at the barrel; probe height is snapshotted at firing. The real projectile lane, lifetime, speed, damage, firing behavior and pause clock remain native. Same-lane hits/off-lane misses are unchanged. Modest bounded sag replaces the incorrect lower curve. Tether stops drawing when its firing action is interrupted, completed, replaced or its owner is down/dead/removed; detached probes keep their existing finite lifetime. Human Shield interception uses the same actual probe height, with backward-compatible fallback for older projectiles.

No character sprites or scales changed. No timing/animation defect can be established from a still image alone. Checkpoint checkpoint-before-taser206 preserves205.

Tests: taser206 covers both facings, measured origin, actual draw/camera transform, projectile height, same/off-lane contact, finite expiry, interrupted/dead/new-action/ended/despawned tether cleanup and elevator scale. current150, shield181, gamepad, controller157 and Orion205 integration also passed. Browser inspector taser206.html uses production sprite rendering and actual projectile ticks; inspected left/right firing attachment. This does not substitute for review of an unavailable video.
