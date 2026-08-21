"use client";

import { CATALOG } from "@/lib/data/catalog";
import { ProductCard } from "@/components/shop/ProductCard";
import { AddToWaistband } from "@/components/shop/AddToWaistband";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function VaultCarousel() {
  const featured = CATALOG.filter((product) => !product.stripe).slice(0, 8);
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-lime">The Vaults</p>
            <h2 className="display mt-2 text-4xl sm:text-6xl">Live catalogue</h2>
          </div>
          <ButtonLink href="/shop" variant="ghost">Open Shop</ButtonLink>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {featured.map((product) => (
            <div key={product.id} className="min-w-[240px] max-w-[260px] snap-start">
              <ProductCard product={product} cta={<AddToWaistband productId={product.id} />} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
