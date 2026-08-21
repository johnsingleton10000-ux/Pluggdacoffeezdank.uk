"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GoldFrame } from "@/components/ui/Panel";
import { SITE } from "@/config/site";
import { useStash } from "@/lib/stash";
import { money, waLink } from "@/utils/format";
import type { OrderQuote } from "@/types/ecommerce";

export default function CartPage() {
  const { items, remove, clear } = useStash();
  const [quote, setQuote] = useState<OrderQuote | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function refreshQuote() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/commerce/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items: items.map((item) => ({ id: item.id, qty: item.qty })) }),
      });
      const data = (await response.json()) as OrderQuote & { error?: string };
      if (!response.ok) throw new Error(data.error || "Quote failed");
      setQuote(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Quote failed");
    } finally {
      setBusy(false);
    }
  }

  const message = quote
    ? `Hi DCBD, I want to order from The Vault.\n\n${quote.lines.map((line) => `- ${line.name} x${line.qty} = ${money(line.lineTotalGbp)}`).join("\n")}\n\nTotal: ${money(quote.subtotalGbp)}\nCard exchange eligible: ${quote.cardExchangeEligible ? "Yes" : "No"}\n\nPlease confirm stock and payment instructions.`
    : "";

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="display text-6xl">My Stash / Waistband</h1>
      <p className="mt-4 text-muted">Displayed names come from your stash. The total you pay is the server quote, not the browser.</p>
      <div className="mt-8 space-y-3">
        {items.length === 0 ? <p className="text-muted">Waistband empty. Shop the Vault.</p> : null}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/50 p-4">
            <div>
              <strong>{item.name}</strong>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Qty {item.qty}</p>
            </div>
            <Button variant="ghost" onClick={() => remove(item.id)}>Remove</Button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="gold" onClick={refreshQuote} disabled={!items.length || busy}>{busy ? "Quoting…" : "Get server quote"}</Button>
        <Button variant="ghost" onClick={clear}>Clear stash</Button>
        <ButtonLink href="/shop" variant="pink">Keep shopping</ButtonLink>
      </div>
      {quote ? (
        <GoldFrame className="mt-8">
          <p className="estate-serif">Authoritative quote</p>
          <ul className="mt-4 space-y-2 text-sm">
            {quote.lines.map((line) => (
              <li key={line.id} className="flex justify-between">
                <span>{line.name} × {line.qty}</span>
                <span>{money(line.lineTotalGbp)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-display text-4xl text-green-neon">{money(quote.subtotalGbp)}</p>
          <p className="mt-2 text-sm text-gold">{quote.cardExchangeEligible ? "£40+ card exchange eligible" : "Below card-exchange threshold"}</p>
          <p className="mt-2 text-xs text-muted">Card rewards are allocated after order confirmation. Ownership is not decided in the browser.</p>
          <ButtonLink href={waLink(SITE.whatsapp, message)} external variant="green" className="mt-6">Checkout on WhatsApp</ButtonLink>
        </GoldFrame>
      ) : null}
      {error ? <p className="mt-4 text-pink-neon">{error}</p> : null}
    </main>
  );
}
