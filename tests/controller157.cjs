const assert=require('node:assert/strict'),{Reader}=require('../dist/gamepad.js');
const pad=(index,id,mapping,buttons=[])=>({index,id,mapping,connected:true,axes:[0,0],buttons:Array.from({length:18},(_,i)=>({pressed:buttons.includes(i),value:buttons.includes(i)?1:0}))});
const p=buttons=>pad(0,'DualSense Wireless Controller','',buttons),v=buttons=>pad(1,'Xbox 360 Controller (DSX)','standard',buttons);
const r=new Reader();r.sample([p([]),v([])]);assert.equal(r.sample([p([]),v([2])]).index,1);
for(let i=0;i<20;i++){const s=r.sample([p(i%2?[0]:[]),v([])]);assert.equal(s.index,1);assert.equal(s.changed,false,'Physical echo must not steal an engaged virtual controller');}
assert.equal(r.sample([p([0]),null]).index,0,'Disconnected device falls back');
r.preferredIndex=1;assert.equal(r.sample([p([0]),v([])]).index,1,'Explicit selection wins');
const q=new Reader();q.profiles[p([]).id]={buttons:{attack:3,jump:0,pause:9},axes:{}};assert.equal(q.sample([p([3])]).layout,'custom');q.mode='sony';let s=q.sample([p([0])]);assert(s.held.attack);assert.notEqual(s.layout,'custom');q.mode='standard';s=q.sample([p([2])]);assert(s.held.attack);assert.notEqual(s.layout,'custom');
console.log('PASS157 physical/DSX echo stability, hotplug fallback, explicit device and layout override');
