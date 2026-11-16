'use strict';
// Historical byte receipts are evidence separate from executable combat assertions.
const fs=require('node:fs'),cp=require('node:child_process'),crypto=require('node:crypto');
const commit='3ecb645f0c84a4ea6117519a42f08de2bd001dda';
const files=['core.js','combat134.js','audit135.js','street209.js','enemies210.js','martial212.js','niko284.js','counters248.js','paired-motion.js'];
function normalize(file,source){return require('../plane304/approved.cjs').approved(file,require('../../tests/recording306-approved.cjs').approved(file,require('../slums337/approved.cjs').approved(file,source))).replace('nativeArmor302:!!$46,','');}
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function collect({run=cp.spawnSync,readFile=fs.readFileSync,approved=normalize,cwd=process.cwd()}={}){
 const refs=[commit,...files.map(file=>commit+':dist/'+file)];
 const command=(args,input)=>run('git',args,{cwd,input,timeout:10000,maxBuffer:16*1024*1024,windowsHide:true});
 function finish(rows){const counts={passed:0,failed:0,unavailable:0};for(const row of rows)counts[row.status]++;return{commit,status:counts.failed?'failed':counts.unavailable?'unavailable':'passed',counts,files:rows};}
 const all=(status,reason)=>finish(files.map(file=>({file,status,reason})));
 const probe=command(['cat-file','--batch-check'],refs.join('\n')+'\n');
 if(probe.error)return all(probe.error.code==='ENOENT'?'unavailable':'failed',probe.error.code==='ENOENT'?'Git executable unavailable':probe.error.message);
 if(probe.status!==0){const message=String(probe.stderr||'Git object query failed').trim();return all(probe.status===128&&/not a git repository/i.test(message)?'unavailable':'failed',message);}
 const lines=String(probe.stdout||'').trim().split(/\r?\n/);
 if(lines[0]===commit+' missing')return all('unavailable','Historical commit unavailable: '+commit);
 if(lines.length!==refs.length||!new RegExp('^'+commit+' commit \\d+$').test(lines[0]))return all('failed','Unexpected Git object query response');
 return finish(files.map((file,i)=>{
  const info=lines[i+1];if(info===refs[i+1]+' missing')return{file,status:'unavailable',reason:'Historical source blob unavailable: '+refs[i+1]};
  if(!/^[a-f0-9]{40,64} blob \d+$/.test(info))return{file,status:'failed',reason:'Unexpected historical source object: '+info};
  const result=command(['show',refs[i+1]]);
  if(result.error||result.status!==0)return{file,status:'failed',reason:result.error?.message||String(result.stderr||'Historical source read failed').trim()};
  try{const historical=Buffer.from(result.stdout),current=Buffer.from(approved(file,readFile('dist/'+file,'utf8'))),matched=historical.equals(current);return{file,status:matched?'passed':'failed',historicalSha256:hash(historical),normalizedCurrentSha256:hash(current),...(matched?{}:{reason:'Historical source bytes differ after approved adapters'})};}
  catch(error){return{file,status:'failed',reason:error.message};}
 }));
}
function write(report){fs.mkdirSync('reports298',{recursive:true});fs.writeFileSync('reports298/historical-receipts.json',JSON.stringify(report,null,2)+'\n');}
function exitCode(report){return report.status==='passed'?0:report.status==='unavailable'?2:1;}
module.exports={collect,write,exitCode,commit,files};
if(require.main===module){const report=collect();write(report);console.log('Historical reaction298 receipts: '+report.status.toUpperCase()+' '+JSON.stringify(report.counts));if(report.status!=='passed')console.log(report.files.filter(q=>q.status!=='passed').map(q=>q.file+': '+q.reason).join('\n'));process.exitCode=exitCode(report);}
