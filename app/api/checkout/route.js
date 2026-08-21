import Stripe from "stripe";

export async function POST() {
  try {
    const { STRIPE_SECRET_KEY, STRIPE_FOUNDER_PRICE_ID } = process.env;

    if (!STRIPE_SECRET_KEY || !STRIPE_FOUNDER_PRICE_ID) {
      return Response.json(
        { error: "Checkout is not configured." },
        { status: 503 },
      );
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pluggdacoffeezdank.uk";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_FOUNDER_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/?checkout=cancelled`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json({ error: error.message || "Stripe checkout failed." }, { status: 500 });
  }
}
