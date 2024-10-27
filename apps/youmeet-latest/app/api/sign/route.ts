import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { verif } from "@youmeet/utils/basics/jwt";
import BetaUser from "@youmeet/models/betaUsers";
import { NextRequest } from "next/server";
import { BACKEND_ERRORS } from "@youmeet/types/api/backend";
import { createError } from "@youmeet/functions/request";
import { dev } from "@youmeet/functions/imports";
import { headers } from "next/headers";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const folder = query.get("folder") ?? undefined;
  const overwrite = query.get("overwrite") ?? undefined;
  const public_id = query.get("public_id") ?? undefined;
  const unique_filename = query.get("unique_filename") ?? undefined;
  const use_filename = query.get("use_filename") ?? undefined;
  const eager = query.get("eager") ?? undefined;
  const raw_convert = query.get("raw_convert") ?? undefined;
  const cookies = req.cookies;

  const loginCookie =
    cookies.get("login")?.value ?? headers().getSetCookie()[0];

  if (loginCookie) {
    const verified = await verif(loginCookie);
    if (verified) {
      const user = await BetaUser.findById(verified.userId);
      if (user) {
        try {
          const timestamp = Math.round(new Date().getTime() / 1000);

          const signature = cloudinary.utils.api_sign_request(
            {
              folder,
              overwrite,
              public_id,
              timestamp,
              unique_filename,
              use_filename,
              eager,
              raw_convert,
            },
            `${process.env.CLOUDINARY_API_SECRET}`
          );
          if (signature)
            return Response.json({ signature, timestamp }, { status: 200 });
        } catch (err: any) {
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
          return Response.json(BACKEND_ERRORS.UNKNOWN, { status: 400 });
        }
      } else return Response.json(BACKEND_ERRORS.NO_USER, { status: 400 });
    } else return Response.json(BACKEND_ERRORS.NOT_AUTHORIZED, { status: 401 });
  } else return Response.json(BACKEND_ERRORS.NOT_AUTHORIZED, { status: 401 });
}
