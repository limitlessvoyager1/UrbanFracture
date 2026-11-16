# Build 08 — defense and downward dash

Forward+L now uses distinct overhead wind-up, descending diagonal chop and low follow-through sprites, with a downward sword trail rather than the circular clear-out effect. Neutral L retains its own animation. Cost/damage stay 18 HP/36 for dash and 12 HP/26 for clear-out.

B (or touch BLOCK) holds a standing frontal guard. Normal incoming hits deal 25% damage rounded upward, minimum one, and cannot knock Reina down while guarded. Rear hits and grabs bypass the guard. Block does not cancel a committed action.

Press B within 0.18 seconds of an unarmed one-two/hook connecting to catch the punching arm. Cannot catch weapons or rear attacks. Catch lasts 1.8 seconds; G releases. J triggers a three-punch 28-damage knockdown combo, K a 22-damage knockdown kick, direction+J a 24/26-damage forward/back throw. Successful catches cancel the incoming punch and use paired wrist-grab/punch poses. Finisher, timeout, death and interruption cleanly unlink both actors. Heavy enemy punches can be caught, allowing leverage throws.

Removed Marcus's crouched recovery pose; he transitions from grounded to standing. Reina/Bruno/Jackal retain their recovery poses.

Built-in image generation created six Reina technique frames from her existing sprite identity. Asset: dist/assets/sprites/reina-tech-v1.png. Prompt: six transparent isolated full-body pixel-art frames, standing high block, two-handed wrist catch, overhead sword preparation, diagonal downward chop, low follow-through, straight punch; same costume and identity as existing Reina atlas. Metadata in dist/reina-tech-data.js.

Validation: defense tests cover damage, timing, four follow-ups, rear/weapon rejection, expiration and action commitment. Actual sprite loader/pose tests assert successful initialization and distinct technique art. All combat, renderer, poise, recovery, HUD and full-level regressions pass. Browser inspected downward slash and paired wrist catch in the stage.
