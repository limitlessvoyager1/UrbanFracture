'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {renderLoad} = require('../qa242/reina389-render-runtime.cjs');

async function main() {
  const {N,sb,createCanvas} = await renderLoad(396,false,false,{
    publishedDowntown:true,nativeFlint394:true
  });
  const files = ['reina-uniform-data.js','reina-costume.js'];
  let authoredDraws = 0;
  sb.countUniformFrame = () => authoredDraws++;
  for (const file of files) {
    let source = fs.readFileSync('dist/'+file,'utf8');
    if (file === 'reina-costume.js') {
      source = source.replace('const [sheet,...art] = row;', 'root.countUniformFrame();const [sheet,...art] = row;');
      source = source.replace('if (blendFrames.has(frame.image)) return blendFrames.get(frame.image);',
        'if (blendFrames.has(frame.image)) {root.countUniformFrame();return blendFrames.get(frame.image);}');
    }
    vm.runInContext(source,sb,{filename:file});
  }
  const view = sb.ReinaCostume;
  assert.equal(await view.ready,true);
  if (!process.env.REINA_DRAFT) assert.ok(Object.keys(sb.ReinaUniformData.frames).length > 690);
  const canvas = createCanvas(440,350);
  const ctx = canvas.getContext('2d');
  const dir = {left:{left:true},right:{right:true}};
  const cases = [
    {name:'idle'},
    {name:'walk',input:dir.right},
    {name:'run',input:{...dir.right,run:true}},
    {name:'combo',press:['attack',{}],repeat:[18,40]},
    {name:'crouch sweep',press:['attack',{down:true}]},
    {name:'dodge',press:['dodge',{}]},
    {name:'blitz',prepare(g,p){p.blitzUntil=g.time+.3;p.blitzDir=1;},press:['attack',dir.right]},
    {name:'forward kick',jump:dir.right,press:['attack',dir.right]},
    {name:'neutral heel',jump:{},press:['attack',{}]},
    {name:'aerial dive',jump:{},press:['attack',{down:true}]},
    {name:'aerial wheel',jump:{},press:['special',{}]},
    {name:'ground sword',press:['special',{}]},
    {name:'dash sword',press:['special',dir.right]},
    {name:'sword draw and sheath',press:['unique',{}],sheath:66},
    {name:'sword stance walk',stance:true,input:dir.right},
    {name:'sword stance attack',stance:true,press:['attack',{}]},
    {name:'sword stance rise',stance:true,press:['attack',dir.right]},
    {name:'sword stance sweep',stance:true,press:['attack',dir.left]},
    {name:'front neutral grab',grab:'front',press:['attack',{}],repeat:[34,73,115]},
    {name:'hip throw',grab:'front',press:['attack',dir.left]},
    {name:'outer reap',grab:'front',press:['attack',dir.right]},
    {name:'German and kip',grab:'rear',press:['attack',dir.left]},
    {name:'rear hook',grab:'rear',press:['attack',dir.right]},
    {name:'short weapon',weapon:'knife',press:['attack',{}]},
    {name:'long weapon',weapon:'pipe',press:['attack',{}]},
    {name:'armed movement',weapon:'pipe',input:dir.right},
    {name:'counter special',counter:true,press:['special',{}]},
    {name:'stun',prepare(g,p){p.stun=.5;}},
    {name:'knockdown and get-up',prepare(g,p){g.knockDown(p,1,1.45,true);}},
    {name:'ground roll',prepare(g,p){g.knockDown(p,1,1.45,true);step(g,40);},press:['dodge',dir.right]}
  ];
  function step(g,frames) {
    for (let i=0;i<frames;i++) g.tick(1/60,{});
  }
  function fixture(spec,facing) {
    const g = new N.Brawler();
    g.selectHero('reina');
    N.Practice282.setup(g,{id:'thug',scene284:'restaurant'});
    g.ai = g.reinforce = g.reinforceFinancial = ()=>{};
    g.pending=[];g.props=[];g.items=[];g.encounters222Enabled=false;g.encounter222=null;
    const p=g.player,e=g.enemies[0];
    Object.assign(p,{x:380,y:475,dir:facing,inv:0,cd:0,defense:100,energy316:100});
    Object.assign(e,{x:420,y:475,hp:1000,maxHp:1000,dir:-facing,inv:0,cd:999,entering:false,activeAt:0});
    const orient = i => facing===1 ? i : {...i,left:i.right,right:i.left};
    e.x = p.x + facing * (spec.input ? 240 : 42);
    if (spec.weapon) p.heldWeapon248 = {
      kind:spec.weapon,category:spec.weapon==='knife'?'short':'long',uses:5
    };
    if (spec.grab) {
      e.dir = spec.grab==='rear' ? facing : -facing;
      assert.ok(g.acquireGrab(e,spec.grab==='rear',false,true),spec.name);
    }
    if (spec.counter) {
      e.x = p.x+70*facing;
      e.act = {name:'hook',t:.2,total:1,hitAt:.2,reach:100};
      g.command('counter',{});
      assert.ok(N.Counter248.capture(g,e,e.act));
      step(g,12);
    }
    if (spec.jump) { g.command('jump',orient(spec.jump)); step(g,8); }
    if (spec.stance) { g.command('unique',{}); step(g,65); }
    spec.prepare?.(g,p);
    if (spec.press) g.command(spec.press[0],orient(spec.press[1]));
    return {g,p,e,input:orient(spec.input || {})};
  }
  function gameplayState(g,p,e) {
    return [g.time,p.x,p.y,p.hp,p.defense,p.energy316,p.jump,p.act?.name,p.act?.t,p.act?.hitAt,e.hp,e.x,e.y,e.down];
  }
  function render(g,p,outfit) {
    ctx.resetTransform();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.translate(220,215);
    ctx.scale(p.dir,1);
    p.costume = outfit;
    view.scope(ctx,p,() => sb.PolishedSprites.draw(ctx,p,g.time,N.Forest125.scale(p)));
    return authoredDraws;
  }
  const results = [];
  for (const spec of cases) for (const facing of [-1,1]) {
    const {g,p,e,input} = fixture(spec,facing);
    let changed=0, visible=0;
    const unchanged=[];
    for (let tick=0;tick<135;tick++) {
      if (spec.repeat?.includes(tick)) g.command('attack',{});
      if (spec.sheath===tick) g.command('unique',{});
      if (tick%3===0) {
        const before = gameplayState(g,p,e);
        authoredDraws = 0;
        const original = render(g,p,'default');
        assert.equal(original,0,'the default costume never installs alternate art');
        const alternate = render(g,p,'royal-uniform');
        assert.deepEqual(gameplayState(g,p,e),before,spec.name+' rendering is presentation-only');
        visible++;
        if (alternate) {
          changed++;
          if (tick===0) {
            const {data}=ctx.getImageData(0,0,canvas.width,canvas.height);
            assert.ok(data.some((value,index)=>index%4===3&&value>80),spec.name+' renders visible art');
          }
        }
        else unchanged.push({tick,pose:p.render383?.state,frame:p.render383?.frame,action:p.act?.name});
      }
      g.tick(1/60,input);
    }
    results.push({name:spec.name,facing,visible,changed,unchanged});
  }
  const missing = results.flatMap(x=>x.unchanged);
  const portraitCalls = [];
  const portraitContext = {drawImage(image) { portraitCalls.push(image.src); }};
  assert.equal(view.portrait(portraitContext,{type:'reina'},0,0,44),false);
  assert.equal(view.portrait(portraitContext,{type:'reina',costume:'royal-uniform'},0,0,44),true);
  assert.deepEqual(portraitCalls,['assets/reina399/royal-portrait.webp']);
  fs.writeFileSync(process.argv[2]||'/tmp/reina-uniform-results.json',JSON.stringify(results,null,2)+'\n');
  console.log(results.length,'native playbacks,',results.reduce((n,q)=>n+q.changed,0),'alternate render samples,',missing.length,'unmatched samples');
  if (!process.env.REINA_DRAFT) assert.equal(missing.length,0,'All visible sampled frames must render costume art');
}

const keep=setInterval(()=>{},1000);
main().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>clearInterval(keep));
