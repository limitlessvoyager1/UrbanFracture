'use strict';
// Retain the original240-fixture test; redirect only its legacy root report output.
const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'../..'),write=fs.writeFileSync,legacy=path.join(root,'DIRECTOR148-results.json');
fs.writeFileSync=function(file,...args){if(typeof file==='string'&&path.resolve(file)===legacy){const target=path.join(root,'reports438/director148-regression.json');fs.mkdirSync(path.dirname(target),{recursive:true});return write.call(this,target,...args);}return write.call(this,file,...args);};
try{require('../../tests/director148-stress.cjs');}finally{fs.writeFileSync=write;}
