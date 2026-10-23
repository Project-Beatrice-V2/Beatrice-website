// People credited on the About page.

export interface Contributor {
  id: string;
  name: string;
  role: string;
  githubUrl?: string;
  websiteUrl?: string;
  avatarUrl?: string;
  bio: string;
  isYou?: boolean;
}

export const CONTRIBUTORS: Contributor[] = [
  {
    id: 'jatin-pandey',
    name: 'Jatin Pandey (SatiricalGuru)',
    role: 'Beatrice Voice Changer Creator & Ecosystem Lead',
    githubUrl: 'https://github.com/SatiricalGuru',
    websiteUrl: 'https://huggingface.co/SatiricalGuru/beatrice-voice-models',
    avatarUrl: 'https://github.com/SatiricalGuru.png',
    bio: 'Creator & Lead Developer of Beatrice Voice Changer, Project Beatrice V2 website, Hugging Face Model Hub, and cross-platform native installer distribution.',
    isYou: true,
  },
  {
    id: 'prj-beatrice-core',
    name: 'Project Beatrice Core Team',
    role: 'Original Core Authors & Neural Architecture Creators',
    websiteUrl: 'https://prj-beatrice.com/',
    githubUrl: 'https://github.com/prj-beatrice',
    avatarUrl: '/contributors/prj-beatrice.png',
    bio: 'Creators of the core Beatrice neural inference engine, low-latency VST plugin, and original PyTorch architecture.',
  },
  {
    id: 'rei-yumesaki',
    name: 'Rei Yumesaki (夢前黎)',
    role: 'Tsukuyomi-chan Project Producer & Partner',
    websiteUrl: 'https://tyc.rei-yumesaki.net/',
    avatarUrl: '/contributors/tsukuyomichan.jpg',
    bio: 'Producer of Tsukuyomi-chan virtual character and official voice dataset partner for Project Beatrice.',
  },
  {
    id: 'bindume-marukoro',
    name: 'Bindume & Marukoro (瓶詰め / 丸ころ)',
    role: 'Tokinashigure Character Producers & Voice Talent',
    websiteUrl: 'https://bindumechan.wixsite.com/shigure222',
    avatarUrl: '/contributors/tokinashigure.jpg',
    bio: 'Creators and voice actor for the official Tokinashigure Beatrice voice model edition.',
  },
  {
    id: 'leo-carvalho',
    name: 'Leo Carvalho',
    role: 'OLUNE Character Producer & Voice Actor',
    websiteUrl: 'https://olunered.carrd.co/',
    avatarUrl: '/contributors/olune.jpg',
    bio: 'Producer and voice actor for the official OLUNE voice conversion model edition.',
  },
  {
    id: 'aq2r-w-okada',
    name: 'aq2r & w-okada',
    role: 'Standalone Beatrice Client & VCClient Developers',
    githubUrl: 'https://github.com/w-okada/voice-changer',
    avatarUrl: '/contributors/w-okada.png',
    bio: 'Developers of standalone Beatrice audio client integration tools and VCClient real-time voice conversion engine.',
  },
  {
    id: 'fierce-cats',
    name: 'Fierce Cats Team',
    role: 'Beatrice Trainer PyTorch Toolkit Maintainers',
    websiteUrl: 'https://huggingface.co/fierce-cats/beatrice-trainer',
    avatarUrl: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    bio: 'Maintainers of the official Hugging Face PyTorch Beatrice model training toolkit.',
  }
];
