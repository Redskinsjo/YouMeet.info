import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import { handleActionError } from "@youmeet/utils/basics/handleActionError";
import { NextRequest } from "next/server";
import { uri as youmeetUri } from "@youmeet/functions/imports";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const realm = search.get("realm") ?? "";

  try {
    if (!realm)
      throw new BackendError(
        BACKEND_ERRORS.MISSING_ARGUMENT,
        BACKEND_MESSAGES.MISSING_ARGUMENT
      );

    const uri =
      "https://authentification-candidat.francetravail.fr/connexion/oauth2/authorize";

    const client_id = `${process.env.FRANCE_TRAVAIL_CLIENT_ID}`;
    const scope = "api_peconnect-experiencesv1 pfcexperiences";

    const encoded = new URLSearchParams({
      realm,
      scope,
      redirect_uri: `${youmeetUri}/api/auth/francetravail/connexion`,
      client_id,
    });

    console.log(encoded, "encoded");

    const searchParams = `${encoded}&response_type=code&state=ABC&nonce=CBA`;

    const endpoint = `${uri}?${searchParams}`;

    console.log(endpoint, "endpoint");

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "response");
    const data = await response.json();
    console.log(data, "data");
    return Response.json({ data }, { status: 200 });
  } catch (err: any) {
    console.log(err, "err");
    return Response.json(await handleActionError(err), {
      status: err.type,
      statusText: err.statusText,
    });
  }
}
