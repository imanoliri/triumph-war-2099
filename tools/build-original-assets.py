import json,base64,os,sys
from PIL import Image,ImageDraw
root=sys.argv[1] if len(sys.argv)>1 else 'work/recovered';dest='assets';os.makedirs(dest+'/maps',exist_ok=True)
objects=json.load(open(root+'/objects.json'));frames=json.load(open(root+'/frames.json'));images=json.load(open(root+'/images.json'))
lookup={o['handle']:o for o in objects};info={i['handle']:i for i in images};cache={i['handle']:Image.open(f"{dest}/images/{i['handle']}.png") for i in images}
maps=[]
for fi in [5,7,9,11,13,15,17,19,21]:
 f=frames[fi];im=Image.new('RGBA',(1024,768),tuple(f['background'])+(255,));mask=Image.new('L',im.size,0)
 for ins in f['instances']:
  o=lookup[ins['object']]
  if o['type']>1:continue
  if o.get('image') not in cache:
   if o['type']==0 and o.get('width') and o.get('height'):
    bounds=(ins['x'],ins['y'],ins['x']+o['width']-1,ins['y']+o['height']-1)
    if o.get('fill')==1:ImageDraw.Draw(im).rectangle(bounds,fill=tuple(o.get('color',[0,0,0]))+(255,))
    ImageDraw.Draw(mask).rectangle(bounds,fill=255 if o.get('obstacle')==1 else 0)
   continue
  img=cache[o['image']];it=info[o['image']];x,y=ins['x'],ins['y']
  if o['type']==0:
   tile=Image.new('RGBA',(o['width'],o['height']))
   for tx in range(0,o['width'],img.width):
    for ty in range(0,o['height'],img.height):tile.alpha_composite(img,(tx,ty))
   img=tile
  # Frame backdrop instances use top-left coordinates. Image hotspots apply
  # only to active sprites; decorative backdrop hotspots may be far off-image.
  # Subtracting them displaces wall ends, terrain edges and whole floor panels.
  im.alpha_composite(img,(x,y))
  # Backdrops overwrite the collision plane in drawing order. A non-obstacle
  # floor can carve a walkable corridor out of an earlier rock backdrop.
  mask.paste(255 if o.get('obstacle')==1 else 0,(x,y),img.getchannel('A'))
 im.convert('RGB').save(f'{dest}/maps/{fi}.png')
 bits=bytearray(1024*768//8)
 for p,v in enumerate(mask.getdata()):
  if v:bits[p>>3]|=1<<(p&7)
 briefFrame=frames[4 if fi==5 else fi-1];texts=[]
 for ins in briefFrame['instances']:
  o=lookup[ins['object']]
  if o['type']==3 and o.get('textRaw') and o.get('name')=='String':texts+=o['textRaw']
 maps.append({**f,'briefing':texts,'mask':base64.b64encode(bits).decode()})
data={'images':{i['handle']:i for i in images},'objects':{o['handle']:o for o in objects},'maps':maps,'title':frames[2]}
open(dest+'/original-data.js','w',encoding='utf8').write('window.ORIGINAL='+json.dumps(data,separators=(',',':'))+';\n')
provenance_path=dest+'/provenance.json'
previous=json.load(open(provenance_path)) if os.path.exists(provenance_path) else {}
open(provenance_path,'w').write(json.dumps({**previous,'source':'C:/Games/DarkSunGames/2099_23.exe','originalAuthor':'Anthony Lopes / DarkSun Games','images':len(images),'objectDefinitions':len(objects),'frames':len(frames),'gameplayFrames':[m['index'] for m in maps],'extraction':'MMF 1.x image bank and frame chunks; RGB555 pixels; static backdrop collision masks'},indent=2))
print('Generated nine original backgrounds, collision masks, placements, animation metadata and briefings')
