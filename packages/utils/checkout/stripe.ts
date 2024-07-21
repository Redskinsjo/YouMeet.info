import {
  creditProduct,
  dev,
  premiumProduct,
  trialSettings,
  uri,
} from "@youmeet/functions/imports";
import { BetaUser } from "@youmeet/gql/generated";

const stripe = require("stripe")(
  dev ? `${process.env.STRIPE_SECRET}` : `${process.env.STRIPE_SECRET_PROD}`
);

export const createSubscription = async (customerId: string, trial?: true) => {
  const settings = trialSettings;
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [
      {
        price: premiumProduct,
      },
    ],
    ...settings,
  });
  if (subscription) return subscription;
  return undefined;
};

export const getCustomer = async (customerId: string) => {
  const customer = await stripe.customers.retrieve(customerId);
  if (customer) return customer;
  return undefined;
};

export const createCustomer = async (user: BetaUser) => {
  const customer = await stripe.customers.create({
    name: user.fullname,
    email: user.email,
  });
  if (customer) return customer;
  return undefined;
};

export const createSession = async (
  mode: "subscription" | "payment",
  redirect: string,
  customerPayload: { customer: string; customer_email: string },
  userId: string
) => {
  const settings = {} as {
    mode: "subscription" | "payment";
    line_items?: { price: string; quantity: number }[];
    payment_method_collection: "if_required" | "always";
  };

  settings.mode = mode;
  if (mode === "subscription") {
    settings.line_items = [{ price: premiumProduct, quantity: 1 }];
    settings.payment_method_collection = "if_required";
  }
  if (mode === "payment")
    settings.line_items = [{ price: creditProduct, quantity: 1 }];

  return await stripe.checkout.sessions.create({
    ...settings,
    success_url: `${uri}/${redirect}`,
    cancel_url: `${uri}/${redirect}`,
    ...customerPayload,
    client_reference_id: userId,
  });
};
