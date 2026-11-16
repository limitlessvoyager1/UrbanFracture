'use strict';
const fs=require('node:fs'),path=require('node:path'),R=require('./receipts.cjs');
function run({suite,behavior,progress=()=>({}),collect=R.collect,write=R.write,log=console.log,save=report=>{const file=R.spec(suite).report;fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify(report,null,2)+'\n');}}){
 const infrastructure=[];let historical;try{historical=collect({suite});}catch(error){historical=R.failed(suite,error.message);}try{write(historical);}catch(error){infrastructure.push('Historical report write failed: '+error.message);}
 log(suite+' historical receipts: '+historical.status.toUpperCase()+' '+JSON.stringify(historical.counts));let data,behaviorError;
 try{data=behavior();}catch(error){behaviorError=error;try{data=progress();}catch(ex){data={};infrastructure.push('Failure progress unavailable: '+ex.message);}}
 const sourceProof=historical.status==='unavailable'?null:historical.status==='passed',report={...data,behavior:{status:behaviorError?'failed':'passed',...(behaviorError?{error:behaviorError.message}:{})},historicalReceipts:historical,sourceProof,[R.spec(suite).flag]:sourceProof,proofScope:'Historical equivalence of listed protected files after existing approved adapters; not full-game certification.',infrastructure};
 save(report);if(behaviorError)throw behaviorError;if(historical.status==='failed')throw Error(suite+' historical receipts FAILED; see '+path.dirname(R.spec(suite).report)+'/historical-receipts.json');if(infrastructure.length)throw Error(infrastructure.join('; '));if(historical.status==='unavailable')log('UNAVAILABLE: historical equivalence unverified; no missing receipt is claimed passed.');log('PASS '+suite+' behavioral '+data.checks);return report;
}
module.exports={run};
