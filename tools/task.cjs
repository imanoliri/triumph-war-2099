'use strict';
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
function git(args,cwd=root){const result=spawnSync('git',['-c',`safe.directory=${cwd.replaceAll('\\','/')}`,...args],{cwd,encoding:'utf8',windowsHide:true});if(result.status!==0)throw Error((result.stderr||result.stdout||result.error?.message||'Git failed').trim());return result.stdout.trim();}
function fill(template,values){let text=fs.readFileSync(path.join(root,'docs/templates',template),'utf8');for(const [key,value]of Object.entries(values))text=text.replaceAll(`{{${key}}}`,value);return text;}
function session(slug,cwd,branch,base){
 const date=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const directory=path.join(cwd,'docs/journal');fs.mkdirSync(directory,{recursive:true});const names=new Set();
 // Include other task branches and active worktrees so daily numbers span features.
 for(const ref of git(['for-each-ref','--format=%(refname)','refs/heads']).split('\n').filter(Boolean))for(const file of git(['ls-tree','-r','--name-only',ref,'--','docs/journal']).split('\n'))names.add(path.basename(file));
 for(const line of git(['worktree','list','--porcelain']).split('\n'))if(line.startsWith('worktree ')){const journal=path.join(line.slice(9),'docs/journal');if(fs.existsSync(journal))for(const file of fs.readdirSync(journal))names.add(file);}
 let number=1;for(const name of names){const match=name.match(/^(\d{4}-\d{2}-\d{2})-(\d+)-/);if(match&&match[1]===date)number=Math.max(number,Number(match[2])+1);}
 const id=String(number).padStart(3,'0'),name=`${date}-${id}-${slug}.md`,file=path.join(directory,name);
 fs.writeFileSync(file,fill('SESSION.md',{SLUG:slug,BRANCH:branch,BASE:base,SESSION:id,DATE:date}),'utf8');
 const task=path.join(cwd,'docs/tasks',slug+'.md');let record=fs.readFileSync(task,'utf8');if(!record.includes('## Sessions'))record+='\n## Sessions\n\n';record+=`- [${date} / ${id}](../journal/${name})\n`;fs.writeFileSync(task,record,'utf8');console.log('Session: '+file);
}
function main(){const [command,name,...options]=process.argv.slice(2);if(!name)throw Error('Usage: task.cjs start <feature|fix|chore>/<slug> [--issue N | --ticket ID] [--worktree path] | session <slug>');
 if(command==='start'){
  if(!/^(feature|fix|chore)\/[a-z][a-z0-9-]{0,70}$/.test(name))throw Error('Use feature/<slug>, fix/<slug> or chore/<slug> with lowercase letters, digits and hyphens.');
  let issue='local backlog',destination=null,ticket=null;for(let i=0;i<options.length;i++){if(options[i]==='--issue'&&/^\d+$/.test(options[i+1]||''))issue='#'+options[++i];else if(options[i]==='--ticket'&&/^[A-Z]+-\d{3,}$/.test(options[i+1]||''))ticket=options[++i];else if(options[i]==='--worktree'&&options[i+1])destination=path.resolve(root,options[++i]);else throw Error('Invalid option: '+options[i]);}
  git(['diff','--exit-code']);git(['diff','--cached','--exit-code']);if(git(['ls-files','--others','--exclude-standard']))throw Error('Commit or move untracked task files before starting another branch.');
  const slug=name.split('/')[1],base=git(['rev-parse','main']);let cwd=root;
  let approvedTask=null;if(ticket){const board=JSON.parse(fs.readFileSync(path.join(root,'docs/board.json'),'utf8'));const record=board.tickets.find(t=>t.id===ticket);if(!record||record.status!=='Ready'||!record.approval||record.task!==`docs/tasks/${slug}.md`)throw Error('Matching Ready ticket with recorded approval required.');approvedTask=fs.readFileSync(path.join(root,record.task),'utf8');}
  if(!ticket&&fs.existsSync(path.join(root,'docs/tasks',slug+'.md')))throw Error('Task record already exists. Resume its branch and use session instead.');
  if(destination){if(fs.existsSync(destination))throw Error('Worktree destination must not already exist.');git(['worktree','add','-b',name,destination,'main']);cwd=destination;}else git(['switch','-c',name,'main']);
  const file=path.join(cwd,'docs/tasks',slug+'.md');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,approvedTask?approvedTask.replace(/^- Branch:.*$/m,`- Branch: \`${name}\``):fill('TASK.md',{SLUG:slug,BRANCH:name,BASE:base,ISSUE:issue}),'utf8');console.log('Checkout: '+cwd+'\nTask: '+file);session(slug,cwd,name,base);
 }else if(command==='session'){
  if(!/^[a-z][a-z0-9-]{0,70}$/.test(name)||!fs.existsSync(path.join(root,'docs/tasks',name+'.md')))throw Error('Existing task slug required.');const branch=git(['branch','--show-current']);const task=fs.readFileSync(path.join(root,'docs/tasks',name+'.md'),'utf8');if(!task.includes('Branch: `'+branch+'`'))throw Error('Switch to the task branch before starting its next session.');session(name,root,branch,git(['rev-parse','HEAD']));
 }else throw Error('Commands: start, session');
}
try{main();}catch(e){console.error(e.message);process.exitCode=1;}
