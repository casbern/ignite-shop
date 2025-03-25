import Stripe from "stripe";

export const stripe = process.env.STRIPE_API_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-01-27.acacia",
      appInfo: {
        name: "Ignite Shop",
      },
    })
  : null;
