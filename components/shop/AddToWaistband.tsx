"use client";

import { Button } from "@/components/ui/Button";
import { usePlayer } from "@/lib/state/player";
import { useRouter } from "next/navigation";

export function AddToWaistband({ productId }: { productId: string }) {
  const { addToCart } = usePlayer();
  const router = useRouter();
  return (
    <Button
      variant="gold"
      className="w-full"
      onClick={() => {
        addToCart(productId);
        router.push("/stash");
      }}
    >
      Add to Waistband
    </Button>
  );
}
