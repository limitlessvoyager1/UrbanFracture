// Retained contracts with final Chemical214/Security216 wrappers installed.
// Each child has a fixed RNG. Seed12 exercises a legitimate Director-denied
// Jesse case that previously produced an intermittent false freeze failure.
const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');
for(const[file,anchor]of[['flint211.cjs','const T=N.Flint211;'],['martial212.cjs','const M=N.Martial212;'],['jesse213.cjs','const J=N.Jesse213;']]){
  const abs=path.resolve('tests',file),inject="for(const f of['jesse213','chemical214','security216'])vm.runInContext(fs.readFileSync('dist/'+f+'.js','utf8'),sb);",code=fs.readFileSync(abs,'utf8').replace(anchor,inject+anchor);
  for(const seed of file==='jesse213.cjs'?[216,12]:[216]){
    const script=`let qaSeed216=${seed};Math.random=()=>((qaSeed216=Math.imul(qaSeed216,1664525)+1013904223>>>0)/4294967296);const Module=require('module');const m=new Module(${JSON.stringify(abs)});m.filename=${JSON.stringify(abs)};m.paths=Module._nodeModulePaths(${JSON.stringify(path.dirname(abs))});m._compile(${JSON.stringify(code)},m.filename);`,r=spawnSync(process.execPath,['-e',script],{encoding:'utf8',maxBuffer:8000000});
    console.log('Current216 fixture',file,'seed',seed);process.stdout.write(r.stdout);process.stderr.write(r.stderr);if(r.status)process.exit(r.status);
  }
}
console.log('PASS216 deterministic retained Flint, martial specialists, Jesse contracts with chemical wrappers active');
