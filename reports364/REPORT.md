# Build364 — Nightshade weapon-throw scale correction

Checkpoint: checkpoint-before-throw364 at e1e3cc009e4f4b8c3f73a6135ff8da498e4815b9.

The native weapon276 pose set used scale0.511727 (standing frame285px =145.84 local units), whereas current Nightshade idle is134. All eight native weapon pose definitions now use one standing-calibrated scale134/285=0.470175. This covers the short/long throw windup and common release frame, as well as weapon idle/pickup/attack transitions, avoiding a size jump at either end of the throw. Crouched/leaning poses retain their natural height differences; they are not individually stretched to134.

Hand vectors are multiplied by the identical scale ratio. Source anchors remain unchanged, so feet stay grounded, overlay hand crops address the same pixels, and the native projectile is released from the corrected wrist. The throw still takes0.66s; weapon dimensions, uses, attack profiles and other characters are unchanged.

Files: dist/nightshade-weapon276-data.js; canonical/review cache versions and Build364 label. Evidence/tests: tools/throw364 and reports364/throw-scale-proof.png, verification.json.

Passed361 native render/scale/grip/release assertions: knife/pipe/chain, both facings, actual throw startup/release/recovery, six corrected projectile origins and unchanged native timing. Standing weapon frame is134 units, matching normal idle134. Also passed active combat352 suite180, ammo removal291, syntax, shipping dependency order and diff checks. Proof compares normal idle, armed idle and throw poses at a single fixed display scale/baseline.

Native evidence is not browser/physical-controller certification. Prior manual/performance holds remain. Full campaign source retained; current published review remains Downtown. Next check: manually repeat weapon throws in the playtest.
