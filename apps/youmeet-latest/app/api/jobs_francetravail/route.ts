import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import { handleActionError } from "@youmeet/utils/basics/handleActionError";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  const uri = "https://api.francetravail.io/partenaire/rome-metiers";
  const body = await req.json();
  const searchParams = decodeURIComponent(req.nextUrl.searchParams.toString());
  const type = body?.type;
  const id = body?.id;

  try {
    const verified = await verifyTokenServer();
    if (verified) {
      if (!body?.token)
        throw new BackendError(
          BACKEND_ERRORS.MISSING_ARGUMENT,
          BACKEND_MESSAGES.MISSING_ARGUMENT
        );

      let params;

      if (type === "search") params = `/v2/offres/search?${searchParams}`;
      else if (type === "id") params = `/v2/offres/${id}`;
      else params = null;

      if (!params)
        throw new BackendError(
          BACKEND_ERRORS.MISSING_ARGUMENT,
          BACKEND_MESSAGES.MISSING_ARGUMENT
        );

      const endpoint = uri + params;

      const headers = {
        Authorization: `Bearer ${body?.token}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(endpoint, {
        method: "GET",
        headers,
      });

      const data = await response.json();

      return Response.json(
        { data },
        { status: response.status, statusText: response.statusText }
      );
    } else {
      throw new BackendError(
        BACKEND_ERRORS.NOT_AUTHORIZED,
        BACKEND_MESSAGES.NOT_AUTHORIZED
      );
    }
  } catch (err: any) {
    return Response.json(await handleActionError(err), {
      status: err.status,
      statusText: err.statusText,
    });
  }
}
