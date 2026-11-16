/* Reference folding knife, registered to the existing hand and tip convention. */
(function(r){'use strict';const S=r.PolishedSprites,im=new Image();let draws=0;const ready=new Promise((yes,no)=>{im.onload=yes;im.onerror=()=>no(Error('Standard knife363 unavailable'));im.src='assets/agent363/knife.webp';});S.ready=Promise.all([S.ready,ready]);
function draw(c,x=0,y=0,angle=0,length=24){if(!im.complete||!im.naturalWidth)return false;const grip=.24*im.width,scale=(length+4)/(im.width-grip);c.save();c.translate(x,y);c.rotate(angle);c.imageSmoothingEnabled=true;c.drawImage(im,-grip*scale,-im.height*scale/2,im.width*scale,im.height*scale);c.restore();draws++;return true;}
r.StandardKnife363={image:im,ready,draw,get draws(){return draws;},gripFraction:.24,tipLength:length=>length+4};
})(globalThis);
