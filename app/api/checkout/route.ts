import Stripe from "stripe";
import { getStripeSecret, getPublicEnv } from "@/lib/env";

export async function POST() {
  try {
    const secret = getStripeSecret();
    if (!secret) {
      return Response.json({ error: "Missing STRIPE_SECRET_KEY in environment variables." }, { status: 500 });
    }
    const stripe = new Stripe(secret);
    const siteUrl = getPublicEnv().siteUrl;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Estate Born+ Membership",
              description: "Estate Born+ member badge, private boards, exclusive drops and card odds.",
            },
            unit_amount: 899,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/membership?checkout=cancelled`,
    });
    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Stripe checkout failed." }, { status: 500 });
  }
}
