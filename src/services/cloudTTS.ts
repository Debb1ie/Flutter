import type { CloudProvider, CloudTTSConfig } from '../types/cloudTTS';
import { downloadBlob, encodeWav, renderAudioAsMp3Fallback } from '../utils/audioExport';

export type CloudRenderRequest = {
  script: string;
  voiceId: string;
  provider: CloudProvider;
  speed: number;
  pitch: number;
  cloudConfig: CloudTTSConfig;
};

export type CloudRenderResult = {
  wavBlob: Blob;
  durationMs: number;
  provider: CloudProvider;
};

class CloudTTSService {
  private config: CloudTTSConfig = {
    provider: 'local',
    enabled: false,
  };

  getConfig(): CloudTTSConfig {
    return { ...this.config };
  }

  updateConfig(config: Partial<CloudTTSConfig>): void {
    this.config = { ...this.config, ...config };
  }

  async render(request: CloudRenderRequest): Promise<CloudRenderResult> {
    if (!request.cloudConfig.enabled || !request.cloudConfig.apiKey) {
      return this.renderLocal();
    }

    try {
      const provider = request.cloudConfig.provider;
      if (provider === 'google') {
        return this.renderGoogle(request);
      }
      if (provider === 'azure') {
        return this.renderAzure(request);
      }
      return this.renderLocal();
    } catch (error) {
      console.warn(`Cloud TTS provider "${request.cloudConfig.provider}" failed, falling back to local synthesis`, error);
      return this.renderLocal();
    }
  }

  private async renderLocal(): Promise<CloudRenderResult> {
    const durationMs = 0;
    const wavBlob = encodeWav(new Float32Array(0), 22050);
    return { wavBlob, durationMs, provider: 'local' };
  }

  private async renderGoogle(request: CloudRenderRequest): Promise<CloudRenderResult> {
    const { apiKey } = request.cloudConfig;
    if (!apiKey) throw new Error('Google API key is required');

    const voice = request.voiceId.replace('google-', '');
    const languageCode = voice.split('-').slice(0, 2).join('-');

    const body = {
      input: { text: request.script },
      voice: { languageCode, name: voice },
      audioConfig: {
        audioEncoding: 'LINEAR16',
        speakingRate: clamp(0.25, 2.0, request.speed),
        pitch: clamp(-10, 10, (request.pitch - 1) * 10),
        sampleRateHertz: 22050,
      },
    };

    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Google TTS failed (${response.status}): ${text}`);
    }

    const data = await response.json();
    const audioContent = data.audioContent as string;
    const audioBytes = Uint8Array.from(atob(audioContent), (c) => c.charCodeAt(0));

    const context = new AudioContext();
    const audioBuffer = await context.decodeAudioData(audioBytes.slice(0).buffer);
    const channelData = audioBuffer.getChannelData(0);
    const wavBlob = encodeWav(channelData, audioBuffer.sampleRate);
    const durationMs = Math.floor(audioBuffer.duration * 1000);

    try { await context.close(); } catch {}

    return { wavBlob, durationMs, provider: 'google' };
  }

  private async renderAzure(request: CloudRenderRequest): Promise<CloudRenderResult> {
    const { apiKey, region = 'eastus' } = request.cloudConfig;
    if (!apiKey) throw new Error('Azure API key is required');

    const voice = request.voiceId.replace('azure-', '');
    const rate = `${request.speed > 1 ? '+' : ''}${Math.round((request.speed - 1) * 100)}%`;
    const pitch = `${request.pitch > 0 ? '+' : ''}${Math.round((request.pitch - 1) * 100)}%`;

    const ssml = `<speak version='1.0' xml:lang='en-US' xmlns:mstts='http://www.w3.org/2001/mstts'>
      <voice name='${escapeXml(voice)}'>
        <prosody rate='${rate}' pitch='${pitch}'>
          ${escapeXml(request.script)}
        </prosody>
      </voice>
    </speak>`;

    const url = `https://${encodeURIComponent(region)}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
      },
      body: ssml,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Azure TTS failed (${response.status}): ${text}`);
    }

    const context = new AudioContext();
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer.slice(0));
    const channelData = audioBuffer.getChannelData(0);
    const wavBlob = encodeWav(channelData, audioBuffer.sampleRate);
    const durationMs = Math.floor(audioBuffer.duration * 1000);

    try { await context.close(); } catch {}

    return { wavBlob, durationMs, provider: 'azure' };
  }

  download(wavBlob: Blob, filename: string): void {
    downloadBlob(wavBlob, filename.replace(/\.[^.]+$/, '.wav'));
  }

  async downloadWithMp3(wavBlob: Blob, baseFilename: string): Promise<boolean> {
    const mp3Blob = await renderAudioAsMp3Fallback(wavBlob);
    if (mp3Blob) {
      downloadBlob(mp3Blob, baseFilename.replace(/\.[^.]+$/, '.mp3'));
      return true;
    }
    this.download(wavBlob, baseFilename);
    return false;
  }
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function clamp(min: number, max: number, value: number): number {
  return Math.max(min, Math.min(max, value));
}

export const cloudTTSService = new CloudTTSService();
