import React, { createContext, useContext, useState } from 'react';

export type SupportedLanguage = 'en' | 'ja' | 'zh';

interface StepCard {
  num: string;
  title: string;
  desc: string;
  f1: string;
  f2: string;
}

interface AccordionStepData {
  step: number;
  title: string;
  content: string;
}

interface DiagramNode {
  title: string;
  sub: string;
}

interface ShowcaseApp {
  title: string;
  desc: string;
  tag: string;
}

interface FeatureBox {
  title: string;
  desc: string;
}

export interface FaqItemData {
  id: string;
  categoryKey: string;
  question: string;
  answer: string;
}

interface TableRowData {
  label: string;
  mac: string;
  win: string;
  cloud: string;
}

export interface PipelineStageLocal {
  step: number;
  shortLabel: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  repoName: string;
  repoUrl: string;
}

interface Translations {
  nav: {
    home: string;
    howItWorks: string;
    downloads: string;
    modules: string;
    showcase: string;
    docs: string;
    about: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    multilingualPill: string;
  };
  common: {
    downloadMac: string;
    downloadWin: string;
    githubOrg: string;
    supportedLangs: string;
    learnMore: string;
    latestRelease: string;
    downloadLatest: string;
    viewSource: string;
  };
  pillars: {
    sectionTag: string;
    sectionTitle: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
  };
  audition: {
    sectionTag: string;
    sectionTitle: string;
    subtitle: string;
    moreBtn: string;
  };
  featuredModules: {
    sectionTag: string;
    sectionTitle: string;
    exploreBtn: string;
  };
  cta: {
    tag: string;
    title: string;
    subtitle: string;
    btnMac: string;
    btnWin: string;
  };
  footer: {
    description: string;
    sitemapTitle: string;
    githubTitle: string;
    builtWith: string;
  };
  marquee: string[];
  howItWorksPage: {
    tag: string;
    title: string;
    subtitle: string;
    pipelineTag: string;
    pipelineTitle: string;
    pipelineSubtitle: string;
    pipelineExploreBtn: string;
    pipelineCoreBadge: string;
    pipelineStages: PipelineStageLocal[];
    guideTitle: string;
    steps: StepCard[];
    diagramTitle: string;
    diagramSub: string;
    nodes: DiagramNode[];
  };
  downloadsPage: {
    tag: string;
    title: string;
    subtitle: string;
    colabDivider: string;
    colabBadge: string;
    colabTitle: string;
    colabDesc: string;
    colabBullets: [string, string, string];
    colabBtn: string;
    stepperDivider: string;
    stepperTitle: string;
    stepperSub: string;
    specLabels: {
      acceleration: string;
      memory: string;
      os: string;
    };
    macSteps: AccordionStepData[];
    winSteps: AccordionStepData[];
  };
  modulesPage: {
    tag: string;
    title: string;
    subtitle: string;
    cats: {
      all: string;
      vc: string;
      trainer: string;
      dataset: string;
      cloud: string;
    };
    orgTitle: string;
    orgDesc: string;
    orgBtn: string;
    descriptions: Record<string, string>;
  };
  showcasePage: {
    tag: string;
    title: string;
    subtitle: string;
    videoTitle: string;
    videoSubtitle: string;
    videoTag: string;
    videoLatencyBadge: string;
    videoWatchDemo: string;
    videoOverlayTitle: string;
    videoOverlaySub: string;
    auditionDivider: string;
    hfDivider: string;
    hfBadge: string;
    hfTitle: string;
    hfDesc: string;
    hfGetWeights: string;
    hfVisitBtn: string;
    integrationsDivider: string;
    integrationsTitle: string;
    integrationsSubtitle: string;
    apps: ShowcaseApp[];
  };
  docsPage: {
    tag: string;
    title: string;
    subtitle: string;
    macQuickTitle: string;
    macQuickDesc: string;
    macQuickBtn: string;
    winQuickTitle: string;
    winQuickDesc: string;
    winQuickBtn: string;
    hardwareDivider: string;
    tableHeaders: [string, string, string, string];
    tableRows: TableRowData[];
    faqDivider: string;
    faqSearchPlaceholder: string;
    faqCats: {
      all: string;
      general: string;
      hardware: string;
      training: string;
      streaming: string;
    };
    faqs: FaqItemData[];
  };
  aboutPage: {
    tag: string;
    title: string;
    subtitle: string;
    philosophyTag: string;
    philosophyTitle: string;
    philosophyDesc1: string;
    philosophyDesc2: string;
    contributorsDivider: string;
    contributorsTag: string;
    contributorsTitle: string;
    contributorsSubtitle: string;
    maintainerBadge: string;
    githubProfileBtn: string;
    websiteBtn: string;
    licenseDivider: string;
    principles: FeatureBox[];
  };
}

