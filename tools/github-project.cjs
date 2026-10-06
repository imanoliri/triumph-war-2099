'use strict';
// One-way mirror of the authoritative local board (docs/board.json) into the native GitHub Project.
// Dependency-free: remote access goes only through the installed GitHub CLI (`gh api`).
// The board is never modified; GitHub is never read back into local state.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');

const root=path.resolve(__dirname,'..');
const config={
 owner:'imanoliri',
 repo:'triumph-war-2099',
 title:'Triumph War 2099',
 // Set after the Project was created; the BOARD header links it.
 url:'https://github.com/users/imanoliri/projects/6',
 shortDescription:'Mirror of docs/board.json in imanoliri/triumph-war-2099. The local board is authoritative; refreshed at director checkpoints.',
 branch:'main'
};
const statusOptions=[
 {name:'Backlog',color:'GRAY',description:'Proposed; scope not yet approved'},
 {name:'Ready',color:'BLUE',description:'Approved scope; awaiting queue/dispatch'},
 {name:'Queued',color:'PURPLE',description:'Queued for upcoming worker dispatch'},
 {name:'In progress',color:'YELLOW',description:'Worker dispatched'},
 {name:'Blocked',color:'RED',description:'Awaiting a director/user answer'},
 {name:'Review',color:'PINK',description:'Worker finished; director review pending'},
 {name:'Done',color:'GREEN',description:'Reviewed and squash-merged into main'},
 {name:'Withdrawn',color:'ORANGE',description:'Withdrawn by the user; not planned'}
];

// ---- Pure board-to-Project mapping (covered offline by tools/check-github-project.cjs) ----

const withdrawnPattern=/^(?:user\b[^:;]*:\s*withdrawn|withdrawn by user)/i;
function projectStatus(ticket){
 if(ticket.status!=='Done'&&withdrawnPattern.test(String(ticket.reason||'').trim()))return 'Withdrawn';
 if(!statusOptions.some(o=>o.name===ticket.status))throw Error(`Unsupported board state for ${ticket.id}: ${ticket.status}`);
 return ticket.status;
}
function issueNumber(ticket,cfg=config){
 if(!ticket.issueUrl)return null;
 const m=new RegExp(`^https://github\\.com/${cfg.owner}/${cfg.repo}/issues/(\\d+)$`).exec(ticket.issueUrl);
 if(!m)throw Error(`Issue URL for ${ticket.id} is not an issue of ${cfg.owner}/${cfg.repo}: ${ticket.issueUrl}`);
 return Number(m[1]);
}
function draftTitle(ticket){return `${ticket.id}: ${ticket.title}`;}
function draftBody(ticket,cfg=config){
 const link=`https://github.com/${cfg.owner}/${cfg.repo}/blob/${cfg.branch}/${ticket.task}`;
 return `Local board ticket ${ticket.id}.\n\nTask record (scope and acceptance): ${link}\n\nMirror only: \`docs/board.json\` in the repository is the authoritative workflow state.`;
}
// Desired issue state: withdrawn -> closed as not planned; Done -> closed (completed); otherwise open.
function issueTarget(status){
 if(status==='Withdrawn')return {state:'CLOSED',stateReason:'NOT_PLANNED'};
 if(status==='Done')return {state:'CLOSED',stateReason:'COMPLETED'};
 return {state:'OPEN',stateReason:null};
}
function desiredItems(board,cfg=config){
 if(!board||board.version!==1||!Array.isArray(board.tickets))throw Error('Unsupported board.');
 const ids=new Set(),issues=new Set();
 return board.tickets.map(t=>{
  if(ids.has(t.id))throw Error('Duplicate board ticket: '+t.id);ids.add(t.id);
  const status=projectStatus(t),number=issueNumber(t,cfg);
  if(number!==null){if(issues.has(number))throw Error(`Issue #${number} is linked from more than one ticket.`);issues.add(number);
   return {id:t.id,kind:'issue',number,status,issue:issueTarget(status)};}
  return {id:t.id,kind:'draft',title:draftTitle(t),body:draftBody(t,cfg),status};
 });
}
function ticketIdOfDraft(title){const m=/^([A-Z]+-\d{3,}): /.exec(title||'');return m?m[1]:null;}
// Issues closed for Done keep any closed reason; withdrawn ones must be closed as not planned.
function issueMatches(remote,want){
 if(!remote)return false;
 if(want.state==='OPEN')return remote.state==='OPEN';
 if(remote.state!=='CLOSED')return false;
 return want.stateReason!=='NOT_PLANNED'||remote.stateReason==='NOT_PLANNED';
}
function optionsMatch(field){
 return !!field&&field.options.length===statusOptions.length&&statusOptions.every((o,i)=>{const r=field.options[i];return r.name===o.name&&r.color===o.color&&(r.description||'')===o.description;});
}

