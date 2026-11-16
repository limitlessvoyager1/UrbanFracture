# Counter and weapon architecture audit · Build248

Recovery checkpoint: checkpoint-before-counters248 (Build247 source7c45c36b2be9ec729fc1d409b43fc4ee54695de3).

Confirmed defects before changes:

- Counter admission was split across core/counters, weapon-counters122, broxton-counters51, forest-counters127, niko-counters186, rising-blade187 and orion-combat205. Costs ranged from10% to100%, gates varied between50% and60%, and some responses executed immediately while others auto-resumed after a brief capture.
- Disarm effects were cosmetic objects without an authoritative hero equipment inventory, collectible floor weapon, or five-use lifecycle.
- Human Shield's victim view explicitly cleared heldBy and stun, selecting an idle pose.
- Reina's grounded Down+Attack path remained reachable.

Current integration:

- weapons248 then counters248 load after input226/forest-qa239 and before woods139. One new admission override bypasses the legacy R1 paths; existing movement, damage, enemy AI, universal grabs223, synchronized-session119 and status infrastructure remain authoritative.
- Punch/kick capture enters a shared119-owned hold. Follow-up damage events are individually deduplicated. Timeout is non-damaging. Automatic weapon responses use the same hold/cleanup sequence. Heavy classification uses universal223, keeping both Aidan variants regular.
- New per-hero timelines select approved existing complete-body counter frames and new pose timing; paired movement uses the actual victim. Normal knockdown/get-up and post-throw protection remain shared. No separate enemy knockdown controller was introduced.
- Broxton's shield renders a restrained body. Specialized enemy families retain their own reactions rather than receiving a generic replacement body.
- Foreign weapon pickup/attack/throw is a small action extension on the existing Brawler start/advance/finish pipeline. Hand attachment metadata selects each physical weapon shape. Shared damage handles enemy reactions. Orion uses the existing electrical resistance/retrigger system; Nova/Niko arm injuries use Niko185's status system. Forest's dog moves through the existing navigation function and cannot maul while unavailable.
- E/R3/touch pickup is added to the current keyboard/gamepad/touch bindings and existing controller setup. No second input reader.
- Current counter/weapon state is appended to the existing Audit135 report.

Normal tuning choices not specified numerically by the user:12-frame Reina/Niko,8-frame Nova/Forest/Orion,6-frame Broxton timing windows; minimum11-frame visible catch and53-frame confirmation deadline. Existing Counter Special8% HP costs are retained on confirmed activation; defense costs are replaced by the requested40%/80% totals.

Art pipeline: five character-specific eight-pose sheets plus a separate anatomical left-facing Orion sheet were generated with the built-in image tool, using retained character references. A second pass removed baked held props to support knives/scalpels/pipes/bats/planks/crowbars at explicit hand anchors. Orion's first output had an invalid pale background and was rejected/replaced. Full source output is retained in art-source248, outside the hosted game; project frames are normalized once to the existing native pixel density, with fixed per-hero import scale and sole anchors; alpha is normalized once for opaque pixel-art bodies and transparent gutters. No approved existing character or scenery artwork was resized. Asset paths:dist/assets/combat248; prompts and import metadata:reports248.

Hosting capacity: retained assets were losslessly repacked only where exact decoded RGBA and dimensions matched. reports248/lossless-repack.json records old/new hashes and verification; inventory hashes were migrated only for those files, retaining their unreviewed approval status.

Verification boundaries: automated timing/state checks do not certify every artistic contact pose, every hero-versus-enemy animation pair, physical DualSense hardware, or human Normal-difficulty balance. Those project-wide manual gates remain open. Do not call this a stable build on the basis of unit tests alone.

Release testing also exposed a latent undefined N namespace in counters.js when a disarmed Kevin entered its legacy unarmed AI fallback. The local NeonCombat alias was repaired and a production-order regression added. Hydro progression then passed all six heroes at30/60/120Hz. Reina's native rear takedown was checked at34 ordinary damage and51 counter-enhanced damage; front switching was denied.

Final visual correction: a held prop drawn behind the entire body could appear as a disconnected tip at the shoulder. The runtime now draws body, physical weapon, then a10-pixel crop of the actual gripping hand. A20-case render-adapter test covers both facings and weapon categories and would detect the previous ordering defect. Counter holds retain the actual incoming attack pose instead of substituting idle. Explicit projectile/grab/hazard markers cannot enter the melee counter fallback. Cinematic, airborne-flight, synchronized and mandatory recovery admission is tested.

Current candidate includes48 runtime weapon frames (five heroes plus anatomical Orion L-facing variants); original sheets and deterministic importer are retained in the repository. They are candidate artwork, not automatically approved baselines.

Landing certification extension: landed counter victims use their own existing grounded sprite at the original sole anchor, rather than a held upright sprite rotated around an elevated hip pivot. Intermediate prone stages (Niko arm control, Broxton knife takedown and Forest sweep) use the same view-only adapter while the authoritative119 session retains ownership. Rugbeat, running cross and Nova vault endpoints are continuous; a new frame-by-frame test detected Nova's former frame47 endpoint snap before correction. Confirmed follow-ups retain protection through the native invulnerability timer; cleanup caps residual protection to.05s, while environmental forced mechanics remain on the established damage path. The stopped manual-selection hold adds no such protection.

Controls: the controller/own-tab links now resolve to this same Site instead of a stale hard-coded host. Existing Reina movement/sword and Broxton dodge descriptions are retained alongside the revised counter instructions.
