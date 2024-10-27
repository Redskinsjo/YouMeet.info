import { BetaUser } from "@youmeet/gql/generated";
import { formatReturnTo } from "../formatReturnTo";
import { isUser } from "@youmeet/types/TypeGuards";
import { s } from "../jwt";
import { uri } from "@youmeet/functions/imports";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";
import { BackendError } from "../BackendErrorClass";
import { NextResponse } from "next/server";
import { redir } from "../checkout/functions";

export const setCookieAndTerminate = async (
  redirect: string,
  user: BetaUser
): Promise<Response | NextResponse<unknown>> => {
  try {
    const returnTo = formatReturnTo(redirect);

    if (user && isUser(user)) {
      const beforeCookie = {
        userId: user?.id,
        email: user?.email,
        user: user?.user ?? false,
        pro: user.pro ?? false,
        returnTo,
        customerId: user?.customerId,
        companyId: user?.companyId,
        scrapped: (user?.scrapped as boolean) ?? false,
      };

      const payload = await s(beforeCookie);

      if (payload) {
        const res = setCookieOnResponse(payload, returnTo, uri);

        return res;
      } else {
        throw new BackendError(
          BACKEND_ERRORS.NO_PAYLOAD,
          BACKEND_MESSAGES.NO_PAYLOAD
        );
      }
    } else {
      throw new BackendError(BACKEND_ERRORS.NO_USER, BACKEND_MESSAGES.NO_USER);
    }
  } catch (err: any) {
    return redir(err.type, err.message, err.uri);
  }
};

const setCookieOnResponse = (
  cookie: string,
  pathname: string,
  base: string
) => {
  const res = NextResponse.redirect(new URL(`${pathname}`, base));
  if (cookie) {
    res.cookies.set("loginPro", cookie, {
      domain: `${process.env.API_DOMAIN}`,
    });
  }
  return res;
};
