"use server";
import {
  Affiliation,
  Avatar,
  AvatarInput,
  BetaCandidate,
  BetaCompany,
  BetaQueue,
  BetaUser,
  BetaWhatsappExchange,
  BetaWhatsappResponse,
  BetaWhatsappThread,
  CandidateInput,
  Customisation,
  Feedback,
  InterviewOffer,
  Lead,
  Meet,
  MutationUpdateLeadArgs,
  Offer,
  ProfileSharing,
  QuerySendEmailArgs,
  Question,
  SharingRefusal,
  Video,
} from "@youmeet/gql/generated";
import { ConversationTheme } from "@youmeet/types/ConversationTheme";
import { analyseVideo } from "@youmeet/utils/analyseVideo";
import { externallyHandleData } from "@youmeet/utils/handleProfileSubmit";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";
import {
  createAffiliation,
  createCandidate,
  createCandidateBasic,
  createClassicAccount,
  createCompanyProfile,
  createConversation,
  createCustomisation,
  createError,
  createFeedback,
  createLead,
  createMeet,
  createOffer,
  createProAccount,
  createProfileSharing,
  createQuestion,
  createQueue,
  createResponses,
  createSharingRefusal,
  createThread,
  createUser,
  deleteInterviewOffer,
  deleteLead,
  deleteOffer,
  deleteProfileSharing,
  deleteVideo,
  getAffiliation,
  getRawUser,
  getSimpleUser,
  getUser,
  getVideo,
  resetEmailLink,
  resetPassword,
  sendEmail,
  sendEmailToLead,
  submitVideo,
  unlock,
  updateLead,
  updateQueue,
  updateUser,
  updateVideo,
  searchSomeone,
} from "./request";
import {
  FormHandledData,
  OfferHandledData,
} from "@youmeet/types/form/FormHandledData";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
  withData,
} from "@youmeet/types/api/backend";
import { z } from "zod";
import { dev, test, uri } from "./imports";
import { cookies } from "next/headers";
import { isPayloadError, isUser } from "@youmeet/types/TypeGuards";
import { s } from "@youmeet/utils/jwt";
import setUniqueNameAndExtension from "@youmeet/utils/backoffice/setUniqueNameAndExtension";
import CryptoJS from "crypto-js";
import { BackendError } from "@youmeet/utils/BackendErrorClass";
import { setName } from "@youmeet/utils/setName";
import { redirect } from "next/navigation";
import { getUserIdFromPublicId } from "@youmeet/utils/getPublicId";

///// backendisées avec gestion d'erreur

