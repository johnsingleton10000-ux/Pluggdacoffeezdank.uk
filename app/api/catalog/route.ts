import { CATALOG } from "@/lib/data/catalog";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    products: CATALOG.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      vault: product.vault,
      priceGbp: product.priceGbp,
      profile: product.profile,
      code: product.code,
    })),
  });
}
