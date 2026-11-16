'use strict';
// Isolate the complete reference renderer: holding two decoded atlases at once
// exceeds the QA host memory budget. Store losslessly compressed raw RGBA.
const fs=require('node:fs'),path=require('node:path'),z=require('node:zlib'),A=require('node:assert/strict');
(async()=>{const out=process.argv[2];A(out);fs.mkdirSync(out,{recursive:true});const r=await require('./source.cjs').load({baseline:true}),api=r.sb.__surfaceTest,cv=r.createCanvas(640,420),p=cv.getContext('2d'),rows=[];let i=0;
for(const type of ['thug','knifeThug','enforcer','biker','sato','akari','bouncer','cop','boss','flint','gangster','security'])for(const variant of ['idle','walk','stun','down','getup','dead','flash'])for(const dir of [-1,1])for(const scale of [1,1.1025]){
const f=Object.assign(r.N.actor(type,0,475),{hp:variant==='dead'?0:120,maxHp:120,dir,act:null,walk:variant==='walk'?1:0,walkPhase:.37,down:['down','getup','dead'].includes(variant)?2:0,downAge:variant==='getup'?2.7:.4,downTotal:3,stun:variant==='stun'?.2:0,flight:null,jump:0,hitFlash:variant==='flash'?.2:0,tactic:'rush'}),time=2.8166666666666615+i/60,before=JSON.stringify(f);api.cache.clear();p.setTransform(1,0,0,1,0,0);p.clearRect(0,0,640,420);p.translate(320,380);p.scale(dir*scale,scale);p.imageSmoothingEnabled=false;api.draw(p,{...f},time,scale);A.equal(JSON.stringify(f),before);const last=[...api.cache.values()].at(-1),crop=last?{x:last.x,y:last.y,width:last.image.width,height:last.image.height}:null;
fs.writeFileSync(path.join(out,i+'.rgba.deflate'),z.deflateSync(Buffer.from(p.getImageData(0,0,640,420).data)));rows.push({type,variant,dir,scale,time,crop});i++;}
fs.writeFileSync(path.join(out,'rows.json'),JSON.stringify(rows));console.log('REFERENCE '+i+' native lossless RGBA cases');
})().catch(e=>{console.error(e);process.exitCode=1;});
