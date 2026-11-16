from PIL import Image
from pathlib import Path
import json,hashlib
root=Path(__file__).resolve().parents[2]
p=root/'source-art/industrial317';out=root/'dist/assets/industrial317';out.mkdir(exist_ok=True,parents=True)
im=Image.open(p/'atlas-original.png').convert('RGB')
keys=['outskirts','power','storage','crossroads','north-road','rail-office','abandoned-yard','factory-road','south-road','water-works','woods','rust-east']
xs=[0,483,965,1448];ys=[0,271,543,814,1086];floors=[217,217,217,214,214,214,211,211,211,214,214,214]
# Source panels retain original pixels; remove redundant combat-plane strips from each background.
# Pack with two-pixel edge extrusion to keep neighboring cells out of linear samples.
w=481;heights=[217,214,211,214];offsets=[];y=2
for h in heights:offsets.append(y);y+=h+4
atlas=Image.new('RGB',(3*(w+4)+4,y+60),(67,64,53));scenes={}
for i,key in enumerate(keys):
 col=i%3;row=i//3;sx=xs[col]+1;sy=ys[row]+1;sw=xs[col+1]-xs[col]-2;h=floors[i]-1;crop=im.crop((sx,sy,sx+sw,sy+h));x=2+col*(w+4);yy=offsets[row];atlas.paste(crop,(x,yy));atlas.paste(crop.crop((0,0,1,h)).resize((2,h)),(x-2,yy));atlas.paste(crop.crop((sw-1,0,sw,h)).resize((2,h)),(x+sw,yy));atlas.paste(crop.crop((0,0,sw,1)).resize((sw,2)),(x,yy-2));atlas.paste(crop.crop((0,h-1,sw,h)).resize((sw,2)),(x,yy+h));
 # A real source-floor strip with a consistent surface, no objects; shared where appropriate.
 scenes[key]={'rect':[x,yy,sw,h],'sourcePanel':[sx,sy,sw,ys[row+1]-sy-1],'sourceGroundLine':floors[i]}
# Shared original floor samples: cracked street, interior concrete, wooded gravel.
fy=y+2
for kind,i in [('asphalt',0),('concrete',1),('gravel',10)]:
 col=i%3;row=i//3;crop=im.crop((xs[col]+6,ys[row]+floors[i]+8,xs[col]+246,ys[row+1]-3));crop=crop.resize((240,44),Image.Resampling.LANCZOS);x=2+len([q for q in ['asphalt','concrete','gravel'] if ['asphalt','concrete','gravel'].index(q)<['asphalt','concrete','gravel'].index(kind)])*244;atlas.paste(crop,(x,fy));
 for j,key in enumerate(keys):
  if ('concrete' if key in ['power','storage','rail-office','water-works'] else 'gravel' if key=='woods' else 'asphalt')==kind:scenes[key]['floor']=[x,fy,240,44]
path=out/'district.webp';atlas.save(path,quality=70,method=6)
train=Image.open(p/'train-original.png').convert('RGBA');train=train.crop((10,140,2160,614));train=train.resize((560,123),Image.Resampling.LANCZOS);tp=out/'freight.webp';train.save(tp,quality=76,method=6)
data={'src':'assets/industrial317/district.webp','width':atlas.width,'height':atlas.height,'scenes':scenes,'train':{'src':'assets/industrial317/freight.webp','rect':[0,0,560,123],'width':560,'height':123,'wheelBaseline':122,'alpha':True}}
(root/'dist/industrial317-data.js').write_text('globalThis.Industrial317Art='+json.dumps(data,separators=(',',':'))+';\n')
(p/'metadata.json').write_text(json.dumps(data,indent=2))
metrics={'sourceAtlas':[im.width,im.height],'sourcePanels':12,'shippingAtlas':[atlas.width,atlas.height],'atlasBytes':path.stat().st_size,'trainBytes':tp.stat().st_size,'metadataBytes':(root/'dist/industrial317-data.js').stat().st_size,'totalShippingBytes':sum(q.stat().st_size for q in [path,tp,root/'dist/industrial317-data.js']),'resampling':'Atlas panels native pixels, cropped; floor strips240x44; transparent train560x123 Lanczos. Original source retained.','files':{str(q.relative_to(root)):hashlib.sha256(q.read_bytes()).hexdigest() for q in [path,tp,root/'dist/industrial317-data.js']}}
(p/'metrics.json').write_text(json.dumps(metrics,indent=2));print(json.dumps(metrics,indent=2));atlas.resize((966,int(atlas.height*966/atlas.width)),Image.Resampling.LANCZOS).save(p/'atlas-review.png');train.save(p/'train-review.png')
