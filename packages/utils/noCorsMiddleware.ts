import { dev } from "@/app/_functions/imports";
import { ContextRequest } from "@youmeet/types/ContextRequest";

export const noCorsMiddleware = async (context: ContextRequest) => {
  const host = context.request.headers.get("host");
  if (
    dev ||
    host === "pro.youmeet.info" ||
    host === "youmeetpro-git-testing-youmeet-pro.vercel.app"
  ) {
    return true;
  }
  return false;
};
