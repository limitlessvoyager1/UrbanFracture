"""Read-only image certification. Existing inventory is never silently refreshed."""
import argparse, hashlib, json
from pathlib import Path
from PIL import Image, ImageChops
ROOT=Path(__file__).resolve().parents[2]
INVENTORY=ROOT/'qa/system242/asset-inventory.json'
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def inventory():
    rows=[]
    for p in sorted((ROOT/'dist/assets').rglob('*')):
        if p.suffix.lower() not in ['.png','.webp','.jpg','.jpeg']: continue
        with Image.open(p) as im:
            rows.append(dict(path=str(p.relative_to(ROOT)),sha256=sha(p),width=im.width,height=im.height,status='retained-unreviewed'))
    return rows

def run():
    actual=inventory(); old={q['path']:q for q in json.loads(INVENTORY.read_text())['assets']}; issues=[]; checks=[]
    for q in actual:
        prev=old.get(q['path'])
        if not prev or q['sha256']!=prev['sha256']:
            issues.append(dict(code='asset-review-required',id=q['path'],severity='review',evidence={'before':prev,'current':q},proposal='Review scale, aspect, lighting, detail and scene composition; register a reviewed certificate explicitly.',automaticCorrection=False))
        if prev and (q['width'],q['height'])!=(prev['width'],prev['height']):
            issues.append(dict(code='source-dimensions-changed',id=q['path'],severity='review',evidence=q,proposal='Verify that source pixel density and aspect were intentionally changed.',automaticCorrection=False))
    retired={q['path']:q for name in ['retired-assets313.json','retired-assets314.json'] for q in json.loads((ROOT/'qa/system242'/name).read_text())['assets']}
    for path in old.keys()-{q['path'] for q in actual}:
        q=retired.get(path); backup=ROOT/q['backup'] if q else None
        referenced=any(path.removeprefix('dist/') in p.read_text(errors='ignore') for p in (ROOT/'dist').rglob('*') if p.suffix in ['.js','.html','.css','.json'])
        if q and backup.is_file() and sha(backup)==old[path]['sha256']==q['sha256'] and not referenced:
            checks.append(dict(id=path,status='passed',evidence=dict(retired=True,backup=q['backup'],originalHashVerified=True,noShippingReference=True)))
        else:issues.append(dict(code='asset-removed',id=path,severity='error',proposal='Restore the asset or supply a verified original backup and remove all references.',automaticCorrection=False))
    derivative=json.loads((ROOT/'qa/system242/derivative-assets316.json').read_text())
    for row in derivative['assets']:
        current=ROOT/row['path']; backup=ROOT/row['backup']; prev=old.get(row['path'])
        valid=bool(prev and backup.is_file() and sha(backup)==row['originalSha256']==prev['sha256'] and sha(current)==row['candidateSha256'])
        maximum=None
        if valid:
            with Image.open(backup) as a, Image.open(current) as b:
                valid=a.size==b.size==(row['width'],row['height'])
                if valid:
                    aa=a.convert('RGBA'); bb=b.convert('RGBA'); delta=ImageChops.difference(aa,bb); ext=delta.getextrema(); maximum=max(v[1] for v in ext[:3]); valid=maximum<=1 and ext[3][1]==0
        checks.append(dict(id=row['path']+'-derivative316',status='passed' if valid else 'failed',evidence=dict(originalHashVerified=bool(prev),maxDecodedRGBDelta=maximum,alphaUnchanged=valid,artisticApproval=False)))
        if not valid:issues.append(dict(code='invalid-reversible-background-derivative',id=row['path'],severity='error',proposal='Restore verified original; do not update inventory to bypass the derivative policy.',automaticCorrection=False))
    raw=(ROOT/'dist/forest-run240-data.js').read_text(); d=json.loads(raw.split('Object.assign(window.NeonForest125Data,')[1].split(');')[0])['forest-run240']
    with Image.open(ROOT/'dist'/d['src']) as image:
        im=image.convert('RGBA'); seen=set()
        for i,f in enumerate(d['frames']):
            x,y,w,h=f['rect'];sx,sy=f['seed']; crop=im.crop((x,y,x+w,y+h)); box=crop.getchannel('A').point(lambda a:255 if a>100 else 0).getbbox(); evidence=dict(frame=i,rect=f['rect'],anchor=f['anchor'],opaqueBounds=box)
            if not box or not (0<=x<x+w<=im.width and 0<=y<y+h<=im.height) or im.getpixel((sx,sy))[3]<=100:
                issues.append(dict(code='invalid-sprite-frame',id=f'forest-run-{i}',severity='error',evidence=evidence,proposal='Restore the certified crop/seed metadata.',automaticCorrection=False));continue
            if i in [0,1,4,5] and abs(y+box[3]-f['anchor'][1])>=2:
                issues.append(dict(code='foot-anchor-mismatch',id=f'forest-run-{i}',severity='error',evidence=evidence,proposal='Review the known planted-contact anchor; do not move logical actor coordinates.',automaticCorrection=False))
            seen.add(crop.tobytes());checks.append(dict(id=f'forest-run-{i}',status='passed' if not any(q['id']==f'forest-run-{i}' for q in issues) else 'failed',evidence=evidence))
        if len(seen)!=8:issues.append(dict(code='duplicate-movement-frame',id='forest-run',severity='error',proposal='Restore eight unique connected poses.',automaticCorrection=False))
    return dict(schema=1,inventoryCount=len(actual),retainedNotArtisticallyCertified=len(old),checks=checks,issues=issues,coverage={'opaqueGroundContacts':'Forest running contact frames0,1,4,5 only','otherFrames':'metadata/inventory only; rendered grounding not certified','style':'retained source hashes only; artistic judgment requires review'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--initialize',action='store_true');p.add_argument('--output');a=p.parse_args()
    if a.initialize:
        if INVENTORY.exists():raise SystemExit('Refusing to overwrite retained inventory.')
        INVENTORY.write_text(json.dumps(dict(schema=1,meaning='Initial retained-source inventory; not artistic approval.',assets=inventory()),indent=2)+'\n')
    result=run(); s=json.dumps(result,indent=2)
    if a.output:Path(a.output).write_text(s+'\n')
    else: print(s)
    raise SystemExit(1 if any(q['severity']=='error' for q in result['issues']) else 0)
