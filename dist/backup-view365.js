/* Whole-body, separately painted phone-call frames; no paper-doll animation. */
(function(r){'use strict';const S=r.PolishedSprites,N=r.NeonCombat,old=S.draw,im=new Image();const ready=new Promise((yes,no)=>{im.onload=yes;im.onerror=()=>no(Error('Missing Broxton phone atlas'));im.src='assets/broxton366/call.webp';});S.ready=Promise.all([S.ready,ready]);
const scratch=document.createElement('canvas');scratch.width=scratch.height=256;const c=scratch.getContext('2d');
function frame(a){const f=Math.max(0,a.t*60+1e-7);if(f<21)return Math.min(6,Math.floor(f/3));if(f<45)return 7+Math.min(5,Math.floor((f-21)/4));if(f<54)return 13+Math.min(1,Math.floor((f-45)/4.5));if(f<114)return 15; if(f<126)return 16+Math.min(1,Math.floor((f-114)/6));return Math.min(23,18+Math.floor((f-126)/2.5));}
function night(g){const h=g?.environment156?.effective?.()?.hour;if(!Number.isFinite(h))return .55;return h<6||h>=20?1:h<8?(8-h)/2:h>18?(h-18)/2:0;}
function draw(ctx,f,t,k){if(f.type!=='broxton'||!f.act?.backup365)return old.call(this,ctx,f,t,k);const a=f.act,n=frame(a);c.clearRect(0,0,256,256);c.drawImage(im,n%6*256,Math.floor(n/6)*256,256,256,0,0,256,256);if(n>=7&&n<=19){const fade=n>17?(20-n)/3:Math.min(1,(n-6)/3),alpha=(.055+.065*Math.max(0,Math.min(1,night(r.DowntownRuntime345))))*fade;c.save();c.globalCompositeOperation='source-atop';const glow=c.createRadialGradient(165,49,2,165,49,53);glow.addColorStop(0,'rgba(150,222,255,'+alpha+')');glow.addColorStop(1,'rgba(130,210,255,0)');c.fillStyle=glow;c.fillRect(110,0,100,135);c.restore();}const scale=170/240,width=1.10;ctx.drawImage(scratch,-128*scale*width,-248*scale,256*scale*width,256*scale);f.phone365={frame:n,phase:a.phase365,paintedGrip:true};return true;};
// One ground-anchored presentation policy for every Broxton state, including
// action-specific owners and the independent locomotion/phone atlases.
const bodyPolicy={size:.95,buildWidth:.95};
S.draw=function(ctx,f,t,k){if(f.type!=='broxton')return draw(ctx,f,t,k);ctx.save();ctx.scale(bodyPolicy.size*bodyPolicy.buildWidth,bodyPolicy.size);try{return draw(ctx,f,t,k);}finally{ctx.restore();f.body366={...bodyPolicy};}};
function statusHud(ctx,g){
 if(g.player.type!=='broxton')return null;
 const status=N.SyndicateBackup365.feedback(g);
 ctx.save();ctx.fillStyle='rgba(8,13,30,.96)';ctx.fillRect(73,69,224,27);
 // Exactly two miniature people, independently dimmed when a responder is out.
 for(let i=0;i<2;i++){const x=87+i*18;ctx.fillStyle=i<status.lit?'#a4f9df':'#536171';ctx.beginPath();ctx.arc(x,76,3.2,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(x-5,91);ctx.lineTo(x-5,84);ctx.quadraticCurveTo(x-5,80,x,80);ctx.quadraticCurveTo(x+5,80,x+5,84);ctx.lineTo(x+5,91);ctx.closePath();ctx.fill();}
 ctx.font='bold 9px monospace';ctx.textAlign='left';ctx.fillStyle=status.mode==='ready'?'#a4f9df':status.mode==='active'?'#d6f4ff':'#afbdcd';ctx.fillText(status.label,121,81);
 ctx.fillStyle='#28364a';ctx.fillRect(121,87,166,3);ctx.fillStyle=status.mode==='active'?'#a4f9df':status.mode==='ready'?'#80cbb8':'#6780a0';ctx.fillRect(121,87,166*status.fraction,3);ctx.restore();return status;
}

function hud(ctx,g){if(g.player.type!=='broxton')return;statusHud(ctx,g);const s=N.SyndicateBackup365.state(g),w=960;ctx.save();ctx.font='bold 13px monospace';ctx.textAlign='center';const sub=s.subtitles.at(-1),notice=s.notice?.until>g.time?s.notice.text:null;let text=sub?sub.speaker+': '+sub.text:notice;if(!text&&g.player.act?.backup365)text='SYNDICATE BACKUP · '+(g.player.act.phase365||'reach').toUpperCase();if(!text&&s.request)text='BACKUP: '+(s.request.pair370||[]).map(k=>N.SyndicateBackup365.names[k]).join(' + ').toUpperCase()+(s.request.status==='active'?' · '+Math.max(0,Math.ceil(s.request.deadline-g.time))+'s':s.request.status==='departing'?' · LEAVING':' · ON THE WAY');if(!text&&Object.values(s.injury376||{}).some(v=>v>0))text=Object.entries(s.injury376).filter(([k,v])=>v>0).map(([k,v])=>N.SyndicateBackup365.names[k].toUpperCase()+' RECOVERING '+Math.floor(v/60)+':'+String(Math.ceil(v)%60).padStart(2,'0')).join(' · ');if(!text)text='R2 / F · SYNDICATE BACKUP'+(g.backupReview377?" · K'MARR + TY SLY · PASSIVE REVIEW":g.backupReview371?' · BYRON BASTION + MICHELLE ROXX · PASSIVE REVIEW':'');if(text){const y=540-97;ctx.fillStyle='rgba(7,15,24,.88)';const width=Math.min(w-30,ctx.measureText(text).width+30);ctx.fillRect((w-width)/2,y-19,width,29);ctx.fillStyle='#d6f4ff';ctx.fillText(text,w/2,y);}ctx.restore();}
r.SyndicateBackupView365={ready,frame,hud,statusHud,bodyPolicy,atlas:'assets/broxton366/call.webp',frames:24};
})(globalThis);

