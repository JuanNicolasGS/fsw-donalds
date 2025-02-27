import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  const text = await request.text();
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY!,
  );
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // pegar produtos
    // const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
    //   event.data.object.id,
    //   {
    //     expand: ["line_items"],
    //   },
    // );
    // const lineItems = sessionWithLineItems.line_items;

    // ATUALIZAR PEDIDO
    if (!session.metadata?.orderId) {
      return NextResponse.error();
    }
    console.log(session.metadata);
    await db.order.update({
      where: {
        id: Number(session.metadata?.orderId),
      },
      data: {
        status: "IN_PREPARATION",
      },
    });
  }
  return NextResponse.json({ received: true });
};
