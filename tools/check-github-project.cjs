'use strict';
// Offline regression checks for the board-to-GitHub-Project mirror. No network or gh access.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const gp=require('./github-project.cjs');
const root=path.resolve(__dirname,'..');
const repo=`https://github.com/${gp.config.owner}/${gp.config.repo}`;

function ticket(id,status,extra={}){return {id,title:'Title '+id,task:`docs/tasks/t-${id.toLowerCase()}.md`,status,reason:'r',questions:[],...extra};}
const board={version:1,tickets:[
 ticket('TST-001','Backlog',{issueUrl:repo+'/issues/2',reason:'User 2026-10-06: withdrawn; not needed'}),
 ticket('TST-002','Backlog',{reason:'Withdrawn by user 2026-10-05: leave it'}),
 ticket('TST-003','Done',{issueUrl:repo+'/issues/4',reason:'Accepted; earlier withdrawn Convoy balance preserved'}),
 ticket('TST-004','In progress',{issueUrl:repo+'/issues/1'}),
 ticket('TST-005','Done'),
 ticket('TST-006','Ready'),
 ticket('TST-007','Review',{issueUrl:repo+'/issues/7'}),
 ticket('TST-008','Blocked'),
 ticket('TST-009','Backlog',{reason:'Awaiting agreed scope'})
]};

// Mapping rules.
assert.deepEqual(board.tickets.map(gp.projectStatus),['Withdrawn','Withdrawn','Done','In progress','Done','Ready','Review','Blocked','Backlog']);
assert.deepEqual(gp.statusOptions.map(o=>o.name),['Backlog','Ready','In progress','Blocked','Review','Done','Withdrawn']);
assert.throws(()=>gp.projectStatus(ticket('TST-010','Shipping')),/Unsupported board state/);
assert.equal(gp.issueNumber(board.tickets[0]),2);
assert.equal(gp.issueNumber(board.tickets[1]),null);
assert.throws(()=>gp.issueNumber(ticket('X-001','Done',{issueUrl:'https://github.com/other/repo/issues/3'})),/not an issue of/);
assert.equal(gp.draftTitle(board.tickets[1]),'TST-002: Title TST-002');
assert.match(gp.draftBody(board.tickets[1]),new RegExp(`${repo}/blob/main/docs/tasks/t-tst-002\\.md`));
assert.match(gp.draftBody(board.tickets[1]),/authoritative/);
assert.deepEqual(gp.issueTarget('Withdrawn'),{state:'CLOSED',stateReason:'NOT_PLANNED'});
assert.deepEqual(gp.issueTarget('Done'),{state:'CLOSED',stateReason:'COMPLETED'});
assert.deepEqual(gp.issueTarget('Review'),{state:'OPEN',stateReason:null});
assert.throws(()=>gp.desiredItems({version:1,tickets:[board.tickets[0],{...board.tickets[0]}]}),/Duplicate board ticket/);
assert.throws(()=>gp.desiredItems({version:1,tickets:[board.tickets[0],{...board.tickets[2],issueUrl:repo+'/issues/2'}]}),/more than one ticket/);
const desired=gp.desiredItems(board);
assert.equal(desired.length,board.tickets.length);
assert.deepEqual(desired.filter(d=>d.kind==='issue').map(d=>d.number),[2,4,1,7]);

// The real authoritative board maps every ticket exactly once; withdrawn tickets are the user withdrawals.
const real=JSON.parse(fs.readFileSync(path.join(root,'docs/board.json'),'utf8'));
const realDesired=gp.desiredItems(real);
assert.equal(new Set(realDesired.map(d=>d.id)).size,real.tickets.length);
for(const d of realDesired)if(d.status==='Withdrawn')assert.match(real.tickets.find(t=>t.id===d.id).reason,/withdrawn/i);
for(const id of ['TRI-001','TRI-002','TRI-004','TRI-039'])assert.equal(realDesired.find(d=>d.id===id)?.status,'Withdrawn',id);
assert.ok(realDesired.every(d=>d.kind==='issue'||/^[A-Z]+-\d{3,}: /.test(d.title)));

// In-memory GitHub fake implementing the adapter contract.
function fakeGitHub(issues){
 let seq=0;const state={project:null,statusField:null,items:[],issues:JSON.parse(JSON.stringify(issues)),calls:[]};
 const api={
  async fetch(){return JSON.parse(JSON.stringify({project:state.project,statusField:state.statusField,items:state.items,issues:state.issues}));},
  async apply(a){
   state.calls.push(a.type);
   switch(a.type){
    case 'createProject':state.project={id:'P1',number:1,url:'https://github.com/users/x/projects/1',title:gp.config.title,shortDescription:gp.config.shortDescription,linked:true};
     state.statusField={id:'F1',options:['Todo','In Progress','Done'].map((name,i)=>({id:'o'+i,name,color:'GRAY',description:''}))};return;
    case 'linkRepository':state.project.linked=true;return;
    case 'updateProject':state.project.shortDescription=gp.config.shortDescription;return;
    case 'setStatusOptions':state.statusField.options=gp.statusOptions.map(o=>({id:'s'+(++seq),...o}));for(const i of state.items)i.status=null;return;
    case 'addIssue':{assert.ok(state.issues[a.number]);const itemId='I'+(++seq);state.items.push({itemId,type:'ISSUE',number:a.number,status:null});return itemId;}
    case 'addDraft':{const itemId='I'+(++seq);state.items.push({itemId,type:'DRAFT_ISSUE',draftId:'D'+seq,title:a.title,body:a.body,status:null});return itemId;}
    case 'updateDraft':{const i=state.items.find(i=>i.draftId===a.draftId);i.title=a.title;i.body=a.body;return;}
    case 'deleteItem':state.items=state.items.filter(i=>i.itemId!==a.itemId);return;
    case 'setStatus':{assert.ok(a.itemId,'setStatus needs an item');const i=state.items.find(i=>i.itemId===a.itemId);assert.ok(state.statusField.options.some(o=>o.name===a.status));i.status=a.status;return;}
    case 'setIssueState':state.issues[a.number]={...state.issues[a.number],state:a.state,stateReason:a.state==='OPEN'?null:a.stateReason};return;
    default:throw Error('unexpected '+a.type);
   }
  }
 };
 return {state,api};
}
const issues={1:{id:'n1',state:'OPEN',stateReason:null},2:{id:'n2',state:'OPEN',stateReason:null},4:{id:'n4',state:'CLOSED',stateReason:'COMPLETED'},7:{id:'n7',state:'CLOSED',stateReason:'COMPLETED'},99:{id:'n99',state:'OPEN',stateReason:null}};

