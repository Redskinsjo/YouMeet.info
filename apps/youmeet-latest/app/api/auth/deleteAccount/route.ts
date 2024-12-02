import { NextRequest, NextResponse } from "next/server";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { uri } from "@youmeet/functions/imports";
import { deleteAccount } from "@youmeet/functions/request";
import { BetaUser } from "@youmeet/gql/generated";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";

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
      return Response.json({ data: "An error occured" }, { status: 400 });
    }
  }
  return Response.json({ data: "Not authenticated" }, { status: 400 });
}
