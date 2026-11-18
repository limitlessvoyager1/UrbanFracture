(function (root) {
  'use strict';

  const maps = new WeakMap();
  const activeContexts = new WeakSet();
  const sheets = [];
  let selectedPlayer = () => false;
  let available = false;
  const portraitImage = new Image();
  const baseRendererReady = root.PolishedSprites.ready;

  function load(image, path) {
    return new Promise(resolve => {
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = path;
    });
  }

  function active(actor) {
    return available && actor?.type === 'reina' &&
      (actor.costume === 'royal-uniform' || selectedPlayer(actor));
  }

  function register(image, rectangle, id) {
    if (!image) return;
    let keys = maps.get(image);
    if (!keys) maps.set(image, keys = new Map());
    keys.set(signature(rectangle), id);
  }

  function signature(rectangle) {
    return rectangle ? rectangle.map(Math.round).join(',') : 'whole';
  }

  function installBindings() {
    const view = root.ReinaView354;
    for (const row of view.prepared) register(row.image, null, row.id);
    for (const [id, row] of view.rare) register(row.image, null, id);
    for (const q of root.ReinaBindings354()) {
      if (q.owner) register(q.owner[q.key], q.rect, q.id);
    }
  }

  function lookup(image, rectangle) {
    const key = signature(rectangle);
    const bound = maps.get(image)?.get(key);
    if (bound) return bound;
    const url = image.reinaCostumeSource || image.src;
    if (!url) return undefined;
    const path = url.match(/assets\/[^?]+/)?.[0];
    return root.ReinaUniformData?.sources[path]?.[key];
  }

  function sourceBounds(image, rectangle, id, cropWidth, cropHeight) {
    let byKey = boundsCache.get(image);
    if (!byKey) boundsCache.set(image, byKey = new Map());
    if (byKey.has(id)) return byKey.get(id);
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(cropWidth);
    canvas.height = Math.ceil(cropHeight);
    const c = canvas.getContext('2d', {willReadFrequently:true});
    if (rectangle) c.drawImage(image,...rectangle,0,0,canvas.width,canvas.height);
    else c.drawImage(image,0,0);
    const {width,height} = canvas;
    const {data} = c.getImageData(0,0,width,height);
    const count = width*height;
    const seen = new Uint8Array(count);
    const queue = new Int32Array(count);
    const components = [];
    let largest = 0;
    for (let start=0; start<count; start++) {
      if (seen[start] || data[4*start+3] <= 72) continue;
      seen[start] = 1;
      queue[0] = start;
      let tail=1,left=width,top=height,right=0,bottom=0;
      for (let head=0; head<tail; head++) {
        const pixel=queue[head],x=pixel%width,y=Math.floor(pixel/width);
        left=Math.min(left,x);
        top=Math.min(top,y);
        right=Math.max(right,x+1);
        bottom=Math.max(bottom,y+1);
        for (const next of [x>0?pixel-1:-1,x<width-1?pixel+1:-1,pixel-width,pixel+width]) {
          if (next<0 || next>=count || seen[next] || data[4*next+3]<=72) continue;
          seen[next]=1;
          queue[tail++]=next;
        }
      }
      largest=Math.max(largest,tail);
      components.push({left,top,right,bottom,size:tail});
    }
    let left=width,top=height,right=0,bottom=0;
    for (const component of components) {
      if (component.size < Math.min(largest,Math.max(6,largest*.008))) continue;
      left=Math.min(left,component.left);
      top=Math.min(top,component.top);
      right=Math.max(right,component.right);
      bottom=Math.max(bottom,component.bottom);
    }
    const bounds = left < right ? [left/width,top/height,(right-left)/width,(bottom-top)/height] : null;
    byKey.set(id,bounds);
    return bounds;
  }

  const boundsCache = new WeakMap();
  function scope(context, actor, draw) {
    if (!active(actor) || activeContexts.has(context)) return draw();
    const original = context.drawImage;
    activeContexts.add(context);
    context.drawImage = function (image, ...args) {
      const rectangle = args.length === 8 ? args.slice(0,4) : null;
      const id = lookup(image, rectangle);
      const row = id && root.ReinaUniformData.frames[id];
      if (!row) return original.call(this,image,...args);
      const width = rectangle ? rectangle[2] : image.width;
      const height = rectangle ? rectangle[3] : image.height;
      const [x,y,w,h] = args.length === 2 ? [...args,width,height] : args.slice(-4);
      const b = sourceBounds(image,rectangle,id,width,height);
      if (!b) return original.call(this,image,...args);
      const [sheet,...art] = row;
      // Preserve the artist's proportions, fit by height, and retain the source foot anchor.
      const scale=b[3]*h/art[3],dw=art[2]*scale,dh=art[3]*scale;
      this.imageSmoothingEnabled=true;this.imageSmoothingQuality='high';
      return original.call(this,sheets[sheet],...art,x+(b[0]+b[2]/2)*w-dw/2,y+(b[1]+b[3])*h-dh,dw,dh);
    };
    try { return draw(); }
    finally {
      context.drawImage = original;
      activeContexts.delete(context);
    }
  }

  const blendFrames = new WeakMap();
  function blendFrame(actor, frame) {
    if (!active(actor)) return frame;
    if (blendFrames.has(frame.image)) return blendFrames.get(frame.image);
    const id = lookup(frame.image, null);
    if (!id || !root.ReinaUniformData.frames[id]) return frame;
    const canvas = document.createElement('canvas');
    canvas.width = frame.image.width;
    canvas.height = frame.image.height;
    const context = canvas.getContext('2d');
    scope(context,actor,() => context.drawImage(frame.image,0,0));
    const result = {...frame,image:canvas};
    blendFrames.set(frame.image,result);
    return result;
  }

  function portrait(context,actor,x,y,size) {
    if (!active(actor)) return false;
    context.drawImage(portraitImage,x,y,size,size);
    return true;
  }

  const data = root.ReinaUniformData;
  const ready = data ? Promise.all([
    load(portraitImage,'assets/reina399/royal-portrait.webp'),
    ...data.sheets.map((path,index) => load(sheets[index] = new Image(),path)),
    baseRendererReady
  ]).then(results => {
    if (results.slice(0,-1).some(result => !result)) return false;
    installBindings();
    available = true;
    return true;
  }) : Promise.resolve(false);

  root.ReinaCostume = {
    ready,scope,portrait,blendFrame,
    get available() { return available; },
    selectPlayer(predicate) { selectedPlayer = predicate; }
  };
})(globalThis);
