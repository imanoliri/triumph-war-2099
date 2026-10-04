'use strict';
const {spawnSync}=require('node:child_process');
function python() {
  const candidates=process.env.PYTHON?[[process.env.PYTHON]]:process.platform==='win32'?[['py','-3'],['python'],['python3']]:[['python3'],['python']];
  for(const command of candidates){const result=spawnSync(command[0],[...command.slice(1),'-c','import sys; assert sys.version_info >= (3, 10)'],{encoding:'utf8',windowsHide:true});if(result.status===0)return command;}
  throw Error('Python 3.10+ is required for this command. Install it or set PYTHON to its executable path.');
}
module.exports={python};
