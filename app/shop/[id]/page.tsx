import { notFound } from "next/navigation";
import { CATALOG, getProduct, relatedProducts } from "@/lib/data/catalog";
import { money } from "@/lib/utils";
import { AddToWaistband } from "@/components/shop/AddToWaistband";
import { ProductCard } from "@/components/shop/ProductCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getVault } from "@/lib/data/vaults";
import { XP_CONFIG } from "@/lib/config/xp";

export function generateStaticParams() {
  return CATALOG.map((product) => ({ id: product.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) notFound();
  const vault = getVault(product.vault);
  const related = relatedProducts(product);

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="gold-frame overflow-hidden rounded-3xl p-0">
        <div className="border-b border-gold/30 bg-black px-6 py-5">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{vault?.name} · {product.code}</p>
          <h1 className="graffiti-title mt-2 text-5xl sm:text-6xl">{product.name}</h1>
          <p className="mt-2 text-gold">{product.profile}</p>
        </div>
        <div className="grid min-h-[320px] place-items-center p-8" style={{ background: `radial-gradient(circle at 50% 30%, ${product.color}, #050505 58%)` }}>
          <p className="display text-center text-5xl drop-shadow-[0_4px_0_#000]">{product.name}</p>
        </div>
      </article>
      <aside className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Stat label="Price" value={money(product.priceGbp)} />
          <Stat label="Vault" value={vault?.navLabel || product.category} />
          <Stat label="XP loop" value={product.xpEligible ? "Eligible" : "Membership"} />
        </div>
        <div className="gold-frame rounded-2xl p-5">
          <p className="text-sm text-muted">{product.profile}</p>
          <p className="mt-3 text-sm text-muted">Qualifying purchases can generate a DCBD collectible card. Orders of £{XP_CONFIG.exchangeEligibleSpendGbp}+ unlock card exchange.</p>
          <div className="mt-5">
            {product.stripe ? <ButtonLink href="/membership" variant="pink" className="w-full">Stripe Membership</ButtonLink> : <AddToWaistband productId={product.id} />}
          </div>
        </div>
        <div className="gold-frame rounded-2xl p-5">
          <p className="estate-title">Product → Card</p>
          <p className="mt-2 text-sm text-muted">Purchase → card reward → collection → deck → Flip Three. Ownership will be confirmed server-side in production.</p>
        </div>
      </aside>
      {related.length ? (
        <section className="lg:col-span-2">
          <h2 className="display text-3xl">Related from this vault</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="gold-frame min-w-28 rounded-full px-4 py-3 text-center">
      <p className="text-[0.65rem] uppercase tracking-widest text-muted">{label}</p>
      <p className="font-black">{value}</p>
    </div>
  );
}
