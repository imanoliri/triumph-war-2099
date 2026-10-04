"""Rebuild proposal SVG/PNG from authored geometry; Pillow is a local authoring tool only."""
import json, math, html
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).parent
FONT=Path('C:/Windows/Fonts/segoeui.ttf')
def font(n): return ImageFont.truetype(str(FONT),n)
starts={'commanders':[[96,y] for y in [288,352,416,480]],'soldiers':[[x,y] for x in [160,224] for y in [288,352,416,480]]}
plans=[
 dict(id='a-split-ridge',title='A / Split Ridge',subtitle='Two fronts, one deliberate commitment',obstacles=[[280,310,450,150],[520,24,180,64],[520,680,180,64]],relays=[[800,200],[800,560]],nests=[[904,240],[904,600]],bugs=[[744,160],[872,160],[904,304],[744,608],[872,528],[968,600]],support=[[224,576],[576,600]],plasma=[352,176],main=[[128,384],[128,160],[800,160],[800,200]],flank=[[128,384],[128,600],[800,600],[800,560]],notes=['Recommended starting point','Main: northern assault','Flank: equal southern front','Ridge breaks crossfire','Risk: divided reinforcements','Open outer tank circuit']),
 dict(id='b-relay-basin',title='B / Relay Basin',subtitle='A shared staging hub and exposed relay pockets',obstacles=[[300,180,180,120],[650,180,180,120],[300,470,180,130],[650,470,180,130]],relays=[[856,112],[856,656]],nests=[[952,112],[952,656]],bugs=[[792,112],[920,176],[984,240],[792,656],[920,592],[984,528]],support=[[240,384],[552,384]],plasma=[552,336],main=[[128,384],[552,384],[904,384],[904,112],[856,112]],flank=[[128,384],[128,96],[552,96],[856,112]],notes=['Most open / flexible','Main: shared center hub','Flank: long northern edge','South relay via east lane','Risk: exposed center fire','Tank turns in central plaza']),
 dict(id='c-switchback-mesa',title='C / Switchback Mesa',subtitle='A staged approach with a long rear bypass',obstacles=[[260,24,160,236],[260,420,160,200],[580,180,150,400]],relays=[[880,300],[880,640]],nests=[[952,352],[952,688]],bugs=[[816,240],[944,240],[952,416],[816,640],[944,592],[984,688]],support=[[192,640],[488,656]],plasma=[488,144],main=[[128,340],[480,340],[480,100],[816,100],[816,300],[880,300]],flank=[[128,340],[128,700],[488,700],[816,700],[880,640]],notes=['Most staged / deliberate','Main: northern switchback','Flank: longer south bypass','Mesa screens nest pockets','Risk: blind corner advance','Broad east tank connector'])]
palette={'bg':'#101b25','panel':'#1b2b38','ground':'#d9c18d','rock':'#6e6654','edge':'#514d43','main':'#167886','flank':'#7752a2','relay':'#005a69','nest':'#a72e32','bug':'#d74943','human':'#1f567d','yellow':'#d99c14','bronze':'#985e29'}
for p in plans:
 p.update(world=[1024,768],origin='top-left; actor points are sprite hotspots',status='schematic custom concept, not recovered art',starts=starts)
 p['routes']={'main':p.pop('main'),'flank':p.pop('flank')}
 p['routes']['connector']={'a-split-ridge':[[800,200],[800,560]],'b-relay-basin':[[904,384],[904,656],[856,656]],'c-switchback-mesa':[[880,300],[816,300],[816,640],[880,640]]}[p['id']]
