# Broxton animation repair189

Rollback: checkpoint-before-broxton-repair189 at cf391b3242f81e0f7fbfe75cb2e33cf0f9e3b16b.

Clothesline: same68-frame duration,170world-unit travel,64primary/48secondary damage. Full connected body poses replace the previous split airborne torso/run legs. Startup1–12 remains vulnerable, acceleration13–22, contact23–43, deceleration44–55, recovery56–68. Two-frame impact stop and heavy body sound per unique victim. Strong-enemy knockdown rules unchanged.

Tackle: shared40-frame initial slam and26total damage unchanged. Mounted punches59/68/78/87 replace59/67/75/83 (approximately17% longer first-to-fourth spacing); punch section54–92 is19% longer. Mandatory action114frames. Dirk's outer custom renderer formerly bypassed the shared paired/ground path. The repair uses his own standing/falling/lying frames with calibrated ground/head anchors, and obeys the shared trajectory and recovery session. Four deliberate punches, no floating standing sprite. Existing defensive dismount remains.

Shuffle: configurable58x1.25distance,9unit low hop,.38s,15defense. A correctly timed eligible forward pivot costs20 total and follows a visible bounded path behind the target when possible; it grants a.5s manual grab opportunity without attaching automatically. Mistimed forward dodge costs15. Universal2s cooldown starts once. Insufficient meter rejects cleanly.

Recovery: Broxton cannot initiate a roll. Six whole-body ground-to-kneel/get-up poses lead to guard, and natural wake protection is.5s. No attack, grab, counter, Special, Blitz, charge activation or outgoing collision damage during protected wake. Other heroes keep their existing recovery animations and timers, with the same nonoffensive protection rule. Iron Will10s/75s remains independent.

Artwork: built-in image_gen, exact prompts in design/animation189-prompts.json. Assets dist/assets/sprites/broxton-repair189-0.webp through15.webp and court-npcs189-0.webp through3.webp. Fixed atlas import scale in animation189-data.js; skin, tattoos, pants and boots retained. Targeted neutral bright tank pixels in Broxton's run/new frames use a muted ivory ramp; no global hero recolor. Existing weather/indoor lighting still operates on the complete world pass.

Courtroom judge and bailiff are rendering-only, subtly alternate between frightened poses and duck during Dirk's gun preparation. Judge is clipped behind his bench and bailiff behind the gallery rail. They never enter actor/target/collision/enemy-clear lists. Dirk's130HP and combat AI unchanged. Courthouse floor188 retained.

Developer review: animation189.html provides pause/play,1/10-frame steps,25/50/100% playback, full-body floor/hurtbox/contact guides, attack window, position/elevation/scale, shared session, damage contacts, dodge distance/cost and wake timer. Two14-category comparison pages cover the five heroes and Gunner under neutral lighting, with PNG export. Static samples are representative production poses, while synchronized moves use the live simulation. This is not a claim of exhaustive human playtesting of every frame. No new reference video was attached to this request; the written choreography and supplied project artwork were used.

Validation: animation189 targeted simulation, current150's26suites, broxton179, government182, courthouse-floor188, shield181, environment162, gamepad.test, controller157, niko-counters186 and rising-blade187. Browser checks: grounded multi-target clothesline, Dirk slam/mount, appearance sheets, courtroom NPC depth. Simulated controllers only; physical DualSense testing and user balance review remain external.
