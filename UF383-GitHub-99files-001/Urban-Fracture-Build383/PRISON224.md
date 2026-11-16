# Build 224 — Prison campaign

Recoverable checkpoint: `checkpoint-before-prison224` at `c7c42ddbed4c71d8016384d37c294fdc62df1771` (Build223). Pre-change findings are in PRISON224-AUDIT.md. The existing Site and all prior routes remain in place.

## Route

The Slums Tavern ending now continues into the prison after its existing completion pause. Colt's alternate route still leads to the Subway endpoint. Scene Select also offers every prison checkpoint directly; restart/retry preserves the selected hero and section.

| Scene | Content and progression |
|---|---|
| Intake yard | Barbed-wire perimeter fence, guard watchtowers, finite mixed encounters |
| Recreation yard | Barbell bench presses, weights, pull-up structures, armed and unarmed Flint |
| Mess hall | Inmate dining benches, steam-table serving line, kitchen service door, native destructible metal tables |
| Facilities hall | Optional Infirmary, Commissary and Laundry doors; forward route can skip all three |
| Infirmary | Room fight and medical supplies |
| Commissary | Room fight and valuable supplies |
| Laundry | Industrial washers, room fight and health reward |
| Security checkpoint | Closed gate; Security Office is the only available GO destination before release |
| Security office | Ordinary Guards, a130HP heavy Security Guard, Kevin; clear first, then press Up at the switch |
| Armory | Optional rear room after the monitor scene; full heal, treasure and extra life, all one-time identities |
| Cell Block C | Open cells, C sign, background guard/inmate fighting; authored difficult finale; money and food |
| Cell Block B | Different lineup/finale, B sign; jewelry and full heal |
| Cell Block A | Different lineup/finale, A sign; food, phone and extra life |
| Administration | Office-lined corridor and final approach to the warden's office |
| Warden's office | Corrupt warden present behind his desk; dialogue and clearly pending confrontation |

No warden attacks, health budget or victory award were invented. His boss design is intentionally pending the user's later specification. The kitchen is a visible service door in the mess hall, not another mandatory room.

## Optional facilities and security sequence

Facility GO signs appear only after the hallway's encounters finish. A room has its own finite fight and guaranteed reward. After its enemies settle and its supplies are collected, the hero automatically returns to the same cleared hallway. The completed room's GO sign disappears. Cleared actors, encounter records and pickup objects are restored rather than recreated on revisits.

Native health pickups normally remain uncollectible at full HP. Tagged prison supplies can instead be secured for250 points at full HP, preventing a healthy hero from being trapped waiting to collect a health pack. Injured heroes and Gunner retain normal healing/retrieval behavior. Guaranteed rewards plus existing room drops present at room-clear are included in the room's collection gate.

The checkpoint's physical boundary stays closed until the security-office enemies, including Security, are defeated and the hero presses the gate-release switch. The switch uses a committed interaction, then a12-second monitor scene shows all three blocks' open doors and fighting. The hero decides to quell the riot. Input remains locked for that scene; the shared world clock continues. Armory and checkpoint exits become available afterward. The open checkpoint leads to the downstairs access and automatically transitions into Cell Block C. Each block's end automatically leads to the next after its final encounter is defeated and the hero reaches the exit.

## Shared systems

`prison224.js` is campaign content on the existing ZONES/scenes71/reset/spawn/transition hooks. `prison-view224.js` supplies world-locked pixel architecture, equipment, monitor feeds, open-cell gates and separate background fighting. A four-entry static panorama cache bounds new scenery memory; monitor and riot animation remain separate and honor reduced motion. Background fighters never enter gameplay enemy lists, damage, target selection, wave counts or Director reservations.

Adaptive222 and LockedBattles222 remain the only encounter/arena controllers. Prison sections register explicit pools; ordinary sections use shared spawning. Cell blocks reserve one ordinary lock and one authored finale lock, with three final regular/strong enemies and no boss selection. The small `scriptedRow` configuration predicate keeps finale rows out of adaptive groups without a competing state machine. Optional facilities/security office each use one scripted lock. No section exceeds two locks. Existing visible-arena admission, fixed camera, living-enemy membership and recovery-aware reentry are retained, including Grab223 protection and memory.

The native Smart Combat Director148 retains Normal's three-point/two-commitment budget. All heroes, counter gates, directional throws, full throw damage, temporary anti-regrab protection and synchronized recovery remain unchanged. Existing Slums, story branches and weather/controllers are preserved.

The two outdoor yards enroll through EnvironmentController162. Indoor scenes use the same world clock/seed while suppressing outdoor rain/snow exposure. No scene-specific time or weather reset is introduced.

## Enemies and Flint profile

The permitted cast is Marcus, Kevin, Frankie, Bruno, Security Guard, Jesse, Carmen, ordinary Prison Guards and Flint. Ordinary Guards reuse Marcus's existing fists/kick controller with permanent knife drawing disabled, the existing male uniform art, REGULAR grab rules and no heavy flags. Security Guard uses Casino192/Security216's existing130HP heavy framework. No duplicate enemy AI was created.

Flint now has a20% born-unarmed chance on native financial/general spawns, rolled once per instance, plus an explicit `flintUnarmed` content spawn. It uses the existing fists/front-kick fallback and dedicated full-body unarmed art from186; weapon attacks remain disabled and no weapon regenerates. Prison pools explicitly include the unarmed variant. Its adaptive identity has complexity2; armed Flint retains his existing weapon definitions, range and recovery. Flint remains REGULAR under Grab223. The visible profile now mentions the unarmed variant.

## Verification

Run `node tests/prison224-all.cjs`; PRISON224-results.json records the completed runs. Coverage includes:

- All six heroes through the complete route, all optional facilities and all C/B/A finales; return identities, disappearing GO signs, full-health supplies and no repeated armory loot.
- Actual Slums completion-pause arrival, untouched Subway branch, direct starts and checkpoint retries.
- Six heroes across36 live15-second encounters, native Director pressure/admission, ordinary/heavy Guard separation, lane bounds, no GO during combat and no duplicate actors.
- Unarmed Flint's permanent fists/kick fallback at30/60/120Hz, no invisible weapon attacks/armor and once-only20% spawn boundary.
- Real walking/camera scrolling through an exit; out-of-arena recovery/reentry preserving the same actor and universal grab state.
- Existing encounter/script/mixed/rollout and Grab223 contracts with Prison224 active; established26-suite combat checks, gamepad/DSX/controller157 and dynamic environment regressions.

Browser QA reviews the yard, recreation equipment, open-cell riot scenery, security office/monitors, mess hall, warden endpoint and main game Scene Select integration. F9 includes `prison224`; hidden prison224.html offers scene/hero staging, frame stepping and diagnostic controls. A full human Normal-difficulty balance playthrough and physical controller feel remain unverified.
