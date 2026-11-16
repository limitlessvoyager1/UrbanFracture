# Prison route audit and checkpoint

Baseline c7c42ddbed4c71d8016384d37c294fdc62df1771 / Build223, tag checkpoint-before-prison224, before implementation.

- Slums204 already routes the Tavern ending to an empty Prison arrival (section23), after the Slums completion pause. Colt routes to Subway and must remain unchanged.
- Native ZONES/scenes71, reset/spawn/transition hooks and environment162 support additional configured sections without new combat/input controllers.
- Adaptive222/LockedBattles222 already own selection, pressure-compatible arena locks, finite wave membership and recovery-aware reentry. Reuse them; add a declarative scripted-row predicate for authored cell-block finales rather than duplicate controllers.
- Casino192.guard and Security216 implement the heavy130HP Security Guard. Ordinary Guards can use native Marcus/thug fists and kick behavior and existing male Security art without heavy combat flags. Keep these distinct.
- Weaponless Flint already has fists/kick fallback in Niko186, with two dedicated full-body atlases. Missing feature is a born-unarmed spawn option/profile enrollment, not another moveset.
- Native health pickups cannot be collected at full health. Optional-room auto-return must not wait forever on a full-health pickup; tagged reward supplies can be secured for points at full health.
- Hallway/office revisits must restore the same cleared scene state and original pickup identities, not recreate enemies/rewards/encounter locks.
- No warden combat design is authorized yet; present the corrupt warden and a clearly pending confrontation, without inventing boss attacks or awarding a false victory.
