import { EmailingParams, StripeParams } from "@youmeet/types/api/StripeParams";

export const renderUrlQuery = (
  query: (Partial<StripeParams> & { jobId?: string; offerId?: string }) &
    Partial<EmailingParams>,
) => {
  const q = query;

  if (q.login) delete q.login;
  let queryCount = 0;
  if (q?.customer) queryCount++;
  if (q?.email) queryCount++;
  if (q?.id) queryCount++;
  if (q.choice) queryCount++;
  if (q.redirect) queryCount++;
  if (q.trial) queryCount++;
  if (q.jobId) queryCount++;
  if (q.offerId) queryCount++;

  const { customer, redirect, email, id, choice, trial, jobId, offerId } = q;

  const amp = (param: any) => (param && queryCount !== 1 ? "&" : "");

  return `${customer ? "customer=" + customer : ""}${amp(customer)}${
    redirect ? "redirect=" + redirect : ""
  }${amp(redirect)}${email ? "email=" + email : ""}${amp(email)}${
    id ? "id=" + id : ""
  }${amp(id)}${choice ? "choice=" + choice : ""}${amp(choice)}${
    trial ? "trial=" + trial : ""
  }${amp(trial)}${jobId ? "jobId=" + jobId : ""}${amp(jobId)}${
    offerId ? "offerId=" + offerId : ""
  }`;
};
