'use strict';
// Disposable fixtures only: no changes to the developer's branches or worktrees.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawnSync,spawn}=require('node:child_process'),http=require('node:http');
const root=path.resolve(__dirname,'..'),scratch=path.join(root,'work','tooling-'+Date.now()),fixture=path.join(scratch,'fixture');fs.mkdirSync(path.join(fixture,'tools'),{recursive:true});fs.mkdirSync(path.join(fixture,'docs/templates'),{recursive:true});
for(const file of ['tools/task.cjs','docs/templates/TASK.md','docs/templates/SESSION.md'])fs.copyFileSync(path.join(root,file),path.join(fixture,file));
function run(command,args,cwd=fixture,success=true){const r=spawnSync(command,args,{cwd,encoding:'utf8',windowsHide:true});if(success)assert.equal(r.status,0,r.stderr||r.stdout||r.error?.message);else assert.notEqual(r.status,0);return r;}
function git(args,cwd=fixture){return run('git',['-c',`safe.directory=${cwd.replaceAll('\\','/')}`,'-c','user.name=Fixture','-c','user.email=fixture@local.invalid',...args],cwd).stdout.trim();}
async function main(){
 git(['init','-b','main']);git(['add','.']);git(['commit','-m','Fixture baseline']);
 run(process.execPath,['tools/task.cjs','start','feature/rally-fixture']);assert.equal(git(['branch','--show-current']),'feature/rally-fixture');assert(fs.readFileSync(path.join(fixture,'docs/tasks/rally-fixture.md'),'utf8').includes('Branch: `feature/rally-fixture`'));
 run(process.execPath,['tools/task.cjs','session','rally-fixture']);assert(fs.existsSync(path.join(fixture,'docs/sessions/rally-fixture/002.md')));
 run(process.execPath,['tools/task.cjs','start','fix/dirty-tree'],fixture,false);git(['add','.']);git(['commit','-m','Task records']);
 const checkout=path.join(scratch,'worktree');run(process.execPath,['tools/task.cjs','start','feature/input-fixture','--worktree',checkout,'--issue','12']);assert.equal(git(['branch','--show-current'],checkout),'feature/input-fixture');assert(fs.readFileSync(path.join(checkout,'docs/tasks/input-fixture.md'),'utf8').includes('Issue: #12'));run(process.execPath,['tools/task.cjs','session','input-fixture'],checkout);assert(fs.existsSync(path.join(checkout,'docs/sessions/input-fixture/002.md')));
 run(process.execPath,['tools/task.cjs','session','../../escape'],fixture,false);
 console.log('Passed isolated task branch/worktree creation, task-specific instructions, numbered session handoffs, issue links, dirty-tree refusal and invalid-path refusal.');
 const server=spawn(process.execPath,[path.join(root,'serve.cjs')],{cwd:scratch,env:{...process.env,TRIUMPH_PORT:'0'},windowsHide:true,stdio:['ignore','pipe','pipe']});
 try{
  const port=await new Promise((resolve,reject)=>{let output='';const timeout=setTimeout(()=>reject(Error('Preview startup timed out')),10000);server.on('error',e=>{clearTimeout(timeout);reject(e);});server.on('exit',code=>{clearTimeout(timeout);reject(Error('Preview exited: '+code));});server.stdout.on('data',data=>{output+=data;const match=output.match(/127\.0\.0\.1:(\d+)/);if(match){clearTimeout(timeout);resolve(Number(match[1]));}});});
  const get=name=>new Promise((resolve,reject)=>http.get({host:'127.0.0.1',port,path:name},res=>{let body='';res.on('data',d=>body+=d);res.on('end',()=>resolve({status:res.statusCode,body}));}).on('error',reject));
  for(const name of ['/','/src/balance.js','/src/missions.js','/src/rally.js'])assert.equal((await get(name)).status,200,name);
  for(const name of ['/AGENTS.md','/docs/STATUS.md','/tools/task.cjs','/package.json','/assets/../../AGENTS.md'])assert.equal((await get(name)).status,404,name);
  console.log('Passed preview startup from another cwd, extracted-module serving and docs/tooling/path allowlist exclusion.');
 }finally{server.kill();}
 console.log('Disposable tooling fixtures retained under ignored '+scratch);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
