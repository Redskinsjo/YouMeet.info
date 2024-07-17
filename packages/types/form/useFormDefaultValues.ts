import { Avatar } from "@youmeet/gql/generated";

export type FormExperience = {
  id: string;
  job: string;
  sector: string;
  company: { id?: string; name?: string; input?: boolean };
  ending: string;
  starting: string;
  duration: number | null;
  isLiveJob: boolean;
};

export type OfferDefaultValues = {
  sector: string;
  job: string;
  content: string;
  profileSearched: string;
  requirements: string[];
  jobDescriptionLink: string;
  revenue: string;
  contractType: string;
  location: string;
  limitDate: string;
  remote: string;
  companyName?: string;
};

export type FormDefaultValues = {
  name: string;
  resume: string;
  location: string;
  logo: Partial<Avatar>[] | [];
  video: Partial<Avatar>[] | [];
  linkedinProfilePage: string;
};
