"use client";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useStash } from "@/lib/stash";
import type { Product } from "@/types/ecommerce";

export function ProductActions({ product }: { product: Product }) {
  const { add } = useStash();
  if (product.stripeUrl) {
    return (
      <ButtonLink href={product.stripeUrl} external variant="gold" className="mt-6 w-full">
        Stripe checkout
      </ButtonLink>
    );
  }
  return (
    <>
      <Button className="mt-6 w-full" variant="pink" onClick={() => add(product)}>
        Add to waistband
      </Button>
      <ButtonLink href="/cart" variant="ghost" className="mt-3 w-full">
        Open waistband
      </ButtonLink>
    </>
  );
}
