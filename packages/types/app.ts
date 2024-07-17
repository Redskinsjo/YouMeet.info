type SubscriptionPlan = { id: string; nickname: string; active: boolean };

export type Subscription = {
  id: string;
  cancel_at_period_end: boolean;
  cancellation_details: {
    comment: string | null;
    feedback: string | null;
    reason: string | null;
  };
  plan: SubscriptionPlan;
  items: { data: { id: string; plan: SubscriptionPlan }[] };
};

export type AppSubscription = {
  active: boolean;
  subscriptions: Subscription[];
  inactiveSoon: boolean;
};
