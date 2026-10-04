'use strict';
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
function git(args,cwd=root){const result=spawnSync('git',['-c',`safe.directory=${cwd.replaceAll('\\','/')}`,...args],{cwd,encoding:'utf8',windowsHide:true});if(result.status!==0)throw Error((result.stderr||result.stdout||result.error?.message||'Git failed').trim());return result.stdout.trim();}
function fill(template,values){let text=fs.readFileSync(path.join(root,'docs/templates',template),'utf8');for(const [key,value]of Object.entries(values))text=text.replaceAll(`{{${key}}}`,value);return text;}
function session(slug,cwd,branch,base){const directory=path.join(cwd,'docs/sessions',slug);fs.mkdirSync(directory,{recursive:true});let number=1;while(fs.existsSync(path.join(directory,String(number).padStart(3,'0')+'.md')))number++;const id=String(number).padStart(3,'0'),file=path.join(directory,id+'.md');fs.writeFileSync(file,fill('SESSION.md',{SLUG:slug,BRANCH:branch,BASE:base,SESSION:id}),'utf8');console.log('Session: '+file);}
function main(){const [command,name,...options]=process.argv.slice(2);if(!name)throw Error('Usage: task.cjs start <feature|fix|chore>/<slug> [--issue N] [--worktree path] | session <slug>');
 if(command==='start'){
  if(!/^(feature|fix|chore)\/[a-z][a-z0-9-]{0,70}$/.test(name))throw Error('Use feature/<slug>, fix/<slug> or chore/<slug> with lowercase letters, digits and hyphens.');
  let issue='local backlog',destination=null;for(let i=0;i<options.length;i++){if(options[i]==='--issue'&&/^\d+$/.test(options[i+1]||''))issue='#'+options[++i];else if(options[i]==='--worktree'&&options[i+1])destination=path.resolve(root,options[++i]);else throw Error('Invalid option: '+options[i]);}
  git(['diff','--exit-code']);git(['diff','--cached','--exit-code']);if(git(['ls-files','--others','--exclude-standard']))throw Error('Commit or move untracked task files before starting another branch.');
  const slug=name.split('/')[1],base=git(['rev-parse','main']);let cwd=root;
  if(fs.existsSync(path.join(root,'docs/tasks',slug+'.md')))throw Error('Task record already exists. Resume its branch and use session instead.');
  if(destination){if(fs.existsSync(destination))throw Error('Worktree destination must not already exist.');git(['worktree','add','-b',name,destination,'main']);cwd=destination;}else git(['switch','-c',name,'main']);
  const file=path.join(cwd,'docs/tasks',slug+'.md');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,fill('TASK.md',{SLUG:slug,BRANCH:name,BASE:base,ISSUE:issue}),'utf8');console.log('Checkout: '+cwd+'\nTask: '+file);session(slug,cwd,name,base);
 }else if(command==='session'){
  if(!/^[a-z][a-z0-9-]{0,70}$/.test(name)||!fs.existsSync(path.join(root,'docs/tasks',name+'.md')))throw Error('Existing task slug required.');const branch=git(['branch','--show-current']);const task=fs.readFileSync(path.join(root,'docs/tasks',name+'.md'),'utf8');if(!task.includes('Branch: `'+branch+'`'))throw Error('Switch to the task branch before starting its next session.');session(name,root,branch,git(['rev-parse','HEAD']));
 }else throw Error('Commands: start, session');
}
try{main();}catch(e){console.error(e.message);process.exitCode=1;}
