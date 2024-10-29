import mongoose from "mongoose";
import process from "process";
import { getVideos } from "@youmeet/functions/request";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
mongoose.connect(`${process.env.MONGODB_URI}`);
(async () => {
    const videos = (await getVideos());
    if (videos) {
        for (let i = 0; i < videos.length; i++) {
            console.log(i, "i");
            const video = videos[i];
            if (video?.file?.subtitledUrl)
                continue;
            const publicId = `${video.file?.public_id}`;
            try {
                const result = await cloudinary.api.resources_by_ids([publicId], {
                    resource_type: "video",
                });
                console.log(result, "result");
                if (!result.resources.length)
                    continue;
                const result2 = await cloudinary.api.update(publicId, {
                    resource_type: "video",
                    raw_convert: "google_speech:vtt",
                });
                console.log(result2, "result2");
            }
            catch (err) {
                console.log(err, "err");
            }
        }
    }
    process.exit();
})();
