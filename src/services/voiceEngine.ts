class VoiceEngine {
  private synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) {
      return [];
    }
    return this.synth.getVoices();
  }

  stopPreview(): void {
    this.synth?.cancel();
  }

  preview(script: string): void {
    if (!this.synth || !script.trim()) {
      return;
    }

    this.stopPreview();

    const utterance = new SpeechSynthesisUtterance(script.trim().slice(0, 340));
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 0.9;
    this.synth.speak(utterance);
  }
}

export const voiceEngine = new VoiceEngine();
