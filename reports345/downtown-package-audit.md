# Downtown standalone asset dependency audit

Scope: bounded source audit of the current checkout. Keep the full game source and original art in the original repository. The exclusions below apply only to a separate Nightshade/Downtown test distribution. This is not a browser boot, controller test, or visual certification.

## Method and important limitation

Reviewed native script loaders, image constructors, global consumers, and data modules. Literal directory searches miss packed metadata: `style310-data.js` and `unique311-data.js` contain decoded asset paths. Data-only modules were evaluated in an isolated Node VM to enumerate their string paths; no game code or asset callbacks were executed. A final standalone build must still pass a network missing-asset audit and real browser bootstrap.

## Safe exclusion clusters

| Asset directory | Remove presentation/data scripts from standalone HTML | Preserve simulation |
|---|---|---|
| `assets/hydro/` | `hydro-view243.js` | `hydro243.js` |
| `assets/subway/` | `subway-view238.js`; optionally unused `subway-ui238.js` and `subway-audio238.js` | `subway238.js` and companion simulation modules |
| `assets/stadium/`, `assets/stadium313/` | `baylor-data237.js`, `baylor-view237.js`, `fans-data237.js`, `fans332-data.js`, `stadium313-data.js`, `stadium-view237.js` | `stadium237.js`, `baylor237.js` |
| `assets/style310/` | See shared Reina/airport closure below; not an airport-only directory | `airport309.js`, `unique311.js`, `reina313.js` and other simulation |

All script filenames in this report are relative to `dist/`.

### Hydroelectric ownership

`hydro-view243.js` constructs `assets/hydro/<level-key>243.webp` from `Hydro243.levels`: `turbine-hall`, `control-room`, `pressure-gallery`, `dam-crest`. The simulation environment callback uses guarded `root.HydroView243?.scene`. Main rendering foreground/ride consumers are optional. No other direct image loader for this directory was found.

### Subway ownership

`subway-view238.js` loads `arrival238.webp`, `maintenance238.webp`, `departure238.webp`, `car238.webp?v=294`, `train-closed238.webp`, `train-open238.webp`, `tunnel245.webp`, `car245.webp`, `station-track247.webp`, and `passengers247.webp` under `assets/subway/`. Simulation scene drawing and main people/foreground/ready consumers are optional. Subway audio synthesizes sound and contributes no file-asset savings.

### Stadium ownership and retained cross-reference

`stadium-view237.js` loads eleven backgrounds under `assets/stadium/`: `elevator-lobby240.webp`, `elevator-cabin240.webp`, `outer-tailgate239.webp`, `single-approach239.webp`, `tickets237.webp`, `concourse237.webp`, `vip237.webp`, `facilities237.webp`, `lockers237.webp`, `field237.webp`, `endzone237.webp` (version query 331).

`BaylorArt237` in `baylor-data237.js` owns sixteen frames `baylor-0237.webp` through `baylor-15237.webp`, preloaded immediately by `baylor-view237.js`. `StadiumFans237` in `fans-data237.js` owns `fans-0237.webp` through `fans-3237.webp`. `Stadium332Art` in `fans332-data.js` owns `fans332.webp?v=332`. `Stadium313Art` in `stadium313-data.js` owns `assets/stadium313/run.webp` and `idle.webp`; stadium view consumes those fan datasets.

**Keep `enemy313-data.js` and `enemy-view313.js`: they also supply Frankie's get-up, required Downtown.** `enemy-view313.js` captures `BaylorView237`. Its readiness expression is guarded, but its actual Baylor renderer calls `B.pose(f)` without a guard. Therefore a slim build with Baylor view removed must prevent every stadium/Baylor launch path, including developer controls and smartphone/world navigation. Extra Baylor walk/helmet images in `assets/enemies313/` can remain; that directory is not the stadium directory and should not be deleted wholesale.

## Shared style310 / Reina / airport closure

`style310.js` preloads every entry in `Style310Data` and supplies shared Reina rendering and UI behavior. Removing this directory is appropriate only for a Nightshade-focused test or an explicitly supported alternate Reina renderer.

`Style310Data` owns these files under `assets/style310/`:

