import { dev } from "@youmeet/functions/imports";
import { verif } from "@youmeet/utils/basics/jwt";
import { NextRequest } from "next/server";
const stripe = require("stripe")(
  dev ? `${process.env.STRIPE_SECRET}` : `${process.env.STRIPE_SECRET_PROD}`
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const loginPro = req.cookies.get("loginPro")?.value;

  if (loginPro) {
    const verified = await verif(loginPro);
    if (
      verified &&
      (verified as { email: string; returnTo: string }).email === body.email
    ) {
      const subscription = await stripe.subscriptions.update(body.id, {
        cancel_at_period_end: true,
      });
      if (subscription) return Response.json(subscription, { status: 200 });
    } else {
      return Response.json(null, { status: 400 });
    }
  } else {
    return Response.json(null, { status: 400 });
  }

  return Response.json(null, { status: 400 });
}
