"use client";

import { usePlayer } from "@/lib/state/player";
import { priceCart } from "@/lib/domains/ecommerce";
import { money } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useState } from "react";

export default function StashPage() {
  const { state, removeFromCart, clearCart } = usePlayer();
  const cart = priceCart(state.cart);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function checkout() {
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: state.cart }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.open(data.whatsappUrl, "_blank");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">My Stash</p>
      <h1 className="display mt-2 text-5xl">Waistband</h1>
      <p className="mt-3 text-muted">Browser shows the total. Server recomputes price from the catalogue before WhatsApp checkout.</p>
      <div className="gold-frame mt-6 rounded-2xl p-5">
        {cart.lines.length === 0 ? (
          <p className="text-muted">Your stash is empty. Add products from The Vault.</p>
        ) : (
          <ul className="space-y-3">
            {cart.lines.map((line) => (
              <li key={line.product.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <p className="font-black">{line.product.name} × {line.qty}</p>
                  <p className="text-sm text-muted">{line.product.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lime">{money(line.lineTotalGbp)}</span>
                  <Button variant="ghost" onClick={() => removeFromCart(line.product.id)}>Remove</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="display text-3xl">Total {money(cart.totalGbp)}</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="pink" disabled={!cart.lines.length || pending} onClick={checkout}>Checkout on WhatsApp</Button>
            <Button variant="ghost" onClick={clearCart}>Clear Stash</Button>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted">{cart.exchangeEligible ? "Card exchange eligible." : "Below the £40 exchange threshold."}</p>
        {error ? <p className="mt-3 text-pink">{error}</p> : null}
        <ButtonLink href="/shop" variant="ghost" className="mt-4">Back to Vault</ButtonLink>
      </div>
    </main>
  );
}
