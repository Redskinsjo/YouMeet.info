import { Avatar } from "@youmeet/gql/generated";

export type FormExperience = {
  id: string;
  job: string;
  sector: string;
  company: { id?: string; name?: string; input?: boolean };
  ending: string;
  starting: string;
  duration: string;
  isLiveJob: boolean;
};

export type FormDefaultValues = {
  firstname: string;
  lastname: string;
  email: string;
  description: string;
  avatars: (Avatar | null)[];
  phone: string;
  phonecode: string;
  languages: (string | null)[];
  age: string;
  experiences: FormExperience[];
  salaryExpected: string;
};
