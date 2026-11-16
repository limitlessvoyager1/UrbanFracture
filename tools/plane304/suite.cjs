'use strict';
const fs=require('node:fs'),R=require('./receipts.cjs');
function run({suite,behavior,progress=()=>({}),collect=R.collect,write=R.write,log=console.log,save=report=>{fs.mkdirSync('reports304',{recursive:true});fs.writeFileSync('reports304/'+(suite==='collision'?'runtime':'height')+'-validation.json',JSON.stringify(report,null,2)+'\n');}}){
 let historical;try{historical=collect({suite});}catch(error){historical=R.failed(suite,error.message);}write(historical);log(suite+' historical receipts: '+historical.status.toUpperCase()+' '+JSON.stringify(historical.counts));let data,error;
 try{data=behavior();}catch(e){error=e;data=progress();}
 const sourceProof=historical.status==='unavailable'?null:historical.status==='passed',report={...data,behavior:{status:error?'failed':'passed',...(error?{error:error.message}:{})},historicalReceipts:historical,sourceProof,...(suite==='height'?{rendererPhysicsUnchanged:sourceProof,portableRendererContractVerified:!error}:{} )};save(report);
 if(error)throw error;if(historical.status==='failed')throw Error(suite+' historical receipts FAILED; see reports304/historical-'+suite+'-receipts.json');if(historical.status==='unavailable')log('UNAVAILABLE: historical equivalence unverified; no missing receipt is claimed passed.');log('PASS304 '+suite+' behavioral '+data.checks);return report;
}
module.exports={run};
