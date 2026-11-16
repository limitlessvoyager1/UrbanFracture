'use strict';
// Evaluate authored metadata in a DOM-free sandbox, including dictionary-packed327 data.
const fs=require('node:fs'),vm=require('node:vm'),cp=require('node:child_process');
function data(file,expression,ref){const source=ref?cp.execFileSync('git',['show',ref+':'+file],{encoding:'utf8',maxBuffer:16*1024*1024}):fs.readFileSync(file,'utf8'),s={};s.window=s;s.globalThis=s;vm.createContext(s);vm.runInContext(source,s,{filename:file,timeout:3000});return JSON.parse(JSON.stringify(vm.runInContext(expression,s,{timeout:3000})));}
module.exports=data;if(require.main===module)process.stdout.write(JSON.stringify(data(...process.argv.slice(2))));
