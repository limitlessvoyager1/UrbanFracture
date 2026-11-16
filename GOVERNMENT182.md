# Government Sector

Checkpoint: `checkpoint-before-government182` (base e9ce48b02cb711c335f858b5be6e7267cee41683).

Start at Scene Select → Level 3 / Government Sector → Civic Avenue. All four heroes and existing controller inputs work. Clear each section, align with a gold upward marker and walk up. The street offers the courthouse front entrance and lower entrance, separated by380world units on the same final screen. Both routes reach Dirk. The Financial campaign now continues into Government Sector after Leroy.

Sections: Civic Avenue → lobby/offices OR holding cells → courtroom approach → Dirk courtroom → automatic secret floor hatch → tunnels → governor administration → private office. The front route reaches the courtroom directly; the basement goes through a stair/antechamber encounter. The private office is staged without an invented final boss.

Dirk:130HP; no guard or wake-up damage armor;0.75s wake-up grab protection; six-round magazine; visible0.62s gun startup; three-shot bursts;1.4s vulnerable reload; close pistol-whip and retreat. One Carmen and one Marcus support him. When Dirk falls, remaining escorts flee, then the player walks to the hatch automatically once the defeat animation settles. Existing pressure-budget logic continues to coordinate enemies.

Emergency ambulance, fire engine and patrol car use a separate environment-seeded traffic RNG, travel650–830units/sec, and appear7–13seconds apart after the first vehicle. Wheel rotation follows travel/radius, with all tire bottoms fixed on the road. Lights and optional sirens are runtime effects. Sirens respect the existing sound switch; reduced-motion uses steady lamps. Pedestrians and rioters are opaque, casual, grounded and reduced at night. Closed-cell captives stand behind bars; hostile inmates emerge from open cells.

Outdoor enrollment uses EnvironmentController162's reusable template. Every room retains the same environment object, clock, transition and seed; indoor rendering suppresses outside weather. Combat, heroes, prior scenery and controls are preserved.

Five new built-in ImageGen assets: government-street182.webp, government-court182.webp, government-office182.webp, dirk182.webp, emergency182.webp. Each panorama is drawn once across its section, with explicit row crops to prevent atlas-strip bleed. Dirk uses a constant sprite scale, planted sole anchors and a dedicated face portrait. Sprite alpha isolation removes export halos. Vehicle tires animate independently.

To fit the existing static-host limit, eight existing PNG assets were converted pixel-for-pixel to lossless WebP. Original PNGs are preserved in art-archive182; only literal URL extensions were changed. No existing visual detail was reduced.

Validation: tests/government182.cjs exercises both routes ×4heroes, battle lock, exact130HP trio, floor exit, tunnel/building/office progression, environment identity/seed, independent deterministic traffic, pause and original-route reset. current150's26 current-contract suites, shield181, forest177, environment162, gamepad.test, controller157 and scene-controller71 pass. The older standalone controller144 suite loads the pre-Maul simulation chain but expects the later `maulCommand175` action; this is outside the new level. Hardware PS5 testing was not performed; simulated controller paths were exercised.