(async()=>{
 // Dry run against an empty owner changes nothing and reports the full plan.
 const dry=fakeGitHub(issues);
 const preview=await gp.sync(board,dry.api,{dryRun:true});
 assert.equal(dry.state.calls.length,0);assert.equal(dry.state.project,null);
 assert.ok(preview.changes>0&&preview.actions[0].type==='createProject');

 // First sync creates and fills the Project; second sync is a no-op.
 const gh=fakeGitHub(issues);
 const first=await gp.sync(board,gh.api);
 assert.ok(first.changes>0);
 const s=gh.state;
 assert.equal(s.items.length,board.tickets.length);
 assert.deepEqual(s.statusField.options.map(o=>o.name),gp.statusOptions.map(o=>o.name));
 for(const d of desired){
  const matches=s.items.filter(i=>d.kind==='issue'?i.type==='ISSUE'&&i.number===d.number:i.type==='DRAFT_ISSUE'&&i.title===d.title);
  assert.equal(matches.length,1,d.id);assert.equal(matches[0].status,d.status,d.id);
 }
 assert.deepEqual(s.issues[2],{id:'n2',state:'CLOSED',stateReason:'NOT_PLANNED'});
 assert.equal(s.issues[1].state,'OPEN');assert.equal(s.issues[7].state,'OPEN');assert.equal(s.issues[4].state,'CLOSED');
 assert.equal(s.issues[99].state,'OPEN','unrelated issues stay untouched');
 const second=await gp.sync(board,gh.api);
 assert.equal(second.changes,0);assert.deepEqual(second.actions,[]);

 // Drift is repaired: duplicates, wrong status, edited draft, closed active issue, Done ticket reopened.
 s.items.push({...s.items.find(i=>i.type==='ISSUE'&&i.number===1),itemId:'dup'});
 s.items.find(i=>i.title==='TST-006: Title TST-006').status='Done';
 s.items.find(i=>i.title==='TST-008: Title TST-008').body='edited';
 s.issues[1]={...s.issues[1],state:'CLOSED',stateReason:'COMPLETED'};
 s.issues[2]={...s.issues[2],state:'CLOSED',stateReason:'COMPLETED'};
 s.items.push({itemId:'manual',type:'DRAFT_ISSUE',draftId:'Dm',title:'Manual note',body:'',status:null});
 const drift=gp.plan(board,await gh.api.fetch());
 assert.deepEqual(drift.actions.map(a=>a.type).sort(),['deleteItem','setIssueState','setIssueState','setStatus','updateDraft']);
 assert.ok(drift.warnings.some(w=>/Manual note/.test(w)));
 await gp.sync(board,gh.api);
 assert.equal((await gp.sync(board,gh.api)).changes,0);
 assert.equal(s.issues[1].state,'OPEN');assert.equal(s.issues[2].stateReason,'NOT_PLANNED');
 assert.ok(s.items.some(i=>i.itemId==='manual'),'unmanaged items are left alone');

 // Board transitions propagate: Review -> Done closes the issue, draft ticket gains an issue link.
 const next=JSON.parse(JSON.stringify(board));
 next.tickets[6].status='Done';next.tickets[5].issueUrl=repo+'/issues/99';
 const moved=await gp.sync(next,gh.api);
 assert.ok(moved.changes>0);
 assert.equal(s.issues[7].state,'CLOSED');assert.equal(s.issues[99].state,'OPEN');
 assert.equal(s.items.filter(i=>i.title==='TST-006: Title TST-006').length,0,'old draft replaced by the issue');
 assert.equal(s.items.find(i=>i.number===99).status,'Ready');
 assert.equal((await gp.sync(next,gh.api)).changes,0);

 // Missing linked issue fails before writing anything.
 const broken=fakeGitHub({});
 await assert.rejects(gp.sync(board,broken.api),/was not found/);assert.equal(broken.state.calls.length,0);

 // BOARD header names the mirror and the authoritative source.
 const header=fs.readFileSync(path.join(root,'tools/board.cjs'),'utf8');
 assert.match(header,/github-project\.cjs/);
 console.log(`GitHub Project mirror checks passed (${real.tickets.length} real board tickets mapped offline).`);
})().catch(e=>{console.error(e);process.exitCode=1;});
