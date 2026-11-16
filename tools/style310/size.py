from PIL import Image
from pathlib import Path
import shutil,json,math
root=Path(__file__).resolve().parents[2]
# Source PNGs are retained; shipping copies use high-quality WebP, well above final screen size.
for p in (root/'dist/assets/style310').glob('*.webp'):
 im=Image.open(p)
 if p.stem.startswith('joint-'):
  orig=root/'dist/assets/sprites'/('grapple301-'+p.stem[6:]+'.webp')
  im=im.resize(Image.open(orig).size,Image.Resampling.LANCZOS)
 im.save(p,quality=87,method=4)
# Remove only superseded airport prototype backgrounds; original sources remain in source-art/airport309.
for p in (root/'dist/assets/airport').glob('*.webp'):p.unlink()
# Re-encode approved environmental backgrounds only if necessary to stay within static hosting cap.
# Preserve exact original bytes and report lossy changes; never change sprites or inventory approval.
review=[]
def expanded():
 total=1024
 for p in (root/'dist').rglob('*'):
  if p.is_file():total+=512+math.ceil(p.stat().st_size/512)*512
  elif p.is_dir():total+=512
 return total
for rel in ['assets/hydro/pressure-gallery243.webp','assets/estates-rear196.webp','assets/estates-front196.webp','assets/downtown-night-stage-v1.webp','assets/mall-b155.webp']:
 if expanded()<268000000:break
 p=root/'dist'/rel;dest=root/'source-art/style310/archive-originals'/Path(rel).name;dest.parent.mkdir(exist_ok=True);shutil.copy2(p,dest)
 im=Image.open(p).convert('RGB');old=p.stat().st_size;im.save(p,quality=100,method=6)
 review.append({'path':rel,'originalBytes':old,'shippingBytes':p.stat().st_size,'original':str(dest.relative_to(root)),'change':'lossy WebP q100, dimensions unchanged; review required'})
(root/'reports310/asset-budget.json').write_text(json.dumps({'estimatedExpandedBytes':expanded(),'cap':268435456,'review':review},indent=2));print('Expanded estimate',expanded(),'reencoded backgrounds',len(review))
