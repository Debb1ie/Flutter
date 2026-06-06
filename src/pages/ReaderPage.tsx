import { useEffect, useState, useRef } from 'react';
import { voiceEngine } from '../services/voiceEngine';
import '../styles/reader.css';

const SAMPLE_TEXT = `Paste or type your long text here. LongUnlimitedReader will read it aloud using your browser's built-in voices.

You can load chapters, articles, books, or any lengthy content. The reader supports long, unlimited text and streams it in chunks so your audio isn't limited by size.`;

export function ReaderPage() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = voiceEngine.getVoices();
      setVoices(allVoices);
      if (allVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(allVoices[0].voiceURI);
      }
    };

    loadVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      voiceEngine.stopPreview();
    };
  }, []);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handlePlay = () => {
    if (isPaused && isSpeaking) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }
    if (isSpeaking) return;

    const utterance = new SpeechSynthesisUtterance(text.trim() || 'Hello from LongUnlimitedReader.');
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 0.9;

    if (selectedVoice) {
      const voice = voices.find((v) => v.voiceURI === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    voiceEngine.stopPreview();
    setIsSpeaking(false);
    setIsPaused(false);
    utteranceRef.current = null;
  };

  return (
    <div className="reader-shell">
      <header className="reader-header">
        <div>
          <h1>Reader</h1>
          <p className="reader-subtitle">Read aloud using browser voices</p>
        </div>
      </header>

      <section className="reader-controls">
        <button type="button" className="control-btn" onClick={handlePlay} disabled={isSpeaking}>
          Play
        </button>
        <button type="button" className="control-btn" onClick={handlePause} disabled={!isSpeaking || isPaused}>
          Pause
        </button>
        <button type="button" className="control-btn stop" onClick={handleStop} disabled={!isSpeaking && !isPaused}>
          Stop
        </button>
      </section>

      <section className="reader-settings">
        <div className="setting-field">
          <label className="reader-label" htmlFor="voice-select">Voice</label>
          <select
            id="voice-select"
            className="reader-select"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {voices.length === 0 ? (
              <option value="">Loading voices...</option>
            ) : (
              voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} {v.lang ? `(${v.lang})` : ''}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="setting-field">
          <label className="reader-label" htmlFor="rate-slider">Speed: {rate.toFixed(1)}x</label>
          <input
            id="rate-slider"
            type="range"
            className="reader-slider"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>

        <div className="setting-field">
          <label className="reader-label" htmlFor="pitch-slider">Pitch: {pitch.toFixed(1)}</label>
          <input
            id="pitch-slider"
            type="range"
            className="reader-slider"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
          />
        </div>
      </section>

      <section className="reader-panel">
        <label className="reader-label">Text to read</label>
        <textarea
          className="reader-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type unlimited text here..."
        />
        <div className="reader-meta">
          <span className="word-count">{wordCount} words</span>
          <span className="char-count">{text.length} characters</span>
        </div>
      </section>
    </div>
  );
}
