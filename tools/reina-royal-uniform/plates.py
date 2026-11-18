import json, sys
from pathlib import Path
from PIL import Image
P=Path(sys.argv[1])
rows=json.loads((P/'source.json').read_text())
images={}
groups=[]
for entry in rows:
    src=entry['src']
    if src not in images: images[src]=Image.open('dist/'+src).convert('RGBA')
    im=images[src]
    if 'grid' in entry:
        c=entry['grid']
        w,h=im.width//4,im.height//4
        x,y=c%4*w,c//4*h
    else:
        x,y,w,h=map(round,entry['rect'])
    pose=im.crop((x,y,x+w,y+h))
    extent=pose.getchannel('A').point(lambda a: 255 if a>72 else 0).getbbox()
    if not extent:continue
    entry['physical']=[x,y,w,h]
    entry['bounds']=extent
    groups.append(entry)
    pose=pose.crop(extent)
    pose.thumbnail((218,218),Image.Resampling.LANCZOS)
    pose.save(P/f'body-{len(groups)-1}.png')
for page,start in enumerate(range(0,len(groups),25)):
    canvas=Image.new('RGB',(1200,1200),'#434854')
    for i,entry in enumerate(groups[start:start+25]):
        pose=Image.open(P/f'body-{start+i}.png')
        canvas.paste(pose,(i%5*240+(240-pose.width)//2,i//5*240+(240-pose.height)//2),pose)
        entry['plate']=page;entry['cell']=i
    canvas.save(P/f'input-{page}.png')
(P/'manifest.json').write_text(json.dumps(groups))
print(len(groups),'poses',page+1,'plates')
