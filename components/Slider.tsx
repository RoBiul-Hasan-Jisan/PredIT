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
    <div className="space-y-4">
      <label className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="inline-block rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1.5 font-playfair text-sm font-bold text-white shadow-md shadow-primary/20 transition-all duration-200">
          {value}
          {suffix}
        </span>
      </label>
      <div className="space-y-3">
        <div className="relative h-2 rounded-full bg-border/40 overflow-hidden">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full cursor-pointer accent-primary appearance-none bg-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, #6B5B95 0%, #6B5B95 ${percentage}%, transparent ${percentage}%, transparent 100%)`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-100 shadow-md shadow-primary/20"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-medium text-muted">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    </div>
  )
}
