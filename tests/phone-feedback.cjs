'use strict';
const A=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{load}=require('../tools/qa242/runtime.cjs');
const {N,sb,randomState}=load(388),B=N.SyndicateBackup365;let checks=0;function ok(v,m){A.ok(v,m);checks++;}
function fixture(){const g=new N.Brawler();g.selectHero('broxton');N.Practice282.setup(g,{id:'thug',scene284:'restaurant'});g.ai=g.reinforce=g.reinforceFinancial=()=>{};g.enemies=[];g.pending=[];g.props=[];g.items=[];g.encounters222Enabled=false;Object.assign(g.player,{cd:0,inv:0,wakeInv:0,defense:100,x:400,y:475});return g;}
function advance(g,seconds,hz=60,input={}){for(let i=0;i<Math.ceil(seconds*hz);i++)g.tick(1/hz,input);}
for(const hz of [30,60,120]){
 const g=fixture(),s=B.state(g);s.cooldown=50;const p=g.player,before={hp:p.hp,energy:p.defense,cooldown:s.cooldown,retry:s.retry};
 ok(!g.command('unique',{unique:true}),'cooldown rejects R2 at '+hz);ok(!p.act&&!s.request,'no call animation or responders');
 A.deepEqual({hp:p.hp,energy:p.defense,cooldown:s.cooldown,retry:s.retry},before);checks++;
 ok(s.events.filter(e=>e.type==='ring'&&e.operator365).length===1,'short operator ring');advance(g,.3,hz,{unique:true});
 const first=s.events.find(e=>e.type==='subtitle'&&e.operator365);ok(first?.speaker==='OPERATOR'&&first.callVoice365,'operator subtitle and voice after ring');
 for(let i=0;i<12;i++)g.command('unique',{unique:true});ok(s.dialogueQueue.length===0,'held R2 does not repeat feedback');
 advance(g,4,hz,{});ok(!g.command('unique',{unique:true}),'second unavailable call');advance(g,.3,hz,{unique:true});
 const messages=s.events.filter(e=>e.type==='subtitle'&&e.operator365);ok(messages.length===2&&messages[0].text!==messages[1].text,'fresh presses use nonrepeating operator lines');
 ok(!s.request&&p.defense===100&&p.hp===before.hp,'feedback never spends resources or summons');
}
for(const mode of ['retry','energy','recovering','restricted']){const g=fixture(),s=B.state(g);if(mode==='retry')s.retry=3;if(mode==='energy')g.player.defense=29;if(mode==='recovering')for(const role of N.FriendlySupport370.roles)s.injury376[role]=300;if(mode==='restricted')g.playing=false;const snap=B.save(g);ok(!g.command('unique',{unique:true}),mode+' rejects');ok(!g.player.act&&!s.request,mode+' cannot animate or summon');if(mode==='restricted')ok(!s.dialogueQueue.length,'no operator while game is stopped');else ok(s.dialogueQueue.some(q=>q.operator365),mode+' has operator feedback');ok(B.save(g).cooldown===snap.cooldown&&B.save(g).retry===snap.retry,mode+' timers unchanged on press');}
{
 const g=fixture(),s=B.state(g);ok(B.feedback(g).mode==='ready'&&B.feedback(g).lit===2,'two available silhouettes');
 const rng=randomState(),save=JSON.stringify(B.save(g));for(let i=0;i<100;i++)B.feedback(g);ok(randomState()===rng&&JSON.stringify(B.save(g))===save,'HUD does not advance RNG, resources or timers');
 s.cooldown=45;ok(B.feedback(g).mode==='cooldown'&&B.feedback(g).lit===0,'cooldown silhouettes dim');
 const a={hp:50},b={hp:30};s.request={id:1,status:'active',deadline:g.time+20,actors:[a,b]};ok(B.feedback(g).lit===2&&B.feedback(g).fraction===1,'active pair and full duration');g.time+=10;ok(B.feedback(g).fraction===.5&&B.feedback(g).seconds===10,'duration shrinks from common native deadline');b.hp=0;ok(B.feedback(g).lit===1,'defeated responder dims independently');s.request.status='departing';ok(B.feedback(g).mode==='departing','departure shown');s.request=null;s.cooldown=0;s.retry=2;ok(B.feedback(g).mode==='retry','retry distinct from ready');s.retry=0;g.player.defense=29;ok(B.feedback(g).mode==='energy','energy shortage cannot show ready');
}
{
 const g=fixture(),s=B.state(g);s.cooldown=30;g.command('unique',{unique:true});B.cleanup(g,'reset test');ok(!s.dialogueQueue.length,'reset removes pending operator speech');
}
{
 const spoken=[],speech={speak:u=>spoken.push(u),cancel(){this.cancelled=true;},pending:false,speaking:false};const voice={speechSynthesis:speech,SpeechSynthesisUtterance:function(text){this.text=text;}};vm.createContext(voice);vm.runInContext(fs.readFileSync('dist/backup-voice375.js','utf8'),voice);
 ok(!voice.BackupVoice375.say({text:'unrelated'}),'unrelated speech excluded');
 for(const e of [{text:'Unavailable',operator365:true,callVoice365:true},{text:'Backup',callVoice365:true,speaker:'BROXTON'},{text:'On my way',callVoice365:true,speaker:'MICHELLE ROXX'},{text:'Leaving',departure375:true}])ok(voice.BackupVoice375.say(e),'existing voice route accepts '+e.text);
 ok(spoken.length===4&&spoken[2].pitch>spoken[1].pitch,'call voices follow current character roles');voice.BackupVoice375.stop();ok(speech.cancelled,'pause/mute stop queued speech');
 for(const file of ['game.js','game360.js']){const code=fs.readFileSync('dist/'+file,'utf8');ok(code.includes("if(sound&&e.type==='backup365'&&e.backupEvent365==='subtitle'&&(e.departure375||e.callVoice365))"),file+' speech gated by existing Sound switch');ok(code.includes('if(value)globalThis.BackupVoice375?.stop()'),file+' pause cancels voice');}
}
// A minimal real-API Canvas recorder verifies two icons and context isolation;
// rendered pixel review is a separate run, not claimed by this test.
{
 const g=fixture(),s=B.state(g),arcs=[],bars=[],texts=[];let depth=0;const ctx={save(){depth++;},restore(){depth--;},beginPath(){},arc(...v){arcs.push(v);},fill(){},moveTo(){},lineTo(){},quadraticCurveTo(){},closePath(){},fillRect(...v){bars.push(v);},fillText(...v){texts.push(v);}};
 const fake={NeonCombat:N,PolishedSprites:{draw(){},ready:Promise.resolve()},Image:class{},document:{createElement(){return {getContext(){return {}}};}}};vm.createContext(fake);vm.runInContext(fs.readFileSync('dist/backup-view365.js','utf8'),fake);const draw=fake.SyndicateBackupView365.statusHud;
 draw(ctx,g);ok(arcs.length===2&&depth===0,'exactly two icons and context restored');ok(bars.every(([x,y,w,h])=>x>=73&&x+w<=297&&y>=69&&y+h<=96),'compact panel stays below life/energy and above enemy HUD');
 arcs.length=0;texts.length=0;g.player.type='reina';ok(draw(ctx,g)===null&&!arcs.length&&!texts.length,'other heroes HUD unchanged');
}
console.log('PASS phone-feedback '+checks+' checks');
