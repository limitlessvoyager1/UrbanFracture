'use strict';
const fs=require('node:fs'),path=require('node:path'),{validate}=require('./schema.cjs'),{planChange,relative}=require('./impact.cjs');
function inspect(root=path.resolve(__dirname,'../..')){
 const read=p=>JSON.parse(fs.readFileSync(path.join(root,p))),registry=read('qa/system242/features.json'),catalog=read('qa/system242/suites.json'),errors=validate(registry,read('qa/system242/features.schema.json'));
 for(const f of registry.features){for(const p of f.sources)if(!p.endsWith('/**')&&!fs.existsSync(path.join(root,p)))errors.push('Missing registered source '+p);for(const p of f.specs)if(!relative(p)||!fs.existsSync(path.join(root,p)))errors.push('Missing specification '+p);}
 const empty={id:'registry-validation',files:[],entities:{characters:[],moves:[],systems:[],levels:[]},features:[],newContent:[],risks:{majorIntegration:false,visual:false,performance:false,physicalController:false},issues:[]};
 errors.push(...planChange({registry,catalog,declaration:empty,changes:[],baseCommit:'0'.repeat(40),testedCommit:'1'.repeat(40)}).problems);
 for(const s of catalog.suites){if(!/^[A-Za-z0-9-]+$/.test(s.id)||!Array.isArray(s.command)||s.command.length<2)errors.push('Invalid suite '+s.id);for(const p of s.command.slice(1).filter(p=>/^(tests|tools)\//.test(p)))if(!relative(p)||!fs.existsSync(path.join(root,p)))errors.push('Missing suite entry '+p);}
 if(new Set(catalog.suites.map(s=>s.id)).size!==catalog.suites.length)errors.push('Duplicate suite ID');
 return{status:errors.length?'blocked':'passed',coverage:registry.coverage,features:registry.features.length,suites:catalog.suites.length,errors};
}
if(require.main===module){try{const r=inspect();console.log(JSON.stringify(r,null,2));process.exitCode=r.errors.length?1:0;}catch(e){console.error(e.stack);process.exitCode=1;}}
module.exports={inspect};
