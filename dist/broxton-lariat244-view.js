
(function(root){'use strict';const S=root.PolishedSprites,N=root.NeonCombat,D=root.BroxtonLariat244Data,previous=S.draw,frames=[];const ready=Promise.all(D.frames.map((q,i)=>new Promise(resolve=>{const im=new Image();im.onload=()=>{frames[i]={...q,image:im};resolve(true);};im.onerror=()=>resolve(false);im.src=q.src;})));S.ready=Promise.all([S.ready,ready]);
function draw(c,f){const a=f.act,n=N.Broxton179.lariatFrame(a),q=frames[n];if(!q)return false;const k=D.scale,z=N.Broxton179.lariatHeight(a)/N.Forest125.scale(f);c.drawImage(q.image,-q.anchorX*k,-q.anchorY*k-z,q.w*k,q.h*k);f.lariatRenderFrame244=n;return true;}
S.draw=function(c,f,t,k){if(f.type==='broxton'&&f.hp>0&&!f.down&&!f.flight&&!f.heldBy&&!f.stun&&f.act?.name==='broxRush179'){c.save();if(f.poiseFlash244>0){c.shadowColor='#fff4ce';c.shadowBlur=4;}const done=draw(c,f);c.restore();if(done)return true;}return previous(c,f,t,k);};root.BroxtonLariat244View={ready,frames,draw,scale:D.scale};
})(window);
