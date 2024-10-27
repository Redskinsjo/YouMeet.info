export class BackendError extends Error {
  type: number;
  message: string;
  status: number | undefined;
  uri: string | undefined;
  constructor(type: number, message: string, status?: number, uri?: string) {
    super();
    this.type = type;
    this.message = message;
    this.status = status;
    this.uri = uri;
  }
}
