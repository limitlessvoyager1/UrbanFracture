# Downtown destination selection

Checkpoint: checkpoint-before-route183 at e2c2f49c052f74c9747ebb1ca8c7a3d510aa931d.

Both Downtown Jackal endings (original alley and hotel-route Midnight Club VIP) retain their existing defeat settlement,5000-point reward and3.5-second clear screen. They now open one persistent destination screen with Financial District and Government Sector. There is no timed/default selection.

Keyboard arrows/WASD select and Enter/Space confirms. Mouse/touch clicks choose directly. PS5 D-pad/stick selects and Cross/Options confirms; standard DualSense, raw Sony and DSX use the existing Reader. The controller must first return to neutral, preventing the boss-fight button from choosing accidentally. Combat, simulation and environmental clock pause during the choice. Gameplay input cannot leak through. Score, kills, lives, hero, companion state and environment object carry into the selected route. The original Financial entry/crash and its health refill are preserved; Government uses its existing persistent-session entry.

Implementation: destination183.js after government182.js wraps the common clear/transition handoff. destination-ui183.js owns a responsive DOM screen using the same finite list/state. Reset clears pending choice; transitions consume it once. Uptown and existing individual encounters remain unchanged.

Validation: destination183.cjs covers alley/VIP ×4heroes ×2destinations, single completion bonus, clear timing, indefinite wait, frozen world, input lock, invalid/duplicate selection, scene reset and standard/raw Sony/DSX neutral/edge/confirm. government182, gamepad.test, controller157 and current150's26 current-contract suites pass. Browser fixture verified the actual clear-to-choice UI and keyboard selection/confirmation. Hardware controllers were not physically tested. Screenshot: qa/routes183/destination.jpg. The saved browser fixture is source QA only and is not hosted.
