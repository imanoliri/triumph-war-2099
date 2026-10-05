'use strict';
// Disposable loopback-only module fixture, separate from campaign/runtime routes.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),files={'/':'tools/worm-sandbox.html','/src/desert-worm.js':'src/desert-worm.js'};
http.createServer((req,res)=>{const file=files[req.url];if(!file){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':'text/javascript');res.setHeader('Cache-Control','no-store');res.end(fs.readFileSync(path.join(root,file)));}).listen(2135,'127.0.0.1',()=>console.log('Isolated worm fixture: http://127.0.0.1:2135/ (Ctrl+C stops)'));
