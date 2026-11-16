const assert=require('node:assert/strict');
const {Brawler,actor}=require('../dist/core.js');
for(const f of ['financial','broxton','paired-motion','counters','encounters','balance48','balance49','broxton-counters51','broxton-shuffle52','open-cue62','weather67','club76','nova77'])require('../dist/'+f+'.js');
function setup(x=320){const g=new Brawler();g.selectHero('nova');g.playing=true;g.pending=[];g.enemies=[];const p=g.player;p.x=250;p.y=455;p.dir=1;const e=actor('thug',x,455);e.cd=100;g.enemies=[e];return {g,p,e};}
for(const [rear,input,name,side] of [[false,{right:true},'novaDDT',1],[false,{left:true},'novaBelly',-1],[true,{right:true},'novaFace',1],[true,{left:true},'novaFranken',1]]){const {g,p,e}=setup(282);assert(g.acquireGrab(e,rear));g.holdAction('attack',input);assert.equal(p.act.name,name);for(let i=0;i<80;i++)g.tick(.02,{});assert(!p.hold&&e.down>0&&e.hp<60);assert.equal(e.y,p.y);assert(Math.sign(e.x-250)===side);}
{const {g,p,e}=setup();g.start(p,'blitzKick',.82,.18,{});let carried=false;for(let i=0;i<50;i++){g.tick(.02,{});if(p.act?.name==='novaBlitz'&&p.act.t>.50&&p.act.t<.94){assert((e.x-p.x)*p.dir>0);carried=true;}}assert(carried);assert(e.hp<60);assert(e.down>0);assert.equal(p.jump,0);assert.equal(p.grappleZ,0);}
{const {g,p}=setup(500);const x=p.x;g.command('dodge',{});assert.equal(p.act.name,'dodge');for(let i=0;i<18;i++)g.tick(.02,{});assert(p.x>x);assert.equal(p.defense<100,true);}
console.log('PASS Nova throws stay paired and land on the same lane, blitz carries and knocks down, and dodge moves');
{const {g,p}=setup();p.grappleZ=55;p.grappleAngle=1;p.grapplePivot=20;g.knockDown(p,1,1.65);assert.equal(p.grappleZ,0);assert.equal(p.grappleAngle,0);for(let i=0;i<90;i++)g.tick(.02,{});assert.equal(p.down,0);assert.equal(p.grappleZ,0);}
