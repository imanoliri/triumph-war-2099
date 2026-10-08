'use strict';
// Optional review exports only. The browser atlas and vector builder need no packages.
const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.argv[2]||'sharp');
(async()=>{const files=fs.readdirSync(__dirname).filter(f=>f.endsWith('.svg'));for(const name of files)await sharp(path.join(__dirname,name)).png().toFile(path.join(__dirname,name.replace('.svg','.png')));console.log(`Exported ${files.length} native-size PNGs from editable SVGs.`);})().catch(e=>{console.error(e);process.exitCode=1;});
