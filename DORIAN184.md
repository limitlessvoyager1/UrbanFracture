# Dorian blue shirt

Dorian's Riverfront renderer now builds a cached blue-shirt palette once when its original atlas loads. Burgundy pixels are identified by their red/magenta ratios; skin and neutral vest/trousers colors are excluded. All16 original poses and the portrait use the same cached canvas. Alpha, atlas frames, scale, ground anchors and combat remain unchanged. The source atlas remains intact. index.html cache-busts dorian-view153.js to184.

Validation: JavaScript syntax check and browser inspection of all16 poses. Preview in qa/dorian184/blue-shirt.jpg. No gameplay/input code was changed.
