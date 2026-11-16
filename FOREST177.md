# Forest combat overhaul 177

Checkpoint: `checkpoint-before-forest177` at ab74b6abad39d78e1b75f25a93698151f35bba55.

Six synchronized moves use the existing grappling session and companion controller. Forward/back mean toward/away from Forest's facing. Front neutral J performs two knees, a two-handed bow strike and three guaranteed target bolts. Front forward+J performs a spinebuster and two ground stabs; front back+J performs the poison takedown. Rear forward+J overlaps two slashes with Gunner's standing leg bites; rear back+J performs the overhead dump and optional maul. Front grab L performs three stabs and Gunner's takedown/maul, consuming the existing special resource only when available.

| Move | Normal damage | Mandatory / vulnerable recovery frames |
|---|---:|---:|
| Front combo | 30 | 104 / 14 |
| Poison takedown | 20 | 68 / 18 |
| Spinebuster | 24 | 110 / 22 |
| Rear slashes / bites | 28 | 66 / 14 |
| Overhead / maul | 30 (18 solo) | 70 / 20 |
| Grab Special | 46 | 86 / 24 |

These conservative starting values preserve the other heroes' grappling advantages. Ordinary Forest combo remains36. Gunner can finish independently after Forest is released. He approaches physically, retains stun vulnerability, and cannot overlap another scripted task. Rear neutral retains the existing knee/spin action.

Successful eligible poison lasts6 seconds: attack power−15%, defense effectiveness−15%, ordinary movement−20%, no attack-speed change. Chances: standard35%, strong20%, explicitly permitted mini-boss10%, bosses disabled. No stacking or refresh. Failed poison adds0.5 seconds grounded. Purple tint preserves sprite detail. Overhead theft rolls15% once per eligible completed attack, from finite ordinary money/phone loot; one successful drop per enemy and shared death-loot ownership prevent duplication.

The five-bolt special retains piercing100/70/50% per target,27-frame startup,11-frame intervals,33-frame recovery. Guard chip18%, reduced push and moderate pressure. Confirmed front-grab bolts cannot be guarded by their reserved target, but still follow actual trajectories. Other targets retain ordinary collision/guard rules. Delayed once-per-startup defensive attempts target30% of eligible enemies. Melee enemies can close distance within the existing pressure budget; ranged and flank personalities remain.

Protection derives from the owning successful synchronized action, not generic invulnerability timers. Startup, ordinary holds and recovery remain punishable. Ordinary damage during the committed phase is discarded, never queued. Explicit lifecycle diagnostics cover commitment, impact, release, protection end, recovery and interruption. Cancellation, target removal, scene changes, defeat and companion stun release ownership safely. Gunner does not inherit protection. Forced fire defaults to a maximum3 nonlethal damage during the protected segment, without deferred debt; startup/recovery fire remains dangerous.

Preserved: appearance, portrait, sprite scale, charge, Blitz, counters, four companion modes, level geometry/progression, environment seeds and controller mappings.

Validation: six moves, both facings,30/60/120Hz; cleanup scenarios; all four Gunner modes; actual bolt trajectories/piercing/chip; poison/finite theft; simulated standard/raw Sony/DSX controls; current combat regression, cabin fire, environment and controller suites. Browser inspected overhead support/ground-stab positioning. Physical controller and human balance/performance certification remain unverified.

## Art provenance
Built-in ImageGen, identity-preserving supplemental atlas. Production asset: `dist/assets/sprites/forest-grapples177.webp`,1536×1024,8 poses,349442 bytes. Existing art retained. Fixed import scale and grounded anchors, cached alpha extraction. Full prompt:

Use case: identity-preserve. Asset type: production 16-bit beat-em-up sprite atlas. Reference image shows Forest, use it ONLY as identity/style reference, do not edit the old atlas. Create ONE NEW eight-pose atlas, exactly FOUR columns TWO rows equal cells on genuinely transparent background, no text/no grid/no shadows/no enemy/dog. Forest same middle-aged bearded hunter, olive baseball cap and short-sleeve olive shirt, tan tactical pants, brown boots, backpack/crossbow gear, muscular average athletic build, same face/colors/proportions/pixel illustration detail. All eight figures face RIGHT, full body unclipped with generous gaps, exact same anatomical scale (do not enlarge kneeling figures). Each row shares a single horizontal FOOT ground baseline near bottom of cells. Top row left to right: 1 two-handed crossbow body striking forward at chest height, 2 knife stabbing straight forward at waist height other hand extended for restraint, 3 planted-foot overhead lift pose both hands high above his head elbows extended holding imaginary opponent NO opponent drawn, 4 overhead lift transitioning backward dump hands over left shoulder feet still grounded NO opponent. Bottom row: 5 low kneeling right arm drawn back high holding downward pointed knife, 6 same kneeling pose right arm fully extended down for a powerful downward knife thrust into empty ground, 7 half-risen crouch withdrawing knife from ground, 8 guarded standing knife pose with lowered center of gravity. Same scale throughout; tall standing characters occupy about80% of cell height, kneeling figures appropriately shorter. No blood or victims. Preserve his clothes and equipment exactly; no helmets, new weapons or costume changes. Crisp opaque bodies with clean true alpha cutouts.

