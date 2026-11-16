from pathlib import Path
from PIL import Image
R=Path(__file__).resolve().parents[2]
for file,rows in [('city-a',[('dining',0,211),('retail',244,440),('hotel-front',483,690)]),('city-b',[('residential',0,214),('nightlife',253,443),('service',486,675)])]:
 im=Image.open(R/'source-art/downtown350'/f'{file}.png').convert('RGB')
 for name,y,end in rows:im.crop((0,y,im.width,end)).save(R/'dist/assets/downtown350'/f'{name}.webp',quality=91,method=6)
im=Image.open(R/'source-art/downtown350/city-a.png');im.crop((0,215,im.width,239)).save(R/'dist/assets/downtown350/road.webp',quality=91,method=6)
Image.open(R/'source-art/downtown350/explosion.png').convert('RGBA').save(R/'dist/assets/downtown350/explosion.webp',quality=90,method=6)
