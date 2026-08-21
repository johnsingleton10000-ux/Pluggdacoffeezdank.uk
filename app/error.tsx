"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-[50vh] place-items-center px-4">
      <section className="gold-frame max-w-lg rounded-2xl p-6 text-center">
        <h1 className="estate-title text-3xl">The table jammed</h1>
        <p className="mt-3 text-muted">Something failed on this page. The rest of the Estate still stands.</p>
        <button className="btn btn-gold mt-5" onClick={reset}>Try again</button>
      </section>
    </main>
  );
}
