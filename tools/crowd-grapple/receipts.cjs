'use strict';
// Provenance is independent of runtime assertions. Missing evidence never certifies historical equivalence.
const fs=require('node:fs'),cp=require('node:child_process'),path=require('node:path'),crypto=require('node:crypto'),specs=require('./spec.cjs');
const spec=suite=>{if(!specs[suite])throw Error('Unknown receipt suite: '+suite);return specs[suite];},hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function summarize(suite,files){const counts={passed:0,failed:0,unavailable:0};for(const file of files)counts[file.status]++;return{suite,commit:spec(suite).commit,status:counts.failed?'failed':counts.unavailable?'unavailable':'passed',counts,files};}
function all(suite,status,reason){return summarize(suite,spec(suite).files.map(file=>({file,status,reason})));}
const failed=(suite,reason)=>all(suite,'failed',reason),exitCode=r=>r.status==='passed'?0:r.status==='unavailable'?2:1;
function collect({suite,run=cp.spawnSync,readFile=fs.readFileSync,cwd=process.cwd(),git=process.env.UF_GIT||'git',normalize}={}){
 const s=spec(suite),refs=[s.commit,...s.files.map(file=>s.commit+':dist/'+file)],command=(args,input)=>run(git,args,{cwd,input,timeout:10000,maxBuffer:20*1024*1024,windowsHide:true});let query;
 try{query=command(['cat-file','--batch-check'],refs.join('\n')+'\n');}catch(error){return all(suite,error.code==='ENOENT'?'unavailable':'failed',error.code==='ENOENT'?'Git executable unavailable':error.message);}
 if(query.error)return all(suite,query.error.code==='ENOENT'?'unavailable':'failed',query.error.code==='ENOENT'?'Git executable unavailable':query.error.message||String(query.error.code));
 if(query.status!==0){const message=String(query.stderr||'Git object query failed').trim();return all(suite,query.status===128&&/not a git repository/i.test(message)?'unavailable':'failed',message);}
 const lines=String(query.stdout||'').trim().split(/\r?\n/);if(lines.length!==refs.length)return failed(suite,'Unexpected Git object query response length');
 if(lines[0]===s.commit+' missing'){if(lines.slice(1).some((line,i)=>line!==refs[i+1]+' missing'))return failed(suite,'Inconsistent missing-commit response');return all(suite,'unavailable','Historical commit unavailable: '+s.commit);}
 if(!new RegExp('^'+s.commit+' commit \\d+$').test(lines[0]))return failed(suite,'Unexpected historical commit object response');
 return summarize(suite,s.files.map((file,i)=>{const ref=refs[i+1],info=lines[i+1];if(info===ref+' missing')return{file,status:'unavailable',reason:'Historical source blob unavailable: '+ref};if(!/^[a-f0-9]{40,64} blob \d+$/.test(info))return{file,status:'failed',reason:'Unexpected historical object response: '+info};
  try{const result=command(['show',ref]);if(result.error||result.status!==0)return{file,status:'failed',reason:result.error?.message||String(result.stderr||'Historical source read failed').trim()};const historical=Buffer.from(result.stdout);if(historical.length!==Number(info.split(' ').at(-1)))throw Error('Historical blob length differs from object query');const current=String(readFile(path.join(cwd,'dist',file),'utf8')),normalized=Buffer.from((normalize||s.normalize)(file,current)),matched=historical.equals(normalized);return{file,status:matched?'passed':'failed',kind:'historical source bytes',historicalSha256:hash(historical),normalizedCurrentSha256:hash(normalized),...(matched?{}:{reason:'Historical source bytes differ after approved adapters'})};}catch(error){return{file,status:'failed',reason:error.message};}
 }));
}
function write(report){const dir=path.dirname(spec(report.suite).report);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'historical-receipts.json'),JSON.stringify(report,null,2)+'\n');}
module.exports={specs,spec,summarize,all,failed,collect,write,exitCode};
if(require.main===module){let code=0;for(const suite of process.argv[2]?[process.argv[2]]:Object.keys(specs)){const r=collect({suite});write(r);console.log(suite+' historical receipts: '+r.status.toUpperCase()+' '+JSON.stringify(r.counts));for(const f of r.files.filter(f=>f.status!=='passed'))console.log(f.file+': '+f.reason);const c=exitCode(r);code=c===1||code===1?1:Math.max(c,code);}process.exitCode=code;}
