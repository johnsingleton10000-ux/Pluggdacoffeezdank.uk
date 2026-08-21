"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BLOOD_TEST_QUESTIONS } from "@/config/blood-test";
import { Button } from "@/components/ui/Button";
import { GoldFrame } from "@/components/ui/Panel";
import { HoodSilhouette, InfinityMark, WaxSeal } from "@/components/ui/Marks";
import { useEstate } from "@/lib/estate";
import { xpFor } from "@/services/xp";
import type { AvatarDefinition } from "@/types/avatar";
import type { ArchetypeId } from "@/types/archetype";
import type { BloodTestScores } from "@/types/blood-test";

interface AnalyzeResponse {
  estateName: string;
  scores: BloodTestScores;
  match: { archetypeId: ArchetypeId };
  avatar: AvatarDefinition;
  deck: { name: string; personality: string; cardIds: string[] };
}

export function BloodTestForm() {
  const router = useRouter();
  const { save, grantXp, addCards } = useEstate();
  const [estateName, setEstateName] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({ war: "", philosophy: "", society: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/onboarding/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ estateName, answers }),
      });
      const data = (await response.json()) as AnalyzeResponse & { error?: string };
      if (!response.ok) throw new Error(data.error || "The AI could not read your energy.");
      save({
        estateName: data.estateName,
        onboarded: true,
        rank: "Street Seat",
        archetypeId: data.match.archetypeId,
        deckName: data.deck.name,
        avatar: data.avatar,
        scores: data.scores,
        starterCardIds: data.deck.cardIds,
      });
      addCards(data.deck.cardIds, "onboarding");
      grantXp(xpFor("onboarding"));
      router.push("/deck");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <GoldFrame className="drip-edge text-center">
        <div className="flex justify-center gap-8 text-purple-neon">
          <InfinityMark />
          <InfinityMark />
          <InfinityMark />
        </div>
        <h1 className="estate-serif mt-4 text-3xl sm:text-5xl">DCBD Estate — Personality Blood Test</h1>
        <p className="mt-4 italic text-gold">Three questions. One truth. Your unique deck is assigned. Build from here.</p>
      </GoldFrame>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {BLOOD_TEST_QUESTIONS.map((question) => (
            <GoldFrame key={question.id} className="drip-edge">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-purple-neon">
                {question.index}. {question.title}
              </p>
              <p className="mt-3 text-cream">{question.prompt}</p>
              <textarea
                required
                minLength={8}
                value={answers[question.id]}
                onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                placeholder="WRITE YOUR TRUTH HERE..."
                className="mt-4 min-h-28 w-full rounded-xl border border-gold/40 bg-black/70 p-4 text-cream outline-none"
              />
            </GoldFrame>
          ))}
        </div>
        <GoldFrame>
          <p className="estate-serif text-lg">AI reads your energy — your unique deck is assigned.</p>
          <div className="mt-5 space-y-5 text-sm">
            <ArchetypePreview title="Aggressor Deck" copy="Attack-focused. Pure pressure. Strike first. No mercy." />
            <div className="text-center text-gold">∞</div>
            <ArchetypePreview title="Controlled Deck" copy="Calm mastery. Outlast. Master the crease." />
            <div className="text-center text-gold">∞</div>
            <ArchetypePreview title="Offense Deck" copy="Fortified attack stance. Protected power. Controlled aggression." />
          </div>
        </GoldFrame>
      </div>

      <GoldFrame className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <WaxSeal />
        <div className="flex-1">
          <p className="estate-serif text-xl">Estate Signature — Lock Your Name</p>
          <p className="mt-2 text-sm text-muted">The AI’s judgment is permanent. The Estate name is sealed.</p>
          <label className="mt-4 block font-estate text-gold">
            Estate Name:
            <input
              required
              minLength={2}
              value={estateName}
              onChange={(event) => setEstateName(event.target.value)}
              className="ml-3 border-b border-gold bg-transparent py-1 text-cream outline-none"
            />
          </label>
        </div>
        <Button type="submit" variant="pink" disabled={busy}>
          {busy ? "Reading…" : "Seal the Blood Seat"}
        </Button>
      </GoldFrame>
      {error ? <p className="text-pink-neon">{error}</p> : null}
      <p className="flex items-center justify-center gap-4 text-sm text-purple-neon">
        <HoodSilhouette /> DCBD Estate Legends — Own it. Control it. Live it. <HoodSilhouette />
      </p>
    </form>
  );
}

function ArchetypePreview({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-xl border border-gold/20 bg-black/40 p-4">
      <h3 className="font-display text-2xl uppercase text-gold">{title}</h3>
      <p className="mt-2 text-muted">{copy}</p>
    </div>
  );
}
