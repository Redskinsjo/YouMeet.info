/* eslint-disable no-case-declarations */
const Stripe = require("stripe");
import { dev } from "@youmeet/functions/imports";
import { createError } from "@youmeet/functions/request";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const stripe = Stripe(
    dev ? `${process.env.STRIPE_SECRET}` : `${process.env.STRIPE_SECRET_PROD}`
  );

  // si le body de la requête a un param customerId
  if (body.customerId) {
    try {
      const stripeCustomer = await stripe.customers.retrieve(body.customerId, {
        expand: ["subscriptions"],
      });

      if (stripeCustomer.deleted) {
        return new Response(null, { status: 404 });
      }

      const subscriptions = stripeCustomer?.subscriptions?.data || [];

      // si un customer existe avec ce customerId
      if (stripeCustomer) {
        let active = false;
        let inactiveSoon = false;
        // si le customer a au moins un abonnement
        if (stripeCustomer.subscriptions) {
          // if (stripeCustomer.subscriptions.total_count === 1){}

          const lastSubscription = subscriptions[subscriptions.length - 1];
          const nowMs = Math.round(new Date().getTime() / 1000);

          // si le dernier abonnement souscrit est en cours d'essai
          if (lastSubscription?.status === "trialing") {
            // si la date de fin de l'essai est postérieure à maintenant
            // alors le user est active
            if (lastSubscription.trial_end > nowMs) {
              active = true;
              // si la date de fin de l'essai est dans moins de 24h
              if (lastSubscription.trial_end - nowMs < 3600 * 24)
                inactiveSoon = true;
            } else {
              // si la data de fin de l'essai est antérieure à maintenant
              active = false;
            }
          }

          // si le dernier abonnement souscrit est active
          if (lastSubscription?.status === "active") {
            active = true;
          }
        }
        return Response.json(
          { active, inactiveSoon, subscriptions },
          { status: 200 }
        );
      } else {
        return Response.json(
          { active: false, inactiveSoon: false, subscriptions },
          { status: 200 }
        );
      }
    } catch (err: any) {
      await createError({
        data: {
          environment: dev ? "development" : "production",
          message: err.message,
          pro: false,
          query: "unknown",
          status: err.status,
          statusText: err.statusText ?? "",
          type: err.type,
        },
      });
      return Response.json("An error occured", { status: 500 });
    }
  }
  return Response.json("Bad Request", { status: 402 });
}
