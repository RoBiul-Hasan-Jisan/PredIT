interface SliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  suffix?: string
  minLabel: string
  maxLabel: string
}

export default function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix = '',
  minLabel,
  maxLabel,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-3">
      <label className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-text-mid">{label}</span>
        <span className="inline-block rounded-full bg-sage px-3 py-1 font-playfair text-sm font-bold text-plum transition-background duration-200">
          {value}
          {suffix}
        </span>
      </label>
      <div className="space-y-2">
        <div className="relative h-1.5 rounded-full bg-cream-dk overflow-hidden">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full cursor-pointer accent-mauve appearance-none bg-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, #74404C 0%, #74404C ${percentage}%, transparent ${percentage}%, transparent 100%)`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-mauve to-sage-dk transition-all duration-100"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    </div>
  )
}
