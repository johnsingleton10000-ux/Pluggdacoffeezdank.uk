"use client";

import { AVATAR_POOL } from "@/config/avatars";
import { Crown } from "@/components/ui/Marks";
import type { AvatarDefinition } from "@/types/avatar";

const SILHOUETTE: Record<AvatarDefinition["silhouette"], string> = {
  caesar: "Caesar",
  boss: "Boss",
  queen: "Queen",
  hood: "Hood",
  obelisk: "Obelisk",
  fortress: "Fortress",
  monk: "Monk",
  lion: "Lion",
};

export function AvatarPortrait({ avatar, large }: { avatar: AvatarDefinition; large?: boolean }) {
  return (
    <div className="text-center">
      <div
        className={`mx-auto grid place-items-center rounded-full border ${large ? "h-40 w-40" : "h-24 w-24"}`}
        style={{ borderColor: avatar.glow, boxShadow: `0 0 28px ${avatar.glow}66`, background: `${avatar.glow}22` }}
      >
        <Crown className={large ? "h-16 w-16" : "h-10 w-10"} />
      </div>
      <p className="mt-3 text-[0.65rem] font-black uppercase tracking-[0.2em] text-gold">{avatar.title}</p>
      <h3 className="font-estate text-lg text-gold">{avatar.name}</h3>
      <p className="text-xs text-muted">{SILHOUETTE[avatar.silhouette]} • {avatar.personality}</p>
    </div>
  );
}

export function AvatarGrid({ selectedId }: { selectedId?: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
      {AVATAR_POOL.map((avatar) => (
        <div
          key={avatar.id}
          className="rounded-2xl border p-3"
          style={{
            borderColor: selectedId === avatar.id ? avatar.glow : "rgba(255,255,255,.1)",
            boxShadow: selectedId === avatar.id ? `0 0 18px ${avatar.glow}` : undefined,
          }}
        >
          <AvatarPortrait avatar={avatar} />
        </div>
      ))}
    </div>
  );
}
