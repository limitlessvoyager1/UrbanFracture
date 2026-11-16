"""Exact-geometry screenshot comparison. No rescaling or baseline overwrite."""
import argparse, hashlib, json
from pathlib import Path
from PIL import Image,ImageChops
ROOT=Path(__file__).resolve().parents[2]
def compare(reference,candidate,diff_path,channel_tolerance=12,max_changed_fraction=.001):
    a=Image.open(reference).convert('RGBA');b=Image.open(candidate).convert('RGBA')
    if a.size!=b.size:return dict(passed=False,reason='capture-size-mismatch',referenceSize=a.size,candidateSize=b.size)
    diff=ImageChops.difference(a,b); changed=0;total=a.width*a.height;worst=0
    for px in diff.getdata():
        worst=max(worst,max(px))
        if max(px)>channel_tolerance: changed+=1
    diff.save(diff_path)
    return dict(passed=changed/total<=max_changed_fraction,reason='pixel-comparison',size=a.size,changedPixels=changed,totalPixels=total,changedFraction=changed/total,maxChannelDifference=worst,channelTolerance=channel_tolerance,allowedChangedFraction=max_changed_fraction,diff=str(diff_path))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--id',required=True);p.add_argument('--candidate',required=True);p.add_argument('--metadata',required=True);p.add_argument('--output',default='reports242/visual-comparison.json');a=p.parse_args();entries=json.loads((ROOT/'qa/system242/baselines.json').read_text())['approved'];base=next((q for q in entries if q['id']==a.id),None)
    if not base:raise SystemExit('No approved baseline for '+a.id+'. Review a candidate first; comparison NOT executed.')
    if not base.get('approvedBy') or not base.get('approvedAt'):raise SystemExit('Unsigned baseline; comparison NOT executed.')
    reference=ROOT/base['path']
    if hashlib.sha256(reference.read_bytes()).hexdigest()!=base['sha256']:raise SystemExit('Approved baseline changed; refusing comparison.')
    meta=json.loads(Path(a.metadata).read_text())
    if meta!=base['captureMetadata']:raise SystemExit('Capture metadata differs; reproduce the approved scenario/renderer/seed first.')
    result=compare(reference,a.candidate,ROOT/'reports242/visual-diff.png');result['scope']=a.id+' only';Path(a.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));raise SystemExit(0 if result['passed'] else 1)
