"""Collect registered costume poses that need another art pass."""
import json
import sys
from pathlib import Path

from PIL import Image

stage = Path(sys.argv[1])
manifest = json.loads((stage/"manifest.json").read_text())
metrics = json.loads((stage/"registration.json").read_text())
existing = {}
mapping = stage/"corrections.json"
if mapping.exists():
    existing = json.loads(mapping.read_text())
eligible = [
    (i, pose["key"]) for i, pose in enumerate(manifest)
    if pose["key"] in metrics and metrics[pose["key"]]["overlap"] < .68 and pose["key"] not in existing
]
for start in range(0,len(eligible),9):
    page = max((p[0] for p in existing.values()),default=-1)+1
    canvas = Image.new("RGB",(1200,1200),"#434854")
    for slot, (n,key) in enumerate(eligible[start:start+9]):
        pose = Image.open(stage/f"body-{n}.png").convert("RGBA")
        # The source figures retain their relative size and aspect within each cell.
        scale = min(355/pose.width,355/pose.height)
        pose = pose.resize((round(pose.width*scale),round(pose.height*scale)),Image.Resampling.LANCZOS)
        canvas.paste(pose,(slot%3*400+(400-pose.width)//2,slot//3*400+(400-pose.height)//2),pose)
        existing[key] = [page,slot]
    canvas.save(stage/f"repair-input-{page}.png")
    print(page,min(9,len(eligible)-start))
mapping.write_text(json.dumps(existing,indent=2)+"\n")
