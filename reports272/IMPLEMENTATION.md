# Build272 — Reina rear-grab hook kick

User video reviewed locally: Screen Recording 2026-11-07 090842.mp4 (8.7 seconds). Observed supporting-foot pivot, raised knee, heel extension across head, hooking retraction and landing. New twelve-frame full-body animation follows those phases. Rear grab + forward + attack replaces the old takedown/ground-punch sequence. Internal rearTakedown identity remains for native dispatch compatibility; hook272 identifies the replacement.

40 base damage, one knockdown. Contact at frame30, four-frame authored contact segment,66-frame total action at60FPS. No second ground strike or new collateral hit. Eligible Reina kick-counter rear-grab bonus remains50% (60damage). Native regular/heavy admission, contested heavy throw decisions, protection, flight and119 recovery/watchdog remain authoritative. Other grabs unchanged.

Reina releases her grip during pivot and takes a smooth80-unit backward step to create head-height heel clearance, constrained by valid bounds. No jump or combat-plane shift. Victim retains facing and logical ground lane, then whips backward through native descending flight (90unit displacement over.36s), with finite knockdown/get-up. Interruption and invalid target cannot create delayed damage.

New image-source twelve-frame4x3 sheet is retained in art-source272/hook-kick.png. Import tools/import-hook272.py uses one138/324 scale for every frame, nearest-neighbor sampling, binary transparency and opaque sole anchoring. No per-frame body resizing or whole-body blending. Existing rendering chain delegates all unrelated actors/actions. Presentation of released victim uses braced idle before contact and existing recoil art after contact; no additional combat controller.

Existing synchronized grappling inspector includes Rear hook kick. Browser checked right Marcus contact/recoil, mirrored Flint contact and backward fall/re-chamber. Screenshot browser-hook.jpg. These observations are not exhaustive artistic approval or physical controller certification.

Checkpoint: checkpoint-before-hook272 at26f76b6a05b7081d912be7dbedab7b3a164a3cab. Roll back through verified Git checkpoint, separately from developer balance defaults. No asset baseline approved or overwritten.

Test development caught an invalid edge fixture: camera was300units away from a hero placed at the world origin, so native visible-target admission correctly rejected the grab and the test performed an ordinary attack. Fixture now positions camera with the hero and asserts capture succeeds before issuing the finisher. Edge assertion uses actual combat bounds rather than the camera-follow envelope. No admission rule was bypassed or weakened. Exact40damage is still required at both edges.
