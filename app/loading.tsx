export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading DCBD"
      className="mx-auto min-h-[70svh] max-w-shell animate-pulse px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="h-7 w-44 rounded-full bg-surface-overlay" />
      <div className="mt-7 h-20 max-w-3xl rounded-2xl bg-surface" />
      <div className="mt-4 h-20 max-w-2xl rounded-2xl bg-surface" />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="h-72 rounded-2xl bg-surface" />
        <div className="h-72 rounded-2xl bg-surface" />
      </div>
    </main>
  );
}
