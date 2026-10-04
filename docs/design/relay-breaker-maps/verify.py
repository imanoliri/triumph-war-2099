"""Concept-only geometry checks. Does not load runtime art or collision masks."""
import json, math
from pathlib import Path
from collections import deque
plans=json.loads((Path(__file__).parent/'proposals.json').read_text())
def clear(p,x,y,r=32):
 if not (r<=x<=1024-r and r<=y<=768-r):return False
 return all(not (a-r<x<a+w+r and b-r<y<b+h+r) for a,b,w,h in p['obstacles'])
def segment(p,a,b,r=32):
 n=max(1,math.ceil(math.dist(a,b)/4))
 return all(clear(p,a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n,r) for i in range(n+1))
for p in plans:
 points=sum(p['starts'].values(),[])+p['relays']+p['nests']+p['bugs']+p['support']+[p['plasma']]
 assert len(p['starts']['commanders'])==4 and len(p['starts']['soldiers'])==8
 assert len(p['relays'])==len(p['nests'])==len(p['support'])==2 and len(p['bugs'])==6
 for q in points: assert clear(p,*q), (p['id'],'placement',q)
 for route in p['routes'].values():
  for a,b in zip(route,route[1:]):assert segment(p,a,b),(p['id'],'route',a,b)
 seed=(96,288); seen={seed}; todo=deque([seed])
 while todo:
  a=todo.popleft()
  for dx,dy in [(16,0),(-16,0),(0,16),(0,-16)]:
   b=(a[0]+dx,a[1]+dy)
   if b not in seen and clear(p,*b) and segment(p,a,b):seen.add(b);todo.append(b)
 for q in points:
  assert any(math.dist(q,a)<=24 and segment(p,q,a) for a in seen),(p['id'],'unreachable',q)
 for nest in p['nests']:
  lanes=[]
  for dx,dy in [(128,0),(-128,0),(0,128),(0,-128)]:
   q=(nest[0]+dx,nest[1]+dy)
   if clear(p,*q) and segment(p,q,nest,0) and any(math.dist(q,a)<=24 and segment(p,q,a) for a in seen):lanes.append(q)
  assert lanes,(p['id'],'no cardinal firing lane',nest)
 print(p['id']+': 25 placements connected on 16px grid; routes reserve 64px square clearance; both nests have clear 128px cardinal firing lanes.')

