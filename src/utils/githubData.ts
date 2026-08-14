import type { RepositoryModule, PipelineStage, AudioSample, FaqItem, PretrainedVoiceModel, Contributor } from '../types';
import { getLatestReleaseUrl, getOrgRepoUrl } from './osDetect';

export { getOrgRepoUrl, getLatestReleaseUrl };

export const ORG_NAME = 'Project Beatrice V2';
export const ORG_URL = 'https://github.com/Project-Beatrice-V2';
export const HF_MODELS_URL = 'https://huggingface.co/SatiricalGuru/beatrice-voice-models';
export const ORIGINAL_WEBSITE_URL = 'https://prj-beatrice.com/';
export const LICENSE = 'MIT';
export const LATENCY_CLAIM = '~<50ms real-time inference';

export const MODULES: RepositoryModule[] = [
  {
    id: 'vc-mac',
    name: 'Beatrice Voice Changer (macOS)',
    repoName: 'Beatrice-voicechanger-macos',
    category: 'Voice Changer',
    platform: 'macOS',
    acceleration: 'Apple Silicon Metal / MPS',
    description: 'Ultra-low latency real-time voice conversion engine for macOS, hardware-accelerated with Metal and Metal Performance Shaders.',
    stars: 342,
    releaseUrl: getLatestReleaseUrl('Beatrice-voicechanger-macos'),
    repoUrl: getOrgRepoUrl('Beatrice-voicechanger-macos'),
    requirements: {
      chipGpu: 'Apple Silicon M1/M2/M3/M4 or Intel Mac with AMD GPU',
      osVersion: 'macOS 12.0 (Monterey) or later',
      ram: '8 GB unified memory minimum (16 GB recommended)'
    },
    featured: true,
  },
  {
    id: 'vc-win',
    name: 'Beatrice Voice Changer (Windows)',
    repoName: 'Beatrice-voicechanger-windows',
    category: 'Voice Changer',
    platform: 'Windows',
    acceleration: 'NVIDIA CUDA / DirectML',
    description: 'Real-time live voice transformation client for Windows, optimized for CUDA GPUs and DirectML compatible hardware.',
    stars: 518,
    releaseUrl: getLatestReleaseUrl('Beatrice-voicechanger-windows'),
    repoUrl: getOrgRepoUrl('Beatrice-voicechanger-windows'),
    requirements: {
      chipGpu: 'NVIDIA RTX 2060+ (CUDA) or DirectX 12 GPU (DirectML)',
      osVersion: 'Windows 10 / Windows 11 (64-bit)',
      ram: '8 GB RAM (16 GB recommended)'
    },
    featured: true,
  },
  {
    id: 'hf-models',
    name: 'Beatrice Pre-Trained Voice Models Hub',
    repoName: 'Beatrice-voice-models',
    category: 'Model Hub',
    platform: 'Cross-platform',
    acceleration: 'Hugging Face Hub CDN',
    description: 'Official library of high-fidelity pre-trained Beatrice voice models ready for direct download and instant live streaming.',
    stars: 840,
    releaseUrl: getLatestReleaseUrl('Beatrice-voice-models'),
    repoUrl: getOrgRepoUrl('Beatrice-voice-models'),
    requirements: {
      chipGpu: 'Compatible with all Beatrice Voice Changer clients',
      osVersion: 'macOS & Windows',
      ram: 'Direct TOML / BIN load'
    },
    featured: true,
    isHuggingFace: false,
  },
  {
    id: 'trainer-mac',
    name: 'Beatrice Model Trainer (macOS)',
    repoName: 'Beatrice-trainer-macos',
    category: 'Model Trainer',
    platform: 'macOS',
    acceleration: 'Apple Silicon MPS',
    description: 'Local neural voice model trainer for macOS. Train high-fidelity custom voice models directly on Apple Silicon MPS.',
    stars: 189,
    releaseUrl: getLatestReleaseUrl('Beatrice-trainer-macos'),
    repoUrl: getOrgRepoUrl('Beatrice-trainer-macos'),
    requirements: {
      chipGpu: 'Apple Silicon M1 Pro/Max/Ultra/M2/M3/M4',
      osVersion: 'macOS 13.0 (Ventura) or later',
      ram: '16 GB unified memory minimum'
    },
    featured: true,
  },
  {
    id: 'trainer-win',
    name: 'Beatrice Model Trainer (Windows)',
    repoName: 'Beatrice-trainer-windows',
    category: 'Model Trainer',
    platform: 'Windows',
    acceleration: 'NVIDIA CUDA / DirectML',
    description: 'High-performance local model trainer for Windows. Train custom neural voice weights using GPU hardware acceleration.',
    stars: 276,
    releaseUrl: getLatestReleaseUrl('Beatrice-trainer-windows'),
    repoUrl: getOrgRepoUrl('Beatrice-trainer-windows'),
    requirements: {
      chipGpu: 'NVIDIA RTX 3060 12GB or higher recommended',
      osVersion: 'Windows 10 / 11 (64-bit)',
      ram: '16 GB RAM (32 GB recommended)'
    },
  },
  {
    id: 'dataset-webui',
    name: 'Beatrice Dataset Web UI',
    repoName: 'Beatrice-dataset-webui-macos',
    category: 'Dataset Web UI',
    platform: 'Cross-platform',
    acceleration: 'WebAssembly / Native Audio',
    description: 'Interactive Web UI for slicing, cleaning, pitch-validating, and exporting voice datasets ready for training.',
    stars: 194,
    releaseUrl: getLatestReleaseUrl('Beatrice-dataset-webui-macos'),
    repoUrl: getOrgRepoUrl('Beatrice-dataset-webui-macos'),
    requirements: {
      chipGpu: 'Any modern 64-bit CPU',
      osVersion: 'macOS 11+ / Windows 10+',
      ram: '4 GB RAM minimum'
    },
  },
  {
    id: 'colab',
    name: 'Beatrice Cloud Colab',
    repoName: 'Beatrice-colab',
    category: 'Cloud',
    platform: 'Cloud',
    acceleration: 'Free Google Colab / Kaggle GPU',
    description: 'Pre-configured Google Colab and Kaggle Jupyter notebooks for training custom Beatrice voice models using free cloud GPUs.',
    stars: 412,
    releaseUrl: getLatestReleaseUrl('Beatrice-colab'),
    repoUrl: getOrgRepoUrl('Beatrice-colab'),
    requirements: {
      chipGpu: 'Cloud T4 / V100 / A100 GPU (Google Colab)',
      osVersion: 'Modern web browser (Chrome/Edge/Firefox/Safari)',
      ram: 'Google Drive / Colab environment'
    },
  }
];

