import { UserState } from "@youmeet/global-config/features/user";
import { Subscription } from "@youmeet/types/app";
import { BetaUser } from "@youmeet/gql/generated";
import { uri } from "@youmeet/functions/imports";

export const getSubscriptionStatus2 = async (
  user: UserState | BetaUser | undefined
) => {
  if (user?.email) {
    if (user.customerId) {
      const response = await fetch(`${uri}/api/subscription`, {
        method: "POST",
        body: JSON.stringify({ customerId: user.customerId }),
      });
      if (response.status === 200) {
        const data: {
          active: boolean;
          inactiveSoon: boolean;
          subscriptions: Subscription[];
        } = await response.json();

        if (data) {
          return {
            ...data,
          };
        }
      } else {
        return undefined;
      }
    }
  }
};
