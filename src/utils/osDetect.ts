import type { OperatingSystem } from '../types';

export function detectOS(): OperatingSystem {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = (window.navigator.platform || '').toLowerCase();

  if (platform.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os x')) {
    return 'macOS';
  }

  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'Windows';
  }

  return 'unknown';
}

// Bump these when a new release is published.
const MACOS_VERSION = '2.1.1';
const WINDOWS_VERSION = '2.0.0';

const MACOS_DMG_URL = `https://github.com/Project-Beatrice-V2/Beatrice-voicechanger-macos/releases/download/v${MACOS_VERSION}/Beatrice.Voice.Changer-${MACOS_VERSION}-arm64.dmg`;
const WINDOWS_SETUP_URL = `https://github.com/Project-Beatrice-V2/Beatrice-voicechanger-windows/releases/download/v${WINDOWS_VERSION}/Beatrice-Voice-Changer-Setup-${WINDOWS_VERSION}.exe`;

export function getDirectDownloadUrl(repoName: string, os?: 'macOS' | 'Windows'): string {
  switch (repoName) {
    case 'Beatrice-voicechanger-macos':
      return MACOS_DMG_URL;
    case 'Beatrice-voicechanger-windows':
      return WINDOWS_SETUP_URL;
    case 'Beatrice-trainer-macos':
      return 'https://github.com/Project-Beatrice-V2/Beatrice-trainer-macos/archive/refs/heads/main.zip';
    case 'Beatrice-trainer-windows':
      return 'https://github.com/Project-Beatrice-V2/Beatrice-trainer-windows/archive/refs/heads/main.zip';
    case 'Beatrice-dataset-webui-macos':
      return 'https://github.com/Project-Beatrice-V2/Beatrice-dataset-webui-macos/archive/refs/heads/main.zip';
    case 'Beatrice-dataset-webui-windows':
      return 'https://github.com/Project-Beatrice-V2/Beatrice-dataset-webui-windows/archive/refs/heads/main.zip';
    case 'Beatrice-voice-models':
    case 'SatiricalGuru/beatrice-voice-models':
      return 'https://github.com/Project-Beatrice-V2/Beatrice-voice-models/archive/refs/heads/main.zip';
    case 'Beatrice-colab':
      return 'https://github.com/Project-Beatrice-V2/Beatrice-colab/archive/refs/heads/main.zip';
    default:
      if (os === 'Windows') {
        return WINDOWS_SETUP_URL;
      }
      return MACOS_DMG_URL;
  }
}

export function getLatestReleaseUrl(repoName: string): string {
  return getDirectDownloadUrl(repoName);
}

export function getOrgRepoUrl(repoName: string): string {
  return `https://github.com/Project-Beatrice-V2/${repoName}`;
}

export function getAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}
