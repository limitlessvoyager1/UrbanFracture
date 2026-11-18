"""Repack the approved original Royal Uniform plates, without generating poses."""
import sys,json,types,runpy
from pathlib import Path
import numpy as np
root=Path(sys.argv[1]); stage=Path(sys.argv[2])
def label(a,structure=None):
    a=np.asarray(a,dtype=bool); h,w=a.shape; out=np.zeros((h,w),np.int32); parent=[0]
    def find(n):
        while parent[n]!=n: parent[n]=parent[parent[n]]; n=parent[n]
        return n
    last=[]
    for y in range(h):
        bits=np.diff(np.r_[False,a[y],False].astype(np.int8)); starts=np.flatnonzero(bits==1); ends=np.flatnonzero(bits==-1); current=[]; j=0
        for l,r in zip(starts,ends):
            while j<len(last) and last[j][1]<l: j+=1
            ids=[]; k=j
            while k<len(last) and last[k][0]<=r:
                ids.append(find(last[k][2])); k+=1
            n=min(ids) if ids else len(parent)
            if not ids: parent.append(n)
            for q in ids: parent[q]=n
            out[y,l:r]=n; current.append((l,r,n))
        last=current
    lut=np.array([find(i) for i in range(len(parent))],np.int32)
    return lut[out],len(parent)-1
def dilate(a,iterations=1):
    for _ in range(iterations):
        z=np.pad(a,1); a=z[1:-1,1:-1]|z[:-2,1:-1]|z[2:,1:-1]|z[1:-1,:-2]|z[1:-1,2:]
    return a
def closing(a,iterations=1):
    a=dilate(a,iterations)
    for _ in range(iterations):
        z=np.pad(a,1); a=z[1:-1,1:-1]&z[:-2,1:-1]&z[2:,1:-1]&z[1:-1,:-2]&z[1:-1,2:]
    return a
nd=types.SimpleNamespace(label=label,binary_dilation=dilate,binary_closing=closing)
sys.modules['scipy']=types.SimpleNamespace(ndimage=nd)
source=(root/'tools/reina-royal-uniform/import.py').read_text()
source=source.replace('size = 90','size = 224').replace('tiles = 12','tiles = 8').replace('assets/reina-royal-{i}.webp','assets/reina399/royal-{i}.avif')
source=source.replace('sheet.save(root/"dist"/name,quality=46,method=4,exact=True)', 'sheet.save(directory / f"packed-{i}.png")\n        sheet.save(root/"dist"/name,quality=52,speed=2,subsampling="4:4:4")')
(root/'dist/assets/reina399').mkdir(exist_ok=True)
sys.argv=['import.py',str(stage),'--write']
exec(compile(source,str(root/'tools/reina-royal-uniform/import.py'),'exec'),{'__file__':str(root/'tools/reina-royal-uniform/import.py')})
