import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { uri } from "@youmeet/functions/imports";
import { BackendError } from "@youmeet/utils/BackendErrorClass";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";
import { updateVideo, videoByPublicId } from "@youmeet/functions/request";
import { Eager, Video } from "@youmeet/gql/generated";
import { handleActionError } from "@youmeet/utils/handleActionError";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const headers = req.headers;
  const timestamp = headers.get("x-cld-timestamp");
  const signature = headers.get("x-cld-signature");

  try {
    console.log(body, "body");
    if (timestamp && signature) {
      if (
        body.notification_type === "upload" &&
        body.resource_type === "video" &&
        body.signature_key === `${process.env.CLOUDINARY_API_KEY}`
      ) {
        const response = await fetch(`${uri}/api/transform`, {
          method: "POST",
          body: JSON.stringify({
            public_id: body.public_id,
            format: body.format,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const { url } = await response.json();
          if (url) {
            const video = (await videoByPublicId<Video>({
              publicId: body.public_id,
            })) as Video;

            if (video) {
              const regex = /[^?]+/i;
              const matched = url.match(regex)[0];

              const updated = (await updateVideo<Video>({
                data: {
                  id: video.id,
                  file: {
                    subtitledUrl: matched,
                    eager: video.file?.eager as Eager[],
                  },
                },
              })) as Video;
              console.log(updated, "updated");
            }
          }

          return Response.json(
            { message: "Notification received" },
            { status: 200 }
          );
        }
      }
    }
    throw new BackendError(
      BACKEND_ERRORS.NOT_AUTHORIZED,
      BACKEND_MESSAGES.NOT_AUTHORIZED
    );
  } catch (err: any) {
    return Response.json(await handleActionError(err), { status: 200 });
  }
}
