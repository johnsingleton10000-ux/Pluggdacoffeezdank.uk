export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading DCBD"
      className="mx-auto min-h-[70svh] w-full max-w-7xl px-4 py-16 sm:px-6"
    >
      <div className="h-7 w-36 animate-pulse rounded bg-surface-raised" />
      <div className="mt-6 h-16 max-w-2xl animate-pulse rounded bg-surface-raised" />
      <div className="mt-4 h-7 max-w-xl animate-pulse rounded bg-surface-raised" />
      <span className="sr-only">Loading DCBD…</span>
    </main>
  );
}
