export const VOICE_TYPES = [
  'male',
  'female',
  'child',
  'elder',
  'narrator',
] as const;

export type VoiceType = (typeof VOICE_TYPES)[number];

export type Emotion =
  | 'neutral'
  | 'happy'
  | 'sad'
  | 'excited'
  | 'angry'
  | 'scared'
  | 'dramatic'
  | 'romantic'
  | 'suspenseful'
  | 'inspirational'
  | 'whisper'
  | 'shouting'
  | 'murmur';

export type SpeechStyle = 'natural' | 'cinematic' | 'conversational' | 'theatrical' | 'documentary';

export type PerformanceMode = 'podcast' | 'game' | 'film' | 'song';

export type AudioControls = {
  pitch: number;
  speed: number;
  volume: number;
};

export type RenderRequest = {
  script: string;
  voiceType: VoiceType;
  controls: AudioControls;
};

export type RenderResult = {
  wavBlob: Blob;
  durationMs: number;
};