// Remote snapshot shape (produced by the gh adapter or by an offline fake):
// {project:{id,number,url,title,shortDescription,linked:boolean}|null,
//  statusField:{id,options:[{id,name,color,description}]}|null,
//  items:[{itemId,type:'ISSUE'|'DRAFT_ISSUE'|other,number?,draftId?,title?,body?,status:string|null}],
//  issues:{[number]:{id,state,stateReason}}}
// Project-level actions come first; item actions assume the project and Status options exist.
function plan(board,remote,cfg=config){
 const desired=desiredItems(board,cfg),actions=[],warnings=[];
 if(!remote.project)actions.push({type:'createProject'});
 else{
  if(!remote.project.linked)actions.push({type:'linkRepository'});
  if(remote.project.shortDescription!==cfg.shortDescription)actions.push({type:'updateProject'});
 }
 if(!optionsMatch(remote.statusField))actions.push({type:'setStatusOptions'});
 const items=remote.project?remote.items:[];
 const byIssue=new Map(),byDraft=new Map();
 for(const item of items){
  let key=null,map=null;
  if(item.type==='ISSUE'){key=item.number;map=byIssue;}
  else if(item.type==='DRAFT_ISSUE'){key=ticketIdOfDraft(item.title);map=byDraft;}
  if(key===null||key===undefined){warnings.push(`Unmanaged project item left untouched: ${item.type} ${item.title||item.number||item.itemId}`);continue;}
  if(!map.has(key))map.set(key,[]);map.get(key).push(item);
 }
 const claimedIssues=new Set(),claimedDrafts=new Set();
 for(const want of desired){
  const list=(want.kind==='issue'?byIssue.get(want.number):byDraft.get(want.id))||[];
  if(want.kind==='issue')claimedIssues.add(want.number);else claimedDrafts.add(want.id);
  // A ticket that changed kind (draft -> issue) must not keep its old draft.
  if(want.kind==='issue')for(const old of byDraft.get(want.id)||[]){actions.push({type:'deleteItem',ticket:want.id,itemId:old.itemId,why:'ticket now linked to an issue'});claimedDrafts.add(want.id);}
  let item=list[0];
  for(const dup of list.slice(1))actions.push({type:'deleteItem',ticket:want.id,itemId:dup.itemId,why:'duplicate'});
  if(!item){
   actions.push(want.kind==='issue'?{type:'addIssue',ticket:want.id,number:want.number}:{type:'addDraft',ticket:want.id,title:want.title,body:want.body});
   item={itemId:null,status:null};
  }else if(want.kind==='draft'&&(item.title!==want.title||item.body!==want.body))actions.push({type:'updateDraft',ticket:want.id,itemId:item.itemId,draftId:item.draftId,title:want.title,body:want.body});
  if(item.status!==want.status||actions.some(a=>a.type==='setStatusOptions'))actions.push({type:'setStatus',ticket:want.id,itemId:item.itemId,number:want.number,status:want.status});
  if(want.kind==='issue'){
   const remoteIssue=remote.issues[want.number];
   if(!remoteIssue)throw Error(`Issue #${want.number} for ${want.id} was not found in ${cfg.owner}/${cfg.repo}.`);
   if(!issueMatches(remoteIssue,want.issue))actions.push({type:'setIssueState',ticket:want.id,number:want.number,state:want.issue.state,stateReason:want.issue.stateReason});
  }
 }
 for(const [number,list] of byIssue)if(!claimedIssues.has(number))for(const i of list)warnings.push(`Issue #${number} is on the Project but linked from no board ticket; left untouched (item ${i.itemId}).`);
 for(const [id,list] of byDraft)if(!claimedDrafts.has(id))for(const i of list)warnings.push(`Draft "${i.title}" matches no board ticket; left untouched.`);
 return {actions,warnings,desired};
}

