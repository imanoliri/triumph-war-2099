'use strict';
// Disposable loopback module fixture; no campaign or original data routes.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'..');
const files={'/':'tools/rider-sandbox.html','/navigation.js':'navigation.js','/src/desert-worm.js':'src/desert-worm.js','/src/desert-riders.js':'src/desert-riders.js'};
http.createServer((req,res)=>{const file=files[req.url];if(!file){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':'text/javascript');res.setHeader('Cache-Control','no-store');res.end(fs.readFileSync(path.join(root,file)));}).listen(2140,'127.0.0.1',()=>console.log('Desert Rider fixture: http://127.0.0.1:2140/ (Ctrl+C stops)'));
