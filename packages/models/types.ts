import { Eager } from "@youmeet/gql/generated";

export type SocialAuthentications = {
  user?: GoogleAuthentications;
  provider?: string;
  accessToken?: string;
  refreshToken?: string;
  expiryDate?: number;
};
export type InternalAuthentications = {
  email?: string;
  username?: string;
  salt?: string;
  hash?: string;
  token?: string;
};

export type AuthDetails = {
  social?: SocialAuthentications;
  internal?: InternalAuthentications;
};

export type GoogleAuthentications = {
  network?: string;
  email?: string;
  email_verified?: boolean | null;
  family_name?: string;
  given_name?: string;
  locale?: string;
  name?: string;
  nickname?: string;
  picture?: string;
  sid?: string;
  sub?: string;
  updated_at?: string;
};

export type Avatars = {
  asset_id?: string;
  public_id?: string;
  width?: number;
  height?: number;
  format?: string;
  created_at?: Date;
  url?: string;
  secure_url?: string;
  subtitledUrl?: string;
  folder?: string;
  original_filename?: string;
  duration?: number;
  eager: Eager[];
};

export type CandidateRole = {
  title: string;
};

export type Phone = {
  code: string;
  number: string;
};

export type ErrorOnValidation = {
  message: string;
  field: string;
};

export type ScrappedInfos = {
  fullname: string;
};

export type BetaRelationLevel = {
  title: string;
  location: string;
};

export type MessageGPT = {
  role: string;
  name: string;
  content: string;
};

export type Question = {
  prefix: string;
  text: string;
};
