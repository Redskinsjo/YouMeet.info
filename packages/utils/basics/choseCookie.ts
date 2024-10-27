import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const choseCookie = (
  pathname: string,
  cookies: RequestCookies,
  meetPath?: boolean
) => {
  let cookieName = process.env.APP === "candidate" ? "login" : "loginPro";
  if (meetPath) cookieName = "meet";
  else if (pathname === "/reinitialiser-mot-de-passe") cookieName = "reset";

  return cookies.get(cookieName);
};
