import { SubscriptionData } from "@youmeet/types/trial";

export const thisLightBlue = "#e6ebf7";

export const test = process.env.NODE_ENV === "test";
export const dev = process.env.NODE_ENV === "development";
export const uri = `${process.env.API_URI}`;
export const uriPro = process.env.PRO_URI;
export const uriCandidates = `${process.env.CANDIDATE_URI}`;

export const chatbotProduct =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
    ? "price_1OLq4JD5Cg0Rg5MbQrnp1DQA"
    : "price_1OLq4RD5Cg0Rg5MbDU3VT1Fp";

export const premiumProduct =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
    ? "price_1OLpzwD5Cg0Rg5Mb3B8e2zeT"
    : "price_1OLq06D5Cg0Rg5MbgESDwkCO";

export const verifiedProduct =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
    ? "price_1OLlyJD5Cg0Rg5Mbp9ghWEyq"
    : "price_1OLlzHD5Cg0Rg5MbP4vJR2BG";

export const creditProduct =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "price_1OajrND5Cg0Rg5MbPunT7RwB"
    : "price_1Oaj0zD5Cg0Rg5Mbh4uRcQKn";

export const oldLogoUrl =
  "https://res.cloudinary.com/de822mdsy/image/upload/v1691348066/youmeet-official/webp/logo-favicon_yvmhxq.webp";

export const logoUrl =
  "https://res.cloudinary.com/de822mdsy/image/upload/v1716496496/chbvyqxsyd2flxfav0qg.webp";
// export const logoUrl =
//   "https://res.cloudinary.com/de822mdsy/image/upload/v1715684378/prise2ref/logo/dnibfsnzw74wvwdxa15n.webp";
export const prise2RefDarkLogo =
  "https://res.cloudinary.com/de822mdsy/image/upload/v1715684651/prise2ref/logo/bwbgacvvgrugpkhrh3mz.webp";

export const trialSettings = {
  trial_period_days: 14,
  trial_settings: {
    end_behavior: { missing_payment_method: "cancel" },
  },
} as SubscriptionData;
