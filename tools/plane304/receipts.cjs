'use strict';
// Missing historical evidence never certifies source equivalence; available mismatches/errors fail closed.
const fs=require('node:fs'),cp=require('node:child_process'),crypto=require('node:crypto'),path=require('node:path');
const commit='2d8f4e3b154d769bac2ced871f66832563528b2d',files=['game.js','core.js','director148.js','combat134.js','audit135.js','combat274.js','street209.js','enemies210.js','martial212.js','niko185.js','weapons248.js','workers233.js','counters248.js','reactions298.js','grapples301.js','contact302.js','crowd303.js'];
const names=suite=>suite==='collision'?files:suite==='height'?['game.js']:(()=>{throw Error('Unknown receipt suite: '+suite);})(),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function summarize(suite,rows){const counts={passed:0,failed:0,unavailable:0};for(const r of rows)counts[r.status]++;return{suite,commit,status:counts.failed?'failed':counts.unavailable?'unavailable':'passed',counts,files:rows};}
function failed(suite,message){return summarize(suite,names(suite).map(file=>({file,status:'failed',reason:message})));}
function collect({suite='collision',run=cp.spawnSync,readFile=fs.readFileSync,cwd=process.cwd(),git=process.env.UF_GIT||'git',approved,validateHeight}={}){
 const selected=names(suite),refs=[commit,...selected.map(file=>commit+':dist/'+file)],all=(status,reason)=>summarize(suite,selected.map(file=>({file,status,reason}))),command=(args,input)=>run(git,args,{cwd,input,timeout:10000,maxBuffer:20*1024*1024,windowsHide:true});let probe;
 try{probe=command(['cat-file','--batch-check'],refs.join('\n')+'\n');}catch(error){return all('failed',error.message);}
 if(probe.error)return all(probe.error.code==='ENOENT'?'unavailable':'failed',probe.error.code==='ENOENT'?'Git executable unavailable':probe.error.message||String(probe.error.code));
 if(probe.status!==0){const message=String(probe.stderr||'Git object query failed').trim();return all(probe.status===128&&/not a git repository/i.test(message)?'unavailable':'failed',message);}
 const lines=String(probe.stdout||'').trim().split(/\r?\n/);if(lines[0]===commit+' missing')return all('unavailable','Historical commit unavailable: '+commit);
 if(lines.length!==refs.length||!new RegExp('^'+commit+' commit \\d+$').test(lines[0]))return all('failed','Unexpected Git object query response');
 return summarize(suite,selected.map((file,i)=>{const info=lines[i+1],ref=refs[i+1];if(info===ref+' missing')return{file,status:'unavailable',reason:'Historical source blob unavailable: '+ref};if(!/^[a-f0-9]{40,64} blob \d+$/.test(info))return{file,status:'failed',reason:'Unexpected historical object: '+info};
  try{const result=command(['show',ref]);if(result.error||result.status!==0)return{file,status:'failed',reason:result.error?.message||String(result.stderr||'Historical source read failed').trim()};const historical=Buffer.from(result.stdout),current=readFile(path.join(cwd,'dist',file),'utf8');
   if(suite==='height'){const check=(validateHeight||require('./height-proof.cjs').validate)(historical.toString('utf8'),String(current));return{file,status:'passed',kind:'historical renderer-height behavior',checks:check.checks,historicalSha256:hash(historical),currentSourceSha256:hash(current)};}
   const normalized=Buffer.from((approved||require('./approved.cjs').approved)(file,String(current))),matched=historical.equals(normalized);return{file,status:matched?'passed':'failed',kind:'historical source bytes',historicalSha256:hash(historical),normalizedCurrentSha256:hash(normalized),...(matched?{}:{reason:'Historical source bytes differ after approved adapters'})};
  }catch(error){return{file,status:'failed',reason:error.message};}
 }));
}
function write(report){fs.mkdirSync('reports304',{recursive:true});fs.writeFileSync('reports304/historical-'+report.suite+'-receipts.json',JSON.stringify(report,null,2)+'\n');}
const exitCode=report=>report.status==='passed'?0:report.status==='unavailable'?2:1;
module.exports={collect,write,exitCode,commit,files,names,summarize,failed};
if(require.main===module){const suite=process.argv[2],groups=suite?[suite]:['collision','height'];let code=0;for(const group of groups){const r=collect({suite:group});write(r);console.log(group+' historical receipts: '+r.status.toUpperCase()+' '+JSON.stringify(r.counts));for(const f of r.files.filter(f=>f.status!=='passed'))console.log(f.file+': '+f.reason);const c=exitCode(r);code=c===1||code===1?1:Math.max(c,code);}process.exitCode=code;}
