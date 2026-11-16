from PIL import Image
import json,os
out=[]
for name,cols,rows,k,sockets,roots in [('headlock',4,2,.375,[(380,130),(241,143),(246,150),(205,165),(180,214),(145,256),(220,256),(300,190)],[224]*8),('fall',2,1,.225,[(560,430),(650,470)],[620,650])]:
 im=Image.open('art-source285/'+name+'.png').convert('RGBA');cw,ch=im.width//cols,im.height//rows
 for i in range(cols*rows):
  q=im.crop((i%cols*cw,i//cols*ch,i%cols*cw+cw,i//cols*ch+ch));q.putalpha(q.getchannel('A').point(lambda p:255 if p>=128 else 0));box=q.getbbox();l,t,rr,b=box;q=q.crop(box);w,h=q.size;W,H=max(1,round(w*k*.82)),max(1,round(h*k*.82));q=q.resize((W,H),Image.Resampling.NEAREST);src=f'assets/reverse285/pose-{len(out)}.webp';q.save('dist/'+src,'WEBP',quality=84,method=6);out.append(dict(src=src,w=w*k,h=h*k,ax=(roots[i]-l)*k,ay=h*k,socket=[(sockets[i][0]-roots[i])*k,(sockets[i][1]-b)*k],sourceBox=box,sourceScale=k))
for i,j in [(4,8),(5,9)]:
 os.remove('dist/'+out[i]['src']);out[i]=out[j]
open('dist/reverse-art285.js','w').write('globalThis.ReverseArt285='+json.dumps(out,separators=(',',':'))+';\n')
print('new art',sum(os.path.getsize('dist/'+x['src']) for x in out))
