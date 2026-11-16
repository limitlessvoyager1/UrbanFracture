# Prime City International Airport — hand-drawn build 310

## Delivered scope

An original illustrated presentation inspired by the requested modern beat-em-up benchmark: stronger ink contours, painted terminal lighting, reflective floors, expressive blue-costumed Reina poses, fictional airline counters and flight boards. No Streets of Rage sprites, animation assets, audio or source were imported.

Thirteen native playable sections form two routes: Departures → Check-in → Escalator choice; Up → Shuttle stand → Bus → Satellite approach → Security → Shops and gates → Runway/private jet; Right → Customs → Baggage → Arrivals → Limousine approach. Both endpoint bosses remain explicitly TBD, with no fabricated victory or boss. Waves use the existing enemy registries and encounter director, and exits require defeated waves. The bus ride and escalator have native simulation-driven transitions. All sections are selectable from Start at Scene; the title menu also has Play Airport.

Reina's presentation includes walk/run, jumps, aerial strikes, cartwheel dodge, recoil, falls/get-up, pickup/throw, weapon carry and swings, sword/charged attacks, counters and grapples. Exact approved standing combo, extra strikes and blitz choreography use repainted native pose layouts. German suplex, outer reap and Bruno powerbomb have coordinated two-person artwork; German recovery has a dedicated kip-up. Remaining enemies retain their established art except those paired presentation sequences.

## Architecture and preserved mechanics

`airport309.js` supplies registry/route integration. `airport-view309.js` draws the stage using one world-camera transform for floors, architecture, travelers, signs and vehicles. `style310.js` is a view-only adapter driven by existing action, gait and grapple clocks. `style310-data.js` contains separate art rects/anchors. Native gameplay files, approved damage and recovery definitions are unchanged. Original `Grapple301Data` is immutable; a draw-context remap replaces presentation rectangles without changing synchronized physics. Released actors use complete body cutouts rather than rendering both participants twice.

The runtime still uses the existing fixed simulation step and developer playback controls. Rendering cannot change HP, state, positions or simulation RNG. A dedicated empty-handed armed gait carries the actual current weapon from a measured hand socket, rather than baking one weapon type into every pose.

## Evidence

- `airport309.cjs`: 295 assertions, route/registry/exit guards, native director limits and hero carry-over.
- `airport310-progression.cjs`: both complete route walkthroughs, 46/36 native enemies defeated. This is an assisted fixture (forced test damage/invulnerability), not a human balance test.
- `style310-view.cjs`: 825 rendered checks, visible/grounded poses, authored sequence coverage, all 13 backgrounds and wheels touching road. A deliberately floating vehicle fixture is rejected.
- `style310-native.cjs`: 1,494 checks over approved attack poses and five paired move sequences, including complete released actor cutouts.
- `style310-mechanics.cjs`: 2,596 checks. Three-kick native damage remains 7/8/10. Native frames and results agree at 1×, 0.5×, 0.25× and 0.1×; renderer does not alter mechanics or RNG. Actual armed movement sockets touch opaque artwork.
- `reports309/views/`: 26 rendered section start/end views.
- `reports310/grapples/`: five full 60-FPS native synchronized move videos and frame contact sheets; inspected German/Bruno, outer reap/Bruno and powerbomb.
- Browser preview earlier showed native combat, new Reina/terminal and working menu controls. Final browser revisit failed with repeated DevTools focus/navigation timeouts; this limitation is not an automated pass.
- Wider release regression results: first run `reports310/release-first-run.json`; audited final result `reports310/release-verified.json`, retaining the initial missing-tag and renderer-resource failures and targeted successful reruns. The historical anchor fixture now references its exact documented immutable Build293 commit rather than relying on a local-only tag. Assertions remain unchanged.

## Remaining limits

The two bosses were left TBD as requested. Travelers are original stationary waiting/luggage figures; no new walking civilian sequence is claimed. Authored sunset skies/windows are not a full dynamic weather/lighting re-render. Broader owner art approval, every move against every enemy, physical DualSense hardware and human balance tests remain separate review gates. The static hosting budget required high-quality WebP re-encoding of six existing environment backgrounds; exact originals are retained under `source-art/style310/archive-originals/`, with dimensions unchanged and details in `asset-budget.json`. This does not confer new artistic approval on those copies.

## Recovery and provenance

Source checkpoint before final regression: `7f21985f30e1cfa06068307a4868e44d736c1ea9`. Prior checkpoints: `c276245d18cb6877698e03f90906bc199427cbdc`, `1993e355ec8395274c23c13b0cc80c3965643448`. Originals and generated-path records are under `source-art/style310`; pack scripts under `tools/style310`. Early armed-sheet attempt was rejected for background/proportion problems and is not shipped. Approved gameplay source remains recoverable in version control.

## Final automated result

190 executed, 190 passed, zero unresolved automated failures. Five manual review gates remain not executed. The first full run had 188 passes and two harness/environment failures: a missing historical checkpoint tag and a SIGKILL during an allocating render test. Both were investigated and rerun successfully, without changing game behavior or removing assertions. The render test now reuses one cleared canvas per sequence and still passes all 1,494 assertions. The combined result is in `release-verified.json`; original report/logs are preserved. This is not a claim of stable-build or human art certification.