const saveFormData = async (
  handledData: FormHandledData,
  uploadedList: AvatarInput[]
): Promise<withData<BetaCandidate> | PayloadBackendError> => {
  try {
    const input: CandidateInput = {
      firstname: handledData.firstname,
      lastname: handledData.lastname,
      email: handledData.email,
      linkedinProfileId: handledData.linkedinProfileId,
      description: handledData.description,
      age: Number(handledData.age),
      languages: handledData.languages,
      salaryExpected: handledData.salaryExpected,
      userId: handledData.userId,
      fullname: handledData.fullname,
      phone: handledData.phone,
    };

    const result = (await createCandidate<BetaCandidate>(
      {
        data: { ...input, avatars: uploadedList },
      },
      0,
      true
    )) as BetaCandidate;

    if (result && isPayloadError(result)) {
      throw new BackendError(
        BACKEND_ERRORS.NOT_CREATED,
        "Le candidat n'a pas été créé"
      );
    } else {
      return { data: result };
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return { error: true, type: err.type, message: err.message };
  }
};

const saveFormDataPro = async (
  extras: { userId: string; companyId: string },
  uploadedList: { logo?: AvatarInput; video?: AvatarInput },
  companyId: string
): Promise<withData<BetaCompany> | PayloadBackendError> => {
  try {
    const result3 = (await createCompanyProfile<BetaCompany>(
      {
        data: {
          userId: extras.userId,
          companyId,
          ...uploadedList,
        },
      },
      0,
      true
    )) as PayloadBackendError | withData<BetaCompany>;

    if (result3 && isPayloadError(result3)) {
      throw new BackendError(result3.type, result3.message);
    } else if (!result3.data) {
      throw new BackendError(
        BACKEND_ERRORS.PROCESSING,
        BACKEND_MESSAGES.PROCESSING
      );
    } else {
      return { data: result3.data };
    }
  } catch (err: any) {
    return { error: true, type: err.type, message: err.message };
  }
};

export const onFormData = async (
  extras: { userId: string },
  formData: FormData,
  uploadedList: AvatarInput[]
): Promise<withData<BetaCandidate> | PayloadBackendError> => {
  const handledData = externallyHandleData(formData, extras, uploadedList);

  try {
    const result = await saveFormData(handledData, uploadedList);

    if (result && isPayloadError(result)) {
      throw new BackendError(result.type, result.message);
    } else {
      if (!test) revalidatePath("/dashboard");
      if (!test) revalidatePath("/formulaire-profil");
      return { data: result.data };
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return { error: true, type: err.type, message: err.message };
  }
};

export const onAddCV = async (
  userId: string,
  result1: PayloadBackendError | AvatarInput
): Promise<withData<Avatar> | PayloadBackendError> => {
  try {
    if (result1 && isPayloadError(result1)) {
      throw new BackendError(result1.type, result1.message);
    } else {
      const result2 = (await updateUser<BetaUser>(
        {
          data: { cvFile: result1 },
          userId,
        },
        undefined,
        true
      )) as PayloadBackendError | withData<BetaUser>;

      if (result2 && isPayloadError(result2)) {
        throw new BackendError(result2.type, result2.message);
      } else if (result2.data.cvFile) {
        if (!test) revalidatePath("/dashboard");
        if (!test) revalidatePath("/offres/[offre]/page", "page");

        return { data: result2.data.cvFile };
      }
    }

    throw new BackendError(BACKEND_ERRORS.UNKNOWN, BACKEND_MESSAGES.UNKNOWN);
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return { error: true, type: err.type, message: err.message };
  }
};

export const onDeleteCV = async (
  userId: string
): Promise<withData<undefined> | PayloadBackendError> => {
  try {
    const result = (await updateUser<BetaUser>(
      {
        data: { cvFile: null },
        userId,
      },
      undefined,
      true
    )) as PayloadBackendError | withData<BetaUser>;

    if (result && isPayloadError(result)) {
      throw new BackendError(result.type, result.message);
    }
    if (!test) revalidatePath("/dashboard");
    return { data: undefined };
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return { error: true, type: err.type, message: err.message };
  }
};

export const onDeleteVideo = async (
  videoId: string
): Promise<withData<Video> | PayloadBackendError> => {
  try {
    if (videoId) {
      const result = (await deleteVideo<Video>(
        {
          id: videoId,
        },
        0,
        true
      )) as PayloadBackendError | withData<Video>;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message, result.status);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        if (!test) revalidatePath("/dashboard");
        if (!test) revalidatePath("/offres/[offre]/page", "page");
        if (!test) revalidatePath("/backoffice/users");
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.MISSING_ARGUMENT,
      BACKEND_MESSAGES.MISSING_ARGUMENT
    );
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return {
      status: err.status,
      error: true,
      type: err.type,
      message: err.message,
    };
  }
};
export const onSetVideoAsDefault = async (
  videoId: string,
  userId: string
): Promise<withData<Video> | PayloadBackendError> => {
  try {
    if (videoId) {
      const result = (await updateVideo<Video>(
        {
          data: { id: videoId, userId, principal: true },
        },
        undefined,
        true
      )) as PayloadBackendError | withData<Video>;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        if (!test) revalidatePath("/dashboard");
        if (!test) revalidatePath("/offres/[offre]/page", "page");
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.MISSING_ARGUMENT,
      BACKEND_MESSAGES.MISSING_ARGUMENT
    );
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return {
      status: err.status,
      error: true,
      type: err.type,
      message: err.message,
    };
  }
};

export const onAddVideo = async (
  publicId: string,
  jobId: string | undefined,
  result1: AvatarInput,
  exchangeId?: string
): Promise<withData<Video> | PayloadBackendError> => {
  try {
    const userId = getUserIdFromPublicId(publicId);

    if (result1) {
      const result = (await submitVideo<Video>(
        {
          data: {
            userId,
            jobId,
            principal: true,
            file: result1,
            exchangeId,
          },
        },
        0,
        true
      )) as PayloadBackendError | withData<Video>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        if (!test) revalidatePath("/dashboard");
        if (!test) revalidatePath("/offres/[offre]/page", "page");

        return { data: result.data };
      }
    }
    throw new BackendError(BACKEND_ERRORS.NO_FILE, BACKEND_MESSAGES.NO_FILE);
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return { error: true, type: err.type, message: err.message };
  }
};

