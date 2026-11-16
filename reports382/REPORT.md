# Urban Fracture — Build 382

Reina corrections for original idle posture, weapon handling, aerial/Blitz scale, grab-combo appearance, Dragon Tail special counter, and neutral sword-stance strike.

## Changes
- Restored the original low, wide guard posture using her current blue-haired design. Eighty new poses cover affected idle, weapon, aerial, Blitz, grab, counter and neutral sword-strike states. All use a shared 148-unit anatomical registration; crouched and airborne poses retain natural compression.
- Replaced legacy grab-combo art with consistent loose-haired poses, and replaced affected aerial/Blitz art to remove ponytails and size jumps.
- Registered actual weapon grips per frame, including two-handed grips and finger occlusion. Native weapon collision and rendered weapons share hand coordinates.
- Restored Dragon Tail's leaping sword uppercut as the special counter: original 64-frame sequence, one 56-damage contact at frame 30, synchronized capture through the leap and landing cleanup. Replaced the later two-hit thrust/descending-blade override.
- Increased neutral sword-stance strike reach from 135 to 155 world units. Damage, energy and startup/recovery remain unchanged. Added a complete visible katana through anticipation, upward strike and recovery.

## Validation
Passed: new correction assertions (32), Build381 regression (204), grab regression (17,892), stance regression (2,249), input regression (32), weapon-family regression (484), updated unique/counter regression (91). Native full-render checks: 190; 560 captured frames across 14 scenarios, including four weapon families in both directions. Deployment package verifies exact retained source and assets and stays below the size cap.

The visual review uses the native simulation and complete current sprite renderer. Physical PS5 hardware and a live browser playthrough were not tested in this pass. Other existing moves continue through their existing render owners; this is an audit of the affected states, not every character asset.

Art was created with the built-in image generation tool using current identity and original posture references. Exact prompts and source images are retained in source-art/reina382. Checkpoint: checkpoint-before-reina382.
