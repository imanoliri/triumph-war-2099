"""Original schematic proposals; no recovered assets or runtime writes. Run from any cwd."""
import json, math, html
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
OUT = Path(__file__).resolve().parent
MAPS = [
 dict(id='a', title='A / Twin Crescent', rocks=[[350,300,660,470],[100,630,230,700],[780,85,900,145]], crawlers=[[180,360],[180,410]], deployment=[[90,290],[90,330],[90,370]], extraction=[910,390], routes=[[[180,360],[250,230],[680,230],[910,390]],[[180,410],[330,590],[700,590],[910,390]]], worms=[[300,100,0,1],[700,690,0,-1],[900,570,-1,0]], nests=[[300,100],[700,690]], refuges=[[330,280],[660,510]], note='Two broad arcs around one central mesa; balanced approach and retreat.'),
 dict(id='b', title='B / Broken Wells', rocks=[[350,310,500,450],[590,190,720,350],[590,480,740,560],[130,470,220,570]], crawlers=[[470,165],[520,165]], deployment=[[380,100],[420,100],[460,100]], extraction=[510,675], routes=[[[470,165],[280,240],[280,610],[510,675]],[[520,165],[520,100],[820,100],[820,630],[510,675]]], worms=[[110,250,1,0],[920,430,-1,0],[470,580,1,0]], nests=[[110,250],[920,430]], refuges=[[330,420],[760,370]], note='North-to-south rescue; asymmetrical long open flanks around staggered wells.'),
 dict(id='c', title='C / Three-Table Crossing', rocks=[[260,260,410,400],[550,430,710,560],[740,160,870,290]], crawlers=[[165,600],[215,600]], deployment=[[85,510],[85,550],[85,590]], extraction=[900,110], routes=[[[165,600],[160,200],[480,200],[630,330],[680,110],[900,110]],[[215,600],[450,650],[850,650],[930,370],[940,110],[900,110]]], worms=[[110,460,1,0],[650,90,0,1],[930,590,-1,0]], nests=[[110,460],[650,90]], refuges=[[440,420],[730,620]], note='Diagonal destination with three isolated tables; short inner arc versus long outer sweep.')
]
ASSUMPTIONS=dict(crawlerBodyRadius=17, diagonalDodgeAxis=32, validationRadius=49, sampleStep=2, wormRadius=12, wormWarningSeconds=1.2, wormChargeRange=260, wormChargeWidth=24, hudHeight=32)
def samples(path):
 for a,b in zip(path,path[1:]):
  n=max(1,math.ceil(math.dist(a,b)/2))
  for i in range(n+1): yield [a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n]
def clear(p,r,rocks):
 x,y=p
 return r<=x<=1024-r and 32+r<=y<=768-r and all(not (a-r<x<c+r and b-r<y<d+r) for a,b,c,d in rocks)
def validate(m):
 rocks=m['rocks']; routes=[]
 for path in m['routes']:
  pts=list(samples(path)); assert all(clear(p,49,rocks) for p in pts),m['id']
  # Swept rectangular body margin is deliberately stricter than circular body collision.
  assert all(clear([p[0]+dx,p[1]+dy],17,rocks) for p in pts for dx in [-32,32] for dy in [-32,32])
  encounters=[]
  for wi,(x,y,dx,dy) in enumerate(m['worms']):
   for p in pts:
    along=(p[0]-x)*dx+(p[1]-y)*dy;across=abs((p[1]-y)*dx-(p[0]-x)*dy)
    if 0<=along<=180 and across<=8 and all(clear(q,0,rocks) for q in samples([[x,y],p])):
     encounters.append(dict(worm=wi+1,routePoint=[round(v,1) for v in p],triggerDistance=round(math.dist([x,y],p),1),unblockedTargetingSightline=True));break
  assert encounters,('no charged encounter',m['id'])
  routes.append(dict(length=round(sum(math.dist(a,b) for a,b in zip(path,path[1:]))),samples=len(pts),bodyPlusDodgeSquareClear=True,exposedThreatAccess=encounters))
 for p in m['crawlers']+m['deployment']+[m['extraction']]+m['refuges']: assert clear(p,17,rocks)
 assert all(clear(p,49,rocks) for p in samples(m['crawlers']))
 for x,y,dx,dy in m['worms']:
  assert clear([x,y],12,rocks)
  assert all(clear(p,12,rocks) for p in samples([[x,y],[x+dx*260,y+dy*260]]))
  for p in m['refuges']:
   along=max(0,min(260,(p[0]-x)*dx+(p[1]-y)*dy))
   assert math.dist(p,[x+dx*along,y+dy*along])>29,('unsafe refuge',m['id'],p)
 # Friendly deployment can reach each ambush vehicle on clear straight support accesses.
 for c in m['crawlers']: assert all(clear(p,8,rocks) for p in samples([m['deployment'][1],c]))
 return dict(id=m['id'],routes=routes,placementsClear=True,sharedAmbushRouteSwitchClear=True,supportAccessClear=True,cardinalLanesClear=True,refugesOutsideShownWormPlusCrawlerSweep=True)
