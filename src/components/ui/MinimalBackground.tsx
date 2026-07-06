export function MinimalBackground() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-0 bg-cream" />
      <div className="absolute top-[-20%] left-1/2 h-[55vh] w-[120vw] -translate-x-1/2 rounded-full bg-warm-light/25 blur-3xl" />
      <div className="absolute bottom-[-10%] left-1/2 h-[40vh] w-[90vw] -translate-x-1/2 rounded-full bg-cream-dark/60 blur-3xl" />
    </div>
  )
}
