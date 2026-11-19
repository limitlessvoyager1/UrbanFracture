'use strict';
const {test}=require('node:test'),A=require('node:assert/strict'),fs=require('node:fs');
const B=require('../tools/qa242/preservation435.cjs'),Old=require('../tools/qa242/preservation401.cjs'),C=require('../tools/qa242/coverage.cjs');
const disk=p=>fs.readFileSync(p),spec=B.record(),files=spec.sources.map(q=>q.path),mutate=(p,fn)=>q=>q===p?fn(disk(q)):disk(q);
test('exact221 Assignment2 modules delegate to intact220 QA401 contract',()=>{
  const result=B.verifyNative();A.equal(result.nativeModules,221);A.equal(result.priorBridgeVersion,401);A.equal(result.certified,false);
  A.equal(B.verifyNative({read:p=>Buffer.from(Old.lf(disk(p)).replaceAll('\n','\r\n')),files}).nativeModules,221);
});
test('435 rejects unknown, removed, duplicated and reordered modules and changed native bytes',()=>{
  for(const f of [[...files,'dist/unknown435.js'],files.slice(1),[...files,files[0]],[files[1],files[0],...files.slice(2)]])A.throws(()=>B.verifyNative({files:f}));
  for(const p of ['dist/core.js','dist/nova77.js','dist/showstopper435.js',...spec.inputs.map(q=>q.path)])A.throws(()=>B.verifyNative({files,read:mutate(p,b=>Buffer.concat([b,Buffer.from('\n')]))}));
  A.throws(()=>B.verifyNative({files,read:p=>{if(p==='dist/showstopper435.js')throw Error('missing');return disk(p);}}));
});
test('435 rejects changed bridge, old contracts and frozen receipts',()=>{
  const oldSpec=Old.record('native');
  for(const p of [B.recordPath,'qa/system242/repair-references/qa401/native-v1.json',oldSpec.frozen399.path,oldSpec.frozen396.path])A.throws(()=>B.verifyNative({files,read:mutate(p,b=>Buffer.concat([b,Buffer.from(' ')]))}));
  // The old authenticated pack is validated by the recovered-history suite, not replaced here.
});
test('both game entrypoints rewind only three exact Assignment2 lines; arbitrary edits fail',()=>{
  for(const row of spec.games){const game=disk(row.path),options={file:row.path};A.equal(C.blob(B.rewindShowstopper(game,options)),row.priorBlob);
    A.throws(()=>B.rewindShowstopper(Buffer.concat([game,Buffer.from('\n')]),options));
    for(const h of row.hunks){for(const text of [Old.lf(game).replace(h.after,h.before),Old.lf(game).replace(h.after,h.after+h.after),Old.lf(game).replace(h.after,h.after+' ')])A.throws(()=>B.rewindShowstopper(Buffer.from(text),options));}
  }
  A.throws(()=>B.rewindShowstopper(disk('dist/game.js'),{file:'dist/unknown.js'}));
});
test('costume chain reaches frozen diagnostics ledger and rejects altered ledger/contract',()=>{
  const game=disk('dist/game.js'),prior=B.rewindShowstopper(game);A.equal(C.blob(prior),Old.record('diagnostics').currentBlob);
  const bytes=B.rewindCostume(game);A.equal(C.blob(bytes),Old.record('diagnostics').priorBlob);
  const ledger=require('../qa/system242/recovered-history-v1/diagnostics-game-delta.json');A.equal(C.blob(require('../tools/qa242/diagnostics-history.cjs').rewind(bytes,ledger)),ledger.historicalBlob);
  for(const p of ['qa/system242/repair-references/qa401/diagnostics-v1.json',Old.record('diagnostics').priorLedger])A.throws(()=>B.rewindCostume(game,{read:mutate(p,b=>Buffer.concat([b,Buffer.from(' ')]))}));
});
