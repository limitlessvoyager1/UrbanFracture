'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');let checks=0;const ok=(v,m)=>{checks++;assert.ok(v,m)};
// Real dashboard listener, without gameplay: focus on a select must not swallow F9.
const listeners={},ui={hidden:true,style:'',onclick:null,querySelector:()=>({})},sb={NeonCombat:{Audit135:{}},document:{createElement:()=>ui,body:{append(){}}},addEventListener:(k,f,c)=>{listeners[k]=f;ok(c===true,'F9 listener uses capture phase')}};vm.createContext(sb);vm.runInContext(fs.readFileSync('dist/audit-view135.js','utf8'),sb);
function key(opts={}){let prevented=0,stopped=0;listeners.keydown({code:'F9',key:'F9',repeat:false,target:{matches:()=>true},preventDefault(){prevented++},stopImmediatePropagation(){stopped++},...opts});return{prevented,stopped};}
ok(key().prevented===1&&!ui.hidden,'F9 opens from focused form field');key({repeat:true});ok(!ui.hidden,'held F9 does not flicker closed');key({code:'',key:'F9'});ok(ui.hidden,'key-only event closes panel');key({code:'F9',key:'Unidentified'});ok(!ui.hidden,'code-only event opens');ui.onclick({target:{dataset:{},hasAttribute:()=>true}});ok(ui.hidden,'existing Close button still works');sb.NeonCombatAuditView135.dashboard();ok(!ui.hidden,'shared controller/button entry opens same dashboard');
process.env.QA_NIGHTSHADE264='1';const F=require('./nightshade251-input-fixture.cjs');const{run,pad,setup,setPads}=F;
run('globalThis.NeonCombatAuditView135={dashboard(){globalThis.menu268=(globalThis.menu268||0)+1;}}');
for(const[map,id]of[['standard','DualSense USB'],['','Sony Interactive Entertainment Wireless Controller'],['standard','Xbox 360 Controller (DSX)']]){
 setup('nightshade');setPads([pad([],map,id)]);run('devChord268=false;devRelease268=false;menu268=0;pollGamepad();padNeutral=false');
 setPads([pad([10],map,id)]);run('pollGamepad()');ok(run('menu268===0&&!paused&&!game.player.act'),'L3 alone inert '+id);
 setPads([pad([10,9],map,id)]);run('pollGamepad()');ok(run('menu268===1&&paused&&!game.player.act&&game.player.nightshadeAmmo255===6'),'shortcut pauses, opens, no action '+id);
 run('for(let i=0;i<30;i++)pollGamepad()');ok(run('menu268===1'),'held chord once '+id);
 setPads([pad([10],map,id)]);run('pollGamepad()');ok(run('paused&&menu268===1'),'partial release cannot resume '+id);
 setPads([pad([],map,id)]);run('pollGamepad()');setPads([pad([9,10],map,id)]);run('pollGamepad()');ok(run('paused&&menu268===2'),'next chord closes shared panel '+id);
 setPads([pad([],map,id)]);run('pollGamepad()');setPads([pad([9],map,id)]);run('pollGamepad()');ok(run('!paused&&menu268===2'),'Options alone resumes '+id);
 setPads([pad([],map,id)]);run('pollGamepad()');setPads([pad([9],map,id)]);run('pollGamepad()');ok(run('paused'),'Options first pauses '+id);setPads([pad([9,10],map,id)]);run('pollGamepad()');ok(run('menu268===3&&paused'),'Options then L3 also opens '+id);
 setPads([]);run('pollGamepad()');ok(run('!devChord268&&!devRelease268'),'disconnect clears shortcut latch '+id);
}
setup('reina');run("menu268=0;paused=true;document.querySelector('#developerMenu268').onclick()");ok(run('menu268===1&&paused'),'visible fallback works on pause screen');run("started=false;paused=false;document.querySelector('#developerMenu268').onclick()");ok(run('menu268===2&&!started'),'visible fallback works before starting');
const html=fs.readFileSync('dist/index.html','utf8');ok(html.includes('id="developerMenu268"')&&html.includes('L3 + Options'),'visible entry and documented shortcut');console.log('PASS268',checks,'F9 focus/key/repeat, existing panel/close, simulated USB/rawSony/DSX shortcut, safe release, pause and visible fallback. Physical pad untested.');