- `gait.webp`, `combat.webp`, `mobility.webp`, `reaction.webp`, `weapons.webp`, `special.webp`, `grab.webp`, `counter.webp`, `utility.webp` (version query 313).
- `traffic.webp`, `travelers.webp`.
- `native-reina.webp`, `native-reinaExtra.webp`, `native-reinaDash.webp`, `kip.webp`, `armed.webp` (version query 313).

`unique311-data.js` additionally owns `assets/style310/unique311.webp?v=313`; `unique-view311.js` preloads it without a missing-data guard.

`airport-view309.js` directly preloads `exterior.webp`, `interior.webp`, `traffic.webp?v=332`, `travelers.webp?v=332`, and `floors.webp`. `airport332-data.js` mutates `Style310Data.traffic` and cannot be loaded without that dataset. `airport-weather312.js` and `airport-view312.js` capture airport views and return early when their required parent views are absent, but should be omitted as a coherent airport presentation cluster.

For a Nightshade-only Downtown package, omit this whole presentation/data cluster:

- `style310-data.js`, `style310.js`.
- `airport332-data.js`, `airport-view309.js`, `airport-weather312.js`, `airport-view312.js`.
- `reina312-data.js`, `reina-view312.js`, `reina-dive313-data.js`, `reina-view313.js`.
- `unique311-data.js`, `unique-view311.js`.

`reina-view312.js` safely returns if Style310 is missing. **`reina-view313.js` does not:** several actual actions call `Style310.baseline`, so retaining this wrapper while removing Style310 creates a latent crash. Its data and the prior view should be removed together in the slim presentation graph. This exclusion does not authorize removing any Reina combat simulation. If Reina remains selectable, retain the approved Reina presentation dependencies or clearly test a deliberate fallback; do not claim equivalent art coverage from an untested fallback.

Nightshade's new 344 renderer uses `assets/experimental344/` and does not depend on Style310.

## Retained runtime and launch constraints

Keep all simulation/native engine modules. Remove excluded scripts only from the dedicated entry HTML, never from the complete source project. Inspect dynamic inspector loaders (`inspector-load326.js`, `inspector-extra326.js`, `review-loader211.js`) as well as static script tags. Omit irrelevant test pages rather than delivering links that request excluded assets.

Restrict all standalone routes to Downtown and its hotel/club alternate path. A dropdown restriction alone is insufficient: launch buttons, Developer Panel, phone/map routes, and saved-world continuation can enter removed levels. Native Downtown completion proceeds to Financial District; the standalone must end at a review screen or explicitly include the next level's complete dependencies. Do not leave a playable path into an incomplete asset graph.

## Size and delivery recommendation

Measured directory sizes in this checkout: hydro 6.9 MiB; style310 6.4 MiB; subway 5.7 MiB; stadium 2.4 MiB; stadium313 0.5 MiB. These are raw directory sizes, not a verified compressed-package reduction. Larger retained areas include sprites 116.5 MiB and root-level asset files 94.8 MiB. Filtering only these four families may be insufficient for the hosting limit; derive the entire Downtown asset closure after presentation pruning.

Preserve the complete original source/art separately. Deliver a distinct slim HTTPS playtest or downloadable native-file ZIP with a localhost launcher. A cloud session's `127.0.0.1` URL is not reachable on the user's machine. For local testing use a server, for example `py -m http.server 8000 --bind 127.0.0.1`, then `http://localhost:8000/`; do not rely on `file://` behavior.

Retain `gamepad.js`, controller prompts and native gamepad polling. A successful browser boot does not prove a physical DualSense test; report hardware validation separately. `hosting.json` contains project/static configuration, not sufficient evidence of current audience access. Verify the hosted test's audience using the hosting service before sharing it.

## Required final checks

1. Build an explicit standalone script and asset manifest including decoded metadata.
2. Browser boot with network logging: zero missing required scripts/images and no exceptions.
3. Traverse normal Downtown plus hotel/lobby/kitchen/rear-alley/club/VIP alternatives.
4. Exercise all ten actual enemy families: Marcus, Kevin, Bruno, Frankie, Carmen, Flint, Saito, Akari, Brick and Jackal.
5. Confirm Frankie get-up still renders; confirm excluded-level launch and saved-state paths cannot escape the test scope.
6. Verify completion behavior and optional room returns.
7. Test keyboard and gamepad with real hardware where available; disclose anything untested.
