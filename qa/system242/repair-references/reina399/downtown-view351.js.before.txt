(function(r){'use strict';const N=r.NeonCombat,S=r.PolishedSprites,previous=S.draw,images={},jobs=[];
const inventory={...r.DowntownArt345.images};for(const k of ['streets','nightstreets','hotel','frontages'])delete inventory[k];for(const k of ['dining','retail','hotel-front','residential','nightlife','service','road'])inventory[k]='assets/downtown350/'+k+'.webp';inventory.retail='assets/visual362/neon-cell.webp';inventory.oldLobby='assets/downtown351/lobby.webp';inventory.oldKitchen='assets/downtown351/kitchen.webp';inventory.facadeJoin394='assets/downtown394/riverbloom-spin-cycle.webp';
for(const [key,path]of Object.entries(inventory)){const im=images[key]=new Image();im.environmentSprite161=true;im.environmentSource156=path;jobs.push(new Promise((yes,no)=>{im.onload=yes;im.onerror=()=>no(Error('Downtown artwork missing: '+path));im.src=path;}));}
const pickup=N.Downtown345.windows.find(q=>q.id==='retail-window');if(pickup){pickup.x=2055;pickup.displayY362=343;}
let facadeJoin394;const ready=Promise.all(jobs).then(()=>{facadeJoin394=document.createElement('canvas');facadeJoin394.width=1640;facadeJoin394.height=430;const b=facadeJoin394.getContext('2d');b.drawImage(images.facadeJoin394,0,0,1640,430);b.globalCompositeOperation='destination-in';const mask=b.createLinearGradient(0,0,1640,0);mask.addColorStop(0,'transparent');mask.addColorStop(128/1640,'#fff');mask.addColorStop(1-128/1640,'#fff');mask.addColorStop(1,'transparent');b.fillStyle=mask;b.fillRect(0,0,1640,430);b.globalCompositeOperation='source-over';});S.ready=Promise.all([S.ready,ready]);
function fit(im,row,w,h,rows=3){const rh=im.naturalHeight/rows,ratio=Math.max(w/im.naturalWidth,h/(rh-2)),sw=w/ratio,sh=h/ratio;return{sx:(im.naturalWidth-sw)/2,sy:(row+1)*rh-1-sh,sw,sh,w,h,ratio};}
function image(c,key,row,x,y,w,h,rows=3){const im=images[key];if(!im?.naturalWidth)return false;const q=fit(im,row,w,h,rows);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';c.drawImage(im,q.sx,q.sy,q.sw,q.sh,x,y,w,h);return true;}
function scene(c,g){if(!g.downtown345)return false;const room=N.DowntownRooms345.viewdata(g);if(room?.inside){const row={phone:0,pizza:1,club:2}[room.interior]??0;image(c,'rooms',row,0,0,960,540);return true;}if(N.CacheRooms336.active(g)){image(c,'rooms',g.cacheRoom336.id==='game-shop'?0:1,0,0,960,540);return true;}if(g.zone>6)return false;
if(g.hotelRoute&&g.zone===3){interior(c,g,g.hotelKitchen?'oldKitchen':'oldLobby');return true;}
if(g.zone===5||g.hotelRoute&&g.zone===6){interior(c,g,'club',g.zone===6?2:g.hotelRoute?1:0);return true;}
street(c,g);windowItems(c,g);return true;}
const panels350=[
 {start:0,end:1680,key:'dining',sx:0,sw:1180},
 {start:1680,end:3150,key:'retail',sx:0,sw:2172},
 {start:3150,end:5040,key:'hotel-front',sx:84,sw:1086},
 {start:5040,end:6720,key:'residential',sx:0,sw:1086},
 {start:6720,end:10080,key:'nightlife',sx:0,sw:2172},
 {start:10080,end:12400,key:'service',sx:0,sw:2172}
];
function street(c,g){
 c.save();c.fillStyle='#24242a';c.fillRect(0,0,960,540);
 for(const q of panels350){const x=q.start-g.camera,w=q.end-q.start;if(x>960||x+w<0)continue;const im=images[q.key];if(!im?.naturalWidth)continue;// Draw each complete facade from one source; no independently tiled upper strip.
 if(q.key==='nightlife'&&!g.hotelRoute)c.drawImage(im,512,0,1086,im.naturalHeight,x,0,1680,430);else c.drawImage(im,q.sx,0,q.sw,im.naturalHeight,x,0,w,430);

 }
 // One source contains both complete shops and their alley; cached edge feathering is outside both signs.
 if(facadeJoin394&&g.camera<5860&&g.camera+960>4220){c.drawImage(facadeJoin394,4220-g.camera,0);g.facadeJoin394={worldX:5040,source:'continuous Riverbloom and Spin Cycle artwork',feather:128};}
 // One road texture and one ground plane across every exterior segment.
 const road=images.road;if(road?.naturalWidth){const w=road.naturalWidth;for(let x=Math.floor(g.camera/w)*w;x<g.camera+960;x+=w)c.drawImage(road,x-g.camera,430,w,110);}
 c.restore();g.scenery350={camera:g.camera,ground:430,panels:panels350.filter(q=>q.start<g.camera+960&&q.end>g.camera).map(q=>q.key),precomposed:true,upperStories363:false,continuousFacade383:true};
}
function interior(c,g,key,row){const im=images[key];if(!im?.naturalWidth)return;const z=g.zoneDefinition,w=z.end-z.start,x=z.start-g.camera;
 c.fillStyle='#292532';c.fillRect(0,0,960,540);
 if(row===undefined)c.drawImage(im,0,0,im.naturalWidth,im.naturalHeight,x,0,w,540);else image(c,key,row,x,0,w,540);
 // Source-edge extension only at camera overscan, never another room or repeated tile.
 if(x>0)c.drawImage(im,0,0,1,im.naturalHeight,0,0,x,540);
 if(x+w<960)c.drawImage(im,im.naturalWidth-1,0,1,im.naturalHeight,x+w,0,960-x-w,540);
}

function actorIndex(f){const a=f.act;if(f.heldBy||f.pairVisual)return 10;if(f.flight)return f.flightPose345?.phase==='ascending'?11:12;if(f.down){const age=f.downAge||0,left=(f.downTotal||1.45)-age;if(f.hp<=0)return age<.10?11:age<.21?12:age<.32?13:14;if(left<.14)return 17;if(left<.29)return 16;if(left<.45)return 15;return age<.10?11:age<.21?12:age<.32?13:14;}if(f.hp<=0)return 14;if(f.stun||f.shock)return f.stun>.35?10:9;if(a){const start=Number.isFinite(a.hitAt)?a.hitAt:a.total*.4;return a.t<start*.75?5:a.t<start+.05?6:a.t<a.total*.75?7:8;}if(f.walk)return 1+Math.floor(((f.walkPhase||0)%1+1)%1*4);return 0;}
function heroPose(f){const a=f.act;if(a?.rolling345){const t=a.t*60;return{sheet:'heroExtra',index:t<8?12:t<16?13:t<24?14:t<32?15:t<44?16:t<72?17:t<90?10:11};}if(f.flight||f.down||f.hp<=0){const age=f.downAge||0,left=(f.downTotal||1.45)-age;return{sheet:'heroExtra',index:f.flight?7:f.hp<=0?(age<.12?6:age<.27?7:8):left<.15?11:left<.30?10:left<.45?9:age<.12?6:age<.27?7:8};}if(f.walk&&f.running)return{sheet:'heroExtra',index:Math.floor(((f.nightshadeGait252||0)%1+1)%1*6)};if(a?.move344==='dodge'){const t=a.t*60;return{sheet:'heroExtra',index:t<5?18:t<11?19:t<20?20:t<25?21:t<32?22:23};}if(f.hold&&!a?.drone344)return{sheet:'heroExtra',index:12};return null;}
function paint(c,q,im,f){if(q.image)im=images[q.image];c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';if(f.hitFlash>0)c.filter='brightness(1.22)';c.drawImage(im,...q.rect,-q.ax*q.scale,-q.ay*q.scale,q.rect[2]*q.scale,q.rect[3]*q.scale);c.restore();}
S.draw=function(c,f,...args){const g=r.DowntownRuntime345;if(!g?.downtown345)return previous.call(this,c,f,...args);if(f.type==='nightshade'){const pose=heroPose(f),q=pose&&r.DowntownArt345.frames[pose.sheet]?.[pose.index];if(q&&images[pose.sheet]?.naturalWidth){paint(c,q,images[pose.sheet],f);f.hdPose345=pose;return true;}const baseIndex=r.NightshadeView344.index(f),bq=r.DowntownArt345.frames.heroBase[baseIndex];paint(c,bq,images.heroBase,f);f.hdPose345={sheet:'heroBase',index:baseIndex};return true;}const family=r.DowntownArt345.enemies[f.type];if(!family)return previous.call(this,c,f,...args);const i=actorIndex(f),q=r.DowntownArt345.frames[family.sheet][family.start+i];paint(c,q,images[family.sheet],f);f.hdPose345={index:i,sheet:family.sheet,scale:q.scale};return true;};
function windowItems(c,g){for(const it of g.items){if(!it.window345||it.gone)continue;const x=it.x-g.camera,y=it.y-it.windowElevation345;c.save();c.fillStyle='#b8ffdd44';c.beginPath();c.ellipse(x,y,15,8,0,0,Math.PI*2);c.fill();r.ItemView319.item(c,g,{...it,y:y+7});c.restore();}}
function marker(c,x,arrow,label){if(x< -60||x>1020)return;c.save();c.textAlign='center';c.font='bold 16px sans-serif';c.lineWidth=3;c.strokeStyle='#09111d';c.fillStyle='#ffe78a';c.strokeText('GO '+arrow,x,164);c.fillText('GO '+arrow,x,164);if(label){c.font='bold 9px sans-serif';c.fillStyle='#e9fff9';c.strokeText(label,x,178);c.fillText(label,x,178);}c.restore();}
function foreground(c,g){if(!g.downtown345)return;if(g.zone===2&&!g.hotelRoute&&!g.transition)marker(c,3665-g.camera,'↑','THE GRAND HOTEL');for(const q of N.Downtown345.routes(g).filter(q=>!(g.zone===2&&q.door)))marker(c,N.clamp(q.x-g.camera,40,920),q.arrow,q.name);const room=N.DowntownRooms345.viewdata(g);if(room?.inside){if(room.exit?.available)marker(c,room.exit.x,'↑');}else for(const q of N.DowntownRooms345.portals(g))if(q.available)marker(c,q.x-g.camera,'↑');

if(N.Nightshade345?.enabled(g))for(const q of N.Nightshade345.missiles(g)){const dx=q.target.x-q.x,dy=q.target.y-(q.target.grappleZ||0)-55-(q.y-q.z);r.NightshadeWorld348.missile(c,q.x-g.camera,q.y-q.z,dx<0?-1:1,Math.atan2(dy,Math.abs(dx)),g.time);}
if(N.CacheRooms336.active(g))marker(c,144,'↑');else for(const q of N.CacheRooms336.portals(g))marker(c,q.x-g.camera,'↑');if(g.downtownRoomFade345>0){c.save();c.globalAlpha=Math.min(1,g.downtownRoomFade345/.2);c.fillStyle='#050b15';c.fillRect(0,0,960,540);c.restore();}}
r.DowntownView348={ready,images,scene,foreground,actorIndex,heroPose,marker,fit,panels350,street,windowItems};
})(globalThis);
