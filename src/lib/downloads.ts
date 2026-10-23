import { detectOS, getDirectDownloadUrl } from '../utils/osDetect';

export const MAC_URL = getDirectDownloadUrl('Beatrice-voicechanger-macos');
export const WIN_URL = getDirectDownloadUrl('Beatrice-voicechanger-windows');
export const MAC_RELEASES = 'https://github.com/Project-Beatrice-V2/Beatrice-voicechanger-macos/releases';
export const WIN_RELEASES = 'https://github.com/Project-Beatrice-V2/Beatrice-voicechanger-windows/releases';
export const ORG_URL = 'https://github.com/Project-Beatrice-V2';
export const repoUrl = (name: string) => `${ORG_URL}/${name}`;

export type DesktopOS = 'mac' | 'win';

/** Best guess at the visitor's desktop OS; Mac when unknown. */
export function primaryOS(): DesktopOS {
  return detectOS() === 'Windows' ? 'win' : 'mac';
}
