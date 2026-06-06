# EchoVerse

**v2.0 — Now with cloud voices**

> Read anything, out loud, forever.

Paste unlimited text and listen with natural, lifelike voices. No limits. No uploads. Built for readers, listeners, and builders.

EchoVerse is a modern Voice AI storytelling and podcast web application built for the GitHub Finish-Up-A-Thon. It transforms text into expressive audio using a premium black-and-white interface, emotion-aware controls, multi-character story mode, and project workspace persistence.

---

## What's New in v2.0

- Cloud TTS provider support: OpenAI, ElevenLabs, and Azure
- Automatic fallback to local synthesis when cloud is unavailable
- Expanded voice library with male, female, child, elder, and narrator profiles
- All existing features remain fully local and privacy-first

---

## Features

### Unlimited Text
Paste chapters, articles, or entire books. No character limits — read as much as you want.

### Natural Voices
Choose from a growing library of lifelike voices. Fine-tune playback speed and voice pitch to match your preferred listening style.

### Instant Playback
No waiting for render queues. Hear your text instantly powered by the browser via the Web Speech API.

### Privacy Focused
Your text never leaves your device. All processing happens locally in your browser unless a cloud provider is explicitly configured.

### Export Ready
Download your generated audio as high-quality WAV or MP3 for offline listening.

---

## Full Feature Set

### 1. Unlimited Voice Generation

- Long-form text input with no character limits
- Instant generation pipeline
- Voice type switching: male, female, child, elder, narrator

### 2. Emotion Engine

Shape expressive tone with 10 selectable emotions:

| Emotion | Pitch | Speed | Character |
|---|---|---|---|
| Neutral | Flat | Normal | Baseline |
| Happy | Rising | Faster | Bright |
| Sad | Falling | Slower | Subdued |
| Excited | High rise | Fastest | Energetic |
| Angry | Sharp | Fast | Tense |
| Scared | Irregular | Varied | Breathy |
| Dramatic | Contoured | Measured | Theatrical |
| Romantic | Soft | Slow | Warm |
| Suspenseful | Low | Slowest | Tense |
| Inspirational | Rising | Moderate | Bold |

Each emotion dynamically influences pitch contour, speed, pause behavior, expression intensity, jitter, vibrato, harmonic brightness, breathiness, and keyword stress detection.

### 3. Multi-Character Story Mode

- Create and manage character cards
- Set role, voice type, emotion, and style per character
- Generate complete drama-style output from character lines

### 4. Podcast Studio

- Episode title, intro, body script, and outro fields
- Optional background tone mode
- Full audio export per segment

### 5. Advanced Audio Controls

- Pitch, speed, volume, and emotion intensity sliders
- Configurable pause behavior

### 6. Real-Time Preview

- One-click preview of the current script
- Instant browser-native feedback via Web Speech API

### 7. Audio Export

- WAV download
- MP3 export when the browser recorder supports MPEG
- Save project snapshots for later editing

### 8. Project Workspace

- Save project state to local storage
- Load, delete, and clear project snapshots

### 9. Cloud TTS Provider Integration

EchoVerse v2.0 integrates with premium cloud TTS providers behind the existing service layer, with automatic fallback to local synthesis.

**OpenAI TTS**
- Models: `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts`
- Voices: `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`
- Voice mapping: male→echo, female→nova, child→shimmer, elder→onyx

**ElevenLabs**
- Models: `eleven_turbo_v2`, `eleven_flash_v2`, `eleven_multilingual_v2`
- 18 available voices including Rachel, Drew, Clyde, Sarah, Matilda, and more
- Configurable stability, similarity boost, style, and speaker boost

**Azure Cognitive Services**
- SSML-based synthesis with MSTTS express-as styles
- Region-aware endpoint routing
- Default voice: `en-US-JennyNeural` (expandable to regional voice sets)
- Prosody controls for rate and pitch

**Fallback behavior:** any cloud provider failure silently falls back to local synthesis. A missing API key disables cloud mode and returns local.

---

## How It Works

1. **Paste Text** — Drop in any article, chapter, or long-form content.
2. **Choose Voice** — Browse available voices and pick one that fits the mood.
3. **Adjust Settings** — Set speed, pitch, and volume with intuitive sliders.
4. **Listen & Enjoy** — Hit play or generate audio for export.

---

## Installation

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Lint source files
```

---

## Tech Stack

- React 19 + TypeScript
- Vite
- Web Speech API (preview)
- Web Audio API + WAV encoder (generation)
- HTML5 / CSS3
- Font: Plus Jakarta Sans

## Architecture

```
src/
├── components/
│   ├── CharacterStudio.tsx
│   ├── EmotionChips.tsx
│   ├── PodcastStudioPanel.tsx
│   ├── ProjectWorkspace.tsx
│   ├── SliderControl.tsx
│   └── Waveform.tsx
├── hooks/
│   └── useLocalProjects.ts
├── pages/
│   └── StudioPage.tsx
├── services/
│   ├── voiceEngine.ts
│   └── cloudTTS.ts
├── styles/
│   └── app.css
├── types/
│   ├── voice.ts
│   └── cloudTTS.ts
└── utils/
    ├── audioExport.ts
    ├── emotion.ts
    └── emotion.test.ts
```

**Service layer**
- `voiceEngine.ts` — rendering pipeline
- `cloudTTS.ts` — provider adapters and health checks
- `audioExport.ts` — WAV encoding, blob download, MP3 fallback

---

## Screenshots

| View | Path |
|---|---|
| Studio overview | `docs/screenshots/studio-overview.png` |
| Emotion Engine | `docs/screenshots/emotion-engine.png` |
| Multi-character mode | `docs/screenshots/multi-character.png` |
| Podcast studio | `docs/screenshots/podcast-studio.png` |

---

## Accessibility & Performance

- Semantic form controls and ARIA labels
- Keyboard-accessible buttons and tab interactions
- High-contrast black-and-white theme
- Lightweight CSS animations
- <50ms average start latency

---

## Roadmap

- [x] Cloud TTS provider integrations (OpenAI, ElevenLabs, Azure)
- [ ] Character timeline editor with drag-and-drop sequencing
- [ ] Background music upload and mixing
- [ ] Collaborative cloud project workspace
- [ ] Voice cloning and multilingual support

---

## License

MIT