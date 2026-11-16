# Uptown civilians, mall ground and upward park entrance —164

Checkpoint: checkpoint-before-civilians164 at b005a567f5dd8c83f3d18f83803efa9f11484c51 (restored162 with road-only repair).

Storefront emission was replayed above ambient civilians/traffic, making background details show through bodies. Uptown now defers those ambient draws until background emission completes, paints the group onto one reusable960×540 layer, applies the same scene tint using source-atop (preserving body alpha), then composites the group. Traffic still occludes sidewalk civilians. Standalone inspection fallback is preserved. All Uptown civilians reuse the existing casual young-adult atlas rather than office suits; bodies are opaque. Sidewalk soles are anchored at378 before the382 curb, park soles417; contact shadows and all run frames retain fixed foot anchors. Some stand; fleeing civilians move from scene start even offscreen. Night crowd thinning remains deterministic.

Mall storefront top crops now align their sidewalk edges. Only the shared original mall foreground surface is painted over the full3600-unit area, avoiding texture-wrap/color/marking seams. Old storefront road fragments are not replayed via emission. Original shops, department store, park arch and all campaign layout/encounter geometry remain.

Cleared mall exit: GO ↑ PARK at end-260. Up near the arch at ground depth<=444 starts a short upward walk/fade to Lakeside Park. Right edge alone cannot exit; combat/grab/airborne states cannot enter. HUD/helper/footer directions updated. Other exits unchanged.

Tests: civilian-layer164 verifies emission before opaque ambient drawing and cleanup; civilians164 covers offscreen initial motion, stationary visitors, floor anchors and all4 heroes' up-only entry; road163 extended for continuous mall floor; casual pose/sole tests, civilians155, environment162/environment156/integration156, gamepad and current15026-suite regressions passed. Browser inspected casual visitors, shared mall floor and upward arch label. qa/mall164-park.jpg. Physical controller certification not claimed.