const translations: Record<SupportedLanguage, Translations> = {
  en: {
    nav: {
      home: 'Home',
      howItWorks: 'How It Works',
      downloads: 'Downloads',
      modules: 'Modules',
      showcase: 'Showcase',
      docs: 'Docs',
      about: 'About',
    },
    hero: {
      badge: 'Sub-50ms Glass-to-Glass Latency Engine',
      title1: 'Neural Voice Conversion,',
      title2: 'Engraved for Performance.',
      subtitle: 'An open-source, end-to-end neural voice conversion & model training ecosystem supporting English, Japanese, and Chinese speech synthesis.',
      multilingualPill: '🌐 Supports Multilingual Voice Conversion (English • 日本語 • 中文)',
    },
    common: {
      downloadMac: 'Download for macOS (MPS)',
      downloadWin: 'Download for Windows (CUDA)',
      githubOrg: 'GitHub Org',
      supportedLangs: 'English • 日本語 (Japanese) • 中文 (Chinese)',
      learnMore: 'Learn More',
      latestRelease: 'Latest Release',
      downloadLatest: 'Download Latest Release',
      viewSource: 'View Source Code on GitHub →',
    },
    pillars: {
      sectionTag: 'ENGINEERING EXCELLENCE',
      sectionTitle: 'Designed for Real-Time Precision',
      p1Title: 'Sub-50ms Latency',
      p1Desc: 'Real-time glass-to-glass conversion optimized for zero-perceivable lag during live Discord calls, Twitch streams, and multiplayer gaming sessions.',
      p2Title: 'Train Custom Voices',
      p2Desc: 'Train custom voice models from your own clean speech recordings. Run local training on Apple Silicon MPS/NVIDIA CUDA or free cloud Google Colab GPUs.',
      p3Title: 'Multilingual Synthesis',
      p3Desc: 'Supports real-time voice conversion and dataset training across English, Japanese (日本語), and Chinese (中文) languages.',
    },
    audition: {
      sectionTag: 'BEFORE & AFTER AUDITION',
      sectionTitle: 'Listen to Neural Voice Synthesis',
      subtitle: 'Compare original microphone speech against Beatrice converted neural output in real time.',
      moreBtn: 'Audition More Voice Samples & Demos',
    },
    featuredModules: {
      sectionTag: 'OPEN SOURCE ECOSYSTEM',
      sectionTitle: 'Beatrice Module Suite',
      exploreBtn: 'Explore All 6 Repositories',
    },
    cta: {
      tag: 'READY TO ELEVATE YOUR STREAMING AUDIO?',
      title: 'Start Neural Voice Conversion Today',
      subtitle: 'Download Project Beatrice V2 for your operating system or open our free training notebooks in Google Colab.',
      btnMac: 'Get macOS Installer',
      btnWin: 'Get Windows Installer',
    },
    footer: {
      description: 'An open-source, end-to-end neural voice conversion and model training ecosystem. Engineered for sub-50ms ultra-low latency real-time inference on Apple Silicon MPS and NVIDIA CUDA GPUs.',
      sitemapTitle: 'SITEMAP ARCHITECTURE',
      githubTitle: 'GITHUB REPOSITORIES',
      builtWith: 'Built with ❤️ by the Project Beatrice V2 Open-Source Community',
    },
    marquee: [
      'APPLE SILICON METAL / MPS ACCELERATED',
      'NVIDIA CUDA & DIRECTML SUPPORT',
      '~<50MS REAL-TIME INFERENCE LATENCY',
      '100% OPEN SOURCE — MIT LICENSE',
      'FREE GOOGLE COLAB GPU NOTEBOOKS',
      'ENGLISH • 日本語 • 中文 MULTILINGUAL SYNTHESIS',
    ],
    howItWorksPage: {
      tag: 'END-TO-END PIPELINE ARCHITECTURE',
      title: 'How Beatrice Neural Voice Conversion Works',
      subtitle: 'From raw speech dataset cleaning to local PyTorch GPU training and ultra-low latency live microphone transformation.',
      pipelineTag: 'END-TO-END ARCHITECTURE',
      pipelineTitle: 'The 3-Stage Beatrice Pipeline',
      pipelineSubtitle: 'From raw voice dataset cleaning to PyTorch model training and ultra-low latency real-time voice conversion.',
      pipelineExploreBtn: 'Explore Repository',
      pipelineCoreBadge: 'Project Beatrice V2 Pipeline Core',
      pipelineStages: [
        {
          step: 1,
          shortLabel: 'Dataset',
          title: 'Dataset Preparation (Web UI)',
          tagline: 'Slice, Clean & Validate Voice Recordings',
          description: 'Import your raw voice recordings into the Dataset Web UI. Automatically segment long audio files, isolate clear speech, remove background noise, and export a pristine dataset optimized for neural training.',
          repoName: 'Beatrice-dataset-webui-macos',
          repoUrl: 'https://github.com/Project-Beatrice-V2/Beatrice-dataset-webui-macos',
          features: [
            'Automatic silence-based sentence slicing',
            'Signal-to-noise ratio (SNR) quality scoring',
            'Interactive pitch & frequency spectrogram preview',
            'One-click export to Beatrice dataset manifest',
          ],
        },
        {
          step: 2,
          shortLabel: 'Model',
          title: 'Model Training (Local or Cloud)',
          tagline: 'Train Custom Neural Voice Weights',
          description: 'Feed your cleaned dataset into the Beatrice Trainer. Run model training locally on Apple Silicon MPS or NVIDIA CUDA, or run for free using Google Colab GPUs without needing local hardware.',
          repoName: 'Beatrice-trainer-macos',
          repoUrl: 'https://github.com/Project-Beatrice-V2/Beatrice-trainer-macos',
          features: [
            'MPS & CUDA accelerated PyTorch pipeline',
            'Automatic checkpoint saving & validation loss tracking',
            'Free cloud training with Google Colab notebooks',
            'Compact weight exports (~40MB per voice model)',
          ],
        },
        {
          step: 3,
          shortLabel: 'Real-Time',
          title: 'Real-Time Voice Changer',
          tagline: '<50ms Ultra-Low Latency Live Transformation',
          description: 'Load your trained voice model into the Beatrice Real-Time Voice Changer. Convert your microphone audio in real time and route it via Virtual Audio Cable into Discord, OBS Studio, games, or live streams.',
          repoName: 'Beatrice-voicechanger-macos',
          repoUrl: 'https://github.com/Project-Beatrice-V2/Beatrice-voicechanger-macos',
          features: [
            'Sub-50ms glass-to-glass audio latency',
            'Virtual Audio Cable & BlackHole driver routing',
            'Intonation & emotion preservation without pitch artifacts',
            'Built-in noise gate, equalizer & gain compression',
          ],
        },
      ],
      guideTitle: 'Step-by-Step Execution Guide',
      steps: [
        {
          num: '01',
          title: 'Dataset Cleaning & Slicing (Web UI)',
          desc: 'Launch the Beatrice Dataset Web UI. Load raw WAV/MP3 recordings of the target speaker. The Web UI uses intelligent silence detection to slice long tracks into 2–10 second sentences, strips background noise, and validates sample pitch.',
          f1: 'Recommended dataset size: 15–30 minutes of clean speech',
          f2: 'Export format: .json manifest + clean 48kHz WAV slices',
        },
        {
          num: '02',
          title: 'Model Training (Local MPS/CUDA or Free Colab)',
          desc: 'Pass your manifest to the Beatrice Trainer. Run local PyTorch training accelerated with Apple Silicon MPS (macOS) or NVIDIA CUDA/DirectML (Windows). Don\'t have a GPU? Open our free Google Colab notebook to train on cloud GPUs.',
          f1: 'Training time: ~30–60 minutes on modern GPUs',
          f2: 'Checkpoints auto-saved with validation loss graph',
        },
        {
          num: '03',
          title: 'Real-Time Voice Changer & Virtual Audio Routing',
          desc: 'Open the Beatrice Voice Changer app, select your trained weight file, and pick your microphone input. Map the audio output to a Virtual Audio Cable (BlackHole on macOS, VB-Cable on Windows). Select the virtual driver in Discord or OBS for real-time voice transformation.',
          f1: 'Glass-to-glass latency guaranteed <50ms',
          f2: 'Built-in noise gate, pitch offset & parametric EQ',
        },
      ],
      diagramTitle: 'Audio Routing Topology',
      diagramSub: 'DATA FLOW & INFERENCE SIGNAL CHAIN',
      nodes: [
        { title: 'Microphone Input', sub: 'Raw Audio PCM (48kHz)' },
        { title: 'Beatrice Engine', sub: 'MPS / CUDA Infer (<50ms)' },
        { title: 'Virtual Audio Cable', sub: 'BlackHole / VB-Cable' },
        { title: 'Discord / OBS Studio', sub: 'Live Stream Output' },
      ],
    },
    downloadsPage: {
      tag: 'CROSS-PLATFORM DISTRIBUTION',
      title: 'Download Project Beatrice V2',
      subtitle: 'Official pre-built native installers for macOS (Apple Silicon Metal/MPS) and Windows (NVIDIA CUDA / DirectML).',
      colabDivider: 'Cloud GPU Notebooks (No Hardware Required)',
      colabBadge: 'Free Cloud Training',
      colabTitle: 'Beatrice Google Colab & Kaggle',
      colabDesc: 'No local GPU? Train custom neural voice models entirely in the cloud using our pre-configured Google Colab and Kaggle notebooks with free T4 GPUs.',
      colabBullets: ['• Zero local setup', '• Free T4/V100 GPU acceleration', '• Direct Google Drive export'],
      colabBtn: 'Open in Colab',
      stepperDivider: 'Quick-Start Installation Stepper',
      stepperTitle: 'Installation Steps for',
      stepperSub: 'Click step titles to reveal virtual driver configuration instructions.',
      specLabels: {
        acceleration: 'Acceleration:',
        memory: 'Memory:',
        os: 'OS Requirement:',
      },
      macSteps: [
        {
          step: 1,
          title: '1. Download & Install Beatrice Voice Changer',
          content: 'Download the latest macOS dmg or tar.gz binary from GitHub Releases. Drag Project Beatrice to your Applications folder and grant microphone permissions when prompted.',
        },
        {
          step: 2,
          title: '2. Install BlackHole Virtual Audio Driver',
          content: 'Install BlackHole 2ch via Homebrew (`brew install blackhole-2ch`) or download the pkg installer. This creates a virtual audio device for routing transformed speech.',
        },
        {
          step: 3,
          title: '3. Configure Audio Routing in Discord / OBS',
          content: 'In Beatrice Voice Changer settings, select your microphone as Input and BlackHole 2ch as Output. Open Discord or OBS System Settings and set Microphone Input to BlackHole 2ch.',
        },
      ],
      winSteps: [
        {
          step: 1,
          title: '1. Download & Install Beatrice Windows Client',
          content: 'Download the zip release for Windows CUDA/DirectML. Extract to a directory of your choice and launch `BeatriceVoiceChanger.exe`.',
        },
        {
          step: 2,
          title: '2. Install VB-Audio Virtual Cable',
          content: 'Download and install VB-Cable Virtual Audio Driver. Restart your PC if requested so Windows registers CABLE Input and CABLE Output audio devices.',
        },
        {
          step: 3,
          title: '3. Map Virtual Cable in Discord / OBS',
          content: 'Set Beatrice Voice Changer Audio Output to CABLE Input (VB-Audio Virtual Cable). In Discord or OBS Settings, set your Voice Input Device to CABLE Output.',
        },
      ],
    },
    modulesPage: {
      tag: 'OPEN-SOURCE ARCHITECTURE',
      title: 'Beatrice Module Suite',
      subtitle: 'Explore the complete modular repository collection powering real-time voice conversion, local PyTorch training, and dataset curation.',
      cats: {
        all: 'All',
        vc: 'Voice Changer',
        trainer: 'Model Trainer',
        dataset: 'Dataset Web UI',
        cloud: 'Cloud',
      },
      orgTitle: 'Project Beatrice V2 Organization Profile',
      orgDesc: 'Access the main org profile, overall issue tracker, documentation wiki, and contribution discussions.',
      orgBtn: 'Visit GitHub Org Profile',
      descriptions: {
        'vc-mac': 'Ultra-low latency real-time voice conversion engine for macOS, hardware-accelerated with Metal and Metal Performance Shaders.',
        'vc-win': 'Real-time live voice transformation client for Windows, optimized for CUDA GPUs and DirectML compatible hardware.',
        'hf-models': 'Official library of high-fidelity pre-trained Beatrice voice models ready for direct download and instant live streaming.',
        'trainer-mac': 'Local neural voice model trainer for macOS. Train high-fidelity custom voice models directly on Apple Silicon MPS.',
        'trainer-win': 'High-performance local model trainer for Windows. Train custom neural voice weights using GPU hardware acceleration.',
        'dataset-webui': 'Interactive Web UI for slicing, cleaning, pitch-validating, and exporting voice datasets ready for training.',
        'colab': 'Pre-configured Google Colab and Kaggle Jupyter notebooks for training custom Beatrice voice models using free cloud GPUs.',
      },
    },
    showcasePage: {
      tag: 'NEURAL VOICE DEMONSTRATION & MODEL HUB',
      title: 'Voice Showcase & Pre-Trained Models',
      subtitle: 'Audition real-time converted voice samples and download pre-trained voice model weights directly from Hugging Face.',
      videoTitle: 'Real-Time Voice Changing in Live Games & Discord',
      videoSubtitle: 'Demonstration preview of Project Beatrice V2 running with sub-50ms glass-to-glass audio latency on Apple Silicon MPS and NVIDIA CUDA.',
      videoTag: 'DEMONSTRATION FOOTAGE',
      videoLatencyBadge: '<50ms Latency Live',
      videoWatchDemo: 'Click to Watch Demo',
      videoOverlayTitle: 'Streamer Discord & OBS Live Virtual Audio Output',
      videoOverlaySub: 'Sub-50ms glass-to-glass neural inference running live on Apple Silicon MPS',
      auditionDivider: 'Interactive Audio Audition Player',
      hfDivider: 'Official Hugging Face Voice Model Hub',
      hfBadge: 'Pre-Trained Voice Library',
      hfTitle: 'Download Ready-to-Use Voice Weights',
      hfDesc: 'Hosted on the official Hugging Face repository',
      hfGetWeights: 'Get Weights (.pth)',
      hfVisitBtn: 'Visit Hugging Face Repo: SatiricalGuru/beatrice-voice-models',
      integrationsDivider: 'Streaming Application Integrations',
      integrationsTitle: 'Streaming & Communication Apps',
      integrationsSubtitle: 'Beatrice integrates seamlessly into your favorite live software via virtual audio cables.',
      apps: [
        {
          title: 'Discord Live Voice',
          desc: 'Route transformed audio directly into Discord voice channels. Surprise your gaming squad or roleplay with custom character voices.',
          tag: 'Input Device: Virtual Audio Cable',
        },
        {
          title: 'OBS Studio / Streamlabs',
          desc: 'Capture Beatrice output as a dedicated Audio Input Capture source in OBS for Twitch, YouTube, and VTuber streams.',
          tag: 'Source: BlackHole / VB-Cable',
        },
        {
          title: 'In-Game Proximity Chat',
          desc: 'Works with VRChat, GTA RP, CS2, Valorant, Helldivers 2, and any title supporting custom microphone input devices.',
          tag: 'Sub-50ms Lag Guarantee',
        },
      ],
    },
    docsPage: {
      tag: 'DOCUMENTATION & FAQ',
      title: 'Frequently Asked Questions & Setup Guides',
      subtitle: 'Comprehensive installation instructions, virtual audio routing setup, hardware requirements, and troubleshooting.',
      macQuickTitle: 'macOS Quick-Start',
      macQuickDesc: 'Learn how to install Beatrice Voice Changer on macOS, configure BlackHole virtual audio routing, and run local model training using Metal Performance Shaders.',
      macQuickBtn: 'Read Full macOS README Documentation',
      winQuickTitle: 'Windows Quick-Start',
      winQuickDesc: 'Step-by-step instructions for Windows 10/11 setup, VB-Cable Virtual Audio driver configuration, and CUDA-accelerated local voice training.',
      winQuickBtn: 'Read Full Windows README Documentation',
      hardwareDivider: 'Hardware Requirements Comparison Matrix',
      tableHeaders: ['Component', 'macOS (Metal/MPS)', 'Windows (CUDA)', 'Cloud (Colab)'],
      tableRows: [
        { label: 'Inference Engine', mac: 'Apple Silicon MPS / Metal', win: 'PyTorch CUDA 12 / DirectML', cloud: 'Google Colab Cloud GPU' },
        { label: 'Min GPU / Chip', mac: 'Apple M1 / M2 / M3 / M4', win: 'NVIDIA GTX 1060 (6GB) / RTX', cloud: 'Tesla T4 / V100 / A100' },
        { label: 'System RAM', mac: '8 GB Unified Memory', win: '8 GB RAM minimum', cloud: '12 GB Colab RAM' },
        { label: 'Virtual Audio Cable', mac: 'BlackHole 2ch (Free)', win: 'VB-Audio Virtual Cable', cloud: 'N/A (Training Only)' },
        { label: 'Latency Claim', mac: '~<50ms Real-Time', win: '~<50ms Real-Time', cloud: 'Batch Offline Training' },
      ],
      faqDivider: 'Searchable FAQ Accordion',
      faqSearchPlaceholder: 'Search FAQ questions...',
      faqCats: {
        all: 'All',
        general: 'General',
        hardware: 'Hardware',
        training: 'Training',
        streaming: 'Streaming',
      },
      faqs: [
        {
          id: 'faq-1',
          categoryKey: 'general',
          question: 'How does Beatrice V2 achieve sub-50ms latency?',
          answer: 'Beatrice V2 utilizes a custom-optimized streaming neural inference architecture designed for fast frame processing. By bypassing heavy autoregressive transformers in favor of lightweight acoustic feature predictors and Metal/CUDA accelerated synthesis, processing delays stay under 50 milliseconds.',
        },
        {
          id: 'faq-2',
          categoryKey: 'hardware',
          question: 'Do I need an expensive GPU to run or train models?',
          answer: 'Not necessarily! For macOS users, any Apple Silicon Mac (M1/M2/M3/M4) leverages Metal Performance Shaders for fast real-time conversion and training. For Windows users without an NVIDIA RTX card, you can use DirectML or run model training for free using our official Google Colab notebooks.',
        },
        {
          id: 'faq-3',
          categoryKey: 'general',
          question: 'Where can I download pre-trained Beatrice voice models?',
          answer: 'You can download ready-to-use pre-trained voice weights (such as the pre-trained 5000-step model) directly from our official Hugging Face Model Hub repository at https://huggingface.co/SatiricalGuru/beatrice-voice-models.',
        },
        {
          id: 'faq-4',
          categoryKey: 'streaming',
          question: 'How do I route Beatrice output into Discord, OBS, or games?',
          answer: 'Beatrice works alongside standard Virtual Audio Cables. On macOS, use BlackHole (or VB-Cable). On Windows, install VB-Audio Virtual Cable. Set Beatrice output to the virtual driver, then select the virtual driver as input in Discord, OBS, or your favorite game.',
        },
        {
          id: 'faq-5',
          categoryKey: 'training',
          question: 'How much audio data is needed to train a custom voice?',
          answer: 'We recommend 10 to 30 minutes of clean, noise-free speech for optimal voice quality. Using our Dataset Web UI, you can clean and slice raw audio clips in minutes.',
        },
        {
          id: 'faq-6',
          categoryKey: 'general',
          question: 'What is the licensing for Project Beatrice V2?',
          answer: 'Project Beatrice V2 is 100% open-source and released under the permissive MIT License. You are free to use, modify, distribute, and integrate Beatrice into commercial or personal applications.',
        },
      ],
    },
    aboutPage: {
      tag: 'HERBARIUM MISSION & CONTRIBUTORS',
      title: 'About Project Beatrice V2',
      subtitle: 'An open-source neural voice conversion ecosystem built for high-performance audio synthesis, low latency, and community collaboration.',
      philosophyTag: 'OUR PHILOSOPHY & ORIGINS',
      philosophyTitle: 'High-Fidelity AI Voice, Without Proprietary Locks',
      philosophyDesc1: 'Project Beatrice V2 was built to solve a simple problem: real-time AI voice changers were either slow, bound to expensive cloud subscriptions, or restricted to complex Python setups.',
      philosophyDesc2: 'We designed Beatrice as a fully open-source ecosystem featuring dedicated native clients for macOS (Apple Silicon MPS) and Windows (CUDA/DirectML). By focusing on low-level Metal and PyTorch optimizations, Beatrice delivers sub-50ms glass-to-glass audio latency on consumer hardware.',
      contributorsDivider: 'Project Authors & Core Contributors',
      contributorsTag: 'Community & Original Authors',
      contributorsTitle: 'Main Project Contributors & Team',
      contributorsSubtitle: 'Engineers, voice actors, researchers, and maintainers from the open-source community.',
      maintainerBadge: 'Maintainer',
      githubProfileBtn: 'GitHub Profile',
      websiteBtn: 'Website',
      licenseDivider: '100% Permissive Open Source',
      principles: [
        {
          title: 'MIT License',
          desc: 'Completely free for personal, educational, and commercial use. Inspect, modify, or fork the codebase without restrictive copyleft locks.',
        },
        {
          title: 'Community Driven',
          desc: 'Developed collaboratively by open-source audio engineers, researchers, streamers, and developers worldwide.',
        },
        {
          title: 'Modular Repositories',
          desc: 'Six focused modules: Dataset Web UI, macOS/Windows Model Trainers, macOS/Windows Voice Changers, and Cloud Colab.',
        },
      ],
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      howItWorks: '動作原理',
      downloads: 'ダウンロード',
      modules: 'モジュール',
      showcase: 'デモ＆作品',
      docs: 'ドキュメント',
      about: '概要',
    },
    hero: {
      badge: '超低遅延 50ms リアルタイム音声変換エンジン',
      title1: 'ニューラル声質変換、',
      title2: '高精度な音響表現へ。',
      subtitle: '日本語・英語・中国語に対応した、軽量・低遅延なオープンソース声質変換およびモデル学習エコシステム。',
      multilingualPill: '🌐 多言語音声変換対応 (English • 日本語 • 中文)',
    },
    common: {
      downloadMac: 'macOS版をダウンロード (MPS)',
      downloadWin: 'Windows版をダウンロード (CUDA)',
      githubOrg: 'GitHub 組織',
      supportedLangs: '英語 • 日本語 • 中国語 対応',
      learnMore: '詳細を見る',
      latestRelease: '最新リリース',
      downloadLatest: '最新リリースをダウンロード',
      viewSource: 'GitHubでソースコードを閲覧 →',
    },
    pillars: {
      sectionTag: '卓越した技術設計',
      sectionTitle: 'リアルタイム精度を追求した設計',
      p1Title: '50ms未満の超低遅延',
      p1Desc: 'Discord通話、Twitch配信、オンラインゲームでの会話に最適な、ラグを感じさせない超高精度リアルタイム音声変換。',
      p2Title: 'オリジナル声モデルの学習',
      p2Desc: '録音データから自分だけの声モデルを作成。Apple Silicon (MPS) や NVIDIA (CUDA)、また無料のGoogle Colabクラウドで学習可能。',
      p3Title: '多言語モデルの合成',
      p3Desc: '日本語・英語・中国語（簡体字/繁体字）の音声変換および学習データセット構築に完全対応。',
    },
    audition: {
      sectionTag: '変換前後の比較試聴',
      sectionTitle: 'ニューラル音声合成のクオリティを試聴',
      subtitle: 'マイクの原声とBeatrice変換後のニューラル音声をリアルタイムで聴き比べ。',
      moreBtn: '他の音声サンプルやデモを聴く',
    },
    featuredModules: {
      sectionTag: 'オープンソース エコシステム',
      sectionTitle: 'Beatrice モジュール スイート',
      exploreBtn: '全6つのリポジトリを見る',
    },
    cta: {
      tag: '配信オーディオのクオリティを高めましょう',
      title: '今すぐニューラル音声変換を開始',
      subtitle: 'お使いのOS用Project Beatrice V2をダウンロードするか、無料のGoogle Colabでモデル学習ノートブックを開きましょう。',
      btnMac: 'macOS版インストーラーを入手',
      btnWin: 'Windows版インストーラーを入手',
    },
    footer: {
      description: 'エンドツーエンドのオープンソース声質変換・モデル学習エコシステム。Apple Silicon (MPS) および NVIDIA (CUDA) GPU上で、50ms未満の超低遅延リアルタイム推論を実現。',
      sitemapTitle: 'サイトマップ 構成',
      githubTitle: 'GITHUB リポジトリ群',
      builtWith: 'Project Beatrice V2 オープンソースコミュニティにより❤️を込めて開発',
    },
    marquee: [
      'APPLE SILICON METAL / MPS 高速化',
      'NVIDIA CUDA & DIRECTML 対応',
      '~<50MS リアルタイム推論遅延',
      '100% オープンソース — MIT ライセンス',
      '無料 GOOGLE COLAB GPU ノートブック',
      '英語 • 日本語 • 中国語 多言語音声合成',
    ],
    howItWorksPage: {
      tag: 'パイプライン アーキテクチャ',
      title: 'Beatrice ニューラル音声変換の仕組み',
      subtitle: '原声データのクリーニングからローカルPyTorch GPU学習、そして超低遅延マイク音声変換までの全プロセス。',
      pipelineTag: 'エンドツーエンド アーキテクチャ',
      pipelineTitle: 'Beatrice 3段階パイプライン',
      pipelineSubtitle: '音声データセットのクレンジングからPyTorchモデル学習、超低遅延リアルタイム声質変換まで。',
      pipelineExploreBtn: 'リポジトリを見る',
      pipelineCoreBadge: 'Project Beatrice V2 パイプライン コア',
      pipelineStages: [
        {
          step: 1,
          shortLabel: 'データセット',
          title: 'データセット準備 (Web UI)',
          tagline: '音声データの分割・ノイズ除去・ピッチ検証',
          description: '生音声をDataset Web UIにインポート。無音検出で長尺ファイルを自動分割し、クリアな音声を抽出してノイズを除去、学習に最適なデータセットを出力します。',
          repoName: 'Beatrice-dataset-webui-macos',
          repoUrl: 'https://github.com/Project-Beatrice-V2/Beatrice-dataset-webui-macos',
          features: [
            '無音検出に基づく自動センテンス分割',
            'SN比 (SNR) による音質スコアリング',
            'インタラクティブな音高・周波数スペクトログラム表示',
            'Beatrice用マニフェストへのワンクリック書き出し',
          ],
        },
        {
          step: 2,
          shortLabel: 'モデル学習',
          title: 'モデル学習 (ローカルまたはクラウド)',
          tagline: 'オリジナル声モデルの重みファイルを学習',
          description: 'クレンジング済みデータをBeatrice Trainerに投入。Apple Silicon (MPS) または NVIDIA (CUDA) 上でローカル学習を行うか、Google Colabの無料GPUを活用してクラウド学習を実行します。',
          repoName: 'Beatrice-trainer-macos',
          repoUrl: 'https://github.com/Project-Beatrice-V2/Beatrice-trainer-macos',
          features: [
            'MPS ＆ CUDA 高速化 PyTorch パイプライン',
            'チェックポイント自動保存 ＆ 損失グラフ表示',
            'Google Colab による無料クラウドGPU学習',
            '軽量な重みファイル出力 (1モデル約40MB)',
          ],
        },
        {
          step: 3,
          shortLabel: 'リアルタイム',
          title: 'リアルタイム ボイスチェンジャー',
          tagline: '50ms未満の超低遅延 リアルタイム音声変換',
          description: '学習済みモデルをBeatrice Voice Changerにロード。マイク入力をリアルタイム変換し、仮想オーディオケーブル経由でDiscord、OBS、ゲーム等に出力します。',
          repoName: 'Beatrice-voicechanger-macos',
          repoUrl: 'https://github.com/Project-Beatrice-V2/Beatrice-voicechanger-macos',
          features: [
            '50ms未満のガラス・ツー・ガラス超低遅延',
            '仮想オーディオケーブル ＆ BlackHole ルーティング',
            '不自然なピッチ歪みのない抑揚・感情保持',
            'ノイズゲート・イコライザー・ゲイン圧縮機能内蔵',
          ],
        },
      ],
      guideTitle: 'ステップ・バイ・ステップ実行ガイド',
      steps: [
        {
          num: '01',
          title: 'データセット クリーニング ＆ 分割 (Web UI)',
          desc: 'Beatrice Dataset Web UIを起動し、音声データをロード。無音検出技術で自動分割し、ノイズ除去とピッチ検証を完了。',
          f1: '推奨データセット量: 15〜30分のクリアな音声データ',
          f2: '出力形式: .json マニフェスト ＋ クリーンな 48kHz WAV',
        },
        {
          num: '02',
          title: 'モデル学習 (ローカル MPS/CUDA または Colab)',
          desc: 'マニフェストをBeatrice Trainerに投入。Apple Silicon (MPS) または NVIDIA (CUDA) で学習を実行。また無料のGoogle Colabでも可能。',
          f1: '学習時間: 最新GPUで約30〜60分',
          f2: '検証損失グラフ付きでチェックポイントを自動保存',
        },
        {
          num: '03',
          title: 'リアルタイムボイスチェンジャー ＆ 仮想オーディオ設定',
          desc: 'Beatrice Appを起動し、学習済みモデルを選択。マイク入力を仮想オーディオケーブル(BlackHole / VB-Cable)に接続しDiscord等で変換。',
          f1: '遅延保証 50ms 未満',
          f2: 'ノイズゲート・ピッチ補正・EQ内蔵',
        },
      ],
      diagramTitle: '音声ルーティング構成図',
      diagramSub: 'データフロー ＆ 推論シグナルチェーン',
      nodes: [
        { title: 'マイク入力', sub: '生音声 PCM (48kHz)' },
        { title: 'Beatrice エンジン', sub: 'MPS / CUDA 推論 (<50ms)' },
        { title: '仮想オーディオケーブル', sub: 'BlackHole / VB-Cable' },
        { title: 'Discord / OBS Studio', sub: 'ライブ配信・通話出力' },
      ],
    },
    downloadsPage: {
      tag: 'マルチプラットフォーム 配布',
      title: 'Project Beatrice V2 のダウンロード',
      subtitle: 'macOS (Apple Silicon Metal/MPS) および Windows (NVIDIA CUDA / DirectML) 用の公式インストーラー。',
      colabDivider: 'クラウド GPU ノートブック (ハードウェア不要)',
      colabBadge: '無料クラウド学習',
      colabTitle: 'Beatrice Google Colab ＆ Kaggle',
      colabDesc: 'ローカルGPUをお持ちでない場合も、無料のT4 GPUを搭載したGoogle ColabやKaggleノートブックでクラウド学習が可能です。',
      colabBullets: ['• ローカル環境構築ゼロ', '• 無料の T4/V100 GPU 高速化', '• Google Drive への直接書き出し'],
      colabBtn: 'Colab で開く',
      stepperDivider: 'クイックスタート インストール手順',
      stepperTitle: 'インストールステップ: ',
      stepperSub: 'ステップのタイトルをクリックすると仮想ドライバ設定の詳細が表示されます。',
      specLabels: {
        acceleration: 'ハードウェア高速化:',
        memory: '必要メモリ:',
        os: '対応OS要件:',
      },
      macSteps: [
        {
          step: 1,
          title: '1. Beatrice Voice Changer をダウンロード・インストール',
          content: 'GitHub Releasesから最新のmacOS dmgまたはtar.gzをダウンロード。アプリケーションフォルダへドラッグし、マイク権限を許可します。',
        },
        {
          step: 2,
          title: '2. BlackHole 仮想オーディオドライバをインストール',
          content: 'Homebrew（`brew install blackhole-2ch`）またはpkgインストーラーでBlackHole 2chをインストール。変換音声を送る仮想デバイスを作成します。',
        },
        {
          step: 3,
          title: '3. Discord / OBS でオーディオルーティングを設定',
          content: 'Beatriceの設定でマイクをInput、BlackHole 2chをOutputに設定。DiscordやOBSのマイク入力設定でBlackHole 2chを選択します。',
        },
      ],
      winSteps: [
        {
          step: 1,
          title: '1. Beatrice Windows クライアントをダウンロード',
          content: 'Windows CUDA/DirectML用のzipファイルをダウンロード。任意のフォルダに解凍して`BeatriceVoiceChanger.exe`を起動します。',
        },
        {
          step: 2,
          title: '2. VB-Audio Virtual Cable をインストール',
          content: 'VB-Cable Virtual Audio Driverをダウンロードしてインストール。必要に応じてPCを再起動し、CABLE Input / Outputデバイスを登録します。',
        },
        {
          step: 3,
          title: '3. Discord / OBS で仮想ケーブルをマッピング',
          content: 'Beatriceの音声出力をCABLE Inputに設定。DiscordやOBSの音声入力デバイス設定でCABLE Outputを選択します。',
        },
      ],
    },
    modulesPage: {
      tag: 'オープンソース モジュール群',
      title: 'Beatrice モジュール スイート',
      subtitle: 'リアルタイム音声変換、ローカルPyTorch学習、データセット構築を担う公式モジュールリポジトリ一覧。',
      cats: {
        all: 'すべて',
        vc: 'ボイスチェンジャー',
        trainer: 'モデル学習器',
        dataset: 'データセット Web UI',
        cloud: 'クラウド Colab',
      },
      orgTitle: 'Project Beatrice V2 組織プロファイル',
      orgDesc: 'メインのGitHub組織プロファイル、総合Issueトラッカー、ドキュメントWiki、開発ディスカッションにアクセス。',
      orgBtn: 'GitHub 組織ページを閲覧',
      descriptions: {
        'vc-mac': 'macOS向けの超低遅延リアルタイム音声変換エンジン。MetalおよびMetal Performance Shadersによるハードウェアアクセラレーション対応。',
        'vc-win': 'Windows向けのリアルタイムライブボイスチェンジャー。CUDA GPUおよびDirectML対応ハードウェア用に最適化。',
        'hf-models': '直接ダウンロードしてライブ配信で使える、公式高精度学習済みBeatrice音声モデルライブラリ。',
        'trainer-mac': 'macOS用ローカル声モデル学習器。Apple Silicon (MPS) 上で直接高精度なカスタム音声モデルを学習。',
        'trainer-win': 'Windows用高性能ローカル学習器。GPUハードウェアアクセラレーションを使用して音声モデルの重みを学習。',
        'dataset-webui': '音声データの分割、ノイズ除去、ピッチ検証、マニフェスト出力を一括で行えるインタラクティブWeb UI。',
        'colab': '無料クラウドGPUを使用してカスタムBeatriceモデルを学習するための事前設定済みGoogle ColabおよびKaggleノートブック。',
      },
    },
    showcasePage: {
      tag: 'ニューラル音声デモ ＆ モデルハブ',
      title: '音声デモ ＆ 学習済みモデル',
      subtitle: 'リアルタイム変換後の音声サンプルを試聴し、Hugging Faceからモデル重みを直接ダウンロード。',
      videoTitle: 'ゲーム配信 ＆ Discord でのリアルタイム音声変換',
      videoSubtitle: 'Apple Silicon (MPS) および NVIDIA (CUDA) 上で50ms未満の超低遅延で動作するデモ映像。',
      videoTag: '実機動作デモ映像',
      videoLatencyBadge: '50ms未満 リアルタイム遅延',
      videoWatchDemo: 'クリックしてデモを再生',
      videoOverlayTitle: 'Discord ＆ OBS 仮想オーディオ配信出力',
      videoOverlaySub: 'Apple Silicon MPS上で50ms未満のニューラル推論がリアルタイム稼働中',
      auditionDivider: 'インタラクティブ音声試聴プレイヤー',
      hfDivider: '公式 Hugging Face 声モデルハブ',
      hfBadge: '学習済み声モデル ライブラリ',
      hfTitle: '学習済み音声モデルのダウンロード',
      hfDesc: '公式 Hugging Face リポジトリ SatiricalGuru/beatrice-voice-models にて公開中',
      hfGetWeights: 'モデル重みを入手 (.pth)',
      hfVisitBtn: 'Hugging Face リポジトリを見る: SatiricalGuru/beatrice-voice-models',
      integrationsDivider: '配信 ＆ 通話アプリ連携',
      integrationsTitle: '配信 ＆ 通話アプリとの連携',
      integrationsSubtitle: '仮想オーディオケーブルを経由して、お気に入りの配信・通話ソフトにシームレスに統合できます。',
      apps: [
        {
          title: 'Discord リアルタイム通話',
          desc: '変換後の音声をDiscordボイスチャンネルに直接出力。フレンドとの会話やロールプレイに最適。',
          tag: '入力デバイス: 仮想オーディオケーブル',
        },
        {
          title: 'OBS Studio / Streamlabs',
          desc: 'OBSの音声入力キャプチャソースとしてBeatriceを指定し、TwitchやYouTubeでのVTuber配信に活用。',
          tag: 'ソース: BlackHole / VB-Cable',
        },
        {
          title: 'ゲーム内ボイスチャット',
          desc: 'VRChat、GTA RP、CS2、Valorant、Helldivers 2などのカスタムマイク入力対応ゲームで利用可能。',
          tag: '遅延保証: 50ms未満',
        },
      ],
    },
    docsPage: {
      tag: 'ドキュメント ＆ FAQ',
      title: 'よくある質問 ＆ セットアップガイド',
      subtitle: '詳細なインストール手順、仮想オーディオルーティング設定、推奨動作環境、トラブルシューティング。',
      macQuickTitle: 'macOS クイックスタート',
      macQuickDesc: 'Beatrice Voice ChangerのmacOSへのインストール、BlackHole仮想オーディオ設定、Metal Performance Shadersによる学習手順。',
      macQuickBtn: 'macOS 版 README ドキュメントを見る',
      winQuickTitle: 'Windows クイックスタート',
      winQuickDesc: 'Windows 10/11環境でのセットアップ、VB-Cable仮想オーディオドライバ設定、CUDAアクセラレーション学習。',
      winQuickBtn: 'Windows 版 README ドキュメントを見る',
      hardwareDivider: 'ハードウェア動作要件 比較表',
      tableHeaders: ['項目', 'macOS (Metal/MPS)', 'Windows (CUDA)', 'クラウド (Colab)'],
      tableRows: [
        { label: '推論エンジン', mac: 'Apple Silicon MPS / Metal', win: 'PyTorch CUDA 12 / DirectML', cloud: 'Google Colab クラウドGPU' },
        { label: '推奨GPU / チップ', mac: 'Apple M1 / M2 / M3 / M4', win: 'NVIDIA GTX 1060 (6GB) / RTX', cloud: 'Tesla T4 / V100 / A100' },
        { label: 'システムメモリ', mac: '8 GB 統合メモリ', win: '8 GB RAM 以上', cloud: '12 GB Colab RAM' },
        { label: '仮想オーディオドライバ', mac: 'BlackHole 2ch (無料)', win: 'VB-Audio Virtual Cable', cloud: '対象外 (学習専用)' },
        { label: '公称レイテンシ', mac: '~50ms未満 リアルタイム', win: '~50ms未満 リアルタイム', cloud: 'バッチオフライン学習' },
      ],
      faqDivider: 'よくある質問 (FAQ)',
      faqSearchPlaceholder: 'よくある質問を検索...',
      faqCats: {
        all: 'すべて',
        general: '全般',
        hardware: 'ハードウェア',
        training: 'モデル学習',
        streaming: '配信・通話',
      },
      faqs: [
        {
          id: 'faq-1',
          categoryKey: 'general',
          question: 'Beatrice V2 はどのようにして50ms未満の超低遅延を実現しているのですか？',
          answer: 'Beatrice V2は高速フレーム処理に特化した独自のストリーミング推論アーキテクチャを採用しています。重い自己回帰型Transformerを回避し、軽量な音響特徴予測器とMetal/CUDAによるハードウェアアクセラレーションを組み合わせることで、50ミリ秒未満の処理遅延を維持しています。',
        },
        {
          id: 'faq-2',
          categoryKey: 'hardware',
          question: 'モデルの実行や学習には高価なGPUが必要ですか？',
          answer: '必ずしも必要ありません。macOSユーザーはApple Silicon (M1/M2/M3/M4)のMetal Performance Shadersにより高速な変換と学習が可能です。NVIDIAグラフィックボードをお持ちでないWindowsユーザーも、DirectMLまたは公式の無料Google Colabノートブックで学習を実行できます。',
        },
        {
          id: 'faq-3',
          categoryKey: 'general',
          question: '学習済みのBeatrice音声モデルはどこからダウンロードできますか？',
          answer: '公式のHugging Face Model Hubリポジトリ（https://huggingface.co/SatiricalGuru/beatrice-voice-models）から、5000ステップ学習済みの即戦力モデル重みを直接ダウンロードできます。',
        },
        {
          id: 'faq-4',
          categoryKey: 'streaming',
          question: 'Beatriceの音声出力をDiscord、OBS、ゲームにルーティングするにはどうすればよいですか？',
          answer: '標準的な仮想オーディオケーブルを使用します。macOSではBlackHole（またはVB-Cable）、WindowsではVB-Audio Virtual Cableをインストールします。Beatriceの出力を仮想ドライバに設定し、DiscordやOBS、ゲームのマイク入力にその仮想ドライバを選択するだけで完了します。',
        },
        {
          id: 'faq-5',
          categoryKey: 'training',
          question: 'オリジナルの声モデルを学習させるにはどれくらいの音声データが必要ですか？',
          answer: '高品質な音声モデルを作成するには、ノイズのないクリアな音声が10〜30分程度あることが推奨されます。Dataset Web UIを使用すれば、数分で長尺音声を自動分割・クレンジングできます。',
        },
        {
          id: 'faq-6',
          categoryKey: 'general',
          question: 'Project Beatrice V2 のライセンス形態はどうなっていますか？',
          answer: 'Project Beatrice V2は100%オープンソースであり、寛容なMITライセンスの下で公開されています。個人利用、教育目的、商用アプリケーションへの組み込みまで完全無償で自由にご利用いただけます。',
        },
      ],
    },
    aboutPage: {
      tag: 'ミッション ＆ 開発メンバー',
      title: 'Project Beatrice V2 について',
      subtitle: '高品質な音声合成、低遅延、コミュニティ開発を追求するオープンソース声質変換エコシステム。',
      philosophyTag: '開発理念とプロジェクトの起源',
      philosophyTitle: '高度なAI音声体験を、ロックインなしで開放',
      philosophyDesc1: 'Project Beatrice V2は、従来のリアルタイムAIボイスチェンジャーが高価なサブスクリプションや複雑なPython環境を必要としていた問題を解決するために開発されました。',
      philosophyDesc2: 'macOS (MPS) および Windows (CUDA) 用の完全オープンソースなネイティブアプリを提供し、低レイヤーのMetal/PyTorch最適化によって消費者向けPCで50ms未満の超低遅延を実現します。',
      contributorsDivider: 'プロジェクト創始者 ＆ コア開発メンバー',
      contributorsTag: 'コミュニティ ＆ オリジナル開発者',
      contributorsTitle: '主なプロジェクト開発者 ＆ コアチーム',
      contributorsSubtitle: 'オープンソースコミュニティのエンジニア、研究者、声優、メンテナー陣。',
      maintainerBadge: 'メンテナー',
      githubProfileBtn: 'GitHub プロフィール',
      websiteBtn: 'ウェブサイト',
      licenseDivider: '100% 自由なオープンソース',
      principles: [
        {
          title: 'MIT ライセンス',
          desc: '個人利用・商用利用を問わず完全に無償。ソースコードの閲覧、改変、フォークが自由に行えます。',
        },
        {
          title: 'コミュニティ主導開発',
          desc: '世界中のオープンソース音声エンジニア、研究者、配信者、開発者によって共同開発されています。',
        },
        {
          title: 'モジュール型構造',
          desc: 'Dataset Web UI、macOS/Windows学習器、ボイスチェンジャー、Cloud Colabの6つの専門モジュール。',
        },
      ],
    },
  },
  zh: {
    nav: {
      home: '首页',
      howItWorks: '工作原理',
      downloads: '下载中心',
      modules: '组件模块',
      showcase: '声效展示',
      docs: '文档指南',
      about: '关于项目',
    },
    hero: {
      badge: '低于50毫秒超低延迟实时变声引擎',
      title1: '神经声线转换，',
      title2: '雕琢极致性能。',
      subtitle: '支持中文、英文、日语的多语言开源神经声音转换与模型训练生态系统，提供跨平台 Metal / CUDA 硬件加速。',
      multilingualPill: '🌐 支持多语言声音转换 (English • 日本語 • 中文)',
    },
    common: {
      downloadMac: '下载 macOS 版 (MPS)',
      downloadWin: '下载 Windows 版 (CUDA)',
      githubOrg: 'GitHub 仓库',
      supportedLangs: '中文 • English • 日本語 多语言支持',
      learnMore: '了解更多',
      latestRelease: '最新发布版',
      downloadLatest: '下载最新发布版本',
      viewSource: '在 GitHub 查看源码 →',
    },
    pillars: {
      sectionTag: '卓越工程品质',
      sectionTitle: '专为实时高精度声线转换打造',
      p1Title: '低于50ms极低延迟',
      p1Desc: '针对 Discord 语音通话、Twitch 实时直播及多人联机游戏优化，实现无感知延迟的高品质变声体验。',
      p2Title: '训练自定义专属声线',
      p2Desc: '使用自己的音频录音训练专属声音模型。支持 Apple Silicon (MPS)、NVIDIA (CUDA) 本地训练或免费 Google Colab 云端训练。',
      p3Title: '多语言声音合成',
      p3Desc: '全面支持中文、英文及日语（日本語）的实时声线转换与数据集预处理。',
    },
    audition: {
      sectionTag: '转换前后对比试听',
      sectionTitle: '试听神经声音合成效果',
      subtitle: '实时对比原始麦克风录音与 Beatrice 神经转换后的语音输出。',
      moreBtn: '试听更多声音样例与演示',
    },
    featuredModules: {
      sectionTag: '开源生态系统',
      sectionTitle: 'Beatrice 核心模块组件',
      exploreBtn: '浏览全部 6 个开源仓库',
    },
    cta: {
      tag: '准备提升您的直播语音效果吗？',
      title: '立即开启神经声音转换体验',
      subtitle: '下载适用您操作系统的 Project Beatrice V2 客户端，或在免费的 Google Colab 中打开模型训练脚本。',
      btnMac: '获取 macOS 安装程序',
      btnWin: '获取 Windows 安装程序',
    },
    footer: {
      description: '端到端开源神经声音转换与模型训练生态系统。专为 Apple Silicon MPS 及 NVIDIA CUDA GPU 打造，提供低于 50ms 的超低延迟实时推理。',
      sitemapTitle: '网站地图 架构',
      githubTitle: 'GITHUB 核心代码库',
      builtWith: '由 Project Beatrice V2 开源社区倾情❤️打造',
    },
    marquee: [
      'APPLE SILICON METAL / MPS 硬件加速',
      'NVIDIA CUDA 与 DIRECTML 全面支持',
      '~<50MS 超低延迟实时推理',
      '100% 完全开源 — MIT 许可协议',
      '免费 GOOGLE COLAB GPU 训练脚本',
      '中文 • 英文 • 日语 多语言声音合成',
    ],
    howItWorksPage: {
      tag: '端到端管线架构',
      title: 'Beatrice 神经声音转换工作原理',
      subtitle: '从原始麦克风语音清理到本地 PyTorch GPU 训练，再到超低延迟实时变声的完整全流程。',
      pipelineTag: '端到端管线架构',
      pipelineTitle: 'Beatrice 三阶段核心流程',
      pipelineSubtitle: '从原始语音数据集清洗到 PyTorch 模型训练，再到超低延迟实时声线转换。',
      pipelineExploreBtn: '查看代码仓库',
      pipelineCoreBadge: 'Project Beatrice V2 核心管线',
      pipelineStages: [
        {
          step: 1,
          shortLabel: '数据集',
          title: '数据集清洗与准备 (Web UI)',
          tagline: '音频切片、降噪清理与音高校验',
          description: '将原始语音导入 Dataset Web UI。智能静音检测自动将长音频切分为短句，滤除背景噪声，并导出经过优化的训练数据集。',
          repoName: 'Beatrice-dataset-webui-macos',
          repoUrl: 'https://github.com/Project-Beatrice-V2/Beatrice-dataset-webui-macos',
          features: [
            '基于静音检测的智能句子自动切片',
            '信噪比 (SNR) 音频质量评分',
            '交互式音高与频谱图实时预览',
            '一键导出 Beatrice 专用数据集描述清单',
          ],
        },
        {
          step: 2,
          shortLabel: '模型训练',
          title: '模型训练 (本地或云端)',
          tagline: '训练自定义专属神经声线权重',
          description: '将清洗后的数据集传入 Beatrice Trainer。在 Apple Silicon (MPS) 或 NVIDIA (CUDA) 上进行本地 GPU 加速训练，或利用免费的 Google Colab 云端 GPU 训练。',
          repoName: 'Beatrice-trainer-macos',
          repoUrl: 'https://github.com/Project-Beatrice-V2/Beatrice-trainer-macos',
          features: [
            'MPS 与 CUDA 硬件加速 PyTorch 训练管线',
            '自动保存检查点与验证损失曲线追踪',
            '免费 Google Colab 云端 Jupyter 脚本支持',
            '紧凑轻量的权重文件体积 (每个声线约 40MB)',
          ],
        },
        {
          step: 3,
          shortLabel: '实时转换',
          title: '实时声线转换客户端',
          tagline: '低于 50ms 超低延迟实时直播变声',
          description: '将训练好的声音模型加载至 Beatrice 变声客户端。实时转换麦克风输入并通过虚拟声卡路由至 Discord、OBS 直播推流或联机游戏中。',
          repoName: 'Beatrice-voicechanger-macos',
          repoUrl: 'https://github.com/Project-Beatrice-V2/Beatrice-voicechanger-macos',
          features: [
            '低于 50ms 端到端无感知超低延迟',
            '虚拟音频通道与 BlackHole 驱动无缝路由',
            '完整保留原声语调与情感表达，无机械音瑕疵',
            '内置专业噪声门、音频均衡器与增益压缩器',
          ],
        },
      ],
      guideTitle: '分步执行操作指南',
      steps: [
        {
          num: '01',
          title: '数据集清理与音频切片 (Web UI)',
          desc: '启动 Beatrice Dataset Web UI 载入目标说话人的原始音频。Web UI 运用智能静音检测将长音频切分为 2-10 秒句子，并完成降噪与音高校验。',
          f1: '推荐数据集时长: 15-30 分钟清晰语音录音',
          f2: '导出格式: .json 描述清单 ＋ 48kHz WAV 干净切片',
        },
        {
          num: '02',
          title: '模型训练 (本地 MPS/CUDA 或免费 Colab)',
          desc: '将描述清单导入 Beatrice Trainer。在 macOS (Apple Silicon MPS) 或 Windows (CUDA) 上开启本地 GPU 训练，或使用免费 Google Colab 进行云端训练。',
          f1: '训练耗时: 现代 GPU 约 30-60 分钟即可收敛',
          f2: '自动保存检查点并绘制验证损失曲线',
        },
        {
          num: '03',
          title: '实时变声器与虚拟音频软布线',
          desc: '打开 Beatrice Voice Changer 客户端，加载训练好的权重文件并选择麦克风输入。将音频输出绑定至虚拟声卡 (macOS BlackHole / Windows VB-Cable)。',
          f1: '实时变声全程延迟保证低于 50ms',
          f2: '内置噪声门、音调偏移与均衡调整器',
        },
      ],
      diagramTitle: '音频拓扑路由示意图',
      diagramSub: '数据流与推理信号链',
      nodes: [
        { title: '麦克风输入', sub: '原始 PCM 音频 (48kHz)' },
        { title: 'Beatrice 引擎', sub: 'MPS / CUDA 推理 (<50ms)' },
        { title: '虚拟声卡通道', sub: 'BlackHole / VB-Cable' },
        { title: 'Discord / OBS', sub: '直播与通话输出' },
      ],
    },
    downloadsPage: {
      tag: '跨平台软件分发',
      title: '下载 Project Beatrice V2 客户端',
      subtitle: '包含适用于 macOS (Apple Silicon Metal/MPS) 和 Windows (NVIDIA CUDA / DirectML) 的官方原生安装包。',
      colabDivider: '云端 GPU 训练脚本 (无需本地硬件)',
      colabBadge: '免费云端训练',
      colabTitle: 'Beatrice Google Colab 与 Kaggle 云端训练',
      colabDesc: '本地没有独立显卡？无需担心！使用我们配置好的 Google Colab 与 Kaggle 免费 T4 GPU 云端脚本训练专属声音模型。',
      colabBullets: ['• 零本地配置门槛', '• 免费 T4/V100 GPU 硬件加速', '• 直接导出模型至 Google Drive'],
      colabBtn: '在 Colab 中打开',
      stepperDivider: '快速安装配置步骤',
      stepperTitle: '安装步骤说明：',
      stepperSub: '点击步骤标题展开查看虚拟通道配置说明。',
      specLabels: {
        acceleration: '硬件加速:',
        memory: '内存要求:',
        os: '系统要求:',
      },
      macSteps: [
        {
          step: 1,
          title: '1. 下载并安装 Beatrice 变声器 (macOS)',
          content: '从 GitHub Releases 下载最新的 macOS dmg 或 tar.gz 安装包，拖入应用程序文件夹并在提示时授予麦克风权限。',
        },
        {
          step: 2,
          title: '2. 安装 BlackHole 虚拟声卡驱动',
          content: '通过 Homebrew (`brew install blackhole-2ch`) 或 pkg 安装包安装 BlackHole 2ch，用于创建音频软通道。',
        },
        {
          step: 3,
          title: '3. 在 Discord / OBS 中配置音频路由',
          content: '在 Beatrice 变声器设置中，将麦克风设为 Input，BlackHole 2ch 设为 Output。在 Discord 或 OBS 设置中将麦克风输入选择为 BlackHole 2ch。',
        },
      ],
      winSteps: [
        {
          step: 1,
          title: '1. 下载并安装 Beatrice Windows 客户端',
          content: '下载适用于 Windows CUDA/DirectML 的 zip 压缩包，解压至任意目录并运行 `BeatriceVoiceChanger.exe`。',
        },
        {
          step: 2,
          title: '2. 安装 VB-Audio 虚拟声卡驱动',
          content: '下载并安装 VB-Cable 虚拟声卡驱动。若有提示请重启电脑，使系统成功注册 CABLE Input 和 Output 设备。',
        },
        {
          step: 3,
          title: '3. 在 Discord / OBS 中绑定虚拟通道',
          content: '将 Beatrice 变声器的音频输出设为 CABLE Input (VB-Audio Virtual Cable)。在 Discord 或 OBS 设置中将输入设备设为 CABLE Output。',
        },
      ],
    },
    modulesPage: {
      tag: '开源模块化架构',
      title: 'Beatrice 模块化核心仓库组件',
      subtitle: '探索涵盖实时声线转换、本地 PyTorch 训练及数据集处理的全套开源代码库。',
      cats: {
        all: '全部',
        vc: '实时变声器',
        trainer: '模型训练器',
        dataset: '数据集 Web UI',
        cloud: '云端 Colab',
      },
      orgTitle: 'Project Beatrice V2 组织主页',
      orgDesc: '访问 GitHub 组织主页、综合 Issue 追踪器、文档 Wiki 及开源社区讨论版。',
      orgBtn: '访问 GitHub 组织主页',
      descriptions: {
        'vc-mac': '专为 macOS 打造的超低延迟实时声线转换引擎，支持 Metal 和 Metal Performance Shaders 硬件加速。',
        'vc-win': '专为 Windows 打造的实时 live 变声客户端，针对 CUDA GPU 和 DirectML 兼容硬件提供深度优化。',
        'hf-models': '官方高保真预训练 Beatrice 声音模型库，可直接下载并即刻用于实时直播。',
        'trainer-mac': 'macOS 本地神经声音模型训练器，支持在 Apple Silicon (MPS) 上直接训练高保真专属声线模型。',
        'trainer-win': 'Windows 高性能本地模型训练器，使用 GPU 硬件加速训练自定义神经声音权重。',
        'dataset-webui': '交互式 Web 界面，用于语音数据集的音频切片、降噪清理、音高校验及训练清单导出。',
        'colab': '预配置的 Google Colab 和 Kaggle Jupyter 脚本，使用免费云端 GPU 训练自定义 Beatrice 声音模型。',
      },
    },
    showcasePage: {
      tag: '神经声音效果演示与模型中心',
      title: '声音展示与预训练模型中心',
      subtitle: '在线对比试听实时语音转换效果，或直接从 Hugging Face 下载预训练模型权重。',
      videoTitle: '在联机游戏与 Discord 中实时变声',
      videoSubtitle: '在 Apple Silicon (MPS) 与 NVIDIA (CUDA) 上以低于50ms超低延迟运行的实机演示视频。',
      videoTag: '实机运行演示',
      videoLatencyBadge: '<50ms 实时低延迟',
      videoWatchDemo: '点击播放实机演示',
      videoOverlayTitle: 'Discord 与 OBS 直播虚拟音频输出',
      videoOverlaySub: '基于 Apple Silicon MPS 的低于50ms神经实时推理运行中',
      auditionDivider: '交互式声音对比试听器',
      hfDivider: '官方 Hugging Face 声音模型中心',
      hfBadge: '预训练声音模型库',
      hfTitle: '下载即开即用的声音模型权重',
      hfDesc: '托管于官方 Hugging Face 仓库',
      hfGetWeights: '获取权重文件 (.pth)',
      hfVisitBtn: '访问 Hugging Face 仓库: SatiricalGuru/beatrice-voice-models',
      integrationsDivider: '直播与通讯软件集成',
      integrationsTitle: '直播与即时通讯软件集成',
      integrationsSubtitle: '通过虚拟音频软通道，Beatrice 可无缝嵌入您常用的各类直播与语音软件中。',
      apps: [
        {
          title: 'Discord 实时语音频道',
          desc: '将变声后的音频直接输出至 Discord 频道，在游戏开黑或角色扮演中随时切换专属声线。',
          tag: '输入设备: 虚拟声卡通道',
        },
        {
          title: 'OBS Studio / Streamlabs 直播推流',
          desc: '在 OBS 中把 Beatrice 捕获为音频输入源，为 Twitch、YouTube 及 VTuber 虚拟主播直播提供实时变声。',
          tag: '音频源: BlackHole / VB-Cable',
        },
        {
          title: '多人游戏近距离语音',
          desc: '完美适配 VRChat、GTA RP、CS2、无畏契约 (Valorant) 及地狱潜者2 等支持自定义麦克风设备的游戏。',
          tag: '延迟保障: 低于50ms',
        },
      ],
    },
    docsPage: {
      tag: '文档指南与常见问题',
      title: '常见问题解答与配置指南',
      subtitle: '包含详细安装步骤、虚拟音频软布线设置、硬件要求及故障排除方案。',
      macQuickTitle: 'macOS 快速入门指南',
      macQuickDesc: '了解如何在 macOS 上安装 Beatrice 变声器、配置 BlackHole 虚拟声卡通道以及使用 Metal 硬件加速本地训练。',
      macQuickBtn: '查看 macOS 版完整 README 文档',
      winQuickTitle: 'Windows 快速入门指南',
      winQuickDesc: '包含 Windows 10/11 系统的安装步骤、VB-Cable 虚拟音频通道配置以及 CUDA 加速训练指南。',
      winQuickBtn: '查看 Windows 版完整 README 文档',
      hardwareDivider: '硬件配置与系统要求对比表',
      tableHeaders: ['核心项目', 'macOS (Metal/MPS)', 'Windows (CUDA)', '云端 (Colab)'],
      tableRows: [
        { label: '推理引擎', mac: 'Apple Silicon MPS / Metal', win: 'PyTorch CUDA 12 / DirectML', cloud: 'Google Colab 云端 GPU' },
        { label: '最低 GPU / 芯片', mac: 'Apple M1 / M2 / M3 / M4', win: 'NVIDIA GTX 1060 (6GB) / RTX', cloud: 'Tesla T4 / V100 / A100' },
        { label: '系统内存', mac: '8 GB 统一内存', win: '8 GB RAM 最低要求', cloud: '12 GB Colab 运行内存' },
        { label: '虚拟音频驱动', mac: 'BlackHole 2ch (免费)', win: 'VB-Audio Virtual Cable', cloud: '不适用 (仅用于模型训练)' },
        { label: '实时延迟指标', mac: '~低于50ms 实时极速', win: '~低于50ms 实时极速', cloud: '离线批量训练' },
      ],
      faqDivider: '常见问题解答 (FAQ)',
      faqSearchPlaceholder: '搜索常见问题解答...',
      faqCats: {
        all: '全部',
        general: '常规问题',
        hardware: '硬件配置',
        training: '模型训练',
        streaming: '直播与游戏',
      },
      faqs: [
        {
          id: 'faq-1',
          categoryKey: 'general',
          question: 'Beatrice V2 是如何实现低于 50ms 超低延迟的？',
          answer: 'Beatrice V2 采用了专为极速帧级处理定制优化的流式神经推理架构。通过舍弃沉重的自回归 Transformer 结构，转而使用轻量化声学特征预测器并结合 Metal/CUDA 硬件加速，将全程端到端延迟控制在 50 毫秒以内。',
        },
        {
          id: 'faq-2',
          categoryKey: 'hardware',
          question: '运行或训练声音模型需要昂贵的独立显卡吗？',
          answer: '完全不需要！macOS 用户可在搭载 Apple Silicon (M1/M2/M3/M4) 的任意机型上利用 Metal Performance Shaders 实现高效实时转换与训练。没有 NVIDIA 独显的 Windows 用户也可以借助 DirectML 或直接使用我们提供的免费 Google Colab 云端脚本进行训练。',
        },
        {
          id: 'faq-3',
          categoryKey: 'general',
          question: '在哪里可以下载预训练好的 Beatrice 声音模型？',
          answer: '您可以直接从我们官方的 Hugging Face 模型中心仓库 (https://huggingface.co/SatiricalGuru/beatrice-voice-models) 免费下载预训练好的 5000 步高保真声线权重文件。',
        },
        {
          id: 'faq-4',
          categoryKey: 'streaming',
          question: '如何将 Beatrice 的变声输出接入 Discord、OBS 或游戏中？',
          answer: 'Beatrice 配合通用虚拟声卡驱动即可轻松使用。macOS 建议安装 BlackHole 2ch，Windows 建议安装 VB-Audio Virtual Cable。在 Beatrice 中将输出设备指定为虚拟声卡，然后在 Discord、OBS 或游戏的麦克风设置中选择该虚拟设备即可。',
        },
        {
          id: 'faq-5',
          categoryKey: 'training',
          question: '训练自定义专属声线需要准备多长时间的音频数据？',
          answer: '建议准备 10 到 30 分钟干净、清晰且无杂音的人声录音以达到最佳声音保真度。利用我们的 Dataset Web UI，只需几分钟即可完成长音频的智能切片与噪声清理。',
        },
        {
          id: 'faq-6',
          categoryKey: 'general',
          question: 'Project Beatrice V2 采用何种开源许可协议？',
          answer: 'Project Beatrice V2 属于 100% 完全开源项目，基于极度宽松的 MIT 许可协议发布。您可以自由地在个人、教学甚至商业产品中免费使用、修改、分发及二次集成。',
        },
      ],
    },
    aboutPage: {
      tag: '项目使命与核心团队',
      title: '关于 Project Beatrice V2',
      subtitle: '专为高性能音频合成、极低延迟及开源社区协作打造的神经声音转换生态系统。',
      philosophyTag: '开发理念与项目起源',
      philosophyTitle: '打造高保真 AI 声线，摒弃商业闭源限制',
      philosophyDesc1: 'Project Beatrice V2 旨在解决传统实时 AI 变声器速度慢、高昂云端订阅以及依赖复杂 Python 环境的痛点。',
      philosophyDesc2: '我们为 macOS (MPS) 与 Windows (CUDA) 打造了完全开源的原生客户端。通过底层的 Metal 与 PyTorch 深度优化，在消费级硬件上实现了低于 50ms 的超低延迟。',
      contributorsDivider: '项目创作者与核心贡献者',
      contributorsTag: '开源社区与原创作者',
      contributorsTitle: '主要项目贡献者与核心团队',
      contributorsSubtitle: '来自开源社区的工程师、研究人员、配音演员及项目维护者。',
      maintainerBadge: '核心维护者',
      githubProfileBtn: 'GitHub 个人主页',
      websiteBtn: '官方网站',
      licenseDivider: '100% 自由宽松的开源协议',
      principles: [
        {
          title: 'MIT 开源许可协议',
          desc: '对个人、教学及商业用途完全免费。自由查看、修改或 Fork 代码库，没有任何商业限制。',
        },
        {
          title: '社区共同驱动',
          desc: '由全球开源音频工程师、研究人员、游戏主播及开发者共同协作开发。',
        },
        {
          title: '模块化组件仓库',
          desc: '涵盖数据集 Web UI、macOS/Windows 训练器、变声客户端及云端 Colab 等 6 个专业模块。',
        },
      ],
    },
  },
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
