import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Checkout is not part of the DCBD foundation. Payment processing will be added in a later ecommerce stage.",
    },
    { status: 501 },
  );
}
