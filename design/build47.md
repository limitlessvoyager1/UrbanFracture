# Build 47 — grounded steps and revised alley fight

Saito, Akari and Carmen now use explicit full heels and flat soles in contact, instead of sampling the raised-heel foot art. Steps cover a longer stride, with continuous connected leg silhouettes, textured fabric, and distance-matched cadence. Brick and Jackal use their own proportions and body art with the same stepping system; Jackal's closing weapon rush also steps. Their movement speeds are unchanged.

Flint's knife uses four dedicated one-handed poses: upright ready/recovery, straight stab, diagonal slash, and deep lunge stab. Other weapons retain wild multi-swing and powerful single-swing moves. Pattern variety is two wild sequences then a powerful attack. Attack duration is now 2.20s for wild attacks or 2.05s for powerful attacks, followed by a one-second recovery flag. He stays upright after attacking. The weapon's idle grip is positioned at his hand rather than inside his torso. Knife geometry uses a pointed blade, guard and handle. Jackal's knife is also drawn with this clear silhouette and registered to his grip.

Marcus has a step-in hook at modest distance and the existing close three-hit combo. His low-health conditional knife draw remains. Assigned guard states are respected only rarely (15%); normal Marcus AI does not create a blocking stance. Frankie can be interrupted during his anti-air, and chain lash/sweep startup is two frames longer. Brick's hook/dash punch has at least one second after the hit before action completion, does not guard during recovery, and can be punished after a blocked strike.

Standing dodges cost 25 defense for Reina and Broxton, refuse below 25, and only charge on an accepted use. Recovery rolls remain separate. Reina's forward kick counter is now a dedicated dashing face-height forearm with accelerating forward movement and a 34-damage knockback launch. Counter meter/timing and health gates remain unchanged.

## Alley sequence

1. Marcus and Kevin together; Jackal is protected in the background.
2. Wait until they have landed, then one Bruno enters from below the screen.
3. After Bruno lands defeated, the crate introduction runs with two escorts flanking Jackal.
4. Jackal fights alongside Marcus and Kevin. No Bruno or Carmen is added during this fight.
5. A guaranteed full heal is placed near the visible entry at the start of Jackal's introduction. It restores either hero fully when collected. It is one pickup, not an endlessly respawning heal.
6. Boss defeat keeps the existing flee/settled-defeat transition into Level 2.

## Validation

67 test files passed, including new tests for both heroes' exact dodge cost and insufficient-meter rejection, actual PS5/DSX Circle inputs, Marcus attack selection, Frankie interruption/startup, Brick block-punish, mixed Flint patterns/long recovery, the forearm launch, and the complete gated alley sequence. Walking tests exercise 320 poses across five actors, checking finite joints, a planted full sole each phase and longer stride. New sprite tests check all knife/forearm assets. Full ordinary-input routes pass; route bots now conserve defense rather than using free dodges. Existing controller USB/raw Sony/Bluetooth/DSX simulations pass. Physical hardware was unavailable. Additional renderer regressions passed after the final rush animation change. Browser QA inspected the new walking, knife/recovery and forearm poses. Temporary QA page removed before packaging.

## Artwork

Built-in ImageGen, existing Flint and Reina atlases as identity/style references. PNGs copied unchanged and alpha retained:
- dist/assets/sprites/flint-combat47-v1.png — /workspace/scratch/1f76d3935611/generated_images/exec-7d16caf4-c870-425f-a874-cb01a1933890.png
- dist/assets/sprites/reina-combat47-v1.png — /workspace/scratch/1f76d3935611/generated_images/exec-ed4bae5e-935e-4cd9-8e9c-d1d7818041e9.png

Metadata: dist/combat47-data.js. No uploaded screenshot was modified.



