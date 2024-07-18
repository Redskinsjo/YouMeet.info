import { getSubscriptionStatus2 } from "@/global/useSubscriptionStatus";
import { BetaUser } from "@youmeet/gql/generated";
import {
  chatbotProduct,
  premiumProduct,
  verifiedProduct,
} from "@/app/_functions/imports";

const fetchStatus = async (user: BetaUser) => {
  if (user.email) {
    if (user.customerId) {
      const data = await getSubscriptionStatus2(user);
      if (data) {
        return data;
      }
    }
  }
  return undefined;
};

export const detectSubscribed = async (user: BetaUser) => {
  const status = await fetchStatus(user);
  if (status) {
    const verifiedClient = status?.subscriptions.find(
      (sub) => sub.plan.id === verifiedProduct && (sub.plan as any).active,
    );
    const premiumClient = status?.subscriptions.find(
      (sub) => sub.plan.id === premiumProduct && (sub.plan as any).active,
    );
    const chatbotClient = status?.subscriptions.find(
      (sub) => sub.plan.id === chatbotProduct && (sub.plan as any).active,
    );
    return {
      verified: verifiedClient ? "Oui" : "Non",
      premium: premiumClient ? "Oui" : "Non",
      chatbot: chatbotClient ? "Oui" : "Non",
    };
  }
  return undefined;
};
