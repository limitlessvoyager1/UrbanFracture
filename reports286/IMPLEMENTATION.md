# Niko front grab, forward + Attack — Build286

The supplied 8.67-second recording shows a leg catch, hip pivot and rolling leg takedown into a prone single-leg hold. The new move replaces the former throat/wrist-led front-forward takedown. It does not change front-away armbar/stomp or rear-away reverse DDT.

One native132-frame action at60Hz owns Niko and the victim. Both actors sample the same action time, source-hand ankle socket, combat plane and contact events. Fourteen stages: catch0, lift8, pivot16, roll24, descent34, floor44, seated control52, short hold64, snap78, pain recoil82, release88, hands planted96, kneel108, standing recovery120; actionable132. The hold lasts14frames, then the swift4-frame snap. The grounded enemy has a recoil/wince/grimace; no pin attempt or long submission is included.

Base14 damage remains, split8 at actual landing and6 at the snap. The snap can apply leg injury at65% against regular enemies. Existing category chance/duration resistance, injury bonus cap, no stacking, stronger-enemy grab thresholds, Baylor's specific grab rule and deferred defeat remain native. No extra counter/controller or simulation scheduler is installed. Mandatory recovery completes before actions resume.

Hero:12 new authored wholebody keyposes, fixed148/316source scale, head/hip/hand controls for inbetween articulation. Enemy: one cached source body retaining lifetime appearance through the rolling fall, then its own native prone art articulated at hip/knee/ankle. Shared ankle remains attached during the short hold and snap. Ground vertices are constrained above the combat plane. Each cache holds at most64identities. Native floor/cleanup handles recovery, death and interruption.

The previous13 dedicated throat-only283assets are retained byte-identically outside the deploy folder. Other283art remains. Aliased legacy descriptors avoid missing asset requests. This creates space below the hosting expansion cap without recompressing unrelated approved artwork. Legacy283 runtime/view assertions now exercise armbar; the intentionally replaced throat assertions are superseded by the stronger286 roster/frame tests. Historical283art checks still read retired original files.

Practice: Rehearse leg takedown stages one opponent then queues the actual front-forward input through native capture. Heavy/boss eligibility is not bypassed. Existing pause/frame stepping remains the only game clock. Rehearsal displays actual action frame/phase.

Rollback: checkpoint-before-legthrow286 (63113537621677e92ccfad79b853d6b798db858f). Revert this change through version control and republish the checkpoint archive; do not reset approved balance via experimental-default controls.

Limits:132 simulation frames are authored/interpolated from12hero keyposes and enemy source meshes; these are not132 separately hand-painted frames per costume. Automated geometry/runtime tests do not constitute artistic approval of every costume or physical controller certification.
