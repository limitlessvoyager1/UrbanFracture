# Subway Station — Build 238

Checkpoint: checkpoint-before-subway238 at9854f19edd8ddf3d177695e77e363b2b2aa270fa.

## Route and architecture

Slums Arnell/Colt finale → Central Station (3900 world units) → downward cleared service stairs → closed maintenance tunnel (3400) → departure platform (3600) → automatically board after the final enemies land and the hero approaches the waiting train → destination selection inside the car.

Four native Scene Select entries support direct starts and current-section retry/restart. The old slums-subway-arrival entry now starts the station. Actual Colt intro/fight/outro/level-clear handoff was tested, not only the spawn hook. Same hero, HP, score, resources and global world are retained across fades. No boss or unrequested destination is invented. Destination configuration is Subway238.configureDestinations([{id,name,start(game)}]); only configured routes become selectable. Until then the screen explains that destinations are pending and offers Return to Platform. Returning preserves the same platform item objects (no regenerated pickups) and restores the cleared platform without enemies and requires an explicit upward GO to reboard; automatic boarding does not loop.

Uses existing148 combat admission, Adaptive/Locked222, native enemy spawning and visible entries,119/198/223 synchronized throws and162 environment registration. No new global combat, weather, input or encounter controller. Maximum two locked encounters per combat section; no enemies or locks in the train menu. Indoor weather exposure is disabled while the existing clock continues. New route logic precedes Input226. HUD, ready assets, accessible scene names, 2x rendering, GO foreground, retry and native keyboard/standard/raw/DSX reader integration are extended in game.js. Ordinary hero attacks remain unchanged.

Finite varied enemy lineups use Marcus, Kevin, Frankie, Carmen, Bruno and armed/unarmed Flint. Train traffic and civilians are cosmetic and never damage, block or create unavoidable attacks. Native arena tracking/reentry remains authoritative.

## Artwork and animation

Four original detailed backgrounds: tiled station/street stair entrance and ticket booth; closed concrete service tunnel/tool alcoves/cables; departure platform/benches/maps/vending; stainless car interior. Two transparent train sprites show closed and open doors, warm passenger silhouettes and blue stripes. Live digital schedules are authored on the display screens; ambient service destinations do not assign the hero's next route. Passing trains move in opposite directions behind authored platform-column openings. The waiting near train is rendered much larger than distant traffic, with undercarriage occluded by the platform so its door threshold aligns with the boarding edge. Boarding uses actual slow movement and a short final step before a covered fade.

Existing casual/bank passenger art is reused with fixed per-person variants, opaque-sole measured caches and finite running paths. Waiting and frightened people stay grounded. No extra sprite scaling per animation.

Built-in image generation supplied both original atlases. Environment prompt: four horizontal detailed 16-bit panoramas of an authentic multi-track station, closed maintenance tunnel, departure platform and subway interior, no people/trains, blank LCDs, open foreground floor. Train prompt: two complete orthographic stainless/blue subway cars with closed versus central open doors, actual transparent background, passenger silhouettes, wheel bogies, warm interiors, no ground. Importer tools/import-subway238.py records measured unequal row boundaries (0/215/414/590/724) and retains alpha. Final assets: dist/assets/subway/{arrival,maintenance,departure,car,train-closed,train-open}238.webp. No existing background is replaced.

Two existing sprite files were repacked losslessly after normalizing invisible RGB only. Alpha and every visible RGBA value remain identical; qa/subway238-lossless.json verifies the size reduction. No dimensions, anchors or art changes.

## Audio

SubwayAudio238 uses the existing user-enabled AudioContext: one pooled seeded rail-noise bed, traction motor, filtered rail roar, timed wheel-joint clatter, air-brake hiss and a two-note door chime. These are original synthesized transit sounds, not field recordings. Noise has its own deterministic stream and consumes no AI randomness. Audio tracks simulation time/proximity, muffles in the closed tunnel, and stops/disconnects on pause, mute or leaving the level. Sound must be enabled using the existing Sound button. No additional global audio loop or autoplay permission is required.

## Validation

PASS tests/subway238.cjs: all six heroes at30/60/120Hz, all three combat sections, max2 locks, downward depth/input gate, shared player/world, tunnel transition, automatic boarding, stationary no-resource-spending train menu, configurable destinations, manual return/reboard, neutral-gated gamepad confirmation, native Slums handoff and actual Colt complete sequence.
PASS tests/subway238-view-audio.cjs: six assets/four scenes/camera edges/train directions/finite coordinates, pooled audio creation and pause/mute/exit cleanup/restart.
PASS existing prison224-all, gamepad.test, controller157, playtest226, Slums204 and Stadium237 suites. Generated Director/Prison result files are not part of the change.

Browser QA reviewed the actual main-game station start and detailed staging views for station/civilians, maintenance tunnel and waiting train, real destination dialog and keyboard return to cleared platform. Physical DualSense operation, subjective speaker/listening quality and human combat balance are not certified by these tests.
