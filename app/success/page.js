export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-5 grit-bg">
      <section className="max-w-3xl rounded-[2rem] border border-orange-400/30 bg-black/85 p-8 md:p-12 card-glow text-center">
        <p className="text-orange-400 uppercase tracking-[0.35em] font-black">Complete</p>
        <h1 className="mt-5 text-5xl md:text-7xl font-black uppercase leading-none">Welcome To The Inner Circle</h1>
        <p className="mt-6 text-zinc-300 text-lg">Your checkout has completed. Return home for the next step.</p>
        <a href="/" className="mt-8 inline-flex rounded-full border border-white/20 bg-white/5 px-8 py-4 font-black uppercase">Back Home</a>
      </section>
    </main>
  );
}
