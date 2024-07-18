import { noCorsMiddleware } from "./noCorsMiddleware";
import { ContextRequest } from "@youmeet/types/ContextRequest";

const localhost = "localhost:3000";

const context = {
  request: {
    headers: {
      get: (header: string) => (header === "host" ? localhost : "unknown"),
    },
  },
} as ContextRequest;

test("check restricted request", async () => {
  const noCors = await noCorsMiddleware(context);
  expect(noCors).toBe(false);
});
