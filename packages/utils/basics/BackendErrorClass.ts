import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";

export class BackendError extends Error {
  type: BACKEND_ERRORS | string | number;
  message: string | BACKEND_MESSAGES;
  status: number | undefined;
  uri: string | undefined;
  constructor(
    type: BACKEND_ERRORS | string | number,
    message: string | BACKEND_MESSAGES,
    status?: number,
    uri?: string
  ) {
    super();
    this.type = type;
    this.message = message;
    this.status = status;
    this.uri = uri;
  }
}
