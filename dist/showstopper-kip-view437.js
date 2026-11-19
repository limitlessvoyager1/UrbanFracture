(function(r){'use strict';const N=r.NeonCombat,S=r.PolishedSprites;let atlas=null;
const ready=new Promise(resolve=>{const image=new Image();image.onload=()=>{atlas=image;resolve(true);};image.onerror=()=>resolve(false);image.src='assets/nova437/kip-up.webp';});
const previous=S.draw;S.draw=function(c,f,time,scale){const q=N.ShowstopperKip437.plan(f,time),data=r.Nova437Data;if(!q||!atlas||!data)return previous(c,f,time,scale);
 const frame=data.frames[q.frame],owner=N.ShowstopperKip437.owner(f);if(owner)r.ShowstopperView435?.aura(c,owner.game,owner.actor,scale,r.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
 c.save();if(q.dir!==f.dir)c.scale(-1,1);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';if(time<(f.hypeUntil||0)){c.shadowColor='#ffe16b';c.shadowBlur=12;}c.drawImage(atlas,...frame.rect,-frame.anchor[0]*data.scale,-frame.anchor[1]*data.scale,frame.rect[2]*data.scale,frame.rect[3]*data.scale);c.restore();return true;};
S.ready=Promise.all([S.ready,ready]);r.ShowstopperKipView437={ready};
})(globalThis);
