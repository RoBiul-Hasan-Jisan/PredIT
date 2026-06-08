export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-cream/85 px-12 py-6 backdrop-blur-lg max-sm:px-5 max-sm:py-4">
      <div className="relative inline-flex">
        <div className="absolute inset-0 -z-10 translate-x-1.5 translate-y-1.5 rounded-lg bg-plum" />
        <div className="relative inline-flex items-center gap-1.5 rounded-lg border-2 border-plum bg-cream px-4 py-2">
          <span className="font-playfair text-2xl italic font-bold text-mauve max-sm:text-xl">
            %
          </span>
          <span className="font-playfair text-2xl font-bold text-plum max-sm:text-xl">
            PredIT
          </span>
        </div>
      </div>
      <span className="text-xs font-medium uppercase tracking-widest text-muted">
        Student Score Predictor
      </span>
    </nav>
  )
}
