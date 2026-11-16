'use strict';
// Preserve all retained assertions except the explicitly superseded controller entry.
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),C=require('./coverage.cjs');
function prepare(source,index){
 const file='tests/current150.cjs',pinned=index.entries.find(q=>q.path===file);
 if(!pinned||C.blob(Buffer.from(source))!==pinned.sha)throw Error('Retained current150 differs from pinned source');
 const anchor="'controller144.cjs'",replacement="'qa242-controller-charge.cjs'";
 if(source.split(anchor).length!==3)throw Error('Expected exactly two controller144 anchors');
 // Replace only the child-list entry; the loader predicate remains unchanged so
 // the new fixture owns its explicit production simulation boundary.
 const list="['controller144.cjs','reina-repair147.cjs'";
 if(source.split(list).length!==2)throw Error('Retained current150 child-list anchor changed');
 return source.replace(list,'['+replacement+",'reina-repair147.cjs'");
}
function main(){
 const root=path.resolve(__dirname,'../..'),file=path.join(root,'tests/current150.cjs');
 const source=prepare(fs.readFileSync(file,'utf8'),require('../../qa/system242/coverage-source-index.json'));
 console.log('QA242 current150: controller144 historical 2s contract replaced by explicit build318 current controller assertions; all other children retained');
 const m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));m._compile(source,file);
}
if(require.main===module)main();
module.exports={prepare};
