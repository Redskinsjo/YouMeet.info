import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { NextRequest } from "next/server";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const vttFile = `${body.public_id}.vtt`;

    const transformationOptions = [
      {
        overlay: {
          resource_type: "subtitles",
          public_id: vttFile,
        },
      },
      { flags: "layer_apply" },
    ];

    const videoUrl = `${body.public_id}.${body.format}`;
    const url = cloudinary.url(videoUrl, {
      resource_type: "video",
      transformation: transformationOptions,
    });

    return Response.json({ url }, { status: 200 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 400 });
  }
}
