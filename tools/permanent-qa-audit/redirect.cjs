'use strict';
// Relocate only audit smoke output writes; original tests/assertions stay intact.
const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'../..'),original=path.join(root,'reports242'),target=path.join(root,'reports-permanent-qa-audit/smoke-output');
const map=p=>{if(typeof p!=='string')return p;const absolute=path.resolve(p);return absolute===original||absolute.startsWith(original+path.sep)?path.join(target,path.relative(original,absolute)):p;};
for(const method of ['mkdirSync','writeFileSync']){const fn=fs[method];fs[method]=function(p,...args){return fn.call(this,map(p),...args);};}
