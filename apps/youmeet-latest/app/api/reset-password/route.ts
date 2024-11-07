import { s } from "@youmeet/utils/basics/jwt";
import BetaUser from "@youmeet/models/betaUsers";
import { uri } from "@youmeet/functions/imports";
import { NextRequest, NextResponse } from "next/server";
import { handleRedirect } from "@youmeet/utils/backoffice/classic-login";
import { cookies } from "next/headers";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const email = query.get("email");
  const name = query.get("name");
  const userId = query.get("userId");

  if (email && name && userId) {
    const user = await BetaUser.findById(userId);

    if (user) {
      const signed = await s({
        email,
        name,
        userId,
        user: user.user ?? false,
        pro: user.pro ?? false,
      });
      if (signed) {
        (await cookies()).set("reset", `${signed}`, {
          path: "/",
          domain: process.env.API_DOMAIN,
        });
        const cookie = (await cookies()).get("reset")?.value as string;

        const response = NextResponse.redirect(
          `${uri}/reinitialiser-mot-de-passe`,
          302
        );

        response.cookies.set("reset", cookie);

        return response;
      }
      handleRedirect({
        error: {
          type: BACKEND_ERRORS.NO_PAYLOAD,
          message: BACKEND_MESSAGES.NO_PAYLOAD,
        },
      });
    }
    handleRedirect({
      error: {
        type: BACKEND_ERRORS.NO_USER,
        message: BACKEND_MESSAGES.NO_USER,
      },
    });
  }
  handleRedirect({
    error: {
      type: BACKEND_ERRORS.NOT_AUTHORIZED,
      message: BACKEND_MESSAGES.NOT_AUTHORIZED,
    },
  });
}