export const PRETRAINED_MODELS: PretrainedVoiceModel[] = [
  {
    id: 'trump-v2',
    name: 'Trump Beatrice Neural Voice Model',
    author: 'SatiricalGuru',
    language: 'English (US)',
    gender: 'Male',
    sampleRate: '48kHz High-Res (5000 Steps)',
    downloadUrl: 'https://github.com/Project-Beatrice-V2/Beatrice-voice-models/archive/refs/heads/main.zip',
    description: 'Pre-trained Trump voice model checkpoint (5000 steps) with phone extractor, pitch estimator, and waveform generator binaries.',
    tags: ['Trump', '5000 Steps', 'TOML Manifest', '48kHz']
  }
];


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

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    step: 1,
    title: 'Dataset Preparation (Web UI)',
    tagline: 'Slice, Clean & Validate Voice Recordings',
    description: 'Import your raw voice recordings into the Dataset Web UI. Automatically segment long audio files, isolate clear speech, remove background noise, and export a pristine dataset optimized for neural training.',
    repoName: 'Beatrice-dataset-webui-macos',
    repoUrl: getOrgRepoUrl('Beatrice-dataset-webui-macos'),
    iconName: 'Scissors',
    features: [
      'Automatic silence-based sentence slicing',
      'Signal-to-noise ratio (SNR) quality scoring',
      'Interactive pitch & frequency spectrogram preview',
      'One-click export to Beatrice dataset manifest'
    ]
  },
  {
    step: 2,
    title: 'Model Training (Local or Cloud)',
    tagline: 'Train Custom Neural Voice Weights',
    description: 'Feed your cleaned dataset into the Beatrice Trainer. Run model training locally on Apple Silicon MPS or NVIDIA CUDA, or run for free using Google Colab GPUs without needing local hardware.',
    repoName: 'Beatrice-trainer-macos',
    repoUrl: getOrgRepoUrl('Beatrice-trainer-macos'),
    iconName: 'Cpu',
    features: [
      'MPS & CUDA accelerated PyTorch pipeline',
      'Automatic checkpoint saving & validation loss tracking',
      'Free cloud training with Google Colab notebooks',
      'Compact weight exports (~40MB per voice model)'
    ]
  },
  {
    step: 3,
    title: 'Real-Time Voice Changer',
    tagline: '<50ms Ultra-Low Latency Live Transformation',
    description: 'Load your trained voice model into the Beatrice Real-Time Voice Changer. Convert your microphone audio in real time and route it via Virtual Audio Cable into Discord, OBS Studio, games, or live streams.',
    repoName: 'Beatrice-voicechanger-macos',
    repoUrl: getOrgRepoUrl('Beatrice-voicechanger-macos'),
    iconName: 'Mic',
    features: [
      'Sub-50ms glass-to-glass audio latency',
      'Virtual Audio Cable & BlackHole driver routing',
      'Intonation & emotion preservation without pitch artifacts',
      'Built-in noise gate, equalizer & gain compression'
    ]
  }
];

