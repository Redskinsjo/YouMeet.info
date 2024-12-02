import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  File: { input: any; output: any; }
  PositiveFloat: { input: any; output: any; }
};

export type Affiliation = {
  __typename?: 'Affiliation';
  children?: Maybe<Array<Maybe<BetaUser>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  parent?: Maybe<BetaUser>;
  parentId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AgencyFt = {
  __typename?: 'AgencyFT';
  courriel?: Maybe<Scalars['String']['output']>;
  telephone?: Maybe<Scalars['String']['output']>;
};

export type Article = {
  __typename?: 'Article';
  alt?: Maybe<Scalars['String']['output']>;
  bgImage?: Maybe<Scalars['String']['output']>;
  conclusion?: Maybe<Translated>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Translated>;
  extension?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  introduction?: Maybe<Translated>;
  links?: Maybe<Array<Maybe<ArticlesLink>>>;
  new?: Maybe<Scalars['Boolean']['output']>;
  paragraphs?: Maybe<Array<Maybe<ArticleParagraph>>>;
  slug: Scalars['String']['output'];
  title: Translated;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ArticleParagraph = {
  __typename?: 'ArticleParagraph';
  content?: Maybe<Translated>;
  title?: Maybe<Translated>;
};

export type ArticlesLink = {
  __typename?: 'ArticlesLink';
  href?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Translated>;
};

export type AuthDetails = {
  __typename?: 'AuthDetails';
  internal?: Maybe<InternalAuthentication>;
  social?: Maybe<SocialAuthentication>;
};

export type AuthDetailsInput = {
  internal?: InputMaybe<InternalAuthenticationInput>;
  social?: InputMaybe<SocialAuthenticationInput>;
};

export type Avatar = {
  __typename?: 'Avatar';
  asset_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  duration?: Maybe<Scalars['PositiveFloat']['output']>;
  eager?: Maybe<Array<Eager>>;
  folder?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  original_filename?: Maybe<Scalars['String']['output']>;
  public_id?: Maybe<Scalars['String']['output']>;
  secure_url?: Maybe<Scalars['String']['output']>;
  subtitledUrl?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type AvatarInput = {
  asset_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  duration?: InputMaybe<Scalars['PositiveFloat']['input']>;
  eager: Array<EagerInput>;
  folder?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  original_filename?: InputMaybe<Scalars['String']['input']>;
  public_id?: InputMaybe<Scalars['String']['input']>;
  secure_url?: InputMaybe<Scalars['String']['input']>;
  subtitledUrl?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type BetaCandidate = {
  __typename?: 'BetaCandidate';
  avatars?: Maybe<Array<Maybe<Avatar>>>;
  bgImage?: Maybe<Scalars['String']['output']>;
  competencyIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  details?: Maybe<BetaDetails>;
  experiences?: Maybe<Array<Maybe<BetaExperience>>>;
  id?: Maybe<Scalars['ID']['output']>;
  profile?: Maybe<BetaProfile>;
  salaryExpected?: Maybe<Scalars['String']['output']>;
  targetContractType?: Maybe<Scalars['String']['output']>;
  targetJob?: Maybe<Job>;
  targetJobId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type BetaCandidateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  jobId?: InputMaybe<Scalars['ID']['input']>;
  targetContractType?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type BetaCompany = {
  __typename?: 'BetaCompany';
  autocompletions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  entrepriseAdaptee?: Maybe<Scalars['Boolean']['output']>;
  experiences?: Maybe<Array<Maybe<BetaExperience>>>;
  id?: Maybe<Scalars['ID']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  linkedinProfilePage?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Avatar>;
  name?: Maybe<Scalars['String']['output']>;
  offers?: Maybe<Array<Maybe<Offer>>>;
  resume?: Maybe<Scalars['String']['output']>;
  scrapped?: Maybe<Scalars['Boolean']['output']>;
  sharings?: Maybe<Array<Maybe<ProfileSharing>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Avatar>;
  videos?: Maybe<Array<Maybe<Video>>>;
};

export type BetaCompanyFilters = {
  count?: InputMaybe<Scalars['Int']['input']>;
  exact?: InputMaybe<Scalars['Boolean']['input']>;
  isLogo?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  isVideo?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pro?: InputMaybe<Scalars['Boolean']['input']>;
  scrapped?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BetaCompanyInput = {
  companyId?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  linkedinProfileId?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<AvatarInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  resume?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<AvatarInput>;
};

export type BetaDetails = {
  __typename?: 'BetaDetails';
  birthday?: Maybe<Scalars['String']['output']>;
  candidate?: Maybe<BetaCandidate>;
  candidateId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  email2?: Maybe<Scalars['String']['output']>;
  experiences?: Maybe<Array<Maybe<BetaExperience>>>;
  facebook?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  phone?: Maybe<Phone>;
  phone2?: Maybe<Phone>;
  principal?: Maybe<Scalars['Boolean']['output']>;
  profile?: Maybe<BetaProfile>;
  profileId?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
  websites?: Maybe<Scalars['String']['output']>;
};

export type BetaDetailsInput = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  candidateId?: InputMaybe<Scalars['String']['input']>;
  detailsId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  facebook?: InputMaybe<Scalars['String']['input']>;
  isPhone?: InputMaybe<Scalars['Boolean']['input']>;
  phone?: InputMaybe<PhoneInput>;
  principal?: InputMaybe<Scalars['Boolean']['input']>;
  profileId?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  websites?: InputMaybe<Scalars['String']['input']>;
};

export type BetaExperience = {
  __typename?: 'BetaExperience';
  candidate?: Maybe<BetaCandidate>;
  candidateId?: Maybe<Scalars['String']['output']>;
  company?: Maybe<BetaCompany>;
  companyId?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  details?: Maybe<BetaDetails>;
  detailsId?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  ending?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isLiveJob?: Maybe<Scalars['Boolean']['output']>;
  isTargetJob?: Maybe<Scalars['Boolean']['output']>;
  job?: Maybe<Job>;
  jobId?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  previouslyEmployed?: Maybe<Scalars['Boolean']['output']>;
  referenced?: Maybe<Scalars['Boolean']['output']>;
  references?: Maybe<Array<Maybe<BetaProfile>>>;
  referencesIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  starting?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
};


export type BetaExperienceCandidateArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type BetaExperienceReferencesArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type BetaExperienceInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  referenced?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BetaProfile = {
  __typename?: 'BetaProfile';
  allSkills?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  details?: Maybe<BetaDetails>;
  id?: Maybe<Scalars['ID']['output']>;
  refExperiences?: Maybe<Array<Maybe<BetaExperience>>>;
  refExperiencesIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type BetaProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  experienceId?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  job?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<PhoneInput>;
};

export type BetaQueue = {
  __typename?: 'BetaQueue';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customisation?: Maybe<Customisation>;
  customisationId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  offerTarget?: Maybe<Offer>;
  offerTargetId?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<BetaUser>;
  originId?: Maybe<Scalars['String']['output']>;
  seen?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  system?: Maybe<Scalars['String']['output']>;
  target?: Maybe<BetaUser>;
  targetId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BetaQueueInput = {
  queueId?: InputMaybe<Scalars['ID']['input']>;
  seen?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type BetaUser = {
  __typename?: 'BetaUser';
  active?: Maybe<Scalars['Boolean']['output']>;
  affiliation?: Maybe<Affiliation>;
  affiliationId?: Maybe<Scalars['String']['output']>;
  affiliations?: Maybe<Array<Maybe<Affiliation>>>;
  age?: Maybe<Scalars['Int']['output']>;
  auth?: Maybe<AuthDetails>;
  candidate?: Maybe<BetaCandidate>;
  candidateQueues?: Maybe<Array<Maybe<BetaQueue>>>;
  candidatedOffers?: Maybe<Array<Maybe<Offer>>>;
  candidatedOffersIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  cardPrice?: Maybe<Scalars['PositiveFloat']['output']>;
  company?: Maybe<BetaCompany>;
  companyId?: Maybe<Scalars['String']['output']>;
  consent?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  credit?: Maybe<Scalars['PositiveFloat']['output']>;
  customerId?: Maybe<Scalars['String']['output']>;
  cv?: Maybe<Scalars['Boolean']['output']>;
  cvFile?: Maybe<Avatar>;
  description?: Maybe<Scalars['String']['output']>;
  details?: Maybe<BetaDetails>;
  email?: Maybe<Scalars['String']['output']>;
  experiences?: Maybe<Array<Maybe<BetaExperience>>>;
  extension?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  hiddenFields?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  interviews?: Maybe<Array<Maybe<InterviewOffer>>>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  languages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  lastname?: Maybe<Scalars['String']['output']>;
  linkedinProfileId?: Maybe<Scalars['String']['output']>;
  myOffers?: Maybe<Array<Maybe<Offer>>>;
  picture?: Maybe<Scalars['String']['output']>;
  pro?: Maybe<Scalars['Boolean']['output']>;
  professionalEmail?: Maybe<Scalars['Boolean']['output']>;
  profile?: Maybe<BetaProfile>;
  profileViews?: Maybe<Array<Maybe<ProfileView>>>;
  recruiterQueues?: Maybe<Array<Maybe<BetaQueue>>>;
  refExperiences?: Maybe<Array<Maybe<BetaExperience>>>;
  role?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Maybe<Job>>>;
  rolesIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  scrapped?: Maybe<Scalars['Boolean']['output']>;
  sharings?: Maybe<Array<Maybe<ProfileSharing>>>;
  status?: Maybe<Scalars['String']['output']>;
  trial?: Maybe<Scalars['Boolean']['output']>;
  uniqueName?: Maybe<Scalars['String']['output']>;
  unlimited?: Maybe<Scalars['Boolean']['output']>;
  unvolonteerFavorites?: Maybe<Array<Maybe<Favorite>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<Scalars['Boolean']['output']>;
  video?: Maybe<Avatar>;
  videos?: Maybe<Array<Maybe<Video>>>;
};

export type BetaUserInput = {
  affiliationId?: InputMaybe<Scalars['String']['input']>;
  auth?: InputMaybe<AuthDetailsInput>;
  candidateName?: InputMaybe<Scalars['String']['input']>;
  cardPrice?: InputMaybe<Scalars['Int']['input']>;
  childUserId?: InputMaybe<Scalars['String']['input']>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  consent?: InputMaybe<Scalars['Boolean']['input']>;
  credit?: InputMaybe<Scalars['PositiveFloat']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  cvFile?: InputMaybe<AvatarInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  extension?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  hiddenFields?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internal?: InputMaybe<Scalars['Boolean']['input']>;
  isCustomerId?: InputMaybe<Scalars['Boolean']['input']>;
  isLinkedin?: InputMaybe<Scalars['Boolean']['input']>;
  isPhone?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  isScrapped?: InputMaybe<Scalars['Boolean']['input']>;
  isVideo?: InputMaybe<Scalars['Boolean']['input']>;
  job?: InputMaybe<Scalars['ID']['input']>;
  jobs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  linkedinProfileId?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<PhoneInput>;
  pro?: InputMaybe<Scalars['Boolean']['input']>;
  professionalEmail?: InputMaybe<Scalars['Boolean']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  sectors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  trial?: InputMaybe<Scalars['Boolean']['input']>;
  uniqueName?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<AvatarInput>;
};

export type BetaWhatsappExchange = {
  __typename?: 'BetaWhatsappExchange';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  question?: Maybe<Question>;
  questionId?: Maybe<Scalars['String']['output']>;
  responses?: Maybe<Array<Maybe<BetaWhatsappResponse>>>;
  step?: Maybe<Scalars['Int']['output']>;
  thread?: Maybe<BetaWhatsappThread>;
  threadId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  videos?: Maybe<Array<Maybe<Video>>>;
};

export type BetaWhatsappResponse = {
  __typename?: 'BetaWhatsappResponse';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  exchange?: Maybe<BetaWhatsappExchange>;
  exchangeId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  thread?: Maybe<BetaWhatsappThread>;
  threadId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Video>;
  videoId?: Maybe<Scalars['String']['output']>;
};

export type BetaWhatsappThread = {
  __typename?: 'BetaWhatsappThread';
  chatId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  exchanges?: Maybe<Array<Maybe<BetaWhatsappExchange>>>;
  id?: Maybe<Scalars['ID']['output']>;
  queue?: Maybe<BetaQueue>;
  queueId?: Maybe<Scalars['String']['output']>;
  responses?: Maybe<Array<Maybe<BetaWhatsappResponse>>>;
  terminated?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CandidateBasicInput = {
  avatars?: InputMaybe<Array<InputMaybe<AvatarInput>>>;
  targetContractType?: InputMaybe<Scalars['String']['input']>;
  targetJobId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CandidateInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  avatars?: InputMaybe<Array<AvatarInput>>;
  description: Scalars['String']['input'];
  detailsId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  experiences?: InputMaybe<Array<ExperienceInput>>;
  firstname: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  languages: Array<Scalars['String']['input']>;
  lastname: Scalars['String']['input'];
  linkedinProfileId: Scalars['String']['input'];
  phone?: InputMaybe<PhoneInput>;
  salaryExpected?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CandidatesNotes = {
  __typename?: 'CandidatesNotes';
  appreciation?: Maybe<Scalars['Int']['output']>;
  candidate?: Maybe<BetaCandidate>;
  candidateId?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CandidatesNotesInput = {
  appreciation?: InputMaybe<Scalars['Int']['input']>;
  candidateId?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CompanyInput = {
  experiences?: InputMaybe<Array<InputMaybe<ExperienceInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  userEmail?: InputMaybe<Scalars['String']['input']>;
};

export type CompetenceFt = {
  __typename?: 'CompetenceFT';
  code?: Maybe<Scalars['String']['output']>;
  exigence?: Maybe<Scalars['String']['output']>;
  libelle?: Maybe<Scalars['String']['output']>;
};

export type Competency = {
  __typename?: 'Competency';
  advantages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  appelations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  conclusion?: Maybe<Scalars['String']['output']>;
  definition?: Maybe<Scalars['String']['output']>;
  development?: Maybe<Scalars['String']['output']>;
  examples?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  extension?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  importance?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  relatedSkills?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CompetencyInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ContactFt = {
  __typename?: 'ContactFT';
  commentaire?: Maybe<Scalars['String']['output']>;
  coordonnees1?: Maybe<Scalars['String']['output']>;
  coordonnees2?: Maybe<Scalars['String']['output']>;
  coordonnees3?: Maybe<Scalars['String']['output']>;
  courriel?: Maybe<Scalars['String']['output']>;
  nom?: Maybe<Scalars['String']['output']>;
  telephone?: Maybe<Scalars['String']['output']>;
  urlPostulation?: Maybe<Scalars['String']['output']>;
  urlRecruteur?: Maybe<Scalars['String']['output']>;
};

export type ConversationInput = {
  candidateName?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  customisationId?: InputMaybe<Scalars['String']['input']>;
  jobId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offerTargetId?: InputMaybe<Scalars['String']['input']>;
  originId?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<QuestionInput>;
  questions?: InputMaybe<Array<InputMaybe<QuestionInput>>>;
  targetId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProAccountInput = {
  company?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  linkedinProfilePage?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<PhoneInput>;
};

export type Customisation = {
  __typename?: 'Customisation';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<BetaUser>;
  originId?: Maybe<Scalars['String']['output']>;
  questions?: Maybe<Array<Maybe<Question>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CustomisationInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  jobId?: InputMaybe<Scalars['ID']['input']>;
  questions?: InputMaybe<Array<InputMaybe<QuestionInput>>>;
  queueId?: InputMaybe<Scalars['ID']['input']>;
};

export type Eager = {
  __typename?: 'Eager';
  bytes?: Maybe<Scalars['Int']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  secure_url?: Maybe<Scalars['String']['output']>;
  transformation?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type EagerInput = {
  bytes?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  secure_url?: InputMaybe<Scalars['String']['input']>;
  transformation?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type Email = {
  __typename?: 'Email';
  error?: Maybe<Scalars['Boolean']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type EmailInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recruiterName?: InputMaybe<Scalars['String']['input']>;
  templateId?: InputMaybe<Scalars['Int']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type EnterpriseFt = {
  __typename?: 'EnterpriseFT';
  description?: Maybe<Scalars['String']['output']>;
  entrepriseAdaptee?: Maybe<Scalars['Boolean']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  nom?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Error = {
  __typename?: 'Error';
  createdAt: Scalars['DateTime']['output'];
  environment: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  message: Scalars['String']['output'];
  pro: Scalars['Boolean']['output'];
  query: Scalars['String']['output'];
  status?: Maybe<Scalars['Int']['output']>;
  statusText: Scalars['String']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ErrorInput = {
  environment: Scalars['String']['input'];
  message: Scalars['String']['input'];
  pro: Scalars['Boolean']['input'];
  query: Scalars['String']['input'];
  status?: InputMaybe<Scalars['Int']['input']>;
  statusText: Scalars['String']['input'];
  type: Scalars['Int']['input'];
};

export type ErrorOnValidation = {
  __typename?: 'ErrorOnValidation';
  field?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ExperienceInput = {
  company?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  ending?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['Boolean']['input']>;
  isLiveJob?: InputMaybe<Scalars['Boolean']['input']>;
  isTargetJob?: InputMaybe<Scalars['Boolean']['input']>;
  job?: InputMaybe<Scalars['String']['input']>;
  sector?: InputMaybe<Scalars['String']['input']>;
  starting?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  offerTarget?: Maybe<Offer>;
  offerTargetId?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<BetaUser>;
  originId?: Maybe<Scalars['String']['output']>;
  target?: Maybe<BetaUser>;
  targetId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FavoriteInput = {
  isCustomerId?: InputMaybe<Scalars['Boolean']['input']>;
  isLinkedin?: InputMaybe<Scalars['Boolean']['input']>;
  isLogo?: InputMaybe<Scalars['Boolean']['input']>;
  isPhone?: InputMaybe<Scalars['Boolean']['input']>;
  isVideo?: InputMaybe<Scalars['Boolean']['input']>;
  jobs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  originId?: InputMaybe<Scalars['ID']['input']>;
  sectors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Feedback = {
  __typename?: 'Feedback';
  author?: Maybe<BetaUser>;
  authorId?: Maybe<Scalars['String']['output']>;
  candidate?: Maybe<MeetCandidate>;
  candidateId?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  recruiter?: Maybe<MeetRecruiter>;
  recruiterId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type FeedbackInput = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  candidateId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  recruiterId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type FormQuestion = {
  __typename?: 'FormQuestion';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  target?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FormResponse = {
  __typename?: 'FormResponse';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isTrue?: Maybe<Scalars['Boolean']['output']>;
  lead?: Maybe<Lead>;
  leadId?: Maybe<Scalars['String']['output']>;
  question?: Maybe<FormQuestion>;
  questionId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FormResponseInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  isTrue?: InputMaybe<Scalars['Boolean']['input']>;
  leadId?: InputMaybe<Scalars['String']['input']>;
  questionId?: InputMaybe<Scalars['String']['input']>;
  responseId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type FormationFt = {
  __typename?: 'FormationFT';
  codeFormation?: Maybe<Scalars['String']['output']>;
  commentaire?: Maybe<Scalars['String']['output']>;
  domaineLibelle?: Maybe<Scalars['String']['output']>;
  exigence?: Maybe<Scalars['String']['output']>;
  niveauLibelle?: Maybe<Scalars['String']['output']>;
};

export type GoogleAuthentication = {
  __typename?: 'GoogleAuthentication';
  email?: Maybe<Scalars['String']['output']>;
  email_verified?: Maybe<Scalars['Boolean']['output']>;
  family_name?: Maybe<Scalars['String']['output']>;
  given_name?: Maybe<Scalars['String']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  network?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  sid?: Maybe<Scalars['String']['output']>;
  sub?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type GoogleAuthenticationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  email_verified?: InputMaybe<Scalars['Boolean']['input']>;
  family_name?: InputMaybe<Scalars['String']['input']>;
  given_name?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  sid?: InputMaybe<Scalars['String']['input']>;
  sub?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['String']['input']>;
};

export type InternalAuthentication = {
  __typename?: 'InternalAuthentication';
  email?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  salt?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type InternalAuthenticationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  salt?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type InterviewOffer = {
  __typename?: 'InterviewOffer';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  datetime?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  origin?: Maybe<BetaUser>;
  originId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  target?: Maybe<BetaUser>;
  targetId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type InterviewOfferInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  datetime?: InputMaybe<Scalars['DateTime']['input']>;
  originId?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
};

export type Job = {
  __typename?: 'Job';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  enTitle?: Maybe<Scalars['String']['output']>;
  frTitle?: Maybe<Scalars['String']['output']>;
  href?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  questions?: Maybe<Array<Maybe<Question>>>;
  title?: Maybe<Translated>;
  topSector?: Maybe<TopSector>;
  topSectorId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<Maybe<BetaUser>>>;
  usersIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type JobInput = {
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  topSectorIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LanguageFt = {
  __typename?: 'LanguageFT';
  exigence?: Maybe<Scalars['String']['output']>;
  libelle?: Maybe<Scalars['String']['output']>;
};

export type Lead = {
  __typename?: 'Lead';
  contacted?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fr?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  linkedinProfileId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<BetaUser>;
  parentId?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Phone>;
  prospected?: Maybe<Scalars['Boolean']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  trialOffering?: Maybe<Scalars['DateTime']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type LeadInput = {
  contacted?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fr?: InputMaybe<Scalars['Boolean']['input']>;
  leadId?: InputMaybe<Scalars['ID']['input']>;
  linkedinProfileId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  phone?: InputMaybe<PhoneInput>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Meet = {
  __typename?: 'Meet';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expired?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  meetCandidate?: Maybe<MeetCandidate>;
  meetCandidateId?: Maybe<Scalars['String']['output']>;
  meetRecruiter?: Maybe<MeetRecruiter>;
  meetRecruiterId?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type MeetCandidate = {
  __typename?: 'MeetCandidate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  job?: Maybe<Job>;
  jobId?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  linkedinProfileId?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Phone>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  videos?: Maybe<Array<Maybe<Video>>>;
};

export type MeetInput = {
  emailCandidate?: InputMaybe<Scalars['String']['input']>;
  emailRecruiter?: InputMaybe<Scalars['String']['input']>;
  expired?: InputMaybe<Scalars['Boolean']['input']>;
  firstnameCandidate?: InputMaybe<Scalars['String']['input']>;
  firstnameRecruiter?: InputMaybe<Scalars['String']['input']>;
  jobId?: InputMaybe<Scalars['ID']['input']>;
  lastnameCandidate?: InputMaybe<Scalars['String']['input']>;
  lastnameRecruiter?: InputMaybe<Scalars['String']['input']>;
  linkedinProfileIdCandidate?: InputMaybe<Scalars['String']['input']>;
  linkedinProfileIdRecruiter?: InputMaybe<Scalars['String']['input']>;
  meetCandidateId?: InputMaybe<Scalars['String']['input']>;
  meetRecruiterId?: InputMaybe<Scalars['String']['input']>;
  phoneCandidate?: InputMaybe<PhoneInput>;
  phoneRecruiter?: InputMaybe<PhoneInput>;
  token?: InputMaybe<Scalars['String']['input']>;
  videoMainId?: InputMaybe<Scalars['String']['input']>;
  videoPreview1Id?: InputMaybe<Scalars['String']['input']>;
  videoPreview2Id?: InputMaybe<Scalars['String']['input']>;
};

export type MeetRecruiter = {
  __typename?: 'MeetRecruiter';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  linkedinProfileId?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Phone>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type MessageGpt = {
  __typename?: 'MessageGPT';
  content?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type MessageGptInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<BetaCandidate>;
  createAffiliation?: Maybe<Affiliation>;
  createCandidate?: Maybe<BetaCandidate>;
  createCandidateBasic?: Maybe<BetaCandidate>;
  createClassicAccount?: Maybe<BetaUser>;
  createCompany?: Maybe<BetaCompany>;
  createCompanyProfile?: Maybe<BetaCompany>;
  createConversation?: Maybe<BetaQueue>;
  createCustomisation?: Maybe<Customisation>;
  createDetails?: Maybe<BetaDetails>;
  createError?: Maybe<Error>;
  createExperience?: Maybe<BetaExperience>;
  createFavorite?: Maybe<Favorite>;
  createFeedback?: Maybe<Feedback>;
  createFormQuestion?: Maybe<FormQuestion>;
  createInterviewOffer?: Maybe<InterviewOffer>;
  createLead?: Maybe<Lead>;
  createMeet?: Maybe<Meet>;
  createMeetCandidate?: Maybe<MeetCandidate>;
  createMeetRecruiter?: Maybe<MeetRecruiter>;
  createNotification?: Maybe<Notification>;
  createOffer?: Maybe<Offer>;
  createOrUpdateNotes?: Maybe<CandidatesNotes>;
  createProAccount?: Maybe<BetaCompany>;
  createProfileSharing?: Maybe<ProfileSharing>;
  createProfileView?: Maybe<ProfileView>;
  createQuestion?: Maybe<Question>;
  createQueue?: Maybe<BetaQueue>;
  createReference?: Maybe<Reference>;
  createReferenceContact?: Maybe<ReferenceContact>;
  createRemark?: Maybe<UserRemark>;
  createResponses?: Maybe<Array<Maybe<BetaWhatsappResponse>>>;
  createSharingRefusal?: Maybe<SharingRefusal>;
  createThread?: Maybe<BetaWhatsappThread>;
  createUnlockedUser?: Maybe<UnlockedUser>;
  createUser?: Maybe<BetaUser>;
  deleteAccount?: Maybe<BetaUser>;
  deleteAffiliation?: Maybe<Affiliation>;
  deleteCompany?: Maybe<BetaCompany>;
  deleteCompetency?: Maybe<Competency>;
  deleteInterviewOffer?: Maybe<InterviewOffer>;
  deleteLead?: Maybe<Lead>;
  deleteMeet?: Maybe<Meet>;
  deleteOffer?: Maybe<Offer>;
  deleteProfileSharing?: Maybe<ProfileSharing>;
  deleteQueue?: Maybe<BetaQueue>;
  deleteUser?: Maybe<BetaUser>;
  deleteVideo?: Maybe<Video>;
  deleteWhatsappThread?: Maybe<BetaWhatsappThread>;
  submitVideo?: Maybe<Video>;
  unlock?: Maybe<BetaUser>;
  updateAllMyNotifications?: Maybe<Array<Maybe<Notification>>>;
  updateCandidate?: Maybe<BetaCandidate>;
  updateCompany?: Maybe<BetaCompany>;
  updateDetails?: Maybe<BetaDetails>;
  updateExperience?: Maybe<BetaExperience>;
  updateFormResponse?: Maybe<FormResponse>;
  updateLead?: Maybe<Lead>;
  updateMeet?: Maybe<Meet>;
  updateOneNotification?: Maybe<Notification>;
  updateQueue?: Maybe<BetaQueue>;
  updateUser?: Maybe<BetaUser>;
  updateVideo?: Maybe<Video>;
};


export type MutationCreateAccountArgs = {
  data?: InputMaybe<QuickCreateCandidateInput>;
};


export type MutationCreateAffiliationArgs = {
  childrenIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateCandidateArgs = {
  data?: InputMaybe<CandidateInput>;
};


export type MutationCreateCandidateBasicArgs = {
  data?: InputMaybe<CandidateBasicInput>;
};


export type MutationCreateClassicAccountArgs = {
  data?: InputMaybe<BetaUserInput>;
};


export type MutationCreateCompanyArgs = {
  data?: InputMaybe<CompanyInput>;
};


export type MutationCreateCompanyProfileArgs = {
  data?: InputMaybe<ProFormInput>;
};


export type MutationCreateConversationArgs = {
  data?: InputMaybe<ConversationInput>;
};


export type MutationCreateCustomisationArgs = {
  jobId?: InputMaybe<Scalars['ID']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateDetailsArgs = {
  data?: InputMaybe<BetaDetailsInput>;
};


export type MutationCreateErrorArgs = {
  data?: InputMaybe<ErrorInput>;
};


export type MutationCreateExperienceArgs = {
  data?: InputMaybe<ExperienceInput>;
};


export type MutationCreateFavoriteArgs = {
  offerTargetId?: InputMaybe<Scalars['ID']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateFeedbackArgs = {
  data?: InputMaybe<FeedbackInput>;
};


export type MutationCreateFormQuestionArgs = {
  target?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateInterviewOfferArgs = {
  data?: InputMaybe<InterviewOfferInput>;
};


export type MutationCreateLeadArgs = {
  data?: InputMaybe<LeadInput>;
};


export type MutationCreateMeetArgs = {
  data?: InputMaybe<MeetInput>;
};


export type MutationCreateMeetCandidateArgs = {
  data?: InputMaybe<BetaUserInput>;
};


export type MutationCreateMeetRecruiterArgs = {
  data?: InputMaybe<BetaUserInput>;
};


export type MutationCreateNotificationArgs = {
  data?: InputMaybe<NotificationInput>;
};


export type MutationCreateOfferArgs = {
  data?: InputMaybe<OfferInput>;
};


export type MutationCreateOrUpdateNotesArgs = {
  data?: InputMaybe<CandidatesNotesInput>;
};


export type MutationCreateProAccountArgs = {
  data?: InputMaybe<CreateProAccountInput>;
};


export type MutationCreateProfileSharingArgs = {
  data?: InputMaybe<ProfileSharingInput>;
};


export type MutationCreateProfileViewArgs = {
  data?: InputMaybe<ProfileViewInput>;
};


export type MutationCreateQuestionArgs = {
  data?: InputMaybe<ConversationInput>;
};


export type MutationCreateQueueArgs = {
  data?: InputMaybe<ConversationInput>;
};


export type MutationCreateReferenceArgs = {
  data?: InputMaybe<ReferenceInput>;
};


export type MutationCreateReferenceContactArgs = {
  data?: InputMaybe<ReferenceContactInput>;
};


export type MutationCreateRemarkArgs = {
  data?: InputMaybe<RemarkInput>;
};


export type MutationCreateResponsesArgs = {
  responses?: InputMaybe<Array<InputMaybe<ResponseInput>>>;
  threadId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateSharingRefusalArgs = {
  data?: InputMaybe<SharingRefusalInput>;
};


export type MutationCreateThreadArgs = {
  queueId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateUnlockedUserArgs = {
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateUserArgs = {
  data?: InputMaybe<BetaUserInput>;
};


export type MutationDeleteAccountArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteAffiliationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteCompanyArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteCompetencyArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteInterviewOfferArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteLeadArgs = {
  leadId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteMeetArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteOfferArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteProfileSharingArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteQueueArgs = {
  queueId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteUserArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteVideoArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteWhatsappThreadArgs = {
  threadId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationSubmitVideoArgs = {
  data?: InputMaybe<VideoInput>;
};


export type MutationUnlockArgs = {
  data?: InputMaybe<UnlockInput>;
};


export type MutationUpdateAllMyNotificationsArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateCandidateArgs = {
  data?: InputMaybe<BetaCandidateInput>;
};


export type MutationUpdateCompanyArgs = {
  data?: InputMaybe<BetaCompanyInput>;
};


export type MutationUpdateDetailsArgs = {
  data?: InputMaybe<BetaDetailsInput>;
};


export type MutationUpdateExperienceArgs = {
  data?: InputMaybe<BetaExperienceInput>;
};


export type MutationUpdateFormResponseArgs = {
  data?: InputMaybe<FormResponseInput>;
};


export type MutationUpdateLeadArgs = {
  data?: InputMaybe<LeadInput>;
};


export type MutationUpdateMeetArgs = {
  data?: InputMaybe<MeetInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateOneNotificationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateQueueArgs = {
  data?: InputMaybe<BetaQueueInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateUserArgs = {
  data?: InputMaybe<BetaUserInput>;
  uniqueName?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateVideoArgs = {
  data?: InputMaybe<VideoInput>;
};

export type Notification = {
  __typename?: 'Notification';
  concernedId?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  feedback?: Maybe<Feedback>;
  feedbackId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  origin?: Maybe<BetaUser>;
  originId?: Maybe<Scalars['String']['output']>;
  refusal?: Maybe<SharingRefusal>;
  refusalId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  target?: Maybe<BetaUser>;
  targetId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type NotificationInput = {
  concernedId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  originId?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Offer = {
  __typename?: 'Offer';
  accessibleTH?: Maybe<Scalars['Boolean']['output']>;
  agence?: Maybe<AgencyFt>;
  alternance?: Maybe<Scalars['Boolean']['output']>;
  appellationlibelle?: Maybe<Scalars['String']['output']>;
  author?: Maybe<BetaUser>;
  authorEmail?: Maybe<Scalars['String']['output']>;
  authorId?: Maybe<Scalars['String']['output']>;
  authorInterviewLink?: Maybe<Scalars['String']['output']>;
  authorName?: Maybe<Scalars['String']['output']>;
  candidates?: Maybe<Array<Maybe<BetaUser>>>;
  candidatesIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  codeNAF?: Maybe<Scalars['String']['output']>;
  company?: Maybe<BetaCompany>;
  companyId?: Maybe<Scalars['String']['output']>;
  companyLogo?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  competences?: Maybe<Array<Maybe<CompetenceFt>>>;
  complementExercice?: Maybe<Scalars['String']['output']>;
  conditionExercice?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<ContactFt>;
  content?: Maybe<Scalars['String']['output']>;
  contractType?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateActualisation?: Maybe<Scalars['String']['output']>;
  dateCreation?: Maybe<Scalars['String']['output']>;
  deplacementCode?: Maybe<Scalars['String']['output']>;
  deplacementLibelle?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dureeTravailLibelle?: Maybe<Scalars['String']['output']>;
  dureeTravailLibelleConverti?: Maybe<Scalars['String']['output']>;
  entreprise?: Maybe<EnterpriseFt>;
  experienceCommentaire?: Maybe<Scalars['String']['output']>;
  experienceExige?: Maybe<Scalars['String']['output']>;
  experienceLibelle?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  formations?: Maybe<Array<Maybe<FormationFt>>>;
  generated?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  idFT?: Maybe<Scalars['String']['output']>;
  intitule?: Maybe<Scalars['String']['output']>;
  intituleReduced?: Maybe<Scalars['String']['output']>;
  job?: Maybe<Job>;
  jobDescriptionLink?: Maybe<Scalars['String']['output']>;
  jobId?: Maybe<Scalars['String']['output']>;
  langues?: Maybe<Array<Maybe<LanguageFt>>>;
  lieuTravail?: Maybe<WorkLocationFt>;
  limitDate?: Maybe<Scalars['DateTime']['output']>;
  live?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  natureContrat?: Maybe<Scalars['String']['output']>;
  nombrePostes?: Maybe<Scalars['Int']['output']>;
  offresManqueCandidats?: Maybe<Scalars['Boolean']['output']>;
  origineOffre?: Maybe<OriginOfferFt>;
  outilsBureautiques?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  permis?: Maybe<Array<Maybe<PermisFt>>>;
  profileSearched?: Maybe<Scalars['String']['output']>;
  qualificationCode?: Maybe<Scalars['String']['output']>;
  qualificationLibelle?: Maybe<Scalars['String']['output']>;
  qualitesProfessionnelles?: Maybe<Array<Maybe<ProfessionalQualityFt>>>;
  rebroadcast?: Maybe<Scalars['Boolean']['output']>;
  remote?: Maybe<Scalars['String']['output']>;
  requirements?: Maybe<Array<Maybe<Competency>>>;
  requirementsIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  revenue?: Maybe<Scalars['Int']['output']>;
  romeCode?: Maybe<Scalars['String']['output']>;
  romeLibelle?: Maybe<Scalars['String']['output']>;
  romeLibelleReduced?: Maybe<Scalars['String']['output']>;
  salaire?: Maybe<SalaryFt>;
  secteurActivite?: Maybe<Scalars['String']['output']>;
  secteurActiviteLibelle?: Maybe<Scalars['String']['output']>;
  sector?: Maybe<TopSector>;
  sectorId?: Maybe<Scalars['String']['output']>;
  sharings?: Maybe<Array<Maybe<ProfileSharing>>>;
  slug?: Maybe<Scalars['String']['output']>;
  trancheEffectifEtab?: Maybe<Scalars['String']['output']>;
  typeContrat?: Maybe<Scalars['String']['output']>;
  typeContratLibelle?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OfferInput = {
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  authorInterviewLink?: InputMaybe<Scalars['String']['input']>;
  authorName?: InputMaybe<Scalars['String']['input']>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  contractType?: InputMaybe<Scalars['String']['input']>;
  job?: InputMaybe<Scalars['String']['input']>;
  jobDescriptionLink?: InputMaybe<Scalars['String']['input']>;
  jobs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
  lieuTravail?: InputMaybe<WorkLocationFtInput>;
  limitDate?: InputMaybe<Scalars['String']['input']>;
  live?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  profileSearched?: InputMaybe<Scalars['String']['input']>;
  remote?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  revenue?: InputMaybe<Scalars['Int']['input']>;
  sector?: InputMaybe<Scalars['String']['input']>;
  sectors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  targetSectorId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type OriginOfferFt = {
  __typename?: 'OriginOfferFT';
  origine?: Maybe<Scalars['String']['output']>;
  partenaires?: Maybe<Array<Maybe<PartenairFt>>>;
  urlOrigine?: Maybe<Scalars['String']['output']>;
};

export type PageParamsInput = {
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type PartenairFt = {
  __typename?: 'PartenairFT';
  logo?: Maybe<Scalars['String']['output']>;
  nom?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type PermisFt = {
  __typename?: 'PermisFT';
  exigence?: Maybe<Scalars['String']['output']>;
  libelle?: Maybe<Scalars['String']['output']>;
};

export type PersonalDetailsInput = {
  pro?: InputMaybe<Scalars['Boolean']['input']>;
  user?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Phone = {
  __typename?: 'Phone';
  code?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
};

export type PhoneInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
};

export type ProFormInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  avatars?: InputMaybe<Array<InputMaybe<AvatarInput>>>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  linkedinProfileId?: InputMaybe<Scalars['String']['input']>;
  linkedinProfilePage?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<AvatarInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<PhoneInput>;
  resume?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<AvatarInput>;
};

export type ProfessionalQualityFt = {
  __typename?: 'ProfessionalQualityFT';
  description?: Maybe<Scalars['String']['output']>;
  libelle?: Maybe<Scalars['String']['output']>;
};

export type ProfileExperienceGivenInfos = {
  __typename?: 'ProfileExperienceGivenInfos';
  company?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  ending?: Maybe<Scalars['String']['output']>;
  isLiveJob?: Maybe<Scalars['Boolean']['output']>;
  isTargetJob?: Maybe<Scalars['Boolean']['output']>;
  job?: Maybe<Scalars['String']['output']>;
  starting?: Maybe<Scalars['String']['output']>;
};

export type ProfileSharing = {
  __typename?: 'ProfileSharing';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  offerTarget?: Maybe<Offer>;
  offerTargetId?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<BetaUser>;
  originId?: Maybe<Scalars['String']['output']>;
  report?: Maybe<Scalars['String']['output']>;
  target?: Maybe<BetaCompany>;
  targetId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  video?: Maybe<Video>;
  videoId?: Maybe<Scalars['String']['output']>;
};

export type ProfileSharingInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  offerTargetId?: InputMaybe<Scalars['String']['input']>;
  originId?: InputMaybe<Scalars['String']['input']>;
  report?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  videoId?: InputMaybe<Scalars['String']['input']>;
};

export type ProfileView = {
  __typename?: 'ProfileView';
  count?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ProfileViewInput = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  accountCandidate?: Maybe<BetaCandidate>;
  accountDetails?: Maybe<BetaDetails>;
  accountInfos?: Maybe<BetaUser>;
  accountProfile?: Maybe<BetaProfile>;
  accountUser?: Maybe<BetaUser>;
  affiliation?: Maybe<Affiliation>;
  affiliations?: Maybe<Array<Maybe<Affiliation>>>;
  articles?: Maybe<Array<Maybe<Article>>>;
  companies?: Maybe<Array<BetaCompany>>;
  companyOffers?: Maybe<Array<Maybe<Offer>>>;
  competencies?: Maybe<Array<Maybe<Competency>>>;
  errors?: Maybe<Array<Maybe<Error>>>;
  experiences?: Maybe<Array<Maybe<BetaExperience>>>;
  formQuestions?: Maybe<Array<Maybe<FormQuestion>>>;
  jobs?: Maybe<Array<Maybe<Job>>>;
  leadFormResponses?: Maybe<Array<Maybe<FormResponse>>>;
  leads?: Maybe<Array<Maybe<Lead>>>;
  meetCandidates?: Maybe<Array<Maybe<MeetCandidate>>>;
  meets?: Maybe<Array<Maybe<Meet>>>;
  myCompanyProfileSharings?: Maybe<Array<Maybe<ProfileSharing>>>;
  myFavorites?: Maybe<Array<Maybe<Favorite>>>;
  myInterviewOffers?: Maybe<Array<Maybe<InterviewOffer>>>;
  myNotifications?: Maybe<Array<Maybe<Notification>>>;
  myPublishedOffers?: Maybe<Array<Maybe<Offer>>>;
  myReferenceContacts?: Maybe<Array<Maybe<ReferenceContact>>>;
  myReferences?: Maybe<Array<Maybe<Reference>>>;
  myUnlockedUsers?: Maybe<Array<Maybe<UnlockedUser>>>;
  myVideos?: Maybe<Array<Maybe<Video>>>;
  offers?: Maybe<Array<Maybe<Offer>>>;
  oneArticle?: Maybe<Article>;
  oneCandidate?: Maybe<BetaCandidate>;
  oneCandidatesNotes?: Maybe<CandidatesNotes>;
  oneCompany?: Maybe<BetaCompany>;
  oneCompetency?: Maybe<Competency>;
  oneCustomisation?: Maybe<Customisation>;
  oneDetails?: Maybe<BetaDetails>;
  oneExperience?: Maybe<BetaExperience>;
  oneFavorite?: Maybe<Favorite>;
  oneFormResponse?: Maybe<FormResponse>;
  oneInterviewOffer?: Maybe<InterviewOffer>;
  oneJob?: Maybe<Job>;
  oneLead?: Maybe<Lead>;
  oneMeet?: Maybe<Meet>;
  oneMeetCandidate?: Maybe<MeetCandidate>;
  oneNotification?: Maybe<Notification>;
  oneOffer?: Maybe<Offer>;
  oneProfileSharing?: Maybe<ProfileSharing>;
  oneQueue?: Maybe<BetaQueue>;
  oneThread?: Maybe<BetaWhatsappThread>;
  oneTopSector?: Maybe<TopSector>;
  oneUserExperiences?: Maybe<Array<Maybe<BetaExperience>>>;
  oneUserInterviews?: Maybe<Array<Maybe<InterviewOffer>>>;
  oneVideo?: Maybe<Video>;
  ownQueues?: Maybe<Array<Maybe<BetaQueue>>>;
  profileViews?: Maybe<Array<Maybe<ProfileView>>>;
  profiles?: Maybe<Array<Maybe<BetaProfile>>>;
  questions?: Maybe<Array<Maybe<Question>>>;
  recruiterQueuesFromProfile?: Maybe<Array<Maybe<BetaQueue>>>;
  remarks?: Maybe<Array<Maybe<UserRemark>>>;
  resetEmailLink?: Maybe<BetaUser>;
  resetPassword?: Maybe<BetaUser>;
  sendEmail?: Maybe<Email>;
  sendEmailOfferOpportunities?: Maybe<Array<Maybe<BetaUser>>>;
  sendEmailProspectionLinkedin?: Maybe<Array<Maybe<Lead>>>;
  sendEmailToLead?: Maybe<Array<Maybe<Lead>>>;
  sharings?: Maybe<Array<Maybe<ProfileSharing>>>;
  topSectors?: Maybe<Array<Maybe<TopSector>>>;
  uniqueCompetency?: Maybe<Competency>;
  user?: Maybe<BetaUser>;
  users?: Maybe<Array<Maybe<BetaUser>>>;
  videoByPublicId?: Maybe<Video>;
  videos?: Maybe<Array<Maybe<Video>>>;
};


export type QueryAccountCandidateArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAccountDetailsArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAccountInfosArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAccountProfileArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAccountUserArgs = {
  details?: InputMaybe<PersonalDetailsInput>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAffiliationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCompaniesArgs = {
  filters?: InputMaybe<BetaCompanyFilters>;
  first?: InputMaybe<PageParamsInput>;
};


export type QueryCompanyOffersArgs = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCompetenciesArgs = {
  data?: InputMaybe<CompetencyInput>;
  params?: InputMaybe<PageParamsInput>;
};


export type QueryJobsArgs = {
  data?: InputMaybe<JobInput>;
  first?: InputMaybe<PageParamsInput>;
};


export type QueryLeadFormResponsesArgs = {
  leadId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMeetsArgs = {
  data?: InputMaybe<MeetInput>;
};


export type QueryMyCompanyProfileSharingsArgs = {
  targetId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMyFavoritesArgs = {
  data?: InputMaybe<FavoriteInput>;
  first?: InputMaybe<PageParamsInput>;
};


export type QueryMyInterviewOffersArgs = {
  originId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMyNotificationsArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  timePeriod?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryMyPublishedOffersArgs = {
  data?: InputMaybe<OfferInput>;
};


export type QueryMyReferenceContactsArgs = {
  experienceId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMyReferencesArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMyUnlockedUsersArgs = {
  originId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMyVideosArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOffersArgs = {
  data?: InputMaybe<OfferInput>;
  params?: InputMaybe<PageParamsInput>;
};


export type QueryOneArticleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOneCandidateArgs = {
  data?: InputMaybe<BetaUserInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneCandidatesNotesArgs = {
  data?: InputMaybe<CandidatesNotesInput>;
};


export type QueryOneCompanyArgs = {
  filters?: InputMaybe<BetaCompanyFilters>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneCompetencyArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOneCustomisationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  queueId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneDetailsArgs = {
  filter: BetaDetailsInput;
};


export type QueryOneExperienceArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneFavoriteArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneFormResponseArgs = {
  leadId?: InputMaybe<Scalars['ID']['input']>;
  questionId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneInterviewOfferArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOneJobArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneLeadArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneMeetArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneMeetCandidateArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneNotificationArgs = {
  data?: InputMaybe<NotificationInput>;
};


export type QueryOneOfferArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOneProfileSharingArgs = {
  data?: InputMaybe<ProfileSharingInput>;
};


export type QueryOneQueueArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneThreadArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  queueId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneTopSectorArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneUserExperiencesArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneUserInterviewsArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOneVideoArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOwnQueuesArgs = {
  originId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryProfileViewsArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryProfilesArgs = {
  experienceId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryQuestionsArgs = {
  jobId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRecruiterQueuesFromProfileArgs = {
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryResetEmailLinkArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type QueryResetPasswordArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySendEmailArgs = {
  data?: InputMaybe<EmailInput>;
};


export type QuerySendEmailOfferOpportunitiesArgs = {
  usersIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};


export type QuerySendEmailProspectionLinkedinArgs = {
  leadsIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};


export type QuerySendEmailToLeadArgs = {
  data?: InputMaybe<LeadInput>;
  leadsIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  negativeAnswerForDesign?: InputMaybe<Scalars['Boolean']['input']>;
  negativeAnswerForDev?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySharingsArgs = {
  data?: InputMaybe<SharingInput>;
};


export type QueryTopSectorsArgs = {
  data?: InputMaybe<TopSectorInput>;
};


export type QueryUniqueCompetencyArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
  uniqueName?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersArgs = {
  data?: InputMaybe<BetaUserInput>;
  first?: InputMaybe<PageParamsInput>;
};


export type QueryVideoByPublicIdArgs = {
  publicId?: InputMaybe<Scalars['String']['input']>;
};

export type Question = {
  __typename?: 'Question';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customisation?: Maybe<Customisation>;
  customisationId?: Maybe<Scalars['String']['output']>;
  generated?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  job?: Maybe<Job>;
  jobId?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<BetaUser>;
  originId?: Maybe<Scalars['String']['output']>;
  prefix?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type QuestionInput = {
  prefix?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type QuickCreateCandidateInput = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type Reference = {
  __typename?: 'Reference';
  concerned?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  experience?: Maybe<BetaExperience>;
  experienceId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
  valid?: Maybe<Scalars['Boolean']['output']>;
};

export type ReferenceContact = {
  __typename?: 'ReferenceContact';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  experience?: Maybe<BetaExperience>;
  experienceId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Phone>;
  position?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ReferenceContactInput = {
  contactId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  experienceId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<PhoneInput>;
  position?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type ReferenceInput = {
  concerned?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  experienceId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  valid?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RemarkInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type ResponseInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  exchangeId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type SalaryFt = {
  __typename?: 'SalaryFT';
  commentaire?: Maybe<Scalars['String']['output']>;
  complement1?: Maybe<Scalars['String']['output']>;
  complement2?: Maybe<Scalars['String']['output']>;
  libelle?: Maybe<Scalars['String']['output']>;
};

export type ScrappedInfos = {
  __typename?: 'ScrappedInfos';
  fullname?: Maybe<Scalars['String']['output']>;
};

export type SharingInput = {
  offerId?: InputMaybe<Scalars['ID']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
  videoId?: InputMaybe<Scalars['ID']['input']>;
};

export type SharingRefusal = {
  __typename?: 'SharingRefusal';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  origin?: Maybe<BetaCompany>;
  originId?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  sharing?: Maybe<ProfileSharing>;
  sharingId?: Maybe<Scalars['String']['output']>;
  target?: Maybe<BetaUser>;
  targetId?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SharingRefusalInput = {
  offerId?: InputMaybe<Scalars['ID']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
  originUserId?: InputMaybe<Scalars['ID']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  sharingId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
  type: Scalars['String']['input'];
};

export type SocialAuthentication = {
  __typename?: 'SocialAuthentication';
  accessToken?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<GoogleAuthentication>;
};

export type SocialAuthenticationInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<GoogleAuthenticationInput>;
};

export type TopSector = {
  __typename?: 'TopSector';
  bgImage?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  jobs?: Maybe<Array<Maybe<Job>>>;
  title?: Maybe<Translated>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TopSectorInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
};

export type Translated = {
  __typename?: 'Translated';
  en?: Maybe<Scalars['String']['output']>;
  fr?: Maybe<Scalars['String']['output']>;
};

export type UnlockInput = {
  credit?: InputMaybe<Scalars['PositiveFloat']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
};

export type UnlockedUser = {
  __typename?: 'UnlockedUser';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  origin?: Maybe<BetaUser>;
  originId?: Maybe<Scalars['String']['output']>;
  target?: Maybe<BetaUser>;
  targetId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserInput = {
  firstname?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type UserRemark = {
  __typename?: 'UserRemark';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type VerificationRequest = {
  __typename?: 'VerificationRequest';
  academicProofs?: Maybe<Array<Maybe<Avatar>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  judiciaryProofs?: Maybe<Array<Maybe<Avatar>>>;
  origin?: Maybe<BetaUser>;
  originId?: Maybe<Scalars['String']['output']>;
  professionalProofs?: Maybe<Array<Maybe<Avatar>>>;
  target?: Maybe<BetaUser>;
  targetId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VerificationRequestInput = {
  academicProofs?: InputMaybe<Array<InputMaybe<Scalars['File']['input']>>>;
  judiciaryProofs?: InputMaybe<Array<InputMaybe<Scalars['File']['input']>>>;
  originId?: InputMaybe<Scalars['String']['input']>;
  professionalProofs?: InputMaybe<Array<InputMaybe<Scalars['File']['input']>>>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Video = {
  __typename?: 'Video';
  audio?: Maybe<Avatar>;
  company?: Maybe<BetaCompany>;
  companyId?: Maybe<Scalars['String']['output']>;
  confidence?: Maybe<Scalars['PositiveFloat']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  exchangeId?: Maybe<Scalars['String']['output']>;
  file?: Maybe<Avatar>;
  id?: Maybe<Scalars['ID']['output']>;
  job?: Maybe<Job>;
  jobId?: Maybe<Scalars['String']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
  meetCandidate?: Maybe<MeetCandidate>;
  meetCandidateId?: Maybe<Scalars['String']['output']>;
  preview?: Maybe<Scalars['Boolean']['output']>;
  principal?: Maybe<Scalars['Boolean']['output']>;
  report?: Maybe<Scalars['String']['output']>;
  sharings?: Maybe<Array<Maybe<ProfileSharing>>>;
  transcript?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<BetaUser>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type VideoInput = {
  audio?: InputMaybe<AvatarInput>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  confidence?: InputMaybe<Scalars['PositiveFloat']['input']>;
  exchangeId?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<AvatarInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  jobId?: InputMaybe<Scalars['String']['input']>;
  likes?: InputMaybe<Scalars['Int']['input']>;
  meetCandidateId?: InputMaybe<Scalars['String']['input']>;
  originId?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  principal?: InputMaybe<Scalars['Boolean']['input']>;
  report?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  transcript?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type WorkLocationFt = {
  __typename?: 'WorkLocationFT';
  codePostal?: Maybe<Scalars['String']['output']>;
  commune?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['PositiveFloat']['output']>;
  libelle?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['PositiveFloat']['output']>;
};

export type WorkLocationFtInput = {
  codePostal?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  commune?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['PositiveFloat']['input']>;
  libelle?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['PositiveFloat']['input']>;
};

export type CreateAccountMutationVariables = Exact<{
  data?: InputMaybe<QuickCreateCandidateInput>;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'BetaCandidate', id?: string | null } | null };

export type CreateCandidateMutationVariables = Exact<{
  data?: InputMaybe<CandidateInput>;
}>;


export type CreateCandidateMutation = { __typename?: 'Mutation', createCandidate?: { __typename?: 'BetaCandidate', id?: string | null, user?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null } | null } | null };

export type CreateCandidateBasicMutationVariables = Exact<{
  data?: InputMaybe<CandidateBasicInput>;
}>;


export type CreateCandidateBasicMutation = { __typename?: 'Mutation', createCandidateBasic?: { __typename?: 'BetaCandidate', id?: string | null, targetJob?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null> | null } | null };

export type CreateCompanyMutationVariables = Exact<{
  data?: InputMaybe<CompanyInput>;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null };

export type CreateCompanyProfileMutationVariables = Exact<{
  data?: InputMaybe<ProFormInput>;
}>;


export type CreateCompanyProfileMutation = { __typename?: 'Mutation', createCompanyProfile?: { __typename?: 'BetaCompany', id?: string | null, linkedinProfilePage?: string | null, location?: string | null, name?: string | null, resume?: string | null, logo?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null, video?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null } | null };

export type CreateDetailsMutationVariables = Exact<{
  data?: InputMaybe<BetaDetailsInput>;
}>;


export type CreateDetailsMutation = { __typename?: 'Mutation', createDetails?: { __typename?: 'BetaDetails', id?: string | null } | null };

export type CreateExperienceMutationVariables = Exact<{
  data?: InputMaybe<ExperienceInput>;
}>;


export type CreateExperienceMutation = { __typename?: 'Mutation', createExperience?: { __typename?: 'BetaExperience', id?: string | null } | null };

export type CreateFavoriteMutationVariables = Exact<{
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
  offerTargetId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateFavoriteMutation = { __typename?: 'Mutation', createFavorite?: { __typename?: 'Favorite', id?: string | null } | null };

export type CreateInterviewOfferMutationVariables = Exact<{
  data?: InputMaybe<InterviewOfferInput>;
}>;


export type CreateInterviewOfferMutation = { __typename?: 'Mutation', createInterviewOffer?: { __typename?: 'InterviewOffer', id?: string | null } | null };

export type CreateLeadMutationVariables = Exact<{
  data?: InputMaybe<LeadInput>;
}>;


export type CreateLeadMutation = { __typename?: 'Mutation', createLead?: { __typename?: 'Lead', id?: string | null } | null };

export type CreateNotificationMutationVariables = Exact<{
  data?: InputMaybe<NotificationInput>;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification?: { __typename?: 'Notification', id?: string | null } | null };

export type CreateOfferMutationVariables = Exact<{
  data?: InputMaybe<OfferInput>;
}>;


export type CreateOfferMutation = { __typename?: 'Mutation', createOffer?: { __typename?: 'Offer', id?: string | null } | null };

export type CreateOrUpdateNotesMutationVariables = Exact<{
  data?: InputMaybe<CandidatesNotesInput>;
}>;


export type CreateOrUpdateNotesMutation = { __typename?: 'Mutation', createOrUpdateNotes?: { __typename?: 'CandidatesNotes', id?: string | null, content?: string | null, appreciation?: number | null } | null };

export type CreateProfileSharingMutationVariables = Exact<{
  data?: InputMaybe<ProfileSharingInput>;
}>;


export type CreateProfileSharingMutation = { __typename?: 'Mutation', createProfileSharing?: { __typename?: 'ProfileSharing', id?: string | null } | null };

export type CreateReferenceMutationVariables = Exact<{
  data?: InputMaybe<ReferenceInput>;
}>;


export type CreateReferenceMutation = { __typename?: 'Mutation', createReference?: { __typename?: 'Reference', id?: string | null } | null };

export type CreateReferenceContactMutationVariables = Exact<{
  data?: InputMaybe<ReferenceContactInput>;
}>;


export type CreateReferenceContactMutation = { __typename?: 'Mutation', createReferenceContact?: { __typename?: 'ReferenceContact', id?: string | null } | null };

export type CreateUnlockedUserMutationVariables = Exact<{
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateUnlockedUserMutation = { __typename?: 'Mutation', createUnlockedUser?: { __typename?: 'UnlockedUser', id?: string | null, target?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null } | null, origin?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null } | null } | null };

export type CreateUserMutationVariables = Exact<{
  data?: InputMaybe<BetaUserInput>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'BetaUser', id?: string | null } | null };

export type CreateUserRemarkMutationVariables = Exact<{
  data?: InputMaybe<RemarkInput>;
}>;


export type CreateUserRemarkMutation = { __typename?: 'Mutation', createRemark?: { __typename?: 'UserRemark', id?: string | null, content?: string | null } | null };

export type DeleteCompetencyMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteCompetencyMutation = { __typename?: 'Mutation', deleteCompetency?: { __typename?: 'Competency', id?: string | null } | null };

export type DeleteLeadMutationVariables = Exact<{
  leadId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteLeadMutation = { __typename?: 'Mutation', deleteLead?: { __typename?: 'Lead', id?: string | null } | null };

export type DeleteOfferMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteOfferMutation = { __typename?: 'Mutation', deleteOffer?: { __typename?: 'Offer', id?: string | null } | null };

export type DeleteOneInterviewOfferMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteOneInterviewOfferMutation = { __typename?: 'Mutation', deleteInterviewOffer?: { __typename?: 'InterviewOffer', id?: string | null } | null };

export type DeleteOneProfileSharingMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteOneProfileSharingMutation = { __typename?: 'Mutation', deleteProfileSharing?: { __typename?: 'ProfileSharing', id?: string | null } | null };

export type DeleteQueueMutationVariables = Exact<{
  queueId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteQueueMutation = { __typename?: 'Mutation', deleteQueue?: { __typename?: 'BetaQueue', id?: string | null } | null };

export type DeleteUserMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'BetaUser', id?: string | null } | null };

export type DeleteVideoMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeleteVideoMutation = { __typename?: 'Mutation', deleteVideo?: { __typename?: 'Video', id?: string | null } | null };

export type DeleteWhatsappThreadMutationVariables = Exact<{
  threadId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DeleteWhatsappThreadMutation = { __typename?: 'Mutation', deleteWhatsappThread?: { __typename?: 'BetaWhatsappThread', id?: string | null } | null };

export type GetAccountInfosQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAccountInfosQuery = { __typename?: 'Query', accountInfos?: { __typename?: 'BetaUser', id?: string | null, lastname?: string | null, picture?: string | null, languages?: Array<string | null> | null, age?: number | null, credit?: any | null, email?: string | null, description?: string | null, fullname?: string | null, extension?: string | null, uniqueName?: string | null, scrapped?: boolean | null, firstname?: string | null, linkedinProfileId?: string | null, customerId?: string | null, isPublic?: boolean | null, user?: boolean | null, pro?: boolean | null, role?: string | null, consent?: boolean | null, hiddenFields?: Array<string | null> | null, details?: { __typename?: 'BetaDetails', id?: string | null, birthday?: string | null, websites?: string | null, facebook?: string | null, twitter?: string | null, phone?: { __typename?: 'Phone', code?: string | null, number?: string | null } | null } | null, experiences?: Array<{ __typename?: 'BetaExperience', id?: string | null, starting?: string | null, duration?: number | null, ending?: string | null, isLiveJob?: boolean | null, referenced?: boolean | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, topSector?: { __typename?: 'TopSector', id?: string | null, title?: { __typename?: 'Translated', en?: string | null, fr?: string | null } | null } | null } | null } | null> | null, candidate?: { __typename?: 'BetaCandidate', id?: string | null, targetJob?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, topSector?: { __typename?: 'TopSector', id?: string | null } | null } | null, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, secure_url?: string | null, width?: number | null, height?: number | null } | null> | null } | null } | null };

export type GetArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQuery = { __typename?: 'Query', articles?: Array<{ __typename?: 'Article', id: string, createdAt?: any | null, new?: boolean | null, updatedAt?: any | null, title: { __typename?: 'Translated', en?: string | null, fr?: string | null }, description?: { __typename?: 'Translated', en?: string | null, fr?: string | null } | null, introduction?: { __typename?: 'Translated', en?: string | null, fr?: string | null } | null, conclusion?: { __typename?: 'Translated', en?: string | null, fr?: string | null } | null, links?: Array<{ __typename?: 'ArticlesLink', href?: string | null, label?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null> | null, paragraphs?: Array<{ __typename?: 'ArticleParagraph', content?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null> | null } | null> | null };

export type GetCompaniesQueryVariables = Exact<{
  first?: InputMaybe<PageParamsInput>;
  filters?: InputMaybe<BetaCompanyFilters>;
}>;


export type GetCompaniesQuery = { __typename?: 'Query', companies?: Array<{ __typename?: 'BetaCompany', id?: string | null, location?: string | null, name?: string | null, resume?: string | null, scrapped?: boolean | null, logo?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null, eager?: Array<{ __typename?: 'Eager', transformation?: string | null }> | null } | null, video?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null, eager?: Array<{ __typename?: 'Eager', transformation?: string | null }> | null } | null, experiences?: Array<{ __typename?: 'BetaExperience', id?: string | null, starting?: string | null, ending?: string | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', en?: string | null, fr?: string | null } | null } | null, references?: Array<{ __typename?: 'BetaProfile', id?: string | null, user?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, email?: string | null, linkedinProfileId?: string | null } | null } | null> | null, user?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, linkedinProfileId?: string | null, email?: string | null } | null, details?: { __typename?: 'BetaDetails', id?: string | null, phone?: { __typename?: 'Phone', code?: string | null, number?: string | null } | null } | null } | null> | null }> | null };

export type GetCompaniesAutocompleteQueryVariables = Exact<{
  first?: InputMaybe<PageParamsInput>;
  filters?: InputMaybe<BetaCompanyFilters>;
}>;


export type GetCompaniesAutocompleteQuery = { __typename?: 'Query', companies?: Array<{ __typename?: 'BetaCompany', id?: string | null, location?: string | null, name?: string | null }> | null };

export type GetCompanyOffersQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCompanyOffersQuery = { __typename?: 'Query', companyOffers?: Array<{ __typename?: 'Offer', id?: string | null, content?: string | null, authorName?: string | null, authorInterviewLink?: string | null, authorEmail?: string | null, jobDescriptionLink?: string | null, createdAt?: any | null, updatedAt?: any | null, sector?: { __typename?: 'TopSector', id?: string | null } | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, author?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null, fullname?: string | null, linkedinProfileId?: string | null } | null, candidates?: Array<{ __typename?: 'BetaUser', id?: string | null } | null> | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null } | null> | null };

export type GetCompetenciesQueryVariables = Exact<{
  data?: InputMaybe<CompetencyInput>;
  params?: InputMaybe<PageParamsInput>;
}>;


export type GetCompetenciesQuery = { __typename?: 'Query', competencies?: Array<{ __typename?: 'Competency', id?: string | null, title?: string | null, advantages?: Array<string | null> | null, conclusion?: string | null, definition?: string | null, examples?: Array<string | null> | null, relatedSkills?: Array<string | null> | null } | null> | null };

export type GetCompetenciesForBoldQueryVariables = Exact<{
  data?: InputMaybe<CompetencyInput>;
  params?: InputMaybe<PageParamsInput>;
}>;


export type GetCompetenciesForBoldQuery = { __typename?: 'Query', competencies?: Array<{ __typename?: 'Competency', id?: string | null, title?: string | null } | null> | null };

export type GetCompetenciesForHomeQueryVariables = Exact<{
  data?: InputMaybe<CompetencyInput>;
  params?: InputMaybe<PageParamsInput>;
}>;


export type GetCompetenciesForHomeQuery = { __typename?: 'Query', competencies?: Array<{ __typename?: 'Competency', id?: string | null, title?: string | null, slug?: string | null } | null> | null };

export type GetCompetenciesTitleQueryVariables = Exact<{
  data?: InputMaybe<CompetencyInput>;
  params?: InputMaybe<PageParamsInput>;
}>;


export type GetCompetenciesTitleQuery = { __typename?: 'Query', competencies?: Array<{ __typename?: 'Competency', title?: string | null } | null> | null };

export type GetExperiencePasswordQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetExperiencePasswordQuery = { __typename?: 'Query', oneExperience?: { __typename?: 'BetaExperience', password?: string | null } | null };

export type GetFormQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormQuestionsQuery = { __typename?: 'Query', formQuestions?: Array<{ __typename?: 'FormQuestion', id?: string | null, title?: string | null, target?: string | null, type?: string | null, createdAt?: any | null, updatedAt?: any | null } | null> | null };

export type GetJobsQueryVariables = Exact<{
  data?: InputMaybe<JobInput>;
  first?: InputMaybe<PageParamsInput>;
}>;


export type GetJobsQuery = { __typename?: 'Query', jobs?: Array<{ __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', en?: string | null, fr?: string | null } | null, topSector?: { __typename?: 'TopSector', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null } | null> | null };

export type GetLeadFormResponsesQueryVariables = Exact<{
  leadId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetLeadFormResponsesQuery = { __typename?: 'Query', leadFormResponses?: Array<{ __typename?: 'FormResponse', id?: string | null, content?: string | null, type?: string | null, isTrue?: boolean | null, createdAt?: any | null, updatedAt?: any | null, lead?: { __typename?: 'Lead', id?: string | null } | null, question?: { __typename?: 'FormQuestion', id?: string | null, title?: string | null } | null } | null> | null };

export type GetLeadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLeadsQuery = { __typename?: 'Query', leads?: Array<{ __typename?: 'Lead', id?: string | null, name?: string | null, contacted?: boolean | null, email?: string | null, type?: string | null, trialOffering?: any | null, createdAt?: any | null, updatedAt?: any | null, phone?: { __typename?: 'Phone', code?: string | null, number?: string | null } | null } | null> | null };

export type GetMyCompanyProfileSharingsQueryVariables = Exact<{
  targetId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMyCompanyProfileSharingsQuery = { __typename?: 'Query', myCompanyProfileSharings?: Array<{ __typename?: 'ProfileSharing', id?: string | null, createdAt?: any | null, updatedAt?: any | null, origin?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null, fullname?: string | null, linkedinProfileId?: string | null, email?: string | null, cardPrice?: any | null } | null, offerTarget?: { __typename?: 'Offer', id?: string | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null } | null, target?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null, linkedinProfilePage?: string | null, resume?: string | null, location?: string | null, logo?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null, eager?: Array<{ __typename?: 'Eager', transformation?: string | null }> | null } | null } | null, video?: { __typename?: 'Video', id?: string | null, file?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null, subtitledUrl?: string | null, eager?: Array<{ __typename?: 'Eager', transformation?: string | null, url?: string | null, secure_url?: string | null }> | null } | null } | null } | null> | null };

export type GetMyFavoritesQueryVariables = Exact<{
  data?: InputMaybe<FavoriteInput>;
  first?: InputMaybe<PageParamsInput>;
}>;


export type GetMyFavoritesQuery = { __typename?: 'Query', myFavorites?: Array<{ __typename?: 'Favorite', id?: string | null, target?: { __typename: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null, fullname?: string | null, email?: string | null, description?: string | null, picture?: string | null, isPublic?: boolean | null, uniqueName?: string | null, age?: number | null, user?: boolean | null, pro?: boolean | null, consent?: boolean | null, languages?: Array<string | null> | null, scrapped?: boolean | null, linkedinProfileId?: string | null, cvFile?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null, details?: { __typename?: 'BetaDetails', id?: string | null, phone?: { __typename?: 'Phone', number?: string | null, code?: string | null } | null } | null, candidate?: { __typename?: 'BetaCandidate', id?: string | null, targetContractType?: string | null, salaryExpected?: string | null, avatars?: Array<{ __typename?: 'Avatar', secure_url?: string | null, url?: string | null, eager?: Array<{ __typename?: 'Eager', transformation?: string | null }> | null } | null> | null, targetJob?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, topSector?: { __typename?: 'TopSector', id?: string | null, bgImage?: string | null } | null } | null } | null, videos?: Array<{ __typename?: 'Video', id?: string | null, likes?: number | null, principal?: boolean | null, report?: string | null, transcript?: string | null, confidence?: any | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, audio?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null, file?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null, subtitledUrl?: string | null, width?: number | null, height?: number | null, original_filename?: string | null, public_id?: string | null, eager?: Array<{ __typename?: 'Eager', transformation?: string | null }> | null } | null } | null> | null } | null, origin?: { __typename?: 'BetaUser', id?: string | null } | null } | null> | null };

export type GetMyInterviewOffersQueryVariables = Exact<{
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMyInterviewOffersQuery = { __typename?: 'Query', myInterviewOffers?: Array<{ __typename?: 'InterviewOffer', id?: string | null, status?: string | null, comment?: string | null, datetime?: any | null, createdAt?: any | null, updatedAt?: any | null, origin?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, firstname?: string | null, lastname?: string | null } | null, target?: { __typename?: 'BetaUser', id?: string | null } | null } | null> | null };

export type GetMyNotificationsQueryVariables = Exact<{
  targetId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  status?: InputMaybe<Scalars['String']['input']>;
  timePeriod?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMyNotificationsQuery = { __typename?: 'Query', myNotifications?: Array<{ __typename?: 'Notification', id?: string | null, content?: string | null, createdAt?: any | null, concernedId?: string | null, status?: string | null, updatedAt?: any | null, type?: string | null, origin?: { __typename?: 'BetaUser', id?: string | null } | null, target?: { __typename?: 'BetaUser', id?: string | null } | null } | null> | null };

export type GetMyPublishedOffersQueryVariables = Exact<{
  data?: InputMaybe<OfferInput>;
}>;


export type GetMyPublishedOffersQuery = { __typename?: 'Query', myPublishedOffers?: Array<{ __typename?: 'Offer', id?: string | null, contractType?: string | null, createdAt?: any | null, jobDescriptionLink?: string | null, limitDate?: any | null, location?: string | null, authorEmail?: string | null, revenue?: number | null, authorInterviewLink?: string | null, authorName?: string | null, author?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null, fullname?: string | null, email?: string | null, linkedinProfileId?: string | null } | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, sector?: { __typename?: 'TopSector', id?: string | null } | null, requirements?: Array<{ __typename?: 'Competency', id?: string | null, title?: string | null } | null> | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null } | null> | null };

export type GetMyReferenceContactsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
  experienceId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetMyReferenceContactsQuery = { __typename?: 'Query', myReferenceContacts?: Array<{ __typename?: 'ReferenceContact', id?: string | null, name?: string | null, email?: string | null, position?: string | null, phone?: { __typename?: 'Phone', code?: string | null, number?: string | null } | null, experience?: { __typename?: 'BetaExperience', id?: string | null, starting?: string | null, ending?: string | null, isLiveJob?: boolean | null, duration?: number | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', en?: string | null, fr?: string | null } | null } | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null } | null, user?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null, fullname?: string | null } | null } | null> | null };

export type GetMyReferencesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetMyReferencesQuery = { __typename?: 'Query', myReferences?: Array<{ __typename?: 'Reference', id?: string | null, concerned?: string | null, content?: string | null, createdAt?: any | null, type?: string | null, updatedAt?: any | null, valid?: boolean | null, user?: { __typename?: 'BetaUser', id?: string | null } | null, experience?: { __typename?: 'BetaExperience', id?: string | null, duration?: number | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null } | null } | null> | null };

export type GetMyUnlockedUsersQueryVariables = Exact<{
  originId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetMyUnlockedUsersQuery = { __typename?: 'Query', myUnlockedUsers?: Array<{ __typename?: 'UnlockedUser', id?: string | null, origin?: { __typename?: 'BetaUser', id?: string | null } | null, target?: { __typename?: 'BetaUser', id?: string | null } | null } | null> | null };

export type GetOffersQueryVariables = Exact<{
  params?: InputMaybe<PageParamsInput>;
  data?: InputMaybe<OfferInput>;
}>;


export type GetOffersQuery = { __typename?: 'Query', offers?: Array<{ __typename?: 'Offer', id?: string | null, jobDescriptionLink?: string | null, limitDate?: any | null, location?: string | null, content?: string | null, revenue?: number | null, contractType?: string | null, authorName?: string | null, authorInterviewLink?: string | null, authorEmail?: string | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, requirements?: Array<{ __typename?: 'Competency', title?: string | null, id?: string | null } | null> | null, sector?: { __typename?: 'TopSector', id?: string | null, bgImage?: string | null } | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null, location?: string | null, logo?: { __typename?: 'Avatar', secure_url?: string | null, url?: string | null } | null } | null, author?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null, fullname?: string | null, email?: string | null, linkedinProfileId?: string | null } | null } | null> | null };

export type GetOffersForHomeQueryVariables = Exact<{
  params?: InputMaybe<PageParamsInput>;
  data?: InputMaybe<OfferInput>;
}>;


export type GetOffersForHomeQuery = { __typename?: 'Query', offers?: Array<{ __typename?: 'Offer', id?: string | null, slug?: string | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null } | null> | null };

export type GetOneArticleQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneArticleQuery = { __typename?: 'Query', oneArticle?: { __typename?: 'Article', id: string, new?: boolean | null, createdAt?: any | null, updatedAt?: any | null, title: { __typename?: 'Translated', en?: string | null, fr?: string | null }, conclusion?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, introduction?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, description?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, links?: Array<{ __typename?: 'ArticlesLink', href?: string | null, label?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null> | null, paragraphs?: Array<{ __typename?: 'ArticleParagraph', content?: { __typename?: 'Translated', en?: string | null, fr?: string | null } | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null> | null } | null };

export type GetOneCandidateQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOneCandidateQuery = { __typename?: 'Query', oneCandidate?: { __typename?: 'BetaCandidate', confirmed?: boolean | null, id?: string | null, targetJob?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, topSector?: { __typename?: 'TopSector', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null } | null } | null };

export type GetOneCandidatesNotesQueryVariables = Exact<{
  data?: InputMaybe<CandidatesNotesInput>;
}>;


export type GetOneCandidatesNotesQuery = { __typename?: 'Query', oneCandidatesNotes?: { __typename?: 'CandidatesNotes', id?: string | null, content?: string | null, appreciation?: number | null } | null };

export type GetOneCompanyQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  filters?: InputMaybe<BetaCompanyFilters>;
}>;


export type GetOneCompanyQuery = { __typename?: 'Query', oneCompany?: { __typename?: 'BetaCompany', id?: string | null, location?: string | null, name?: string | null, resume?: string | null, scrapped?: boolean | null, experiences?: Array<{ __typename?: 'BetaExperience', id?: string | null, starting?: string | null, ending?: string | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, references?: Array<{ __typename?: 'BetaProfile', id?: string | null, user?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, email?: string | null, linkedinProfileId?: string | null } | null } | null> | null, user?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, linkedinProfileId?: string | null, email?: string | null } | null, details?: { __typename?: 'BetaDetails', id?: string | null, phone?: { __typename?: 'Phone', code?: string | null, number?: string | null } | null } | null } | null> | null } | null };

export type GetOneCompetencyQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOneCompetencyQuery = { __typename?: 'Query', oneCompetency?: { __typename?: 'Competency', id?: string | null, title?: string | null } | null };

export type GetOneCustomisationQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  queueId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneCustomisationQuery = { __typename?: 'Query', oneCustomisation?: { __typename?: 'Customisation', id?: string | null, questions?: Array<{ __typename?: 'Question', id?: string | null, type?: string | null, prefix?: string | null, text?: string | null, job?: { __typename?: 'Job', id?: string | null } | null, customisation?: { __typename?: 'Customisation', id?: string | null } | null } | null> | null } | null };

export type GetOneDetailsQueryVariables = Exact<{
  filter: BetaDetailsInput;
}>;


export type GetOneDetailsQuery = { __typename?: 'Query', oneDetails?: { __typename?: 'BetaDetails', id?: string | null, profileId?: string | null, email?: string | null, phone?: { __typename?: 'Phone', code?: string | null, number?: string | null } | null, user?: { __typename?: 'BetaUser', id?: string | null, linkedinProfileId?: string | null } | null } | null };

export type GetOneExperienceQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneExperienceQuery = { __typename?: 'Query', oneExperience?: { __typename?: 'BetaExperience', id?: string | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, user?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, firstname?: string | null, picture?: string | null, lastname?: string | null, details?: { __typename?: 'BetaDetails', id?: string | null, email?: string | null } | null } | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null, candidate?: { __typename?: 'BetaCandidate', id?: string | null, userId?: string | null, user?: { __typename?: 'BetaUser', id?: string | null, lastname?: string | null, firstname?: string | null, fullname?: string | null, picture?: string | null } | null } | null } | null, profiles?: Array<{ __typename?: 'BetaProfile', id?: string | null, user?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, firstname?: string | null, lastname?: string | null, picture?: string | null } | null } | null> | null };

export type GetOneFavoriteQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneFavoriteQuery = { __typename?: 'Query', oneFavorite?: { __typename?: 'Favorite', id?: string | null, target?: { __typename?: 'BetaUser', id?: string | null } | null, origin?: { __typename?: 'BetaUser', id?: string | null } | null } | null };

export type GetOneFormResponseQueryVariables = Exact<{
  leadId?: InputMaybe<Scalars['ID']['input']>;
  questionId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneFormResponseQuery = { __typename?: 'Query', oneFormResponse?: { __typename?: 'FormResponse', id?: string | null, isTrue?: boolean | null, content?: string | null, type?: string | null, createdAt?: any | null, question?: { __typename?: 'FormQuestion', id?: string | null } | null, lead?: { __typename?: 'Lead', id?: string | null } | null } | null };

export type GetOneInterviewOfferQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOneInterviewOfferQuery = { __typename?: 'Query', oneInterviewOffer?: { __typename?: 'InterviewOffer', id?: string | null, status?: string | null, comment?: string | null, datetime?: any | null, createdAt?: any | null, updatedAt?: any | null, origin?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, firstname?: string | null, lastname?: string | null, linkedinProfileId?: string | null } | null, target?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, firstname?: string | null, lastname?: string | null } | null } | null };

export type GetOneJobQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneJobQuery = { __typename?: 'Query', oneJob?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, topSector?: { __typename?: 'TopSector', id?: string | null } | null, questions?: Array<{ __typename?: 'Question', id?: string | null, text?: string | null } | null> | null } | null };

export type GetOneLeadQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneLeadQuery = { __typename?: 'Query', oneLead?: { __typename?: 'Lead', id?: string | null, createdAt?: any | null, email?: string | null, type?: string | null, updatedAt?: any | null } | null };

export type GetOneOfferQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOneOfferQuery = { __typename?: 'Query', oneOffer?: { __typename?: 'Offer', id?: string | null, content?: string | null, profileSearched?: string | null, contractType?: string | null, remote?: string | null, limitDate?: any | null, authorInterviewLink?: string | null, authorName?: string | null, createdAt?: any | null, updatedAt?: any | null, jobDescriptionLink?: string | null, authorEmail?: string | null, location?: string | null, revenue?: number | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null, location?: string | null, logo?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null, eager?: Array<{ __typename?: 'Eager', transformation?: string | null }> | null } | null } | null, author?: { __typename?: 'BetaUser', id?: string | null, email?: string | null, firstname?: string | null, fullname?: string | null, lastname?: string | null } | null, requirements?: Array<{ __typename?: 'Competency', id?: string | null, title?: string | null } | null> | null, job?: { __typename?: 'Job', title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, sector?: { __typename?: 'TopSector', id?: string | null } | null } | null };

export type GetOneProfileSharingQueryVariables = Exact<{
  data?: InputMaybe<ProfileSharingInput>;
}>;


export type GetOneProfileSharingQuery = { __typename?: 'Query', oneProfileSharing?: { __typename?: 'ProfileSharing', id?: string | null, report?: string | null, createdAt?: any | null, updatedAt?: any | null, origin?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null, fullname?: string | null, linkedinProfileId?: string | null, email?: string | null, uniqueName?: string | null } | null, target?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null, linkedinProfilePage?: string | null, resume?: string | null, location?: string | null, logo?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null } | null, offerTarget?: { __typename?: 'Offer', id?: string | null, content?: string | null, profileSearched?: string | null, contractType?: string | null, remote?: string | null, limitDate?: any | null, authorInterviewLink?: string | null, authorName?: string | null, createdAt?: any | null, updatedAt?: any | null, jobDescriptionLink?: string | null, authorEmail?: string | null, location?: string | null, revenue?: number | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null, location?: string | null } | null, author?: { __typename?: 'BetaUser', id?: string | null, email?: string | null, firstname?: string | null, fullname?: string | null, lastname?: string | null } | null, requirements?: Array<{ __typename?: 'Competency', id?: string | null, title?: string | null } | null> | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, sector?: { __typename?: 'TopSector', id?: string | null } | null } | null, video?: { __typename?: 'Video', id?: string | null, transcript?: string | null, confidence?: any | null, report?: string | null, audio?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null, file?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null, subtitledUrl?: string | null, eager?: Array<{ __typename?: 'Eager', transformation?: string | null, url?: string | null, secure_url?: string | null }> | null } | null } | null } | null };

export type GetOneQueueQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneQueueQuery = { __typename?: 'Query', oneQueue?: { __typename?: 'BetaQueue', id?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null, target?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, linkedinProfileId?: string | null, description?: string | null, picture?: string | null } | null, origin?: { __typename?: 'BetaUser', fullname?: string | null, id?: string | null, linkedinProfileId?: string | null, picture?: string | null, email?: string | null, roles?: Array<{ __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null> | null } | null } | null };

export type GetOneThreadQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  queueId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneThreadQuery = { __typename?: 'Query', oneThread?: { __typename?: 'BetaWhatsappThread', id?: string | null, chatId?: string | null, createdAt?: any | null, updatedAt?: any | null, terminated?: boolean | null, queue?: { __typename?: 'BetaQueue', id?: string | null, target?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, fullname?: string | null, lastname?: string | null, linkedinProfileId?: string | null, picture?: string | null } | null, origin?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, fullname?: string | null, lastname?: string | null, linkedinProfileId?: string | null, picture?: string | null } | null } | null, exchanges?: Array<{ __typename?: 'BetaWhatsappExchange', id?: string | null, question?: { __typename?: 'Question', id?: string | null, type?: string | null, text?: string | null, prefix?: string | null } | null, responses?: Array<{ __typename?: 'BetaWhatsappResponse', id?: string | null, content?: string | null } | null> | null } | null> | null, responses?: Array<{ __typename?: 'BetaWhatsappResponse', id?: string | null, content?: string | null } | null> | null } | null };

export type GetOneTopSectorQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneTopSectorQuery = { __typename?: 'Query', oneTopSector?: { __typename?: 'TopSector', id?: string | null, bgImage?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null };

export type GetOneUserExperiencesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneUserExperiencesQuery = { __typename?: 'Query', oneUserExperiences?: Array<{ __typename?: 'BetaExperience', id?: string | null, starting?: string | null, duration?: number | null, ending?: string | null, isLiveJob?: boolean | null, referenced?: boolean | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, topSector?: { __typename?: 'TopSector', id?: string | null, title?: { __typename?: 'Translated', en?: string | null, fr?: string | null } | null } | null } | null } | null> | null };

export type GetOneUserInterviewsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneUserInterviewsQuery = { __typename?: 'Query', oneUserInterviews?: Array<{ __typename?: 'InterviewOffer', id?: string | null, status?: string | null, datetime?: any | null, comment?: string | null, origin?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null, fullname?: string | null, email?: string | null, linkedinProfileId?: string | null } | null, target?: { __typename?: 'BetaUser', id?: string | null, firstname?: string | null, lastname?: string | null, fullname?: string | null, email?: string | null, linkedinProfileId?: string | null } | null } | null> | null };

export type GetOneVideoQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOneVideoQuery = { __typename?: 'Query', oneVideo?: { __typename?: 'Video', id?: string | null } | null };

export type GetQuestionsQueryVariables = Exact<{
  jobId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetQuestionsQuery = { __typename?: 'Query', questions?: Array<{ __typename?: 'Question', id?: string | null, prefix?: string | null, text?: string | null } | null> | null };

export type GetRecruiterQueuesFromProfileQueryVariables = Exact<{
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetRecruiterQueuesFromProfileQuery = { __typename?: 'Query', recruiterQueuesFromProfile?: Array<{ __typename?: 'BetaQueue', id?: string | null, status?: string | null, seen?: boolean | null, createdAt?: any | null, updatedAt?: any | null, offerTarget?: { __typename?: 'Offer', id?: string | null, location?: string | null, revenue?: number | null, contractType?: string | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null } | null, target?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, linkedinProfileId?: string | null, description?: string | null, picture?: string | null } | null, origin?: { __typename?: 'BetaUser', fullname?: string | null, id?: string | null, linkedinProfileId?: string | null, picture?: string | null, email?: string | null, roles?: Array<{ __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null> | null } | null } | null> | null };

export type GetTopSectorsQueryVariables = Exact<{
  data?: InputMaybe<TopSectorInput>;
}>;


export type GetTopSectorsQuery = { __typename?: 'Query', topSectors?: Array<{ __typename?: 'TopSector', id?: string | null, title?: { __typename?: 'Translated', en?: string | null, fr?: string | null } | null } | null> | null };

export type GetUserQueryVariables = Exact<{
  uniqueName?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'BetaUser', id?: string | null, lastname?: string | null, picture?: string | null, languages?: Array<string | null> | null, age?: number | null, credit?: any | null, cardPrice?: any | null, email?: string | null, description?: string | null, fullname?: string | null, extension?: string | null, uniqueName?: string | null, scrapped?: boolean | null, firstname?: string | null, linkedinProfileId?: string | null, professionalEmail?: boolean | null, customerId?: string | null, isPublic?: boolean | null, user?: boolean | null, pro?: boolean | null, role?: string | null, consent?: boolean | null, hiddenFields?: Array<string | null> | null, details?: { __typename?: 'BetaDetails', id?: string | null, birthday?: string | null, websites?: string | null, facebook?: string | null, twitter?: string | null, phone?: { __typename?: 'Phone', code?: string | null, number?: string | null } | null } | null, videos?: Array<{ __typename?: 'Video', id?: string | null, principal?: boolean | null, file?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null, subtitledUrl?: string | null, eager?: Array<{ __typename?: 'Eager', transformation?: string | null }> | null } | null } | null> | null } | null };

export type GetUserCustomerIdQueryVariables = Exact<{
  uniqueName?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetUserCustomerIdQuery = { __typename?: 'Query', user?: { __typename?: 'BetaUser', id?: string | null, customerId?: string | null } | null };

export type GetUserRemarksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserRemarksQuery = { __typename?: 'Query', remarks?: Array<{ __typename?: 'UserRemark', id?: string | null, content?: string | null, user?: { __typename?: 'BetaUser', id?: string | null, user?: boolean | null, pro?: boolean | null, fullname?: string | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null } | null } | null> | null };

export type GetUserVideoQueryVariables = Exact<{
  uniqueName?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  originId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetUserVideoQuery = { __typename?: 'Query', user?: { __typename?: 'BetaUser', id?: string | null, video?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null } | null };

export type GetUsersQueryVariables = Exact<{
  first?: InputMaybe<PageParamsInput>;
  data?: InputMaybe<BetaUserInput>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'BetaUser', id?: string | null, languages?: Array<string | null> | null, lastname?: string | null, picture?: string | null, email?: string | null, role?: string | null, linkedinProfileId?: string | null, description?: string | null, firstname?: string | null, customerId?: string | null, fullname?: string | null, cardPrice?: any | null, user?: boolean | null, pro?: boolean | null, uniqueName?: string | null, updatedAt?: any | null, createdAt?: any | null, auth?: { __typename?: 'AuthDetails', internal?: { __typename?: 'InternalAuthentication', email?: string | null } | null, social?: { __typename?: 'SocialAuthentication', expiryDate?: any | null } | null } | null, video?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null, original_filename?: string | null } | null, experiences?: Array<{ __typename?: 'BetaExperience', id?: string | null, duration?: number | null, companyName?: string | null, isLiveJob?: boolean | null, ending?: string | null, starting?: string | null, job?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null } | null> | null, details?: { __typename?: 'BetaDetails', id?: string | null, phone?: { __typename?: 'Phone', code?: string | null, number?: string | null } | null } | null, candidate?: { __typename?: 'BetaCandidate', id?: string | null, targetContractType?: string | null, targetJob?: { __typename?: 'Job', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null, topSector?: { __typename?: 'TopSector', id?: string | null, bgImage?: string | null } | null } | null, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null> | null } | null, videos?: Array<{ __typename?: 'Video', id?: string | null, principal?: boolean | null, file?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null, subtitledUrl?: string | null, eager?: Array<{ __typename?: 'Eager', url?: string | null, secure_url?: string | null }> | null } | null } | null> | null, unvolonteerFavorites?: Array<{ __typename?: 'Favorite', id?: string | null, origin?: { __typename?: 'BetaUser', id?: string | null } | null } | null> | null } | null> | null };

export type GetUsersUniqueNameQueryVariables = Exact<{
  first?: InputMaybe<PageParamsInput>;
  data?: InputMaybe<BetaUserInput>;
}>;


export type GetUsersUniqueNameQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'BetaUser', id?: string | null, uniqueName?: string | null } | null> | null };

export type OwnQueuesQueryVariables = Exact<{
  originId?: InputMaybe<Scalars['ID']['input']>;
  targetId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type OwnQueuesQuery = { __typename?: 'Query', ownQueues?: Array<{ __typename?: 'BetaQueue', id?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null, target?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, firstname?: string | null, linkedinProfileId?: string | null, lastname?: string | null } | null, origin?: { __typename?: 'BetaUser', id?: string | null } | null, offerTarget?: { __typename?: 'Offer', id?: string | null, rebroadcast?: boolean | null, companyName?: string | null, company?: { __typename?: 'BetaCompany', id?: string | null, name?: string | null } | null } | null } | null> | null };

export type ProfileInfosQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type ProfileInfosQuery = { __typename?: 'Query', accountUser?: { __typename?: 'BetaUser', id?: string | null, fullname?: string | null, linkedinProfileId?: string | null, email?: string | null } | null, accountDetails?: { __typename?: 'BetaDetails', id?: string | null, email?: string | null, candidate?: { __typename?: 'BetaCandidate', id?: string | null, confirmed?: boolean | null } | null, phone?: { __typename?: 'Phone', code?: string | null, number?: string | null } | null } | null };

export type ResetEmailLinkQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type ResetEmailLinkQuery = { __typename?: 'Query', resetEmailLink?: { __typename?: 'BetaUser', id?: string | null } | null };

export type ResetPasswordQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type ResetPasswordQuery = { __typename?: 'Query', resetPassword?: { __typename?: 'BetaUser', id?: string | null } | null };

export type SendEmailProspectionLinkedinQueryVariables = Exact<{
  leadsIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
}>;


export type SendEmailProspectionLinkedinQuery = { __typename?: 'Query', sendEmailProspectionLinkedin?: Array<{ __typename?: 'Lead', id?: string | null } | null> | null };

export type SendEmailToLeadQueryVariables = Exact<{
  data?: InputMaybe<LeadInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  leadsIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  negativeAnswerForDesign?: InputMaybe<Scalars['Boolean']['input']>;
  negativeAnswerForDev?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SendEmailToLeadQuery = { __typename?: 'Query', sendEmailToLead?: Array<{ __typename?: 'Lead', id?: string | null, type?: string | null, name?: string | null, email?: string | null } | null> | null };

export type SubmitVideoMutationVariables = Exact<{
  data?: InputMaybe<VideoInput>;
}>;


export type SubmitVideoMutation = { __typename?: 'Mutation', submitVideo?: { __typename?: 'Video', id?: string | null } | null };

export type UpdateAllMyNotificationsMutationVariables = Exact<{
  targetId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateAllMyNotificationsMutation = { __typename?: 'Mutation', updateAllMyNotifications?: Array<{ __typename?: 'Notification', id?: string | null } | null> | null };

export type UpdateCandidateMutationVariables = Exact<{
  data?: InputMaybe<BetaCandidateInput>;
}>;


export type UpdateCandidateMutation = { __typename?: 'Mutation', updateCandidate?: { __typename?: 'BetaCandidate', id?: string | null, targetJob?: { __typename?: 'Job', id?: string | null, topSector?: { __typename?: 'TopSector', id?: string | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null, title?: { __typename?: 'Translated', fr?: string | null, en?: string | null } | null } | null } | null };

export type UpdateCompanyMutationVariables = Exact<{
  data?: InputMaybe<BetaCompanyInput>;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany?: { __typename?: 'BetaCompany', id?: string | null, linkedinProfilePage?: string | null, location?: string | null, name?: string | null, resume?: string | null, isPublic?: boolean | null, logo?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null, video?: { __typename?: 'Avatar', url?: string | null, secure_url?: string | null } | null } | null };

export type UpdateDetailsMutationVariables = Exact<{
  data?: InputMaybe<BetaDetailsInput>;
}>;


export type UpdateDetailsMutation = { __typename?: 'Mutation', updateDetails?: { __typename?: 'BetaDetails', id?: string | null } | null };

export type UpdateExperienceMutationVariables = Exact<{
  data?: InputMaybe<BetaExperienceInput>;
}>;


export type UpdateExperienceMutation = { __typename?: 'Mutation', updateExperience?: { __typename?: 'BetaExperience', id?: string | null, referenced?: boolean | null } | null };

export type UpdateFormResponseMutationVariables = Exact<{
  data?: InputMaybe<FormResponseInput>;
}>;


export type UpdateFormResponseMutation = { __typename?: 'Mutation', updateFormResponse?: { __typename?: 'FormResponse', id?: string | null } | null };

export type UpdateLeadMutationVariables = Exact<{
  data?: InputMaybe<LeadInput>;
}>;


export type UpdateLeadMutation = { __typename?: 'Mutation', updateLead?: { __typename?: 'Lead', id?: string | null } | null };

export type UpdateOneNotificationMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateOneNotificationMutation = { __typename?: 'Mutation', updateOneNotification?: { __typename?: 'Notification', id?: string | null } | null };

export type UpdateQueueMutationVariables = Exact<{
  data?: InputMaybe<BetaQueueInput>;
}>;


export type UpdateQueueMutation = { __typename?: 'Mutation', updateQueue?: { __typename?: 'BetaQueue', id?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  data?: InputMaybe<BetaUserInput>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  uniqueName?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'BetaUser', id?: string | null, hiddenFields?: Array<string | null> | null, isPublic?: boolean | null } | null };

export type UpdateVideoMutationVariables = Exact<{
  data?: InputMaybe<VideoInput>;
}>;


export type UpdateVideoMutation = { __typename?: 'Mutation', updateVideo?: { __typename?: 'Video', id?: string | null } | null };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Affiliation: ResolverTypeWrapper<Affiliation>;
  AgencyFT: ResolverTypeWrapper<AgencyFt>;
  Article: ResolverTypeWrapper<Article>;
  ArticleParagraph: ResolverTypeWrapper<ArticleParagraph>;
  ArticlesLink: ResolverTypeWrapper<ArticlesLink>;
  AuthDetails: ResolverTypeWrapper<AuthDetails>;
  AuthDetailsInput: AuthDetailsInput;
  Avatar: ResolverTypeWrapper<Avatar>;
  AvatarInput: AvatarInput;
  BetaCandidate: ResolverTypeWrapper<BetaCandidate>;
  BetaCandidateInput: BetaCandidateInput;
  BetaCompany: ResolverTypeWrapper<BetaCompany>;
  BetaCompanyFilters: BetaCompanyFilters;
  BetaCompanyInput: BetaCompanyInput;
  BetaDetails: ResolverTypeWrapper<BetaDetails>;
  BetaDetailsInput: BetaDetailsInput;
  BetaExperience: ResolverTypeWrapper<BetaExperience>;
  BetaExperienceInput: BetaExperienceInput;
  BetaProfile: ResolverTypeWrapper<BetaProfile>;
  BetaProfileInput: BetaProfileInput;
  BetaQueue: ResolverTypeWrapper<BetaQueue>;
  BetaQueueInput: BetaQueueInput;
  BetaUser: ResolverTypeWrapper<BetaUser>;
  BetaUserInput: BetaUserInput;
  BetaWhatsappExchange: ResolverTypeWrapper<BetaWhatsappExchange>;
  BetaWhatsappResponse: ResolverTypeWrapper<BetaWhatsappResponse>;
  BetaWhatsappThread: ResolverTypeWrapper<BetaWhatsappThread>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CandidateBasicInput: CandidateBasicInput;
  CandidateInput: CandidateInput;
  CandidatesNotes: ResolverTypeWrapper<CandidatesNotes>;
  CandidatesNotesInput: CandidatesNotesInput;
  CompanyInput: CompanyInput;
  CompetenceFT: ResolverTypeWrapper<CompetenceFt>;
  Competency: ResolverTypeWrapper<Competency>;
  CompetencyInput: CompetencyInput;
  ContactFT: ResolverTypeWrapper<ContactFt>;
  ConversationInput: ConversationInput;
  CreateProAccountInput: CreateProAccountInput;
  Customisation: ResolverTypeWrapper<Customisation>;
  CustomisationInput: CustomisationInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Eager: ResolverTypeWrapper<Eager>;
  EagerInput: EagerInput;
  Email: ResolverTypeWrapper<Email>;
  EmailInput: EmailInput;
  EnterpriseFT: ResolverTypeWrapper<EnterpriseFt>;
  Error: ResolverTypeWrapper<Error>;
  ErrorInput: ErrorInput;
  ErrorOnValidation: ResolverTypeWrapper<ErrorOnValidation>;
  ExperienceInput: ExperienceInput;
  Favorite: ResolverTypeWrapper<Favorite>;
  FavoriteInput: FavoriteInput;
  Feedback: ResolverTypeWrapper<Feedback>;
  FeedbackInput: FeedbackInput;
  File: ResolverTypeWrapper<Scalars['File']['output']>;
  FormQuestion: ResolverTypeWrapper<FormQuestion>;
  FormResponse: ResolverTypeWrapper<FormResponse>;
  FormResponseInput: FormResponseInput;
  FormationFT: ResolverTypeWrapper<FormationFt>;
  GoogleAuthentication: ResolverTypeWrapper<GoogleAuthentication>;
  GoogleAuthenticationInput: GoogleAuthenticationInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InternalAuthentication: ResolverTypeWrapper<InternalAuthentication>;
  InternalAuthenticationInput: InternalAuthenticationInput;
  InterviewOffer: ResolverTypeWrapper<InterviewOffer>;
  InterviewOfferInput: InterviewOfferInput;
  Job: ResolverTypeWrapper<Job>;
  JobInput: JobInput;
  LanguageFT: ResolverTypeWrapper<LanguageFt>;
  Lead: ResolverTypeWrapper<Lead>;
  LeadInput: LeadInput;
  Meet: ResolverTypeWrapper<Meet>;
  MeetCandidate: ResolverTypeWrapper<MeetCandidate>;
  MeetInput: MeetInput;
  MeetRecruiter: ResolverTypeWrapper<MeetRecruiter>;
  MessageGPT: ResolverTypeWrapper<MessageGpt>;
  MessageGPTInput: MessageGptInput;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<Notification>;
  NotificationInput: NotificationInput;
  Offer: ResolverTypeWrapper<Offer>;
  OfferInput: OfferInput;
  OriginOfferFT: ResolverTypeWrapper<OriginOfferFt>;
  PageParamsInput: PageParamsInput;
  PartenairFT: ResolverTypeWrapper<PartenairFt>;
  PermisFT: ResolverTypeWrapper<PermisFt>;
  PersonalDetailsInput: PersonalDetailsInput;
  Phone: ResolverTypeWrapper<Phone>;
  PhoneInput: PhoneInput;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']['output']>;
  ProFormInput: ProFormInput;
  ProfessionalQualityFT: ResolverTypeWrapper<ProfessionalQualityFt>;
  ProfileExperienceGivenInfos: ResolverTypeWrapper<ProfileExperienceGivenInfos>;
  ProfileSharing: ResolverTypeWrapper<ProfileSharing>;
  ProfileSharingInput: ProfileSharingInput;
  ProfileView: ResolverTypeWrapper<ProfileView>;
  ProfileViewInput: ProfileViewInput;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  QuestionInput: QuestionInput;
  QuickCreateCandidateInput: QuickCreateCandidateInput;
  Reference: ResolverTypeWrapper<Reference>;
  ReferenceContact: ResolverTypeWrapper<ReferenceContact>;
  ReferenceContactInput: ReferenceContactInput;
  ReferenceInput: ReferenceInput;
  RemarkInput: RemarkInput;
  ResponseInput: ResponseInput;
  SalaryFT: ResolverTypeWrapper<SalaryFt>;
  ScrappedInfos: ResolverTypeWrapper<ScrappedInfos>;
  SharingInput: SharingInput;
  SharingRefusal: ResolverTypeWrapper<SharingRefusal>;
  SharingRefusalInput: SharingRefusalInput;
  SocialAuthentication: ResolverTypeWrapper<SocialAuthentication>;
  SocialAuthenticationInput: SocialAuthenticationInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TopSector: ResolverTypeWrapper<TopSector>;
  TopSectorInput: TopSectorInput;
  Translated: ResolverTypeWrapper<Translated>;
  UnlockInput: UnlockInput;
  UnlockedUser: ResolverTypeWrapper<UnlockedUser>;
  UserInput: UserInput;
  UserRemark: ResolverTypeWrapper<UserRemark>;
  VerificationRequest: ResolverTypeWrapper<VerificationRequest>;
  VerificationRequestInput: VerificationRequestInput;
  Video: ResolverTypeWrapper<Video>;
  VideoInput: VideoInput;
  WorkLocationFT: ResolverTypeWrapper<WorkLocationFt>;
  WorkLocationFTInput: WorkLocationFtInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Affiliation: Affiliation;
  AgencyFT: AgencyFt;
  Article: Article;
  ArticleParagraph: ArticleParagraph;
  ArticlesLink: ArticlesLink;
  AuthDetails: AuthDetails;
  AuthDetailsInput: AuthDetailsInput;
  Avatar: Avatar;
  AvatarInput: AvatarInput;
  BetaCandidate: BetaCandidate;
  BetaCandidateInput: BetaCandidateInput;
  BetaCompany: BetaCompany;
  BetaCompanyFilters: BetaCompanyFilters;
  BetaCompanyInput: BetaCompanyInput;
  BetaDetails: BetaDetails;
  BetaDetailsInput: BetaDetailsInput;
  BetaExperience: BetaExperience;
  BetaExperienceInput: BetaExperienceInput;
  BetaProfile: BetaProfile;
  BetaProfileInput: BetaProfileInput;
  BetaQueue: BetaQueue;
  BetaQueueInput: BetaQueueInput;
  BetaUser: BetaUser;
  BetaUserInput: BetaUserInput;
  BetaWhatsappExchange: BetaWhatsappExchange;
  BetaWhatsappResponse: BetaWhatsappResponse;
  BetaWhatsappThread: BetaWhatsappThread;
  Boolean: Scalars['Boolean']['output'];
  CandidateBasicInput: CandidateBasicInput;
  CandidateInput: CandidateInput;
  CandidatesNotes: CandidatesNotes;
  CandidatesNotesInput: CandidatesNotesInput;
  CompanyInput: CompanyInput;
  CompetenceFT: CompetenceFt;
  Competency: Competency;
  CompetencyInput: CompetencyInput;
  ContactFT: ContactFt;
  ConversationInput: ConversationInput;
  CreateProAccountInput: CreateProAccountInput;
  Customisation: Customisation;
  CustomisationInput: CustomisationInput;
  DateTime: Scalars['DateTime']['output'];
  Eager: Eager;
  EagerInput: EagerInput;
  Email: Email;
  EmailInput: EmailInput;
  EnterpriseFT: EnterpriseFt;
  Error: Error;
  ErrorInput: ErrorInput;
  ErrorOnValidation: ErrorOnValidation;
  ExperienceInput: ExperienceInput;
  Favorite: Favorite;
  FavoriteInput: FavoriteInput;
  Feedback: Feedback;
  FeedbackInput: FeedbackInput;
  File: Scalars['File']['output'];
  FormQuestion: FormQuestion;
  FormResponse: FormResponse;
  FormResponseInput: FormResponseInput;
  FormationFT: FormationFt;
  GoogleAuthentication: GoogleAuthentication;
  GoogleAuthenticationInput: GoogleAuthenticationInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  InternalAuthentication: InternalAuthentication;
  InternalAuthenticationInput: InternalAuthenticationInput;
  InterviewOffer: InterviewOffer;
  InterviewOfferInput: InterviewOfferInput;
  Job: Job;
  JobInput: JobInput;
  LanguageFT: LanguageFt;
  Lead: Lead;
  LeadInput: LeadInput;
  Meet: Meet;
  MeetCandidate: MeetCandidate;
  MeetInput: MeetInput;
  MeetRecruiter: MeetRecruiter;
  MessageGPT: MessageGpt;
  MessageGPTInput: MessageGptInput;
  Mutation: {};
  Notification: Notification;
  NotificationInput: NotificationInput;
  Offer: Offer;
  OfferInput: OfferInput;
  OriginOfferFT: OriginOfferFt;
  PageParamsInput: PageParamsInput;
  PartenairFT: PartenairFt;
  PermisFT: PermisFt;
  PersonalDetailsInput: PersonalDetailsInput;
  Phone: Phone;
  PhoneInput: PhoneInput;
  PositiveFloat: Scalars['PositiveFloat']['output'];
  ProFormInput: ProFormInput;
  ProfessionalQualityFT: ProfessionalQualityFt;
  ProfileExperienceGivenInfos: ProfileExperienceGivenInfos;
  ProfileSharing: ProfileSharing;
  ProfileSharingInput: ProfileSharingInput;
  ProfileView: ProfileView;
  ProfileViewInput: ProfileViewInput;
  Query: {};
  Question: Question;
  QuestionInput: QuestionInput;
  QuickCreateCandidateInput: QuickCreateCandidateInput;
  Reference: Reference;
  ReferenceContact: ReferenceContact;
  ReferenceContactInput: ReferenceContactInput;
  ReferenceInput: ReferenceInput;
  RemarkInput: RemarkInput;
  ResponseInput: ResponseInput;
  SalaryFT: SalaryFt;
  ScrappedInfos: ScrappedInfos;
  SharingInput: SharingInput;
  SharingRefusal: SharingRefusal;
  SharingRefusalInput: SharingRefusalInput;
  SocialAuthentication: SocialAuthentication;
  SocialAuthenticationInput: SocialAuthenticationInput;
  String: Scalars['String']['output'];
  TopSector: TopSector;
  TopSectorInput: TopSectorInput;
  Translated: Translated;
  UnlockInput: UnlockInput;
  UnlockedUser: UnlockedUser;
  UserInput: UserInput;
  UserRemark: UserRemark;
  VerificationRequest: VerificationRequest;
  VerificationRequestInput: VerificationRequestInput;
  Video: Video;
  VideoInput: VideoInput;
  WorkLocationFT: WorkLocationFt;
  WorkLocationFTInput: WorkLocationFtInput;
};

export type AffiliationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Affiliation'] = ResolversParentTypes['Affiliation']> = {
  children?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaUser']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AgencyFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['AgencyFT'] = ResolversParentTypes['AgencyFT']> = {
  courriel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telephone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bgImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  conclusion?: Resolver<Maybe<ResolversTypes['Translated']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['Translated']>, ParentType, ContextType>;
  extension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  introduction?: Resolver<Maybe<ResolversTypes['Translated']>, ParentType, ContextType>;
  links?: Resolver<Maybe<Array<Maybe<ResolversTypes['ArticlesLink']>>>, ParentType, ContextType>;
  new?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  paragraphs?: Resolver<Maybe<Array<Maybe<ResolversTypes['ArticleParagraph']>>>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['Translated'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticleParagraphResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleParagraph'] = ResolversParentTypes['ArticleParagraph']> = {
  content?: Resolver<Maybe<ResolversTypes['Translated']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['Translated']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArticlesLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticlesLink'] = ResolversParentTypes['ArticlesLink']> = {
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['Translated']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthDetails'] = ResolversParentTypes['AuthDetails']> = {
  internal?: Resolver<Maybe<ResolversTypes['InternalAuthentication']>, ParentType, ContextType>;
  social?: Resolver<Maybe<ResolversTypes['SocialAuthentication']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvatarResolvers<ContextType = any, ParentType extends ResolversParentTypes['Avatar'] = ResolversParentTypes['Avatar']> = {
  asset_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['PositiveFloat']>, ParentType, ContextType>;
  eager?: Resolver<Maybe<Array<ResolversTypes['Eager']>>, ParentType, ContextType>;
  folder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  format?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  original_filename?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  public_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secure_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subtitledUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaCandidateResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaCandidate'] = ResolversParentTypes['BetaCandidate']> = {
  avatars?: Resolver<Maybe<Array<Maybe<ResolversTypes['Avatar']>>>, ParentType, ContextType>;
  bgImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  competencyIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  confirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['BetaDetails']>, ParentType, ContextType>;
  experiences?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaExperience']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['BetaProfile']>, ParentType, ContextType>;
  salaryExpected?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  targetContractType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  targetJob?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType>;
  targetJobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaCompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaCompany'] = ResolversParentTypes['BetaCompany']> = {
  autocompletions?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  entrepriseAdaptee?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  experiences?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaExperience']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isPublic?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  linkedinProfilePage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['Avatar']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  offers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Offer']>>>, ParentType, ContextType>;
  resume?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scrapped?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sharings?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProfileSharing']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Avatar']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Video']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaDetails'] = ResolversParentTypes['BetaDetails']> = {
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  candidate?: Resolver<Maybe<ResolversTypes['BetaCandidate']>, ParentType, ContextType>;
  candidateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  experiences?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaExperience']>>>, ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['Phone']>, ParentType, ContextType>;
  phone2?: Resolver<Maybe<ResolversTypes['Phone']>, ParentType, ContextType>;
  principal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['BetaProfile']>, ParentType, ContextType>;
  profileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  websites?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaExperienceResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaExperience'] = ResolversParentTypes['BetaExperience']> = {
  candidate?: Resolver<Maybe<ResolversTypes['BetaCandidate']>, ParentType, ContextType, Partial<BetaExperienceCandidateArgs>>;
  candidateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType>;
  companyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  confirmed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['BetaDetails']>, ParentType, ContextType>;
  detailsId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ending?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isLiveJob?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isTargetJob?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  previouslyEmployed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  referenced?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  references?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaProfile']>>>, ParentType, ContextType, Partial<BetaExperienceReferencesArgs>>;
  referencesIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  starting?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaProfile'] = ResolversParentTypes['BetaProfile']> = {
  allSkills?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['BetaDetails']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  refExperiences?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaExperience']>>>, ParentType, ContextType>;
  refExperiencesIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaQueueResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaQueue'] = ResolversParentTypes['BetaQueue']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  customisation?: Resolver<Maybe<ResolversTypes['Customisation']>, ParentType, ContextType>;
  customisationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  offerTarget?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType>;
  offerTargetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  system?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaUser'] = ResolversParentTypes['BetaUser']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  affiliation?: Resolver<Maybe<ResolversTypes['Affiliation']>, ParentType, ContextType>;
  affiliationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  affiliations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Affiliation']>>>, ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  auth?: Resolver<Maybe<ResolversTypes['AuthDetails']>, ParentType, ContextType>;
  candidate?: Resolver<Maybe<ResolversTypes['BetaCandidate']>, ParentType, ContextType>;
  candidateQueues?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaQueue']>>>, ParentType, ContextType>;
  candidatedOffers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Offer']>>>, ParentType, ContextType>;
  candidatedOffersIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  cardPrice?: Resolver<Maybe<ResolversTypes['PositiveFloat']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType>;
  companyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  consent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  credit?: Resolver<Maybe<ResolversTypes['PositiveFloat']>, ParentType, ContextType>;
  customerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cv?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  cvFile?: Resolver<Maybe<ResolversTypes['Avatar']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['BetaDetails']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  experiences?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaExperience']>>>, ParentType, ContextType>;
  extension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hiddenFields?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  interviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['InterviewOffer']>>>, ParentType, ContextType>;
  isPublic?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  languages?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinProfileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  myOffers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Offer']>>>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pro?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  professionalEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['BetaProfile']>, ParentType, ContextType>;
  profileViews?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProfileView']>>>, ParentType, ContextType>;
  recruiterQueues?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaQueue']>>>, ParentType, ContextType>;
  refExperiences?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaExperience']>>>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Job']>>>, ParentType, ContextType>;
  rolesIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  scrapped?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sharings?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProfileSharing']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trial?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  uniqueName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unlimited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  unvolonteerFavorites?: Resolver<Maybe<Array<Maybe<ResolversTypes['Favorite']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Avatar']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Video']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaWhatsappExchangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaWhatsappExchange'] = ResolversParentTypes['BetaWhatsappExchange']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  question?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType>;
  questionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responses?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaWhatsappResponse']>>>, ParentType, ContextType>;
  step?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  thread?: Resolver<Maybe<ResolversTypes['BetaWhatsappThread']>, ParentType, ContextType>;
  threadId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Video']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaWhatsappResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaWhatsappResponse'] = ResolversParentTypes['BetaWhatsappResponse']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  exchange?: Resolver<Maybe<ResolversTypes['BetaWhatsappExchange']>, ParentType, ContextType>;
  exchangeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  thread?: Resolver<Maybe<ResolversTypes['BetaWhatsappThread']>, ParentType, ContextType>;
  threadId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType>;
  videoId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaWhatsappThreadResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaWhatsappThread'] = ResolversParentTypes['BetaWhatsappThread']> = {
  chatId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  exchanges?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaWhatsappExchange']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  queue?: Resolver<Maybe<ResolversTypes['BetaQueue']>, ParentType, ContextType>;
  queueId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responses?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaWhatsappResponse']>>>, ParentType, ContextType>;
  terminated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CandidatesNotesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CandidatesNotes'] = ResolversParentTypes['CandidatesNotes']> = {
  appreciation?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  candidate?: Resolver<Maybe<ResolversTypes['BetaCandidate']>, ParentType, ContextType>;
  candidateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompetenceFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompetenceFT'] = ResolversParentTypes['CompetenceFT']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exigence?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompetencyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Competency'] = ResolversParentTypes['Competency']> = {
  advantages?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  appelations?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  conclusion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  definition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  development?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  examples?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  extension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  importance?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  relatedSkills?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactFT'] = ResolversParentTypes['ContactFT']> = {
  commentaire?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordonnees1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordonnees2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordonnees3?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  courriel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telephone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  urlPostulation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  urlRecruteur?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customisation'] = ResolversParentTypes['Customisation']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Question']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EagerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Eager'] = ResolversParentTypes['Eager']> = {
  bytes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  format?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  secure_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transformation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailResolvers<ContextType = any, ParentType extends ResolversParentTypes['Email'] = ResolversParentTypes['Email']> = {
  error?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnterpriseFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnterpriseFT'] = ResolversParentTypes['EnterpriseFT']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entrepriseAdaptee?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  environment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pro?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  statusText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorOnValidationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorOnValidation'] = ResolversParentTypes['ErrorOnValidation']> = {
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  offerTarget?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType>;
  offerTargetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedbackResolvers<ContextType = any, ParentType extends ResolversParentTypes['Feedback'] = ResolversParentTypes['Feedback']> = {
  author?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  authorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  candidate?: Resolver<Maybe<ResolversTypes['MeetCandidate']>, ParentType, ContextType>;
  candidateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  recruiter?: Resolver<Maybe<ResolversTypes['MeetRecruiter']>, ParentType, ContextType>;
  recruiterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface FileScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export type FormQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FormQuestion'] = ResolversParentTypes['FormQuestion']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FormResponse'] = ResolversParentTypes['FormResponse']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isTrue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lead?: Resolver<Maybe<ResolversTypes['Lead']>, ParentType, ContextType>;
  leadId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  question?: Resolver<Maybe<ResolversTypes['FormQuestion']>, ParentType, ContextType>;
  questionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormationFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['FormationFT'] = ResolversParentTypes['FormationFT']> = {
  codeFormation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commentaire?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  domaineLibelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exigence?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  niveauLibelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GoogleAuthenticationResolvers<ContextType = any, ParentType extends ResolversParentTypes['GoogleAuthentication'] = ResolversParentTypes['GoogleAuthentication']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email_verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  family_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  given_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  network?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sub?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InternalAuthenticationResolvers<ContextType = any, ParentType extends ResolversParentTypes['InternalAuthentication'] = ResolversParentTypes['InternalAuthentication']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  salt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InterviewOfferResolvers<ContextType = any, ParentType extends ResolversParentTypes['InterviewOffer'] = ResolversParentTypes['InterviewOffer']> = {
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  datetime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobResolvers<ContextType = any, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  enTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  href?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Question']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['Translated']>, ParentType, ContextType>;
  topSector?: Resolver<Maybe<ResolversTypes['TopSector']>, ParentType, ContextType>;
  topSectorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaUser']>>>, ParentType, ContextType>;
  usersIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LanguageFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['LanguageFT'] = ResolversParentTypes['LanguageFT']> = {
  exigence?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LeadResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lead'] = ResolversParentTypes['Lead']> = {
  contacted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fr?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  linkedinProfileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['Phone']>, ParentType, ContextType>;
  prospected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trialOffering?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meet'] = ResolversParentTypes['Meet']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  expired?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  meetCandidate?: Resolver<Maybe<ResolversTypes['MeetCandidate']>, ParentType, ContextType>;
  meetCandidateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  meetRecruiter?: Resolver<Maybe<ResolversTypes['MeetRecruiter']>, ParentType, ContextType>;
  meetRecruiterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeetCandidateResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeetCandidate'] = ResolversParentTypes['MeetCandidate']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinProfileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['Phone']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Video']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeetRecruiterResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeetRecruiter'] = ResolversParentTypes['MeetRecruiter']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedinProfileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['Phone']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageGptResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageGPT'] = ResolversParentTypes['MessageGPT']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<Maybe<ResolversTypes['BetaCandidate']>, ParentType, ContextType, Partial<MutationCreateAccountArgs>>;
  createAffiliation?: Resolver<Maybe<ResolversTypes['Affiliation']>, ParentType, ContextType, Partial<MutationCreateAffiliationArgs>>;
  createCandidate?: Resolver<Maybe<ResolversTypes['BetaCandidate']>, ParentType, ContextType, Partial<MutationCreateCandidateArgs>>;
  createCandidateBasic?: Resolver<Maybe<ResolversTypes['BetaCandidate']>, ParentType, ContextType, Partial<MutationCreateCandidateBasicArgs>>;
  createClassicAccount?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<MutationCreateClassicAccountArgs>>;
  createCompany?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType, Partial<MutationCreateCompanyArgs>>;
  createCompanyProfile?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType, Partial<MutationCreateCompanyProfileArgs>>;
  createConversation?: Resolver<Maybe<ResolversTypes['BetaQueue']>, ParentType, ContextType, Partial<MutationCreateConversationArgs>>;
  createCustomisation?: Resolver<Maybe<ResolversTypes['Customisation']>, ParentType, ContextType, Partial<MutationCreateCustomisationArgs>>;
  createDetails?: Resolver<Maybe<ResolversTypes['BetaDetails']>, ParentType, ContextType, Partial<MutationCreateDetailsArgs>>;
  createError?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType, Partial<MutationCreateErrorArgs>>;
  createExperience?: Resolver<Maybe<ResolversTypes['BetaExperience']>, ParentType, ContextType, Partial<MutationCreateExperienceArgs>>;
  createFavorite?: Resolver<Maybe<ResolversTypes['Favorite']>, ParentType, ContextType, Partial<MutationCreateFavoriteArgs>>;
  createFeedback?: Resolver<Maybe<ResolversTypes['Feedback']>, ParentType, ContextType, Partial<MutationCreateFeedbackArgs>>;
  createFormQuestion?: Resolver<Maybe<ResolversTypes['FormQuestion']>, ParentType, ContextType, Partial<MutationCreateFormQuestionArgs>>;
  createInterviewOffer?: Resolver<Maybe<ResolversTypes['InterviewOffer']>, ParentType, ContextType, Partial<MutationCreateInterviewOfferArgs>>;
  createLead?: Resolver<Maybe<ResolversTypes['Lead']>, ParentType, ContextType, Partial<MutationCreateLeadArgs>>;
  createMeet?: Resolver<Maybe<ResolversTypes['Meet']>, ParentType, ContextType, Partial<MutationCreateMeetArgs>>;
  createMeetCandidate?: Resolver<Maybe<ResolversTypes['MeetCandidate']>, ParentType, ContextType, Partial<MutationCreateMeetCandidateArgs>>;
  createMeetRecruiter?: Resolver<Maybe<ResolversTypes['MeetRecruiter']>, ParentType, ContextType, Partial<MutationCreateMeetRecruiterArgs>>;
  createNotification?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, Partial<MutationCreateNotificationArgs>>;
  createOffer?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType, Partial<MutationCreateOfferArgs>>;
  createOrUpdateNotes?: Resolver<Maybe<ResolversTypes['CandidatesNotes']>, ParentType, ContextType, Partial<MutationCreateOrUpdateNotesArgs>>;
  createProAccount?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType, Partial<MutationCreateProAccountArgs>>;
  createProfileSharing?: Resolver<Maybe<ResolversTypes['ProfileSharing']>, ParentType, ContextType, Partial<MutationCreateProfileSharingArgs>>;
  createProfileView?: Resolver<Maybe<ResolversTypes['ProfileView']>, ParentType, ContextType, Partial<MutationCreateProfileViewArgs>>;
  createQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, Partial<MutationCreateQuestionArgs>>;
  createQueue?: Resolver<Maybe<ResolversTypes['BetaQueue']>, ParentType, ContextType, Partial<MutationCreateQueueArgs>>;
  createReference?: Resolver<Maybe<ResolversTypes['Reference']>, ParentType, ContextType, Partial<MutationCreateReferenceArgs>>;
  createReferenceContact?: Resolver<Maybe<ResolversTypes['ReferenceContact']>, ParentType, ContextType, Partial<MutationCreateReferenceContactArgs>>;
  createRemark?: Resolver<Maybe<ResolversTypes['UserRemark']>, ParentType, ContextType, Partial<MutationCreateRemarkArgs>>;
  createResponses?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaWhatsappResponse']>>>, ParentType, ContextType, Partial<MutationCreateResponsesArgs>>;
  createSharingRefusal?: Resolver<Maybe<ResolversTypes['SharingRefusal']>, ParentType, ContextType, Partial<MutationCreateSharingRefusalArgs>>;
  createThread?: Resolver<Maybe<ResolversTypes['BetaWhatsappThread']>, ParentType, ContextType, Partial<MutationCreateThreadArgs>>;
  createUnlockedUser?: Resolver<Maybe<ResolversTypes['UnlockedUser']>, ParentType, ContextType, Partial<MutationCreateUnlockedUserArgs>>;
  createUser?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deleteAccount?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<MutationDeleteAccountArgs>>;
  deleteAffiliation?: Resolver<Maybe<ResolversTypes['Affiliation']>, ParentType, ContextType, Partial<MutationDeleteAffiliationArgs>>;
  deleteCompany?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType, Partial<MutationDeleteCompanyArgs>>;
  deleteCompetency?: Resolver<Maybe<ResolversTypes['Competency']>, ParentType, ContextType, Partial<MutationDeleteCompetencyArgs>>;
  deleteInterviewOffer?: Resolver<Maybe<ResolversTypes['InterviewOffer']>, ParentType, ContextType, Partial<MutationDeleteInterviewOfferArgs>>;
  deleteLead?: Resolver<Maybe<ResolversTypes['Lead']>, ParentType, ContextType, Partial<MutationDeleteLeadArgs>>;
  deleteMeet?: Resolver<Maybe<ResolversTypes['Meet']>, ParentType, ContextType, Partial<MutationDeleteMeetArgs>>;
  deleteOffer?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType, Partial<MutationDeleteOfferArgs>>;
  deleteProfileSharing?: Resolver<Maybe<ResolversTypes['ProfileSharing']>, ParentType, ContextType, Partial<MutationDeleteProfileSharingArgs>>;
  deleteQueue?: Resolver<Maybe<ResolversTypes['BetaQueue']>, ParentType, ContextType, Partial<MutationDeleteQueueArgs>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<MutationDeleteUserArgs>>;
  deleteVideo?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType, Partial<MutationDeleteVideoArgs>>;
  deleteWhatsappThread?: Resolver<Maybe<ResolversTypes['BetaWhatsappThread']>, ParentType, ContextType, Partial<MutationDeleteWhatsappThreadArgs>>;
  submitVideo?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType, Partial<MutationSubmitVideoArgs>>;
  unlock?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<MutationUnlockArgs>>;
  updateAllMyNotifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType, Partial<MutationUpdateAllMyNotificationsArgs>>;
  updateCandidate?: Resolver<Maybe<ResolversTypes['BetaCandidate']>, ParentType, ContextType, Partial<MutationUpdateCandidateArgs>>;
  updateCompany?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType, Partial<MutationUpdateCompanyArgs>>;
  updateDetails?: Resolver<Maybe<ResolversTypes['BetaDetails']>, ParentType, ContextType, Partial<MutationUpdateDetailsArgs>>;
  updateExperience?: Resolver<Maybe<ResolversTypes['BetaExperience']>, ParentType, ContextType, Partial<MutationUpdateExperienceArgs>>;
  updateFormResponse?: Resolver<Maybe<ResolversTypes['FormResponse']>, ParentType, ContextType, Partial<MutationUpdateFormResponseArgs>>;
  updateLead?: Resolver<Maybe<ResolversTypes['Lead']>, ParentType, ContextType, Partial<MutationUpdateLeadArgs>>;
  updateMeet?: Resolver<Maybe<ResolversTypes['Meet']>, ParentType, ContextType, Partial<MutationUpdateMeetArgs>>;
  updateOneNotification?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, Partial<MutationUpdateOneNotificationArgs>>;
  updateQueue?: Resolver<Maybe<ResolversTypes['BetaQueue']>, ParentType, ContextType, Partial<MutationUpdateQueueArgs>>;
  updateUser?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
  updateVideo?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType, Partial<MutationUpdateVideoArgs>>;
};

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  concernedId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  feedback?: Resolver<Maybe<ResolversTypes['Feedback']>, ParentType, ContextType>;
  feedbackId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refusal?: Resolver<Maybe<ResolversTypes['SharingRefusal']>, ParentType, ContextType>;
  refusalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OfferResolvers<ContextType = any, ParentType extends ResolversParentTypes['Offer'] = ResolversParentTypes['Offer']> = {
  accessibleTH?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  agence?: Resolver<Maybe<ResolversTypes['AgencyFT']>, ParentType, ContextType>;
  alternance?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  appellationlibelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  authorEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authorInterviewLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authorName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  candidates?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaUser']>>>, ParentType, ContextType>;
  candidatesIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  codeNAF?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType>;
  companyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyLogo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  competences?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompetenceFT']>>>, ParentType, ContextType>;
  complementExercice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  conditionExercice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['ContactFT']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contractType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dateActualisation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateCreation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deplacementCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deplacementLibelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dureeTravailLibelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dureeTravailLibelleConverti?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  entreprise?: Resolver<Maybe<ResolversTypes['EnterpriseFT']>, ParentType, ContextType>;
  experienceCommentaire?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  experienceExige?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  experienceLibelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  extension?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  formations?: Resolver<Maybe<Array<Maybe<ResolversTypes['FormationFT']>>>, ParentType, ContextType>;
  generated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  idFT?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  intitule?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  intituleReduced?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType>;
  jobDescriptionLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  langues?: Resolver<Maybe<Array<Maybe<ResolversTypes['LanguageFT']>>>, ParentType, ContextType>;
  lieuTravail?: Resolver<Maybe<ResolversTypes['WorkLocationFT']>, ParentType, ContextType>;
  limitDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  live?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  natureContrat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nombrePostes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  offresManqueCandidats?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  origineOffre?: Resolver<Maybe<ResolversTypes['OriginOfferFT']>, ParentType, ContextType>;
  outilsBureautiques?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  permis?: Resolver<Maybe<Array<Maybe<ResolversTypes['PermisFT']>>>, ParentType, ContextType>;
  profileSearched?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qualificationCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qualificationLibelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qualitesProfessionnelles?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProfessionalQualityFT']>>>, ParentType, ContextType>;
  rebroadcast?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  remote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requirements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Competency']>>>, ParentType, ContextType>;
  requirementsIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  revenue?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  romeCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  romeLibelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  romeLibelleReduced?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  salaire?: Resolver<Maybe<ResolversTypes['SalaryFT']>, ParentType, ContextType>;
  secteurActivite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secteurActiviteLibelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sector?: Resolver<Maybe<ResolversTypes['TopSector']>, ParentType, ContextType>;
  sectorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sharings?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProfileSharing']>>>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trancheEffectifEtab?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  typeContrat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  typeContratLibelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OriginOfferFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['OriginOfferFT'] = ResolversParentTypes['OriginOfferFT']> = {
  origine?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  partenaires?: Resolver<Maybe<Array<Maybe<ResolversTypes['PartenairFT']>>>, ParentType, ContextType>;
  urlOrigine?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PartenairFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['PartenairFT'] = ResolversParentTypes['PartenairFT']> = {
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PermisFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['PermisFT'] = ResolversParentTypes['PermisFT']> = {
  exigence?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PhoneResolvers<ContextType = any, ParentType extends ResolversParentTypes['Phone'] = ResolversParentTypes['Phone']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export type ProfessionalQualityFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfessionalQualityFT'] = ResolversParentTypes['ProfessionalQualityFT']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileExperienceGivenInfosResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileExperienceGivenInfos'] = ResolversParentTypes['ProfileExperienceGivenInfos']> = {
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ending?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isLiveJob?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isTargetJob?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  starting?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileSharingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileSharing'] = ResolversParentTypes['ProfileSharing']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  offerTarget?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType>;
  offerTargetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  report?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType>;
  videoId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileViewResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileView'] = ResolversParentTypes['ProfileView']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  accountCandidate?: Resolver<Maybe<ResolversTypes['BetaCandidate']>, ParentType, ContextType, Partial<QueryAccountCandidateArgs>>;
  accountDetails?: Resolver<Maybe<ResolversTypes['BetaDetails']>, ParentType, ContextType, Partial<QueryAccountDetailsArgs>>;
  accountInfos?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<QueryAccountInfosArgs>>;
  accountProfile?: Resolver<Maybe<ResolversTypes['BetaProfile']>, ParentType, ContextType, Partial<QueryAccountProfileArgs>>;
  accountUser?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<QueryAccountUserArgs>>;
  affiliation?: Resolver<Maybe<ResolversTypes['Affiliation']>, ParentType, ContextType, Partial<QueryAffiliationArgs>>;
  affiliations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Affiliation']>>>, ParentType, ContextType>;
  articles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType>;
  companies?: Resolver<Maybe<Array<ResolversTypes['BetaCompany']>>, ParentType, ContextType, Partial<QueryCompaniesArgs>>;
  companyOffers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Offer']>>>, ParentType, ContextType, Partial<QueryCompanyOffersArgs>>;
  competencies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Competency']>>>, ParentType, ContextType, Partial<QueryCompetenciesArgs>>;
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Error']>>>, ParentType, ContextType>;
  experiences?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaExperience']>>>, ParentType, ContextType>;
  formQuestions?: Resolver<Maybe<Array<Maybe<ResolversTypes['FormQuestion']>>>, ParentType, ContextType>;
  jobs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Job']>>>, ParentType, ContextType, Partial<QueryJobsArgs>>;
  leadFormResponses?: Resolver<Maybe<Array<Maybe<ResolversTypes['FormResponse']>>>, ParentType, ContextType, Partial<QueryLeadFormResponsesArgs>>;
  leads?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lead']>>>, ParentType, ContextType>;
  meetCandidates?: Resolver<Maybe<Array<Maybe<ResolversTypes['MeetCandidate']>>>, ParentType, ContextType>;
  meets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Meet']>>>, ParentType, ContextType, Partial<QueryMeetsArgs>>;
  myCompanyProfileSharings?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProfileSharing']>>>, ParentType, ContextType, Partial<QueryMyCompanyProfileSharingsArgs>>;
  myFavorites?: Resolver<Maybe<Array<Maybe<ResolversTypes['Favorite']>>>, ParentType, ContextType, Partial<QueryMyFavoritesArgs>>;
  myInterviewOffers?: Resolver<Maybe<Array<Maybe<ResolversTypes['InterviewOffer']>>>, ParentType, ContextType, Partial<QueryMyInterviewOffersArgs>>;
  myNotifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType, Partial<QueryMyNotificationsArgs>>;
  myPublishedOffers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Offer']>>>, ParentType, ContextType, Partial<QueryMyPublishedOffersArgs>>;
  myReferenceContacts?: Resolver<Maybe<Array<Maybe<ResolversTypes['ReferenceContact']>>>, ParentType, ContextType, Partial<QueryMyReferenceContactsArgs>>;
  myReferences?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reference']>>>, ParentType, ContextType, Partial<QueryMyReferencesArgs>>;
  myUnlockedUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UnlockedUser']>>>, ParentType, ContextType, Partial<QueryMyUnlockedUsersArgs>>;
  myVideos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Video']>>>, ParentType, ContextType, Partial<QueryMyVideosArgs>>;
  offers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Offer']>>>, ParentType, ContextType, Partial<QueryOffersArgs>>;
  oneArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, Partial<QueryOneArticleArgs>>;
  oneCandidate?: Resolver<Maybe<ResolversTypes['BetaCandidate']>, ParentType, ContextType, Partial<QueryOneCandidateArgs>>;
  oneCandidatesNotes?: Resolver<Maybe<ResolversTypes['CandidatesNotes']>, ParentType, ContextType, Partial<QueryOneCandidatesNotesArgs>>;
  oneCompany?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType, Partial<QueryOneCompanyArgs>>;
  oneCompetency?: Resolver<Maybe<ResolversTypes['Competency']>, ParentType, ContextType, Partial<QueryOneCompetencyArgs>>;
  oneCustomisation?: Resolver<Maybe<ResolversTypes['Customisation']>, ParentType, ContextType, Partial<QueryOneCustomisationArgs>>;
  oneDetails?: Resolver<Maybe<ResolversTypes['BetaDetails']>, ParentType, ContextType, RequireFields<QueryOneDetailsArgs, 'filter'>>;
  oneExperience?: Resolver<Maybe<ResolversTypes['BetaExperience']>, ParentType, ContextType, Partial<QueryOneExperienceArgs>>;
  oneFavorite?: Resolver<Maybe<ResolversTypes['Favorite']>, ParentType, ContextType, Partial<QueryOneFavoriteArgs>>;
  oneFormResponse?: Resolver<Maybe<ResolversTypes['FormResponse']>, ParentType, ContextType, Partial<QueryOneFormResponseArgs>>;
  oneInterviewOffer?: Resolver<Maybe<ResolversTypes['InterviewOffer']>, ParentType, ContextType, Partial<QueryOneInterviewOfferArgs>>;
  oneJob?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType, Partial<QueryOneJobArgs>>;
  oneLead?: Resolver<Maybe<ResolversTypes['Lead']>, ParentType, ContextType, Partial<QueryOneLeadArgs>>;
  oneMeet?: Resolver<Maybe<ResolversTypes['Meet']>, ParentType, ContextType, Partial<QueryOneMeetArgs>>;
  oneMeetCandidate?: Resolver<Maybe<ResolversTypes['MeetCandidate']>, ParentType, ContextType, Partial<QueryOneMeetCandidateArgs>>;
  oneNotification?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, Partial<QueryOneNotificationArgs>>;
  oneOffer?: Resolver<Maybe<ResolversTypes['Offer']>, ParentType, ContextType, Partial<QueryOneOfferArgs>>;
  oneProfileSharing?: Resolver<Maybe<ResolversTypes['ProfileSharing']>, ParentType, ContextType, Partial<QueryOneProfileSharingArgs>>;
  oneQueue?: Resolver<Maybe<ResolversTypes['BetaQueue']>, ParentType, ContextType, Partial<QueryOneQueueArgs>>;
  oneThread?: Resolver<Maybe<ResolversTypes['BetaWhatsappThread']>, ParentType, ContextType, Partial<QueryOneThreadArgs>>;
  oneTopSector?: Resolver<Maybe<ResolversTypes['TopSector']>, ParentType, ContextType, Partial<QueryOneTopSectorArgs>>;
  oneUserExperiences?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaExperience']>>>, ParentType, ContextType, Partial<QueryOneUserExperiencesArgs>>;
  oneUserInterviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['InterviewOffer']>>>, ParentType, ContextType, Partial<QueryOneUserInterviewsArgs>>;
  oneVideo?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType, Partial<QueryOneVideoArgs>>;
  ownQueues?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaQueue']>>>, ParentType, ContextType, Partial<QueryOwnQueuesArgs>>;
  profileViews?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProfileView']>>>, ParentType, ContextType, Partial<QueryProfileViewsArgs>>;
  profiles?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaProfile']>>>, ParentType, ContextType, Partial<QueryProfilesArgs>>;
  questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Question']>>>, ParentType, ContextType, Partial<QueryQuestionsArgs>>;
  recruiterQueuesFromProfile?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaQueue']>>>, ParentType, ContextType, Partial<QueryRecruiterQueuesFromProfileArgs>>;
  remarks?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRemark']>>>, ParentType, ContextType>;
  resetEmailLink?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<QueryResetEmailLinkArgs>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<QueryResetPasswordArgs>>;
  sendEmail?: Resolver<Maybe<ResolversTypes['Email']>, ParentType, ContextType, Partial<QuerySendEmailArgs>>;
  sendEmailOfferOpportunities?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaUser']>>>, ParentType, ContextType, Partial<QuerySendEmailOfferOpportunitiesArgs>>;
  sendEmailProspectionLinkedin?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lead']>>>, ParentType, ContextType, Partial<QuerySendEmailProspectionLinkedinArgs>>;
  sendEmailToLead?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lead']>>>, ParentType, ContextType, Partial<QuerySendEmailToLeadArgs>>;
  sharings?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProfileSharing']>>>, ParentType, ContextType, Partial<QuerySharingsArgs>>;
  topSectors?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopSector']>>>, ParentType, ContextType, Partial<QueryTopSectorsArgs>>;
  uniqueCompetency?: Resolver<Maybe<ResolversTypes['Competency']>, ParentType, ContextType, Partial<QueryUniqueCompetencyArgs>>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType, Partial<QueryUserArgs>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['BetaUser']>>>, ParentType, ContextType, Partial<QueryUsersArgs>>;
  videoByPublicId?: Resolver<Maybe<ResolversTypes['Video']>, ParentType, ContextType, Partial<QueryVideoByPublicIdArgs>>;
  videos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Video']>>>, ParentType, ContextType>;
};

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  customisation?: Resolver<Maybe<ResolversTypes['Customisation']>, ParentType, ContextType>;
  customisationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  generated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  prefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReferenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reference'] = ResolversParentTypes['Reference']> = {
  concerned?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  experience?: Resolver<Maybe<ResolversTypes['BetaExperience']>, ParentType, ContextType>;
  experienceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  valid?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReferenceContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReferenceContact'] = ResolversParentTypes['ReferenceContact']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  experience?: Resolver<Maybe<ResolversTypes['BetaExperience']>, ParentType, ContextType>;
  experienceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['Phone']>, ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SalaryFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['SalaryFT'] = ResolversParentTypes['SalaryFT']> = {
  commentaire?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  complement1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  complement2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScrappedInfosResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScrappedInfos'] = ResolversParentTypes['ScrappedInfos']> = {
  fullname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SharingRefusalResolvers<ContextType = any, ParentType extends ResolversParentTypes['SharingRefusal'] = ResolversParentTypes['SharingRefusal']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType>;
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sharing?: Resolver<Maybe<ResolversTypes['ProfileSharing']>, ParentType, ContextType>;
  sharingId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialAuthenticationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialAuthentication'] = ResolversParentTypes['SocialAuthentication']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiryDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['GoogleAuthentication']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopSectorResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopSector'] = ResolversParentTypes['TopSector']> = {
  bgImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  jobs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Job']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['Translated']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TranslatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Translated'] = ResolversParentTypes['Translated']> = {
  en?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnlockedUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnlockedUser'] = ResolversParentTypes['UnlockedUser']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRemarkResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRemark'] = ResolversParentTypes['UserRemark']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerificationRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerificationRequest'] = ResolversParentTypes['VerificationRequest']> = {
  academicProofs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Avatar']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  judiciaryProofs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Avatar']>>>, ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  originId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  professionalProofs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Avatar']>>>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
  audio?: Resolver<Maybe<ResolversTypes['Avatar']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['BetaCompany']>, ParentType, ContextType>;
  companyId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  confidence?: Resolver<Maybe<ResolversTypes['PositiveFloat']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  exchangeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['Avatar']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType>;
  jobId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  meetCandidate?: Resolver<Maybe<ResolversTypes['MeetCandidate']>, ParentType, ContextType>;
  meetCandidateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preview?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  principal?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  report?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sharings?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProfileSharing']>>>, ParentType, ContextType>;
  transcript?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['BetaUser']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkLocationFtResolvers<ContextType = any, ParentType extends ResolversParentTypes['WorkLocationFT'] = ResolversParentTypes['WorkLocationFT']> = {
  codePostal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commune?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['PositiveFloat']>, ParentType, ContextType>;
  libelle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['PositiveFloat']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Affiliation?: AffiliationResolvers<ContextType>;
  AgencyFT?: AgencyFtResolvers<ContextType>;
  Article?: ArticleResolvers<ContextType>;
  ArticleParagraph?: ArticleParagraphResolvers<ContextType>;
  ArticlesLink?: ArticlesLinkResolvers<ContextType>;
  AuthDetails?: AuthDetailsResolvers<ContextType>;
  Avatar?: AvatarResolvers<ContextType>;
  BetaCandidate?: BetaCandidateResolvers<ContextType>;
  BetaCompany?: BetaCompanyResolvers<ContextType>;
  BetaDetails?: BetaDetailsResolvers<ContextType>;
  BetaExperience?: BetaExperienceResolvers<ContextType>;
  BetaProfile?: BetaProfileResolvers<ContextType>;
  BetaQueue?: BetaQueueResolvers<ContextType>;
  BetaUser?: BetaUserResolvers<ContextType>;
  BetaWhatsappExchange?: BetaWhatsappExchangeResolvers<ContextType>;
  BetaWhatsappResponse?: BetaWhatsappResponseResolvers<ContextType>;
  BetaWhatsappThread?: BetaWhatsappThreadResolvers<ContextType>;
  CandidatesNotes?: CandidatesNotesResolvers<ContextType>;
  CompetenceFT?: CompetenceFtResolvers<ContextType>;
  Competency?: CompetencyResolvers<ContextType>;
  ContactFT?: ContactFtResolvers<ContextType>;
  Customisation?: CustomisationResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Eager?: EagerResolvers<ContextType>;
  Email?: EmailResolvers<ContextType>;
  EnterpriseFT?: EnterpriseFtResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  ErrorOnValidation?: ErrorOnValidationResolvers<ContextType>;
  Favorite?: FavoriteResolvers<ContextType>;
  Feedback?: FeedbackResolvers<ContextType>;
  File?: GraphQLScalarType;
  FormQuestion?: FormQuestionResolvers<ContextType>;
  FormResponse?: FormResponseResolvers<ContextType>;
  FormationFT?: FormationFtResolvers<ContextType>;
  GoogleAuthentication?: GoogleAuthenticationResolvers<ContextType>;
  InternalAuthentication?: InternalAuthenticationResolvers<ContextType>;
  InterviewOffer?: InterviewOfferResolvers<ContextType>;
  Job?: JobResolvers<ContextType>;
  LanguageFT?: LanguageFtResolvers<ContextType>;
  Lead?: LeadResolvers<ContextType>;
  Meet?: MeetResolvers<ContextType>;
  MeetCandidate?: MeetCandidateResolvers<ContextType>;
  MeetRecruiter?: MeetRecruiterResolvers<ContextType>;
  MessageGPT?: MessageGptResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  Offer?: OfferResolvers<ContextType>;
  OriginOfferFT?: OriginOfferFtResolvers<ContextType>;
  PartenairFT?: PartenairFtResolvers<ContextType>;
  PermisFT?: PermisFtResolvers<ContextType>;
  Phone?: PhoneResolvers<ContextType>;
  PositiveFloat?: GraphQLScalarType;
  ProfessionalQualityFT?: ProfessionalQualityFtResolvers<ContextType>;
  ProfileExperienceGivenInfos?: ProfileExperienceGivenInfosResolvers<ContextType>;
  ProfileSharing?: ProfileSharingResolvers<ContextType>;
  ProfileView?: ProfileViewResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  Reference?: ReferenceResolvers<ContextType>;
  ReferenceContact?: ReferenceContactResolvers<ContextType>;
  SalaryFT?: SalaryFtResolvers<ContextType>;
  ScrappedInfos?: ScrappedInfosResolvers<ContextType>;
  SharingRefusal?: SharingRefusalResolvers<ContextType>;
  SocialAuthentication?: SocialAuthenticationResolvers<ContextType>;
  TopSector?: TopSectorResolvers<ContextType>;
  Translated?: TranslatedResolvers<ContextType>;
  UnlockedUser?: UnlockedUserResolvers<ContextType>;
  UserRemark?: UserRemarkResolvers<ContextType>;
  VerificationRequest?: VerificationRequestResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  WorkLocationFT?: WorkLocationFtResolvers<ContextType>;
};



export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QuickCreateCandidateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const CreateCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CandidateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCandidateMutation, CreateCandidateMutationVariables>;
export const CreateCandidateBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCandidateBasic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CandidateBasicInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCandidateBasic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"targetJob"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCandidateBasicMutation, CreateCandidateBasicMutationVariables>;
export const CreateCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const CreateCompanyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCompanyProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProFormInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCompanyProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfilePage"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"resume"}}]}}]}}]} as unknown as DocumentNode<CreateCompanyProfileMutation, CreateCompanyProfileMutationVariables>;
export const CreateDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaDetailsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateDetailsMutation, CreateDetailsMutationVariables>;
export const CreateExperienceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExperience"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ExperienceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExperience"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateExperienceMutation, CreateExperienceMutationVariables>;
export const CreateFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offerTargetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"offerTargetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offerTargetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFavoriteMutation, CreateFavoriteMutationVariables>;
export const CreateInterviewOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInterviewOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"InterviewOfferInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInterviewOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateInterviewOfferMutation, CreateInterviewOfferMutationVariables>;
export const CreateLeadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LeadInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateLeadMutation, CreateLeadMutationVariables>;
export const CreateNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateNotificationMutation, CreateNotificationMutationVariables>;
export const CreateOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateOfferMutation, CreateOfferMutationVariables>;
export const CreateOrUpdateNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrUpdateNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CandidatesNotesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrUpdateNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"appreciation"}}]}}]}}]} as unknown as DocumentNode<CreateOrUpdateNotesMutation, CreateOrUpdateNotesMutationVariables>;
export const CreateProfileSharingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProfileSharing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileSharingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProfileSharing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateProfileSharingMutation, CreateProfileSharingMutationVariables>;
export const CreateReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReferenceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReference"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateReferenceMutation, CreateReferenceMutationVariables>;
export const CreateReferenceContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReferenceContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReferenceContactInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReferenceContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateReferenceContactMutation, CreateReferenceContactMutationVariables>;
export const CreateUnlockedUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUnlockedUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUnlockedUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUnlockedUserMutation, CreateUnlockedUserMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const CreateUserRemarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserRemark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RemarkInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRemark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<CreateUserRemarkMutation, CreateUserRemarkMutationVariables>;
export const DeleteCompetencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCompetency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCompetency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCompetencyMutation, DeleteCompetencyMutationVariables>;
export const DeleteLeadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteLeadMutation, DeleteLeadMutationVariables>;
export const DeleteOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteOfferMutation, DeleteOfferMutationVariables>;
export const DeleteOneInterviewOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneInterviewOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInterviewOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteOneInterviewOfferMutation, DeleteOneInterviewOfferMutationVariables>;
export const DeleteOneProfileSharingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneProfileSharing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProfileSharing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteOneProfileSharingMutation, DeleteOneProfileSharingMutationVariables>;
export const DeleteQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteQueueMutation, DeleteQueueMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const DeleteVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteVideoMutation, DeleteVideoMutationVariables>;
export const DeleteWhatsappThreadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWhatsappThread"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWhatsappThread"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"threadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"threadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteWhatsappThreadMutation, DeleteWhatsappThreadMutationVariables>;
export const GetAccountInfosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountInfos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountInfos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"credit"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueName"}},{"kind":"Field","name":{"kind":"Name","value":"scrapped"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"pro"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"consent"}},{"kind":"Field","name":{"kind":"Name","value":"hiddenFields"}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"websites"}},{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"experiences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starting"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"ending"}},{"kind":"Field","name":{"kind":"Name","value":"isLiveJob"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topSector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"referenced"}}]}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"targetJob"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topSector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountInfosQuery, GetAccountInfosQueryVariables>;
export const GetArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}},{"kind":"Field","name":{"kind":"Name","value":"introduction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conclusion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"paragraphs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"new"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetArticlesQuery, GetArticlesQueryVariables>;
export const GetCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaCompanyFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"resume"}},{"kind":"Field","name":{"kind":"Name","value":"scrapped"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"eager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transformation"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"eager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transformation"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"experiences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"starting"}},{"kind":"Field","name":{"kind":"Name","value":"ending"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCompaniesQuery, GetCompaniesQueryVariables>;
export const GetCompaniesAutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompaniesAutocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaCompanyFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCompaniesAutocompleteQuery, GetCompaniesAutocompleteQueryVariables>;
export const GetCompanyOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanyOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorInterviewLink"}},{"kind":"Field","name":{"kind":"Name","value":"authorEmail"}},{"kind":"Field","name":{"kind":"Name","value":"jobDescriptionLink"}},{"kind":"Field","name":{"kind":"Name","value":"sector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"candidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCompanyOffersQuery, GetCompanyOffersQueryVariables>;
export const GetCompetenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompetencies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CompetencyInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competencies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"advantages"}},{"kind":"Field","name":{"kind":"Name","value":"conclusion"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"examples"}},{"kind":"Field","name":{"kind":"Name","value":"relatedSkills"}}]}}]}}]} as unknown as DocumentNode<GetCompetenciesQuery, GetCompetenciesQueryVariables>;
export const GetCompetenciesForBoldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompetenciesForBold"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CompetencyInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competencies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetCompetenciesForBoldQuery, GetCompetenciesForBoldQueryVariables>;
export const GetCompetenciesForHomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompetenciesForHome"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CompetencyInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competencies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GetCompetenciesForHomeQuery, GetCompetenciesForHomeQueryVariables>;
export const GetCompetenciesTitleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompetenciesTitle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CompetencyInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"competencies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetCompetenciesTitleQuery, GetCompetenciesTitleQueryVariables>;
export const GetExperiencePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExperiencePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneExperience"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"password"}}]}}]}}]} as unknown as DocumentNode<GetExperiencePasswordQuery, GetExperiencePasswordQueryVariables>;
export const GetFormQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFormQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"target"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetFormQuestionsQuery, GetFormQuestionsQueryVariables>;
export const GetJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topSector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetJobsQuery, GetJobsQueryVariables>;
export const GetLeadFormResponsesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeadFormResponses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leadFormResponses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isTrue"}},{"kind":"Field","name":{"kind":"Name","value":"lead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetLeadFormResponsesQuery, GetLeadFormResponsesQueryVariables>;
export const GetLeadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacted"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"trialOffering"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetLeadsQuery, GetLeadsQueryVariables>;
export const GetMyCompanyProfileSharingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyCompanyProfileSharings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myCompanyProfileSharings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"cardPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"offerTarget"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"eager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transformation"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfilePage"}},{"kind":"Field","name":{"kind":"Name","value":"resume"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"subtitledUrl"}},{"kind":"Field","name":{"kind":"Name","value":"eager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transformation"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMyCompanyProfileSharingsQuery, GetMyCompanyProfileSharingsQueryVariables>;
export const GetMyFavoritesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyFavorites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FavoriteInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myFavorites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueName"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"pro"}},{"kind":"Field","name":{"kind":"Name","value":"consent"}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"scrapped"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"cvFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"targetContractType"}},{"kind":"Field","name":{"kind":"Name","value":"salaryExpected"}},{"kind":"Field","name":{"kind":"Name","value":"avatars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"eager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transformation"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetJob"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topSector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bgImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"report"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transcript"}},{"kind":"Field","name":{"kind":"Name","value":"confidence"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"subtitledUrl"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"original_filename"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"eager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transformation"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyFavoritesQuery, GetMyFavoritesQueryVariables>;
export const GetMyInterviewOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyInterviewOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myInterviewOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"datetime"}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMyInterviewOffersQuery, GetMyInterviewOffersQueryVariables>;
export const GetMyNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timePeriod"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"timePeriod"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timePeriod"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"concernedId"}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>;
export const GetMyPublishedOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyPublishedOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myPublishedOffers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contractType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"jobDescriptionLink"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"limitDate"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorEmail"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"authorInterviewLink"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyPublishedOffersQuery, GetMyPublishedOffersQueryVariables>;
export const GetMyReferenceContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyReferenceContacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"experienceId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myReferenceContacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"experienceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"experienceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"experience"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"starting"}},{"kind":"Field","name":{"kind":"Name","value":"ending"}},{"kind":"Field","name":{"kind":"Name","value":"isLiveJob"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyReferenceContactsQuery, GetMyReferenceContactsQueryVariables>;
export const GetMyReferencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyReferences"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myReferences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"concerned"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"valid"}},{"kind":"Field","name":{"kind":"Name","value":"experience"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMyReferencesQuery, GetMyReferencesQueryVariables>;
export const GetMyUnlockedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyUnlockedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myUnlockedUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyUnlockedUsersQuery, GetMyUnlockedUsersQueryVariables>;
export const GetOffersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOffers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobDescriptionLink"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"limitDate"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"contractType"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"authorInterviewLink"}},{"kind":"Field","name":{"kind":"Name","value":"authorEmail"}},{"kind":"Field","name":{"kind":"Name","value":"sector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bgImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}}]}}]}}]}}]} as unknown as DocumentNode<GetOffersQuery, GetOffersQueryVariables>;
export const GetOffersForHomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOffersForHome"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OfferInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOffersForHomeQuery, GetOffersForHomeQueryVariables>;
export const GetOneArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneArticle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conclusion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"introduction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"paragraphs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"new"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetOneArticleQuery, GetOneArticleQueryVariables>;
export const GetOneCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"targetJob"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topSector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOneCandidateQuery, GetOneCandidateQueryVariables>;
export const GetOneCandidatesNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneCandidatesNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CandidatesNotesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneCandidatesNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"appreciation"}}]}}]}}]} as unknown as DocumentNode<GetOneCandidatesNotesQuery, GetOneCandidatesNotesQueryVariables>;
export const GetOneCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaCompanyFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"resume"}},{"kind":"Field","name":{"kind":"Name","value":"scrapped"}},{"kind":"Field","name":{"kind":"Name","value":"experiences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"starting"}},{"kind":"Field","name":{"kind":"Name","value":"ending"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOneCompanyQuery, GetOneCompanyQueryVariables>;
export const GetOneCompetencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneCompetency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneCompetency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetOneCompetencyQuery, GetOneCompetencyQueryVariables>;
export const GetOneCustomisationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneCustomisation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneCustomisation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"queueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<GetOneCustomisationQuery, GetOneCustomisationQueryVariables>;
export const GetOneDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}}]}}]}}]}}]} as unknown as DocumentNode<GetOneDetailsQuery, GetOneDetailsQueryVariables>;
export const GetOneExperienceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneExperience"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneExperience"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"profiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"experienceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]} as unknown as DocumentNode<GetOneExperienceQuery, GetOneExperienceQueryVariables>;
export const GetOneFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetOneFavoriteQuery, GetOneFavoriteQueryVariables>;
export const GetOneFormResponseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneFormResponse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneFormResponse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isTrue"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetOneFormResponseQuery, GetOneFormResponseQueryVariables>;
export const GetOneInterviewOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneInterviewOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneInterviewOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"datetime"}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetOneInterviewOfferQuery, GetOneInterviewOfferQueryVariables>;
export const GetOneJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topSector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<GetOneJobQuery, GetOneJobQueryVariables>;
export const GetOneLeadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneLead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneLead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetOneLeadQuery, GetOneLeadQueryVariables>;
export const GetOneOfferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneOffer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneOffer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"profileSearched"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"eager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transformation"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contractType"}},{"kind":"Field","name":{"kind":"Name","value":"remote"}},{"kind":"Field","name":{"kind":"Name","value":"limitDate"}},{"kind":"Field","name":{"kind":"Name","value":"authorInterviewLink"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"jobDescriptionLink"}},{"kind":"Field","name":{"kind":"Name","value":"authorEmail"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}}]}}]}}]} as unknown as DocumentNode<GetOneOfferQuery, GetOneOfferQueryVariables>;
export const GetOneProfileSharingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneProfileSharing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileSharingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneProfileSharing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"report"}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfilePage"}},{"kind":"Field","name":{"kind":"Name","value":"resume"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"offerTarget"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"profileSearched"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contractType"}},{"kind":"Field","name":{"kind":"Name","value":"remote"}},{"kind":"Field","name":{"kind":"Name","value":"limitDate"}},{"kind":"Field","name":{"kind":"Name","value":"authorInterviewLink"}},{"kind":"Field","name":{"kind":"Name","value":"authorName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"jobDescriptionLink"}},{"kind":"Field","name":{"kind":"Name","value":"authorEmail"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transcript"}},{"kind":"Field","name":{"kind":"Name","value":"confidence"}},{"kind":"Field","name":{"kind":"Name","value":"report"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"subtitledUrl"}},{"kind":"Field","name":{"kind":"Name","value":"eager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transformation"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetOneProfileSharingQuery, GetOneProfileSharingQueryVariables>;
export const GetOneQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetOneQueueQuery, GetOneQueueQueryVariables>;
export const GetOneThreadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneThread"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneThread"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"queueId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queueId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"queue"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"terminated"}},{"kind":"Field","name":{"kind":"Name","value":"exchanges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]} as unknown as DocumentNode<GetOneThreadQuery, GetOneThreadQueryVariables>;
export const GetOneTopSectorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneTopSector"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneTopSector"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bgImage"}}]}}]}}]} as unknown as DocumentNode<GetOneTopSectorQuery, GetOneTopSectorQueryVariables>;
export const GetOneUserExperiencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneUserExperiences"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneUserExperiences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"starting"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"ending"}},{"kind":"Field","name":{"kind":"Name","value":"isLiveJob"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topSector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"referenced"}}]}}]}}]} as unknown as DocumentNode<GetOneUserExperiencesQuery, GetOneUserExperiencesQueryVariables>;
export const GetOneUserInterviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneUserInterviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneUserInterviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"datetime"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}}]}}]}}]}}]} as unknown as DocumentNode<GetOneUserInterviewsQuery, GetOneUserInterviewsQueryVariables>;
export const GetOneVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetOneVideoQuery, GetOneVideoQueryVariables>;
export const GetQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"prefix"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<GetQuestionsQuery, GetQuestionsQueryVariables>;
export const GetRecruiterQueuesFromProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecruiterQueuesFromProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recruiterQueuesFromProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"seen"}},{"kind":"Field","name":{"kind":"Name","value":"offerTarget"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"contractType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetRecruiterQueuesFromProfileQuery, GetRecruiterQueuesFromProfileQueryVariables>;
export const GetTopSectorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopSectors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TopSectorInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topSectors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}}]}}]}}]}}]} as unknown as DocumentNode<GetTopSectorsQuery, GetTopSectorsQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uniqueName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uniqueName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uniqueName"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"credit"}},{"kind":"Field","name":{"kind":"Name","value":"cardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueName"}},{"kind":"Field","name":{"kind":"Name","value":"scrapped"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"professionalEmail"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"pro"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"consent"}},{"kind":"Field","name":{"kind":"Name","value":"hiddenFields"}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"websites"}},{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"subtitledUrl"}},{"kind":"Field","name":{"kind":"Name","value":"eager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transformation"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUserCustomerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserCustomerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uniqueName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uniqueName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uniqueName"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}}]}}]}}]} as unknown as DocumentNode<GetUserCustomerIdQuery, GetUserCustomerIdQueryVariables>;
export const GetUserRemarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserRemarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"remarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"pro"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserRemarksQuery, GetUserRemarksQueryVariables>;
export const GetUserVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uniqueName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uniqueName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uniqueName"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserVideoQuery, GetUserVideoQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"internal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"social"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"cardPrice"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"original_filename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"experiences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"isLiveJob"}},{"kind":"Field","name":{"kind":"Name","value":"ending"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"targetJob"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topSector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bgImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetContractType"}},{"kind":"Field","name":{"kind":"Name","value":"avatars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}},{"kind":"Field","name":{"kind":"Name","value":"subtitledUrl"}},{"kind":"Field","name":{"kind":"Name","value":"eager"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unvolonteerFavorites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"pro"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueName"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetUsersUniqueNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersUniqueName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PageParamsInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueName"}}]}}]}}]} as unknown as DocumentNode<GetUsersUniqueNameQuery, GetUsersUniqueNameQueryVariables>;
export const OwnQueuesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OwnQueues"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"originId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownQueues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"originId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"originId"}}},{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"origin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"offerTarget"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rebroadcast"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<OwnQueuesQuery, OwnQueuesQueryVariables>;
export const ProfileInfosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfileInfos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"candidate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ProfileInfosQuery, ProfileInfosQueryVariables>;
export const ResetEmailLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResetEmailLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetEmailLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ResetEmailLinkQuery, ResetEmailLinkQueryVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordQuery, ResetPasswordQueryVariables>;
export const SendEmailProspectionLinkedinDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SendEmailProspectionLinkedin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leadsIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendEmailProspectionLinkedin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leadsIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leadsIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SendEmailProspectionLinkedinQuery, SendEmailProspectionLinkedinQueryVariables>;
export const SendEmailToLeadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SendEmailToLead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LeadInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leadsIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"negativeAnswerForDesign"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"negativeAnswerForDev"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendEmailToLead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"leadsIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leadsIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"negativeAnswerForDev"},"value":{"kind":"Variable","name":{"kind":"Name","value":"negativeAnswerForDev"}}},{"kind":"Argument","name":{"kind":"Name","value":"negativeAnswerForDesign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"negativeAnswerForDesign"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SendEmailToLeadQuery, SendEmailToLeadQueryVariables>;
export const SubmitVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SubmitVideoMutation, SubmitVideoMutationVariables>;
export const UpdateAllMyNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAllMyNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAllMyNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAllMyNotificationsMutation, UpdateAllMyNotificationsMutationVariables>;
export const UpdateCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaCandidateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"targetJob"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topSector"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCandidateMutation, UpdateCandidateMutationVariables>;
export const UpdateCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaCompanyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinProfilePage"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"resume"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"secure_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]} as unknown as DocumentNode<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const UpdateDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaDetailsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDetailsMutation, UpdateDetailsMutationVariables>;
export const UpdateExperienceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExperience"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaExperienceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExperience"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"referenced"}}]}}]}}]} as unknown as DocumentNode<UpdateExperienceMutation, UpdateExperienceMutationVariables>;
export const UpdateFormResponseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFormResponse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FormResponseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFormResponse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateFormResponseMutation, UpdateFormResponseMutationVariables>;
export const UpdateLeadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LeadInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateLeadMutation, UpdateLeadMutationVariables>;
export const UpdateOneNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateOneNotificationMutation, UpdateOneNotificationMutationVariables>;
export const UpdateQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaQueueInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateQueueMutation, UpdateQueueMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BetaUserInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uniqueName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"uniqueName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uniqueName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hiddenFields"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateVideoMutation, UpdateVideoMutationVariables>;