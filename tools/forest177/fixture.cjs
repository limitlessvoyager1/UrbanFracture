'use strict';
// Fixture-only module: current production simulation, isolated seeded RNG/clock.
// Deliberately imports no executable test entry and changes no native controllers.
const {load}=require('../qa242/runtime.cjs');
const runtime=load(177),{N,sb}=runtime,C=N.Companion126,T=N.GunnerTactics173,F=N.Forest177;
function setup(mode='balanced',hp=120){
  const g=new N.Brawler();g.selectHero('forest');g.startUptown(3);
  g.pending=[];g.props=[];g.items=[];g.enemies=[];
  g.ai=()=>{};g.reinforce=()=>{};g.reinforceFinancial=()=>{};
  g.encounters222Enabled=false;g.encounter222=null;
  Object.assign(g.player,{x:g.camera+400,prevX:g.camera+400,y:475,hp,inv:0,wakeInv:0,cd:0});
  N.Forest125.makeDog(g);g.gunner125.x=g.player.x-70;g.gunner125.y=475;
  T.setMode(g,mode);return{g,p:g.player,d:g.gunner125,s:T.init(g)};
}
function make(move,dir=1,hp=1000){
  const{g,p,d,s}=setup();p.dir=dir;p.x=p.prevX=g.camera+460;
  d.x=p.x-dir*85;d.y=p.y;
  // Native Grab223 ordinary reach is 66; legacy test's 75-unit setup predates it.
  const e=N.actor('thug',p.x+dir*55,p.y);Object.assign(e,{hp,maxHp:hp,cd:999,activeAt:0,inv:0,wakeInv:0,dir:['overhead','legs'].includes(move)?dir:-dir});g.enemies=[e];
  if(!g.acquireGrab(e,['overhead','legs'].includes(move)))throw Error('Forest fixture grab denied: '+move);
  if(!F.begin(g,move))throw Error('Forest fixture move denied: '+move);
  return{g,p,e,d,s,a:p.act};
}
function run(g,n,fps=120,input={}){for(let i=0;i<n;i++)g.tick(1/fps,input);}
module.exports={N,C,T,F,sb,setup,make,run,runtime};