export const onAddFeedback = async (
  prevState: any,
  formData: FormData
): Promise<withData<boolean> | PayloadBackendError> => {
  const schema = z.object({
    feedback: z.string().min(1),
    userId: z.string().min(1),
    authorId: z.string().optional(),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;

  try {
    const valid = schema.parse(toBeParsed);

    if (valid) {
      const result = (await createFeedback<Feedback>(
        {
          data: {
            content: valid.feedback,
            userId: valid.userId,
            authorId: valid.authorId,
          },
        },
        0,
        true
      )) as PayloadBackendError | withData<Feedback>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        return { data: true };
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.WRONG_FORMAT,
        BACKEND_MESSAGES.WRONG_FORMAT
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onUpdateTargetJob = async (
  userId: string,
  formData: FieldValues
): Promise<withData<BetaCandidate> | PayloadBackendError> => {
  const targetJobId = formData.job;
  try {
    if (targetJobId) {
      const result = (await createCandidateBasic<BetaCandidate>(
        {
          data: { targetJobId, userId },
        },
        0,
        true
      )) as PayloadBackendError | withData<BetaCandidate>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        if (!test) revalidatePath("/backoffice/users");
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.MISSING_ARGUMENT,
      BACKEND_MESSAGES.UNKNOWN
    );
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return { error: true, type: err.type, message: err.message };
  }
};

export const onCreateProAccount = async (
  formData: FormData
): Promise<withData<boolean> | PayloadBackendError> => {
  const schema = z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    email: z.string().min(1),
    companyName: z.string().optional(),
    company: z.string().optional(),
    linkedinProfilePage: z.string().optional(),
    phone: z.string().min(1),
    phonecode: z.string().min(1),
  });
  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;
  try {
    const valid = schema.parse(obj);
    if (valid) {
      const values = {
        firstname: valid.firstname,
        lastname: valid.lastname,
        email: valid.email,
        companyName: valid.companyName,
        company: valid.company,
        linkedinProfilePage: valid.linkedinProfilePage,
        phone: { code: valid.phonecode, number: valid.phone },
      };
      const result = (await createProAccount<BetaCompany>(
        { data: values },
        0,
        true
      )) as PayloadBackendError | withData<BetaCompany>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        if (!test) revalidatePath("/backoffice/users");
        if (!test) revalidatePath("/backoffice/companies");
        return { data: true };
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.WRONG_FORMAT,
        BACKEND_MESSAGES.WRONG_FORMAT
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onTargetJobUpdate = async (extras: {
  userId: string;
  jobId: string;
}): Promise<withData<BetaCandidate> | PayloadBackendError> => {
  const schema = z.object({
    userId: z.string().min(1),
    jobId: z.string().min(1),
  });

  const obj = { userId: extras.userId, jobId: extras.jobId };

  try {
    const valid = schema.parse(obj);
    if (valid) {
      const result = (await createCandidateBasic<BetaCandidate>(
        {
          data: { userId: extras.userId, targetJobId: extras.jobId },
        },
        0,
        true
      )) as PayloadBackendError | withData<BetaCandidate>;
      if (result && isPayloadError(result)) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        if (!test) revalidatePath("/dashboard");

        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.MISSING_ARGUMENT,
      BACKEND_MESSAGES.MISSING_ARGUMENT
    );
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return {
      status: err.status,
      error: true,
      type: err.type,
      message: err.message,
    };
  }
};

export const onTargetContractTypeUpdate = async (extras: {
  userId: string;
  contractType: string;
}): Promise<withData<BetaCandidate> | PayloadBackendError> => {
  const schema = z.object({
    userId: z.string().min(1),
    contractType: z.string().min(1),
  });
  const obj = { userId: extras.userId, contractType: extras.contractType };
  try {
    const valid = schema.parse(obj);
    if (valid) {
      const result = (await createCandidateBasic<BetaCandidate>(
        {
          data: {
            userId: extras.userId,
            targetContractType: extras.contractType,
          },
        },
        0,
        true
      )) as PayloadBackendError | withData<BetaCandidate>;

      if (result && isPayloadError(result)) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        if (!test) revalidatePath("/dashboard");
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.MISSING_ARGUMENT,
      BACKEND_MESSAGES.MISSING_ARGUMENT
    );
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return {
      status: err.status,
      error: true,
      type: err.type,
      message: err.type,
    };
  }
};

export const onLogin = async (
  initial: withData<string | null> | PayloadBackendError,
  formData: FormData
): Promise<withData<string | null> | PayloadBackendError> => {
  // si la requête est pour login et est valide
  const schema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
    redirect: z.string(),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;

  let returnTo;
  try {
    const valid = schema.parse(toBeParsed);

    if (valid) {
      const user = (await getSimpleUser({
        email: valid.email,
      })) as BetaUser;

      if (user && isUser(user)) {
        const isPro = user.pro && process.env.APP === "pro";
        const isCandidate = user.user && process.env.APP === "candidate";
        if (isPro || isCandidate) {
          if (user?.auth?.internal?.hash) {
            const decryption = CryptoJS.AES.decrypt(
              user?.auth.internal?.hash,
              `${process.env.JWT_SECRET}`
            );
            const decryptedPassword = decryption?.toString(CryptoJS.enc.Utf8);

            if (decryptedPassword === valid.password) {
              returnTo = valid.redirect
                ? decodeURIComponent(valid.redirect)
                : "";

              if (returnTo.includes("%"))
                returnTo = decodeURIComponent(returnTo);
              if (returnTo.includes("%"))
                returnTo = decodeURIComponent(returnTo);

              if (returnTo[0] === "/") returnTo = returnTo.slice(1);

              const createDate = new Date(user.createdAt).getTime();
              const today = new Date().getTime();
              const oneDay = 1000 * 3600 * 24;
              if (createDate > today - oneDay) {
                returnTo = `${returnTo}?new=true`;
              }
              const beforeCookie = {
                userId: user.id,
                email: user.email as string,
                user: user.user ?? false,
                pro: user.pro ?? false,
                returnTo,
                customerId: user?.customerId,
                companyId: user?.company?.id || "",
                uniqueName: user?.uniqueName,
              } as { [key: string]: string | undefined | boolean };

              const payload = await s(beforeCookie);
              if (payload) {
                cookies().set(isCandidate ? "login" : "loginPro", payload, {
                  domain: process.env.API_DOMAIN,
                });
              } else {
                throw new BackendError(
                  BACKEND_ERRORS.UNKNOWN,
                  BACKEND_MESSAGES.UNKNOWN
                );
              }
            } else {
              throw new BackendError(
                BACKEND_ERRORS.WRONG_CREDENTIALS,
                BACKEND_MESSAGES.WRONG_CREDENTIALS
              );
            }
          } else {
            throw new BackendError(
              BACKEND_ERRORS.PROCESSING,
              BACKEND_MESSAGES.PROCESSING
            );
          }
        } else {
          throw new BackendError(
            BACKEND_ERRORS.NO_CAND_USER,
            BACKEND_MESSAGES.NO_CAND_USER
          );
        }
      } else {
        throw new BackendError(
          BACKEND_ERRORS.NO_USER,
          BACKEND_MESSAGES.NO_USER
        );
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.WRONG_FORMAT,
        BACKEND_MESSAGES.WRONG_FORMAT
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
  redirect(`${uri}/${returnTo}`);
};

export const onEmailForgotten = async (
  initial: any,
  formData: FormData
): Promise<withData<boolean> | PayloadBackendError> => {
  const schema = z.object({
    email: z.string().min(1).email(),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;

  try {
    const valid = schema.parse(toBeParsed);
    if (valid) {
      const result = (await resetEmailLink<BetaUser>(
        {
          email: valid.email,
        },
        0,
        true
      )) as PayloadBackendError | withData<BetaUser>;

      if (result && isPayloadError(result))
        throw new BackendError(result?.type, result?.message);

      return { data: true };
    } else {
      throw new BackendError(
        BACKEND_ERRORS.WRONG_FORMAT,
        BACKEND_MESSAGES.WRONG_FORMAT
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onSigninUp = async (
  initial: any,
  formData: FormData
): Promise<withData<string> | PayloadBackendError> => {
  const schema = z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(1),
    phone: z.string(),
    phonecode: z.string(),
    redirect: z.string(),
    cgu: z.string().min(1),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;

  try {
    const valid = schema.parse(toBeParsed);

    if (valid) {
      const user = (await getRawUser<BetaUser>({
        email: valid.email,
      })) as BetaUser;

      if (user) {
        throw new BackendError(
          BACKEND_ERRORS.USER_EXIST,
          BACKEND_MESSAGES.USER_EXIST
        );
      }
      const hash = CryptoJS.AES.encrypt(
        valid.password,
        `${process.env.JWT_SECRET}`
      )?.toString();
      const { uniqueName, extension } = await setUniqueNameAndExtension(
        valid.firstname || "",
        valid.lastname || "",
        0
      );
      const result = (await createClassicAccount<BetaUser>(
        {
          data: {
            email: valid.email,
            firstname: valid.firstname,
            lastname: valid.lastname,
            fullname: setName({
              firstname: valid.firstname,
              lastname: valid.lastname,
            } as BetaUser),
            uniqueName,
            auth: {
              internal: {
                hash,
                email: valid.email.toLowerCase(),
              },
            },
            user: true,
            extension,
            phone: { code: valid.phonecode, number: valid.phone },
          },
        },
        0,
        true
      )) as PayloadBackendError | withData<BetaUser>;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        let returnTo = valid.redirect ? decodeURIComponent(valid.redirect) : "";
        if (returnTo.includes("%")) returnTo = decodeURIComponent(returnTo);
        if (returnTo.includes("%")) returnTo = decodeURIComponent(returnTo);
        if (returnTo[0] === "/") returnTo = returnTo.slice(1);

        const beforeCookie = {
          userId: result?.data.id || "",
          email: result?.data.email as string,
          user: result?.data.user ?? false,
          pro: result.data.pro ?? false,
          returnTo,
          customerId: result?.data.customerId || "",
          companyId: result?.data.company?.id || "",
          scrapped: (result?.data.scrapped as boolean) ?? false,
        };
        const payload = await s(beforeCookie);
        if (payload) {
          cookies().set("login", payload, {
            domain: process.env.API_DOMAIN,
          });
          return { data: `${returnTo}` };
        }
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.WRONG_FORMAT,
        BACKEND_MESSAGES.WRONG_FORMAT
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onLogout = async () => {
  cookies().delete({
    name: process.env.APP === "candidate" ? "login" : "loginPro",
    path: "/",
    domain: `${process.env.API_DOMAIN}`,
  });
  revalidatePath("/");
  redirect("/");
};

export const onApplying = async (extras: {
  originId: string | undefined;
  targetId: string | undefined;
  videoId: string | undefined;
  offerTargetId: string | undefined;
}): Promise<withData<ProfileSharing> | PayloadBackendError> => {
  const schema = z.object({
    originId: z.string().min(1),
    targetId: z.string().min(1),
    videoId: z.string().min(1),
    offerTargetId: z.string().min(1),
  });
  try {
    const valid = schema.parse({
      originId: extras.originId,
      targetId: extras.targetId,
      videoId: extras.videoId,
      offerTargetId: extras.offerTargetId,
    });
    if (valid) {
      const result = (await createProfileSharing<ProfileSharing>(
        {
          data: {
            originId: valid.originId,
            targetId: valid.targetId,
            videoId: valid.videoId,
            offerTargetId: valid.offerTargetId,
          },
        },
        0,
        true
      )) as PayloadBackendError | withData<ProfileSharing>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        if (!test) revalidatePath("/offres/[offre]/page", "page");
        return { data: result.data };
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.WRONG_FORMAT,
        BACKEND_MESSAGES.WRONG_FORMAT
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

/// add HANDLING to all actions

export const onResetPassword = async (
  extras: { userId: string },
  formData: FormData
) => {
  const schema = z.object({
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;
  try {
    const valid = schema.parse(toBeParsed);
    if (valid) {
      if (valid.password === valid.confirmPassword) {
        if (extras.userId) {
          const result = (await resetPassword<BetaUser>(
            {
              password: valid.password,
              userId: extras.userId,
            },
            0,
            true
          )) as PayloadBackendError | withData<BetaUser>;
          if (result && isPayloadError(result)) {
            throw new BackendError(result.type, result.message);
          } else {
            return { data: "se-connecter" };
          }
        }
        throw new BackendError(
          BACKEND_ERRORS.NO_USER,
          BACKEND_MESSAGES.NO_USER
        );
      }
      throw new BackendError(
        BACKEND_ERRORS.WRONG_CREDENTIALS,
        BACKEND_MESSAGES.WRONG_CREDENTIALS
      );
    } else {
      throw new BackendError(
        BACKEND_ERRORS.WRONG_FORMAT,
        BACKEND_MESSAGES.WRONG_FORMAT
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onConversationEngagement = async (
  queueId: string
): Promise<PayloadBackendError | withData<BetaWhatsappThread>> => {
  const schema = z.object({
    queueId: z.string().min(1),
  });
  try {
    const valid = schema.parse({
      queueId,
    });
    if (valid) {
      const result = (await createThread<BetaWhatsappThread>(
        { queueId },
        0,
        true
      )) as PayloadBackendError | withData<BetaWhatsappThread>;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        if (!test) revalidatePath("/dashboard/conversations/[queueId]", "page");
        return { data: result.data };
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.WRONG_FORMAT,
        BACKEND_MESSAGES.WRONG_FORMAT
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onAnswerConversation = async (
  formData: FieldValues,
  exchanges: BetaWhatsappExchange[],
  userId: string,
  threadId: string
) => {
  const schema = z.object({
    "exchange-0": z.unknown(),
    "exchange-1": z.unknown().optional(),
    "exchange-2": z.unknown().optional(),
    "exchange-3": z.unknown().optional(),
    "exchange-4": z.unknown().optional(),
  });

  const toBeParsed = formData;

  try {
    const valid = schema.parse(toBeParsed);

    if (valid && userId && exchanges && threadId) {
      const dataPayload = await Promise.all(
        exchanges.map(async (exchange, index) => {
          const content = (valid as any)[`exchange-${exchange.step ?? index}`];
          return {
            content,
            type: exchange.question?.type,
            exchangeId: exchange.id,
          };
        })
      );
      const result = (await createResponses<BetaWhatsappResponse[]>(
        {
          responses: dataPayload,
          userId,
          threadId,
        },
        0,
        true
      )) as PayloadBackendError | withData<BetaWhatsappResponse[]>;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        if (!test) revalidatePath("/dashboard");
        return { data: result.data };
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.WRONG_FORMAT,
        BACKEND_MESSAGES.WRONG_FORMAT
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onUpdateisPublic = async (userId: string, isPublic: boolean) => {
  try {
    if (userId && isPublic !== undefined) {
      const result = (await updateUser<BetaUser>(
        {
          userId,
          data: { isPublic },
        },
        0,
        true
      )) as withData<BetaUser> | PayloadBackendError;
      if (result && isPayloadError(result))
        throw new BackendError(result.type, result.message);
      else if (!result?.data)
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      else {
        revalidatePath("/");
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.MISSING_ARGUMENT,
      BACKEND_MESSAGES.MISSING_ARGUMENT
    );
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onCreateMeet = async (formData: FormData, jobId: string) => {
  const schema = z.object({
    firstnameCandidate: z.string().min(1),
    lastnameCandidate: z.string().min(1),
    emailCandidate: z.string().min(1),
    linkedinProfileIdCandidate: z.string(),
    phoneCandidate: z.string().optional(),
    firstnameRecruiter: z.string().min(1),
    lastnameRecruiter: z.string().min(1),
    emailRecruiter: z.string().min(1),
    linkedinProfileIdRecruiter: z.string(),
    phoneRecruiter: z.string().optional(),
    phonecode: z.string().optional(),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;

  let result;
  try {
    const valid = schema.parse(toBeParsed);

    if (valid && jobId) {
      // main

      result = (await createMeet<Meet>(
        {
          data: {
            firstnameCandidate: valid.firstnameCandidate,
            lastnameCandidate: valid.lastnameCandidate,
            emailCandidate: valid.emailCandidate,
            linkedinProfileIdCandidate: valid.linkedinProfileIdCandidate,
            phoneCandidate: {
              code: valid.phonecode,
              number: valid.phoneCandidate,
            },
            firstnameRecruiter: valid.firstnameRecruiter,
            lastnameRecruiter: valid.lastnameRecruiter,
            emailRecruiter: valid.emailRecruiter,
            linkedinProfileIdRecruiter: valid.linkedinProfileIdRecruiter,
            phoneRecruiter: {
              code: valid.phonecode,
              number: valid.phoneCandidate,
            },
            jobId,
          },
        },
        0,
        true
      )) as withData<Meet> | PayloadBackendError;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        revalidatePath("/backoffice/meets");
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.NOT_VALID,
      BACKEND_MESSAGES.NOT_VALID
    );
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });

    const zodErr = err.errors;
    revalidatePath("/backoffice/meets");
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onSendEmail = async (params: QuerySendEmailArgs["data"]) => {
  try {
    const result = await sendEmail({
      data: {
        ...params,
      },
    });

    if (result) {
      return { data: true };
    } else {
      throw new BackendError(
        BACKEND_ERRORS.PROCESSING,
        BACKEND_MESSAGES.PROCESSING
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return {
      status: err.status,
      error: true,
      type: err.type ? err.type : BACKEND_ERRORS.UNKNOWN,
      message: err.message ? err.message : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onCreateAffiliation = async (formData: FormData) => {
  try {
    const parentId = formData.get("parentId");
    const result = (await createAffiliation<Affiliation>(
      {
        parentId,
      },
      0,
      true
    )) as withData<Affiliation> | PayloadBackendError;
    if (result && isPayloadError(result)) {
      throw new BackendError(result.type, result.message);
    } else if (!result?.data) {
      throw new BackendError(
        BACKEND_ERRORS.PROCESSING,
        BACKEND_MESSAGES.PROCESSING
      );
    } else {
      revalidatePath("/backoffice/affiliations");
      return { data: result.data };
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });

    const zodErr = err.errors;
    revalidatePath("/backoffice/affiliations");
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};
export const onCreateChildUser = async (
  formData: FormData,
  parentId: string,
  childId: string,
  jobId: string
) => {
  const schema = z.object({
    firstnameChild: z.string().min(1),
    lastnameChild: z.string().min(1),
    emailChild: z.string().min(1),
    linkedinProfileIdChild: z.string(),
    phoneChild: z.string().optional(),
    phonecode: z.string().optional(),
    job: z.string().min(1),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;

  try {
    const valid = schema.parse(toBeParsed);

    if (valid) {
      const affiliation = (await getAffiliation<Affiliation>({
        parentId,
      })) as Affiliation;
      const result = (await createUser<BetaUser>(
        {
          data: {
            firstname: valid.firstnameChild,
            lastname: valid.lastnameChild,
            email: valid.emailChild,
            linkedinProfileId: valid.linkedinProfileIdChild,
            phone: { code: valid.phonecode, number: valid.phoneChild },
            affiliationId: affiliation?.id,
            job: jobId,
            childUserId: childId,
          },
        },
        0,
        true
      )) as withData<BetaUser> | PayloadBackendError;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        revalidatePath("/backoffice/users");
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.NOT_VALID,
      BACKEND_MESSAGES.NOT_VALID
    );
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });

    const zodErr = err.errors;
    revalidatePath("/backoffice/users");
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onCreateLead = async (formData: FormData) => {
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    linkedin: z.string().optional(),
    type: z.string().min(1),
    phone: z.string().optional(),
    phonecode: z.string().optional(),
    parentId: z.string().optional(),
    fr: z.string().optional(),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;

  try {
    const valid = schema.parse(toBeParsed);

    if (valid) {
      const fr = valid.fr === "on";
      const creates = {} as { [key: string]: any };
      if (valid.phone) {
        creates.phone = {
          code: valid.phonecode,
          number: valid.phone,
        };
      }
      if (valid.linkedin) creates.linkedinProfileId = valid.linkedin;
      if (valid.parentId) creates.parentId = valid.parentId;
      const result = (await createLead<Lead>(
        {
          data: {
            type: valid.type,
            email: valid.email.trim(),
            name: valid.name.trim(),
            fr,
            contacted: true,
            ...creates,
          },
        },
        0,
        true
      )) as PayloadBackendError | withData<Lead>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        revalidatePath("/backoffice");
        return { data: result.data };
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.NOT_VALID,
        BACKEND_MESSAGES.NOT_VALID
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });

    const zodErr = err.errors;
    revalidatePath("/backoffice/users");
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onDeleteLead = async (leadId: string) => {
  const lead = (await deleteLead<Lead>({ leadId }, 0)) as Lead;
  revalidatePath("/backoffice");
  return { lead };
};
export const onUpdateLead = async (updates: MutationUpdateLeadArgs["data"]) => {
  const lead = (await updateLead<Lead>({ data: updates }, 0)) as Lead;
  revalidatePath("/backoffice");
  return { lead };
};

export const onSendEmailToLead = async (leadsIds: string[]) => {
  try {
    const result = (await sendEmailToLead<Lead[]>({ leadsIds }, 0, true)) as
      | PayloadBackendError
      | withData<Lead[]>;

    if (result && isPayloadError(result)) {
      throw new BackendError(result.type, result.message);
    } else if (!result?.data) {
      throw new BackendError(
        BACKEND_ERRORS.PROCESSING,
        BACKEND_MESSAGES.PROCESSING
      );
    } else {
      revalidatePath("/backoffice");
      return { data: result.data };
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });

    const zodErr = err.errors;
    revalidatePath("/backoffice");
    revalidatePath("/backoffice/users");
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onDeleteOffer = async (id: string) => {
  const offer = (await deleteOffer<Offer>({ id })) as Offer;
  revalidatePath("/backoffice/offers");
  return { offer };
};

export const onCompanyForm = async (
  extras: {
    userId: string;
    companyId: string;
  },
  uploadedList: { logo?: AvatarInput; video?: AvatarInput }
): Promise<withData<string> | PayloadBackendError> => {
  try {
    const result = await saveFormDataPro(
      extras,
      uploadedList,
      extras.companyId
    );
    if (result && isPayloadError(result)) {
      throw new BackendError(result.type, result.message);
    } else {
      revalidatePath("/dashboard");
      revalidatePath("/formulaire-profil");
      return { data: "compte" };
    }
  } catch (err: any) {
    return { error: true, type: err.type, message: err.message };
  }
  // return result;
};

export const onOfferForm = async (
  handledData: OfferHandledData,
  companyId: string
): Promise<PayloadBackendError | withData<string>> => {
  try {
    const result = (await createOffer<Offer>(
      {
        data: { companyId, ...handledData },
      },
      0,
      true
    )) as PayloadBackendError | withData<Offer>;

    if (result && isPayloadError(result)) {
      throw new BackendError(result.type, result.message);
    } else {
      revalidatePath("/dashboard");
      revalidatePath("/compte");
      revalidatePath("/creer-offre");

      return { data: "dashboard" };
    }
  } catch (err: any) {
    return { error: true, type: err.type, message: err.message };
  }
};

export const onUnlockCandidate = async (args: {
  originId: string;
  targetId: string;
  cardPrice: number;
}): Promise<PayloadBackendError | withData<BetaUser>> => {
  const schema = z.object({
    originId: z.string().min(1),
    targetId: z.string().min(1),
    cardPrice: z.number().nonnegative(),
  });
  const { originId, targetId, cardPrice } = args;
  try {
    const valid = schema.parse({ originId, targetId, cardPrice });
    if (valid) {
      const result = (await unlock<BetaUser>(
        {
          data: { originId, targetId, credit: cardPrice },
        },
        0,
        true
      )) as PayloadBackendError | withData<BetaUser>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        revalidatePath("/");
        revalidatePath("/dashboard");
        return { data: result.data };
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.MISSING_ARGUMENT,
        BACKEND_MESSAGES.MISSING_ARGUMENT
      );
    }
  } catch (err: any) {
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onDeleteNotification = async (
  id: string,
  type: "s" | "o" | "i-o"
): Promise<withData<boolean> | PayloadBackendError> => {
  try {
    if (type === "s") {
      const result = (await deleteProfileSharing<ProfileSharing>(
        { id },
        0,
        true
      )) as PayloadBackendError | withData<ProfileSharing>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        revalidatePath("/dashboard");
        return { data: true };
      }
    } else if (type === "o") {
      const result = (await deleteOffer<Offer>({ id }, 0, true)) as
        | PayloadBackendError
        | withData<boolean>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        revalidatePath("/dashboard");
        return { data: true };
      }
    } else if (type === "i-o") {
      const result = (await deleteInterviewOffer<InterviewOffer>(
        { id },
        0,
        true
      )) as PayloadBackendError | withData<InterviewOffer>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        revalidatePath("/dashboard");
        return { data: true };
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.MISSING_ARGUMENT,
        BACKEND_MESSAGES.MISSING_ARGUMENT
      );
    }
  } catch (err: any) {
    return { error: true, type: err.type, message: err.message };
  }
};

export const onAddConversationTheme = async (
  themes: ConversationTheme[],
  extras: {
    targetId: string;
    originId: string;
    jobId: string;
    offerId: string;
    companyName: string;
    candidateName: string;
  }
): Promise<withData<boolean> | PayloadBackendError> => {
  const schema = z.object({
    type: z.string().min(1),
    prefix: z.string().optional(),
    text: z.string().min(1),
  });
  let valid = true;

  try {
    for (let i = 0; i < themes.length; i++) {
      const theme = themes[i];
      if (!schema.parse(theme)) valid = false;
      continue;
    }
    const targetId = extras.targetId;
    const originId = extras.originId;
    const offerTargetId = extras.offerId;
    const jobId = extras.jobId;
    const companyName = extras.companyName;
    const candidateName = extras.candidateName;

    if (targetId && originId && jobId && companyName && candidateName) {
      if (valid) {
        const result = (await createConversation<BetaQueue>(
          {
            data: {
              jobId,
              originId,
              targetId,
              questions: themes,
              offerTargetId,
              companyName,
              candidateName,
            },
          },
          0,
          true
        )) as PayloadBackendError | withData<BetaQueue>;

        if (result && isPayloadError(result)) {
          throw new BackendError(result.type, result.message);
        } else if (result.data) {
          throw new BackendError(
            BACKEND_ERRORS.PROCESSING,
            BACKEND_MESSAGES.PROCESSING
          );
        } else {
          revalidatePath("/profils/[candidateName]", "page");
          return { data: true };
        }
      } else {
        throw new BackendError(
          BACKEND_ERRORS.WRONG_FORMAT,
          BACKEND_MESSAGES.WRONG_FORMAT
        );
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.MISSING_ARGUMENT,
        BACKEND_MESSAGES.MISSING_ARGUMENT
      );
    }
  } catch (err: any) {
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onAddCustomisation = async (
  originId: string,
  jobId: string
): Promise<PayloadBackendError | withData<Customisation>> => {
  try {
    if (originId && jobId) {
      const result = (await createCustomisation<Customisation>(
        { jobId, originId },
        0,
        true
      )) as PayloadBackendError | withData<Customisation>;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.MISSING_ARGUMENT,
      BACKEND_MESSAGES.MISSING_ARGUMENT
    );
  } catch (err: any) {
    return { error: true, type: err.type, message: err.message };
  }
};

export const onAddQuestion = async (
  theme: ConversationTheme,
  extras: {
    originId: string;
    jobId: string;
    companyName: string;
    candidateName: string;
    customisationId: string;
  }
): Promise<PayloadBackendError | withData<Question>> => {
  const schema = z.object({
    type: z.string().min(1),
    prefix: z.string().optional(),
    text: z.string().min(1),
  });

  try {
    const valid = schema.parse(theme);
    const { originId, jobId, companyName, candidateName, customisationId } =
      extras;
    if (
      valid &&
      originId &&
      jobId &&
      companyName &&
      candidateName &&
      customisationId
    ) {
      const result = (await createQuestion<Question>(
        {
          data: {
            originId,
            jobId,
            companyName,
            candidateName,
            question: theme,
            customisationId,
          },
        },
        0,
        true
      )) as PayloadBackendError | withData<Question>;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.MISSING_ARGUMENT,
      BACKEND_MESSAGES.MISSING_ARGUMENT
    );
  } catch (err: any) {
    return { error: true, type: err.type, message: err.message };
  }
};

export const onAddQueue = async (extras: {
  originId: string;
  targetId: string;
  offerId: string;
  jobId: string;
  customisationId: string;
}) => {
  try {
    const { originId, jobId, customisationId, targetId, offerId } = extras;
    if (originId && jobId && customisationId && targetId && offerId) {
      const result = (await createQueue<BetaQueue>(
        {
          data: {
            originId,
            jobId,
            customisationId,
            offerTargetId: offerId,
            targetId,
          },
        },
        0,
        true
      )) as PayloadBackendError | withData<BetaQueue>;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.MISSING_ARGUMENT,
      BACKEND_MESSAGES.MISSING_ARGUMENT
    );
  } catch (err: any) {
    return { error: true, type: err.type, message: err.message };
  }
};

export const onCancelConversation = async (
  id: string,
  data: { status: "pending" | "cancelled" | "valid" }
): Promise<withData<BetaQueue> | PayloadBackendError> => {
  try {
    if (id) {
      const result = (await updateQueue<BetaQueue>({ id, data }, 0, true)) as
        | PayloadBackendError
        | withData<BetaQueue>;
      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        revalidatePath("/profils/[candidateName]", "page");
        return { data: result.data };
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.MISSING_ARGUMENT,
        BACKEND_MESSAGES.MISSING_ARGUMENT
      );
    }
  } catch (err: any) {
    return { error: true, type: err.type, message: err.message };
  }
};

export const onRefuseApplication = async (
  formData: FormData,
  extras: {
    originId: string;
    targetId: string;
    sharingId: string;
    offerId: string;
    originUserId: string;
  }
) => {
  const schema = z.object({
    type: z.string().min(1),
    reason: z.string().optional(),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;

  try {
    const valid = schema.parse(toBeParsed);
    const { originId, targetId, sharingId, offerId, originUserId } = extras;

    if (originId && targetId && sharingId && offerId && originUserId) {
      const result = (await createSharingRefusal<SharingRefusal>(
        {
          data: {
            type: valid.type,
            reason: valid.reason,
            originId,
            targetId,
            sharingId,
            offerId,
            originUserId,
          },
        },
        0,
        true
      )) as withData<SharingRefusal> | PayloadBackendError;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        return { data: result.data };
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.MISSING_ARGUMENT,
      BACKEND_MESSAGES.MISSING_ARGUMENT
    );
  } catch (err: any) {
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
};

export const onTranscriptVideo = async (
  videoId: string
): Promise<PayloadBackendError | withData<Video>> => {
  try {
    if (videoId) {
      const result = (await getVideo<Video>({ id: videoId }, 0, true)) as
        | PayloadBackendError
        | withData<Video>;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        const result2 = await fetch(`${uri}/api/transcript`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ video: result.data }),
        });
        const json = await result2.json();
        if (json.success) {
          revalidatePath("/dashboard");
          revalidatePath("/profils/[candidateName]", "page");
          return { data: json.message };
        } else {
          throw new BackendError(BACKEND_ERRORS.PROCESSING, json.message);
        }
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.MISSING_ARGUMENT,
        BACKEND_MESSAGES.MISSING_ARGUMENT
      );
    }
  } catch (err: any) {
    return { error: true, type: err.type, message: err.message };
  }
};
export const onAnalyzeVideo = async (
  videoId: string
): Promise<PayloadBackendError | withData<string>> => {
  try {
    if (videoId) {
      const result = (await getVideo<Video>({ id: videoId }, 0, true)) as
        | PayloadBackendError
        | withData<Video>;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        const result2 = await analyseVideo(result.data, cookies().getAll());
        if (result2.success) {
          revalidatePath("/dashboard");
          revalidatePath("/profils/[candidateName]", "page");
          return { data: result2.message };
        } else {
          throw new BackendError(BACKEND_ERRORS.PROCESSING, result2.message);
        }
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.MISSING_ARGUMENT,
        BACKEND_MESSAGES.MISSING_ARGUMENT
      );
    }
  } catch (err: any) {
    return { error: true, type: err.type, message: err.message };
  }
};

export const generateCV = async (formData: FormData) => {
  const schema = z.object({
    job: z.string().min(1),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;

  try {
    const valid = schema.parse(toBeParsed);

    if (valid) {
      const response = await fetch(`${uri}/api/generateCV`, {
        body: JSON.stringify({ job: valid.job }),
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.ok ? "done" : response.ok);
      const result = await response.arrayBuffer();
      return result;
    }
  } catch (err: any) {
    console.log(err, "err");
  }
};

export const searchSomeoneRequest = async (formData: FormData) => {
  const schema = z.object({
    search: z.string().min(1),
  });

  const obj = Object.fromEntries(
    Object.entries(Object.fromEntries(formData.entries())).map((entry) => [
      entry[0],
      entry[1].toString().trim(),
    ])
  );

  const toBeParsed = obj;

  let result: BetaUser = {};
  try {
    const valid = schema.parse(toBeParsed);

    if (valid) {
      result = (await searchSomeone<BetaUser>({
        fullname: valid.search,
      })) as BetaUser;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result || !result?.uniqueName) {
        throw new BackendError(
          BACKEND_ERRORS.NO_USER,
          BACKEND_MESSAGES.NO_USER
        );
      }
    }
  } catch (err: any) {
    console.log(err, "err");
    const zodErr = err.errors;
    return {
      status: err.status,
      error: true,
      type:
        zodErr && zodErr[0].code === "invalid_type"
          ? BACKEND_ERRORS.DATATYPE_INVALID
          : err.type
          ? err.type
          : BACKEND_ERRORS.UNKNOWN,
      message:
        zodErr && zodErr[0].code === "invalid_type"
          ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
          : err.message
          ? err.message
          : BACKEND_MESSAGES.UNKNOWN,
    };
  }
  redirect(`/${result.uniqueName}`);
};
