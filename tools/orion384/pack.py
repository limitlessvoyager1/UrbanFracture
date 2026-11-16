"""Pack authored transparent sprites. One scale per source family, never per pose height."""
from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,hashlib,argparse
from motion_import import motion_cells
R=Path(__file__).resolve().parents[2]; A=R/'source-art/orion384'; O=R/'dist/assets/orion384';O.mkdir(exist_ok=True,parents=True)
args=argparse.ArgumentParser();args.add_argument('--family',choices=['all','motion'],default='all');selected=args.parse_args().family
data={'version':384,'scale':128/190,'families':{}}; receipts=[]
if selected=='motion':
 data=json.loads((R/'dist/orion384-data.js').read_text(encoding='utf-8').split('=',1)[1].strip().removesuffix(';'))
 receipts=[q for q in json.loads((R/'reports384/import.json').read_text(encoding='utf-8'))['receipts'] if q['family']!='motion']
for name,rows,standing in [('core-R',8,[0,15,20,21]),('core-L',8,[0,15,20,21]),('grapple-R',8,[0,1,15,16,20,24,27,28,31]),('grapple-L',8,[0,1,15,16,20,24,27,28,31]),('motion',12,[0,1,2,4,5,6,7,23,24,25,26,28,29,30,31,47]),('extra',2,[2,3,6,7]),('walk',4,list(range(16)))]:
 if selected!='all' and name!=selected:continue
 im=Image.open(A/(name+'.png')).convert('RGBA');cw=im.width/4;ch=im.height/rows;cells=[]
 if name=='motion':cells,_=motion_cells(R)
 else:
  for n in range(rows*4):
   cell=im.crop((round(n%4*cw),round(n//4*ch),round((n%4+1)*cw),round((n//4+1)*ch)));arr=np.asarray(cell);ys,xs=np.where(arr[:,:,3]>100);b=(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1);cells.append((cell,b,{}))
 factor=190/float(np.median([cells[n][1][3]-cells[n][1][1] for n in standing]));atlas=Image.new('RGBA',(4*320,rows*320));proof=Image.new('RGB',atlas.size,'#142337');pen=ImageDraw.Draw(proof);frames=[]
 for n,(cell,b,reviewed) in enumerate(cells):
  # Explicit pelvis roots. Bounding-box centers would shift with every extended fist/foot.
  root=cell.width*.5
  if name.startswith('core'):
   right=name.endswith('R');roots=[.47,.48,.43,.55,.49,.48,.49,.48,.54,.56,.54,.58,.47,.48,.50,.48,.47,.40,.45,.45,.46,.44,.46,.50,.48,.51,.52,.5,.52,.48,.5,.48]
   root=cell.width*(roots[n] if right else 1-roots[n])
  elif name.startswith('grapple'):
   roots=[.47,.47,.48,.44,.47,.52,.49,.52,.47,.46,.49,.5,.5,.52,.5,.47,.47,.47,.43,.47,.47,.47,.46,.47,.47,.47,.46,.47,.47,.47,.44,.47];root=cell.width*(roots[n] if name.endswith('R') else 1-roots[n])
  elif name=='motion':root=cell.width*(.52 if n<24 else .53)
  elif name=='walk':root=cell.width*(.5 if n<8 else .51)
  elif name=='extra':root=cell.width*(.52 if n<4 else .54)
  # Grounded sole alignment only; tucked/flat poses retain their natural height.
  base=b[3];lift=0
  if name=='motion' and (8<=n<16 or 32<=n<40):lift=10
  if name.startswith('core') and n in [1,22,23]:lift=18
  if name.startswith('core') and n==27:lift=48
  if name.startswith('grapple') and n in [11,12,14]:lift=25
  if reviewed:root=reviewed['root'];base=reviewed['base'];factor=reviewed['factor'];lift=reviewed['lift']
  p=cell.crop(b);w,h=round(p.width*factor),round(p.height*factor);x=round(160-(root-b[0])*factor);y=round(280-(base-b[1])*factor-lift)
  if name=='motion':assert x>=0 and x+w<=320 and y>=0 and y+h<=320,(name,n,x,y,w,h)
  else:assert x>=-4 and x+w<=324 and y>=-4,(name,n,x,y,w,h)
  tile=Image.new('RGBA',(320,320));tile.alpha_composite(p.resize((w,h),Image.Resampling.LANCZOS),(x,y));atlas.alpha_composite(tile,(n%4*320,n//4*320));proof.paste(tile,(n%4*320,n//4*320),tile);pen.text((n%4*320+6,n//4*320+6),str(n),fill='white');frame={'rect':[n%4*320,n//4*320,320,320],'ax':160,'ay':280}
  if name=='extra' and n in [3,7]:
   ar=np.asarray(tile);mask=(ar[:,:,0]>170)&(ar[:,:,0]>ar[:,:,1]*1.55)&(ar[:,:,0]>ar[:,:,2]*1.2)&(ar[:,:,3]>120);mask[160:,:]=False;yy,xx=np.where(mask);assert len(xx)>0,(name,n);frame['eye']=[round((float(np.median(xx))-160)*128/190,4),round((float(np.median(yy))-280)*128/190,4)]
  if name=='walk':
   hx=cell.width*([.35,.35,.35,.53,.55,.54,.52,.48][n%8] if n<8 else [.34,.34,.34,.32,.31,.32,.33,.34][n%8]);hy=cell.height*([.60,.60,.60,.48,.48,.48,.50,.55][n%8]);frame['hand']=[round((hx-root)*factor*128/190,4),round((hy-base)*factor*128/190,4)]
  if name.startswith('grapple'):
   right=name.endswith('R');hands={0:[194,64],1:[145,90],3:[190,78],8:[130,115],15:[140,70]};hx,hy=hands.get(n,[150,90]);hx=hx/224*cell.width;hy=hy/224*cell.height
   if not right:hx=cell.width-hx
   frame['hand']=[round((hx-root)*factor*128/190,4),round((hy-base)*factor*128/190,4)]
  frames.append(frame)
  receipts.append({'family':name,'frame':n,'sourceBox':b,'sourceRoot':root,'familyScale':factor,'liftPx':lift,**({'sourceRect':reviewed['sourceRect'],'sequence':reviewed['sequence']} if reviewed else {})})
 atlas.save(O/(name+'.webp'),quality=79,method=6);proof.save(R/'reports384'/(name+'-atlas.png'));data['families'][name]={'src':'assets/orion384/'+name+'.webp','frames':frames}
(R/'dist/orion384-data.js').write_bytes(('globalThis.Orion384Data='+json.dumps(data,separators=(',',':'))+';\n').encode('utf-8'))
(R/'reports384/import.json').write_text(json.dumps({'poses':len(receipts),'fixedLogicalStandingHeight':128,'facings':'independently authored','perPoseHeightNormalization':False,'receipts':receipts},indent=2)+'\n')
print('Packed',len(receipts),'authored poses')
