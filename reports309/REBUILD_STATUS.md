# Airport309 recovery checkpoint

This checkpoint restores the airport prototype after unpublished scratch work was pruned. It is NOT a published or release-approved build.

Implemented: 13 selectable/practice scenes; shared departures/check-in/escalator route; airside shuttle/bus/security/gates/private-aircraft route; customs/baggage/arrivals/limo route; native adaptive enemies; maximum two locked encounters; native Director; health/hero-preserving travel; walking transition; escalator elevation and fade; delayed automatic bus arrival; TBD endpoints do not award a false victory.

Targeted verification: tests/airport309.cjs, 295 assertions passed (both route graphs, duplicate/uncleared travel rejection, all seven heroes, Director admission limits, native spawning, section registry and start menu). Administrative clear fixtures test route logic, not a complete combat playthrough. Full release/browser/manual art checks have not yet passed for this checkpoint.

New environment atlas art is original detailed pixel art and remains prototype art. The user's subsequent request for a modern hand-drawn treatment is represented by source-art/airport309/hand-drawn-style-preview309.png. That image is an illustrated visual concept, not an actual game capture or replacement animated sprite set. It retains Reina's identity and bright-blue dress. No proprietary Streets of Rage assets are used. Do not claim the style conversion or full airport release complete.

The prior Gate12 no-dist-change test now protects every pre-airport production JavaScript file against f152ab22bfc62ef25647d053d9c1b3077813c923; new modules/index/new art are allowed. Existing combat, controller and renderer files remain unmodified. The financial-crash-frontage background has a high-quality WebP re-encoding to respect the static deployment size cap; original bytes retained under source-art/airport309. This is a lossy background change, requires visual review, and is not an unchanged-art claim. Asset inventory was not silently reinitialized.

Remaining: hand-drawn production art decision/implementation, rendered scale/traffic/exit alignment inspection, live-browser interaction testing, initial/release QA and publication. Both boss identities remain TBD.
