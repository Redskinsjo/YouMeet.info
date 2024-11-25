"use server";
import { cookies } from "next/headers";
import { verif } from "../basics/jwt";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { redirect } from "next/navigation";

const cookieName = `${process.env.APP === "candidate" ? "login" : "loginPro"}`;

export default async function verifyTokenServer(
  cookieInput?: string,
  redirectUrl: string = "dashboard"
): Promise<LoginCookiePayload> {
  let cookie = cookieInput;

  if (!cookie && (await cookies()).has(cookieName)) {
    cookie = (await cookies()).get(cookieName)?.value;
  }
  if (!!cookie) {
    const verified = await verif(cookie);

    if (
      (verified as LoginCookiePayload).userId ||
      (verified as LoginCookiePayload).email
    ) {
      return verified as LoginCookiePayload;
    }
  }
  return redirect(`/se-connecter?redirect=${redirectUrl}`);
}
