import {
  BetaCompany,
  BetaQueue,
  BetaUser,
  BetaWhatsappThread,
  Job,
  Lead,
  ProfileSharing,
} from "@youmeet/gql/generated";

export type BackofficeModalData = Partial<BetaQueue> &
  Partial<Lead> &
  Partial<BetaWhatsappThread> &
  Partial<Job> &
  Partial<BetaCompany> &
  Partial<BetaUser> &
  Partial<ProfileSharing>;

export type BackofficeModalDataType =
  | "queue"
  | "potentialCandidate"
  | "potentialReference"
  | "lead"
  | "thread"
  | "job"
  | "company"
  | "user"
  | "sharing";
