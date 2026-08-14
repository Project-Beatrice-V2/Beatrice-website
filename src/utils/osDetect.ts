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

export function getLatestReleaseUrl(repoName: string): string {
  return `https://github.com/Project-Beatrice-V2/${repoName}/releases/latest`;
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
