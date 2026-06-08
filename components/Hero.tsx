'use client'

export default function Hero() {
  const scrollToForm = () => {
    const element = document.getElementById('predictor')
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative overflow-hidden px-14 py-28 text-center max-sm:px-6 max-sm:py-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute top-0 right-0 -z-10 h-[600px] w-[600px] -translate-x-1/4 -translate-y-1/3 rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-secondary/6 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-8 inline-flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Machine Learning Powered
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        </div>

        <h1 className="mb-8 font-playfair text-6xl font-bold leading-tight text-foreground max-sm:text-4xl">
          Predict Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Exam Score</span>
        </h1>

        <p className="mb-12 text-lg font-light leading-relaxed text-foreground/70">
          Answer 20 questions about your study habits, environment, and lifestyle. Our ML model will instantly predict your exam performance with 77% accuracy.
        </p>

        <div className="mb-14 grid grid-cols-3 gap-6 max-sm:gap-3">
          <div className="rounded-2xl bg-card p-5 shadow-sm border border-border">
            <div className="font-playfair text-3xl font-bold text-primary max-sm:text-2xl">
              20
            </div>
            <div className="text-xs uppercase tracking-wider text-muted font-medium">
              Features
            </div>
          </div>
          <div className="rounded-2xl bg-card p-5 shadow-sm border border-border">
            <div className="font-playfair text-3xl font-bold text-primary max-sm:text-2xl">
              77%
            </div>
            <div className="text-xs uppercase tracking-wider text-muted font-medium">
              Accuracy
            </div>
          </div>
          <div className="rounded-2xl bg-card p-5 shadow-sm border border-border">
            <div className="font-playfair text-3xl font-bold text-primary max-sm:text-2xl">
              4
            </div>
            <div className="text-xs uppercase tracking-wider text-muted font-medium">
              Steps
            </div>
          </div>
        </div>

        <button
          onClick={scrollToForm}
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-9 py-4 font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-1 active:translate-y-0"
        >
          <span>Start Prediction</span>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-y-1">
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
