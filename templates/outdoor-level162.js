/* Add art/geometry only. Environment Controller registers this definition immediately.
   Use the existing gameplay scene loader for collision/enemy/progression data.
   Enter this visual definition alongside that loader; NEVER create a new Environment. */
const newOutdoorLevel = EnvironmentController162.defineOutdoor({
  id: 'replace-with-level-id',
  geometry: {start: 0, end: 2200, floor: 436},
  surface: 'concrete', // 'soil' uses damp ground instead of broad pavement reflections
  skyHeight: 275,
  assets: [
    {kind: 'streetlight', x: 420, y: 250, w: 16, h: 12},
    {kind: 'window', x: 680, y: 235, w: 24, h: 30},
    {kind: 'puddle', x: 330, y: 475, w: 38, h: 8},
    {kind: 'reflection', x: 420, y: 495, w: 16, h: 35}
  ],
  drawScenery(ctx, game) {
    // Draw world art at worldX - game.camera, with transparent sky where appropriate.
    // Shared template supplies sky/clouds, light, precipitation, fog and wetness.
  }
});
// In your scene loader: game.enterEnvironmentLevel162(newOutdoorLevel);
// The main renderer now picks up this art and its environmental layers automatically.
