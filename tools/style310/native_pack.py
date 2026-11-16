from PIL import Image
from pathlib import Path
import json,statistics,math,shutil
root=Path(__file__).resolve().parents[2];folder=root/'source-art/style310';out=root/'dist/assets/style310';layout=json.loads((root/'tools/style310/source-layouts.json').read_text());data=json.loads((folder/'packing.json').read_text());paths=json.loads((folder/'generated-paths.json').read_text())
def clean(im):
 im=im.convert('RGBA');im.putalpha(im.getchannel('A').point(lambda v:0 if v<32 else v));return im
def box(im):return im.getchannel('A').point(lambda v:255 if v>96 else 0).getbbox()
report={}
for fam,cols,rows in [('reina',8,3),('reinaExtra',8,4),('reinaDash',4,2)]:
 key='native-'+fam
 if key not in paths:continue
 im=clean(Image.open(paths[key]));shutil.copy2(paths[key],folder/(key+'-original.png'));d=layout['attack'][fam];old=Image.open(root/'dist'/d['src'].split('?')[0]);pieces=[];oldheights=[]
 for i,fr in enumerate(d['frames']):
  x=round((i%cols)*im.width/cols);y=round((i//cols)*im.height/rows);x1=round((i%cols+1)*im.width/cols);y1=round((i//cols+1)*im.height/rows);cv=im.crop((x,y,x1,y1));b=box(cv);assert b,(key,i);pieces.append((cv,b));oldheights.append(fr['bounds'][3]-fr['bounds'][1])
 refs=[0,7] if fam!='reinaExtra' else [0,7,8,15,16,23,24,31]
 factor=statistics.median([oldheights[i]/(pieces[i][1][3]-pieces[i][1][1]) for i in refs]);maxw=max(math.ceil((b[2]-b[0])*factor) for cv,b in pieces)+16;maxh=max(math.ceil((b[3]-b[1])*factor) for cv,b in pieces)+16
 atlas=Image.new('RGBA',(cols*maxw,rows*maxh));frames=[]
 for i,((cv,b),fr) in enumerate(zip(pieces,d['frames'])):
  crop=cv.crop(b);w=round(crop.width*factor);h=round(crop.height*factor);crop=crop.resize((w,h),Image.Resampling.LANCZOS);x=(i%cols)*maxw+8;y=(i//cols)*maxh+maxh-8-h;atlas.alpha_composite(crop,(x,y));oldw=fr['rect'][2];rootRel=fr['ax']/oldw;frames.append({'rect':[x,y,w,h],'ax':w*rootRel,'ay':h,'nativeFrame':i})
 atlas.save(out/(key+'.webp'),quality=87,method=4);data[key]={'src':'assets/style310/'+key+'.webp','scale':d['scale']*148/138,'frames':frames,'family':fam};report[key]={'frames':len(frames),'fixedImportFactor':factor,'standingRefs':refs,'canvas':list(atlas.size),'note':'Uniform family import scale; compressed poses never independently enlarged; native clocks and visual air lift retained.'}
# Paired presentation uses separate full-frame metadata. Approved simulation geometry remains untouched.
for fam,d in layout['grapple'].items():
 key='joint-'+fam
 if key not in paths:continue
 im=clean(Image.open(paths[key]));pieces=[]
 for i,fr in enumerate(d['frames']):
  x=round(i%4*im.width/4);y=round(i//4*im.height/4);cv=im.crop((x,y,round((i%4+1)*im.width/4),round((i//4+1)*im.height/4)));b=box(cv);pieces.append((cv,b))
 factor=statistics.median([d['frames'][i]['rect'][3]/(pieces[i][1][3]-pieces[i][1][1]) for i in [0,1,2,3]])
 cw=max(math.ceil((b[2]-b[0])*factor) for cv,b in pieces)+16;ch=max(math.ceil((b[3]-b[1])*factor) for cv,b in pieces)+16
 atlas=Image.new('RGBA',(cw*4,ch*4));frames=[]
 for i,((cv,b),fr) in enumerate(zip(pieces,d['frames'])):
  crop=cv.crop(b);crop=crop.resize((round(crop.width*factor),round(crop.height*factor)),Image.Resampling.LANCZOS);x=i%4*cw+8;y=i//4*ch+ch-8-crop.height;atlas.alpha_composite(crop,(x,y));frames.append({'rect':[x,y,crop.width,crop.height],'ax':crop.width*fr['root'][0]/fr['rect'][2],'ay':crop.height})
 atlas.save(out/(key+'.webp'),quality=87,method=4);data[key]={'src':'assets/style310/'+key+'.webp','scale':1,'frames':frames,'family':fam};report[key]={'frames':16,'fixedImportFactor':factor,'canvas':list(atlas.size),'approvedSimulationMetadataUnchanged':True,'separatePresentationRoots':True}
(folder/'packing.json').write_text(json.dumps(data,indent=2));(root/'dist/style310-data.js').write_text('globalThis.Style310Data='+json.dumps(data,separators=(',',':'))+';\n');(root/'reports310/native-import.json').write_text(json.dumps(report,indent=2));print('Native repaint imports',len(report))
