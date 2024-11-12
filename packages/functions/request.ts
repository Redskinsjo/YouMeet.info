"use server";
import {
  CreateCandidateMutationVariables,
  GetAccountInfosQueryVariables,
  GetArticlesQueryVariables,
  GetCompetenciesQueryVariables,
  GetOffersQueryVariables,
  GetOneOfferQueryVariables,
  GetOneUserExperiencesQueryVariables,
  MutationCreateCandidateBasicArgs,
  MutationCreateClassicAccountArgs,
  MutationCreateCompanyProfileArgs,
  MutationCreateConversationArgs,
  MutationCreateCustomisationArgs,
  MutationCreateDetailsArgs,
  MutationCreateErrorArgs,
  MutationCreateFeedbackArgs,
  MutationCreateLeadArgs,
  MutationCreateMeetArgs,
  MutationCreateNotificationArgs,
  MutationCreateOfferArgs,
  MutationCreateProAccountArgs,
  MutationCreateProfileSharingArgs,
  MutationCreateProfileViewArgs,
  MutationCreateQuestionArgs,
  MutationCreateQueueArgs,
  MutationCreateResponsesArgs,
  MutationCreateSharingRefusalArgs,
  MutationCreateThreadArgs,
  MutationCreateUserArgs,
  MutationDeleteCompanyArgs,
  MutationDeleteInterviewOfferArgs,
  MutationDeleteLeadArgs,
  MutationDeleteMeetArgs,
  MutationDeleteOfferArgs,
  MutationDeleteProfileSharingArgs,
  MutationDeleteVideoArgs,
  MutationSubmitVideoArgs,
  MutationUnlockArgs,
  MutationUpdateLeadArgs,
  MutationUpdateMeetArgs,
  MutationUpdateQueueArgs,
  MutationUpdateUserArgs,
  MutationUpdateVideoArgs,
  QueryAffiliationArgs,
  QueryCompaniesArgs,
  QueryJobsArgs,
  QueryLeadFormResponsesArgs,
  QueryMeetsArgs,
  QueryMyFavoritesArgs,
  QueryMyReferencesArgs,
  QueryMyUnlockedUsersArgs,
  QueryMyVideosArgs,
  QueryOneArticleArgs,
  QueryOneCandidateArgs,
  QueryOneCompanyArgs,
  QueryOneDetailsArgs,
  QueryOneCompetencyArgs,
  QueryOneJobArgs,
  QueryOneLeadArgs,
  QueryOneMeetArgs,
  QueryOneMeetCandidateArgs,
  QueryOneNotificationArgs,
  QueryOneOfferArgs,
  QueryOneProfileSharingArgs,
  QueryOneQueueArgs,
  QueryOneVideoArgs,
  QueryProfileViewsArgs,
  QueryResetEmailLinkArgs,
  QueryResetPasswordArgs,
  QuerySendEmailArgs,
  QuerySendEmailOfferOpportunitiesArgs,
  QuerySendEmailToLeadArgs,
  QueryUserArgs,
  QueryUsersArgs,
  QueryVideoByPublicIdArgs,
  QueryCompetenciesArgs,
} from "@youmeet/gql/generated";
import {
  GetOfferQuery,
  createAffiliationMutation,
  createCandidateBasicMutation,
  createCandidateMutation,
  createClassicAccountMutation,
  createCompanyProfileMutation,
  createConversationMutation,
  createCustomisationMutation,
  createDetailsMutation,
  createErrorMutation,
  createFeedbackMutation,
  createLeadMutation,
  createMeetMutation,
  createNotificationMutation,
  createOfferMutation,
  createProAccountMutation,
  createProfileSharingMutation,
  createProfileViewMutation,
  createQuestionMutation,
  createQueueMutation,
  createResponsesMutation,
  createSharingRefusalMutation,
  createThreadMutation,
  createUserMutation,
  deleteAffiliationMutation,
  deleteCompanyMutation,
  deleteInterviewOfferMutation,
  deleteLeadMutation,
  deleteMeetMutation,
  deleteOfferMutation,
  deleteProfileSharingMutation,
  deleteVideoMutation,
  errorsQuery,
  getAccountInfosQuery,
  getAffiliationQuery,
  getAffiliationsQuery,
  getArticleMetadataQuery,
  getArticleQuery,
  getArticlesParamsQuery,
  getArticlesQuery,
  getCandidateQuery,
  getCompaniesQuery,
  getCompanyQuery,
  getCompetenciesParamsQuery,
  getCompetenciesQuery,
  getCompetenciesTitleQuery,
  getCompetencyMetadataQuery,
  getCompetencyQuery,
  getCompetencySlugQuery,
  getHomeCompetenciesQuery,
  getHomeOffersQuery,
  getJobQuery,
  getJobsQuery,
  getLeadFormResponsesQuery,
  getLeadQuery,
  getLeadsQuery,
  getMeetCandidateQuery,
  getMeetCandidatesQuery,
  getMeetsParamsQuery,
  getMeetsQuery,
  getMyFavoritesQuery,
  getMyReferencesQuery,
  getMyUnlockedUsersQuery,
  getMyVideosQuery,
  getNotificationQuery,
  getOfferMetadataQuery,
  getOffersParamsQuery,
  getOffersQuery,
  getOneDetailsQuery,
  getOneMeetQuery,
  getOneQueueQuery,
  getProfileViewsQuery,
  getRawUserQuery,
  getSharingQuery,
  getSimpleCompanyQuery,
  getSimpleUserQuery,
  getUserCandidateQuery,
  getUserExperiencesQuery,
  getUserMetadataQuery,
  getUserQuery,
  getUserRemarksQuery,
  getUsersParamsQuery,
  getUsersQuery,
  getVideoQuery,
  getVideosQuery,
  ownQueuesParamsQuery,
  resetEmailLinkQuery,
  resetPasswordQuery,
  searchSomeoneQuery,
  sendEmailOfferOpportunitiesQuery,
  sendEmailQuery,
  sendEmailToLeadQuery,
  submitVideoMutation,
  unlockMutation,
  updateLeadMutation,
  updateMeetMutation,
  updateQueueMutation,
  updateUserMutation,
  updateVideoMutation,
  videoByPublicIdQuery,
} from "./queries";
import { dev, uri } from "./imports";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
  PayloadBackendSuccess,
  Result,
  ResultNotHandled,
  withData,
} from "@youmeet/types/api/backend";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import { isNotHandledReq, isPayloadError } from "@youmeet/types/TypeGuards";
import { AES } from "crypto-js";
import {
  OffreEmploiFT,
  OffreEmploiFTParams,
} from "@youmeet/types/api/OffreEmploiFT";
import { getAccessTokenFT } from "./browserRequests";

