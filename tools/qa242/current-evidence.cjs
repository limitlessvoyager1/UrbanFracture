'use strict';
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),Module=require('node:module'),A=require('node:assert/strict'),H=require('./history-contract.cjs'),C=require('./coverage.cjs');
function replaceOnce(source,needle,replacement){A.equal(source.split(needle).length,2,'Current-only source anchor changed: '+needle.slice(0,60));return source.replace(needle,replacement);}
function prepare(mode,source){
 if(mode==='nightshade'){
  const lines=source.split(/\r?\n/);A(lines[1].startsWith('function baseline(){'));A(lines[4].startsWith('const old=baseline();'));A(lines[5].startsWith('{const{N,g,p}=setup(old);'));
  const positive="ok(whiff(load(276)).queued,'fresh whiff tap executes only after original recovery');";A(lines[4].endsWith(positive));
  lines[1]='// Historical baseline loader retained in the original source, not executed in this current-only contract.';lines[4]=positive;lines[5]='// Three old-defect reproduction assertions remain unavailable; no replacement historical runtime.';
  return lines.join('\n').replace("'checkpoint failures, physical taps, inventory/strikes/shatter, recovery queue, native escape, mirrored running spin, three-second stun and grounded beatdown'","'CURRENT ONLY: physical taps, inventory/strikes/shatter, recovery queue, native escape, mirrored running spin, stun and beatdown; historical defect reproduction UNVERIFIED'");
 }
 if(mode==='diagnostics')return replaceOnce(source,"require('../tools/resolution342/preserved.cjs').verify('dist/game.js');","require('../tools/qa242/current-evidence.cjs').verifyCurrentGame();");
 if(mode==='energy'){
  let s=replaceOnce(source,'for(const baseline of[true,false])','for(const baseline of[false])');
  s=replaceOnce(s,"'reports316/energy-balance.json'","'reports242/current-energy-measurements.json'");
  s=replaceOnce(s,"'Baseline315 loads its complete actual4808adc Git snapshot, without grafting future modules.'","'CURRENT ONLY: no build315 runtime or historical comparison was executed.'");
  s=replaceOnce(s,'productionDamageUnchanged:true','historicalComparison:false,certified:false');
  return replaceOnce(s,"'PASS316 seeded energy comparisons'","'PASS current-only seeded energy measurements; no historical improvement/balance claim'");
 }
 throw Error('Unknown current-evidence mode');
}
function verifyCurrentGame(root=path.resolve(__dirname,'../..')){const h=H.load(root);A.equal(C.blob(fs.readFileSync(path.join(root,'dist/game.js'))),h.runtimeAnchor.gameBlob);return true;}
function validateEnergy(q){A.equal(q.historicalComparison,false);A.equal(q.certified,false);A.equal(q.results.length,9);A.deepEqual(q.results.map(r=>r.hero+'/'+r.enemy).sort(),['reina','niko','orion'].flatMap(hero=>['thug','enforcer','boss'].map(enemy=>hero+'/'+enemy)).sort());for(const r of q.results){A.equal(r.mode,'energy316');A.equal(r.seed,316);A(r.duration>0&&r.duration<=60.0001);A.equal(typeof r.completed,'boolean');A(Number.isFinite(r.heroHP)&&Number.isFinite(r.enemyHP));for(const key of ['specials','counters','dodges','blocks','secondsAtZero','generated','spent','pickups','damageTaken','hpOverflow','energyPerMinute','energySpentPerMinute'])A(Number.isFinite(r[key])&&r[key]>=0,key+' must be a finite current measurement');}return true;}
function main(){
 const root=path.resolve(__dirname,'../..'),mode=process.argv[2],h=H.load(root),m=h.mappings.find(q=>q.mode===mode);A(m,'Unknown current-only contract');
 console.log('CURRENT-ONLY EVIDENCE '+m.currentSuite+'; historical '+m.historicalSuite+' remains unavailable; game certification false');
 if(mode==='orion'){const env={...process.env};delete env.GITHUB_TOKEN;delete env.GH_TOKEN;const r=cp.spawnSync('python',['tools/qa242/orion-current-assets.py'],{cwd:root,env,encoding:'utf8'});process.stdout.write(r.stdout||'');process.stderr.write(r.stderr||'');if(r.error)throw r.error;process.exitCode=r.status??2;return;}
 const file=path.join(root,m.sourcePath),source=prepare(mode,fs.readFileSync(file,'utf8')),module=new Module(file);module.filename=file;module.paths=Module._nodeModulePaths(path.dirname(file));module._compile(source,file);
 if(mode==='energy')validateEnergy(JSON.parse(fs.readFileSync(path.join(root,'reports242/current-energy-measurements.json'))));
 console.log('PASS current contract '+h.id+' mode '+mode+'; historical comparison NOT PERFORMED; gameCertified=false');
}
module.exports={prepare,replaceOnce,verifyCurrentGame,validateEnergy};
if(require.main===module)main();
