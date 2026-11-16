# Downtown345 build

Editable campaign source remains dist; downtown345.html is opt-in. Do not copy the slim output back over dist.

To recreate art derivatives from retained PNG masters: run `python tools/downtown345/import.py`, then `python tools/downtown345/isolate-poses.py`. The latter requires Pillow, NumPy and SciPy; it preserves source figure pixels while extracting connected figures beyond nominal grid boundaries. Edge contacts are recorded for later artistic review. It does not invent missing anatomy or resize individual poses.

After editing presentation integration, run `python tools/downtown345/integrate.py`. Run the three345 Node tests and controller regressions. Build the declared Downtown-only distribution with `python tools/downtown345/build.py`, then `python tools/downtown345/verify.py`. Full-game source/art are retained. Native renderer tests use the pinned tools/fighter-render npm dependencies; install via npm ci --ignore-scripts there. Do not replace the expected Canvas version with a different globally installed version.

See reports345/REPORT.md for verification limits. Main-game stable publication remains held pending current visual, performance and hardware gates.
