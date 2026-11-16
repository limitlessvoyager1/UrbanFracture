# Build344 — Nightshade drone and illustrated Downtown playtest

Checkpoint: `checkpoint-before-nightshade344`, predecessor `2ccadc0ac31bc3f429bf92d8e421ec6d12452f25` (saved version328). Experimental branch `experimental/nightshade344`. The interrupted343 changes were not in that saved source and were not represented as recovered.

## Play
Open `nightshade344.html` and select a mode, then **START NIGHTSHADE PLAYTEST**. **PASSIVE MARCUS PRACTICE** creates a native unlimited-health target and suppresses AI only in that explicit test instance. Starting the ordinary playtest restores native AI. The original `index.html`, game controller, other heroes and art assets are unchanged.

F/R2 burst; F+J/R2+Square charge; Q/Circle drone dodge; F+Q/R2+Circle rear missile; L/neutral Triangle Healing Ray; forward+L/Triangle flamethrower. J/Square uses two baton strikes, backhand, spinning kick. Front grab away+Attack uses the rolling upward-kick/missile prototype. Jump attacks retain native damage/timing with the new illustrated poses. No block/counter, handheld gunfire or ordinary defensive roll in the opt-in module.

## Architecture and balance
Reuses Brawler, NightshadeMelee257 action creation, native action clocks and finish handling, Energy316 accounting, native damage/reactions, Practice282 and existing controller mappings. No second combat/input/energy engine. The four standing combo timing envelopes are retained; the third formerly laser-based stage now deals its same6damage as one backhand contact. Other heroes delegate to original methods.

Gun6energy/5damage; flame45/5ticks×6; heal50/6total defensive damage; dodge15; charge30/18damage; rear missile20/14damage. Throw missile15 plus12damage, while physical throw20uses native THROW energy gain. Drone projectile events classify as SPECIAL and generate zero energy. No passive energy generation added. Insufficient energy never substitutes HP.

Offensive drone damage×1.2 and attack costs×1.25, heal15%/35s. Balanced ×1/×1,20%/45s. Defensive ×.85/×.8,25%/60s. Healing and dodge costs fixed; throw missile fixed15. Mode is selected for a run; explicit snapshot/restore supports its mode value. Durable campaign-save integration is not certified.

Healing Ray:24frame vulnerable startup,42active,30recovery,80horizontal/24depth radius. Cost and healing commit once when active begins; interruption before commitment gives no heal/cost/cooldown. Native armor/block outcomes retained; no blanket invulnerability. Drone dodge has only frames5–14 protected from ordinary damage and costs energy, with landing recovery. Rear targeting and projectiles reject solid cover at the applicable height. Charge uses swept horizontal collision, one hit/target, native heavy/boss categories and arena clamps. Bounds, damage and AI Director unchanged.

## Artwork
Original generated16pose Nightshade atlas, one compact drone, and one Downtown street panorama based on the supplied card. Masters and reference retained under source-art/nightshade344. Imported gameplay derivative is800wide, with16alpha levels (maximum alpha quantization error8/255) and WebP quality65; background derivative960wide/quality65, drone192wide/quality85. These are new experimental assets only. The16pose atlas is NOT a completed frame-by-frame animation library or a six-view model sheet. It provides a playable appearance test. Enemies deliberately retain approved original artwork for comparison. Existing weather/day-night overlay remains active.

## Verification
- PASS190native simulation checks: modes/costs, no HP overflow, interrupt-before-heal, one burst per tap, chord priority, no block/counter, other-hero counters, no drone energy loop, melee energy, throw/fallback completion and cleanup.
- PASS controller157 and controller-recovery simulated mapping/reconnect suites.
- PASS231resource340 checks.
- PASS487exact packed source strings and all non-JavaScript asset bytes preserved from the candidate source.
- Browser: new Nightshade/drone/street rendered; passive Marcus burst changed100→94energy and60→55HP; Healing Ray changed94→44energy and began its45second Balanced cooldown. Live diagnostics and screenshot retained. Outside-radius Marcus was not damaged by the ray.
- Existing276input fixture fails at “fresh physical tap retained DualSense USB” without loading the experimental module; recorded separately, not waived. No full initial/release profile claimed. Three aerial move acceptance/recovery/plane fixtures are included in the190checks. Foreign-weapon pickup is explicitly unavailable in this appearance prototype, pending compatible grip artwork; the original game retains it.

## Remaining limitations / review gates
This is an opt-in first playable prototype, NOT completion of the full17gate drone overhaul or15gate art conversion. Complete authored intermediates for rolling throw, drone-hand attachment/flight, full falling/get-up and continuous run cycles remain visual work. The current throw uses shared timeline/root projection and requires contact/secondary-body collision review across all enemies; no full choreography certification. Mode campaign persistence, configurable Developer Panel adapters, full ability-by-ability browser recordings, obstacle navigation certification, eight-enemy performance, physical DualSense and full-campaign regression remain untested.

Live browser work-time/RAF diagnostics are observational and include cloud/browser scheduling; they do not certify60FPS. The prior renderer performance hold remains open. Main-game publication remains on hold; save this as a reviewable version and retain the local playtest tab.

Next: review this playable appearance/control prototype, then author complete continuity poses and certify all paired/enemy sequences before wider rollout.

Final packaging: expanded TAR268,404,224bytes;31,232bytes beneath the256MiB cap. Original artwork was not recompressed or removed. The size reduction affects only the new experimental derivatives.
