import {
  BetaCompany,
  BetaQueue,
  BetaUser,
  BetaWhatsappThread,
  Job,
  Lead,
} from "@youmeet/gql/generated";

export type BackofficeModalData = Partial<BetaQueue> &
  Partial<Lead> &
  Partial<BetaWhatsappThread> &
  Partial<Job> &
  Partial<BetaCompany> &
  Partial<BetaUser>;

export type BackofficeModalDataType =
  | "queue"
  | "potentialCandidate"
  | "potentialReference"
  | "lead"
  | "thread"
  | "job"
  | "company"
  | "user";
