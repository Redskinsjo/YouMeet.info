export type StripeParams = {
  choice: string;
  customer: string;
  redirect: string;
  email: string;
  id: string;
  login?: string;
  trial?: string;
};

export type EmailingParams = {
  leadId: string;
};
