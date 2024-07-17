export type FormNonHandledData = {
  firstname: string;
  lastname: string;
  email: string;
  description: string;
  age: string;
  phone: string;
  phonecode: string;
  linkedinProfileId: string;
  salaryExpected: string;
  languages: string;
  avatars: File;
};

export type FormHandledData = {
  firstname: string;
  lastname: string;
  email: string;
  description: string;
  age: number;
  phone: { code: string; number: string };
  linkedinProfileId: string;
  salaryExpected: string;
  languages: string[];
  avatars?: File;
  userId: string;
  fullname: string;
};

export type OfferHandledData = {
  job: string;
  content: string;
  profileSearched: string;
  jobDescriptionLink: string;
  requirements: string[];
  revenue: number;
  contractType: string;
  remote: string;
  location: string;
  limitDate: string;
};

export type ProFormHandledData = {
  name: string;
  location: string;
  resume: string;
  logo: File;
  video: File;
  linkedinProfilePage: string;
};
