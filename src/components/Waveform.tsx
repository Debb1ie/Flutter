type WaveformProps = {
  active: boolean;
};

export function Waveform({ active }: WaveformProps) {
  return (
    <div className={`waveform ${active ? 'active' : ''}`} aria-hidden="true">
      {Array.from({ length: 28 }).map((_, index) => (
        <span key={index} style={{ animationDelay: `${index * 55}ms` }} />
      ))}
    </div>
  );
}
