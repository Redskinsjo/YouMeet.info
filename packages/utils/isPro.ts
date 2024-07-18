import { verif } from "./jwt";
import Cookies from "js-cookie";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";

export const cookie = async (name: string = "loginPro") => {
  const cookie = Cookies.get(name) as string;
  if (cookie) {
    const verified = (await verif(cookie)) as LoginCookiePayload;
    if (verified?.userId) {
      return verified;
    }
  }
  return undefined;
};

export const isPro = async () => {
  const data = await cookie("loginPro");
  if (data) {
    if (data.pro && data.user) return "both";
    if (data.pro) return true;
    if (data.user) return false;
  }
  return undefined;
};
