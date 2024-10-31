import prisma from "@youmeet/prisma-config/prisma";
import getUptodateVideos from "@youmeet/utils/resolvers/getUptodateVideos";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

(async () => {
  const videos = await prisma.videos.findMany();
  console.log(videos.length, "len");
  const result = await getUptodateVideos(videos);
  console.log(result, "result");
})();
