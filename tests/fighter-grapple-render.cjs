'use strict';
const fs=require('node:fs'),A=require('node:assert/strict'),C=require('../tools/fighter-render/cases.cjs'),{renderLoad}=require('../tools/fighter-render/load.cjs'),{hpReceipt}=require('../tools/fighter-render/receipts.cjs');
const group=process.argv[2];if(!['forest','niko','broxton','nightshade','shared'].includes(group))throw Error('Provide isolated group: forest/niko/broxton/nightshade/shared');
const reportFile='reports-fighter-render/node-'+group+'.json',sourceFingerprint=require('../tools/fighter-render/prerequisites.cjs').sourceFingerprint();fs.mkdirSync('reports-fighter-render',{recursive:true});fs.writeFileSync(reportFile,JSON.stringify({status:'running',rendered:false,sourceFingerprint}));
(async()=>{const{N,sb,createCanvas,renderMetadata}=await renderLoad(923),rows=[];let checks=0;const ok=(v,m)=>{checks++;A.ok(v,m)};
const out='reports-fighter-render/node-'+group;fs.mkdirSync(out,{recursive:true});
for(const spec of C.specifications(group)){
 const rng=C.seedMath(sb.Math,923);try{const q=C.fixture(N,spec);ok(q.a,'native action started');const frames=[];for(let tick=0;tick<=360;tick++){
  if(C.ticks.includes(tick)){const before=C.physical(q),frame=C.paint(N,sb.PolishedSprites,createCanvas,q,sb.ReviewView287);A.equal(C.physical(q),before,'render cannot change physical state, damage, clocks or gameplay events');checks++;ok(frame.bounds.count>1000,'visible connected pair/hero');if(!(frame.bounds.left>0&&frame.bounds.right<1599&&frame.bounds.top>0&&frame.bounds.bottom<899))fs.writeFileSync(out+'/bounds-failure.png',Buffer.from(frame.image.split(',')[1],'base64'));ok(frame.bounds.left>0&&frame.bounds.right<1599&&frame.bounds.top>0&&frame.bounds.bottom<899,'complete viewport bounds '+JSON.stringify({spec,tick,bounds:frame.bounds,state:frame.state}));
   if(q.e.flight?.nightshade329&&sb.ReviewView287.falls[q.e.type])ok(frame.state.throw?.phase==='independent flight','current final dispatcher uses available authored independent-flight poses');
   const name=[spec.move,spec.type||'thug',spec.dir,tick].join('_')+'.png';fs.writeFileSync(out+'/'+name,Buffer.from(frame.image.split(',')[1],'base64'));delete frame.image;frames.push({tick,file:out+'/'+name,...frame});
  }if(tick<360)q.g.tick(1/60,q.input);
 }if(spec.move!=='shield')ok(!q.p.act&&!q.p.hold&&!q.e.heldBy&&!q.e.flight,'finite completion');else ok(!q.p.hold&&!q.e.heldBy&&!N.Shield181.active(q.g),'native finite-duration shield escape completes');rows.push({spec,frames,final:{heroHP:q.p.hp,victimHP:q.e.hp,holding:!!q.p.hold}});global.gc?.();}finally{rng.restore();}
}
for(const row of rows){delete row.damage;Object.assign(row,hpReceipt(row.spec,{heroHP:row.frames[0].state.heroHP,opponentHP:row.frames[0].state.victimHP},{heroHP:row.final.heroHP,opponentHP:row.final.victimHP}));}
const report={group,status:'passed',sourceFingerprint,checks,receiptSchema:2,rendered:true,ready:renderMetadata.ready,modules:renderMetadata.files.length,owners:renderMetadata.owners.length,rows};fs.writeFileSync(reportFile,JSON.stringify(report,null,2)+'\n');console.log('PASS rendered '+group+': '+rows.length+' cases, '+checks+' checks');
})().catch(e=>{fs.mkdirSync('reports-fighter-render',{recursive:true});fs.writeFileSync(reportFile,JSON.stringify({status:e.renderStatus||'failed',rendered:false,sourceFingerprint,message:e.message},null,2));console.error(e);process.exitCode=e.exitCode||1;});
