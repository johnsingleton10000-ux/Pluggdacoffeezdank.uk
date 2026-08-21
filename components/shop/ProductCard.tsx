import type { ReactNode } from "react";
import Link from "next/link";
import { cn, money } from "@/lib/utils";
import type { CatalogProduct } from "@/lib/data/catalog";

export function ProductCard({ product, cta }: { product: CatalogProduct; cta?: ReactNode }) {
  return (
    <article className="neon-card overflow-hidden rounded-2xl" style={{ ["--glow" as string]: product.color }}>
      <Link href={`/shop/${product.id}`} className="block">
        <div
          className="relative grid h-44 place-items-center px-4 text-center"
          style={{ background: `radial-gradient(circle at 50% 30%, ${product.color}, transparent 42%), linear-gradient(160deg,#1a1420,#050505)` }}
        >
          <b className="display text-2xl drop-shadow-[0_3px_0_#000]">{product.name}</b>
        </div>
      </Link>
      <div className="p-4">
        <span className="text-[0.7rem] uppercase tracking-widest text-muted">{product.category}</span>
        <h3 className="mt-1 font-black leading-tight">{product.name}</h3>
        <p className="mt-2 min-h-12 text-sm text-muted">{product.profile}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="display text-2xl text-lime">{money(product.priceGbp)}</span>
          <span className={cn("rounded-full border px-2 py-1 text-[0.65rem] uppercase tracking-widest", product.cardReward ? "border-gold/40 text-gold" : "border-white/15 text-muted")}>
            {product.cardReward ? "+ Card Draw" : "Membership"}
          </span>
        </div>
        {cta ? <div className="mt-3">{cta}</div> : null}
      </div>
    </article>
  );
}
