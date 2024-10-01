import { Avatar, Competency } from "@youmeet/gql/generated";

export type OfferContentValues = {
  jobTitle: string;
  content: string;
  profileSearched: string;
  requirements: Competency[];
  revenue: string;
  remote: string;
  contractType: string;
  location: string;
  limitDate?: string;
  jobDescriptionLink?: string;
  companyName: string;
  createdAt?: Date;
  companyLogo?: Avatar;
  rebroadcast: boolean;
};
