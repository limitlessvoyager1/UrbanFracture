'use strict';
const fs=require('node:fs'),crypto=require('node:crypto'),A=require('node:assert/strict'),C=require('../../qa/system242/facade394-contract.json');
A.equal(C.certified,false);A.equal(C.worldJoin,5040);A.ok(C.worldStart<C.worldJoin&&C.worldStart+C.worldWidth>C.worldJoin);A.equal(C.signs.join('|'),'RIVERBLOOM FLORIST|SPIN CYCLE');A.match(C.sha256,/^[a-f0-9]{64}$/);A.ok(C.feather>0&&C.feather<C.worldWidth/2);
const exists=fs.existsSync(C.asset);if(exists)A.equal(crypto.createHash('sha256').update(fs.readFileSync(C.asset)).digest('hex'),C.sha256,'Reviewed facade asset must match its registration');
fs.mkdirSync('reports394',{recursive:true});const result={passed:true,scope:exists?'registered-asset-integrity':'registration-only',runtimeAssetPresent:exists,certified:false,manualPanReviewRequired:true,contract:C};fs.writeFileSync('reports394/facade-contract.json',JSON.stringify(result,null,2));console.log(JSON.stringify({passed:true,scope:result.scope,certified:false}));
