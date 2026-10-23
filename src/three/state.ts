// Scene state shared by the page and the (lazily loaded) WebGL scene, kept
// separate so importing it doesn't pull three.js into the main bundle.

export interface SceneState {
  morph: number;   // 0 orb → 1 wave → 2 ring
  chaos: number;   // orb surface turbulence: ~1.2 raw voice, ~0.15 converted
  x: number;       // world-space offset of the shape
  y: number;
  z: number;       // camera distance
  opacity: number; // overall particle opacity
  hue: number;     // 0 aurora palette → 1 ember (warm) palette
  mono: number;    // 0 colour → 1 desaturated ("raw" voice)
}

export const DEFAULT_STATE: SceneState = { morph: 0, chaos: 0.55, x: 0, y: 0, z: 9, opacity: 1, hue: 0, mono: 0 };

export function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}
