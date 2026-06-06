import { useState, useRef, useCallback } from 'react';
import { cloudTTSService } from '../services/cloudTTS';
import type { CloudProvider } from '../types/cloudTTS';
import { CLOUD_PROVIDER_VOICES } from '../types/cloudTTS';
import { Waveform } from '../components/Waveform';
import { SliderControl } from '../components/SliderControl';
import { downloadBlob, renderAudioAsMp3Fallback } from '../utils/audioExport';

const INITIAL_TEXT = `Paste or type your long text here. LongUnlimitedReader will read it aloud using Google or Microsoft cloud voices.\n\nYou can load chapters, articles, books, or any lengthy content. The reader supports long, unlimited text and streams it in chunks so your audio isn't limited by size.`;

const initialControls = {
  pitch: 1,
  speed: 1,
  volume: 0.9,
};

export function StudioPage() {
  const [script, setScript] = useState(INITIAL_TEXT);
  const [provider, setProvider] = useState<CloudProvider>('local');
  const [voiceId, setVoiceId] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [region, setRegion] = useState('eastus');
  const [controls, setControls] = useState(initialControls);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [durationMs, setDurationMs] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cancelRef = useRef(false);

  const voices = CLOUD_PROVIDER_VOICES[provider] ?? [];

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextProvider = e.target.value as CloudProvider;
    setProvider(nextProvider);
    const nextVoices = CLOUD_PROVIDER_VOICES[nextProvider] ?? [];
    if (nextVoices.length > 0) {
      setVoiceId(nextVoices[0].value);
    } else {
      setVoiceId('');
    }
  };

  const handleGenerate = useCallback(async () => {
    cancelRef.current = false;
    setIsGenerating(true);
    try {
      const trimmed = script.trim();
      if (!trimmed) {
        setIsGenerating(false);
        return;
      }

      cloudTTSService.updateConfig({ provider, enabled: !!apiKey, apiKey, region });
      const result = await cloudTTSService.render({
        script: trimmed,
        voiceId,
        provider,
        speed: controls.speed,
        pitch: controls.pitch,
        cloudConfig: cloudTTSService.getConfig(),
      });

      if (cancelRef.current) return;

      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioBlob(result.wavBlob);
      setAudioUrl(URL.createObjectURL(result.wavBlob));
      setDurationMs(result.durationMs);
    } catch (error) {
      console.error('Generate failed', error);
      window.alert(error instanceof Error ? error.message : 'Audio generation failed');
    } finally {
      setIsGenerating(false);
    }
  }, [script, provider, voiceId, apiKey, region, controls, audioUrl]);

  const handlePreview = useCallback(async () => {
    setIsPreviewing(true);
    try {
      cloudTTSService.updateConfig({ provider, enabled: !!apiKey, apiKey, region });
      const result = await cloudTTSService.render({
        script: script.trim() || 'Hello from LongUnlimitedReader.',
        voiceId,
        provider,
        speed: controls.speed,
        pitch: controls.pitch,
        cloudConfig: cloudTTSService.getConfig(),
      });
      if (!cancelRef.current) {
        const previewUrl = URL.createObjectURL(result.wavBlob);
        if (audioRef.current) {
          audioRef.current.src = previewUrl;
          void audioRef.current.play();
        }
      }
    } catch (error) {
      console.error('Preview failed', error);
    } finally {
      setIsPreviewing(false);
    }
  }, [script, provider, voiceId, apiKey, region, controls]);

  const handleStop = () => {
    cancelRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleExportWav = () => {
    if (!audioBlob) return;
    downloadBlob(audioBlob, 'long-unlimited-reader.wav');
  };

  const handleExportMp3 = async () => {
    if (!audioBlob) return;
    const mp3Blob = await renderAudioAsMp3Fallback(audioBlob);
    if (!mp3Blob) {
      window.alert('MP3 export is not supported in this browser. WAV export is fully available.');
      return;
    }
    downloadBlob(mp3Blob, 'long-unlimited-reader.mp3');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScript(e.target.value);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Text-to-Speech</p>
          <h1>LongUnlimitedReader</h1>
          <p className="subtitle">Unlimited text reader powered by Google or Microsoft voices.</p>
        </div>
        <div className="header-actions">
          <button type="button" className="ghost" onClick={handlePreview} disabled={isPreviewing}>
            {isPreviewing ? 'Previewing...' : 'Preview voice'}
          </button>
          <button type="button" className="primary" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate audio'}
          </button>
        </div>
      </header>

      <Waveform active={isGenerating || isPreviewing} />

      <main className="layout-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>Reader settings</h2>
          </div>

          <div className="field">
            <label>Provider</label>
            <select
              className="select"
              value={provider}
              onChange={handleProviderChange}
            >
              <option value="local">Local (browser built-in)</option>
              <option value="google">Google Cloud TTS</option>
              <option value="azure">Microsoft Azure TTS</option>
            </select>
          </div>

          {provider !== 'local' && (
            <div className="field">
              <label>API key</label>
              <input
                className="input"
                type="password"
                placeholder={`Paste your ${provider === 'google' ? 'Google Cloud' : 'Azure'} API key`}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          )}

          {provider === 'azure' && (
            <div className="field">
              <label>Azure region</label>
              <input
                className="input"
                placeholder="eastus"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
          )}

          <div className="field">
            <label>Voice</label>
            <select
              className="select"
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
            >
              {voices.length === 0 ? (
                <option value="">No voices list</option>
              ) : (
                voices.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="slider-grid">
            <SliderControl
              id="pitch"
              label="Pitch"
              min={0.6}
              max={1.8}
              step={0.01}
              value={controls.pitch}
              onChange={(value) => setControls((c) => ({ ...c, pitch: value }))}
            />
            <SliderControl
              id="speed"
              label="Speed"
              min={0.6}
              max={1.8}
              step={0.01}
              value={controls.speed}
              onChange={(value) => setControls((c) => ({ ...c, speed: value }))}
            />
            <SliderControl
              id="volume"
              label="Volume"
              min={0}
              max={1}
              step={0.01}
              value={controls.volume}
              onChange={(value) => setControls((c) => ({ ...c, volume: value }))}
            />
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Text to read</h2>
          </div>
          <textarea
            className="textarea"
            rows={18}
            value={script}
            onChange={handleTextChange}
            placeholder="Paste or type unlimited text here..."
          />
        </section>
      </main>

      <section className="panel output-panel">
        <div className="panel-header">
          <h2>Audio output</h2>
        </div>
        <div className="output-meta">
          <span>Duration: {(durationMs / 1000).toFixed(2)}s</span>
          <span>WAV + MP3 export ready</span>
        </div>
        {audioUrl ? (
          <audio ref={audioRef} controls src={audioUrl} className="audio" />
        ) : (
          <p className="muted">Generate or preview audio to listen.</p>
        )}
        <div className="output-actions">
          <button type="button" className="primary" onClick={handleExportWav} disabled={!audioBlob}>
            Download WAV
          </button>
          <button type="button" className="ghost" onClick={handleStop} disabled={!isGenerating && !isPreviewing}>
            Stop audio
          </button>
          <button type="button" className="ghost" onClick={handleExportMp3} disabled={!audioBlob}>
            Download MP3
          </button>
        </div>
      </section>
    </div>
  );
}
