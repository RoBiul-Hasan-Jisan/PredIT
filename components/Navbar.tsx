export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 px-14 py-5 backdrop-blur-xl max-sm:px-6 max-sm:py-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary p-2 shadow-lg shadow-primary/15">
          <span className="font-playfair text-xl italic font-bold text-white max-sm:text-lg">
            %
          </span>
          <span className="font-playfair text-xl font-bold text-white max-sm:text-lg">
            PredIT
          </span>
        </div>
      </div>
      <span className="text-xs font-medium uppercase tracking-widest text-muted">
        ML Score Predictor
      </span>
    </nav>
  )
}
