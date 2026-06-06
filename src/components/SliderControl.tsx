type SliderControlProps = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

export function SliderControl(props: SliderControlProps) {
  const { id, label, min, max, step, value, onChange } = props;

  return (
    <label className="slider-control" htmlFor={id}>
      <span className="slider-header">
        <span>{label}</span>
        <strong>{value.toFixed(step < 1 ? 2 : 0)}</strong>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
