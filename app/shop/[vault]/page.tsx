import { notFound } from "next/navigation";
import { ProductCard } from "@/components/shop/ProductCard";
import { getVault, productsInVault } from "@/data/products";
import type { ProductVaultId } from "@/types/ecommerce";

export default function VaultPage({ params }: { params: { vault: string } }) {
  const vault = getVault(params.vault);
  if (!vault) notFound();
  const products = productsInVault(vault.id as ProductVaultId);
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Vault</p>
      <h1 className="display mt-3 text-6xl">{vault.name}</h1>
      <p className="mt-4 max-w-2xl text-muted">{vault.blurb}</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
