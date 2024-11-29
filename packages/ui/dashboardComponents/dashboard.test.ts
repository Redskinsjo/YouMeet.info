import {
  onTargetContractTypeUpdate,
  onTargetJobUpdate,
} from "@youmeet/functions/actions";
import { getUser, updateUser } from "@youmeet/functions/request";
import Job, { JobSchema } from "@youmeet/models/jobs";
import { BetaCandidate, BetaUser } from "@youmeet/gql/generated";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { DocumentType } from "@typegoose/typegoose";

let moi: BetaUser | undefined;
let job: DocumentType<JobSchema> | undefined;
beforeAll(async () => {
  moi =
    ((await getUser<BetaUser>(
      {
        email: "jonathan.carnos@gmail.com",
      },
      0
    )) as BetaUser) || undefined;
  job = ((await Job.findOne()) as DocumentType<JobSchema>) || undefined;
}, 15000);

// ------------------------------

const customUpdateIsPublic = async (
  profil: BetaUser | undefined,
  isPublic: boolean
) => {
  if (profil?.id) {
    const result = await updateUser({
      userId: profil?.id,
      data: { isPublic: !isPublic },
    });
    return result;
  }
  return undefined;
};

test("update isPublic to true", async () => {
  expect(moi).not.toBeUndefined();
  const result = await customUpdateIsPublic(moi, true);
  expect(result).not.toBeUndefined();
});
test("update isPublic to false", async () => {
  expect(moi).not.toBeUndefined();
  const result = await customUpdateIsPublic(moi, false);
  expect(result).not.toBeUndefined();
});

// -----------------------

const customOnTargetJobUpdate = async (extras: {
  userId: string;
  jobId: string;
}) => {
  const result = (await onTargetJobUpdate(extras)) as
    | PayloadBackendError
    | withData<BetaCandidate>;

  if (result && isPayloadError(result)) return undefined;
  else if (!result?.data) return undefined;
  else return result.data;
};

test("update targetJob to first job in db", async () => {
  expect(moi).not.toBeUndefined();
  expect(job).not.toBeUndefined();
  const result = await customOnTargetJobUpdate({
    userId: moi?.id as string,
    jobId: job?._id.toString() || "",
  });
  expect(result).toBeTruthy();
});

// -------------------------

const customOnTargetContractTypeUpdate = async (extras: {
  userId: string;
  contractType: string;
}) => {
  const result = (await onTargetContractTypeUpdate(extras)) as
    | PayloadBackendError
    | withData<BetaCandidate>;

  if (result && isPayloadError(result)) return undefined;
  else if (!result?.data) return undefined;
  else return result.data;
};

test("update targetContractType to first job in db", async () => {
  expect(moi).not.toBeUndefined();
  expect(job).not.toBeUndefined();
  const result = await customOnTargetContractTypeUpdate({
    userId: moi?.id as string,
    contractType: "cdi",
  });
  expect(result).toBeTruthy();
});

// -------------------------

const customUpdateConsent = async (
  profil: BetaUser | undefined,
  consent: boolean
) => {
  const result = await updateUser({
    userId: profil?.id,
    data: { consent: !consent },
  });
  if (result) return result;
  else undefined;
};

test("update consent to true", async () => {
  expect(moi).not.toBeUndefined();
  const result = await customUpdateConsent(moi, true);
  expect(result).not.toBeUndefined();
});
test("update consent to false", async () => {
  expect(moi).not.toBeUndefined();
  const result = await customUpdateConsent(moi, false);
  expect(result).not.toBeUndefined();
});

// --------

// feature testing
// add/remove video
// voir oneOfferComponents/offre.test.ts

// --------
