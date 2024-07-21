import { uri } from "@youmeet/functions/imports";
import { PayloadRedirections } from "@youmeet/types/api/backend";

export const handleRedirect = (
  payload?: PayloadRedirections,
  pathname: string = "se-connecter"
): Response => {
  if (payload) {
    if (payload.error) {
      return new Response(null, {
        headers: {
          Location: `${uri}/${pathname}?error=${payload?.error.type}&message=${payload?.error.message}`,
        },
        status: 302,
      });
    } else {
      return new Response(null, {
        headers: {
          Location: `${uri}/${pathname}?redirect=${payload?.success?.uri}`,
        },
        status: 302,
      });
    }
  } else {
    return new Response(null, {
      headers: {
        Location: `${uri}/${pathname}`,
      },
      status: 302,
    });
  }
};
