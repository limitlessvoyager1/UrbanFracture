# Forest front-grip layering repair

Checkpoint: checkpoint-before-forest-grip146 / Build145.

Confirmed screenshot defect: Forest was sorted after the victim, so both arms/hands appeared in front of the torso. The front idle shoulder hold now renders Forest/far arm behind the victim, then overlays the near forearm/hand using the same existing fixed-scale sprite and hand anchor. This places the victim between the hands. No joint stretching, sprite redesign, grab range/timing/damage or victim position changes. Rear/counter/active throw art is untouched.

Browser checked Marcus facing right and Bruno facing left. Ten mirrored grip fixtures confirm one clipped near-hand pass, no gameplay mutation and release cleanup.308 grapple recovery/lane cases pass. Current inspector has a Forest Front Grip fixture for regression review.
