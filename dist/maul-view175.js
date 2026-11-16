
(function(root){'use strict';const pre=root.PolishedSprites.draw,V=root.NeonForestView125;
function frame(c,key,i){const s=V.sheets[key],f=s?.frames[i];if(!f)return false;const k=s.scale;c.drawImage(f.image,f.x*k,f.y*k,f.w*k,f.h*k);return true;}
root.PolishedSprites.draw=function(c,f,t,scale){if(f.type==='forest'&&f.hp>0&&!f.down&&!f.stun){if(f.act?.name==='chargeHold130'){const q=f.charge130;c.save();if(q?.cue&&t<q.alertUntil){c.shadowColor='#a4e184';c.shadowBlur=6;}if(f.walk){c.save();c.beginPath();c.rect(-180,-65,360,70);c.clip();frame(c,'forest-gait127',Math.floor((f.gaitPhase127||0)*4)%4);c.restore();}c.save();if(f.walk){c.beginPath();c.rect(-180,-240,360,176);c.clip();}frame(c,'forest-motion125',0);c.restore();c.restore();return true;}if(f.act?.maulCommand175){const n=f.act.t*60;c.save();if(n>=3&&n<9)frame(c,'forest-extra125',1);else frame(c,'forest-motion125',0);c.restore();return true;}}
 if(f.type==='gunner125'&&f.ack175){c.save();c.scale(1.32,1.32);const a=t-f.ack175.start;frame(c,'gunner125',a<3/60?8:6);c.restore();return true;}return pre(c,f,t,scale);};
const hud=root.NeonChargeView130.hud;root.NeonChargeView130.hud=function(g){return hud(g);};
})(window);
