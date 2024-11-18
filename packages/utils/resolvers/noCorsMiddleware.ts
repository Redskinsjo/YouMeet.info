import { dev, test } from "@youmeet/functions/imports";
import { createError } from "@youmeet/functions/request";
import { ContextRequest } from "@youmeet/types/ContextRequest";
import { BACKEND_ERRORS } from "@youmeet/types/api/backend";
import { AES, enc } from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

const hosts = [
  "www.youmeet.info",
  "youmeet-git-testing-youmeet.vercel.app",
  "youmeet-git-ft-offres-youmeet.vercel.app",
  "youmeetpro-git-testing-youmeet.vercel.app",
  "app",
];

const regex = /(?<=\/\/)[^\/_&?]+/gm;

export const noCorsMiddleware = async (context: ContextRequest, err?: true) => {
  const host = context.request.headers.get("host") || "";
  const origin = context.request.headers.get("origin") || "";
  const uniqueHeader = context.request.headers.get("x-domain-youmeet") || "";

  if (!origin) return false;
  const match = origin.match(regex);
  const originHost = match ? match[0] : "";

  if (err || dev || hosts.includes(host) || hosts.includes(originHost)) {
    const decrypt = AES.decrypt(
      uniqueHeader,
      `${process.env.JWT_SECRET}`
    ).toString(enc.Utf8);
    if (hosts.includes(decrypt)) {
      return true;
    }
  }
  await createError({
    data: {
      environment: dev ? "development" : "production",
      message: `Host was ${host} and origin was ${origin}`,
      pro: false,
      query: "unknown",
      status: 400,
      statusText: "CORS not allowed",
      type: BACKEND_ERRORS.NOT_AUTHORIZED,
    },
  });
  return false;
};
