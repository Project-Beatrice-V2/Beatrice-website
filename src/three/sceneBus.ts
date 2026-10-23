import type { SceneState } from './state';

interface SceneHandle { level: number; target: SceneState; state: SceneState }

// Tiny shared handle so sections can talk to the background scene
// (e.g. the hero's microphone button) without prop drilling.
export const sceneBus: {
  scene: SceneHandle | null;
  setLevel: (v: number) => void;
} = {
  scene: null,
  setLevel(v: number) {
    if (this.scene) this.scene.level = v;
  },
};

/** Serialises a scene keyframe for a section's `data-scene` attribute. */
export function sceneAttr(state: Partial<Record<'morph' | 'chaos' | 'x' | 'y' | 'z' | 'opacity' | 'hue' | 'mono', number>>, at = 0.5) {
  return { 'data-scene': JSON.stringify(state), 'data-scene-at': String(at) };
}