export const createError = async <T>(
  variables?: MutationCreateErrorArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createError",
    multiple,
    createErrorMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

const req = async <T>(
  params: { query: string; variables?: any },
  revalidate: number = 30
): Promise<withData<T> | PayloadBackendError> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller?.abort(), 10000);
  try {
    const nextParams = {} as { next?: { revalidate: number } };
    if (process.env.SCRIPT === undefined) nextParams.next = { revalidate };

    const encrypt = AES.encrypt("app", `${process.env.JWT_SECRET}`).toString();
    const response = await fetch(`${uri}/api/server`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-domain-youmeet": encrypt,
        origin: "https://www.youmeet.info",
      },
      mode: "same-origin",
      credentials: "same-origin",
      ...nextParams,
      body: JSON.stringify(params),
      signal: controller?.signal,
    });
    const json = await response.json();
    if (response.ok) {
      clearTimeout(timeoutId);
      if (json) {
        if (!json.errors) {
          return { data: json };
        }
        console.log(json.errors, "errors");
        console.log(json.errors[0].extensions, "extensions");
        throw new BackendError(
          BACKEND_ERRORS.REQUEST_FEEDBACK,
          BACKEND_MESSAGES.REQUEST_FEEDBACK,
          response.status
        );
      }
      throw new BackendError(
        BACKEND_ERRORS.JSON_NOT_VALID,
        BACKEND_MESSAGES.JSON_NOT_VALID,
        response.status
      );
    }
    throw new BackendError(
      BACKEND_ERRORS.PROCESSING,
      json.errors ? json.errors[0].message : response.statusText,
      response.status
    );
  } catch (err: any) {
    const queryRegex = new RegExp(/(?<=query|mutation)[^{]+(?=\(|{)/gm);
    const match = params.query.match(queryRegex);

    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: match && match[0] ? match[0].trim() : "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return {
      type: err.type ?? BACKEND_ERRORS.UNKNOWN,
      message: err.message,
      status: err.status,
      error: true,
    };
  }
};

const reqFT = async <T>(
  uri: string,
  scope: string,
  params: string = "",
  revalidate: number = 30
): Promise<withData<T> | PayloadBackendError> => {
  console.log("reqFT");
  try {
    const credentials = (await getAccessTokenFT(scope)) as
      | withData<{ access_token: string }>
      | PayloadBackendError;

    console.log(credentials, "credentials");

    if (credentials && isPayloadError(credentials)) {
      throw new BackendError(credentials.type, credentials.message);
    } else {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller?.abort(), 10000);
      const nextParams = {} as { next?: { revalidate: number } };
      if (process.env.SCRIPT === undefined) nextParams.next = { revalidate };

      const urlParams = `${params ? `?${params}` : ""}`;
      const response = await fetch(`${uri}${urlParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.data.access_token}`,
          Accept: "application/json",
          origin: "https://www.youmeet.info",
        },
        mode: "same-origin",
        credentials: "same-origin",
        ...nextParams,
        signal: controller?.signal,
      });
      const json = await response.json();
      if (response.ok) {
        clearTimeout(timeoutId);
        if (json) {
          if (!json.errors) {
            return { data: json as T };
          }
          console.log(json.errors, "errors");
          console.log(json.errors[0].extensions, "extensions");
          throw new BackendError(
            BACKEND_ERRORS.REQUEST_FEEDBACK,
            BACKEND_MESSAGES.REQUEST_FEEDBACK,
            response.status
          );
        }
        throw new BackendError(
          BACKEND_ERRORS.JSON_NOT_VALID,
          BACKEND_MESSAGES.JSON_NOT_VALID,
          response.status
        );
      }
      throw new BackendError(
        BACKEND_ERRORS.PROCESSING,
        json.errors ? json.errors[0].message : response.statusText,
        response.status
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "FT request",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return {
      type: err.type ?? BACKEND_ERRORS.UNKNOWN,
      message: err.message,
      status: err.status,
      error: true,
    };
  }
};