export const AUDIO_SAMPLES: AudioSample[] = [
  {
    id: 'sample-1',
    title: 'Randomise Voice Model Conversion',
    speaker: 'Original Input Voice',
    originalAudio: '/media/sample1-orig.mp3',
    convertedAudio: '/media/sample1-conv.mp3',
    targetVoice: 'Randomise Voice Model',
    latencyMs: 38
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'How does Beatrice V2 achieve sub-50ms latency?',
    answer: 'Beatrice V2 utilizes a custom-optimized streaming neural inference architecture designed for fast frame processing. By bypassing heavy autoregressive transformers in favor of lightweight acoustic feature predictors and Metal/CUDA accelerated synthesis, processing delays stay under 50 milliseconds.'
  },
  {
    id: 'faq-2',
    category: 'Hardware',
    question: 'Do I need an expensive GPU to run or train models?',
    answer: 'Not necessarily! For macOS users, any Apple Silicon Mac (M1/M2/M3/M4) leverages Metal Performance Shaders for fast real-time conversion and training. For Windows users without an NVIDIA RTX card, you can use DirectML or run model training for free using our official Google Colab notebooks.'
  },
  {
    id: 'faq-3',
    category: 'General',
    question: 'Where can I download pre-trained Beatrice voice models?',
    answer: 'You can download ready-to-use pre-trained voice weights (such as the pre-trained 5000-step model) directly from our official Hugging Face Model Hub repository at https://huggingface.co/SatiricalGuru/beatrice-voice-models.'
  },
  {
    id: 'faq-4',
    category: 'Streaming',
    question: 'How do I route Beatrice output into Discord, OBS, or games?',
    answer: 'Beatrice works alongside standard Virtual Audio Cables. On macOS, use BlackHole (or VB-Cable). On Windows, install VB-Audio Virtual Cable. Set Beatrice output to the virtual driver, then select the virtual driver as input in Discord, OBS, or your favorite game.'
  },
  {
    id: 'faq-5',
    category: 'Training',
    question: 'How much audio data is needed to train a custom voice?',
    answer: 'We recommend 10 to 30 minutes of clean, noise-free speech for optimal voice quality. Using our Dataset Web UI, you can clean and slice raw audio clips in minutes.'
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'What is the licensing for Project Beatrice V2?',
    answer: 'Project Beatrice V2 is 100% open-source and released under the permissive MIT License. You are free to use, modify, distribute, and integrate Beatrice into commercial or personal applications.'
  }
];
