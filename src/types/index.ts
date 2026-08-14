export type OperatingSystem = 'macOS' | 'Windows' | 'unknown';

export interface RepositoryModule {
  id: string;
  name: string;
  repoName: string;
  category: 'Voice Changer' | 'Model Trainer' | 'Dataset Web UI' | 'Cloud' | 'Model Hub';
  platform: 'macOS' | 'Windows' | 'Cloud' | 'Cross-platform';
  acceleration: string;
  description: string;
  stars?: number;
  releaseUrl: string;
  repoUrl: string;
  requirements: {
    chipGpu: string;
    osVersion: string;
    ram: string;
  };
  featured?: boolean;
  isHuggingFace?: boolean;
}

export interface PipelineStage {
  step: number;
  title: string;
  tagline: string;
  description: string;
  repoName: string;
  repoUrl: string;
  iconName: string;
  features: string[];
}

export interface AudioSample {
  id: string;
  title: string;
  speaker: string;
  originalAudio: string;
  convertedAudio: string;
  targetVoice: string;
  latencyMs: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Hardware' | 'Training' | 'Streaming';
}

export interface PretrainedVoiceModel {
  id: string;
  name: string;
  author: string;
  language: string;
  gender: string;
  sampleRate: string;
  downloadUrl: string;
  description: string;
  tags: string[];
}

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
