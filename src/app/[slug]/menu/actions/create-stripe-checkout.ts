"use server";

import { ConsumptionMethod } from "@prisma/client";
import { headers } from "next/headers";
import Stripe from "stripe";

import { CartProduct } from "../contexts/cart";

export const createStripeCheckout = async ({
  orderId,
  slug,
  consumptionMethod,
  products,
}: {
  orderId: number;
  slug: string;
  consumptionMethod: ConsumptionMethod;
  products: CartProduct[];
}) => {
  const origin = (await headers()).get("origin") || "";
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "boleto"],
    mode: "payment",
    success_url: `${origin}/${slug}?consumptionMethod=${consumptionMethod}`,
    cancel_url: `${origin}/${slug}?consumptionMethod=${consumptionMethod}`,
    metadata: {
      orderId,
    },
    line_items: products.map((product) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: product.name,
          images: [product.imageUrl],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    })),
  });
  return { sessionId: session.id };
};
