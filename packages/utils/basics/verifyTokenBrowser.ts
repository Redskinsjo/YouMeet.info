import { verif } from "../basics/jwt";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import Cookies from "js-cookie";

const cookieLabel = `${process.env.APP === "candidate" ? "login" : "loginPro"}`;

export default async function verifyTokenBrowser(
  pathname?: string
): Promise<LoginCookiePayload | undefined> {
  const cookieName =
    pathname === "/reinitialiser-mot-de-passe" ? "reset" : cookieLabel;
  const cookie = Cookies.get(cookieName);
  if (cookie) {
    const verified = await verif(cookie);
    if (
      (verified as LoginCookiePayload).userId ||
      (verified as LoginCookiePayload).email
    ) {
      return verified as LoginCookiePayload;
    }
  }
  return undefined;
}
