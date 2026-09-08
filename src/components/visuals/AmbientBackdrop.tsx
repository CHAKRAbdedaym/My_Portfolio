/**
 * Page-wide atmosphere: a blueprint grid, two slowly drifting accent blooms,
 * and a very fine grain layer.
 *
 * Entirely CSS — no canvas, no JS, no paint cost beyond compositing — and
 * `fixed` so it never contributes to document height or horizontal overflow.
 */
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="noise pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* blueprint grid, faded out towards the edges */}
      <div className="bg-grid mask-fade absolute inset-0" />

      {/* accent blooms */}
      <div className="absolute -top-[22rem] left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_68%)] blur-3xl" />
      <div className="animate-drift absolute -left-40 top-[38%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,var(--glow-2),transparent_70%)] blur-3xl" />
      <div className="animate-drift absolute -right-48 top-[68%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,var(--glow-3),transparent_70%)] blur-3xl [animation-delay:-8s]" />

      {/* subtle vignette so content always sits on a settled ground */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_40%,var(--bg)_100%)]" />
    </div>
  );
}
