import { chatbotProduct, premiumProduct } from "@/app/_functions/imports";
import { AppSubscription } from "@youmeet/types/app";

const isSubscribedPro = (subscription: AppSubscription | false | undefined) =>
  subscription
    ? subscription.subscriptions.find(
        (sub) =>
          (sub.plan.id === chatbotProduct && (sub.plan as any).active) ||
          (sub.plan.id === premiumProduct && (sub.plan as any).active),
      )
    : false;

export default isSubscribedPro;
