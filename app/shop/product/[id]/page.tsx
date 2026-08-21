import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GoldFrame } from "@/components/ui/Panel";
import { CollectibleCard } from "@/components/cards/CollectibleCard";
import { ProductActions } from "@/components/shop/ProductActions";
import { getCard } from "@/data/cards";
import { getProduct, PRODUCTS } from "@/data/products";
import { XP_TABLE } from "@/config/xp";
import { money } from "@/utils/format";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) notFound();
  const card = getCard(product.cardId);
  const related = PRODUCTS.filter((item) => item.vaultId === product.vaultId && item.id !== product.id).slice(0, 3);
  const xp = XP_TABLE[product.xpKey];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div
          className="min-h-[420px] overflow-hidden rounded-3xl border p-8"
          style={{ borderColor: product.color, background: `radial-gradient(circle at 50% 20%, ${product.color}, #050507 70%)` }}
        >
          <p className="text-xs font-black uppercase tracking-[0.24em]">{product.category}</p>
          <h1 className="mt-6 font-display text-6xl uppercase leading-none">{product.name}</h1>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-gold">{product.code}</p>
        </div>
        <GoldFrame>
          <Badge>{product.availability.replace("_", " ")}</Badge>
          <p className="mt-4 text-muted">{product.profile}</p>
          <p className="mt-6 font-display text-6xl text-green-neon">{money(product.priceGbp)}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">Price from catalogue. Final total is quoted server-side.</p>
          {xp != null ? <p className="mt-4 text-sm text-purple-neon">Configured XP on confirmed order: {xp}</p> : null}
          <ProductActions product={product} />
        </GoldFrame>
      </div>
      {card ? (
        <section className="mt-12">
          <h2 className="display text-4xl">Linked collectible</h2>
          <p className="mt-3 max-w-2xl text-muted">A qualifying purchase can add this card to the digital collection after order confirmation.</p>
          <div className="mt-6 max-w-sm">
            <CollectibleCard card={card} />
          </div>
        </section>
      ) : null}
      {related.length ? (
        <section className="mt-12">
          <h2 className="display text-4xl">Same vault</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {related.map((item) => (
              <ButtonLink key={item.id} href={`/shop/product/${item.id}`} variant="ghost">
                {item.name}
              </ButtonLink>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
