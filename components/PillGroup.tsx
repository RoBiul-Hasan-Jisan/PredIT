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
    <div className={`space-y-3 ${hasError ? 'animate-shake' : ''}`} data-field={field}>
      <label className="block text-sm font-medium text-text-mid">
        {label}
      </label>
      <div className={`flex flex-wrap gap-2.5 rounded-lg p-1 transition-colors ${hasError ? 'border border-[#d4826a] bg-[#d4826a]/5' : ''}`}>
        {normalizedOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-full border-1.5 px-5 py-2.5 text-sm font-medium transition-all duration-150 ${
              value === option.value
                ? 'border-plum bg-plum text-cream shadow-md shadow-plum/20'
                : hasError
                  ? 'border-[#d4826a] bg-transparent text-[#d4826a]'
                  : 'border-border bg-cream text-muted hover:border-mauve hover:bg-mauve/5 hover:text-mauve'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
