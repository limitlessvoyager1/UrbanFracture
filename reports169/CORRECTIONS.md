# Corrections and verification169

This is an incremental audit of the existing production chain, not a replacement engine. Geometry, routes, encounter definitions, health identities, controllers and the seeded environmental simulation remain in place.

## Confirmed defects corrected

1. Forest's piercing volley used force damage and full push through guards. Frontal guards now receive18% chip and15% push without automatic guard break. Piercing damage falls to70% on the second target and50% thereafter. Five shots retain unique projectile-target sets and original firing action identity.
2. Volley timing is now27f startup,11f between shots and33f final recovery,104f total. Other counters/projectile behaviors remain separate.
3. Ordinary grounded grabs and Broxton's former ordinary wake/down bypass could bypass recovery. Ordinary grabs now require a standing eligible victim, with0.75s post-wake protection and an additional1.5s after two successful ordinary grabs within6s. Counter and paid special rules remain character-specific. Protection is against grabbing, not all damage.
4. Director repetition used6s and28% with no fading memory. It now responds to three observed uses within8s, starts at35% propensity, waits for existing observation delay, then decays confidence when tactics change. It retains one3-point pressure budget and individual enemy choices.
5. A stale blockFlash could incorrectly mark an invulnerable rejected hit as connected. Only a new block event can confirm it now.
6. Detached Forest projectile telemetry could be attributed to a later action. Firing ownership and distinct strike serials are now retained.
7. Reina's German recovery lacked an actual kip-up art sequence. Four new fixed-scale recovery cells play from66–90f without changing throw impact, world root, total duration or shared victim recovery.
8. Repeated environment.effective()/lighting samples for each fighter shadow were unnecessary. Background, shadows and foreground now share one frame sample, refreshed each background pass even for same-time developer overrides. No lighting-cache rewrite or weather rescheduling.

## Existing behavior verified and preserved

The current regression chain already provides opener-whiff combo cancellation, actual active contact windows, action identifiers, legitimate multi-hit target accounting, damage-taking armor distinct from invulnerability, shared paired release/recovery barriers, planted charge/gait rigs, Nova DDT/Exploding sequences, Broxton paired powerbomb/spear, Gunner distance gait and command hysteresis, Forest hand-contact anchors, Bruno/Flint committed windows and punishable recovery. These remain owned by their existing modules. See ARCHITECTURE.md and runtime-ownership.json; deleting predecessor wrappers would remove working behavior.

## Developer tooling

New hidden animation169.html uses the actual production controllers and art. It supplies pause, frame and10-frame advance, playback rates, solo/mixed fixtures, paired-move controls, root/scale references, anatomical/contact overlays, synchronized phase/impact data and Gunner diagnostics. It never substitutes a demonstration combat engine. New bounded telemetry supplements existing counter/grab/armor/down/lock metrics with unique action contact rate, regrab rejections, anti-air attempts, crossbow chip and Gunner command/completion counts.

## Environment and performance limits

The deterministic scheduler, independent environment RNG, save/load, seek, future outdoor enrollment, indoor clock and temporary overrides were regression-tested unchanged. The existing128MiB albedo/sky/emission cache limit and160 pooled rain particles remain. Visual sampling work is reduced from background+per-shadow+foreground to one per background pass. This is an operation-count improvement, not a measured hardware60FPS certification. Large first-use artwork extraction and cache churn remain candidates for a separate profiling task. No repeated failed lighting-cache optimization was continued.

## Known issues and deferred validation

- The168 scripted encounters are repeatable engine probes, not human difficulty or competitive balance certification. Broxton dominates the simple policies; Nova needs human playtesting against mixed groups before numerical tuning. See BALANCE.md.
- Physical DualSense USB/Bluetooth/DSX hardware and low-end GPU frame pacing were not available. Simulated controller regressions passed; browser launch, movement, attack and inspector were checked.
- Generic inspector hurt/contact boxes are logical predicates, not per-pixel collision masks; some older move definitions expose only root/phase rather than explicit hand anchors.
- Classic-script wrapper architecture remains complex. The ownership map documents it; gradual consolidation is deferred to avoid destructive broad changes.
- Existing composite scenery still contains baked lighting; no complete asset repaint or level rebuild was attempted in this combat audit.
