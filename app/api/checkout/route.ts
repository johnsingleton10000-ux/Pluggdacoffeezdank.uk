import Stripe from "stripe";
import { getStripeSecretKey, publicEnv } from "@/lib/config/env";

export async function POST() {
  try {
    const secret = getStripeSecretKey();
    if (!secret) {
      return Response.json(
        { error: "Missing STRIPE_SECRET_KEY in environment variables." },
        { status: 500 },
      );
    }

    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "DCBD Inner Circle Founder Entry",
              description: "Community membership, early art previews, private updates and future rewards.",
            },
            unit_amount: 2500,
          },
          quantity: 1,
        },
      ],
      success_url: `${publicEnv.siteUrl}/success`,
      cancel_url: `${publicEnv.siteUrl}/?checkout=cancelled`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe checkout failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
