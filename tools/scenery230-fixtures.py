"""Lossless RGBA fixtures for the native scenery import tests; originals stay untouched."""
from PIL import Image
import json
names=['uptown-park-a172.webp','lakeside140.webp','deep-woods147.webp','route74-stop197.webp','estates-golf196.webp','prison/intake-yard227.webp','prison/recreation-yard227.webp']
fixtures=[]
for i,name in enumerate(names):
    image=Image.open('dist/assets/'+name).convert('RGBA')
    path='/tmp/scenery230-'+str(i)+'.raw'
    with open(path,'wb') as out: out.write(image.tobytes())
    fixtures.append({'name':name.split('/')[-1],'raw':path,'w':image.width,'h':image.height})
with open('/tmp/scenery230-fixtures.json','w') as out: json.dump(fixtures,out)
