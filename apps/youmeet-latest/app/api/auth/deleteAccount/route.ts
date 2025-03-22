import { NextRequest, NextResponse } from "next/server";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { uri } from "@youmeet/functions/imports";
import { deleteAccount } from "@youmeet/functions/request";
import { BetaUser } from "@youmeet/gql/generated";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
} from "@youmeet/types/api/backend";
import { handleRedirect } from "@youmeet/utils/backoffice/classic-login";

export async function GET(req: NextRequest) {
  const verified = await verifyTokenServer();
  if (verified) {
    try {
      const result = (await deleteAccount<BetaUser>({
        userId: verified.userId,
      })) as BetaUser;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else if (!result) {
        throw new BackendError(
          BACKEND_ERRORS.UNKNOWN,
          BACKEND_MESSAGES.UNKNOWN
        );
      } else {
        const name = process.env.APP === "candidate" ? "login" : "loginPro";
        (await cookies()).delete({
          name: name,
          path: "/",
          domain: `${process.env.API_DOMAIN}`,
        });
        revalidatePath("/");
        revalidatePath("/se-connecter");
        const res = NextResponse.redirect(new URL("/", uri));
        if (res.cookies.has(name)) res.cookies.delete(name);

        return res;
      }
    } catch (err: any) {
      const error = err as PayloadBackendError;
      console.log(err, "err");
      return handleRedirect(
        { error: { message: error.message, type: error.type } },
        "dashboard"
      );
    }
  }
  return handleRedirect(
    {
      error: {
        message: BACKEND_MESSAGES.NOT_AUTHENTICATED,
        type: BACKEND_ERRORS.NOT_AUTHENTICATED,
      },
    },
    "dashboard"
  );
}
