import json,struct,os,math
from PIL import Image,ImageDraw
root='work/recovered';dest='assets'
os.makedirs(dest+'/images',exist_ok=True)
images=json.load(open(root+'/images.json'));objects=json.load(open(root+'/objects.json'));frames=json.load(open(root+'/frames.json'))
cache={}
for item in images:
 w,h=item['width'],item['height'];raw=open(f"{root}/image-data/{item['handle']}.bin",'rb').read()
 if len(raw)!=w*h*2: raise ValueError((item,len(raw)))
 pixels=[]
 for v, in struct.iter_unpack('<H',raw):
  r=((v>>10)&31)<<3;g=((v>>5)&31)<<3;b=(v&31)<<3;pixels.append((r,g,b,255 if v&32767 else 0))
 img=Image.new('RGBA',(w,h));img.putdata(pixels);img.save(f"{dest}/images/{item['handle']}.png");cache[item['handle']]=img
lookup={o['handle']:o for o in objects};info={i['handle']:i for i in images}
def first(o):
 if 'image' in o:return o['image']
 for a in o['animations'].values():
  for d in a.values():
   if d['frames']:return d['frames'][0]
 return None
small=[o for o in objects if first(o) in cache and info[first(o)]['width']<220 and info[first(o)]['height']<200]
sheet=Image.new('RGB',(960,math.ceil(len(small)/8)*105),'#313a31');draw=ImageDraw.Draw(sheet)
for ix,o in enumerate(small):
 x=(ix%8)*120;y=(ix//8)*105;img=cache[first(o)];im=img.copy();im.thumbnail((100,70));sheet.paste(im,(x+10,y+5),im);draw.text((x+2,y+78),f"{o['handle']}: {o.get('name','Backdrop')[:17]}",fill='white');draw.text((x+2,y+91),f"img {first(o)} t{o['type']}",fill='#aaaaaa')
sheet.save(root+'/contact.png')
for f in frames:
 if f['index'] not in [2,5,7,9,11,13,15,17,19,21]:continue
 im=Image.new('RGBA',(f['width'],f['height']),tuple(f['background'])+(255,))
 for ins in f['instances']:
  o=lookup[ins['object']];handle=first(o)
  if handle is None:continue
  img=cache[handle];it=info[handle]
  if o['type']==0:
   tile=Image.new('RGBA',(o['width'],o['height']))
   for tx in range(0,o['width'],img.width):
    for ty in range(0,o['height'],img.height):tile.alpha_composite(img,(tx,ty))
   im.alpha_composite(tile,(ins['x'],ins['y']))
  else:im.alpha_composite(img,(ins['x']-it['hx'],ins['y']-it['hy']))
 im.convert('RGB').save(f"{root}/frame-{f['index']}.png")
print('Converted',len(images),'images; contact sheet and ten frame previews generated')

