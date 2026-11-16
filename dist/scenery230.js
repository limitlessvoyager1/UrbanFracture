
(function(root){'use strict';
const E=root.UrbanEnvironment156,clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const recipes={};
function add(names,options){for(const name of names.split('|'))recipes[name]={...options};}
add('uptown-park-a172.webp|uptown-park-b172.webp|uptown-park-c172.webp|uptown-park-panorama172.webp',{skyLimit:.37,vegetation:true,branches:true});
add('lakeside140.webp',{skyLimit:.32,skyline:[[0,.31],[.04,.30],[.10,.23],[.12,.225],[.17,.255],[.23,.18],[.24,.17],[.27,.23],[.30,.27],[.36,.30],[.41,.32],[1,.32]],vegetation:true,branches:true});
add('deep-woods147.webp|route74-homes197.webp|route74-stop197.webp',{skyLimit:.19,vegetation:true,branches:true});
recipes['deep-woods147.webp'].skyLimit=0;recipes['deep-woods147.webp'].canopy=true;
add('route74-woods197.webp',{skyLimit:.19,vegetation:true,branches:true});
add('woods139.webp',{skyLimit:.17,vegetation:true,branches:true,rows:4,canopy:true});
add('estates-avenue196.webp|estates-front196.webp|estates-spa196.webp|estates-rear196.webp|estates-club196.webp|estates-golf196.webp|estates-tennis196.webp|estates-court196.webp',{skyLimit:.15,vegetation:true,branches:true});
add('riverfront-a174.webp|riverfront-b174.webp|riverfront-dock152.webp|riverfront160.webp|riverfront151.webp',{skyLimit:.28,vegetation:true,branches:true});
add('uptown-promenade113.webp|uptown-mall129.webp|uptown-block-a155.webp|uptown-block-b155.webp|uptown-block-c155.webp|mall-a155.webp|mall-b155.webp',{skyLimit:.21,vegetation:true,urban:true});
add('intake-yard227.webp',{skyLimit:.3,graySky:true,skyline:[[0,.24],[.022,.24],[.022,.10],[.147,.10],[.147,.17],[.367,.17],[.40,.30],[.43,.30],[.43,.25],[.54,.25],[.54,.30],[.64,.30],[.64,.265],[.81,.265],[.81,.30],[.85,.30],[.85,.145],[.89,.095],[.96,.095],[.986,.14],[.986,.30],[1,.30]]});
add('recreation-yard227.webp',{skyLimit:.18,graySky:true});
add('checkpoint227.webp',{skyLimit:.18,graySky:true});
function roofs(name,lines){(recipes[name]??={skyLimit:.25}).roofs=lines;}
roofs('deep-woods147.webp',[[.704,.206,.952,.244]]);
roofs('route74-stop197.webp',[[0,.445,.203,.445],[.363,.466,.466,.466],[.584,.300,.773,.300],[.808,.477,.902,.486]]);
roofs('route74-homes197.webp',[[.15,.37,.24,.37],[.325,.31,.443,.31],[.63,.44,.715,.44]]);
roofs('intake-yard227.webp',[[.025,.132,.146,.132],[.155,.213,.365,.213],[.074,.512,.318,.512],[.634,.49,.835,.49],[.86,.165,.98,.165]]);
roofs('recreation-yard227.webp',[[0,.207,1,.207]]);
roofs('checkpoint227.webp',[[.07,.30,.28,.30],[.58,.27,.79,.27]]);
roofs('estates-golf196.webp',[[.13,.275,.256,.275],[.923,.14,1,.14]]);
roofs('estates-tennis196.webp',[[.43,.225,.67,.225]]);
roofs('estates-avenue196.webp',[[.38,.28,.52,.28],[.65,.25,.82,.25]]);
roofs('estates-front196.webp',[[.28,.22,.51,.22],[.56,.23,.78,.23]]);
roofs('estates-spa196.webp',[[.15,.28,.38,.28],[.58,.27,.80,.27]]);
roofs('uptown-promenade113.webp',[[.02,.31,.20,.31],[.78,.30,.97,.30]]);
roofs('uptown-mall129.webp',[[.02,.31,.25,.31],[.38,.30,.61,.30],[.75,.31,.97,.31]]);
roofs('riverfront-a174.webp',[[.055,.435,.29,.435]]);
recipes['route74-stop197.webp'].cloth=[{rect:[.209,.244,.017,.127],anchor:[.209,.244],colors:'flag'}];
recipes['estates-golf196.webp'].cloth=[{rect:[.915,.193,.016,.038],anchor:[.916,.196],colors:'flag'}];

const zones={
'uptown-park-a172.webp':{branchZones:[[0,0,.35,.34]],excludeZones:[[.62,.20,.17,.44],[.24,.525,.11,.13],[.835,.53,.1,.13],[.168,.22,.027,.44]]},
'uptown-park-b172.webp':{branchZones:[[.72,.1,.2,.35]],windZones:[[0,0,1,.33],[.70,.33,.3,.18]]},
'uptown-park-c172.webp':{branchZones:[[.47,0,.53,.38]],windZones:[[0,0,1,.33],[.65,.33,.35,.17]]},
'lakeside140.webp':{branchZones:[[0,0,.21,.35],[.22,0,.26,.34],[.94,0,.06,.30]],windZones:[[0,0,1,.35]]},
'deep-woods147.webp':{branchZones:[[0,0,.20,.34],[.25,0,.10,.29],[.45,0,.12,.30],[.96,0,.04,.12]],excludeZones:[[.68,.12,.32,.58]]},
'route74-woods197.webp':{branchZones:[[0,0,.2,.34],[.84,0,.16,.27]],windZones:[[0,0,1,.32]]},
'route74-homes197.webp':{branchZones:[[0,0,.19,.28],[.71,0,.29,.25]],windZones:[[0,0,1,.30]]},
'route74-stop197.webp':{branchZones:[[0,0,1,.18]],windZones:[[0,0,1,.22]]},
'estates-golf196.webp':{branchZones:[[0,0,.12,.4],[.12,0,.15,.20],[.75,0,.14,.22]],excludeZones:[[.125,.22,.132,.32],[.27,.25,.65,.20]],windZones:[[0,0,1,.60]]},
'estates-tennis196.webp':{windZones:[[0,0,1,.27],[0,.27,.2,.33],[.8,.27,.2,.33]]},
'estates-avenue196.webp':{branchZones:[[0,0,.10,.30],[.86,0,.14,.15]]},
'uptown-promenade113.webp':{branchZones:[[0,0,.12,.28],[.86,0,.14,.14]]},
'riverfront-a174.webp':{branchZones:[[0,0,.09,.30]]}
};
for(const [name,bounds] of Object.entries(zones))Object.assign(recipes[name],bounds);

const panorama=recipes['uptown-park-panorama172.webp'];panorama.windZones=[];panorama.branchZones=[];panorama.excludeZones=[];
[[0,2080,.665,0],[1920,2160,.695,160],[4000,2000,.665,80]].forEach(([offset,width,ratio],i)=>{const q=zones['uptown-park-'+String.fromCharCode(97+i)+'172.webp'];const fy=y=>(y<=ratio?y/ratio*410:410+(y-ratio)/(1-ratio)*130)/540;for(const type of ['windZones','branchZones','excludeZones'])for(const r of q[type]|| (type==='windZones'?[[0,0,1,.83]]:[]))panorama[type].push([(offset+r[0]*width)/6000,fy(r[1]),r[2]*width/6000,fy(r[1]+r[3])-fy(r[1])]);});
const inside=(u,v,rs)=>(rs||[]).some(r=>u>=r[0]&&u<r[0]+r[2]&&v>=r[1]&&v<r[1]+r[3]);
for(const name of ['arrival','company','waterfront','district','yard','ship-deck'])recipes[name+'231.webp']={skyLimit:name==='arrival'?.25:name==='company'?.14:name==='waterfront'?.13:name==='yard'?.18:.22,vegetation:false,roofs:name==='company'?[[.04,.23,.82,.23]]:[]};
const totals={prepared:0,segments:0,cloth:0,roofs:0,skyPixels:0};
function key(src){return String(src).split('?')[0].split('/').pop();}
function recipe(src){return recipes[key(src)]||null;}
function horizon(p,u){if(!p.skyline)return p.skyLimit||0;let a=p.skyline[0];for(let i=1;i<p.skyline.length;i++){const b=p.skyline[i];if(u<=b[0])return a[1]+(b[1]-a[1])*(u-a[0])/Math.max(.00001,b[0]-a[0]);a=b;}return a[1];}
function vegetation(r,g,b){return g>r*1.045&&g>b*.99&&g>30;}
function branch(r,g,b){return r>g*1.04&&g>b*1.13&&r>35&&r<175;}
function analyze(data,w,h,src){const p=recipe(src);if(!p)return null;const n=w*h,sky=new Uint8Array(n),owner=new Uint8Array(n),rows=p.rows||1,rowH=h/rows,regions=[],queue=new Int32Array(n);let skyPixels=0;

 if(p.skyLimit>0){let head=0,tail=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++){const row=Math.floor(y/rowH);if(rows>1&&row>0)continue;const ny=(y%rowH)/rowH;if(ny>horizon(p,x/w))continue;const i=y*w+x,j=i*4,r=data[j],g=data[j+1],b=data[j+2];const blue=b>240&&b-r>65&&b-g>30,cloud=Math.min(r,g,b)>195&&b>=r*.94&&g>=r*.94,gray=p.graySky&&Math.min(r,g,b)>95&&Math.max(r,g,b)-Math.min(r,g,b)<62&&b>=r*.9;if(blue||cloud||gray)sky[i]=1;}
 const seed=(x,y)=>{const i=y*w+x;if(sky[i]===1){sky[i]=255;queue[tail++]=i;}};
 for(let x=0;x<w;x++)for(let y=0;y<Math.min(4,h);y++)seed(x,y);

 if(p.skyline||/uptown-park/.test(key(src)))for(let x=0;x<w;x+=16)for(let y=4;y<Math.min(h*.32,rowH*.32);y+=8)seed(x,y);
 while(head<tail){const i=queue[head++],x=i%w,y=(i/w)|0;for(const q of[x>0?i-1:-1,x<w-1?i+1:-1,y>0?i-w:-1,y<h-1?i+w:-1])if(q>=0&&sky[q]===1){sky[q]=255;queue[tail++]=q;}}
 for(let i=0;i<n;i++){if(sky[i]!==255)sky[i]=0;else skyPixels++;}

 const visited=new Uint8Array(n);for(let start=0;start<n;start++){if(sky[start]||visited[start])continue;let head=0,tail=1,border=false,plant=false,dark=false;queue[0]=start;visited[start]=1;while(head<tail){const i=queue[head++],x=i%w,y=(i/w)|0,j=i*4;if(x===0||x===w-1||y===0||y===h-1)border=true;if(vegetation(data[j],data[j+1],data[j+2])||branch(data[j],data[j+1],data[j+2]))plant=true;if(Math.min(data[j],data[j+1],data[j+2])<90)dark=true;for(const q of[x>0?i-1:-1,x<w-1?i+1:-1,y>0?i-w:-1,y<h-1?i+w:-1])if(q>=0&&!sky[q]&&!visited[q]){visited[q]=1;queue[tail++]=q;}}if(!border&&!plant&&!dark){for(let k=0;k<tail;k++)sky[queue[k]]=255;skyPixels+=tail;}}
 }

 if(p.skyLimit>0){const seen=new Uint8Array(n);const cloudAt=i=>{const j=i*4,r=data[j],g=data[j+1],b=data[j+2],y=(i/w)|0;return y/h<horizon(p,(i%w)/w)&&Math.min(r,g,b)>175&&Math.max(r,g,b)-Math.min(r,g,b)<70&&b>=r*.94&&g>=r*.94;};for(let start=0;start<n;start++){if(sky[start]||seen[start]||!cloudAt(start))continue;let head=0,tail=1,minX=w,maxX=0,minY=h,maxY=0,contact=0;queue[0]=start;seen[start]=1;while(head<tail){const i=queue[head++],x=i%w,y=(i/w)|0;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);for(const q of[x>0?i-1:-1,x<w-1?i+1:-1,y>0?i-w:-1,y<h-1?i+w:-1])if(q>=0){if(sky[q])contact++;else if(!seen[q]&&cloudAt(q)){seen[q]=1;queue[tail++]=q;}}}if(tail>30&&maxY-minY>=3&&maxX-minX>=5&&maxX-minX>(maxY-minY)*.6&&contact>3){for(let k=0;k<tail;k++)sky[queue[k]]=255;skyPixels+=tail;}}}

 const cols=8,bands=3,group=new Map();
 function region(id,x,y,kind,anchor){let r=group.get(id);if(!r){r={id:regions.length+1,kind,x,y,right:x+1,bottom:y+1,anchor};group.set(id,r);regions.push(r);}else{if(kind==='branch')r.kind='branch';r.x=Math.min(r.x,x);r.y=Math.min(r.y,y);r.right=Math.max(r.right,x+1);r.bottom=Math.max(r.bottom,y+1);}return r.id;}
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,j=i*4,r=data[j],g=data[j+1],b=data[j+2],ny=(y%rowH)/rowH,row=Math.floor(y/rowH);if(rows>1&&row>1)continue;let cloth=-1;for(let k=0;k<(p.cloth||[]).length;k++){const q=p.cloth[k].rect;if(x>=q[0]*w&&x<(q[0]+q[2])*w&&y>=q[1]*h&&y<(q[1]+q[3])*h){if(r>145&&r>g*1.25||Math.min(r,g,b)>160||b>r*1.25&&b>g*1.1)cloth=k;}}
 if(cloth>=0){const a=p.cloth[cloth].anchor;owner[i]=region('cloth'+cloth,x,y,'cloth',[a[0]*w,a[1]*h]);continue;}
 if(!p.vegetation||ny>.83||sky[i]||p.urban&&ny>.37)continue;
 if(inside(x/w,ny,p.excludeZones)||p.windZones&&!inside(x/w,ny,p.windZones))continue;
 const isGreen=vegetation(r,g,b),isBranch=p.branches&&inside(x/w,ny,p.branchZones)&&branch(r,g,b);if(!isGreen&&!isBranch)continue;
 const cx=Math.min(cols-1,(x/w*cols)|0),cy=Math.min(bands-1,(ny/.84*bands)|0);owner[i]=region('plant'+row+':'+cx+':'+cy,x,y,isBranch?'branch':'foliage',null);}
 return {profile:p,w,h,sky,owner,regions,skyPixels};}
function makeCanvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
function prepare(raw,w,h,src,base){const a=analyze(raw.data,w,h,src);if(!a)return null;const data=raw.data,n=w*h,segments=[];let bytes=0;
 for(const r of a.regions){const sw=r.right-r.x,sh=r.bottom-r.y;if(sw*sh<1)continue;const im=makeCanvas(sw,sh),c=im.getContext('2d'),pixels=c.createImageData(sw,sh);for(let y=r.y;y<r.bottom;y++)for(let x=r.x;x<r.right;x++){const i=y*w+x;if(a.owner[i]!==r.id)continue;const q=((y-r.y)*sw+x-r.x)*4,j=i*4;for(let k=0;k<4;k++)pixels.data[q+k]=data[j+k];}c.putImageData(pixels,0,0);let frost=null;if(r.kind!=='cloth'){frost=makeCanvas(sw,sh);const f=frost.getContext('2d'),v=f.createImageData(sw,sh);for(let y=0;y<sh;y++)for(let x=0;x<sw;x++){const q=(y*sw+x)*4;if(pixels.data[q+3]&&(y===0||!pixels.data[q-sw*4+3])){v.data[q]=226;v.data[q+1]=237;v.data[q+2]=247;v.data[q+3]=210;}}f.putImageData(v,0,0);}segments.push({...r,image:im,frost,w:sw,h:sh,phase:E.hash(src+'|'+r.id)%100/10});bytes+=sw*sh*(frost?8:4);}

 const filled=new Uint8Array(n),queue=new Int32Array(n);let head=0,tail=0;for(let i=0;i<n;i++)if(!a.owner[i])filled[i]=1;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;if(!a.owner[i])continue;let donor=-1;for(const q of[x>0?i-1:-1,x<w-1?i+1:-1,y>0?i-w:-1,y<h-1?i+w:-1])if(q>=0&&!a.owner[q]){donor=q;break;}if(donor>=0){for(let k=0;k<3;k++)data[i*4+k]=data[donor*4+k];a.sky[i]=a.sky[donor];filled[i]=1;queue[tail++]=i;}}
 while(head<tail){const i=queue[head++],x=i%w,y=(i/w)|0;for(const q of[x>0?i-1:-1,x<w-1?i+1:-1,y>0?i-w:-1,y<h-1?i+w:-1])if(q>=0&&!filled[q]){for(let k=0;k<3;k++)data[q*4+k]=data[i*4+k];a.sky[q]=a.sky[i];filled[q]=1;queue[tail++]=q;}}
 base.getContext('2d').putImageData(raw,0,0);totals.prepared++;totals.segments+=segments.length;totals.cloth+=segments.filter(r=>r.kind==='cloth').length;totals.roofs+=(a.profile.roofs||[]).length;totals.skyPixels+=a.skyPixels;
 return {segments,sky:a.sky,skyPixels:a.skyPixels,profile:a.profile,w,h,bytes};}
