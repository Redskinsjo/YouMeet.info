import {
  BetaCandidateInput,
  BetaDetailsInput,
  BetaUserInput,
} from "@youmeet/gql/generated";
import { Prisma } from "@prisma/client";

export const setUserPayload = <T,>(
  type: "create" | "update",
  input: BetaUserInput
): T => {
  const payload: Prisma.betausersCreateInput | Prisma.betausersUpdateInput = {};

  if (input.customerId) payload.customerId = input.customerId;
  if (input.auth) payload.auth = input.auth;
  if (input.candidateName) payload.fullname = input.candidateName;
  if (input.cardPrice) payload.cardPrice = input.cardPrice;
  if (input.companyId) payload.company = { connect: { id: input.companyId } };
  if (input.consent) payload.consent = input.consent;
  if (input.credit) payload.credit = { increment: input.credit };
  if (input?.cvFile !== undefined) payload.cvFile = input.cvFile;
  if (input.email) payload.email = input.email.toLowerCase();
  if (input.extension) payload.extension = input.extension;
  if (input.firstname) payload.firstname = input.firstname;
  if (input.lastname) payload.lastname = input.lastname;
  if (input.fullname) payload.fullname = input.fullname;
  if (input.hiddenFields && typeof input.hiddenFields === "object")
    payload.hiddenFields = input.hiddenFields as string[];
  if (input.linkedinProfileId)
    payload.linkedinProfileId = input.linkedinProfileId;
  if (input.pro) payload.pro = input.pro;
  if (input.user) payload.user = input.user;
  if (input.professionalEmail)
    payload.professionalEmail = input.professionalEmail;
  if (input.role) payload.role = input.role;
  if (input.uniqueName) payload.uniqueName = input.uniqueName;
  if (input.trial !== undefined) payload.trial = input.trial;
  if (input.affiliationId)
    payload.affiliation = { connect: { id: input.affiliationId } };
  if (type === "create") payload.createdAt = new Date();
  payload.updatedAt = new Date();

  return payload as T;
};

export const setDetailPayload = <T,>(
  type: "create" | "update",
  input: BetaDetailsInput
): T => {
  const payload: Prisma.betadetailsCreateInput | Prisma.betadetailsUpdateInput =
    {};
  if (input.birthday) payload.birthday = input.birthday;
  if (input.email) payload.email = input.email.toLowerCase();
  if (input.facebook) payload.facebook = input.facebook;
  if (input.phone) payload.phone = input.phone;
  if (input.principal !== undefined)
    payload.principal = input.principal as boolean;
  if (input.twitter) payload.twitter = input.twitter;
  if (input.websites) payload.websites = input.websites;
  if (input.userId) payload.user = { connect: { id: input.userId } };
  if (type === "create") payload.createdAt = new Date();
  payload.updatedAt = new Date();
  return payload as T;
};

export const setCandidatePayload = <T,>(
  type: "create" | "update",
  input: BetaCandidateInput
): T => {
  const payload:
    | Prisma.betacandidatesCreateInput
    | Prisma.betacandidatesUpdateInput = {};

  if (input.jobId) payload.targetJob = { connect: { id: input.jobId } };
  if (input.targetContractType)
    payload.targetContractType = input.targetContractType;
  if (input.userId) payload.user = { connect: { id: input.userId } };
  if (type === "create") payload.createdAt = new Date();
  payload.updatedAt = new Date();
  return payload as T;
};
