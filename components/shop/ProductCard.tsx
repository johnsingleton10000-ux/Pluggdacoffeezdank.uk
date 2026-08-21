"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RarityBadge } from "@/components/ui/RarityBadge";
import { Button } from "@/components/ui/Button";
import { useStash } from "@/lib/stash";
import type { Product } from "@/types/ecommerce";
import { money } from "@/utils/format";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useStash();
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-2xl border bg-black/70"
      style={{ borderColor: product.color, boxShadow: `0 0 24px ${product.color}55` }}
    >
      <Link href={`/shop/product/${product.id}`} className="block">
        <div className="relative flex h-48 items-end justify-center p-4" style={{ background: `radial-gradient(circle at 50% 20%, ${product.color}, #050507 62%)` }}>
          <strong className="font-display text-center text-3xl uppercase leading-none">{product.name}</strong>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-gold">{product.category}</p>
        <p className="min-h-12 text-sm text-muted">{product.profile}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl text-green-neon">{money(product.priceGbp)}</span>
          <RarityBadge rarity={product.priceGbp >= 47 ? "rare" : product.priceGbp >= 27 ? "uncommon" : "common"} />
        </div>
        {product.stripeUrl ? (
          <a href={product.stripeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-touch w-full items-center justify-center rounded-xl bg-gold px-4 py-3 text-sm font-black uppercase text-black">
            Stripe membership
          </a>
        ) : (
          <Button className="w-full" variant="pink" onClick={() => add(product)}>
            Add to waistband
          </Button>
        )}
      </div>
    </motion.article>
  );
}
