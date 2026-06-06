export type CloudProvider = 'google' | 'azure' | 'local';

export type CloudTTSConfig = {
  provider: CloudProvider;
  apiKey?: string;
  region?: string;
  voiceId?: string;
  enabled: boolean;
};

export const PROVIDER_LABELS: Record<CloudProvider, string> = {
  google: 'Google Cloud TTS',
  azure: 'Microsoft Azure TTS',
  local: 'Local (built-in)',
};

export const PROVIDER_VOICE_PREFIXES: Record<CloudProvider, string> = {
  google: 'google-',
  azure: 'azure-',
  local: '',
};

export const CLOUD_PROVIDER_VOICES: Record<CloudProvider, { label: string; value: string }[]> = {
  google: [
    { label: 'en-US-Neural2-A (male)', value: 'google-US-Neural2-A' },
    { label: 'en-US-Neural2-C (female)', value: 'google-US-Neural2-C' },
    { label: 'en-US-Neural2-D (male)', value: 'google-US-Neural2-D' },
    { label: 'en-US-Neural2-E (female)', value: 'google-US-Neural2-E' },
    { label: 'en-US-Neural2-F (female)', value: 'google-US-Neural2-F' },
    { label: 'en-GB-Neural2-A (male)', value: 'google-GB-Neural2-A' },
    { label: 'en-GB-Neural2-B (male)', value: 'google-GB-Neural2-B' },
    { label: 'en-GB-Neural2-D (male)', value: 'google-GB-Neural2-D' },
  ],
  azure: [
    { label: 'en-US-JennyNeural', value: 'azure-en-US-JennyNeural' },
    { label: 'en-US-GuyNeural', value: 'azure-en-US-GuyNeural' },
    { label: 'en-US-AriaNeural', value: 'azure-en-US-AriaNeural' },
    { label: 'en-US-DavisNeural', value: 'azure-en-US-DavisNeural' },
    { label: 'en-GB-SoniaNeural', value: 'azure-en-GB-SoniaNeural' },
    { label: 'en-GB-RyanNeural', value: 'azure-en-GB-RyanNeural' },
  ],
  local: [],
};