async function reqFnc<T>(
  path: string,
  multiple: boolean = false,
  query: string,
  variables?: any,
  revalidate: number = 30,
  handling: true | undefined = undefined
): Promise<PayloadBackendError | PayloadBackendSuccess<T>> {
  const params = { query } as { query: string; variables?: any };
  if (variables) params.variables = variables;
  const res = await req<T>(params, revalidate);
  if (res && isPayloadError(res)) {
    if (isNotHandledReq<T>(handling, res))
      return { data: multiple ? [] : undefined } as withData<
        never[] | undefined
      >;
    else return res;
  } else {
    const data = (res.data as withData<{ [path in string]: T }>).data;
    const result = data[path];
    return { data: result } as withData<T>;
  }
}

async function reqFTFnc<T, S>(
  uri: string,
  multiple: boolean = false,
  search: S,
  scope: string,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<PayloadBackendError | PayloadBackendSuccess<T>> {
  console.log("reqFTFnc");
  const params = new URLSearchParams(
    search as { [key: string]: string }
  ).toString();

  const res = await reqFT<T>(uri, scope, params, revalidate);
  if (res && isPayloadError(res)) {
    if (isNotHandledReq<T>(handling, res))
      return { data: multiple ? [] : undefined } as withData<
        never[] | undefined
      >;
    else return res;
  } else {
    const data = res.data as withData<{ [path in string]: T }>;
    return { data } as withData<T>;
  }
}

////// params
export const getUsersParams = async <T>(
  variables?: QueryUsersArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc<T>(
    "users",
    multiple,
    getUsersParamsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getMeetsParams = async <T>(
  variables?: QueryMeetsArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc<T>(
    "meets",
    multiple,
    getMeetsParamsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getOffersParams = async <T>(
  variables: any = undefined,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "offers",
    multiple,
    getOffersParamsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getArticlesParams = async <T>(
  variables: any = undefined,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "articles",
    multiple,
    getArticlesParamsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getCompetenciesParams = async <T>(
  variables: any = undefined,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "competencies",
    multiple,
    getCompetenciesParamsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const ownQueuesParams = async <T>(
  variables: any = undefined,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "ownQueues",
    multiple,
    ownQueuesParamsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

////// metadata
export const getUserMetadata = async <T>(
  variables?: QueryUserArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "user",
    multiple,
    getUserMetadataQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getCompetencyMetadata = async <T>(
  variables?: QueryOneCompetencyArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneCompetency",
    multiple,
    getCompetencyMetadataQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getArticleMetadata = async <T>(
  variables?: QueryOneArticleArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneArticle",
    multiple,
    getArticleMetadataQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getOfferMetadata = async <T>(
  variables?: QueryOneOfferArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneOffer",
    multiple,
    getOfferMetadataQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

////// every

export const getUsers = async <T>(
  variables?: QueryUsersArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "users",
    multiple,
    getUsersQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getUser = async <T>(
  variables?: QueryUserArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "user",
    multiple,
    getUserQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getRawUser = async <T>(
  variables?: QueryUserArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "user",
    multiple,
    getRawUserQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getLeads = async <T>(
  variables: any = undefined,
  revalidate: number = 30,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "leads",
    multiple,
    getLeadsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getUserRemarks = async <T>(
  variables: any = undefined,
  revalidate: number = 30,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "remarks",
    multiple,
    getUserRemarksQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getLeadFormResponses = async <T>(
  variables?: QueryLeadFormResponsesArgs,
  revalidate: number = 30,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "leadFormResponses",
    multiple,
    getLeadFormResponsesQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getOffers = async <T>(
  variables?: GetOffersQueryVariables,
  revalidate: number = 30,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "offers",
    multiple,
    getOffersQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getHomeOffers = async <T>(
  variables?: GetOffersQueryVariables,
  revalidate: number = 30,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "offers",
    multiple,
    getHomeOffersQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getOffer = async <T>(
  variables?: GetOneOfferQueryVariables,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneOffer",
    multiple,
    GetOfferQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getAccountInfos = async <T>(
  variables?: GetAccountInfosQueryVariables,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "accountInfos",
    multiple,
    getAccountInfosQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getUserExperiences = async <T>(
  variables?: GetOneUserExperiencesQueryVariables,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "oneUserExperiences",
    multiple,
    getUserExperiencesQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createCompanyProfile = async <T>(
  variables: MutationCreateCompanyProfileArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createCompanyProfile",
    multiple,
    createCompanyProfileMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createCandidate = async <T>(
  variables?: CreateCandidateMutationVariables,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createCandidate",
    multiple,
    createCandidateMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getCompetency = async <T>(
  variables?: QueryOneCompetencyArgs,
  revalidate: number = 30,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneCompetency",
    multiple,
    getCompetencyQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getCompetencies = async <T>(
  variables?: GetCompetenciesQueryVariables,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "competencies",
    multiple,
    getCompetenciesQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getHomeCompetencies = async <T>(
  variables?: GetCompetenciesQueryVariables,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "competencies",
    multiple,
    getHomeCompetenciesQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getArticle = async <T>(
  variables?: QueryOneArticleArgs,
  revalidate: number = 30,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneArticle",
    multiple,
    getArticleQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getArticles = async <T>(
  variables?: GetArticlesQueryVariables,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "articles",
    multiple,
    getArticlesQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const updateUser = async <T>(
  variables?: MutationUpdateUserArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "updateUser",
    multiple,
    updateUserMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const deleteVideo = async <T>(
  variables?: MutationDeleteVideoArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "deleteVideo",
    multiple,
    deleteVideoMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const submitVideo = async <T>(
  variables?: MutationSubmitVideoArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "submitVideo",
    multiple,
    submitVideoMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createFeedback = async <T>(
  variables?: MutationCreateFeedbackArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createFeedback",
    multiple,
    createFeedbackMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createCandidateBasic = async <T>(
  variables?: MutationCreateCandidateBasicArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createCandidateBasic",
    multiple,
    createCandidateBasicMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getCompetencySlug = async <T>(
  variables?: QueryOneCompetencyArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneCompetency",
    multiple,
    getCompetencySlugQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getNotification = async <T>(
  variables?: QueryOneNotificationArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneNotification",
    multiple,
    getNotificationQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getLead = async <T>(
  variables?: QueryOneLeadArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneLead",
    multiple,
    getLeadQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getCompany = async <T>(
  variables?: QueryOneCompanyArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneCompany",
    multiple,
    getCompanyQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const unlock = async <T>(
  variables: MutationUnlockArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "unlock",
    multiple,
    unlockMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createOffer = async <T>(
  variables: MutationCreateOfferArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createOffer",
    multiple,
    createOfferMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getCompanies = async <T>(
  variables?: QueryCompaniesArgs,
  revalidate: number = 30,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "companies",
    multiple,
    getCompaniesQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createProAccount = async <T>(
  variables?: MutationCreateProAccountArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createProAccount",
    multiple,
    createProAccountMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const deleteCompany = async <T>(
  variables?: MutationDeleteCompanyArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "deleteCompany",
    multiple,
    deleteCompanyMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getOneDetails = async <T>(
  variables?: QueryOneDetailsArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneDetails",
    multiple,
    getOneDetailsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createDetails = async <T>(
  variables?: MutationCreateDetailsArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createDetails",
    multiple,
    createDetailsMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createUser = async <T>(
  variables?: MutationCreateUserArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createUser",
    multiple,
    createUserMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const resetEmailLink = async <T>(
  variables?: QueryResetEmailLinkArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "resetEmailLink",
    multiple,
    resetEmailLinkQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getJob = async <T>(
  variables?: QueryOneJobArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneJob",
    multiple,
    getJobQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createProfileSharing = async <T>(
  variables?: MutationCreateProfileSharingArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createProfileSharing",
    multiple,
    createProfileSharingMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const createNotification = async <T>(
  variables?: MutationCreateNotificationArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createNotification",
    multiple,
    createNotificationMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const resetPassword = async <T>(
  variables?: QueryResetPasswordArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "resetPassword",
    multiple,
    resetPasswordQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createConversation = async <T>(
  variables?: MutationCreateConversationArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createConversation",
    multiple,
    createConversationMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const updateQueue = async <T>(
  variables?: MutationUpdateQueueArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "updateQueue",
    multiple,
    updateQueueMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createCustomisation = async <T>(
  variables?: MutationCreateCustomisationArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createCustomisation",
    multiple,
    createCustomisationMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createQuestion = async <T>(
  variables?: MutationCreateQuestionArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createQuestion",
    multiple,
    createQuestionMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createQueue = async <T>(
  variables?: MutationCreateQueueArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createQueue",
    multiple,
    createQueueMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createSharingRefusal = async <T>(
  variables?: MutationCreateSharingRefusalArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createSharingRefusal",
    multiple,
    createSharingRefusalMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getVideo = async <T>(
  variables?: QueryOneVideoArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneVideo",
    multiple,
    getVideoQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createClassicAccount = async <T>(
  variables?: MutationCreateClassicAccountArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createClassicAccount",
    multiple,
    createClassicAccountMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getSimpleCompany = async <T>(
  variables: QueryOneCompanyArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneCompany",
    multiple,
    getSimpleCompanyQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getOneQueue = async <T>(
  variables: QueryOneQueueArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneQueue",
    multiple,
    getOneQueueQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createThread = async <T>(
  variables: MutationCreateThreadArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createThread",
    multiple,
    createThreadMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const createResponses = async <T>(
  variables: MutationCreateResponsesArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "createResponses",
    multiple,
    createResponsesMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getErrors = async <T>(
  variables = {},
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "errors",
    multiple,
    errorsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getProfileViews = async <T>(
  variables: QueryProfileViewsArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "profileViews",
    multiple,
    getProfileViewsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const createProfileView = async <T>(
  variables: MutationCreateProfileViewArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createProfileView",
    multiple,
    createProfileViewMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getMyVideos = async <T>(
  variables: QueryMyVideosArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "myVideos",
    multiple,
    getMyVideosQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getVideos = async <T>(
  variables: any = undefined,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "videos",
    multiple,
    getVideosQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const sendEmailOfferOpportunities = async <T>(
  variables: QuerySendEmailOfferOpportunitiesArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "sendEmailOfferOpportunities",
    multiple,
    sendEmailOfferOpportunitiesQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getMeets = async <T>(
  variables: any = undefined,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "meets",
    multiple,
    getMeetsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getOneMeet = async <T>(
  variables: QueryOneMeetArgs,
  revalidate: number = 30,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneMeet",
    multiple,
    getOneMeetQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const deleteMeet = async <T>(
  variables: MutationDeleteMeetArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "deleteMeet",
    multiple,
    deleteMeetMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const createMeet = async <T>(
  variables: MutationCreateMeetArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createMeet",
    multiple,
    createMeetMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getSimpleUser = async <T>(
  variables: QueryUserArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "user",
    multiple,
    getSimpleUserQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getMeetCandidates = async <T>(
  variables: any = undefined,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "meetCandidates",
    multiple,
    getMeetCandidatesQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getMeetCandidate = async <T>(
  variables: QueryOneMeetCandidateArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneMeetCandidate",
    multiple,
    getMeetCandidateQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const updateMeet = async <T>(
  variables: MutationUpdateMeetArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "updateMeet",
    multiple,
    updateMeetMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const sendEmail = async <T>(
  variables: QuerySendEmailArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "sendEmail",
    multiple,
    sendEmailQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const GetMyUnlockedUsers = async <T>(
  variables: QueryMyUnlockedUsersArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "myUnlockedUsers",
    multiple,
    getMyUnlockedUsersQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getMyFavorites = async <T>(
  variables: QueryMyFavoritesArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "myFavorites",
    multiple,
    getMyFavoritesQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getJobs = async <T>(
  variables: QueryJobsArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "jobs",
    multiple,
    getJobsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const updateVideo = async <T>(
  variables: MutationUpdateVideoArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "updateVideo",
    multiple,
    updateVideoMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getCandidate = async <T>(
  variables?: QueryOneCandidateArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneCandidate",
    multiple,
    getCandidateQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getSharing = async <T>(
  variables?: QueryOneProfileSharingArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "oneProfileSharing",
    multiple,
    getSharingQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getAffiliations = async <T>(
  variables: any = undefined,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "affiliations",
    multiple,
    getAffiliationsQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const deleteAffiliation = async <T>(
  variables: any = undefined,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "deleteAffiliation",
    multiple,
    deleteAffiliationMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const createAffiliation = async <T>(
  variables: any = undefined,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createAffiliation",
    multiple,
    createAffiliationMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getAffiliation = async <T>(
  variables: QueryAffiliationArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "affiliation",
    multiple,
    getAffiliationQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const getMyReferences = async <T>(
  variables: QueryMyReferencesArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "myReferences",
    multiple,
    getMyReferencesQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const createLead = async <T>(
  variables: MutationCreateLeadArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "createLead",
    multiple,
    createLeadMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const deleteLead = async <T>(
  variables: MutationDeleteLeadArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "deleteLead",
    multiple,
    deleteLeadMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const updateLead = async <T>(
  variables: MutationUpdateLeadArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "updateLead",
    multiple,
    updateLeadMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const sendEmailToLead = async <T>(
  variables: QuerySendEmailToLeadArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "sendEmailToLead",
    multiple,
    sendEmailToLeadQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const deleteOffer = async <T>(
  variables: MutationDeleteOfferArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "deleteOffer",
    multiple,
    deleteOfferMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const deleteInterviewOffer = async <T>(
  variables: MutationDeleteInterviewOfferArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "deleteInterviewOffer",
    multiple,
    deleteInterviewOfferMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const deleteProfileSharing = async <T>(
  variables: MutationDeleteProfileSharingArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "deleteProfileSharing",
    multiple,
    deleteProfileSharingMutation,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
export const videoByPublicId = async <T>(
  variables: QueryVideoByPublicIdArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "videoByPublicId",
    multiple,
    videoByPublicIdQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getUserCandidate = async <T>(
  variables: QueryUserArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "user",
    multiple,
    getUserCandidateQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const searchSomeone = async <T>(
  variables: QueryUserArgs,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = false;
  const result = await reqFnc(
    "user",
    multiple,
    searchSomeoneQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getCompetenciesTitle = async <T>(
  variables: QueryCompetenciesArgs,
  revalidate: number = 1000,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  const multiple = true;
  const result = await reqFnc(
    "competencies",
    multiple,
    getCompetenciesTitleQuery,
    variables,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};

export const getOffersFT = async <T>(
  search: OffreEmploiFTParams,
  revalidate: number = 0,
  handling: true | undefined = undefined
): Promise<Result<T>> => {
  console.log("getOffersFT");
  const multiple = true;
  const endpoint =
    "https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search";
  const uri = endpoint;
  const scope = "o2dsoffre api_offresdemploiv2";
  const result = await reqFTFnc<T, OffreEmploiFTParams>(
    uri,
    multiple,
    search,
    scope,
    revalidate,
    handling
  );
  if (isNotHandledReq<T>(handling, result)) {
    return result.data as ResultNotHandled<T>;
  } else return result as PayloadBackendError | PayloadBackendSuccess<T>;
};
