from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'reports-grounded-cache-audit'
FONT=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',17)
groups=[
 ('Unmodified shipping drawActor - query t=2.8166666666666615',[
  ('primary-cold.png','Cold query: correct native pose'),
  ('primary-matching-warm.png','Warm t=0.8: same pose index, stale squash'),
  ('primary-opposite-warm.png','Warm t=0.9: stale different pose')]),
 ('Unmodified shipping drawActor - query t=2.9',[
  ('primary-late-cold.png','Cold query: current native pose'),
  ('primary-same-bucket-opposite.png','Warm t=2.8: stale earlier pose')]),
 ('Controlled flash state, query hitFlash=0 at t=0.9 - no natural-contact frequency claim',[
  ('primary-flash-cold.png','Cold clean query'),
  ('primary-flash-warm.png','Earlier hitFlash=0.2 persists in clean query')]),
 ('Original mixed-family replay, facing -1 - same actor state and query time',[
  ('replay-nightshade-dir-1-cached.png','Current cache: reused Forest-era bitmap'),
  ('replay-nightshade-dir-1-cold.png','Cold-cache counterfactual: matches Node exactly')]),
 ('Original mixed-family replay, facing +1 - same actor state and query time',[
  ('replay-nightshade-dir1-cached.png','Current cache: reused Forest-era bitmap'),
  ('replay-nightshade-dir1-cold.png','Cold-cache counterfactual: matches Node exactly')])]
sheet=Image.new('RGB',(1350,len(groups)*340),'#edf3f7');draw=ImageDraw.Draw(sheet)
for row,(heading,items) in enumerate(groups):
 y=row*340;draw.text((14,y+8),heading,font=FONT,fill='#203247')
 images=[Image.open(OUT/name).convert('RGBA') for name,label in items]
 boxes=[im.getbbox() for im in images]
 for col,((name,label),im,box) in enumerate(zip(items,images,boxes)):
  crop=(max(0,box[0]-15),max(0,box[1]-15),min(im.width,box[2]+15),min(im.height,box[3]+15));im=im.crop(crop)
  back=Image.new('RGBA',im.size,'#dce8ef');back.alpha_composite(im);back.thumbnail((420,265),Image.Resampling.LANCZOS)
  x=col*450+(450-back.width)//2;sheet.paste(back.convert('RGB'),(x,y+42));draw.text((col*450+12,y+311),label,font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',15),fill='#203247')
sheet.save(OUT/'audit-visuals.png')
print('Saved native shipping and cache-counterfactual inspection sheet.')
