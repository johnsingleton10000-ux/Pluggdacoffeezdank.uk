"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CATALOG, productsForVault } from "@/lib/data/catalog";
import { VAULTS, type VaultId } from "@/lib/data/vaults";
import { ProductCard } from "@/components/shop/ProductCard";
import { AddToWaistband } from "@/components/shop/AddToWaistband";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Suspense } from "react";

function ShopGrid() {
  const params = useSearchParams();
  const vault = (params.get("vault") || "all") as VaultId | "all";
  const products = useMemo(() => {
    if (vault === "all") return CATALOG;
    return productsForVault(vault);
  }, [vault]);
  const meta = VAULTS.find((item) => item.id === vault);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-lime">The Vault</p>
      <h1 className="display mt-2 text-5xl sm:text-7xl">{meta?.name || "Shop the Universe"}</h1>
      <p className="mt-4 max-w-2xl text-muted">
        {meta?.description || "Live launch catalogue. Prices come from the product database, never from the browser."}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <ButtonLink href="/shop" variant={vault === "all" ? "gold" : "ghost"}>All</ButtonLink>
        {VAULTS.map((item) => (
          <ButtonLink key={item.id} href={`/shop?vault=${item.id}`} variant={vault === item.id ? "gold" : "ghost"}>
            {item.navLabel}
          </ButtonLink>
        ))}
      </div>
      {meta?.sealed ? (
        <div className="gold-frame mt-8 rounded-2xl p-8">
          <h2 className="estate-title text-3xl">Vault sealed</h2>
          <p className="mt-3 text-muted">Architecture is ready. Products will appear here when catalogue data is supplied. No fake prices.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cta={product.stripe ? <ButtonLink href="/membership" variant="pink" className="w-full">Join on Stripe</ButtonLink> : <AddToWaistband productId={product.id} />}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<main className="px-4 py-10">Loading the Vault…</main>}>
      <ShopGrid />
    </Suspense>
  );
}