class Canvas:
 def __init__(self):
  self.im=Image.new('RGB',(1024,768),'#ddc393');self.d=ImageDraw.Draw(self.im);self.svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="768" viewBox="0 0 1024 768">']
  self.font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
 def rect(self,b,fill,stroke=None):
  self.d.rectangle(b,fill,stroke);a,c,e,f=b;self.svg.append(f'<rect x="{a}" y="{c}" width="{e-a}" height="{f-c}" fill="{fill}" stroke="{stroke or fill}"/>')
 def line(self,p,color,width):
  self.d.line([tuple(v) for v in p],color,width=width,joint='curve');self.svg.append(f'<polyline points="{" ".join(f"{x},{y}" for x,y in p)}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linejoin="round"/>')
 def circle(self,p,r,color):
  x,y=p;self.d.ellipse([x-r,y-r,x+r,y+r],fill=color);self.svg.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{color}"/>')
 def text(self,p,t,color='#282922'):
  self.d.text(p,t,font=self.font,fill=color);self.svg.append(f'<text x="{p[0]}" y="{p[1]+15}" font-family="Arial,sans-serif" font-size="16" fill="{color}">{html.escape(t)}</text>')
def render(m):
 c=Canvas();c.rect([0,0,1023,767],'#ddc393');c.rect([0,0,1024,32],'#263940');c.text([14,5],m['title']+'    |    HUD reserved 0..31','#ffffff')
 for path in m['routes']:c.line(path,'#e9d4ac',98)
 for b in m['rocks']:c.rect(b,'#776950','#413f36');c.text([b[0]+8,b[1]+8],'ROCK')
 for i,path in enumerate(m['routes']):c.line(path,['#257d87','#625aa1'][i],5);p=path[1];c.text([400 if m['id']=='a' and i==0 else p[0]+8,p[1]-23],f'Escort {i+1}')
 for x,y,dx,dy in m['worms']:
  end=[x+260*dx,y+260*dy];c.line([[x,y],end],'#dda061',24);c.line([[x,y],end],'#9a472e',3);c.circle([x,y],12,'#9a472e');c.text([x+22,y-5],'W spawn');c.text([end[0]-30,end[1]+14],'charge')
 for x,y in m['nests']:c.rect([x-18,y-18,x+18,y+18],'#5b332e');c.text([x-45,y-40],'N? nest')
 for i,p in enumerate(m['crawlers']):c.rect([p[0]-17,p[1]-12,p[0]+17,p[1]+12],'#183c57');c.text([p[0]-10,p[1]-38 if i==0 else p[1]+20],f'C{i+1}')
 for p,label in zip(m['deployment'],['S','G','M']):c.circle(p,8,'#276853');c.text([p[0]+14,p[1]-10],label)
 for p in m['refuges']:c.circle(p,10,'#3e7862');c.text([p[0]-35,p[1]+14],'refuge')
 p=m['extraction'];c.rect([p[0]-30,p[1]-25,p[0]+30,p[1]+25],'#dcead4','#276853');c.text([p[0]-58,p[1]-48 if p[1]>640 else p[1]+30],'EXTRACT >=1')
 c.text([14,717],'PROPOSAL | C1/C2: disabled 6HP | S: scout | G: shotgun guard | M: mechanic | N?: optional nest')
 c.text([14,741],'98px route envelope = 17px body + 32px/axis diagonal evade; amber lanes = 24px x 260px')
 c.im.save(OUT/f"{m['id']}.png");(OUT/f"{m['id']}.svg").write_text('\n'.join(c.svg+['</svg>']),encoding='utf-8');return c.im
def main():
 results=[validate(m) for m in MAPS]
 (OUT/'geometry.json').write_text(json.dumps(dict(provenance='Original custom proposal geometry; no source-game or Split Ridge geometry',dimensions=[1024,768],assumptions=ASSUMPTIONS,maps=MAPS),indent=2)+'\n')
 (OUT/'validation.json').write_text(json.dumps(dict(method='2px sampled swept square bounds; all four diagonal endpoint sweeps',results=results),indent=2)+'\n')
 images=[render(m) for m in MAPS];sheet=Image.new('RGB',(1536,430),'#263940');d=ImageDraw.Draw(sheet)
 for i,im in enumerate(images):sheet.paste(im.resize((512,384)),(i*512,0))
 d.text((12,398),'BENEATH THE DUNES / three original rescue geometries / select a layout before runtime and art freeze',fill='white')
 sheet.save(OUT/'contact-sheet.png');print(json.dumps(results,indent=2))
if __name__=='__main__':main()
