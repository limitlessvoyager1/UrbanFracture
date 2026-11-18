'use strict';const fs=require('fs'),crypto=require('crypto'),A=require('node:assert/strict'),spec=require('../../qa/system242/reina399-contract.json');
A.equal(spec.certified,false);A.equal(spec.costumePoses,725);A.equal(spec.maximumPosePixels,220);
for(const row of spec.assets){A.ok(fs.existsSync(row.path),'Missing selected production asset '+row.path);A.equal(crypto.createHash('sha256').update(fs.readFileSync(row.path)).digest('hex'),row.sha256,row.path);}
console.log(JSON.stringify({passed:true,selectedAssets:spec.assets.length,ownerArtApproval:false,certified:false}));
