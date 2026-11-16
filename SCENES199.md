# Scene corrections 199

Checkpoint: checkpoint-before-scene199 (192342aa). Includes Grab198.

Niko is constructed with his selected identity before scene callbacks; missing frames never substitute another hero. Gus and Charlie use a consistent Forest-sized render and matching attachment scale. Route74 cars are375 units wide; their footprints remain solid after destruction for heroes and enemies. Native AI detours around wrecks, and loot lands beside the footprint. Fire is clipped inside the cabin and rendered beneath the opaque vehicle shell.

Riverfront enables the1920x1080 render path, retains780px panorama detail with nearest-neighbor sampling, and uses a shoreline-connected foreground mask instead of treating isolated water reflections as scenery. Boat wrap points stay outside the visible world.

Validation: scenes199, route74197, riverfront160, grab198, current150, environment162, environment-integration156, controller157 and gamepad suites pass. Browser reviewed Forest/Gus proportions and Niko at Riverfront. Physical controllers and human balance are not newly verified.
