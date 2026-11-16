'use strict';
// Load an actual complete Git snapshot; never graft old adapters onto future modules.
const fs=require('node:fs'),cp=require('node:child_process'),A=require('node:assert/strict');
module.exports=function loadAt(ref,seed){A.match(ref,/^[a-f0-9]{40}$/);cp.execFileSync('git',['cat-file','-e',ref+'^{commit}']);const read=fs.readFileSync,cache=new Map();fs.readFileSync=function(file,...args){if(typeof file==='string'&&file.startsWith('dist/')){if(!cache.has(file))cache.set(file,cp.execFileSync('git',['show',ref+':'+file],{maxBuffer:16*1024*1024}));const b=cache.get(file);return typeof args[0]==='string'?b.toString(args[0]):b;}return read.call(this,file,...args);};try{return require('../qa242/runtime.cjs').load(seed);}finally{fs.readFileSync=read;}};
