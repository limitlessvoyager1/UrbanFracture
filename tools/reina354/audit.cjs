const fs=require('fs'),{renderLoad}=require('../fighter-render/load.cjs');
(async()=>{const r=await renderLoad(354),{sb,createCanvas}=r,records=[];
function arr(family,frames){if(!frames)return;for(const [i,f]of frames.entries()){if(f?.image&&f.image.width){records.push({id:family+'/'+i,f,im:f.image});}}}
for(const [k,v]of Object.entries(sb.ReinaNative354())){if(Array.isArray(v)&&k!=='combinedCounter')arr('native-'+k,v);else console.log('notArray',k,Object.keys(v||{}));}
for(const [k,v]of Object.entries(sb.ReinaView282.sets))arr('gait-'+k,v);
arr('grab',sb.ReinaGrabView279.frames);arr('hook',sb.ReinaHookView272.frames);arr('recoil',sb.RecordingView306.recoil);arr('weapon',sb.CombatView248.frames.reina);arr('weapon-motion',sb.CombatView248.motionFrames.reina);arr('tornado',sb.NeonChargeView130.frames());
for(const k of ['reina','reinaExtra','reinaDash']){const d=sb.Attack297Data[k],im=sb.AttackView297.images[k];for(const[i,f]of d.frames.entries())records.push({id:'attack-'+k+'/'+i,f,im,rect:f.rect});}
for(const[k,d]of Object.entries(sb.Grapple301Data)){if(k==='powerbomb')continue;for(const[i,f]of d.frames.entries())records.push({id:'pair-'+k+'/'+i,f,im:sb.GrappleView301.images[k],rect:f.rect});}
arr('rising',sb.NeonRisingBladeView187.frames);arr('build22',sb.ReinaNative354().build22.combat);arr('combinedCounter',sb.ReinaNative354().combinedCounter);
arr('idle',sb.PresentationView275.frames.slice(0,2));arr('charge-walk',sb.NeonChargeWalk149.frames());arr('german130',sb.NeonReactionsView130.sheets.german.frames);
// Full source identity registry; individual rectangles keep all original anchors.
const meta=[];for(let n=0;n<records.length;n++){const q=records[n],im=q.im,rect=q.rect||[0,0,im.width,im.height];meta.push({id:q.id,rect,w:rect[2],h:rect[3],group:n<375?Math.floor(n/32):12,cell:n<375?n%32:n-375});}
fs.writeFileSync('reports354/sources.json',JSON.stringify(meta,null,2));
for(let group=0;group<Math.ceil(records.length/32);group++){const c=createCanvas(2048,4096),x=c.getContext('2d');for(let j=0;j<32;j++){const q=records[meta.findIndex(m=>m.group===group&&m.cell===j)];if(!q)break;const rect=q.rect||[0,0,q.im.width,q.im.height],s=Math.min(450/rect[2],450/rect[3]),w=rect[2]*s,h=rect[3]*s;x.drawImage(q.im,...rect,j%4*512+(512-w)/2,Math.floor(j/4)*512+(512-h)/2,w,h);}fs.writeFileSync('source-art/reina354/poses-'+group+'.png',c.toBuffer('image/png'));}
console.log('TOTAL',records.length,'sheets',Math.ceil(records.length/32),meta.reduce((a,x)=>(a[x.id.split('/')[0]]=(a[x.id.split('/')[0]]||0)+1,a),{}));})();
