import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { verif } from "../jwt";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import Cookies from "js-cookie";
import { uri } from "@youmeet/functions/imports";

export const redirectToLogin = async (
  router: AppRouterInstance,
  window: Window,
  subscribed?: boolean
) => {
  let returnToPath;
  const cookie = Cookies.get("loginPro");
  if (cookie) {
    const verified = (await verif(cookie)) as LoginCookiePayload;

    if (subscribed) {
      const currentLocation = window.location.toString();
      returnToPath =
        currentLocation.replace(new URL(currentLocation).origin, "") || "/";

      if (verified?.pro) {
        return router.push(
          `${uri}/se-connecter?redirect=${encodeURIComponent(returnToPath)}`
        );
      } else if (verified.user) {
        return router.push(
          `/se-connecter?redirect=${encodeURIComponent(returnToPath)}`
        );
      }
    }
    returnToPath = window.location.pathname;
    if (verified?.pro) {
      return router.push(
        `${uri}/se-connecter?redirect=${encodeURIComponent(returnToPath)}`
      );
    } else if (verified.user) {
      return router.push(
        `/se-connecter?redirect=${encodeURIComponent(returnToPath)}`
      );
    }
    return router.push(`/?returnTo=${encodeURIComponent(returnToPath)}`);
  }
  const currentLocation = window.location.toString();
  returnToPath =
    currentLocation.replace(new URL(currentLocation).origin, "") || "/";

  return router.push(
    `/se-connecter?redirect=${encodeURIComponent(returnToPath)}`
  );
};
