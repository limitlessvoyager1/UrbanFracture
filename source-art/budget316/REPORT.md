# Build316 bounded background derivatives

Four backgrounds retain their original paths, dimensions and geometry. Exact original WebP bytes are backed up in originals/. Candidates clear one least-significant RGB bit and then use lossless WebP; decoded RGB channel error never exceeds1on255. This deliberately changes color values slightly and is not pixel-identical. No resizing, spatial filter, chroma subsampling, crop, alpha, text geometry, animation or source references changed. No sprites, portraits, gallery art or existing features were removed.

All four full original/candidate images were inspected side by side in comparison.jpg; architectural edges, pavement, signs, foliage, lighting and hotel details remain visually consistent. The comparison is downscaled to half width for review; full images and exact metrics remain available. This native-source inspection is not owner artistic approval or a live-browser certification.

Total reclaimed1,481,086bytes. SSIM.9980065676–.9991799944, PSNR51.1355–51.2307dB, maximum absolute RGB error1. Standard lossy WebP quality100 was rejected because chroma subsampling produced SSIM.923–.978 and maximumRGBerrors100–120. Existing lossless re-encoding without quantization enlarged representative files and was also rejected.

qa/system242/derivative-assets316.json records original/candidate hashes, backups, exact bounds and metrics. Root integrates the strict validator and final packaging. No asset inventory, global registry, tests or source loaders were edited by this bounded task.
