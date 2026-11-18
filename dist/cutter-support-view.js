/* Authored whole-body Colton poses; no detached weapon or procedural limb rigs. */
(function(r){'use strict';const S=r.PolishedSprites,D=r.CutterSupportData,previous=S.draw,image=new Image();
const ready=new Promise((yes,no)=>{image.onload=yes;image.onerror=()=>no(Error('Missing Colton Sharpe sprite atlas'));image.src=D.src;});S.ready=Promise.all([S.ready,ready]);
function pose(a,t){const state=a.support370?.state,injury=a.support370?.injury376;
 if(state==='GET_UP')return 40+Math.min(3,Math.max(0,Math.floor((t-injury.at-.65)/.7*4)));
 if(state==='LIMP_EXIT')return 44+Math.min(3,Math.floor((a.walkPhase||0)*4));
 if(a.hp>0&&a.down&&!a.flight&&a.down<.35)return 40+Math.min(3,Math.floor((.35-a.down)/.35*4));
 if(a.hp<=0||a.down||a.flight)return a.flight||a.downAge<.3?38:39;
 if(a.stun||a.shock)return a.stun>.15?37:36;
 const ac=a.act,f=(ac?.t||0)*60+1e-7;
 if(ac?.support370&&ac.move370.id==='cutterChop'){
  if(f<6)return 28;if(f<12)return 29;if(f<18)return 30;if(f<23)return 31;
  return 32+Math.min(3,Math.floor((f-23)/Math.max(1,(ac.total*60-23)/4)));
 }
 if(ac?.support370&&ac.move370.id==='cutterDoubleSlash'){
  if(f<6)return 18;if(f<12)return 19;if(f<16)return 20;if(f<20)return 21;if(f<24)return 22;if(f<27)return 23;if(f<30)return 24;if(f<35)return 25;
  return 26+Math.min(1,Math.floor((f-35)/Math.max(1,(ac.total*60-35)/2)));
 }
 if(a.turnUntil377>t)return 16+(a.turnUntil377-t<.06?1:0);
 if(a.walk)return a.running?12+Math.min(3,Math.floor((a.walkPhase||0)*4)):4+Math.min(7,Math.floor((a.walkPhase||0)*8));
 return Math.floor(t*3)%4;
}
S.draw=function(c,a,t,k){if(!a.roleCutter){const out=previous.call(this,c,a,t,k);if(a.bleedCutter?.until>t&&a.hp>0){c.save();c.fillStyle='#dc7c74';c.fillRect(-4,-153,2,5);c.fillRect(2,-157,2,5);c.restore();}return out;}
 const index=pose(a,t),frame=D.frames[index],s=D.scale;c.drawImage(image,...frame.rect,-frame.ax*s,-frame.ay*s,256*s,256*s);a.renderCutter={frame:index,scale:s};return true;
};
r.CutterSupportView={ready,pose};
})(globalThis);
