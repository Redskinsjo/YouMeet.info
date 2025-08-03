export type DataType = {
  link: string;
  searchLink: string;
  source: string;
  company: string;
  jobTitle: string;
  education_level: string;
  experience: string;
  remote: string;
  start: string;
  salary: string;
  location: string;
  contract: string;
  error: Error;
  dureeTravailLibelleConverti: string;
};

export type linksEvalArgs = { link: string; cardsSelector: string };

export type Site = {
  link: string;
  searchLink: string;
  searchElSelector: string;
  locationSelector?: string;
  searchButtonElSelector?: string;
  cardsSelector: string;
  linksEvalFnc: (args: linksEvalArgs) => string[];
  linksEvalArgs: linksEvalArgs;
  dataEvalFnc: () => DataType;
  dataEvalArgs: any;
  secure?: boolean;
  accountNeeded?: boolean;
  applyCtaBtnSelector?: string;
  applyFinalBtnSelector?: string;
  connectLoginSelector?: string;
  connectPasswordSelector?: string;
  connectSubmitSelector?: string;
  applyFirstnameSelector?: string;
  applyLastnameSelector?: string;
  applyPhoneSelector?: string;
  applyCurrentJobSelector?: string;
  applyCVSelector?: string;
  applyLinkSelector?: string;
  applyMandatoryChecksSelectors?: string[];
};
