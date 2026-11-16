# Build276 — Nightshade input, weapons, running spin kick and water

Recovery checkpoint: `checkpoint-before-nightshade276`, commit `fb436742c9b821a9f9d8d9a1363e93c98afca946` (Build275). The prior pushed commit is recoverable independently of temporary developer defaults.

## Changes

- Native melee input retained a fresh combo tap but discarded it on a whiff when the original action's recovery exceeded the old 0.26s age check. Retain one fresh queued opener until recovery completes. No held-button automatic combos or recovery cancellation.
- A finite 0.32s recovery-tail queue admits Attack, R2/Unique, pickup, special and dodge after legal recovery; owner, action, transition, expiry and interruption checks cancel stale input. Native grab escape receives Attack again. Diagnostics record actual accepted/buffered/rejected outcomes.
- Nightshade now uses the existing Weapons248 inventory, pickup, attack, throw, first-successful-contact durability, knockdown loss and shatter systems. E / R3 picks up or throws. Dedicated tactical knife / baton cross motions and new pickup/guard/strike/throw artwork; moving poses retain the native gait with per-frame glove attachments. No second inventory or HUD.
- Walk speed 195 → 220 world units/s, running 280 → 325. Existing scale/proportions, gait distance, jump duration and ordinary jump apex unchanged.
- Running + a fresh Attack edge selects the jumping spin hook kick even after the brief double-tap activation window. Existing native arc owner: 10 startup, 28 airborne/travel, 24 recovery frames; authored heel contact frames22–30, one22HP knockdown per eligible target. Fixed combat plane and mirrored swept knee/heel segment;180unit bounded travel,64unit special apex. Weapon Attack retains equipped-weapon priority.
- Successful neutral ground-taser shock lasts3seconds, retaining native arming, admission/protection/immunity and device expiration. This does not globally lengthen every character's electrical attack.
- Front forward grab sweep/beatdown keeps damage8+6+6+6; hits18/47/65/83, total117frames. Downed victims use grounded clenched/pain art with brief horizontal recoil. Foreground baton segment follows the authored glove/tip and remains visible at contact; no duplicate damage.
- Existing lakeside/deep-woods water renderer now displaces only cached water masks. Lake ripples and downstream stream motion use simulation time; two-pixel mask erosion and stationary final clipping protect banks/fences/trees. Reduced-motion preference gives static water; offscreen water skips work. Geometry and global environment controller unchanged.

## Verification

Run `node tools/qa242/run.cjs --profile release`. New checks: `tests/nightshade276.cjs`, `nightshade276-input.cjs`, `nightshade276-view.cjs`, `nightshade276-water.cjs`. Baseline regression repro loads actual checkpoint scripts from Git, proving the old lost-tap, gated-pickup and expired-window run-attack failures. Input fixture drives actual game.js keyboard and simulated standard/raw Sony/DSX mappings. Physical DualSense/human balance/art approval are not simulated by these tests.

Live managed preview scenarios at `?qa259`: Weapon ready276, Weapon slice276, Spin heel276, Beatdown276, Lake276, Stream276, Water step276. These developer-only actions drive native commands/ticks and pause for visual inspection. Browser screenshots saved with this report are evidence, not approved screenshot baselines.

## Artwork and storage

See GENERATION.md.13 new transparent WebP assets; approved startup/landing/guard art reused where appropriate. Only new artwork imported/compressed. No unrelated scenery or source images resized to satisfy hosting limits. Header/comment identity proofs exclude intentionally modified modules; prior text remains recoverable in Git. The expanded deployment archive must remain below268435456bytes.

## Scope / limitations

Water animation covers the lake and stream shown in the supplied woods gameplay; it is not a new project-wide fluid-physics simulation. Automated tests and live-frame inspection do not certify physical-controller latency, all subjective combat balance, or new-art approval. Preserve the existing five manual release gates and do not label this build stable without them.
