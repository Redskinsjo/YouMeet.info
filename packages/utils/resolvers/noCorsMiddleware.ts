import { dev, test } from "@youmeet/functions/imports";
import { createError } from "@youmeet/functions/request";
import { ContextRequest } from "@youmeet/types/ContextRequest";
import { BACKEND_ERRORS } from "@youmeet/types/api/backend";

export const noCorsMiddleware = async (context: ContextRequest) => {
  const host = context.request.headers.get("host");
  if (
    dev ||
    host === "www.youmeet.info" ||
    host === "youmeet-git-testing-youmeet.vercel.app"
  ) {
    return true;
  }
  await createError({
    data: {
      environment: dev ? "development" : "production",
      message: `Host was ${host}`,
      pro: false,
      query: "unknown",
      status: 400,
      statusText: "CORS not allowed",
      type: BACKEND_ERRORS.NOT_AUTHORIZED,
    },
  });
  return false;
};
