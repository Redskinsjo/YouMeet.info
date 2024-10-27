import { Job, Offer, Translated } from "@youmeet/gql/generated";

export const getCompanyName = (offer: Offer) =>
  offer.rebroadcast && offer.companyName
    ? offer.companyName
    : (offer.company?.name as string);

export const getJobTitle = (job: Job) =>
  (job.title as Translated)["fr"] === (job.title as Translated)["en"]
    ? (job.title as Translated)["fr"]
    : `${(job.title as Translated)["fr"]} / ${(job.title as Translated)["en"]}`;

export const getCompanyLogo = (offer: Offer) =>
  offer.company?.logo ?? {
    url: offer.companyLogo,
    secure_url: offer.companyLogo,
  };
