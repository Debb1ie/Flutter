import type { Emotion, PerformanceMode, SpeechStyle, VoiceType } from '../types/voice';

export type VoicePreset = {
  pitchBias: number;
  speedBias: number;
  pauseBias: number;
  timbre: number;
};

const voiceBaseMap: Record<VoiceType, VoicePreset> = {
  male: { pitchBias: -0.22, speedBias: 0, pauseBias: 0, timbre: 0.52 },
  female: { pitchBias: 0.12, speedBias: 0.04, pauseBias: -10, timbre: 0.68 },
  child: { pitchBias: 0.38, speedBias: 0.12, pauseBias: -18, timbre: 0.8 },
  elder: { pitchBias: -0.12, speedBias: -0.08, pauseBias: 28, timbre: 0.45 },
  narrator: { pitchBias: -0.05, speedBias: -0.02, pauseBias: 12, timbre: 0.6 },
};

const emotionMap: Record<Emotion, VoicePreset> = {
  neutral: { pitchBias: 0, speedBias: 0, pauseBias: 0, timbre: 0.6 },
  happy: { pitchBias: 0.1, speedBias: 0.06, pauseBias: -8, timbre: 0.72 },
  sad: { pitchBias: -0.14, speedBias: -0.1, pauseBias: 24, timbre: 0.44 },
  excited: { pitchBias: 0.25, speedBias: 0.16, pauseBias: -18, timbre: 0.82 },
  angry: { pitchBias: -0.06, speedBias: 0.14, pauseBias: -4, timbre: 0.38 },
  scared: { pitchBias: 0.2, speedBias: 0.1, pauseBias: 16, timbre: 0.78 },
  dramatic: { pitchBias: -0.02, speedBias: -0.03, pauseBias: 32, timbre: 0.3 },
  romantic: { pitchBias: 0.05, speedBias: -0.08, pauseBias: 14, timbre: 0.74 },
  suspenseful: { pitchBias: -0.18, speedBias: -0.12, pauseBias: 36, timbre: 0.28 },
  inspirational: { pitchBias: 0.07, speedBias: 0.02, pauseBias: 8, timbre: 0.66 },
  whisper: { pitchBias: -0.15, speedBias: -0.1, pauseBias: 20, timbre: 0.4 },
  shouting: { pitchBias: 0.2, speedBias: 0.2, pauseBias: -10, timbre: 0.8 },
  murmur: { pitchBias: -0.08, speedBias: -0.06, pauseBias: 15, timbre: 0.5 },
};

const styleMap: Record<SpeechStyle, VoicePreset> = {
  natural: { pitchBias: 0, speedBias: 0, pauseBias: 0, timbre: 0.6 },
  cinematic: { pitchBias: -0.03, speedBias: -0.06, pauseBias: 24, timbre: 0.46 },
  conversational: { pitchBias: 0.01, speedBias: 0.03, pauseBias: -6, timbre: 0.62 },
  theatrical: { pitchBias: 0.08, speedBias: 0.01, pauseBias: 8, timbre: 0.71 },
  documentary: { pitchBias: -0.04, speedBias: -0.04, pauseBias: 18, timbre: 0.56 },
};

const performanceMap: Record<PerformanceMode, VoicePreset> = {
  podcast: { pitchBias: 0, speedBias: 0, pauseBias: 0, timbre: 0.6 },
  game: { pitchBias: 0.16, speedBias: 0.1, pauseBias: -8, timbre: 0.76 },
  film: { pitchBias: -0.08, speedBias: -0.07, pauseBias: 22, timbre: 0.5 },
  song: { pitchBias: 0.2, speedBias: 0.06, pauseBias: -12, timbre: 0.83 },
};

export function composeVoicePreset(
  voiceType: VoiceType,
  emotion: Emotion,
  style: SpeechStyle,
  intensity: number,
  performanceMode: PerformanceMode = 'podcast',
): VoicePreset {
  const v = voiceBaseMap[voiceType];
  const e = emotionMap[emotion];
  const s = styleMap[style];
  const p = performanceMap[performanceMode];
  const scale = Math.max(0, Math.min(intensity, 100)) / 100;

  return {
    pitchBias: v.pitchBias + (e.pitchBias + s.pitchBias + p.pitchBias) * scale,
    speedBias: v.speedBias + (e.speedBias + s.speedBias + p.speedBias) * scale,
    pauseBias: v.pauseBias + (e.pauseBias + s.pauseBias + p.pauseBias) * scale,
    timbre: Math.max(0.15, Math.min(0.95, v.timbre + (e.timbre + s.timbre + p.timbre - 1.8) * scale)),
  };
}
