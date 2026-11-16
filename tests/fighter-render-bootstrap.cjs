'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),{renderLoad}=require('../tools/fighter-render/load.cjs');
(async()=>{const r=await renderLoad(923),m=r.renderMetadata;A(m.ready&&m.combatPreserved);A.deepEqual(m.owners,require('../tools/fighter-render/prerequisites.cjs').manifest.drawOwners);A(m.images.length>100&&m.images.every(i=>i.status==='passed'&&i.width>0&&i.height>0));
for(const key of ['Style310','ReinaView312','ReinaView313','UniqueView311','EnemyView312','EnemyView313','ChargeView318','GuardView331','NovaView333','SlumsView337'])A(r.sb[key],'current renderer export '+key);
const draw=r.sb.PolishedSprites.draw,count=m.images.length;await r.ensureRenderModules(['style310.js','reina-view312.js','enemy-view313.js']);A.equal(r.sb.PolishedSprites.draw,draw,'compatibility loads do not replay fighter owners');A.equal(m.images.length,count,'no duplicate image requests');
fs.mkdirSync('reports-fighter-render',{recursive:true});fs.writeFileSync('reports-fighter-render/bootstrap.json',JSON.stringify(m,null,2)+'\n');
// A missing late asset must invalidate readiness and stay unavailable, never passed.
const image=new r.sb.Image();image.src='assets/__missing_fighter_render_regression__.png';await A.rejects(r.waitForRenderReady(),e=>e.renderStatus==='unavailable'&&e.exitCode===2&&e.images.some(i=>i.source.includes('__missing_fighter_render_regression__')));A.equal(m.ready,false);
console.log('PASS current fighter bootstrap: '+m.files.length+' modules, '+m.owners.length+' owners, '+count+' decoded requests; combat descriptors/data unchanged; missing asset unavailable');
})().catch(e=>{console.error(e);process.exitCode=e.exitCode||1;});
