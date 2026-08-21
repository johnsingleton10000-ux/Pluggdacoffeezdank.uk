"use client";

import { useState } from "react";
import { BLOOD_QUESTIONS, DECK_PREVIEWS, type BloodAnswer } from "@/lib/domains/blood-test";
import { Button } from "@/components/ui/Button";
import { InfinityMark } from "@/components/ui/Marks";
import { usePlayer } from "@/lib/state/player";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { grantBloodTest, state } = usePlayer();
  const router = useRouter();
  const [estateName, setEstateName] = useState(state.estateName || "");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit() {
    setPending(true);
    setError("");
    const payload: BloodAnswer[] = BLOOD_QUESTIONS.map((question) => ({ questionId: question.id, text: answers[question.id] || "" }));
    try {
      const res = await fetch("/api/onboarding/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: payload, estateName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "The Estate could not read you.");
      grantBloodTest(data.result, data.estateName);
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-center gap-4 text-purple-neon">
        <InfinityMark />
        <InfinityMark className="h-12 w-12" />
        <InfinityMark />
      </div>
      <h1 className="estate-title mt-4 text-center text-4xl sm:text-6xl">DCBD Estate — Personality Blood Test</h1>
      <p className="mt-3 text-center text-gold">Three questions. One truth. Your unique deck is assigned. Build from here.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {BLOOD_QUESTIONS.map((question) => (
            <section key={question.id} className="gold-frame drip rounded-2xl p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-purple-neon">({question.number}) {question.title}</p>
              <p className="mt-3">{question.prompt}</p>
              <textarea
                className="input-recessed mt-4 min-h-24"
                placeholder="WRITE YOUR TRUTH HERE..."
                value={answers[question.id] || ""}
                onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
              />
            </section>
          ))}
        </div>
        <aside className="gold-frame rounded-2xl p-5">
          <p className="estate-title text-xl">AI reads your energy — your unique deck is assigned.</p>
          <div className="mt-5 space-y-5">
            {DECK_PREVIEWS.map((deck) => (
              <div key={deck.id} className="border-b border-gold/30 pb-4">
                <p className="font-black uppercase text-gold">{deck.name}</p>
                <p className="mt-1 text-sm text-muted">{deck.copy}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <section className="gold-frame mt-6 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className="text-xs uppercase tracking-[0.2em] text-gold">Estate Signature — Lock your name</span>
          <input className="input-recessed mt-2" value={estateName} onChange={(event) => setEstateName(event.target.value)} placeholder="Estate Name" />
        </label>
        <div className="wax-seal">∞</div>
        <Button variant="pink" disabled={pending} onClick={submit}>Seal the Blood Test</Button>
      </section>
      {error ? <p className="mt-3 text-pink">{error}</p> : null}
      <p className="mt-6 text-center text-purple-neon">Answer in pure Estate language. No soft talk. Street code only. Then build.</p>
    </main>
  );
}
