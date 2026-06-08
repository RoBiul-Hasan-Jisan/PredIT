'use client'

export default function Hero() {
  const scrollToForm = () => {
    const element = document.getElementById('predictor')
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative overflow-hidden px-12 py-20 text-center max-sm:px-5 max-sm:py-16">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-96 w-96 -translate-x-1/3 -translate-y-1/4 rounded-full border border-border opacity-50" />
      <div className="pointer-events-none absolute top-10 right-0 z-0 h-72 w-72 translate-x-1/4 rounded-full border border-border opacity-40" />
      <div className="pointer-events-none absolute bottom-8 left-10 z-0 h-32 w-32 rounded-full bg-sage opacity-12" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-6 inline-flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-sage-dk" />
          <span className="text-xs font-semibold uppercase tracking-widest text-mauve">
            ML-Powered Prediction
          </span>
          <span className="inline-block h-2 w-2 rounded-full bg-sage-dk" />
        </div>

        <h1 className="mb-6 font-playfair text-6xl font-bold leading-tight text-plum max-sm:text-4xl">
          Predict your <em className="font-playfair italic text-mauve">Exam Score</em>
        </h1>

        <p className="mb-10 text-lg font-light leading-relaxed text-muted">
          Answer a few questions about your study habits, environment, and lifestyle.
          Our model will predict your exam performance instantly.
        </p>

        <div className="mb-11 flex flex-wrap items-center justify-center gap-5 max-sm:gap-3">
          <div className="text-center">
            <div className="font-playfair text-3xl font-bold text-plum max-sm:text-2xl">
              20
            </div>
            <div className="text-xs uppercase tracking-wider text-muted max-sm:text-xs">
              Features
            </div>
          </div>
          <div className="text-2xl font-light text-border max-sm:text-lg">·</div>
          <div className="text-center">
            <div className="font-playfair text-3xl font-bold text-plum max-sm:text-2xl">
              77%
            </div>
            <div className="text-xs uppercase tracking-wider text-muted max-sm:text-xs">
              Accuracy
            </div>
          </div>
          <div className="text-2xl font-light text-border max-sm:text-lg">·</div>
          <div className="text-center">
            <div className="font-playfair text-3xl font-bold text-plum max-sm:text-2xl">
              4
            </div>
            <div className="text-xs uppercase tracking-wider text-muted max-sm:text-xs">
              Steps
            </div>
          </div>
        </div>

        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-2.5 rounded-full bg-plum px-8 py-3.5 font-semibold text-cream shadow-lg shadow-plum/28 transition-all duration-200 hover:bg-mauve hover:shadow-lg hover:shadow-mauve/35 hover:-translate-y-0.5"
        >
          <span>Start Prediction</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-y-1">
            <path
              d="M8 3v10M3 8l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
