"use client";

import { useState } from "react";
import { usePlayer } from "@/lib/state/player";
import { Button } from "@/components/ui/Button";

const BOARDS = ["announcements", "game", "cards", "trading"] as const;

export default function CommunityPage() {
  const { state, addPost } = usePlayer();
  const [board, setBoard] = useState<(typeof BOARDS)[number]>("announcements");
  const [name, setName] = useState(state.estateName || "");
  const [text, setText] = useState("");
  const posts = [...state.posts].concat([
    { id: "d1", name: "EstateBorn", text: "Member voting board opens after the first product drop.", time: "2d ago", board: "announcements" },
    { id: "d2", name: "PandaProfessor", text: "Show off your rookie card collection here.", time: "1d ago", board: "cards" },
    { id: "d3", name: "SmokeKing23", text: "What flavour should return next month?", time: "2h ago", board: "announcements" },
  ]).filter((post) => post.board === board);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Estate Born</p>
      <h1 className="display mt-2 text-5xl sm:text-7xl">Community</h1>
      <p className="mt-3 text-muted">Not a generic forum plugin. Same Estate language, same gold frames, same blood log energy.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {BOARDS.map((item) => (
          <Button key={item} variant={board === item ? "gold" : "ghost"} onClick={() => setBoard(item)}>{item}</Button>
        ))}
      </div>
      <form
        className="gold-frame mt-6 grid gap-3 rounded-2xl p-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (!text.trim()) return;
          addPost(name, text.trim(), board);
          setText("");
        }}
      >
        <input className="input-recessed" placeholder="Estate name" value={name} onChange={(event) => setName(event.target.value)} />
        <textarea className="input-recessed min-h-24" placeholder="Post a review, idea or card pull" value={text} onChange={(event) => setText(event.target.value)} />
        <Button type="submit" variant="lime">Post</Button>
      </form>
      <div className="mt-6 space-y-3">
        {posts.map((post) => (
          <article key={post.id} className="gold-frame rounded-2xl p-4">
            <p className="font-black">{post.name}</p>
            <p className="mt-1">{post.text}</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted">{post.time}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
