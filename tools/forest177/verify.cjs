'use strict';
// Repeatable scoped verification. Fault injection changes read buffers in child processes only.
const fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
const root=path.resolve(__dirname,'../..'),reportDir=path.join(root,'reports-forest177-current');
fs.mkdirSync(reportDir,{recursive:true});
// Guard331 writes its existing report after assertions; supply its output directory.
fs.mkdirSync(path.join(root,'reports331'),{recursive:true});const rows=[];
const allSuites=['forest177','forest-protection177','forest-balance177','forest-fixture177','grapples301','crowd303','direct-start-director-admission','ai-decision-reasons','hitstun-eligibility','knockdown-admission','reaction-deadline-metadata','reactions298','combat274','plane304','energy316','counters248','guard331','counter331-input','controls260-input','gamepad.test','controller-recovery.test','forest-controller125.test','forest-counter-controller127.test','grab223-recovery'];
const requested=process.argv.slice(2),suites=requested.length?allSuites.filter(s=>requested.includes(s)):allSuites;
for(const name of requested)if(name!=='--negative'&&!allSuites.includes(name))throw Error('Unknown suite '+name);
async function execute(label,args,expectedExit=0,expectedText,env={}){
 const start=Date.now();const row=await new Promise(resolve=>{const p=spawn(process.execPath,args,{cwd:root,windowsHide:true,env:{...process.env,...env}});let stdout='',stderr='',error=null;const timer=setTimeout(()=>{error='180s timeout';p.kill();},180000);p.stdout.on('data',d=>stdout+=d);p.stderr.on('data',d=>stderr+=d);p.on('error',e=>error=e.message);p.on('close',(exit,signal)=>{clearTimeout(timer);resolve({label,args,exit,signal,error,stdout,stderr,elapsedMs:Date.now()-start,expectedExit,expectedText});});});
 row.passed=!row.error&&row.exit===expectedExit&&(!expectedText||(row.stdout+row.stderr).includes(expectedText));rows.push(row);fs.writeFileSync(path.join(reportDir,'tests.json'),JSON.stringify({rows,summary:{total:rows.length,passed:rows.filter(r=>r.passed).length,failed:rows.filter(r=>!r.passed).length},visual:'Not executed; rendering repair remains separate',historical:'Missing historical receipts remain unavailable; behavioral pass is not historical certification'},null,2)+'\n');console.log((row.passed?'PASS ':'FAIL ')+label+' exit='+row.exit);return row;
}
async function main(){
 let next=0;await Promise.all([0,1].map(async()=>{while(next<suites.length){const suite=suites[next++];await execute(suite,['tests/'+suite+'.cjs']);}}));
 const mutations=[
  ['fixture imports executable test','tools/forest177/fixture.cjs',"const runtime=load(177)","require('../../tests/gunner173.cjs');const runtime=load(177)",'forest-fixture177','Executable test imported'],
  ['strike adds one damage','dist/forest-grapples177.js','F.hit(g,a,a.victim,amount,false','F.hit(g,a,a.victim,amount+1,false','forest177','budget'],
  ['action adds one frame','dist/forest-grapples177.js','(d.mandatory+d.recovery)/60','(d.mandatory+d.recovery+1)/60','forest-fixture177','native action duration']
 ];
 if(!requested.length||requested.includes('--negative'))for(const[label,file,before,after,suite,text]of mutations){
  const source=fs.readFileSync(path.join(root,file),'utf8');if(source.split(before).length!==2)throw Error('Mutation target must be unique: '+label);
  const inject=`const fs=require('node:fs'),path=require('node:path'),read=fs.readFileSync;fs.readFileSync=function(file,...args){const value=read.call(this,file,...args);if(path.resolve(String(file))===${JSON.stringify(path.join(root,file))}){const changed=value.toString('utf8').replace(${JSON.stringify(before)},${JSON.stringify(after)});return Buffer.isBuffer(value)?Buffer.from(changed):changed;}return value;};`;
  // NODE_OPTIONS carries injection into the import-isolation subprocess too.
  const preload=path.join(reportDir,'fault-injection.cjs');fs.writeFileSync(preload,inject);
  try{await execute('negative: '+label,['tests/'+suite+'.cjs'],1,text,{NODE_OPTIONS:(process.env.NODE_OPTIONS||'')+' --require '+JSON.stringify(preload)});}finally{fs.unlinkSync(preload);}
 }
 if(rows.some(r=>!r.passed))process.exitCode=1;
}
main().catch(error=>{console.error(error);process.exitCode=1;});
