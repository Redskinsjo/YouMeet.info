export type SubscriptionData = {
  trial_settings: {
    end_behavior: { missing_payment_method: "pause" | "cancel" };
  };
  trial_period_days: number;
};