function transform(args,w,h){let sx=0,sy=0,sw=w,sh=h,dx,dy,dw,dh;if(args.length===8)[sx,sy,sw,sh,dx,dy,dw,dh]=args;else{[dx,dy]=args;dw=args[2]??w;dh=args[3]??h;}return{sx,sy,sw,sh,dx,dy,dw,dh};}
function displacement(r,s,y,reduced=false){if(reduced||s.windMph<.1)return{x:0,y:0};const u=r.kind==='cloth'?clamp((y-r.x)/Math.max(1,r.w)):clamp((r.bottom-y)/Math.max(1,r.h)),amp=Math.min(6,s.windMph*.12)*(r.kind==='cloth'?1:.65),direction=-Math.sin(s.windDegrees*Math.PI/180);return{x:direction*amp*u*(.72+.28*Math.sin(s.elapsed*1.8+r.phase)),y:Math.sin(s.elapsed*(r.kind==='cloth'?3:1.4)+r.phase+y*.02)*amp*u*.2};}
function draw(c,original,rec,args,s){const p=rec.scenery230;if(!p)return false;const t=transform(args,p.w,p.h);if(t.dx+t.dw<0||t.dx>960||t.dy+t.dh<0||t.dy>540)return true;const reduced=!!root.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 c.save();c.beginPath();c.rect(t.dx,t.dy,t.dw,t.dh);c.clip();c.translate(t.dx-t.sx*t.dw/t.sw,t.dy-t.sy*t.dh/t.sh);c.scale(t.dw/t.sw,t.dh/t.sh);
 const band=(r,...a)=>{original.call(c,r.image,...a);if(r.frost&&s.snowCover>.002){const alpha=c.globalAlpha;c.globalAlpha*=s.snowCover;original.call(c,r.frost,...a);c.globalAlpha=alpha;}};for(const r of p.segments){if(r.right<t.sx||r.x>t.sx+t.sw)continue;if(r.kind==='cloth'){for(let x=0;x<r.w;x+=3){const d=displacement(r,s,r.x+x,reduced),strip=Math.min(3,r.w-x);band(r,x,0,strip,r.h,r.x+x+d.x,r.y+d.y,strip,r.h);}}else for(let y=0;y<r.h;y+=8){const d=displacement(r,s,r.y+y,reduced),strip=Math.min(8,r.h-y);band(r,0,y,r.w,strip,r.x+d.x,r.y+y+d.y,r.w,strip);}}
 if(s.rain>.01){c.strokeStyle='rgba(193,226,244,'+Math.min(.6,s.rain*.65)+')';c.lineWidth=.8*t.sw/t.dw;c.beginPath();for(const line of p.profile.roofs||[]){const [ax,ay,bx,by]=line,count=Math.max(2,Math.floor(Math.abs(bx-ax)*p.w/23));for(let i=0;i<=count;i++){const u=i/count,x=(ax+(bx-ax)*u)*p.w,y=(ay+(by-ay)*u)*p.h,age=(s.elapsed*2+i*.37)%1,len=8+18*s.rain;c.moveTo(x,y+age*len);c.lineTo(x-Math.sin(s.windDegrees*Math.PI/180)*s.windMph*.09,y+age*len+5);}}c.stroke();}
 c.restore();return true;}
function release(rec){for(const r of rec.scenery230?.segments||[]){r.image.width=r.image.height=1;if(r.frost)r.frost.width=r.frost.height=1;}}
root.Scenery230={recipes,recipe,analyze,prepare,draw,release,displacement,transform,stats:()=>({...totals})};
})(typeof window!=='undefined'?window:globalThis);
