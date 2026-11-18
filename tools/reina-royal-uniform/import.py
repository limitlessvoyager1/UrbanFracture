"""Fit the generated costume cells to the native source frames and pack WebP sheets."""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

directory = Path(sys.argv[1])
root = Path(__file__).resolve().parents[2]
manifest = json.loads((directory / "manifest.json").read_text())
finish = "--write" in sys.argv
allow_partial = "--partial" in sys.argv
repair_map = directory / "corrections.json"
repairs = json.loads(repair_map.read_text()) if repair_map.exists() else {}
frames = {}
sources = {}
metrics = {}
masters = {}
size = 90
tiles = 12
sheets = []


def cutout(image, paired=False):
    rgb = np.asarray(image.convert("RGB")).astype(np.int16)
    samples = np.concatenate((rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]))
    background = np.median(samples, axis=0)
    distance = np.max(np.abs(rgb - background), axis=2)
    labels, _ = ndimage.label(distance > 13, structure=np.ones((3, 3)))
    counts = np.bincount(labels.ravel())
    counts[0] = 0
    if not counts.max():
        raise ValueError("Artwork cell is empty")
    body = counts[labels] >= max(12,counts.max()*.055) if paired else labels == counts.argmax()
    body |= ndimage.binary_closing(body, iterations=2)
    fringe = ndimage.binary_dilation(body) & ~body
    # Keep nearby thin matte strands, such as a sword tip separated by a highlight.
    adjacent = np.unique(labels[ndimage.binary_dilation(body, iterations=4)])
    for part in adjacent:
        if part and counts[part] >= 5:
            body |= labels == part
    alpha = np.zeros(body.shape, dtype=np.uint8)
    alpha[fringe] = np.clip((distance[fringe] - 3) * 19, 0, 200).astype(np.uint8)
    alpha[body] = 255
    rgba = image.convert("RGBA")
    rgba.putalpha(Image.fromarray(alpha))
    return rgba.crop(rgba.getbbox())


def alignment(candidate, base):
    target = np.asarray(base) > 72
    labels, _ = ndimage.label(target,structure=np.ones((3,3)))
    areas = np.bincount(labels.ravel())
    areas[0] = 0
    target = areas[labels] >= max(6,areas.max() * .008)
    ys,xs = np.nonzero(target)
    target = target[ys.min():ys.max()+1,xs.min():xs.max()+1]
    height,width = target.shape
    mask = np.asarray(candidate.getchannel("A").resize((width,height),Image.Resampling.LANCZOS)) > 72
    overlap = (mask & target).sum()/(mask | target).sum()
    aspect = (candidate.width/candidate.height)/(width/height)
    return float(overlap), aspect


for index, pose in enumerate(manifest):
    page, slot, key = pose["plate"], pose["cell"], pose["key"]
    file = directory / f"plate-{page}.png"
    if not file.exists() and (allow_partial or not finish):
        continue
    if page not in masters:
        masters[page] = Image.open(file)
    plate = masters[page]
    col, row = slot % 5, slot // 5
    cell = plate.crop(tuple(round(n) for n in (col*plate.width/5,row*plate.height/5,(col+1)*plate.width/5,(row+1)*plate.height/5)))
    paired = key.startswith("pair-")
    variant = cutout(cell,paired)
    base = Image.open(directory / f"body-{index}.png").getchannel("A")
    overlap,aspect = alignment(variant,base)
    if key in repairs:
        repair_page,repair_slot = repairs[key]
        repair_path = directory / f"repair-{repair_page}.png"
        if repair_path.exists():
            if repair_path not in masters:
                masters[repair_path] = Image.open(repair_path)
            repair = masters[repair_path]
            col,row = repair_slot % 3,repair_slot // 3
            candidate = cutout(repair.crop(tuple(round(n) for n in (
                col*repair.width/3,row*repair.height/3,(col+1)*repair.width/3,(row+1)*repair.height/3
            ))),paired)
            score,proportion = alignment(candidate,base)
            if score > overlap:
                variant,overlap,aspect = candidate,score,proportion
    if key == "idle-and-combat/43" and (directory/"single-43.png").exists():
        with Image.open(directory/"single-43.png") as image:
            candidate = cutout(image)
        score,proportion = alignment(candidate,base)
        if score > overlap:
            variant,overlap,aspect = candidate,score,proportion
    metrics[key] = {"overlap":round(float(overlap),3),"aspect":round(aspect,3),"plate":page,"cell":slot}
    variant.thumbnail((size-4,size-4),Image.Resampling.LANCZOS)
    sheet, tile = divmod(len(frames), tiles*tiles)
    if sheet == len(sheets):
        sheets.append(Image.new("RGBA",(tiles*size,tiles*size)))
    x, y = tile%tiles*size+2, tile//tiles*size+2
    sheets[sheet].paste(variant,(x,y))
    frames[key] = [sheet,x,y,variant.width,variant.height]
    if "grid" in pose:
        image = Image.open(root/"dist"/pose["src"])
        cw, ch = image.width/4, image.height/4
        g = pose["grid"]
        rect = [g%4*cw,g//4*ch,cw,ch]
    else:
        rect = pose["rect"]
    sources.setdefault(pose["src"], {})[",".join(str(int(n+0.5)) for n in rect)] = key

(directory / "registration.json").write_text(json.dumps(metrics,indent=2)+"\n")
print(len(metrics),"fitted source slots",flush=True)
print("Lowest geometry matches:", sorted(metrics.items(),key=lambda item:item[1]["overlap"])[:20],flush=True)
if finish:
    names = []
    for i,sheet in enumerate(sheets):
        name = f"assets/reina-royal-{i}.webp"
        sheet.save(root/"dist"/name,quality=46,method=4,exact=True)
        names.append(name)
    data = {"sheets":names,"frames":frames,"sources":sources}
    (root/"dist/reina-uniform-data.js").write_text("globalThis.ReinaUniformData="+json.dumps(data,separators=(",",":"))+";\n")
