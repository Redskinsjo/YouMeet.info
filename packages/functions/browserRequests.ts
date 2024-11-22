import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
  withData,
} from "@youmeet/types/api/backend";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import { handleActionError } from "@youmeet/utils/basics/handleActionError";
import { uri } from "./imports";
import { OffreEmploiFTParams } from "@youmeet/types/api/OffreEmploiFT";
import { isPayloadError } from "@youmeet/types/TypeGuards";

type OffreEmploiFTBody = { type: "search" | "id"; id?: string; token?: string };
type JobsFTBody = { token: string };
type FTAuthToken = { access_token: string; expires: number; scope: string };

export const getAccessTokenFT = async (
  scope: string
): Promise<PayloadBackendError | withData<FTAuthToken>> => {
  const tokenSearchParams = new URLSearchParams({
    scope,
  });
  const tokenEndpoint = `${uri}/api/access_francetravail?${tokenSearchParams.toString()}`;

  try {
    const tokenResponse = await fetch(tokenEndpoint, {
      method: "GET",
      cache: "no-store",
    });
    const tokenData = await tokenResponse.json();

    if (tokenData && isPayloadError(tokenData)) {
      throw new BackendError(tokenData.type, tokenData.message);
    } else {
      return { data: tokenData };
    }
  } catch (err: any) {
    return await handleActionError(err);
  }
};

export const getOffresEmploiFT = async <T>(
  body: OffreEmploiFTBody,
  search?: OffreEmploiFTParams
): Promise<PayloadBackendError | withData<T>> => {
  try {
    if (search || (body.type === "id" && body.id)) {
      const res = (await getAccessTokenFT("api_offresdemploiv2 o2dsoffre")) as
        | withData<{ access_token: string }>
        | PayloadBackendError;

      if (res && isPayloadError(res))
        throw new BackendError(res.type, res.message);

      const token = res.data?.access_token;
      body.token = token;

      if (!token)
        throw new BackendError(
          BACKEND_ERRORS.NOT_VALID,
          BACKEND_MESSAGES.NOT_VALID
        );

      let searchParams = "";
      if (search) {
        const obj = Object.fromEntries(
          Object.entries(search).map(([key, value]) => [key, String(value)])
        );

        searchParams = new URLSearchParams(obj).toString();
      }

      const result = (await FTReq<T, OffreEmploiFTBody>(
        "/api/offres_francetravail",
        body,
        searchParams
      )) as withData<T> | PayloadBackendError;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        return { data: result.data };
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.NOT_VALID,
        BACKEND_MESSAGES.NOT_VALID
      );
    }
  } catch (err: any) {
    return await handleActionError(err);
  }
};

const FTReq = async <T, Body>(
  params: string,
  body: Body,
  searchParams: string
) => {
  try {
    const response = await fetch(`${uri}${params}?${searchParams}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = (await response.json()) as withData<T> | PayloadBackendError;

    if (result && isPayloadError(result)) {
      throw new BackendError(result.type, result.message);
    } else {
      return { data: result };
    }
  } catch (err: any) {
    return await handleActionError(err);
  }
};

export const getJobsFT = async <T>(
  body: JobsFTBody,
  search?: OffreEmploiFTParams
): Promise<PayloadBackendError | withData<T>> => {
  try {
    // if (search || (body.type === "id" && body.id)) {
    const res = (await getAccessTokenFT(
      "api_rome-metiersv1 nomenclatureRome"
    )) as withData<{ access_token: string }> | PayloadBackendError;

    if (res && isPayloadError(res))
      throw new BackendError(res.type, res.message);

    const token = res.data?.access_token;
    body.token = token;

    if (!token)
      throw new BackendError(
        BACKEND_ERRORS.NOT_VALID,
        BACKEND_MESSAGES.NOT_VALID
      );

    let searchParams = "";
    if (search) {
      const obj = Object.fromEntries(
        Object.entries(search).map(([key, value]) => [key, String(value)])
      );

      searchParams = new URLSearchParams(obj).toString();
    }

    const result = (await FTReq<T, JobsFTBody>(
      "/api/offres_francetravail",
      body,
      searchParams
    )) as withData<T> | PayloadBackendError;

    if (result && isPayloadError(result)) {
      throw new BackendError(result.type, result.message);
    } else {
      return { data: result.data };
    }
    // } else {
    //   throw new BackendError(
    //     BACKEND_ERRORS.NOT_VALID,
    //     BACKEND_MESSAGES.NOT_VALID
    //   );
    // }
  } catch (err: any) {
    return await handleActionError(err);
  }
};
