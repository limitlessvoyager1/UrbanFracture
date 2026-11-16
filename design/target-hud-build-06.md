# Build 06 — contact target HUD

Enemy names: standard thug Marcus, Enforcer Bruno, first-stage leader Jackal. Actor names are shared by the contact HUD and accessibility description; roster and Sprite Room labels use the same names.

Reina's health bar is blue. Enemy health is displayed in a single panel immediately below her top-left HUD upon body contact, a successful player hit or grab, or a successful enemy attack. New contact/attacks switch the selected enemy; holding keeps the held enemy selected. Defeated targets display zero health briefly, then clear. Restart and encounter changes clear the old selection.

Removed world-space enemy health bars and the separate bottom boss bar. Enemy wind-up warnings remain as text only. The target panel uses opaque near-black backing, a pale outline, saturated bright red fill, and light red highlight so storefront colors cannot obscure the health bar. Health numbers accompany the color.

Validation: tests/target-hud.test.cjs verifies names, target selection, defeat/reset lifecycle, blue/red fills, panel placement, opaque backing, and removal of overhead bars. Existing grab/render, combat, contact/poise, and full-level checks pass. Browser verified Marcus contact and visible red bar beneath the blue player HUD against pizza-parlor lighting.
