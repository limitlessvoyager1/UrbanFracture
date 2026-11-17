'use strict';
const fs=require('node:fs'),vm=require('node:vm'),A=require('node:assert/strict');
const {createCanvas,Image}=require('./fighter-render/prerequisites.cjs').requireCanvas();
const {N,sb}=require('./qa242/runtime.cjs').load(388),B=N.SyndicateBackup365,g=new N.Brawler();g.selectHero('broxton');N.Practice282.setup(g,{id:'thug',scene284:'restaurant'});Object.assign(g.player,{cd:0,inv:0,wakeInv:0,defense:100});
sb.PolishedSprites={draw(){},ready:Promise.resolve()};sb.document={createElement(){return createCanvas(256,256);}};
sb.Image=class extends Image{set src(value){super.src=fs.readFileSync('dist/'+value);}};
vm.runInContext(fs.readFileSync('dist/backup-view365.js','utf8'),sb,{filename:'backup-view365.js'});
const sheet=createCanvas(760,624),ctx=sheet.getContext('2d'),s=B.state(g),rows=[],cases=[
 ['Available',()=>{}],['Cooling down',()=>{s.cooldown=45;}],['Responders dispatched',()=>{s.request={id:1,status:'awaiting-roster',pair370:['bruiser','gunner'],actors:[]};}],['Half of support time remaining',()=>{s.request={id:1,status:'active',deadline:g.time+10,actors:[{hp:50},{hp:30}]};}],['One responder defeated',()=>{s.request={id:1,status:'active',deadline:g.time+5,actors:[{hp:50},{hp:0}]};}],['All four responders recovering',()=>{for(const role of N.FriendlySupport370.availableRoles(g))s.injury376[role]=300;}]
];
ctx.fillStyle='#101925';ctx.fillRect(0,0,sheet.width,sheet.height);
for(const [i,[label,setup]]of cases.entries()){
 s.cooldown=0;s.retry=0;s.request=null;s.injury376={};setup();const cv=createCanvas(960,110),c=cv.getContext('2d');const result=sb.SyndicateBackupView365.statusHud(c,g);ctx.fillStyle='#d6e9ed';ctx.font='16px sans-serif';ctx.fillText(label,28,i*104+24);ctx.imageSmoothingEnabled=false;ctx.drawImage(cv,73,69,224,27,28,i*104+36,672,81);rows.push({label,...result});
}
A.equal(rows[0].lit,2);A.equal(rows[1].lit,0);A.equal(rows[3].fraction,.5);A.equal(rows[4].lit,1);A.equal(rows[5].mode,'recovering');
fs.mkdirSync('reports/phone-feedback',{recursive:true});fs.writeFileSync('reports/phone-feedback/hud-states.png',sheet.toBuffer('image/png'));fs.writeFileSync('reports/phone-feedback/render.json',JSON.stringify({passed:true,rows,scope:'Current status HUD Canvas2D function at native logical coordinates, enlarged 3x; not full browser/gameplay or hardware certification'},null,2));console.log('PASS phone-feedback HUD render: 6 native states');
