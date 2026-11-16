from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,json,shutil,sys
R=Path(__file__).resolve().parents[2]
# Semantic indices preserve native input/motion registries while source frames remain authored whole bodies.
order=list(range(4))+[4,7,9,10]+list(range(12,20))+list(range(20,28))+[28,29,30,31,20,24,26,27]+[28,32,33,34,35,36,37,39]+list(range(40,48))
hands={4:([129,99],[112,101]),7:([85,90],None),9:([158,155],None),10:([68,18],None),12:([72,83],None),13:([132,55],None),14:([157,53],None),15:([88,86],None),16:([81,10],[91,10]),17:([133,104],[118,99]),18:([166,60],[147,60]),19:([93,87],None)}
def pack(name,src,cols,rows,bands,order,reference,hands):
 target=R/'source-art/reina382'/f'{name}.png';shutil.copy(src,target);im=Image.open(target).convert('RGBA');cw=im.width/cols;ch=im.height/rows;cells=[]
 for i in range(cols*rows):
  cell=im.crop((round(i%cols*cw),bands[i//cols],round((i%cols+1)*cw),bands[i//cols+1]));a=np.asarray(cell);ys,xs=np.where(a[:,:,3]>100);assert len(xs)>100;b=(int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1);cells.append((cell,b))
 factor=190/np.median([cells[i][1][3]-cells[i][1][1]for i in reference]);atlas=Image.new('RGBA',(2304,((len(order)+5)//6)*384));proof=Image.new('RGB',(2304,atlas.height+64),'#172433');pen=ImageDraw.Draw(proof);frames=[];receipts=[]
 for j,i in enumerate(order):
  cell,b=cells[i];pose=cell.crop(b);w,h=round(pose.width*factor),round(pose.height*factor);assert w<378 and h<338,(i,w,h);x=192-w//2;
  if name=='extra':
   mask=np.asarray(cell);ys,xs=np.where((mask[:,:,3]>100)&(np.indices(mask.shape[:2])[0]>=b[3]-10));foot=(float(xs.min())+float(xs.max()))/2;x=round(192-(foot-b[0])*factor)
  y=340-h;tile=Image.new('RGBA',(384,384));tile.alpha_composite(pose.resize((w,h),Image.Resampling.LANCZOS),(x,y));atlas.alpha_composite(tile,(j%6*384,j//6*384));proof.paste(tile,(j%6*384,64+j//6*384),tile);pen.text((j%6*384+5,64+j//6*384+5),f'{j} / source{i}',fill='white');fr={'rect':[j%6*384,j//6*384,384,384],'ax':192,'ay':340}
  for key,point in zip(['hand','secondHand'],hands.get(i,(None,None))):
   if point:
    px,py=point;py+=i//cols*ch-bands[i//cols];fr[key]=[(x+(px-b[0])*factor-192)*148/190,(y+(py-b[1])*factor-340)*148/190]
  frames.append(fr);receipts.append({'semantic':j,'source':i,'importScale':factor,'height':h,'hand':fr.get('hand'),'secondHand':fr.get('secondHand')})
 atlas.save(R/'dist/assets/reina382'/f'{name}.webp',quality=80,method=6);proof.save(R/'reports382'/f'{name}-atlas.png');(R/'reports382'/f'{name}-registration.json').write_text(json.dumps(receipts,indent=2));return{'src':f'assets/reina382/{name}.webp','frames':frames,'scale':148/190,'anatomicalHeight':148}
if __name__=='__main__':
 d=pack('corrections',sys.argv[1],6,8,[0,184,362,542,727,907,1085,1268,1448],order,range(4),hands)
 (R/'dist/reina382-data.js').write_text('globalThis.Reina382Data='+json.dumps(d,separators=(',',':'))+';\n');print('Registered48 consistent body poses and native weapon sockets')
