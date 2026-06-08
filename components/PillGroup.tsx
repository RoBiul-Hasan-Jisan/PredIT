interface Option {
  label: string
  value: string
}

interface PillGroupProps {
  label: string
  field: string
  options: (string | Option)[]
  value: string
  onChange: (value: string) => void
  hasError: boolean
}

export default function PillGroup({
  label,
  field,
  options,
  value,
  onChange,
  hasError,
}: PillGroupProps) {
  const normalizedOptions = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  )

  return (
    <div className={`space-y-4 ${hasError ? 'animate-shake' : ''}`} data-field={field}>
      <label className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      <div className={`flex flex-wrap gap-3 rounded-2xl p-2 transition-all ${hasError ? 'border border-red-400/50 bg-red-50/50' : 'bg-background/50'}`}>
        {normalizedOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
              value === option.value
                ? 'border-primary bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/25'
                : hasError
                  ? 'border-red-400/50 bg-red-50 text-red-700 hover:border-red-500 hover:bg-red-100'
                  : 'border-border bg-card text-muted hover:border-primary hover:bg-primary/5 hover:text-primary'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
