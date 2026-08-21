import Link from "next/link";
import { FEATURED_PRODUCT_IDS, getProduct } from "@/data/products";

export function ProductCarousel() {
  const featured = FEATURED_PRODUCT_IDS.map((id) => getProduct(id)).filter(Boolean);
  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">The Vault</p>
        <div className="mt-5 flex gap-4 overflow-x-auto pb-4">
          {featured.map((product) =>
            product ? (
              <Link
                key={product.id}
                href={`/shop/product/${product.id}`}
                className="w-44 shrink-0 overflow-hidden rounded-2xl border bg-black"
                style={{ borderColor: product.color, boxShadow: `0 0 18px ${product.color}66` }}
              >
                <div className="flex h-40 items-end p-3" style={{ background: `radial-gradient(circle at 50% 20%, ${product.color}, #050507 70%)` }}>
                  <strong className="font-display text-xl uppercase leading-none">{product.name}</strong>
                </div>
                <p className="p-3 text-[0.65rem] font-black uppercase tracking-[0.16em] text-muted">{product.category}</p>
              </Link>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
