from pathlib import Path
from PIL import Image,ImageDraw
import json
root=Path(__file__).resolve().parents[1];out=root/'assets/custom/harbor-watch';manifest=json.loads((out/'manifest.json').read_text());m=manifest['mission'];im=Image.open(out/'terrain.png').convert('RGB');d=ImageDraw.Draw(im)
for key,label,color in [('commanders','C',(180,255,170)),('soldiers','S',(180,255,170)),('robots','ROBOT',(180,255,170)),('nests','N',(255,190,150)),('bugs','B',(255,190,150)),('route','ROUTE',(130,230,255))]:
 for x,y in m[key]:d.ellipse((x-5,y-5,x+5,y+5),outline=color,width=2);d.text((x+7,y-7),label,fill=color)
for item in m['support']+m['weapons']:
 x,y=item['x'],item['y'];d.rectangle((x-6,y-6,x+6,y+6),outline=(255,255,130),width=2);d.text((x+8,y),item['type'],fill=(255,255,130))
for wave in manifest['difficultyProfiles']['normal']['waves']:
 for x,y in wave['points']:d.text((x+8,y+12),'WAVE',fill=(240,140,200))
im.save(out/'geometry-overlay.png')
