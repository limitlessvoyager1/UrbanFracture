'use strict';
// Author verification: clean repository-free copy and offline lockfile install.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),A=require('node:assert/strict'),P=require('./prerequisites.cjs');
const scratch=fs.mkdtempSync(path.resolve(P.root,'../fighter-render-isolation-')),rows=[];
function copy(file){const target=path.join(scratch,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(P.root,file),target);}
for(const file of ['dist/index.html',...P.indexScripts().map(f=>'dist/'+f),'tools/qa242/runtime.cjs',...['package.json','package-lock.json','manifest.json','prerequisites.cjs','load.cjs','cases.cjs'].map(f=>'tools/fighter-render/'+f)])copy(file);
const env={...process.env,NODE_PATH:'',NODE_OPTIONS:'',NODE_ENV:'development'};
function run(label,args,expectedExit,cwd=scratch){const r=cp.spawnSync(process.execPath,args,{cwd,env,encoding:'utf8',timeout:180000,maxBuffer:4*1024*1024,windowsHide:true});rows.push({label,exit:r.status,error:r.error?.message,stdout:r.stdout,stderr:r.stderr});A.equal(r.status,expectedExit,label+' '+r.stderr);return r;}
run('missing Canvas package is unavailable',['tools/fighter-render/prerequisites.cjs'],2);A.equal(JSON.parse(fs.readFileSync(path.join(scratch,'reports-fighter-render/prerequisites.json'))).canvas.status,'unavailable');
const npm=process.env.UF_NPM_CLI||path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');A(fs.existsSync(npm),'Provide UF_NPM_CLI for offline package-manager verification');
run('offline clean npm ci from pinned lockfile',[npm,'ci','--ignore-scripts','--include=dev','--offline','--no-audit','--no-fund','--cache',path.resolve(P.root,'../render-npm-cache')],0,path.join(scratch,'tools/fighter-render'));
run('installed Canvas and current manifest pass',['tools/fighter-render/prerequisites.cjs'],0);
run('missing artwork cannot become rendered success',['-e',"const fs=require('fs');require('./tools/fighter-render/load.cjs').renderLoad(923).then(()=>process.exitCode=1).catch(e=>{fs.writeFileSync('missing-assets.json',JSON.stringify({status:e.renderStatus,images:e.images?.length,exit:e.exitCode}));process.exitCode=e.exitCode||1;});"],2);
const missing=JSON.parse(fs.readFileSync(path.join(scratch,'missing-assets.json')));A.equal(missing.status,'unavailable');A(missing.images>0);A(!fs.existsSync(path.join(scratch,'.git')));
fs.mkdirSync('reports-fighter-render',{recursive:true});fs.writeFileSync('reports-fighter-render/portability.json',JSON.stringify({passed:true,scratch,noRepository:true,offlineInstall:true,missingArtwork:missing,rows},null,2)+'\n');console.log('PASS clean renderer prerequisites: package unavailable -> offline pinned install -> missing assets unavailable; no historical Git');
