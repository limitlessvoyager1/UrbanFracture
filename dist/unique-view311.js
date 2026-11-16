(function(r){'use strict';const S=r.PolishedSprites,D=r.UniqueArt311,N=r.NeonCombat,pre=S.draw,im=new Image();const ready=new Promise(resolve=>{im.onload=()=>resolve(true);im.onerror=()=>resolve(false);im.src=D.src;});S.ready=Promise.all([S.ready,ready]);
function pose(a){const f=a.t*60+1e-7;if(a.unique311==='dragon')return f<6?0:f<14?1:f<20?2:f<25?3:f<32?4:f<43?5:f<56?6:7;if(a.unique311==='wheel')return 16+(f<6?0:f<13?1:f<20?2:f<27?3:f<33?4:f<36?5:f<45?6:7);return 8+(f<7?0:f<15?1:f<18?2:f<23?3:f<27?4:f<32?5:f<45?6:7);}
function body(c,f,t){const index=pose(f.act),q=D.frames[index],s=D.scale;c.save();c.imageSmoothingEnabled=true;c.drawImage(im,...q.rect,-q.ax*s,-q.ay*s,q.rect[2]*s,q.rect[3]*s);c.restore();f.styleRender310={time:t,sheet:'unique311',index,state:f.act.unique311||'counter-sword',phase:f.act.phase311||f.act.phase248,anatomicalHeight:148,scale:s,source:D.src};return true;}
S.draw=function(c,f,t,k){if(f.type==='reina'&&im.complete&&im.naturalWidth&&(f.act?.unique311||f.act?.counter248&&f.act.special248&&f.act.name==='counterMove248'))return body(c,f,t);return pre(c,f,t,k);};
r.UniqueView311={ready,image:im,pose,body};
})(globalThis);