// ---- Sync driver over an injected API (gh adapter in production, in-memory fake in checks) ----

async function sync(board,api,{dryRun=false,log=()=>{},cfg=config}={}){
 let remote=await api.fetch();
 const first=plan(board,remote,cfg);
 for(const w of first.warnings)log('warning: '+w);
 if(dryRun){for(const a of first.actions)log('would '+describe(a));return {changes:first.actions.length,actions:first.actions,warnings:first.warnings};}
 let changes=0, allActions=[];
 for(let step=0;step<10;step++){
  const current=plan(board,remote,cfg);
  const projAction=current.actions.find(a=>['createProject','linkRepository','updateProject','updateView','setStatusOptions'].includes(a.type));
  if(!projAction)break;
  log(describe(projAction));
  await api.apply(projAction,remote);
  changes++;
  allActions.push(projAction);
  remote=await api.fetch();
 }
 const finalPlan=plan(board,remote,cfg);
 const projRemaining=finalPlan.actions.filter(a=>['createProject','linkRepository','updateProject','updateView','setStatusOptions'].includes(a.type));
 if(projRemaining.length)throw Error('Project setup did not converge: '+projRemaining.map(describe).join('; '));
 const itemActions=finalPlan.actions;
 const created=new Map();
 for(const a of itemActions){
  if(a.type==='setStatus'&&!a.itemId)a.itemId=created.get(a.ticket);
  log(describe(a));
  const id=await api.apply(a,remote);
  if(a.type==='addIssue'||a.type==='addDraft')created.set(a.ticket,id);
  changes++;
  allActions.push(a);
 }
 return {changes,actions:allActions,warnings:finalPlan.warnings};
}
function describe(a){
 switch(a.type){
  case 'createProject':return `create Project "${config.title}" linked to ${config.owner}/${config.repo}`;
  case 'linkRepository':return `link Project to ${config.owner}/${config.repo}`;
  case 'updateProject':return 'update Project short description';
  case 'updateView':return 'update default Project view to Board layout';
  case 'setStatusOptions':return 'set Status options to '+statusOptions.map(o=>o.name).join(', ');
  case 'addIssue':return `add issue #${a.number} for ${a.ticket}`;
  case 'addDraft':return `add draft "${a.title}"`;
  case 'updateDraft':return `update draft for ${a.ticket}`;
  case 'deleteItem':return `delete ${a.why} item for ${a.ticket}`;
  case 'setStatus':return `set ${a.ticket} Status to ${a.status}`;
  case 'setIssueState':return `set issue #${a.number} (${a.ticket}) ${a.state}${a.stateReason?' as '+a.stateReason:''}`;
  default:return a.type;
 }
}

// ---- gh CLI adapter ----

