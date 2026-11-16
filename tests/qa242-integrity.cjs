'use strict';
const {test}=require('node:test'),A=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const V=require('../tools/qa242/validators.cjs'),{fingerprint}=require('../tools/qa242/fingerprint.cjs');
test('unknown critical outcomes and duplicate receipts cannot certify a candidate',()=>{
 const visual={id:'approved-screenshots',status:'passed'};
 for(const status of ['unavailable','blocked','Pass','',null]) A.equal(V.gate([visual,{id:'combat',status,critical:true}]).status,'blocked',String(status));
 A.equal(V.gate([visual,{id:'combat',status:'passed'},{id:'combat',status:'passed'}]).status,'blocked');
 A.equal(V.gate([visual,{id:'combat',status:'not-executed'}]).status,'needs-review');
 A.equal(V.gate([visual,{id:'combat',status:'failed',critical:false}],{required:['combat']}).status,'blocked','required suite cannot demote its own failure');
});
test('helper, package and source membership changes invalidate evidence; installed caches do not',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'uf-qa-inputs-'));
 try{
  for(const d of ['dist','tools/qa242','tools/fighter-render','qa/system242','tests','reports383'])fs.mkdirSync(path.join(root,d),{recursive:true});
  const helper=path.join(root,'tools/fighter-render/load.cjs'),pkg=path.join(root,'reports383/package.json');
  fs.writeFileSync(helper,'baseline');fs.writeFileSync(pkg,'{}');const a=fingerprint(root);
  fs.writeFileSync(helper,'changed');const b=fingerprint(root);A.notEqual(a,b,'renderer helper must be fingerprinted');
  fs.writeFileSync(pkg,'{"excludedPresentationScripts":[]}');const c=fingerprint(root);A.notEqual(b,c,'render package policy must be fingerprinted');
  fs.mkdirSync(path.join(root,'tools/fighter-render/node_modules'),{recursive:true});fs.writeFileSync(path.join(root,'tools/fighter-render/node_modules/cache'),'cache');A.equal(c,fingerprint(root));
  fs.writeFileSync(path.join(root,'qa/new-feature.json'),'{}');const d=fingerprint(root);A.notEqual(c,d);fs.unlinkSync(helper);A.notEqual(d,fingerprint(root),'deleted input must invalidate evidence');
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
