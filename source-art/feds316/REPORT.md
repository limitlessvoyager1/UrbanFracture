# Original PCBI office backgrounds — Build316

Built-in image generation produced an original887×1774RGB atlas, inspected before packing. It contains eight side-view locations with no actors, bosses or real-government branding. Shipping asset dist/assets/feds316/office.webp is444926bytes atWebP quality90, preserving original source resolution. Metadata dist/feds316-data.js exports globalFeds316Art. Original PNG, exact prompt and repeatable packer remain in this folder.

| Scene key | Source rect [x,y,w,h] | Existing Hospital314Materials floor key |
|---|---|---|
| exterior | [2,2,883,217] | roof |
| lobby | [2,223,883,217] | skybridge |
| squad | [2,444,883,218] | skybridge |
| interrogation | [2,666,883,235] | skybridge |
| evidence | [2,905,883,235] | garage |
| command | [2,1144,883,232] | skybridge |
| armory | [2,1380,883,222] | garage |
| lab | [2,1606,883,166] | service |

Paint each cropped background uniformly from logicaly68to430, factor362/rect.height, preserving its aspect ratio; repeat atrect.width×factor with1logicalpixel overlap. The measured band boundaries differ: do not assume equal-height generated strips. Trimmed2pixel edges avoid baked black band boundaries. Rooms have appropriate edge structure rather than a perspective corner.

Extend the fighting floor with actual148pixel-high Hospital314Materials floor rows, painted at110logicalheight and using the SAME world-camera translation. Do not stretch the tiny background floor sample, normalize actor scale to different background crops, or apply a separate parallax rate to the fighting floor. Existing original Hospital314Materials access doors may be reused for native stairs/elevators; no extra door/floor shipping assets were needed.

Exterior has a grassy helicopter field on the left and one glass bureau entrance on the right; helicopter, cars, people and collision are supplied natively. Approximate original-atlas pixel landmarks are landingcenter[220,169], grassarea[20,144,525,44], entrancearea[646,65,213,119]. Subtract rectorigin[2,2] before applying crop scale. The painted skyline is neutral overcast; native weather/exposure should respect the exterior mask rather than distort indoor wall imagery. No department signs are baked into the art; a single correctly supported nativePCBI identity can be added by the parent implementation.

Lobby/security reception, working cubicles, observation-window interview room, evidence cages, digital command screens, armory cabinets and forensic lab all have real illustrated architectural detail. All furnishings stay behind the open fighting aisle. No proprietary sprites/source/audio or real FBI branding is used. The only painted exterior mark is a conventional helicopter landingH.

Bounds validation checks all8source rectangles and matching atlas dimensions. No native raster test was run in this bounded asset task. No runtime, index, registry or existing asset was changed.