function findGh(explicit){
 const candidates=[explicit,process.env.GH_PATH,'gh'];
 if(process.platform==='win32')candidates.push(path.join(process.env.ProgramFiles||'C:\\Program Files','GitHub CLI','gh.exe'));
 for(const c of candidates.filter(Boolean)){const r=spawnSync(c,['--version'],{encoding:'utf8',windowsHide:true});if(!r.error&&r.status===0)return c;}
 throw Error('GitHub CLI not found. Install gh, put it on PATH, or pass --gh <path> / set GH_PATH.');
}
function ghApi(gh){
 function call(args,input){
  const r=spawnSync(gh,['api',...args],{input,encoding:'utf8',windowsHide:true,maxBuffer:64*1024*1024});
  if(r.error)throw r.error;
  if(r.status!==0)throw Error(`gh api ${args.join(' ')} failed: ${(r.stderr||r.stdout).trim()}`);
  return r.stdout.trim()?JSON.parse(r.stdout):null;
 }
 function graphql(query,variables={}){
  const res=call(['graphql','--input','-'],JSON.stringify({query,variables}));
  if(res.errors)throw Error('GraphQL: '+res.errors.map(e=>e.message).join('; '));
  return res.data;
 }
 let ids=null;
 function repoIds(){
  if(!ids){const d=graphql(`query($o:String!,$r:String!){repository(owner:$o,name:$r){id owner{id login}}}`,{o:config.owner,r:config.repo});
   ids={repositoryId:d.repository.id,ownerId:d.repository.owner.id};}
  return ids;
 }
 function findProject(){
  const d=graphql(`query($o:String!,$q:String!){repositoryOwner(login:$o){... on ProjectV2Owner{projectsV2(first:50,query:$q){nodes{id number title url closed}}}}}`,{o:config.owner,q:config.title});
  const found=d.repositoryOwner.projectsV2.nodes.filter(p=>p.title===config.title&&!p.closed);
  if(found.length>1)throw Error(`More than one open Project titled "${config.title}": `+found.map(p=>p.url).join(', '));
  return found[0]||null;
 }
 function fetchIssues(){
  const issues={};let after=null;
  do{const d=graphql(`query($o:String!,$r:String!,$a:String){repository(owner:$o,name:$r){issues(first:100,after:$a){pageInfo{hasNextPage endCursor} nodes{id number state stateReason}}}}`,{o:config.owner,r:config.repo,a:after});
   const c=d.repository.issues;for(const n of c.nodes)issues[n.number]={id:n.id,state:n.state,stateReason:n.stateReason};after=c.pageInfo.hasNextPage?c.pageInfo.endCursor:null;}while(after);
  return issues;
 }
 return {
  async fetch(){
   const found=findProject(),issues=fetchIssues();
   if(!found)return {project:null,firstView:null,statusField:null,items:[],issues};
   const items=[];let after=null,project=null,statusField=null,firstView=null;
   do{
    const d=graphql(`query($id:ID!,$a:String){node(id:$id){... on ProjectV2{id number url title shortDescription
     repositories(first:20){nodes{nameWithOwner}}
     views(first:1){nodes{id name layout}}
      field(name:"Status"){... on ProjectV2SingleSelectField{id options{id name color description}}}
     items(first:100,after:$a){pageInfo{hasNextPage endCursor} nodes{id type
      fieldValueByName(name:"Status"){... on ProjectV2ItemFieldSingleSelectValue{name}}
      content{... on Issue{number repository{nameWithOwner}} ... on DraftIssue{id title body}}}}}}}`,{id:found.id,a:after});
    const p=d.node;
    project={id:p.id,number:p.number,url:p.url,title:p.title,shortDescription:p.shortDescription||'',linked:p.repositories.nodes.some(r=>r.nameWithOwner===`${config.owner}/${config.repo}`)};
    statusField=p.field?{id:p.field.id,options:p.field.options}:null;
    firstView=p.views?.nodes?.[0]||null;
    for(const n of p.items.nodes){
     const item={itemId:n.id,type:n.type,status:n.fieldValueByName?.name||null};
     if(n.type==='ISSUE'){if(n.content.repository.nameWithOwner!==`${config.owner}/${config.repo}`)item.type='FOREIGN_ISSUE';item.number=n.content.number;}
     else if(n.type==='DRAFT_ISSUE'){item.draftId=n.content.id;item.title=n.content.title;item.body=n.content.body;}
     items.push(item);
    }
    after=p.items.pageInfo.hasNextPage?p.items.pageInfo.endCursor:null;
   }while(after);
   return {project,firstView,statusField,items,issues};
  },
  async apply(a,remote){
   const projectId=remote.project?.id;
   switch(a.type){
    case 'createProject':{const {ownerId,repositoryId}=repoIds();graphql(`mutation($o:ID!,$r:ID!,$t:String!){createProjectV2(input:{ownerId:$o,repositoryId:$r,title:$t}){projectV2{id}}}`,{o:ownerId,r:repositoryId,t:config.title});return;}
    case 'linkRepository':graphql(`mutation($p:ID!,$r:ID!){linkProjectV2ToRepository(input:{projectId:$p,repositoryId:$r}){repository{id}}}`,{p:projectId,r:repoIds().repositoryId});return;
    case 'updateProject':graphql(`mutation($p:ID!,$d:String!){updateProjectV2(input:{projectId:$p,shortDescription:$d}){projectV2{id}}}`,{p:projectId,d:config.shortDescription});return;
    case 'updateView':graphql(`mutation($v:ID!,$n:String!){updateProjectV2View(input:{viewId:$v,name:$n,layout:BOARD_LAYOUT}){projectV2View{id}}}`,{v:remote.firstView.id,n:'Board'});return;
    case 'setStatusOptions':{
     if(!remote.statusField)throw Error('Project has no built-in Status field.');
     graphql(`mutation($f:ID!,$o:[ProjectV2SingleSelectFieldOptionInput!]){updateProjectV2Field(input:{fieldId:$f,singleSelectOptions:$o}){projectV2Field{... on ProjectV2SingleSelectField{id}}}}`,{f:remote.statusField.id,o:statusOptions});return;}
    case 'addIssue':return graphql(`mutation($p:ID!,$c:ID!){addProjectV2ItemById(input:{projectId:$p,contentId:$c}){item{id}}}`,{p:projectId,c:remote.issues[a.number].id}).addProjectV2ItemById.item.id;
    case 'addDraft':return graphql(`mutation($p:ID!,$t:String!,$b:String){addProjectV2DraftIssue(input:{projectId:$p,title:$t,body:$b}){projectItem{id}}}`,{p:projectId,t:a.title,b:a.body}).addProjectV2DraftIssue.projectItem.id;
    case 'updateDraft':graphql(`mutation($d:ID!,$t:String!,$b:String){updateProjectV2DraftIssue(input:{draftIssueId:$d,title:$t,body:$b}){draftIssue{id}}}`,{d:a.draftId,t:a.title,b:a.body});return;
    case 'deleteItem':graphql(`mutation($p:ID!,$i:ID!){deleteProjectV2Item(input:{projectId:$p,itemId:$i}){deletedItemId}}`,{p:projectId,i:a.itemId});return;
    case 'setStatus':{
     const option=remote.statusField.options.find(o=>o.name===a.status);if(!option)throw Error('Missing Status option '+a.status);
     graphql(`mutation($p:ID!,$i:ID!,$f:ID!,$o:String!){updateProjectV2ItemFieldValue(input:{projectId:$p,itemId:$i,fieldId:$f,value:{singleSelectOptionId:$o}}){projectV2Item{id}}}`,{p:projectId,i:a.itemId,f:remote.statusField.id,o:option.id});return;}
    case 'setIssueState':{
     const args=['-X','PATCH',`repos/${config.owner}/${config.repo}/issues/${a.number}`,'-f','state='+a.state.toLowerCase()];
     if(a.stateReason)args.push('-f','state_reason='+a.stateReason.toLowerCase());
     call(args);return;}
    default:throw Error('Unknown action '+a.type);
   }
  }
 };
}

