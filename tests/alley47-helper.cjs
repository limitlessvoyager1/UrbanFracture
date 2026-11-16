// Reach the unchanged crate introduction through the new prerequisite waves in structural tests.
module.exports=function startIntro(g){const ai=g.ai;g.ai=()=>{};for(let i=0;i<1200&&!g.alleyIntro;i++){for(const e of g.enemies)if(e.alleyWarmup&&e.hp>0)g.damage(e,999,1,true,{force:true});g.tick(1/60);}g.ai=ai;if(!g.alleyIntro)throw Error('Alley pre-fights did not reach introduction');};
