'use strict';const fs=require('fs'),crypto=require('crypto'),A=require('node:assert/strict'),{load}=require('../tools/qa242/runtime.cjs');
const name=fs.existsSync('dist/feastfleet-economy396.js')?'native-site-before.json':'native-github-before.json';
const spec=JSON.parse(fs.readFileSync('qa/system242/repair-references/reina399/'+name));
const native=load(399);A.deepEqual(native.files.map(p=>'dist/'+p),spec.sources.map(x=>x.path));
for(const row of spec.sources){const text=fs.readFileSync(row.path,'utf8').replaceAll('\r\n','\n');A.equal(crypto.createHash('sha256').update(text).digest('hex'),row.sha256LF,'Unchanged approved native source '+row.path);}
console.log(JSON.stringify({passed:true,nativeModules:spec.sources.length,base:spec.base,sourceCodeUnchanged:true,physicalController:false,certified:false}));
