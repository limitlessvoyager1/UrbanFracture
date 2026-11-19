'use strict';
// Exact Assignment 2 adapter. QA401 contracts and frozen evidence stay unchanged.
const fs=require('node:fs'),path=require('node:path'),A=require('node:assert/strict');
const B=require('./preservation401.cjs'),C=require('./coverage.cjs');
const root=path.resolve(__dirname,'../..'),recordPath='qa/system242/repair-references/nova435/preservation-v1.json';
const recordSHA256='c3349d2c7810ef3e1c10b21a141c95692477ab7c8a24dc0a617f9cecc7565a2c';
const disk=p=>fs.readFileSync(path.join(root,p));
function record(read=disk){const bytes=B.lf(read(recordPath));A.equal(B.hash(bytes),recordSHA256,'Assignment 2 bridge record changed');return JSON.parse(bytes);}
function rewindShowstopper(bytes,{file='dist/game.js',read=disk}={}){
  const spec=record(read),row=spec.games.find(q=>q.path===file);A.ok(row,'Unregistered game input');
  let text=B.lf(bytes);A.equal(C.blob(Buffer.from(text)),row.currentBlob,'Game outside exact Assignment 2 bridge');
  A.equal(row.hunks.length,3);
  for(const h of row.hunks){A.ok(h.after.length&&h.before.length);A.equal(text.split(h.after).length,2,'Ambiguous/missing Assignment 2 hunk');text=text.replace(h.after,()=>h.before);}
  A.equal(C.blob(Buffer.from(text)),row.priorBlob,'Assignment 2 rewind must reach exact prior game');return Buffer.from(text);
}
function priorRead(read=disk){return p=>p==='dist/game.js'||p==='dist/game360.js'?rewindShowstopper(read(p),{file:p,read}):read(p);}
function verifyNative({read=disk,files}={}){
  const spec=record(read);A.equal(spec.schema,435);A.equal(spec.sourceCommit,'c51c9eccc1c0b0f6baccb947b8474b77925ead04');
  const expected=spec.sources.map(q=>q.path);A.equal(new Set(expected).size,221);A.deepEqual(spec.added,['dist/showstopper435.js']);
  files??=require('./runtime.cjs').load(435).files.map(p=>'dist/'+p);A.deepEqual(files,expected,'Native module order/membership differs from exact435 bridge');
  for(const q of [...spec.sources,...spec.inputs])A.equal(B.hash(B.lf(read(q.path))),q.sha256LF,'Source outside exact Assignment 2 bridge: '+q.path);
  for(const q of spec.games)rewindShowstopper(read(q.path),{file:q.path,read});
  const priorFiles=files.filter(p=>p!=='dist/showstopper435.js');
  const prior=B.verifyNative({read:priorRead(read),files:priorFiles});
  return{...prior,bridgeVersion:435,priorBridgeVersion:401,nativeModules:files.length,sourceCommit:spec.sourceCommit,assignment2Added:spec.added,originalIdentity:false,certified:false};
}
function rewindCostume(bytes,{read=disk}={}){return B.rewindCostume(rewindShowstopper(bytes,{read}),{read:priorRead(read)});}
module.exports={record,recordPath,recordSHA256,priorRead,rewindShowstopper,rewindCostume,verifyNative};
