import { ProductCard } from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { PRODUCTS, VAULTS } from "@/data/products";
import Link from "next/link";

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Badge>The Vault</Badge>
      <h1 className="display mt-4 text-6xl">Shop the DCBD universe</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Prices come from the catalogue. The browser cannot invent a cheaper number — checkout quotes are server-side.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VAULTS.map((vault) => (
          <Link key={vault.id} href={`/shop/${vault.id}`} className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            {vault.artwork ? <img src={vault.artwork} alt="" className="h-32 w-full object-cover" /> : null}
            <div className="p-4">
              <h2 className="font-display text-2xl uppercase" style={{ color: vault.glow }}>{vault.name}</h2>
              <p className="mt-2 text-sm text-muted">{vault.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
      <h2 className="display mt-12 text-4xl">Full catalogue</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
