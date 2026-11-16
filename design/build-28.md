# Build 28 — combat audio, counter throws, and staging

Marcus/Kevin70HP; Bruno125HP (up15, damage unchanged). Jackal starts y382 on a background crate whose base is above the combat lane, escorts at405. Jump travels82depth units to y464, followed by a shared1.2s approach. Crate keeps its original x after the scene and has no gameplay collision.

Counter success clears retained guarding/block count/invulnerability. Direction+Attack commits front/back throw; L2/manual-grab during a successful counter explicitly commits a forward throw (or uses held direction), rather than releasing the grip. Normal hold release unchanged. Regression cases cover both directions and L2 against Marcus, Bruno, Jackal through the single landing.

Nine venue patrons, sizes increased about14–17%; seated bar customers and table patrons. Explicit stays flags leave some patrons seated during combat while others flee when fighting approaches.

Original synthesized WebAudio effects: two standard male cries, deeper heavy/boss cry, female cry, Reina hurt grunt and breath. These are procedural retro voices, not recorded voice actors. Single deathCry event per defeat including knee and blocked-damage paths. Layered noise transient plus low-frequency body gives punch/kick impact, distinct muffled knee, ground thud and swept flame burst for each blitz contact. Slightly larger blue foot glow with flame tongue. Low-health hurt volume increases below30%; breath interval4.5s below50%,2.5s below25%. Audio respects Sound toggle and ambient timers pause with gameplay. Noise buffers cached, nodes stopped.

Validation:30 test suites pass including input/controller regressions,70/70/125balance, counter throw landing, intro/approach, patrons stay/flee, one death cry and completed/muted audio graphs. Full ordinary-input route completed42kills447s0retries110HP. Browser verified background crate, larger patrons and audio initialization without application errors. Physical DualSense unavailable; synthesized timbre has not been evaluated as a recorded performance.

Background music discussed, not added: user can supply an owned/licensed looping MP3/OGG, independent music volume and optional district/boss crossfades.
