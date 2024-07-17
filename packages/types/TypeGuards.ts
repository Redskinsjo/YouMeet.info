import {
  Avatar,
  BetaCompany,
  BetaUser,
  GptCompetency,
  InterviewOffer,
  Job,
  Offer,
  ProfileSharing,
} from "@youmeet/gql/generated";
import { PayloadBackendError, withData } from "./api/backend";

export const isUser = (
  user: BetaUser | PayloadBackendError
): user is BetaUser => (user as BetaUser).__typename === "BetaUser";

export const isOffer = (offer: Offer | PayloadBackendError): offer is Offer =>
  (offer as Offer).__typename === "Offer";

export const isCompany = (
  company: BetaCompany | PayloadBackendError
): company is BetaCompany =>
  (company as BetaCompany).__typename === "BetaCompany";

export const isJob = (job: Job | PayloadBackendError): job is Job =>
  (job as Job).__typename === "Job";

export const isCompetency = (
  job: GptCompetency | PayloadBackendError
): job is GptCompetency =>
  (job as GptCompetency).__typename === "GptCompetency";

export const isAvatar = (file: Avatar | undefined | null): file is Avatar =>
  (file as Avatar).url !== undefined &&
  (file as Avatar).secure_url !== undefined;

export const isProfileSharing = (
  obj: ProfileSharing | InterviewOffer | Offer
): obj is ProfileSharing => !!(obj as ProfileSharing).offerTarget?.job?.id;

export const isInterviewOffer = (
  obj: ProfileSharing | InterviewOffer | Offer
): obj is InterviewOffer => !!(obj as InterviewOffer).datetime;

export const isPayloadError = (payload: any): payload is PayloadBackendError =>
  (payload as PayloadBackendError).error;

export const isNotHandledReq = <T>(
  handling: undefined | true,
  res: any
): res is withData<T | undefined | never[]> => (!handling ? true : false);

export const isHandledReq = <T>(
  handling: undefined | true,
  res: any
): res is withData<T | undefined | never[]> | PayloadBackendError =>
  !!handling ? true : false;
