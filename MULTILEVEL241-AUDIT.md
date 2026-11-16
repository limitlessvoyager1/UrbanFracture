# Build241 audit before changes
Checkpoint checkpoint-before-stabilization241 at3afc21e19906324d9d06794c6d85bc739e4638b4.

Confirmed sources: attached multi-level report; supplied casino/HUD screenshots224409/224205; current active source and same-controller simulated walkthroughs. Storage walkthrough completes with all required enemies, so an unconditional completion defect is not established. Diagnostics must distinguish live/offscreen/pending/locked/scripted state rather than force-clear it. Uptown promenade also progresses in a controlled walking run. Store-mall Up trigger requires moving up to door, not remaining at mid-depth; improve navigation diagnostics, retain wave gates.

| Issue | Confirmed cause / active implementation | Repair target |
|---|---|---|
| Lab/Uptown brown obstruction | lab-view149 side-wall polygons extend380px at top and195at floor on each side | Thin connected sidewalls and matching Lab149 occlusion/bounds; keep both actual doorways |
| Lab missing scientists | Scientist rows exist, but adaptive alternatives may replace them after story unlock; native lab methods and adaptive spawn paths differ | Pin required scientist rows through existing222 selection/config; one scientist at a time with basic supports |
| Lab size/gait | Native standing/gait atlases exist,127local height; noncombat workers separate152world; arson Ethan correctly receiveslabWorker166; scientist AI fails to advance shared entry, leaving an unkillable offscreen required actor | Source-height row scales, native gait, preserve dynamic arson scientist identity, no new AI |
| Fire event | Native149 lifecycle exists with45s timer and45-basedcompression; right door renderer only draws entrydoor in workroom |30s, finite basic wave, both doors connected, rightdoor visiblyblocked, matching fire bands |
| Security size | Type=enforcer inherits1.15 outer scale; special grab pose assembles .48legs+.70upper yielding additional height | Shared1.10Security actor factor and connected whole grab pose;130HP/AI unchanged |
| Casino props |150px tall slots; narrow25×18collider; card tables solid inplayfield | Adult-size fixed-height slots with measured footprints, decorative tables behindcombat |
| Casino windows | Onlysuite window mask;rain canvas reset by per-frame resize; no snow/celestial, baked night skyline | Explicit masks onfloor/suite, authoritative sky/precipitation clip, preserveindoorlighting |
| HUD | Scoreanchor580;charge/Blitz620 | Shared center anchor fromexisting960logical layout |
| Kevin getup | Legacy getup blends/rotates ownverticaloffsets; pixel-root grounding onlyconditionally enabled | Shared anchoredrender forKevin get-up; no logicalcoordinate/timing changes |
| Shared entries |240 already usesphysical displacement/gait globally | Preserve and regress, scientist entries also use native entry |
