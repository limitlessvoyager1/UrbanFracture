# Slums branch finales

Checkpoint: `checkpoint-before-slums204` at `d510cb37aa304881ce7516cf701d2e1c24897523`.

Existing Marian merge (11) continues to new Marian Street (19), then tavern arena (20), clear screen, and Prison destination (23). Existing Arnell marker (12) continues to Arnell street (21), then community-center Colt arena (22), outro, clear screen, Subway destination (24). Prison/Subway are explicit future-level destinations, not fabricated completed levels. Source and artwork of the apartments/store remain intact.

Unique nonrepeating 3072×1024 two-row panorama preserves aspect/ground line. Marian contains homes/stores, overgrown basketball court, broken playground and tavern. Arnell has shops, school, unused baseball field and community center. Native world time/weather, 2× render resolution and ground roots450–510 persist.

## Aidan

Reusable native Kevin variant, red tank palette confined to green costume pixels. Default75HP; the two tavern Aidans100HP. Ordinary enemy defensive/grab rules, no boss defenses. Knife at close range; visible bottle preparation, bounded walking retreat, snapshot target with occasional small velocity lead. Shared global limit includes airborne fire reservations and active patches: at most2. Five-and-a-half-second patches, radius106×23,5 environmental damage per.8s per actor, both sides. Actual ground overlap, jump/dodge/protected interaction rules retained. No off-plane automatic impacts. Four finite supporting thugs reinforce under native max3-living cap; every survivor and pending wave must be defeated before level completion.

## Colt Dawson

Native robber actor with explicit boss classification for existing grab/counter/injury restrictions,350HP, one Carmen. Native Director admission and pressure budget retained; custom gun/bomb attacks have scoped categories, forecast contacts and detached projectile reservations. No second input, counter or AI Director.

Vest reduces ordinary hero attack damage to35% and prevents ordinary stagger/knockdown. Grabs, counters and paid offensive specials bypass this vest reduction, retaining native eligibility/ownership/boss reductions. Environmental fire retains actual hazard damage. Slow65px/s approach/retreat,84px/s at <=one third HP. Finite local fire bombs; gas launcher produces six-second local clouds that obscure view only while inside; nearby facing-sensitive1.2s-fuse flashbang causes1.25s stun. Small local flash cue, never white fullscreen flash. Native dodges and committed pair ownership respected.

Handgun two shots per action,6-round magazine, per-shot ammo/muzzle/recoil/gunshot event,1.05s visible reload with magazine pose. Long-range preparation .53s, .38s at lowHP; no close automatic gunfire. LowHP prefers baton/shield pressure, occasional visible retreat to firing range, no more routine bomb rotation. Three baton contacts,115-range shield shove and240-travel nontracking shield charge, visible startup and recovery. Each impact once; no continuous overlap damage.

Seven timed intro lines, each hero unique questions/replies and five unique postfight reactions. Dormant safe actors during intro, then automatic combat. Colt defeat sends surviving Carmen fleeing; once the boss lands and the hero is actionable, the outro completes the route. Aidan’s fight instead requires every remaining thug and pending wave. Completion once then destination. Timers advance in simulation and pause with game. Iron Will timers remain native. Source hero stats/attacks, all controls/DualSense and existing routes unchanged.

## Artwork

Built-in image_gen. Exact prompt set `design/slums204/prompts.json`; final `streets-original.png` and `colt-original.png`, concept retained separately. Runtime `dist/assets/slums-streets204.webp` quality92 original dimensions;16 isolated lossless Colt WebP frames, one constant155-height import scale against idle frame. Sole roots fixed; source-frame crops only. No unrelated sprite changes or background recompression.

## Validation

`tests/slums204.cjs`: all5hero starts/retries/transitions; HP/world preservation; Aidan100/75/category;2fire slots including flight, friendly damage/cooldown/expiry; directional flash and local gas;35%vest/fullgrab/special; all5intro/outro and locked intro; actual handgun ammo/events/reload; both completion/destination gates and remaining-thug requirement.

Regression suites: slums203/202, current150, gamepad/controller157, environment162/integration156, grab198, shield181. Browser inspection of actual production modules: Marian panorama, Aidan red tanks, Molotov projectile/fire states and Colt/Carmen confrontation. Hardware controller and human combat balance have not been verified. Inspector `slums204.html` reuses actual production simulation/art; no user data writes.
