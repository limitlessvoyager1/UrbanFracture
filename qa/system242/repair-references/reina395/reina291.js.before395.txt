/* Reina's approved bright-blue garment palette; native pose geometry and clocks stay intact. */
(function(root){'use strict';const S=root.PolishedSprites,previous=S.draw,cache=new WeakMap,painted=new WeakSet;
function palette(v){let changed=0;for(let i=0;i<v.length;i+=4){const r=v[i],g=v[i+1],b=v[i+2];if(v[i+3]&&b>35&&b>r*1.35&&b>g*1.18&&g<140){const shade=Math.min(1,b/90),light=Math.max(0,b-90)/165*.45;v[i]=Math.round(255*light);v[i+1]=Math.round(149*shade+106*light);v[i+2]=Math.round(253*shade+2*light);changed++;}}return changed;}
function image(im){if(!im||painted.has(im))return im;if(cache.has(im))return cache.get(im);const w=im.naturalWidth||im.width,h=im.naturalHeight||im.height;if(!w||!h)return im;const cv=document.createElement('canvas');cv.width=w;cv.height=h;const c=cv.getContext('2d',{willReadFrequently:true});c.drawImage(im,0,0);const d=c.getImageData(0,0,w,h);if(!palette(d.data)){cache.set(im,im);return im;}c.putImageData(d,0,0);painted.add(cv);cache.set(im,cv);return cv;}
function context(c){if(c.reina291Base)return c;return new Proxy(c,{get(o,k){if(k==='reina291Base')return o;if(k==='drawImage')return(im,...args)=>o.drawImage(image(im),...args);const v=o[k];return typeof v==='function'?v.bind(o):v;},set(o,k,v){o[k]=v;return true;}});}
S.draw=function(c,f,...args){return previous(f.type==='reina'?context(c):(c.reina291Base||c),f,...args);};
root.ReinaPalette291={palette,image,prepared:im=>painted.add(im),hex:'#0095FD'};
})(globalThis);
