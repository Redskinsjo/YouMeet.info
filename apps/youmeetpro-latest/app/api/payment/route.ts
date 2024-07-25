import { Buffer } from "node:buffer";
import BetaUser from "@youmeet/models/betaUsers";
import prisma from "@youmeet/prisma-config/prisma";
import mongoose from "mongoose";
import { dev } from "@youmeet/functions/imports";
import { NextRequest } from "next/server";

const stripe = require("stripe")(
  dev ? `${process.env.STRIPE_SECRET}` : `${process.env.STRIPE_SECRET_PROD}`
);

mongoose.connect(`${process.env.MONGODB_URI}`);

export async function POST(req: NextRequest) {
  const endpointSecret = dev
    ? "whsec_19d04b6c1b8665033f582154f9ff4d14e81830f4978bf17cb15aaf85cb7b3f91"
    : `${process.env.STRIPE_ENDPOINT_SECRET}`;

  const sig = req.headers.get("stripe-signature");

  const payload = Buffer.from(await req.arrayBuffer());

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    console.log(event, "event");

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const data = event.data.object;

        let customer, user;

        console.log(data.customer, "data.customer");
        if (data.customer) {
          customer = await stripe.customers.retrieve(data.customer);
        } else {
          if (data.customer_email) {
            user = await BetaUser.findOne({ email: data.customer_email });
            customer = await stripe.customers.create({
              email: data.customer_email,
              name: data.customer_details.name,
            });
          }
        }
        if (customer && user) {
          await BetaUser.findByIdAndUpdate(user._id, {
            customerId: customer.id,
          });
          console.log("updated", customer.id);
        }

        break;
      }
      // lorsque le user ajoute son moyen de paiement via le lien de l'email envoyé 7 jours avant la fin de la période d'essai, ou manuellement
      case "account.updated":
        console.log(event.type);
        // Then define and call a function to handle the event account.updated
        break;
      case "account.external_account.created":
        console.log(event.type);
        // Then define and call a function to handle the event account.external_account.created
        break;
      case "account.external_account.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event account.external_account.deleted
        break;
      case "account.external_account.updated":
        console.log(event.type);
        // Then define and call a function to handle the event account.external_account.updated
        break;
      case "balance.available":
        console.log(event.type);
        // Then define and call a function to handle the event balance.available
        break;
      case "billing_portal.configuration.created":
        console.log(event.type);
        // Then define and call a function to handle the event billing_portal.configuration.created
        break;
      case "billing_portal.configuration.updated":
        console.log(event.type);
        // Then define and call a function to handle the event billing_portal.configuration.updated
        break;
      case "billing_portal.session.created":
        console.log(event.type);
        // Then define and call a function to handle the event billing_portal.session.created
        break;
      case "capability.updated":
        console.log(event.type);
        // Then define and call a function to handle the event capability.updated
        break;
      case "cash_balance.funds_available":
        console.log(event.type);
        // Then define and call a function to handle the event cash_balance.funds_available
        break;
      case "charge.captured":
        console.log(event.type);
        // Then define and call a function to handle the event charge.captured
        break;
      case "charge.expired":
        console.log(event.type);
        // Then define and call a function to handle the event charge.expired
        break;
      case "charge.failed":
        console.log(event.type);
        // Then define and call a function to handle the event charge.failed
        break;
      case "charge.pending":
        console.log(event.type);
        // Then define and call a function to handle the event charge.pending
        break;
      case "charge.refunded":
        console.log(event.type);
        // Then define and call a function to handle the event charge.refunded
        break;
      case "charge.succeeded":
        // let result;
        const data = event.data.object;

        // will be catched if no customer is retrieved

        if (data.amount_captured) {
          const newCredit = data.amount_captured / 100;
          const user = await BetaUser.findOneAndUpdate(
            {
              email: data.billing_details.email as string,
            },
            {
              $inc: { credit: newCredit },
            }
          );
          console.log(user, "user incremented");
        }

        // Then define and call a function to handle the event charge.succeeded
        break;
      case "charge.updated":
        console.log(event.type);
        // Then define and call a function to handle the event charge.updated
        break;
      case "charge.dispute.closed":
        console.log(event.type);
        // Then define and call a function to handle the event charge.dispute.closed
        break;
      case "charge.dispute.created":
        console.log(event.type);
        // Then define and call a function to handle the event charge.dispute.created
        break;
      case "charge.dispute.funds_reinstated":
        console.log(event.type);
        // Then define and call a function to handle the event charge.dispute.funds_reinstated
        break;
      case "charge.dispute.funds_withdrawn":
        console.log(event.type);
        // Then define and call a function to handle the event charge.dispute.funds_withdrawn
        break;
      case "charge.dispute.updated":
        console.log(event.type);
        // Then define and call a function to handle the event charge.dispute.updated
        break;
      case "charge.refund.updated":
        console.log(event.type);
        // Then define and call a function to handle the event charge.refund.updated
        break;
      case "checkout.session.async_payment_failed":
        console.log(event.type);
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case "checkout.session.async_payment_succeeded":
        console.log(event.type);
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case "checkout.session.expired":
        console.log(event.type);
        // Then define and call a function to handle the event checkout.session.expired
        break;
      case "coupon.created":
        console.log(event.type);
        // Then define and call a function to handle the event coupon.created
        break;
      case "coupon.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event coupon.deleted
        break;
      case "coupon.updated":
        console.log(event.type);
        // Then define and call a function to handle the event coupon.updated
        break;
      case "credit_note.created":
        console.log(event.type);
        // Then define and call a function to handle the event credit_note.created
        break;
      case "credit_note.updated":
        console.log(event.type);
        // Then define and call a function to handle the event credit_note.updated
        break;
      case "credit_note.voided":
        console.log(event.type);
        // Then define and call a function to handle the event credit_note.voided
        break;
      case "customer.created":
        console.log(event.type);
        // Then define and call a function to handle the event customer.created
        break;
      case "customer.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event customer.deleted
        break;
      case "customer.updated":
        console.log(event.type);
        // Then define and call a function to handle the event customer.updated
        break;
      case "customer.discount.created":
        console.log(event.type);
        // Then define and call a function to handle the event customer.discount.created
        break;
      case "customer.discount.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event customer.discount.deleted
        break;
      case "customer.discount.updated":
        console.log(event.type);
        // Then define and call a function to handle the event customer.discount.updated
        break;
      case "customer.source.created":
        console.log(event.type);
        // Then define and call a function to handle the event customer.source.created
        break;
      case "customer.source.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event customer.source.deleted
        break;
      case "customer.source.expiring":
        console.log(event.type);
        // Then define and call a function to handle the event customer.source.expiring
        break;
      case "customer.source.updated":
        console.log(event.type);
        // Then define and call a function to handle the event customer.source.updated
        break;
      case "customer.subscription.created": {
        const data = event.data.object;
        console.log(data);
        // if (data.customer) {
        //   await BetaUser.findOneAndUpdate(
        //     {
        //       customerId: data.customer,
        //     },
        //     { unlimited: false }
        //   );
        // }
        break;
        // Then define and call a function to handle the event customer.subscription.created
      }
      case "customer.subscription.deleted": {
        console.log("customer.subscription.deleted");
        const data = event.data.object;
        if (data.customer) {
          await BetaUser.findOneAndUpdate(
            {
              customerId: data.customer,
            },
            { unlimited: false }
          );
        }
        // Then define and call a function to handle the event customer.subscription.deleted
        break;
      }
      case "customer.subscription.paused":
        console.log(event.type);
        // Then define and call a function to handle the event customer.subscription.paused
        break;
      case "customer.subscription.pending_update_applied":
        console.log(event.type);
        // Then define and call a function to handle the event customer.subscription.pending_update_applied
        break;
      case "customer.subscription.pending_update_expired":
        console.log(event.type);
        // Then define and call a function to handle the event customer.subscription.pending_update_expired
        break;
      case "customer.subscription.resumed":
        console.log(event.type);
        // Then define and call a function to handle the event customer.subscription.resumed
        break;
      case "customer.subscription.trial_will_end":
        console.log(event.type);
        // Then define and call a function to handle the event customer.subscription.trial_will_end
        break;
      case "customer.subscription.updated":
        console.log(event.type);
        // Then define and call a function to handle the event customer.subscription.updated
        break;
      case "customer.tax_id.created":
        console.log(event.type);
        // Then define and call a function to handle the event customer.tax_id.created
        break;
      case "customer.tax_id.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event customer.tax_id.deleted
        break;
      case "customer.tax_id.updated":
        console.log(event.type);
        // Then define and call a function to handle the event customer.tax_id.updated
        break;
      case "customer_cash_balance_transaction.created":
        console.log(event.type);
        // Then define and call a function to handle the event customer_cash_balance_transaction.created
        break;
      case "file.created":
        console.log(event.type);
        // Then define and call a function to handle the event file.created
        break;
      case "financial_connections.account.created":
        console.log(event.type);
        // Then define and call a function to handle the event financial_connections.account.created
        break;
      case "financial_connections.account.deactivated":
        console.log(event.type);
        // Then define and call a function to handle the event financial_connections.account.deactivated
        break;
      case "financial_connections.account.disconnected":
        console.log(event.type);
        // Then define and call a function to handle the event financial_connections.account.disconnected
        break;
      case "financial_connections.account.reactivated":
        console.log(event.type);
        // Then define and call a function to handle the event financial_connections.account.reactivated
        break;
      case "financial_connections.account.refreshed_balance":
        console.log(event.type);
        // Then define and call a function to handle the event financial_connections.account.refreshed_balance
        break;
      case "identity.verification_session.canceled":
        console.log(event.type);
        // Then define and call a function to handle the event identity.verification_session.canceled
        break;
      case "identity.verification_session.created":
        console.log(event.type);
        // Then define and call a function to handle the event identity.verification_session.created
        break;
      case "identity.verification_session.processing":
        console.log(event.type);
        // Then define and call a function to handle the event identity.verification_session.processing
        break;
      case "identity.verification_session.requires_input":
        console.log(event.type);
        // Then define and call a function to handle the event identity.verification_session.requires_input
        break;
      case "identity.verification_session.verified":
        console.log(event.type);
        // Then define and call a function to handle the event identity.verification_session.verified
        break;
      case "invoice.created":
        console.log(event.type);
        // console.log(event.data.object, "ookk");
        // console.log(event.data.object.lines.data, "ouiii");
        // console.log(event.data.object.lines.data[0].price.id, "ouiii");
        // Then define and call a function to handle the event invoice.created
        break;
      case "invoice.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.deleted
        break;
      case "invoice.finalization_failed":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.finalization_failed
        break;
      case "invoice.finalized":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.finalized
        break;
      case "invoice.marked_uncollectible":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.marked_uncollectible
        break;
      case "invoice.paid": {
        console.log(event.type);

        let result;
        const data = event.data.object;

        console.log("data", data);
        // console.log("data", data);
        try {
          // will be catched if no customer is retrieved

          const customer = await stripe.customers.retrieve(data.customer);
          if (customer) {
            const user = await prisma.betausers.findFirst({
              where: { email: data.customer_email as string },
            });

            if (user) {
              if (!user.customerId) {
                user.customerId = customer.id;
              }
              const lines = event.data.object.lines;
              console.log("lines", lines);
              // if (lines) {
              //   const priceId = lines.data[0].price.id;
              //   if (priceId === verifiedProduct) {
              //     user.cv = true;
              //   } else if (
              //     priceId === premiumProduct ||
              //     priceId === chatbotProduct
              //   ) {
              //     // unlimited
              //     user.unlimited = true;
              //     user.credit = null;
              //     if (data.lines.data[0].plan.trial_period_days)
              //       user.trial = true;
              //   }

              //   result = await BetaUser.findByIdAndUpdate(user.id, {
              //     customerId: customer.id,
              //     credit: user.credit,
              //     unlimited: user.unlimited,
              //     trial: user.trial,
              //     cv: user.cv,
              //   });
              //   await stripe.customers.update(customer.id, {
              //     name: user.fullname,
              //   });
              // }
            } else {
              // console.log("missing userr", user);
            }
          } else {
            console.log("missing customer", customer);
          }
        } catch (err: any) {
          console.log(err);
          if (err.message.includes("not found")) {
            console.log("notfound");
          }
        }
        // console.log(event.data.object.lines.data[0].price.id, "ouiii");

        // Then define and call a function to handle the event invoice.paid
        break;
      }
      case "invoice.payment_action_required":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.payment_action_required
        break;
      case "invoice.payment_failed":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.payment_failed
        break;
      case "invoice.payment_succeeded":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.payment_succeeded
        break;
      case "invoice.sent":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.sent
        break;
      case "invoice.upcoming":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.upcoming
        break;
      case "invoice.updated":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.updated
        break;
      case "invoice.voided":
        console.log(event.type);
        // Then define and call a function to handle the event invoice.voided
        break;
      case "invoiceitem.created":
        console.log(event.type);
        // Then define and call a function to handle the event invoiceitem.created
        break;
      case "invoiceitem.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event invoiceitem.deleted
        break;
      case "invoiceitem.updated":
        console.log(event.type);
        // Then define and call a function to handle the event invoiceitem.updated
        break;
      case "issuing_authorization.created":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_authorization.created
        break;
      case "issuing_authorization.updated":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_authorization.updated
        break;
      case "issuing_card.created":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_card.created
        break;
      case "issuing_card.updated":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_card.updated
        break;
      case "issuing_cardholder.created":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_cardholder.created
        break;
      case "issuing_cardholder.updated":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_cardholder.updated
        break;
      case "issuing_dispute.closed":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_dispute.closed
        break;
      case "issuing_dispute.created":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_dispute.created
        break;
      case "issuing_dispute.funds_reinstated":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_dispute.funds_reinstated
        break;
      case "issuing_dispute.submitted":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_dispute.submitted
        break;
      case "issuing_dispute.updated":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_dispute.updated
        break;
      case "issuing_transaction.created":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_transaction.created
        break;
      case "issuing_transaction.updated":
        console.log(event.type);
        // Then define and call a function to handle the event issuing_transaction.updated
        break;
      case "mandate.updated":
        console.log(event.type);
        // Then define and call a function to handle the event mandate.updated
        break;
      case "order.created":
        console.log(event.type);
        // Then define and call a function to handle the event order.created
        break;
      case "payment_intent.amount_capturable_updated":
        console.log(event.type);
        // Then define and call a function to handle the event payment_intent.amount_capturable_updated
        break;
      case "payment_intent.canceled":
        console.log(event.type);
        // Then define and call a function to handle the event payment_intent.canceled
        break;
      case "payment_intent.created":
        console.log(event.type);
        // Then define and call a function to handle the event payment_intent.created
        break;
      case "payment_intent.partially_funded":
        console.log(event.type);
        // Then define and call a function to handle the event payment_intent.partially_funded
        break;
      case "payment_intent.payment_failed":
        console.log(event.type);
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case "payment_intent.processing":
        console.log(event.type);
        // Then define and call a function to handle the event payment_intent.processing
        break;
      case "payment_intent.requires_action":
        console.log(event.type);
        // Then define and call a function to handle the event payment_intent.requires_action
        break;
      case "payment_intent.succeeded":
        console.log(event.type);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      case "payment_link.created":
        console.log(event.type);
        // Then define and call a function to handle the event payment_link.created
        break;
      case "payment_link.updated":
        console.log(event.type);
        // Then define and call a function to handle the event payment_link.updated
        break;
      case "payment_method.attached":
        console.log(event.type);
        // Then define and call a function to handle the event payment_method.attached
        break;
      case "payment_method.automatically_updated":
        console.log(event.type);
        // Then define and call a function to handle the event payment_method.automatically_updated
        break;
      case "payment_method.detached":
        console.log(event.type);
        // Then define and call a function to handle the event payment_method.detached
        break;
      case "payment_method.updated":
        console.log(event.type);
        // Then define and call a function to handle the event payment_method.updated
        break;
      case "payout.canceled":
        console.log(event.type);
        // Then define and call a function to handle the event payout.canceled
        break;
      case "payout.created":
        console.log(event.type);
        // Then define and call a function to handle the event payout.created
        break;
      case "payout.failed":
        console.log(event.type);
        // Then define and call a function to handle the event payout.failed
        break;
      case "payout.paid":
        console.log(event.type);
        // Then define and call a function to handle the event payout.paid
        break;
      case "payout.reconciliation_completed":
        console.log(event.type);
        // Then define and call a function to handle the event payout.reconciliation_completed
        break;
      case "payout.updated":
        console.log(event.type);
        // Then define and call a function to handle the event payout.updated
        break;
      case "person.created":
        console.log(event.type);
        // Then define and call a function to handle the event person.created
        break;
      case "person.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event person.deleted
        break;
      case "person.updated":
        console.log(event.type);
        // Then define and call a function to handle the event person.updated
        break;
      case "plan.created":
        console.log(event.type);
        // Then define and call a function to handle the event plan.created
        break;
      case "plan.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event plan.deleted
        break;
      case "plan.updated":
        console.log(event.type);
        // Then define and call a function to handle the event plan.updated
        break;
      case "price.created":
        console.log(event.type);
        // Then define and call a function to handle the event price.created
        break;
      case "price.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event price.deleted
        break;
      case "price.updated":
        console.log(event.type);
        // Then define and call a function to handle the event price.updated
        break;
      case "product.created":
        console.log(event.type);
        // Then define and call a function to handle the event product.created
        break;
      case "product.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event product.deleted
        break;
      case "product.updated":
        console.log(event.type);
        // Then define and call a function to handle the event product.updated
        break;
      case "promotion_code.created":
        console.log(event.type);
        // Then define and call a function to handle the event promotion_code.created
        break;
      case "promotion_code.updated":
        console.log(event.type);
        // Then define and call a function to handle the event promotion_code.updated
        break;
      case "quote.accepted":
        console.log(event.type);
        // Then define and call a function to handle the event quote.accepted
        break;
      case "quote.canceled":
        console.log(event.type);
        // Then define and call a function to handle the event quote.canceled
        break;
      case "quote.created":
        console.log(event.type);
        // Then define and call a function to handle the event quote.created
        break;
      case "quote.finalized":
        console.log(event.type);
        // Then define and call a function to handle the event quote.finalized
        break;
      case "radar.early_fraud_warning.created":
        console.log(event.type);
        // Then define and call a function to handle the event radar.early_fraud_warning.created
        break;
      case "radar.early_fraud_warning.updated":
        console.log(event.type);
        // Then define and call a function to handle the event radar.early_fraud_warning.updated
        break;
      case "recipient.created":
        console.log(event.type);
        // Then define and call a function to handle the event recipient.created
        break;
      case "recipient.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event recipient.deleted
        break;
      case "recipient.updated":
        console.log(event.type);
        // Then define and call a function to handle the event recipient.updated
        break;
      case "refund.created":
        console.log(event.type);
        // Then define and call a function to handle the event refund.created
        break;
      case "refund.updated":
        console.log(event.type);
        // Then define and call a function to handle the event refund.updated
        break;
      case "reporting.report_run.failed":
        console.log(event.type);
        // Then define and call a function to handle the event reporting.report_run.failed
        break;
      case "reporting.report_run.succeeded":
        console.log(event.type);
        // Then define and call a function to handle the event reporting.report_run.succeeded
        break;
      case "review.closed":
        console.log(event.type);
        // Then define and call a function to handle the event review.closed
        break;
      case "review.opened":
        console.log(event.type);
        // Then define and call a function to handle the event review.opened
        break;
      case "setup_intent.canceled":
        console.log(event.type);
        // Then define and call a function to handle the event setup_intent.canceled
        break;
      case "setup_intent.created":
        console.log(event.type);
        // Then define and call a function to handle the event setup_intent.created
        break;
      case "setup_intent.requires_action":
        console.log(event.type);
        // Then define and call a function to handle the event setup_intent.requires_action
        break;
      case "setup_intent.setup_failed":
        console.log(event.type);
        // Then define and call a function to handle the event setup_intent.setup_failed
        break;
      case "setup_intent.succeeded":
        console.log(event.type);
        // Then define and call a function to handle the event setup_intent.succeeded
        break;
      case "sigma.scheduled_query_run.created":
        console.log(event.type);
        // Then define and call a function to handle the event sigma.scheduled_query_run.created
        break;
      case "sku.created":
        console.log(event.type);
        // Then define and call a function to handle the event sku.created
        break;
      case "sku.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event sku.deleted
        break;
      case "sku.updated":
        console.log(event.type);
        // Then define and call a function to handle the event sku.updated
        break;
      case "source.canceled":
        console.log(event.type);
        // Then define and call a function to handle the event source.canceled
        break;
      case "source.chargeable":
        console.log(event.type);
        // Then define and call a function to handle the event source.chargeable
        break;
      case "source.failed":
        console.log(event.type);
        // Then define and call a function to handle the event source.failed
        break;
      case "source.mandate_notification":
        console.log(event.type);
        // Then define and call a function to handle the event source.mandate_notification
        break;
      case "source.refund_attributes_required":
        console.log(event.type);
        // Then define and call a function to handle the event source.refund_attributes_required
        break;
      case "source.transaction.created":
        console.log(event.type);
        // Then define and call a function to handle the event source.transaction.created
        break;
      case "source.transaction.updated":
        console.log(event.type);
        // Then define and call a function to handle the event source.transaction.updated
        break;
      case "subscription_schedule.aborted":
        console.log(event.type);
        // Then define and call a function to handle the event subscription_schedule.aborted
        break;
      case "subscription_schedule.canceled":
        console.log(event.type);
        // Then define and call a function to handle the event subscription_schedule.canceled
        break;
      case "subscription_schedule.completed":
        console.log(event.type);
        // Then define and call a function to handle the event subscription_schedule.completed
        break;
      case "subscription_schedule.created":
        console.log(event.type);
        // Then define and call a function to handle the event subscription_schedule.created
        break;
      case "subscription_schedule.expiring":
        console.log(event.type);
        // Then define and call a function to handle the event subscription_schedule.expiring
        break;
      case "subscription_schedule.released":
        console.log(event.type);
        // Then define and call a function to handle the event subscription_schedule.released
        break;
      case "subscription_schedule.updated":
        console.log(event.type);
        // Then define and call a function to handle the event subscription_schedule.updated
        break;
      case "tax_rate.created":
        console.log(event.type);
        // Then define and call a function to handle the event tax_rate.created
        break;
      case "tax_rate.updated":
        console.log(event.type);
        // Then define and call a function to handle the event tax_rate.updated
        break;
      case "terminal.reader.action_failed":
        console.log(event.type);
        // Then define and call a function to handle the event terminal.reader.action_failed
        break;
      case "terminal.reader.action_succeeded":
        console.log(event.type);
        // Then define and call a function to handle the event terminal.reader.action_succeeded
        break;
      case "test_helpers.test_clock.advancing":
        console.log(event.type);
        // Then define and call a function to handle the event test_helpers.test_clock.advancing
        break;
      case "test_helpers.test_clock.created":
        console.log(event.type);
        // Then define and call a function to handle the event test_helpers.test_clock.created
        break;
      case "test_helpers.test_clock.deleted":
        console.log(event.type);
        // Then define and call a function to handle the event test_helpers.test_clock.deleted
        break;
      case "test_helpers.test_clock.internal_failure":
        console.log(event.type);
        // Then define and call a function to handle the event test_helpers.test_clock.internal_failure
        break;
      case "test_helpers.test_clock.ready":
        console.log(event.type);
        // Then define and call a function to handle the event test_helpers.test_clock.ready
        break;
      case "topup.canceled":
        console.log(event.type);
        // Then define and call a function to handle the event topup.canceled
        break;
      case "topup.created":
        console.log(event.type);
        // Then define and call a function to handle the event topup.created
        break;
      case "topup.failed":
        console.log(event.type);
        // Then define and call a function to handle the event topup.failed
        break;
      case "topup.reversed":
        console.log(event.type);
        // Then define and call a function to handle the event topup.reversed
        break;
      case "topup.succeeded":
        console.log(event.type);
        // Then define and call a function to handle the event topup.succeeded
        break;
      case "transfer.created":
        console.log(event.type);
        // Then define and call a function to handle the event transfer.created
        break;
      case "transfer.reversed":
        console.log(event.type);
        // Then define and call a function to handle the event transfer.reversed
        break;
      case "transfer.updated":
        console.log(event.type);
        // Then define and call a function to handle the event transfer.updated
        break;
      // ... handle other event types
      case "subscription.payment_succeeded":
        console.log(event.type);
        break;
      // Then define and call a function to handle the event transfer.updated

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err: any) {
    const message = `Webhook Erroor: ${err.message}`;
    console.log(message, "1");
    return Response.json(message);
  }
  console.log({ received: true }, "yes");
  return Response.json({ received: true });
}
