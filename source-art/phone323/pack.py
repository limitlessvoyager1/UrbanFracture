from PIL import Image
im=Image.open('source-art/phone323/skyline-original.png').convert('RGB')
im=im.resize((240,round(im.height*240/im.width)),Image.Resampling.LANCZOS)
im.save('dist/assets/phone323.webp',quality=15,method=6)