(ROOT/'proposals.json').write_text(json.dumps(plans,indent=2)+'\n')
for p in plans:
 im=Image.new('RGB',(1408,1100),palette['bg']);d=ImageDraw.Draw(im);svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1408" height="1100" viewBox="0 0 1408 1100">',f'<rect width="1408" height="1100" fill="{palette["bg"]}"/>']
 def rect(x,y,w,h,c,stroke=None):
  d.rectangle((x,y,x+w,y+h),fill=c,outline=stroke,width=2);svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}"'+(f' stroke="{stroke}" stroke-width="2"' if stroke else '')+'/>')
 def text(x,y,s,n=20,c='#eaf1f6'):
  d.text((x,y),s,font=font(n),fill=c);svg.append(f'<text x="{x}" y="{y+n}" font-family="Segoe UI,sans-serif" font-size="{n}" fill="{c}">{html.escape(s)}</text>')
 def line(points,c,w=4):
  d.line(points,fill=c,width=w,joint='curve');svg.append(f'<polyline points="'+ ' '.join(f'{x},{y}' for x,y in points)+f'" fill="none" stroke="{c}" stroke-width="{w}" stroke-linejoin="round"/>')
 def marker(point,label,c,r=17):
  x,y=point;d.ellipse((x-r,y-r,x+r,y+r),fill=c,outline='#fff4db',width=2);svg.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}" stroke="#fff4db" stroke-width="2"/>');text(x-8,y-13,label,17)
 def world(q):return (q[0]+64,q[1]+190)
 text(64,28,'TRIUMPH / RELAY BREAKER',20,'#8cb5c9');text(64,60,p['title'],42);text(64,116,p['subtitle'],23)
 text(64,159,'SCHEMATIC CONCEPT   |   1024 x 768 world   |   New terrain; existing assault rules',17,'#adc0cc')
 rect(64,190,1024,768,palette['ground'], '#efdcac')
 for x in range(0,1025,128):line([(64+x,190),(64+x,958)],'#c8b17e',1)
 for y in range(0,769,128):line([(64,190+y),(1088,190+y)],'#c8b17e',1)
 for x,y,w,h in p['obstacles']:rect(x+64,y+190,w,h,palette['rock'],palette['edge'])
 for name,c in [('main',palette['main']),('connector',palette['main']),('flank',palette['flank'])]:
  pts=[world(q) for q in p['routes'][name]];line(pts,'#f5e3b7',12);line(pts,c,6)
  for a,b in zip(pts,pts[1:]):
   x=(a[0]+b[0])/2;y=(a[1]+b[1])/2;angle=math.atan2(b[1]-a[1],b[0]-a[0]);line([(x-12*math.cos(angle-.55),y-12*math.sin(angle-.55)),(x,y),(x-12*math.cos(angle+.55),y-12*math.sin(angle+.55))],c,4)
 for i,q in enumerate(p['relays']):marker(world(q),'R'+str(i+1),palette['relay'],23)
 for i,q in enumerate(p['nests']):marker(world(q),'N'+str(i+1),palette['nest'],23)
 for q in p['bugs']:marker(world(q),'b',palette['bug'],10)
 for q in starts['commanders']:marker(world(q),'C',palette['human'],13)
 for q in starts['soldiers']:marker(world(q),'s',palette['human'],10)
 for q,l,c in zip(p['support'],['Y','T'],[palette['yellow'],palette['bronze']]):marker(world(q),l,c,20)
 marker(world(p['plasma']),'P','#276960',18)
 rect(1112,190,264,768,palette['panel'])
 text(1132,206,'ROUTE CHOICE',20)
 for i,s in enumerate(p['notes']):text(1132,250+i*33,s,17)
 text(1132,475,'KEY',20)
 legend=[('C / s','4 commanders / 8 soldiers'),('R1 / R2','Activate both relays'),('N1 / N2','Destroy both nests'),('b','6 ordinary bugs'),('Y','Yellow troop support'),('T','Bronze tank support'),('P','Plasma weapon pickup')]
 for i,(a,b) in enumerate(legend):text(1132,519+i*45,a,18,'#dfc89d');text(1132,540+i*45,b,15)
 text(1132,867,'Teal: main / Purple: flank',15);text(1132,898,'Solid rock blocks movement',15)
 text(64,982,'Objective: activate both relays, then clear nests and all ground / transitioning enemies.',21)
 text(64,1020,'Concept clearance only. Sightlines, collision masks, support delivery and balance require implementation tests.',18,'#adc0cc')
 text(64,1052,'No runtime map added. Original maps, controls, aiming and enemy-only barrel damage remain unchanged.',17,'#adc0cc')
 svg.append('</svg>');(ROOT/(p['id']+'.svg')).write_text('\n'.join(svg),encoding='utf-8');im.save(ROOT/(p['id']+'.png'))
sheet=Image.new('RGB',(1500,1260),palette['bg']);sd=ImageDraw.Draw(sheet);sd.text((40,20),'Relay Breaker / three new map directions',font=font(36),fill='#eaf1f6')
for i,p in enumerate(plans):
 thumb=Image.open(ROOT/(p['id']+'.png'));thumb.thumbnail((730,570));pos=[(20,85),(750,85),(385,665)][i];sheet.paste(thumb,pos)
sheet.save(ROOT/'contact-sheet.png')
print('Rendered three editable SVGs, matching PNGs, JSON and contact sheet.')