async function main(argv){
 const args=[...argv];let dryRun=false,boardFile=path.join(root,'docs/board.json'),gh=null;
 while(args.length){const a=args.shift();
  if(a==='--dry-run')dryRun=true;
  else if(a==='--board')boardFile=path.resolve(args.shift()||'');
  else if(a==='--gh')gh=args.shift();
  else throw Error('Usage: node tools/github-project.cjs [--dry-run] [--board docs/board.json] [--gh <path-to-gh>]');}
 const board=JSON.parse(fs.readFileSync(boardFile,'utf8'));
 const api=ghApi(findGh(gh));
 const result=await sync(board,api,{dryRun,log:m=>console.log(m)});
 const after=dryRun?null:await api.fetch();
 console.log(`${dryRun?'Dry run: ':''}${result.changes} change(s)${dryRun?' needed':' applied'} for ${board.tickets.length} board tickets.`);
 if(after)console.log(`Project: ${after.project.url} (${after.items.length} items)`);
}

module.exports={ghApi,findGh,config,statusOptions,projectStatus,issueNumber,draftTitle,draftBody,issueTarget,desiredItems,plan,sync,describe,optionsMatch};
if(require.main===module)main(process.argv.slice(2)).catch(e=>{console.error(e.message);process.exitCode=1;});
