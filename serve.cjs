// Loopback-only preview. Serves only game files; no directory listing or writes.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.wav':'audio/wav','.mid':'audio/midi'};
const port=Number(process.env.TRIUMPH_PORT??2099);if(!Number.isInteger(port)||port<0||port>65535)throw Error('Invalid TRIUMPH_PORT');
const server=http.createServer((req,res) => {
  let name;
  try { name = decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '') || 'index.html'; }
  catch { res.writeHead(400).end(); return; }
  if (!['index.html','style.css','game.js','support.js','music.js','navigation.js'].includes(name) && !/^src\/[\w-]+\.js$/.test(name) && !/^assets\/[\w./-]+\.(png|js|wav|mid)$/.test(name)) {res.writeHead(404).end();return;}
  const file = path.resolve(root,name);
  if (!file.startsWith(root + path.sep)) {res.writeHead(404).end();return;}
  fs.readFile(file,(err,data)=> {if(err){res.writeHead(404).end();return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(data);});
});
server.listen(port,'127.0.0.1',()=>console.log('Triumph preview: http://127.0.0.1:'+server.address().port));
