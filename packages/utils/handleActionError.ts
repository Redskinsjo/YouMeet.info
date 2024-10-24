import { dev } from "@youmeet/functions/imports";
import { createError } from "@youmeet/functions/request";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
} from "@youmeet/types/api/backend";

export const handleActionError = async (
  err: any,
  callback?: () => void
): Promise<PayloadBackendError> => {
  await createError({
    data: {
      environment: dev ? "development" : "production",
      message: err.message,
      pro: false,
      query: "unknown",
      status: err.status,
      statusText: err.statusText ?? "",
      type: err.type,
    },
  });
  const zodErr = err.errors;
  if (callback) callback();
  return {
    status: err.status,
    error: true,
    type:
      zodErr && zodErr[0].code === "invalid_type"
        ? BACKEND_ERRORS.DATATYPE_INVALID
        : err.type
        ? err.type
        : BACKEND_ERRORS.UNKNOWN,
    message:
      zodErr && zodErr[0].code === "invalid_type"
        ? `${BACKEND_MESSAGES.DATATYPE_INVALID} ${zodErr[0].path[0]}`
        : err.message
        ? err.message
        : BACKEND_MESSAGES.UNKNOWN,
  };
};
