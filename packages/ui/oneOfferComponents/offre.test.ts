import {
  onAddVideo,
  onApplying,
  onDeleteVideo,
} from "@youmeet/functions/actions";
import { getUser } from "@youmeet/functions/request";
import Offer, { OfferSchema } from "@youmeet/models/offers";
import { AvatarInput, BetaUser, Video } from "@youmeet/gql/generated";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
  withData,
} from "@youmeet/types/api/backend";
import { DocumentType } from "@typegoose/typegoose";
import { readFileSync } from "fs";

let moi: BetaUser | undefined;
let offer: DocumentType<OfferSchema> | undefined;
let addedVideo: Video | undefined;

beforeAll(async () => {
  moi = (await getUser<BetaUser>(
    { email: "jonathan.carnos@gmail.com" },
    0
  )) as BetaUser;
  offer = (await Offer.findOne().populate([
    { path: "jobId" },
    { path: "companyId" },
  ])) as DocumentType<OfferSchema>;
}, 15000);

// ---------------------------

const submitFileTest = jest.fn(
  (blob: Blob, userId: string): AvatarInput | PayloadBackendError => {
    const extracPublicId = `${userId}_video`;
    const file = {
      asset_id: "123",
      public_id: `youmeet-official/${extracPublicId}`,
      width: 1080,
      height: 720,
      format: "mov",
      created_at: "2024-05-10T14:38:33.000+00:00",
      url: `http://res.cloudinary.com/de822mdsy/video/upload/v1715351913/youmeet-official/${extracPublicId}.mov`,
      secure_url: `https://res.cloudinary.com/de822mdsy/video/upload/v1715351913/youmeet-official/${extracPublicId}.mov`,
      folder: "youmeet-official",
      original_filename: "jo-youmeet3",
      eager: [],
      duration: 3.533333,
    };

    if (blob.size < 100000000) {
      return file;
    } else {
      return {
        error: true,
        type: BACKEND_ERRORS.UPLOAD_FAIL,
        message: BACKEND_MESSAGES.UPLOAD_FAIL,
      };
    }
  }
);

const submit = async (userId: string) => {
  const inputFilePath = "./app/dashboardComponents/jo-youmeet3.mov";

  const fileBuffer = readFileSync(inputFilePath);
  const bufferData = Buffer.from(fileBuffer);
  const blob = new Blob([bufferData], { type: "video/quicktime" });

  const result1 = submitFileTest(blob, userId);
  return result1;
};

const addVideo = async (extras: {
  userIdFollowingVideosCount: string;
  jobId?: string;
}) => {
  const result1 = await submit(extras.userIdFollowingVideosCount);

  if (result1 && isPayloadError(result1)) {
    return undefined;
  } else {
    const result = (await onAddVideo(
      extras.userIdFollowingVideosCount,
      extras.jobId,
      result1,
      undefined
    )) as PayloadBackendError | withData<Video>;

    if (result && isPayloadError(result)) {
      return undefined;
    } else if (!result?.data) {
      return undefined;
    } else {
      return result.data;
    }
  }
};

test("add video", async () => {
  expect(moi).not.toBeUndefined();
  expect(offer?.jobId).not.toBeUndefined();
  expect(moi?.videos).not.toBeUndefined();

  addedVideo = await addVideo({
    userIdFollowingVideosCount: `${moi?.id}_${
      (moi?.videos as any)?.length + 1
    }` as string,
    jobId: offer?.jobId?._id.toString(),
  });
  expect(addedVideo).not.toBeUndefined();
}, 15000);

// ------------------------------

const customOnApplying = async (extras: {
  originId: string | undefined;
  targetId: string | undefined;
  videoId: string | undefined;
  offerTargetId: string | undefined;
}) => {
  const result = await onApplying(extras);
  if (result && isPayloadError(result)) {
    return undefined;
  } else if (!result?.data) {
    return undefined;
  } else {
    return result.data;
  }
};

test("applying to offer", async () => {
  expect(moi).not.toBeUndefined();
  expect(offer).not.toBeUndefined();
  expect(offer?.companyId).not.toBeUndefined();
  expect(addedVideo).not.toBeUndefined();

  const result = await customOnApplying({
    originId: moi?.id as string,
    targetId: offer?.companyId?._id.toString(),
    offerTargetId: offer?._id.toString(),
    videoId: addedVideo?.id as string,
  });

  expect(result).not.toBeUndefined();
});

// ------------------------------

const removeVideo = async (videoId: string) => {
  const result = (await onDeleteVideo(videoId)) as
    | PayloadBackendError
    | withData<Video>;

  if (result && isPayloadError(result)) return undefined;
  else if (!result?.data) return undefined;
  else return result.data;
};

test("remove video", async () => {
  const result1 = await removeVideo(addedVideo?.id as string);
  expect(result1).not.toBeUndefined();
}, 15000);
