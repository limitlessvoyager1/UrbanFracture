# Browser verification — QA242

Managed Chrome155,1920×1080 canvas, seed242, native production art/controllers. Hero gallery loaded all6 retained characters. PNG export and metadata export worked. Two separate render-button invocations produced byte-identical PNGs, SHA256 aa28262c46f4216b2f82254311c97c8160d5edc9aa9b883d049c2d1333d25e99. Pixel comparison:0 changed pixels out of2,073,600 at zero tolerance. See browser-repeatability.json.

This proves candidate rendering repeatability on this renderer, NOT comparison against an owner-approved baseline. Cold nighttime window scene also reached READY with23:00 /20°F /HeavySnow metadata. Other static scenarios have not been separately reviewed or certified. No physical controller or human balance tests were performed by this browser check.

Final resource verification: the readiness guard detected `assets/uptown-traffic113.png` missing. The native loader path was corrected by the exact-hash rule after archived PNG/current WebP equality was established. A fresh browser reload then reported READY, `artReadinessFailed:false`, `missingResources:[]`. No source image was edited. This is verification of the deterministic metadata fix, not artistic baseline approval.
