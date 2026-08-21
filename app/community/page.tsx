"use client";

import { useState } from "react";
import { GoldFrame } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";
import { DEFAULT_POSTS, FORUM_BOARDS } from "@/services/forum";
import { useEstate } from "@/lib/estate";
import { xpFor } from "@/services/xp";
import type { ForumPost } from "@/types/forum";

export default function CommunityPage() {
  const { profile, grantXp } = useEstate();
  const [board, setBoard] = useState<(typeof FORUM_BOARDS)[number]["id"]>("general");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState<ForumPost[]>([...DEFAULT_POSTS]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="display text-6xl">Estate Born</h1>
      <p className="mt-4 text-muted">Not a generic forum plugin. Same gold frames, same street language, same account.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {FORUM_BOARDS.map((item) => (
          <button key={item.id} type="button" onClick={() => setBoard(item.id)} className={`min-h-touch rounded-full px-4 py-2 text-xs font-black uppercase ${board === item.id ? "bg-purple-drip" : "border border-white/20"}`}>
            {item.name}
          </button>
        ))}
      </div>
      <GoldFrame className="mt-8">
        <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Post a review, idea or card pull" className="min-h-24 w-full bg-transparent outline-none" />
        <Button
          variant="purple"
          onClick={() => {
            if (!text.trim()) return;
            setPosts((current) => [
              { id: `local-${Date.now()}`, author: profile.estateName || "Guest", board, text: text.trim(), createdAt: "Just now" },
              ...current,
            ]);
            setText("");
            grantXp(xpFor("community"));
          }}
        >
          Post
        </Button>
      </GoldFrame>
      <div className="mt-6 space-y-4">
        {posts.filter((post) => post.board === board).map((post) => (
          <article key={post.id} className="rounded-2xl border border-white/10 bg-black/50 p-4">
            <strong className="text-gold">{post.author}</strong>
            <p className="mt-2">{post.text}</p>
            <small className="text-muted">{post.createdAt}</small>
          </article>
        ))}
      </div>
    </main>
  );
}
